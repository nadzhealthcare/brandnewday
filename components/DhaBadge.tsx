// Recreated "Dubai Health Authority, Licensed By" mark (two-tone sparkle).
export default function DhaBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="leading-tight">
        <p className="text-[10px] font-medium text-white/55">Licensed By</p>
        <p
          dir="rtl"
          className="text-[12px] font-semibold text-white/90"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          هيئة الصحة بدبي
        </p>
        <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/70">
          Dubai Health Authority
        </p>
      </div>
      <svg viewBox="0 0 48 48" className="h-9 w-9 shrink-0" aria-hidden="true">
        <path
          d="M30 6 C31 17 33 19 44 22 C33 25 31 27 30 40 C29 27 27 25 18 24 C27 23 29 19 30 6 Z"
          fill="#8CC63F"
        />
        <path
          d="M17 14 C18 22 19 23 28 25 C19 27 18 28 17 38 C16 28 15 27 6 26 C15 24 16 22 17 14 Z"
          fill="#00A99D"
        />
      </svg>
    </div>
  );
}
