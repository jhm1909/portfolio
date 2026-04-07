import { skills, experience } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-32 lg:py-44 scroll-mt-12">
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
  );
}
