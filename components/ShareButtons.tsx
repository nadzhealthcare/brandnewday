"use client";

import { useEffect, useState } from "react";
import { Link2, Check } from "lucide-react";

type IconProps = { className?: string };

function TwitterIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-7.1 8.1L23.3 22h-6.6l-5.2-6.8L5.6 22H2.4l7.6-8.7L1 2h6.8l4.7 6.2L18.9 2Zm-1.2 18h1.8L7.4 3.9H5.5L17.7 20Z" />
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

function LinkedinIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 22 10.6 22 14v7h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H9V9Z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Zm5.8 14.2c-.24.68-1.4 1.3-1.93 1.35-.5.05-.96.23-3.23-.67-2.72-1.07-4.45-3.83-4.58-4.01-.14-.18-1.1-1.46-1.1-2.79 0-1.32.7-1.97.94-2.24.25-.27.54-.34.72-.34h.52c.17 0 .4-.06.62.48.23.55.78 1.9.85 2.04.07.14.11.3.02.48-.09.18-.14.3-.27.46l-.4.47c-.14.13-.28.28-.12.55.16.27.71 1.17 1.52 1.9 1.05.93 1.93 1.22 2.2 1.36.27.14.43.11.59-.07l.85-.98c.2-.23.37-.18.62-.09l1.77.83c.26.13.43.19.5.3.06.1.06.63-.18 1.31Z" />
    </svg>
  );
}

/* Social share row for articles. The canonical URL is read from the browser
   after mount, so it stays correct on any domain the site is served from. */
export default function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => setUrl(window.location.href), []);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const links = [
    {
      label: "Share on X",
      href: `https://x.com/intent/tweet?url=${u}&text=${t}`,
      Icon: TwitterIcon,
    },
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      Icon: FacebookIcon,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      Icon: LinkedinIcon,
    },
    {
      label: "Share on WhatsApp",
      href: `https://wa.me/?text=${t}%20${u}`,
      Icon: WhatsAppIcon,
    },
  ];

  /* The async Clipboard API needs a secure context and can still be refused by
     permissions policy, so fall back to a throwaway selection before giving up
     silently. */
  const writeClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "0";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        return ok;
      } catch {
        return false;
      }
    }
  };

  const copy = async () => {
    if (!(await writeClipboard(url))) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-black/5 pt-8">
      <span className="mr-1 text-[13px] font-semibold uppercase tracking-[0.14em] text-black/40">
        Share
      </span>

      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={url ? href : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="grid h-10 w-10 place-items-center rounded-full bg-[#f5f4f2] text-[color:var(--maroon)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[color:var(--maroon)] hover:text-white"
        >
          <Icon className="h-[17px] w-[17px]" />
        </a>
      ))}

      <button
        type="button"
        onClick={copy}
        aria-label="Copy link"
        title="Copy link"
        className="flex h-10 items-center gap-2 rounded-full bg-[#f5f4f2] px-4 text-[13px] font-medium text-[color:var(--maroon)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[color:var(--maroon)] hover:text-white"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" /> Copied
          </>
        ) : (
          <>
            <Link2 className="h-4 w-4" /> Copy link
          </>
        )}
      </button>
    </div>
  );
}
