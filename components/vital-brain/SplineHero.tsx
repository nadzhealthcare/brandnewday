"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import BrainField from "./BrainField";

/* Spline 3D scene as the hero backdrop.

   The Spline runtime is ~2MB (≈660KB gzipped) plus its own WebGL loop, so it
   is treated as an enhancement, never the thing the hero depends on:

   - The lightweight canvas brain paints instantly and is what everyone sees
     first. It also stays as the permanent backdrop for reduced-motion and for
     anyone whose scene fails to load, so the hero is never blank or broken.
   - The runtime is code-split (ssr:false, as the Next lazy-loading guide
     prescribes for a client-only dependency) and only fetched once the page is
     idle, so it never competes with first paint.
   - When the scene is ready it crossfades in and the canvas is retired, so two
     animation loops never run at once.

   The scene is served from our own /public rather than Spline's CDN: it's
   self-contained (no external textures), so this keeps the page free of a
   third-party request and the scene on our domain. */

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

const SCENE = "/assets/vital-brain.splinecode";

export default function SplineHero({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false); // start fetching the runtime
  const [ready, setReady] = useState(false); // scene has painted
  const [keepBrain, setKeepBrain] = useState(true); // fallback still mounted

  useEffect(() => {
    // Reduced-motion visitors keep the calm canvas, never the 3D scene.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let idle: number | undefined;
    const el = rootRef.current;
    if (!el) return;

    // Defer until the hero is actually on screen and the browser is idle, so
    // the heavy chunk lands after the page is usable rather than during load.
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = () => setLoad(true);
        type RIC = (cb: () => void, opts?: { timeout: number }) => number;
        const ric = (window as unknown as { requestIdleCallback?: RIC })
          .requestIdleCallback;
        if (ric) idle = ric(start, { timeout: 2500 });
        else idle = window.setTimeout(start, 1200);
      },
      { threshold: 0.1 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (idle != null) {
        const cic = (
          window as unknown as { cancelIdleCallback?: (h: number) => void }
        ).cancelIdleCallback;
        if (cic) cic(idle);
        else clearTimeout(idle);
      }
    };
  }, []);

  // Once the scene is up, drop the canvas after the crossfade so its rAF stops.
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setKeepBrain(false), 1100);
    return () => clearTimeout(t);
  }, [ready]);

  return (
    <div ref={rootRef} className={className}>
      {keepBrain && (
        <BrainField className="absolute inset-0 h-full w-full" />
      )}

      {load && (
        <div
          className={`vb-spline-layer absolute inset-0 transition-opacity duration-1000 ease-out ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <Spline
            scene={SCENE}
            onLoad={() => setReady(true)}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
    </div>
  );
}
