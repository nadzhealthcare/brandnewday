import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { getArticles, mediaUrl } from "@/lib/strapi";

type Post = {
  cat: string;
  read: string;
  title: string;
  excerpt: string;
  img: string;
  href: string;
  cta: string;
  tint: string; // badge classes for light cards
  dot: string; // badge dot colour for image cards
  abstract?: boolean; // use an animated maroon background instead of the image
};

/* per-slot styling + fallback content (used if the CMS returns fewer than 4) */
const SLOTS: Post[] = [
  {
    cat: "Prevention",
    read: "4 min read",
    title: "5 Signs Your Elderly Parent May Need Home Nursing Care",
    excerpt:
      "From missed medications to frequent falls, here are the everyday signals that it's time to bring professional care into the home.",
    img: "/assets/img1.png",
    href: "/media/blogs",
    cta: "Read Article",
    tint: "bg-[color:var(--maroon)]/8 text-[color:var(--maroon)]",
    dot: "bg-[color:var(--gold-light)]",
  },
  {
    cat: "Recovery",
    read: "6 min read",
    title: "How At-Home IV Drips Speed Up Recovery and Rehydration",
    excerpt:
      "Whether it's dehydration, fatigue or recovering from illness, a doctor-supervised IV drip at home can restore your energy fast, without the wait of a clinic visit.",
    img: "/assets/featured-placeholder.webp",
    href: "/media/blogs",
    cta: "Read Article",
    tint: "bg-[#0d9488]/10 text-[#0d9488]",
    dot: "bg-[#0d9488]",
  },
  {
    cat: "Wellness",
    read: "5 min read",
    title: "Longevity Medicine: Building a Healthier 2025 From Home",
    excerpt:
      "Preventive screening, tailored nutrition and regular check-ups are reshaping how families in Dubai age well. Here's how NADZ brings longevity care to your doorstep.",
    img: "/assets/img3.png",
    href: "/media/blogs",
    cta: "Read Article",
    tint: "bg-[color:var(--gold-dark)]/12 text-[color:var(--gold-dark)]",
    dot: "bg-[color:var(--gold-dark)]",
  },
  {
    cat: "Vaccination",
    read: "3 min read",
    title: "Home Vaccination: A Safe, Convenient Option for Your Family",
    excerpt:
      "Skip the queues. From flu shots to childhood immunisations, our nurses deliver certified vaccinations in the comfort and safety of your home.",
    img: "/assets/img4.png",
    href: "/media/blogs",
    cta: "Read Article",
    tint: "bg-[#2563eb]/10 text-[#2563eb]",
    dot: "bg-[#5b9dff]",
    abstract: true, // slot 4 keeps the animated maroon background
  },
];

