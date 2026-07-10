import Link from "next/link";
import {
  Stethoscope,
  HeartPulse,
  Syringe,
  Activity,
  Home,
  Heart,
  Sparkles,
  Users,
  ShieldCheck,
  Clock,
  Gem,
  BadgeCheck,
  Baby,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import SectionTitle from "./SectionTitle";

const IMG_MAIN = "/assets/doctorled.jpg";
const IMG_PROMISE = "/assets/drnadia.jpg";

const SERVE: { icon: LucideIcon; label: string; note: string }[] = [
  { icon: Stethoscope, label: "Routine Check-ups", note: "Preventive, ongoing care" },
  { icon: Activity, label: "Chronic Disease Management", note: "Steady, expert oversight" },
  { icon: Heart, label: "Post-operative Recovery", note: "Healing, at home" },
  { icon: Baby, label: "Maternal & Newborn Wellness", note: "Care for two" },
];

const PROMISE: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Heart, title: "Heartfelt Personalization", desc: "Customized care plans based on your health history, lifestyle and wellness goals." },
  { icon: Sparkles, title: "Excellence with Empathy", desc: "Advanced medical practice paired with genuine human compassion." },
  { icon: Users, title: "A Relationship Beyond Treatment", desc: "Long-term connections built on familiarity and trust." },
  { icon: Home, title: "Care in the Comfort of Home", desc: "Medical excellence delivered right to your doorstep." },
];

const WHY: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: BadgeCheck, title: "DHA Certified Excellence", desc: "Every doctor and nurse is DHA-certified and personally trained." },
  { icon: Stethoscope, title: "Family Doctor Philosophy", desc: "One trusted team that truly knows your family's health." },
  { icon: Gem, title: "Bespoke Luxury Services", desc: "A signature, private experience tailored entirely to you." },
  { icon: Clock, title: "24/7 Availability", desc: "Care whenever you need it — day or night, every day." },
];

/* diagonal light streak that glides across a card on hover */
function Glare() {
  return (
    <span className="pointer-events-none absolute inset-y-0 left-[-70%] w-1/2 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent blur-[1px] transition-[left] duration-[800ms] ease-in-out group-hover:left-[140%]" />
  );
}

function SocialDot({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#"
      className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--maroon)] text-white transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:bg-[color:var(--gold-dark)] hover:shadow-[0_10px_20px_-8px_rgba(43,26,23,0.7)]"
    >
      {children}
    </a>
  );
}

