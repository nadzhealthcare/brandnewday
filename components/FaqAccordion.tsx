"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { Faq } from "@/lib/faq";

export default function FaqAccordion({
  items,
  title,
}: {
  items: Faq[];
  title?: string;
}) {
  const [open, setOpen] = useState<number>(0);
  if (!items.length) return null;

  return (
    <div className="mt-12">
      {title && (
        <h2 className="mb-5 text-[22px] font-semibold text-[color:var(--maroon)]">
          {title}
        </h2>
      )}
      <div className="rounded-[26px] bg-white p-2 shadow-[0_24px_50px_-30px_rgba(43,26,23,0.35)] ring-1 ring-black/5 sm:p-4">
        {items.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className="border-b border-black/[0.07] px-4 last:border-0 sm:px-6"
            >
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-5 py-6 text-left"
              >
                <span className="text-[16px] font-semibold text-[color:var(--maroon)] sm:text-[17px]">
                  {f.q}
                </span>
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white transition-colors ${
                    isOpen
                      ? "bg-[color:var(--maroon)]"
                      : "bg-[color:var(--maroon)]/90"
                  }`}
                >
                  {isOpen ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-2xl pb-6 pr-10 text-[14.5px] leading-relaxed text-black/60">
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
