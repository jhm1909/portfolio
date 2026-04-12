// lib/blog.ts
import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const LOCALES = ["en", "ko", "vi"] as const;

export interface BlogMeta {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  lang: string;
}

export interface BlogPost {
  slug: string;
  meta: BlogMeta;
  readTime: number;
  hasTranslation: Record<string, boolean>;
  isFallback: boolean;
}

function extractMeta(raw: string): BlogMeta {
  const match = raw.match(/export\s+const\s+meta\s*=\s*(\{[\s\S]*?\n\})/);
  if (!match) throw new Error("No meta export found in MDX file");
  return new Function(`return ${match[1]}`)() as BlogMeta;
}

function calculateReadTime(raw: string): number {
  let text = raw;
  text = text.replace(/export\s+const\s+meta\s*=\s*\{[\s\S]*?\n\}/m, "");
  text = text.replace(/^import\s+.*$/gm, "");
  text = text.replace(/```[\s\S]*?```/g, "");
  text = text.replace(/<[^>]+>/g, "");
  text = text.replace(/[#*_~`\[\]()]/g, "");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getAllSlugs(): string[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  const slugs = new Set<string>();
  for (const file of files) {
    const name = file.replace(/\.mdx$/, "");
    const slug = name.replace(/\.(ko|vi)$/, "");
    slugs.add(slug);
  }
  return [...slugs];
}

function resolveFile(
  slug: string,
  locale: string
): { filename: string; isFallback: boolean } {
  if (locale !== "en") {
    const localeFile = `${slug}.${locale}.mdx`;
    if (fs.existsSync(path.join(BLOG_DIR, localeFile))) {
      return { filename: localeFile, isFallback: false };
    }
  }
  return { filename: `${slug}.mdx`, isFallback: locale !== "en" };
}

export function getAllPosts(locale: string = "en"): BlogPost[] {
  const slugs = getAllSlugs();
  const posts: BlogPost[] = [];

  for (const slug of slugs) {
    const hasTranslation: Record<string, boolean> = {};
    for (const loc of LOCALES) {
      const filename = loc === "en" ? `${slug}.mdx` : `${slug}.${loc}.mdx`;
      hasTranslation[loc] = fs.existsSync(path.join(BLOG_DIR, filename));
    }

    const { filename, isFallback } = resolveFile(slug, locale);
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
    const meta = extractMeta(raw);
    const readTime = calculateReadTime(raw);

    posts.push({ slug, meta, readTime, hasTranslation, isFallback });
  }

  return posts.sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export function getPostBySlug(
  slug: string,
  locale: string = "en"
): BlogPost | null {
  const posts = getAllPosts(locale);
  return posts.find((p) => p.slug === slug) ?? null;
}

export function getAllTags(locale: string = "en"): string[] {
  return [...new Set(getAllPosts(locale).flatMap((p) => p.meta.tags))];
}

export function getAdjacentPosts(slug: string, locale: string = "en") {
  const posts = getAllPosts(locale);
  const idx = posts.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? posts[idx - 1] : null,
    next: idx < posts.length - 1 ? posts[idx + 1] : null,
  };
}

export function getRelatedPosts(
  slug: string,
  locale: string = "en",
  limit = 2
): BlogPost[] {
  const posts = getAllPosts(locale);
  const current = posts.find((p) => p.slug === slug);
  if (!current) return [];

  return posts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      shared: p.meta.tags.filter((t) => current.meta.tags.includes(t)).length,
    }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map(({ post }) => post);
}

export function resolveImportSuffix(
  slug: string,
  locale: string
): string {
  if (locale !== "en") {
    const localeFile = `${slug}.${locale}.mdx`;
    if (fs.existsSync(path.join(BLOG_DIR, localeFile))) {
      return `${slug}.${locale}`;
    }
  }
  return slug;
}
