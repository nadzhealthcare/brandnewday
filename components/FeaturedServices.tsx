"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone, ChevronRight } from "lucide-react";
import SectionTitle from "./SectionTitle";

type Service = {
  title: string;
  badge: string;
  desc: string;
  href: string;
  img: string;
};

const SERVICES: Service[] = [
  {
    title: "Doctor on Call",
    badge: "Urgent & Primary Care",
    desc: "Fever, infections, migraines, food poisoning or a sick child at 2am.",
    href: "/services/doctor-on-call",
    img: "/assets/doctor-on-call.png",
  },
  {
    title: "Nursing Care",
    badge: "In-Home Nursing",
    desc: "Compassionate day-and-night nursing, wherever you call home.",
    href: "/services/nursing-care",
    img: "/assets/nurse-on-call.png",
  },
  {
    title: "IV Drips",
    badge: "Wellness Infusions",
    desc: "Hydration, vitamins, NAD⁺ and radiance drips delivered to you.",
    href: "/services/iv-drips",
    img: "/assets/ivdrips.png",
  },
  {
    title: "Physiotherapy",
    badge: "Recovery & Mobility",
    desc: "Expert physiotherapy sessions in the comfort of your home.",
    href: "/services/physiotherapy-at-home",
    img: "/assets/physio.png",
  },
  {
    title: "Labs at Home",
    badge: "Diagnostics",
    desc: "Sample collection and lab testing right at your doorstep.",
    href: "/services/labs-at-home",
    img: "/assets/labs-at-home.png",
  },
  {
    title: "Vaccination",
    badge: "Preventive Care",
    desc: "Routine and travel vaccines, administered safely at home.",
    href: "/services/vaccination-at-home",
    img: "/assets/vaccination.png",
  },
  {
    title: "Medical Tourism",
    badge: "Global Care",
    desc: "World-class treatment abroad, seamlessly coordinated end to end.",
    href: "/services/medical-tourism",
    img: "/assets/medical-tour.png",
  },
];

const N = SERVICES.length;
const SCROLL_VH = 100 + (N - 1) * 40; // pinned scroll distance

type Dims = { cardW: number; cardH: number; spacing: number; curve: number };

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

