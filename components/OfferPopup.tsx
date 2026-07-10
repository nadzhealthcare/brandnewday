"use client";

import { useEffect, useRef, useState } from "react";
import { X, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/contact";

/* ------------------------------------------------------------------ *
 * Latest-offer popup.
 *  - Opens shortly after the page first loads.
 *  - Re-opens after 30s of user inactivity (if currently closed).
 *  - The cover image is a single editable path — swap it (or wire it to
 *    a backend) without touching the rest of the component.
 * ------------------------------------------------------------------ */

// Replace this with the current promo artwork (or feed it from a backend later).
const OFFER_IMAGE = "/assets/offer.png";
const OFFER_ALT = "Exclusive limited-time IV therapy discount";
const OFFER_WA_MESSAGE =
  "Hi NADZ, I'd like to claim your latest offer.";

const INACTIVITY_MS = 30_000;
const FIRST_OPEN_MS = 1200;

export default function OfferPopup() {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  openRef.current = open;

  // open once on first load
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), FIRST_OPEN_MS);
    return () => clearTimeout(t);
  }, []);

  // re-open after 30s of inactivity
  useEffect(() => {
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
  }, []);

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

        {/* cover image */}
        <button
          type="button"
          onClick={claim}
          className="block w-full cursor-pointer"
          aria-label="Claim this offer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={OFFER_IMAGE}
            alt={OFFER_ALT}
            className="aspect-[4/5] w-full object-cover"
          />
        </button>

        {/* claim button */}
        <div className="bg-[#2a0e12] p-4">
          <button
            type="button"
            onClick={claim}
            className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#c9a24a] via-[#e8cf86] to-[#c9a24a] px-6 py-3.5 text-[15px] font-bold uppercase tracking-wide text-[#3a1518] transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle className="h-4 w-4" />
            Claim Now
          </button>
        </div>
      </div>
    </div>
  );
}
