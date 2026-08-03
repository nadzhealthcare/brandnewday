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
     engaged visitors get the live 3D a moment later, crossfaded in.
   - The poster stays mounted underneath the whole time, so it is a real
     fallback, not just a placeholder: on phones a heavy scene often can't get
     or keep a WebGL context, so we watch for that and, if it fails, hide the 3D
     layer and let the poster show through rather than leave a blank black box.
     Reduced-motion visitors keep the poster and never fetch the scene. */

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

const SCENE = "https://prod.spline.design/EFHKQjXKEMoZ8GS3/scene.splinecode";

export default function HeroScene({ className = "" }: { className?: string }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false); // start fetching the runtime
  const [ready, setReady] = useState(false); // scene reported loaded
  const [failed, setFailed] = useState(false); // scene can't render here
  const armed = useRef(false);

  useEffect(() => {
    // Reduced-motion visitors keep the calm poster, never the 3D scene.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Load on the first real interaction. Until then the poster carries the
    // hero and the heavy chunk is never fetched (so audits stay fast).
    const EVENTS = [
      "pointermove",
      "pointerdown",
      "wheel",
      "scroll",
      "touchstart",
      "keydown",
    ] as const;
    const start = () => {
      if (armed.current) return;
      armed.current = true;
      setLoad(true);
      for (const ev of EVENTS) window.removeEventListener(ev, start);
    };
    for (const ev of EVENTS)
      window.addEventListener(ev, start, { passive: true });

    return () => {
      for (const ev of EVENTS) window.removeEventListener(ev, start);
    };
  }, []);

  // Watch the scene's WebGL context. On phones it can be refused or dropped
  // under memory pressure; either way, fall back to the poster rather than
  // leave the opaque, empty scene layer covering it.
  useEffect(() => {
    if (!ready || failed) return;
    const cv = layerRef.current?.querySelector("canvas");
    if (!cv) return;

    const fail = () => setFailed(true);
    cv.addEventListener("webglcontextlost", fail);

    // Some devices drop the context without firing the event, so also probe it
    // once the scene has had a moment to settle. Only act on a context we can
    // read and that reports lost — never on an ambiguous null.
    const probe = window.setTimeout(() => {
      const gl = (cv.getContext("webgl2") ||
        cv.getContext("webgl")) as WebGLRenderingContext | null;
      if (gl && gl.isContextLost()) setFailed(true);
    }, 1600);

    return () => {
      cv.removeEventListener("webglcontextlost", fail);
      clearTimeout(probe);
    };
  }, [ready, failed]);

  const sceneVisible = ready && !failed;

  return (
    <div className={`overflow-hidden ${className}`}>
      {/* Static poster of the scene: the instant, always-present backdrop and
          the fallback the 3D layer sits over. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/hero-brain.jpg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Live 3D, crossfaded over the poster once loaded; torn down if the
          device can't hold the WebGL context. */}
      {load && !failed && (
        <div
          ref={layerRef}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            sceneVisible ? "opacity-100" : "opacity-0"
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
