"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CalendarPlus, X } from "lucide-react";
import BookingForm from "./BookingForm";

// routes that should never show the sticky booking bar
const HIDDEN = new Set(["/contact", "/book", "/thank-you"]);

export default function StickyBooking() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false); // mobile sheet

  const hidden = HIDDEN.has(pathname) || pathname.startsWith("/pay");

  useEffect(() => {
    if (hidden) {
      setShow(false);
      return;
    }
    const onScroll = () => {
      // if the page has a *visible* in-hero booking bar (home on sm+), only
      // show the sticky copy once that anchor has scrolled out of view;
      // otherwise (phones, inner pages) reveal it past a scroll threshold
      const anchor = document.querySelector<HTMLElement>("[data-booking-anchor]");
      const anchorVisible = !!anchor && anchor.offsetParent !== null;
      const past = anchorVisible
        ? anchor!.getBoundingClientRect().bottom < 8
        : window.scrollY > 320;
      // never cover the footer
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 140;
      setShow(past && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [hidden, pathname]);

  // close the mobile sheet on route change
  useEffect(() => setOpen(false), [pathname]);

  // lock scroll while the mobile sheet is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (hidden) return null;

  return (
    <>
      {/* ---- Desktop: full sticky bar ---- */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 hidden px-5 pb-3 transition-all duration-300 md:block ${
          show
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-[1180px]">
          <div className="rounded-full bg-[color:var(--cream)]/95 p-1.5 shadow-[0_-10px_40px_-16px_rgba(43,26,23,0.4)] ring-1 ring-black/5 backdrop-blur">
            <BookingForm />
          </div>
        </div>
      </div>

      {/* ---- Mobile: collapsed button (bottom-left) ---- */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Book healthcare"
        className={`fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-full bg-[color:var(--maroon)] py-3 pl-4 pr-5 text-[14px] font-semibold text-white shadow-[0_16px_36px_-14px_rgba(43,26,23,0.8)] ring-1 ring-white/10 transition-all duration-300 md:hidden ${
          show
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[color:var(--gold)] text-[color:var(--maroon)]">
          <CalendarPlus className="h-4 w-4" />
        </span>
        Book
      </button>

      {/* ---- Mobile: booking sheet ---- */}
      <div
        className={`fixed inset-0 z-[90] md:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Book healthcare"
          className={`absolute inset-x-0 bottom-0 rounded-t-[26px] bg-white p-4 pb-6 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.5)] transition-transform duration-300 ${
            open ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--gold-dark)]">
                NADZ Healthcare
              </p>
              <p className="font-title text-[20px] uppercase leading-none text-[color:var(--maroon)]">
                Book a Visit
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="grid h-9 w-9 place-items-center rounded-full bg-black/5 text-[color:var(--maroon)] transition-colors hover:bg-black/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <BookingForm />
        </div>
      </div>
    </>
  );
}
