"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV, type SubItem } from "@/lib/nav-data";
import Logo from "./Logo";

function AccordionRow({
  item,
  onNavigate,
}: {
  item: SubItem;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = !!item.children?.length;
  const Icon = item.icon;

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        className="flex items-center gap-3 py-2.5 text-[15px] text-[color:var(--maroon)]"
      >
        {Icon && <Icon className="h-4 w-4 text-[color:var(--gold-dark)]" />}
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link
          href={item.href}
          onClick={onNavigate}
          className="flex items-center gap-3 py-2.5 text-[15px] font-medium text-[color:var(--maroon)]"
        >
          {Icon && <Icon className="h-4 w-4 text-[color:var(--gold-dark)]" />}
          {item.label}
        </Link>
        <button
          aria-label={`Toggle ${item.label}`}
          onClick={() => setOpen((v) => !v)}
          className="grid h-8 w-8 place-items-center text-[color:var(--maroon)]"
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      {open && (
        <div className="ml-3 border-l border-[color:var(--gold)]/40 pl-3">
          {item.children!.map((c) => (
            <AccordionRow key={c.href} item={c} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MobileNav({
  triggerLight = false,
}: {
  triggerLight?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const overlay = (
    <div className="fixed left-0 top-0 z-[60] flex h-[100dvh] w-screen flex-col bg-white">
          <div className="flex h-20 shrink-0 items-center justify-between border-b border-black/5 px-4">
            <Logo />
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="grid h-11 w-11 place-items-center rounded-full text-[color:var(--maroon)] hover:bg-[color:var(--cream)]"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {NAV.filter((n) => !n.isButton).map((item) => {
              const hasMenu = !!item.items?.length;
              if (!hasMenu) {
                return (
                  <Link
                    key={item.label}
                    href={item.href ?? "#"}
                    onClick={() => setOpen(false)}
                    className="block border-b border-black/5 py-4 text-[17px] font-semibold text-[color:var(--maroon)]"
                  >
                    {item.label}
                  </Link>
                );
              }
              const isExp = expanded === item.label;
              return (
                <div key={item.label} className="border-b border-black/5">
                  <button
                    onClick={() => setExpanded(isExp ? null : item.label)}
                    className="flex w-full items-center justify-between py-4 text-[17px] font-semibold text-[color:var(--maroon)]"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        isExp ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isExp && (
                    <div className="pb-3">
                      {item.items!.map((sub) => (
                        <AccordionRow
                          key={sub.href}
                          item={sub}
                          onNavigate={() => setOpen(false)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="shrink-0 border-t border-black/5 p-5">
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="btn-gold block rounded-full py-3.5 text-center text-[16px] font-semibold text-[color:var(--maroon)] shadow-[0_8px_20px_-8px_rgba(169,127,46,0.9)]"
            >
              Book an appointment
            </Link>
          </div>
    </div>
  );

  return (
    <div className="lg:hidden">
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className={`grid h-11 w-11 place-items-center rounded-full transition-colors ${
          triggerLight
            ? "text-white hover:bg-white/15"
            : "text-[color:var(--maroon)] hover:bg-[color:var(--cream)]"
        }`}
      >
        <Menu className="h-6 w-6" />
      </button>

      {mounted && open && createPortal(overlay, document.body)}
    </div>
  );
}
