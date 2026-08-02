import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import { getEventBySlug, mediaUrl } from "@/lib/strapi";
import ShareButtons from "@/components/ShareButtons";
import EventGallery from "@/components/EventGallery";

export const revalidate = 300;

function formatDate(d?: string | null): string | null {
  if (!d) return null;
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = await getEventBySlug(slug);
  if (!e) return { title: "Event, NADZ Healthcare" };
  const cover = mediaUrl(e.coverImage);
  return {
    alternates: { canonical: `/media/events/${slug}` },
    title: `${e.title}, NADZ Healthcare`,
    description: e.excerpt || undefined,
    openGraph: {
      title: e.title,
      description: e.excerpt || undefined,
      images: cover ? [cover] : undefined,
      type: "article",
    },
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const e = await getEventBySlug(slug);
  if (!e) notFound();

  const img = mediaUrl(e.coverImage, "large");
  const when = formatDate(e.eventDate);
  const whenEnd = formatDate(e.eventEndDate);
  const gallery = (e.gallery ?? [])
    .map((g) => {
      const thumb = mediaUrl(g, "medium");
      return thumb
        ? {
            thumb,
            full: mediaUrl(g) || thumb, // original for the lightbox
            alt: g.alternativeText || e.title,
          }
        : null;
    })
    .filter((g): g is { thumb: string; full: string; alt: string } => g !== null);
  // The write-up, or the excerpt as a graceful fallback until a body is added.
  const body = e.content?.intro?.trim() || e.excerpt?.trim() || "";

  return (
    <div className="bg-white">
      {/* header band */}
      <section
        className="relative overflow-hidden px-4 pb-10 pt-28 sm:px-6 sm:pt-36"
        style={{ backgroundImage: "linear-gradient(135deg,#3d1622,#611f2e)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgba(160,26,38,0.35),transparent_60%)]" />
        <div className="relative mx-auto max-w-[820px]">
          <Link
            href="/media/events"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> All events
          </Link>
          {e.category && (
            <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.2em] text-[color:var(--gold-light)]">
              {e.category}
            </p>
          )}
          <h1 className="mt-3 text-[1.9rem] font-semibold leading-[1.15] text-white sm:text-[2.6rem]">
            {e.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[13.5px] text-white/60">
            {when && (
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-[color:var(--gold-light)]" />
                {when}
                {whenEnd && whenEnd !== when ? ` – ${whenEnd}` : ""}
              </span>
            )}
            {e.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[color:var(--gold-light)]" />
                {e.location}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* cover image */}
      {img && (
        <div className="px-4 sm:px-6">
          <div className="relative mx-auto -mt-6 aspect-[16/9] w-full max-w-[900px] overflow-hidden rounded-[22px] shadow-[0_30px_60px_-30px_rgba(43,26,23,0.5)] ring-1 ring-black/5">
            <Image
              src={img}
              alt={e.coverImage?.alternativeText || e.title}
              fill
              sizes="(max-width:900px) 100vw, 900px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* body */}
      <article className="mx-auto max-w-[720px] px-4 py-12 sm:px-6 sm:py-16">
        {body && (
          <div className="article-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {body}
            </ReactMarkdown>
          </div>
        )}

        {/* photo gallery with tap-to-enlarge lightbox */}
        {gallery.length > 0 && (
          <div className="mt-12">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-black/40">
              Gallery
            </p>
            <EventGallery images={gallery} />
          </div>
        )}

        <ShareButtons title={e.title} />

        <div className="mt-12 border-t border-black/5 pt-8 text-center">
          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-full bg-[color:var(--maroon)] px-7 py-3.5 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Book a Home Visit
          </Link>
        </div>
      </article>
    </div>
  );
}
