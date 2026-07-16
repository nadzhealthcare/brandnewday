import type { MetadataRoute } from "next";
import { SITE_URL, ALLOW_INDEX } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Until launch, keep crawlers off entirely so this site can't compete with
  // the live domain for the same content.
  if (!ALLOW_INDEX) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Checkout and pay-link pages are private and per-customer.
        disallow: ["/api/", "/pay", "/pay/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
