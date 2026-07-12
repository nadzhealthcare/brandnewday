import { getStripe } from "@/lib/stripe";
import { readRef } from "@/lib/paylink";

// Create a Stripe Checkout Session for a signed pay-link.
// Apple Pay / Google Pay appear automatically in Stripe-hosted Checkout.
export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return Response.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const ref: string | undefined = body?.ref;
  const data = ref ? readRef(ref) : null;
  if (!data) {
    return Response.json({ error: "Invalid or expired link" }, { status: 400 });
  }

  const site = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: (data.c || "AED").toLowerCase(),
            unit_amount: Math.round(data.a * 100), // AED → fils
            product_data: {
              name: data.d || "NADZ Healthcare",
            },
          },
        },
      ],
      success_url: `${site}/pay/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/pay/cancel?ref=${encodeURIComponent(ref!)}`,
      metadata: {
        name: data.n ?? "",
        phone: data.p ?? "",
        description: data.d ?? "",
      },
    });
    return Response.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
