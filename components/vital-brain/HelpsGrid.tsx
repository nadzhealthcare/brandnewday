"use client";

import { useRef } from "react";
import {
  Activity,
  Brain,
  HeartPulse,
  Moon,
  Target,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";

/* "What it helps with" grid.

   At rest each card is the same dark tile as before. On hover an abstract clip
   plays behind the copy and fades in, with a scrim underneath the text so it
   stays readable over the moving footage.

   The clip is only fetched and played on hover (preload="none"), and it's the
   same file for every card, so the browser downloads it once. Pointer-fine
   only in effect — touch devices have no hover, so they just get the static
   tile, which is what we want on mobile anyway. Reduced-motion visitors never
   see the video (hidden in globals.css). */

const DISPLAY = "font-title uppercase";
const VIDEO = "/abstract.mp4";

const HELPS: { title: string; desc: string; icon: LucideIcon }[] = [
  { title: "Anxiety & stress", desc: "Overwhelm and persistent stress.", icon: Activity },
  { title: "Mood & motivation", desc: "Low motivation and emotional instability.", icon: HeartPulse },
  { title: "Focus & attention", desc: "Attention and productivity struggles.", icon: Target },
  { title: "Memory & clarity", desc: "Memory concerns and cognitive fog.", icon: Brain },
  { title: "Sleep disturbances", desc: "Restless, disrupted sleep.", icon: Moon },
  { title: "Peak performance", desc: "Optimise an already-healthy brain.", icon: Zap },
];

function HelpCard({
  item,
  delay,
}: {
  item: (typeof HELPS)[number];
  delay: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const Icon = item.icon;

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    // play() can reject if interrupted; nothing to do about it.
    v.play().catch(() => {});
  };
  const stop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0; // hidden behind the fade-out, so the next hover is fresh
  };

  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={play}
        onMouseLeave={stop}
        className="group relative h-full overflow-hidden bg-[#0a0510] p-8"
      >
        {/* video backdrop, fades in on hover */}
        <video
          ref={videoRef}
          src={VIDEO}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className="vb-help-video pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
        />
        {/* scrim keeps the copy legible over the footage */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0510] via-[#0a0510]/75 to-[#0a0510]/45 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />

        <div className="relative z-10">
          <span className="vb-grad-icon block transition-opacity duration-300 group-hover:opacity-80">
            <Icon className="h-5 w-5" />
          </span>
          <h3 className={`${DISPLAY} mt-6 text-[19px] leading-tight`}>
            {item.title}
          </h3>
          <p className="mt-2.5 text-[14px] leading-relaxed text-[#f5f4f8]/45 transition-colors duration-300 group-hover:text-[#f5f4f8]/75">
            {item.desc}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export default function HelpsGrid() {
  return (
    <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
      {HELPS.map((f, i) => (
        <HelpCard key={f.title} item={f} delay={i * 70} />
      ))}
    </div>
  );
}
