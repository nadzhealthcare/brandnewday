import { NAV, type SubItem } from "./nav-data";

export type PageMeta = { title: string; description: string };

/* meta for routes that aren't sub-items in the nav tree */
const EXTRA_META: Record<string, PageMeta> = {
  "/contact": {
    title: "Contact Us",
    description:
      "Reach the NADZ care team, we're here around the clock, every day of the week.",
  },
  "/book": {
    title: "Book an Appointment",
    description:
      "Book a home visit with a NADZ doctor or specialist in just a few minutes.",
  },
};

/* flatten the nav tree into { href: { title, description } } */
function buildMeta(): Record<string, PageMeta> {
  const map: Record<string, PageMeta> = {};
  const add = (href?: string, title?: string, description?: string) => {
    if (!href || href === "/") return;
    map[href] = {
      title: title ?? "NADZ",
      description:
        description ?? `Learn more about ${title} at NADZ Healthcare.`,
    };
  };
  const walk = (items: SubItem[]) => {
    for (const it of items) {
      add(it.href, it.label, it.description);
      if (it.children) walk(it.children);
    }
  };
  for (const nav of NAV) {
    if (nav.items) walk(nav.items);
    else add(nav.href, nav.label);
  }
  return { ...map, ...EXTRA_META };
}

export const PAGE_META = buildMeta();

/* -------------------------------------------------------------------------
 * HERO IMAGE SLIDERS
 * Each page has its OWN array of image links, replace any path with your
 * own image (drop the file in /public/assets and point to it here).
 * Any route not listed falls back to DEFAULT_HERO_IMAGES.
 * ---------------------------------------------------------------------- */

export const DEFAULT_HERO_IMAGES = [
  "/assets/doctorled.jpg",
  "/assets/drnadia.jpg",
  "/assets/partner.jpg",
];

