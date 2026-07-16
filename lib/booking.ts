import { waLink } from "./contact";

/* Shared by the hero booking bar and the /book page, so the service list and
   the message that reaches WhatsApp stay identical in both places. */

export const SERVICES: string[] = [
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

export type BookingFields = {
  service?: string;
  name?: string;
  phone?: string;
  location?: string;
  date?: string;
  time?: string;
  notes?: string;
};

/** WhatsApp deep link carrying whatever the patient filled in. */
export function bookingLink(f: BookingFields): string {
  const lines = [
    "Hi NADZ, I'd like to book a home healthcare visit.",
    f.service ? `Service: ${f.service}` : null,
    f.name ? `Name: ${f.name}` : null,
    f.phone ? `Phone: +971 ${f.phone}` : null,
    f.location ? `Location: ${f.location}` : null,
    f.date ? `Preferred date: ${f.date}` : null,
    f.time ? `Preferred time: ${f.time}` : null,
    f.notes ? `Notes: ${f.notes}` : null,
  ].filter(Boolean);
  return waLink(lines.join("\n"));
}

/** Reverse-geocodes the browser's position to a readable address. Resolves to
    null if the patient blocks the prompt or the device can't get a fix. */
export async function detectLocation(): Promise<string | null> {
  if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
    return null;
  }
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const coords = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=16&addressdetails=1`,
            { headers: { Accept: "application/json" } },
          );
          const data = await res.json();
          resolve(data?.display_name ?? coords);
        } catch {
          resolve(coords);
        }
      },
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  });
}
