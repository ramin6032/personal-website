"use client";

import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * TiltCard — an interactive card that tilts in 3D toward the cursor and
 * renders a spotlight glow that tracks the pointer. Gives project/skill
 * cards tactile "hover physics" without feeling gimmicky.
 *
 * Everything is spring-smoothed and resets cleanly on leave. Falls back to
 * a plain container when the user prefers reduced motion.
 */
export function TiltCard({
  children,
  className,
  max = 8,
  glow = true,
}: {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees on each axis. */
  max?: number;
  /** Show the cursor-tracking spotlight. */
  glow?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Normalised pointer position within the card (-0.5 → 0.5).
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const sx = useSpring(px, { stiffness: 200, damping: 20, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 200, damping: 20, mass: 0.4 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);

  // Spotlight position as percentages for the radial gradient.
  const glowX = useTransform(px, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(py, [-0.5, 0.5], ["0%", "100%"]);
  const glowBackground = useMotionTemplate`radial-gradient(220px circle at ${glowX} ${glowY}, rgba(120,170,255,0.15), transparent 65%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  if (reduce) {
    return <div className={cn("relative", className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn("relative [perspective:1000px]", className)}
    >
      {children}
      {glow && (
        <motion.div
          aria-hidden
          style={{ background: glowBackground }}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
        />
      )}
    </motion.div>
  );
}
