/* Open roles for the Careers page.

   There's no jobs CMS, so a vacancy is "posted" by adding an entry here and a
   removed one by deleting it. When the list is empty the page shows the
   "no open roles, join the talent pool" card instead. Keep the newest role
   first. */

export type Role = {
  /** Used in the apply-email subject and as the React key. */
  slug: string;
  title: string;
  location: string;
  type: string; // e.g. "Full-Time"
  summary: string;
  responsibilities: string[];
  requirements: string[];
  /** A filled/expired vacancy. Kept on the page as a muted "closed" card
      (no apply button) rather than deleted, so recent postings still show. */
  closed?: boolean;
};

export const ROLES: Role[] = [
  {
    slug: "business-development-executive",
    title: "Business Development Executive",
    location: "Dubai, UAE",
    type: "Full-Time",
    summary:
      "NADZ Healthcare is looking for a motivated, confident, and results-driven Business Development Executive with a strong healthcare background to join our team in Dubai.",
    responsibilities: [
      "Identify and develop new business opportunities in the healthcare sector",
      "Build and maintain strong relationships with clients and healthcare partners",
      "Generate leads and convert potential clients into business opportunities",
      "Conduct client meetings, presentations, and follow-ups",
      "Develop strategies to achieve business development and revenue targets",
      "Research market trends, competitors, and potential business opportunities",
      "Coordinate with internal teams to ensure smooth client onboarding and service delivery",
      "Maintain regular records and reports of business development activities",
      "Represent the company at meetings, networking events, and promotional activities",
    ],
    requirements: [
      "Minimum 3 years of experience in business development within the healthcare industry",
      "Strong understanding of the UAE healthcare market is preferred",
      "Proven experience in client acquisition, lead generation, and relationship management",
      "Excellent communication, negotiation, and presentation skills",
      "Strong networking and interpersonal skills",
      "Target-oriented, proactive, and self-motivated",
      "Ability to work independently and as part of a team",
    ],
  },
  {
    slug: "caregiver-nursing-assistant",
    title: "Caregiver / Nursing Assistant",
    location: "Dubai, UAE",
    type: "Full-Time",
    summary:
      "NADZ Healthcare is looking for a compassionate, responsible, and dedicated Caregiver/Nursing Assistant to join our healthcare team in Dubai.",
    responsibilities: [
      "Assist patients with daily activities and personal care",
      "Support patients with mobility, hygiene, feeding, and dressing",
      "Assist nurses and healthcare professionals with patient care",
      "Monitor patients and report any changes in their condition",
      "Provide companionship and emotional support to patients",
      "Maintain a clean, safe, and comfortable environment for patients",
      "Follow patient care plans and instructions from healthcare professionals",
      "Maintain patient dignity, privacy, and confidentiality",
      "Follow healthcare, safety, and infection-control procedures",
      "Communicate effectively with patients, families, nurses, and the healthcare team",
    ],
    requirements: [
      "Previous experience as a Caregiver, Nursing Assistant, Healthcare Assistant, or similar role is preferred",
      "Healthcare or caregiving qualification/certification is an advantage",
      "Must have own valid UAE visa",
      "Good communication and interpersonal skills",
      "Compassionate, patient, and responsible attitude",
      "Ability to work according to the required shift schedule",
      "Candidates available to join immediately are preferred",
    ],
  },
  {
    closed: true,
    slug: "personal-assistant-brand-coordinator",
    title: "Personal Assistant & Brand Coordinator",
    location: "Dubai, UAE",
    type: "Full-Time",
    summary:
      "At NADZ Healthcare, we're looking for a proactive, organized, and creative individual to work closely with our Founder and support day-to-day executive operations while coordinating brand and marketing activities.\n\nThis is a dynamic role for someone who enjoys working behind the scenes, organizing projects, attending meetings and events, creating content, and ensuring communication flows smoothly between the executive office and the marketing team.",
    responsibilities: [
      "Manage the Founder's calendar, appointments, and daily schedule",
      "Accompany the Founder to meetings, conferences, networking events, and media appearances",
      "Take meeting notes and prepare follow-up action items",
      "Assist with presentations, reports, and business documents",
      "Capture professional photos and videos during meetings and events",
      "Coordinate with the marketing team to ensure content, campaigns, and branding activities are executed on time",
      "Organize content assets and communicate marketing requirements between the Founder and creative team",
      "Support social media content planning and coordination",
      "Handle confidential information with professionalism",
      "Assist with travel arrangements and general executive administration",
    ],
    requirements: [
      "Previous experience as a Personal Assistant, Executive Assistant, or Coordinator",
      "Excellent communication and organizational skills",
      "Comfortable attending business meetings and representing the executive office professionally",
      "Interest in branding, content creation, and social media",
      "Experience with Microsoft Office, Google Workspace, Canva, or similar tools",
      "Ability to multitask and prioritize effectively",
      "Photography/videography skills are an advantage",
      "UAE driving licence is a plus",
    ],
  },
  {
    closed: true,
    slug: "driver",
    title: "Driver (Own Visa Preferred)",
    location: "Dubai, UAE",
    type: "Full-Time",
    summary:
      "We are looking for a responsible, punctual, and professional Driver to join our team.",
    responsibilities: [
      "Safely transport staff and company materials as assigned",
      "Ensure timely pick-up and drop-off according to schedules",
      "Maintain the cleanliness and good condition of the assigned vehicle",
      "Conduct routine vehicle inspections and report any maintenance issues promptly",
      "Follow all UAE traffic rules and company policies",
      "Assist with basic administrative or operational tasks when required",
    ],
    requirements: [
      "Valid UAE Driving License",
      "Good knowledge of Dubai roads and navigation",
      "Minimum 2 years of driving experience in the UAE is preferred",
      "Good communication skills in English (Arabic is an advantage)",
      "Professional appearance and courteous attitude",
      "Own Visa is preferred",
      "Ability to join immediately is an advantage",
    ],
  },
];

/** Pre-filled application mailto for a role. */
export function applyMailto(role: Role): string {
  const subject = `Application: ${role.title} — ${role.location}`;
  return `mailto:careers@nadzhealthcare.com?subject=${encodeURIComponent(subject)}`;
}
