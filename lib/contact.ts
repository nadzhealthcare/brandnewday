// WhatsApp booking / enquiry number (digits only, international format)
export const WA_NUMBER = "971521597336";

/** Build a wa.me deep link with a pre-filled message. */
export function waLink(text: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}
