"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const t = useTranslations("BlogPost");
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    const elements = article.querySelectorAll("h2[id], h3[id]");
    const items: Heading[] = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent ?? "",
      level: el.tagName === "H2" ? 2 : 3,
    }));
    setHeadings(items);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    for (const { id } of headings) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const tocList = (
    <ul className="space-y-1.5">
      {headings.map(({ id, text, level }) => (
        <li key={id} className={level === 3 ? "pl-3" : ""}>
          <a
            href={`#${id}`}
            onClick={() => setIsOpen(false)}
            className={`text-[12px] block py-0.5 transition-colors duration-200 leading-snug ${
              activeId === id
                ? "text-white/70"
                : "text-white/25 hover:text-white/50"
            }`}
          >
            {text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Mobile: collapsible at top of article */}
      <div className="xl:hidden mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="liquid-glass-subtle w-full px-4 py-3 text-left text-[13px] text-white/40 rounded-xl flex items-center justify-between"
        >
          <span>{t("toc")}</span>
          <span
            className={`text-[10px] transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
          >
            ▸
          </span>
        </button>
        {isOpen && (
          <div className="liquid-glass-subtle mt-1 px-4 py-3 rounded-xl">
            {tocList}
          </div>
        )}
      </div>

      {/* Desktop: sticky sidebar — rendered in aside outside article */}
      <div className="hidden xl:block">
        <div className="sticky top-32">
          <p className="text-[11px] text-white/20 uppercase tracking-[0.12em] mb-3">
            {t("toc")}
          </p>
          {tocList}
        </div>
      </div>
    </>
  );
}
