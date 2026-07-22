"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureReferral, readReferral } from "@/lib/referral";
import { track, tagReferralUser } from "@/lib/analytics";
import { CONSENT_EVENT } from "@/lib/consent";

/* Parks ?ref= on arrival, and tells GA about it.

   Re-runs on route changes so a referral link that points anywhere on the site
   is picked up, not just the landing page. Reads window.location directly
   rather than useSearchParams, which would force this subtree into a Suspense
   boundary for no benefit.

   The GA side stamps the slug onto the user, so every later event carries the
   campaign, and counts the arrival once per tab. That arrival count is what
   makes a referral that never books measurable: visits attributed to a
   campaign, minus the ones that reached a booking event, is the drop-off.

   GA only loads once the visitor accepts analytics cookies, which usually
   happens after this mounts, so the tagging repeats on the consent signal
   rather than only on mount. */

const VISIT_FLAG = "nadz_ref_visit";

export default function ReferralCapture() {
  const pathname = usePathname();

  useEffect(() => {
    captureReferral();
  }, [pathname]);

  useEffect(() => {
    const report = () => {
      if (!readReferral()) return;
      tagReferralUser();
      // Once per tab, so a referred visitor counts as one arrival no matter
      // how many pages they read.
      try {
        if (sessionStorage.getItem(VISIT_FLAG)) return;
        sessionStorage.setItem(VISIT_FLAG, "1");
      } catch {
        /* storage blocked, count the arrival anyway */
      }
      track("referral_visit", { landing: window.location.pathname });
    };

    report();
    window.addEventListener(CONSENT_EVENT, report);
    return () => window.removeEventListener(CONSENT_EVENT, report);
  }, []);

  return null;
}
