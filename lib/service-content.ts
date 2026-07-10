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
  Bone,
  PersonStanding,
  Dumbbell,
  Shield,
  Battery,
  Sun,
  Wine,
  Plane,
  TestTube,
  Dna,
  Ribbon,
  FlaskConical,
  Microscope,
  Snowflake,
  CalendarClock,
  Hospital,
  BedDouble,
  Ambulance,
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

  /* ---------------------------------------------------------------- */
  "/services/physiotherapy-at-home": {
    eyebrow: "Physiotherapy · Dubai",
    title: "DHA-licensed physiotherapists, in 30 minutes",
    intro:
      "24/7 access to DHA-licensed physiotherapists for post-surgical rehabilitation, sports injuries, chronic pain, neurological and elderly physiotherapy — personalised, one-on-one, in the comfort of home.",
    highlights: [
      { icon: ShieldCheck, big: "DHA", small: "licensed physiotherapists" },
      { icon: Clock, big: "24/7", small: "evenings & weekends too" },
      { icon: Zap, big: "30 min", small: "typical arrival in Dubai" },
      { icon: UserRound, big: "1-on-1", small: "personalised attention" },
    ],
    featuresEyebrow: "Conditions We Treat",
    featuresTitle: "Rehabilitation for every need",
    features: [
      { icon: Bone, title: "Post-surgical rehab", desc: "Orthopedic rehabilitation after surgery, at home." },
      { icon: Activity, title: "Back, neck & joint pain", desc: "Hands-on management of everyday pain." },
      { icon: Brain, title: "Neurological therapy", desc: "Recovery for stroke, Parkinson's and MS." },
      { icon: PersonStanding, title: "Elderly & fall prevention", desc: "Balance, strength and safe mobility." },
      { icon: Dumbbell, title: "Sports injury recovery", desc: "Return-to-play rehabilitation programmes." },
      { icon: Baby, title: "Women's & postnatal", desc: "Pre- and post-natal physiotherapy support." },
    ],
    includedTitle: "Every Session Includes",
    includedLead: "A complete, progressive plan — not a one-off visit.",
    included: [
      "Same-day or scheduled visits, including evenings and weekends",
      "A DHA-licensed assessment reviewing your medical history",
      "Physical evaluation of movement and strength",
      "A tailored plan of exercises and manual therapy",
      "Home exercise guidance with clear progression",
      "Coordination with your medical team where needed",
    ],
    whoEyebrow: "Care Wherever You Are",
    whoTitle: "Therapy that comes to you",
    who: LOCATIONS,
    closingTitle: "Because you deserve more than a waiting room.",
    closingDesc:
      "Message or call us with your condition and location — a DHA-licensed physiotherapist can be with you, typically within 30 minutes.",
  },

  /* ---------------------------------------------------------------- */
  "/services/iv-drips": {
    eyebrow: "IV Therapy · Dubai",
    title: "Complete IV therapy, at your doorstep",
    intro:
      "Medical-grade hydration, vitamins, minerals and antioxidants delivered straight into the bloodstream — administered by DHA-certified clinicians at your home, hotel or office, with medical supervision throughout.",
    highlights: [
      { icon: ShieldCheck, big: "DHA", small: "certified clinicians" },
      { icon: Clock, big: "24/7", small: "same-day availability" },
      { icon: Zap, big: "< 5 min", small: "POC testing, MOHAP-certified" },
      { icon: HeartPulse, big: "Monitored", small: "supervised start to finish" },
    ],
    featuresEyebrow: "Our Drip Menu",
    featuresTitle: "A drip for every goal",
    features: [
      { icon: Droplets, title: "IV Hydration", desc: "Deep rehydration and electrolyte balance." },
      { icon: Shield, title: "Immunity Booster", desc: "Vitamins and antioxidants for immune support." },
      { icon: Battery, title: "Energy & Recovery", desc: "Restore energy and bounce back faster." },
      { icon: Sun, title: "Beauty & Glow", desc: "Glutathione for radiant, healthy skin." },
      { icon: Sparkles, title: "NAD⁺ Vitality", desc: "Cellular renewal and longevity support." },
      { icon: Wine, title: "Hangover Relief", desc: "Fast recovery from dehydration and fatigue." },
    ],
    includedTitle: "Every Drip Includes",
    includedLead: "Medical supervision, from the first drop to the last.",
    included: [
      "A clinician review of your health history and goals",
      "A protocol recommended for your specific needs",
      "The IV administered by a DHA-certified nurse",
      "Point-of-care lab results in under 5 minutes",
      "Medical monitoring throughout the session",
      "Same-day and 24/7 availability across Dubai",
    ],
    whoEyebrow: "Who It's For",
    whoTitle: "Feel like yourself again",
    who: [
      { icon: Building2, title: "Busy professionals", desc: "A reset that fits around your schedule." },
      { icon: Dumbbell, title: "Fitness enthusiasts", desc: "Recovery and performance support." },
      { icon: Plane, title: "Frequent travellers", desc: "Beat jet lag and stay at your best." },
    ],
    closingTitle: "Feel more like yourself again.",
    closingDesc:
      "Message or call us with your goals — a DHA-certified nurse will recommend the right protocol and come to you.",
  },

  /* ---------------------------------------------------------------- */
  "/services/labs-at-home": {
    eyebrow: "Lab Testing · Dubai",
    title: "Lab tests at home — discreet, private, accurate",
    intro:
      "DHA-licensed nurses collect your samples at home, hotel or office across Dubai, processed in DHA & JCI-accredited laboratories, with results shared securely — no queues, no exposure, no commute on an empty stomach.",
    highlights: [
      { icon: ShieldCheck, big: "DHA", small: "licensed nurses" },
      { icon: FlaskConical, big: "JCI", small: "accredited laboratories" },
      { icon: Clock, big: "24/7", small: "collection across Dubai" },
      { icon: Shield, big: "Private", small: "secure, discreet results" },
    ],
    featuresEyebrow: "Tests Available",
    featuresTitle: "From routine panels to genomics",
    features: [
      { icon: TestTube, title: "Routine panels", desc: "CBC, glucose, lipid, liver, kidney and thyroid." },
      { icon: Dna, title: "Genomics & DNA", desc: "Microbiome, pharmacogenetics and ancestry." },
      { icon: Ribbon, title: "Tumour markers", desc: "CA-125, PSA, AFP and other screens." },
      { icon: FlaskConical, title: "Hormones & vitamins", desc: "Thyroid, hormone profiles, vitamin D and B12." },
      { icon: HeartPulse, title: "Advanced diagnostics", desc: "Cardiac markers and NIPT." },
      { icon: Microscope, title: "Infectious & allergy", desc: "COVID-19, HIV, hepatitis, STD and allergy panels." },
    ],
    includedTitle: "How Your Test Works",
    includedLead: "Accredited testing, handled end to end.",
    included: [
      "Share your test requirements by call or WhatsApp",
      "Confirmed panels with clear preparation guidance",
      "Sample collection by a DHA-licensed nurse",
      "Processing in DHA & JCI-accredited laboratories",
      "Secure, private delivery of your reports",
      "Optional doctor consultation to interpret results",
    ],
    whoEyebrow: "Collection Wherever You Are",
    whoTitle: "Testing that comes to you",
    who: LOCATIONS,
    closingTitle: "Your results, without the waiting room.",
    closingDesc:
      "Message or call us with what you need tested — a DHA-licensed nurse will collect your samples at a time that suits you.",
  },

  /* ---------------------------------------------------------------- */
  "/services/vaccination-at-home": {
    eyebrow: "Vaccination · Dubai",
    title: "Adult & travel vaccines, with post-care",
    intro:
      "DHA-compliant vaccinations at home, hotel or office in Dubai — flu shots, adult immunisations and travel vaccines, with strict cold-chain management and post-vaccination monitoring. Please note: NADZ provides vaccinations for adults only.",
    highlights: [
      { icon: ShieldCheck, big: "DHA", small: "licensed nurses" },
      { icon: Snowflake, big: "Cold-chain", small: "temperature-controlled" },
      { icon: Clock, big: "15–30 min", small: "post-vaccine monitoring" },
      { icon: CalendarClock, big: "24/7", small: "flexible scheduling" },
    ],
    featuresEyebrow: "Vaccines & Care",
    featuresTitle: "Protection, professionally delivered",
    features: [
      { icon: Syringe, title: "Flu shots", desc: "Seasonal influenza protection at home." },
      { icon: ShieldPlus, title: "Adult immunisations", desc: "Td/Tdap, Hepatitis A & B, HPV and Pneumococcal." },
      { icon: Plane, title: "Travel vaccines", desc: "Yellow Fever, Typhoid, Hepatitis A & B, Meningococcal." },
      { icon: Snowflake, title: "Cold-chain safety", desc: "Vaccines kept in temperature-controlled transport." },
      { icon: Shield, title: "Post-vaccine monitoring", desc: "15–30 minutes of on-site observation." },
      { icon: CalendarClock, title: "Follow-up reminders", desc: "Documentation and timely reminders." },
    ],
    includedTitle: "Every Visit Includes",
    includedLead: "Medical-grade protocols, in sterile, private care.",
    included: [
      "A pre-vaccination medical assessment",
      "Vaccination administered by a DHA-licensed nurse",
      "Temperature-controlled, cold-chain-managed vaccines",
      "15–30 minutes of post-vaccination monitoring",
      "Documentation and follow-up reminders",
      "Sterile, private care wherever you are",
    ],
    whoEyebrow: "Who It's For",
    whoTitle: "Convenient, safe protection",
    who: [
      { icon: Building2, title: "Busy professionals", desc: "Get protected without losing a day to a clinic." },
      { icon: Shield, title: "Elderly & immunocompromised", desc: "Safer care, away from busy waiting rooms." },
      { icon: Plane, title: "Frequent travellers", desc: "Travel vaccines ahead of your trip." },
    ],
    closingTitle: "Protection that comes to you.",
    closingDesc:
      "Message or call us — a DHA-licensed nurse will handle your assessment, vaccination and follow-up at home.",
  },

  /* ---------------------------------------------------------------- */
  "/services/medical-tourism": {
    eyebrow: "Medical Tourism · Dubai",
    title: "Care coordination from arrival to recovery",
    intro:
      "Your on-ground care coordinator in Dubai — planning appointments, navigating hospitals, managing logistics and organising recovery, so your care is planned, coordinated and looked after end-to-end.",
    highlights: [
      { icon: Hospital, big: "End-to-end", small: "arrival to recovery" },
      { icon: Ambulance, big: "24/7", small: "air ambulance transfers" },
      { icon: Languages, big: "Multilingual", small: "concierge & case team" },
      { icon: Globe, big: "Global", small: "patients welcomed" },
    ],
    featuresEyebrow: "What We Coordinate",
    featuresTitle: "Everything but the procedure",
    features: [
      { icon: Hospital, title: "Hospital & specialist network", desc: "Matching you to the right specialists and consultations." },
      { icon: Plane, title: "Visa & travel assistance", desc: "Documentation guidance and airport transfers." },
      { icon: BedDouble, title: "Accommodation & recovery", desc: "Stays arranged for patients and families." },
      { icon: Languages, title: "Multilingual concierge", desc: "Language support and day-to-day case coordination." },
      { icon: Ambulance, title: "Air ambulance & transfers", desc: "Medically equipped critical-care transfers, 24/7." },
      { icon: HeartPulse, title: "Post-treatment follow-up", desc: "Recovery planning and continuity of care." },
    ],
    includedTitle: "Specialties We Coordinate",
    includedLead: "Access Dubai's leading specialists, seamlessly.",
    included: [
      "Cardiology, orthopedics and neurology",
      "Oncology and fertility",
      "Cosmetic, plastic & reconstructive surgery",
      "Dental care and dermatology",
      "Gastroenterology, urology, ENT and ophthalmology",
      "Physiotherapy and rehabilitation",
    ],
    whoEyebrow: "Who It's For",
    whoTitle: "Care planned before you arrive",
    who: [
      { icon: Globe, title: "International patients", desc: "Your Dubai care mapped out before you land." },
      { icon: Users, title: "Patients & families", desc: "Support for everyone travelling with you." },
      { icon: HeartPulse, title: "Complex cases", desc: "Coordinated, continuous care throughout." },
    ],
    closingTitle: "Your care in Dubai — planned, coordinated, looked after.",
    closingDesc:
      "Message or call us — our multilingual team will coordinate your appointments, travel and recovery end to end.",
  },
};
