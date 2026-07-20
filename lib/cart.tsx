"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getItem, type CatalogItem } from "./catalog";

/* Cart store.

   Deliberately stores only { sku, qty }. Prices are never persisted or sent
   to the server, the checkout route re-reads every price from the catalogue,
   so editing localStorage can change what you see but not what you're
   charged. Totals here are for display only. */

const KEY = "nadz-cart-v1";

export type CartLine = { sku: string; qty: number };
export type CartEntry = { item: CatalogItem; qty: number };

type CartApi = {
  lines: CartLine[];
  entries: CartEntry[];
  count: number;
  total: number;
  add: (sku: string, qty?: number) => void;
  setQty: (sku: string, qty: number) => void;
  remove: (sku: string) => void;
  clear: () => void;
  ready: boolean;
};

const Ctx = createContext<CartApi | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  // Guards against writing the empty initial state over a stored cart before
  // the first read lands, and lets the badge stay blank until hydrated.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setLines(
            parsed
              .filter(
                (l): l is CartLine =>
                  !!l &&
                  typeof l.sku === "string" &&
                  Number.isFinite(l.qty) &&
                  l.qty > 0,
              )
              // Drop anything no longer in the catalogue.
              .filter((l) => !!getItem(l.sku))
              .map((l) => ({ sku: l.sku, qty: Math.min(99, Math.floor(l.qty)) })),
          );
        }
      }
    } catch {
      /* private mode or corrupt payload, start empty */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* storage full or blocked, cart just won't persist */
    }
  }, [lines, ready]);

  const add = useCallback((sku: string, qty = 1) => {
    if (!getItem(sku)) return;
    setLines((prev) => {
      const at = prev.findIndex((l) => l.sku === sku);
      if (at === -1) return [...prev, { sku, qty: Math.min(99, qty) }];
      const next = [...prev];
      next[at] = { sku, qty: Math.min(99, next[at].qty + qty) };
      return next;
    });
  }, []);

  const setQty = useCallback((sku: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.sku !== sku)
        : prev.map((l) =>
            l.sku === sku ? { sku, qty: Math.min(99, Math.floor(qty)) } : l,
          ),
    );
  }, []);

  const remove = useCallback(
    (sku: string) => setLines((prev) => prev.filter((l) => l.sku !== sku)),
    [],
  );

  const clear = useCallback(() => setLines([]), []);

  const entries = useMemo(
    () =>
      lines
        .map((l) => {
          const item = getItem(l.sku);
          return item ? { item, qty: l.qty } : null;
        })
        .filter((e): e is CartEntry => e !== null),
    [lines],
  );

  const value = useMemo<CartApi>(
    () => ({
      lines,
      entries,
      count: entries.reduce((n, e) => n + e.qty, 0),
      total: entries.reduce((n, e) => n + e.item.price * e.qty, 0),
      add,
      setQty,
      remove,
      clear,
      ready,
    }),
    [lines, entries, add, setQty, remove, clear, ready],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart(): CartApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
