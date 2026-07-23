"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * TextReveal — animates a line of text word-by-word with a masked
 * "rise" effect. Great for cinematic headline entrances.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  as: Tag = "span",
  stagger = 0.08,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: React.ElementType;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={cn("inline", className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
