"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import SectionTitle from "./SectionTitle";

const FAQS: { q: string; a: string }[] = [
  {
    q: "Do you provide care 24/7?",
    a: "Yes — our doctor-on-call and urgent services run around the clock, every day of the week, so help is always one call away.",
  },
  {
    q: "Are your doctors DHA-licensed?",
    a: "Every NADZ clinician is a DHA-licensed doctor or specialist, vetted and supervised to the highest medical standards.",
  },
  {
    q: "How fast can someone reach my home?",
    a: "Across Dubai we typically arrive within 30 minutes, depending on your location and the service requested.",
  },
  {
    q: "Is my medical information confidential?",
    a: "Absolutely. Your health data is encrypted and handled in strict compliance with privacy and healthcare regulations.",
  },
  {
    q: "Which areas do you cover?",
    a: "We currently serve homes across Dubai, and our coverage is expanding steadily across the UAE.",
  },
  {
    q: "How do I book a visit?",
    a: "Call or WhatsApp us, or tap Book an appointment — we'll triage your needs and guide you to the right service.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-[1240px] items-start gap-8 lg:grid-cols-[0.85fr_1.3fr]">
        {/* left */}
        <div>
          <SectionTitle className="max-w-[320px] text-[2rem] leading-[1.05] text-[color:var(--maroon)] sm:text-[2.6rem]">
            Frequently Asked Questions
          </SectionTitle>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-black/55">
            Find clear answers about our care, our services and how we work with
            your family.
          </p>

          <div className="mt-8 rounded-[26px] bg-white p-7 shadow-[0_20px_44px_-28px_rgba(43,26,23,0.35)] ring-1 ring-black/5 sm:mt-10">
            <h3 className="text-[18px] font-semibold text-[color:var(--maroon)]">
              Can&apos;t find your answer?
            </h3>
            <p className="mt-3 max-w-xs text-[14.5px] leading-relaxed text-black/55">
              If you have questions or need more details, feel free to reach out.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-[color:var(--maroon)] px-6 py-3 text-[14px] font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Let&apos;s talk
              <span className="h-2 w-2 rounded-full bg-[color:var(--gold)]" />
            </Link>
          </div>
        </div>

        {/* right: accordion */}
        <div className="rounded-[26px] bg-white p-2 shadow-[0_24px_50px_-30px_rgba(43,26,23,0.35)] ring-1 ring-black/5 sm:p-4">
          {FAQS.map((f, i) => {
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
    </section>
  );
}
