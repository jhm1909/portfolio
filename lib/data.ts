/* ───── Project Data ───── */

export interface Project {
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  tech: string[];
  orb: string;
  link?: string;
  challenge?: string;
  solution?: string;
  result?: string;
  features?: string[];
}

export const projects: Project[] = [
  {
    title: "MyCar",
    slug: "mycar",
    subtitle: "Automotive Platform",
    description:
      "A bilingual car marketplace with AI-powered recommendations, budget-based search, vehicle comparison, and dealership locator with interactive maps.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "AI/ML"],
    orb: "#38bdf8",
    link: "https://mycar-orcin.vercel.app/ko",
    challenge: "International students in Korea struggle to find affordable cars — existing platforms are Korean-only with no budget filtering or AI guidance.",
    solution: "Built a bilingual (KO/EN) marketplace with AI-powered budget recommendations, interactive map-based dealership discovery, and side-by-side vehicle comparison.",
    result: "Reduced average car search time by helping users filter by budget first, then refine with AI suggestions tailored to their needs.",
    features: [
      "AI-powered car recommendations based on budget and preferences",
      "Bilingual interface (Korean / English) with seamless switching",
      "Interactive dealership locator with map integration",
      "Side-by-side vehicle comparison tool",
      "Budget-based search with smart filtering",
    ],
  },
  {
    title: "Hey Nabi",
    slug: "heynabi",
    subtitle: "Real-time Translation",
    description:
      "A real-time lecture translation platform for international students, featuring speech-to-text and AI-powered translation across Korean, Chinese, Japanese, Vietnamese, and English.",
    tech: ["Astro", "Gemini AI", "Soniox", "Cloudflare"],
    orb: "#a78bfa",
    link: "https://heynabi.cappy.workers.dev",
    challenge: "International students miss critical lecture content because real-time translation tools are either too slow, inaccurate, or not designed for academic contexts.",
    solution: "Created a specialized platform using Soniox for high-accuracy STT and Gemini 2.5 Flash for context-aware academic translation with under 2-second latency.",
    result: "Achieved 99% STT accuracy with sub-2s translation latency, supporting 5 languages for live lectures, study sessions, and group projects.",
    features: [
      "Real-time speech-to-text with 99% accuracy via Soniox",
      "AI translation powered by Gemini 2.5 Flash",
      "5 languages: Korean, Chinese, Japanese, Vietnamese, English",
      "Under 2-second translation latency",
      "Google Sign-in authentication",
    ],
  },
];

export const techExperience: Record<string, { level: string; years: string }> = {
  "React": { level: "Advanced", years: "3+ years" },
  "Next.js": { level: "Advanced", years: "2+ years" },
  "TypeScript": { level: "Advanced", years: "2+ years" },
  "Node.js": { level: "Intermediate", years: "2+ years" },
  "Tailwind CSS": { level: "Advanced", years: "2+ years" },
  "PostgreSQL": { level: "Intermediate", years: "1+ year" },
  "Prisma": { level: "Intermediate", years: "1+ year" },
  "Docker": { level: "Beginner", years: "< 1 year" },
  "Git": { level: "Advanced", years: "3+ years" },
  "AWS": { level: "Beginner", years: "< 1 year" },
  "Vercel": { level: "Advanced", years: "2+ years" },
  "Figma": { level: "Intermediate", years: "1+ year" },
};

export const skills = Object.keys(techExperience);

export interface Experience {
  role: string;
  company: string;
  period: string;
  desc: string;
}

export const experience: Experience[] = [
  { role: "Frontend Developer", company: "Tech Corp", period: "2023 — Present", desc: "Leading frontend architecture and design systems." },
  { role: "Full-Stack Intern", company: "Startup Inc", period: "2022 — 2023", desc: "Shipped 12 features across web and mobile." },
  { role: "Freelance Developer", company: "Independent", period: "2021 — 2022", desc: "Delivered 8 projects for 5 clients." },
];

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/jhm1909" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Twitter", href: "https://twitter.com" },
];

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
  { label: "Blog", href: "/blog" },
];

/* ───── Blog Data ───── */

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}

