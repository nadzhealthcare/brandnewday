import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import SectionTitle from "./SectionTitle";
import type { MediaBodyData } from "@/lib/media-content";

/* diagonal light streak that glides across a card on hover */
function Glare() {
  return (
    <span className="pointer-events-none absolute inset-y-0 left-[-70%] w-1/2 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent blur-[1px] transition-[left] duration-[800ms] ease-in-out group-hover:left-[140%]" />
  );
}

export default function MediaBody({ data }: { data: MediaBodyData }) {
  const Empty = data.emptyIcon;
  return (
    <div className="bg-white">
      {/* intro */}
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
      </section>

      {/* topics */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1180px]">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.22em] text-black/40">
            {data.topicsEyebrow}
          </p>
          <SectionTitle className="mt-3 text-center text-[2rem] text-[color:var(--maroon)] sm:text-[2.6rem]">
            {data.topicsTitle}
          </SectionTitle>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.topics.map((t, i) => {
              const Icon = t.icon;
              return (
                <article
                  key={t.title}
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
                    {t.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-black/55">
                    {t.desc}
                  </p>
                  <Glare />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* empty state / stay updated */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="group relative mx-auto max-w-2xl overflow-hidden rounded-[28px] border border-[color:var(--gold)]/25 bg-[#fbf8f0] px-6 py-12 text-center transition-shadow duration-500 hover:shadow-[0_30px_60px_-34px_rgba(169,127,46,0.6)] sm:py-14">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-[color:var(--maroon)] ring-1 ring-black/5 transition-transform duration-500 group-hover:scale-110">
            <Empty className="h-7 w-7" strokeWidth={1.6} />
          </span>
          <h3 className="mt-6 text-[20px] font-semibold text-[#2b1a17]">
            {data.emptyTitle}
          </h3>
          <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-black/55">
            {data.emptyDesc}
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--maroon)] px-7 py-3.5 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            <Mail className="h-4 w-4 text-[color:var(--gold-light)]" />
            {data.ctaLabel}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Glare />
        </div>
      </section>
    </div>
  );
}
