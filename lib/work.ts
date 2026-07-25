/**
 * work.ts — client-safe helpers for the case-study feature.
 *
 * Joins the locale-invariant metadata in `content.ts` (`WORK`) with the
 * translated narrative in the active dictionary (`dict.work.items`) by
 * `slug`, and centralises the accent theming so the visual language stays
 * consistent between the index cards, the case-study hero and the
 * generated signature visuals.
 */

import type { WorkAccent } from "@/lib/content";

/** Per-accent gradient + glow tokens, referencing the CSS theme colors. */
export const ACCENTS: Record<
  WorkAccent,
  {
    /** Two stops for gradients (`from` → `to`). */
    from: string;
    to: string;
    /** Solid accent used for rules, dots and rings. */
    solid: string;
    /** Tailwind text class for the accent. */
    text: string;
    /** Tailwind gradient class pair. */
    gradient: string;
  }
> = {
  electric: {
    from: "#3b82f6",
    to: "#22d3ee",
    solid: "#3b82f6",
    text: "text-electric",
    gradient: "from-electric to-cyan",
  },
  cyan: {
    from: "#22d3ee",
    to: "#4f46e5",
    solid: "#22d3ee",
    text: "text-cyan",
    gradient: "from-cyan to-glow",
  },
  violet: {
    from: "#8b5cf6",
    to: "#3b82f6",
    solid: "#8b5cf6",
    text: "text-violet",
    gradient: "from-violet to-electric",
  },
  glow: {
    from: "#4f46e5",
    to: "#8b5cf6",
    solid: "#4f46e5",
    text: "text-glow",
    gradient: "from-glow to-violet",
  },
};

/** Prefix a path with the active locale segment. */
export function localePath(locale: string, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}
