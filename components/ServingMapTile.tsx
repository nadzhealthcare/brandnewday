"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

const MAP_IMG = "/assets/dubai.png";
const PIN = "/assets/pin.svg";

// hand-placed pin positions (% of tile) spread across the city
const PINS = [
  { l: 16, t: 62 },
  { l: 30, t: 44 },
  { l: 44, t: 66 },
  { l: 37, t: 84 },
  { l: 56, t: 50 },
  { l: 66, t: 72 },
  { l: 78, t: 56 },
  { l: 52, t: 82 },
  { l: 86, t: 42 },
];

export default function ServingMapTile() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // replay the staggered pin-drop every 5s once in view
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setCycle((c) => c + 1), 5000);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div
      ref={ref}
      className={`nadz-map relative overflow-hidden rounded-[26px] bg-[#2e1922] md:col-span-1 ${
        inView ? "is-in" : ""
      }`}
    >
      {/* Dubai aerial map background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={MAP_IMG}
        alt="Aerial map of Dubai"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />

      {/* maroon vignette so the title + caption stay legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2e1922]/80 via-[#2e1922]/15 to-[#3a1c28]/80" />

      {/* pins — keyed by cycle so the drop animation replays every 5s */}
      {PINS.map((p, i) => (
        <div
          key={`${cycle}-${i}`}
          className="absolute"
          style={{
            left: `${p.l}%`,
            top: `${p.t}%`,
            transform: "translate(-50%, -100%)",
          }}
        >
          {/* pulse ring at the pin tip */}
          <span
            className="nadz-ping absolute left-1/2 top-full h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(240,200,150,0.55) 0%, rgba(240,200,150,0) 70%)",
              animationDelay: `${0.35 + i * 0.14 + 0.5}s`,
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PIN}
            alt=""
            aria-hidden="true"
            className="nadz-pin relative h-7 w-7 drop-shadow-[0_4px_6px_rgba(0,0,0,0.55)]"
            style={{ animationDelay: `${0.35 + i * 0.14}s` }}
          />
        </div>
      ))}

      {/* title */}
      <div className="absolute left-6 top-6 z-10 flex items-center gap-2 text-white">
        <MapPin className="h-5 w-5 text-[color:var(--gold-light)]" />
        <h3 className="text-[15px] font-semibold">Serving homes across Dubai</h3>
      </div>
      <span className="absolute bottom-5 left-6 z-10 text-[12.5px] text-white/70">
        Doctors on the ground in 40+ areas
      </span>
    </div>
  );
}
