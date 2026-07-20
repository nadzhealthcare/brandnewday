"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { formatAed } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export default function CartClient() {
  const { entries, total, count, setQty, remove, ready } = useCart();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkout = async () => {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/cart/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // SKUs and quantities only, the server prices the basket.
        body: JSON.stringify({
          items: entries.map((e) => ({ sku: e.item.sku, qty: e.qty })),
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ref) {
        setError(data?.error ?? "Could not start checkout. Please try again.");
        setBusy(false);
        return;
      }
      router.push(`/pay?ref=${encodeURIComponent(data.ref)}`);
    } catch {
      setError("Could not reach checkout. Please check your connection.");
      setBusy(false);
    }
  };

  // Nothing is known until localStorage has been read.
  if (!ready) {
    return <div className="min-h-[40vh]" aria-hidden />;
  }

  if (count === 0) {
    return (
      <div className="mx-auto max-w-[560px] px-4 py-20 text-center sm:px-6">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-black/[0.05]">
          <ShoppingBag className="h-6 w-6 text-black/35" />
        </div>
        <h2 className="mt-5 font-title text-[1.6rem] uppercase text-[color:var(--maroon)]">
          Your cart is empty
        </h2>
        <p className="mt-2 text-[15px] text-black/55">
          Browse our packages and services to get started.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[color:var(--maroon)] px-6 py-3 text-[14px] font-semibold text-white"
        >
          Browse services <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-[1180px] gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      {/* lines */}
      <div className="min-w-0 rounded-[24px] bg-white p-4 ring-1 ring-black/[0.07] sm:p-6">
        <h2 className="mb-4 font-title text-[1.4rem] uppercase text-[color:var(--maroon)]">
          Your cart
        </h2>
        <ul className="flex flex-col divide-y divide-black/[0.07]">
          {entries.map(({ item, qty }) => (
            <li
              key={item.sku}
              className="flex min-w-0 flex-wrap items-center gap-4 py-4"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-semibold leading-snug text-[#241417]">
                  {item.title}
                </p>
                <p className="mt-0.5 text-[12.5px] text-black/45">
                  {item.unit} · AED {formatAed(item.price)}
                </p>
              </div>

              <div className="flex items-center gap-1 rounded-full bg-black/[0.04] p-1">
                <button
                  type="button"
                  onClick={() => setQty(item.sku, qty - 1)}
                  aria-label={`Decrease ${item.title}`}
                  className="grid h-7 w-7 place-items-center rounded-full text-black/60 transition-colors hover:bg-white"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span
                  aria-label={`Quantity ${qty}`}
                  className="min-w-6 text-center text-[14px] font-semibold text-[#241417]"
                >
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty(item.sku, qty + 1)}
                  aria-label={`Increase ${item.title}`}
                  className="grid h-7 w-7 place-items-center rounded-full text-black/60 transition-colors hover:bg-white"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <p className="w-[92px] shrink-0 text-right font-title text-[16px] font-semibold text-[color:var(--maroon)]">
                {formatAed(item.price * qty)}
              </p>

              <button
                type="button"
                onClick={() => remove(item.sku)}
                aria-label={`Remove ${item.title}`}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-black/30 transition-colors hover:bg-black/[0.05] hover:text-[color:var(--maroon)]"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* summary */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-[24px] bg-white p-6 ring-1 ring-black/[0.07]">
          <h2 className="font-title text-[1.2rem] uppercase text-[color:var(--maroon)]">
            Order summary
          </h2>
          <dl className="mt-4 flex flex-col gap-2 text-[14px]">
            <div className="flex justify-between">
              <dt className="text-black/55">
                Items ({count})
              </dt>
              <dd className="font-medium text-[#241417]">
                AED {formatAed(total)}
              </dd>
            </div>
          </dl>
          <div className="mt-4 flex items-baseline justify-between border-t border-black/[0.07] pt-4">
            <span className="text-[14px] font-semibold text-[#241417]">
              Total
            </span>
            <span className="font-title text-[26px] font-semibold text-[color:var(--maroon)]">
              <span className="text-[13px] font-medium text-black/40">AED </span>
              {formatAed(total)}
            </span>
          </div>

          {error && (
            <p className="mt-3 text-[13px] text-[color:var(--maroon)]">{error}</p>
          )}

          <button
            type="button"
            onClick={checkout}
            disabled={busy}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--maroon)] px-6 py-3.5 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? "Starting checkout…" : "Proceed to checkout"}
            {!busy && <ArrowRight className="h-4 w-4" />}
          </button>

          <Link
            href="/shop"
            className="mt-3 block text-center text-[13.5px] text-black/50 hover:text-[color:var(--maroon)]"
          >
            Continue shopping
          </Link>

          <p className="mt-4 text-[12px] leading-relaxed text-black/40">
            Prices exclude VAT. Final pricing is confirmed by the care team
            before your visit.
          </p>
        </div>
      </div>
    </div>
  );
}
