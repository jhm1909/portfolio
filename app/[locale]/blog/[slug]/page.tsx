import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ReadingProgress";
import JsonLd from "@/components/JsonLd";
import TableOfContents from "@/components/mdx/TableOfContents";
import {
  getAllSlugs,
  getPostBySlug,
  getAdjacentPosts,
  getRelatedPosts,
  resolveImportSuffix,
} from "@/lib/blog";
import { routing } from "@/i18n/routing";

const localePath = (locale: string, path: string = "") =>
  `${locale === routing.defaultLocale ? "" : "/" + locale}${path}`;

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug, locale);
  if (!post) return {};
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const siteName = t("siteName");

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    if (post.hasTranslation[l]) {
      languages[l] = localePath(l, `/blog/${slug}`);
    }
  }

  return {
    title: `${post.meta.title} — ${siteName}`,
    description: post.meta.excerpt,
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      type: "article",
      publishedTime: post.meta.date,
      url: `https://jeonghamin.dev${localePath(locale, `/blog/${slug}`)}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.excerpt,
    },
    alternates: {
      canonical: `https://jeonghamin.dev${localePath(locale, `/blog/${slug}`)}`,
      languages,
    },
  };
}

const LANG_NAMES: Record<string, string> = {
  en: "English",
  ko: "한국어",
  vi: "Tiếng Việt",
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const post = getPostBySlug(slug, locale);

  if (!post) notFound();

  const t = await getTranslations("BlogPost");
  const { prev, next } = getAdjacentPosts(slug, locale);
  const related = getRelatedPosts(slug, locale);

  const importSuffix = resolveImportSuffix(slug, locale);
  const { default: MdxContent } = await import(
    `@/content/blog/${importSuffix}.mdx`
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta.title,
    description: post.meta.excerpt,
    datePublished: post.meta.date,
    author: {
      "@type": "Person",
      name: "Ha-min Jeong",
      url: "https://jeonghamin.dev",
    },
    url: `https://jeonghamin.dev${localePath(locale, `/blog/${slug}`)}`,
  };

  return (
    <main className="relative min-h-screen" id="main-content">
      <JsonLd data={jsonLd} />

      <div className="bg-ambient" aria-hidden="true">
        <div className="orb absolute top-[15%] right-[20%] w-[400px] h-[400px] rounded-full bg-violet-500/[0.03] blur-[120px]" />
      </div>

      <Nav />
      <ReadingProgress />

      <div className="relative max-w-[680px] mx-auto px-6 pt-32 sm:pt-40 pb-20">
        {/* Desktop ToC — positioned outside article to the right */}
        <aside className="absolute left-full top-0 ml-10 w-[200px] hidden xl:block">
          <div className="pt-32 sm:pt-40">
            <TableOfContents />
          </div>
        </aside>

        <article>
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-5">
              <time
                dateTime={post.meta.date}
                className="text-[11px] text-white/25 font-mono"
              >
                {post.meta.date}
              </time>
              <span className="text-white/10" aria-hidden="true">
                ·
              </span>
              <span className="text-[11px] text-white/25">
                {t("readTime", { minutes: post.readTime })}
              </span>
            </div>
            <h1 className="text-[clamp(28px,4vw,44px)] font-semibold tracking-[-0.03em] leading-[1.15]">
              {post.meta.title}
            </h1>
            {post.isFallback && (
              <p className="mt-3 text-[11px] text-white/20 liquid-glass-pill inline-block px-2.5 py-1">
                {t("writtenIn", { language: LANG_NAMES[post.meta.lang] ?? post.meta.lang })}
              </p>
            )}
          </header>

          {/* Mobile ToC */}
          <div className="xl:hidden">
            <TableOfContents />
          </div>

          <div className="prose-custom">
            <MdxContent />
          </div>
        </article>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="max-w-[680px] mx-auto px-6 pb-12">
          <p className="text-[11px] text-white/20 uppercase tracking-[0.12em] mb-4">
            {t("related")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="liquid-glass group p-6 transition-all duration-500 hover:border-white/[0.12] hover:-translate-y-1"
              >
                <time
                  dateTime={r.meta.date}
                  className="text-[10px] text-white/20 font-mono"
                >
                  {r.meta.date}
                </time>
                <h3 className="text-[14px] font-medium mt-1.5 mb-1.5 group-hover:text-white transition-colors duration-300 leading-snug">
                  {r.meta.title}
                </h3>
                <p className="text-[12px] text-white/30 leading-[1.6] line-clamp-2">
                  {r.meta.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Prev / Next navigation */}
      {(prev || next) && (
        <nav
          className="max-w-[680px] mx-auto px-6 pb-32"
          aria-label={t("navAriaLabel")}
        >
          <div className="border-t border-white/[0.06] pt-8 grid grid-cols-2 gap-4">
            {prev ? (
              <Link href={`/blog/${prev.slug}`} className="group text-left" transitionTypes={["nav-back"]}>
                <span className="text-[10px] text-white/20 uppercase tracking-[0.12em]">
                  {t("previous")}
                </span>
                <p className="text-[14px] text-white/50 group-hover:text-white/80 transition-colors duration-300 mt-1 leading-snug">
                  {prev.meta.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link href={`/blog/${next.slug}`} className="group text-right" transitionTypes={["nav-forward"]}>
                <span className="text-[10px] text-white/20 uppercase tracking-[0.12em]">
                  {t("next")}
                </span>
                <p className="text-[14px] text-white/50 group-hover:text-white/80 transition-colors duration-300 mt-1 leading-snug">
                  {next.meta.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>
      )}

      <Footer narrow />
    </main>
  );
}
