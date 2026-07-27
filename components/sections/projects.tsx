"use client";

import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { useI18n } from "@/lib/i18n/context";
import { WORK } from "@/lib/content";
import { localePath } from "@/lib/work";

/**
 * Projects — a responsive grid of interactive tilt cards built from real
 * work. Each card reveals on scroll with a small stagger, then responds to
 * the pointer with 3D tilt and a tracking spotlight. Every card links to its
 * full case study (`/work/[slug]`), matched to `WORK` by index. A footer link
 * leads to the complete case-study index.
 */
export function Projects() {
  const { locale, dict } = useI18n();
  const { projects, work } = dict;

  return (
    <Section
      id="projects"
      index="05"
      eyebrow={projects.eyebrow}
      title={projects.title}
      lede={projects.lede}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projects.items.map((project, i) => {
          const slug = WORK[i]?.slug;
          return (
            <Reveal key={project.name} direction="up" delay={i * 0.08}>
              <TiltCard className="h-full rounded-2xl" max={6}>
                <Link
                  href={localePath(locale, `/work/${slug}`)}
                  className="group block h-full"
                >
                  <article className="glass relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transform-[translateZ(0)]">
                    <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-electric/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="mb-5 flex items-start justify-between gap-4">
                      <span className="text-xs font-medium uppercase tracking-[0.2em] text-cyan">
                        {project.tag}
                      </span>
                      <span className="flex-none rounded-full border border-line px-3 py-1 text-xs font-semibold text-text-primary">
                        {project.metric}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-text-primary">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-xs text-text-muted">
                      {project.period}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      {project.summary}
                    </p>

                    <ul className="mt-5 space-y-2">
                      {project.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex gap-2.5 text-sm leading-relaxed text-text-secondary"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-linear-to-br from-electric to-violet" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-electric">
                      {work.index.viewLabel}
                      <span
                        className="transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                        aria-hidden
                      >
                        →
                      </span>
                    </span>
                  </article>
                </Link>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>

      <Reveal direction="up" className="mt-12 flex justify-center">
        <Link
          href={localePath(locale, "/work")}
          className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-text-primary transition-colors duration-200 hover:bg-white/10"
        >
          {work.index.title}
          <span className="rtl:-scale-x-100" aria-hidden>
            →
          </span>
        </Link>
      </Reveal>
    </Section>
  );
}
