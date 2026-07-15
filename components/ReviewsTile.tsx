"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

/* ---------- Google reviews shown in the vertical carousel ---------- */
export type Review = { name: string; initials: string; text: string; time: string };

const FALLBACK_REVIEWS: Review[] = [
  {
    name: "Ruwan Ranjith Fernando",
    initials: "RF",
    text: "Overall service was superb. Contact person was very supportive and nursing staff also very experienced.",
    time: "6 months ago",
  },
  {
    name: "VA Refurbished",
    initials: "VA",
    text: "Amazed by Dr. Jerusalem and her team, they took our baby's illness very seriously and kept checking in.",
    time: "8 months ago",
  },
  {
    name: "Aisha K.",
    initials: "AK",
    text: "The doctor arrived within half an hour and treated my father with such care. Felt like family.",
    time: "3 months ago",
  },
  {
    name: "Mohammed A.",
    initials: "MA",
    text: "Professional, punctual and kind. Highly recommend NADZ home doctor visits to every family.",
    time: "1 month ago",
  },
];

/* ---------- USPs with count-up ---------- */
const USPS = [
  { to: 4.9, decimals: 1, star: true, label: "Google rating · 1,000+ patients" },
  { to: 100, decimals: 0, suffix: "+", label: "Healthcare professionals" },
  { to: 10000, decimals: 0, suffix: "+", label: "Families treated at home" },
] as const;

function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function Counter({
  to,
  decimals = 0,
  start,
  runKey = 0,
  dur = 1600,
}: {
  to: number;
  decimals?: number;
  start: boolean;
  runKey?: number;
  dur?: number;
}) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    setVal(0);
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(to * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, runKey, to, dur]);
  const shown = decimals
    ? val.toFixed(decimals)
    : Math.round(val).toLocaleString();
  return <>{shown}</>;
}

/* fixed card geometry so the carousel steps land exactly on centre */
const CARD_H = 116;
const STEP = 132;

export default function ReviewsTile({ reviews }: { reviews?: Review[] }) {
  const REVIEWS = reviews && reviews.length ? reviews : FALLBACK_REVIEWS;
  const rootRef = useRef<HTMLDivElement>(null);
  const vpRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const [H, setH] = useState(172);

  // clone last + first for a seamless loop; centre starts on the first real card
  const items = [REVIEWS[REVIEWS.length - 1], ...REVIEWS, REVIEWS[0]];
  const [i, setI] = useState(1);
  const [anim, setAnim] = useState(true);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // re-run the count-up on a 5s loop once in view
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setRunKey((k) => k + 1), 5000);
    return () => clearInterval(id);
  }, [inView]);

  useEffect(() => {
    const el = vpRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setH(el.clientHeight));
    ro.observe(el);
    setH(el.clientHeight);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setI((v) => v + 1), 3200);
    return () => clearInterval(t);
  }, []);

  // when the centre reaches the appended clone, snap back without animation
  useEffect(() => {
    if (i === REVIEWS.length + 1) {
      const t = setTimeout(() => {
        setAnim(false);
        setI(1);
      }, 650);
      return () => clearTimeout(t);
    }
    if (!anim) {
      const r = requestAnimationFrame(() => setAnim(true));
      return () => cancelAnimationFrame(r);
    }
  }, [i, anim]);

  const ty = H / 2 - CARD_H / 2 - i * STEP;

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden rounded-[26px] md:col-span-2"
      style={{
        backgroundImage: "linear-gradient(135deg, #331828 0%, #6C2A37 100%)",
      }}
    >
      <div className="grid h-full grid-cols-1 gap-5 p-6 sm:grid-cols-[1.02fr_0.98fr] sm:items-center sm:gap-6">
        {/* left, USPs */}
        <div className="flex flex-col justify-center gap-4">
          {USPS.map((u, idx) => (
            <div key={idx} className="flex items-baseline gap-3">
              <span className="flex min-w-[104px] items-center gap-1 text-[26px] font-bold leading-none tabular-nums text-[color:var(--gold-light)] sm:text-[30px]">
                <Counter
                  to={u.to}
                  decimals={u.decimals}
                  start={inView}
                  runKey={runKey}
                />
                {"suffix" in u && u.suffix}
                {"star" in u && u.star && (
                  <Star className="h-5 w-5 fill-[color:var(--gold-light)]" />
                )}
              </span>
              <span className="text-[12.5px] leading-snug text-white/70">
                {u.label}
              </span>
            </div>
          ))}
        </div>

        {/* right, vertical review carousel */}
        <div
          ref={vpRef}
          className="relative h-[210px] overflow-hidden md:h-full md:min-h-[176px]"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, #000 24%, #000 76%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, #000 24%, #000 76%, transparent 100%)",
          }}
        >
          <div
            className="absolute inset-x-1"
            style={{
              transform: `translateY(${ty}px)`,
              transition: anim
                ? "transform 0.6s cubic-bezier(0.4,0,0.2,1)"
                : "none",
            }}
          >
            {items.map((rv, r) => {
              const dist = r - i;
              const op = dist === 0 ? 1 : Math.abs(dist) === 1 ? 0.4 : 0;
              const sc = dist === 0 ? 1 : 0.92;
              return (
                <div
                  key={r}
                  className="absolute inset-x-0 rounded-2xl bg-white p-3.5 text-[#2b1a17] shadow-[0_16px_34px_-18px_rgba(0,0,0,0.6)]"
                  style={{
                    top: r * STEP,
                    height: CARD_H,
                    opacity: op,
                    transform: `scale(${sc})`,
                    transition: "opacity 0.6s ease, transform 0.6s ease",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f4c430] text-[12px] font-bold text-[#4a1c20]">
                      {rv.initials}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[14px] font-semibold">
                      {rv.name}
                    </span>
                    <GoogleG className="h-4 w-4 shrink-0" />
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-snug text-black/65">
                    {rv.text}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          className="h-3 w-3 fill-[#f4b400] text-[#f4b400]"
                        />
                      ))}
                    </span>
                    <span className="text-[11px] text-black/40">{rv.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
