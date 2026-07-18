/* Full-screen brand preloader.

   Must be correct at the very first paint, so it can't wait on the stylesheet
   (Tailwind classes land later) or on React hydration (the app bundle can be
   seconds away on a slow connection). Hence: server-rendered markup, critical
   layout in inline styles, dismissed by a small inline script.

   The script must NOT remove or restyle the element directly. It's part of the
   React tree, so hydration would just put it back and the splash would stick.
   Instead the script sets a data attribute on <html>, which React doesn't
   manage, and a scoped <style> hides the overlay off that attribute. React can
   re-render the node as much as it likes, it stays hidden either way. */

const HOLD_MS = 700; // minimum on-screen time, so it reads rather than blinks
const CAP_MS = 2500; // hard ceiling, never sit in front of the content

const HIDE_CSS = `
#nadz-preloader{opacity:1;visibility:visible;transition:opacity .5s ease-out,visibility 0s linear .5s}
html[data-nadz-ready] #nadz-preloader{opacity:0;visibility:hidden;pointer-events:none}
`;

const DISMISS = `
(function () {
  var d = document, root = d.documentElement, start = Date.now();
  function ready() {
    setTimeout(function () { root.setAttribute('data-nadz-ready', ''); },
      Math.max(0, ${HOLD_MS} - (Date.now() - start)));
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', ready, { once: true });
  else ready();
  setTimeout(function () { root.setAttribute('data-nadz-ready', ''); }, ${CAP_MS});
})();
`;

export default function Preloader() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HIDE_CSS }} />

      {/* No script means nothing can dismiss it, so never show it. */}
      <noscript>
        <style>{`#nadz-preloader{display:none !important}`}</style>
      </noscript>

      <div
        id="nadz-preloader"
        role="status"
        aria-label="Loading NADZ Healthcare"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          padding: "0 24px",
          backgroundImage:
            "linear-gradient(135deg, #331828 0%, #6C2A37 50%, #331828 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/preloader.svg"
          alt="NADZ Healthcare"
          width={165}
          height={53}
          className="nadz-preload-mark"
          style={{ width: "min(196px, 52vw)", height: "auto" }}
        />

        {/* progress rail with a gold sweep */}
        <div
          style={{
            position: "relative",
            height: "3px",
            width: "132px",
            overflow: "hidden",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.12)",
          }}
        >
          <span
            className="nadz-preload-sweep"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: "33%",
              borderRadius: "999px",
              backgroundImage:
                "linear-gradient(90deg, transparent, #eacf8a, transparent)",
            }}
          />
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: DISMISS }} />
    </>
  );
}
