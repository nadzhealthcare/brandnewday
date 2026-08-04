import Link from "next/link";
import {
  Check,
  ShieldCheck,
  Lock,
  Clock,
  FlaskConical,
  Dna,
  Microscope,
  ScanLine,
  Droplet,
  MessageCircle,
  Phone,
  ArrowRight,
  CircleCheck,
  Sparkles,
} from "lucide-react";
import SectionTitle from "./SectionTitle";
import HowItWorks from "./HowItWorks";

/* Dedicated biotech-styled body for the STD & Sexual Health page. Registered as
   a CUSTOM_BODY, so it renders below the standard PageHero (which is kept as-is)
   in place of the shared ServiceBody. Content — panels and organisms — comes
   from the NADZ STD Panels sheet; sample type is urine / UTM swab, RT-PCR. */

/* diagonal light streak that glides across a card on hover (matches the rest
   of the site's card treatment) */
function Glare() {
  return (
    <span className="pointer-events-none absolute inset-y-0 left-[-70%] w-1/2 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent blur-[1px] transition-[left] duration-[800ms] ease-in-out group-hover:left-[140%]" />
  );
}

type Pkg = {
  code: string;
  params: number;
  price: number;
  tag: string;
  blurb: string;
  points: string[];
  featured?: boolean;
};

const PACKAGES: Pkg[] = [
  {
    code: "STD 7",
    params: 7,
    price: 699,
    tag: "Targeted",
    blurb: "A focused RT-PCR panel — pick the group that fits your concern.",
    points: [
      "Choose Standard, Candida, Genital Ulcer or Vaginitis",
      "7 high-yield pathogens per panel",
      "Ideal for a specific symptom or exposure",
    ],
  },
  {
    code: "STD 14",
    params: 14,
    price: 1199,
    tag: "Most chosen",
    blurb: "Broader coverage across the common bacterial, viral and ulcer causes.",
    points: [
      "14 parameters in a single collection",
      "Standard + genital-ulcer pathogens",
      "A well-rounded routine screen",
    ],
  },
  {
    code: "STD 28",
    params: 28,
    price: 1899,
    tag: "Complete screen",
    featured: true,
    blurb: "Our most comprehensive panel — the full spectrum in one test.",
    points: [
      "All 28 parameters, nothing left out",
      "Bacterial, viral, fungal & BV markers",
      "Maximum reassurance in one visit",
    ],
  },
];

type Panel = { name: string; note: string; items: string[] };

const PANELS: Panel[] = [
  {
    name: "Standard",
    note: "Core bacterial & protozoal STIs",
    items: [
      "Chlamydia Trachomatis",
      "Neisseria Gonorrhoeae",
      "Mycoplasma Genitalium",
      "Mycoplasma Hominis",
      "Trichomonas Vaginalis",
      "Ureaplasma Parvum",
      "Ureaplasma Urealyticum",
    ],
  },
  {
    name: "Candida",
    note: "Fungal / yeast species",
    items: [
      "Candida Albicans",
      "Candida Glabrata",
      "Candida Tropicalis",
      "Candida Parapsilosis",
      "Candida Krusei",
      "Candida Lusitaniae",
      "Candida Dubliniensis",
    ],
  },
  {
    name: "Genital Ulcer",
    note: "Viral & ulcer-causing pathogens",
    items: [
      "Herpes Simplex Virus 1",
      "Herpes Simplex Virus 2",
      "Cytomegalovirus",
      "Varicella-Zoster Virus",
      "Chlamydia Trachomatis LGV",
      "Treponema Pallidum",
      "Haemophilus Ducreyi",
    ],
  },
  {
    name: "Vaginitis",
    note: "Bacterial vaginosis markers",
    items: [
      "Gardnerella Vaginalis",
      "Atopobium Vaginae",
      "Megasphaera type 1",
      "BV-associated bacteria 2",
      "Mobiluncus spp",
      "Bacteroides Fragilis",
      "Lactobacillus spp",
    ],
  },
];

