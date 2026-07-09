"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, MessageCircle, X, Send } from "lucide-react";

// TODO: replace with the real NADZ numbers
const PHONE = "+971501234567";
const WA_NUMBER = "971501234567";
const WA_LINK = `https://wa.me/${WA_NUMBER}`;

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.4L3 29l6.8-1.8c1.8 1 3.9 1.5 6 1.5C23.2 28.7 29 22.9 29 15.7 29 8.8 23.2 3 16 3Zm-3.9 6.5c.3 0 .5 0 .8.6.3.7.9 2.5 1 2.7.1.2.1.4 0 .6-.1.3-.1.4-.3.6-.2.2-.4.5-.5.6-.1.2-.3.4-.1.7.2.3.9 1.4 1.9 2.3 1.3 1.2 2.4 1.5 2.7 1.7.3.2.5.1.7-.1.2-.2.9-1 1.1-1.3.2-.4.4-.3.8-.2.3.1 2 1 2.3 1.1.4.2.6.3.7.4.1.1.1.8-.2 1.6-.3.8-1.7 1.5-2.3 1.6-.6.1-1.2.3-4.2-.9-3.6-1.4-5.8-5-6-5.2-.2-.2-1.4-1.9-1.4-3.6 0-1.7.9-2.6 1.2-2.9.3-.3.7-.4.9-.4h.7Z" />
    </svg>
  );
}

type Msg = { from: "bot" | "user"; text: string };

const GREETING: Msg = {
  from: "bot",
  text: "Hi! 👋 Welcome to NADZ Healthcare. How can we help you today?",
};

const QUICK = ["Book a visit", "Pricing", "Talk to a doctor"];

function botReply(text: string): string {
  const t = text.toLowerCase();
  if (/book|appointment|visit|schedule/.test(t))
    return "Great — I can help you book a home visit. Which area of Dubai are you in, and do you need a doctor, nurse, IV drip or lab test?";
  if (/pric|cost|fee|how much|charge/.test(t))
    return "Home doctor visits start from AED 350. Final pricing depends on the service — would you like a detailed quote?";
  if (/doctor|urgent|emergency|sick|pain|fever/.test(t))
    return "A NADZ doctor can reach you within ~30 minutes. Shall I arrange a callback right away?";
  if (/hi|hello|hey|salam|assalam/.test(t))
    return "Hello! 👋 How can we assist you with your home healthcare today?";
  if (/nurse|iv|drip|lab|blood|test|vaccin/.test(t))
    return "We offer nursing care, IV drips, home lab tests and vaccinations — all at your doorstep. What would you like to arrange?";
  return "Thanks for reaching out! A NADZ care coordinator will follow up shortly. Could you share a little more about what you need?";
}

export default function FloatingWidgets() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, open]);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    setMsgs((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "bot", text: botReply(text) }]);
    }, 800);
  };

  return (
    <>
      {/* chat panel */}
      {open && (
        <div className="fixed bottom-[92px] right-5 z-[80] flex w-[330px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_28px_60px_-20px_rgba(43,26,23,0.55)] ring-1 ring-black/10">
          {/* header */}
          <div className="flex items-center justify-between bg-[color:var(--maroon)] px-4 py-3.5 text-white">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <p className="text-[14px] font-semibold">NADZ Support</p>
                <span className="flex items-center gap-1.5 text-[11.5px] text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  Typically replies in minutes
                </span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-white/15"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* messages */}
          <div
            ref={bodyRef}
            className="flex max-h-[46vh] min-h-[220px] flex-col gap-2.5 overflow-y-auto bg-[#faf7f5] px-3.5 py-4"
          >
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-[13.5px] leading-snug ${
                  m.from === "bot"
                    ? "self-start rounded-bl-md bg-white text-[#2b1a17] shadow-sm ring-1 ring-black/5"
                    : "self-end rounded-br-md bg-[color:var(--maroon)] text-white"
                }`}
              >
                {m.text}
              </div>
            ))}
            {typing && (
              <div className="self-start rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 shadow-sm ring-1 ring-black/5">
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-black/30 [animation-delay:-0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-black/30 [animation-delay:-0.1s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-black/30" />
                </span>
              </div>
            )}

            {/* quick replies (only before the first user message) */}
            {msgs.length === 1 && !typing && (
              <div className="mt-1 flex flex-wrap gap-2">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full border border-[color:var(--maroon)]/25 bg-white px-3 py-1.5 text-[12.5px] font-medium text-[color:var(--maroon)] transition-colors hover:bg-[color:var(--cream)]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-black/5 bg-white px-3 py-2.5"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message…"
              className="min-w-0 flex-1 rounded-full bg-[#f3f0ee] px-4 py-2.5 text-[13.5px] text-[#2b1a17] outline-none placeholder:text-black/35 focus:ring-2 focus:ring-[color:var(--maroon)]/20"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[color:var(--maroon)] text-white transition-transform hover:scale-105 disabled:opacity-40"
              disabled={!input.trim()}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* floating buttons */}
      <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3 print:hidden">
        {/* Call */}
        <a
          href={`tel:${PHONE}`}
          aria-label="Call us"
          className="group flex items-center gap-2.5"
        >
          <span className="pointer-events-none translate-x-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-[#2b1a17] opacity-0 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4)] transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
            Call us
          </span>
          <span className="relative grid h-[52px] w-[52px] place-items-center rounded-full bg-[color:var(--maroon)] text-white shadow-[0_10px_24px_-8px_rgba(0,0,0,0.5)] ring-1 ring-white/20 transition-transform duration-200 hover:scale-105">
            <Phone className="h-5 w-5" />
          </span>
        </a>

        {/* WhatsApp */}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="group flex items-center gap-2.5"
        >
          <span className="pointer-events-none translate-x-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-[#2b1a17] opacity-0 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4)] transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
            WhatsApp
          </span>
          <span className="relative grid h-[52px] w-[52px] place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_24px_-8px_rgba(0,0,0,0.5)] ring-1 ring-white/20 transition-transform duration-200 hover:scale-105">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40" />
            <span className="relative">
              <WhatsAppIcon className="h-6 w-6" />
            </span>
          </span>
        </a>

        {/* Live chat — opens the in-page chatbox */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Live chat"
          aria-expanded={open}
          className="group flex items-center gap-2.5"
        >
          <span className="pointer-events-none translate-x-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-[#2b1a17] opacity-0 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4)] transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
            Live chat
          </span>
          <span className="relative grid h-[52px] w-[52px] place-items-center rounded-full bg-[color:var(--gold-dark)] text-white shadow-[0_10px_24px_-8px_rgba(0,0,0,0.5)] ring-1 ring-white/20 transition-transform duration-200 hover:scale-105">
            {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
          </span>
        </button>
      </div>
    </>
  );
}
