"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureReferral } from "@/lib/referral";

/* Parks ?ref= on arrival. Re-runs on route changes so a referral link that
   points anywhere on the site is picked up, not just the landing page.

   Reads window.location directly rather than useSearchParams, which would
   force this subtree into a Suspense boundary for no benefit. */
export default function ReferralCapture() {
  const pathname = usePathname();
  useEffect(() => {
    captureReferral();
  }, [pathname]);
  return null;
}
