import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { SITE_URL, ALLOW_INDEX } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Mona Sans variable font, carries both weight (200–900) and width (75–125%) axes,
// so the title can render as "Expanded SemiBold" via font-stretch:125% + weight:600.
const monaSans = localFont({
  src: "./fonts/MonaSans-wdth.woff2",
  variable: "--font-mona",
  display: "swap",
  weight: "200 900",
});

export const metadata: Metadata = {
  // Resolves relative OG/Twitter image paths (CMS media served from /api/media)
  // into the absolute URLs social crawlers require.
  metadataBase: new URL(SITE_URL),
  title: "NADZ Healthcare, Your Family Doctor",
  description:
    "NADZ Healthcare brings the clinic to your home, doctor on call, nursing care, IV drips, labs at home, vaccination, and longevity medicine.",
  icons: {
    icon: [
      { url: "/assets/32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/192.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/assets/180.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  // Protective noindex while the old domain is still live (prevents duplicate
  // content). At cutover, set NEXT_PUBLIC_ALLOW_INDEX=true in Vercel to allow
  // search engines to index this site.
  robots: ALLOW_INDEX ? undefined : { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The preloader's inline script stamps data-nadz-ready on <html> before
    // hydration, which React would otherwise report as a mismatch. This is the
    // documented escape hatch for that pattern (see the Next.js guide on
    // preventing a flash before hydration). It only covers this element's own
    // attributes, children still hydrate normally.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${monaSans.variable} h-full antialiased`}
    >
      {/* The root layout is deliberately bare: chrome (navbar, footer, floating
          buttons, popups, cookie consent, analytics) lives in the (main) route
          group's layout, so PPC landing pages outside that group — e.g.
          /services/ppc-* — render with none of it, in the server HTML too. */}
      <body className="min-h-full flex flex-col bg-white text-[color:var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
