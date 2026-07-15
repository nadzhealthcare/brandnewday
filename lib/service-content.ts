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
  BrainCircuit,
  Gauge,
  Leaf,
  Wheat,
  Egg,
  Nut,
  Lock,
  Thermometer,
  ScanLine,
  Droplet,
  Bed,
  Flame,
  Utensils,
  Apple,
  Fish,
  Wind,
  Timer,
  AudioWaveform,
  Network,
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

/* shared NADZ Autonomic Control™ pathway used by the condition sub-pages */
const ANS_INCLUDED_TITLE = "Your Care Pathway";
const ANS_INCLUDED_LEAD = "NADZ Autonomic Control™, sub-sensory, needle-free.";
const ANS_PATHWAY: string[] = [
  "A private initial assessment of your symptoms and goals",
  "A baseline HRV snapshot (2–5 minutes)",
  "Sub-sensory microcurrent neuromodulation via wrist & ankle electrodes",
  "Monitoring and adaptation, typically three sessions weekly at first",
  "Integration with medication review, lifestyle and other care",
  "No pain, no needles, sessions you barely feel",
];
const ANS_WHO: IconItem[] = [
  { icon: House, title: "Discreet home care", desc: "Private evaluation wherever you are, home, hotel or office." },
  { icon: Timer, title: "No waiting rooms", desc: "Rapid, actionable plans without clinic delays." },
  { icon: Stethoscope, title: "Structured follow-up", desc: "Ongoing support after any prior treatment." },
];

