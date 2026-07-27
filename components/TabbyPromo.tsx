"use client";

import { useEffect, useRef } from "react";

/* Tabby on-site messaging ("Pay in 4 interest-free payments of AED X · learn
   more"). Tabby requires this snippet wherever a payable price is shown, and
   it's part of their go-live checklist.

   The widget is a functional part of the payment option, not analytics, so it
   loads without the consent gate — same footing as the Tabby checkout itself.
   The script is fetched once and shared; each instance renders into its own
   element and is re-initialised when the price changes (Tabby has no update
   API, so we clear and rebuild). It renders nothing until the public key and
   merchant code are configured, and Tabby itself hides the message when the
   amount falls outside its eligible range. */

const PUBLIC_KEY = process.env.NEXT_PUBLIC_TABBY_PUBLIC_KEY;
const MERCHANT = process.env.NEXT_PUBLIC_TABBY_MERCHANT_CODE;
const SCRIPT = "https://checkout.tabby.ai/tabby-promo.js";

type TabbyPromoCtor = new (opts: Record<string, unknown>) => unknown;
declare global {
  interface Window {
    TabbyPromo?: TabbyPromoCtor;
  }
}

let loader: Promise<void> | null = null;
function loadScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.TabbyPromo) return Promise.resolve();
  if (loader) return loader;
  loader = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SCRIPT;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("tabby-promo failed to load"));
    document.head.appendChild(s);
  });
  return loader;
}

export default function TabbyPromo({
  price,
  source = "product",
  lang = "en",
  className = "",
}: {
  price: number;
  source?: "product" | "cart";
  lang?: "en" | "ar";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !PUBLIC_KEY || !MERCHANT || !(price > 0)) return;

    let cancelled = false;
    // A stable-per-instance id, assigned on the client only so there's no SSR
    // hydration mismatch on the attribute.
    if (!el.id) el.id = `tabby-promo-${Math.random().toString(36).slice(2)}`;

    loadScript()
      .then(() => {
        if (cancelled || !window.TabbyPromo || !ref.current) return;
        ref.current.innerHTML = ""; // clear a previous render before re-init
        new window.TabbyPromo({
          selector: `#${el.id}`,
          currency: "AED",
          price: price.toFixed(2),
          lang,
          source,
          publicKey: PUBLIC_KEY,
          merchantCode: MERCHANT,
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [price, source, lang]);

  if (!PUBLIC_KEY || !MERCHANT) return null;
  return <div ref={ref} className={className} />;
}
