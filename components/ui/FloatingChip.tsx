"use client";
import { motion } from "motion/react";

export function FloatingChip({
  label,
  className,
  delay,
}: {
  label: string;
  className?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`glass absolute z-20 rounded-xl px-3 py-2 text-xs font-medium text-text-secondary shadow-lg shadow-black/40 ${className ?? ""}`}
    >
      <div className="animate-float-slow" dir="ltr">
        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cyan align-middle" />
        {label}
      </div>
    </motion.div>
  );
}
