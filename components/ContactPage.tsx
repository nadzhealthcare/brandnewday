"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  Check,
  Loader2,
} from "lucide-react";
import SectionTitle from "./SectionTitle";
import { waLink } from "@/lib/contact";

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
    value: "9AM-6PM | Monday – Saturday",
  },
];

const SERVICES = [
  "Doctor on Call",
  "Nursing Care",
  "Elderly Care",
  "Mother & Baby Care",
  "Physiotherapy at Home",
  "IV Drips",
  "Labs at Home",
  "Vaccination at Home",
  "Medical Tourism",
  "NADZ Vital Brain",
  "Autonomic Control",
  "Wellness & Longevity",
  "Other / Not sure",
];

const MAP_SRC =
  "https://maps.google.com/maps?q=" +
  encodeURIComponent("Armada Tower 2, JLT, Dubai") +
  "&z=15&output=embed";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    address: "",
    service: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const lines = [
      "Hi NADZ, I'd like to request a home visit / get in touch.",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : null,
      form.age ? `Age: ${form.age}` : null,
      form.gender ? `Gender: ${form.gender}` : null,
      form.address ? `Address for visit: ${form.address}` : null,
      form.service ? `Required service: ${form.service}` : null,
    ].filter(Boolean);
    window.open(waLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setLoading(false);
    setSent(true);
  };

  const field =
    "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[15px] text-[#241417] outline-none transition-colors focus:border-[color:var(--maroon)]/50";
  const label = "text-[13px] font-semibold text-[#241417]";

  return (
    <div className="bg-white">
      {/* hero band */}
      <section
        className="relative overflow-hidden px-4 pb-14 pt-28 text-center sm:px-6 sm:pb-16 sm:pt-36"
        style={{ backgroundImage: "linear-gradient(135deg,#3d1622,#611f2e)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgba(160,26,38,0.35),transparent_60%)]" />
        <div className="relative">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/50">
            NADZ Healthcare
          </p>
          <SectionTitle
            as="h1"
            className="mt-4 text-[2.2rem] leading-[1.05] text-white sm:text-[3.2rem]"
          >
            Contact Us
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-2xl text-[15.5px] leading-relaxed text-white/65">
            Reach the NADZ care team, we&apos;re here around the clock, every day
            of the week.
          </p>
        </div>
      </section>

      {/* content */}
      <section className="px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-[1180px] items-start gap-8 lg:grid-cols-2">
          {/* left: contact information + map */}
          <div>
            <SectionTitle className="text-[1.6rem] text-[color:var(--maroon)] sm:text-[2rem]">
              Contact Information
            </SectionTitle>

            <div className="mt-6 space-y-3">
              {INFO.map((item) => {
                const Icon = item.icon;
                const inner = (
                  <div className="flex items-start gap-4 rounded-2xl bg-white p-4 ring-1 ring-black/5 transition-shadow hover:shadow-[0_18px_40px_-30px_rgba(43,26,23,0.5)]">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[color:var(--maroon)]/8 text-[color:var(--maroon)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium text-black/45">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-[15px] leading-snug text-[#241417]">
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

            {/* map */}
            <div className="mt-4 overflow-hidden rounded-[22px] ring-1 ring-black/5">
              <iframe
                src={MAP_SRC}
                title="NADZ Healthcare location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full border-0"
              />
            </div>
          </div>

          {/* right: form */}
          <div className="rounded-[26px] bg-white p-6 shadow-[0_30px_70px_-40px_rgba(43,26,23,0.45)] ring-1 ring-black/5 sm:p-8">
            {sent ? (
              <div className="flex flex-col items-center gap-3 py-14 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-[#2fa060]/12 text-[#2fa060]">
                  <Check className="h-7 w-7" />
                </span>
                <h3 className="text-[19px] font-semibold text-[#241417]">
                  Thank you!
                </h3>
                <p className="max-w-xs text-[14px] leading-relaxed text-black/55">
                  Your request has been sent, our care team will be in touch
                  shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-2 text-[13.5px] font-semibold text-[color:var(--maroon)] underline"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className={label}>
                    Name <span className="text-[color:var(--maroon)]">*</span>
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Your full name"
                    className={`mt-1.5 ${field}`}
                  />
                </div>
                <div>
                  <label className={label}>
                    Phone <span className="text-[color:var(--maroon)]">*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="+971 50 123 4567"
                    className={`mt-1.5 ${field}`}
                  />
                </div>
                <div>
                  <label className={label}>Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="your@email.com"
                    className={`mt-1.5 ${field}`}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={label}>
                      Age <span className="text-[color:var(--maroon)]">*</span>
                    </label>
                    <input
                      required
                      inputMode="numeric"
                      value={form.age}
                      onChange={(e) =>
                        set("age")({
                          target: { value: e.target.value.replace(/[^\d]/g, "") },
                        })
                      }
                      className={`mt-1.5 ${field}`}
                    />
                  </div>
                  <div>
                    <label className={label}>
                      Gender <span className="text-[color:var(--maroon)]">*</span>
                    </label>
                    <select
                      required
                      value={form.gender}
                      onChange={set("gender")}
                      className={`mt-1.5 ${field} ${form.gender ? "" : "text-black/45"}`}
                    >
                      <option value="">Select…</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={label}>
                    Address for Visit{" "}
                    <span className="text-[color:var(--maroon)]">*</span>
                  </label>
                  <input
                    required
                    value={form.address}
                    onChange={set("address")}
                    placeholder="Where should we visit you?"
                    className={`mt-1.5 ${field}`}
                  />
                </div>
                <div>
                  <label className={label}>
                    Required Service{" "}
                    <span className="text-[color:var(--maroon)]">*</span>
                  </label>
                  <select
                    required
                    value={form.service}
                    onChange={set("service")}
                    className={`mt-1.5 ${field} ${form.service ? "" : "text-black/45"}`}
                  >
                    <option value="">Select…</option>
                    {SERVICES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--maroon)] px-6 py-3.5 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Send
                      <ArrowUpRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
