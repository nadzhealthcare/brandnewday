import Link from "next/link";
import { ArrowRight, Handshake, ShieldCheck } from "lucide-react";
import SectionTitle from "./SectionTitle";
import PartnersGrid from "./PartnersGrid";

const LEFT_VIDEO = "/assets/partner.mp4";

export default function PartnersSection() {
  return (
    <section className="bg-[#f7f8fa] px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-[1180px] items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        {/* left video */}
        <div className="relative min-h-[280px] overflow-hidden rounded-[28px] shadow-sm ring-1 ring-black/5 lg:min-h-full">
          <video
            src={LEFT_VIDEO}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="NADZ partnerships in healthcare"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* darkens the lower third so the labels stay legible on any frame */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

          {/* labels, anchored to the bottom of the container */}
          <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--maroon)] px-3 py-1.5 text-[12px] font-medium text-white shadow">
              <Handshake className="h-3.5 w-3.5" /> Trusted Partnerships
            </span>
            {/* Descriptive, not a count: the grid shows a handful of logos, so
                a number here would be a claim we can't back. */}
            <span className="rounded-full bg-black/50 px-3 py-1.5 text-[12px] text-white backdrop-blur">
              Hospitals &amp; health platforms
            </span>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-black/50 text-white backdrop-blur">
              <ShieldCheck className="h-4 w-4" />
            </span>
          </div>
        </div>

        {/* right: heading + logos + cta */}
        <div className="flex flex-col">
          <SectionTitle className="text-[1.7rem] text-[color:var(--maroon)] sm:text-[2.1rem]">
            Our Partners
          </SectionTitle>
          <p className="mt-3 max-w-md text-[15px] text-black/55">
            Trusted alongside leading hospitals, clinics and health platforms.
          </p>

          <PartnersGrid />

          <div className="mt-8">
            <Link
              href="/partners"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--maroon)]/20 bg-white px-6 py-3 text-[14px] font-semibold text-[color:var(--maroon)] transition-colors hover:bg-[color:var(--cream)]"
            >
              View All Partners
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
