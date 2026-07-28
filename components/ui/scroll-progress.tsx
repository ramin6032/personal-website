"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * ScrollProgress — a thin gradient bar pinned to the top of the viewport
 * that fills as the visitor scrolls the page. Spring-smoothed so it eases
 * rather than snapping. Purely decorative, hidden from assistive tech.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-linear-to-r from-electric via-cyan to-violet"
    />
  );
}
