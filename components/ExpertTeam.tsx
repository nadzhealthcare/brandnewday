"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Globe } from "lucide-react";
import SectionTitle from "./SectionTitle";

const FALLBACK = "/assets/featured-placeholder.jpg";

type Member = {
  name: string;
  title: string;
  langs: string;
  img: string; // replace with each member's photo in /public/assets
  years: number;
  featured?: boolean;
};

const TEAM: Member[] = [
  {
    name: "Dr. Nadia Choudhry",
    title: "General Practitioner",
    langs: "English, Arabic, Urdu, Hindi, Punjabi",
    img: "/assets/drnadia.jpg",
    years: 13,
    featured: true,
  },
  {
    name: "Dr. Avinash Babu",
    title: "General Practitioner",
    langs: "English, Tamil, Telugu, Russian",
    img: "/assets/dravinash.jpg",
    years: 5,
  },
  {
    name: "Dr. Dianne Jokene",
    title: "Osteopathic Practitioner",
    langs: "English",
    img: "/assets/drdianne.jpg",
    years: 15,
  },
  {
    name: "Dr. Muhammad Ahsaan Akhtar",
    title: "Physiotherapist",
    langs: "English, Urdu, Hindi, Punjabi",
    img: "/assets/drmuhammad.jpg",
    years: 5,
    featured: true,
  },
  {
    name: "Dr. Nada Thakur",
    title: "Physiotherapist",
    langs: "English, Hindi",
    img: "/assets/drnada.jpg",
    years: 5,
  },
  {
    name: "Chandra KC",
    title: "Registered Nurse",
    langs: "English, Nepali, Hindi",
    img: "/assets/chandra.jpg",
    years: 3,
  },
  {
    name: "Roja Devi Ningthoujam",
    title: "Registered Nurse",
    langs: "English, Hindi",
    img: "/assets/roja.jpg",
    years: 4,
  },
  {
    name: "Anjana Ghale",
    title: "Registered Nurse",
    langs: "English, Hindi, Nepali",
    img: "/assets/anjana.jpg",
    years: 7,
  },
  {
    name: "Bincy Eldhose",
    title: "Registered Nurse",
    langs: "English, Tamil, Malayalam",
    img: "/assets/bincy.jpg",
    years: 3,
  },
  {
    name: "Kajal Andriya",
    title: "Assistant Nurse",
    langs: "English, Hindi, Malayalam",
    img: "/assets/kajal.jpg",
    years: 3,
  },
  {
    name: "Desire Mendoza",
    title: "Caregiver",
    langs: "English, Arabic, Tagalog",
    img: "/assets/desire.jpg",
    years: 8,
  },
  {
    name: "Zainabu Ibrahim",
    title: "Caregiver",
    langs: "English, Arabic, TWI",
    img: "/assets/zainabu.jpg",
    years: 9,
  },
];

// duplicated for a seamless infinite loop
const LOOP = [...TEAM, ...TEAM];

export default function ExpertTeam() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [thumb, setThumb] = useState({ w: 25, left: 0 });

  const updateThumb = useCallback(() => {
    const s = scrollerRef.current;
    if (!s) return;
    const half = s.scrollWidth / 2 || 1;
    setThumb({
      w: Math.min(100, (s.clientWidth / half) * 100),
      left: ((s.scrollLeft % half) / half) * 100,
    });
  }, []);

  useEffect(() => {
    updateThumb();
    window.addEventListener("resize", updateThumb);
    return () => window.removeEventListener("resize", updateThumb);
  }, [updateThumb]);

  // autoplay with a seamless loop (jumps back by one set when past the first)
  useEffect(() => {
    const id = window.setInterval(() => {
      const s = scrollerRef.current;
      if (!s || pausedRef.current) return;
      const half = s.scrollWidth / 2;
      const step = (s.firstElementChild?.clientWidth ?? 260) + 20;
      if (s.scrollLeft >= half - 1) s.scrollLeft -= half; // seamless reset
      s.scrollBy({ left: step, behavior: "smooth" });
    }, 3000);
    return () => window.clearInterval(id);
  }, []);

  const nudge = (dir: number) => {
    const s = scrollerRef.current;
    if (!s) return;
    const half = s.scrollWidth / 2;
    if (dir > 0 && s.scrollLeft >= half - 1) s.scrollLeft -= half;
    if (dir < 0 && s.scrollLeft <= 1) s.scrollLeft += half;
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
              DHA-licensed doctors, nurses and specialists behind every NADZ
              visit.
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
          className="no-scrollbar flex gap-5 overflow-x-auto scroll-smooth pb-2"
        >
          {LOOP.map((m, i) => (
            <article
              key={i}
              className="group flex h-[422px] w-[252px] shrink-0 flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_18px_44px_-28px_rgba(30,10,16,0.4)] ring-1 ring-black/[0.06] sm:w-[268px]"
            >
              {/* photo */}
              <div className="relative h-[300px] w-full shrink-0 overflow-hidden bg-[#efe8e2]">
                <div
                  className="absolute inset-0 bg-cover bg-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  style={{ backgroundImage: `url(${m.img}), url(${FALLBACK})` }}
                />
                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
                  {m.featured ? (
                    <span className="rounded-full bg-[color:var(--maroon)] px-3.5 py-1.5 text-[12px] font-semibold text-white shadow-md">
                      Featured
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-[#2b1a17] shadow-md">
                    <Star className="h-3.5 w-3.5 fill-[color:var(--maroon)] text-[color:var(--maroon)]" />
                    {m.years} years
                  </span>
                </div>
              </div>

              {/* info */}
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="text-[17px] font-semibold leading-snug text-[#1c1c1c]">
                  {m.name}
                </h3>
                <p className="mt-1 text-[13.5px] text-black/50">{m.title}</p>
                <div className="mt-auto flex items-center gap-2 border-t border-black/[0.06] pt-3.5 text-[12.5px] text-black/55">
                  <Globe className="h-4 w-4 shrink-0 text-[color:var(--maroon)]" />
                  <span className="leading-snug">{m.langs}</span>
                </div>
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
