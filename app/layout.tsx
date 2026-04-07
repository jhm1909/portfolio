import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Capy — Developer",
  description: "Crafting digital experiences with precision and purpose.",
  metadataBase: new URL("https://capy.dev"),
  openGraph: {
    title: "Capy — Developer",
    description: "Crafting digital experiences with precision and purpose.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Capy — Developer",
    description: "Crafting digital experiences with precision and purpose.",
  },
  icons: {
    icon: "/favicon.svg",
  },
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
          <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
