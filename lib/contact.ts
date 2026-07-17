// WhatsApp booking / enquiry number (digits only, international format)
export const WA_NUMBER = "971521597336";

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

/** Build a wa.me deep link with a pre-filled message. */
export function waLink(text: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}