export default function WhoWeAre() {
  return (
    <div className="bg-white">
      {/* 1 — hero (maroon band, sits under the glass navbar) */}
      <section
        className="relative overflow-hidden px-4 pb-16 pt-28 text-center sm:px-6 sm:pb-20 sm:pt-36"
        style={{ backgroundImage: "linear-gradient(135deg,#3d1622,#611f2e)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgba(160,26,38,0.35),transparent_60%)]" />
        <div className="relative">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/50">
            About Us <span className="mx-1.5 text-[color:var(--gold-light)]">/</span> Who We Are
          </p>
          <SectionTitle
            as="h1"
            className="mt-4 text-[2.4rem] leading-[1.02] text-white sm:text-[3.6rem]"
          >
            Who We Are
          </SectionTitle>
          <p className="mx-auto mt-5 max-w-2xl text-[15.5px] leading-relaxed text-white/65">
            NADZ Healthcare is redefining the future of home healthcare in Dubai —
            doctor-founded, built on clinical excellence, empathy, and a signature
            experience.
          </p>
        </div>
      </section>

      {/* 2 — feature image with overlaid glass cards */}
      <section className="px-4 pt-12 sm:px-6 sm:pt-16">
        <div className="group relative mx-auto max-w-[1180px] overflow-hidden rounded-[30px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMG_MAIN}
            alt="The NADZ care team"
            className="h-[620px] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] sm:h-[560px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/35" />

          <div className="absolute inset-0 flex flex-col justify-between gap-4 p-5 sm:p-7 lg:flex-row lg:items-end">
            {/* left — value proposition */}
            <div className="group/card max-w-sm rounded-[22px] border border-white/12 bg-black/40 p-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--gold-light)]/40 hover:bg-black/55">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/12 text-[color:var(--gold-light)] transition-transform duration-500 group-hover/card:-rotate-6 group-hover/card:scale-110">
                <Gem className="h-5 w-5" />
              </span>
              <p className="mt-3 text-[14px] leading-relaxed text-white/85">
                NADZ Home Healthcare is not merely a service — it is a signature
                experience. A private, personalized indulgence delivered where it
                matters most: your home, office, or hotel suite.
              </p>
              <p className="mt-3 text-[13px] font-semibold text-[color:var(--gold-light)]">
                Dr. Nadia Choudhry · Co-founder
              </p>
            </div>

            {/* center — service icon bar */}
            <div className="mx-auto hidden items-center gap-1.5 self-center rounded-full border border-white/15 bg-black/40 px-3 py-2 backdrop-blur-md lg:flex">
              {[Stethoscope, HeartPulse, Syringe, Activity, Home].map((Icon, i) => (
                <span
                  key={i}
                  className="grid h-9 w-9 place-items-center rounded-full text-white/85 transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:bg-[color:var(--gold-light)] hover:text-[color:var(--maroon)]"
                >
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
              ))}
            </div>

            {/* right — our story */}
            <div className="max-w-sm rounded-[22px] border border-white/12 bg-black/40 p-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--gold-light)]/40 hover:bg-black/55 lg:text-right">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                Our Story
              </span>
              <p className="mt-2 font-title text-[26px] uppercase leading-none text-white">
                Doctor-founded
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-white/80">
                Co-founded by Dr. Nadia Choudhry, every NADZ doctor and nurse is
                DHA-certified and personally trained under her guidance — integrity,
                precision and empathy in every visit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — big stat */}
      <section className="px-4 py-16 text-center sm:px-6 sm:py-20">
        <p className="font-title text-[3rem] leading-none text-[color:var(--maroon)] sm:text-[4.6rem]">
          10,000+
        </p>
        <p className="mx-auto mt-3 max-w-md text-[15px] text-black/55">
          Families cared for in the comfort, discretion and elegance of their own
          space.
        </p>
      </section>

      {/* 4 — who we serve */}
      <section className="px-4 sm:px-6">
        <div className="mx-auto flex max-w-[1180px] flex-col items-stretch gap-4 lg:flex-row">
          <div className="grid flex-1 gap-3 sm:grid-cols-2">
            {SERVE.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-[#f5f4f2] px-4 py-3.5 ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_22px_44px_-30px_rgba(43,26,23,0.5)] hover:ring-[color:var(--gold)]/30"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[color:var(--maroon)] ring-1 ring-black/5 transition-all duration-500 group-hover:scale-110 group-hover:bg-[color:var(--maroon)] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-[#1c1c1c]">{s.label}</p>
                    <p className="text-[12px] text-black/45">{s.note}</p>
                  </div>
                  <Glare />
                </div>
              );
            })}
          </div>
          <Link
            href="/services/doctor-on-call"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[color:var(--maroon)] px-8 py-4 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5 lg:w-64"
          >
            Explore our services
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 5 — commitment */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-[1180px] items-center gap-8 rounded-[30px] bg-[#faf7f2] p-8 ring-1 ring-black/5 sm:p-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-[22px] font-medium leading-[1.35] text-[#2b1a17] sm:text-[27px]">
              True healthcare is a{" "}
              <span className="text-[color:var(--maroon)]">sacred art</span> — one
              that nurtures the body, soothes the spirit, and upholds dignity at
              every step.
            </p>
            <p className="mt-6 text-[14px] font-semibold text-[color:var(--maroon)]">
              Dr. Nadia Choudhry
            </p>
            <p className="text-[13px] text-black/45">Co-founder</p>
          </div>
          <div className="flex flex-col gap-5">
            <div className="group relative overflow-hidden rounded-[22px] bg-white p-5 shadow-[0_16px_36px_-24px_rgba(43,26,23,0.4)] ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_56px_-30px_rgba(43,26,23,0.5)] hover:ring-[color:var(--gold)]/30">
              <span className="absolute left-0 top-0 h-1 w-0 bg-[color:var(--gold)] transition-all duration-500 group-hover:w-full" />
              <p className="text-[14.5px] italic leading-relaxed text-black/65">
                &ldquo;Each service bespoke, tuned to your pace — a harmony of
                healing, woven with grace.&rdquo;
              </p>
              <p className="mt-3 text-[12.5px] font-semibold text-[color:var(--gold-dark)]">
                The NADZ Promise
              </p>
              <Glare />
            </div>
            <div className="flex items-center gap-2.5">
              <SocialDot>
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M18.9 2H22l-7.1 8.1L23.3 22h-6.6l-5.2-6.8L5.6 22H2.4l7.6-8.7L1 2h6.8l4.7 6.2L18.9 2Zm-1.2 18h1.8L7.4 3.9H5.5L17.7 20Z" /></svg>
              </SocialDot>
              <SocialDot>
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
              </SocialDot>
              <SocialDot>
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 22 10.6 22 14v7h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H9V9Z" /></svg>
              </SocialDot>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — our promise / why choose */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-[1180px]">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.22em] text-black/40">
            Our Promise to You
          </p>
          <SectionTitle className="mt-3 text-center text-[2rem] text-[color:var(--maroon)] sm:text-[2.6rem]">
            Care worth trusting
          </SectionTitle>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {/* col A — promise list */}
            <div className="flex flex-col gap-3">
              {PROMISE.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="group relative overflow-hidden rounded-2xl bg-[#f5f4f2] p-5 ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_26px_50px_-30px_rgba(43,26,23,0.5)] hover:ring-[color:var(--gold)]/30">
                    <span className="absolute left-0 top-0 h-1 w-0 bg-[color:var(--gold)] transition-all duration-500 group-hover:w-full" />
                    <span className="flex items-center gap-2.5 text-[color:var(--maroon)]">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-[color:var(--maroon)] ring-1 ring-black/5 transition-all duration-500 group-hover:scale-110 group-hover:bg-[color:var(--maroon)] group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-[15px] font-semibold text-[#1c1c1c]">{f.title}</span>
                    </span>
                    <p className="mt-2 text-[13px] leading-snug text-black/55">{f.desc}</p>
                    <Glare />
                  </div>
                );
              })}
            </div>

            {/* col B — why choose */}
            <div className="flex flex-col gap-3">
              {WHY.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="group relative overflow-hidden rounded-2xl bg-[#f5f4f2] p-5 ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_26px_50px_-30px_rgba(43,26,23,0.5)] hover:ring-[color:var(--gold)]/30">
                    <span className="absolute left-0 top-0 h-1 w-0 bg-[color:var(--gold)] transition-all duration-500 group-hover:w-full" />
                    <span className="flex items-center gap-2.5 text-[color:var(--maroon)]">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-[color:var(--maroon)] ring-1 ring-black/5 transition-all duration-500 group-hover:scale-110 group-hover:bg-[color:var(--maroon)] group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-[15px] font-semibold text-[#1c1c1c]">{f.title}</span>
                    </span>
                    <p className="mt-2 text-[13px] leading-snug text-black/55">{f.desc}</p>
                    <Glare />
                  </div>
                );
              })}
              <Link
                href="/book"
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[color:var(--maroon)] px-6 py-3.5 text-[14px] font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Book a Home Visit
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            {/* col C — image card */}
            <div className="group relative min-h-[360px] overflow-hidden rounded-[24px] lg:min-h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG_PROMISE} alt="NADZ care" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 p-5">
                <Link href="/services/doctor-on-call" className="inline-flex items-center justify-between rounded-full bg-white/90 px-5 py-3 text-[14px] font-semibold text-[color:var(--maroon)] backdrop-blur transition-transform hover:-translate-y-0.5">
                  Explore Services <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link href="/book" className="inline-flex items-center justify-between rounded-full bg-[color:var(--maroon)] px-5 py-3 text-[14px] font-semibold text-white transition-transform hover:-translate-y-0.5">
                  Book a Visit <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 — closing */}
      <section className="px-4 pb-20 sm:px-6">
        <div
          className="mx-auto flex max-w-[1180px] flex-col items-center gap-6 rounded-[30px] px-6 py-14 text-center sm:py-20"
          style={{ backgroundImage: "linear-gradient(135deg,#4a1c20,#6C2A37)" }}
        >
          <ShieldCheck className="h-8 w-8 text-[color:var(--gold-light)]" />
          <p className="max-w-2xl font-title text-[1.7rem] uppercase leading-[1.15] text-white sm:text-[2.3rem]">
            The future of healthcare isn&apos;t in waiting rooms — it&apos;s in the
            quiet strength of your home.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/book" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[color:var(--maroon)] transition-transform hover:-translate-y-0.5">
              Book a Home Visit
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10">
              Talk to our team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
