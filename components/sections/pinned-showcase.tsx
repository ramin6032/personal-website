"use client";

import { useGsap } from "@/lib/hooks/use-gsap";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { useDictionary } from "@/lib/i18n/context";

/**
 * PinnedShowcase — the flagship scroll-storytelling beat. The section pins
 * while the visitor scrolls, translating a horizontal track of panels
 * sideways (scrubbed to scroll position) with a progress rail underneath.
 * This is pure GSAP ScrollTrigger, synced to Lenis via the shared ticker.
 *
 * On reduced-motion / small screens the pin is skipped and panels stack
 * naturally, so the content is never trapped.
 */
export function PinnedShowcase() {
  const { process } = useDictionary();
  const PANELS = process.steps;

  const scope = useGsap<HTMLDivElement>((_ctx, gsap, root) => {
    const track = root.querySelector<HTMLElement>(".pin-track");
    if (!track) return;

    // In RTL the flex track overflows to the left, so it must translate in
    // the opposite direction to reveal the off-screen panels.
    const isRtl =
      getComputedStyle(root).direction === "rtl" ||
      document.documentElement.dir === "rtl";

    const mm = gsap.matchMedia();

    // Only pin + scrub on larger screens with motion enabled.
    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const distance = track.scrollWidth - window.innerWidth + 500;

        const tween = gsap.to(track, {
          x: isRtl ? distance : -distance,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${distance}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Progress rail fill tied to the same scroll range.
        const rail = root.querySelector<HTMLElement>(".pin-rail-fill");
        if (rail) {
          gsap.set(rail, { transformOrigin: isRtl ? "right" : "left" });
          gsap.fromTo(
            rail,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top top",
                end: () => `+=${distance}`,
                scrub: true,
              },
            },
          );
        }

        return () => {
          tween.kill();
        };
      },
    );
  });

  return (
    <section
      id="process"
      ref={scope}
      className="relative scroll-mt-28 overflow-hidden"
    >
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24 sm:px-10 md:h-screen md:py-0 lg:px-16">
        <header className="mb-12  w-full text-start">
          <p className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-cyan">
            <span className="text-text-muted">04</span>
            <span className="h-px w-8 bg-linear-to-r from-cyan to-transparent" />
            {process.eyebrow}
          </p>
          <AnimatedHeading
            text={process.title}
            className="font-(family-name:--font-geist) text-3xl font-semibold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
          />
        </header>

        {/* Horizontal track (translated by GSAP on desktop) */}
        <div className="pin-track flex flex-col gap-6 md:w-max md:flex-row md:gap-8">
          {PANELS.map((p) => (
            <article
              key={p.step}
              className="glass group relative flex w-full flex-col justify-between overflow-hidden rounded-2xl p-8 md:h-[52vh] md:w-[68vw] lg:w-[46vw]"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-electric/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-0" />
              <span className="font-(family-name:--font-geist) text-6xl font-semibold text-white/10">
                {p.step}
              </span>
              <div>
                <h3 className="mb-3 text-2xl font-semibold text-text-primary">
                  {p.title}
                </h3>
                <p className="max-w-md text-base leading-relaxed text-text-secondary">
                  {p.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Progress rail */}
        <div className="mt-10 hidden h-px w-full overflow-hidden bg-line md:block">
          <div className="pin-rail-fill h-full w-full origin-left scale-x-0 bg-linear-to-r from-electric via-cyan to-violet" />
        </div>
      </div>
    </section>
  );
}
