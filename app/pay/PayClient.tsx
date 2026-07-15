"use client";

import { useState } from "react";
import {
  CreditCard,
  ShieldCheck,
  Lock,
  Loader2,
  ChevronDown,
} from "lucide-react";
import type { PayData } from "@/lib/paylink";

function AppleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.42 2.2-1.13 2.99-.85.95-2.24 1.68-3.38 1.59-.14-1.11.42-2.28 1.08-3.01.75-.83 2.1-1.47 3.15-1.57.02.01.28 0 .28 0Zm3.5 16.36c-.5 1.16-.74 1.68-1.39 2.71-.9 1.43-2.17 3.21-3.75 3.22-1.4.01-1.76-.92-3.66-.91-1.9.01-2.3.93-3.7.91-1.58-.01-2.78-1.62-3.68-3.05-2.52-4-2.79-8.69-1.23-11.18 1.1-1.77 2.85-2.8 4.49-2.8 1.67 0 2.72.92 4.1.92 1.34 0 2.16-.92 4.09-.92 1.46 0 3.01.8 4.11 2.17-3.61 1.98-3.02 7.13.32 8.83Z" />
    </svg>
  );
}

function TabbyMark() {
  return (
    <span className="rounded bg-[#3bffa0] px-1.5 py-0.5 text-[13px] font-extrabold tracking-tight text-[#0b0b0b]">
      tabby
    </span>
  );
}

function TamaraMark() {
  return (
    <span className="text-[15px] font-extrabold tracking-tight text-[#ff7a7a]">
      tamara
    </span>
  );
}

function rejectionMessage(reason: string): string {
  switch (reason) {
    case "order_amount_too_high":
      return "This amount is above Tabby's limit, please pay by card.";
    case "order_amount_too_low":
      return "This amount is below Tabby's minimum, please pay by card.";
    default:
      return "Tabby isn't available for this order, please pay by card.";
  }
}

