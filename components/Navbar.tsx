"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NAV, type NavItem, type SubItem } from "@/lib/nav-data";
import Logo from "./Logo";
import MobileNav from "./MobileNav";

function MegaCard({ item }: { item: SubItem }) {
  const Icon = item.icon;
  return (
    <div className="rounded-xl p-3 transition-colors hover:bg-[color:var(--cream)]">
      <Link href={item.href} className="flex items-start gap-3">
        {Icon && (
          <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[color:var(--maroon)]/8 text-[color:var(--maroon)] ring-1 ring-[color:var(--maroon)]/10">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <span className="min-w-0">
          <span className="block text-[15px] font-semibold text-[color:var(--maroon)]">
            {item.label}
          </span>
          {item.description && (
            <span className="mt-0.5 block text-[12.5px] leading-snug text-black/55">
              {item.description}
            </span>
          )}
        </span>
      </Link>

      {item.children && (
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 pl-[52px]">
          {item.children.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="text-[12.5px] font-medium text-[color:var(--gold-dark)] transition-colors hover:text-[color:var(--maroon)] hover:underline"
            >
              {c.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MegaPanel({ item }: { item: NavItem }) {
  const cols = item.columns ?? 1;
  const gridCols =
    cols === 3
      ? "md:grid-cols-3"
      : cols === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-1";
  const width =
    cols === 3 ? "w-[840px]" : cols === 2 ? "w-[620px]" : "w-[380px]";

  return (
    <div
      className={`animate-menu-in ${width} max-w-[92vw] overflow-hidden rounded-2xl border border-black/5 bg-white p-3 shadow-[0_24px_60px_-15px_rgba(74,28,32,0.28)]`}
    >
      <div className={`grid grid-cols-1 gap-1 ${gridCols}`}>
        {item.items?.map((sub) => (
          <MegaCard key={sub.href} item={sub} />
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    /* Deadzone before the bar reacts. At 4px, the small oscillation that comes
       with momentum and iOS rubber-band settling reads as a direction change
       and flickers it in and out. */
    const THRESHOLD = 10;
    const SHOW_ABOVE = 160; // always visible near the top

    const onScroll = () => {
      const max = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      // Rubber-band overscroll reports a scrollY outside the document (negative
      // at the top, past max at the bottom). Clamping keeps that bounce from
      // registering as a scroll direction.
      const y = Math.min(Math.max(window.scrollY, 0), max);
      setScrolled(y > 40);

      const delta = y - lastY.current;
      // Inside the deadzone, leave lastY alone: jitter then measures against a
      // fixed point instead of creeping, while a slow deliberate scroll still
      // accumulates past the threshold and flips it.
      if (Math.abs(delta) < THRESHOLD) return;

      setHidden(y > SHOW_ABOVE && delta > 0);
      lastY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // stay visible while a menu is open or the bar is hovered
  const offscreen = hidden && openMenu === null && !hovered;

  // glass over the hero at the very top, solid white once scrolling
  const solid = hovered || openMenu !== null || scrolled;

  const light = !solid; // white text/logo when floating as glass over the hero
  const linkText = light ? "text-white" : "text-[color:var(--maroon)]";
  const hoverBg = light ? "hover:bg-white/15" : "hover:bg-[color:var(--cream)]";
  const activeBg = light ? "bg-white/15" : "bg-[color:var(--cream)]";

  return (
    <header
      className={`sticky top-0 z-50 transition-transform duration-300 ease-out ${
        offscreen ? "-translate-y-[130%]" : "translate-y-0"
      }`}
    >
      <div className="mx-auto max-w-[1500px] px-4 pt-4 sm:px-6 sm:pt-5 lg:px-10 lg:pt-6">
        {/* Floating glass bar with margin around it */}
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setHovered(false);
            setOpenMenu(null);
          }}
          className={`relative flex h-16 items-center justify-between rounded-2xl pl-4 pr-3 transition-colors duration-300 sm:pl-5 sm:pr-4 ${
            solid
              ? "border border-black/5 bg-white/95 shadow-[0_12px_34px_-14px_rgba(74,28,32,0.4)] backdrop-blur"
              : /* Solid on mobile so there's no glass-to-white swap at the top,
                   which is what read as a flicker. Glass stays on desktop. */
                "border border-black/5 bg-white/95 shadow-[0_12px_34px_-14px_rgba(74,28,32,0.4)] backdrop-blur lg:border-white/15 lg:bg-white/10 lg:shadow-[0_12px_34px_-18px_rgba(0,0,0,0.6)] lg:backdrop-blur-md"
          }`}
        >
          <Logo light={light} />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item, i) => {
            if (item.isButton) {
              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="btn-gold ml-2 rounded-full px-6 py-2.5 text-[14px] font-semibold text-[color:var(--maroon)] shadow-[0_8px_20px_-8px_rgba(169,127,46,0.9)] ring-1 ring-white/40 transition-transform hover:-translate-y-0.5"
                >
                  {item.label}
                </Link>
              );
            }

            const hasMenu = !!item.items?.length;

            if (!hasMenu) {
              return (
                <Link
                  key={item.label}
                  href={item.href ?? "#"}
                  onMouseEnter={() => setOpenMenu(null)}
                  className={`rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${linkText} ${hoverBg}`}
                >
                  {item.label}
                </Link>
              );
            }

            const isOpen = openMenu === i;
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(i)}
              >
                <button
                  className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${linkText} ${
                    isOpen ? activeBg : hoverBg
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                    <MegaPanel item={item} />
                  </div>
                )}
              </div>
            );
          })}
        </nav>

          {/* Mobile trigger */}
          {/* Mobile bar is always solid, so the trigger is always the dark mark. */}
          <MobileNav triggerLight={false} />
        </div>
      </div>
    </header>
  );
}

