import type { Metadata, Viewport } from "next";
import PhysiotherapyPpc from "@/components/landing/PhysiotherapyPpc";

/* Physiotherapy — PPC landing page (Google Ads).

   A self-contained, single-purpose page for paid traffic. It renders outside
   the (main) route group, so it carries none of the site chrome (navbar,
   footer, floating buttons, popups). Every action stays on the page — in-page
   anchors, tel: and WhatsApp — with no links off to the rest of the site.

   noindex so it never competes with the real physiotherapy service page in
   organic search; follow so any future internal links still pass equity. */

export const metadata: Metadata = {
  title:
    "Physiotherapy at Home, Office or Hotel in Dubai & Abu Dhabi | DHA-Licensed Physios - NADZ Healthcare",
  description:
    "Book a DHA-licensed physiotherapist to your home, office or hotel across the UAE. Expert physiotherapy for back pain, post-surgery rehab, sports injury, stroke & elderly care. We reach you in 30 minutes. Trusted by 10,000+ patients, rated 5.0 on Google.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/services/ppc-physiotherapy" },
  openGraph: {
    title:
      "Physiotherapy at Home, Office or Hotel — DHA-Licensed Physios in 30 Minutes | NADZ Healthcare",
    description:
      "Recover faster without the commute. Expert physiotherapy at home, office or hotel across Dubai, Abu Dhabi & the UAE. Same-day visits, affordable care, trusted by 10,000+ patients.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#4A1C20",
};

export default function PhysiotherapyLandingPage() {
  return <PhysiotherapyPpc />;
}
