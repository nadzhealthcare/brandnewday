import type { LucideIcon } from "lucide-react";
import {
  Target,
  Users,
  Briefcase,
  HelpCircle,
  Stethoscope,
  HeartPulse,
  Activity,
  Droplets,
  FlaskConical,
  Syringe,
  Plane,
  Brain,
  Waves,
  ScanLine,
  Sparkles,
  Pill,
  Leaf,
  Newspaper,
  Award,
  Megaphone,
  Mic,
  CalendarDays,
} from "lucide-react";

export type SubItem = {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  children?: SubItem[];
};

export type NavItem = {
  label: string;
  href?: string;
  /** groups of items shown inside the mega menu */
  items?: SubItem[];
  /** how wide the panel should be */
  columns?: 1 | 2 | 3;
  isButton?: boolean;
};

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    columns: 1,
    items: [
      {
        label: "Mission & Vision",
        href: "/about/mission-vision",
        icon: Target,
        description: "The purpose and promise that guide every visit.",
      },
      {
        label: "Who We Are",
        href: "/about/who-we-are",
        icon: Users,
        description: "Meet the team behind your family doctor.",
      },
      {
        label: "Careers",
        href: "/about/careers",
        icon: Briefcase,
        description: "Grow with a people-first healthcare team.",
      },
      {
        label: "FAQs",
        href: "/about/faqs",
        icon: HelpCircle,
        description: "Answers to the questions we hear most.",
      },
    ],
  },
  {
    label: "Services",
    columns: 3,
    items: [
      {
        label: "Doctor on Call",
        href: "/services/doctor-on-call",
        icon: Stethoscope,
        description: "A qualified doctor at your door, on demand.",
      },
      {
        label: "Nursing Care",
        href: "/services/nursing-care",
        icon: HeartPulse,
        description: "Compassionate in-home nursing, day or night.",
        children: [
          { label: "Elderly Care", href: "/services/nursing-care/elderly-care" },
          {
            label: "Mother & Baby Care",
            href: "/services/nursing-care/mother-baby-care",
          },
          { label: "Babysitting", href: "/services/nursing-care/babysitting" },
          {
            label: "Palliative Care",
            href: "/services/nursing-care/palliative-care",
          },
        ],
      },
      {
        label: "Physiotherapy at Home",
        href: "/services/physiotherapy-at-home",
        icon: Activity,
        description: "Recover and move better without the commute.",
      },
      {
        label: "IV Drips",
        href: "/services/iv-drips",
        icon: Droplets,
        description: "Restorative infusions delivered in comfort.",
        children: [
          { label: "IV NAD+", href: "/services/iv-drips/iv-nad-plus" },
          {
            label: "IV Glutathione Radiance Drip",
            href: "/services/iv-drips/iv-glutathione-radiance",
          },
          {
            label: "IV Vitamin Therapy",
            href: "/services/iv-drips/iv-vitamin-therapy",
          },
          { label: "IV Hydration", href: "/services/iv-drips/iv-hydration" },
        ],
      },
      {
        label: "Labs at Home",
        href: "/services/labs-at-home",
        icon: FlaskConical,
        description: "Sample collection and testing at your door.",
        children: [
          {
            label: "Genetic & Epigenetic Testing",
            href: "/services/labs-at-home/genetic-epigenetic-testing",
          },
          {
            label: "Food Intolerance & Allergies",
            href: "/services/labs-at-home/food-intolerance-allergies",
          },
          {
            label: "NIPT / Women's Health Panels",
            href: "/services/labs-at-home/nipt-womens-health",
          },
          {
            label: "STD Testing & Sexual Health",
            href: "/services/labs-at-home/std-sexual-health",
          },
          { label: "COVID PCR", href: "/services/labs-at-home/covid-pcr" },
        ],
      },
      {
        label: "Vaccination at Home",
        href: "/services/vaccination-at-home",
        icon: Syringe,
        description: "Routine and travel vaccines, safely at home.",
      },
      {
        label: "Medical Tourism",
        href: "/services/medical-tourism",
        icon: Plane,
        description: "World-class treatment, seamlessly coordinated.",
      },
    ],
  },
  {
    label: "NADZ Exclusive",
    columns: 2,
    items: [
      {
        label: "NADZ Vital Brain™",
        href: "/exclusive/nadz-vital-brain",
        icon: Brain,
        description: "A signature program for peak cognitive health.",
      },
      {
        label: "NADZ Autonomic Control™",
        href: "/exclusive/nadz-autonomic-control",
        icon: Waves,
        description: "Rebalance the nervous system that runs you.",
        children: [
          {
            label: "Sleeping Disorder",
            href: "/exclusive/nadz-autonomic-control/sleeping-disorder",
          },
          {
            label: "Anxiety & Stress",
            href: "/exclusive/nadz-autonomic-control/anxiety-stress",
          },
          {
            label: "Chronic Pain",
            href: "/exclusive/nadz-autonomic-control/chronic-pain",
          },
          {
            label: "Erectile Dysfunction",
            href: "/exclusive/nadz-autonomic-control/erectile-dysfunction",
          },
          {
            label: "Overreacting Bladder",
            href: "/exclusive/nadz-autonomic-control/overreacting-bladder",
          },
        ],
      },
      {
        label: "POC Testing",
        href: "/exclusive/poc-testing",
        icon: ScanLine,
        description: "Point-of-Care instant screens with fast results.",
      },
    ],
  },
  {
    label: "Wellness & Longevity",
    columns: 1,
    items: [
      {
        label: "NAD++ IV Therapy",
        href: "/wellness/nad-plus-iv-therapy",
        icon: Sparkles,
        description: "Cellular renewal for energy and longevity.",
      },
      {
        label: "Peptide Therapy",
        href: "/wellness/peptide-therapy",
        icon: Pill,
        description: "Targeted peptides for repair and vitality.",
      },
      {
        label: "Functional & Integrative Medicine",
        href: "/wellness/functional-integrative-medicine",
        icon: Leaf,
        description: "Root-cause care for whole-body wellness.",
      },
    ],
  },
  {
    label: "Media & Press",
    columns: 1,
    items: [
      {
        label: "Blogs",
        href: "/media/blogs",
        icon: Newspaper,
        description: "Insights and guides from our clinicians.",
      },
      {
        label: "Awards & Achievements",
        href: "/media/awards",
        icon: Award,
        description: "Recognition for care that goes further.",
      },
      {
        label: "Press Releases",
        href: "/media/press-releases",
        icon: Megaphone,
        description: "The latest official NADZ announcements.",
      },
      {
        label: "Interviews & Podcasts",
        href: "/media/interviews-podcasts",
        icon: Mic,
        description: "Conversations on health and longevity.",
      },
      {
        label: "Events & Highlights",
        href: "/media/events",
        icon: CalendarDays,
        description: "Where NADZ has been and what's next.",
      },
    ],
  },
  { label: "Contact Us", href: "/contact" },
  { label: "Book an appointment", href: "/book", isButton: true },
];
