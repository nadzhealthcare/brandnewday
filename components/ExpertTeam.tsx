"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import SectionTitle from "./SectionTitle";

const FALLBACK = "/assets/featured-placeholder.jpg";

type Member = {
  name: string;
  title: string;
  langs: string;
  intro: string;
  img: string;
  years: number;
  featured?: boolean;
};

const TEAM: Member[] = [
  {
    name: "Dr. Nadia Choudhry",
    title: "Founder & Medical Director",
    langs: "EN · FR · AR",
    intro:
      "Leads NADZ's clinical model, ensuring every patient interaction meets the highest standards of medical judgment, safety and care.",
    img: "/assets/team/1.jpg",
    years: 16,
    featured: true,
  },
  {
    name: "Dr. Omar Haddad",
    title: "Internal Medicine",
    langs: "EN · AR",
    intro:
      "Two decades treating complex adult conditions — now bringing hospital-grade internal medicine to your living room.",
    img: "/assets/team/2.jpg",
    years: 20,
  },
  {
    name: "Dr. Sara Al Marri",
    title: "Family Physician",
    langs: "EN · AR",
    intro:
      "Your family's first point of contact — from newborns to grandparents, all under one trusted doctor.",
    img: "/assets/team/3.jpg",
    years: 12,
    featured: true,
  },
  {
    name: "James Whitfield",
    title: "Physiotherapy Lead",
    langs: "EN · FR",
    intro:
      "Helps patients rebuild mobility and strength with tailored physiotherapy programs delivered at home.",
    img: "/assets/team/4.jpg",
    years: 5,
  },
  {
    name: "Dr. Leila Rahman",
    title: "Pediatrics",
    langs: "EN · AR · UR",
    intro:
      "Gentle, specialised care for children — because little patients deserve big expertise.",
    img: "/assets/team/5.jpg",
    years: 10,
  },
  {
    name: "Dr. Karim Nassar",
    title: "Longevity & Wellness",
    langs: "EN · FR · AR",
    intro:
      "Designs preventive and longevity plans — advanced diagnostics and therapies that keep you healthier for longer.",
    img: "/assets/team/6.jpg",
    years: 14,
    featured: true,
  },
  {
    name: "Dr. Aisha Farouk",
    title: "Dermatology",
    langs: "EN · AR",
    intro:
      "Medical and aesthetic skin care at home — from diagnoses to advanced treatments, without the waiting room.",
    img: "/assets/team/7.jpg",
    years: 11,
  },
  {
    name: "Dr. Daniel Kim",
    title: "Cardiology",
    langs: "EN · KO",
    intro:
      "Heart-health monitoring and diagnostics brought to your door, with rapid escalation when it matters.",
    img: "/assets/team/8.jpg",
    years: 18,
    featured: true,
  },
  {
    name: "Dr. Priya Nair",
    title: "Obstetrics & Gynaecology",
    langs: "EN · HI · AR",
    intro:
      "Compassionate women's health care — prenatal, postnatal and beyond, in the comfort of home.",
    img: "/assets/team/9.jpg",
    years: 13,
  },
  {
    name: "Dr. Yusuf Karim",
    title: "Emergency Medicine",
    langs: "EN · AR",
    intro:
      "Rapid-response urgent care, arriving fast and equipped to stabilise and treat on the spot.",
    img: "/assets/team/10.jpg",
    years: 9,
  },
  {
    name: "Dr. Elena Petrova",
    title: "Nutrition & Dietetics",
    langs: "EN · RU",
    intro:
      "Builds personalised nutrition and recovery plans that turn everyday habits into lasting health.",
    img: "/assets/team/11.jpg",
    years: 7,
  },
];

