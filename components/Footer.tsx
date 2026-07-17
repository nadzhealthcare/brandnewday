import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FooterLogo from "./FooterLogo";

type IconProps = { className?: string };

function TwitterIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-7.1 8.1L23.3 22h-6.6l-5.2-6.8L5.6 22H2.4l7.6-8.7L1 2h6.8l4.7 6.2L18.9 2Zm-1.2 18h1.8L7.4 3.9H5.5L17.7 20Z" />
    </svg>
  );
}

function InstagramIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 22 10.6 22 14v7h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H9V9Z" />
    </svg>
  );
}

function FacebookIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" />
    </svg>
  );
}

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Quick Links",
    links: [
      { label: "About Us", href: "/about/who-we-are" },
      { label: "Contact Us", href: "/contact" },
      { label: "Blog", href: "/media/blogs" },
      { label: "FAQs", href: "/about/faqs" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Doctor on call", href: "/services/doctor-on-call" },
      { label: "Nursing care", href: "/services/nursing-care" },
      { label: "Elderly care", href: "/services/nursing-care/elderly-care" },
      { label: "IV Drips", href: "/services/iv-drips" },
      { label: "NADZ Vital Brain", href: "/exclusive/nadz-vital-brain" },
      { label: "Lab Testing at Home", href: "/services/labs-at-home" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookies Policy", href: "/cookies" },
    ],
  },
];

const SOCIALS = [
  { icon: TwitterIcon, href: "https://x.com/nadzhealthcare", label: "X" },
  {
    icon: InstagramIcon,
    href: "https://www.instagram.com/nadzhealthcare/",
    label: "Instagram",
  },
  {
    icon: FacebookIcon,
    href: "https://www.facebook.com/nadzhealthcare/",
    label: "Facebook",
  },
  {
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/company/nadzhealthcare/",
    label: "LinkedIn",
  },
];

export default function Footer() {
  return (
    <footer className="bg-white px-4 pb-4 pt-16 sm:px-6 sm:pt-20">
      <div className="w-full">
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          {/* brand card */}
          <div
            className="relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-[28px] p-7 text-white"
            style={{
              backgroundImage:
                "linear-gradient(155deg, #4a1c20 0%, #6C2A37 100%)",
            }}
          >
            <FooterLogo />

            <div>
              <p className="max-w-xs text-[14px] leading-relaxed text-white/70">
                At NADZ Home Healthcare, your needs guide our care. We deliver
                personalized health support precisely where you need it, your
                home, office, or hotel.
              </p>
              <p className="mt-6 font-title text-[15px] italic text-white/80">
                Stay in touch!
              </p>
              <div className="mt-3 flex gap-2.5">
                {SOCIALS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid h-10 w-10 place-items-center rounded-xl bg-black/25 text-white ring-1 ring-white/10 transition-colors hover:bg-black/40"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* links + subscribe panel */}
          <div className="flex flex-col justify-between rounded-[28px] bg-[#f3f4f6] p-7 sm:p-9">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {COLUMNS.map((col) => (
                <div key={col.title}>
                  <h2 className="text-[12px] font-semibold uppercase tracking-wide text-black/40">
                    {col.title}
                  </h2>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <Link
                          href={l.href}
                          className="text-[14px] text-black/70 transition-colors hover:text-[color:var(--maroon)]"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* subscribe */}
            <div className="mt-10 border-t border-black/10 pt-6">
              <p className="text-[14px] text-black/45">
                Get notified instant
              </p>
              <p className="text-[16px] font-semibold text-[#171717]">
                Subscribe to our Newsletter
              </p>
              <form className="mt-4 flex max-w-md items-center gap-2 rounded-full border border-black/10 bg-white p-1.5 pl-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="min-w-0 flex-1 bg-transparent text-[14px] text-[#171717] outline-none placeholder:text-black/35"
                />
                <button
                  type="button"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[color:var(--maroon)] px-5 py-2.5 text-[13px] font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-8 flex flex-col gap-2 border-t border-black/10 pt-6 text-[13px] text-black/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Licensed by Ministry of Health · License No: P4DWL25W-100725
          </p>
          <p>All Rights Reserved © Copyright 2026 · NADZ Healthcare</p>
        </div>
      </div>
    </footer>
  );
}
