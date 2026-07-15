"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function FooterLogo() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      href="/"
      aria-label="NADZ Healthcare, home"
      className={`footer-logo relative inline-block ${inView ? "is-in" : ""}`}
    >
      <span className="footer-logo-glow" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/logo-nadz-dark.svg"
        alt="NADZ Healthcare"
        className="h-20 w-auto sm:h-24"
      />
      <span className="footer-logo-line" aria-hidden="true" />
      <span className="footer-logo-glare" aria-hidden="true" />
    </Link>
  );
}
