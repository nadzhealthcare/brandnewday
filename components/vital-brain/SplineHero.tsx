"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import BrainField from "./BrainField";

/* Spline 3D scene as the hero backdrop, with the canvas brain as a real
   fallback — not just a loading placeholder.

   The Spline runtime is ~2MB (≈660KB gzipped) plus its own WebGL loop, so it
   is treated as an enhancement, never the thing the hero depends on:

   - The lightweight canvas brain paints instantly and is what everyone sees
     first. It stays mounted underneath the whole time, so it is always ready
     to take over.
   - The runtime is code-split (ssr:false) and only fetched once the page is
     idle, so it never competes with first paint.
   - When the scene is up it crossfades in and the canvas is hidden (which parks
     its animation loop), so two loops never run at once.

   The important part: the scene's WebGL layer is opaque, so if it renders it
   covers the canvas — but on phones a heavy scene often can't get or keep a
   WebGL context. We watch for that (context lost, or a context that never comes
   back) and, when it happens, tear the scene down and bring the canvas brain
   back so the hero is never a blank black box. Desktops that render the scene
   fine are unaffected. Reduced-motion visitors keep the calm canvas and the 3D
   scene is never fetched. */

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

const SCENE = "/assets/vital-brain.splinecode";

export default function SplineHero({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false); // start fetching the runtime
  const [ready, setReady] = useState(false); // scene reported loaded
  const [failed, setFailed] = useState(false); // scene can't render here
  const [brainHidden, setBrainHidden] = useState(false); // canvas parked

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

  // Once the scene paints, hide the canvas after the crossfade (which parks its
  // rAF). If the scene later fails, this reverses and the canvas returns.
  useEffect(() => {
    if (ready && !failed) {
      const t = setTimeout(() => setBrainHidden(true), 1100);
      return () => clearTimeout(t);
    }
    setBrainHidden(false);
  }, [ready, failed]);

  // Watch the scene's WebGL context. On phones it can be refused or dropped
  // under memory pressure; either way, fall back to the canvas rather than
  // leave the opaque, empty scene layer covering it.
  useEffect(() => {
    if (!ready || failed) return;
    const cv = layerRef.current?.querySelector("canvas");
    if (!cv) return;

    const fail = () => setFailed(true);
    cv.addEventListener("webglcontextlost", fail);

    // Some devices drop the context without firing the event, so also probe it
    // once the scene has had a moment to settle. Only act on a context we can
    // read and that reports lost — never on an ambiguous null (which can just
    // mean a different context type is in use).
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
    <div ref={rootRef} className={className}>
      {/* Canvas brain: always mounted, hidden (parked) only while the scene is
          confirmed rendering. `hidden` makes it non-intersecting, which stops
          BrainField's own animation loop. */}
      <BrainField
        className={`absolute inset-0 h-full w-full ${brainHidden ? "hidden" : ""}`}
      />

      {load && !failed && (
        <div
          ref={layerRef}
          className={`vb-spline-layer absolute inset-0 transition-opacity duration-1000 ease-out ${
            sceneVisible ? "opacity-100" : "opacity-0"
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
