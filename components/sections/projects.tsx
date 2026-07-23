"use client";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { useDictionary } from "@/lib/i18n/context";

/**
 * Projects — a responsive grid of interactive tilt cards built from real
 * work. Each card reveals on scroll with a small stagger, then responds to
 * the pointer with 3D tilt and a tracking spotlight. Highlights expand the
 * scope so a recruiter can gauge depth at a glance.
 */
export function Projects() {
  const { projects } = useDictionary();

  return (
    <Section
      id="projects"
      index="05"
      eyebrow={projects.eyebrow}
      title={projects.title}
      lede={projects.lede}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projects.items.map((project, i) => (
          <Reveal key={project.name} direction="up" delay={i * 0.08}>
            <TiltCard className="h-full rounded-2xl" max={6}>
              <article className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 [transform:translateZ(0)]">
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
                <p className="mt-1 text-xs text-text-muted">{project.period}</p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {project.summary}
                </p>

                <ul className="mt-5 space-y-2">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-2.5 text-sm leading-relaxed text-text-secondary"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-gradient-to-br from-electric to-violet" />
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
