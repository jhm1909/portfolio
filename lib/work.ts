// lib/work.ts
import fs from "fs";
import path from "path";

const WORK_DIR = path.join(process.cwd(), "content", "work");

export interface ProjectMeta {
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  tech: string[];
  orb: string;
  link?: string;
  metrics?: { value: string; label: string }[];
}

export interface Project {
  slug: string;
  meta: ProjectMeta;
}

function extractMeta(raw: string): ProjectMeta {
  const match = raw.match(/export\s+const\s+meta\s*=\s*(\{[\s\S]*?\n\})/);
  if (!match) throw new Error("No meta export found in MDX file");
  return new Function(`return ${match[1]}`)() as ProjectMeta;
}

export function getAllProjects(): Project[] {
  const files = fs.readdirSync(WORK_DIR).filter((f) => f.endsWith(".mdx"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(WORK_DIR, file), "utf-8");
    const meta = extractMeta(raw);
    return { slug: meta.slug, meta };
  });
}

export function getProjectBySlug(slug: string): Project | null {
  const projects = getAllProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getAdjacentProjects(slug: string) {
  const projects = getAllProjects();
  const idx = projects.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  };
}
