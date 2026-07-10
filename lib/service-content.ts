import {
  Bandage,
  Syringe,
  Droplets,
  HeartPulse,
  Activity,
  Baby,
  Users,
  HandHeart,
  HeartHandshake,
  Accessibility,
  Stethoscope,
  Brain,
  Milk,
  Moon,
  Sparkles,
  BookOpen,
  Puzzle,
  Smile,
  Salad,
  Flower2,
  Pill,
  ShieldCheck,
  ShieldPlus,
  Clock,
  Zap,
  UserRound,
  Languages,
  Globe,
  Hotel,
  Building2,
  House,
  Coffee,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";

export type IconItem = { icon: LucideIcon; title: string; desc: string };
export type Highlight = { icon: LucideIcon; big: string; small: string };

export type ServiceBodyData = {
  eyebrow: string;
  title: string;
  intro: string;
  highlights: Highlight[];
  featuresEyebrow: string;
  featuresTitle: string;
  features: IconItem[];
  includedTitle: string;
  includedLead: string;
  included: string[];
  whoEyebrow: string;
  whoTitle: string;
  who: IconItem[];
  closingTitle: string;
  closingDesc: string;
};

/* shared where / locations block */
const LOCATIONS: IconItem[] = [
  {
    icon: House,
    title: "At home",
    desc: "Care delivered where your family feels safest and most relaxed.",
  },
  {
    icon: Hotel,
    title: "At your hotel",
    desc: "Discreet, in-suite support for visitors and guests across Dubai.",
  },
  {
    icon: Building2,
    title: "At the office",
    desc: "Professional care at your workplace, without disrupting your day.",
  },
];

export const SERVICE_BODIES: Record<string, ServiceBodyData> = {
  /* ---------------------------------------------------------------- */
  "/services/nursing-care": {
    eyebrow: "Home Nursing · Dubai",
    title: "Hospital-grade clinical care at home",
    intro:
      "Receive compassionate, DHA-licensed nursing care in the comfort of your home, hotel or office in Dubai — from wound care and post-surgical recovery to injections, IV therapy, elderly support and mother & baby care.",
    highlights: [
      { icon: ShieldCheck, big: "DHA", small: "licensed nurses" },
      { icon: Clock, big: "24/7", small: "day, night & weekends" },
      { icon: Zap, big: "< 5 min", small: "POC testing, MOHAP-certified" },
      { icon: Languages, big: "Multi", small: "lingual, culturally sensitive" },
    ],
    featuresEyebrow: "Nursing Services",
    featuresTitle: "Care for every need",
    features: [
      { icon: Bandage, title: "Post-surgical & recovery", desc: "Wound dressing and recovery support after surgery or discharge." },
      { icon: HeartPulse, title: "Elderly & geriatric", desc: "Attentive geriatric nursing and long-term daily support." },
      { icon: Activity, title: "Chronic & long-term care", desc: "Steady oversight for chronic and complex conditions." },
      { icon: Stethoscope, title: "Critical & ICU-level", desc: "Advanced, ICU-level nursing delivered in your home." },
      { icon: Baby, title: "Mother & newborn", desc: "Postnatal and newborn care for the whole family." },
      { icon: HeartHandshake, title: "Palliative & end-of-life", desc: "Gentle comfort care with dignity and reassurance." },
    ],
    includedTitle: "Every Visit Includes",
    includedLead: "Complete clinical care — coordinated end to end.",
    included: [
      "Same-day or planned visits, including evenings, nights and weekends",
      "A DHA-licensed nurse reviewing your condition and discharge notes",
      "Wound dressing, injections, IV therapy, catheter care and vital monitoring",
      "Practical support with positioning, mobility and comfort",
      "Family member guidance and education",
      "Coordination with doctors, physiotherapists and lab services",
    ],
    whoEyebrow: "Care Wherever You Are",
    whoTitle: "Nursing that comes to you",
    who: LOCATIONS,
    closingTitle: "Hospital-level care in a familiar environment.",
    closingDesc:
      "Message or call us with the patient's condition and location — we'll have a DHA-licensed nurse on the way.",
  },

  /* ---------------------------------------------------------------- */
  "/services/nursing-care/elderly-care": {
    eyebrow: "Elderly Care · Dubai",
    title: "Elderly home care with condition-based support",
    intro:
      "24/7 elderly care at home anywhere in Dubai from DHA-licensed nurses and trained caregivers — supporting chronic disease management, post-hospital recovery, dementia care and safe mobility in the comfort of home.",
    highlights: [
      { icon: Clock, big: "24/7", small: "round-the-clock support" },
      { icon: ShieldCheck, big: "DHA", small: "licensed nurses & caregivers" },
      { icon: Brain, big: "Dementia", small: "specialised care" },
      { icon: Languages, big: "Multi", small: "lingual caregivers" },
    ],
    featuresEyebrow: "Geriatric Support",
    featuresTitle: "Everything seniors need",
    features: [
      { icon: HandHeart, title: "Personal care", desc: "Bathing, dressing, grooming and mobility assistance." },
      { icon: Stethoscope, title: "Skilled nursing", desc: "Clinical care for chronic and complex conditions." },
      { icon: Activity, title: "Post-hospital recovery", desc: "Rehabilitation support after a hospital stay." },
      { icon: Brain, title: "Dementia & Alzheimer's", desc: "Patient, specialised care for cognitive decline." },
      { icon: Salad, title: "Nutrition & diet", desc: "Nutrition and dietary planning tailored to health needs." },
      { icon: Coffee, title: "Respite care", desc: "Relief and support for family caregivers." },
    ],
    includedTitle: "Our Elderly Care Covers",
    includedLead: "Geriatric-focused support, built around the person.",
    included: [
      "Personal care — bathing, dressing, grooming and mobility",
      "Skilled nursing for chronic conditions",
      "Post-hospitalisation and rehabilitation support",
      "Dementia, Alzheimer's and palliative care",
      "Companionship and emotional support",
      "Mobility, physiotherapy and respite care for families",
    ],
    whoEyebrow: "Care Wherever They Are",
    whoTitle: "Support in familiar surroundings",
    who: LOCATIONS,
    closingTitle: "Dignified care, in the comfort of home.",
    closingDesc:
      "Call or WhatsApp NADZ — our 24/7 team is ready to build the right care plan for your loved one.",
  },

  /* ---------------------------------------------------------------- */
  "/services/nursing-care/mother-baby-care": {
    eyebrow: "Mother & Baby · Dubai",
    title: "Specialised postnatal & newborn nursing",
    intro:
      "Compassionate, DHA-licensed mother and baby care at your home or private residence. NADZ brings postnatal nursing, newborn care and lactation support safely to your doorstep — led by Dr. Nadia, a physician and mother of three.",
    highlights: [
      { icon: ShieldCheck, big: "DHA", small: "maternity & newborn nurses" },
      { icon: Clock, big: "24/7", small: "day, night or live-in" },
      { icon: Stethoscope, big: "Doctor", small: "led, compassion-driven" },
      { icon: Milk, big: "Lactation", small: "expert feeding support" },
    ],
    featuresEyebrow: "Maternal & Newborn Care",
    featuresTitle: "Care for both of you",
    features: [
      { icon: HeartPulse, title: "Post-delivery recovery", desc: "Support after vaginal or C-section delivery, with wound and pain care." },
      { icon: Milk, title: "Lactation support", desc: "Help with latch, engorgement and milk supply." },
      { icon: Baby, title: "Newborn care", desc: "Bathing, swaddling, umbilical cord and feeding support." },
      { icon: Moon, title: "Night & colic support", desc: "Soothing, burping and colic management, day or night." },
      { icon: ShieldPlus, title: "Delicate infants", desc: "Attentive care for premature or medically delicate babies." },
      { icon: BookOpen, title: "First-time mothers", desc: "Newborn handling, feeding and sleep-routine education." },
    ],
    includedTitle: "Your Care Includes",
    includedLead: "Medical-grade care, in the privacy of home.",
    included: [
      "Post-delivery recovery, wound and pain management",
      "Breastfeeding and lactation consultation",
      "Postnatal vital monitoring and emotional reassurance",
      "Newborn bathing, feeding, sleep and colic support",
      "Care for premature or medically delicate infants",
      "Daytime, nighttime, 24/7 live-in and long-term options",
    ],
    whoEyebrow: "Who It's For",
    whoTitle: "Supporting every mother",
    who: [
      { icon: HeartPulse, title: "New mothers", desc: "Hands-on recovery care and reassurance after childbirth." },
      { icon: Sparkles, title: "First-time parents", desc: "Guidance, education and confidence for your new arrival." },
      { icon: Baby, title: "Newborns", desc: "Gentle, expert care — including premature babies." },
    ],
    closingTitle: "Doctor-led care for you and your baby.",
    closingDesc:
      "Message or call us — we'll match you with a DHA-licensed maternity nurse and tailor the support you need.",
  },

  /* ---------------------------------------------------------------- */
  "/services/nursing-care/babysitting": {
    eyebrow: "Babysitting · Dubai",
    title: "Trained caregivers & personalised care",
    intro:
      "Safe, loving babysitting at home with DHA-licensed nurses or trained, background-checked caregivers for newborns and toddlers — with flexible scheduling across Dubai, 24/7.",
    highlights: [
      { icon: ShieldCheck, big: "Vetted", small: "background-checked caregivers" },
      { icon: Clock, big: "Flexible", small: "hourly, nightly or long-term" },
      { icon: Baby, big: "0–3 yrs", small: "newborns & toddlers" },
      { icon: UserRound, big: "DHA", small: "nurses available" },
    ],
    featuresEyebrow: "What We Provide",
    featuresTitle: "Care built around your child",
    features: [
      { icon: Milk, title: "Feeding routines", desc: "Bottle, expressed milk or solids — following your schedule." },
      { icon: Droplets, title: "Hygiene & bathing", desc: "Diaper changes, bathing, dressing and hygiene routines." },
      { icon: Moon, title: "Nap & bedtime", desc: "Nap and bedtime support with preferred soothing techniques." },
      { icon: Puzzle, title: "Play & development", desc: "Playtime, storytelling, songs and developmental activities." },
      { icon: ClipboardList, title: "Clear handovers", desc: "Updates on feeds, nappies, sleep and mood after every visit." },
      { icon: Smile, title: "Loving attention", desc: "Warm, attentive care your little one feels safe with." },
    ],
    includedTitle: "Every Booking Includes",
    includedLead: "Reliable, documented care — for total peace of mind.",
    included: [
      "Feeding on your schedule — bottle, expressed milk or solids",
      "Diaper changes, bathing, dressing and hygiene routines",
      "Nap and bedtime support with your preferred soothing",
      "Playtime, storytelling and developmental activities",
      "Clear handover updates on feeds, nappies, sleep and mood",
      "Newborn (0–12 months) and toddler (1–3 years) specialists",
    ],
    whoEyebrow: "Wherever You Need Us",
    whoTitle: "Care that fits your life",
    who: [
      { icon: House, title: "At home", desc: "Routine childcare support whenever you need it." },
      { icon: Hotel, title: "At your hotel", desc: "Care during conferences, weddings and events." },
      { icon: Building2, title: "Office & events", desc: "Supervision during work or social functions." },
    ],
    closingTitle: "Safe, loving care — whenever you need it.",
    closingDesc:
      "Share your child's age, routine and timing — we'll match a trusted caregiver and confirm your booking.",
  },

  /* ---------------------------------------------------------------- */
  "/services/nursing-care/palliative-care": {
    eyebrow: "Palliative Care · Dubai",
    title: "Comfort, symptom control & end-of-life care",
    intro:
      "Compassionate, DHA-licensed palliative nursing care at home in Dubai, delivered within 30 minutes — because healing is not only about treatment, it's about comfort in the place you feel safest.",
    highlights: [
      { icon: ShieldCheck, big: "DHA", small: "experienced nurses" },
      { icon: Clock, big: "24/7", small: "always available" },
      { icon: HeartHandshake, big: "Comfort", small: "dignity-first care" },
      { icon: Languages, big: "Multi", small: "lingual, culturally sensitive" },
    ],
    featuresEyebrow: "Palliative Support",
    featuresTitle: "Relief, delivered with dignity",
    features: [
      { icon: Flower2, title: "Pain & symptom management", desc: "Continuous monitoring and relief of pain and symptoms." },
      { icon: Bandage, title: "Wound & tube care", desc: "Wound, catheter, drain and tube care by skilled nurses." },
      { icon: Pill, title: "Medication administration", desc: "Careful, timely administration of medications." },
      { icon: Accessibility, title: "Comfort & mobility", desc: "Mobility assistance and comfort positioning." },
      { icon: HeartHandshake, title: "Emotional support", desc: "Reassurance and support for patients and families." },
      { icon: Users, title: "Family guidance", desc: "Caregiving education and coordination with doctors." },
    ],
    includedTitle: "Your Care Includes",
    includedLead: "Comfort-first care, coordinated with your doctors.",
    included: [
      "DHA-licensed, experienced palliative nurses",
      "Continuous pain and symptom monitoring",
      "Wound, catheter, drain and tube care",
      "Medication administration and comfort positioning",
      "Emotional support for patients and families",
      "Family education and coordination with specialists",
    ],
    whoEyebrow: "Care Wherever You Are",
    whoTitle: "Comfort in familiar surroundings",
    who: LOCATIONS,
    closingTitle: "Healing isn't only treatment — it's comfort.",
    closingDesc:
      "Call or WhatsApp us — a DHA-licensed palliative nurse can be with you, typically within 30 minutes in Dubai.",
  },
};
