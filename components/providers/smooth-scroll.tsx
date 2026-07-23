"use client";

import { ReactLenis, useLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Global smooth-scroll provider powered by Lenis, driven from GSAP's
 * ticker and wired into ScrollTrigger. This single RAF loop keeps
 * smooth-scroll position and every scroll-triggered animation in
 * perfect sync — the foundation for scroll storytelling.
 *
 * Respects prefers-reduced-motion by disabling smoothing entirely.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    registerGsap();

    // Drive Lenis from GSAP's ticker instead of its own RAF so the two
    // engines never drift apart. GSAP time is in seconds; Lenis wants ms.
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.09,
        duration: 1.2,
        smoothWheel: !prefersReduced,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        // We drive RAF from GSAP's ticker (see effect above).
        autoRaf: false,
      }}
    >
      <ScrollTriggerBridge />
      {children}
    </ReactLenis>
  );
}

/**
 * Refreshes ScrollTrigger whenever Lenis scrolls so pinned/scrubbed
 * animations recalculate against the smoothed scroll position.
 */
function ScrollTriggerBridge() {
  const lenis = useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    // After first mount + fonts/layout settle, recalc trigger positions.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [lenis]);

  return null;
}
