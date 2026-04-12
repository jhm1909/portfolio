import { setRequestLocale } from "next-intl/server";
import { getAllProjects } from "@/lib/work";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AmbientBackground from "@/components/AmbientBackground";
import ScrollReveal from "@/components/ScrollReveal";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative" id="main-content">
      <ScrollReveal />
      <AmbientBackground />
      <Nav />

      <Hero />

      <Work projects={getAllProjects()} />
      <div className="max-w-[400px] mx-auto"><div className="section-divider" /></div>

      <About />
      <div className="max-w-[400px] mx-auto"><div className="section-divider" /></div>

      <Contact />

      <Footer />
    </main>
  );
}
