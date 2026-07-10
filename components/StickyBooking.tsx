"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import BookingForm from "./BookingForm";

// routes that should never show the sticky booking bar
const HIDDEN = new Set(["/contact", "/book"]);

export default function StickyBooking() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  const hidden = HIDDEN.has(pathname);

  useEffect(() => {
    if (hidden) {
      setShow(false);
      return;
    }
    const onScroll = () => {
      // if the page has an in-hero booking bar (home), only show the sticky
      // copy once that anchor has scrolled out of view
      const anchor = document.querySelector<HTMLElement>("[data-booking-anchor]");
      const past = anchor
        ? anchor.getBoundingClientRect().bottom < 8
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

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-3 transition-all duration-300 sm:px-5 ${
        show
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="rounded-[22px] bg-[color:var(--cream)]/95 p-1.5 shadow-[0_-10px_40px_-16px_rgba(43,26,23,0.4)] ring-1 ring-black/5 backdrop-blur md:rounded-full">
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
