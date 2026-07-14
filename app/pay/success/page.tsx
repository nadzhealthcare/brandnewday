import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { getStripe } from "@/lib/stripe";
import { getTabbyPayment, captureTabbyPayment } from "@/lib/tabby";

export const metadata: Metadata = {
  title: "Payment Received — NADZ Healthcare",
  robots: { index: false },
};

function money(amount: number, currency: string) {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);
}

export default async function PaySuccessPage({
  searchParams,
}: {
  // Stripe returns session_id; Tabby returns payment_id
  searchParams: Promise<{ session_id?: string; payment_id?: string }>;
}) {
  const { session_id, payment_id } = await searchParams;

  let amountLabel: string | null = null;
  let paid = true;

  const stripe = getStripe();
  if (stripe && session_id) {
    try {
      const s = await stripe.checkout.sessions.retrieve(session_id);
      paid = s.payment_status === "paid";
      if (s.amount_total != null) {
        amountLabel = money(s.amount_total / 100, s.currency || "aed");
      }
    } catch {
      /* show generic success */
    }
  } else if (payment_id) {
    // Tabby: confirm the payment is authorized, then capture it
    const p = await getTabbyPayment(payment_id);
    if (p) {
      if (p.status === "AUTHORIZED") {
        await captureTabbyPayment(p.id, p.amount);
        paid = true;
      } else {
        paid = p.status === "CLOSED";
      }
      const amt = Number(p.amount);
      if (Number.isFinite(amt)) amountLabel = money(amt, p.currency || "AED");
    }
  }

  return (
    <main className="grid min-h-[100svh] place-items-center bg-[color:var(--cream)] px-4 py-10">
      <div className="w-full max-w-[440px] overflow-hidden rounded-[26px] bg-white p-8 text-center shadow-[0_30px_70px_-30px_rgba(43,26,23,0.4)] ring-1 ring-black/5">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#2fa060]/12 text-[#2fa060]">
          <CircleCheck className="h-9 w-9" />
        </div>
        <h1 className="mt-6 text-[22px] font-semibold text-[#241417]">
          {paid ? "Payment received" : "Payment processing"}
        </h1>
        {amountLabel && (
          <p className="mt-2 font-title text-[2rem] leading-none text-[color:var(--maroon)]">
            {amountLabel}
          </p>
        )}
        <p className="mx-auto mt-4 max-w-xs text-[14.5px] leading-relaxed text-black/55">
          Thank you. The NADZ team has been notified and will be in touch to
          confirm your visit.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex items-center justify-center rounded-full bg-[color:var(--maroon)] px-7 py-3.5 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          Back to NADZ
        </Link>
      </div>
    </main>
  );
}
