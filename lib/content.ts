/**
 * content.ts — single source of truth for all portfolio copy.
 *
 * Sourced from Ramin Mohagheghi's real career data. Where LinkedIn did not
 * provide an explicit metric, copy is written to stay truthful to the role
 * and scope (never inventing employers, dates, degrees or credentials).
 *
 * Fields marked with `// REVIEW:` are professional drafts that should be
 * confirmed or corrected by Ramin before publishing.
 */

export const PROFILE = {
  name: "Ramin Mohagheghi",
  firstName: "Ramin",
  role: "Frontend Software Engineer",
  headline: "Frontend Engineer — React · Next.js · TypeScript",
  // Short positioning line for the hero.
  tagline:
    "I architect enterprise web platforms that stay fast, reliable and a pleasure to maintain.",
  location: "Isfahan, Iran · Open to remote / relocation",
  availability: "Open to remote & international Opportunities",
  // REVIEW: confirm these are the addresses/handles you want public.
  email: "ramin6032@gmail.com", // REVIEW: replace with your real contact email
  linkedin: "https://www.linkedin.com/in/ramin6032/",
  github: "https://github.com/ramin6032", // REVIEW: add your GitHub URL
  phone: "+98 913 974 1665",
  whatsapp: {
    phone: "989139741665",
    text: "Hi Ramin, I saw your portfolio and I want to work with you.",
    api: "https://api.whatsapp.com/send/",
    type: "phone_number",
    app_absent: "0",
  },
  cv: {
    en: "/cv/cv-en.pdf",
    fa: "/cv/cv-fa.pdf",
  },
} as const;

/** Tech ticker under the hero. */
export const STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "PWA",
  "Docker",
] as const;

/* ------------------------------------------------------------------ *
 * WORK — locale-invariant case-study metadata.
 *
 * The translated narrative (overview, challenge, role, features…) lives in
 * the dictionaries under `work.items`, matched to these entries by `slug`.
 * Everything here is language-neutral: slugs, periods, tech tokens, metric
 * values, accent theming and optional media. Keep this array in the same
 * order as `projects.items` / `work.items` in every dictionary.
 * ------------------------------------------------------------------ */

export type WorkMedia =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string };

export const WORK = [
  {
    slug: "isp-customer-self-service",
    /** Theme accent — maps to a gradient in the case-study UI. */
    accent: "electric",
    period: "May 2025 – Sep 2025",
    /** Headline numbers shown in the case-study hero + impact rail. */
    metrics: [
      { value: "18K+", label: "Active subscribers" },
      { value: "1", label: "Unified platform" },
      { value: "PWA", label: "App-like delivery" },
    ],
    /** Grouped tech — category headings stay in English (technical terms). */
    tech: [
      {
        label: "Frontend",
        items: [
          "Next.js",
          "React",
          "TypeScript",
          "React Query",
          "Redux",
          "Ant Design",
          "Tailwind CSS",
        ],
      },
      { label: "Backend & Integration", items: ["Node.js", "REST APIs"] },
      { label: "Infrastructure", items: ["Docker", "GitHub Actions"] },
      { label: "PWA", items: ["Workbox", "Web Push API"] },
    ],
    /** Real screenshots/video go here; empty → a generated signature visual. */
    media: [
      {
        type: "image",
        src: "/projects/sale-platform/main.png",
        alt: "ISP Customer Self-Service Platform",
      },
      {
        type: "image",
        src: "/projects/sale-platform/desk-light.png",
        alt: "ISP Customer Self-Service Platform",
      },
      {
        type: "image",
        src: "/projects/sale-platform/desk-dark.png",
        alt: "ISP Customer Self-Service Platform",
      },
      {
        type: "image",
        src: "/projects/sale-platform/phone-home.png",
        alt: "ISP Customer Self-Service Platform",
      },
      {
        type: "image",
        src: "/projects/sale-platform/sale.png",
        alt: "ISP Customer Self-Service Platform",
      },
      {
        type: "image",
        src: "/projects/sale-platform/club.png",
        alt: "ISP Customer Self-Service Platform",
      },
      {
        type: "image",
        src: "/projects/sale-platform/report.png",
        alt: "ISP Customer Self-Service Platform",
      },
    ] as WorkMedia[],
  },
  {
    slug: "enterprise-operations-automation",
    accent: "cyan",
    period: "Oct 2024 – Dec 2024",
    metrics: [
      { value: "Rule engine", label: "Policy validation" },
      { value: "Auto", label: "Incident workflows" },
      { value: "24/7", label: "Operational monitoring" },
    ],
    tech: [
      {
        label: "Frontend",
        items: [
          "Next.js",
          "React",
          "TypeScript",
          "React Query",
          "Tailwind CSS",
        ],
      },
      { label: "Backend & Integration", items: ["Node.js", "REST APIs"] },
      { label: "Infrastructure", items: ["Docker", "GitHub Actions"] },
      { label: "Database", items: ["MySql"] },
    ],
    media: [] as WorkMedia[],
  },
  {
    slug: "financial-tax-integration",
    accent: "violet",
    period: "Feb 2024 – Apr 2024",
    metrics: [
      { value: "National", label: "Tax integration" },
      { value: "End-to-end", label: "Transaction tracking" },
      { value: "Retry", label: "Failure recovery" },
    ],
    tech: [
      {
        label: "Frontend",
        items: ["Next.js", "React", "TypeScript", "React Query"],
      },
      { label: "Backend & Integration", items: ["Node.js", "REST APIs"] },
      { label: "Infrastructure", items: ["Docker", "GitHub Actions"] },
      { label: "Database", items: ["MySql"] },
    ],
    media: [] as WorkMedia[],
  },
  {
    slug: "greenhouse-erp",
    accent: "glow",
    period: "Jan 2021 – May 2021",
    metrics: [
      { value: "End-to-end", label: "Ownership" },
      { value: "5", label: "Integrated modules" },
      { value: "Custom", label: "ERP architecture" },
    ],
    tech: [
      { label: "Frontend", items: ["Jquery", "JavaScript", "Bootstrap"] },
      { label: "Backend & Integration", items: ["PHP", "MySql"] },
      { label: "Database", items: ["MySql"] },
    ],
    media: [] as WorkMedia[],
  },
] as const;

export type WorkAccent = (typeof WORK)[number]["accent"];

/* ------------------------------------------------------------------ *
 * EDUCATION / CERTIFICATIONS / ACHIEVEMENTS
 * Not provided in the source data — left empty so nothing is fabricated.
 * Populate these and the matching sections will render automatically.
 * ------------------------------------------------------------------ */

export const EDUCATION: {
  degree: string;
  institution: string;
  period: string;
  detail?: string;
}[] = [
  // REVIEW: add your degree(s), e.g.
  // { degree: "B.Sc. Computer Engineering", institution: "…", period: "20XX — 20XX" },
];

export const CERTIFICATIONS: {
  name: string;
  issuer: string;
  year: string;
}[] = [
  // REVIEW: add certifications, e.g.
  // { name: "…", issuer: "…", year: "20XX" },
];

export const ACHIEVEMENTS: { title: string; detail: string }[] = [
  {
    title: "18,000+ active users",
    detail:
      "Shipped a customer self-service platform that serves a live subscriber base of 18K+.",
  },
  {
    title: "National tax integration",
    detail:
      "Delivered a financial platform integrated directly with Iran's National Tax System.",
  },
  {
    title: "6 years, one company",
    detail:
      "Sustained ownership of business-critical platforms from architecture through deployment.",
  },
];
