/* Annual subscription catalogue, the single source of truth for what a package
   costs. Checkout resolves prices from here server-side (never from the URL),
   so a link can't be edited to change the amount. Keep it free of client-only
   imports, both the marketing section and the pay route read it. */

export type Package = {
  n: string;
  slug: string;
  title: string;
  desc?: string;
  phd?: boolean;
  /** AED per year. 0 means it's bundled with the membership, not sold alone. */
  price: number;
};

export const PACKAGES: Package[] = [
  {
    n: "01",
    slug: "a-z-mapping",
    title: "A-Z Mapping",
    desc: "Complete genetic blueprint of your health",
    price: 5000,
  },
  {
    n: "02",
    slug: "dna-life-geno",
    title: "DNA Life Geno",
    desc: "Genetic insights for lifestyle & nutrition",
    price: 3600,
  },
  {
    n: "03",
    slug: "dna-methylation",
    title: "DNA Methylation",
    desc: "Reveal your true biological ageing markers",
    price: 3600,
  },
  {
    n: "04",
    slug: "gut-microbiome",
    title: "GUT Microbiome",
    desc: "Gut health analysis with Zonulin",
    price: 4400,
  },
  {
    n: "05",
    slug: "brain-mapping",
    title: "Brain Mapping",
    desc: "Cognitive & neural performance profile",
    price: 5000,
  },
  {
    n: "06",
    slug: "hrv",
    title: "HRV",
    desc: "Heart-rate variability & stress resilience",
    price: 0,
  },
  {
    n: "07",
    slug: "biological-age",
    title: "Determination of Biological Age",
    desc: "Using Telomeric Length Studies",
    price: 2400,
  },
  {
    n: "08",
    slug: "fox-food-intolerance",
    title: "Fox Food Intolerance",
    desc: "Identify foods that don't agree with you",
    phd: true,
    price: 1300,
  },
  {
    n: "09",
    slug: "food-allergy",
    title: "Food Allergy",
    desc: "Full allergy screening – Alex",
    phd: true,
    price: 1300,
  },
  {
    n: "10",
    slug: "doctor-consultations",
    title: "6 Doctor consultations",
    desc: "At home to keep your care plan updated",
    price: 3600,
  },
  {
    n: "11",
    slug: "iv-therapies",
    title: "6 IV therapies",
    desc: "Per year, a combination of your choice",
    price: 3600,
  },
  {
    n: "12",
    slug: "physiotherapy-sessions",
    title: "12 physiotherapy sessions at Home",
    desc: "Cupping, hijama and dry needling",
    price: 2400,
  },
  {
    n: "13",
    slug: "red-light-therapy",
    title: "6 Red Light Therapy",
    desc: "Recovery & cellular energy boost",
    price: 2400,
  },
];

/** A package that can actually be bought. Bundled (price 0) items are excluded. */
export function getPurchasablePackage(slug: string | undefined): Package | null {
  if (!slug) return null;
  return PACKAGES.find((p) => p.slug === slug && p.price > 0) ?? null;
}
