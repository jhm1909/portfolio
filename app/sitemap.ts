import type { MetadataRoute } from "next";
import { posts, projects } from "@/lib/data";

const BASE = "https://cappy.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const workEntries = projects.map((project) => ({
    url: `${BASE}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...workEntries,
    ...blogEntries,
  ];
}
