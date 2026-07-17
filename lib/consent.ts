/* Cookie-consent state, shared by the banner and anything that loads on
   consent (analytics, session recording). Kept in one place so the storage
   key and the change signal can't drift apart. */

export const CONSENT_KEY = "nadz-cookie-consent";

/** Fired on the window when the visitor makes (or changes) a choice, so
    consent-gated scripts can start without waiting for a reload. */
export const CONSENT_EVENT = "nadz-consent-change";

export type Consent = "accepted" | "rejected" | null;

export function readConsent(): Consent {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

/** Non-essential cookies (analytics, recording, ads) are only allowed on an
    explicit opt-in, never by default. */
export function analyticsAllowed(): boolean {
  return readConsent() === "accepted";
}
