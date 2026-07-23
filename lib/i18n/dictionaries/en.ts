import type { Dictionary } from "../types";

const en: Dictionary = {
  meta: {
    title: "Ramin Mohagheghi — Frontend Software Engineer",
    titleTemplate: "%s · Ramin Mohagheghi",
    description:
      "Frontend Software Engineer with 6+ years building enterprise web platforms in React, Next.js and TypeScript — from customer self-service to financial and operational systems used by thousands. Open to remote & international roles.",
    ogTitle: "Ramin Mohagheghi — Frontend Software Engineer",
    ogDescription:
      "6+ years building enterprise web platforms in React, Next.js and TypeScript. Fast, reliable products used by thousands.",
    keywords: [
      "Frontend Engineer",
      "Frontend Software Engineer",
      "React Developer",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Enterprise Frontend Architecture",
      "PWA",
      "Ramin Mohagheghi",
      "Portfolio",
    ],
  },
  nav: {
    links: [
      { href: "#about", label: "About" },
      { href: "#skills", label: "Skills" },
      { href: "#experience", label: "Experience" },
      { href: "#projects", label: "Work" },
      { href: "#contact", label: "Contact" },
    ],
    cta: "Let's talk",
  },
  profile: {
    role: "Frontend Software Engineer",
    availability: "Open to remote & international frontend roles",
    location: "Isfahan, Iran · Open to remote / relocation",
  },
  hero: {
    titleLine1: "Frontend Software",
    titleLine2: "Engineer & Architect",
    intro:
      "I'm Ramin — I build enterprise web platforms with React, Next.js and TypeScript. Six years turning complex business problems into fast, reliable products used by thousands.",
    primaryCta: "View selected work",
    secondaryCta: "Get in touch",
    scrollLabel: "Scroll to content",
    stats: [
      { value: "6+", label: "Years engineering" },
      { value: "18K+", label: "Users served" },
      { value: "5+", label: "Enterprise platforms" },
    ],
  },
  about: {
    eyebrow: "About",
    title: "I turn complex business problems into clean, durable software",
    lede: "Frontend Software Engineer with 6+ years designing and building enterprise web applications — from customer self-service platforms to financial and operational systems used by thousands.",
    paragraphs: [
      "My core is Next.js, React and TypeScript, where I focus on scalable, high-performance architecture with a long view on maintainability. I've built business-critical platforms across customer self-service, enterprise operations, financial transaction processing, workflow automation and tax integration.",
      "Although frontend is my home, I work comfortably across the backend with Node.js — designing REST APIs, integrating external services, automating workflows and shipping CI/CD pipelines with GitHub Actions and Docker. That full-stack perspective lets me design frontends that align naturally with backend capabilities and real business requirements.",
    ],
    principles: [
      {
        title: "Enterprise frontend architecture",
        body: "Scalable, typed, SSR-ready React systems designed to grow with the business rather than fight it.",
      },
      {
        title: "Built for real operations",
        body: "Platforms that support live business processes and thousands of users — reliability and clean system design are non-negotiable.",
      },
      {
        title: "Engineer-friendly by design",
        body: "Maintainable code and strong developer experience, so the product stays enjoyable to build on long after launch.",
      },
    ],
    focusAreasLabel: "Focus areas",
    focusAreas: [
      "Enterprise Frontend Architecture",
      "Large-Scale React Applications",
      "Complex Business Workflows",
      "Financial & Operational Systems",
      "Performance Optimization",
      "Progressive Web Apps (PWA)",
      "System Design",
      "Developer Experience",
    ],
  },
  skills: {
    eyebrow: "Skills",
    title: "A toolkit built for enterprise-scale frontends",
    lede: "Depth in the modern React ecosystem, extended with the backend and platform skills needed to ship complete, reliable products.",
    groups: [
      {
        label: "Core Frontend",
        skills: [
          "React",
          "Next.js",
          "TypeScript",
          "JavaScript (ES2023+)",
          "SSR & PWA",
        ],
      },
      {
        label: "UI & Experience",
        skills: [
          "Design Systems",
          "Accessibility",
          "Motion / GSAP",
          "Responsive UI",
          "Performance",
        ],
      },
      {
        label: "Backend & APIs",
        skills: [
          "Node.js",
          "REST APIs",
          "Authentication",
          "External Integrations",
          "Logging",
        ],
      },
      {
        label: "Platform & DevOps",
        skills: ["GitHub Actions", "Docker", "CI/CD", "Containerized Deploys"],
      },
      {
        label: "Engineering",
        skills: [
          "System Design",
          "Frontend Architecture",
          "Workflow Automation",
          "Maintainability",
        ],
      },
    ],
  },
  experience: {
    eyebrow: "Experience",
    title: "Six years shipping business-critical platforms",
    lede: "Deep ownership of enterprise web applications — from architecture through deployment — for a provider serving thousands of subscribers.",
    roles: [
      {
        period: "Apr 2020 — Mar 2026",
        duration: "6 yrs",
        role: "Frontend Software Engineer",
        org: "Kashan Persia System",
        type: "Full-time · On-site",
        location: "Isfahan Province, Iran",
        summary:
          "Designed and developed enterprise web applications across customer-facing and internal operations for an ISP delivering broadband and enterprise solutions to thousands of subscribers.",
        highlights: [
          "Built a customer self-service platform serving 18,000+ active subscribers — digital sales, service renewals, support and engagement.",
          "Designed enterprise frontend architectures with Next.js, React and TypeScript, using SSR and PWA capabilities.",
          "Developed a complete Web Push Notification platform with subscription management, delivery tracking, reporting and engagement analytics.",
          "Built financial transaction systems integrated with national tax infrastructure — automated submission, tracking and failure recovery.",
          "Designed workflow-driven apps for operational monitoring, incident management and cross-team collaboration.",
          "Built internal business platforms spanning CRM, field operations, inventory, logistics and reporting.",
          "Collaborated on Node.js backend services — REST APIs, authentication, logging and external integrations.",
          "Implemented CI/CD with GitHub Actions and containerized deployments with Docker.",
        ],
      },
    ],
  },
  process: {
    eyebrow: "How I work",
    title: "From idea to shipped, deliberately",
    steps: [
      {
        step: "01",
        title: "Understand the business",
        body: "Start from the operational reality and the users. Pin down the workflows and constraints that actually matter before designing a system.",
      },
      {
        step: "02",
        title: "Architect for scale",
        body: "Design typed, composable frontends with SSR/PWA where it counts — structured to grow with the product, not against it.",
      },
      {
        step: "03",
        title: "Engineer the details",
        body: "Motion, accessibility, performance and edge cases. Build backend integrations that align cleanly with the frontend architecture.",
      },
      {
        step: "04",
        title: "Ship & automate",
        body: "Containerized deploys and CI/CD with GitHub Actions and Docker, then monitor and iterate. Reliability is a habit, not a checklist.",
      },
    ],
  },
  projects: {
    eyebrow: "Selected work",
    title: "Platforms built for real operations",
    lede: "Enterprise systems where thoughtful frontend architecture supported live business processes and thousands of users.",
    items: [
      {
        name: "ISP Customer Self-Service Platform",
        period: "May 2025 – Sep 2025",
        tag: "Next.js · SSR · PWA",
        metric: "18K+ users",
        summary:
          "A unified web application for digital sales, service renewals, customer support and engagement.",
        highlights: [
          "Built scalable SSR/PWA architecture with Next.js and React.",
          "Developed self-service workflows for purchases, renewals, support and reporting.",
          "Implemented a Web Push Notification platform with delivery tracking and analytics.",
          "Shipped engagement features: loyalty programs, surveys, campaigns and recommendations.",
        ],
      },
      {
        name: "Enterprise Operations & Compliance Platform",
        period: "Oct 2024 – Dec 2024",
        tag: "Workflow Automation",
        metric: "Rule engine",
        summary:
          "Automated operational monitoring, compliance validation, incident management and workflow automation across financial and technical departments.",
        highlights: [
          "Built a rule engine monitoring operational and financial data against business policies.",
          "Developed automated financial reconciliation to detect transaction discrepancies.",
          "Designed an incident system that auto-initiated workflows on detected anomalies.",
          "Built a field operations app: provisioning, fault management, surveys and voice reports.",
        ],
      },
      {
        name: "Financial Transaction & Tax Integration Platform",
        period: "Feb 2024 – Apr 2024",
        tag: "Fintech · Integration",
        metric: "National tax",
        summary:
          "Automated submission, tracking and lifecycle management of financial transactions integrated with Iran's National Tax System (Samaneh Moadian).",
        highlights: [
          "Automated submission of financial transactions to the national tax platform.",
          "Designed end-to-end tracking for every transaction until completion.",
          "Built error detection and retry workflows for failed or pending transactions.",
          "Developed operational dashboards for processing status and reliability.",
        ],
      },
      {
        name: "Greenhouse Business Management Platform",
        period: "Jan 2021 – May 2021",
        tag: "Custom ERP",
        metric: "End-to-end",
        summary:
          "Owned the full lifecycle of a custom ERP — from requirements and architecture to implementation and deployment.",
        highlights: [
          "Designed the overall application architecture and database model.",
          "Built integrated modules for sales, inventory, finance, logistics and CRM.",
          "Developed reporting dashboards for business insight and operational visibility.",
          "Automated key business processes to improve efficiency and data consistency.",
        ],
      },
    ],
  },
  achievements: {
    eyebrow: "Highlights",
    title: "Outcomes that speak for themselves",
    lede: "A snapshot of the impact behind the work — the kind of results that matter to the teams and users on the other side of the screen.",
    educationLabel: "Education",
    certificationsLabel: "Certifications",
    items: [
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
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's build something worth shipping",
    lede: "Open to remote & international frontend roles. If you care about clean architecture, performance and shipping reliable products, I'd love to talk.",
    primaryCta: "Start a conversation",
    linkedinCta: "LinkedIn",
  },
  languageSwitcher: {
    label: "Language",
  },
};

export default en;
