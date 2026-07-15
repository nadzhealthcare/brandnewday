import type { Metadata } from "next";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Award } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { getAwards, mediaUrl } from "@/lib/strapi";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Awards & Achievements, NADZ Healthcare",
  description: "Milestones and recognition from the NADZ journey.",
};

export default async function AwardsPage() {
  const { pageTitle, pageSubtitle, items } = await getAwards();

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
            Awards
          </p>
          <SectionTitle
            as="h1"
            className="mx-auto mt-4 max-w-4xl text-[2rem] leading-[1.08] text-white sm:text-[2.9rem]"
          >
            {pageTitle || "Awards & Achievements"}
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-2xl text-[15.5px] leading-relaxed text-white/65">
            {pageSubtitle || "Milestones and recognition from our journey."}
          </p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto flex max-w-[1000px] flex-col gap-6">
          {items.length === 0 ? (
            <p className="py-16 text-center text-[15px] text-black/45">
              Our latest achievements will appear here shortly.
            </p>
          ) : (
            items.map((a) => {
              const img = mediaUrl(a.image, "medium");
              return (
                <article
                  key={a.id}
                  className="group flex flex-col overflow-hidden rounded-[24px] bg-white p-3 shadow-[0_18px_44px_-30px_rgba(20,10,16,0.5)] ring-1 ring-black/5 sm:flex-row"
                >
                  <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-[18px] bg-[#f0eeea] sm:h-auto sm:w-[38%] sm:self-stretch sm:min-h-[240px]">
                    {img ? (
                      <Image
                        src={img}
                        alt={a.image?.alternativeText || a.title}
                        fill
                        sizes="(max-width:640px) 100vw, 380px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-[color:var(--gold-dark)]/40">
                        <Award className="h-10 w-10" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-center gap-3 p-4 sm:p-7">
                    <h2 className="text-[20px] font-semibold leading-snug text-[color:var(--maroon)] sm:text-[22px]">
                      {a.title}
                    </h2>
                    {a.body && (
                      <div className="text-[14.5px] leading-relaxed text-black/60 [&_p+p]:mt-3 [&_p]:my-0 [&_strong]:font-semibold [&_strong]:text-[#241417]">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {a.body}
                        </ReactMarkdown>
                      </div>
                    )}
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
