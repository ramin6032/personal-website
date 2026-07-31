# Ramin Mohagheghi — Personal Portfolio

**Demo:** [ramin6032.vercel.app](https://ramin6032.vercel.app)

Frontend Software Engineer portfolio built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Motion**. Features a glitch-animated hero canvas, i18n (EN/FA/DE), and a responsive layout with mobile navigation.

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Language** — TypeScript 5
- **Styling** — Tailwind CSS 4
- **Animation** — Motion (framer-motion) + GSAP + Pixi.js
- **i18n** — Custom locale provider with EN, FA, DE dictionaries

## Project Structure

```
app/                    # Next.js App Router pages and layouts
  [lang]/               # Locale route group (en, fa, de)
    layout.tsx          # Root layout with providers
    page.tsx            # Home page
    work/               # Work listing + case-study pages
components/
  layout/               # Navbar, language switcher, section wrapper
  sections/             # About, achievements, contact, experience, projects, skills
  hero/                 # Hero section with 3D parallax
  background/           # Particle field background
  ui/                   # Reusable UI primitives (tilt-card, magnetic, reveal, etc.)
  work/                 # Work case-study and media components
lib/
  i18n/                 # Dictionary definitions and locale config
  content.ts            # Single source of truth for portfolio copy
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Configuration

- **Port** — `3000` (default Next.js)
- **Locales** — `en`, `fa`, `de` (configured in `lib/i18n/config.ts`)
- **Content** — Edit `lib/content.ts` for portfolio data; translations live in `lib/i18n/dictionaries/`

## Key Features

- Glitch canvas hero with Pixi.js RGB split + glitch filters
- Responsive mobile navigation with animated menu
- Multi-language support (English, Farsi, German)
- Scroll-aware navbar with glass morphism
- Case study pages for each project
- CV download with locale-aware links