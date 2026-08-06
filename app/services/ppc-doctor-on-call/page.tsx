import type { Metadata, Viewport } from "next";
import DoctorOnCallPpc from "@/components/landing/DoctorOnCallPpc";

/* Doctor on Call — PPC landing page (Google Ads).

   A self-contained, single-purpose page for paid traffic. It renders outside
   the (main) route group, so it carries none of the site chrome (navbar,
   footer, floating buttons, popups). Every action stays on the page — in-page
   anchors, tel: and WhatsApp — with no links off to the rest of the site.

   noindex so it never competes with the real /services/doctor-on-call page in
   organic search; follow so any future internal links still pass equity. */

export const metadata: Metadata = {
  title: "Doctor on Call in Dubai | Home Doctor Visits, 24/7 | NADZ Healthcare",
  description:
    "Book a DHA-licensed doctor to your home, office or hotel in Dubai — 24/7, often within about 30 minutes, for a flat AED 249 consultation. Examined and treated in person. Trusted by 10,000+ patients, rated 5.0 on Google.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/services/ppc-doctor-on-call" },
  openGraph: {
    title:
      "Doctor on Call — A DHA-Licensed Doctor at Your Door in About 30 Minutes",
    description:
      "See a DHA-licensed doctor at home, office or hotel in Dubai — 24/7, often within about 30 minutes, for a flat AED 249 consultation. Trusted by 10,000+ patients.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#4A1C20",
};

export default function DoctorOnCallLandingPage() {
  return <DoctorOnCallPpc />;
}
