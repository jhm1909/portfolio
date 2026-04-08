"use client";

import { useEffect, useRef, useState } from "react";

interface LivePreviewProps {
  url: string;
  title: string;
}

export default function LivePreview({ url, title }: LivePreviewProps) {
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Only mount iframe when visible in viewport */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="live-preview group/preview" aria-label={`Live preview of ${title}`}>
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.06]">
        <span className="w-[7px] h-[7px] rounded-full bg-white/[0.08]" />
        <span className="w-[7px] h-[7px] rounded-full bg-white/[0.08]" />
        <span className="w-[7px] h-[7px] rounded-full bg-white/[0.08]" />
        <span className="ml-2 flex-1 text-[9px] text-white/15 font-mono truncate">{url.replace(/^https?:\/\//, "")}</span>
      </div>

      {/* Iframe container */}
      <div className="live-preview-viewport">
        {/* Loading skeleton */}
        {!loaded && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/[0.02]">
            <div className="live-preview-pulse w-6 h-6 rounded-full border-2 border-white/10 border-t-white/30" />
          </div>
        )}

        {mounted && (
          <iframe
            src={url}
            title={`${title} live preview`}
            loading="lazy"
            sandbox="allow-scripts allow-popups"
            onLoad={() => setLoaded(true)}
            className="live-preview-iframe"
          />
        )}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 z-20 rounded-2xl bg-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
        <span className="text-[11px] text-white/60 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
          Visit site ↗
        </span>
      </div>
    </div>
  );
}
