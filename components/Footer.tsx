"use client";

import Link from "next/link";

interface FooterProps {
  narrow?: boolean;
}

export default function Footer({ narrow }: FooterProps) {
  const handleTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-white/[0.04]">
      <div className={`${narrow ? "max-w-[680px]" : "max-w-[980px]"} mx-auto px-6 py-4 flex items-center justify-between text-[11px] text-white/60`}>
        <span>&copy; {new Date().getFullYear()} Cappy. All rights reserved.</span>
        <div className="flex gap-4">
          <Link href="/blog" className="hover:text-white/50 transition-colors duration-300">Blog</Link>
          <button
            onClick={handleTop}
            className="hover:text-white/50 transition-colors duration-300"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
