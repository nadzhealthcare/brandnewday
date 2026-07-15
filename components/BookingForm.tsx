"use client";

import { useState } from "react";
import {
  SlidersHorizontal,
  UserPlus,
  Globe,
  LocateFixed,
  ArrowRight,
  LoaderCircle,
  ChevronDown,
} from "lucide-react";
import { waLink } from "@/lib/contact";

const SERVICES: string[] = [
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
  "NAD⁺ IV Therapy",
  "Peptide Therapy",
  "Other / Not sure",
];

export default function BookingForm() {
  const [service, setService] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [locating, setLocating] = useState(false);

  const detectLocation = () => {
    if (!("geolocation" in navigator)) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=16&addressdetails=1`,
            { headers: { Accept: "application/json" } },
          );
          const data = await res.json();
          setLocation(
            data?.display_name ??
              `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
          );
        } catch {
          setLocation(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
        } finally {
          setLocating(false);
        }
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const submit = () => {
    const lines = [
      "Hi NADZ, I'd like to book a home healthcare visit.",
      service ? `Service: ${service}` : null,
      name ? `Name: ${name}` : null,
      phone ? `Phone: +971 ${phone}` : null,
      location ? `Location: ${location}` : null,
    ].filter(Boolean);
    window.open(waLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex w-full flex-col gap-2 rounded-[20px] bg-white p-2 shadow-[0_20px_50px_-24px_rgba(43,26,23,0.5)] ring-1 ring-black/5 md:flex-row md:items-stretch md:gap-0 md:rounded-full">
      {/* service */}
      <label className="group flex flex-1 items-center gap-2.5 rounded-full px-4 py-2.5 md:border-r md:border-black/10">
        <SlidersHorizontal className="h-[18px] w-[18px] shrink-0 text-[color:var(--maroon)]" />
        <div className="relative w-full">
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={`w-full cursor-pointer appearance-none bg-transparent pr-5 text-[15px] outline-none ${
              service ? "text-[#241417]" : "text-black/45"
            }`}
            aria-label="Choose a service"
          >
            <option value="">Symptoms / Service</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
        </div>
      </label>

      {/* phone */}
      <div className="group flex items-center gap-2 rounded-full px-4 py-2.5 md:border-r md:border-black/10">
        <span className="text-[17px] leading-none" aria-hidden>
          🇦🇪
        </span>
        <span className="text-[15px] font-medium text-[#241417]">+971</span>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ""))}
          inputMode="numeric"
          maxLength={9}
          placeholder="50 123 4567"
          aria-label="Phone number"
          className="w-32 bg-transparent text-[15px] text-[#241417] outline-none placeholder:text-black/40"
        />
      </div>

      {/* name */}
      <label className="group flex flex-1 items-center gap-2.5 rounded-full px-4 py-2.5 md:border-r md:border-black/10">
        <UserPlus className="h-[18px] w-[18px] shrink-0 text-[color:var(--maroon)]" />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          aria-label="Your name"
          className="w-full bg-transparent text-[15px] text-[#241417] outline-none placeholder:text-black/45"
        />
      </label>

      {/* location */}
      <label className="group flex flex-1 items-center gap-2.5 rounded-full px-4 py-2.5">
        <Globe className="h-[18px] w-[18px] shrink-0 text-[color:var(--maroon)]" />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          aria-label="Location"
          className="w-full min-w-0 bg-transparent text-[15px] text-[#241417] outline-none placeholder:text-black/45"
        />
        <button
          type="button"
          onClick={detectLocation}
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
      </label>

      {/* submit */}
      <button
        type="button"
        onClick={submit}
        className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[color:var(--maroon)] px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#5a2029] md:px-7"
      >
        Book Healthcare
        <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5">
          <ArrowRight className="h-4 w-4" />
        </span>
      </button>
    </div>
  );
}
