// WhatsApp booking / enquiry number (digits only, international format)
export const WA_NUMBER = "971521597336";

/* Toll-free hotline. The site advertises "800 4 NADZ / 800 4 6239" in the
   top bar and across the service pages, so the dialable form is the digits
   of that. Kept here because the floating call button previously carried its
   own copy and had drifted to a placeholder. */
export const PHONE_DISPLAY = "800 4 NADZ";
export const PHONE_TEL = "80046239";

/** NADZ Google Business Profile, where the reviews live. */
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?kgmid=/g/11yct14w52";

/** Trim to whole words near `max` characters and mark it as cut. Google
    reviews run long, and the cards only have room for a couple of lines. */
export function truncate(text: string, max: number): string {
  const t = text.trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const at = cut.lastIndexOf(" ");
  return `${(at > max * 0.6 ? cut.slice(0, at) : cut).replace(/[.,!?;:]+$/, "")}…`;
}

import { readReferral } from "./referral";

/** Build a wa.me deep link with a pre-filled message.

    Appends the stored referral slug, if any, so the team can see where a
    booking came from in the first message. Done here rather than in each
    caller so no handoff can quietly miss it. */
export function waLink(text: string): string {
  const ref = readReferral();
  const body = ref ? `${text}\n\nReferral: ${ref}` : text;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(body)}`;
}
