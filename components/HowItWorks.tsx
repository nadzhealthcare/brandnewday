"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Phone, Cross, Home } from "lucide-react";
import SectionTitle from "./SectionTitle";
import PhoneBookingClip from "./PhoneBookingClip";
import CarRouteClip from "./CarRouteClip";
import DoorbellClip from "./DoorbellClip";

const STEPS = [
  {
    num: 1,
    title: "Choose a service (24/7)",
    desc: "Call or WhatsApp. We'll triage and guide you to the right service.",
    Icon: Phone,
    img: "/assets/steps/1.jpg",
  },
  {
    num: 2,
    title: "We dispatch the right clinician",
    desc: "A DHA-licensed doctor or specialist reviews the need and plans next steps.",
    Icon: Cross,
    img: "/assets/steps/2.jpg",
  },
  {
    num: 3,
    title: "Get care at home",
    desc: "We arrive with the right equipment, medicines or diagnostic tools, often within 30 minutes in Dubai.",
    Icon: Home,
    img: "/assets/steps/3.jpg",
  },
];

const NODES = [1 / 6, 3 / 6, 5 / 6];
// progress at which each step becomes active in the mobile stacked view
const M_THRESHOLDS = [0, 0.34, 0.67];
const SCROLL_VH = 240; // pinned scroll distance while the bar fills

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

/* image clip + icon/title/description for a single step, shared by both the
   desktop grid and the mobile stacked view */
