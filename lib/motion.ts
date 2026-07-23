/**
 * Shared motion tokens — a single source of truth for easing curves,
 * durations and Motion variants so every animation across the site feels
 * like it came from the same hand. Keep values here rather than scattering
 * magic numbers through components.
 */

/** Signature "out expo" curve — used for entrances (fast in, soft settle). */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Balanced in/out for looping/ambient motion. */
export const EASE_IN_OUT_SOFT = [0.65, 0, 0.35, 1] as const;

/** GSAP string equivalents (GSAP uses its own easing DSL). */
export const GSAP_EASE = {
  out: "power3.out",
  inOut: "power2.inOut",
  expo: "expo.out",
} as const;

export const DURATION = {
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
} as const;

/* ------------------------------------------------------------------ *
 * Motion (framer) variants — reusable in whileInView / animate props.
 * ------------------------------------------------------------------ */

/** Fade + rise. Distance is configurable via CSS var fallback in usage. */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
  },
};

/** Container that staggers its direct children. */
export const staggerContainer = (stagger = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Standard viewport config: trigger once, a little before fully in view. */
export const inViewport = {
  once: true,
  amount: 0.3,
  margin: "0px 0px -10% 0px",
} as const;
