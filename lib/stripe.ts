import Stripe from "stripe";

let cached: Stripe | null = null;

/** Returns a Stripe client, or null if the secret key isn't configured. */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!cached) cached = new Stripe(key);
  return cached;
}
