"use client";

import { createContext, useContext } from "react";
import type { Dictionary } from "./types";
import type { Locale } from "./config";

type I18nValue = {
  locale: Locale;
  dict: Dictionary;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <I18nContext.Provider value={{ locale, dict }}>
      {children}
    </I18nContext.Provider>
  );
}

/** Access the full dictionary + active locale from any client component. */
export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return ctx;
}

/** Convenience: just the dictionary. */
export function useDictionary(): Dictionary {
  return useI18n().dict;
}

/** Convenience: just the active locale. */
export function useLocale(): Locale {
  return useI18n().locale;
}
