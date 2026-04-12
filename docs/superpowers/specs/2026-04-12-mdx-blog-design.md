# MDX Blog System — Design Spec

**Date:** 2026-04-12
**Status:** Approved
**Approach:** `@next/mdx` + Dynamic Imports (Approach A)

---

## Overview

Replace the current hardcoded blog system (content as strings in `lib/data.ts` with a custom `renderContent()` parser) with a full MDX-powered blog. MDX files live in the repo, compile at build time via `@next/mdx`, and support rich content: syntax highlighting (Shiki), custom components (Callout, CopyButton), Table of Contents with scroll spy, hybrid i18n translations, auto reading time, and related posts.

## 1. File Structure & Data Flow

### Directory layout

```
content/
  blog/
    building-liquid-glass-ui.mdx        # original (EN)
    building-liquid-glass-ui.ko.mdx     # optional KO translation
    building-liquid-glass-ui.vi.mdx     # optional VI translation
    why-simplicity-wins.mdx
    my-dev-setup-2026.mdx
```

### Metadata format

Each MDX file exports a `meta` object at the top (no YAML frontmatter):

```tsx
export const meta = {
  title: "Building a Liquid Glass UI for the Web",
  excerpt: "How I recreated Apple's WWDC25 Liquid Glass...",
  date: "2026-04-07",
  tags: ["CSS", "Design", "WWDC25"],
  lang: "en",
}

## The Three Layers
...
```

### Content utility — `lib/blog.ts`

Responsible for:

- **Globbing** all `.mdx` files in `content/blog/`
- **Importing metadata** (`meta` export) from each file without importing content
- **Calculating reading time** automatically from word count
- **Resolving locale** — if `slug.ko.mdx` exists use KO version, otherwise fallback to original + badge
- **Adjacent posts** — prev/next navigation
- **Related posts** — ranked by shared tags
- **`getAllTags()`** — deduplicated tag list across all posts

### Data flow

```
MDX files (content/blog/)
    ↓ build-time
@next/mdx compile → JS modules
    ↓
lib/blog.ts glob + collect meta
    ↓
Blog listing page → display list from meta
Blog post page → dynamic import(`@/content/blog/${slug}.mdx`) → render
```

All blog data removed from `lib/data.ts`.

## 2. MDX Components & Custom Elements

### Global component mapping — `mdx-components.tsx` (project root)

**Typography:**

- `h1, h2, h3` — styled headings with auto-generated IDs (via rehype-slug)
- `p` — `text-white/45`, `leading-[1.85]`, `font-light` (matches current style)
- `a` — link with hover transition
- `blockquote` — liquid-glass-subtle background, colored left border

**Code:**

- `pre` — styled by rehype-pretty-code (Shiki), VS Code Dark+ theme, liquid-glass-subtle background
- `code` — inline code: `bg-white/[0.04]`, monospace
- **Copy button** — top-right corner of code blocks (CopyButton component)
- **Line numbers** — opt-in via meta string `showLineNumbers`
- **Line highlighting** — via meta string: ` ```tsx {3,5-7} `

**Lists & Tables:**

- `ul, ol` — styled lists matching current design
- `table` — responsive with liquid-glass styling, horizontal scroll on mobile

**Media:**

- `img` — wrapper with caption support, lazy loading, rounded corners

### Custom MDX components

**Callout** — 3 variants with liquid-glass style + colored left border:

```mdx
<Callout type="tip">Helpful tip here</Callout>
<Callout type="warning">Warning message</Callout>
<Callout type="info">Additional info</Callout>
```

- `tip` — green accent
- `warning` — yellow accent
- `info` — blue accent

### Removed

`renderContent()` function in `app/[locale]/blog/[slug]/page.tsx` deleted entirely.

## 3. Table of Contents

### Desktop (>= 1280px / `xl` breakpoint)

- **Sticky sidebar** to the right of article content
- Auto-generated from all `h2, h3` headings
- **Scroll spy** via IntersectionObserver — highlights currently visible heading
- `h3` visually indented under parent `h2`
- Liquid-glass-subtle background
- Click heading → smooth scroll to position

### Mobile (< 1280px)

- **Collapsible block** at top of article, below header
- Default collapsed — click "Table of Contents" to expand
- Click heading → scroll to position + auto-collapse

### Layout

Article keeps `max-w-[680px]`. ToC sits outside to the right via a wider container + grid/flex layout:

```
Desktop xl+:
┌─────────────────────────────────────────────┐
│           Article (680px)    │  ToC (200px)  │
│           content            │  sticky       │
│                              │  right side   │
└─────────────────────────────────────────────┘

