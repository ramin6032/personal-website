"use client";

import { Reveal } from "@/components/ui/reveal";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { Magnetic } from "@/components/ui/magnetic";
import { AmbientBackground } from "@/components/background/ambient-background";
import { PROFILE } from "@/lib/content";
import { useDictionary } from "@/lib/i18n/context";

/**
 * Contact — the closing beat. A centered, high-contrast call to action set
 * against its own ambient backdrop, with a magnetic primary button so the
 * final interaction feels as considered as the first.
 */
export function Contact() {
  const { contact } = useDictionary();

  return (
    <section
      id="contact"
      className="relative scroll-mt-28 overflow-hidden px-6 py-32 sm:px-10 sm:py-40 lg:px-16"
    >
      <AmbientBackground aurora grid={false} />

      <div className="mx-auto max-w-3xl text-center">
        <Reveal
          direction="up"
          className="mb-4 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-cyan"
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan" />
          {contact.eyebrow}
          <span className="h-px w-8 bg-gradient-to-r from-cyan to-transparent" />
        </Reveal>

        <AnimatedHeading
          text={contact.title}
          className="font-[family-name:var(--font-geist)] text-4xl font-semibold leading-[1.1] tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
        />

        <Reveal
          direction="up"
          delay={0.1}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
        >
          {contact.lede}
        </Reveal>

        <Reveal
          direction="up"
          delay={0.2}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Magnetic strength={0.5}>
            <a
              href={`mailto:${PROFILE.email}`}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-electric px-8 py-4 text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_0_40px_-4px] hover:shadow-electric/60"
            >
              <span className="relative z-10">{contact.primaryCta}</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
          </Magnetic>

          <Magnetic strength={0.4}>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-8 py-4 text-sm font-semibold text-text-primary transition-colors duration-300 hover:border-white/25 hover:bg-white/5"
            >
              {contact.linkedinCta}
            </a>
          </Magnetic>
        </Reveal>

        <Reveal direction="up" delay={0.3} className="mt-8">
          <p className="!text-center text-sm text-text-muted">
            {PROFILE.location}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
