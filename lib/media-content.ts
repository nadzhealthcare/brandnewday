import {
  Newspaper,
  Award,
  Megaphone,
  Mic,
  CalendarDays,
  Handshake,
  Trophy,
  Star,
  BadgeCheck,
  Headphones,
  Video,
  PartyPopper,
  Presentation,
  Radio,
  PenLine,
  Rocket,
  Building2,
  Sparkles,
  Stethoscope,
  HeartPulse,
  ShieldCheck,
  Leaf,
  Camera,
  Quote,
  type LucideIcon,
} from "lucide-react";

export type MediaTopic = { icon: LucideIcon; title: string; desc: string };

export type MediaBodyData = {
  eyebrow: string;
  title: string;
  intro: string;
  topicsEyebrow: string;
  topicsTitle: string;
  topics: MediaTopic[];
  emptyIcon: LucideIcon;
  emptyTitle: string;
  emptyDesc: string;
  ctaLabel: string;
};

export const MEDIA_BODIES: Record<string, MediaBodyData> = {
  "/media/blogs": {
    eyebrow: "Media & Press · Blogs",
    title: "Insights & guides from our clinicians",
    intro:
      "Practical, doctor-written guidance on home healthcare, longevity and family wellness, straight from the NADZ care team.",
    topicsEyebrow: "What We Write About",
    topicsTitle: "Explore by topic",
    topics: [
      { icon: Stethoscope, title: "Home Healthcare", desc: "Getting the most from care that comes to you." },
      { icon: Leaf, title: "Longevity & Wellness", desc: "NAD⁺, peptides and healthy ageing." },
      { icon: HeartPulse, title: "Family Health", desc: "Guidance for every age in the family." },
      { icon: ShieldCheck, title: "Preventive Care", desc: "Screening, testing and staying ahead." },
    ],
    emptyIcon: PenLine,
    emptyTitle: "New articles on the way",
    emptyDesc:
      "We're curating our first stories. Subscribe and we'll let you know the moment they're live.",
    ctaLabel: "Subscribe for updates",
  },

  "/media/awards": {
    eyebrow: "Media & Press · Awards & Achievements",
    title: "Recognition for care that goes further",
    intro:
      "The standards and milestones that define NADZ, a commitment to excellence across Dubai's home-healthcare landscape.",
    topicsEyebrow: "Our Standards",
    topicsTitle: "What we're recognised for",
    topics: [
      { icon: BadgeCheck, title: "DHA-Licensed Excellence", desc: "Every clinician certified and personally trained." },
      { icon: Star, title: "Patient-First Care", desc: "A five-star, concierge-style experience." },
      { icon: Rocket, title: "Innovation in Home Health", desc: "POC testing, QEEG and NESA® technology." },
      { icon: Handshake, title: "Trusted Partnerships", desc: "Working with leading healthcare providers." },
    ],
    emptyIcon: Trophy,
    emptyTitle: "More to celebrate soon",
    emptyDesc:
      "Our latest awards and achievements will be showcased here. Check back shortly.",
    ctaLabel: "Get in touch",
  },

  "/media/press-releases": {
    eyebrow: "Media & Press · Press Releases",
    title: "The latest official NADZ announcements",
    intro:
      "Official news from NADZ Healthcare, service launches, partnerships and company milestones.",
    topicsEyebrow: "In the News",
    topicsTitle: "What you'll find here",
    topics: [
      { icon: Rocket, title: "Service Launches", desc: "New services and offerings as they go live." },
      { icon: Handshake, title: "Partnerships", desc: "Collaborations across the healthcare sector." },
      { icon: Building2, title: "Company Milestones", desc: "Growth, expansion and company news." },
      { icon: Megaphone, title: "Announcements", desc: "Official statements from NADZ." },
    ],
    emptyIcon: Newspaper,
    emptyTitle: "Announcements coming soon",
    emptyDesc:
      "Official press releases will appear here. For media enquiries, get in touch with our team.",
    ctaLabel: "Media enquiries",
  },

  "/media/interviews-podcasts": {
    eyebrow: "Media & Press · Interviews & Podcasts",
    title: "Conversations on health & longevity",
    intro:
      "Dr. Nadia and the NADZ team on the ideas shaping modern home healthcare, from the family-doctor philosophy to longevity science.",
    topicsEyebrow: "Listen & Watch",
    topicsTitle: "What to expect",
    topics: [
      { icon: Mic, title: "Podcast Episodes", desc: "In-depth conversations on care and wellness." },
      { icon: Video, title: "Video Interviews", desc: "The NADZ team on camera." },
      { icon: Headphones, title: "Expert Discussions", desc: "Longevity, wellness and prevention." },
      { icon: Quote, title: "Founder's Perspective", desc: "Dr. Nadia on the Art of Living." },
    ],
    emptyIcon: Radio,
    emptyTitle: "New episodes on the way",
    emptyDesc:
      "We're producing our first conversations. Subscribe to hear them first.",
    ctaLabel: "Subscribe for updates",
  },

  "/media/events": {
    eyebrow: "Media & Press · Events & Highlights",
    title: "Where NADZ has been and what's next",
    intro:
      "Community moments, wellness events and health talks, a look at where NADZ shows up across Dubai.",
    topicsEyebrow: "Highlights",
    topicsTitle: "What you'll find here",
    topics: [
      { icon: PartyPopper, title: "Community Events", desc: "Out in the community across Dubai." },
      { icon: Presentation, title: "Health Talks", desc: "Education and awareness sessions." },
      { icon: Sparkles, title: "Wellness Experiences", desc: "Longevity and wellness gatherings." },
      { icon: Camera, title: "Event Highlights", desc: "Photos and moments from the field." },
    ],
    emptyIcon: CalendarDays,
    emptyTitle: "Upcoming events soon",
    emptyDesc:
      "Our event calendar and highlights will live here. Stay tuned.",
    ctaLabel: "Get in touch",
  },
};
