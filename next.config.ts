import type { NextConfig } from "next";
import path from "path";

/* Host of the live domain, derived from the same env the app uses. */
const CANONICAL_HOST = (() => {
  try {
    return new URL(
      (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim(),
    ).host;
  } catch {
    return "";
  }
})();

/* Every URL the old nadzhealthcare.com had indexed, mapped to its home on this
   site. Without these the cutover 404s ~107 live URLs, dropping their search
   rankings and disapproving any Google Ads pointing at them. Blog and press
   slugs are unchanged (same Strapi CMS), so those are wildcard rules. */
const LEGACY_REDIRECTS: [string, string][] = [
  // About
  ["/home-care/who-we-are", "/about/who-we-are"],
  // Our own footer pointed here until recently, so it has link history
  ["/about", "/about/who-we-are"],
  ["/home-care/vision-mission", "/about/mission-vision"],
  ["/home-care/careers", "/about/careers"],
  ["/faq", "/about/faqs"],

  // Doctor on call / nursing
  ["/home-care/doctor-on-call-dubai", "/services/doctor-on-call"],
  ["/home-care/home-nursing-supportive-care", "/services/nursing-care"],
  ["/home-care/elderly-care", "/services/nursing-care/elderly-care"],
  ["/elderly", "/services/nursing-care/elderly-care"],
  ["/home-care/mother-and-baby-care", "/services/nursing-care/mother-baby-care"],
  ["/home-care/babysitting", "/services/nursing-care/babysitting"],
  ["/home-care/palliative-care", "/services/nursing-care/palliative-care"],

  // Physio
  ["/home-care/physiotherapy-at-home", "/services/physiotherapy-at-home"],
  // Predates the sitemap we migrated from, still has inbound links
  ["/physiotherapy-at-home-services", "/services/physiotherapy-at-home"],

  // IV drips
  ["/home-care/iv-drips", "/services/iv-drips"],
  ["/home-care/nad-iv", "/services/iv-drips/iv-nad-plus"],
  ["/home-care/glutathione-iv-therapy", "/services/iv-drips/iv-glutathione-radiance"],
  ["/home-care/iv-vitamin-therapy", "/services/iv-drips/iv-vitamin-therapy"],
  ["/home-care/hangover", "/services/iv-drips/iv-hydration"],

  // Labs at home
  ["/home-care/lab-testing-at-home", "/services/labs-at-home"],
  ["/home-care/genetic-genomics-testing-at-home", "/services/labs-at-home/genetic-epigenetic-testing"],
  ["/home-care/food-intolerance-testing-at-home", "/services/labs-at-home/food-intolerance-allergies"],
  ["/home-care/allergy-testing-at-home", "/services/labs-at-home/food-intolerance-allergies"],
  ["/home-care/nipt-testing-at-home", "/services/labs-at-home/nipt-womens-health"],
  ["/home-care/std-testing-at-home", "/services/labs-at-home/std-sexual-health"],
  ["/home-care/hiv-testing-at-home", "/services/labs-at-home/std-sexual-health"],
  ["/home-care/semen-analysis-at-home", "/services/labs-at-home/std-sexual-health"],
  ["/home-care/pcr-testing-at-home", "/services/labs-at-home/covid-pcr"],

  // Other services
  ["/home-care/vaccinations-at-home", "/services/vaccination-at-home"],
  ["/home-care/medical-tourism", "/services/medical-tourism"],

  // NADZ Exclusive
  ["/home-care/nadz-vital-brain", "/exclusive/nadz-vital-brain"],
  ["/home-care/poc-testing", "/exclusive/poc-testing"],
  ["/wellness/autonomic-control", "/exclusive/nadz-autonomic-control"],
  ["/wellness/sleeping-disorder", "/exclusive/nadz-autonomic-control/sleeping-disorder"],
  ["/wellness/anxiety-stress", "/exclusive/nadz-autonomic-control/anxiety-stress"],
  ["/wellness/chronic-pain", "/exclusive/nadz-autonomic-control/chronic-pain"],
  ["/wellness/erectile-dysfunction", "/exclusive/nadz-autonomic-control/erectile-dysfunction"],
  ["/wellness/overactive-bladder", "/exclusive/nadz-autonomic-control/overreacting-bladder"],

  // Wellness (nad-plus-iv-therapy and peptide-therapy keep their old paths)
  ["/wellness/functional-integrated-medicine", "/wellness/functional-integrative-medicine"],

  // Media & press
  ["/awards-achievement", "/media/awards"],
  ["/events", "/media/events"],
  ["/events/forbes-2nd-edition", "/media/events"],
  ["/interviews-and-podcast", "/media/interviews-podcasts"],
  ["/testimonials", "/about/who-we-are"],

  // Contact & legal
  ["/contact-us", "/contact"],
  ["/cookie-policy", "/cookies"],
  ["/privacy-policy", "/privacy"],
  ["/terms-and-conditions", "/terms"],
];

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (a stray lockfile lives in $HOME).
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      // Once launched, send the Vercel deployment host to the real domain so
      // the two can't compete for the same content. Gated on the launch flag,
      // before cutover this host is the only way to reach the site.
      ...(process.env.NEXT_PUBLIC_ALLOW_INDEX === "true" && CANONICAL_HOST
        ? [
            {
              source: "/:path*",
              has: [{ type: "host" as const, value: "brandnewday-eight.vercel.app" }],
              destination: `https://${CANONICAL_HOST}/:path*`,
              permanent: true,
            },
          ]
        : []),

      // Slugs are identical on both sites, so these carry straight over.
      { source: "/blog", destination: "/media/blogs", permanent: true },
      { source: "/blog/:slug", destination: "/media/blogs/:slug", permanent: true },
      {
        source: "/press-releases",
        destination: "/media/press-releases",
        permanent: true,
      },
      {
        source: "/press-releases/:slug",
        destination: "/media/press-releases/:slug",
        permanent: true,
      },
      ...LEGACY_REDIRECTS.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
  images: {
    // Vercel's image optimiser is quota-capped on this plan and starts serving
    // 402s once it's exhausted, which silently breaks every image. CMS media is
    // already sized by Strapi (we request its `medium`/`large` formats) and is
    // proxied over https by /api/media, so we serve images as-is instead.
    // Flip this back to false if the plan is upgraded.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "161.35.236.196",
        port: "1337",
        pathname: "/uploads/**",
      },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

export default nextConfig;
