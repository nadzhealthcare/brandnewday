import type { Metadata } from "next";
import { readRef } from "@/lib/paylink";
import { tabbyReady } from "@/lib/tabby";
import PayClient from "./PayClient";

export const metadata: Metadata = {
  title: "Secure Payment — NADZ Healthcare",
  robots: { index: false },
};

export default async function PayPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  const data = ref ? readRef(ref) : null;
  return (
    <PayClient
      refToken={ref ?? ""}
      data={data}
      stripeReady={!!process.env.STRIPE_SECRET_KEY}
      tabbyReady={tabbyReady()}
    />
  );
}
