"use client";

import { useState } from "react";
import { Link2, Copy, Check, Loader2, MessageCircle } from "lucide-react";

export default function NewLinkClient() {
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    setError(null);
    setLink(null);
    setLoading(true);
    try {
      const res = await fetch("/api/paylink", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, amount, description, name, phone }),
      });
      const json = await res.json();
      if (!res.ok || !json.url) throw new Error(json.error || "Failed");
      setLink(json.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const waHref = link
    ? `https://wa.me/${phone.replace(/[^\d]/g, "") || ""}?text=${encodeURIComponent(
        `Hi${name ? " " + name : ""}, here's your secure NADZ payment link:\n${link}`,
      )}`
    : "#";

  const field =
    "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[15px] text-[#241417] outline-none transition-colors focus:border-[color:var(--maroon)]/50";

  return (
    <main className="grid min-h-[100svh] place-items-center bg-[color:var(--cream)] px-4 py-10">
      <div className="w-full max-w-[460px]">
        <div className="mb-5 flex items-center justify-center gap-2 text-[color:var(--maroon)]">
          <Link2 className="h-5 w-5" />
          <h1 className="font-title text-[22px] uppercase">Create Payment Link</h1>
        </div>

        <div className="space-y-3 rounded-[24px] bg-white p-6 shadow-[0_30px_70px_-30px_rgba(43,26,23,0.4)] ring-1 ring-black/5">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Staff password"
            className={field}
            autoComplete="off"
          />
          <div className="flex items-center gap-2">
            <span className="rounded-xl border border-black/10 bg-[#f5f4f2] px-4 py-3 text-[15px] font-semibold text-black/60">
              AED
            </span>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
              inputMode="decimal"
              placeholder="Amount"
              className={field}
            />
          </div>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (e.g. IV Drip — home visit)"
            className={field}
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Customer name (optional)"
            className={field}
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Customer WhatsApp/phone (optional)"
            className={field}
          />

          <button
            type="button"
            onClick={generate}
            disabled={loading || !password || !amount}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--maroon)] px-5 py-3.5 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Generate link"}
          </button>

          {error && <p className="text-center text-[13px] text-red-600">{error}</p>}

          {link && (
            <div className="mt-2 rounded-xl border border-[color:var(--gold)]/30 bg-[#fbf8f0] p-4">
              <p className="break-all text-[13px] text-black/70">{link}</p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[color:var(--maroon)] px-4 py-2.5 text-[13.5px] font-semibold text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy"}
                </button>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-[13.5px] font-semibold text-white"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
