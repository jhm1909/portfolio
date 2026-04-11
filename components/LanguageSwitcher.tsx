"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider">
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-2">
          {i > 0 && <span className="text-white/10" aria-hidden="true">·</span>}
          <button
            onClick={() => router.replace(pathname, { locale: loc })}
            className={`uppercase transition-colors duration-300 ${
              loc === locale ? "text-white/80" : "text-white/25 hover:text-white/60"
            }`}
            aria-label={`Switch language to ${loc.toUpperCase()}`}
            aria-current={loc === locale ? "true" : undefined}
          >
            {loc}
          </button>
        </span>
      ))}
    </div>
  );
}
