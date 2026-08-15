"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

/* 3D brain for the home hero — the busiest page on the site.

   The Spline runtime is ~2MB plus a WebGL init that blocks the main thread for
   ~12s. Loading it eagerly (or on idle) pinned the page at ~37 (TBT ~13s). It's
   now a pure enhancement layered over a static poster of the same scene, which
   paints instantly and is the LCP:

   - Desktop: the Spline runtime is code-split and only fetched on the visitor's
     FIRST interaction (pointer move / scroll / key). Audits and bounces never
     trigger it. If a machine can't hold the WebGL context, we tear the scene
     down and the poster shows through.
   - Mobile: iOS Safari routinely refuses or drops the WebGL context for a scene
     this heavy, so phones don't get Spline at all. Instead they play a tiny,
     pre-rendered loop of the same brain (autoplay/muted/loop) — reliable, no
     WebGL, and it still feels alive. The poster sits underneath as the frame-0
     fallback if the video can't autoplay.
   - Reduced-motion visitors keep the still poster on every device. */

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

// Self-hosted from public/assets rather than the prod.spline.design cloud URL,
// so the scene keeps rendering (and stays free of the "Built with Spline" badge
// Spline re-adds to cloud-hosted scenes) independent of the Spline subscription.
// This is the same approach the Vital Brain page uses for its scene.
const SCENE = "/assets/hero-brain.splinecode";

type Mode = "poster" | "video" | "spline";

export default function HeroScene({ className = "" }: { className?: string }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("poster"); // resolved after mount
  const [load, setLoad] = useState(false); // desktop: start fetching Spline
  const [ready, setReady] = useState(false); // Spline reported loaded
  const [failed, setFailed] = useState(false); // Spline can't render here
  const [videoOn, setVideoOn] = useState(false); // mobile loop can play
  const armed = useRef(false);

  useEffect(() => {
    const mm = (q: string) => window.matchMedia(q).matches;
    // Reduced-motion: keep the still poster everywhere.
    if (mm("(prefers-reduced-motion: reduce)")) return;

    // Phones / coarse-pointer devices get the video loop, not Spline.
    if (mm("(max-width: 1023px)") || mm("(pointer: coarse)")) {
      setMode("video");
      return;
    }

    // Desktop: interaction-gated Spline so audits stay fast.
    setMode("spline");
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

  // Desktop: watch the Spline WebGL context and fall back to the poster if it's
  // refused or dropped, rather than leave an opaque empty layer covering it.
  useEffect(() => {
    if (mode !== "spline" || !ready || failed) return;
    const cv = layerRef.current?.querySelector("canvas");
    if (!cv) return;
    const fail = () => setFailed(true);
    cv.addEventListener("webglcontextlost", fail);
    const probe = window.setTimeout(() => {
      const gl = (cv.getContext("webgl2") ||
        cv.getContext("webgl")) as WebGLRenderingContext | null;
      if (gl && gl.isContextLost()) setFailed(true);
    }, 1600);
    return () => {
      cv.removeEventListener("webglcontextlost", fail);
      clearTimeout(probe);
    };
  }, [mode, ready, failed]);

  const sceneVisible = ready && !failed;

  return (
    <div className={`overflow-hidden ${className}`}>
      {/* Static poster of the scene: instant backdrop, LCP, and the fallback
          both enhancement layers sit over. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/hero-brain.jpg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Mobile: pre-rendered loop of the same scene, crossfaded in. */}
      {mode === "video" && (
        <video
          src="/assets/hero-brain.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onCanPlay={() => setVideoOn(true)}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-out ${
            videoOn ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Desktop: live 3D, crossfaded over the poster once loaded. */}
      {mode === "spline" && load && !failed && (
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
