"use client";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { DrawLine } from "@/components/ui/draw-line";
import { useDictionary } from "@/lib/i18n/context";

/**
 * Experience — a vertical timeline whose spine is an SVG line that draws
 * itself as the section enters view. Each role reveals from the left, with
 * its impact bullets listed for quick recruiter scanning.
 */
export function Experience() {
  const { experience } = useDictionary();

  return (
    <Section
      id="experience"
      index="03"
      eyebrow={experience.eyebrow}
      title={experience.title}
      lede={experience.lede}
    >
      <div className="relative pl-8 sm:pl-12">
        {/* Animated spine */}
        <div className="absolute left-1.75 top-2 h-[calc(100%-1rem)] sm:left-2.75">
          <DrawLine orientation="vertical" className="h-full" />
        </div>

        <ul className="space-y-12">
          {experience.roles.map((role, i) => (
            <li key={`${role.role}-${role.org}`} className="relative">
              {/* Node */}
              <span className="absolute -inset-s-8 top-1.5 flex h-4 w-4 items-center justify-center sm:-inset-s-12">
                <span className="absolute h-4 w-4 rounded-full bg-electric/30 blur-[2px]" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-electric ring-2 ring-void" />
              </span>

              <Reveal direction="left" delay={i * 0.05}>
                <div className="flex flex-wrap items-baseline  gap-x-4 gap-y-1">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan">
                    {role.period}
                  </p>
                  <span className="text-xs text-text-muted">
                    ({role.duration})
                  </span>
                </div>
                <h3 className="mt-2 text-xl font-semibold text-text-primary">
                  {role.role}
                </h3>
                <p className="text-sm text-text-secondary">
                  {role.org} · {role.type}
                </p>
                <p className="mb-4 text-xs text-text-muted">{role.location}</p>
                <p className="mb-5 max-w-2xl text-sm leading-relaxed text-text-secondary">
                  {role.summary}
                </p>

                <ul className="grid max-w-3xl gap-2.5 sm:grid-cols-2">
                  {role.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-2.5 text-sm leading-relaxed text-text-secondary"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-linear-to-br from-electric to-violet" />
                      {h}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