/* The card visual, shared by the desktop coverflow and the mobile carousel. */
function CardInner({ s }: { s: Service }) {
  return (
    <div
      className="group relative h-full w-full overflow-hidden rounded-[26px] shadow-[0_30px_60px_-28px_rgba(43,20,25,0.6)] ring-1 ring-black/5"
      style={{
        backgroundImage: `url(${s.img}), linear-gradient(160deg,#5c2230,#2a0f13)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* darkness only over the bottom (title/desc/button); fully clear above */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.72)_30%,rgba(0,0,0,0)_60%)]" />

      <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-black/15 px-3 py-1.5 text-[12px] font-medium text-white backdrop-blur-sm">
        {s.badge}
      </span>
      <Link
        href={s.href}
        aria-label={`Open ${s.title}`}
        className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white text-[color:var(--maroon)] shadow transition-transform hover:scale-105"
        onClick={(e) => e.stopPropagation()}
      >
        <ArrowRight className="h-4 w-4" />
      </Link>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-title text-2xl uppercase leading-tight text-white">
          {s.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[13.5px] leading-snug text-white/80">
          {s.desc}
        </p>
        <Link
          href="/book"
          onClick={(e) => e.stopPropagation()}
          className="mt-4 flex items-center justify-between rounded-full bg-white px-5 py-3 text-[14px] font-semibold text-[color:var(--maroon)] shadow-lg transition-transform hover:-translate-y-0.5"
        >
          <span className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Book Now
          </span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default function FeaturedServices() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [dims, setDims] = useState<Dims>({
    cardW: 288,
    cardH: 420,
    spacing: 250,
    curve: 40,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const dimsRef = useRef(dims);
  const activeCur = useRef(0);
  const revealStart = useRef<number | null>(null);

  useEffect(() => {
    dimsRef.current = dims;
  }, [dims]);

  // the coverflow only runs on desktop; mobile uses a native scroll carousel
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const measure = () => {
      const w = stageRef.current?.clientWidth ?? 1000;
      const cardW = clamp(w * 0.24, 208, 292);
      const cardH = Math.round(cardW * 1.46);
      const spacing = clamp(w * 0.2, 108, 250);
      const curve = spacing * 0.17;
      setDims({ cardW, cardH, spacing, curve });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) return; // skip the heavy RAF loop on mobile
    let raf = 0;
    const REVEAL_DUR = 1200;
    const ENTRY_SLOTS = 2.6;

    const frame = (now: number) => {
      const root = rootRef.current;
      const d = dimsRef.current;
      if (root) {
        const rect = root.getBoundingClientRect();
        const total = Math.max(1, rect.height - window.innerHeight);
        const progress = clamp(-rect.top / total, 0, 1);
        const target = progress * (N - 1);
        activeCur.current += (target - activeCur.current) * 0.2;
        if (Math.abs(target - activeCur.current) < 0.0005)
          activeCur.current = target;
      }

      let reveal = 0;
      if (revealStart.current != null)
        reveal = clamp((now - revealStart.current) / REVEAL_DUR, 0, 1);

      const ac = activeCur.current;
      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const o = i - ac; // linear (no looping), scrub through all 7 once
        const order = clamp((o + 3) / 6, 0, 1);
        const p = clamp((reveal - order * 0.5) / 0.5, 0, 1);
        const disp = o - (1 - p) * ENTRY_SLOTS;
        const ad = Math.abs(disp);

        const x = disp * d.spacing;
        const y = d.curve * disp * disp;
        const scale = clamp(1 - ad * 0.08, 0.74, 1);
        const fade = clamp(1 - Math.max(0, ad - 2.35) / 0.7, 0, 1);
        const op = p * fade;

        el.style.transform = `translate(-50%,0) translate(${x}px,${y}px) scale(${scale})`;
        el.style.opacity = String(op);
        el.style.zIndex = String(Math.round(200 - ad * 12));
        el.style.pointerEvents = op > 0.35 ? "auto" : "none";
      }

      const idx = ((Math.round(ac) % N) + N) % N;
      setActiveIndex((prev) => (prev === idx ? prev : idx));

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && revealStart.current == null) {
          const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;
          revealStart.current = reduce
            ? performance.now() - 2000
            : performance.now();
        }
      },
      { threshold: 0.05 },
    );
    if (rootRef.current) io.observe(rootRef.current);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [isDesktop]);

  // clicking a dot scrolls to that card's slice of the pinned range
  const goTo = (i: number) => {
    const root = rootRef.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const top = window.scrollY + rect.top + (i / (N - 1)) * total;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const stageHeight = Math.round(dims.cardH + dims.curve * 6.6 + 20);

  // ---- Mobile / tablet: native scroll-snap carousel with bigger cards ----
  if (!isDesktop) {
    return (
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
        <SectionTitle className="mb-3 text-center text-[1.7rem] text-[color:var(--maroon)] sm:text-[2.2rem]">
          Featured Services
        </SectionTitle>
        <p className="mx-auto mb-8 max-w-xl text-center text-[15px] text-black/55">
          The care our families reach for most, brought straight to your home.
        </p>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-3 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className="aspect-[5/7] w-[82%] max-w-[360px] shrink-0 snap-center sm:w-[62%]"
            >
              <CardInner s={s} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      className="relative overflow-x-clip bg-white"
      style={{ height: `${SCROLL_VH}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center px-4 sm:px-6">
        <SectionTitle className="mb-3 text-center text-[1.7rem] text-[color:var(--maroon)] sm:text-[2.2rem]">
          Featured Services
        </SectionTitle>
        <p className="mx-auto mb-6 max-w-xl text-center text-[15px] text-black/55">
          The care our families reach for most, brought straight to your home.
        </p>

        <div
          ref={stageRef}
          className="relative w-full max-w-[1240px]"
          style={{ height: stageHeight }}
        >
          {SERVICES.map((s, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute left-1/2 top-0 will-change-transform"
              style={{
                width: dims.cardW,
                height: dims.cardH,
                opacity: 0,
                transform: "translate(-50%,0)",
              }}
              onClick={() => goTo(i)}
            >
              <CardInner s={s} />
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2.5">
          {SERVICES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to featured service ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-7 bg-[color:var(--maroon)]"
                  : "w-2.5 bg-black/20 hover:bg-black/35"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
