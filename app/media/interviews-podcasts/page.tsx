import type { Metadata } from "next";
import Image from "next/image";
import { Play } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { getInterviews, youtubeId } from "@/lib/strapi";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Interviews & Podcasts — NADZ Healthcare",
  description:
    "Watch our interviews, podcast episodes, and media appearances.",
};

function YouTubeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#FF0000"
        d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8Z"
      />
      <path fill="#fff" d="M9.6 15.5V8.5l6.2 3.5-6.2 3.5Z" />
    </svg>
  );
}

export default async function InterviewsPage() {
  const { pageTitle, pageSubtitle, items } = await getInterviews();

  return (
    <div className="bg-white">
      <section
        className="relative overflow-hidden px-4 pb-14 pt-28 text-center sm:px-6 sm:pb-16 sm:pt-36"
        style={{ backgroundImage: "linear-gradient(135deg,#3d1622,#611f2e)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgba(160,26,38,0.35),transparent_60%)]" />
        <div className="relative">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/50">
            Media &amp; Press{" "}
            <span className="mx-1.5 text-[color:var(--gold-light)]">/</span>{" "}
            Interviews &amp; Podcasts
          </p>
          <SectionTitle
            as="h1"
            className="mx-auto mt-4 max-w-4xl text-[2rem] leading-[1.08] text-white sm:text-[2.9rem]"
          >
            {pageTitle || "Healthcare Podcasts and Interviews"}
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-2xl text-[15.5px] leading-relaxed text-white/65">
            {pageSubtitle ||
              "Watch our interviews, podcast episodes, and media appearances."}
          </p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto flex max-w-[1000px] flex-col gap-6">
          {items.length === 0 ? (
            <p className="py-16 text-center text-[15px] text-black/45">
              New episodes are on their way — please check back soon.
            </p>
          ) : (
            items.map((v) => {
              const id = youtubeId(v.youtubeUrl);
              const thumb = id
                ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
                : null;
              const watchUrl =
                v.youtubeUrl ||
                (id ? `https://www.youtube.com/watch?v=${id}` : "#");
              return (
                <article
                  key={v.id}
                  className="flex flex-col overflow-hidden rounded-[24px] bg-white p-3 shadow-[0_18px_44px_-30px_rgba(20,10,16,0.5)] ring-1 ring-black/5 sm:flex-row"
                >
                  <a
                    href={watchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block h-52 w-full shrink-0 overflow-hidden rounded-[18px] bg-black sm:h-auto sm:w-[42%] sm:self-stretch sm:min-h-[230px]"
                  >
                    {thumb && (
                      <Image
                        src={thumb}
                        alt={v.title}
                        fill
                        sizes="(max-width:640px) 100vw, 420px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-[#FF0000] text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <Play className="ml-0.5 h-6 w-6 fill-white" />
                      </span>
                    </span>
                  </a>
                  <div className="flex flex-1 flex-col justify-center gap-3 p-4 sm:p-7">
                    <h2 className="text-[19px] font-semibold leading-snug text-[color:var(--maroon)] sm:text-[22px]">
                      {v.title}
                    </h2>
                    {v.body && (
                      <p className="text-[14.5px] leading-relaxed text-black/60">
                        {v.body}
                      </p>
                    )}
                    <a
                      href={watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit items-center gap-2 text-[14px] font-semibold text-[color:var(--maroon)]"
                    >
                      <YouTubeIcon className="h-5 w-5" />
                      Watch on YouTube
                    </a>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
