import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlogFilter from "@/components/BlogFilter";
import { posts, getAllTags } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog — Cappy",
  description: "Thoughts on development, design, and building digital experiences.",
  alternates: {
    canonical: "https://cappy.dev/blog",
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    title: "Blog — Cappy",
    description: "Thoughts on development, design, and building digital experiences.",
    url: "https://cappy.dev/blog",
  },
};

export default function BlogPage() {
  const tags = getAllTags();

  return (
    <main className="relative min-h-screen" id="main-content">
      {/* Ambient */}
      <div className="bg-ambient" aria-hidden="true">
        <div className="orb absolute top-[10%] right-[15%] w-[500px] h-[500px] rounded-full bg-violet-500/[0.03] blur-[120px]" />
        <div className="orb-reverse absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-sky-500/[0.025] blur-[100px]" />
      </div>

      <Nav />

      {/* Header */}
      <section className="max-w-[980px] mx-auto px-6 pt-32 sm:pt-40 pb-10 sm:pb-14">
        <p className="text-[12px] sm:text-[13px] text-white/35 tracking-[0.12em] uppercase mb-3 sm:mb-4">Blog</p>
        <h1 className="text-[clamp(32px,5vw,56px)] font-semibold tracking-[-0.03em]">
          Thoughts &amp; writings.
        </h1>
      </section>

      {/* Posts with filter */}
      <section className="max-w-[980px] mx-auto px-6 pb-32">
        <BlogFilter posts={posts} tags={tags} />
      </section>

      <Footer />
    </main>
  );
}
