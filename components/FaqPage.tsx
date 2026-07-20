"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Search, LifeBuoy, Phone, ArrowUpRight } from "lucide-react";
import SectionTitle from "./SectionTitle";

type Faq = { q: string; a: string; cat: string };

const CATEGORIES = [
  "General",
  "Booking & Coverage",
  "Doctor & Nursing",
  "IV Drips & Wellness",
  "Labs & Testing",
  "Payments",
] as const;

const FAQS: Faq[] = [
  // General
  {
    cat: "General",
    q: "What is NADZ Healthcare?",
    a: "NADZ is a premium home-healthcare provider in Dubai. We bring doctors, nurses and specialists directly to your home, hotel or office, delivering personalised medical care with clinical precision and the warmth of a family doctor.",
  },
  {
    cat: "General",
    q: "Where do you provide services?",
    a: "We serve patients across Dubai, wherever you are, at home, in your hotel suite or at the office. Our teams travel to you so you never have to sit in a waiting room.",
  },
  {
    cat: "General",
    q: "Are your doctors and nurses certified?",
    a: "Yes. Every NADZ clinician is DHA-certified and works within a rigorous, fully licensed framework. Our licence details are displayed at the foot of every page.",
  },
  {
    cat: "General",
    q: "Is NADZ available 24/7?",
    a: "Yes. Medical assistance is available around the clock, every day of the week. Whatever the hour, a NADZ professional can be dispatched to your doorstep.",
  },
  // Booking & Coverage
  {
    cat: "Booking & Coverage",
    q: "How do I book a visit?",
    a: "Book in just a few minutes, tap “Book a Home Visit”, message us on WhatsApp, or call our 24/7 line. Tell us what you need and we’ll arrange the right clinician for you.",
  },
  {
    cat: "Booking & Coverage",
    q: "How quickly can someone reach me?",
    a: "In most of Dubai we aim to reach you within 30 minutes of confirming your booking, depending on your location and the service requested.",
  },
  {
    cat: "Booking & Coverage",
    q: "Can I book for a family member?",
    a: "Absolutely. You can arrange a visit on behalf of a parent, child or anyone in your care, just share their details and requirements when you book.",
  },
  {
    cat: "Booking & Coverage",
    q: "Can I schedule recurring or ongoing care?",
    a: "Yes. For elderly care, post-operative recovery, mother-and-baby care or palliative support we can set up regular, scheduled visits tailored to the care plan.",
  },
  // Doctor & Nursing
  {
    cat: "Doctor & Nursing",
    q: "What does a Doctor on Call visit include?",
    a: "A DHA-certified doctor comes to you for consultation, examination, diagnosis and treatment, including prescriptions and referrals where needed, with the same standard you’d expect in a clinic.",
  },
  {
    cat: "Doctor & Nursing",
    q: "What nursing services do you offer at home?",
    a: "Our nurses provide elderly care, mother-and-baby care, babysitting, palliative care, wound care, injections, IV administration and post-operative support, all delivered in the comfort of your home.",
  },
  {
    cat: "Doctor & Nursing",
    q: "Do you provide physiotherapy at home?",
    a: "Yes. Our physiotherapists bring rehabilitation, mobility and pain-management sessions to you, with a programme tailored to your recovery goals.",
  },
  // IV Drips & Wellness
  {
    cat: "IV Drips & Wellness",
    q: "Which IV drips do you offer?",
    a: "Our menu includes NAD⁺ therapy, glutathione radiance, vitamin therapy and hydration drips, plus hangover recovery, each administered by a qualified nurse or doctor in your own space.",
  },
  {
    cat: "IV Drips & Wellness",
    q: "Is an IV drip safe to have at home?",
    a: "Yes. Every drip is prescribed and administered by DHA-certified clinicians who assess your suitability first and monitor you throughout the session.",
  },
  {
    cat: "IV Drips & Wellness",
    q: "What wellness and longevity services are available?",
    a: "Beyond IV therapy we offer peptide therapy, functional and integrative medicine, and our NADZ Vital Brain and Autonomic Control programmes, designed around long-term health and performance.",
  },
  // Labs & Testing
  {
    cat: "Labs & Testing",
    q: "Can I get lab tests done at home?",
    a: "Yes. Our team collects samples at your home for a wide range of tests, and results are delivered securely, no lab visit required.",
  },
  {
    cat: "Labs & Testing",
    q: "What kinds of tests can be done at home?",
    a: "We cover genetic and epigenetic testing, food-intolerance and allergy panels, NIPT and women’s health, STD and sexual-health screening, PCR and more, all with home sample collection.",
  },
  {
    cat: "Labs & Testing",
    q: "Do you offer vaccinations at home?",
    a: "Yes. Flu and travel vaccinations can be administered in your home by a certified nurse, at a time that suits you.",
  },
  // Payments
  {
    cat: "Payments",
    q: "How much do your services cost?",
    a: "Pricing depends on the service and care plan. Share what you need when you get in touch and we’ll give you clear, upfront pricing before anything is booked.",
  },
  {
    cat: "Payments",
    q: "Do you accept insurance?",
    a: "For insurance coverage and reimbursement, please contact our care team with your provider details, we’ll advise on what applies to your specific visit.",
  },
  {
    cat: "Payments",
    q: "How do I pay?",
    a: "Payment is simple and handled at the time of your visit. Our team will confirm the accepted methods when you book.",
  },
];

