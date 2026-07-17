import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
