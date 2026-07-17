import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getPressReleaseBySlug, mediaUrl } from "@/lib/strapi";
import { extractFaqs } from "@/lib/faq";
import FaqAccordion from "@/components/FaqAccordion";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = await getPressReleaseBySlug(slug);
  if (!a) return { title: "Press Release, NADZ Healthcare" };
  return {
    alternates: { canonical: `/media/press-releases/${slug}` },
    title: `${a.seoTitle || a.title}, NADZ Healthcare`,
    description: a.seoDescription || a.excerpt || undefined,
  };
}

export default async function PressReleasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = await getPressReleaseBySlug(slug);
  if (!a) notFound();

  const img = mediaUrl(a.image, "large");
  const { body, faqs } = extractFaqs(a.content?.intro || "");

  return (
    <div className="bg-white">
      <section
        className="relative overflow-hidden px-4 pb-10 pt-28 sm:px-6 sm:pt-36"
        style={{ backgroundImage: "linear-gradient(135deg,#3d1622,#611f2e)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgba(160,26,38,0.35),transparent_60%)]" />
        <div className="relative mx-auto max-w-[820px]">
          <Link
            href="/media/press-releases"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> All press releases
          </Link>
          {a.source && (
            <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.2em] text-[color:var(--gold-light)]">
              {a.source}
            </p>
          )}
          <h1 className="mt-3 text-[1.8rem] font-semibold leading-[1.15] text-white sm:text-[2.4rem]">
            {a.title}
          </h1>
          {a.date && (
            <p className="mt-4 text-[13px] text-white/55">{a.date}</p>
          )}
        </div>
      </section>

      {img && (
        <div className="px-4 sm:px-6">
          <div className="relative mx-auto -mt-6 aspect-[16/9] w-full max-w-[900px] overflow-hidden rounded-[22px] shadow-[0_30px_60px_-30px_rgba(43,26,23,0.5)] ring-1 ring-black/5">
            <Image
              src={img}
              alt={a.image?.alternativeText || a.title}
              fill
              sizes="(max-width:900px) 100vw, 900px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <article className="mx-auto max-w-[720px] px-4 py-12 sm:px-6 sm:py-16">
        {body && (
          <div className="article-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {body}
            </ReactMarkdown>
          </div>
        )}
        <FaqAccordion items={faqs} title="FAQs" />
        {a.sourceUrl && (
          <a
            href={a.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-[color:var(--maroon)]/25 px-6 py-3 text-[14px] font-semibold text-[color:var(--maroon)] transition-colors hover:bg-[color:var(--maroon)]/5"
          >
            Read the full story <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </article>
    </div>
  );
}