export const posts: BlogPost[] = [
  {
    slug: "building-liquid-glass-ui",
    title: "Building a Liquid Glass UI for the Web",
    excerpt: "How I recreated Apple's WWDC25 Liquid Glass design language using CSS backdrop-filter, layered materials, and subtle depth cues.",
    date: "2026-04-07",
    readTime: "5 min read",
    tags: ["CSS", "Design", "WWDC25"],
    content: `
Apple's WWDC25 introduction of Liquid Glass changed how we think about interface materials. The design language treats UI elements as responsive glass — refracting, reflecting, and adapting to their surroundings.

## The Three Layers

According to Apple's documentation, Liquid Glass is composed of three layers:

1. **Highlight** — The specular shine on the top edge that catches light
2. **Shadow** — Depth separation between foreground and background
3. **Illumination** — The flexible material properties that adapt to context

## Translating to CSS

The key CSS properties that make this work on the web:

\`\`\`css
.liquid-glass {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(40px) saturate(180%) brightness(1.1);
  border: 0.5px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.25),
    inset 0 0.5px 0 rgba(255, 255, 255, 0.15);
}
\`\`\`

The \`backdrop-filter\` does the heavy lifting — it blurs and saturates whatever content sits behind the glass element. The \`inset\` box-shadow creates that subtle top-edge highlight.

## Making It Feel Real

The trick to convincing glass is giving it something to refract. I use ambient colored orbs in the background — soft blurred gradients that drift slowly. When glass elements sit on top of these, the backdrop-filter picks up the color and creates that adaptive tinting Apple describes.

## Performance

\`backdrop-filter\` is GPU-accelerated in modern browsers, so the performance cost is minimal. The floating orbs use CSS animations with \`will-change: transform\` to stay on the compositor layer.

The result is a material system that feels alive without being distracting — exactly what Apple intended.
    `,
  },
  {
    slug: "why-simplicity-wins",
    title: "Why Simplicity Wins in Interface Design",
    excerpt: "The best interfaces feel invisible. Here's how I approach design decisions with restraint and purpose.",
    date: "2026-03-20",
    readTime: "4 min read",
    tags: ["Design", "UX", "Philosophy"],
    content: `
Every feature you add is a decision you're forcing on your user. The best interfaces don't ask users to think — they guide them naturally.

## The Subtraction Game

Design isn't about adding things until it looks good. It's about removing things until it breaks — then adding one thing back.

Apple understands this deeply. Their products feel simple not because they lack features, but because complexity is hidden behind progressive disclosure.

## Practical Rules

Here are the rules I follow:

1. **If you need a label, the icon isn't clear enough.** But if you need the icon, the label alone isn't engaging enough. Use both, or reconsider.

2. **White space isn't empty space.** It's breathing room. Give your content space to be understood.

3. **Reduce choices.** Every dropdown with 20 options is a failure of information architecture. Group, filter, or default.

4. **Motion should explain, not decorate.** An animation that doesn't help the user understand what just happened is noise.

## The Test

Show your interface to someone for 5 seconds. Then take it away and ask them what they can do on that page. If they can't tell you, it's not simple enough.

Simplicity isn't the starting point. It's the destination you reach after understanding the problem deeply enough to remove everything that doesn't matter.
    `,
  },
  {
    slug: "my-dev-setup-2026",
    title: "My Development Setup in 2026",
    excerpt: "The tools, extensions, and workflows I use every day to stay productive and ship faster.",
    date: "2026-03-01",
    readTime: "6 min read",
    tags: ["Tooling", "Productivity", "Dev"],
    content: `
Every developer has their setup. Here's mine — optimized for speed, focus, and minimal context-switching.

## Editor

**VS Code** with a minimal config. Theme: One Dark Pro. Font: JetBrains Mono. I keep extensions to a minimum — ESLint, Prettier, Tailwind IntelliSense, and GitLens. That's it.

## Terminal

**Windows Terminal** with a custom profile. Shell: bash via Git Bash. I use \`starship\` for the prompt because it's fast and gives me just the info I need — branch, Node version, and whether I have uncommitted changes.

## Stack

For most projects I reach for:

- **Next.js** — the best React framework, period
- **TypeScript** — I can't imagine writing JS without it
- **Tailwind CSS** — utility-first changed how I think about styling
- **Prisma** — the ORM that actually makes databases enjoyable
- **Vercel** — deploy in seconds, no config

## AI Tools

**Claude Code** is my daily driver for AI-assisted development. It understands context, reads my codebase, and helps me ship faster without sacrificing code quality.

## Philosophy

My setup philosophy is: fewer tools, known deeply. I'd rather master 5 tools than be mediocre with 20. Every tool in my stack has earned its place by saving me real time, not just looking cool in a dotfiles repo.
    `,
  },
];

export function getAllTags(): string[] {
  return [...new Set(posts.flatMap((p) => p.tags))];
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAdjacentPosts(slug: string) {
  const idx = posts.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? posts[idx - 1] : null,
    next: idx < posts.length - 1 ? posts[idx + 1] : null,
  };
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
