"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { WorkVisual } from "@/components/work/work-visual";
import { useI18n } from "@/lib/i18n/context";
import { WORK } from "@/lib/content";
import { ACCENTS, localePath } from "@/lib/work";
import { cn } from "@/lib/utils";
import Image from "next/image";

/**
 * WorkIndex — the /work landing grid. Each project is a large, interactive
 * card pairing its generated signature visual (or first real screenshot)
 * with the translated tagline and metric chips, linking through to the full
 * case study. Order mirrors `WORK` / `dict.work.items`.
 */
export function WorkIndex() {
  const { locale, dict } = useI18n();
  const { index, items } = dict.work;

  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 pb-28 pt-32 sm:px-10 sm:pt-40 lg:px-16">
      {/* Ambient background */}
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.04]" />

      <header className="mb-16 max-w-3xl">
        <Reveal
          direction="up"
          className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-cyan"
        >
          <span className="h-px w-8 bg-linear-to-r from-cyan to-transparent" />
          {index.eyebrow}
        </Reveal>
        <Reveal
          direction="up"
          delay={0.05}
          as="h1"
          className="font-(family-name:--font-geist) text-4xl font-semibold leading-[1.05] tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
        >
          {index.title}
        </Reveal>
        <Reveal
          direction="up"
          delay={0.1}
          className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg"
        >
          {index.lede}
        </Reveal>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {items.map((item, i) => {
          const meta = WORK[i];
          const a = ACCENTS[meta.accent];
          return (
            <Reveal key={item.slug} direction="up" delay={i * 0.08}>
              <Link
                href={localePath(locale, `/work/${item.slug}`)}
                className="group block h-full"
              >
                <TiltCard className="h-full rounded-2xl" max={5}>
                  <article className="glass relative flex h-full flex-col overflow-hidden rounded-2xl p-5 transform-[translateZ(0)]">
                    {/* Visual */}
                    <div className="mb-6 overflow-hidden rounded-xl">
                      <div className="transition-transform relative duration-700 ease-out group-hover:scale-[1.03] aspect-16/10">
                        {meta.media.length > 0 &&
                        meta.media[0].type === "image" ? (
                          <Image
                            src={meta.media[0].src}
                            alt={item.name}
                            className=" w-full rounded-xl border border-line object-cover"
                            loading="eager"
                            fill
                          />
                        ) : (
                          <WorkVisual slug={item.slug} accent={meta.accent} />
                        )}
                      </div>
                    </div>

                    {/* Metric chips */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {meta.metrics.map((m) => (
                        <span
                          key={m.label}
                          className="rounded-full border border-line px-3 py-1 text-xs text-text-secondary"
                        >
                          <span
                            className={cn("font-semibold", a.text)}
                          >{`${m.value} `}</span>
                          {m.label}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-xl font-semibold leading-snug text-text-primary sm:text-2xl">
                      {item.name}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      {item.tagline}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-sm font-medium">
                      <span
                        className={cn(
                          "bg-linear-to-r bg-clip-text text-transparent",
                          a.gradient,
                        )}
                      >
                        {index.viewLabel}
                      </span>
                      <span
                        className={cn(
                          "transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1",
                          a.text,
                        )}
                        aria-hidden
                      >
                        <ArrowIcon />
                      </span>
                    </div>
                  </article>
                </TiltCard>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function ArrowIcon() {
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
      className="rtl:-scale-x-100"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
