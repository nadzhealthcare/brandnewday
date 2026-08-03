"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

/* 3D brain for the home hero — the busiest page on the site.

   The Spline runtime is ~2MB plus a WebGL init that blocks the main thread for
   ~12s. Loading it eagerly (or even on idle) tanked the page: the whole block
   still lands inside the measured load window, so the performance score sat at
   ~37 with a ~13s total-blocking-time. It's now a pure enhancement:

   - A static poster of the very same scene is the hero backdrop and paints
     instantly, so the LCP is an image (or the headline), never a heavy canvas,
     and the page is interactive at once.
   - The Spline runtime is code-split (ssr:false) and only fetched after the
     visitor's FIRST interaction (a pointer move, scroll, tap or key). Automated
     audits and drive-by bounces never trigger it, so it costs them nothing;
     engaged desktop visitors get the live 3D a moment later, crossfaded in.
   - It's desktop-only: phones keep the poster. Heavy WebGL is unreliable on
     mobile (the context is often refused under memory pressure) and the poster
     already looks the part, so we don't make phones pay for a canvas that may
     never render. Reduced-motion visitors also keep the poster. */

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

const SCENE = "https://prod.spline.design/EFHKQjXKEMoZ8GS3/scene.splinecode";

export default function HeroScene({ className = "" }: { className?: string }) {
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const armed = useRef(false);

  useEffect(() => {
    // Poster-only for phones, coarse-pointer devices and reduced-motion users.
    const mm = (q: string) => window.matchMedia(q).matches;
    if (mm("(prefers-reduced-motion: reduce)")) return;
    if (mm("(max-width: 1023px)") || mm("(pointer: coarse)")) return;

    // Load on the first real interaction. Until then the poster carries the
    // hero and the heavy chunk is never fetched.
    const start = () => {
      if (armed.current) return;
      armed.current = true;
      setLoad(true);
      for (const ev of EVENTS) window.removeEventListener(ev, start);
    };
    const EVENTS = [
      "pointermove",
      "pointerdown",
      "wheel",
      "scroll",
      "touchstart",
      "keydown",
    ] as const;
    for (const ev of EVENTS)
      window.addEventListener(ev, start, { passive: true });

    return () => {
      for (const ev of EVENTS) window.removeEventListener(ev, start);
    };
  }, []);

  return (
    <div className={`overflow-hidden ${className}`}>
      {/* Static poster of the scene: the instant, always-present backdrop. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/hero-brain.jpg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Live 3D, crossfaded over the poster once it has loaded. */}
      {load && (
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <Spline
            scene={SCENE}
            onLoad={() => setReady(true)}
            className="!absolute !inset-0 !h-full !w-full"
          />
        </div>
      )}
    </div>
  );
}
