"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, Timer } from "lucide-react";
import DhaBadge from "./DhaBadge";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path fill="#25D366" d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.4L3 29l6.8-1.8c1.8 1 3.9 1.5 6 1.5h.2C23.2 28.7 29 22.9 29 15.7 29 8.8 23.2 3 16 3Z" />
      <path fill="#fff" d="M12.1 9.5c-.3-.6-.5-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9 0 1.7 1.2 3.4 1.4 3.6.2.2 2.4 3.8 6 5.2 3 1.2 3.6 1 4.2.9.6-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.1-.3-.2-.7-.4-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.3-.7.1-.3-.2-1.4-.5-2.7-1.7-1-.9-1.7-2-1.9-2.3-.2-.3 0-.5.1-.7.1-.1.3-.4.5-.6.2-.2.2-.3.3-.6.1-.2 0-.4 0-.6-.1-.2-.7-2-1-2.7Z" />
    </svg>
  );
}

function CtaButtons() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Link href="/book" className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-[#3a1518] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-0.5">
        <WhatsAppIcon className="h-5 w-5" />
        Book a Home Visit
      </Link>
      <Link href="tel:8004NADZ" className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[color:var(--maroon)] px-6 py-3.5 text-[15px] font-semibold text-white ring-1 ring-white/15 transition-transform hover:-translate-y-0.5">
        <Phone className="h-4 w-4 text-[color:var(--gold-light)]" />
        Call Now (24/7)
      </Link>
    </div>
  );
}

function Glare() {
  return (
    <span className="pointer-events-none absolute inset-y-0 left-[-60%] w-1/2 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/60 to-transparent blur-[1px] transition-[left] duration-[750ms] ease-in-out group-hover:left-[130%]" />
  );
}

function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/12 bg-black/35 px-4 py-3 backdrop-blur-md transition-colors duration-300 hover:border-white/30">
      {children}
      <Glare />
    </div>
  );
}

function Badges() {
  return (
    <div className="flex flex-wrap items-stretch gap-3">
      <GlassCard>
        <DhaBadge />
      </GlassCard>
      <GlassCard>
        <div className="flex items-center gap-3">
          <div className="leading-tight">
            <p className="text-[11px] text-white/60">We Reach you in</p>
            <p className="text-[16px] font-bold text-white">30 mins</p>
          </div>
          <Timer className="h-8 w-8 text-white/85" strokeWidth={1.6} />
        </div>
      </GlassCard>
      <GlassCard>
        <div className="flex items-center gap-3">
          <div className="leading-tight">
            <p className="text-[16px] font-bold text-white">24/7</p>
            <p className="text-[11px] text-white/60">
              medical assistance
              <br />
              at your doorstep
            </p>
          </div>
          <Timer className="h-8 w-8 text-white/85" strokeWidth={1.6} />
        </div>
      </GlassCard>
    </div>
  );
}

function TitleBlock({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-xl">
      <h1 className="blur-in font-title text-[1.9rem] uppercase leading-[1.02] text-white sm:text-[2.6rem] lg:text-[46px]" style={{ animationDelay: "0.05s" }}>
        {title}
      </h1>
      <p className="blur-in mt-5 max-w-md text-[15px] leading-relaxed text-white/70" style={{ animationDelay: "0.28s" }}>
        {description}
      </p>
      <div className="blur-in mt-8" style={{ animationDelay: "0.5s" }}>
        <CtaButtons />
      </div>
    </div>
  );
}

export default function PageHero({
  title,
  description,
  images,
}: {
  title: string;
  description: string;
  images: string[];
}) {
  const slides = images.length ? images : ["/assets/doctorled.jpg"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      4500,
    );
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="bg-white px-3 pb-6 pt-3 sm:px-5 sm:pb-8 lg:px-6">
      <div className="relative min-h-[560px] overflow-hidden rounded-[26px] border-[8px] border-white bg-[#2a0e12] shadow-[0_30px_70px_-30px_rgba(74,28,32,0.55)] sm:rounded-[32px] sm:border-[12px] lg:h-[calc(100vh-160px)] lg:max-h-[720px] lg:min-h-[560px]">
        {/* image slider */}
        <div className="absolute inset-0">
          {slides.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${src}-${i}`}
              src={src}
              alt=""
              aria-hidden={i !== index}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1100ms] ease-in-out"
              style={{ opacity: i === index ? 1 : 0 }}
            />
          ))}
        </div>

        {/* warm glow + legibility overlay (matches home hero) */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_75%_at_72%_45%,rgba(160,26,38,0.18),transparent_62%)] mix-blend-screen" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10 lg:via-black/35 lg:to-black/10" />

        {/* ---- Desktop layout ---- */}
        <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
          <div className="pointer-events-auto absolute left-14 top-1/2 -translate-y-1/2">
            <TitleBlock title={title} description={description} />
          </div>
          <div className="pointer-events-auto absolute bottom-8 right-8">
            <Badges />
          </div>
        </div>

        {/* ---- Mobile / tablet layout ---- */}
        <div className="relative z-10 flex min-h-[560px] flex-col justify-between gap-8 p-6 sm:p-9 lg:hidden">
          <div className="pt-24">
            <TitleBlock title={title} description={description} />
          </div>
          <Badges />
        </div>

        {/* slider dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 lg:left-14 lg:translate-x-0">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
