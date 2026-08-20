import { readRef } from "@/lib/paylink";
import { createTabbyCheckout, tabbyReady } from "@/lib/tabby";

// Create a Tabby hosted-checkout session for a signed pay-link.
export async function POST(request: Request) {
  if (!tabbyReady()) {
    return Response.json({ error: "Tabby not configured" }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const ref: string | undefined = body?.ref;
  const data = ref ? readRef(ref) : null;
  if (!data) {
    return Response.json({ error: "Invalid or expired link" }, { status: 400 });
  }

  // Tabby identifies the buyer by phone and collects the rest in its hosted
  // flow, so phone is the only mandatory field. Name (from the pay-link) and
  // email (when we have it) are forwarded to help pre-scoring but aren't
  // required from the customer.
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const phone = String(body?.phone ?? "").trim();
  if (!phone) {
    return Response.json(
      { error: "A phone number is required for Tabby." },
      { status: 400 },
    );
  }

  const site = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
  const result = await createTabbyCheckout({
    amount: data.a,
    currency: data.c || "AED",
    description: data.d,
    buyer: { name: name || undefined, email: email || undefined, phone },
    refId: `nadz-${Date.now()}`,
    ref: ref!,
    site,
  });

  if (result.ok) return Response.json({ url: result.url });
  if (result.rejected) {
    return Response.json({ rejected: true, reason: result.reason }, { status: 200 });
  }
  return Response.json({ error: result.error }, { status: 502 });
}