function StepInner({ s, j }: { s: (typeof STEPS)[number]; j: number }) {
  const Clip = j === 0 ? PhoneBookingClip : j === 1 ? CarRouteClip : DoorbellClip;
  return (
    <>
      <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10">
        <Clip />
      </div>
      <div className="mt-5 flex items-start gap-3.5">
        <div className="hiw-iconbox grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-[color:var(--maroon)] ring-1 ring-white/10">
          <s.Icon className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-[15px] font-semibold text-white">
            {s.num} – {s.title}
          </h4>
          <p className="mt-1.5 text-[13.5px] leading-snug text-white/60">
            {s.desc}
          </p>
        </div>
      </div>
    </>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mStepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const frame = () => {
      const sec = sectionRef.current;
      if (sec) {
        const rect = sec.getBoundingClientRect();
        const vh = window.innerHeight;
        // scrub the pinned section: 0 when it locks, 1 when the bar is full
        const total = Math.max(1, rect.height - vh);
        const progress = clamp(-rect.top / total, 0, 1);

        if (fillRef.current) {
          fillRef.current.style.width = `${(progress * 100).toFixed(2)}%`;
          // anchor the red→green gradient to the full pipe width so the
          // colour under the liquid stays put as it fills (thermometer)
          const track = fillRef.current.parentElement;
          if (track)
            fillRef.current.style.backgroundSize = `${track.clientWidth}px 100%`;
        }

        for (let j = 0; j < STEPS.length; j++) {
          const active = progress >= NODES[j] - 0.06;
          nodeRefs.current[j]?.classList.toggle("is-active", active);
          const step = stepRefs.current[j];
          if (step) {
            step.classList.toggle("is-active", active);
            step.style.opacity = active ? "1" : "0";
            step.style.transform = active ? "none" : "translateY(28px)";
          }

          // mobile: each step slides in and stacks on top of the previous
          const m = mStepRefs.current[j];
          if (m) {
            const on = progress >= M_THRESHOLDS[j];
            m.style.opacity = on ? "1" : "0";
            m.style.transform = on ? "none" : "translateY(44px)";
          }
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${SCROLL_VH}vh`, backgroundColor: "#331828" }}
    >
      <div className="sticky top-0 flex min-h-[100svh] flex-col justify-center overflow-hidden">
        {/* animated liquid background */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="hiw-blob left-[-10%] top-[-20%] h-[60vmax] w-[60vmax]"
            style={{
              background: "radial-gradient(circle, #6C2A37 0%, transparent 62%)",
              animation: "hiwFloat1 22s ease-in-out infinite",
            }}
          />
          <div
            className="hiw-blob right-[-15%] top-0 h-[55vmax] w-[55vmax]"
            style={{
              background: "radial-gradient(circle, #7a3040 0%, transparent 60%)",
              animation: "hiwFloat2 27s ease-in-out infinite",
            }}
          />
          <div
            className="hiw-blob bottom-[-25%] left-[25%] h-[50vmax] w-[50vmax]"
            style={{
              background: "radial-gradient(circle, #401a28 0%, transparent 60%)",
              animation: "hiwFloat3 19s ease-in-out infinite",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1080px] px-4 py-20 sm:px-6">
          <SectionTitle className="mb-3 bg-gradient-to-r from-[#eccf8f] via-[#f7ecc9] to-[#c9a24b] bg-clip-text text-center text-[1.7rem] text-transparent sm:text-[2.2rem]">
            How NADZ Homecare Works
          </SectionTitle>
          <p className="mx-auto mb-8 max-w-xl text-center text-[15px] text-white/60 sm:mb-12">
            From your first call to follow-up — care in three simple steps.
          </p>

          {/* capsule pipe filling with liquid */}
          <div className="relative mx-auto mb-10 w-full max-w-[900px] sm:mb-14">
            <div className="relative h-6 w-full overflow-hidden rounded-full bg-black/30 shadow-[inset_0_2px_8px_rgba(0,0,0,0.55)] ring-1 ring-white/15">
              <div
                ref={fillRef}
                className="hiw-liquid absolute inset-y-0 left-0 overflow-hidden rounded-full transition-[width] duration-150 ease-linear"
                style={{
                  width: "0%",
                  backgroundImage:
                    "linear-gradient(to right, #e5484d 0%, #f2820a 28%, #f2c40a 50%, #9bc53d 74%, #2fa060 100%)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left center",
                }}
              >
                <span className="absolute inset-x-1 top-[3px] h-[2px] rounded-full bg-white/40" />
              </div>
            </div>
            {NODES.map((pos, j) => (
              <span
                key={j}
                ref={(el) => {
                  nodeRefs.current[j] = el;
                }}
                className="hiw-node absolute top-3 z-10 h-5 w-5 rounded-full border-2 border-white/70 bg-[#2a1119] shadow"
                style={{ left: `${pos * 100}%` }}
              />
            ))}
          </div>

          {/* steps — desktop grid (revealed left→right) */}
          <div className="hidden gap-6 md:grid md:grid-cols-3">
            {STEPS.map((s, j) => (
              <div
                key={j}
                ref={(el) => {
                  stepRefs.current[j] = el;
                }}
                className="hiw-step"
                style={{
                  opacity: 0,
                  transform: "translateY(28px)",
                  transition:
                    "opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)",
                  transitionDelay: `${j * 90}ms`,
                }}
              >
                <StepInner s={s} j={j} />
              </div>
            ))}
          </div>

          {/* steps — mobile stack (each step slides in over the previous) */}
          <div className="relative min-h-[370px] md:hidden">
            {STEPS.map((s, j) => (
              <div
                key={j}
                ref={(el) => {
                  mStepRefs.current[j] = el;
                }}
                className="absolute inset-x-0 top-0"
                style={{
                  zIndex: j + 1,
                  opacity: j === 0 ? 1 : 0,
                  transform: j === 0 ? "none" : "translateY(44px)",
                  transition:
                    "opacity 0.5s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                {/* solid backdrop so the incoming step fully covers the last */}
                <div className="rounded-2xl bg-[#331828] pb-2">
                  <StepInner s={s} j={j} />
                </div>
              </div>
            ))}
          </div>

          {/* cta */}
          <div className="mt-10 flex flex-col items-center sm:mt-14">
            <Link
              href="/book"
              className="btn-gold inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-semibold text-[color:var(--maroon)] shadow-[0_12px_28px_-10px_rgba(169,127,46,0.95)] ring-1 ring-white/40 transition-transform hover:-translate-y-0.5"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#25D366]">
                <svg viewBox="0 0 32 32" className="h-3.5 w-3.5" fill="#fff">
                  <path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.4L3 29l6.8-1.8c1.8 1 3.9 1.5 6 1.5C23.2 28.7 29 22.9 29 15.7 29 8.8 23.2 3 16 3Zm-3.9 6.5c.3 0 .5 0 .8.6.3.7.9 2.5 1 2.7.1.2.1.4 0 .6-.1.3-.1.4-.3.6-.2.2-.4.5-.5.6-.1.2-.3.4-.1.7.2.3.9 1.4 1.9 2.3 1.3 1.2 2.4 1.5 2.7 1.7.3.2.5.1.7-.1.2-.2.9-1 1.1-1.3.2-.4.4-.3.8-.2.3.1 2 1 2.3 1.1.4.2.6.3.7.4.1.1.1.8-.2 1.6-.3.8-1.7 1.5-2.3 1.6-.6.1-1.2.3-4.2-.9-3.6-1.4-5.8-5-6-5.2-.2-.2-1.4-1.9-1.4-3.6 0-1.7.9-2.6 1.2-2.9.3-.3.7-.4.9-.4h.7Z" />
                </svg>
              </span>
              Consult a Specialist Now
            </Link>
            <p className="mt-4 text-[14px] italic text-white/55">
              Follow-up is part of the care.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