function LangPill({ langs, tone }: { langs: string; tone: "dark" | "maroon" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium tracking-wide backdrop-blur ${
        tone === "maroon"
          ? "bg-white/15 text-white/90 ring-1 ring-white/20"
          : "bg-white/12 text-white/85 ring-1 ring-white/15"
      }`}
    >
      {langs}
    </span>
  );
}

export default function ExpertTeam() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [thumb, setThumb] = useState({ w: 25, left: 0 });

  const updateThumb = useCallback(() => {
    const s = scrollerRef.current;
    if (!s) return;
    const w = (s.clientWidth / s.scrollWidth) * 100;
    const left = (s.scrollLeft / s.scrollWidth) * 100;
    setThumb({ w, left });
  }, []);

  useEffect(() => {
    updateThumb();
    window.addEventListener("resize", updateThumb);
    return () => window.removeEventListener("resize", updateThumb);
  }, [updateThumb]);

  // autoplay (pauses on hover)
  useEffect(() => {
    const id = window.setInterval(() => {
      const s = scrollerRef.current;
      if (!s || pausedRef.current) return;
      const step = (s.firstElementChild?.clientWidth ?? 260) + 20;
      if (s.scrollLeft + s.clientWidth >= s.scrollWidth - 6) {
        s.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        s.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 3000);
    return () => window.clearInterval(id);
  }, []);

  const nudge = (dir: number) => {
    const s = scrollerRef.current;
    if (!s) return;
    s.scrollBy({ left: dir * (s.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionTitle className="text-[1.7rem] text-[color:var(--maroon)] sm:text-[2.2rem]">
              Meet the Expert Team
            </SectionTitle>
            <p className="mt-3 max-w-xl text-[15px] text-black/55">
              DHA-licensed doctors and specialists behind every NADZ visit.
            </p>
          </div>
          <div className="flex gap-2.5">
            <button
              aria-label="Previous"
              onClick={() => nudge(-1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-black/10 text-[color:var(--maroon)] transition-colors hover:bg-[color:var(--cream)]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next"
              onClick={() => nudge(1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-black/10 text-[color:var(--maroon)] transition-colors hover:bg-[color:var(--cream)]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* carousel */}
        <div
          ref={scrollerRef}
          onScroll={updateThumb}
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
          onTouchStart={() => (pausedRef.current = true)}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
        >
          {TEAM.map((m, i) => (
            <article
              key={i}
              className="group relative h-[400px] w-[248px] shrink-0 snap-start overflow-hidden rounded-[26px] bg-[#140a12] shadow-[0_24px_50px_-26px_rgba(30,10,16,0.6)] sm:w-[266px]"
            >
              {/* default: photo */}
              <div
                className="absolute inset-0 bg-cover bg-top transition-opacity duration-500 group-hover:opacity-0"
                style={{
                  backgroundImage: `url(${m.img}), url(${FALLBACK})`,
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
              <div className="absolute inset-x-0 bottom-0 p-5 transition-opacity duration-300 group-hover:opacity-0">
                <h3 className="text-[19px] font-semibold leading-tight text-white">
                  {m.name}
                </h3>
                <p className="mt-0.5 text-[13px] text-[color:var(--gold-light)]">
                  {m.title}
                </p>
                <div className="mt-3">
                  <LangPill langs={m.langs} tone="dark" />
                </div>
              </div>

              {/* hover: maroon abstract gradient + intro */}
              <div
                className="absolute inset-0 flex flex-col justify-between p-5 pt-16 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  backgroundImage:
                    "radial-gradient(120% 90% at 25% 15%, #7a3040 0%, transparent 55%), linear-gradient(160deg, #4a1c20 0%, #1e0a11 100%)",
                }}
              >
                <div className="relative">
                  <h3 className="text-[19px] font-semibold leading-tight text-white">
                    {m.name}
                  </h3>
                  <p className="mt-0.5 text-[13px] text-[color:var(--gold-light)]">
                    {m.title}
                  </p>
                  <p className="mt-4 text-[13px] leading-relaxed text-white/75">
                    {m.intro}
                  </p>
                </div>
                <div className="relative">
                  <LangPill langs={m.langs} tone="maroon" />
                </div>
              </div>

              {/* top badges — always visible over both states */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-4">
                {m.featured ? (
                  <span className="rounded-full bg-[color:var(--maroon)] px-4 py-1.5 text-[12px] font-semibold text-white shadow-md">
                    Featured
                  </span>
                ) : (
                  <span />
                )}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-semibold text-[#2b1a17] shadow-md">
                  <Star className="h-3.5 w-3.5 fill-[color:var(--maroon)] text-[color:var(--maroon)]" />
                  {m.years} years
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* progress thumb */}
        <div className="relative mx-auto mt-7 h-1 w-full max-w-[260px] rounded-full bg-black/10">
          <div
            className="absolute top-0 h-full rounded-full bg-[color:var(--maroon)] transition-[left,width] duration-150 ease-out"
            style={{ width: `${thumb.w}%`, left: `${thumb.left}%` }}
          />
        </div>
      </div>
    </section>
  );
}
