"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { FLAGS } from "./flags";

const LANGUAGES = [
  { code: "en", native: "English" },
  { code: "ko", native: "한국어" },
  { code: "vi", native: "Tiếng Việt" },
] as const;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true"
      className={`transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${open ? "rotate-180" : ""}`}>
      <path d="M1.5 3L4 5.5L6.5 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function LanguageSwitcher({ inline = false }: { inline?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("LanguageSwitcher");

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("mousedown", h);
    document.addEventListener("keydown", k);
    return () => { document.removeEventListener("mousedown", h); document.removeEventListener("keydown", k); };
  }, [open, close]);

  const go = (code: string) => {
    if (routing.locales.includes(code as (typeof routing.locales)[number])) {
      router.replace(pathname, { locale: code });
    }
    close();
  };

  const CurrentFlag = FLAGS[locale];

  const renderItem = (lang: (typeof LANGUAGES)[number]) => {
    const LangFlag = FLAGS[lang.code];
    const active = lang.code === locale;
    return (
      <li key={lang.code} role="option" aria-selected={active}>
        <button
          onClick={() => go(lang.code)}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-full
            transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
            ${active
              ? "text-white/90 bg-white/[0.08]"
              : "text-white/50 hover:text-white/80 hover:bg-white/[0.06]"}
          `}
        >
          {LangFlag && <LangFlag size={24} />}
          <span className="flex-1 text-left text-[13px] tracking-[-0.01em]">{lang.native}</span>
          {active && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="text-white/40">
              <path d="M2 6.5L4.5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </li>
    );
  };

  /* ── Inline (mobile) ─────────────────────────── */
  if (inline) {
    return (
      <div ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 py-1 text-white/50 hover:text-white/80 transition-colors duration-300"
          aria-expanded={open} aria-haspopup="listbox" aria-label={`${locale.toUpperCase()} – ${t("label")}`}
        >
          {CurrentFlag && <CurrentFlag size={20} />}
          <span className="uppercase text-[12px] font-medium tracking-wider">{locale}</span>
          <Chevron open={open} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          open ? "max-h-48 opacity-100 mt-1.5" : "max-h-0 opacity-0"
        }`}>
          <ul role="listbox" className="space-y-0.5 py-1">
            {LANGUAGES.map(renderItem)}
          </ul>
        </div>
      </div>
    );
  }

  /* ── Floating (desktop) ──────────────────────── */
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`
          flex items-center gap-1.5 pl-1.5 pr-2 py-1 rounded-full text-[12px]
          transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
          ${open
            ? "text-white/80 bg-white/[0.08]"
            : "text-white/50 hover:text-white/80 hover:bg-white/[0.06]"}
        `}
        aria-expanded={open} aria-haspopup="listbox" aria-label={`${locale.toUpperCase()} – ${t("label")}`}
      >
        {CurrentFlag && <CurrentFlag size={16} />}
        <span className="uppercase font-medium tracking-wider">{locale}</span>
        <Chevron open={open} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 lang-menu-enter">
          <div
            className="liquid-glass-elevated rounded-full overflow-hidden min-w-[200px]"
            role="dialog" aria-label={t("label")}
          >
            <div className="relative z-10 p-1.5">
              <ul role="listbox" className="space-y-0.5">
                {LANGUAGES.map(renderItem)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