export default function PayClient({
  refToken,
  data,
  stripeReady,
  tabbyReady,
}: {
  refToken: string;
  data: PayData | null;
  stripeReady: boolean;
  tabbyReady: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tabby buyer step
  const [tabbyOpen, setTabbyOpen] = useState(false);
  const [tabbyLoading, setTabbyLoading] = useState(false);
  const [tabbyMsg, setTabbyMsg] = useState<string | null>(null);
  const [name, setName] = useState(data?.n ?? "");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(data?.p ?? "");

  const payWithCard = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ref: refToken }),
      });
      const json = await res.json();
      if (!res.ok || !json.url) {
        throw new Error(json.error || "Could not start checkout");
      }
      window.location.href = json.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
    }
  };

  const payWithTabby = async () => {
    setTabbyMsg(null);
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setTabbyMsg("Please enter your name, email and phone.");
      return;
    }
    setTabbyLoading(true);
    try {
      const res = await fetch("/api/checkout/tabby", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ref: refToken, name, email, phone }),
      });
      const json = await res.json();
      if (json.url) {
        window.location.href = json.url;
        return;
      }
      setTabbyMsg(
        json.rejected
          ? rejectionMessage(json.reason)
          : json.error || "Could not start Tabby checkout",
      );
    } catch {
      setTabbyMsg("Something went wrong, please try card.");
    }
    setTabbyLoading(false);
  };

  const amountLabel =
    data &&
    new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: data.c || "AED",
      minimumFractionDigits: data.a % 1 === 0 ? 0 : 2,
    }).format(data.a);

  const field =
    "w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-[14px] text-[#241417] outline-none transition-colors focus:border-[color:var(--maroon)]/50";

  return (
    <main className="grid min-h-[100svh] place-items-center bg-[color:var(--cream)] px-4 py-10">
      <div className="w-full max-w-[440px]">
        {/* brand */}
        <div className="mb-6 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-nadz.svg"
            alt="NADZ Healthcare"
            className="mx-auto h-10 w-auto"
          />
        </div>

        <div className="overflow-hidden rounded-[26px] bg-white shadow-[0_30px_70px_-30px_rgba(43,26,23,0.4)] ring-1 ring-black/5">
          {!data ? (
            <div className="p-8 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[color:var(--maroon)]/10 text-[color:var(--maroon)]">
                <Lock className="h-7 w-7" />
              </div>
              <h1 className="mt-5 text-[20px] font-semibold text-[#241417]">
                This payment link is invalid
              </h1>
              <p className="mx-auto mt-2 max-w-xs text-[14px] leading-relaxed text-black/55">
                The link may be broken or expired. Please request a new payment
                link from the NADZ team.
              </p>
            </div>
          ) : (
            <>
              {/* amount header */}
              <div
                className="px-8 pb-7 pt-8 text-center text-white"
                style={{ backgroundImage: "linear-gradient(150deg,#4a1c20,#6C2A37)" }}
              >
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[color:var(--gold-light)]">
                  Amount to pay
                </p>
                <p className="mt-2 font-title text-[2.6rem] leading-none">
                  {amountLabel}
                </p>
                {data.d && (
                  <p className="mt-3 text-[14px] text-white/70">{data.d}</p>
                )}
                {data.n && (
                  <p className="mt-1 text-[13px] text-white/50">for {data.n}</p>
                )}
              </div>

              {/* methods */}
              <div className="space-y-3 p-6">
                <p className="text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-black/40">
                  Choose a payment method
                </p>

                <button
                  type="button"
                  onClick={payWithCard}
                  disabled={loading || !stripeReady}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[color:var(--maroon)] px-5 py-4 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      Card
                      <span className="text-white/50">/</span>
                      <AppleIcon className="h-4 w-4" />
                      <span>Pay</span>
                    </>
                  )}
                </button>

                {/* Tabby */}
                {tabbyReady ? (
                  <div className="overflow-hidden rounded-2xl border border-black/10">
                    <button
                      type="button"
                      onClick={() => setTabbyOpen((o) => !o)}
                      className="flex w-full items-center justify-between bg-[#f5f4f2] px-5 py-4 text-[14px] font-medium text-[#241417]"
                    >
                      <span className="flex items-center gap-2">
                        <TabbyMark /> Split in 4 · interest-free
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-black/40 transition-transform ${
                          tabbyOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {tabbyOpen && (
                      <div className="space-y-2.5 border-t border-black/10 bg-white p-4">
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Full name"
                          className={field}
                        />
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          placeholder="Email"
                          className={field}
                        />
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          type="tel"
                          placeholder="Phone (e.g. +9715…)"
                          className={field}
                        />
                        <button
                          type="button"
                          onClick={payWithTabby}
                          disabled={tabbyLoading}
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3bffa0] px-5 py-3 text-[14px] font-bold text-[#0b0b0b] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                        >
                          {tabbyLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Continue with Tabby"
                          )}
                        </button>
                        {tabbyMsg && (
                          <p className="text-center text-[12.5px] text-[color:var(--maroon)]">
                            {tabbyMsg}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="flex w-full items-center justify-between rounded-2xl border border-black/10 bg-[#f5f4f2] px-5 py-4 text-[14px] font-medium text-black/50"
                  >
                    <span className="flex items-center gap-2">
                      <TabbyMark /> Split in 4 · interest-free
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-black/35">
                      Soon
                    </span>
                  </button>
                )}

                {/* Tamara, enabled once its keys land */}
                <button
                  type="button"
                  disabled
                  className="flex w-full items-center justify-between rounded-2xl border border-black/10 bg-[#f5f4f2] px-5 py-4 text-[14px] font-medium text-black/50"
                >
                  <span className="flex items-center gap-2">
                    <TamaraMark /> Pay later · interest-free
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-black/35">
                    Soon
                  </span>
                </button>

                {!stripeReady && (
                  <p className="text-center text-[12.5px] text-[color:var(--maroon)]">
                    Card payments aren&apos;t configured yet.
                  </p>
                )}
                {error && (
                  <p className="text-center text-[12.5px] text-red-600">{error}</p>
                )}
              </div>

              {/* trust footer */}
              <div className="flex items-center justify-center gap-2 border-t border-black/5 px-6 py-4 text-[12px] text-black/45">
                <ShieldCheck className="h-4 w-4 text-[color:var(--maroon)]" />
                Secure payment
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
