"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

/* Fazaa availability banner.

   Slides up once the visitor has been idle for 10s, then retires itself after
   4s. Armed once per page: the ref is keyed by pathname, so a route change
   re-arms it but going idle again on the same page does not bring it back.

   Sits above the sticky booking bar and clear of the floating widgets, and
   the wrapper is pointer-events-none so it never swallows a tap meant for
   whatever is underneath. */

const IDLE_MS = 10_000; // quiet time before it appears
const VISIBLE_MS = 4_000; // how long it stays
const SETTLE_MS = 600; // let any modal claim the screen before we commit

/* Mirrors the strip under the hero. Flip `live` as each provider is
   switched on, the "Soon" caption follows from it. */
const MARKS = [
  { src: "/assets/pay-fazaa.svg", alt: "Fazaa", live: true, height: "h-7 sm:h-8" },
  { src: "/assets/pay-tabby.svg", alt: "Tabby", live: false, height: "h-[18px] sm:h-5" },
  { src: "/assets/pay-tamara.svg", alt: "Tamara", live: false, height: "h-3 sm:h-[13px]" },
] as const;

export default function FazaaBanner() {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);
  // Pathname this banner has already used up its one showing on.
  const spentOn = useRef<string | null>(null);

  useEffect(() => {
    if (spentOn.current === pathname) return;

    let idle: ReturnType<typeof setTimeout>;
    let settle: ReturnType<typeof setTimeout>;
    let hide: ReturnType<typeof setTimeout>;

    /* The offer popup is a z-95 modal that also opens on a 10s timer, so the
       two would otherwise fire together and this banner would spend its one
       showing stuck behind the backdrop. If any modal is up, wait rather than
       burn the turn. */
    // A closed modal stays mounted and is hidden by opacity on an ancestor,
    // so its own computed style still reads as visible. Walk up to be sure.
    const onScreen = (node: Element | null) => {
      for (let n = node; n; n = n.parentElement) {
        const cs = getComputedStyle(n);
        if (
          cs.display === "none" ||
          cs.visibility === "hidden" ||
          cs.opacity === "0"
        )
          return false;
      }
      return true;
    };

    const blocked = () =>
      [...document.querySelectorAll('[aria-modal="true"]')].some(onScreen);

    const arm = () => {
      clearTimeout(idle);
      idle = setTimeout(() => {
        if (spentOn.current === pathname) return; // already had its turn
        // The offer popup runs its own ~10s timer, so settle briefly and look
        // again: without this the two race and this banner can win by a hair,
        // then spend its turn hidden behind the backdrop that lands next.
        settle = setTimeout(() => {
          if (spentOn.current === pathname) return;
          if (blocked()) {
            arm(); // a modal owns the screen, wait for the next quiet spell
            return;
          }
          spentOn.current = pathname;
          setShown(true);
          hide = setTimeout(() => setShown(false), VISIBLE_MS);
        }, SETTLE_MS);
      }, IDLE_MS);
    };

    const events: (keyof WindowEventMap)[] = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "wheel",
    ];
    events.forEach((e) => window.addEventListener(e, arm, { passive: true }));
    arm();

    return () => {
      clearTimeout(idle);
      clearTimeout(settle);
      clearTimeout(hide);
      events.forEach((e) => window.removeEventListener(e, arm));
    };
  }, [pathname]);

  return (
    <div
      aria-hidden={!shown}
      /* The bottom ~200px is spoken for on both breakpoints: the floating
         call/WhatsApp pills stack up the right edge, and at the top of the
         homepage the hero's booking bar sits just above the fold. Riding well
         clear of both beats covering an interactive form for four seconds. */
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[85] flex justify-center px-4 pb-[212px]"
    >
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-auto flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full border border-black/[0.07] bg-white/95 py-2.5 pl-3 pr-2.5 shadow-[0_18px_44px_-16px_rgba(43,26,23,0.45)] backdrop-blur transition-all duration-500 ease-out sm:gap-3.5 sm:pl-4 ${
          shown
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <p className="min-w-0 shrink-0 text-[13px] font-semibold leading-tight text-[#241417] sm:text-[14px]">
          Flexible payments
        </p>

        {/* Marks carry the message: Fazaa reads live, the two that can't take
            a payment yet are dimmed and captioned, so the row never implies a
            method that would fail at the till. */}
        <ul className="flex min-w-0 items-center gap-3 sm:gap-4">
          {MARKS.map((m) => (
            <li key={m.alt} className="flex shrink-0 items-center gap-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.src}
                alt={m.alt}
                className={`${m.height} w-auto shrink-0 ${m.live ? "" : "opacity-45"}`}
              />
              {!m.live && (
                <span className="text-[10px] font-semibold uppercase tracking-wide text-black/35">
                  Soon
                </span>
              )}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setShown(false)}
          aria-label="Dismiss"
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-black/35 transition-colors hover:bg-black/[0.06] hover:text-black/60"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
