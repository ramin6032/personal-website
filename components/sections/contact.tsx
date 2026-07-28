"use client";

import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { AmbientBackground } from "@/components/background/ambient-background";
import { PROFILE } from "@/lib/content";
import { useDictionary, useLocale } from "@/lib/i18n/context";
import ScrollFloat from "../ui/ScrollFloat";

/**
 * Contact — the closing beat. A centered, high-contrast call to action set
 * against its own ambient backdrop, with a magnetic primary button so the
 * final interaction feels as considered as the first.
 */
export function Contact() {
  const { contact } = useDictionary();
  const locale = useLocale();
  return (
    <section
      id="contact"
      className="relative scroll-mt-28 overflow-hidden px-6 py-32 sm:px-10 sm:py-40 lg:px-16"
    >
      <AmbientBackground aurora grid={false} />

      <div className="mx-auto max-w-3xl text-center">
        <Reveal
          direction="up"
          className="mb-4 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-cyan"
        >
          <span className="h-px w-8 bg-linear-to-r from-transparent to-cyan" />
          {contact.eyebrow}
          <span className="h-px w-8 bg-linear-to-r from-cyan to-transparent" />
        </Reveal>

        {locale ? (
          <Reveal
            direction={"down"}
            className="font-(family-name:--font-geist) text-3xl font-semibold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
          >
            {contact.title}
          </Reveal>
        ) : (
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            {contact.title}
          </ScrollFloat>
        )}

        <Reveal
          direction="up"
          delay={0.1}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
        >
          {contact.lede}
        </Reveal>

        <Reveal
          direction="up"
          delay={0.2}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Magnetic strength={0.4}>
            <a
              href={`mailto:${PROFILE.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-8 py-4 text-sm font-semibold text-text-primary transition-colors duration-300 hover:border-white/25 hover:bg-white/5"
            >
              <MailIcon /> {contact.primaryCta}
            </a>
          </Magnetic>

          <Magnetic strength={0.4}>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-8 py-4 text-sm font-semibold text-text-primary transition-colors duration-300 hover:border-white/25 hover:bg-white/5"
            >
              <LinkdinIcon /> {contact.linkedinCta}
            </a>
          </Magnetic>

          <Magnetic strength={0.4}>
            <a
              href={`${PROFILE.whatsapp.api}?${new URLSearchParams({
                phone: PROFILE.whatsapp.phone,
                text: PROFILE.whatsapp.text,
                type: PROFILE.whatsapp.type,
                app_absent: PROFILE.whatsapp.app_absent,
              })}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-8 py-4 text-sm font-semibold text-text-primary transition-colors duration-300 hover:border-white/25 hover:bg-white/5"
            >
              <WhatsappIcon /> {contact.whatsapp}
            </a>
          </Magnetic>
        </Reveal>

        <Reveal direction="up" delay={0.3} className="mt-8">
          <p className="text-center! text-sm text-text-muted">
            {PROFILE.location}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function WhatsappIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="m3 21l1.65-3.8a9 9 0 1 1 3.4 2.9z" />
        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0za5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
      </g>
    </svg>
  );
}

function LinkdinIcon() {
  return (
    <svg
      stroke="#FAFAFA"
      fill="#FAFAFA"
      strokeWidth="0px"
      viewBox="0 0 448 512"
      height="32"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
        stroke="#FAFAFA"
        fill="#FAFAFA"
        strokeWidth="0px"
      ></path>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 14H4V8l8 5l8-5zm-8-7L4 6h16z"
      />
    </svg>
  );
}
