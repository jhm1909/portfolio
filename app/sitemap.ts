import type { MetadataRoute } from "next";
import { posts, projects } from "@/lib/data";
import { routing } from "@/i18n/routing";

const BASE = "https://jeonghamin.dev";

const localePath = (locale: string, path: string) =>
  `${BASE}${locale === routing.defaultLocale ? "" : "/" + locale}${path}`;

function entry(
  path: string,
  lastModified: Date,
  changeFrequency: "weekly" | "monthly",
  priority: number
): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((l) => [l, localePath(l, path)])
  );
  languages["x-default"] = localePath(routing.defaultLocale, path);
  return {
    url: localePath(routing.defaultLocale, path),
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const blogEntries = posts.map((post) =>
    entry(`/blog/${post.slug}`, new Date(post.date), "monthly", 0.7)
  );
  const workEntries = projects.map((project) =>
    entry(`/work/${project.slug}`, now, "monthly", 0.8)
  );

  return [
    entry("/", now, "monthly", 1),
    entry("/blog", now, "weekly", 0.8),
    ...workEntries,
    ...blogEntries,
  ];
}
