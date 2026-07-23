"use client";

import { motion, useReducedMotion } from "motion/react";
import { inViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * DrawLine — an SVG "connecting line" that draws itself on scroll using
 * stroke-dashoffset animation. Used as a technical accent between sections
 * (e.g. a glowing spine down the experience timeline). Decorative only.
 */
export function DrawLine({
  className,
  orientation = "vertical",
  duration = 1.4,
}: {
  className?: string;
  orientation?: "vertical" | "horizontal";
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const isVertical = orientation === "vertical";

  const d = isVertical ? "M1 0 V200" : "M0 1 H200";
  const viewBox = isVertical ? "0 0 2 200" : "0 0 200 2";

  return (
    <svg
      aria-hidden
      viewBox={viewBox}
      preserveAspectRatio="none"
      className={cn(
        isVertical ? "h-full w-[2px]" : "h-[2px] w-full",
        className,
      )}
    >
      <defs>
        <linearGradient
          id="draw-line-grad"
          x1="0"
          y1="0"
          x2={isVertical ? "0" : "1"}
          y2={isVertical ? "1" : "0"}
        >
          <stop offset="0%" stopColor="var(--color-electric)" />
          <stop offset="50%" stopColor="var(--color-cyan)" />
          <stop offset="100%" stopColor="var(--color-violet)" />
        </linearGradient>
      </defs>
      <motion.path
        d={d}
        stroke="url(#draw-line-grad)"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={inViewport}
        transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}
