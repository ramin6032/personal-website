"use client";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { Parallax } from "@/components/ui/parallax";
import { motion, useReducedMotion } from "motion/react";
import { staggerContainer, fadeUp, inViewport } from "@/lib/motion";
import { useDictionary } from "@/lib/i18n/context";

/**
 * About — narrative block sourced from the real profile. A staggered list
 * of engineering principles fades up beside a parallax stat panel and the
 * focus-area tags that recruiters scan for.
 */
export function About() {
  const { about, hero } = useDictionary();
  const reduce = useReducedMotion();

  return (
    <Section
      id="about"
      index="01"
      eyebrow={about.eyebrow}
      title={about.title}
      lede={about.lede}
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div className="space-y-10">
          {/* Narrative paragraphs */}
          <div className="space-y-5">
            {about.paragraphs.map((p, i) => (
              <Reveal
                key={i}
                direction="up"
                delay={i * 0.08}
                className="max-w-2xl text-base leading-relaxed text-text-secondary"
              >
                {p}
              </Reveal>
            ))}
          </div>

          {/* Principles */}
          <motion.ul
            variants={staggerContainer(0.12)}
            initial={reduce ? undefined : "hidden"}
            whileInView={reduce ? undefined : "visible"}
            viewport={inViewport}
            className="space-y-4"
          >
            {about.principles.map((p) => (
              <motion.li
                key={p.title}
                variants={reduce ? undefined : fadeUp}
                className="glass rounded-2xl p-6"
              >
                <h3 className="mb-2 text-lg font-semibold text-text-primary">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {p.body}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div className="space-y-8">
          <Parallax speed={50} className="hidden lg:block">
            <Reveal direction="left">
              <div className="glass relative overflow-hidden rounded-2xl p-8">
                <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-violet/20 blur-3xl" />
                <div className="grid grid-cols-3 gap-4">
                  {hero.stats.map((s) => (
                    <div key={s.label} dir="ltr">
                      <p className="font-(family-name:--font-geist) text-center text-3xl font-semibold text-gradient">
                        {s.value}
                      </p>
                      <p className="mt-1 text-center text-xs leading-snug text-text-muted">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </Parallax>

          {/* Focus areas */}
          <Reveal direction="up" delay={0.1}>
            <div className="glass rounded-2xl p-6">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-cyan">
                {about.focusAreasLabel}
              </p>
              <ul className="flex flex-wrap gap-2">
                {about.focusAreas.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-line px-3 py-1.5 text-xs text-text-secondary transition-colors duration-200 hover:border-white/25 hover:text-text-primary"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
