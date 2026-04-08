"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { projects } from "@/lib/data";
import LivePreview from "./LivePreview";
import TechPill from "./TechPill";

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);

  const updateScale = useCallback(() => {
    if (previewRef.current) setScale(previewRef.current.offsetWidth / 1280);
  }, []);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateScale]);

  return (
    <Link href={`/work/${project.slug}`} className="block">
      <article className="project-card liquid-glass relative group">
        <div
          className="absolute -top-12 -right-12 w-40 sm:w-56 h-40 sm:h-56 rounded-full blur-[100px] pointer-events-none opacity-30"
          style={{ background: project.orb }}
        />
        <div className="relative z-10 p-5 sm:p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          {/* Left: info */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] sm:text-[11px] text-white/30 uppercase tracking-[0.14em] mb-2 sm:mb-3">{project.subtitle}</p>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-[-0.02em] leading-[1.15] mb-2 sm:mb-3">{project.title}</h3>
            <p className="text-[12px] sm:text-[13px] text-white/40 leading-[1.7] mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <TechPill key={t} name={t} />
              ))}
            </div>
          </div>

          {/* Right: live preview */}
          {project.link && (
            <div
              ref={previewRef}
              className="w-full md:w-[260px] lg:w-[280px] shrink-0"
              style={{ "--preview-scale": scale } as React.CSSProperties}
            >
              <LivePreview url={project.link} title={project.title} />
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative py-20 sm:py-32 lg:py-44 scroll-mt-12">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="reveal text-center mb-14 sm:mb-24">
          <p className="text-[12px] sm:text-[13px] text-white/35 tracking-[0.12em] uppercase mb-3 sm:mb-4">Selected Work</p>
          <h2 className="text-[clamp(28px,5vw,56px)] font-semibold tracking-[-0.03em]">
            Things I&apos;ve built.
          </h2>
        </div>

        <div className="space-y-4 sm:space-y-5">
          {projects.map((project) => (
            <div key={project.title} className="reveal">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
