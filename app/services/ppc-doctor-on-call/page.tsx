import type { Metadata } from "next";
import {
  Thermometer,
  Activity,
  HeartPulse,
  Bandage,
  Stethoscope,
  ClipboardList,
  Clock,
  Zap,
  ShieldCheck,
  UserRound,
  Plane,
  Building2,
  House,
  Check,
  type LucideIcon,
} from "lucide-react";
import DoctorOnCallLead from "@/components/landing/DoctorOnCallLead";

/* Doctor on Call — PPC landing page.

   A bare, single-purpose page for paid traffic: no navbar, footer, floating
   buttons or popups (hidden by SiteChrome on /services/ppc-* routes), and no
   links off the page. The only action is the lead form in the hero. Content
   mirrors /services/doctor-on-call but stripped of every outbound CTA.

   noindex so it never competes with the real service page in organic search;
   follow so any future internal links still pass equity. */

export const metadata: Metadata = {
  title: "Doctor on Call in Dubai — Home Visits in 30 Minutes, 24/7",
  description:
    "DHA-certified doctors to your home, hotel or office across Dubai, typically within 30 minutes. Available 24/7. Request a visit.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/services/ppc-doctor-on-call" },
};

const HIGHLIGHTS: { icon: LucideIcon; big: string; small: string }[] = [
  { icon: Clock, big: "30 min", small: "typical arrival across Dubai" },
  { icon: Zap, big: "< 5 min", small: "POC testing, MOHAP-certified" },
  { icon: ShieldCheck, big: "24/7", small: "day, night and weekends" },
  { icon: UserRound, big: "DHA", small: "certified doctors & nurses" },
];

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
  "Same-day and urgent visits, 24/7, including evenings and weekends",
  "Detailed examination and medical history review",
  "Clear diagnosis and treatment plan",
  "Prescriptions and medication guidance",
  "Test recommendations and lab coordination",
  "Integration with nursing, physiotherapy and pharmacy delivery",
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

