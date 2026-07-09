"use client";

import { useEffect, useRef, useState, type ElementType } from "react";

/**
 * Title that is always UPPERCASE and plays the dramatic blur-in entrance
 * when it scrolls into view.
 */
export default function SectionTitle({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`font-title uppercase ${inView ? "blur-in" : "opacity-0"} ${className}`}
    >
      {children}
    </Tag>
  );
}
