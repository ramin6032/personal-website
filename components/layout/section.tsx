import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import type { ReactNode } from "react";
import { useLocale } from "@/lib/i18n/context";
import ScrollFloat from "../ui/ScrollFloat";

/**
 * Section — consistent section shell so every block opens with the same
 * storytelling rhythm: a small numbered eyebrow, an animated heading that
 * masks in word-by-word, and an optional lede that fades up just after.
 * Keeps vertical rhythm and max-widths uniform across the page.
 */
export function Section({
  id,
  index,
  eyebrow,
  title,
  lede,
  children,
  className,
}: {
  id: string;
  index?: string;
  eyebrow: string;
  title: string;
  lede?: string;
  children?: ReactNode;
  className?: string;
}) {
  const locale = useLocale();
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto w-full max-w-7xl scroll-mt-28 px-6 py-24 sm:px-10 sm:py-32 lg:px-16",
        className,
      )}
    >
      <header className="mb-14 max-w-3xl">
        <Reveal
          direction="up"
          className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-cyan"
        >
          {index && <span className="text-text-muted">{index}</span>}
          <span className="h-px w-8 bg-linear-to-r from-cyan to-transparent" />
          {eyebrow}
        </Reveal>

        {locale === "fa" ? (
          <Reveal
            direction={"left"}
            className="font-(family-name:--font-geist) text-3xl font-semibold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
          >
            {title}
          </Reveal>
        ) : (
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            {title}
          </ScrollFloat>
        )}

        {lede && (
          <Reveal
            direction="up"
            delay={0.1}
            className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            {lede}
          </Reveal>
        )}
      </header>

      {children}
    </section>
  );
}
