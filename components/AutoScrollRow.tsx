"use client";

import { Children, useEffect, useRef } from "react";

/* Seamless auto-scrolling (marquee) row. Children are duplicated once so the
   scroll can loop without a visible jump. Pauses briefly on user interaction,
   then resumes. Uses transform-free native scrollLeft for GPU-smooth motion. */
export default function AutoScrollRow({
  children,
  className = "",
  speed = 0.4,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    let paused = false;
    let resumeTimer: ReturnType<typeof setTimeout>;

    const step = () => {
      if (!paused) {
        const half = el.scrollWidth / 2;
        if (half > 0) {
          let next = el.scrollLeft + speed;
          if (next >= half) next -= half;
          el.scrollLeft = next;
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const pause = () => {
      paused = true;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        paused = false;
      }, 2500);
    };
    el.addEventListener("pointerdown", pause);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("wheel", pause, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resumeTimer);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("wheel", pause);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      className={`flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {[...items, ...items].map((child, i) => (
        <div key={i} className="shrink-0 pr-3">
          {child}
        </div>
      ))}
    </div>
  );
}
