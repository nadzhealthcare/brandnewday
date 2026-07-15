"use client";

import { useEffect, useState } from "react";

/* Auto-advancing crossfade background used behind the Who We Are feature
   cards. Fills its (positioned) parent; keep a light overlay for legibility. */
export default function FeatureSlider({
  images,
  interval = 4500,
}: {
  images: string[];
  interval?: number;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(
      () => setI((v) => (v + 1) % images.length),
      interval,
    );
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0">
      {images.map((src, idx) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden={idx !== i}
          className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1100ms] ease-in-out group-hover:scale-[1.04]"
          style={{ opacity: idx === i ? 1 : 0 }}
        />
      ))}
      {/* lighter dark overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
    </div>
  );
}
