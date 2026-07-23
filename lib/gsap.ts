"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Central GSAP setup. Registers plugins exactly once (guarded for the
 * React strict-mode double-invoke and Fast Refresh) and applies sensible
 * global defaults so every animation shares the same premium easing.
 */
let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.defaults({
    ease: "power3.out",
    duration: 0.9,
  });

  // Keep ScrollTrigger accurate across responsive breakpoints.
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });

  registered = true;
}

export { gsap, ScrollTrigger };
