"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@/lib/blog";

interface BlogFilterProps {
  posts: BlogPost[];
  tags: string[];
}

export default function BlogFilter({ posts, tags }: BlogFilterProps) {
  const t = useTranslations("BlogList");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = posts.filter((post) => {
    const matchesTag = !activeTag || post.meta.tags.includes(activeTag);
    const matchesSearch =
      !search ||
      post.meta.title.toLowerCase().includes(search.toLowerCase()) ||
      post.meta.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <>
      {/* Search + tags */}
      <div className="mb-8 space-y-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-[13px] text-white/80 placeholder:text-white/15 outline-none focus:border-white/15 focus-visible:ring-1 focus-visible:ring-white/20 transition-colors duration-300"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={`liquid-glass-pill px-3 py-1 text-[11px] transition-all duration-300 ${
              !activeTag
                ? "text-white/80 bg-white/[0.08] border-white/[0.15]"
                : "text-white/35 hover:text-white/60"
            }`}
          >
            {t("allTagFilter")}
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`liquid-glass-pill px-3 py-1 text-[11px] transition-all duration-300 ${
                activeTag === tag
                  ? "text-white/80 bg-white/[0.08] border-white/[0.15]"
                  : "text-white/35 hover:text-white/60"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <p className="text-center text-[14px] text-white/25 py-12">
            {t("noResults")}
          </p>
        )}
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block"
          >
            <article className="liquid-glass relative group transition-all duration-500 hover:border-white/[0.12] hover:-translate-y-1 hover:shadow-[0_24px_60px_-16px_rgba(0,0,0,0.4)]">
              <div className="relative z-10 p-6 sm:p-8 md:p-10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                  <time
                    dateTime={post.meta.date}
                    className="text-[11px] text-white/20 font-mono"
                  >
                    {post.meta.date}
                  </time>
                  <span
                    className="hidden sm:block text-white/10"
                    aria-hidden="true"
                  >
                    ·
                  </span>
                  <span className="text-[11px] text-white/20">
                    {t("readTime", { minutes: post.readTime })}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-semibold tracking-[-0.01em] mb-2 group-hover:text-white transition-colors duration-300">
                  {post.meta.title}
                </h2>
                <p className="text-[13px] sm:text-[14px] text-white/35 leading-[1.7] mb-3">
                  {post.meta.excerpt}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {post.meta.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-white/20 bg-white/[0.03] px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
}
