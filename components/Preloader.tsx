/* Full-screen brand preloader.

   Deliberately dependency-free: a server-rendered element with its critical
   layout in inline styles, dismissed by a small inline script. It must be
   correct at the very first paint, so it can't wait on the stylesheet (the
   Tailwind classes land later) or on React hydration (the app bundle can be
   many seconds away on a slow connection).

   The decorative breathing/sweep animations live in globals.css. If that
   arrives late the splash simply renders static, which is fine. */

const HOLD_MS = 700; // minimum on-screen time, so it reads rather than blinks
const CAP_MS = 2500; // hard ceiling, never sit in front of the content

const DISMISS = `
(function () {
  var el = document.getElementById('nadz-preloader');
  if (!el) return;
  var done = false;
  var start = Date.now();
  function hide() {
    if (done) return;
    done = true;
    el.style.opacity = '0';
    el.style.pointerEvents = 'none';
    setTimeout(function () { el.parentNode && el.parentNode.removeChild(el); }, 520);
  }
  function ready() {
    var wait = Math.max(0, ${HOLD_MS} - (Date.now() - start));
    setTimeout(hide, wait);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready, { once: true });
  } else {
    ready();
  }
  setTimeout(hide, ${CAP_MS});
})();
`;

export default function Preloader() {
  return (
    <>
      {/* No script means no way to dismiss it, so never show it. */}
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
          opacity: 1,
          transition: "opacity 0.5s ease-out",
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
