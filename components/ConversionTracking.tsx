"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/* Booking-intent tracking, in one delegated listener.

   Almost nothing here converts through checkout: the booking CTAs hand off to
   WhatsApp or the phone, so those clicks are the conversion signal. Listening
   at the document catches every one of them, including CTAs added later, and
   spares several dozen components from each remembering to fire an event.

   Capture phase, because some CTAs open the link themselves and would
   otherwise navigate away before a bubbled listener ran. Each event carries
   the referral slug (see lib/analytics), so a campaign's bookings and its
   dead-end visits are counted on the same terms. */

export default function ConversionTracking() {
  useEffect(() => {
    const opts = { capture: true } as const;

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      const where = window.location.pathname;

      if (/wa\.me|api\.whatsapp\.com/i.test(href)) {
        track("whatsapp_click", { location: where });
      } else if (href.startsWith("tel:")) {
        track("call_click", { location: where });
      }
    };

    document.addEventListener("click", onClick, opts);
    return () => document.removeEventListener("click", onClick, opts);
  }, []);

  return null;
}
