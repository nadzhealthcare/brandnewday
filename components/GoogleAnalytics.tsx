"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_EVENT, analyticsAllowed } from "@/lib/consent";

/* GA4.

   Same rule as Clarity: analytics cookies are non-essential under the UAE
   PDPL, so the tag is only injected once the visitor opts in, and it starts
   the moment they accept rather than on the next page load. Rejecting means
   it never loads at all.

   Consent Mode v2 defaults are still declared denied before config, even
   though we gate the tag as well. It costs nothing, and it means the
   gtag("consent","update") call already wired into the cookie banner has
   something to update instead of being a silent no-op.

   The ID is an env var so the same build can point at a test property, and so
   nothing loads at all if it's unset. */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GoogleAnalytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(analyticsAllowed());
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  if (!GA_ID || !allowed) return null;

  return (
    <>
      <Script
        id="ga4-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});
gtag('consent', 'update', {
  ad_storage: 'granted',
  analytics_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted'
});
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
