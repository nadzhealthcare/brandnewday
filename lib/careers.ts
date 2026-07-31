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
};

export const ROLES: Role[] = [
  {
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
];

/** Pre-filled application mailto for a role. */
export function applyMailto(role: Role): string {
  const subject = `Application: ${role.title} — ${role.location}`;
  return `mailto:careers@nadzhealthcare.com?subject=${encodeURIComponent(subject)}`;
}
