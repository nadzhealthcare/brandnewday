"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X, ArrowRight } from "lucide-react";
import { waLink } from "@/lib/contact";

/* ------------------------------------------------------------------ *
 * Latest-offer popup.
 *  - Opens shortly after the page first loads.
 *  - Re-opens after 30s of user inactivity (if currently closed).
 *  - The cover image is a single editable path, swap it (or wire it to
 *    a backend) without touching the rest of the component.
 * ------------------------------------------------------------------ */

// Replace this with the current promo artwork (or feed it from a backend later).
const OFFER_IMAGE = "/assets/offer.jpg";
const OFFER_ALT = "Exclusive limited-time IV therapy discount";
const OFFER_WA_MESSAGE =
  "Hi NADZ, I'd like to claim your latest offer.";

const INACTIVITY_MS = 30_000;
const FIRST_OPEN_MS = 1200;

export default function OfferPopup() {
  const pathname = usePathname();
  const suppressed =
    pathname.startsWith("/pay") ||
    ["/cookies", "/privacy", "/terms"].includes(pathname);
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  openRef.current = open;

  // open once on first load (not on payment pages)
  useEffect(() => {
    if (suppressed) return;
    const t = setTimeout(() => setOpen(true), FIRST_OPEN_MS);
    return () => clearTimeout(t);
  }, [suppressed]);

  // re-open after 30s of inactivity
  useEffect(() => {
    if (suppressed) return;
    let timer: ReturnType<typeof setTimeout>;
    const reset = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!openRef.current) setOpen(true);
      }, INACTIVITY_MS);
    };
    const events: (keyof WindowEventMap)[] = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
    ];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();
    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, [suppressed]);

  // lock body scroll + close on Escape while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const claim = () => {
    window.open(waLink(OFFER_WA_MESSAGE), "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  if (suppressed) return null;

  return (
    <div
      aria-hidden={!open}
      onClick={() => setOpen(false)}
      className={`fixed inset-0 z-[95] grid place-items-center p-4 transition-opacity duration-300 ${
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Latest offer"
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-[380px] overflow-hidden rounded-[24px] bg-[#2a0e12] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)] ring-1 ring-[color:var(--gold)]/25 transition-all duration-300 ${
          open ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close offer"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/45 text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-black/70"
        >
          <X className="h-5 w-5" />
        </button>

        {/* cover image, the whole poster claims the offer on WhatsApp */}
        <button
          type="button"
          onClick={claim}
          className="block w-full cursor-pointer"
          aria-label="Claim this offer on WhatsApp"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={OFFER_IMAGE}
            alt={OFFER_ALT}
            className="block h-auto w-full"
          />
        </button>

        {/* gold claim button, overlaid on the poster's bottom band */}
        <button
          type="button"
          onClick={claim}
          className="group absolute bottom-[2.5%] left-1/2 z-10 flex w-[72%] max-w-[280px] -translate-x-1/2 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#b8892f] via-[#f4dd97] to-[#b8892f] px-6 py-3 text-[15px] font-bold uppercase tracking-wide text-[#3a1518] shadow-[0_14px_30px_-10px_rgba(0,0,0,0.7)] ring-1 ring-[#f4dd97]/60 transition-transform hover:-translate-y-0.5"
        >
          Claim Now
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
