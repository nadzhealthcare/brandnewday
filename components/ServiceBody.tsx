import Link from "next/link";
import { Check, CircleCheck, MessageCircle, Phone, ClipboardList } from "lucide-react";
import SectionTitle from "./SectionTitle";
import HowItWorks from "./HowItWorks";
import type { ServiceBodyData } from "@/lib/service-content";

/* diagonal light streak that glides across a card on hover */
function Glare() {
  return (
    <span className="pointer-events-none absolute inset-y-0 left-[-70%] w-1/2 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent blur-[1px] transition-[left] duration-[800ms] ease-in-out group-hover:left-[140%]" />
  );
}

export default function ServiceBody({ data }: { data: ServiceBodyData }) {
  return (
    <div className="bg-white">
      {/* intro + highlight strip */}
      <section className="px-4 pt-14 sm:px-6 sm:pt-20">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-black/40">
            {data.eyebrow}
          </p>
          <SectionTitle className="mt-3 text-[2rem] leading-[1.08] text-[color:var(--maroon)] sm:text-[2.7rem]">
            {data.title}
          </SectionTitle>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-black/60">
            {data.intro}
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-[1180px] gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.highlights.map((h) => {
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
                  <p className="font-title text-[20px] leading-none text-[color:var(--maroon)]">
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

      {/* features */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1180px]">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.22em] text-black/40">
            {data.featuresEyebrow}
          </p>
          <SectionTitle className="mt-3 text-center text-[2rem] text-[color:var(--maroon)] sm:text-[2.6rem]">
            {data.featuresTitle}
          </SectionTitle>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.features.map((c, i) => {
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

      {/* what's included, split panel */}
      <section className="px-4 pb-4 sm:px-6">
        <div className="mx-auto grid max-w-[1180px] gap-5 lg:grid-cols-[1fr_1.1fr]">
          <div
            className="group relative flex flex-col justify-center overflow-hidden rounded-[28px] p-8 text-white ring-1 ring-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_34px_60px_-26px_rgba(43,15,20,0.7)] sm:p-10"
            style={{ backgroundImage: "linear-gradient(150deg,#4a1c20,#6C2A37)" }}
          >
            <span className="absolute left-0 top-0 h-1 w-0 bg-[color:var(--gold-light)] transition-all duration-500 group-hover:w-full" />
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-[color:var(--gold-light)] ring-1 ring-white/15 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
              <ClipboardList className="h-7 w-7" strokeWidth={1.6} />
            </span>
            <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.2em] text-[color:var(--gold-light)]">
              {data.includedTitle}
            </p>
            <p className="mt-3 text-[21px] font-semibold leading-[1.35] sm:text-[24px]">
              {data.includedLead}
            </p>
            <Glare />
          </div>

          <div className="grid gap-3">
            {data.included.map((item) => (
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

      {/* who it's for */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1180px]">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.22em] text-black/40">
            {data.whoEyebrow}
          </p>
          <SectionTitle className="mt-3 text-center text-[2rem] text-[color:var(--maroon)] sm:text-[2.6rem]">
            {data.whoTitle}
          </SectionTitle>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {data.who.map((w) => {
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

      {/* how it works, animated (before the contact CTA) */}
      <HowItWorks />

      {/* closing CTA band */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div
          className="mx-auto flex max-w-[1180px] flex-col items-center gap-6 rounded-[30px] px-6 py-14 text-center sm:py-20"
          style={{ backgroundImage: "linear-gradient(135deg,#4a1c20,#6C2A37)" }}
        >
          <CircleCheck className="h-8 w-8 text-[color:var(--gold-light)]" />
          <p className="max-w-2xl font-title text-[1.7rem] uppercase leading-[1.15] text-white sm:text-[2.3rem]">
            {data.closingTitle}
          </p>
          <p className="max-w-md text-[15px] leading-relaxed text-white/65">
            {data.closingDesc}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/book"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[color:var(--maroon)] transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              WhatsApp us, 24/7
            </Link>
            <Link
              href="tel:8004NADZ"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4 text-[color:var(--gold-light)]" />
              Call now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
