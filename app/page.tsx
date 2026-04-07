"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ───── Data ───── */

const projects = [
  {
    title: "MyCar",
    subtitle: "Automotive Platform",
    description:
      "A bilingual car marketplace with AI-powered recommendations, budget-based search, vehicle comparison, and dealership locator with interactive maps.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "AI/ML"],
    orb: "#38bdf8",
    link: "https://mycar-orcin.vercel.app/ko",
  },
  {
    title: "AI Chat Application",
    subtitle: "Conversational AI",
    description:
      "Real-time conversational interface powered by large language models with streaming responses and persistent history.",
    tech: ["React", "Node.js", "WebSocket", "OpenAI"],
    orb: "#a78bfa",
  },
  {
    title: "Task Management",
    subtitle: "Productivity Suite",
    description:
      "Kanban-style project management with drag-and-drop workflows, real-time collaboration, and team analytics.",
    tech: ["Next.js", "Supabase", "Tailwind CSS"],
    orb: "#34d399",
  },
  {
    title: "Weather Dashboard",
    subtitle: "Data Visualization",
    description:
      "Beautiful weather visualization with animated maps, location search, and 7-day forecasts rendered with D3.js.",
    tech: ["React", "D3.js", "Weather API"],
    orb: "#fbbf24",
  },
];

const skills = [
  "React", "Next.js", "TypeScript", "Node.js",
  "Tailwind CSS", "PostgreSQL", "Prisma", "Docker",
  "Git", "AWS", "Vercel", "Figma",
];

const experience = [
  { role: "Frontend Developer", company: "Tech Corp", period: "2023 — Present", desc: "Leading frontend architecture and design systems." },
  { role: "Full-Stack Intern", company: "Startup Inc", period: "2022 — 2023", desc: "Shipped 12 features across web and mobile." },
  { role: "Freelance Developer", company: "Independent", period: "2021 — 2022", desc: "Delivered 8 projects for 5 clients." },
];

/* ───── Icons ───── */

