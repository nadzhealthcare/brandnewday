"use client";

import { useEffect } from "react";

/* Loads Google's website-translate widget once and parks it in a hidden host.
   The widget rewrites every text node on the page client-side, so it covers
   both the hardcoded UI and the CMS (Strapi) content with no per-string work.

   We never show Google's own dropdown/banner (hidden in globals.css); the
   language is driven entirely by the `googtrans` cookie that LanguageToggle
   sets before reloading. On load the widget reads that cookie and applies the
   chosen language, which also makes the choice persist across navigations. */

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    // Injected by the Google script at runtime.
    google?: { translate?: { TranslateElement?: new (...a: unknown[]) => void } };
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = () => {
      const TE = window.google?.translate?.TranslateElement;
      if (TE) {
        new TE(
          { pageLanguage: "en", includedLanguages: "en,ar", autoDisplay: false },
          "google_translate_element",
        );
      }
    };

    const s = document.createElement("script");
    s.id = "google-translate-script";
    s.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(s);
  }, []);

  return <div id="google_translate_element" aria-hidden className="sr-only" />;
}
