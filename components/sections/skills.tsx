"use client";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { useDictionary } from "@/lib/i18n/context";

/**
 * Skills — the technical toolkit grouped how an engineer actually thinks
 * about it. Each group is an interactive tilt card that reveals on scroll
 * with a small stagger, keeping the section scannable for recruiters while
 * staying tactile.
 */
export function Skills() {
  const { skills } = useDictionary();

  return (
    <Section
      id="skills"
      index="02"
      eyebrow={skills.eyebrow}
      title={skills.title}
      lede={skills.lede}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.groups.map((group, i) => (
          <Reveal key={group.label} direction="up" delay={i * 0.06}>
            <TiltCard className="h-full rounded-2xl" max={6}>
              <div className="glass relative flex h-full flex-col overflow-hidden rounded-2xl p-6 [transform:translateZ(0)]">
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_12px_2px] shadow-cyan/50" />
                  <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-text-primary">
                    {group.label}
                  </h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-lg border border-line bg-white/[0.02] px-3 py-1.5 text-sm text-text-secondary"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
