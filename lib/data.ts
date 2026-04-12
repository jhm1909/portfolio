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
  "React": { level: "Intermediate", years: "2 years" },
  "Next.js": { level: "Intermediate", years: "2 years" },
  "TypeScript": { level: "Intermediate", years: "2 years" },
  "Tailwind CSS": { level: "Intermediate", years: "2 years" },
  "Node.js": { level: "Intermediate", years: "1+ year" },
  "Astro": { level: "Beginner", years: "1 year" },
  "Cloudflare Workers": { level: "Beginner", years: "1 year" },
  "PostgreSQL": { level: "Beginner", years: "1 year" },
  "Prisma": { level: "Beginner", years: "1 year" },
  "Git": { level: "Intermediate", years: "2 years" },
  "Vercel": { level: "Intermediate", years: "2 years" },
  "Figma": { level: "Beginner", years: "1 year" },
};

export const skills = Object.keys(techExperience);

export interface Experience {
  role: string;
  company: string;
  period: string;
  desc: string;
}

export const experience: Experience[] = [
  { role: "Building MyCar", company: "Personal Project", period: "2025 — 2026", desc: "Bilingual car marketplace with AI-powered recommendations." },
  { role: "Building Hey Nabi", company: "Personal Project", period: "2024 — 2025", desc: "Real-time lecture translation with 99% STT accuracy." },
  { role: "Started web development", company: "Self-taught", period: "2024", desc: "Learning React, TypeScript, and Next.js from the ground up." },
];

export const socialLinks = [
  { label: "Email", href: "mailto:jeonghamin1909@gmail.com" },
  { label: "GitHub", href: "https://github.com/jhm1909" },
];

export const navLinks = [
  { key: "work", href: "/#work" },
  { key: "about", href: "/#about" },
  { key: "contact", href: "/#contact" },
  { key: "blog", href: "/blog" },
] as const;

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
