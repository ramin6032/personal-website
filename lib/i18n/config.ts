/**
 * i18n config — the single source of truth for supported locales.
 *
 * Kept dependency-free and free of `server-only` so it can be imported from
 * the proxy (edge), server components and client components alike.
 */

export const locales = ["en", "de", "fa"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Text direction per locale — Persian renders right-to-left. */
export const localeDirection: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  de: "ltr",
  fa: "rtl",
};

/** Human-readable names, shown in their own language in the switcher. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  fa: "فارسی",
};

/** Short labels for the compact switcher trigger. */
export const localeShortNames: Record<Locale, string> = {
  en: "EN",
  de: "DE",
  fa: "FA",
};

/** BCP-47 / OpenGraph locale codes for <html lang> and metadata. */
export const localeHtmlLang: Record<Locale, string> = {
  en: "en",
  de: "de",
  fa: "fa",
};

export const localeOpenGraph: Record<Locale, string> = {
  en: "en_GB",
  de: "de_DE",
  fa: "fa_IR",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
