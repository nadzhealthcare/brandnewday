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

/** Absolute URL for a Strapi media object, preferring a generated format so we
    don't ship the multi-megapixel original. `url` is host-relative. */
export function mediaUrl(
  media: StrapiMedia | undefined,
  size?: MediaSize,
): string | null {
  if (!media?.url) return null;
  let path = media.url;
  if (size && media.formats?.[size]) path = media.formats[size].url;
  return path.startsWith("http") ? path : `${STRAPI_URL}${path}`;
}

const LIST_FIELDS =
  "fields[0]=title&fields[1]=slug&fields[2]=excerpt&fields[3]=authorName&fields[4]=date&fields[5]=readTime&fields[6]=category&fields[7]=publishedAt";

export async function getArticles(
  page = 1,
  pageSize = 24,
): Promise<{ items: Article[]; pageCount: number }> {
  const json = await strapiFetch<StrapiList<Article>>(
    `/api/articles?${LIST_FIELDS}&populate[image]=true&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
  );
  return { items: json?.data ?? [], pageCount: json?.meta.pagination.pageCount ?? 1 };
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const json = await strapiFetch<StrapiList<Article>>(
    `/api/articles?filters[slug][$eq]=${encodeURIComponent(
      slug,
    )}&populate[image]=true&populate[content][populate]=*`,
  );
  return json?.data?.[0] ?? null;
}
