"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

// useLayoutEffect warns during SSR; fall back to useEffect on the server.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * useGsap — runs a GSAP setup callback inside a `gsap.context` scoped to
 * a container ref. The context auto-reverts every tween/ScrollTrigger it
 * created on cleanup, which makes it safe for React strict-mode double
 * mounts and Fast Refresh.
 *
 * Returns the scope ref to spread onto the container element.
 *
 * @example
 * const scope = useGsap((ctx, gsap) => {
 *   gsap.from(".item", { y: 40, opacity: 0, stagger: 0.1 });
 * });
 * return <div ref={scope}>...</div>;
 */
export function useGsap<T extends HTMLElement = HTMLDivElement>(
  setup: (ctx: gsap.Context, g: typeof gsap, root: T) => void,
  deps: React.DependencyList = [],
): RefObject<T | null> {
  const scope = useRef<T>(null);
  const setupRef = useRef(setup);

  useIsomorphicLayoutEffect(() => {
    setupRef.current = setup;
    registerGsap();
    const root = scope.current;
    if (!root) return;

    const ctx = gsap.context((self) => {
      setupRef.current(self, gsap, root);
    }, scope);

    return () => ctx.revert();
  }, deps);

  return scope;
}
