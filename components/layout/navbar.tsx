"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/magnetic";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useDictionary } from "@/lib/i18n/context";
import Image from "next/image";
import { PROFILE } from "@/lib/content";

export function Navbar() {
  const { nav } = useDictionary();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6",
          scrolled
            ? "glass shadow-lg shadow-black/30"
            : "border border-transparent bg-transparent",
        )}
      >
        <a
          href="#"
          className="group flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold">
            <Image src={"./logo-indigo.svg"} fill alt="logo" loading="eager" />
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative rounded-full px-4 py-2 text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Magnetic strength={0.35}>
            <a
              href={PROFILE.cv.en}
              download="Ramin-Mohagheghi-CV.pdf"
              className="hidden rounded-full bg-white/10 px-5 py-2 text-sm text-text-primary ring-1 ring-inset ring-white/15 transition-colors duration-200 hover:bg-white/15 sm:inline-block sm:rtl:hidden"
            >
              CV DOWNLOAD
            </a>
            <a
              href={PROFILE.cv.fa}
              download="Ramin-Mohagheghi-CV.pdf"
              className="hidden rounded-full bg-white/10 px-5 py-2 text-sm text-text-primary ring-1 ring-inset ring-white/15 transition-colors duration-200 hover:bg-white/15 sm:inline-block sm:ltr:hidden"
            >
              دانلود رزومه
            </a>
          </Magnetic>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="ml-1 flex items-center justify-center rounded-lg p-2 text-text-secondary transition-colors duration-200 hover:text-text-primary md:hidden"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-4 right-4 mt-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col p-2">
              {nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-sm text-text-secondary transition-colors duration-200 hover:bg-white/10 hover:text-text-primary"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-2">
                <a
                  href={PROFILE.cv.en}
                  download="Ramin-Mohagheghi-CV.pdf"
                  className="rounded-full bg-white/10 px-5 py-2.5 text-center text-sm text-text-primary ring-1 ring-inset ring-white/15 transition-colors duration-200 hover:bg-white/15 rtl:hidden"
                >
                  CV DOWNLOAD
                </a>
                <a
                  href={PROFILE.cv.fa}
                  download="Ramin-Mohagheghi-CV.pdf"
                  className="rounded-full bg-white/10 px-5 py-2.5 text-center text-sm text-text-primary ring-1 ring-inset ring-white/15 transition-colors duration-200 hover:bg-white/15 ltr:hidden"
                >
                  دانلود رزومه
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function MenuIcon() {
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
      aria-hidden
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
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
      aria-hidden
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
