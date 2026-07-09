"use client";

import { useEffect, useRef } from "react";
import SectionTitle from "./SectionTitle";

const SVGNS = "http://www.w3.org/2000/svg";

// label + card center (matches the rect centers in services.svg)
const CARDS: { label: string; cx: number; cy: number }[] = [
  { label: "DOCTOR ON CALL", cx: 640, cy: 392 },
  { label: "NURSING CARE", cx: 640, cy: 483 },
  { label: "ELDERLY CARE", cx: 640, cy: 574 },
  { label: "PALLIATIVE CARE", cx: 640, cy: 672 },
  { label: "NADZ VITAL BRAIN", cx: 640, cy: 766 },
  { label: "NADZ AUTONOMIC CONTROL", cx: 640, cy: 854 },
  { label: "POC TESTING", cx: 640, cy: 938 },
  { label: "IV DRIPS", cx: 1043, cy: 365 },
  { label: "PHYSIOTHERAPY", cx: 1043, cy: 718 },
  { label: "SLEEPING DISORDER", cx: 1043, cy: 808 },
  { label: "ANXIETY & STRESS", cx: 1043, cy: 896 },
  { label: "CHRONIC PAIN", cx: 1043, cy: 984 },
  { label: "LABS", cx: 1460, cy: 392 },
  { label: "GENETIC & EPIGENETIC TESTING", cx: 1460, cy: 483 },
  { label: "FOOD INTOLERANCE & ALLERGIES", cx: 1460, cy: 571 },
  { label: "NIPT / WOMEN'S HEALTH PANELS", cx: 1460, cy: 659 },
  { label: "NAD++V THERAPY", cx: 1460, cy: 763 },
  { label: "MEDICAL TOURISM", cx: 1460, cy: 857 },
  { label: "VACCINATIONS", cx: 1460, cy: 945 },
  { label: "STD TESTING & SEXUAL HEALTH", cx: 1840, cy: 396 },
  { label: "COVID PCR", cx: 1840, cy: 483 },
  { label: "PEPTIDE THERAPY", cx: 1840, cy: 763 },
  { label: "FUNCTIONAL & INTEGRATIVE MEDICINE", cx: 1840, cy: 865 },
  { label: "IV NAD+", cx: 1056, cy: 169 },
  { label: "IV GLUTATHIONE RADIANCE DRIP", cx: 762, cy: 269 },
  { label: "IV VITAMIN THERAPY", cx: 1048, cy: 269 },
  { label: "IV HYDRATION", cx: 1335, cy: 269 },
  { label: "MOTHER & BABY", cx: 254, cy: 523 },
  { label: "CARE BABYSITTING", cx: 254, cy: 623 },
  { label: "ERECTILE DYSFUNCTION", cx: 254, cy: 833 },
  { label: "OVERREACTING BLADDER", cx: 254, cy: 918 },
];

