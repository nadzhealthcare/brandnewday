"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import SectionTitle from "./SectionTitle";

type Bg = { kind: "image"; src: string } | { kind: "gradient" };

type Stat = {
  value: number;
  decimals?: number;
  suffix?: string;
  star?: boolean;
  label: string;
  avatars?: boolean;
  bg: Bg;
  h: number; // desktop bar height in px (valley shape)
};

const STATS: Stat[] = [
  {
    value: 97,
    suffix: "%",
    label: "Patient satisfaction rate, reflecting our commitment.",
    bg: { kind: "image", src: "/assets/fam.jpg" },
    h: 340,
  },
  {
    value: 30,
    suffix: "+",
    label: "Board-certified Medical staff",
    bg: { kind: "image", src: "/assets/doct.jpg" },
    h: 300,
  },
  {
    value: 5,
    decimals: 1,
    star: true,
    label: "Over 10,000 Clients",
    avatars: true,
    bg: { kind: "gradient" },
    h: 208,
  },
  {
    value: 30,
    suffix: "+",
    label: "Different medical services delivered",
    bg: { kind: "image", src: "/assets/car.jpg" },
    h: 262,
  },
  {
    value: 10,
    suffix: "+",
    label: "Global Laboratory Partners providing accurate results",
    bg: { kind: "image", src: "/assets/lab.jpg" },
    h: 340,
  },
];

function useCountUp(
  target: number,
  run: boolean,
  { decimals = 0, duration = 1500, delay = 0 } = {},
) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVal(target);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const timer = window.setTimeout(() => {
      const tick = (now: number) => {
        if (start === null) start = now;
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setVal(target * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [run, target, duration, delay]);

  return decimals ? val.toFixed(decimals) : Math.round(val).toString();
}

function Avatars() {
  return (
    <div className="flex -space-x-2.5">
      {[1, 2, 3, 4].map((n) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={n}
          src={`/assets/avatar${n}.png`}
          alt=""
          className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm"
        />
      ))}
    </div>
  );
}

function Card({
  stat,
  index,
  inView,
  isDesktop,
}: {
  stat: Stat;
  index: number;
  inView: boolean;
  isDesktop: boolean;
}) {
  const rise = index * 150; // stagger (slower)
  const num = useCountUp(stat.value, inView, {
    decimals: stat.decimals ?? 0,
    delay: 350 + rise,
    duration: 2200,
  });

  const onDark = stat.bg.kind === "gradient"; // middle card only

  return (
    // Wrapper handles the zoom-on-hover (kept separate from the height reveal)
    <div className="group transition-transform duration-300 ease-out will-change-transform hover:z-10 hover:scale-[1.04] lg:w-[212px]">
      <div
        className="relative w-full overflow-hidden rounded-[26px] bg-[#2b2320] shadow-[0_18px_40px_-24px_rgba(43,35,32,0.45)] transition-shadow duration-300 group-hover:shadow-[0_34px_60px_-28px_rgba(43,35,32,0.6)] max-lg:aspect-square"
        style={
          isDesktop
            ? {
              height: inView ? stat.h : 0,
              transition: `height 1500ms cubic-bezier(0.16,1,0.3,1) ${rise}ms`,
            }
            : undefined
        }
      >
        {/* background */}
        {stat.bg.kind === "image" ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={stat.bg.src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(150deg, #4a1c20 0%, #6C2A37 100%)",
            }}
          >
            {/* red "blood" liquid floor */}
            <div className="cc-liquid">
              <svg
                className="cc-wave cc-wave--back"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0 120 q 90 -42 180 0 t 180 0 t 180 0 t 180 0 t 180 0 t 180 0 t 180 0 t 180 0 L1440 320 L0 320 Z"
                  fill="url(#ccWaveBack)"
                />
                <defs>
                  <linearGradient id="ccWaveBack" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#a01625" />
                    <stop offset="1" stopColor="#5e0f18" />
                  </linearGradient>
                </defs>
              </svg>
              <svg
                className="cc-wave cc-wave--front"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0 152 q 90 -48 180 0 t 180 0 t 180 0 t 180 0 t 180 0 t 180 0 t 180 0 t 180 0 L1440 320 L0 320 Z"
                  fill="url(#ccWaveFront)"
                />
                <defs>
                  <linearGradient id="ccWaveFront" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#d21f30" />
                    <stop offset="1" stopColor="#8a0f1c" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="cc-bubble" style={{ left: "22%", width: 8, height: 8, animationDelay: "0s" }} />
              <span className="cc-bubble" style={{ left: "54%", width: 6, height: 6, animationDelay: "1.4s" }} />
              <span className="cc-bubble" style={{ left: "78%", width: 10, height: 10, animationDelay: "2.6s" }} />
            </div>
          </div>
        )}

        <div
          className={`relative flex flex-col p-5 max-lg:h-full ${isDesktop
              ? ""
              : `transition-all duration-[900ms] ease-out ${inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
              }`
            }`}
          style={{
            height: isDesktop ? stat.h : undefined,
            transitionDelay: `${rise}ms`,
          }}
        >
          <div
            className={`flex items-center gap-1.5 font-title text-[2.6rem] font-semibold uppercase leading-none ${onDark ? "text-white" : "text-[color:var(--maroon)]"
              }`}
          >
            <span>
              {num}
              {stat.suffix}
            </span>
            {stat.star && (
              <Star className="h-6 w-6 fill-[#f4c430] text-[#f4c430]" />
            )}
          </div>

          <p
            className={`mt-2.5 text-[13px] font-medium leading-snug ${onDark ? "text-white/75" : "text-[color:var(--maroon)]/75"
              }`}
          >
            {stat.label}
          </p>

          {stat.avatars && (
            <div
              className={`mt-auto flex min-h-0 flex-1 items-end justify-center pt-4 transition-all duration-[1200ms] ease-out ${inView
                  ? "translate-y-0 scale-100 opacity-100 blur-0"
                  : "translate-y-5 scale-90 opacity-0 blur-md"
                }`}
              style={{ transitionDelay: `${rise + 650}ms` }}
            >
              <Avatars />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ComprehensiveCare() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="relative mx-auto max-w-[1180px]">
        <SectionTitle className="relative z-10 mx-auto mb-10 max-w-[360px] text-center text-[1.7rem] leading-[1.12] text-[color:var(--maroon)] sm:max-w-[620px] sm:text-[2.2rem] lg:absolute lg:left-1/2 lg:top-[14px] lg:mb-0 lg:-translate-x-1/2">
          Comprehensive Care for Every Patient
        </SectionTitle>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:flex lg:h-[440px] lg:items-end lg:justify-center lg:gap-5">
          {STATS.map((s, i) => (
            <Card
              key={i}
              stat={s}
              index={i}
              inView={inView}
              isDesktop={isDesktop}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
