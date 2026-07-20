"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SlidersHorizontal,
  UserPlus,
  Globe,
  LocateFixed,
  LoaderCircle,
  ChevronDown,
  CalendarDays,
  Clock,
  MessageSquare,
  Phone,
  ShieldCheck,
  Timer,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import SectionTitle from "./SectionTitle";
import {
  SERVICES,
  bookingLink,
  detectLocation,
  handOffToWhatsApp,
} from "@/lib/booking";

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

const ASSURANCES: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Timer,
    title: "At your door in 30 minutes",
    desc: "Typical arrival time anywhere across Dubai.",
  },
  {
    icon: ShieldCheck,
    title: "DHA-licensed clinicians",
    desc: "Every doctor and nurse is certified by the Dubai Health Authority.",
  },
  {
    icon: Clock,
    title: "Available 24/7",
    desc: "Evenings, weekends and public holidays included.",
  },
];

const FIELD =
  "w-full bg-transparent text-[15px] text-[#241417] outline-none placeholder:text-black/40";
const SHELL =
  "flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 ring-1 ring-black/10 transition-colors focus-within:ring-[color:var(--maroon)]/45";
const LABEL =
  "mb-1.5 block text-[12.5px] font-semibold uppercase tracking-[0.1em] text-black/45";

export default function BookAppointment() {
  const [service, setService] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const locate = async () => {
    setLocating(true);
    const found = await detectLocation();
    if (found) setLocation(found);
    setLocating(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Name and phone are what the care team actually needs to call back.
    if (!name.trim() || !phone.trim()) {
      setError("Please add your name and phone number so we can confirm.");
      return;
    }
    setError(null);
    handOffToWhatsApp(
      bookingLink({ service, name, phone, location, date, time, notes }),
    );
  };

  return (
    <div className="bg-white">
      {/* header band, also gives the navbar something dark to sit on */}
      <section
        className="relative overflow-hidden px-4 pb-14 pt-28 text-center sm:px-6 sm:pb-16 sm:pt-36"
        style={{ backgroundImage: "linear-gradient(135deg,#3d1622,#611f2e)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgba(160,26,38,0.35),transparent_60%)]" />
        <div className="relative">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/50">
            Book a home visit
          </p>
          <SectionTitle
            as="h1"
            className="mt-4 text-[2.2rem] leading-[1.05] text-white sm:text-[3.2rem]"
          >
            Book an Appointment
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-2xl text-[15.5px] leading-relaxed text-white/65">
            Fill in a few details and we&apos;ll continue on WhatsApp to confirm
            your visit, usually within minutes.
          </p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            {/* form */}
            <form
              onSubmit={submit}
              className="rounded-[26px] bg-[#faf8f5] p-5 ring-1 ring-black/5 sm:p-7"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="bk-service" className={LABEL}>
                    Symptoms / Service
                  </label>
                  <div className={SHELL}>
                    <SlidersHorizontal className="h-[18px] w-[18px] shrink-0 text-[color:var(--maroon)]" />
                    <div className="relative w-full">
                      <select
                        id="bk-service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className={`${FIELD} cursor-pointer appearance-none pr-5 ${
                          service ? "" : "text-black/40"
                        }`}
                      >
                        <option value="">Choose a service</option>
                        {SERVICES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="bk-name" className={LABEL}>
                    Your name
                  </label>
                  <div className={SHELL}>
                    <UserPlus className="h-[18px] w-[18px] shrink-0 text-[color:var(--maroon)]" />
                    <input
                      id="bk-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className={FIELD}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="bk-phone" className={LABEL}>
                    Phone
                  </label>
                  <div className={SHELL}>
                    <span className="text-[17px] leading-none" aria-hidden>
                      🇦🇪
                    </span>
                    <span className="text-[15px] font-medium text-[#241417]">
                      +971
                    </span>
                    <input
                      id="bk-phone"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/[^\d]/g, ""))
                      }
                      inputMode="numeric"
                      maxLength={9}
                      placeholder="50 123 4567"
                      className={FIELD}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="bk-location" className={LABEL}>
                    Location
                  </label>
                  <div className={SHELL}>
                    <Globe className="h-[18px] w-[18px] shrink-0 text-[color:var(--maroon)]" />
                    <input
                      id="bk-location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Address, hotel or area in Dubai"
                      className={`${FIELD} min-w-0`}
                    />
                    <button
                      type="button"
                      onClick={locate}
                      title="Detect my location"
                      aria-label="Detect my location"
                      className="shrink-0 rounded-full p-1.5 text-[color:var(--maroon)] transition-colors hover:bg-[color:var(--maroon)]/10"
                    >
                      {locating ? (
                        <LoaderCircle className="h-[18px] w-[18px] animate-spin" />
                      ) : (
                        <LocateFixed className="h-[18px] w-[18px]" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="bk-date" className={LABEL}>
                    Preferred date
                  </label>
                  <div className={SHELL}>
                    <CalendarDays className="h-[18px] w-[18px] shrink-0 text-[color:var(--maroon)]" />
                    <input
                      id="bk-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`${FIELD} cursor-pointer`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="bk-time" className={LABEL}>
                    Preferred time
                  </label>
                  <div className={SHELL}>
                    <Clock className="h-[18px] w-[18px] shrink-0 text-[color:var(--maroon)]" />
                    <input
                      id="bk-time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className={`${FIELD} cursor-pointer`}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="bk-notes" className={LABEL}>
                    Anything we should know
                  </label>
                  <div className={`${SHELL} items-start`}>
                    <MessageSquare className="mt-1 h-[18px] w-[18px] shrink-0 text-[color:var(--maroon)]" />
                    <textarea
                      id="bk-notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      placeholder="Symptoms, patient age, or any access details"
                      className={`${FIELD} resize-none`}
                    />
                  </div>
                </div>
              </div>

              {error && (
                <p className="mt-4 text-[13px] font-medium text-[color:var(--maroon)]">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="group mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-[color:var(--maroon)] px-6 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#5a2029]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Book on WhatsApp
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>

              <p className="mt-3 text-center text-[12.5px] text-black/45">
                Opens WhatsApp with your details filled in, nothing is sent until
                you press send.
              </p>
            </form>

            {/* assurances */}
            <aside className="flex flex-col gap-3">
              {ASSURANCES.map((a) => {
                const Icon = a.icon;
                return (
                  <div
                    key={a.title}
                    className="flex items-start gap-4 rounded-[22px] bg-[#faf8f5] p-5 ring-1 ring-black/5"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-[color:var(--maroon)] ring-1 ring-black/5">
                      <Icon className="h-[22px] w-[22px]" strokeWidth={1.6} />
                    </span>
                    <div>
                      <h2 className="text-[15px] font-semibold text-[#1c1c1c]">
                        {a.title}
                      </h2>
                      <p className="mt-1 text-[13px] leading-relaxed text-black/55">
                        {a.desc}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div
                className="rounded-[22px] p-6 text-center text-white"
                style={{
                  backgroundImage: "linear-gradient(150deg,#4a1c20,#6C2A37)",
                }}
              >
                <p className="text-[13px] text-white/60">Prefer to talk?</p>
                <Link
                  href="tel:80046239"
                  className="mt-2 inline-flex items-center gap-2.5 text-[20px] font-bold text-[color:var(--gold-light)] transition-transform hover:-translate-y-0.5"
                >
                  <Phone className="h-5 w-5" />
                  800 4 NADZ
                </Link>
                <p className="mt-2 text-[12.5px] text-white/45">
                  24/7 hotline · 800 4 6239
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
