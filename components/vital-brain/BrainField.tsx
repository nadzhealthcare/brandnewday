"use client";

import { useEffect, useRef } from "react";

/* Interactive neural brain.

   The nodes are sampled inside a brain silhouette rather than scattered across
   the whole hero, so the network reads as a brain. Each node is tinted by its
   height along the accent gradient (deep violet at the base, rose through the
   middle, warm sand at the crown), and the pointer is a signal: hover lights
   the nodes it passes, a tap sends a glowing ripple out through the tissue.

   Canvas, because a few hundred nodes and their links would be thousands of
   DOM elements laid out every frame. Density scales with area, the loop parks
   itself off-screen, and reduced-motion gets one static frame. */

type Node = {
  hx: number; // home position, the brain never dissolves
  hy: number;
  x: number;
  y: number;
  px: number; // wobble phase
  py: number;
  r: number;
  tone: number; // 0 base .. 1 crown, position along the gradient
  synapse: boolean; // a subset pulse on their own, like firing cells
};

type Ripple = { x: number; y: number; start: number };

/* Brain silhouette (lateral, facing right) as a union of blobs in a 0..1 box.
   Sampling points inside their union gives a lumpy, gyri-topped brain with a
   cerebellum and stem, far more robust than hand-authoring one bezier path. */
const BLOBS: [number, number, number, number][] = [
  // [cx, cy, rx, ry]
  [0.48, 0.42, 0.44, 0.3], // cerebrum
  [0.14, 0.3, 0.13, 0.13], // top gyri, arching front
  [0.26, 0.22, 0.14, 0.14],
  [0.4, 0.17, 0.14, 0.14],
  [0.55, 0.16, 0.14, 0.14],
  [0.69, 0.2, 0.14, 0.14],
  [0.81, 0.28, 0.13, 0.13],
  [0.89, 0.4, 0.12, 0.12], // frontal upper
  [0.86, 0.52, 0.13, 0.13], // frontal lower
  [0.6, 0.6, 0.15, 0.14], // temporal
  [0.72, 0.58, 0.13, 0.12],
  [0.5, 0.6, 0.13, 0.13],
  [0.34, 0.58, 0.15, 0.13], // under-belly
  [0.46, 0.6, 0.14, 0.13],
  [0.16, 0.5, 0.13, 0.13], // occipital
  [0.2, 0.68, 0.11, 0.1], // cerebellum
  [0.27, 0.72, 0.09, 0.08],
  [0.3, 0.8, 0.055, 0.055], // stem
  [0.33, 0.86, 0.045, 0.045],
];

const STOPS: [number, [number, number, number]][] = [
  [0, [100, 24, 135]], // #641887
  [0.52, [204, 89, 114]], // #CC5972
  [1, [240, 204, 165]], // #F0CCA5
];

function toneColor(t: number): [number, number, number] {
  const c = Math.min(1, Math.max(0, t));
  for (let i = 1; i < STOPS.length; i++) {
    if (c <= STOPS[i][0]) {
      const [t0, a] = STOPS[i - 1];
      const [t1, b] = STOPS[i];
      const k = (c - t0) / (t1 - t0);
      return [
        Math.round(a[0] + (b[0] - a[0]) * k),
        Math.round(a[1] + (b[1] - a[1]) * k),
        Math.round(a[2] + (b[2] - a[2]) * k),
      ];
    }
  }
  return STOPS[STOPS.length - 1][1];
}

const SPACING = 30; // min px between nodes
const LINK_DIST = 54; // px, below which two nodes wire together
const POINTER_DIST = 150; // hover influence radius
const RIPPLE_LIFE = 900; // ms a tap ripple lives
const RIPPLE_MAX = 320; // px it travels
const RIPPLE_BAND = 46; // px thickness of the glowing ring

