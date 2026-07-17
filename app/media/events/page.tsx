import type { Metadata } from "next";
import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { getEvents, mediaUrl } from "@/lib/strapi";

export const revalidate = 300;

export const metadata: Metadata = {
  alternates: { canonical: "/media/events" },
  title: "Events & Highlights, NADZ Healthcare",
  description: "Where NADZ Healthcare has been and what's next.",
};

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

export default async function EventsPage() {
  const items = await getEvents();

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
            <span className="mx-1.5 text-[color:var(--gold-light)]">/</span> Events
          </p>
          <SectionTitle
            as="h1"
            className="mt-4 text-[2.2rem] leading-[1.05] text-white sm:text-[3.2rem]"
          >
            Events &amp; Highlights
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-2xl text-[15.5px] leading-relaxed text-white/65">
            Where NADZ shows up across Dubai, community moments, wellness events
            and health talks.
          </p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1180px]">
          {items.length === 0 ? (
            <p className="py-16 text-center text-[15px] text-black/45">
              Upcoming events will appear here, stay tuned.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((e) => {
                const img = mediaUrl(e.image, "medium");
                const when = formatDate(e.eventDate);
                return (
                  <article
                    key={e.id}
                    className="group flex flex-col overflow-hidden rounded-[22px] bg-white ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_56px_-30px_rgba(43,26,23,0.5)] hover:ring-[color:var(--gold)]/30"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f0eeea]">
                      {img ? (
                        <Image
                          src={img}
                          alt={e.image?.alternativeText || e.title}
                          fill
                          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 380px"
                          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="grid h-full place-items-center text-[color:var(--maroon)]/30">
                          <CalendarDays className="h-10 w-10" />
                        </div>
                      )}
                      {e.category && (
                        <span className="absolute left-3 top-3 rounded-full bg-black/45 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm">
                          {e.category}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="text-[16px] font-semibold leading-snug text-[#241417]">
                        {e.title}
                      </h2>
                      {e.excerpt && (
                        <p className="mt-2 line-clamp-3 text-[13.5px] leading-relaxed text-black/55">
                          {e.excerpt}
                        </p>
                      )}
                      <div className="mt-4 flex flex-col gap-1.5 border-t border-black/5 pt-3 text-[12.5px] text-black/50">
                        {when && (
                          <span className="flex items-center gap-1.5">
                            <CalendarDays className="h-3.5 w-3.5 text-[color:var(--maroon)]" />
                            {when}
                          </span>
                        )}
                        {e.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-[color:var(--maroon)]" />
                            {e.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
