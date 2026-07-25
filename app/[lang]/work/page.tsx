import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { WorkIndex } from "@/components/work/work-index";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const dict = await getDictionary(lang);
  const { index } = dict.work;

  return {
    title: index.title,
    description: index.lede,
    alternates: { canonical: `/${lang}/work` },
    openGraph: {
      title: `${index.title} · Ramin Mohagheghi`,
      description: index.lede,
      url: `/${lang}/work`,
    },
  };
}

/** /work — the case-study index. */
export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main>
        <WorkIndex />
      </main>
    </>
  );
}
