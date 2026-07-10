import Link from "next/link";
import {
  Telescope,
  Target,
  Crown,
  Stethoscope,
  Sparkles,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import SectionTitle from "./SectionTitle";

/* diagonal light streak that glides across a card on hover */
function Glare() {
  return (
    <span className="pointer-events-none absolute inset-y-0 left-[-70%] w-1/2 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent blur-[1px] transition-[left] duration-[800ms] ease-in-out group-hover:left-[140%]" />
  );
}

const GOALS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Crown,
    title: "The benchmark for luxury home care",
    desc: "To establish NADZ as the standard for premium home healthcare across Dubai.",
  },
  {
    icon: Stethoscope,
    title: "The family doctor, restored",
    desc: "Reinforcing the family-doctor philosophy and the personal connection modern medicine forgot.",
  },
  {
    icon: Sparkles,
    title: "Excellence, empathy, elegance",
    desc: "Ensuring every patient experience is defined by all three, without compromise.",
  },
];

export default function MissionVision() {
  return (
    <div className="bg-white">
      {/* 1 — hero band */}
      <section
        className="relative overflow-hidden px-4 pb-16 pt-28 text-center sm:px-6 sm:pb-20 sm:pt-36"
        style={{ backgroundImage: "linear-gradient(135deg,#3d1622,#611f2e)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgba(160,26,38,0.35),transparent_60%)]" />
        <div className="relative">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/50">
            About Us <span className="mx-1.5 text-[color:var(--gold-light)]">/</span> Mission &amp; Vision
          </p>
          <SectionTitle
            as="h1"
            className="mt-4 text-[2.2rem] leading-[1.02] text-white sm:text-[3.4rem]"
          >
            Vision &amp; Mission
          </SectionTitle>
          <p className="mt-4 font-title text-[15px] uppercase tracking-[0.15em] text-[color:var(--gold-light)]">
            Where Excellence Meets Elegance
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-[15.5px] leading-relaxed text-white/65">
            NADZ redefines home healthcare in Dubai as a sanctuary of trust,
            healing and grace — every service blending clinical precision with
            family warmth.
          </p>
        </div>
      </section>

      {/* 2 — vision & mission cards */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-[1180px] gap-5 lg:grid-cols-2">
          {/* Vision — light card */}
          <article className="group relative overflow-hidden rounded-[28px] bg-[#faf7f2] p-8 ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_34px_60px_-30px_rgba(43,26,23,0.5)] hover:ring-[color:var(--gold)]/30 sm:p-10">
            <span className="absolute left-0 top-0 h-1 w-0 bg-[color:var(--gold)] transition-all duration-500 group-hover:w-full" />
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-[color:var(--maroon)] ring-1 ring-black/5 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
              <Telescope className="h-7 w-7" strokeWidth={1.6} />
            </span>
            <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.2em] text-[color:var(--gold-dark)]">
              Our Vision
            </p>
            <p className="mt-3 text-[20px] font-semibold leading-[1.35] text-[#2b1a17] sm:text-[23px]">
              To become a sanctuary of healing where excellence meets elegance —
              healthcare redefined as a bespoke, in-home experience delivered with
              grace, discretion and devotion.
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-black/55">
              We envision every home as a haven for dignified care, where the
              family doctor arrives with both expertise and empathy — admired for
              sincerity, known for quality, and remembered for making patients feel
              like family.
            </p>
            <Glare />
          </article>

          {/* Mission — maroon card */}
          <article
            className="group relative overflow-hidden rounded-[28px] p-8 text-white ring-1 ring-white/10 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_34px_60px_-26px_rgba(43,15,20,0.7)] sm:p-10"
            style={{ backgroundImage: "linear-gradient(150deg,#4a1c20,#6C2A37)" }}
          >
            <span className="absolute left-0 top-0 h-1 w-0 bg-[color:var(--gold-light)] transition-all duration-500 group-hover:w-full" />
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-[color:var(--gold-light)] ring-1 ring-white/15 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
              <Target className="h-7 w-7" strokeWidth={1.6} />
            </span>
            <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.2em] text-[color:var(--gold-light)]">
              Our Mission
            </p>
            <p className="mt-3 text-[20px] font-semibold leading-[1.35] sm:text-[23px]">
              Simple yet sacred: to treat every life we touch with the royalty it
              deserves.
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-white/70">
              We deliver personalized medical care in privacy and comfort — at
              home, hotel or office — with unwavering clinical precision. Our
              DHA-certified doctors and nurses enter every home with reverence and
              leave behind trust, calm and comfort.
            </p>
            <Glare />
          </article>
        </div>
      </section>

      {/* 3 — core principle */}
      <section className="px-4 pb-4 sm:px-6">
        <div className="group relative mx-auto max-w-[1180px] overflow-hidden rounded-[28px] border border-[color:var(--gold)]/25 bg-[#fbf8f0] px-6 py-12 text-center transition-shadow duration-500 hover:shadow-[0_30px_60px_-34px_rgba(169,127,46,0.6)] sm:py-16">
          <Sparkles className="mx-auto h-7 w-7 text-[color:var(--gold-dark)] transition-transform duration-500 group-hover:scale-110" />
          <p className="mx-auto mt-5 max-w-3xl font-title text-[1.5rem] uppercase leading-[1.3] text-[color:var(--maroon)] sm:text-[2rem]">
            Each service bespoke, tuned to your pace — a harmony of healing, woven
            with grace.
          </p>
          <Glare />
        </div>
      </section>

      {/* 4 — why it matters / goals */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1180px]">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.22em] text-black/40">
            Why It Matters
          </p>
          <SectionTitle className="mt-3 text-center text-[2rem] text-[color:var(--maroon)] sm:text-[2.6rem]">
            The goals behind every visit
          </SectionTitle>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {GOALS.map((g, i) => {
              const Icon = g.icon;
              return (
                <article
                  key={g.title}
                  className="group relative overflow-hidden rounded-[24px] bg-[#f5f4f2] p-7 ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_30px_56px_-30px_rgba(43,26,23,0.5)] hover:ring-[color:var(--gold)]/30"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[color:var(--maroon)] ring-1 ring-black/5 transition-all duration-500 group-hover:scale-110 group-hover:bg-[color:var(--maroon)] group-hover:text-white">
                      <Icon className="h-6 w-6" strokeWidth={1.6} />
                    </span>
                    <span className="font-title text-[26px] leading-none text-black/10 transition-colors duration-500 group-hover:text-[color:var(--gold)]/40">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[16px] font-semibold leading-snug text-[#1c1c1c]">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-black/55">
                    {g.desc}
                  </p>
                  <Glare />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5 — closing band */}
      <section className="px-4 pb-20 sm:px-6">
        <div
          className="mx-auto flex max-w-[1180px] flex-col items-center gap-6 rounded-[30px] px-6 py-14 text-center sm:py-20"
          style={{ backgroundImage: "linear-gradient(135deg,#4a1c20,#6C2A37)" }}
        >
          <Crown className="h-8 w-8 text-[color:var(--gold-light)]" />
          <p className="max-w-2xl font-title text-[1.7rem] uppercase leading-[1.15] text-white sm:text-[2.3rem]">
            Every life we touch, treated with the royalty it deserves.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[color:var(--maroon)] transition-transform hover:-translate-y-0.5"
            >
              Book a Home Visit
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about/who-we-are"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              Meet the team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
