/* Influencer / campaign referral attribution.

   A visitor arriving on ?ref=<slug> has that slug parked in a first-party
   cookie for 30 days, and every WhatsApp handoff from then on carries a
   "Referral: <slug>" line. That matters because most bookings here never
   reach checkout, they leave for WhatsApp, so a coupon code at checkout
   would miss them and under-credit the referrer.

   A cookie rather than localStorage so the same value can be read
   server-side later (e.g. attached to Stripe metadata) without another
   round of plumbing. It holds a short campaign slug and nothing about the
   person. */

export const REF_PARAM = "ref";
const COOKIE = "nadz_ref";
const MAX_AGE_DAYS = 30;

/* Slugs come from a URL, so keep them boring before they're stored or pasted
   into a message: lowercase, short, and nothing that could break out of the
   cookie or the WhatsApp text. */
function clean(raw: string | null): string | null {
  if (!raw) return null;
  const v = raw.trim().toLowerCase().slice(0, 40);
  return /^[a-z0-9][a-z0-9_-]*$/.test(v) ? v : null;
}

/** Read ?ref= off the current URL and park it. Safe to call on every page. */
export function captureReferral(): void {
  if (typeof window === "undefined") return;
  const ref = clean(new URLSearchParams(window.location.search).get(REF_PARAM));
  if (!ref) return; // keep whatever we already had, don't clear it
  try {
    document.cookie = `${COOKIE}=${encodeURIComponent(ref)}; path=/; max-age=${
      MAX_AGE_DAYS * 24 * 60 * 60
    }; SameSite=Lax`;
  } catch {
    /* cookies blocked, attribution just won't stick */
  }
}

/** The stored referral slug, or null. */
export function readReferral(): string | null {
  if (typeof document === "undefined") return null;
  try {
    const hit = document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${COOKIE}=`));
    return hit ? clean(decodeURIComponent(hit.slice(COOKIE.length + 1))) : null;
  } catch {
    return null;
  }
}
