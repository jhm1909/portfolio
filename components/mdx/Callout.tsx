const variants = {
  tip: {
    border: "border-emerald-400/30",
    bg: "bg-emerald-400/[0.03]",
    label: "Tip",
    icon: "💡",
  },
  warning: {
    border: "border-amber-400/30",
    bg: "bg-amber-400/[0.03]",
    label: "Warning",
    icon: "⚠️",
  },
  info: {
    border: "border-sky-400/30",
    bg: "bg-sky-400/[0.03]",
    label: "Info",
    icon: "ℹ️",
  },
} as const;

export default function Callout({
  type = "info",
  children,
}: {
  type?: keyof typeof variants;
  children: React.ReactNode;
}) {
  const v = variants[type];

  return (
    <div
      className={`my-6 rounded-xl border-l-2 ${v.border} ${v.bg} px-5 py-4 liquid-glass-subtle`}
    >
      <p className="text-[11px] text-white/30 uppercase tracking-[0.1em] mb-2">
        {v.icon} {v.label}
      </p>
      <div className="text-[14px] text-white/50 leading-[1.7] [&>p]:my-1">
        {children}
      </div>
    </div>
  );
}
