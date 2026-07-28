"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

/* Deferred 3D brain for the home hero.

   The Spline runtime is ~2MB plus a WebGL init that blocks the main thread for
   seconds — on the busiest page, loading it eagerly tanked the performance
   score (a ~15s total-blocking-time). So it's treated as an enhancement:

   - The hero's own dark backdrop, glow and headline render instantly, so the
     LCP is the title text, not a heavy canvas, and the page is interactive
     immediately.
   - The runtime is code-split (ssr:false) and only fetched once the browser is
     idle, so it never competes with first paint or input.
   - When the scene is ready it crossfades in over the backdrop.

   Reduced-motion visitors keep the calm static hero and never fetch it. */

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

const SCENE = "https://prod.spline.design/EFHKQjXKEMoZ8GS3/scene.splinecode";

export default function HeroScene({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let idle: number | undefined;
    const el = rootRef.current;
    if (!el) return;

    // The hero is at the top, so it's on screen at once; the observer is only
    // here to avoid loading if a visitor never actually sees it. The real defer
    // is requestIdleCallback, which waits until the page has settled.
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = () => setLoad(true);
        type RIC = (cb: () => void, opts?: { timeout: number }) => number;
        const ric = (window as unknown as { requestIdleCallback?: RIC })
          .requestIdleCallback;
        if (ric) idle = ric(start, { timeout: 3000 });
        else idle = window.setTimeout(start, 1500);
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

  return (
    <div
      ref={rootRef}
      className={`transition-opacity duration-1000 ease-out ${
        ready ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      {load && (
        <Spline
          scene={SCENE}
          onLoad={() => setReady(true)}
          className="!absolute !inset-0 !h-full !w-full"
        />
      )}
    </div>
  );
}
