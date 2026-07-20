import { PACKAGES } from "./packages";

/* Shop catalogue.

   The one source of truth for anything purchasable. The cart lives in the
   browser but only ever stores SKUs and quantities: every price is resolved
   from here on the server at checkout, so a tampered cart can't change what
   gets charged.

   PRICES BELOW ARE PLACEHOLDERS pending the real price list. Packages carry
   their real prices (they come from lib/packages.ts, already live on the
   homepage). Individual service prices are indicative only. */

export type CatalogItem = {
  sku: string;
  title: string;
  /* AED, ex-VAT. Placeholder for services, real for packages. */
  price: number;
  /* What one unit buys, shown under the title. */
  unit: string;
  group: string;
  href?: string;
};

/* --- Individual services -------------------------------------------- */
/* Leaf-level, genuinely bookable items. Category pages (Nursing Care,
   IV Drips, Labs at Home) and condition pages are deliberately not listed:
   they're navigation, not something you buy. */
export const SERVICES: CatalogItem[] = [
  // Doctor & nursing
  { sku: "doctor-on-call", title: "Doctor on Call", price: 500, unit: "Per home visit", group: "Doctor & Nursing", href: "/services/doctor-on-call" },
  { sku: "nursing-care", title: "Nursing Care", price: 400, unit: "Per shift", group: "Doctor & Nursing", href: "/services/nursing-care" },
  { sku: "elderly-care", title: "Elderly Care", price: 450, unit: "Per shift", group: "Doctor & Nursing", href: "/services/nursing-care/elderly-care" },
  { sku: "mother-baby-care", title: "Mother & Baby Care", price: 450, unit: "Per shift", group: "Doctor & Nursing", href: "/services/nursing-care/mother-baby-care" },
  { sku: "babysitting", title: "Babysitting", price: 250, unit: "Per shift", group: "Doctor & Nursing", href: "/services/nursing-care/babysitting" },
  { sku: "palliative-care", title: "Palliative Care", price: 500, unit: "Per shift", group: "Doctor & Nursing", href: "/services/nursing-care/palliative-care" },
  { sku: "physiotherapy", title: "Physiotherapy at Home", price: 350, unit: "Per session", group: "Doctor & Nursing", href: "/services/physiotherapy-at-home" },

  // IV drips
  { sku: "iv-nad-plus", title: "IV NAD⁺", price: 1500, unit: "Per infusion", group: "IV Drips", href: "/services/iv-drips/iv-nad-plus" },
  { sku: "iv-glutathione", title: "IV Glutathione Radiance", price: 900, unit: "Per infusion", group: "IV Drips", href: "/services/iv-drips/iv-glutathione-radiance" },
  { sku: "iv-vitamin", title: "IV Vitamin Therapy", price: 700, unit: "Per infusion", group: "IV Drips", href: "/services/iv-drips/iv-vitamin-therapy" },
  { sku: "iv-hydration", title: "IV Hydration", price: 500, unit: "Per infusion", group: "IV Drips", href: "/services/iv-drips/iv-hydration" },

  // Labs at home
  { sku: "lab-genetic", title: "Genetic & Epigenetic Testing", price: 3000, unit: "Per panel", group: "Labs at Home", href: "/services/labs-at-home/genetic-epigenetic-testing" },
  { sku: "lab-nipt", title: "NIPT / Women's Health Panel", price: 2200, unit: "Per panel", group: "Labs at Home", href: "/services/labs-at-home/nipt-womens-health" },
  { sku: "lab-food-intolerance", title: "Food Intolerance & Allergies", price: 1300, unit: "Per panel", group: "Labs at Home", href: "/services/labs-at-home/food-intolerance-allergies" },
  { sku: "lab-std", title: "STD & Sexual Health Panel", price: 1200, unit: "Per panel", group: "Labs at Home", href: "/services/labs-at-home/std-sexual-health" },
  { sku: "lab-covid-pcr", title: "COVID PCR", price: 150, unit: "Per test", group: "Labs at Home", href: "/services/labs-at-home/covid-pcr" },

  // Preventive & exclusive
  { sku: "vaccination", title: "Vaccination at Home", price: 300, unit: "Per dose", group: "Preventive & Exclusive", href: "/services/vaccination-at-home" },
  { sku: "poc-testing", title: "POC Testing", price: 400, unit: "Per test", group: "Preventive & Exclusive", href: "/exclusive/poc-testing" },
  { sku: "vital-brain", title: "NADZ Vital Brain™ (qEEG)", price: 2500, unit: "Per brain map", group: "Preventive & Exclusive", href: "/exclusive/nadz-vital-brain" },
  { sku: "autonomic-control", title: "NADZ Autonomic Control™", price: 1200, unit: "Per session", group: "Preventive & Exclusive", href: "/exclusive/nadz-autonomic-control" },

  // Wellness & longevity
  { sku: "nad-plus-therapy", title: "NAD⁺ IV Therapy", price: 1800, unit: "Per infusion", group: "Wellness & Longevity", href: "/wellness/nad-plus-iv-therapy" },
  { sku: "peptide-therapy", title: "Peptide Therapy", price: 2000, unit: "Per protocol", group: "Wellness & Longevity", href: "/wellness/peptide-therapy" },
  { sku: "functional-medicine", title: "Functional & Integrative Medicine", price: 1000, unit: "Per consultation", group: "Wellness & Longevity", href: "/wellness/functional-integrative-medicine" },
];

/* --- Annual packages -------------------------------------------------- */
/* Real prices, reused from the homepage catalogue. Zero-priced entries are
   enquiry-only, so they aren't sold here. SKUs are namespaced to keep them
   from colliding with a service of the same slug. */
export const PACKAGE_ITEMS: CatalogItem[] = PACKAGES.filter(
  (p) => p.price > 0,
).map((p) => ({
  sku: `pkg-${p.slug}`,
  title: p.title,
  price: p.price,
  unit: "Annual subscription",
  group: "Annual Packages",
}));

export const CATALOG: CatalogItem[] = [...PACKAGE_ITEMS, ...SERVICES];

const BY_SKU = new Map(CATALOG.map((i) => [i.sku, i]));

export function getItem(sku: string): CatalogItem | undefined {
  return BY_SKU.get(sku);
}

/* Service groups in display order, packages are rendered separately. */
export const SERVICE_GROUPS: string[] = [
  ...new Set(SERVICES.map((s) => s.group)),
];

export function formatAed(n: number): string {
  return n.toLocaleString("en-AE");
}
