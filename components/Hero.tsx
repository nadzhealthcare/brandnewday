import Link from "next/link";
import { Suspense } from "react";
import Spline from "@splinetool/react-spline/next";
import { Phone, Timer, Stethoscope } from "lucide-react";
import DhaBadge from "./DhaBadge";
import BookingBar from "./BookingBar";
import AutoScrollRow from "./AutoScrollRow";

/* ---------- small pieces ---------- */

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        fill="#25D366"
        d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.4L3 29l6.8-1.8c1.8 1 3.9 1.5 6 1.5h.2C23.2 28.7 29 22.9 29 15.7 29 8.8 23.2 3 16 3Z"
      />
      <path
        fill="#fff"
        d="M12.1 9.5c-.3-.6-.5-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9 0 1.7 1.2 3.4 1.4 3.6.2.2 2.4 3.8 6 5.2 3 1.2 3.6 1 4.2.9.6-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.1-.3-.2-.7-.4-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.3-.7.1-.3-.2-1.4-.5-2.7-1.7-1-.9-1.7-2-1.9-2.3-.2-.3 0-.5.1-.7.1-.1.3-.4.5-.6.2-.2.2-.3.3-.6.1-.2 0-.4 0-.6-.1-.2-.7-2-1-2.7Z"
      />
    </svg>
  );
}

function CtaButtons() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Link
        href="/book"
        className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-[#3a1518] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-0.5"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Book a Home Visit
      </Link>
      <Link
        href="tel:8004NADZ"
        className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[color:var(--maroon)] px-6 py-3.5 text-[15px] font-semibold text-white ring-1 ring-white/15 transition-transform hover:-translate-y-0.5"
      >
        <Phone className="h-4 w-4 text-[color:var(--gold-light)]" />
        Call Now (24/7)
      </Link>
    </div>
  );
}

function TitleBlock({
  showCta = true,
  centered = false,
}: {
  showCta?: boolean;
  centered?: boolean;
}) {
  return (
    <div className={`max-w-xl ${centered ? "mx-auto text-center" : ""}`}>
      <h1
        className="blur-in font-title text-[1.9rem] uppercase leading-[1] text-white sm:text-[2.6rem] lg:text-[48px]"
        style={{ animationDelay: "0.05s" }}
      >
        Blending Care
        <br /> With Innovation
      </h1>
      <p
        className={`blur-in mt-5 max-w-md text-[15px] leading-relaxed text-white/70 ${
          centered ? "mx-auto" : ""
        }`}
        style={{ animationDelay: "0.28s" }}
      >
        Redefining the standards of modern healthcare through continuous
        innovation and human connection.
      </p>
      {showCta && (
        <div
          className={`blur-in mt-8 ${centered ? "flex justify-center" : ""}`}
          style={{ animationDelay: "0.5s" }}
        >
          <CtaButtons />
        </div>
      )}
    </div>
  );
}

function EightHundred() {
  return (
    <Link href="tel:8004NADZ" className="inline-block transition-transform hover:-translate-y-0.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/nadz-800.svg"
        alt="Call 800 4 NADZ"
        className="h-11 w-auto sm:h-12"
      />
    </Link>
  );
}

/* Diagonal light streak that glides across a card on hover */
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

function BestCard() {
  return (
    <div className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border border-white/12 bg-black/35 px-4 py-2.5 backdrop-blur-md transition-colors duration-300 hover:border-white/30">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/best-award.png"
        alt="Best Home Healthcare Award 2025"
        className="h-14 w-auto"
      />
      <div className="flex flex-col pr-1">
        <span className="font-title text-xl leading-none text-white">THE BEST</span>
        <span className="mt-1 text-[12px] font-medium text-white/70">
          Home Healthcare
        </span>
        <span className="text-[12px] font-semibold text-[color:var(--gold-light)]">
          2025
        </span>
      </div>
      <Glare />
    </div>
  );
}

