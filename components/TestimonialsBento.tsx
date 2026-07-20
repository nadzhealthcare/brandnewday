import { ThumbsUp, Activity } from "lucide-react";
import SectionTitle from "./SectionTitle";
import ReviewsTile from "./ReviewsTile";
import LazyVideo from "./LazyVideo";
import ServingMapTile from "./ServingMapTile";
import { FEATURED_GOOGLE_REVIEW } from "@/lib/reviews";
import { truncate } from "@/lib/contact";

/* Reviews are curated in lib/reviews.ts rather than pulled from Strapi: the
   CMS collection only ever held one placeholder entry, and the site's API
   token is read-only so it can't be managed from here. */
export default function TestimonialsBento() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-[1240px]">
        <SectionTitle className="text-center text-[1.8rem] text-[color:var(--maroon)] sm:text-[2.4rem]">
          Loved by Families Across Dubai
        </SectionTitle>
        <p className="mx-auto mb-12 mt-3 max-w-xl text-center text-[15px] text-black/55">
          Thousands of home visits delivered, here&apos;s what our patients say.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-[224px_268px_164px]">
          {/* A, reviews highlight (USPs + vertical review carousel) */}
          <ReviewsTile />

          {/* B, testimonial video (tall) */}
          <div className="group relative overflow-hidden rounded-[26px] md:col-span-1 md:row-span-2">
            <LazyVideo
              className="absolute inset-0 h-full w-full object-cover"
              src="/assets/testimonial.mp4"
              poster="/assets/featured-placeholder.webp"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25" />
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--maroon)] px-3 py-1.5 text-[12px] font-medium text-white shadow">
              <ThumbsUp className="h-3.5 w-3.5" /> Fast, Reliable Healthcare
            </span>
            <span className="absolute right-4 top-14 rounded-full bg-black/50 px-3 py-1.5 text-[12px] text-white backdrop-blur">
              Got Help in 26mins
            </span>
            <span className="absolute right-4 top-[92px] grid h-8 w-8 place-items-center rounded-full bg-black/50 text-white backdrop-blur">
              <Activity className="h-4 w-4" />
            </span>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
              <p className="text-[18px] font-semibold leading-tight text-white">
                What Our Patients Say
                <br />
                About Their Experience
              </p>
            </div>
          </div>

          {/* C, serving locations (animated Dubai map with NADZ pins) */}
          <ServingMapTile />

          {/* D, response-time USP */}
          <div className="flex flex-col justify-between rounded-[26px] bg-gradient-to-br from-[#4a1c20] to-[#280f14] p-6 text-white md:col-span-1">
            <span className="text-[13px] text-white/60">Fast when it matters</span>
            <div>
              <div className="text-[42px] font-bold leading-none text-[color:var(--gold-light)]">
                30 min
              </div>
              <p className="mt-2 text-[13.5px] text-white/70">
                average response time across Dubai.
              </p>
            </div>
          </div>

          {/* E, patient quote (wide) */}
          <div className="flex flex-col justify-between rounded-[26px] bg-[#faf7f2] p-6 ring-1 ring-black/5 md:col-span-2">
            <p className="text-[16px] leading-relaxed text-[#3a2a26] sm:text-[18px]">
              &ldquo;
              {truncate(FEATURED_GOOGLE_REVIEW.text, 240)}
              &rdquo;
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--maroon)] text-[13px] font-semibold text-white">
                {FEATURED_GOOGLE_REVIEW.initials}
              </span>
              <div className="leading-tight">
                <p className="text-[14px] font-semibold text-[color:var(--maroon)]">
                  {FEATURED_GOOGLE_REVIEW.name}
                </p>
                <p className="text-[12.5px] text-black/50">
                  {FEATURED_GOOGLE_REVIEW.label}
                </p>
              </div>
            </div>
          </div>

          {/* F, 24/7 USP */}
          <div className="flex flex-col justify-between rounded-[26px] bg-[#f5f4f2] p-6 ring-1 ring-black/5 md:col-span-1">
            <span className="text-[13px] text-black/45">Always on</span>
            <div>
              <div className="text-[42px] font-bold leading-none text-[color:var(--maroon)]">
                24/7
              </div>
              <p className="mt-2 text-[13.5px] text-black/55">
                doctor on call, every single day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
