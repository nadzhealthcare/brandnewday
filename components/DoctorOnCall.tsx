import Link from "next/link";
import {
  Thermometer,
  Activity,
  Stethoscope,
  Bandage,
  HeartPulse,
  ClipboardList,
  MessageCircle,
  UserRound,
  CircleCheck,
  Zap,
  Plane,
  Building2,
  House,
  ShieldCheck,
  Clock,
  Phone,
  ArrowUpRight,
  Check,
  type LucideIcon,
} from "lucide-react";
import SectionTitle from "./SectionTitle";

/* diagonal light streak that glides across a card on hover */
function Glare() {
  return (
    <span className="pointer-events-none absolute inset-y-0 left-[-70%] w-1/2 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent blur-[1px] transition-[left] duration-[800ms] ease-in-out group-hover:left-[140%]" />
  );
}

const CONDITIONS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Thermometer,
    title: "Fever & infections",
    desc: "Fever, flu, throat and chest infections assessed and treated at home.",
  },
  {
    icon: Activity,
    title: "Digestive & pain",
    desc: "Stomach issues, food poisoning, headaches and body pain.",
  },
  {
    icon: HeartPulse,
    title: "Chronic conditions",
    desc: "Diabetes, hypertension and thyroid disorder management.",
  },
  {
    icon: Bandage,
    title: "Minor injuries",
    desc: "Sprains, cuts, burns and allergic reactions handled on-site.",
  },
  {
    icon: Stethoscope,
    title: "Post-hospital care",
    desc: "Post-hospital and surgical follow-up in the comfort of home.",
  },
  {
    icon: ClipboardList,
    title: "Medication reviews",
    desc: "Chronic disease reviews and medication adjustments.",
  },
];

const INCLUDED: string[] = [
  "Same-day and urgent visits — 24/7, including evenings and weekends",
  "Detailed examination and medical history review",
  "Clear diagnosis and treatment plan",
  "Prescriptions and medication guidance",
  "Test recommendations and lab coordination",
  "Integration with nursing, physiotherapy and pharmacy delivery",
];

const STEPS: { title: string; desc: string }[] = [
  {
    title: "Call or WhatsApp",
    desc: "Tell us your symptoms and location — home, hotel or office.",
  },
  {
    title: "Doctor assigned",
    desc: "We confirm your DHA-certified doctor and a precise visit time.",
  },
  {
    title: "Doctor arrives",
    desc: "Examination, a clear plan explained, and any onward services arranged.",
  },
];

const WHO: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Plane,
    title: "Travellers & hotel guests",
    desc: "Discreet, unhurried care for visitors and VIP guests, in-suite.",
  },
  {
    icon: Building2,
    title: "Business professionals",
    desc: "Treatment at the office so you never lose a day to a clinic queue.",
  },
  {
    icon: House,
    title: "Families & the elderly",
    desc: "Compassionate support for patients with mobility limitations.",
  },
];

const HIGHLIGHTS: { icon: LucideIcon; big: string; small: string }[] = [
  { icon: Clock, big: "30 min", small: "typical arrival across Dubai" },
  { icon: Zap, big: "< 5 min", small: "POC testing, MOHAP-certified" },
  { icon: ShieldCheck, big: "24/7", small: "day, night and weekends" },
  { icon: UserRound, big: "DHA", small: "certified doctors & nurses" },
];