function wrap(label: string, max: number): string[] {
  const words = label.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if (cur && (cur + " " + w).length > max) {
      lines.push(cur);
      cur = w;
    } else {
      cur = cur ? cur + " " + w : w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

type Card = {
  label: string;
  cx: number;
  cy: number;
  rects: SVGRectElement[];
  g: SVGGElement;
  x: number;
  y: number;
  w: number;
  h: number;
};

function enhance(svg: SVGSVGElement): () => void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- style ----
  const style = document.createElementNS(SVGNS, "style");
  style.textContent = `
    .nadz-card{ transform-box: fill-box; transform-origin: center; transition: transform .85s cubic-bezier(.22,1,.36,1), opacity .7s ease; }
    .nadz-card rect{ pointer-events: all; transition: fill .5s ease, stroke .5s ease; }
    .nadz-label{ font-family: var(--font-inter), system-ui, sans-serif; font-weight:500; letter-spacing:.02em; fill:#6C2A37; transition: fill .5s ease; }
    .nadz-card.pulse, .nadz-card:hover{ transform: scale(1.07); cursor: pointer; }
    .nadz-card.pulse rect, .nadz-card:hover rect{ fill: url(#nadzMaroonGrad); stroke: transparent; }
    .nadz-card.pulse .nadz-label, .nadz-card:hover .nadz-label{ fill:#ffffff; }
    .nadz-card.faded{ opacity:.4; }
    .nadz-card:hover{ opacity:1 !important; }
    #nadz-cards-layer:has(.nadz-card:hover) .nadz-card:not(:hover){ opacity:.4; }
    .nadz-dot{ fill:#DB0000; filter: drop-shadow(0 0 6px rgba(219,0,0,.8)); }
    .nadz-emblem{ transform-box: fill-box; transform-origin: center; transition: transform .7s cubic-bezier(.22,1,.36,1); cursor: pointer; }
    .nadz-emblem:hover{ transform: scale(1.08); }
    .nadz-emblem-glare{ mix-blend-mode: screen; pointer-events: none; animation: nadzEmblemGlare 6.5s ease-in-out infinite; will-change: transform; }
    @keyframes nadzEmblemGlare{ 0%,60%{ transform: translateX(-80px);} 82%,100%{ transform: translateX(255px);} }
  `;
  svg.appendChild(style);

  // ---- build cards (group rect(s) + injected text) ----
  const allRects = Array.from(svg.querySelectorAll("rect"));
  const cards: Card[] = [];

  for (const c of CARDS) {
    const rects = allRects.filter((r) => {
      const x = parseFloat(r.getAttribute("x") || "0");
      const y = parseFloat(r.getAttribute("y") || "0");
      const w = parseFloat(r.getAttribute("width") || "0");
      const h = parseFloat(r.getAttribute("height") || "0");
      if (w < 200) return false;
      return (
        Math.abs(x + w / 2 - c.cx) < 12 && Math.abs(y + h / 2 - c.cy) < 12
      );
    });
    if (!rects.length) continue;

    const r0 = rects[0];
    const x = parseFloat(r0.getAttribute("x") || "0");
    const y = parseFloat(r0.getAttribute("y") || "0");
    const w = parseFloat(r0.getAttribute("width") || "0");
    const h = parseFloat(r0.getAttribute("height") || "0");

    const g = document.createElementNS(SVGNS, "g");
    g.setAttribute("class", "nadz-card");
    r0.parentNode!.insertBefore(g, r0);
    rects.forEach((r) => g.appendChild(r));

    // text
    const maxChars = w > 300 ? 22 : 18;
    const lines = wrap(c.label, maxChars);
    const fontSize = lines.length > 2 ? 14 : 15.5;
    const lineH = fontSize + 3;
    const text = document.createElementNS(SVGNS, "text");
    text.setAttribute("class", "nadz-label");
    text.setAttribute("x", String(c.cx));
    text.setAttribute("y", String(c.cy));
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("font-size", String(fontSize));
    const startY = c.cy - ((lines.length - 1) * lineH) / 2;
    lines.forEach((ln, i) => {
      const ts = document.createElementNS(SVGNS, "tspan");
      ts.setAttribute("x", String(c.cx));
      ts.setAttribute("y", String(startY + i * lineH));
      ts.setAttribute("dominant-baseline", "central");
      ts.textContent = ln;
      text.appendChild(ts);
    });
    g.appendChild(text);

    cards.push({ ...c, rects, g, x, y, w, h });
  }

  // ---- hide original static red dots (we animate our own) ----
  svg
    .querySelectorAll('circle[fill="#DB0000"]')
    .forEach((c) => ((c as SVGElement).style.display = "none"));
  svg.querySelectorAll("g[filter]").forEach((g) => {
    if (g.querySelector("circle")) (g as SVGElement).style.display = "none";
  });

  // ---- group the central emblem (for hover-zoom + glare) ----
  const emblemG = document.createElementNS(SVGNS, "g");
  emblemG.setAttribute("class", "nadz-emblem");
  Array.from(svg.children).forEach((el) => {
    const tag = el.tagName.toLowerCase();
    if (["defs", "style", "mask", "lineargradient", "clippath", "filter"].includes(tag))
      return;
    if ((el as Element).classList?.contains("nadz-card")) return;
    let bb: DOMRect;
    try {
      bb = (el as SVGGraphicsElement).getBBox();
    } catch {
      return;
    }
    const bx = bb.x + bb.width / 2;
    const by = bb.y + bb.height / 2;
    if (bx > 948 && bx < 1128 && by > 455 && by < 640 && bb.width < 270 && bb.height < 230)
      emblemG.appendChild(el);
  });
  svg.appendChild(emblemG);

  // ---- lift all cards above the connector lines (fixes lines drawing over cards) ----
  const cardsLayer = document.createElementNS(SVGNS, "g");
  cardsLayer.setAttribute("id", "nadz-cards-layer");
  cards.forEach((c) => cardsLayer.appendChild(c.g));
  svg.appendChild(cardsLayer);

  // ---- glare rides on a top layer, clipped to the emblem, non-interactive ----
  const glareGroup = svg
    .querySelector(".nadz-emblem-glare")
    ?.closest("g[clip-path]");
  if (glareGroup) svg.appendChild(glareGroup);

  if (reduce) {
    return () => {};
  }

  // ---- connectors -> routes ----
  const rectDist = (px: number, py: number, c: Card) => {
    const dx = Math.max(c.x - px, 0, px - (c.x + c.w));
    const dy = Math.max(c.y - py, 0, py - (c.y + c.h));
    return Math.hypot(dx, dy);
  };
  const nearest = (px: number, py: number) => {
    let best = -1;
    let bd = Infinity;
    cards.forEach((c, i) => {
      const d = rectDist(px, py, c);
      if (d < bd) {
        bd = d;
        best = i;
      }
    });
    return { index: best, dist: bd };
  };

  const connectors = Array.from(
    svg.querySelectorAll("path, line"),
  ).filter((el) => {
    const stroke = (el.getAttribute("stroke") || "").toLowerCase();
    return el.hasAttribute("stroke-dasharray") || stroke === "#020043";
  }) as unknown as SVGGeometryElement[];

  type Route = {
    el: SVGGeometryElement;
    len: number;
    reverse: boolean;
    cardIndex: number;
  };
  const routes: Route[] = [];
  for (const el of connectors) {
    let len = 0;
    try {
      len = el.getTotalLength();
    } catch {
      continue;
    }
    if (len < 8 || len > 1400) continue;
    const p0 = el.getPointAtLength(0);
    const p1 = el.getPointAtLength(len);
    const n0 = nearest(p0.x, p0.y);
    const n1 = nearest(p1.x, p1.y);
    if (n1.dist <= n0.dist && n1.dist < 18)
      routes.push({ el, len, reverse: false, cardIndex: n1.index });
    else if (n0.dist < 18)
      routes.push({ el, len, reverse: true, cardIndex: n0.index });
  }

  // ---- animation ----
  const TARGET_DOTS = 4; // keep 3-4 dots (and therefore zooms) going at once
  let running = false;
  let spawnTimer = 0;
  let inFlight = 0;
  const pulsing = new Set<number>();
  const inFlightTargets = new Set<number>();

  const applyFade = () => {
    const any = pulsing.size > 0;
    cards.forEach((c, i) =>
      c.g.classList.toggle("faded", any && !pulsing.has(i)),
    );
  };
  const pulseCard = (i: number) => {
    const c = cards[i];
    if (!c) return;
    // bring the pulsing card above its neighbours + the lines
    cardsLayer.appendChild(c.g);
    pulsing.add(i);
    c.g.classList.add("pulse");
    applyFade();
    window.setTimeout(() => {
      c.g.classList.remove("pulse");
      pulsing.delete(i);
      applyFade();
    }, 1900); // hold the zoom a couple of seconds
  };

  const easeInOut = (t: number) =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  // prefer routes whose card isn't already targeted or pulsing → distinct simultaneous zooms
  const pickRoute = (): Route | null => {
    if (!routes.length) return null;
    const free = routes.filter(
      (r) => !inFlightTargets.has(r.cardIndex) && !pulsing.has(r.cardIndex),
    );
    const pool = free.length ? free : routes;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const travel = (route: Route) => {
    inFlight++;
    inFlightTargets.add(route.cardIndex);
    const done = () => {
      inFlight = Math.max(0, inFlight - 1);
      inFlightTargets.delete(route.cardIndex);
    };
    const dot = document.createElementNS(SVGNS, "circle");
    dot.setAttribute("r", "6");
    dot.setAttribute("class", "nadz-dot");
    svg.appendChild(dot);
    const dur = 2400 + Math.random() * 1000; // slower + varied so arrivals spread out
    const t0 = performance.now();
    const step = (now: number) => {
      if (!running) {
        dot.remove();
        done();
        return;
      }
      const t = Math.min((now - t0) / dur, 1);
      const e = easeInOut(t); // smoother
      const dist = route.reverse ? route.len * (1 - e) : route.len * e;
      const pt = route.el.getPointAtLength(dist);
      dot.setAttribute("cx", String(pt.x));
      dot.setAttribute("cy", String(pt.y));
      dot.style.opacity =
        t < 0.14 ? String(t / 0.14) : t > 0.9 ? String((1 - t) / 0.1) : "1";
      if (t < 1) requestAnimationFrame(step);
      else {
        pulseCard(route.cardIndex);
        dot.remove();
        done();
      }
    };
    requestAnimationFrame(step);
  };

  const loop = () => {
    if (!running) return;
    let guard = 0;
    while (inFlight < TARGET_DOTS && guard++ < 8) {
      const r = pickRoute();
      if (!r) break;
      travel(r);
    }
    spawnTimer = window.setTimeout(loop, 450 + Math.random() * 450);
  };

  const io = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) {
        if (!running) {
          running = true;
          loop();
        }
      } else {
        running = false;
        window.clearTimeout(spawnTimer);
      }
    },
    { threshold: 0.12 },
  );
  io.observe(svg);

  return () => {
    running = false;
    window.clearTimeout(spawnTimer);
    io.disconnect();
  };
}

export default function ServicesSection() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};
    fetch("/assets/services.svg")
      .then((r) => r.text())
      .then((txt) => {
        if (cancelled || !hostRef.current) return;
        hostRef.current.innerHTML = txt;
        const svg = hostRef.current.querySelector("svg");
        if (!svg) return;
        svg.removeAttribute("width");
        svg.removeAttribute("height");
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        (svg as SVGSVGElement).style.width = "100%";
        (svg as SVGSVGElement).style.height = "auto";
        (svg as SVGSVGElement).style.display = "block";
        cleanup = enhance(svg as SVGSVGElement);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <SectionTitle className="mb-3 text-center text-[1.7rem] text-[color:var(--maroon)] sm:text-[2.2rem]">
          Our Services
        </SectionTitle>
        <p className="mx-auto mb-8 max-w-xl text-center text-[15px] text-black/55">
          One connected ecosystem of care — every NADZ service, from the doctor
          on call to longevity medicine.
        </p>
        <div className="overflow-x-auto">
          <div
            ref={hostRef}
            className="mx-auto min-w-[820px] max-w-[1200px]"
            aria-label="NADZ services overview diagram"
          />
        </div>
      </div>
    </section>
  );
}
