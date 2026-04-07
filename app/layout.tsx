import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import PageTransition from "@/components/PageTransition";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cappy — Developer",
    template: "%s",
  },
  description: "Crafting digital experiences with precision and purpose.",
  metadataBase: new URL("https://cappy.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cappy — Developer",
    description: "Crafting digital experiences with precision and purpose.",
    type: "website",
    locale: "en_US",
    url: "https://cappy.dev",
    siteName: "Cappy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cappy — Developer",
    description: "Crafting digital experiences with precision and purpose.",
  },
  icons: {
    icon: "/favicon.svg",
  },
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Cappy",
  url: "https://cappy.dev",
  jobTitle: "Developer & Designer",
  sameAs: [
    "https://github.com/jhm1909",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <JsonLd data={personJsonLd} />
        <a
          href="#main-content"
          className="skip-to-content"
        >
          Skip to content
        </a>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
