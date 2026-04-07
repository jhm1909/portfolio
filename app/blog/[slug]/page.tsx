import Link from "next/link";
import { notFound } from "next/navigation";

const posts: Record<string, { title: string; date: string; readTime: string; content: string }> = {
  "building-liquid-glass-ui": {
    title: "Building a Liquid Glass UI for the Web",
    date: "2026-04-07",
    readTime: "5 min read",
    content: `
Apple's WWDC25 introduction of Liquid Glass changed how we think about interface materials. The design language treats UI elements as responsive glass — refracting, reflecting, and adapting to their surroundings.

## The Three Layers

According to Apple's documentation, Liquid Glass is composed of three layers:

1. **Highlight** — The specular shine on the top edge that catches light
2. **Shadow** — Depth separation between foreground and background
3. **Illumination** — The flexible material properties that adapt to context

## Translating to CSS

The key CSS properties that make this work on the web:

\`\`\`css
.liquid-glass {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(40px) saturate(180%) brightness(1.1);
  border: 0.5px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.25),
    inset 0 0.5px 0 rgba(255, 255, 255, 0.15);
}
\`\`\`

The \`backdrop-filter\` does the heavy lifting — it blurs and saturates whatever content sits behind the glass element. The \`inset\` box-shadow creates that subtle top-edge highlight.

## Making It Feel Real

The trick to convincing glass is giving it something to refract. I use ambient colored orbs in the background — soft blurred gradients that drift slowly. When glass elements sit on top of these, the backdrop-filter picks up the color and creates that adaptive tinting Apple describes.

## Performance

\`backdrop-filter\` is GPU-accelerated in modern browsers, so the performance cost is minimal. The floating orbs use CSS animations with \`will-change: transform\` to stay on the compositor layer.

The result is a material system that feels alive without being distracting — exactly what Apple intended.
    `,
  },
  "why-simplicity-wins": {
    title: "Why Simplicity Wins in Interface Design",
    date: "2026-03-20",
    readTime: "4 min read",
    content: `
Every feature you add is a decision you're forcing on your user. The best interfaces don't ask users to think — they guide them naturally.

## The Subtraction Game

Design isn't about adding things until it looks good. It's about removing things until it breaks — then adding one thing back.

Apple understands this deeply. Their products feel simple not because they lack features, but because complexity is hidden behind progressive disclosure.

## Practical Rules

Here are the rules I follow:

1. **If you need a label, the icon isn't clear enough.** But if you need the icon, the label alone isn't engaging enough. Use both, or reconsider.

2. **White space isn't empty space.** It's breathing room. Give your content space to be understood.

3. **Reduce choices.** Every dropdown with 20 options is a failure of information architecture. Group, filter, or default.

4. **Motion should explain, not decorate.** An animation that doesn't help the user understand what just happened is noise.

## The Test

Show your interface to someone for 5 seconds. Then take it away and ask them what they can do on that page. If they can't tell you, it's not simple enough.

Simplicity isn't the starting point. It's the destination you reach after understanding the problem deeply enough to remove everything that doesn't matter.
    `,
  },
  "my-dev-setup-2026": {
    title: "My Development Setup in 2026",
    date: "2026-03-01",
    readTime: "6 min read",
    content: `
Every developer has their setup. Here's mine — optimized for speed, focus, and minimal context-switching.

## Editor

**VS Code** with a minimal config. Theme: One Dark Pro. Font: JetBrains Mono. I keep extensions to a minimum — ESLint, Prettier, Tailwind IntelliSense, and GitLens. That's it.

## Terminal

**Windows Terminal** with a custom profile. Shell: bash via Git Bash. I use \`starship\` for the prompt because it's fast and gives me just the info I need — branch, Node version, and whether I have uncommitted changes.

## Stack

For most projects I reach for:

- **Next.js** — the best React framework, period
- **TypeScript** — I can't imagine writing JS without it
- **Tailwind CSS** — utility-first changed how I think about styling
- **Prisma** — the ORM that actually makes databases enjoyable
- **Vercel** — deploy in seconds, no config

## AI Tools

**Claude Code** is my daily driver for AI-assisted development. It understands context, reads my codebase, and helps me ship faster without sacrificing code quality.

## Philosophy

My setup philosophy is: fewer tools, known deeply. I'd rather master 5 tools than be mediocre with 20. Every tool in my stack has earned its place by saving me real time, not just looking cool in a dotfiles repo.
    `,
  },
};

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) notFound();

  return (
    <main className="relative min-h-screen">
      <div className="bg-ambient">
        <div className="orb absolute top-[15%] right-[20%] w-[400px] h-[400px] rounded-full bg-violet-500/[0.03] blur-[120px]" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 liquid-glass-nav">
        <div className="max-w-[980px] mx-auto px-6 h-11 flex items-center justify-between">
          <Link href="/" className="text-[13px] font-semibold tracking-[-0.01em]">Capy.</Link>
          <Link href="/blog" className="text-[12px] text-white/50 hover:text-white/90 transition-colors duration-300">
            Back to Blog
          </Link>
        </div>
      </nav>

      <article className="max-w-[680px] mx-auto px-6 pt-32 sm:pt-40 pb-32">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-5">
            <span className="text-[11px] text-white/25 font-mono">{post.date}</span>
            <span className="text-white/10">·</span>
            <span className="text-[11px] text-white/25">{post.readTime}</span>
          </div>
          <h1 className="text-[clamp(28px,4vw,44px)] font-semibold tracking-[-0.03em] leading-[1.15]">
            {post.title}
          </h1>
        </header>

        <div className="prose-custom">
          {post.content.split("\n\n").map((block, i) => {
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
          })}
        </div>
      </article>

      <footer className="border-t border-white/[0.04]">
        <div className="max-w-[680px] mx-auto px-6 py-4 flex items-center justify-between text-[10px] sm:text-[11px] text-white/20">
          <span>&copy; 2026 Capy. All rights reserved.</span>
          <Link href="/blog" className="hover:text-white/50 transition-colors duration-300">All posts</Link>
        </div>
      </footer>
    </main>
  );
}