/* Full inclusion lists for the combined panels, from the NADZ STD Panels sheet. */
const STD14: string[] = [
  "Chlamydia Trachomatis",
  "Neisseria Gonorrhoeae",
  "Mycoplasma Genitalium",
  "Mycoplasma Hominis",
  "Trichomonas Vaginalis",
  "Varicella-Zoster Virus",
  "Chlamydia Trachomatis LGV",
  "Treponema Pallidum",
  "Haemophilus Ducreyi",
  "Herpes Simplex Virus 1",
  "Herpes Simplex Virus 2",
  "Cytomegalovirus",
  "Ureaplasma Parvum",
  "Ureaplasma Urealyticum",
];

const STD28: string[] = [
  "Chlamydia Trachomatis",
  "Neisseria Gonorrhoeae",
  "Mycoplasma Genitalium",
  "Mycoplasma Hominis",
  "Trichomonas Vaginalis",
  "Varicella-Zoster Virus",
  "Chlamydia Trachomatis LGV",
  "Treponema Pallidum",
  "Haemophilus Ducreyi",
  "Gardnerella Vaginalis",
  "Atopobium Vaginae",
  "Megasphaera type 1",
  "BV-associated bacteria 2",
  "Mobiluncus spp",
  "Lactobacillus spp",
  "Herpes Simplex Virus 1",
  "Herpes Simplex Virus 2",
  "Cytomegalovirus",
  "Bacteroides Fragilis",
  "Candida Albicans",
  "Candida Glabrata",
  "Candida Tropicalis",
  "Candida Parapsilosis",
  "Candida Krusei",
  "Candida Lusitaniae",
  "Candida Dubliniensis",
  "Ureaplasma Parvum",
  "Ureaplasma Urealyticum",
];

const TRUST = [
  { icon: ShieldCheck, big: "DHA", small: "licensed nurses" },
  { icon: Lock, big: "100%", small: "confidential" },
  { icon: ScanLine, big: "RT-PCR", small: "molecular accuracy" },
  { icon: Clock, big: "24/7", small: "support & booking" },
];

function money(n: number) {
  return n.toLocaleString("en-AE");
}

