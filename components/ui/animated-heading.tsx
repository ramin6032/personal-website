"use client";

import { useGsap } from "@/lib/hooks/use-gsap";
import { cn } from "@/lib/utils";
import type { ElementType } from "react";

/**
 * AnimatedHeading — GSAP + ScrollTrigger word-mask reveal. Each word rises
 * from behind a clip mask as the heading scrolls into view, with a soft
 * stagger. This is the "section title" storytelling beat used across the
 * site so every section opens with the same intentional rhythm.
 *
 * Uses the shared useGsap scope so triggers auto-clean on unmount.
 */
export function AnimatedHeading({
  text,
  as: Tag = "h2",
  className,
  stagger = 0.08,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  stagger?: number;
}) {
  const words = text.split(" ");

  const scope = useGsap<HTMLSpanElement>((_ctx, gsap, root) => {
    const targets = gsap.utils.toArray<HTMLElement>(".ah-word");
    if (!targets.length) return;

    gsap.set(targets, { yPercent: 115 });
    gsap.to(targets, {
      yPercent: 0,
      duration: 1,
      ease: "power4.out",
      stagger,
      scrollTrigger: {
        trigger: root,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  return (
    <Tag className={cn(className)}>
      <span ref={scope} className="inline">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}
          >
            <span className="ah-word inline-block will-change-transform">
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
