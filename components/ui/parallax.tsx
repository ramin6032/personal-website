"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Parallax — moves its children on the Y axis as the element scrolls
 * through the viewport, creating layered depth. `speed` is the total
 * travel in pixels across the full scroll range; negative reverses.
 * Spring-smoothed so it tracks Lenis without jitter.
 */
export function Parallax({
  children,
  speed = 80,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
