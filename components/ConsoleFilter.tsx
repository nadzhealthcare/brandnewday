"use client";

import { useEffect } from "react";

/**
 * Spline's bundled runtime logs a couple of benign, non-actionable messages
 * ("Missing property", THREE texture warnings) that surface in the Next.js dev
 * overlay as an "Issue". Filter only those exact third-party messages; every
 * other warning/error passes straight through untouched.
 */
const BENIGN = [
  "Missing property",
  "Texture marked for update but image is incomplete",
];

export default function ConsoleFilter() {
  useEffect(() => {
    const origError = console.error;
    const origWarn = console.warn;

    const wrap =
      (orig: (...a: unknown[]) => void) =>
      (...args: unknown[]) => {
        const msg = args
          .map((a) => (typeof a === "string" ? a : ""))
          .join(" ");
        if (BENIGN.some((b) => msg.includes(b))) return;
        orig(...args);
      };

    console.error = wrap(origError);
    console.warn = wrap(origWarn);

    return () => {
      console.error = origError;
      console.warn = origWarn;
    };
  }, []);

  return null;
}
