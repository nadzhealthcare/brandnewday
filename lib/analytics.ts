/* GA4 events, with influencer attribution attached.

   Every event carries the parked referral slug, so a campaign is measurable
   across the whole funnel rather than only at checkout: the visits that arrive
   from a link and never book are exactly as attributable as the ones that do.

   Everything no-ops unless GA is actually live (NEXT_PUBLIC_GA_ID is set and
   the visitor accepted analytics cookies), so callers can fire events
   unconditionally without knowing anything about consent. */

import { readReferral } from "./referral";

type Value = string | number | boolean;
type Params = Record<string, Value | undefined>;
type Gtag = (...args: unknown[]) => void;

function gtag(): Gtag | null {
  if (typeof window === "undefined") return null;
  const fn = (window as unknown as { gtag?: Gtag }).gtag;
  return typeof fn === "function" ? fn : null;
}

/** Fire a GA4 event, stamped with the referral slug when there is one. */
export function track(event: string, params: Params = {}): void {
  const g = gtag();
  if (!g) return;
  const payload: Record<string, Value> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) payload[k] = v;
  }
  const ref = readReferral();
  if (ref) payload.referral = ref;
  g("event", event, payload);
}

/** Stamp the referral onto the GA4 user so every later event and session in
    the 30-day cookie window is attributable to that campaign, including the
    ones that never convert. Safe to call repeatedly. */
export function tagReferralUser(): void {
  const g = gtag();
  const ref = readReferral();
  if (!g || !ref) return;
  g("set", "user_properties", { referral: ref });
}
