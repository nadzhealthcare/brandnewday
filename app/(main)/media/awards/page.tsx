import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { getAwards, mediaUrl, type AwardItem } from "@/lib/strapi";

export const revalidate = 300;

export const metadata: Metadata = {
  alternates: { canonical: "/media/awards" },
  title: "Awards & Achievements, NADZ Healthcare",
  description: "Milestones and recognition from the NADZ journey.",
};

/* Body is markdown; on a photo tile only a short plain-text teaser fits, so
   strip the syntax and trim to whole words. */
function excerpt(md: string | null | undefined, max: number): string {
  if (!md) return "";
  const text = md
    .replace(/[#>*_`~[\]()!-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const at = cut.lastIndexOf(" ");
  return `${at > max * 0.6 ? cut.slice(0, at) : cut}…`;
}

/* One tile in the bento. The first award is the big feature on the left; the
   rest fill the mosaic. Copy sits over the image behind a bottom scrim so it
   stays readable — NADZ maroon/gold, rather than the flat colour cards this
   layout's structure is modelled on. */
function AwardCard({
  a,
  featured,
  spanClass = "",
}: {
  a: AwardItem;
  featured: boolean; // controls the copy scale; grid span is separate
  spanClass?: string;
}) {
  const img = mediaUrl(a.image, featured ? "large" : "medium");
  const teaser = excerpt(a.body, featured ? 220 : 96);
  const clamp = (lines: number) => ({
    display: "-webkit-box",
    WebkitBoxOrient: "vertical" as const,
    WebkitLineClamp: lines,
    overflow: "hidden",
  });

  const cls = `group relative block overflow-hidden rounded-[24px] shadow-[0_20px_50px_-30px_rgba(20,10,16,0.6)] ring-1 ring-black/5 ${spanClass}`;
  const inner = (
    <>
      {img ? (
        <Image
          src={img}
          alt={a.image?.alternativeText || a.title}
          fill
          sizes={
            featured
              ? "(max-width:1024px) 100vw, 800px"
              : "(max-width:640px) 100vw, 400px"
          }
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
      ) : (
        <div
          className="absolute inset-0 grid place-items-center"
          style={{ backgroundImage: "linear-gradient(150deg,#4a1c20,#6C2A37)" }}
        >
          <Award className="h-10 w-10 text-[color:var(--gold-light)]/50" />
        </div>
      )}

      {/* readability scrim */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/88 via-black/45 to-transparent" />

      {/* label */}
      <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white ring-1 ring-white/20 backdrop-blur-sm">
        <Award className="h-3.5 w-3.5 text-[color:var(--gold-light)]" />
        Achievement
      </span>

      {/* copy */}
      <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-6">
        <h2
          className={`font-semibold leading-snug text-white ${
            featured ? "text-[24px] sm:text-[30px]" : "text-[17px]"
          }`}
          style={clamp(featured ? 3 : 2)}
        >
          {a.title}
        </h2>
        {teaser && (
          <p
            className={`mt-2 leading-relaxed text-white/70 ${
              featured ? "max-w-xl text-[14.5px]" : "text-[13px]"
            }`}
            style={clamp(featured ? 3 : 2)}
          >
            {teaser}
          </p>
        )}
      </div>
    </>
  );

  // Link to the detail page only once the award has a slug, so there are no
  // broken links before the slug field is filled in Strapi.
  return a.slug ? (
    <Link href={`/media/awards/${a.slug}`} className={cls}>
      {inner}
    </Link>
  ) : (
    <article className={cls}>{inner}</article>
  );
}

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
        <div className="mx-auto max-w-[1240px]">
          {/* The mosaic wants a few tiles to read as a mosaic; with only one
              or two it would leave dead space, so those get their own tidy
              layouts and the bento kicks in from three. */}
          {items.length === 0 ? (
            <p className="py-16 text-center text-[15px] text-black/45">
              Our latest achievements will appear here shortly.
            </p>
          ) : items.length === 1 ? (
            <div className="grid auto-rows-[480px] grid-cols-1 sm:auto-rows-[700px]">
              <AwardCard a={items[0]} featured />
            </div>
          ) : items.length === 2 ? (
            <div className="grid auto-rows-[380px] grid-cols-1 gap-4 sm:grid-cols-2">
              {items.map((a) => (
                <AwardCard key={a.id} a={a} featured />
              ))}
            </div>
          ) : (
            <div className="grid auto-rows-[218px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((a, i) => (
                <AwardCard
                  key={a.id}
                  a={a}
                  featured={i === 0}
                  spanClass={
                    i === 0 ? "row-span-2 sm:col-span-2 lg:col-span-2" : ""
                  }
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
