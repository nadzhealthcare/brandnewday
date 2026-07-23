"use client";

import { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";
import { waLink } from "@/lib/contact";
import { track } from "@/lib/analytics";

/* Lead form for the Doctor on Call landing page.

   Kept short on purpose — a paid-click form converts on fewer fields. There is
   no lead backend on this site, so submitting hands the enquiry to the team on
   WhatsApp exactly like every other form here, but WITHOUT the site's usual
   redirect to /thank-you (that page carries the full navbar/footer, which
   would undo the point of a bare landing page). Instead it opens WhatsApp in a
   new tab and confirms inline, so the visitor stays on the landing page.

   A "Source" line tags the enquiry so the team can tell a paid lead apart, and
   the submit fires a GA event for conversion measurement. */

const SOURCE = "Doctor on Call — Landing page";

export default function DoctorOnCallLead() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !phone.trim()) {
      setError("Please enter your name and phone number.");
      return;
    }

    track("generate_lead", { service: "doctor_on_call", source: "landing" });

    const lines = [
      "Hi NADZ, I'd like to request a doctor home visit.",
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      area.trim() ? `Area: ${area.trim()}` : null,
      notes.trim() ? `Details: ${notes.trim()}` : null,
      `Source: ${SOURCE}`,
    ].filter(Boolean) as string[];

    window.open(waLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const field =
    "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[15px] text-[#241417] outline-none transition-colors focus:border-[color:var(--maroon)]/60";
  const label = "mb-1.5 block text-[13px] font-semibold text-[#241417]";

  if (sent) {
    return (
      <div className="rounded-[24px] bg-white p-8 text-center shadow-[0_30px_70px_-30px_rgba(43,26,23,0.4)] ring-1 ring-black/[0.06]">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[color:var(--maroon)]/10 text-[color:var(--maroon)]">
          <Check className="h-7 w-7" strokeWidth={2.4} />
        </div>
        <h3 className="mt-5 font-title text-[1.5rem] uppercase text-[color:var(--maroon)]">
          Almost there
        </h3>
        <p className="mx-auto mt-2 max-w-xs text-[14.5px] leading-relaxed text-black/60">
          We&apos;ve opened WhatsApp with your details. Send the message and our
          care team will confirm your visit right away.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-[13.5px] font-semibold text-[color:var(--maroon)] underline underline-offset-4"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[24px] bg-white p-6 shadow-[0_30px_70px_-30px_rgba(43,26,23,0.4)] ring-1 ring-black/[0.06] sm:p-7">
      <div className="text-center">
        <h2 className="font-title text-[1.55rem] uppercase leading-none text-[color:var(--maroon)]">
          Request a visit
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-black/55">
          A DHA-certified doctor at your door, typically within 30 minutes.
        </p>
      </div>

      <form onSubmit={submit} className="mt-5 space-y-3.5">
        <div>
          <label className={label} htmlFor="lead-name">
            Full name <span className="text-[color:var(--maroon)]">*</span>
          </label>
          <input
            id="lead-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            className={field}
          />
        </div>

        <div>
          <label className={label} htmlFor="lead-phone">
            Phone <span className="text-[color:var(--maroon)]">*</span>
          </label>
          <input
            id="lead-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            inputMode="tel"
            placeholder="+971 5X XXX XXXX"
            autoComplete="tel"
            className={field}
          />
        </div>

        <div>
          <label className={label} htmlFor="lead-area">
            Area in Dubai
          </label>
          <input
            id="lead-area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="e.g. Downtown, Marina, JVC"
            className={field}
          />
        </div>

        <div>
          <label className={label} htmlFor="lead-notes">
            What do you need help with?
          </label>
          <textarea
            id="lead-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Symptoms, or the care you need (optional)"
            className={`${field} resize-none`}
          />
        </div>

        {error && (
          <p className="text-[13px] text-[color:var(--maroon)]">{error}</p>
        )}

        <button
          type="submit"
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--maroon)] px-6 py-3.5 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          Request my visit
        </button>

        <p className="flex items-center justify-center gap-1.5 pt-1 text-[12px] text-black/45">
          <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--maroon)]" />
          No payment now · confirm on WhatsApp
        </p>
      </form>
    </div>
  );
}
