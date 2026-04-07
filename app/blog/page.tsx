import Link from "next/link";

const posts = [
  {
    slug: "building-liquid-glass-ui",
    title: "Building a Liquid Glass UI for the Web",
    excerpt: "How I recreated Apple's WWDC25 Liquid Glass design language using CSS backdrop-filter, layered materials, and subtle depth cues.",
    date: "2026-04-07",
    readTime: "5 min read",
  },
  {
    slug: "why-simplicity-wins",
    title: "Why Simplicity Wins in Interface Design",
    excerpt: "The best interfaces feel invisible. Here's how I approach design decisions with restraint and purpose.",
    date: "2026-03-20",
    readTime: "4 min read",
  },
  {
    slug: "my-dev-setup-2026",
    title: "My Development Setup in 2026",
    excerpt: "The tools, extensions, and workflows I use every day to stay productive and ship faster.",
    date: "2026-03-01",
    readTime: "6 min read",
  },
];

export default function BlogPage() {
  return (
    <main className="relative min-h-screen">
      {/* Ambient */}
      <div className="bg-ambient">
        <div className="orb absolute top-[10%] right-[15%] w-[500px] h-[500px] rounded-full bg-violet-500/[0.03] blur-[120px]" />
        <div className="orb-reverse absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-sky-500/[0.025] blur-[100px]" />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 liquid-glass-nav">
        <div className="max-w-[980px] mx-auto px-6 h-11 flex items-center justify-between">
          <Link href="/" className="text-[13px] font-semibold tracking-[-0.01em]">Cappy.</Link>
          <div className="flex gap-7 text-[12px] text-white/50">
            <Link href="/#work" className="hover:text-white/90 transition-colors duration-300">Work</Link>
            <Link href="/#about" className="hover:text-white/90 transition-colors duration-300">About</Link>
            <Link href="/#contact" className="hover:text-white/90 transition-colors duration-300">Contact</Link>
            <Link href="/blog" className="text-white/90">Blog</Link>
          </div>
        </div>
      </nav>

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
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="liquid-glass relative cursor-pointer group transition-all duration-500 hover:border-white/[0.12] hover:-translate-y-1 hover:shadow-[0_24px_60px_-16px_rgba(0,0,0,0.4)]">
                <div className="relative z-10 p-6 sm:p-8 md:p-10">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                    <span className="text-[11px] text-white/20 font-mono">{post.date}</span>
                    <span className="hidden sm:block text-white/10">·</span>
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

      {/* Footer */}
      <footer className="border-t border-white/[0.04]">
        <div className="max-w-[980px] mx-auto px-6 py-4 flex items-center justify-between text-[10px] sm:text-[11px] text-white/20">
          <span>&copy; 2026 Cappy. All rights reserved.</span>
          <Link href="/" className="hover:text-white/50 transition-colors duration-300">Home</Link>
        </div>
      </footer>
    </main>
  );
}
