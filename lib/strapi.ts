/* Strapi v5 content API client. Content is fetched server-side, so the plain
   http:// origin is fine (no browser mixed-content). Images are served through
   next/image, which optimises them and re-serves over https. */

export const STRAPI_URL =
  process.env.STRAPI_URL || "http://161.35.236.196:1337";

type MediaFormat = { url: string; width: number; height: number };
type StrapiMedia = {
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: Record<string, MediaFormat> | null;
} | null;

type MediaSize = "thumbnail" | "small" | "medium" | "large";

export type Article = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  authorName?: string | null;
  date?: string | null;
  readTime?: string | null;
  category?: string | null;
  publishedAt?: string | null;
  image?: StrapiMedia;
  content?: { intro?: string | null } | null;
};

type StrapiList<T> = { data: T[]; meta: { pagination: { pageCount: number; total: number; page: number } } };

async function strapiFetch<T>(
  path: string,
  revalidate = 300,
): Promise<T | null> {
  const token = process.env.STRAPI_API_TOKEN;
  try {
    const res = await fetch(`${STRAPI_URL}${path}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      next: { revalidate },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/** URL for a Strapi media object, preferring a generated format so we don't
    ship the multi-megapixel original. Strapi's `url` is host-relative, and the
    CMS only speaks http, so uploads go through /api/media on this origin to
    reach the browser over https (see app/api/media/[...path]/route.ts). */
export function mediaUrl(
  media: StrapiMedia | undefined,
  size?: MediaSize,
): string | null {
  if (!media?.url) return null;
  let path = media.url;
  if (size && media.formats?.[size]) path = media.formats[size].url;
  if (path.startsWith("http")) return path;
  const uploads = "/uploads/";
  return path.startsWith(uploads)
    ? `/api/media/${path.slice(uploads.length)}`
    : `${STRAPI_URL}${path}`;
}

const LIST_FIELDS =
  "fields[0]=title&fields[1]=slug&fields[2]=excerpt&fields[3]=authorName&fields[4]=date&fields[5]=readTime&fields[6]=category&fields[7]=publishedAt";

/* Editors occasionally save a slug with a stray leading/trailing space. That
   space is invisible in the CMS but breaks the page: the URL never carries it,
   so an exact slug match finds nothing and the route 404s. Trimming the slug
   the moment an article enters the app keeps every link, canonical and lookup
   clean regardless of what was typed. */
function normalizeArticle(a: Article): Article {
  return a.slug === a.slug?.trim() ? a : { ...a, slug: a.slug.trim() };
}

export async function getArticles(
  page = 1,
  pageSize = 24,
): Promise<{ items: Article[]; pageCount: number }> {
  const json = await strapiFetch<StrapiList<Article>>(
    `/api/articles?${LIST_FIELDS}&populate[image]=true&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
  );
  return {
    items: (json?.data ?? []).map(normalizeArticle),
    pageCount: json?.meta.pagination.pageCount ?? 1,
  };
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const clean = slug.trim();
  const suffix = "&populate[image]=true&populate[content][populate]=*";

  // Fast path: exact match on a clean slug.
  const exact = await strapiFetch<StrapiList<Article>>(
    `/api/articles?filters[slug][$eq]=${encodeURIComponent(clean)}${suffix}`,
  );
  if (exact?.data?.[0]) return normalizeArticle(exact.data[0]);

  // Fallback: the stored slug carries stray whitespace, so an exact match
  // missed it. A contains-match then a precise trim-compare finds it without
  // false positives (a different slug that merely contains this one won't
  // trim-equal it).
  const loose = await strapiFetch<StrapiList<Article>>(
    `/api/articles?filters[slug][$containsi]=${encodeURIComponent(clean)}${suffix}`,
  );
  const hit = loose?.data?.find((a) => a.slug?.trim() === clean);
  return hit ? normalizeArticle(hit) : null;
}

/* ---------------- Testimonials ---------------- */
export type Testimonial = {
  id: number;
  patientName: string;
  headline?: string | null;
  review: string;
  rating?: number | null;
  serviceLabel?: string | null;
  featured?: boolean | null;
};

export async function getTestimonials(): Promise<Testimonial[]> {
  const json = await strapiFetch<StrapiList<Testimonial>>(
    `/api/testimonials?sort=sortOrder:asc&pagination[pageSize]=50`,
  );
  return (json?.data ?? []).filter((t) => t.review && t.patientName);
}

/* ---------------- Press Releases ---------------- */
export type PressRelease = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  source?: string | null;
  sourceUrl?: string | null;
  readTime?: string | null;
  category?: string | null;
  date?: string | null;
  image?: StrapiMedia;
  content?: { intro?: string | null } | null;
};

