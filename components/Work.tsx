"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/data";
import LivePreview from "./LivePreview";
import TechIcon from "./TechIcon";

export default function Work() {
  const project = projects[0];
  const previewRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    const update = () => setScale(el.offsetWidth / 1280);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section id="work" className="relative py-20 sm:py-32 lg:py-44 scroll-mt-12">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="reveal text-center mb-14 sm:mb-24">
          <p className="text-[12px] sm:text-[13px] text-white/35 tracking-[0.12em] uppercase mb-3 sm:mb-4">Selected Work</p>
          <h2 className="text-[clamp(28px,5vw,56px)] font-semibold tracking-[-0.03em]">
            Things I&apos;ve built.
          </h2>
        </div>

        <div className="reveal">
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
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
                      <span key={t} className="liquid-glass-pill inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] sm:text-[11px] text-white/40">
                        <TechIcon name={t} />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: live preview — ~1/3 of card */}
                <div
                  ref={previewRef}
                  className="w-full md:w-[260px] lg:w-[280px] shrink-0"
                  style={{ "--preview-scale": scale } as React.CSSProperties}
                >
                  <LivePreview url={project.link!} title={project.title} />
                </div>
              </div>
            </article>
          </a>
        </div>
      </div>
    </section>
  );
}