export default function BrainField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let nodes: Node[] = [];
    let links: [number, number][] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999 };
    let ripples: Ripple[] = [];

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // fit the brain box: wider than tall, sitting centre-right of the hero
      const maxW = w * (w > 900 ? 0.62 : 0.96);
      const maxH = h * 0.82;
      let bw = Math.min(maxW, maxH * 1.05);
      let bh = bw / 1.05;
      const cx = w > 900 ? w * 0.63 : w * 0.5;
      const cy = h * 0.46;
      const bx = cx - bw / 2;
      const by = cy - bh / 2;

      // rasterise the silhouette to an offscreen mask, then sample inside it
      const mask = document.createElement("canvas");
      mask.width = Math.round(w);
      mask.height = Math.round(h);
      const mctx = mask.getContext("2d");
      if (!mctx) return;
      mctx.fillStyle = "#fff";
      for (const [nx, ny, nrx, nry] of BLOBS) {
        mctx.beginPath();
        mctx.ellipse(bx + nx * bw, by + ny * bh, nrx * bw, nry * bh, 0, 0, Math.PI * 2);
        mctx.fill();
      }
      const data = mctx.getImageData(0, 0, mask.width, mask.height).data;
      const inside = (x: number, y: number) => {
        const i = (Math.floor(y) * mask.width + Math.floor(x)) * 4 + 3;
        return data[i] > 128;
      };

      // Poisson-ish sampling with a coarse grid so nodes spread evenly
      nodes = [];
      const gw = Math.ceil(w / SPACING);
      const grid: (number[] | undefined)[] = new Array(gw * Math.ceil(h / SPACING));
      const cell = (x: number, y: number) =>
        Math.floor(y / SPACING) * gw + Math.floor(x / SPACING);
      const near = (x: number, y: number) => {
        const gx = Math.floor(x / SPACING);
        const gy = Math.floor(y / SPACING);
        for (let a = -1; a <= 1; a++)
          for (let b = -1; b <= 1; b++) {
            const c = grid[(gy + b) * gw + (gx + a)];
            if (!c) continue;
            for (const idx of c) {
              const dx = nodes[idx].hx - x;
              const dy = nodes[idx].hy - y;
              if (dx * dx + dy * dy < SPACING * SPACING) return true;
            }
          }
        return false;
      };

      const target = Math.min(360, Math.round((bw * bh) / 1500));
      let attempts = target * 40;
      let minY = h;
      let maxY = 0;
      while (nodes.length < target && attempts-- > 0) {
        const x = bx + Math.random() * bw;
        const y = by + Math.random() * bh;
        if (x < 1 || y < 1 || x > w - 1 || y > h - 1) continue;
        if (!inside(x, y) || near(x, y)) continue;
        const idx = nodes.length;
        nodes.push({
          hx: x,
          hy: y,
          x,
          y,
          px: Math.random() * Math.PI * 2,
          py: Math.random() * Math.PI * 2,
          r: Math.random() * 1.1 + 0.9,
          tone: 0,
          synapse: Math.random() < 0.12,
        });
        (grid[cell(x, y)] ??= []).push(idx);
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }

      // tone by height: bottom violet, crown sand
      const span = Math.max(1, maxY - minY);
      for (const n of nodes) n.tone = (maxY - n.hy) / span;

      // stable links between near neighbours, using the same grid
      links = [];
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const gx = Math.floor(n.hx / SPACING);
        const gy = Math.floor(n.hy / SPACING);
        for (let a = -1; a <= 2; a++)
          for (let b = -1; b <= 2; b++) {
            const c = grid[(gy + b) * gw + (gx + a)];
            if (!c) continue;
            for (const j of c) {
              if (j <= i) continue;
              const dx = nodes[j].hx - n.hx;
              const dy = nodes[j].hy - n.hy;
              if (dx * dx + dy * dy < LINK_DIST * LINK_DIST) links.push([i, j]);
            }
          }
      }
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      // overlapping glows accumulate into bright intersections, like firing
      ctx.globalCompositeOperation = "lighter";

      ripples = ripples.filter((r) => now - r.start < RIPPLE_LIFE);

      const act = (n: Node): number => {
        let a = 0;
        const dx = n.x - pointer.x;
        const dy = n.y - pointer.y;
        const pd = Math.sqrt(dx * dx + dy * dy);
        if (pd < POINTER_DIST) a = 1 - pd / POINTER_DIST;
        for (const rp of ripples) {
          const age = (now - rp.start) / RIPPLE_LIFE;
          const radius = age * RIPPLE_MAX;
          const d = Math.abs(Math.hypot(n.x - rp.x, n.y - rp.y) - radius);
          if (d < RIPPLE_BAND) a = Math.max(a, (1 - d / RIPPLE_BAND) * (1 - age));
        }
        if (n.synapse) {
          a = Math.max(a, (0.5 + 0.5 * Math.sin(now / 900 + n.px)) * 0.55);
        }
        return a;
      };

      // links first
      ctx.lineWidth = 0.7;
      for (const [i, j] of links) {
        const a = nodes[i];
        const b = nodes[j];
        const heat = Math.max(act(a), act(b));
        const [r, g, bl] = toneColor((a.tone + b.tone) / 2);
        ctx.strokeStyle = `rgba(${r},${g},${bl},${0.05 + heat * 0.4})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // nodes
      for (const n of nodes) {
        const a = act(n);
        const [r, g, bl] = toneColor(n.tone);
        if (a > 0.04) {
          ctx.shadowColor = `rgb(${r},${g},${bl})`;
          ctx.shadowBlur = 6 + a * 22;
          ctx.fillStyle = `rgba(${r},${g},${bl},${0.55 + a * 0.45})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + a * 2.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = `rgba(${r},${g},${bl},0.4)`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalCompositeOperation = "source-over";
    };

    const step = (now: number) => {
      for (const n of nodes) {
        n.x = n.hx + Math.sin(now / 1600 + n.px) * 1.6;
        n.y = n.hy + Math.cos(now / 1700 + n.py) * 1.6;
      }
      draw(now);
      raf = requestAnimationFrame(step);
    };

    build();
    if (reduced) draw(performance.now());
    else raf = requestAnimationFrame(step);

    const onResize = () => {
      build();
      if (reduced) draw(performance.now());
    };
    const rectXY = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMove = (e: PointerEvent) => {
      const p = rectXY(e);
      pointer.x = p.x;
      pointer.y = p.y;
    };
    const onDown = (e: PointerEvent) => {
      const p = rectXY(e);
      ripples.push({ x: p.x, y: p.y, start: performance.now() });
      if (ripples.length > 6) ripples.shift();
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting === visible) return;
        visible = entry.isIntersecting;
        if (reduced) return;
        if (visible) raf = requestAnimationFrame(step);
        else cancelAnimationFrame(raf);
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    />
  );
}
