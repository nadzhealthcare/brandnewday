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
    slug: "personal-assistant",
    title: "Personal Assistant",
    location: "Dubai, UAE",
    type: "Full-Time",
    summary:
      "Are you highly organized, proactive, and passionate about delivering excellence? We're looking for a Personal Assistant to support executive operations and help drive our mission of providing premium healthcare experiences across Dubai.",
    responsibilities: [
      "Manage executive calendars and appointments",
      "Coordinate meetings and travel arrangements",
      "Handle confidential documents and correspondence",
      "Assist with daily administrative and operational tasks",
      "Prepare reports, presentations, and meeting notes",
      "Liaise with clients, partners, and internal departments",
      "Follow up on ongoing projects and deadlines",
    ],
    requirements: [
      "Proven experience as a Personal Assistant or Executive Assistant",
      "Excellent communication skills in English (Arabic is an advantage)",
      "Strong organizational and multitasking abilities",
      "High level of professionalism and confidentiality",
      "Proficient in Microsoft Office & Google Workspace",
      "Ability to work in a fast-paced environment",
    ],
  },
];

/** Pre-filled application mailto for a role. */
export function applyMailto(role: Role): string {
  const subject = `Application: ${role.title} — ${role.location}`;
  return `mailto:careers@nadzhealthcare.com?subject=${encodeURIComponent(subject)}`;
}
