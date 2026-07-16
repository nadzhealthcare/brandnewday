"use client";

import { useEffect, useRef, useState } from "react";

/* Muted autoplay video that only fetches once it's near the viewport. The
   poster stands in until then, so a below-the-fold clip costs nothing on
   first load. */
export default function LazyVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      src={load ? src : undefined}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
    />
  );
}
