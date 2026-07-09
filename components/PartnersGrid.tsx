"use client";

import { useEffect, useState } from "react";

const LOGOS: { src: string; name: string }[] = [
  { src: "/assets/Kings_College_Hospital_86177c3edf.avif", name: "Kings College Hospital" },
  { src: "/assets/Fakeeh_University_Hospital_5244baaca7.avif", name: "Fakeeh University Hospital" },
  { src: "/assets/practo_3edc2ccb4a.avif", name: "Practo" },
  { src: "/assets/resonance_c360d82763.avif", name: "Resonance" },
  { src: "/assets/fusion_213c05b70f.avif", name: "Fusion" },
  { src: "/assets/fusion_log_2x_62626d8a5e.avif", name: "Fusion" },
  { src: "/assets/image_2_81d1a0536c.png", name: "Partner" },
  { src: "/assets/image_3_b00cd01d3b.png", name: "Partner" },
  { src: "/assets/image_4_866239c999.avif", name: "Partner" },
];

export default function PartnersGrid() {
  const [active, setActive] = useState<number[]>([]);

  useEffect(() => {
    const pick = () => {
      const count = 2 + Math.floor(Math.random() * 2); // 2 or 3 at once
      const idxs = new Set<number>();
      while (idxs.size < count) {
        idxs.add(Math.floor(Math.random() * LOGOS.length));
      }
      setActive([...idxs]);
    };
    pick();
    const id = setInterval(pick, 1700);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
      {LOGOS.map((logo, i) => {
        const on = active.includes(i);
        return (
          <div
            key={i}
            className={`flex h-24 items-center justify-center rounded-2xl bg-white p-5 ring-1 transition-all duration-700 ease-out hover:scale-[1.09] ${
              on
                ? "z-10 scale-[1.09] shadow-[0_22px_40px_-18px_rgba(74,28,32,0.5)] ring-[color:var(--maroon)]/20"
                : "scale-100 shadow-[0_10px_24px_-18px_rgba(20,10,16,0.5)] ring-black/5"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.name}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
            />
          </div>
        );
      })}
    </div>
  );
}