export const SERVICE_BODIES: Record<string, ServiceBodyData> = {
  /* ---------------------------------------------------------------- */
  "/services/nursing-care": {
    eyebrow: "Home Nursing · Dubai",
    title: "Hospital-grade clinical care at home",
    intro:
      "Receive compassionate, DHA-licensed nursing care in the comfort of your home, hotel or office in Dubai, from wound care and post-surgical recovery to injections, IV therapy, elderly support and mother & baby care.",
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
    includedLead: "Complete clinical care, coordinated end to end.",
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
      "Message or call us with the patient's condition and location, we'll have a DHA-licensed nurse on the way.",
  },

  /* ---------------------------------------------------------------- */
  "/services/nursing-care/elderly-care": {
    eyebrow: "Elderly Care · Dubai",
    title: "Elderly home care with condition-based support",
    intro:
      "24/7 elderly care at home anywhere in Dubai from DHA-licensed nurses and trained caregivers, supporting chronic disease management, post-hospital recovery, dementia care and safe mobility in the comfort of home.",
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
      "Personal care, bathing, dressing, grooming and mobility",
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
      "Call or WhatsApp NADZ, our 24/7 team is ready to build the right care plan for your loved one.",
  },

  /* ---------------------------------------------------------------- */
  "/services/nursing-care/mother-baby-care": {
    eyebrow: "Mother & Baby · Dubai",
    title: "Specialised postnatal & newborn nursing",
    intro:
      "Compassionate, DHA-licensed mother and baby care at your home or private residence. NADZ brings postnatal nursing, newborn care and lactation support safely to your doorstep, led by Dr. Nadia, a physician and mother of three.",
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
      { icon: Baby, title: "Newborns", desc: "Gentle, expert care, including premature babies." },
    ],
    closingTitle: "Doctor-led care for you and your baby.",
    closingDesc:
      "Message or call us, we'll match you with a DHA-licensed maternity nurse and tailor the support you need.",
  },

  /* ---------------------------------------------------------------- */
  "/services/nursing-care/babysitting": {
    eyebrow: "Babysitting · Dubai",
    title: "Trained caregivers & personalised care",
    intro:
      "Safe, loving babysitting at home with DHA-licensed nurses or trained, background-checked caregivers for newborns and toddlers, with flexible scheduling across Dubai, 24/7.",
    highlights: [
      { icon: ShieldCheck, big: "Vetted", small: "background-checked caregivers" },
      { icon: Clock, big: "Flexible", small: "hourly, nightly or long-term" },
      { icon: Baby, big: "0–3 yrs", small: "newborns & toddlers" },
      { icon: UserRound, big: "DHA", small: "nurses available" },
    ],
    featuresEyebrow: "What We Provide",
    featuresTitle: "Care built around your child",
    features: [
      { icon: Milk, title: "Feeding routines", desc: "Bottle, expressed milk or solids, following your schedule." },
      { icon: Droplets, title: "Hygiene & bathing", desc: "Diaper changes, bathing, dressing and hygiene routines." },
      { icon: Moon, title: "Nap & bedtime", desc: "Nap and bedtime support with preferred soothing techniques." },
      { icon: Puzzle, title: "Play & development", desc: "Playtime, storytelling, songs and developmental activities." },
      { icon: ClipboardList, title: "Clear handovers", desc: "Updates on feeds, nappies, sleep and mood after every visit." },
      { icon: Smile, title: "Loving attention", desc: "Warm, attentive care your little one feels safe with." },
    ],
    includedTitle: "Every Booking Includes",
    includedLead: "Reliable, documented care, for total peace of mind.",
    included: [
      "Feeding on your schedule, bottle, expressed milk or solids",
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
    closingTitle: "Safe, loving care, whenever you need it.",
    closingDesc:
      "Share your child's age, routine and timing, we'll match a trusted caregiver and confirm your booking.",
  },

  /* ---------------------------------------------------------------- */
  "/services/nursing-care/palliative-care": {
    eyebrow: "Palliative Care · Dubai",
    title: "Comfort, symptom control & end-of-life care",
    intro:
      "Compassionate, DHA-licensed palliative nursing care at home in Dubai, delivered within 30 minutes, because healing is not only about treatment, it's about comfort in the place you feel safest.",
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
    closingTitle: "Healing isn't only treatment, it's comfort.",
    closingDesc:
      "Call or WhatsApp us, a DHA-licensed palliative nurse can be with you, typically within 30 minutes in Dubai.",
  },

  /* ---------------------------------------------------------------- */
  "/services/physiotherapy-at-home": {
    eyebrow: "Physiotherapy · Dubai",
    title: "DHA-licensed physiotherapists, in 30 minutes",
    intro:
      "24/7 access to DHA-licensed physiotherapists for post-surgical rehabilitation, sports injuries, chronic pain, neurological and elderly physiotherapy, personalised, one-on-one, in the comfort of home.",
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
    includedLead: "A complete, progressive plan, not a one-off visit.",
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
      "Message or call us with your condition and location, a DHA-licensed physiotherapist can be with you, typically within 30 minutes.",
  },

  /* ---------------------------------------------------------------- */
  "/services/iv-drips": {
    eyebrow: "IV Therapy · Dubai",
    title: "Complete IV therapy, at your doorstep",
    intro:
      "Medical-grade hydration, vitamins, minerals and antioxidants delivered straight into the bloodstream, administered by DHA-certified clinicians at your home, hotel or office, with medical supervision throughout.",
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
      "Message or call us with your goals, a DHA-certified nurse will recommend the right protocol and come to you.",
  },

  /* ---------------------------------------------------------------- */
  "/services/labs-at-home": {
    eyebrow: "Lab Testing · Dubai",
    title: "Lab tests at home, discreet, private, accurate",
    intro:
      "DHA-licensed nurses collect your samples at home, hotel or office across Dubai, processed in DHA & JCI-accredited laboratories, with results shared securely, no queues, no exposure, no commute on an empty stomach.",
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
      "Message or call us with what you need tested, a DHA-licensed nurse will collect your samples at a time that suits you.",
  },

  /* ---------------------------------------------------------------- */
  "/services/vaccination-at-home": {
    eyebrow: "Vaccination · Dubai",
    title: "Adult & travel vaccines, with post-care",
    intro:
      "DHA-compliant vaccinations at home, hotel or office in Dubai, flu shots, adult immunisations and travel vaccines, with strict cold-chain management and post-vaccination monitoring. Please note: NADZ provides vaccinations for adults only.",
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
      "Message or call us, a DHA-licensed nurse will handle your assessment, vaccination and follow-up at home.",
  },

  /* ---------------------------------------------------------------- */
  "/services/medical-tourism": {
    eyebrow: "Medical Tourism · Dubai",
    title: "Care coordination from arrival to recovery",
    intro:
      "Your on-ground care coordinator in Dubai, planning appointments, navigating hospitals, managing logistics and organising recovery, so your care is planned, coordinated and looked after end-to-end.",
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
    closingTitle: "Your care in Dubai, planned, coordinated, looked after.",
    closingDesc:
      "Message or call us, our multilingual team will coordinate your appointments, travel and recovery end to end.",
  },

  /* ================= IV DRIP SUB-PAGES ============================ */
  "/services/iv-drips/iv-nad-plus": {
    eyebrow: "IV NAD⁺ · Dubai",
    title: "Medically supervised cellular energy therapy",
    intro:
      "Restore energy, repair cells and slow the effects of ageing, all in the comfort of your home. NAD⁺ is delivered straight into the bloodstream for 100% absorption, administered by DHA-licensed doctors and nurses.",
    highlights: [
      { icon: ShieldCheck, big: "DHA", small: "doctors & nurses" },
      { icon: Droplet, big: "100%", small: "direct absorption" },
      { icon: Clock, big: "24/7", small: "at home, office or hotel" },
      { icon: HeartPulse, big: "Monitored", small: "supervised throughout" },
    ],
    featuresEyebrow: "What NAD⁺ Supports",
    featuresTitle: "Renewal at the cellular level",
    features: [
      { icon: Battery, title: "Energy & mitochondria", desc: "Boosts energy production and mitochondrial function." },
      { icon: BrainCircuit, title: "Mental clarity", desc: "Sharpens focus, memory and clarity." },
      { icon: Sparkles, title: "Anti-aging & repair", desc: "Supports cellular repair and DNA health." },
      { icon: Dumbbell, title: "Performance & recovery", desc: "Enhances athletic performance and recovery." },
      { icon: Shield, title: "Immunity & detox", desc: "Strengthens immunity and detoxification." },
      { icon: HeartPulse, title: "Mood & stress", desc: "Balances mood and reduces stress." },
    ],
    includedTitle: "Every Session Includes",
    includedLead: "100% absorption, fully supervised.",
    included: [
      "A clinician review of your suitability and goals",
      "A protocol formulated for your needs",
      "NAD⁺ administered by a DHA-licensed nurse",
      "Medical monitoring throughout the infusion",
      "Aftercare guidance",
      "24/7 availability at home, office or hotel",
    ],
    whoEyebrow: "Care Wherever You Are",
    whoTitle: "Therapy that comes to you",
    who: LOCATIONS,
    closingTitle: "Restore energy, repair cells, slow ageing.",
    closingDesc:
      "Message or call us, a DHA-licensed clinician will confirm your protocol and bring NAD⁺ therapy to you.",
  },

  "/services/iv-drips/iv-glutathione-radiance": {
    eyebrow: "IV Glutathione · Dubai",
    title: "Detox & skin glow, at home",
    intro:
      "Rehydrate, refresh and recover with medically supervised glutathione IV therapy at home in Dubai, the master antioxidant for radiant skin, detoxification and anti-aging, administered by DHA-certified clinicians.",
    highlights: [
      { icon: ShieldCheck, big: "DHA", small: "certified clinicians" },
      { icon: Sun, big: "Radiance", small: "brighter, even skin" },
      { icon: Leaf, big: "Detox", small: "liver & antioxidant support" },
      { icon: Clock, big: "24/7", small: "home, hotel or office" },
    ],
    featuresEyebrow: "What Glutathione Supports",
    featuresTitle: "Glow from within",
    features: [
      { icon: Sun, title: "Skin radiance", desc: "Reduces hyperpigmentation for a radiant complexion." },
      { icon: Sparkles, title: "Anti-aging", desc: "Antioxidant anti-aging support." },
      { icon: Leaf, title: "Detox & liver", desc: "Aids detoxification and liver function." },
      { icon: Droplets, title: "Deep hydration", desc: "Rehydrate, refresh and recover." },
      { icon: Flame, title: "Energy boost", desc: "Feel restored and re-energised." },
      { icon: Shield, title: "Immunity", desc: "Antioxidant immune support." },
    ],
    includedTitle: "Every Drip Includes",
    includedLead: "Medically formulated, fully supervised.",
    included: [
      "A clinician review of your suitability and history",
      "A glutathione protocol tailored to your skin goals",
      "The IV administered by a DHA-certified nurse",
      "Medical monitoring throughout the session",
      "Hydration, electrolytes and supportive add-ons where appropriate",
      "24/7 availability across Dubai",
    ],
    whoEyebrow: "Who It's For",
    whoTitle: "Recover and glow",
    who: [
      { icon: Wine, title: "After socialising", desc: "Recover after a big night or event." },
      { icon: Plane, title: "Travel & heat", desc: "Rehydrate after flights or the Dubai heat." },
      { icon: Sparkles, title: "Before events", desc: "Glow ahead of an important day." },
    ],
    closingTitle: "Detox, refresh, glow.",
    closingDesc:
      "Message or call us, a DHA-certified nurse will bring glutathione IV therapy to your door.",
  },

  "/services/iv-drips/iv-vitamin-therapy": {
    eyebrow: "IV Vitamin Therapy · Dubai",
    title: "Targeted drips matched to your goal",
    intro:
      "Restore your energy with medically supervised IV vitamin therapy at home in Dubai, hydration, vitamins, minerals and antioxidants matched to your wellness goal, administered by DHA-certified clinicians.",
    highlights: [
      { icon: ShieldCheck, big: "DHA", small: "certified clinicians" },
      { icon: Clock, big: "24/7", small: "home, hotel or office" },
      { icon: Sparkles, big: "Tailored", small: "matched to your goal" },
      { icon: HeartPulse, big: "Monitored", small: "supervised throughout" },
    ],
    featuresEyebrow: "Our Vitamin Menu",
    featuresTitle: "A drip for every goal",
    features: [
      { icon: Sun, title: "Skin Glow", desc: "Radiance from within." },
      { icon: Sparkles, title: "Skin, Hair & Nails", desc: "Beauty from the inside out." },
      { icon: Leaf, title: "Super Detox", desc: "Cleanse and reset." },
      { icon: Apple, title: "Healthy Gut", desc: "Support digestive balance." },
      { icon: Plane, title: "Travel Reset", desc: "Cold, flu and jet-lag recovery." },
      { icon: Shield, title: "Immune Boost", desc: "HI-C vitamin C and immunity support." },
    ],
    includedTitle: "Every Drip Includes",
    includedLead: "Medical supervision, from first drop to last.",
    included: [
      "A clinician review of your goals and suitability",
      "A vitamin protocol matched to your needs",
      "The IV administered by a DHA-certified nurse",
      "Hydration fluids, electrolytes, vitamins and minerals",
      "Medical monitoring throughout the session",
      "24/7 availability across Dubai",
    ],
    whoEyebrow: "Care Wherever You Are",
    whoTitle: "Wellness that comes to you",
    who: LOCATIONS,
    closingTitle: "Restore your energy, your way.",
    closingDesc:
      "Message or call us, a DHA-certified nurse will match the right drip to your goal and come to you.",
  },

  "/services/iv-drips/iv-hydration": {
    eyebrow: "IV Hydration · Dubai",
    title: "Instant rehydration at home",
    intro:
      "Revive your body and restore your radiance, right where you are. NADZ delivers medically supervised IV hydration, also known as a hangover drip, to your home, hotel or office in Dubai within 30 minutes, via DHA-certified nurses.",
    highlights: [
      { icon: ShieldCheck, big: "DHA", small: "certified nurses" },
      { icon: Zap, big: "30 min", small: "delivery in Dubai" },
      { icon: Clock, big: "24/7", small: "always available" },
      { icon: HeartPulse, big: "Monitored", small: "supervised throughout" },
    ],
    featuresEyebrow: "What Hydration Supports",
    featuresTitle: "Feel better, fast",
    features: [
      { icon: Droplets, title: "Instant rehydration", desc: "Restore fluid balance quickly." },
      { icon: Flame, title: "Energy boost", desc: "Replenish electrolytes and nutrients." },
      { icon: Thermometer, title: "Nausea & headache", desc: "Support when clinically appropriate." },
      { icon: Leaf, title: "Detox & recovery", desc: "Aid natural recovery pathways." },
      { icon: Wine, title: "Hangover relief", desc: "Bounce back after a heavy night." },
      { icon: Lock, title: "Privacy & comfort", desc: "All in the comfort of home." },
    ],
    includedTitle: "Every Drip Includes",
    includedLead: "Personalised protocols, medically monitored.",
    included: [
      "Hydration fluids, electrolytes, vitamins and minerals",
      "A protocol personalised to your health history",
      "The IV administered by a DHA-certified nurse",
      "Anti-nausea add-ons when clinically appropriate",
      "Clinician monitoring throughout the session",
      "30-minute delivery and 24/7 availability in Dubai",
    ],
    whoEyebrow: "Who It's For",
    whoTitle: "Quick recovery, wherever you are",
    who: [
      { icon: Wine, title: "After socialising", desc: "Recover after a big night or event." },
      { icon: Plane, title: "Travel & heat", desc: "Rehydrate after flights or the Dubai heat." },
      { icon: Sparkles, title: "Before events", desc: "Feel your best ahead of an important day." },
    ],
    closingTitle: "Revive your body. Restore your radiance.",
    closingDesc:
      "Message or call us, a DHA-certified nurse can be with you, typically within 30 minutes in Dubai.",
  },

  /* ================= LABS SUB-PAGES ============================== */
  "/services/labs-at-home/genetic-epigenetic-testing": {
    eyebrow: "Genetic Testing · Dubai",
    title: "Unlock insights, personalise your health",
    intro:
      "At-home genetic and genomics testing in Dubai with DHA-licensed doctors and nurses. Samples are collected safely at home and processed in accredited labs for accurate insight into inherited conditions, disease risk and wellness.",
    highlights: [
      { icon: ShieldCheck, big: "DHA", small: "licensed staff" },
      { icon: Microscope, big: "Accredited", small: "certified laboratories" },
      { icon: Lock, big: "Private", small: "confidential data handling" },
      { icon: Clock, big: "24/7", small: "home, office or hotel" },
    ],
    featuresEyebrow: "Tests Offered",
    featuresTitle: "Insight written in your DNA",
    features: [
      { icon: Shield, title: "Health risk screening", desc: "Understand your risk for key conditions." },
      { icon: Dna, title: "Carrier screening", desc: "Identify inherited carrier status." },
      { icon: Pill, title: "Pharmacogenomics", desc: "How your body responds to medication." },
      { icon: Salad, title: "Nutrigenomics", desc: "Nutrition matched to your genes." },
      { icon: Users, title: "Ancestry & family health", desc: "Ancestry and family health insights." },
      { icon: Microscope, title: "Certified analysis", desc: "Processed in accredited laboratories." },
    ],
    includedTitle: "How Your Test Works",
    includedLead: "Certified analysis, expert guidance.",
    included: [
      "Safe home sample collection by a DHA-licensed nurse",
      "Analysis in a certified laboratory",
      "Confidential, secure data handling",
      "A personalised, easy-to-read report",
      "Expert doctor guidance on your results",
      "24/7 support across Dubai",
    ],
    whoEyebrow: "Who It's For",
    whoTitle: "Health tailored to you",
    who: [
      { icon: Users, title: "Family history", desc: "Understand inherited risks." },
      { icon: Baby, title: "Planning pregnancy", desc: "Carrier insight before conceiving." },
      { icon: Gauge, title: "Personal optimisation", desc: "Health tailored to your DNA." },
    ],
    closingTitle: "Discover your DNA.",
    closingDesc:
      "Message or call us, a DHA-licensed nurse will collect your sample at home and a doctor will guide you through the results.",
  },

  "/services/labs-at-home/food-intolerance-allergies": {
    eyebrow: "Food Intolerance · Dubai",
    title: "Advanced blood screening & diet plan",
    intro:
      "At-home food intolerance testing in Dubai with DHA-licensed doctors and nurses. Identify the foods behind bloating, fatigue, headaches or skin issues with a private blood test at your doorstep, results explained by a doctor.",
    highlights: [
      { icon: ShieldCheck, big: "DHA", small: "licensed staff" },
      { icon: FlaskConical, big: "DHA lab", small: "approved analysis" },
      { icon: Lock, big: "Private", small: "discreet home testing" },
      { icon: Clock, big: "24/7", small: "phone & WhatsApp" },
    ],
    featuresEyebrow: "What We Screen",
    featuresTitle: "Know what your body reacts to",
    features: [
      { icon: Milk, title: "Dairy products", desc: "Common source of delayed reactions." },
      { icon: Wheat, title: "Gluten", desc: "Wheat, barley and rye." },
      { icon: Egg, title: "Eggs & soy", desc: "Frequent hidden triggers." },
      { icon: Nut, title: "Tree nuts", desc: "Screened across common varieties." },
      { icon: Fish, title: "Shellfish", desc: "Identify sensitivity safely." },
      { icon: Coffee, title: "Caffeine & additives", desc: "Caffeine and food additives." },
    ],
    includedTitle: "How Your Test Works",
    includedLead: "Blood screening, explained by a doctor.",
    included: [
      "A blood test analysed for delayed reactions",
      "Identification of the foods causing discomfort",
      "A detailed, easy-to-read report",
      "DHA-approved laboratory processing",
      "Results explained by a licensed doctor",
      "24/7 support across Dubai",
    ],
    whoEyebrow: "Who It's For",
    whoTitle: "Feel better, every day",
    who: [
      { icon: Utensils, title: "Digestive issues", desc: "Bloating and gut discomfort." },
      { icon: Flame, title: "Fatigue & headaches", desc: "Unexplained tiredness and aches." },
      { icon: Sparkles, title: "Diet optimisation", desc: "Proactively fine-tune your diet." },
    ],
    closingTitle: "Understand your body, improve your health.",
    closingDesc:
      "Message or call us, a DHA-licensed nurse will collect your sample at home and a doctor will explain your results.",
  },

  "/services/labs-at-home/nipt-womens-health": {
    eyebrow: "NIPT · Dubai",
    title: "Non-invasive prenatal testing, zero risk to your baby",
    intro:
      "NIPT testing at home in Dubai, a safe and highly accurate way to screen for chromosomal conditions during pregnancy. It requires only a maternal blood sample, making it completely safe for both mother and baby.",
    highlights: [
      { icon: ShieldCheck, big: "Zero risk", small: "maternal blood only" },
      { icon: Gauge, big: "> 99%", small: "sensitivity for trisomies" },
      { icon: Baby, big: "Week 10", small: "as early as week 10" },
      { icon: Clock, big: "24/7", small: "discreet home service" },
    ],
    featuresEyebrow: "What It Screens For",
    featuresTitle: "Early, reassuring answers",
    features: [
      { icon: Dna, title: "Down syndrome", desc: "Trisomy 21 screening." },
      { icon: Dna, title: "Edwards & Patau", desc: "Trisomy 18 and Trisomy 13." },
      { icon: HeartPulse, title: "Sex chromosomes", desc: "Sex chromosome abnormalities." },
      { icon: Baby, title: "Gender (optional)", desc: "Optional baby gender determination." },
      { icon: Gauge, title: ">99% sensitivity", desc: "For common trisomies." },
      { icon: Microscope, title: "Accredited analysis", desc: "Processed in accredited laboratories." },
    ],
    includedTitle: "How Your Test Works",
    includedLead: "One blood sample, expert support.",
    included: [
      "A simple maternal blood sample, collected at home",
      "Screening for T21, T18, T13 and sex chromosomes",
      "Optional baby gender determination",
      "Can be done as early as week 10 of pregnancy",
      ">99% sensitivity for common trisomies",
      "Discreet service with personalised support",
    ],
    whoEyebrow: "Who It's For",
    whoTitle: "Reassurance for your pregnancy",
    who: [
      { icon: Baby, title: "Expecting mothers", desc: "Early, safe reassurance." },
      { icon: HeartPulse, title: "Age 35+", desc: "Higher-sensitivity screening." },
      { icon: Dna, title: "Family history", desc: "Where genetic risk is a concern." },
    ],
    closingTitle: "Safe, accurate, non-invasive.",
    closingDesc:
      "Message or call us, a DHA-licensed nurse will collect your sample at home, with expert support throughout.",
  },

  "/services/labs-at-home/std-sexual-health": {
    eyebrow: "STD Testing · Dubai",
    title: "Discreet, DHA-licensed home collection",
    intro:
      "Discreet and accurate STD testing at home in Dubai, with complete privacy and comfort. DHA-licensed professionals collect your samples at home, processed in DHA-approved laboratories, early detection is key to effective treatment.",
    highlights: [
      { icon: ShieldCheck, big: "DHA", small: "licensed professionals" },
      { icon: Lock, big: "100%", small: "confidential & discreet" },
      { icon: FlaskConical, big: "Certified", small: "approved laboratories" },
      { icon: Clock, big: "24/7", small: "support & booking" },
    ],
    featuresEyebrow: "What We Test For",
    featuresTitle: "Comprehensive, confidential screening",
    features: [
      { icon: Shield, title: "HIV", desc: "Confidential HIV screening." },
      { icon: Microscope, title: "Hepatitis B & C", desc: "Screening for hepatitis B and C." },
      { icon: TestTube, title: "Syphilis", desc: "Accurate syphilis testing." },
      { icon: FlaskConical, title: "Gonorrhea & chlamydia", desc: "Common STI screening." },
      { icon: Dna, title: "Herpes & HPV", desc: "Herpes I & II and HPV." },
      { icon: ScanLine, title: "RT-PCR panels", desc: "STD 4 to STD 86 RT-PCR panels." },
    ],
    includedTitle: "What's Included",
    includedLead: "100% confidential, from sample to report.",
    included: [
      "Discreet home collection by a DHA-licensed nurse",
      "Comprehensive panels to suit your needs",
      "Accurate results from certified laboratories",
      "Fast, secure and private reporting",
      "Expert medical support, 24/7",
      "Complete confidentiality throughout",
    ],
    whoEyebrow: "Who It's For",
    whoTitle: "Peace of mind, in private",
    who: [
      { icon: Lock, title: "Complete privacy", desc: "Confidential from start to finish." },
      { icon: Users, title: "Peace of mind", desc: "Routine screening for reassurance." },
      { icon: ShieldCheck, title: "Early detection", desc: "Key to effective treatment." },
    ],
    closingTitle: "Confidential, reliable, hassle-free.",
    closingDesc:
      "Message or call us, a DHA-licensed nurse will handle your collection discreetly, with secure results.",
  },

  "/services/labs-at-home/covid-pcr": {
    eyebrow: "PCR Testing · Dubai",
    title: "COVID-19 & infectious disease PCR at home",
    intro:
      "Fast, accurate and hassle-free PCR testing at home in Dubai. DHA-licensed nurses deliver professional COVID-19 and infectious disease testing to your doorstep, the gold standard for detecting viral genetic material.",
    highlights: [
      { icon: ShieldCheck, big: "DHA", small: "licensed nurses" },
      { icon: Timer, big: "24–48h", small: "typical result time" },
      { icon: Plane, big: "Travel", small: "certified for travel" },
      { icon: Clock, big: "24/7", small: "support across Dubai" },
    ],
    featuresEyebrow: "What We Offer",
    featuresTitle: "Gold-standard PCR, at home",
    features: [
      { icon: ScanLine, title: "COVID-19 PCR", desc: "Accurate COVID-19 detection." },
      { icon: Timer, title: "RT-PCR", desc: "Real-time PCR testing." },
      { icon: Plane, title: "Travel PCR", desc: "Travel-ready certified results." },
      { icon: Building2, title: "Workplace testing", desc: "On-site employee screening." },
      { icon: Stethoscope, title: "Pre-surgery screening", desc: "Clearance ahead of procedures." },
      { icon: Network, title: "Contact tracing", desc: "Testing to confirm and trace." },
    ],
    includedTitle: "Why Choose Home PCR",
    includedLead: "Certified results, without the clinic.",
    included: [
      "Collection by a DHA-licensed nurse at home",
      "Processing in DHA-approved laboratories",
      "Results typically within 24–48 hours",
      "Travel-ready certified results",
      "Testing in the comfort of your own space",
      "24/7 support across Dubai",
    ],
    whoEyebrow: "When to Test",
    whoTitle: "Testing when you need it",
    who: [
      { icon: Plane, title: "Travel requirements", desc: "Certified results for your trip." },
      { icon: Thermometer, title: "Symptoms or exposure", desc: "Confirm quickly and privately." },
      { icon: Building2, title: "Workplace & pre-surgery", desc: "Screening when it's required." },
    ],
    closingTitle: "Fast, accurate, hassle-free.",
    closingDesc:
      "Message or call us, a DHA-licensed nurse will collect your PCR sample at home, with travel-ready results.",
  },

  /* ================= NADZ EXCLUSIVE ============================== */
  "/exclusive/nadz-vital-brain": {
    eyebrow: "NADZ Vital Brain™ · Dubai",
    title: "Brain mapping at home with AI insights",
    intro:
      "Clinical-grade brain insights at home in Dubai. NADZ Vital Brain uses non-invasive QEEG brain mapping with AI analysis, and every case is reviewed by a 2,000-doctor panel, for those managing symptoms or optimising performance.",
    highlights: [
      { icon: AudioWaveform, big: "QEEG", small: "brain-activity mapping" },
      { icon: Users, big: "2,000", small: "doctor review panel" },
      { icon: BrainCircuit, big: "AI", small: "clinical-grade insights" },
      { icon: House, big: "At home", small: "across Dubai" },
    ],
    featuresEyebrow: "What It Helps With",
    featuresTitle: "Understand how your brain works",
    features: [
      { icon: Wind, title: "Anxiety & stress", desc: "Overwhelm and persistent stress." },
      { icon: HeartPulse, title: "Mood & motivation", desc: "Low motivation and emotional instability." },
      { icon: BrainCircuit, title: "Focus & attention", desc: "Attention and productivity struggles." },
      { icon: Brain, title: "Memory & clarity", desc: "Memory concerns and cognitive fog." },
      { icon: Moon, title: "Sleep disturbances", desc: "Restless, disrupted sleep." },
      { icon: Gauge, title: "Peak performance", desc: "Optimise an already-healthy brain." },
    ],
    includedTitle: "Three Plans, Basic, Premium, Elite",
    includedLead: "Clinical-grade insight, tailored to you.",
    included: [
      "Basic, memory/attention assessment, QEEG screening, basic blood & vitamin profile",
      "Premium, full cognitive testing, 21+ channel QEEG, comprehensive health check",
      "Elite, advanced QEEG, 50+ blood parameters, autonomic analysis, DNA methylation",
      "Non-invasive QEEG recorded in the comfort of home",
      "Every case reviewed by a 2,000-doctor panel",
      "Results reviewed with clear, personal guidance",
    ],
    whoEyebrow: "Who It's For",
    whoTitle: "For symptoms and for performance",
    who: [
      { icon: Building2, title: "Executives", desc: "Sustain focus and cognitive edge." },
      { icon: BookOpen, title: "Students", desc: "Sharpen memory and attention." },
      { icon: Dumbbell, title: "Athletes", desc: "Optimise recovery and performance." },
    ],
    closingTitle: "Understand your brain. Optimise your performance.",
    closingDesc:
      "Message or call us, we'll confirm the right plan and bring NADZ Vital Brain to your home.",
  },

  "/exclusive/nadz-autonomic-control": {
    eyebrow: "NADZ Autonomic Control™ · Dubai",
    title: "Non-invasive ANS regulation at home",
    intro:
      "A premium neuromodulation therapy at home in Dubai, using the patented NESA® XSIGNAL® microcurrent system to gently rebalance the autonomic nervous system, supporting sleep, stress, pain, pelvic health and sexual function.",
    highlights: [
      { icon: ShieldCheck, big: "Exclusive", small: "NESA® provider in the UAE" },
      { icon: AudioWaveform, big: "Non-invasive", small: "sub-sensory microcurrent" },
      { icon: Timer, big: "65–95 min", small: "per session" },
      { icon: House, big: "At home", small: "concierge delivery" },
    ],
    featuresEyebrow: "What It Supports",
    featuresTitle: "Rebalance the system that runs you",
    features: [
      { icon: AudioWaveform, title: "ANS balance", desc: "Rebalance the autonomic nervous system." },
      { icon: Moon, title: "Sleep & circadian", desc: "Better sleep and circadian rhythm." },
      { icon: Wind, title: "Stress recovery", desc: "Emotional regulation and calm." },
      { icon: Activity, title: "Chronic pain", desc: "Pain modulation and relief." },
      { icon: Droplet, title: "Pelvic & bladder", desc: "Pelvic floor and bladder function." },
      { icon: HeartPulse, title: "Sexual function", desc: "Male sexual function support." },
    ],
    includedTitle: "Your Session (65–95 min)",
    includedLead: "Sub-sensory microcurrent, fully clothed.",
    included: [
      "Screening (5–10 minutes)",
      "Electrode placement (3–5 minutes)",
      "Sub-sensory microcurrent session (40–60 minutes)",
      "Review and a personalised plan (5–10 minutes)",
      "Non-invasive and typically not felt",
      "Delivered by certified clinicians in your home",
    ],
    whoEyebrow: "What It Treats",
    whoTitle: "For chronic autonomic imbalance",
    who: [
      { icon: Moon, title: "Sleep & stress", desc: "Burnout, poor sleep and fatigue." },
      { icon: Activity, title: "Pain & recovery", desc: "Chronic pain and autonomic overload." },
      { icon: Droplet, title: "Pelvic health", desc: "Bladder and sexual function." },
    ],
    closingTitle: "Rebalance the system that runs you.",
    closingDesc:
      "Message or call us, a certified NESA® clinician will assess your suitability and deliver sessions at home.",
  },

  "/exclusive/nadz-autonomic-control/sleeping-disorder": {
    eyebrow: "Sleep Disorders · Dubai",
    title: "Sleep disorders care, at home, hotel or office",
    intro:
      "When sleep struggles drain your energy, focus and mood, NADZ brings a DHA-licensed doctor to you for a confidential assessment, supported by NADZ Autonomic Control™ to help restore balance in the nervous system that governs sleep.",
    highlights: [
      { icon: ShieldCheck, big: "DHA", small: "licensed doctor" },
      { icon: HeartPulse, big: "HRV", small: "baseline snapshot" },
      { icon: Timer, big: "60 min", small: "microcurrent sessions" },
      { icon: Lock, big: "Discreet", small: "private, at your location" },
    ],
    featuresEyebrow: "What It Helps With",
    featuresTitle: "Rest that restores you",
    features: [
      { icon: Moon, title: "Insomnia", desc: "Trouble falling asleep." },
      { icon: Bed, title: "Sleep maintenance", desc: "Waking through the night." },
      { icon: Timer, title: "Non-restorative sleep", desc: "Waking unrefreshed." },
      { icon: Wind, title: "Stress-linked sleep", desc: "Stress and over-arousal." },
      { icon: Plane, title: "Jet lag", desc: "Travel-disrupted rhythm." },
      { icon: Pill, title: "Medication review", desc: "Review of current medications." },
    ],
    includedTitle: ANS_INCLUDED_TITLE,
    includedLead: ANS_INCLUDED_LEAD,
    included: ANS_PATHWAY,
    whoEyebrow: "Who It's For",
    whoTitle: "Discreet, rapid support",
    who: ANS_WHO,
    closingTitle: "Restore balance. Sleep well again.",
    closingDesc:
      "Message or call us for a discreet doctor consultation, private support, 24/7.",
  },

  "/exclusive/nadz-autonomic-control/anxiety-stress": {
    eyebrow: "Anxiety & Stress · Dubai",
    title: "Anxiety & stress care, at home, hotel or office",
    intro:
      "Persistent stress and anxiety can disrupt focus, mood and sleep. NADZ brings a DHA-licensed doctor to your location for a confidential assessment and a personalised plan, supported by NADZ Autonomic Control™.",
    highlights: [
      { icon: ShieldCheck, big: "DHA", small: "licensed doctor" },
      { icon: HeartPulse, big: "HRV", small: "baseline snapshot" },
      { icon: Wind, big: "Calm", small: "autonomic regulation" },
      { icon: Lock, big: "Private", small: "at your location" },
    ],
    featuresEyebrow: "What It Helps With",
    featuresTitle: "Find your calm again",
    features: [
      { icon: Wind, title: "Generalised anxiety", desc: "Restlessness and racing thoughts." },
      { icon: HeartPulse, title: "Panic episodes", desc: "Intense fear and physical tension." },
      { icon: Building2, title: "Work stress", desc: "Irritability and lost focus." },
      { icon: Plane, title: "Travel & adjustment", desc: "Jet lag and life change." },
      { icon: Moon, title: "Poor sleep", desc: "Sleep disrupted by stress." },
      { icon: Activity, title: "Tension & headaches", desc: "Muscle tension and headaches." },
    ],
    includedTitle: ANS_INCLUDED_TITLE,
    includedLead: ANS_INCLUDED_LEAD,
    included: ANS_PATHWAY,
    whoEyebrow: "Who It's For",
    whoTitle: "Discreet, rapid support",
    who: ANS_WHO,
    closingTitle: "Feeling calm drives health, sleep & performance.",
    closingDesc:
      "Message or call us for a discreet doctor consultation, private support, 24/7.",
  },

  "/exclusive/nadz-autonomic-control/chronic-pain": {
    eyebrow: "Chronic Pain · Dubai",
    title: "Chronic pain care, at home, hotel or office",
    intro:
      "Because living with pain shouldn't define your day. NADZ sends a DHA-licensed doctor to your location for a private assessment and a customised plan, supported by NADZ Autonomic Control™ to help modulate pain at its source.",
    highlights: [
      { icon: ShieldCheck, big: "DHA", small: "licensed doctor" },
      { icon: HeartPulse, big: "HRV", small: "baseline snapshot" },
      { icon: Activity, big: "Relief", small: "pain modulation" },
      { icon: Lock, big: "Private", small: "at your location" },
    ],
    featuresEyebrow: "What It Helps With",
    featuresTitle: "Care for pain that lingers",
    features: [
      { icon: Bone, title: "Back & neck pain", desc: "Mechanical, postural and stress-related." },
      { icon: Activity, title: "Muscle & joint pain", desc: "Overuse, desk strain and post-exercise." },
      { icon: Brain, title: "Headaches & tension", desc: "Stress-related headaches and facial tension." },
      { icon: Zap, title: "Nerve discomfort", desc: "Tingling, burning and sensitivity." },
      { icon: Bandage, title: "Post-surgical pain", desc: "Persistent post-surgical pain." },
      { icon: Moon, title: "Sleep & fatigue", desc: "Pain-linked poor sleep and fatigue." },
    ],
    includedTitle: ANS_INCLUDED_TITLE,
    includedLead: ANS_INCLUDED_LEAD,
    included: ANS_PATHWAY,
    whoEyebrow: "Who It's For",
    whoTitle: "Discreet, rapid support",
    who: ANS_WHO,
    closingTitle: "Because living with pain shouldn't define your day.",
    closingDesc:
      "Message or call us for a discreet doctor consultation, private support, 24/7.",
  },

  "/exclusive/nadz-autonomic-control/erectile-dysfunction": {
    eyebrow: "ED & PE · Dubai",
    title: "ED & PE treatment, at home, hotel or office",
    intro:
      "Because your intimate health deserves privacy and real solutions. NADZ offers confidential ED and PE care through a DHA-licensed doctor at your private location, supported by NADZ Autonomic Control™, complete discretion throughout.",
    highlights: [
      { icon: ShieldCheck, big: "DHA", small: "licensed doctor" },
      { icon: HeartPulse, big: "HRV", small: "baseline snapshot" },
      { icon: Lock, big: "Discreet", small: "complete privacy" },
      { icon: Timer, big: "60 min", small: "microcurrent sessions" },
    ],
    featuresEyebrow: "What It Helps With",
    featuresTitle: "Confidential, real solutions",
    features: [
      { icon: HeartHandshake, title: "Erectile dysfunction", desc: "Firmness and performance concerns." },
      { icon: Timer, title: "Premature ejaculation", desc: "Control and satisfaction." },
      { icon: Wind, title: "Performance anxiety", desc: "Stress and tension." },
      { icon: Moon, title: "Sleep & fatigue", desc: "Chronic fatigue factors." },
      { icon: Activity, title: "Pelvic tension", desc: "Pelvic floor patterns." },
      { icon: Pill, title: "Medication review", desc: "Review of current medications." },
    ],
    includedTitle: ANS_INCLUDED_TITLE,
    includedLead: ANS_INCLUDED_LEAD,
    included: ANS_PATHWAY,
    whoEyebrow: "Who It's For",
    whoTitle: "Discreet, rapid support",
    who: ANS_WHO,
    closingTitle: "Your intimate health deserves privacy & real solutions.",
    closingDesc:
      "Message or call us for a discreet doctor visit, private support, 24/7.",
  },

  "/exclusive/nadz-autonomic-control/overreacting-bladder": {
    eyebrow: "Overactive Bladder · Dubai",
    title: "Overactive bladder care, at home, hotel or office",
    intro:
      "Because urgency and frequency shouldn't control your day. NADZ brings a DHA-licensed doctor to your private location for a confidential assessment and a personalised plan, supported by NADZ Autonomic Control™.",
    highlights: [
      { icon: ShieldCheck, big: "DHA", small: "licensed doctor" },
      { icon: HeartPulse, big: "HRV", small: "baseline snapshot" },
      { icon: Droplet, big: "Control", small: "bladder regulation" },
      { icon: Lock, big: "Private", small: "at your location" },
    ],
    featuresEyebrow: "What It Helps With",
    featuresTitle: "Take back your day",
    features: [
      { icon: Droplet, title: "Urgency & frequency", desc: "Sudden urges, going too often." },
      { icon: Moon, title: "Nocturia", desc: "Waking at night to urinate." },
      { icon: Droplets, title: "Urgency incontinence", desc: "Leaks with sudden urges." },
      { icon: Activity, title: "Pelvic floor tension", desc: "Stress-related bladder patterns." },
      { icon: Wind, title: "Anxiety-linked", desc: "Stress and sleep factors." },
      { icon: Pill, title: "Medication review", desc: "Review of current medications." },
    ],
    includedTitle: ANS_INCLUDED_TITLE,
    includedLead: ANS_INCLUDED_LEAD,
    included: ANS_PATHWAY,
    whoEyebrow: "Who It's For",
    whoTitle: "Discreet, rapid support",
    who: ANS_WHO,
    closingTitle: "Because urgency shouldn't control your day.",
    closingDesc:
      "Message or call us for a discreet doctor consultation, private support, 24/7.",
  },

  "/exclusive/poc-testing": {
    eyebrow: "POC Testing · Dubai",
    title: "Point-of-care testing at home in minutes",
    intro:
      "Point-of-care testing delivered to your home, hotel or office in Dubai, DHA-licensed nurses with MOHAP-certified devices bring rapid results in minutes, without a clinic visit or the wait for a lab report.",
    highlights: [
      { icon: ShieldCheck, big: "DHA", small: "licensed nurses" },
      { icon: ScanLine, big: "MOHAP", small: "certified devices" },
      { icon: Zap, big: "Minutes", small: "results on the spot" },
      { icon: Clock, big: "24/7", small: "home, hotel or office" },
    ],
    featuresEyebrow: "Tests Available",
    featuresTitle: "Instant answers, at your side",
    features: [
      { icon: Droplet, title: "Hemoglobin", desc: "Result in around 22 seconds." },
      { icon: Microscope, title: "WBC count", desc: "Result in around 5 minutes." },
      { icon: Gauge, title: "Blood glucose", desc: "Blood sugar monitoring." },
      { icon: Activity, title: "HbA1c", desc: "Result in around 5 minutes." },
      { icon: Thermometer, title: "Rapid infection tests", desc: "Quick infection screens." },
      { icon: HeartPulse, title: "Vital screening", desc: "O₂, blood pressure and temperature." },
    ],
    includedTitle: "What's Included",
    includedLead: "Certified equipment, results in minutes.",
    included: [
      "A visit from a licensed nurse with certified equipment",
      "Results in minutes for many tests",
      "Doctor consultation available",
      "Coordination with lab testing, IV therapy and home nursing",
      "Guidance on your next steps",
      "24/7 support across Dubai",
    ],
    whoEyebrow: "Who It's For",
    whoTitle: "Fast answers, wherever you are",
    who: [
      { icon: HeartPulse, title: "Chronic conditions", desc: "Regular at-home monitoring." },
      { icon: Plane, title: "Travellers & professionals", desc: "Quick screens on the go." },
      { icon: Building2, title: "Workplace wellness", desc: "Employee screening on-site." },
    ],
    closingTitle: "Rapid, reliable results, in minutes.",
    closingDesc:
      "Message or call us, our 24/7 team will bring point-of-care testing to your door.",
  },

  /* ================= WELLNESS & LONGEVITY ======================= */
  "/wellness/nad-plus-iv-therapy": {
    eyebrow: "NAD⁺ IV Therapy · Dubai",
    title: "Cellular energy, mental clarity, longevity",
    intro:
      "NAD⁺ is a vital molecule found in every cell, powering energy, DNA repair, brain performance and metabolism. Age, stress and illness deplete it. NADZ restores it with doctor-designed IV therapy, directly to your doorstep.",
    highlights: [
      { icon: ShieldCheck, big: "DHA", small: "licensed professionals" },
      { icon: Battery, big: "Energy", small: "cellular fuel restored" },
      { icon: Sparkles, big: "Longevity", small: "anti-aging support" },
      { icon: House, big: "At home", small: "premium experience" },
    ],
    featuresEyebrow: "What NAD⁺ Supports",
    featuresTitle: "Renewal from the inside out",
    features: [
      { icon: Battery, title: "Cellular energy", desc: "Boost energy and reduce fatigue." },
      { icon: BrainCircuit, title: "Brain function", desc: "Focus, memory and clarity." },
      { icon: Sparkles, title: "Longevity", desc: "Anti-aging cellular support." },
      { icon: Flame, title: "Metabolism", desc: "Metabolic efficiency and recovery." },
      { icon: Shield, title: "Detox & immunity", desc: "Reduce inflammation, support immunity." },
      { icon: Dumbbell, title: "Performance", desc: "Athletic performance and recovery." },
    ],
    includedTitle: "Your NAD⁺ Journey",
    includedLead: "Doctor-designed, personally dosed.",
    included: [
      "Consultation and medical screening",
      "Customised dosage determination",
      "Infusion by a DHA-licensed nurse (60–180 minutes)",
      "Post-treatment monitoring",
      "Integrated with a wider longevity plan",
      "24/7 at-home availability",
    ],
    whoEyebrow: "Who It's For",
    whoTitle: "Feel like yourself again",
    who: [
      { icon: Battery, title: "Low energy & burnout", desc: "Recover from chronic fatigue." },
      { icon: BrainCircuit, title: "Brain fog", desc: "Restore focus and clarity." },
      { icon: Gauge, title: "Longevity seekers", desc: "Optimise healthy ageing." },
    ],
    closingTitle: "Cellular renewal, directly to your doorstep.",
    closingDesc:
      "Message or call us, a DHA-licensed clinician will design your dose and bring NAD⁺ therapy to you.",
  },

  "/wellness/peptide-therapy": {
    eyebrow: "Peptide Therapy · Dubai",
    title: "Cellular regeneration & performance optimisation",
    intro:
      "Peptides are short chains of amino acids that act as messengers, activating repair, regulating hormones, modulating inflammation and supporting tissue regeneration. Highly bioavailable and fast-acting, medically supervised by NADZ.",
    highlights: [
      { icon: ShieldCheck, big: "Supervised", small: "medically managed protocols" },
      { icon: Dna, big: "Biomarker", small: "personalised plans" },
      { icon: Sparkles, big: "Regenerate", small: "repair & renewal" },
      { icon: House, big: "Home/clinic", small: "in Dubai" },
    ],
    featuresEyebrow: "What Peptides Support",
    featuresTitle: "Repair, regenerate, optimise",
    features: [
      { icon: Bandage, title: "Healing & repair", desc: "Accelerated tissue repair." },
      { icon: Flame, title: "Metabolic balance", desc: "Body-composition support." },
      { icon: Sparkles, title: "Anti-aging", desc: "Regenerative, longevity support." },
      { icon: Shield, title: "Immune modulation", desc: "Reduce inflammation." },
      { icon: BrainCircuit, title: "Cognitive & vitality", desc: "Hormonal and cognitive support." },
      { icon: Dumbbell, title: "Performance", desc: "For athletes and executives." },
    ],
    includedTitle: "Your Treatment Journey",
    includedLead: "Biomarker-based, medically supervised.",
    included: [
      "Comprehensive assessment and clinical mapping",
      "A personalised peptide protocol design",
      "Safe, controlled clinical administration",
      "Integration into your wider wellness blueprint",
      "Ongoing review, adjustments and maintenance",
      "Home or clinic-based administration",
    ],
    whoEyebrow: "Who It's For",
    whoTitle: "For repair and vitality",
    who: [
      { icon: Dumbbell, title: "Athletes & executives", desc: "Peak performance and recovery." },
      { icon: Flame, title: "Metabolic optimisation", desc: "Body composition and energy." },
      { icon: Sparkles, title: "Healthy aging", desc: "Regenerative, longevity-focused." },
    ],
    closingTitle: "Repair, regenerate, optimise.",
    closingDesc:
      "Message or call us, a NADZ clinician will design a biomarker-based peptide protocol for you.",
  },

  "/wellness/functional-integrative-medicine": {
    eyebrow: "Functional Medicine · Dubai",
    title: "Root-cause healing & lifelong wellness",
    intro:
      "A systems-biology approach that treats the body as one interconnected ecosystem, not isolated symptoms. NADZ examines how your gut, brain, hormones, immunity and lifestyle shape your health, and what your body needs to truly heal.",
    highlights: [
      { icon: ShieldCheck, big: "Doctor-led", small: "holistic care" },
      { icon: Microscope, big: "Advanced", small: "functional diagnostics" },
      { icon: Network, big: "Whole-person", small: "systems-biology" },
      { icon: House, big: "At home", small: "luxe experience" },
    ],
    featuresEyebrow: "The Functional Health Matrix",
    featuresTitle: "Six systems, one you",
    features: [
      { icon: Flame, title: "Metabolic & mitochondrial", desc: "Energy at the cellular level." },
      { icon: Apple, title: "Gut & digestive", desc: "Your digestive ecosystem." },
      { icon: HeartPulse, title: "Hormonal & endocrine", desc: "Hormonal and endocrine balance." },
      { icon: Leaf, title: "Detox & renewal", desc: "Detoxification and cellular renewal." },
      { icon: AudioWaveform, title: "Neurological & autonomic", desc: "Nervous-system regulation." },
      { icon: Dna, title: "Lifestyle & genetics", desc: "Nutrition and genetic expression." },
    ],
    includedTitle: "Your Treatment Journey",
    includedLead: "Whole-person, systems-biology care.",
    included: [
      "A deep-dive consultation and health mapping",
      "Advanced diagnostics and functional testing",
      "Root-cause analysis and systems interpretation",
      "A personalised therapeutic blueprint",
      "Interventions with ongoing progress tracking",
      "Long-term optimisation and longevity integration",
    ],
    whoEyebrow: "Who It's For",
    whoTitle: "For whole-person wellness",
    who: [
      { icon: Network, title: "Multi-system symptoms", desc: "Unexplained, connected issues." },
      { icon: Gauge, title: "Prevention & longevity", desc: "Proactive, root-cause care." },
      { icon: BrainCircuit, title: "Energy & clarity", desc: "Better focus and vitality." },
    ],
    closingTitle: "Your personalised pathway to root-cause healing.",
    closingDesc:
      "Message or call us, a NADZ doctor will map your systems and build a whole-person plan for lasting wellness.",
  },
};
