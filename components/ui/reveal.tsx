"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO, inViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 32 },
  down: { y: -32 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
};

/**
 * Reveal — the workhorse scroll-in wrapper. Fades + slides its children
 * into view once, from a chosen direction, with the shared premium easing.
 * Honours reduced-motion by rendering static content.
 *
 * Set `as="li"` etc. to keep semantic markup intact.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className,
  as = "div",
  once = true,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  as?: keyof typeof motion;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as as React.ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  const offset = OFFSET[direction];

  return (
    <MotionTag
      className={cn(className)}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ ...inViewport, once }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </MotionTag>
  );
}
