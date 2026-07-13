import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import ConsoleFilter from "@/components/ConsoleFilter";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingWidgets from "@/components/FloatingWidgets";
import StickyBooking from "@/components/StickyBooking";
import OfferPopup from "@/components/OfferPopup";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Mona Sans variable font — carries both weight (200–900) and width (75–125%) axes,
// so the title can render as "Expanded SemiBold" via font-stretch:125% + weight:600.
const monaSans = localFont({
  src: "./fonts/MonaSans-wdth.woff2",
  variable: "--font-mona",
  display: "swap",
  weight: "200 900",
});

export const metadata: Metadata = {
  title: "NADZ Healthcare — Your Family Doctor",
  description:
    "NADZ Healthcare brings the clinic to your home — doctor on call, nursing care, IV drips, labs at home, vaccination, and longevity medicine.",
  // Protective noindex while the old domain is still live (prevents duplicate
  // content). At cutover, set NEXT_PUBLIC_ALLOW_INDEX=true in Vercel to allow
  // search engines to index this site.
  robots:
    process.env.NEXT_PUBLIC_ALLOW_INDEX === "true"
      ? undefined
      : { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${monaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[color:var(--foreground)]">
        <ConsoleFilter />
        <SmoothScroll />
        {children}
        <Footer />
        <StickyBooking />
        <OfferPopup />
        <FloatingWidgets />
      </body>
    </html>
  );
}
