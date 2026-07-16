import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (a stray lockfile lives in $HOME).
  turbopack: {
    root: path.join(__dirname),
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
