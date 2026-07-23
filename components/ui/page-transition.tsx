"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * PageTransition — a cinematic curtain that wipes up off the screen on
 * first load, revealing the page beneath. Panels are staggered so the
 * reveal reads as a deliberate "shutter" rather than a plain fade. It sits
 * above everything, is non-interactive, and unmounts itself once the last
 * panel clears. Skipped entirely for reduced-motion users.
 */
export function PageTransition() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  if (reduce || done) return null;

  const panels = 5;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] flex">
      {Array.from({ length: panels }).map((_, i) => (
        <motion.div
          key={i}
          className="h-full flex-1 bg-void"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          style={{ transformOrigin: "top" }}
          transition={{
            duration: 0.9,
            delay: 0.15 + i * 0.06,
            ease: EASE_OUT_EXPO,
          }}
          onAnimationComplete={
            i === panels - 1 ? () => setDone(true) : undefined
          }
        />
      ))}
    </div>
  );
}
