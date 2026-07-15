import Link from "next/link";
import {
  Sparkles,
  HeartHandshake,
  GraduationCap,
  TrendingUp,
  Users,
  Stethoscope,
  ShieldCheck,
  Crown,
  Compass,
  Rocket,
  Briefcase,
  Mail,
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

const VALUES: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Rocket,
    title: "Innovation",
    desc: "We reimagine home healthcare for Dubai, pairing clinical precision with a genuinely modern patient experience.",
  },
  {
    icon: HeartHandshake,
    title: "Compassion",
    desc: "Every visit is delivered with reverence. We treat patients like family and each other with the same care.",
  },
  {
    icon: Crown,
    title: "Excellence",
    desc: "The benchmark for premium home care. We hold ourselves to a standard others measure themselves against.",
  },
];

const BENEFITS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: GraduationCap,
    title: "Continuous learning",
    desc: "Ongoing training, certifications and mentorship keep your practice at the leading edge of home medicine.",
  },
  {
    icon: TrendingUp,
    title: "Real growth",
    desc: "Clear pathways for professional development, your impact and your career grow together.",
  },
  {
    icon: Users,
    title: "A supportive team",
    desc: "A collaborative, forward-thinking environment where colleagues have your back on every case.",
  },
  {
    icon: Stethoscope,
    title: "Meaningful work",
    desc: "You change lives at the doorstep, dignified, personal care that patients remember and thank you for.",
  },
  {
    icon: ShieldCheck,
    title: "DHA-aligned standards",
    desc: "Work within a rigorous, fully certified framework that protects both patients and practitioners.",
  },
  {
    icon: Compass,
    title: "Purpose-led culture",
    desc: "A mission you can believe in, restoring the family-doctor relationship modern medicine forgot.",
  },
];

export default function Careers() {
  return (
    <div className="bg-white">
      {/* 1, hero band */}
      <section
        className="relative overflow-hidden px-4 pb-16 pt-28 text-center sm:px-6 sm:pb-20 sm:pt-36"
        style={{ backgroundImage: "linear-gradient(135deg,#3d1622,#611f2e)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgba(160,26,38,0.35),transparent_60%)]" />
        <div className="relative">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/50">
            About Us{" "}
            <span className="mx-1.5 text-[color:var(--gold-light)]">/</span>{" "}
            Careers
          </p>
          <SectionTitle
            as="h1"
            className="mt-4 text-[2.2rem] leading-[1.02] text-white sm:text-[3.4rem]"
          >
            Careers at NADZ
          </SectionTitle>
          <p className="mt-4 font-title text-[15px] uppercase tracking-[0.15em] text-[color:var(--gold-light)]">
            Our People Are Our Greatest Asset
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-[15.5px] leading-relaxed text-white/65">
            We&apos;re committed to a culture of innovation, compassion and
            excellence, where every team member has the opportunity to grow and
            make a meaningful impact on the lives of our patients.
          </p>
        </div>
      </section>

      {/* 2, culture / values */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1180px]">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.22em] text-black/40">
            What We Stand For
          </p>
          <SectionTitle className="mt-3 text-center text-[2rem] text-[color:var(--maroon)] sm:text-[2.6rem]">
            A culture worth joining
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-relaxed text-black/55">
            Joining our team means being part of a supportive, forward-thinking
            environment that values collaboration, continuous learning and
            professional development.
          </p>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <article
                  key={v.title}
                  className="group relative overflow-hidden rounded-[26px] bg-[#faf7f2] p-8 ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_34px_60px_-30px_rgba(43,26,23,0.5)] hover:ring-[color:var(--gold)]/30"
                >
                  <span className="absolute left-0 top-0 h-1 w-0 bg-[color:var(--gold)] transition-all duration-500 group-hover:w-full" />
                  <div className="flex items-center justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-[color:var(--maroon)] ring-1 ring-black/5 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-[color:var(--maroon)] group-hover:text-white">
                      <Icon className="h-7 w-7" strokeWidth={1.6} />
                    </span>
                    <span className="font-title text-[26px] leading-none text-black/10 transition-colors duration-500 group-hover:text-[color:var(--gold)]/40">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-[19px] font-semibold text-[#2b1a17]">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-black/55">
                    {v.desc}
                  </p>
                  <Glare />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3, why work with us / benefits */}
      <section className="px-4 pb-4 sm:px-6">
        <div className="mx-auto max-w-[1180px]">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.22em] text-black/40">
            Why Build Your Career Here
          </p>
          <SectionTitle className="mt-3 text-center text-[2rem] text-[color:var(--maroon)] sm:text-[2.6rem]">
            More than a job
          </SectionTitle>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <article
                  key={b.title}
                  className="group relative overflow-hidden rounded-[22px] bg-[#f5f4f2] p-6 ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_30px_56px_-30px_rgba(43,26,23,0.5)] hover:ring-[color:var(--gold)]/30"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[color:var(--maroon)] ring-1 ring-black/5 transition-all duration-500 group-hover:scale-110 group-hover:bg-[color:var(--maroon)] group-hover:text-white">
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 text-[16px] font-semibold text-[#1c1c1c]">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-black/55">
                    {b.desc}
                  </p>
                  <Glare />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4, open positions */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1180px]">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.22em] text-black/40">
            Open Positions
          </p>
          <SectionTitle className="mt-3 text-center text-[2rem] text-[color:var(--maroon)] sm:text-[2.6rem]">
            Current opportunities
          </SectionTitle>

          <div className="group relative mx-auto mt-10 max-w-2xl overflow-hidden rounded-[28px] border border-[color:var(--gold)]/25 bg-[#fbf8f0] px-6 py-12 text-center transition-shadow duration-500 hover:shadow-[0_30px_60px_-34px_rgba(169,127,46,0.6)] sm:py-14">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-[color:var(--maroon)] ring-1 ring-black/5 transition-transform duration-500 group-hover:scale-110">
              <Briefcase className="h-7 w-7" strokeWidth={1.6} />
            </span>
            <h3 className="mt-6 text-[20px] font-semibold text-[#2b1a17]">
              No open roles right now
            </h3>
            <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-black/55">
              We&apos;re not actively hiring at the moment, but we&apos;re always
              glad to hear from exceptional doctors, nurses and specialists.
              Introduce yourself and we&apos;ll reach out when the right role
              opens.
            </p>
            <Link
              href="mailto:careers@nadzhealthcare.com?subject=Joining%20the%20NADZ%20talent%20pool"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--maroon)] px-7 py-3.5 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              <Mail className="h-4 w-4 text-[color:var(--gold-light)]" />
              Join our talent pool
            </Link>
            <Glare />
          </div>
        </div>
      </section>

      {/* 5, closing band */}
      <section className="px-4 pb-20 sm:px-6">
        <div
          className="mx-auto flex max-w-[1180px] flex-col items-center gap-6 rounded-[30px] px-6 py-14 text-center sm:py-20"
          style={{ backgroundImage: "linear-gradient(135deg,#4a1c20,#6C2A37)" }}
        >
          <Sparkles className="h-8 w-8 text-[color:var(--gold-light)]" />
          <p className="max-w-2xl font-title text-[1.7rem] uppercase leading-[1.15] text-white sm:text-[2.3rem]">
            Build a rewarding career in a dynamic, caring organisation.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="mailto:careers@nadzhealthcare.com?subject=Careers%20at%20NADZ"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[color:var(--maroon)] transition-transform hover:-translate-y-0.5"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about/who-we-are"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              Get to know us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
