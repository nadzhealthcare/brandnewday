"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { CONSENT_KEY, CONSENT_EVENT, readConsent } from "@/lib/consent";

// Google Consent Mode v2 hook — a no-op until a gtag/GA tag is added later.
function applyConsent(granted: boolean) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
  if (typeof gtag === "function") {
    const v = granted ? "granted" : "denied";
    gtag("consent", "update", {
      ad_storage: v,
      analytics_storage: v,
      ad_user_data: v,
      ad_personalization: v,
    });
  }
}

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const v = readConsent();
    if (!v) setShow(true);
    else applyConsent(v === "accepted");
  }, []);

  const choose = (accepted: boolean) => {
    try {
      localStorage.setItem(CONSENT_KEY, accepted ? "accepted" : "rejected");
    } catch {
      /* ignore */
    }
    applyConsent(accepted);
    // Let consent-gated scripts (Clarity) react immediately.
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] flex justify-center px-3 pb-3 sm:justify-start sm:px-5 sm:pb-5">
      <div className="pointer-events-auto w-full max-w-[440px] rounded-[22px] bg-white p-5 shadow-[0_30px_70px_-24px_rgba(43,26,23,0.55)] ring-1 ring-black/10">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[color:var(--maroon)]/8 text-[color:var(--maroon)]">
            <Cookie className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[15px] font-semibold text-[#241417]">
              We use cookies
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-black/55">
              We use essential cookies to run this site and, with your consent,
              analytics and advertising cookies to improve it. See our{" "}
              <Link
                href="/cookies"
                className="font-medium text-[color:var(--maroon)] underline"
              >
                Cookie Policy
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-2.5">
          <button
            type="button"
            onClick={() => choose(false)}
            className="flex-1 rounded-full border border-black/15 px-4 py-2.5 text-[13.5px] font-semibold text-[#241417] transition-colors hover:bg-black/5"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={() => choose(true)}
            className="flex-1 rounded-full bg-[color:var(--maroon)] px-4 py-2.5 text-[13.5px] font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
