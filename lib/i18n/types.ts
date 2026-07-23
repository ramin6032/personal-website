/**
 * Dictionary — the shape every locale file must satisfy.
 *
 * This is the contract between the copy (dictionaries/*.ts) and the UI.
 * Locale-invariant data (email, links, tech stack tokens, timeline periods)
 * still lives in `lib/content.ts`; this type covers everything that is
 * actually translated for the reader.
 */

export type Dictionary = {
  meta: {
    title: string;
    titleTemplate: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    keywords: string[];
  };
  nav: {
    links: { href: string; label: string }[];
    cta: string;
  };
  profile: {
    role: string;
    availability: string;
    location: string;
  };
  hero: {
    titleLine1: string;
    titleLine2: string;
    intro: string;
    primaryCta: string;
    secondaryCta: string;
    scrollLabel: string;
    stats: { value: string; label: string }[];
  };
  about: {
    eyebrow: string;
    title: string;
    lede: string;
    paragraphs: string[];
    principles: { title: string; body: string }[];
    focusAreasLabel: string;
    focusAreas: string[];
  };
  skills: {
    eyebrow: string;
    title: string;
    lede: string;
    groups: { label: string; skills: string[] }[];
  };
  experience: {
    eyebrow: string;
    title: string;
    lede: string;
    roles: {
      period: string;
      duration: string;
      role: string;
      org: string;
      type: string;
      location: string;
      summary: string;
      highlights: string[];
    }[];
  };
  process: {
    eyebrow: string;
    title: string;
    steps: { step: string; title: string; body: string }[];
  };
  projects: {
    eyebrow: string;
    title: string;
    lede: string;
    items: {
      name: string;
      period: string;
      tag: string;
      metric: string;
      summary: string;
      highlights: string[];
    }[];
  };
  achievements: {
    eyebrow: string;
    title: string;
    lede: string;
    educationLabel: string;
    certificationsLabel: string;
    items: { title: string; detail: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    lede: string;
    primaryCta: string;
    linkedinCta: string;
  };
  languageSwitcher: {
    label: string;
  };
};
