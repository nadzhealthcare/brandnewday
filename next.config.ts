import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (a stray lockfile lives in $HOME).
  turbopack: {
    root: path.join(__dirname),
  },
  // Strapi CMS media (served over http on the droplet) — next/image optimises
  // and re-serves these over https, avoiding mixed-content in the browser.
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "161.35.236.196",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
