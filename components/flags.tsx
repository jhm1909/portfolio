import { useId, type ComponentType, type SVGProps } from "react";

interface FlagProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

/* ── US Flag ─────────────────────────────────────── */
export function FlagEN({ size = 20, ...props }: FlagProps) {
  const id = useId();
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={size} height={size} aria-hidden="true" {...props}>
      <defs>
        <clipPath id={`c-en-${id}`}><circle cx="50" cy="50" r="50" /></clipPath>
      </defs>
      <g clipPath={`url(#c-en-${id})`}>
        {Array.from({ length: 13 }).map((_, i) => (
          <rect key={i} y={i * 7.69} width="100" height="7.69" fill={i % 2 === 0 ? "#B22234" : "#fff"} />
        ))}
        <rect width="40" height="53.85" fill="#3C3B6E" />
        {[
          [4,4],[12,4],[20,4],[28,4],[36,4],
          [8,10],[16,10],[24,10],[32,10],
          [4,16],[12,16],[20,16],[28,16],[36,16],
          [8,22],[16,22],[24,22],[32,22],
          [4,28],[12,28],[20,28],[28,28],[36,28],
          [8,34],[16,34],[24,34],[32,34],
          [4,40],[12,40],[20,40],[28,40],[36,40],
          [8,46],[16,46],[24,46],[32,46],
          [4,52],[12,52],[20,52],[28,52],[36,52],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.5" fill="#fff" />
        ))}
      </g>
    </svg>
  );
}

/* ── KR Flag ─────────────────────────────────────── */
export function FlagKO({ size = 20, ...props }: FlagProps) {
  const id = useId();
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={size} height={size} aria-hidden="true" {...props}>
      <defs>
        <clipPath id={`c-ko-${id}`}><circle cx="50" cy="50" r="50" /></clipPath>
      </defs>
      <g clipPath={`url(#c-ko-${id})`}>
        <rect width="100" height="100" fill="#fff" />
        <circle cx="50" cy="50" r="18" fill="#C60C30" />
        <path d="M50 32 A9 9 0 0 1 50 50 A9 9 0 0 0 50 68" fill="#003478" />
        <circle cx="50" cy="41" r="9" fill="#C60C30" />
        <circle cx="50" cy="59" r="9" fill="#003478" />
        <g transform="translate(13,8) rotate(56,8,8)">
          <rect width="18" height="2.5" fill="#000" /><rect y="4.5" width="18" height="2.5" fill="#000" /><rect y="9" width="18" height="2.5" fill="#000" />
        </g>
        <g transform="translate(65,65) rotate(56,8,8)">
          <rect width="7.5" height="2.5" fill="#000" /><rect x="10.5" width="7.5" height="2.5" fill="#000" />
          <rect y="4.5" width="7.5" height="2.5" fill="#000" /><rect x="10.5" y="4.5" width="7.5" height="2.5" fill="#000" />
          <rect y="9" width="7.5" height="2.5" fill="#000" /><rect x="10.5" y="9" width="7.5" height="2.5" fill="#000" />
        </g>
        <g transform="translate(65,3) rotate(-56,8,12)">
          <rect width="7.5" height="2.5" fill="#000" /><rect x="10.5" width="7.5" height="2.5" fill="#000" />
          <rect y="4.5" width="18" height="2.5" fill="#000" />
          <rect y="9" width="7.5" height="2.5" fill="#000" /><rect x="10.5" y="9" width="7.5" height="2.5" fill="#000" />
        </g>
        <g transform="translate(13,70) rotate(-56,8,0)">
          <rect width="18" height="2.5" fill="#000" />
          <rect y="4.5" width="7.5" height="2.5" fill="#000" /><rect x="10.5" y="4.5" width="7.5" height="2.5" fill="#000" />
          <rect y="9" width="18" height="2.5" fill="#000" />
        </g>
      </g>
    </svg>
  );
}

/* ── VN Flag ─────────────────────────────────────── */
export function FlagVI({ size = 20, ...props }: FlagProps) {
  const id = useId();
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width={size} height={size} aria-hidden="true" {...props}>
      <defs>
        <clipPath id={`c-vi-${id}`}><circle cx="50" cy="50" r="50" /></clipPath>
      </defs>
      <g clipPath={`url(#c-vi-${id})`}>
        <rect width="100" height="100" fill="#DA251D" />
        <polygon points="50,18 56.5,38.5 78,38.5 60.8,51.5 67,72 50,59 33,72 39.2,51.5 22,38.5 43.5,38.5" fill="#FFCD00" />
      </g>
    </svg>
  );
}

/* ── Map ─────────────────────────────────────────── */
export const FLAGS: Record<string, ComponentType<FlagProps>> = {
  en: FlagEN,
  ko: FlagKO,
  vi: FlagVI,
};