export async function getPressReleases(): Promise<PressRelease[]> {
  const json = await strapiFetch<StrapiList<PressRelease>>(
    `/api/press-releases?populate[image]=true&sort=publishedAt:desc&pagination[pageSize]=50`,
  );
  return json?.data ?? [];
}

export async function getPressReleaseBySlug(
  slug: string,
): Promise<PressRelease | null> {
  const json = await strapiFetch<StrapiList<PressRelease>>(
    `/api/press-releases?filters[slug][$eq]=${encodeURIComponent(
      slug,
    )}&populate[image]=true&populate[content][populate]=*`,
  );
  return json?.data?.[0] ?? null;
}

/* ---------------- Events ---------------- */
export type EventItem = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  eventDate?: string | null;
  eventEndDate?: string | null;
  location?: string | null;
  category?: string | null;
  image?: StrapiMedia;
};

export async function getEvents(): Promise<EventItem[]> {
  // the events type has no media field, so no populate
  const json = await strapiFetch<StrapiList<EventItem>>(
    `/api/events?sort=eventDate:desc&pagination[pageSize]=50`,
  );
  return json?.data ?? [];
}

/* ---------------- Awards & Achievements (single type) ---------------- */
export type AwardItem = {
  id: number;
  title: string;
  body?: string | null;
  image?: StrapiMedia;
};
type SinglePage<T> = {
  data:
    | ({
        pageTitle?: string | null;
        pageSubtitle?: string | null;
        pillText?: string | null;
      } & T)
    | null;
};

export async function getAwards(): Promise<{
  pageTitle?: string | null;
  pageSubtitle?: string | null;
  pillText?: string | null;
  items: AwardItem[];
}> {
  const json = await strapiFetch<SinglePage<{ items?: AwardItem[] }>>(
    `/api/awards-achievement?populate[items][populate]=*`,
  );
  const d = json?.data;
  return {
    pageTitle: d?.pageTitle,
    pageSubtitle: d?.pageSubtitle,
    pillText: d?.pillText,
    items: d?.items ?? [],
  };
}

/* ---------------- Interviews & Podcasts (single type) ---------------- */
export type InterviewItem = {
  id: number;
  title: string;
  body?: string | null;
  youtubeUrl?: string | null;
};

export async function getInterviews(): Promise<{
  pageTitle?: string | null;
  pageSubtitle?: string | null;
  pillText?: string | null;
  items: InterviewItem[];
}> {
  const json = await strapiFetch<SinglePage<{ items?: InterviewItem[] }>>(
    `/api/interview-podcast?populate[items][populate]=*`,
  );
  const d = json?.data;
  return {
    pageTitle: d?.pageTitle,
    pageSubtitle: d?.pageSubtitle,
    pillText: d?.pillText,
    items: d?.items ?? [],
  };
}

/** Extract a YouTube video id from any common URL form. */
export function youtubeId(url?: string | null): string | null {
  if (!url) return null;
  const m =
    url.match(/[?&]v=([^&]+)/) ||
    url.match(/youtu\.be\/([^?&]+)/) ||
    url.match(/embed\/([^?&]+)/);
  return m ? m[1] : null;
}
