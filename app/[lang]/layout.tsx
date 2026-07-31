import type { Metadata, Viewport } from "next";
import { Inter, Geist, Vazirmatn } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { cn } from "@/lib/utils";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { PageTransition } from "@/components/ui/page-transition";
import { I18nProvider } from "@/lib/i18n/context";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  locales,
  isLocale,
  localeDirection,
  localeHtmlLang,
  localeOpenGraph,
  type Locale,
} from "@/lib/i18n/config";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
});

const siteUrl = "https://ramin6032.vercel.app";

/** Pre-render every locale at build time. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const dict = await getDictionary(lang);
  const { meta } = dict;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: meta.title,
      template: meta.titleTemplate,
    },
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: "Ramin Mohagheghi" }],
    creator: "Ramin Mohagheghi",
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        de: "/de",
        fa: "/fa",
      },
    },
    openGraph: {
      type: "website",
      images: "/logo-indigo.svg",
      url: `${siteUrl}/${lang}`,
      title: meta.ogTitle,
      description: meta.ogDescription,
      siteName: "Ramin Mohagheghi — Portfolio",
      locale: localeOpenGraph[lang],
      alternateLocale: locales
        .filter((l) => l !== lang)
        .map((l) => localeOpenGraph[l]),
    },
    twitter: {
      card: "summary_large_image",
      title: meta.ogTitle,
      description: meta.ogDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <html
      lang={localeHtmlLang[locale]}
      dir={localeDirection[locale]}
      className={cn("dark", inter.variable, geist.variable, vazirmatn.variable)}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="bg-void font-sans antialiased">
        <Analytics />
        <SpeedInsights />
        <I18nProvider locale={locale} dict={dict}>
          <PageTransition />
          <ScrollProgress />
          <SmoothScroll>{children}</SmoothScroll>
        </I18nProvider>
      </body>
    </html>
  );
}
