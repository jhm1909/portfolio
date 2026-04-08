"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/data";

const SECTION_IDS = ["work", "about", "contact"];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLElement>(null);

  const close = useCallback(() => setMenuOpen(false), []);

  /* Close on Escape */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, close]);

  /* Close on outside click */
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen, close]);

  /* Lock body scroll when menu is open */
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", menuOpen);
    return () => { document.documentElement.classList.remove("menu-open"); };
  }, [menuOpen]);

  /* Reset active section when navigating away from home */
  const isHome = pathname === "/";

  /* Scroll spy — track active section on home page */
  useEffect(() => {
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Pick the one with highest intersection ratio
          const best = visible.reduce((a, b) => a.intersectionRatio > b.intersectionRatio ? a : b);
          setActiveSection(best.target.id);
        }
      },
      { threshold: [0.1, 0.3, 0.5], rootMargin: "-44px 0px -40% 0px" }
    );

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    sections.forEach((s) => observer.observe(s!));
    return () => observer.disconnect();
  }, [isHome]);

  const isActive = (href: string) => {
    if (href === "/blog") return pathname.startsWith("/blog");
    if (href.startsWith("/#")) {
      const section = href.replace("/#", "");
      return isHome && activeSection === section;
    }
    return pathname === href;
  };

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 liquid-glass-nav" role="navigation" aria-label="Main navigation">
      <div className="max-w-[980px] mx-auto px-6 h-11 flex items-center justify-between">
        <Link href="/" className="text-[13px] font-semibold tracking-[-0.01em]" onClick={close}>
          Cappy.
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex gap-7 text-[12px]">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`relative transition-colors duration-300 ${
                isActive(href) ? "text-white/90" : "text-white/50 hover:text-white/90"
              }`}
              aria-current={isActive(href) ? "page" : undefined}
              onClick={close}
            >
              {label}
              {isActive(href) && (
                <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-white/40 rounded-full nav-indicator" />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className={`block w-5 h-[1.5px] bg-white/60 transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-white/60 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-white/60 transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu dropdown */}
      <div className={`sm:hidden overflow-hidden transition-all duration-400 ${menuOpen ? "max-h-60" : "max-h-0"}`} role="menu">
        <div className="px-6 py-4 flex flex-col gap-4 text-[14px]">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={close}
              className={`transition-colors duration-300 ${
                isActive(href) ? "text-white/90" : "text-white/60 hover:text-white/90"
              }`}
              role="menuitem"
              aria-current={isActive(href) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
