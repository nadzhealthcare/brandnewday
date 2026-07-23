import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { ArrowLeft, Clock } from "lucide-react";
import { getArticleBySlug, mediaUrl } from "@/lib/strapi";
import { extractFaqs } from "@/lib/faq";
import FaqAccordion from "@/components/FaqAccordion";
import ShareButtons from "@/components/ShareButtons";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticleBySlug(slug);
  if (!a) return { title: "Article, NADZ Healthcare" };
  return {
    alternates: { canonical: `/media/blogs/${slug}` },
    /* The CMS seoTitle is used exactly as written. Articles are the one place
       where someone is tuning titles for search, and appending the brand here
       pushed them past the length Google will show while being uneditable from
       the CMS. If a brand suffix is wanted, it belongs in the seoTitle. */
    title: a.seoTitle || a.title,
    description: a.seoDescription || a.excerpt || undefined,
    openGraph: {
      title: a.seoTitle || a.title,
      description: a.seoDescription || a.excerpt || undefined,
      images: mediaUrl(a.image) ? [mediaUrl(a.image) as string] : undefined,
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = await getArticleBySlug(slug);
  if (!a) notFound();

  const img = mediaUrl(a.image, "large");
  const { body, faqs } = extractFaqs(a.content?.intro || "");

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
            href="/media/blogs"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>
          {a.category && (
            <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.2em] text-[color:var(--gold-light)]">
              {a.category}
            </p>
          )}
          <h1 className="mt-3 text-[1.9rem] font-semibold leading-[1.15] text-white sm:text-[2.6rem]">
            {a.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-white/55">
            <span>{a.authorName || "NADZ"}</span>
            {a.date && <span>· {a.date}</span>}
            {a.readTime && (
              <span className="flex items-center gap-1">
                · <Clock className="h-3.5 w-3.5" /> {a.readTime}
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
              alt={a.image?.alternativeText || a.title}
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
        <div className="article-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {body}
          </ReactMarkdown>
        </div>

        <FaqAccordion items={faqs} title="FAQs" />

        <ShareButtons title={a.title} />

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
