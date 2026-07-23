"use client";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { EDUCATION, CERTIFICATIONS } from "@/lib/content";
import { useDictionary } from "@/lib/i18n/context";

/**
 * Achievements — a compact "proof" band summarising standout outcomes, plus
 * optional Education and Certifications columns. Education and Certifications
 * render only when data exists, so the section never shows empty scaffolding.
 */
export function Achievements() {
  const { achievements } = useDictionary();
  const hasEducation = EDUCATION.length > 0;
  const hasCerts = CERTIFICATIONS.length > 0;

  return (
    <Section
      id="achievements"
      index="06"
      eyebrow={achievements.eyebrow}
      title={achievements.title}
      lede={achievements.lede}
    >
      {/* Achievements grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {achievements.items.map((item, i) => (
          <Reveal key={item.title} direction="up" delay={i * 0.08}>
            <div className="glass relative h-full overflow-hidden rounded-2xl p-6">
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan/10 blur-3xl" />
              <p className="font-[family-name:var(--font-geist)] text-lg font-semibold text-gradient">
                {item.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {item.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Education & Certifications (only if provided) */}
      {(hasEducation || hasCerts) && (
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {hasEducation && (
            <Reveal direction="up">
              <div className="glass h-full rounded-2xl p-6">
                <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-cyan">
                  {achievements.educationLabel}
                </p>
                <ul className="space-y-4">
                  {EDUCATION.map((e) => (
                    <li key={`${e.degree}-${e.institution}`}>
                      <p className="text-base font-semibold text-text-primary">
                        {e.degree}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {e.institution} · {e.period}
                      </p>
                      {e.detail && (
                        <p className="mt-1 text-sm text-text-muted">
                          {e.detail}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {hasCerts && (
            <Reveal direction="up" delay={0.08}>
              <div className="glass h-full rounded-2xl p-6">
                <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-cyan">
                  {achievements.certificationsLabel}
                </p>
                <ul className="space-y-4">
                  {CERTIFICATIONS.map((c) => (
                    <li
                      key={`${c.name}-${c.issuer}`}
                      className="flex items-baseline justify-between gap-4"
                    >
                      <span>
                        <span className="block text-base font-semibold text-text-primary">
                          {c.name}
                        </span>
                        <span className="text-sm text-text-secondary">
                          {c.issuer}
                        </span>
                      </span>
                      <span className="flex-none text-sm text-text-muted">
                        {c.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      )}
    </Section>
  );
}