export const HERO_IMAGES: Record<string, string[]> = {
  // About Us
  "/about/mission-vision": [
    "/assets/drnadia.jpg",
    "/assets/doctorled.jpg",
    "/assets/partner.jpg",
  ],
  "/about/who-we-are": [
    "/assets/doctorled.jpg",
    "/assets/drnadia.jpg",
    "/assets/fam.jpg",
  ],
  "/about/careers": [
    "/assets/doct.jpg",
    "/assets/nurse-on-call.png",
    "/assets/doctorled.jpg",
  ],
  "/about/faqs": [
    "/assets/fam.jpg",
    "/assets/doct.jpg",
    "/assets/partner.jpg",
  ],

  // Services
  "/services/doctor-on-call": [
    "/assets/doc-slider.png",
    "/assets/doctor-on-call.mp4",
    "/assets/doc-car.jpg",
  ],
  "/services/nursing-care": [
    "/assets/nurse-on-call.png",
    "/assets/fam.jpg",
    "/assets/doct.jpg",
  ],
  "/services/nursing-care/elderly-care": [
    "/assets/nurse-on-call.png",
    "/assets/fam.jpg",
    "/assets/lifestyle.jpg",
  ],
  "/services/nursing-care/mother-baby-care": [
    "/assets/nurse-on-call.png",
    "/assets/fam.jpg",
    "/assets/drnadia.jpg",
  ],
  "/services/nursing-care/babysitting": [
    "/assets/fam.jpg",
    "/assets/nurse-on-call.png",
    "/assets/lifestyle.jpg",
  ],
  "/services/nursing-care/palliative-care": [
    "/assets/nurse-on-call.png",
    "/assets/fam.jpg",
    "/assets/doctorled.jpg",
  ],
  "/services/physiotherapy-at-home": [
    "/assets/physio.png",
    "/assets/advanced.jpg",
    "/assets/doct.jpg",
  ],
  "/services/iv-drips": [
    "/assets/ivdrips.png",
    "/assets/drnadia.jpg",
    "/assets/doct.jpg",
  ],
  "/services/iv-drips/iv-nad-plus": [
    "/assets/ivdrips.png",
    "/assets/advanced.jpg",
    "/assets/drnadia.jpg",
  ],
  "/services/iv-drips/iv-glutathione-radiance": [
    "/assets/ivdrips.png",
    "/assets/lifestyle.jpg",
    "/assets/drnadia.jpg",
  ],
  "/services/iv-drips/iv-vitamin-therapy": [
    "/assets/ivdrips.png",
    "/assets/fam.jpg",
    "/assets/drnadia.jpg",
  ],
  "/services/iv-drips/iv-hydration": [
    "/assets/ivdrips.png",
    "/assets/advanced.jpg",
    "/assets/doct.jpg",
  ],
  "/services/labs-at-home": [
    "/assets/labs-at-home.png",
    "/assets/advanced.jpg",
    "/assets/doct.jpg",
  ],
  "/services/labs-at-home/genetic-epigenetic-testing": [
    "/assets/labs-at-home.png",
    "/assets/advanced.jpg",
    "/assets/drnadia.jpg",
  ],
  "/services/labs-at-home/food-intolerance-allergies": [
    "/assets/labs-at-home.png",
    "/assets/advanced.jpg",
    "/assets/fam.jpg",
  ],
  "/services/labs-at-home/nipt-womens-health": [
    "/assets/labs-at-home.png",
    "/assets/drnadia.jpg",
    "/assets/fam.jpg",
  ],
  "/services/labs-at-home/std-sexual-health": [
    "/assets/labs-at-home.png",
    "/assets/advanced.jpg",
    "/assets/doct.jpg",
  ],
  "/services/labs-at-home/covid-pcr": [
    "/assets/labs-at-home.png",
    "/assets/advanced.jpg",
    "/assets/doct.jpg",
  ],
  "/services/vaccination-at-home": [
    "/assets/vaccination.png",
    "/assets/drnadia.jpg",
    "/assets/fam.jpg",
  ],
  "/services/medical-tourism": [
    "/assets/medical-tour.png",
    "/assets/partner.jpg",
    "/assets/advanced.jpg",
  ],

  // NADZ Exclusive
  "/exclusive/nadz-vital-brain": [
    "/assets/advanced.jpg",
    "/assets/drnadia.jpg",
    "/assets/doct.jpg",
  ],
  "/exclusive/nadz-autonomic-control": [
    "/assets/advanced.jpg",
    "/assets/doctorled.jpg",
    "/assets/drnadia.jpg",
  ],
  "/exclusive/nadz-autonomic-control/sleeping-disorder": [
    "/assets/advanced.jpg",
    "/assets/lifestyle.jpg",
    "/assets/drnadia.jpg",
  ],
  "/exclusive/nadz-autonomic-control/anxiety-stress": [
    "/assets/advanced.jpg",
    "/assets/lifestyle.jpg",
    "/assets/drnadia.jpg",
  ],
  "/exclusive/nadz-autonomic-control/chronic-pain": [
    "/assets/advanced.jpg",
    "/assets/physio.png",
    "/assets/drnadia.jpg",
  ],
  "/exclusive/nadz-autonomic-control/erectile-dysfunction": [
    "/assets/advanced.jpg",
    "/assets/drnadia.jpg",
    "/assets/doct.jpg",
  ],
  "/exclusive/nadz-autonomic-control/overreacting-bladder": [
    "/assets/advanced.jpg",
    "/assets/drnadia.jpg",
    "/assets/doct.jpg",
  ],
  "/exclusive/poc-testing": [
    "/assets/labs-at-home.png",
    "/assets/advanced.jpg",
    "/assets/doct.jpg",
  ],

  // Wellness & Longevity
  "/wellness/nad-plus-iv-therapy": [
    "/assets/ivdrips.png",
    "/assets/lifestyle.jpg",
    "/assets/drnadia.jpg",
  ],
  "/wellness/peptide-therapy": [
    "/assets/advanced.jpg",
    "/assets/lifestyle.jpg",
    "/assets/drnadia.jpg",
  ],
  "/wellness/functional-integrative-medicine": [
    "/assets/lifestyle.jpg",
    "/assets/fam.jpg",
    "/assets/doctorled.jpg",
  ],

  // Media & Press
  "/media/blogs": [
    "/assets/partner.jpg",
    "/assets/doctorled.jpg",
    "/assets/fam.jpg",
  ],
  "/media/awards": [
    "/assets/partner.jpg",
    "/assets/doctorled.jpg",
    "/assets/drnadia.jpg",
  ],
  "/media/press-releases": [
    "/assets/partner.jpg",
    "/assets/doct.jpg",
    "/assets/doctorled.jpg",
  ],
  "/media/interviews-podcasts": [
    "/assets/drnadia.jpg",
    "/assets/doctorled.jpg",
    "/assets/partner.jpg",
  ],
  "/media/events": [
    "/assets/partner.jpg",
    "/assets/fam.jpg",
    "/assets/doctorled.jpg",
  ],

  // Contact / Book
  "/contact": [
    "/assets/partner.jpg",
    "/assets/doctorled.jpg",
    "/assets/fam.jpg",
  ],
  "/book": [
    "/assets/drnadia.jpg",
    "/assets/doctorled.jpg",
    "/assets/partner.jpg",
  ],
};

export const ALL_PATHS = Object.keys(PAGE_META);
