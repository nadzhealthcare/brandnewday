"use client";

import Link from "next/link";
import { Check, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import {
  PACKAGE_ITEMS,
  SERVICES,
  SERVICE_GROUPS,
  formatAed,
  type CatalogItem,
} from "@/lib/catalog";
import { useCart } from "@/lib/cart";

function AddButton({ item }: { item: CatalogItem }) {
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const onAdd = () => {
    add(item.sku);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <button
      type="button"
      onClick={onAdd}
      aria-label={`Add ${item.title} to cart`}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
        justAdded
          ? "bg-[#0f7a52] text-white"
          : "bg-[color:var(--maroon)] text-white hover:bg-[color:var(--maroon-deep)]"
      }`}
    >
      {justAdded ? (
        <>
          <Check className="h-4 w-4" /> Added
        </>
      ) : (
        <>
          <Plus className="h-4 w-4" /> Add
        </>
      )}
    </button>
  );
}

function Card({
  item,
  as: Heading = "h3",
}: {
  item: CatalogItem;
  /* Packages sit directly under an h2 so their cards are h3, service cards
     sit under a group h3 so they are h4. Keeps the outline unbroken. */
  as?: "h3" | "h4";
}) {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-[20px] bg-white p-5 ring-1 ring-black/[0.07] transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(43,26,23,0.4)]">
      <div className="min-w-0">
        <Heading className="text-[15.5px] font-semibold leading-snug text-[#241417]">
          {item.href ? (
            <Link href={item.href} className="hover:underline">
              {item.title}
            </Link>
          ) : (
            item.title
          )}
        </Heading>
        <p className="mt-1 text-[12.5px] text-black/45">{item.unit}</p>
      </div>
      <div className="flex items-end justify-between gap-3">
        <p className="min-w-0 leading-none">
          <span className="text-[12px] font-medium text-black/40">AED </span>
          <span className="font-title text-[22px] font-semibold text-[color:var(--maroon)]">
            {formatAed(item.price)}
          </span>
        </p>
        <AddButton item={item} />
      </div>
    </div>
  );
}

export default function ShopClient() {
  const { count } = useCart();

  return (
    <section className="bg-[#faf8f5] px-4 pb-20 pt-10 sm:px-6">
      <div className="mx-auto max-w-[1180px]">
        {/* sticky cart affordance so the basket is always one tap away */}
        <div className="sticky top-24 z-30 mb-8 flex justify-end">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-[color:var(--maroon)] shadow-[0_14px_32px_-16px_rgba(43,26,23,0.5)] ring-1 ring-black/[0.07]"
          >
            <ShoppingBag className="h-4 w-4" />
            View cart
            {count > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[color:var(--maroon)] px-1.5 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
        </div>

        {/* ---- Annual packages, kept as their own group ---- */}
        <div className="mb-4 flex items-baseline gap-3">
          <h2 className="font-title text-[1.5rem] uppercase text-[color:var(--maroon)] sm:text-[1.9rem]">
            Annual Packages
          </h2>
          <span className="text-[13px] text-black/45">
            Billed once, valid 12 months
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PACKAGE_ITEMS.map((p) => (
            <Card key={p.sku} item={p} />
          ))}
        </div>

        {/* ---- Individual services, sub-grouped by category ---- */}
        <div className="mb-4 mt-14 flex items-baseline gap-3">
          <h2 className="font-title text-[1.5rem] uppercase text-[color:var(--maroon)] sm:text-[1.9rem]">
            Individual Services
          </h2>
          <span className="text-[13px] text-black/45">Book as you need</span>
        </div>

        {SERVICE_GROUPS.map((group) => (
          <div key={group} className="mb-10">
            <h3 className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-black/40">
              {group}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.filter((s) => s.group === group).map((s) => (
                <Card key={s.sku} item={s} as="h4" />
              ))}
            </div>
          </div>
        ))}

        <p className="mt-6 text-[12.5px] leading-relaxed text-black/40">
          Prices are indicative and exclude VAT. Final pricing is confirmed by
          the NADZ care team before your visit.
        </p>
      </div>
    </section>
  );
}
