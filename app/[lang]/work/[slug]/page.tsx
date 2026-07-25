import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { WorkCaseStudy } from "@/components/work/work-case-study";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, locales } from "@/lib/i18n/config";
import { WORK } from "@/lib/content";

/** Pre-render every locale × case-study combination at build time. */
export function generateStaticParams() {
  return locales.flatMap((lang) => WORK.map((w) => ({ lang, slug: w.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};

  const dict = await getDictionary(lang);
  const item = dict.work.items.find((it) => it.slug === slug);
  if (!item) return {};

  return {
    title: item.name,
    description: item.tagline,
    alternates: { canonical: `/${lang}/work/${slug}` },
    openGraph: {
      title: `${item.name} · Ramin Mohagheghi`,
      description: item.tagline,
      url: `/${lang}/work/${slug}`,
    },
  };
}

/** /work/[slug] — a single case study. */
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { slug } = await params;

  // Guard against slugs that don't exist in the metadata.
  if (!WORK.some((w) => w.slug === slug)) notFound();

  return (
    <>
      <Navbar />
      <main>
        <WorkCaseStudy slug={slug} />
      </main>
    </>
  );
}
