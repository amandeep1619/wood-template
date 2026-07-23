---
name: project-carpentry-site
description: carpentar-theme — premium carpentry/woodwork Next.js website project context and decisions
metadata:
  type: project
---

# Artisan Wood Co. — Carpentry Website

Full premium carpentry company website built from scratch in this repo.

**Why:** Internal POC for a premium Woodza-inspired template, not a copy — unique design with same inspiration source.

**Tech stack:** Next.js 16, TypeScript, Tailwind v4 (CSS-based config), Shadcn UI, Framer Motion, Lucide React.

**Company identity:** "Artisan Wood Co." — master woodworkers since 1998, White Plains NY.

**Color palette:**
- Walnut Brown: `#6B4226` (`bg-walnut`)
- Dark Wood: `#3E2723` (`bg-dark-wood`)
- Warm Beige: `#F5EFE6` (`bg-beige`)
- Soft Cream: `#FAF8F5` (`bg-cream`)
- Gold: `#D4A373` (`bg-gold`)

**Typography:** Playfair Display (headings, `font-serif`) + Inter (body, `font-sans`). Variables: `--font-playfair`, `--font-inter`.

**Pages built (all static SSG):**
- `/` — Home (Hero, Stats, About Preview, Services Grid, Why Choose Us, Projects, Process, Testimonials, FAQ, CTA)
- `/about` — Company story, timeline, team, certifications
- `/services` — Services listing
- `/services/[slug]` — 6 service detail pages
- `/projects` — Filterable portfolio (client component)
- `/projects/[slug]` — 6 project detail pages
- `/blog` — Blog listing
- `/blog/[slug]` — 6 blog post pages
- `/contact` — Contact form + hours
- `/sitemap.xml`, `/robots.txt`

**Key architectural notes:**
- Tailwind v4 uses `@theme` in globals.css instead of tailwind.config.ts. Custom colors added via `@theme { --color-walnut: #6B4226; }`.
- Gradient classes must use `bg-linear-to-*` (not `bg-gradient-to-*`) in Tailwind v4.
- Lucide React v3+ has NO social icons (LinkedIn, Instagram, Facebook) — inline SVG components used instead.
- `ProjectCategory` type includes `"renovation"` — added after initial build.
- Images from Unsplash; `next.config.ts` allows `images.unsplash.com`.
- Admin section is planned as a future addition (user will specify requirements).

**How to apply:** Reference this when working on new features, the admin section, or adding pages.
