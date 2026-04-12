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
  getAllProjects,
  getProjectBySlug,
  getAdjacentProjects,
} from "@/lib/work";
import { routing } from "@/i18n/routing";

const localePath = (locale: string, path: string = "") =>
  `${locale === routing.defaultLocale ? "" : "/" + locale}${path}`;

export function generateStaticParams() {
  const projects = getAllProjects();
  return routing.locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const siteName = t("siteName");

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localePath(l, `/work/${slug}`)])
  );

  return {
    title: `${project.meta.title} — ${siteName}`,
    description: project.meta.description,
    alternates: {
      canonical: `https://jeonghamin.dev${localePath(locale, `/work/${slug}`)}`,
      languages,
    },
    openGraph: {
      title: `${project.meta.title} — Case Study`,
      description: project.meta.description,
      url: `https://jeonghamin.dev${localePath(locale, `/work/${slug}`)}`,
    },
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const t = await getTranslations("CaseStudy");
  const { prev, next } = getAdjacentProjects(slug);
  const { default: MdxContent } = await import(
    `@/content/work/${slug}.mdx`
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.meta.title,
    description: project.meta.description,
    url: project.meta.link,
    author: { "@type": "Person", name: "Ha-min Jeong" },
  };

  return (
    <main className="relative min-h-screen" id="main-content">
      <JsonLd data={jsonLd} />

      <div className="bg-ambient" aria-hidden="true">
        <div
          className="orb absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.04]"
          style={{ background: project.meta.orb }}
        />
        <div
          className="orb-reverse absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.03]"
          style={{ background: project.meta.orb }}
        />
      </div>

      <Nav />
      <ReadingProgress />

      <div className="relative max-w-[780px] mx-auto px-6 pt-32 sm:pt-40 pb-20">
        {/* Desktop ToC — positioned outside article to the right */}
        <aside className="absolute left-full top-0 ml-10 w-[200px] hidden xl:block">
          <div className="pt-32 sm:pt-40">
            <TableOfContents />
          </div>
        </aside>

        <article>
          <header className="mb-16">
          <Link
            href="/#work"
            className="inline-flex items-center gap-1 text-[12px] text-white/30 hover:text-white/60 transition-colors duration-300 mb-8"
          >
            ← {t("backToWork")}
          </Link>
          <p className="text-[11px] text-white/30 uppercase tracking-[0.14em] mb-3">
            {project.meta.subtitle}
          </p>
          <h1 className="text-[clamp(32px,5vw,56px)] font-semibold tracking-[-0.03em] leading-[1.1] mb-4">
            {project.meta.title}
          </h1>
          <p className="text-[16px] sm:text-[18px] text-white/40 leading-[1.7] font-light max-w-[600px]">
            {project.meta.description}
          </p>
          {project.meta.link && (
            <a
              href={project.meta.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-6 text-[13px] text-white/50 hover:text-white/80 transition-colors duration-300"
            >
              {t("visitSite")} ↗
            </a>
          )}
        </header>

        <div className="flex flex-wrap gap-2 mb-10">
          {project.meta.tech.map((tech) => (
            <span
              key={tech}
              className="liquid-glass-pill px-3 py-1.5 text-[11px] text-white/40"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Metrics cards */}
        {project.meta.metrics && project.meta.metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-16">
            {project.meta.metrics.map((m) => (
              <div
                key={m.label}
                className="liquid-glass-subtle rounded-xl p-5 text-center"
              >
                <p className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] mb-1">
                  {m.value}
                </p>
                <p className="text-[11px] text-white/30 uppercase tracking-[0.1em]">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Mobile ToC */}
        <div className="xl:hidden">
          <TableOfContents />
        </div>

        {/* MDX content */}
        <div className="prose-custom">
          <MdxContent />
        </div>
        </article>
      </div>

      {/* Prev / Next project navigation */}
      {(prev || next) && (
        <nav
          className="max-w-[780px] mx-auto px-6 pb-32"
          aria-label={t("projectNavAriaLabel")}
        >
          <div className="border-t border-white/[0.06] pt-8 grid grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/work/${prev.slug}`}
                className="group text-left"
              >
                <span className="text-[10px] text-white/20 uppercase tracking-[0.12em]">
                  {t("previousProject")}
                </span>
                <p className="text-[14px] text-white/50 group-hover:text-white/80 transition-colors duration-300 mt-1 leading-snug">
                  {prev.meta.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/work/${next.slug}`}
                className="group text-right"
              >
                <span className="text-[10px] text-white/20 uppercase tracking-[0.12em]">
                  {t("nextProject")}
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

      <Footer />
    </main>
  );
}
