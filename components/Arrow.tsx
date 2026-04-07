export default function Arrow({ className }: { className?: string }) {
  return (
    <svg width="7" height="10" viewBox="0 0 7 10" fill="none" className={className} aria-hidden="true">
      <path d="M1.5 1L5.5 5L1.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
