/* Canonical origin for this deployment. Trimmed, the env value has carried a
   stray newline before, which silently corrupts every absolute URL built from
   it (metadata, sitemap, payment redirects). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://brandnewday-eight.vercel.app"
).replace(/\/+$/, "");

/** Search engines are kept out until the domain cutover flips this on. */
export const ALLOW_INDEX = process.env.NEXT_PUBLIC_ALLOW_INDEX === "true";
