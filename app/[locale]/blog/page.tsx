import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlogFilter from "@/components/BlogFilter";
import { posts, getAllTags } from "@/lib/data";
import { routing } from "@/i18n/routing";

const localePath = (locale: string, path: string = "") =>
  `${locale === routing.defaultLocale ? "" : "/" + locale}${path}`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const title = t("blogTitle");
  const description = t("blogDescription");
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localePath(l, "/blog")])
  );

  return {
    title,
    description,
    alternates: {
      canonical: `https://jeonghamin.dev${localePath(locale, "/blog")}`,
      languages,
      types: { "application/rss+xml": "/feed.xml" },
    },
    openGraph: {
      title,
      description,
      url: `https://jeonghamin.dev${localePath(locale, "/blog")}`,
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("BlogList");
  const tags = getAllTags();

  return (
    <main className="relative min-h-screen" id="main-content">
      <div className="bg-ambient" aria-hidden="true">
        <div className="orb absolute top-[10%] right-[15%] w-[500px] h-[500px] rounded-full bg-violet-500/[0.03] blur-[120px]" />
        <div className="orb-reverse absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-sky-500/[0.025] blur-[100px]" />
      </div>

      <Nav />

      <section className="max-w-[980px] mx-auto px-6 pt-32 sm:pt-40 pb-10 sm:pb-14">
        <p className="text-[12px] sm:text-[13px] text-white/35 tracking-[0.12em] uppercase mb-3 sm:mb-4">
          {t("eyebrow")}
        </p>
        <h1 className="text-[clamp(32px,5vw,56px)] font-semibold tracking-[-0.03em]">
          {t("title")}
        </h1>
      </section>

      <section className="max-w-[980px] mx-auto px-6 pb-32">
        <BlogFilter posts={posts} tags={tags} />
      </section>

      <Footer />
    </main>
  );
}
