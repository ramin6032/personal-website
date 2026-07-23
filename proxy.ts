import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  locales,
  defaultLocale,
  isLocale,
  type Locale,
} from "@/lib/i18n/config";

const LOCALE_COOKIE = "NEXT_LOCALE";

/**
 * Parse an `Accept-Language` header into an ordered list of language tags,
 * highest quality first. Dependency-free so it runs cleanly at the edge.
 */
function parseAcceptLanguage(header: string): string[] {
  return header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .filter((entry) => entry.tag)
    .sort((a, b) => b.q - a.q)
    .map((entry) => entry.tag);
}

/** Pick the best supported locale from a cookie, then the header, then default. */
function resolveLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && isLocale(cookieLocale)) return cookieLocale;

  const header = request.headers.get("accept-language");
  if (header) {
    for (const tag of parseAcceptLanguage(header)) {
      const base = tag.split("-")[0];
      const match = locales.find((l) => l === tag || l === base);
      if (match) return match;
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Does the path already start with a supported locale?
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (pathnameHasLocale) return NextResponse.next();

  // No locale in the path — redirect to the best-matching locale.
  const locale = resolveLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(url);
  // Remember the choice so subsequent visits skip detection.
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  // Run on everything except Next internals, API routes and static assets.
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json)$).*)",
  ],
};
