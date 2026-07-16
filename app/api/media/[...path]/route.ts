import type { NextRequest } from "next/server";
import { STRAPI_URL } from "@/lib/strapi";

/* Streams Strapi's /uploads media through this origin.
   The CMS droplet only speaks http, so pointing the browser straight at it
   from an https page would be blocked as mixed content. Proxying here also
   keeps CMS media off Vercel's image optimiser (and its quota).
   Strapi content-hashes upload filenames, so they cache indefinitely. */
export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/media/[...path]">,
) {
  const { path } = await ctx.params;
  if (!path?.length || path.some((seg) => seg === "." || seg === "..")) {
    return new Response("Not found", { status: 404 });
  }

  const upstream = `${STRAPI_URL}/uploads/${path
    .map(encodeURIComponent)
    .join("/")}`;

  let res: Response;
  try {
    res = await fetch(upstream, { cache: "no-store" });
  } catch {
    return new Response("Upstream unavailable", { status: 502 });
  }
  if (!res.ok || !res.body) return new Response("Not found", { status: 404 });

  return new Response(res.body, {
    headers: {
      "Content-Type":
        res.headers.get("content-type") ?? "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
    },
  });
}
