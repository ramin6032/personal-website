"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Magnetic — wraps an element so it drifts toward the cursor with a spring,
 * giving buttons/links tactile "physics". The outer wrapper tracks the
 * pointer while an inner layer can move at a different rate to add depth.
 * Optionally scales up on hover. Falls back to static content when the
 * user prefers reduced motion.
 */
export function Magnetic({
  children,
  strength = 0.4,
  /** How much the inner content lags behind the wrapper (0 = locked). */
  innerStrength = 0.15,
  /** Scale applied while the pointer is over the element. */
  hoverScale = 1.03,
  className,
}: {
  children: ReactNode;
  strength?: number;
  innerStrength?: number;
  hoverScale?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const innerX = useMotionValue(0);
  const innerY = useMotionValue(0);
  const scale = useMotionValue(1);

  const spring = { stiffness: 200, damping: 15, mass: 0.3 };
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);
  const springInnerX = useSpring(innerX, spring);
  const springInnerY = useSpring(innerY, spring);
  const springScale = useSpring(scale, { stiffness: 260, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
    innerX.set(relX * innerStrength);
    innerY.set(relY * innerStrength);
  };

  const enter = () => {
    if (!reduce) scale.set(hoverScale);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    innerX.set(0);
    innerY.set(0);
    scale.set(1);
  };

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={enter}
      onMouseLeave={reset}
      style={{ x: springX, y: springY, scale: springScale }}
      className={cn("inline-block", className)}
    >
      <motion.div style={{ x: springInnerX, y: springInnerY }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
