import type { MetadataRoute } from "next";
import { ALL_PATHS } from "@/lib/page-content";
import { getArticles, getPressReleases } from "@/lib/strapi";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

/* Static routes that aren't in the nav tree. /pay and /book-style private or
   transactional routes are deliberately left out. */
const EXTRA_PATHS = ["/", "/cookies", "/privacy", "/terms"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries = [...new Set([...EXTRA_PATHS, ...ALL_PATHS])]
    .filter((p) => !p.startsWith("/pay"))
    .map((path) => ({
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
    }));

  // CMS content. If Strapi is unreachable the helpers return empty, so the
  // sitemap degrades to the static routes rather than failing the build.
  const [articles, press] = await Promise.all([
    getArticles(1, 200).catch(() => ({ items: [] })),
    getPressReleases().catch(() => []),
  ]);

  const articleEntries = (articles.items ?? []).map((a) => ({
    url: `${SITE_URL}/media/blogs/${a.slug}`,
    lastModified: a.publishedAt ? new Date(a.publishedAt) : now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const pressEntries = (press ?? [])
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${SITE_URL}/media/press-releases/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));

  return [...staticEntries, ...articleEntries, ...pressEntries];
}
