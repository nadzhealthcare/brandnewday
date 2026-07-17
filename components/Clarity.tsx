"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_EVENT, analyticsAllowed } from "@/lib/consent";

const CLARITY_ID = "sjyxt4mzg7";

/* Microsoft Clarity. It records sessions (clicks, scrolls, page content), so
   it's a non-essential cookie under the UAE PDPL: the tag is only injected
   once the visitor has opted in, and it starts the moment they accept rather
   than on the next page load. Rejecting means it never loads at all. */
export default function Clarity() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(analyticsAllowed());
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  if (!allowed) return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${CLARITY_ID}");`}
    </Script>
  );
}
