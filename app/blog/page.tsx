import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { posts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog — Cappy",
  description: "Thoughts on development, design, and building digital experiences.",
  alternates: {
    canonical: "https://cappy.dev/blog",
  },
  openGraph: {
    title: "Blog — Cappy",
    description: "Thoughts on development, design, and building digital experiences.",
    url: "https://cappy.dev/blog",
  },
};

export default function BlogPage() {
  return (
    <main className="relative min-h-screen" id="main-content">
      {/* Ambient */}
      <div className="bg-ambient" aria-hidden="true">
        <div className="orb absolute top-[10%] right-[15%] w-[500px] h-[500px] rounded-full bg-violet-500/[0.03] blur-[120px]" />
        <div className="orb-reverse absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-sky-500/[0.025] blur-[100px]" />
      </div>

      <Nav />

      {/* Header */}
      <section className="max-w-[980px] mx-auto px-6 pt-32 sm:pt-40 pb-16 sm:pb-20">
        <p className="text-[12px] sm:text-[13px] text-white/35 tracking-[0.12em] uppercase mb-3 sm:mb-4">Blog</p>
        <h1 className="text-[clamp(32px,5vw,56px)] font-semibold tracking-[-0.03em]">
          Thoughts &amp; writings.
        </h1>
      </section>

      {/* Posts */}
      <section className="max-w-[980px] mx-auto px-6 pb-32">
        <div className="space-y-4">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
              <article className="liquid-glass relative group transition-all duration-500 hover:border-white/[0.12] hover:-translate-y-1 hover:shadow-[0_24px_60px_-16px_rgba(0,0,0,0.4)]">
                <div className="relative z-10 p-6 sm:p-8 md:p-10">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                    <time dateTime={post.date} className="text-[11px] text-white/20 font-mono">{post.date}</time>
                    <span className="hidden sm:block text-white/10" aria-hidden="true">·</span>
                    <span className="text-[11px] text-white/20">{post.readTime}</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold tracking-[-0.01em] mb-2 group-hover:text-white transition-colors duration-300">
                    {post.title}
                  </h2>
                  <p className="text-[13px] sm:text-[14px] text-white/35 leading-[1.7]">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
