"use client";

import { useEffect, useRef, useState } from "react";
import { Brain, Target, HeartPulse } from "lucide-react";

/* Floating brain-mapping analytics cards.

   Glass panels that breathe over the 3D scene like a live scan read-out: two
   or three are visible at any moment, fading in and out on a randomised timer
   so the set is never static. The layer is pointer-events-none so it never
   blocks the CTAs.

   Graph strokes reuse the #vbGrad paint server already rendered on the page,
   so the charts carry the same accent gradient as everything else.

   Desktop only, in the upper region clear of the headline, buttons and intro
   at the bottom. Below lg the hero is just the scene and the headline. */

const CARD =
  "vb-card-shell absolute hidden w-[184px] rounded-2xl p-px lg:block";
const GLASS =
  "rounded-2xl bg-[#140a1c]/70 p-3.5 backdrop-blur-md ring-1 ring-white/[0.04]";
const BORDER =
  "linear-gradient(150deg, rgba(240,204,165,0.45), rgba(204,89,114,0.15) 45%, rgba(100,24,135,0.35))";
const TITLE =
  "text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/55";

function Shell({
  style,
  revealed,
  children,
}: {
  style: React.CSSProperties;
  revealed: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${CARD} transition-all duration-[900ms] ease-in-out ${
        revealed ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`}
      style={{ ...style, background: BORDER }}
    >
      <div className={`vb-card-float ${GLASS}`}>{children}</div>
    </div>
  );
}

/* QEEG waveform, four overlaid frequency bands */
function Qeeg({ shown }: { shown: boolean }) {
  return (
    <>
      <p className={TITLE}>QEEG Brain Activity</p>
      <svg viewBox="0 0 200 56" className="mt-2.5 h-11 w-full" fill="none">
        <path
          d="M2 30 Q10 30 14 22 T26 30 Q32 14 38 30 T50 26 Q58 8 64 30 Q70 44 76 28 T90 30 Q98 18 104 30 T118 24 Q126 40 132 30 T146 28 Q154 16 160 30 T174 32 Q182 22 188 30 T198 30"
          stroke="url(#vbGrad)"
          strokeWidth="1.6"
          strokeLinecap="round"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: shown ? 0 : 1,
            transition: "stroke-dashoffset 1.2s ease-out 0.2s",
          }}
        />
      </svg>
      <div className="mt-2 flex justify-between text-[10px] text-white/45">
        <span>Alpha</span>
        <span>Beta</span>
        <span>Theta</span>
        <span>Gamma</span>
      </div>
    </>
  );
}

/* AI cognitive score gauge */
function Score({ shown }: { shown: boolean }) {
  const pct = 0.92;
  const r = 34;
  return (
    <>
      <p className={TITLE}>AI Cognitive Score</p>
      <div className="relative mx-auto mt-1.5 grid h-[78px] w-[78px] place-items-center">
        <svg viewBox="0 0 84 84" className="absolute inset-0 -rotate-90">
          <circle cx="42" cy="42" r={r} stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none" />
          <circle
            cx="42"
            cy="42"
            r={r}
            stroke="url(#vbGrad)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            style={{
              strokeDashoffset: shown ? 1 - pct : 1,
              transition: "stroke-dashoffset 1.2s ease-out 0.2s",
            }}
          />
        </svg>
        <div className="text-center leading-none">
          <span className="font-title text-[22px] text-white">92</span>
          <span className="block text-[10px] text-white/40">/100</span>
        </div>
      </div>
      <p className="vb-grad-text mt-1 text-center text-[13px] font-semibold">
        Excellent
      </p>
    </>
  );
}

function Memory({ shown }: { shown: boolean }) {
  return (
    <>
      <p className={TITLE}>Memory Performance</p>
      <div className="mt-3 flex items-center gap-3">
        <span className="vb-grad-icon block">
          <Brain className="h-6 w-6" />
        </span>
        <span className="font-title text-[18px] text-white">High</span>
      </div>
      <div className="mt-3 flex gap-1">
        {Array.from({ length: 11 }).map((_, i) => (
          <span
            key={i}
            className="h-1.5 flex-1 origin-left rounded-full"
            style={
              i < 8
                ? {
                    backgroundImage:
                      "linear-gradient(90deg,#641887,#cc5972,#f0cca5)",
                    transform: shown ? "scaleX(1)" : "scaleX(0)",
                    transition: `transform 0.5s ease-out ${0.25 + i * 0.05}s`,
                  }
                : { backgroundColor: "rgba(255,255,255,0.1)" }
            }
          />
        ))}
      </div>
    </>
  );
}

/* small trend line for Focus / Stress */
function MiniTrend({
  title,
  value,
  icon: Icon,
  d,
  shown,
}: {
  title: string;
  value: string;
  icon: typeof Target;
  d: string;
  shown: boolean;
}) {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="vb-grad-icon block">
          <Icon className="h-4 w-4" />
        </span>
        <p className={TITLE}>{title}</p>
      </div>
      <p className="mt-1.5 font-title text-[18px] text-white">{value}</p>
      <svg viewBox="0 0 180 40" className="mt-1 h-8 w-full" fill="none">
        <path
          d={d}
          stroke="url(#vbGrad)"
          strokeWidth="1.6"
          strokeLinecap="round"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: shown ? 0 : 1,
            transition: "stroke-dashoffset 1.1s ease-out 0.2s",
          }}
        />
      </svg>
    </>
  );
}

/* All positions sit on the right side of the hero, in the open space above
   the intro and below the navbar, so the cluster stays on one side rather
   than scattered across the scene. Only 2-3 show at once. */
const CARDS: {
  node: (shown: boolean) => React.ReactNode;
  style: React.CSSProperties;
}[] = [
  { node: (s) => <Qeeg shown={s} />, style: { top: "14%", right: "4%" } },
  { node: (s) => <Memory shown={s} />, style: { top: "56%", right: "14%" } },
  {
    node: (s) => (
      <MiniTrend
        shown={s}
        title="Focus Level"
        value="Excellent"
        icon={Target}
        d="M4 30 L28 24 L52 27 L76 16 L100 21 L124 12 L148 18 L176 8"
      />
    ),
    style: { top: "14%", right: "26%" },
  },
  { node: (s) => <Score shown={s} />, style: { top: "35%", right: "4%" } },
  {
    node: (s) => (
      <MiniTrend
        shown={s}
        title="Stress Index"
        value="Low"
        icon={HeartPulse}
        d="M4 14 L28 20 L52 16 L76 26 L100 21 L124 30 L148 24 L176 32"
      />
    ),
    style: { top: "35%", right: "26%" },
  },
];

export default function BrainDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  // Which cards are currently showing. Two or three breathe at a time.
  const [active, setActive] = useState<number[]>([0, 3]);

  useEffect(() => {
    // Reduced-motion: show them all, static, no breathing.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(CARDS.map((_, i) => i));
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    let paused = false;
    const el = ref.current;

    // Don't animate while the hero is scrolled away.
    const io = el
      ? new IntersectionObserver(([e]) => (paused = !e.isIntersecting), {
          threshold: 0,
        })
      : null;
    if (io && el) io.observe(el);

    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

    const tick = () => {
      if (!paused) {
        setActive((prev) => {
          const s = new Set(prev);
          const inactive = CARDS.map((_, i) => i).filter((i) => !s.has(i));
          // retire one when the set is getting full
          if (s.size >= 3 || (s.size > 2 && Math.random() < 0.6)) {
            s.delete(pick([...s]));
          }
          // introduce one when there's room
          if (inactive.length && (s.size < 2 || Math.random() < 0.75)) {
            s.add(pick(inactive));
          }
          if (s.size < 2 && inactive.length) s.add(inactive[0]);
          return [...s];
        });
      }
      timer = setTimeout(tick, 1400 + Math.random() * 1400);
    };
    timer = setTimeout(tick, 1600);

    return () => {
      clearTimeout(timer);
      io?.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-[5]">
      {CARDS.map((card, i) => {
        const on = active.includes(i);
        return (
          <Shell key={i} revealed={on} style={card.style}>
            {card.node(on)}
          </Shell>
        );
      })}
    </div>
  );
}