export default function StdSexualHealth() {
  return (
    <div className="relative bg-[#f6f6f8]">
      {/* faint lab-grid backdrop for the biotech feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(108,42,55,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(108,42,55,0.045) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(120% 70% at 50% 0%, black, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(120% 70% at 50% 0%, black, transparent 78%)",
        }}
      />

      <div className="relative">
        {/* ---------------- intro ---------------- */}
        <section className="px-4 pt-14 sm:px-6 sm:pt-20">
          <div className="mx-auto max-w-[820px] text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-[color:var(--maroon)]/8 px-4 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.2em] text-[color:var(--maroon)] ring-1 ring-[color:var(--maroon)]/10">
              <Dna className="h-3.5 w-3.5" /> Molecular STD Screening · Dubai
            </p>
            <SectionTitle className="mt-5 text-[2rem] leading-[1.08] text-[color:var(--maroon)] sm:text-[2.7rem]">
              Lab-grade STD panels, collected at home
            </SectionTitle>
            <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-black/60">
              Discreet RT-PCR screening from a urine or UTM swab sample. A
              DHA-licensed nurse collects at your home, hotel or office; every
              sample is processed in a DHA-approved laboratory and reported to
              you privately. Choose the panel depth that fits your needs.
            </p>

            <div className="mx-auto mt-9 grid max-w-[760px] grid-cols-2 gap-3 sm:grid-cols-4">
              {TRUST.map((t) => {
                const Icon = t.icon;
                return (
                  <div
                    key={t.small}
                    className="group relative flex flex-col items-center gap-1 overflow-hidden rounded-2xl bg-white/80 px-4 py-4 ring-1 ring-black/5 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_44px_-30px_rgba(43,26,23,0.5)]"
                  >
                    <Icon className="h-5 w-5 text-[color:var(--maroon)]" strokeWidth={1.7} />
                    <p className="font-title text-[17px] leading-none text-[color:var(--maroon)]">
                      {t.big}
                    </p>
                    <p className="text-[11.5px] text-black/45">{t.small}</p>
                    <Glare />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------- packages / pricing ---------------- */}
        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-[1180px]">
            <div className="text-center">
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-black/40">
                Choose Your Panel
              </p>
              <SectionTitle className="mt-3 text-[2rem] text-[color:var(--maroon)] sm:text-[2.6rem]">
                Transparent, all-inclusive pricing
              </SectionTitle>
              <p className="mx-auto mt-4 max-w-xl text-[15px] text-black/55">
                One price covers collection, processing and your private report.
                No clinic visit, no hidden fees.
              </p>
            </div>

            <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
              {PACKAGES.map((p) => (
                <article
                  key={p.code}
                  className={`group relative flex flex-col overflow-hidden rounded-[26px] p-7 transition-all duration-500 hover:-translate-y-1.5 sm:p-8 ${
                    p.featured
                      ? "text-white shadow-[0_40px_70px_-30px_rgba(43,15,20,0.75)] ring-1 ring-white/10"
                      : "bg-white ring-1 ring-black/5 hover:shadow-[0_34px_60px_-30px_rgba(43,26,23,0.45)] hover:ring-[color:var(--gold)]/30"
                  }`}
                  style={
                    p.featured
                      ? { backgroundImage: "linear-gradient(155deg,#4a1c20,#6C2A37)" }
                      : undefined
                  }
                >
                  <span
                    className={`absolute left-0 top-0 h-1 w-0 transition-all duration-500 group-hover:w-full ${
                      p.featured ? "bg-[color:var(--gold-light)]" : "bg-[color:var(--gold)]"
                    }`}
                  />
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                        p.featured
                          ? "bg-white/15 text-[color:var(--gold-light)] ring-1 ring-white/20"
                          : "bg-[color:var(--maroon)]/8 text-[color:var(--maroon)]"
                      }`}
                    >
                      {p.featured && <Sparkles className="h-3.5 w-3.5" />}
                      {p.tag}
                    </span>
                    <span
                      className={`font-mono text-[12px] tracking-tight ${
                        p.featured ? "text-white/50" : "text-black/35"
                      }`}
                    >
                      {p.code}
                    </span>
                  </div>

                  <div className="mt-6 flex items-end gap-2">
                    <span
                      className={`font-title text-[52px] leading-[0.9] ${
                        p.featured ? "text-white" : "text-[color:var(--maroon)]"
                      }`}
                    >
                      {p.params}
                    </span>
                    <span
                      className={`pb-1.5 text-[13px] font-medium ${
                        p.featured ? "text-white/70" : "text-black/45"
                      }`}
                    >
                      parameters
                    </span>
                  </div>

                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span
                      className={`text-[13px] font-semibold ${
                        p.featured ? "text-[color:var(--gold-light)]" : "text-[color:var(--maroon)]"
                      }`}
                    >
                      AED
                    </span>
                    <span
                      className={`font-title text-[30px] leading-none ${
                        p.featured ? "text-white" : "text-[#1c1c1c]"
                      }`}
                    >
                      {money(p.price)}
                    </span>
                  </div>

                  <p
                    className={`mt-4 text-[13.5px] leading-relaxed ${
                      p.featured ? "text-white/70" : "text-black/55"
                    }`}
                  >
                    {p.blurb}
                  </p>

                  <ul className="mt-5 flex flex-col gap-2.5">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5">
                        <span
                          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                            p.featured
                              ? "bg-white/15 text-[color:var(--gold-light)]"
                              : "bg-[color:var(--maroon)]/10 text-[color:var(--maroon)]"
                          }`}
                        >
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        <span
                          className={`text-[13.5px] leading-snug ${
                            p.featured ? "text-white/85" : "text-[#2b1a17]/80"
                          }`}
                        >
                          {pt}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-7">
                    <Link
                      href={`/book?service=${encodeURIComponent(
                        "Labs at Home",
                      )}&panel=${encodeURIComponent(
                        `${p.code} — ${p.params}-parameter STD panel (AED ${money(
                          p.price,
                        )})`,
                      )}`}
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14.5px] font-semibold transition-transform hover:-translate-y-0.5 ${
                        p.featured
                          ? "bg-white text-[color:var(--maroon)]"
                          : "bg-[color:var(--maroon)] text-white"
                      }`}
                    >
                      Book this panel
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <Glare />
                </article>
              ))}
            </div>

            <p className="mt-6 text-center text-[12.5px] text-black/40">
              Sample type: urine / UTM swab · RT-PCR method · results reported
              privately. Prices are inclusive of home collection.
            </p>
          </div>
        </section>

        {/* ---------------- panel breakdown ---------------- */}
        <section className="px-4 pb-4 sm:px-6">
          <div className="mx-auto max-w-[1180px]">
            <div className="text-center">
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-black/40">
                What Each Panel Detects
              </p>
              <SectionTitle className="mt-3 text-[2rem] text-[color:var(--maroon)] sm:text-[2.6rem]">
                Exactly what's included
              </SectionTitle>
              <p className="mx-auto mt-4 max-w-xl text-[15px] text-black/55">
                Every STD 7 panel screens seven targeted pathogens; STD 14 and
                STD 28 combine them for wider coverage. Here's the full list for
                each.
              </p>
            </div>

            <p className="mt-11 text-[12px] font-semibold uppercase tracking-[0.16em] text-[color:var(--maroon)]/70">
              STD 7 · pick one focus — AED 699
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {PANELS.map((panel) => (
                <article
                  key={panel.name}
                  className="group relative overflow-hidden rounded-[24px] bg-white p-6 ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_56px_-30px_rgba(43,26,23,0.45)] hover:ring-[color:var(--gold)]/30 sm:p-7"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[color:var(--maroon)]/8 text-[color:var(--maroon)] ring-1 ring-[color:var(--maroon)]/10 transition-all duration-500 group-hover:bg-[color:var(--maroon)] group-hover:text-white">
                        <Microscope className="h-5 w-5" strokeWidth={1.7} />
                      </span>
                      <div>
                        <h3 className="text-[18px] font-semibold text-[#241417]">
                          STD 7 · {panel.name}
                        </h3>
                        <p className="text-[12.5px] text-black/45">{panel.note}</p>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-black/30">
                      7×
                    </span>
                  </div>

                  <ul className="mt-5 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                    {panel.items.map((org) => (
                      <li
                        key={org}
                        className="flex items-center gap-2 text-[13px] text-black/70"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--gold)]" />
                        <span className="font-mono text-[12.5px] leading-snug tracking-tight">
                          {org}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Glare />
                </article>
              ))}
            </div>

            {/* combined panels — full inclusion lists */}
            <p className="mt-10 text-[12px] font-semibold uppercase tracking-[0.16em] text-[color:var(--maroon)]/70">
              STD 14 &amp; STD 28 · combined coverage
            </p>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {[
                {
                  code: "STD 14",
                  price: 1199,
                  note: "Routine screen — bacterial, viral & ulcer",
                  items: STD14,
                },
                {
                  code: "STD 28",
                  price: 1899,
                  note: "Complete screen — the full spectrum",
                  items: STD28,
                },
              ].map((panel) => (
                <article
                  key={panel.code}
                  className="group relative overflow-hidden rounded-[24px] bg-white p-6 ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_56px_-30px_rgba(43,26,23,0.45)] hover:ring-[color:var(--gold)]/30 sm:p-7"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[color:var(--maroon)] text-white ring-1 ring-[color:var(--maroon)]/10 transition-transform duration-500 group-hover:scale-110">
                        <FlaskConical className="h-5 w-5" strokeWidth={1.7} />
                      </span>
                      <div>
                        <h3 className="text-[18px] font-semibold text-[#241417]">
                          {panel.code}
                        </h3>
                        <p className="text-[12.5px] text-black/45">{panel.note}</p>
                      </div>
                    </div>
                    <span className="shrink-0 text-right">
                      <span className="block font-title text-[17px] leading-none text-[color:var(--maroon)]">
                        AED {money(panel.price)}
                      </span>
                      <span className="font-mono text-[11px] text-black/30">
                        {panel.items.length}×
                      </span>
                    </span>
                  </div>

                  <ul className="mt-5 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                    {panel.items.map((org, i) => (
                      <li
                        key={`${org}-${i}`}
                        className="flex items-center gap-2 text-[13px] text-black/70"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--gold)]" />
                        <span className="font-mono text-[12.5px] leading-snug tracking-tight">
                          {org}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Glare />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- biotech bento (numbers + lab imagery) ---------------- */}
        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-[1180px]">
            <div className="text-center">
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-black/40">
                The NADZ Standard
              </p>
              <SectionTitle className="mt-3 text-[2rem] text-[color:var(--maroon)] sm:text-[2.6rem]">
                Clinical precision, complete privacy
              </SectionTitle>
            </div>

            <div className="mt-11 grid gap-4 lg:grid-cols-3 lg:auto-rows-[210px]">
              {/* col 1: stat tile + photo */}
              <div className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] bg-white p-6 ring-1 ring-black/5">
                <Droplet className="h-6 w-6 text-[color:var(--maroon)]" strokeWidth={1.6} />
                <div>
                  <p className="font-title text-[34px] leading-none text-[color:var(--maroon)]">
                    1 sample
                  </p>
                  <p className="mt-1.5 text-[13px] text-black/50">
                    Up to 28 pathogens from a single urine / swab collection.
                  </p>
                </div>
                <Glare />
              </div>

              <div className="relative min-h-[420px] overflow-hidden rounded-[24px] ring-1 ring-black/5 lg:min-h-0 lg:row-span-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/labs-at-home.webp"
                  alt="DHA-licensed nurse collecting a sample at home"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
                <div className="absolute left-6 right-6 top-6">
                  <p className="font-title text-[30px] leading-none text-white">
                    24–48h
                  </p>
                  <p className="mt-1 text-[13px] text-white/75">
                    typical turnaround
                  </p>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[14px] font-medium leading-snug text-white">
                    Collected wherever you feel most comfortable — home, hotel or
                    office, on your schedule.
                  </p>
                </div>
              </div>

              <div className="relative min-h-[240px] overflow-hidden rounded-[24px] ring-1 ring-black/5 lg:min-h-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/dna2.webp"
                  alt="DNA analysis in the laboratory"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--maroon)]/85 to-[color:var(--maroon)]/25" />
                <div className="absolute bottom-5 left-6 right-6">
                  <p className="font-title text-[24px] leading-none text-white">
                    RT-PCR
                  </p>
                  <p className="mt-1 text-[13px] text-white/80">
                    DNA-level detection in DHA-approved labs
                  </p>
                </div>
              </div>

              {/* col 1 bottom photo */}
              <div className="relative min-h-[240px] overflow-hidden rounded-[24px] ring-1 ring-black/5 lg:min-h-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/lab.jpg"
                  alt="Samples processed in a certified laboratory"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-5 left-6 right-6">
                  <p className="font-title text-[22px] leading-none text-white">
                    Certified labs
                  </p>
                  <p className="mt-1 text-[13px] text-white/75">
                    Accredited, quality-controlled results
                  </p>
                </div>
              </div>

              {/* col 3 bottom: confidential stat card */}
              <div className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] p-6 text-white ring-1 ring-white/10"
                style={{ backgroundImage: "linear-gradient(150deg,#4a1c20,#6C2A37)" }}>
                <Lock className="h-6 w-6 text-[color:var(--gold-light)]" strokeWidth={1.6} />
                <div>
                  <p className="font-title text-[34px] leading-none text-white">
                    100%
                  </p>
                  <p className="mt-1.5 text-[13px] text-white/70">
                    Confidential from collection to report — no names shared,
                    ever.
                  </p>
                </div>
                <Glare />
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- process ---------------- */}
        <HowItWorks />

        {/* ---------------- closing CTA ---------------- */}
        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div
            className="mx-auto flex max-w-[1180px] flex-col items-center gap-6 rounded-[30px] px-6 py-14 text-center sm:py-20"
            style={{ backgroundImage: "linear-gradient(135deg,#4a1c20,#6C2A37)" }}
          >
            <CircleCheck className="h-8 w-8 text-[color:var(--gold-light)]" />
            <p className="max-w-2xl font-title text-[1.7rem] uppercase leading-[1.15] text-white sm:text-[2.3rem]">
              Confidential, reliable, hassle-free.
            </p>
            <p className="max-w-md text-[15px] leading-relaxed text-white/65">
              Message or call us and a DHA-licensed nurse will handle your
              collection discreetly, with secure private results.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[color:var(--maroon)] transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                WhatsApp us, 24/7
              </Link>
              <Link
                href="tel:80046239"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="h-4 w-4 text-[color:var(--gold-light)]" />
                Call now
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
