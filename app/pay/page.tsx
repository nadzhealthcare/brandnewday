import type { Metadata } from "next";
import { createRef, readRef } from "@/lib/paylink";
import { getPurchasablePackage } from "@/lib/packages";
import { tabbyReady } from "@/lib/tabby";
import PayClient from "./PayClient";

export const metadata: Metadata = {
  title: "Secure Payment, NADZ Healthcare",
  robots: { index: false },
};

export default async function PayPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; plan?: string }>;
}) {
  const { ref, plan } = await searchParams;

  // A ?plan= link carries only the slug, the amount is resolved from our own
  // catalogue and signed here, so the price can't be edited in the URL.
  const pkg = getPurchasablePackage(plan);
  const token = pkg
    ? createRef({
        a: pkg.price,
        c: "AED",
        d: `${pkg.title}, annual subscription`,
      })
    : (ref ?? "");

  const data = readRef(token);

  return (
    <PayClient
      refToken={token}
      data={data}
      stripeReady={!!process.env.STRIPE_SECRET_KEY}
      tabbyReady={tabbyReady()}
    />
  );
}
