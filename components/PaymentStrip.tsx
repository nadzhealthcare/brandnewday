/* Flexible-payment / benefits strip, sits flush under the hero.

   Tabby and Tamara are BNPL, Fazaa is the Ministry of Interior's cardholder
   benefits programme, so it carries different copy: a discount, not a way to
   pay. Each entry is gated by `live`, checkout can't process Tabby or Tamara
   until their keys land, so they render as "coming soon" rather than implying
   a payment method that would fail at the till. Flip to true once each is
   approved and configured. */

type Method = {
  src: string;
  alt: string;
  label: string;
  live: boolean;
  /* Tamara's wordmark is a bare glyph set, so it needs a touch more height
     than Tabby's self-contained badge to sit on the same optical baseline. */
  height: string;
};

const METHODS: Method[] = [
  {
    src: "/assets/pay-tabby.svg",
    alt: "Tabby",
    label: "Split in 4, interest-free",
    live: false,
    height: "h-[22px]",
  },
  {
    src: "/assets/pay-tamara.svg",
    alt: "Tamara",
    label: "Pay later, interest-free",
    live: false,
    height: "h-[15px]",
  },
  {
    /* Near-square crest with fine interior detail, so it needs more height
       than the two wordmarks before its lettering becomes legible. */
    src: "/assets/pay-fazaa.svg",
    alt: "Fazaa",
    label: "Cardholder benefits",
    live: true,
    height: "h-[34px]",
  },
];

export default function PaymentStrip() {
  return (
    <section
      aria-label="Flexible payment options"
      className="border-y border-black/[0.07] bg-[color:var(--cream)]/60"
    >
      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:justify-center lg:gap-8 lg:py-3.5">
        <p className="shrink-0 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[color:var(--maroon)]/55">
          Flexible payments
        </p>

        <ul className="flex min-w-0 flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:gap-x-8">
          {METHODS.map((m) => (
            <li key={m.alt} className="flex min-w-0 items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.src}
                alt={m.alt}
                className={`${m.height} w-auto shrink-0 ${m.live ? "" : "opacity-70"}`}
              />
              <span className="text-[13px] leading-tight text-black/55">
                {m.label}
                {!m.live && (
                  <span className="ml-1.5 whitespace-nowrap rounded-full bg-black/[0.06] px-1.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-black/40">
                    Soon
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
