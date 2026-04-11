import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageTransition from "@/components/PageTransition";
import JsonLd from "@/components/JsonLd";
import { routing } from "@/i18n/routing";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
});

const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  ko: "ko_KR",
  vi: "vi_VN",
};

const localePath = (locale: string, path: string = "") =>
  `${locale === routing.defaultLocale ? "" : "/" + locale}${path}`;

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const title = t("rootTitle");
  const description = t("rootDescription");
  const siteName = t("siteName");

  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((l) => [l, localePath(l, "/")])
  );
  languages["x-default"] = localePath(routing.defaultLocale, "/");

  return {
    title: { default: title, template: "%s" },
    description,
    keywords: [
      "Ha-min Jeong",
      "정하민",
      "full-stack developer",
      "Next.js developer",
      "React developer",
      "Korea freelance developer",
      "AI integration",
      "SaaS MVP",
      "freelance web developer",
    ],
    authors: [{ name: "Ha-min Jeong", url: "https://github.com/jhm1909" }],
    creator: "Ha-min Jeong",
    metadataBase: new URL("https://jeonghamin.dev"),
    alternates: {
      canonical: localePath(locale, "/"),
      languages,
      types: { "application/rss+xml": "/feed.xml" },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: OG_LOCALE[locale] ?? "en_US",
      url: `https://jeonghamin.dev${localePath(locale, "/")}`,
      siteName,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    icons: { icon: "/favicon.svg" },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ha-min Jeong",
    alternateName: "정하민",
    url: "https://jeonghamin.dev",
    email: "jeonghamin1909@gmail.com",
    jobTitle: "Full-Stack Developer",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
    },
    sameAs: ["https://github.com/jhm1909"],
    knowsLanguage: ["en", "ko", "vi"],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ha-min Jeong",
    alternateName: "정하민",
    url: "https://jeonghamin.dev",
    inLanguage: ["en", "ko", "vi"],
    author: { "@type": "Person", name: "Ha-min Jeong" },
  };

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <JsonLd data={personJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <NextIntlClientProvider>
          <PageTransition>{children}</PageTransition>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