Mobile/Tablet:
┌──────────────────┐
│  [▸ Mục lục]     │  ← collapsible
│  Article (680px) │
│  full width      │
└──────────────────┘
```

## 4. i18n — Hybrid Translation

### File naming convention

```
slug.mdx           → original language (specified by meta.lang)
slug.ko.mdx        → Korean translation
slug.vi.mdx        → Vietnamese translation
```

### Locale resolution logic

```
User viewing locale "ko" + slug "building-liquid-glass-ui"
  → Look for building-liquid-glass-ui.ko.mdx → EXISTS → render KO version

User viewing locale "ko" + slug "why-simplicity-wins"
  → Look for why-simplicity-wins.ko.mdx → NOT FOUND
  → Fallback: render why-simplicity-wins.mdx (original EN)
  → Display badge "Written in English" below title
```

### Blog listing behavior

- Show **all posts** for every locale (never hide untranslated posts)
- Untranslated posts show a small badge indicating original language
- Title/excerpt from translation if available, otherwise from original

### SEO

- `generateStaticParams` generates all `locale × slug` combinations
- `alternates.languages` only includes locales that **have an actual translation file**
- Each translation has its own `meta` export (translated title/excerpt)

### UI labels

Continue using next-intl for all UI strings (prev/next buttons, "Table of Contents", "Written in English", etc.)

## 5. Related Posts & Reading Time

### Auto reading time

- Count words in MDX content (excluding code blocks, import statements, JSX tags)
- Formula: `Math.ceil(wordCount / 200)` → `"X min read"`
- Calculated in `lib/blog.ts` during metadata collection
- No `readTime` field in `meta` — fully automatic

### Related posts

Displayed at end of article, before prev/next navigation:

- Ranked by **number of shared tags** with current post
- Maximum **2 related posts**
- Hidden if no posts share any tags
- Card style matches blog listing (title, excerpt, date, tags)

### End-of-article order

```
Article content
    ↓
─── Related Posts (if any) ───
  [Card 1]    [Card 2]
    ↓
─── Prev / Next ───
  ← Previous    Next →
    ↓
Footer
```

## 6. Migration & Breaking Changes

### Content migration

3 existing blog posts in `lib/data.ts` converted to MDX files:

- `building-liquid-glass-ui.mdx`
- `why-simplicity-wins.mdx`
- `my-dev-setup-2026.mdx`

Content preserved, format changed from string → MDX with `export const meta`.

### Removed from `lib/data.ts`

- `BlogPost` interface
- `posts` array
- `getAllTags()`
- `getPostBySlug()`
- `getAdjacentPosts()`

Kept: `Project`, `projects`, `techExperience`, `skills`, `experience`, `socialLinks`, `navLinks`.

### File change manifest

| Action | File |
|---|---|
| **Create** | `mdx-components.tsx` — global MDX component mapping |
| **Create** | `lib/blog.ts` — content utility (glob, metadata, reading time, locale resolve) |
| **Create** | `content/blog/*.mdx` — 3 blog posts |
| **Create** | `components/mdx/Callout.tsx` — callout component |
| **Create** | `components/mdx/CopyButton.tsx` — code block copy button |
| **Create** | `components/mdx/TableOfContents.tsx` — ToC sidebar + mobile |
| **Modify** | `next.config.ts` — add `withMDX`, `pageExtensions` |
| **Modify** | `app/[locale]/blog/[slug]/page.tsx` — dynamic import MDX, remove `renderContent()` |
| **Modify** | `app/[locale]/blog/page.tsx` — use `lib/blog.ts` instead of `lib/data.ts` |
| **Modify** | `components/BlogFilter.tsx` — update to new interface |
| **Modify** | `app/sitemap.ts` — use new blog utility |
| **Modify** | `app/feed.xml/route.ts` — use new blog utility |
| **Modify** | `lib/data.ts` — remove blog-related code |
| **Update** | `e2e/portfolio.spec.ts` — update blog-related tests |

### New dependencies

```
@next/mdx
@mdx-js/loader
@mdx-js/react
@types/mdx
rehype-pretty-code
shiki
remark-gfm
rehype-slug
rehype-autolink-headings
```

### Unaffected

- Home page, Work/Case Study, About, Contact — no changes
- i18n routing, navigation — unchanged
- Liquid Glass design system — unchanged, extended to new MDX components

## Plugin stack

| Plugin | Purpose |
|---|---|
| `@next/mdx` | MDX compilation at build time |
| `rehype-pretty-code` | Shiki-based syntax highlighting |
| `remark-gfm` | GitHub Flavored Markdown (tables, strikethrough, task lists) |
| `rehype-slug` | Auto-generate heading IDs |
| `rehype-autolink-headings` | Clickable anchor links on headings |
