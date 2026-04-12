import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center" id="main-content">
      <div className="bg-ambient" aria-hidden="true">
        <div className="orb absolute top-[20%] left-[30%] w-[400px] h-[400px] rounded-full bg-violet-500/[0.03] blur-[120px]" />
        <div className="orb-reverse absolute bottom-[20%] right-[20%] w-[350px] h-[350px] rounded-full bg-sky-500/[0.025] blur-[100px]" />
      </div>

      <div className="relative text-center px-6">
        <p className="text-[120px] sm:text-[180px] font-semibold tracking-[-0.05em] leading-none text-gradient-hero select-none">
          404
        </p>
        <p className="text-[15px] sm:text-[17px] text-white/35 font-light mt-4 mb-10">
          This page doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="liquid-glass-pill px-6 py-2.5 text-[13px] text-white/60 hover:text-white/90 transition-colors duration-300"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
