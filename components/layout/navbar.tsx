"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/magnetic";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { PROFILE } from "@/lib/content";
import { useDictionary } from "@/lib/i18n/context";
import Image from "next/image";

export function Navbar() {
  const { nav } = useDictionary();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg  text-xs font-bold  ">
            <Image src={"./logo-indigo.svg"} fill alt="logo" />
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
              href="#contact"
              className="hidden rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-text-primary ring-1 ring-inset ring-white/15 transition-colors duration-200 hover:bg-white/15 sm:inline-block"
            >
              {nav.cta}
            </a>
          </Magnetic>
        </div>
      </nav>
    </motion.header>
  );
}
