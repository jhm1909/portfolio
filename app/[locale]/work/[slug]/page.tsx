import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { projects, getProjectBySlug } from "@/lib/data";
import { routing } from "@/i18n/routing";

const localePath = (locale: string, path: string = "") =>
  `${locale === routing.defaultLocale ? "" : "/" + locale}${path}`;

export function generateStaticParams() {
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
    title: `${project.title} — ${siteName}`,
    description: project.description,
    alternates: {
      canonical: `https://jeonghamin.dev${localePath(locale, `/work/${slug}`)}`,
      languages,
    },
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.description,
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: project.link,
    author: { "@type": "Person", name: "Ha-min Jeong" },
  };

  return (
    <main className="relative min-h-screen" id="main-content">
      <JsonLd data={jsonLd} />

      <div className="bg-ambient" aria-hidden="true">
        <div className="orb absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.04]" style={{ background: project.orb }} />
        <div className="orb-reverse absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.03]" style={{ background: project.orb }} />
      </div>

      <Nav />

      <article className="max-w-[780px] mx-auto px-6 pt-32 sm:pt-40 pb-20">
        <header className="mb-16">
          <Link href="/#work" className="inline-flex items-center gap-1 text-[12px] text-white/30 hover:text-white/60 transition-colors duration-300 mb-8">
            ← {t("backToWork")}
          </Link>
          <p className="text-[11px] text-white/30 uppercase tracking-[0.14em] mb-3">{project.subtitle}</p>
          <h1 className="text-[clamp(32px,5vw,56px)] font-semibold tracking-[-0.03em] leading-[1.1] mb-4">
            {project.title}
          </h1>
          <p className="text-[16px] sm:text-[18px] text-white/40 leading-[1.7] font-light max-w-[600px]">
            {project.description}
          </p>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-6 text-[13px] text-white/50 hover:text-white/80 transition-colors duration-300"
            >
              {t("visitSite")} ↗
            </a>
          )}
        </header>

        <div className="flex flex-wrap gap-2 mb-16">
          {project.tech.map((tech) => (
            <span key={tech} className="liquid-glass-pill px-3 py-1.5 text-[11px] text-white/40">{tech}</span>
          ))}
        </div>

        {project.challenge && (
          <section className="space-y-12 mb-16">
            <div>
              <h2 className="text-[11px] text-white/25 uppercase tracking-[0.14em] mb-4">{t("challenge")}</h2>
              <div className="liquid-glass p-6 sm:p-8">
                <p className="text-[15px] text-white/45 leading-[1.8] font-light">{project.challenge}</p>
              </div>
            </div>
            <div>
              <h2 className="text-[11px] text-white/25 uppercase tracking-[0.14em] mb-4">{t("solution")}</h2>
              <div className="liquid-glass p-6 sm:p-8">
                <p className="text-[15px] text-white/45 leading-[1.8] font-light">{project.solution}</p>
              </div>
            </div>
            <div>
              <h2 className="text-[11px] text-white/25 uppercase tracking-[0.14em] mb-4">{t("result")}</h2>
              <div className="liquid-glass p-6 sm:p-8">
                <p className="text-[15px] text-white/45 leading-[1.8] font-light">{project.result}</p>
              </div>
            </div>
          </section>
        )}

        {project.features && (
          <section className="mb-16">
            <h2 className="text-[11px] text-white/25 uppercase tracking-[0.14em] mb-6">{t("features")}</h2>
            <div className="liquid-glass overflow-hidden">
              {project.features.map((f, i) => (
                <div
                  key={i}
                  className={`px-6 sm:px-8 py-4 text-[14px] text-white/45 leading-[1.7] font-light ${
                    i < project.features!.length - 1 ? "border-b border-white/[0.04]" : ""
                  }`}
                >
                  {f}
                </div>
              ))}
            </div>
          </section>
        )}
      </article>

      <Footer />
    </main>
  );
}
