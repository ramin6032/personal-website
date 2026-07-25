"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { WorkMediaFrame } from "@/components/work/work-media";
import { useI18n } from "@/lib/i18n/context";
import { WORK } from "@/lib/content";
import { ACCENTS, localePath } from "@/lib/work";
import { cn } from "@/lib/utils";

/**
 * WorkCaseStudy — the full /work/[slug] narrative. Renders the shared
 * structure (overview → challenge → role → features → architecture →
 * tech stack → impact) from the translated dictionary entry, themed by the
 * project accent, with the media frame as its hero. Cross-links to the next
 * case study to keep visitors moving through the portfolio.
 */
export function WorkCaseStudy({ slug }: { slug: string }) {
  const { locale, dict } = useI18n();
  const { labels, items } = dict.work;

  const idx = items.findIndex((it) => it.slug === slug);
  if (idx === -1) return null;

  const item = items[idx];
  const meta = WORK[idx];
  const a = ACCENTS[meta.accent];

  const nextIdx = (idx + 1) % items.length;
  const next = items[nextIdx];

  return (
    <article className="relative mx-auto w-full max-w-6xl px-6 pb-28 pt-28 sm:px-10 sm:pt-36 lg:px-16">
      {/* Accent glow anchored to the hero */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]"
        style={{
          background: `radial-gradient(60% 100% at 50% 0%, ${a.from}1f, transparent 70%)`,
        }}
      />

      {/* Back link */}
      <Reveal direction="up">
        <Link
          href={localePath(locale, "/work")}
          className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary"
        >
          <span className="rtl:-scale-x-100" aria-hidden>
            <BackIcon />
          </span>
          {labels.backToWork}
        </Link>
      </Reveal>

      {/* Hero */}
      <header className="mt-8">
        <Reveal
          direction="up"
          delay={0.05}
          className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-text-muted"
        >
          <span>{labels.period}</span>
          <span className="h-px w-6 bg-line" />
          <span className="text-text-secondary">{meta.period}</span>
        </Reveal>

        <Reveal
          direction="up"
          delay={0.08}
          as="h1"
          className="mt-4 font-[family-name:var(--font-geist)] text-3xl font-semibold leading-[1.08] tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
        >
          {item.name}
        </Reveal>

        <Reveal
          direction="up"
          delay={0.12}
          className="mt-5 max-w-3xl text-lg leading-relaxed text-text-secondary"
        >
          {item.tagline}
        </Reveal>

        {/* Metric rail */}
        <Reveal direction="up" delay={0.16}>
          <div className="mt-8 grid grid-cols-3 gap-3 sm:max-w-xl">
            {meta.metrics.map((m) => (
              <div
                key={m.label}
                className="glass rounded-xl p-4 text-center sm:text-start"
              >
                <div className={cn("text-xl font-bold sm:text-2xl", a.text)}>
                  {m.value}
                </div>
                <div className="mt-1 text-xs text-text-muted">{m.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </header>

      {/* Media */}
      <Reveal direction="up" delay={0.2}>
        <div className="mt-14">
          <WorkMediaFrame
            slug={item.slug}
            accent={meta.accent}
            media={meta.media}
            title={item.name}
          />
          {meta.media.length === 0 && (
            <p className="mt-3 text-center text-xs text-text-muted">
              {labels.liveNote}
            </p>
          )}
        </div>
      </Reveal>

      {/* Overview */}
      <Block eyebrow={labels.overview} accent={meta.accent}>
        <p className="max-w-3xl text-base leading-relaxed text-text-secondary sm:text-lg">
          {item.overview}
        </p>
      </Block>

      {/* Challenge */}
      <Block eyebrow={labels.challenge} accent={meta.accent}>
        <p className="max-w-3xl text-base leading-relaxed text-text-secondary">
          {item.challenge.intro}
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {item.challenge.points.map((p) => (
            <li
              key={p}
              className="glass flex gap-3 rounded-xl p-4 text-sm leading-relaxed text-text-secondary"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full"
                style={{ background: a.solid }}
              />
              {p}
            </li>
          ))}
        </ul>
      </Block>

      {/* Role */}
      <Block eyebrow={labels.role} accent={meta.accent}>
        <p className="max-w-3xl text-base leading-relaxed text-text-secondary">
          {item.role.intro}
        </p>
        <p className="mt-6 mb-3 text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
          {labels.role_intro}
        </p>
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {item.role.responsibilities.map((r) => (
            <li
              key={r}
              className="flex gap-2.5 text-sm leading-relaxed text-text-secondary"
            >
              <CheckIcon color={a.solid} />
              {r}
            </li>
          ))}
        </ul>
      </Block>

      {/* Features */}
      <Block eyebrow={labels.features} accent={meta.accent}>
        <div className="grid gap-4 sm:grid-cols-2">
          {item.features.map((group, gi) => (
            <Reveal key={group.title} direction="up" delay={gi * 0.06}>
              <div className="glass h-full rounded-2xl p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 flex-none items-center justify-center rounded-lg text-xs font-bold text-void"
                    style={{
                      background: `linear-gradient(135deg, ${a.from}, ${a.to})`,
                    }}
                  >
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-semibold text-text-primary">
                    {group.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {group.items.map((it) => (
                    <li
                      key={it}
                      className="flex gap-2.5 text-sm leading-relaxed text-text-secondary"
                    >
                      <span
                        className="mt-1.5 h-1 w-1 flex-none rounded-full"
                        style={{ background: a.solid }}
                      />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Block>

      {/* Architecture */}
      <Block eyebrow={labels.architecture} accent={meta.accent}>
        <ol className="max-w-3xl space-y-4">
          {item.architecture.map((point, pi) => (
            <li key={point} className="flex gap-4">
              <span
                className={cn(
                  "flex-none font-[family-name:var(--font-geist)] text-lg font-bold tabular-nums",
                  a.text,
                )}
              >
                {String(pi + 1).padStart(2, "0")}
              </span>
              <p className="pt-0.5 text-sm leading-relaxed text-text-secondary sm:text-base">
                {point}
              </p>
            </li>
          ))}
        </ol>
      </Block>

      {/* Tech stack */}
      <Block eyebrow={labels.techStack} accent={meta.accent}>
        <div className="space-y-5">
          {meta.tech.map((group) => (
            <div
              key={group.label}
              className="flex flex-col gap-3 sm:flex-row sm:items-baseline"
            >
              <span className="w-44 flex-none text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
                {group.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {group.items.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line bg-white/[0.02] px-3 py-1.5 text-sm text-text-secondary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Block>

      {/* Impact */}
      <Block eyebrow={labels.impact} accent={meta.accent}>
        <ul className="grid gap-3 sm:grid-cols-2">
          {item.impact.map((point) => (
            <li
              key={point}
              className="relative overflow-hidden rounded-2xl border border-line p-5"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                  background: `linear-gradient(135deg, ${a.from}, ${a.to})`,
                }}
              />
              <p className="relative text-sm leading-relaxed text-text-secondary sm:text-base">
                {point}
              </p>
            </li>
          ))}
        </ul>
      </Block>

      {/* Next case study */}
      <div className="mt-24 border-t border-line pt-10">
        <Link
          href={localePath(locale, `/work/${next.slug}`)}
          className="group flex flex-col gap-2"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-text-muted">
            {labels.nextProject}
          </span>
          <span className="flex items-center justify-between gap-4">
            <span className="text-xl font-semibold text-text-primary transition-colors duration-200 group-hover:text-text-secondary sm:text-2xl">
              {next.name}
            </span>
            <span
              className={cn(
                "flex-none transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1",
                ACCENTS[WORK[nextIdx].accent].text,
              )}
              aria-hidden
            >
              <ArrowIcon />
            </span>
          </span>
        </Link>
      </div>
    </article>
  );
}

/** Section block with a consistent accented eyebrow. */
function Block({
  eyebrow,
  accent,
  children,
}: {
  eyebrow: string;
  accent: keyof typeof ACCENTS;
  children: React.ReactNode;
}) {
  const a = ACCENTS[accent];
  return (
    <section className="mt-16 sm:mt-20">
      <Reveal
        direction="up"
        className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em]"
      >
        <span
          className="h-px w-8"
          style={{
            background: `linear-gradient(90deg, ${a.solid}, transparent)`,
          }}
        />
        <span className={a.text}>{eyebrow}</span>
      </Reveal>
      <Reveal direction="up" delay={0.05}>
        {children}
      </Reveal>
    </section>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 flex-none"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="rtl:-scale-x-100"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}