const BADGE_ITEMS = [
  <DhaBadge key="dha" />,
  <div key="reach" className="flex items-center gap-3">
    <div className="leading-tight">
      <p className="text-[11px] text-white/60">We Reach you in</p>
      <p className="text-[16px] font-bold text-white">30 mins</p>
    </div>
    <Timer className="h-8 w-8 text-white/85" strokeWidth={1.6} />
  </div>,
  <div key="247" className="flex items-center gap-3">
    <div className="leading-tight">
      <p className="text-[16px] font-bold text-white">24/7</p>
      <p className="text-[11px] text-white/60">
        medical assistance
        <br />
        at your doorstep
      </p>
    </div>
    <Timer className="h-8 w-8 text-white/85" strokeWidth={1.6} />
  </div>,
];

function Badges() {
  return (
    <div className="flex flex-wrap items-stretch gap-3">
      {BADGE_ITEMS.map((item, i) => (
        <GlassCard key={i}>{item}</GlassCard>
      ))}
    </div>
  );
}

/* Mobile-only: the 4 glass cards as an edge-to-edge auto-playing carousel,
   aligned to the bottom of the hero. */
function GlassCarousel() {
  return (
    <AutoScrollRow className="-mx-6 px-6 pb-1" speed={0.35}>
      <BestCard />
      {BADGE_ITEMS.map((item, i) => (
        <GlassCard key={i}>{item}</GlassCard>
      ))}
    </AutoScrollRow>
  );
}

function BrainLoading() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[#2a0e12]">
      <div className="flex items-center gap-3 text-white/50">
        <Stethoscope className="h-6 w-6 animate-pulse" />
        <span className="text-sm">Loading experience…</span>
      </div>
    </div>
  );
}

/* ---------- hero ---------- */

export default function Hero() {
  return (
    <section className="bg-white px-0 pb-0 pt-0 sm:px-5 sm:pb-8 sm:pt-3 lg:px-6">
      <div className="relative min-h-[100svh] overflow-hidden rounded-none border-0 bg-[#2a0e12] shadow-[0_30px_70px_-30px_rgba(74,28,32,0.55)] sm:min-h-[640px] sm:rounded-[32px] sm:border-[12px] sm:border-white lg:h-[calc(100vh-208px)] lg:max-h-[740px] lg:min-h-[600px]">
        {/* 3D brain background */}
        <div className="absolute inset-0">
          <Suspense fallback={<BrainLoading />}>
            <Spline
              scene="https://prod.spline.design/EFHKQjXKEMoZ8GS3/scene.splinecode"
              className="!absolute !inset-0 !h-full !w-full"
            />
          </Suspense>
        </div>

        {/* Gentle warm glow (the scene already carries most of the red ambiance) */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_75%_at_72%_45%,rgba(160,26,38,0.18),transparent_62%)] mix-blend-screen" />
        {/* Legibility overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10 lg:via-black/30 lg:to-transparent" />

        {/* ---- Desktop layout (absolute) ---- */}
        <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
          <div className="pointer-events-auto absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center px-6">
            <TitleBlock centered />
          </div>
          <div className="pointer-events-auto absolute bottom-10 left-14">
            <EightHundred />
          </div>
          <div className="pointer-events-auto absolute bottom-[112px] right-8">
            <BestCard />
          </div>
          <div className="pointer-events-auto absolute bottom-8 right-8">
            <Badges />
          </div>
        </div>

        {/* ---- Mobile / tablet layout (flow) ---- */}
        <div className="relative z-10 flex min-h-[100svh] flex-col justify-end gap-5 p-6 pt-24 sm:min-h-[640px] sm:p-9 lg:hidden">
          <TitleBlock showCta={false} />
          <EightHundred />
          <GlassCarousel />
        </div>
      </div>

      {/* booking bar — sits at the base of the hero (sm+); on phones the
          booking flow is a floating button handled by <StickyBooking/> */}
      <div className="relative z-20 mx-auto mt-4 hidden max-w-[1180px] px-2 sm:block">
        <BookingBar />
      </div>
    </section>
  );
}