export default function DoctorOnCallLandingPage() {
  return (
    <main className="bg-white">
      {/* ---------------- Hero: copy left, form right ---------------- */}
      <section
        className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16"
        style={{ backgroundImage: "linear-gradient(150deg,#4a1c20,#6C2A37)" }}
      >
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[1.1fr_minmax(0,420px)] lg:gap-12">
          {/* copy */}
          <div className="text-white">
            {/* brand wordmark, not a link — the page has no navigation */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo-nadz-dark.svg"
              alt="NADZ Healthcare"
              className="h-9 w-auto"
            />
            <p className="mt-8 text-[12px] font-semibold uppercase tracking-[0.22em] text-[color:var(--gold-light)]">
              Doctor on Call · Dubai
            </p>
            <h1 className="mt-3 font-title text-[2.1rem] uppercase leading-[1.05] sm:text-[2.9rem]">
              A doctor at your door in 30 minutes
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">
              DHA-certified doctors and nurses to your home, hotel or office
              anywhere in Dubai. Hospital-level care, 24/7, without the clinic
              queue.
            </p>

            {/* trust chips */}
            <div className="mt-7 flex flex-wrap gap-2.5">
              {[
                "DHA-certified doctors",
                "24/7, incl. weekends",
                "Same-day visits",
              ].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-medium text-white ring-1 ring-white/15"
                >
                  <Check className="h-3.5 w-3.5 text-[color:var(--gold-light)]" strokeWidth={2.6} />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* form */}
          <div id="request">
            <DoctorOnCallLead />
          </div>
        </div>
      </section>

      {/* ---------------- Highlight stat strip ---------------- */}
      {/* relative + z-10 so the cards paint above the positioned hero they
          overlap into, rather than being clipped behind it. */}
      <section className="relative z-10 px-4 sm:px-6">
        <div className="mx-auto -mt-8 grid max-w-[1180px] gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h) => {
            const Icon = h.icon;
            return (
              <div
                key={h.small}
                className="flex items-center gap-4 rounded-[22px] bg-white p-5 ring-1 ring-black/5 shadow-[0_24px_50px_-34px_rgba(43,26,23,0.5)]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#faf7f2] text-[color:var(--maroon)] ring-1 ring-black/5">
                  <Icon className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="font-title text-[22px] leading-none text-[color:var(--maroon)]">
                    {h.big}
                  </p>
                  <p className="mt-1 text-[12.5px] text-black/50">{h.small}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------- Conditions treated ---------------- */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1180px]">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.22em] text-black/40">
            What We Treat
          </p>
          <h2 className="mt-3 text-center font-title text-[2rem] uppercase leading-[1.1] text-[color:var(--maroon)] sm:text-[2.5rem]">
            Conditions we handle at home
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONDITIONS.map((c) => {
              const Icon = c.icon;
              return (
                <article
                  key={c.title}
                  className="rounded-[18px] bg-[#faf7f2] p-6 ring-1 ring-black/5"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-white text-[color:var(--maroon)] ring-1 ring-black/5">
                    <Icon className="h-[22px] w-[22px]" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 text-[18px] font-semibold text-[#2b1a17]">
                    {c.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-black/55">
                    {c.desc}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- What's included ---------------- */}
      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto grid max-w-[1180px] gap-5 lg:grid-cols-[1fr_1.1fr]">
          <div
            className="flex flex-col justify-center rounded-[28px] p-8 text-white ring-1 ring-white/10 sm:p-10"
            style={{ backgroundImage: "linear-gradient(150deg,#4a1c20,#6C2A37)" }}
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-[color:var(--gold-light)] ring-1 ring-white/15">
              <ClipboardList className="h-7 w-7" strokeWidth={1.6} />
            </span>
            <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.2em] text-[color:var(--gold-light)]">
              Every Visit Includes
            </p>
            <p className="mt-3 text-[21px] font-semibold leading-[1.35] sm:text-[24px]">
              A complete consultation, not a rushed house call.
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-white/70">
              From examination to prescription to onward care, everything is
              handled in one unhurried visit, coordinated by your NADZ team.
            </p>
          </div>

          <div className="grid gap-3">
            {INCLUDED.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-[20px] bg-[#faf7f2] px-5 py-4 ring-1 ring-black/5"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[color:var(--maroon)]/10 text-[color:var(--maroon)]">
                  <Check className="h-5 w-5" strokeWidth={2.4} />
                </span>
                <p className="text-[14.5px] font-medium leading-snug text-[#241417]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Who it's for ---------------- */}
      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-[1180px]">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.22em] text-black/40">
            Discreet Care, Wherever You Are
          </p>
          <h2 className="mt-3 text-center font-title text-[2rem] uppercase leading-[1.1] text-[color:var(--maroon)] sm:text-[2.5rem]">
            Made for how you live
          </h2>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {WHO.map((w) => {
              const Icon = w.icon;
              return (
                <article
                  key={w.title}
                  className="rounded-[24px] bg-[#f5f4f2] p-7 ring-1 ring-black/5"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-[color:var(--maroon)] ring-1 ring-black/5">
                    <Icon className="h-7 w-7" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-6 text-[18px] font-semibold text-[#2b1a17]">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-black/55">
                    {w.desc}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Closing: back to the form (anchor, not a nav link) --- */}
      <section className="px-4 pb-20 sm:px-6">
        <div
          className="mx-auto flex max-w-[1180px] flex-col items-center gap-6 rounded-[30px] px-6 py-14 text-center sm:py-16"
          style={{ backgroundImage: "linear-gradient(135deg,#4a1c20,#6C2A37)" }}
        >
          <p className="max-w-2xl font-title text-[1.7rem] uppercase leading-[1.15] text-white sm:text-[2.2rem]">
            A doctor at your door, day or night.
          </p>
          <p className="max-w-md text-[15px] leading-relaxed text-white/65">
            Tell us your name, number and area, and our care team will confirm a
            DHA-certified doctor visit right away.
          </p>
          <a
            href="#request"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-[15px] font-semibold text-[color:var(--maroon)] transition-transform hover:-translate-y-0.5"
          >
            Request a visit
          </a>
        </div>
      </section>
    </main>
  );
}