function Glare() {
  return (
    <span className="pointer-events-none absolute inset-y-0 left-[-70%] w-1/2 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent blur-[1px] transition-[left] duration-[800ms] ease-in-out group-hover:left-[140%]" />
  );
}

export default function FaqPage() {
  const [active, setActive] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((f) => {
      const inCat = active === "All" || f.cat === active;
      const inSearch =
        !q ||
        f.q.toLowerCase().includes(q) ||
        f.a.toLowerCase().includes(q);
      return inCat && inSearch;
    });
  }, [active, query]);

  return (
    <div className="bg-white">
      {/* 1, hero band */}
      <section
        className="relative overflow-hidden px-4 pb-16 pt-28 text-center sm:px-6 sm:pb-20 sm:pt-36"
        style={{ backgroundImage: "linear-gradient(135deg,#3d1622,#611f2e)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgba(160,26,38,0.35),transparent_60%)]" />
        <div className="relative">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/50">
            About Us{" "}
            <span className="mx-1.5 text-[color:var(--gold-light)]">/</span> FAQs
          </p>
          <SectionTitle
            as="h1"
            className="mt-4 text-[2.2rem] leading-[1.02] text-white sm:text-[3.4rem]"
          >
            Frequently Asked Questions
          </SectionTitle>
          <p className="mx-auto mt-5 max-w-2xl text-[15.5px] leading-relaxed text-white/65">
            Answers to your questions about NADZ home-healthcare services in
            Dubai, your complete guide to care that comes to you.
          </p>

          {/* search */}
          <div className="mx-auto mt-8 flex max-w-md items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-md transition-colors focus-within:border-[color:var(--gold-light)]/60">
            <Search className="h-5 w-5 text-white/60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              className="w-full bg-transparent text-[15px] text-white placeholder:text-white/45 focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* 2, category chips + accordion */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[860px]">
          {/* chips */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {["All", ...CATEGORIES].map((c) => {
              const on = active === c;
              return (
                <button
                  key={c}
                  onClick={() => {
                    setActive(c);
                    setOpen(null);
                  }}
                  className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-300 ${
                    on
                      ? "bg-[color:var(--maroon)] text-white shadow-[0_10px_24px_-12px_rgba(74,28,32,0.8)]"
                      : "bg-[#f3f1ee] text-black/60 hover:-translate-y-0.5 hover:bg-white hover:text-[color:var(--maroon)] hover:shadow-[0_10px_24px_-14px_rgba(43,26,23,0.6)] hover:ring-1 hover:ring-[color:var(--gold)]/30"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* accordion */}
          <div className="mt-10 space-y-3">
            {filtered.length === 0 && (
              <p className="py-10 text-center text-[15px] text-black/45">
                No questions match your search.
              </p>
            )}
            {filtered.map((f) => {
              const id = f.q;
              const isOpen = open === id;
              return (
                <div
                  key={id}
                  className={`group relative overflow-hidden rounded-[20px] border transition-all duration-500 ${
                    isOpen
                      ? "border-[color:var(--gold)]/40 bg-white shadow-[0_28px_54px_-32px_rgba(43,26,23,0.5)]"
                      : "border-black/5 bg-[#f7f6f4] hover:-translate-y-0.5 hover:border-[color:var(--gold)]/30 hover:bg-white hover:shadow-[0_22px_44px_-30px_rgba(43,26,23,0.5)]"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : id)}
                    className="flex w-full items-center gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--gold-dark)]/70">
                      {f.cat}
                    </span>
                    <span className="flex-1 text-[16px] font-semibold text-[#241417] sm:text-[17px]">
                      {f.q}
                    </span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ring-1 transition-all duration-500 ${
                        isOpen
                          ? "rotate-180 bg-[color:var(--maroon)] text-white ring-transparent"
                          : "bg-white text-[color:var(--maroon)] ring-black/5 group-hover:scale-110"
                      }`}
                    >
                      <ChevronDown className="h-5 w-5" strokeWidth={2} />
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-500 ease-in-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 pr-14 text-[14.5px] leading-relaxed text-black/60">
                        {f.a}
                      </p>
                    </div>
                  </div>
                  <Glare />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3, still have questions */}
      <section className="px-4 pb-20 sm:px-6">
        <div
          className="mx-auto flex max-w-[1180px] flex-col items-center gap-6 rounded-[30px] px-6 py-14 text-center sm:py-20"
          style={{ backgroundImage: "linear-gradient(135deg,#4a1c20,#6C2A37)" }}
        >
          <LifeBuoy className="h-8 w-8 text-[color:var(--gold-light)]" />
          <p className="max-w-2xl font-title text-[1.7rem] uppercase leading-[1.15] text-white sm:text-[2.3rem]">
            Still have questions?
          </p>
          <p className="max-w-md text-[15px] leading-relaxed text-white/65">
            Our care team is available 24/7. Reach out and we&apos;ll help you
            find exactly the right care.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[color:var(--maroon)] transition-transform hover:-translate-y-0.5"
            >
              Contact us
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="tel:80046239"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4 text-[color:var(--gold-light)]" />
              Call 24/7
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