function ReadButton({ post, onDark }: { post: Post; onDark?: boolean }) {
  return (
    <Link
      href={post.href}
      className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-[color:var(--maroon)] transition-all ${
        onDark
          ? "bg-white hover:-translate-y-0.5"
          : "border border-black/10 bg-white hover:bg-[color:var(--cream)]"
      }`}
    >
      <ArrowUpRight className="h-4 w-4" />
      {post.cta}
    </Link>
  );
}

/* full-bleed card, either a photo or an animated maroon abstract background */
function ImageCard({ post }: { post: Post }) {
  return (
    <article className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[24px] shadow-[0_18px_44px_-26px_rgba(20,10,16,0.6)]">
      {post.abstract ? (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(135deg, #331828 0%, #6C2A37 100%)",
          }}
        >
          <span
            className="hiw-blob"
            style={{
              width: "60%",
              height: "75%",
              left: "-12%",
              top: "-18%",
              background: "radial-gradient(circle, #7d2d40, transparent 70%)",
              animation: "hiwFloat1 15s ease-in-out infinite",
            }}
          />
          <span
            className="hiw-blob"
            style={{
              width: "65%",
              height: "80%",
              right: "-16%",
              bottom: "-22%",
              background: "radial-gradient(circle, #521f2c, transparent 70%)",
              animation: "hiwFloat2 17s ease-in-out infinite",
            }}
          />
          <span
            className="hiw-blob"
            style={{
              width: "48%",
              height: "58%",
              left: "28%",
              top: "18%",
              background:
                "radial-gradient(circle, rgba(214,168,90,0.22), transparent 70%)",
              animation: "hiwFloat3 13s ease-in-out infinite",
            }}
          />
        </div>
      ) : (
        <>
          <Image
            src={post.img}
            alt={post.title}
            fill
            sizes="(max-width:1024px) 100vw, 420px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/5" />
        </>
      )}
      <div className="relative flex flex-col gap-3 p-6 sm:p-7">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur">
          <span className={`h-1.5 w-1.5 rounded-full ${post.dot}`} />
          {post.cat}
          {post.read && ` · ${post.read}`}
        </span>
        <h3 className="max-w-[22ch] text-[22px] font-semibold leading-snug text-white sm:text-[24px]">
          {post.title}
        </h3>
        <p className="max-w-[42ch] text-[14px] leading-relaxed text-white/75">
          {post.excerpt}
        </p>
        <div className="mt-1">
          <ReadButton post={post} onDark />
        </div>
      </div>
    </article>
  );
}

/* horizontal light card (image left, content right) */
function HorizontalCard({ post }: { post: Post }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[24px] bg-white p-3 shadow-[0_12px_30px_-22px_rgba(20,10,16,0.5)] ring-1 ring-black/5 sm:flex-row">
      <div className="relative h-44 w-full overflow-hidden rounded-[18px] sm:h-auto sm:w-[42%] sm:shrink-0 sm:self-stretch sm:min-h-[240px]">
        <Image
          src={post.img}
          alt={post.title}
          fill
          sizes="(max-width:640px) 100vw, 42vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-3 p-3 pt-4 sm:pl-6 sm:pt-3">
        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-md px-2.5 py-1 text-[12px] font-semibold ${post.tint}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {post.cat}
          {post.read && ` · ${post.read}`}
        </span>
        <h3 className="text-[21px] font-semibold leading-snug text-[#171717] sm:text-[23px]">
          {post.title}
        </h3>
        <p className="line-clamp-3 text-[14px] leading-relaxed text-black/55">
          {post.excerpt}
        </p>
        <div className="pt-2">
          <ReadButton post={post} />
        </div>
      </div>
    </article>
  );
}

export default async function BlogSection() {
  const { items } = await getArticles(1, 4);

  // map the 4 most recent CMS articles into the 4 layout slots (keeping each
  // slot's styling); fall back to the preset content if the CMS is short.
  const posts: Post[] = SLOTS.map((slot, i) => {
    const a = items[i];
    if (!a) return slot;
    return {
      ...slot,
      cat: a.category || slot.cat,
      read: a.readTime || "",
      title: a.title,
      excerpt: a.excerpt || "",
      img: mediaUrl(a.image, "medium") || slot.img,
      href: `/media/blogs/${a.slug}`,
    };
  });

  return (
    <section className="bg-[#f7f8fa] px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <SectionTitle className="text-[1.9rem] text-[color:var(--maroon)] sm:text-[2.4rem]">
              Health Insights & Articles
            </SectionTitle>
            <p className="mt-3 max-w-lg text-[15px] text-black/55">
              Practical guidance from our doctors on caring for your family at
              home.
            </p>
          </div>
          <Link
            href="/media/blogs"
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--maroon)]/20 bg-white px-5 py-2.5 text-[14px] font-semibold text-[color:var(--maroon)] transition-colors hover:bg-[color:var(--cream)]"
          >
            View All Articles
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* row 1: image card + horizontal card */}
        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1.55fr]">
          <ImageCard post={posts[0]} />
          <HorizontalCard post={posts[1]} />
        </div>
        {/* row 2: horizontal card + image card */}
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.55fr_1fr]">
          <HorizontalCard post={posts[2]} />
          <ImageCard post={posts[3]} />
        </div>
      </div>
    </section>
  );
}
