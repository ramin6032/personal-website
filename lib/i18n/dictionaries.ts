import "server-only";
import type { Dictionary } from "./types";
import type { Locale } from "./config";

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((m) => m.default),
  de: () => import("./dictionaries/de").then((m) => m.default),
  fa: () => import("./dictionaries/fa").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}
