import { ArrowRight, Briefcase, GraduationCap } from "lucide-react";

/* "Who it's for" cards: a photo with a live scan read-out overlaid, and a
   label row beneath. Hover brings the card alive, the image pushes in, the
   card lifts and glows, the arrow slides, and the charts redraw. All in CSS
   off the group, no client component needed. Chart strokes reuse the page's
   #vbGrad paint server. */

function Running({ className = "" }: { className?: string }) {
  // lucide has no running figure, so a matching stroke-style one.
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="16" cy="4.5" r="1.7" />
      <path d="M14.5 8.5 10.5 11l2.5 2.2 1 5.3" />
      <path d="M10.5 11 6.5 10l-2 3" />
      <path d="m13.5 13.2 4 1 1.5 4" />
      <path d="M8 21l2-3.3" />
    </svg>
  );
}

type Metric =
  | { kind: "gauge"; label: string; value: number }
  | { kind: "trend"; label: string; value: string; up: boolean };

type Card = {
  img: string;
  /* Mirror the photo horizontally. The first and last shots have their subject
     on the right, where the read-out overlay sits, so flipping them moves the
     subject to the clear left side. */
  flip?: boolean;
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  metrics: Metric[];
};

const CARDS: Card[] = [
  {
    img: "/assets/who-1.webp",
    flip: true,
    Icon: Briefcase,
    title: "Executives",
    desc: "Sustain focus and cognitive edge.",
    metrics: [
      { kind: "gauge", label: "Cognitive Edge", value: 92 },
      { kind: "trend", label: "Focus Level", value: "High", up: true },
      { kind: "trend", label: "Stress Index", value: "Low", up: false },
    ],
  },
  {
    img: "/assets/who-2.webp",
    Icon: GraduationCap,
    title: "Students",
    desc: "Sharpen memory and attention.",
    metrics: [
      { kind: "gauge", label: "Memory Score", value: 88 },
      { kind: "trend", label: "Attention", value: "High", up: true },
      { kind: "trend", label: "Learning Efficiency", value: "High", up: true },
    ],
  },
  {
    img: "/assets/who-3.webp",
    flip: true,
    Icon: Running,
    title: "Athletes",
    desc: "Optimise recovery and performance.",
    metrics: [
      { kind: "gauge", label: "Recovery Score", value: 94 },
      { kind: "trend", label: "Reaction Time", value: "Excellent", up: true },
      { kind: "trend", label: "Mental Resilience", value: "High", up: true },
    ],
  },
];

const UP = "M4 22 L26 17 L48 19 L70 11 L92 15 L114 7 L136 12 L158 5";
const DOWN = "M4 6 L26 10 L48 8 L70 15 L92 12 L114 18 L136 14 L158 20";
const OVERLAY =
  "rounded-xl bg-black/45 p-2 ring-1 ring-white/10 backdrop-blur-md";
const OVER_LABEL =
  "text-[8px] font-semibold uppercase tracking-[0.1em] text-white/55";

function Gauge({ label, value }: { label: string; value: number }) {
  const r = 17;
  return (
    <div className={OVERLAY}>
      <p className={OVER_LABEL}>{label}</p>
      <div className="relative mx-auto mt-1 grid h-11 w-11 place-items-center">
        <svg viewBox="0 0 44 44" className="absolute inset-0 -rotate-90">
          <circle cx="22" cy="22" r={r} stroke="rgba(255,255,255,0.1)" strokeWidth="3.5" fill="none" />
          <circle
            cx="22"
            cy="22"
            r={r}
            stroke="url(#vbGrad)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            style={{ ["--vb-o" as string]: 1 - value / 100, strokeDashoffset: "var(--vb-o)" }}
            className="group-hover:[animation:vbSweepGauge_1.1s_ease-out]"
          />
        </svg>
        <div className="text-center leading-none">
          <span className="font-title text-[15px] text-white">{value}</span>
          <span className="block text-[7px] text-white/40">/100</span>
        </div>
      </div>
    </div>
  );
}

function Trend({ label, value, up }: { label: string; value: string; up: boolean }) {
  return (
    <div className={OVERLAY}>
      <p className={OVER_LABEL}>{label}</p>
      <p className="mt-0.5 text-[12.5px] font-semibold leading-none text-white">{value}</p>
      <svg viewBox="0 0 162 26" className="mt-1 h-5 w-full" fill="none">
        <path
          d={up ? UP : DOWN}
          stroke="url(#vbGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={0}
          className="group-hover:[animation:vbDrawLine_1.1s_ease-out]"
        />
      </svg>
    </div>
  );
}

export default function WhoCards() {
  return (
    <div className="mt-14 grid gap-5 lg:grid-cols-3">
      {CARDS.map((c) => (
        <div
          key={c.title}
          className="group relative overflow-hidden rounded-[24px] bg-[#0d0713] ring-1 ring-white/10 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:ring-white/25 hover:shadow-[0_34px_66px_-26px_rgba(204,89,114,0.5)]"
        >
          {/* photo + overlaid read-out */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {/* Flip lives on this wrapper, not the image, so the hover zoom on
                the image composes with the mirror instead of overriding it. */}
            <div
              className="absolute inset-0"
              style={c.flip ? { transform: "scaleX(-1)" } : undefined}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.img}
                alt={c.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-black/30" />
            <div className="absolute right-2.5 top-2.5 flex w-[46%] max-w-[168px] flex-col gap-1.5">
              {c.metrics.map((m) =>
                m.kind === "gauge" ? (
                  <Gauge key={m.label} label={m.label} value={m.value} />
                ) : (
                  <Trend key={m.label} label={m.label} value={m.value} up={m.up} />
                ),
              )}
            </div>
          </div>

          {/* label row */}
          <div className="flex items-center gap-4 p-5 sm:p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full ring-1 ring-[#CC5972]/40 transition-all duration-300 group-hover:scale-105 group-hover:ring-[#CC5972]/70">
              <span className="vb-grad-icon block">
                <c.Icon className="h-[22px] w-[22px]" />
              </span>
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-title text-[19px] uppercase leading-none text-white">
                {c.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-snug text-white/55">
                {c.desc}
              </p>
            </div>
            <span className="vb-grad-icon block shrink-0 transition-transform duration-300 group-hover:translate-x-1.5">
              <ArrowRight className="h-5 w-5" />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
