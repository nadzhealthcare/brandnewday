import { createRef } from "@/lib/paylink";
import { getItem } from "@/lib/catalog";

/* Turn a cart into a signed pay-link.

   The client sends SKUs and quantities only. Every price is looked up here
   from the catalogue and the total is summed server-side, so a tampered cart
   can misrepresent the basket on screen but never the amount charged. */

const MAX_LINES = 40;
const MAX_QTY = 99;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const lines: unknown = body?.items;

  if (!Array.isArray(lines) || lines.length === 0) {
    return Response.json({ error: "Your cart is empty." }, { status: 400 });
  }
  if (lines.length > MAX_LINES) {
    return Response.json({ error: "Too many items." }, { status: 400 });
  }

  let total = 0;
  let units = 0;
  const titles: string[] = [];

  for (const line of lines) {
    const sku = String((line as { sku?: unknown })?.sku ?? "");
    const rawQty = Number((line as { qty?: unknown })?.qty);
    const item = getItem(sku);
    if (!item) {
      return Response.json(
        { error: `That item is no longer available.` },
        { status: 400 },
      );
    }
    if (!Number.isFinite(rawQty) || rawQty < 1) {
      return Response.json({ error: "Invalid quantity." }, { status: 400 });
    }
    const qty = Math.min(MAX_QTY, Math.floor(rawQty));
    total += item.price * qty;
    units += qty;
    titles.push(qty > 1 ? `${item.title} x${qty}` : item.title);
  }

  if (total <= 0) {
    return Response.json({ error: "Nothing payable in this cart." }, { status: 400 });
  }

  // Keep the description readable on the checkout and in the provider's
  // dashboard rather than dumping forty titles into it.
  const description =
    titles.length <= 2
      ? titles.join(" + ")
      : `${titles[0]} + ${units - 1} more item${units - 1 === 1 ? "" : "s"}`;

  // createRef signs happily with an empty key, so check the secret itself.
  // Without it readRef rejects every token and /pay shows "link is invalid".
  if (!process.env.PAYLINK_SECRET) {
    return Response.json(
      { error: "Checkout is not configured." },
      { status: 503 },
    );
  }

  const ref = createRef({ a: total, c: "AED", d: description });
  return Response.json({ ref, total });
}