function Arrow({ className }: { className?: string }) {
  return (
    <svg width="7" height="10" viewBox="0 0 7 10" fill="none" className={className}>
      <path d="M1.5 1L5.5 5L1.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ───── Page ───── */

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  /* Scroll reveal */
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal, .reveal-stagger");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );

    // Small delay to let page transition finish, then observe
    const timer = setTimeout(() => {
      elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  /* Hero orb parallax */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return; // skip on touch devices

    const orbs = hero.querySelectorAll<HTMLDivElement>("[data-speed]");
    const handleMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      orbs.forEach((orb) => {
        const s = parseFloat(orb.dataset.speed || "1");
        orb.style.transform = `translate(${cx * s * 50}px, ${cy * s * 50}px)`;
        orb.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
      });
    };
    hero.addEventListener("mousemove", handleMove);
    return () => hero.removeEventListener("mousemove", handleMove);
  }, []);

  /* Close menu on nav click */
  const navClick = () => setMenuOpen(false);

  /* Contact form handler — opens mailto with form data */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact: ${formState.name}`);
    const body = encodeURIComponent(`From: ${formState.name} (${formState.email})\n\n${formState.message}`);
    window.location.href = `mailto:hello@cappy.dev?subject=${subject}&body=${body}`;
    setFormStatus("sent");
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <main className="relative">
      {/* ── Ambient background ── */}
      <div className="bg-ambient">
        <div className="orb absolute top-[8%] left-[12%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-sky-500/[0.035] blur-[120px]" />
        <div className="orb-reverse absolute top-[50%] right-[8%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-violet-500/[0.03] blur-[120px]" />
        <div className="orb absolute bottom-[5%] left-[30%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-indigo-500/[0.025] blur-[100px]" />
      </div>

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 liquid-glass-nav">
        <div className="max-w-[980px] mx-auto px-6 h-11 flex items-center justify-between">
          <a href="#" className="text-[13px] font-semibold tracking-[-0.01em]">Cappy.</a>

          {/* Desktop nav */}
          <div className="hidden sm:flex gap-7 text-[12px] text-white/50">
            {["Work", "About", "Contact", "Blog"].map((s) => (
              <a key={s} href={s === "Blog" ? "/blog" : `#${s.toLowerCase()}`} className="hover:text-white/90 transition-colors duration-300">{s}</a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[1.5px] bg-white/60 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-white/60 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-white/60 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>
        </div>

        {/* Mobile menu dropdown */}
        <div className={`sm:hidden overflow-hidden transition-all duration-400 ${menuOpen ? "max-h-60" : "max-h-0"}`}>
          <div className="px-6 py-4 flex flex-col gap-4 text-[14px] text-white/60">
            {["Work", "About", "Contact", "Blog"].map((s) => (
              <a
                key={s}
                href={s === "Blog" ? "/blog" : `#${s.toLowerCase()}`}
                onClick={navClick}
                className="hover:text-white/90 transition-colors duration-300"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div data-speed="2" className="absolute top-[20%] left-[15%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-sky-400/[0.05] blur-[80px] pointer-events-none" />
        <div data-speed="1.2" className="absolute bottom-[15%] right-[15%] w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] rounded-full bg-violet-400/[0.04] blur-[80px] pointer-events-none" />
        <div data-speed="0.8" className="absolute top-[45%] right-[30%] w-[180px] sm:w-[250px] h-[180px] sm:h-[250px] rounded-full bg-fuchsia-400/[0.03] blur-[60px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <p className="reveal text-[12px] sm:text-[13px] text-white/40 tracking-[0.12em] uppercase mb-6 sm:mb-8">
            Developer &amp; Designer
          </p>
          <h1 className="reveal text-gradient-hero text-[clamp(36px,8vw,96px)] font-semibold tracking-[-0.04em] leading-[1.08]">
            Crafting digital
            <br />
            experiences.
          </h1>
          <p className="reveal mt-6 sm:mt-8 text-[15px] sm:text-[21px] text-white/40 max-w-[500px] mx-auto leading-[1.65] font-light px-2">
            I build interfaces that feel effortless — simple, precise, and purposeful.
          </p>
          <div className="reveal mt-10 sm:mt-14 flex flex-col sm:flex-row justify-center gap-3">
            <a href="#work" className="btn-liquid liquid-glass-elevated inline-flex items-center justify-center gap-2 text-white text-[13px] font-medium px-7 py-3 rounded-full">
              See my work <Arrow className="link-arrow mt-px" />
            </a>
            <a href="#contact" className="btn-liquid liquid-glass-subtle inline-flex items-center justify-center gap-2 text-white/60 text-[13px] font-medium px-7 py-3 rounded-full">
              Get in touch
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-25 hidden sm:block">
          <div className="w-[26px] h-[42px] border border-white/15 rounded-full flex justify-center pt-2">
            <div className="w-[3px] h-[6px] bg-white/25 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── Work ── */}
      <section id="work" className="relative py-20 sm:py-32 lg:py-44">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="reveal text-center mb-14 sm:mb-24">
            <p className="text-[12px] sm:text-[13px] text-white/35 tracking-[0.12em] uppercase mb-3 sm:mb-4">Selected Work</p>
            <h2 className="text-[clamp(28px,5vw,56px)] font-semibold tracking-[-0.03em]">
              Things I&apos;ve built.
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {projects.map((project, i) => (
              <div key={project.title} className="reveal">
                <article className="project-card liquid-glass relative cursor-pointer">
                  <div
                    className="absolute -top-10 -right-10 w-36 sm:w-48 h-36 sm:h-48 rounded-full blur-[80px] pointer-events-none opacity-30"
                    style={{ background: project.orb }}
                  />
                  <div className="relative z-10 p-6 sm:p-10 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6 sm:gap-10">
                    <div className="flex-1 max-w-lg">
                      <p className="text-[10px] sm:text-[11px] text-white/30 uppercase tracking-[0.14em] mb-3 sm:mb-4">{project.subtitle}</p>
                      <h3 className="text-xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-[1.15] mb-3 sm:mb-4">{project.title}</h3>
                      <p className="text-[13px] sm:text-[14px] text-white/40 leading-[1.75] mb-4 sm:mb-6">{project.description}</p>
                      <a
                        href={project.link || "#"}
                        target={project.link ? "_blank" : undefined}
                        rel={project.link ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1.5 text-white/60 text-[12px] sm:text-[13px] hover:text-white/90 transition-colors duration-300"
                      >
                        {project.link ? "View live" : "View project"} <Arrow className="link-arrow mt-px" />
                      </a>
                    </div>
                    <div className="flex-shrink-0 w-full md:w-[300px] h-[140px] sm:h-[190px] rounded-2xl liquid-glass-subtle flex items-center justify-center">
                      <span className="text-4xl sm:text-5xl font-semibold text-white/[0.04] select-none">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[400px] mx-auto"><div className="section-divider" /></div>

      {/* ── About ── */}
      <section id="about" className="py-20 sm:py-32 lg:py-44">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="reveal text-center mb-14 sm:mb-24">
            <p className="text-[12px] sm:text-[13px] text-white/35 tracking-[0.12em] uppercase mb-3 sm:mb-4">About</p>
            <h2 className="text-[clamp(28px,5vw,56px)] font-semibold tracking-[-0.03em]">A little about me.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16">
            <div className="reveal md:col-span-3">
              <div className="liquid-glass p-6 sm:p-8 md:p-10">
                <p className="text-[14px] sm:text-[16px] text-white/45 leading-[1.85] font-light">
                  I&apos;m a developer who believes the best software feels invisible.
                  My work is guided by clarity — in code, in design, and in how people
                  experience what I build.
                </p>
                <p className="mt-4 sm:mt-5 text-[14px] sm:text-[16px] text-white/45 leading-[1.85] font-light">
                  I focus on the intersection of engineering and design, creating products
                  that are not only technically sound but genuinely pleasant to use.
                  Every pixel, every interaction — it all matters.
                </p>
              </div>
            </div>

            <div className="reveal md:col-span-2">
              <p className="text-[11px] text-white/20 uppercase tracking-[0.14em] mb-5">Technologies</p>
              <div className="reveal-stagger grid grid-cols-2 gap-2">
                {skills.map((skill) => (
                  <div key={skill} className="liquid-glass-pill text-center py-2.5 text-[11px] sm:text-[12px] text-white/45">{skill}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20 sm:mt-28">
            <div className="reveal">
              <p className="text-[11px] text-white/20 uppercase tracking-[0.14em] mb-6 sm:mb-8">Experience</p>
            </div>
            <div className="reveal">
              <div className="liquid-glass overflow-hidden">
                {experience.map((exp, i) => (
                  <div
                    key={exp.role}
                    className={`group flex flex-col sm:flex-row sm:items-center justify-between px-5 sm:px-8 py-4 sm:py-5 hover:bg-white/[0.02] transition-colors duration-300 ${
                      i < experience.length - 1 ? "border-b border-white/[0.04]" : ""
                    }`}
                  >
                    <div>
                      <h3 className="text-[13px] sm:text-[14px] font-medium text-white/70 group-hover:text-white/90 transition-colors duration-300">{exp.role}</h3>
                      <p className="text-[11px] sm:text-[12px] text-white/25 mt-0.5">
                        {exp.company}<span className="mx-2 text-white/10">·</span>{exp.desc}
                      </p>
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-white/20 font-mono mt-1 sm:mt-0 shrink-0">{exp.period}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[400px] mx-auto"><div className="section-divider" /></div>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 sm:py-32 lg:py-44">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="reveal text-center mb-14 sm:mb-20">
            <p className="text-[12px] sm:text-[13px] text-white/35 tracking-[0.12em] uppercase mb-3 sm:mb-4">Contact</p>
            <h2 className="text-[clamp(28px,5vw,56px)] font-semibold tracking-[-0.03em] mb-4 sm:mb-5">Let&apos;s talk.</h2>
            <p className="text-[15px] sm:text-[17px] text-white/35 font-light max-w-md mx-auto leading-[1.65]">
              Interested in working together? I&apos;d love to hear from you.
            </p>
          </div>

          <div className="reveal max-w-lg mx-auto">
            <form onSubmit={handleSubmit} className="liquid-glass p-6 sm:p-10 space-y-5">
              <div>
                <label htmlFor="name" className="block text-[11px] text-white/30 uppercase tracking-[0.1em] mb-2">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-[14px] text-white/80 placeholder:text-white/20 outline-none focus:border-white/15 transition-colors duration-300"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[11px] text-white/30 uppercase tracking-[0.1em] mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-[14px] text-white/80 placeholder:text-white/20 outline-none focus:border-white/15 transition-colors duration-300"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-[11px] text-white/30 uppercase tracking-[0.1em] mb-2">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-[14px] text-white/80 placeholder:text-white/20 outline-none focus:border-white/15 transition-colors duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="btn-liquid liquid-glass-elevated w-full inline-flex items-center justify-center gap-2 text-white text-[13px] font-medium py-3.5 rounded-full disabled:opacity-50"
              >
                {formStatus === "sending" ? "Sending..." : formStatus === "sent" ? "Sent!" : "Send Message"}
                {formStatus === "idle" && <Arrow className="link-arrow mt-px" />}
              </button>
              {formStatus === "sent" && (
                <p className="text-[12px] text-green-400/70 text-center">Opening your email client...</p>
              )}
            </form>

            <div className="mt-8 sm:mt-10 flex justify-center gap-8 sm:gap-10 text-[12px] text-white/30">
              {[
                { label: "GitHub", href: "https://github.com/jhm1909" },
                { label: "LinkedIn", href: "#" },
                { label: "Twitter", href: "#" },
              ].map((link) => (
                <a key={link.label} href={link.href} className="hover:text-white/70 transition-colors duration-300">{link.label}</a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.04]">
        <div className="max-w-[980px] mx-auto px-6 py-4 flex items-center justify-between text-[10px] sm:text-[11px] text-white/20">
          <span>&copy; 2026 Cappy. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/blog" className="hover:text-white/50 transition-colors duration-300">Blog</Link>
            <a href="#" className="hover:text-white/50 transition-colors duration-300">Back to top</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
