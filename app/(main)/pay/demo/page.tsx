import type { Metadata } from "next";
import { createRef, readRef } from "@/lib/paylink";
import { tabbyReady } from "@/lib/tabby";
import PayClient from "../PayClient";

export const metadata: Metadata = {
  title: "Sample Checkout, NADZ Healthcare",
  robots: { index: false, follow: false },
};

// Always-render fresh (never cache the generated ref/token).
export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ *
 * Stable sample checkout used for payment-provider onboarding reviews
 * (e.g. Tabby go-live). It self-generates a valid signed pay-link for a
 * sample AED order, so Card and Tabby both work end-to-end without anyone
 * needing to mint a link first. No real customer data, noindex.
 *
 * The Tabby buyer form is prefilled with Tabby's SANDBOX success test
 * buyer, so a reviewer (or you) can complete the flow in one click:
 *   phone +971500000001 / email otp.success@tabby.ai / OTP 8888
 * ------------------------------------------------------------------ */
export default function PayDemoPage() {
  const ref = createRef({
    a: 300,
    c: "AED",
    d: "Home doctor visit (sample order)",
    n: "Test Patient",
    p: "+971500000001",
  });
  const data = readRef(ref);

  return (
    <PayClient
      refToken={ref}
      data={data}
      stripeReady={!!process.env.STRIPE_SECRET_KEY}
      tabbyReady={tabbyReady()}
      initialEmail="otp.success@tabby.ai"
      tabbyDefaultOpen
    />
  );
}
