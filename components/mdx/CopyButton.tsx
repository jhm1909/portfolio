"use client";

import { useState, type RefObject } from "react";

export default function CopyButton({
  preRef,
}: {
  preRef: RefObject<HTMLPreElement | null>;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = preRef.current?.querySelector("code")?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[11px] text-white/30 hover:text-white/60 liquid-glass-pill px-2 py-1"
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
