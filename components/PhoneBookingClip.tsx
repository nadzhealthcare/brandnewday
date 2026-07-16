"use client";

import { useEffect, useRef, useState } from "react";
import { Lock, RotateCw, Pointer, Check } from "lucide-react";

const URL = "nadzhealthcare.com";
type Phase = "type" | "load" | "page" | "tap" | "booked";

export default function PhoneBookingClip() {
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<Phase>("type");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    let cancelled = false;
    const wait = (ms: number) =>
      new Promise<void>((r) => {
        const id = window.setTimeout(r, ms);
        timers.current.push(id);
      });

    const run = async () => {
      while (!cancelled) {
        setPhase("type");
        setTyped("");
        await wait(600);
        for (let i = 1; i <= URL.length; i++) {
          if (cancelled) return;
          setTyped(URL.slice(0, i));
          await wait(80);
        }
        await wait(500);
        if (cancelled) return;
        setPhase("load");
        await wait(850);
        if (cancelled) return;
        setPhase("page");
        await wait(950);
        if (cancelled) return;
        setPhase("tap");
        await wait(750);
        if (cancelled) return;
        setPhase("booked");
        await wait(1600);
        await wait(400);
      }
    };
    run();

    return () => {
      cancelled = true;
      timers.current.forEach((id) => clearTimeout(id));
      timers.current = [];
    };
  }, []);

  const showPage = phase === "page" || phase === "tap" || phase === "booked";
  const pressed = phase === "tap" || phase === "booked";

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(135deg,#5c2230,#2a0f13)",
      }}
    >
      {/* glow behind the phone */}
      <div className="absolute h-[70%] w-[45%] rounded-full bg-[#f2820a]/20 blur-2xl" />

      {/* phone */}
      <div className="relative aspect-[1/2] h-[92%] rounded-[16px] bg-black p-[3px] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)]">
        {/* notch */}
        <div className="absolute left-1/2 top-[5px] z-20 h-[4px] w-[26%] -translate-x-1/2 rounded-full bg-black" />
        {/* screen */}
        <div className="flex h-full w-full flex-col overflow-hidden rounded-[13px] bg-white">
          {/* browser chrome */}
          <div className="flex items-center gap-1 bg-[#ecedee] px-1.5 pb-1 pt-2.5">
            <Lock className="h-2 w-2 shrink-0 text-black/40" />
            <div className="flex h-3.5 flex-1 items-center overflow-hidden rounded-full bg-white px-1.5">
              <span className="truncate text-[7px] leading-none text-[#333]">
                {typed}
              </span>
              {phase === "type" && (
                <span className="ml-[1px] h-2 w-[1px] shrink-0 animate-pulse bg-[color:var(--maroon)]" />
              )}
            </div>
            <RotateCw
              className={`h-2 w-2 shrink-0 text-black/40 ${
                phase === "load" ? "animate-spin" : ""
              }`}
            />
          </div>

          {/* viewport */}
          <div className="relative flex-1 bg-white">
            {!showPage ? (
              <div className="flex h-full flex-col items-center justify-center gap-1 px-2">
                {phase === "load" ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/10 border-t-[color:var(--maroon)]" />
                ) : (
                  <span className="text-[7px] text-black/30">
                    {typed ? "Search or type URL" : ""}
                  </span>
                )}
              </div>
            ) : (
              <div className="flex h-full flex-col">
                {/* site header */}
                <div className="flex items-center justify-between bg-[color:var(--maroon)] px-2 py-1">
                  <span className="text-[7px] font-bold tracking-wide text-white">
                    NADZ
                  </span>
                  <span className="text-[7px] leading-none text-white/70">
                    ☰
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-2">
                  <p className="text-[8px] font-semibold leading-tight text-[#2b1a17]">
                    Home healthcare,
                    <br />
                    at your door.
                  </p>
                  <div
                    className="mt-1.5 h-8 w-full rounded-md bg-cover bg-center ring-1 ring-black/5"
                    style={{ backgroundImage: "url(/assets/doctor-on-call.webp)" }}
                  />
                  <button
                    className={`mt-auto w-full rounded-full py-1.5 text-center text-[7px] font-semibold text-white transition-all duration-200 ${
                      pressed
                        ? "scale-95 bg-[#3a1116] ring-2 ring-[color:var(--gold)]"
                        : "bg-[color:var(--maroon)]"
                    }`}
                  >
                    Book Home Visit
                  </button>
                </div>

                {/* booked confirmation */}
                {phase === "booked" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-white/92 backdrop-blur-[1px]">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#2fa060] text-white">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-[8px] font-semibold text-[#2b1a17]">
                      Visit booked!
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* tapping finger */}
            {(phase === "tap" || phase === "booked") && (
              <div
                className="pointer-events-none absolute left-[58%] top-[78%] transition-all duration-500"
                style={{ transform: pressed ? "scale(0.9)" : "scale(1)" }}
              >
                {phase === "tap" && (
                  <span className="absolute -left-2 -top-2 h-6 w-6 animate-ping rounded-full bg-[color:var(--gold)]/50" />
                )}
                <Pointer className="h-4 w-4 fill-white text-[#2b1a17] drop-shadow" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
