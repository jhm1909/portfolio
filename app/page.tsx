"use client";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AmbientBackground from "@/components/AmbientBackground";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main className="relative" id="main-content">
      <ScrollReveal />
      <AmbientBackground />
      <Nav />

      <Hero />

      <Work />
      <div className="max-w-[400px] mx-auto"><div className="section-divider" /></div>

      <About />
      <div className="max-w-[400px] mx-auto"><div className="section-divider" /></div>

      <Contact />

      <Footer />
    </main>
  );
}
