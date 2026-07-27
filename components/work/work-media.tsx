"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { WorkVisual } from "@/components/work/work-visual";
import { ACCENTS } from "@/lib/work";
import type { WorkAccent, WorkMedia } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * WorkMediaFrame — the primary showcase for a case study. When the project
 * has real media (screenshots / video) it renders them in a browser-style
 * frame with a thumbnail rail; otherwise it falls back to the generated
 * `WorkVisual`, so every case study has a compelling hero regardless of
 * available assets. Media assets are optional per the `WORK.media` array.
 */
export function WorkMediaFrame({
  slug,
  accent,
  media,
  title,
}: {
  slug: string;
  accent: WorkAccent;
  media: readonly WorkMedia[];
  title: string;
}) {
  const a = ACCENTS[accent];
  const [active, setActive] = useState(0);

  // No real assets → generated signature visual.
  if (media.length === 0) {
    return (
      <div className="relative">
        <div
          className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl opacity-50 blur-2xl"
          style={{
            background: `radial-gradient(60% 60% at 50% 0%, ${a.from}33, transparent 70%)`,
          }}
        />
        <WorkVisual slug={slug} accent={accent} />
      </div>
    );
  }

  const current = media[active];

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl opacity-50 blur-2xl"
        style={{
          background: `radial-gradient(60% 60% at 50% 0%, ${a.from}33, transparent 70%)`,
        }}
      />

      {/* Main frame */}
      <div className="overflow-hidden rounded-xl border border-line bg-ink">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative aspect-[16/10] w-full bg-void"
        >
          {current.type === "image" ? (
            <Image
              src={current.src}
              alt={current.alt ?? title}
              fill
              className="object-cover"
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 60vw"
              quality={90}
            />
          ) : (
            <video
              src={current.src}
              poster={current.poster}
              controls
              playsInline
              className="h-full w-full object-cover"
            />
          )}
        </motion.div>
      </div>

      {/* Thumbnail rail */}
      {media.length > 1 && (
        <div className="mt-3 flex gap-2">
          {media.map((m, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View media ${i + 1}`}
              className={cn(
                "relative aspect-[16/10] flex-1 overflow-hidden rounded-md border transition-all duration-200",
                i === active
                  ? "border-white/40 opacity-100"
                  : "border-line opacity-50 hover:opacity-80",
              )}
            >
              {m.type === "image" ? (
                <Image
                  src={m.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-graphite">
                  <PlayIcon />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PlayIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
