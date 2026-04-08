"use client";

import { useState } from "react";
import TechIcon from "./TechIcon";
import { techExperience } from "@/lib/data";

interface TechPillProps {
  name: string;
}

export default function TechPill({ name }: TechPillProps) {
  const [show, setShow] = useState(false);
  const exp = techExperience[name];

  return (
    <span
      className="liquid-glass-pill relative inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] sm:text-[11px] text-white/40 cursor-default"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <TechIcon name={name} />
      {name}

      {/* Tooltip */}
      {exp && show && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[10px] text-white/70 whitespace-nowrap z-30 pointer-events-none">
          <span className="text-white/90 font-medium">{exp.level}</span>
          <span className="mx-1.5 text-white/20">·</span>
          {exp.years}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/10" />
        </span>
      )}
    </span>
  );
}
