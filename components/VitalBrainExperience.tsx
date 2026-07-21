import Link from "next/link";
import {
  Activity,
  Brain,
  Gauge,
  HeartPulse,
  Home,
  Moon,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import SplineHero from "./vital-brain/SplineHero";
import BrainDashboard from "./vital-brain/BrainDashboard";
import Reveal from "./vital-brain/Reveal";
import { waLink } from "@/lib/contact";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";

/* NADZ Vital Brain, given its own visual direction.

   Near-black with an interactive neural field, because the product is brain
   mapping and the page should feel like the instrument rather than a brochure.
   Typography stays on the site's own display face so it still reads as NADZ.
   Every word is the copy already approved for this route
   (lib/service-content.ts), only the presentation changes. */

const STATS = [
  { big: "QEEG", small: "brain-activity mapping", icon: Brain },
  { big: "2,000", small: "doctor review panel", icon: Users },
  { big: "AI", small: "clinical-grade insights", icon: Sparkles },
  { big: "At home", small: "across Dubai", icon: Home },
];

const HELPS = [
  { title: "Anxiety & stress", desc: "Overwhelm and persistent stress.", icon: Activity },
  { title: "Mood & motivation", desc: "Low motivation and emotional instability.", icon: HeartPulse },
  { title: "Focus & attention", desc: "Attention and productivity struggles.", icon: Target },
  { title: "Memory & clarity", desc: "Memory concerns and cognitive fog.", icon: Brain },
  { title: "Sleep disturbances", desc: "Restless, disrupted sleep.", icon: Moon },
  { title: "Peak performance", desc: "Optimise an already-healthy brain.", icon: Zap },
];

const PLANS = [
  {
    tier: "Basic",
    detail: "Memory/attention assessment, QEEG screening, basic blood & vitamin profile",
  },
  {
    tier: "Premium",
    detail: "Full cognitive testing, 21+ channel QEEG, comprehensive health check",
  },
  {
    tier: "Elite",
    detail: "Advanced QEEG, 50+ blood parameters, autonomic analysis, DNA methylation",
  },
];

const ASSURANCES = [
  "Non-invasive QEEG recorded in the comfort of home",
  "Every case reviewed by a 2,000-doctor panel",
  "Results reviewed with clear, personal guidance",
];

const WHO = [
  { title: "Executives", desc: "Sustain focus and cognitive edge." },
  { title: "Students", desc: "Sharpen memory and attention." },
  { title: "Athletes", desc: "Optimise recovery and performance." },
];

/* Same display face as the rest of the site: Mona Sans, expanded and
   uppercase. The two-tone headline split is kept, it just carries in colour
   now rather than in an italic serif. */
const DISPLAY = "font-title uppercase";
const EYEBROW =
  "vb-grad-text w-fit text-[12px] font-semibold uppercase tracking-[0.24em]";

export default function VitalBrainExperience() {
  const book = waLink(
    "Hi NADZ, I'd like to book NADZ Vital Brain (brain mapping at home).",
  );

  return (
    <div className="relative bg-[#0a0510] text-[#f5f4f8]">
      {/* Paint server for the accent icons. A CSS gradient can't fill an SVG
          stroke, so the icons reference this instead. */}
      <svg aria-hidden className="absolute h-0 w-0" focusable="false">
        <defs>
          <linearGradient id="vbGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#641887" />
            <stop offset="52%" stopColor="#CC5972" />
            <stop offset="100%" stopColor="#F0CCA5" />
          </linearGradient>
        </defs>
      </svg>
      {/* ---------------- Hero ---------------- */}
      <section className="relative min-h-[100svh] overflow-hidden">
        {/* nebula glow rising from the lower half */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(120% 80% at 50% 108%, rgba(96,52,120,0.55) 0%, rgba(74,28,32,0.28) 38%, rgba(10,5,16,0) 72%)",
          }}
        />
        <SplineHero className="absolute inset-0 h-full w-full" />
        <BrainDashboard />


        {/* Content anchored to the bottom: the title sits directly above the
            buttons on the left, the intro to the right. pointer-events-none so
            a drag over the copy passes through to orbit the scene behind; the
            buttons re-enable events on themselves. */}
        <div className="pointer-events-none relative mx-auto flex min-h-[100svh] max-w-[1240px] flex-col justify-end px-6 pb-16 pt-40 sm:px-10 sm:pb-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            {/* Hero copy is above the fold and bottom-anchored, so it renders
                immediately rather than through the scroll-in Reveal, whose
                bottom dead-zone would otherwise swallow the buttons here. */}
            <div className="lg:max-w-[62%]">
              <p className={EYEBROW}>NADZ Vital Brain™ · Dubai</p>
              <h1
                className={`${DISPLAY} mt-5 max-w-[16ch] text-[1.9rem] leading-[1.02] text-white sm:text-[2.6rem] lg:text-[46px]`}
              >
                Brain mapping at home with AI insights
              </h1>
              <div className="pointer-events-auto mt-9 hidden flex-wrap items-center gap-4 sm:flex">
                <a
                  href={book}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#f5f4f8] px-7 py-3.5 text-[14.5px] font-semibold text-[#0a0510] transition-transform hover:-translate-y-0.5"
                >
                  Book a brain map
                </a>
                <a
                  href={`tel:${PHONE_TEL}`}
                  aria-label={`Call ${PHONE_DISPLAY}`}
                  className="inline-block transition-transform hover:-translate-y-0.5"
                >
                  {/* Full SVG button, same as the home hero. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/nadz-800.svg"
                    alt={PHONE_DISPLAY}
                    width={247}
                    height={47}
                    className="h-[52px] w-auto"
                  />
                </a>
              </div>
            </div>

            <div className="lg:max-w-[400px] lg:pb-1">
              <p className="text-[15px] leading-relaxed text-white">
                Clinical-grade brain insights at home in Dubai. NADZ Vital Brain
                uses non-invasive QEEG brain mapping with AI analysis, and every
                case is reviewed by a 2,000-doctor panel, for those managing
                symptoms or optimising performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Stats ---------------- */}
      <section className="relative border-y border-white/10">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 sm:grid-cols-4">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal
                key={s.big}
                delay={i * 90}
                className="border-b border-r border-white/10 last:border-r-0 sm:border-b-0 [&:nth-child(2)]:border-r-0 sm:[&:nth-child(2)]:border-r"
              >
                <div className="px-6 py-9 sm:px-8 sm:py-11">
                  <span className="vb-grad-icon block">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className={`${DISPLAY} mt-5 text-[26px] leading-none sm:text-[32px]`}>
                    {s.big}
                  </p>
                  <p className="mt-2 text-[13px] text-[#f5f4f8]/45">{s.small}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------------- What it helps with ---------------- */}
      <section className="relative px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <p className={EYEBROW}>What It Helps With</p>
            <h2
              className={`${DISPLAY} mt-5 max-w-[18ch] text-[6.5vw] leading-[1.08] sm:text-[36px]`}
            >
              Understand how your brain works
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {HELPS.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={i * 70}>
                  {/* group hover lifts the tile out of the hairline grid */}
                  <div className="group h-full bg-[#0a0510] p-8 transition-colors duration-300 hover:bg-[#120a1c]">
                    <span className="vb-grad-icon block transition-opacity duration-300 group-hover:opacity-80">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className={`${DISPLAY} mt-6 text-[19px] leading-tight`}>
                      {f.title}
                    </h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-[#f5f4f8]/45">
                      {f.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Plans ---------------- */}
      <section className="relative overflow-hidden border-y border-white/10 px-6 py-24 sm:px-10 sm:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(80% 60% at 50% 0%, rgba(96,52,120,0.3) 0%, rgba(10,5,16,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[1240px]">
          <Reveal>
            <p className={EYEBROW}>Three Plans</p>
            <h2 className={`${DISPLAY} mt-5 text-[6.5vw] leading-[1.08] sm:text-[36px]`}>
              Basic, Premium, Elite
            </h2>
            <p className="mt-4 text-[15px] text-[#f5f4f8]/55">
              Clinical-grade insight, tailored to you.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {PLANS.map((p, i) => (
              <Reveal key={p.tier} delay={i * 110}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/12 bg-white/[0.03] p-8 transition-colors duration-300 hover:border-[#CC5972]/50">
                  <span className="vb-grad-text text-[11px] font-semibold uppercase tracking-[0.2em]">
                    0{i + 1}
                  </span>
                  <h3 className={`${DISPLAY} mt-4 text-[26px] leading-none`}>
                    {p.tier}
                  </h3>
                  <p className="mt-5 text-[14.5px] leading-relaxed text-[#f5f4f8]/55">
                    {p.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {ASSURANCES.map((a, i) => (
              <Reveal key={a} delay={i * 90}>
                <div className="flex h-full items-start gap-3 rounded-xl border border-white/10 px-5 py-4">
                  <span className="vb-grad-icon mt-0.5 block shrink-0">
                    <Gauge className="h-4 w-4" />
                  </span>
                  <p className="text-[13.5px] leading-relaxed text-[#f5f4f8]/60">
                    {a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Who it's for ---------------- */}
      <section className="relative px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <p className={EYEBROW}>Who It&apos;s For</p>
            <h2
              className={`${DISPLAY} mt-5 max-w-[20ch] text-[6.5vw] leading-[1.08] sm:text-[36px]`}
            >
              For symptoms and for performance
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {WHO.map((w, i) => (
              <Reveal key={w.title} delay={i * 110}>
                <div className="h-full rounded-2xl border border-white/12 bg-white/[0.03] p-8">
                  <h3 className={`${DISPLAY} text-[23px] leading-none`}>
                    {w.title}
                  </h3>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-[#f5f4f8]/55">
                    {w.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Closing ---------------- */}
      <section className="relative overflow-hidden px-6 pb-32 pt-10 sm:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(90% 70% at 50% 100%, rgba(96,52,120,0.45) 0%, rgba(10,5,16,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[900px] text-center">
          <Reveal>
            <h2
              className={`${DISPLAY} text-[7vw] leading-[1.06] sm:text-[42px]`}
            >
              Understand your brain.{" "}
              <span className="vb-grad-text">
                Optimise your performance.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-[46ch] text-[15.5px] leading-relaxed text-[#f5f4f8]/55">
              Message or call us, we&apos;ll confirm the right plan and bring
              NADZ Vital Brain to your home.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href={book}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#f5f4f8] px-8 py-4 text-[15px] font-semibold text-[#0a0510] transition-transform hover:-translate-y-0.5"
              >
                Book a brain map
              </a>
              <Link
                href="/contact"
                className="rounded-full border border-white/25 px-8 py-4 text-[15px] font-medium text-[#f5f4f8] transition-colors hover:bg-white/10"
              >
                Talk to the team
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