export default function DoctorOnCall() {
  return (
    <div className="bg-white">
      {/* intro */}
      <section className="px-4 pt-14 sm:px-6 sm:pt-20">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-black/40">
            Doctor on Call · Dubai
          </p>
          <SectionTitle className="mt-3 text-[2rem] leading-[1.08] text-[color:var(--maroon)] sm:text-[2.7rem]">
            Home, hotel &amp; office visits in 30 minutes
          </SectionTitle>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-black/60">
            Get a visit from Dubai Health Authority (DHA) certified doctors and
            nurses anytime. Hospital-level medical care, brought to your doorstep
            anywhere in Dubai — 24/7.
          </p>
        </div>

        {/* highlight stat strip */}
        <div className="mx-auto mt-10 grid max-w-[1180px] gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h) => {
            const Icon = h.icon;
            return (
              <div
                key={h.small}
                className="group relative flex items-center gap-4 overflow-hidden rounded-[22px] bg-[#faf7f2] p-5 ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_30px_56px_-30px_rgba(43,26,23,0.5)] hover:ring-[color:var(--gold)]/30"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-[color:var(--maroon)] ring-1 ring-black/5 transition-all duration-500 group-hover:scale-110 group-hover:bg-[color:var(--maroon)] group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="font-title text-[22px] leading-none text-[color:var(--maroon)]">
                    {h.big}
                  </p>
                  <p className="mt-1 text-[12.5px] text-black/50">{h.small}</p>
                </div>
                <Glare />
              </div>
            );
          })}
        </div>
      </section>

      {/* conditions treated */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1180px]">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.22em] text-black/40">
            What We Treat
          </p>
          <SectionTitle className="mt-3 text-center text-[2rem] text-[color:var(--maroon)] sm:text-[2.6rem]">
            Conditions we handle at home
          </SectionTitle>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONDITIONS.map((c, i) => {
              const Icon = c.icon;
              return (
                <article
                  key={c.title}
                  className="group relative overflow-hidden rounded-[22px] bg-[#f5f4f2] p-6 ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_30px_56px_-30px_rgba(43,26,23,0.5)] hover:ring-[color:var(--gold)]/30"
                >
                  <span className="absolute left-0 top-0 h-1 w-0 bg-[color:var(--gold)] transition-all duration-500 group-hover:w-full" />
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[color:var(--maroon)] ring-1 ring-black/5 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-[color:var(--maroon)] group-hover:text-white">
                      <Icon className="h-6 w-6" strokeWidth={1.6} />
                    </span>
                    <span className="font-title text-[24px] leading-none text-black/10 transition-colors duration-500 group-hover:text-[color:var(--gold)]/40">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[16px] font-semibold text-[#1c1c1c]">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-black/55">
                    {c.desc}
                  </p>
                  <Glare />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* what's included — split panel */}
      <section className="px-4 pb-4 sm:px-6">
        <div className="mx-auto grid max-w-[1180px] gap-5 lg:grid-cols-[1fr_1.1fr]">
          {/* maroon lead */}
          <div
            className="group relative flex flex-col justify-center overflow-hidden rounded-[28px] p-8 text-white ring-1 ring-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_34px_60px_-26px_rgba(43,15,20,0.7)] sm:p-10"
            style={{ backgroundImage: "linear-gradient(150deg,#4a1c20,#6C2A37)" }}
          >
            <span className="absolute left-0 top-0 h-1 w-0 bg-[color:var(--gold-light)] transition-all duration-500 group-hover:w-full" />
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-[color:var(--gold-light)] ring-1 ring-white/15 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
              <ClipboardList className="h-7 w-7" strokeWidth={1.6} />
            </span>
            <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.2em] text-[color:var(--gold-light)]">
              Every Visit Includes
            </p>
            <p className="mt-3 text-[21px] font-semibold leading-[1.35] sm:text-[24px]">
              A complete consultation — not a rushed house call.
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-white/70">
              From examination to prescription to onward care, everything is
              handled in one unhurried visit, coordinated by your NADZ team.
            </p>
            <Glare />
          </div>

          {/* checklist */}
          <div className="grid gap-3">
            {INCLUDED.map((item) => (
              <div
                key={item}
                className="group relative flex items-center gap-4 overflow-hidden rounded-[20px] bg-[#faf7f2] px-5 py-4 ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_22px_44px_-30px_rgba(43,26,23,0.5)] hover:ring-[color:var(--gold)]/30"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[color:var(--maroon)]/10 text-[color:var(--maroon)] transition-all duration-500 group-hover:scale-110 group-hover:bg-[color:var(--maroon)] group-hover:text-white">
                  <Check className="h-5 w-5" strokeWidth={2.4} />
                </span>
                <p className="text-[14.5px] font-medium leading-snug text-[#241417]">
                  {item}
                </p>
                <Glare />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* how it works */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1180px]">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.22em] text-black/40">
            How It Works
          </p>
          <SectionTitle className="mt-3 text-center text-[2rem] text-[color:var(--maroon)] sm:text-[2.6rem]">
            A doctor at your door in three steps
          </SectionTitle>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <article
                key={s.title}
                className="group relative overflow-hidden rounded-[24px] bg-[#faf7f2] p-7 ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_30px_56px_-30px_rgba(43,26,23,0.5)] hover:ring-[color:var(--gold)]/30"
              >
                <span className="font-title text-[40px] leading-none text-[color:var(--maroon)]/15 transition-colors duration-500 group-hover:text-[color:var(--gold)]/50">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-[17px] font-semibold text-[#2b1a17]">
                  {s.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-black/55">
                  {s.desc}
                </p>
                <span className="absolute bottom-6 right-6 text-[color:var(--maroon)]/20 transition-all duration-500 group-hover:translate-x-1 group-hover:text-[color:var(--maroon)]">
                  <ArrowUpRight className="h-6 w-6" />
                </span>
                <Glare />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* who it's for */}
      <section className="px-4 pb-4 sm:px-6">
        <div className="mx-auto max-w-[1180px]">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.22em] text-black/40">
            Discreet Care, Wherever You Are
          </p>
          <SectionTitle className="mt-3 text-center text-[2rem] text-[color:var(--maroon)] sm:text-[2.6rem]">
            Made for how you live
          </SectionTitle>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {WHO.map((w) => {
              const Icon = w.icon;
              return (
                <article
                  key={w.title}
                  className="group relative overflow-hidden rounded-[24px] bg-[#f5f4f2] p-7 ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_30px_56px_-30px_rgba(43,26,23,0.5)] hover:ring-[color:var(--gold)]/30"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-[color:var(--maroon)] ring-1 ring-black/5 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-[color:var(--maroon)] group-hover:text-white">
                    <Icon className="h-7 w-7" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-6 text-[18px] font-semibold text-[#2b1a17]">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-black/55">
                    {w.desc}
                  </p>
                  <Glare />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* closing CTA band */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div
          className="mx-auto flex max-w-[1180px] flex-col items-center gap-6 rounded-[30px] px-6 py-14 text-center sm:py-20"
          style={{ backgroundImage: "linear-gradient(135deg,#4a1c20,#6C2A37)" }}
        >
          <CircleCheck className="h-8 w-8 text-[color:var(--gold-light)]" />
          <p className="max-w-2xl font-title text-[1.7rem] uppercase leading-[1.15] text-white sm:text-[2.3rem]">
            A doctor at your door, day or night.
          </p>
          <p className="max-w-md text-[15px] leading-relaxed text-white/65">
            Message or call us with your symptoms and location — we&apos;ll have a
            DHA-certified doctor on the way.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/book"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[color:var(--maroon)] transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              WhatsApp us — 24/7
            </Link>
            <Link
              href="tel:8004NADZ"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4 text-[color:var(--gold-light)]" />
              Call for a doctor visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
