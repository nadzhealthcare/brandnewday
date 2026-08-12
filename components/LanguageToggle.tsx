"use client";

import { useEffect, useState } from "react";

/* EN ⇄ العربية switch. Sets the `googtrans` cookie Google's widget reads, then
   reloads so the language is applied deterministically to the whole page (UI +
   CMS content) from a clean state. A reload is the most reliable way to force a
   specific language regardless of the widget's internal state, and the cookie
   makes the choice stick across pages. `notranslate` keeps Google from
   translating the button's own label. */

function readLang(): "en" | "ar" {
  if (typeof document === "undefined") return "en";
  const m = document.cookie.match(/googtrans=\/en\/(\w+)/);
  return m && m[1] === "ar" ? "ar" : "en";
}

export default function LanguageToggle({ light = false }: { light?: boolean }) {
  const [lang, setLang] = useState<"en" | "ar">("en");

  useEffect(() => setLang(readLang()), []);

  const toggle = () => {
    const next = lang === "en" ? "ar" : "en";
    const value = next === "ar" ? "/en/ar" : "/en/en";
    const host = location.hostname;
    // Set path- and domain-scoped variants so it sticks on any host (incl. localhost).
    ["", `;domain=${host}`, `;domain=.${host}`].forEach((scope) => {
      document.cookie = `googtrans=${value};path=/${scope}`;
    });
    const el = document.documentElement;
    el.setAttribute("dir", next === "ar" ? "rtl" : "ltr");
    el.setAttribute("lang", next);
    location.reload();
  };

  const tone = light
    ? "text-white ring-white/40 hover:bg-white/15"
    : "text-[color:var(--maroon)] ring-[color:var(--maroon)]/25 hover:bg-[color:var(--cream)]";

  return (
    <button
      type="button"
      onClick={toggle}
      lang={lang === "en" ? "ar" : "en"}
      aria-label={lang === "en" ? "Switch to Arabic" : "Switch to English"}
      className={`notranslate shrink-0 rounded-full px-3 py-2 text-[14px] font-semibold ring-1 transition-transform hover:-translate-y-0.5 ${tone}`}
    >
      {lang === "en" ? "العربية" : "EN"}
    </button>
  );
}
