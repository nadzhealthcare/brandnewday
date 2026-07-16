"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, ArrowRight, Check } from "lucide-react";
import SectionTitle from "./SectionTitle";

const INFO = [
  {
    icon: Phone,
    label: "Phone",
    value: "800 4 NADZ / 800 4 6239",
    href: "tel:80046239",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@nadzhealthcare.com",
    href: "mailto:info@nadzhealthcare.com",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Office 809, Armada 2, Cluster P, JLT, Dubai, United Arab Emirates",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "9AM–6PM | Monday – Saturday",
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const hovering = useRef(false);
  const [sent, setSent] = useState(false);

  // roaming spotlight: follows the cursor on hover, auto-drifts otherwise
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const sec = sectionRef.current;
      const rev = revealRef.current;
      if (sec && rev) {
        const r = sec.getBoundingClientRect();
        let tx: number, ty: number;
        if (hovering.current) {
          tx = mouse.current.x;
          ty = mouse.current.y;
        } else {
          const t = performance.now() / 1000;
          tx = r.width * (0.5 + 0.34 * Math.sin(t * 0.45));
          ty = r.height * (0.5 + 0.32 * Math.sin(t * 0.33 + 1.2));
        }
        // ease toward the target for smooth motion
        pos.current.x += (tx - pos.current.x) * 0.07;
        pos.current.y += (ty - pos.current.y) * 0.07;
        const mask = `radial-gradient(circle 320px at ${pos.current.x}px ${pos.current.y}px, #000 0%, #000 46%, rgba(0,0,0,0.55) 66%, transparent 82%)`;
        rev.style.maskImage = mask;
        rev.style.webkitMaskImage = mask;
      }
      raf = requestAnimationFrame(loop);
    };
    // start the spotlight roughly centred
    const r0 = sectionRef.current?.getBoundingClientRect();
    if (r0) {
      pos.current = { x: r0.width * 0.5, y: r0.height * 0.5 };
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const sec = sectionRef.current;
    if (!sec) return;
    const r = sec.getBoundingClientRect();
    mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
      className="relative flex min-h-[90vh] items-center overflow-hidden bg-black px-4 py-20 sm:px-6"
    >
      {/* base DNA (muted) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/dna1.webp"
        width={1672}
        height={941}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* energized DNA, faint everywhere so it always reads a little */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/dna2.webp"
        width={1672}
        height={941}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
      />
      {/* energized DNA, brightly revealed inside the roaming spotlight */}
      <div ref={revealRef} className="pointer-events-none absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/dna2.webp"
        width={1672}
        height={941}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      </div>
      {/* legibility gradient, kept lighter so the DNA shows through */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-black/40" />

      <div className="relative mx-auto grid w-full max-w-[1180px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* left: title + description + contact info */}
        <div>
          <SectionTitle className="max-w-[15ch] text-[2.1rem] leading-[1.05] text-white sm:text-[3rem]">
            What If You Got the Same Care, At Home?
          </SectionTitle>
          <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-white/70">
            Most patients lose over 80 minutes travelling and waiting for a
            10-minute consultation. Request a callback and our team will bring
            expert care to your door.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {INFO.map((item) => {
              const Icon = item.icon;
              const inner = (
                <div className="flex h-full items-start gap-3 rounded-2xl border border-white/12 bg-white/[0.07] p-4 backdrop-blur-md transition-colors hover:bg-white/[0.12]">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-[color:var(--gold-light)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-medium uppercase tracking-wide text-white/50">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-[14px] leading-snug text-white/90">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
              return item.href ? (
                <a key={item.label} href={item.href} className="block">
                  {inner}
                </a>
              ) : (
                <div key={item.label}>{inner}</div>
              );
            })}
          </div>
        </div>

        {/* right: glassy callback form */}
        <div className="rounded-[26px] border border-white/15 bg-white/10 p-6 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-8">
          <h3 className="text-[20px] font-semibold text-white">
            Request a callback
          </h3>
          <p className="mt-1.5 text-[13.5px] text-white/60">
            Share your details and we&apos;ll call you back shortly.
          </p>

          {sent ? (
            <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-8 text-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[color:var(--gold)] text-[color:var(--maroon)]">
                <Check className="h-6 w-6" />
              </span>
              <p className="text-[15px] font-semibold text-white">
                Thanks, we&apos;ll be in touch!
              </p>
              <p className="text-[13px] text-white/60">
                Our care team will call you back within business hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="mt-6 flex flex-col gap-3.5"
            >
              <input
                required
                name="name"
                placeholder="Full name"
                className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[14px] text-white outline-none placeholder:text-white/45 focus:border-white/30 focus:bg-white/15"
              />
              <div className="grid gap-3.5 sm:grid-cols-2">
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[14px] text-white outline-none placeholder:text-white/45 focus:border-white/30 focus:bg-white/15"
                />
                <input
                  required
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[14px] text-white outline-none placeholder:text-white/45 focus:border-white/30 focus:bg-white/15"
                />
              </div>
              <textarea
                name="message"
                rows={4}
                placeholder="How can we help?"
                className="resize-none rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[14px] text-white outline-none placeholder:text-white/45 focus:border-white/30 focus:bg-white/15"
              />
              <button
                type="submit"
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#eccb7d] to-[#c69a3e] px-6 py-3.5 text-[15px] font-semibold text-[color:var(--maroon)] shadow-[0_12px_28px_-10px_rgba(198,154,62,0.8)] transition-transform hover:-translate-y-0.5"
              >
                Request my callback
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
