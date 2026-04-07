"use client";

import { useEffect, useRef, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf.current = requestAnimationFrame(() => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          setProgress(Math.min(100, (window.scrollY / docHeight) * 100));
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className="fixed top-11 left-0 right-0 z-40 h-[2px] bg-transparent" aria-hidden="true">
      <div
        className="h-full bg-white/20 transition-[width] duration-100 ease-out will-change-[width]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
