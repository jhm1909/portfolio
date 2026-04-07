"use client";

import { useEffect, useRef } from "react";
import Arrow from "./Arrow";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  /* Hero orb parallax — mouse-only devices */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const orbs = hero.querySelectorAll<HTMLDivElement>("[data-speed]");
    let rafId = 0;
    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const cx = (e.clientX - rect.left) / rect.width - 0.5;
        const cy = (e.clientY - rect.top) / rect.height - 0.5;
        orbs.forEach((orb) => {
          const s = parseFloat(orb.dataset.speed || "1");
          orb.style.transform = `translate(${cx * s * 50}px, ${cy * s * 50}px)`;
        });
      });
    };
    // Set transition once instead of per-frame
    orbs.forEach((orb) => {
      orb.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
    });
    hero.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      hero.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* Parallax orbs */}
      <div data-speed="2" className="absolute top-[20%] left-[15%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-sky-400/[0.05] blur-[80px] pointer-events-none" />
      <div data-speed="1.2" className="absolute bottom-[15%] right-[15%] w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] rounded-full bg-violet-400/[0.04] blur-[80px] pointer-events-none" />
      <div data-speed="0.8" className="absolute top-[45%] right-[30%] w-[180px] sm:w-[250px] h-[180px] sm:h-[250px] rounded-full bg-fuchsia-400/[0.03] blur-[60px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        <p className="reveal text-[12px] sm:text-[13px] text-white/55 tracking-[0.12em] uppercase mb-6 sm:mb-8">
          Developer &amp; Designer
        </p>
        <h1 className="reveal text-gradient-hero text-[clamp(36px,8vw,96px)] font-semibold tracking-[-0.04em] leading-[1.08]">
          Crafting digital
          <br />
          experiences.
        </h1>
        <p className="reveal mt-6 sm:mt-8 text-[15px] sm:text-[21px] text-white/40 max-w-[500px] mx-auto leading-[1.65] font-light px-2">
          I build interfaces that feel effortless — simple, precise, and purposeful.
        </p>
        <div className="reveal mt-10 sm:mt-14">
          <a href="#work" className="btn-liquid liquid-glass-elevated inline-flex items-center justify-center gap-2 text-white text-[13px] font-medium px-7 py-3 rounded-full">
            See my work <Arrow className="link-arrow mt-px" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-25 hidden sm:block" aria-hidden="true">
        <div className="w-[26px] h-[42px] border border-white/15 rounded-full flex justify-center pt-2">
          <div className="w-[3px] h-[6px] bg-white/25 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
