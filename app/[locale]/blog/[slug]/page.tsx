import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ReadingProgress";
import JsonLd from "@/components/JsonLd";
import { posts, getPostBySlug, getAdjacentPosts } from "@/lib/data";
import { routing } from "@/i18n/routing";

const localePath = (locale: string, path: string = "") =>
  `${locale === routing.defaultLocale ? "" : "/" + locale}${path}`;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    posts.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const siteName = t("siteName");

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localePath(l, `/blog/${slug}`)])
  );

  return {
    title: `${post.title} — ${siteName}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      url: `https://jeonghamin.dev${localePath(locale, `/blog/${slug}`)}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `https://jeonghamin.dev${localePath(locale, `/blog/${slug}`)}`,
      languages,
    },
  };
}

function renderContent(content: string) {
  return content.split("\n\n").map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith("## ")) {
      return <h2 key={i} className="text-xl font-semibold mt-12 mb-4 tracking-[-0.01em]">{trimmed.replace("## ", "")}</h2>;
    }

    if (trimmed.startsWith("```")) {
      const code = trimmed.replace(/```\w*\n?/, "").replace(/```$/, "").trim();
      return (
        <pre key={i} className="liquid-glass-subtle rounded-xl p-5 my-6 overflow-x-auto">
          <code className="text-[13px] text-white/60 font-mono leading-relaxed">{code}</code>
        </pre>
      );
    }

    if (trimmed.startsWith("1. ") || trimmed.startsWith("- ")) {
      const items = trimmed.split("\n").filter(Boolean);
      const isOrdered = trimmed.startsWith("1. ");
      const Tag = isOrdered ? "ol" : "ul";
      return (
        <Tag key={i} className={`my-4 space-y-2 ${isOrdered ? "list-decimal" : "list-disc"} pl-5`}>
          {items.map((item, j) => (
            <li key={j} className="text-[15px] text-white/45 leading-[1.8] font-light">
              {item.replace(/^\d+\.\s+|^-\s+/, "").split("**").map((part, k) =>
                k % 2 === 1 ? <strong key={k} className="text-white/70 font-medium">{part}</strong> : part
              )}
            </li>
          ))}
        </Tag>
      );
    }

    return (
      <p key={i} className="text-[15px] text-white/45 leading-[1.85] font-light my-4">
        {trimmed.split("**").map((part, k) =>
          k % 2 === 1 ? <strong key={k} className="text-white/70 font-medium">{part}</strong> : part
        ).flatMap((part, k) =>
          typeof part === "string"
            ? part.split(/`([^`]+)`/).map((seg, j) =>
                j % 2 === 1
                  ? <code key={`${k}-${j}`} className="text-[13px] text-white/60 bg-white/[0.04] px-1.5 py-0.5 rounded font-mono">{seg}</code>
                  : seg
              )
            : part
        )}
      </p>
    );
  });
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const t = await getTranslations("BlogPost");
  const { prev, next } = getAdjacentPosts(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: "Ha-min Jeong", url: "https://jeonghamin.dev" },
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

      <article className="max-w-[680px] mx-auto px-6 pt-32 sm:pt-40 pb-20">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-5">
            <time dateTime={post.date} className="text-[11px] text-white/25 font-mono">{post.date}</time>
            <span className="text-white/10" aria-hidden="true">·</span>
            <span className="text-[11px] text-white/25">{post.readTime}</span>
          </div>
          <h1 className="text-[clamp(28px,4vw,44px)] font-semibold tracking-[-0.03em] leading-[1.15]">
            {post.title}
          </h1>
        </header>

        <div className="prose-custom">
          {renderContent(post.content)}
        </div>
      </article>

      {(prev || next) && (
        <nav className="max-w-[680px] mx-auto px-6 pb-32" aria-label={t("navAriaLabel")}>
          <div className="border-t border-white/[0.06] pt-8 grid grid-cols-2 gap-4">
            {prev ? (
              <Link href={`/blog/${prev.slug}`} className="group text-left">
                <span className="text-[10px] text-white/20 uppercase tracking-[0.12em]">{t("previous")}</span>
                <p className="text-[14px] text-white/50 group-hover:text-white/80 transition-colors duration-300 mt-1 leading-snug">
                  {prev.title}
                </p>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/blog/${next.slug}`} className="group text-right">
                <span className="text-[10px] text-white/20 uppercase tracking-[0.12em]">{t("next")}</span>
                <p className="text-[14px] text-white/50 group-hover:text-white/80 transition-colors duration-300 mt-1 leading-snug">
                  {next.title}
                </p>
              </Link>
            ) : <div />}
          </div>
        </nav>
      )}

      <Footer narrow />
    </main>
  );
}
