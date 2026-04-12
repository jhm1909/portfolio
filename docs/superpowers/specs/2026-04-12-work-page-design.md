# Work/Case Study Page Upgrade — Design Spec

**Date:** 2026-04-12
**Status:** Approved
**Approach:** Full MDX Case Study (Approach A)

---

## Overview

Replace the hardcoded case study system (project content as strings in `lib/data.ts` with a static page template) with MDX-powered case studies. Each project becomes an MDX file in `content/work/`, reusing the existing MDX infrastructure (mdx-components, CodeBlock, Callout, Shiki syntax highlighting). Adds metrics cards, LivePreview embed in MDX content, and prev/next project navigation.

## 1. File Structure & Data Flow

### Directory layout

```
content/work/
  mycar.mdx         # full case study
  heynabi.mdx       # full case study
```

### Metadata format

Each MDX file exports a `meta` object:

```tsx
export const meta = {
  title: "MyCar",
  slug: "mycar",
  subtitle: "Automotive Platform",
  description: "A bilingual car marketplace with AI-powered recommendations...",
  tech: ["Next.js", "TypeScript", "Tailwind CSS", "AI/ML"],
  orb: "#38bdf8",
  link: "https://mycar-orcin.vercel.app/ko",
  metrics: [
    { value: "2", label: "Languages" },
    { value: "AI", label: "Powered" },
    { value: "5", label: "Core Features" },
  ],
}
```

### Content utility — `lib/work.ts`

Simplified version of `lib/blog.ts`:

- **Glob** all `.mdx` files in `content/work/`
- **Extract metadata** (`meta` export) from each file via regex + `new Function`
- **`getAllProjects()`** — returns all projects sorted by file order
- **`getProjectBySlug(slug)`** — returns single project metadata
- **`getAdjacentProjects(slug)`** — prev/next project navigation

No reading time, no locale resolution, no related posts (not needed for 2 projects).

### Data flow

```
MDX files (content/work/)
    ↓ build-time
@next/mdx compile → JS modules
    ↓
lib/work.ts glob + collect meta
    ↓
Home page Work section → display project cards from meta
Case study page → dynamic import(`@/content/work/${slug}.mdx`) → render
```

All project data removed from `lib/data.ts`.

## 2. Case Study Page Layout

### Page structure

```
← Back to work

AUTOMOTIVE PLATFORM
# MyCar
Description text...
[Visit live site ↗]

[Next.js] [TypeScript] [Tailwind CSS] [AI/ML]

┌──────────┬──────────┬──────────┐
│    2     │    AI    │    5     │
│Languages │ Powered  │ Features │  ← Metrics cards
└──────────┴──────────┴──────────┘

─── MDX Content ───
## The Challenge
Rich paragraphs, images, callouts...

## The Solution
...

<LivePreview url="..." title="..." />

## Key Features
- Feature 1
- Feature 2
─── End MDX Content ───

┌──────────────────────────────────┐
│  ← Previous        Next →        │  ← Prev/Next project
└──────────────────────────────────┘

Footer
```

### Metrics cards

- Grid of 3 columns (responsive: stack on mobile)
- Each card: liquid-glass-subtle background, large value text, small label
- Defined in `meta.metrics` array
- Hidden if no metrics defined

### LivePreview in MDX

The existing `LivePreview` component is registered in `mdx-components.tsx` so it can be used directly in MDX content:

```mdx
<LivePreview url="https://mycar-orcin.vercel.app/ko" title="MyCar" />
```

### Prev/Next project navigation

Same style as blog prev/next. Navigation between case study pages.

### No Table of Contents

Case studies are shorter than blog posts — no ToC needed.

## 3. Migration & Breaking Changes

### Content migration

2 projects from `lib/data.ts` converted to MDX files. Current Challenge/Solution/Result/Features (plain strings) rewritten as MDX headings + paragraphs + lists. Content preserved, format enriched.

### Removed from `lib/data.ts`

- `Project` interface
- `projects` array
- `getProjectBySlug()`

Kept: `techExperience`, `skills`, `Experience`, `experience`, `socialLinks`, `navLinks`.

### File change manifest

| Action | File |
|---|---|
| **Create** | `content/work/mycar.mdx` — full case study |
| **Create** | `content/work/heynabi.mdx` — full case study |
| **Create** | `lib/work.ts` — content utility (glob, metadata, adjacent projects) |
| **Modify** | `app/[locale]/work/[slug]/page.tsx` — dynamic MDX import, metrics, prev/next |
| **Modify** | `mdx-components.tsx` — register LivePreview component |
| **Modify** | `components/Work.tsx` — import from `lib/work.ts` instead of `lib/data.ts` |
| **Modify** | `app/sitemap.ts` — use `lib/work.ts` |
| **Modify** | `app/[locale]/work/[slug]/opengraph-image.tsx` — use `lib/work.ts` |
| **Modify** | `lib/data.ts` — remove Project, projects, getProjectBySlug |
| **Modify** | `messages/en.json` — add CaseStudy prev/next keys |
| **Modify** | `messages/ko.json` — add CaseStudy prev/next keys |
| **Modify** | `messages/vi.json` — add CaseStudy prev/next keys |
| **Modify** | `e2e/portfolio.spec.ts` — update case study tests |

### No new dependencies

All MDX infrastructure already installed from blog migration.

### Unaffected

- Blog system (MDX blog unchanged)
- About, Contact, Hero sections
- i18n routing, navigation
- Liquid Glass design system
