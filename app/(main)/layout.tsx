import ConsoleFilter from "@/components/ConsoleFilter";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingWidgets from "@/components/FloatingWidgets";
import StickyBooking from "@/components/StickyBooking";
import OfferPopup from "@/components/OfferPopup";
import CookieConsent from "@/components/CookieConsent";
import Clarity from "@/components/Clarity";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ReferralCapture from "@/components/ReferralCapture";
import ConversionTracking from "@/components/ConversionTracking";
import FazaaBanner from "@/components/FazaaBanner";
import Preloader from "@/components/Preloader";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart";

/* The main site: everything with the full NADZ chrome — navbar (per page),
   footer, floating buttons, popups, cookie consent and analytics.

   This lives in a route group so PPC landing pages (app/services/ppc-*, which
   sit OUTSIDE this group) inherit only the bare root layout and none of this.
   Keeping the chrome in a layout rather than a client-side gate means a
   landing page is bare in the server HTML too — no flash of chrome before
   hydration, and no analytics or cookie banner mounting at all. */

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <Preloader />
      <ConsoleFilter />
      <SmoothScroll />
      {children}
      <Footer />
      <StickyBooking />
      <OfferPopup />
      <CookieConsent />
      <Clarity />
      <GoogleAnalytics />
      <ReferralCapture />
      <ConversionTracking />
      <FazaaBanner />
      <FloatingWidgets />
    </CartProvider>
  );
}
