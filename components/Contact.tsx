"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { socialLinks } from "@/lib/data";
import Arrow from "./Arrow";

export default function Contact() {
  const t = useTranslations("Contact");
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${t("subjectPrefix")}: ${formState.name}`);
    const body = encodeURIComponent(`From: ${formState.name} (${formState.email})\n\n${formState.message}`);
    window.location.href = `mailto:jeonghamin1909@gmail.com?subject=${subject}&body=${body}`;
    setFormStatus("sent");
    setFormState({ name: "", email: "", message: "" });
    setTimeout(() => setFormStatus("idle"), 3000);
  };

  return (
    <section id="contact" className="py-20 sm:py-32 lg:py-44 scroll-mt-12">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="reveal text-center mb-14 sm:mb-20">
          <p className="text-[12px] sm:text-[13px] text-white/35 tracking-[0.12em] uppercase mb-3 sm:mb-4">{t("eyebrow")}</p>
          <h2 className="text-[clamp(28px,5vw,56px)] font-semibold tracking-[-0.03em] mb-4 sm:mb-5">{t("title")}</h2>
          <p className="text-[15px] sm:text-[17px] text-white/35 font-light max-w-md mx-auto leading-[1.65]">
            {t("description")}
          </p>
        </div>

        <div className="reveal max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="liquid-glass p-6 sm:p-10 space-y-5">
            <div>
              <label htmlFor="name" className="block text-[11px] text-white/30 uppercase tracking-[0.1em] mb-2">{t("nameLabel")}</label>
              <input
                id="name"
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-[14px] text-white/80 placeholder:text-white/15 outline-none focus:border-white/15 focus-visible:ring-1 focus-visible:ring-white/20 transition-colors duration-300"
                placeholder={t("namePlaceholder")}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-[11px] text-white/30 uppercase tracking-[0.1em] mb-2">{t("emailLabel")}</label>
              <input
                id="email"
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-[14px] text-white/80 placeholder:text-white/15 outline-none focus:border-white/15 focus-visible:ring-1 focus-visible:ring-white/20 transition-colors duration-300"
                placeholder={t("emailPlaceholder")}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-[11px] text-white/30 uppercase tracking-[0.1em] mb-2">{t("messageLabel")}</label>
              <textarea
                id="message"
                required
                rows={4}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-[14px] text-white/80 placeholder:text-white/15 outline-none focus:border-white/15 focus-visible:ring-1 focus-visible:ring-white/20 transition-colors duration-300 resize-none"
                placeholder={t("messagePlaceholder")}
              />
            </div>
            <button
              type="submit"
              className="btn-liquid liquid-glass-elevated w-full inline-flex items-center justify-center gap-2 text-white text-[13px] font-medium py-3.5 rounded-full focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {formStatus === "sent" ? t("buttonSent") : t("buttonIdle")}
              {formStatus === "idle" && <Arrow className="link-arrow mt-px" />}
            </button>
          </form>

          <div className="mt-8 sm:mt-10 flex justify-center gap-8 sm:gap-10 text-[12px] text-white/30">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/70 transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
