import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Newspaper } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { getPressReleases, mediaUrl } from "@/lib/strapi";

export const revalidate = 300;

export const metadata: Metadata = {
  alternates: { canonical: "/media/press-releases" },
  title: "Press Releases, NADZ Healthcare",
  description: "Official announcements and news from NADZ Healthcare.",
};

export default async function PressReleasesPage() {
  const items = await getPressReleases();

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
            <span className="mx-1.5 text-[color:var(--gold-light)]">/</span> Press
            Releases
          </p>
          <SectionTitle
            as="h1"
            className="mt-4 text-[2.2rem] leading-[1.05] text-white sm:text-[3.2rem]"
          >
            Press Releases
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-2xl text-[15.5px] leading-relaxed text-white/65">
            Official announcements and the latest news from NADZ Healthcare.
          </p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1180px]">
          {items.length === 0 ? (
            <p className="py-16 text-center text-[15px] text-black/45">
              Announcements are on their way, please check back soon.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((a) => {
                const img = mediaUrl(a.image, "medium");
                return (
                  <Link
                    key={a.id}
                    href={`/media/press-releases/${a.slug}`}
                    className="group flex flex-col overflow-hidden rounded-[22px] bg-white ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_56px_-30px_rgba(43,26,23,0.5)] hover:ring-[color:var(--gold)]/30"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f0eeea]">
                      {img ? (
                        <Image
                          src={img}
                          alt={a.image?.alternativeText || a.title}
                          fill
                          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 380px"
                          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="grid h-full place-items-center text-[color:var(--maroon)]/30">
                          <Newspaper className="h-10 w-10" />
                        </div>
                      )}
                      {a.source && (
                        <span className="absolute left-3 top-3 rounded-full bg-black/45 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm">
                          {a.source}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="text-[16px] font-semibold leading-snug text-[#241417] transition-colors group-hover:text-[color:var(--maroon)]">
                        {a.title}
                      </h2>
                      {a.excerpt && (
                        <p className="mt-2 line-clamp-3 text-[13.5px] leading-relaxed text-black/55">
                          {a.excerpt}
                        </p>
                      )}
                      <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-3 text-[12px] text-black/45">
                        <span>{a.date || "NADZ"}</span>
                        <ArrowUpRight className="h-4 w-4 text-[color:var(--maroon)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
