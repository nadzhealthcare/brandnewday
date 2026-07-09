const CARDS: { title: string; img: string }[] = [
  { title: "Doctor-Led Care", img: "/assets/stack/1.jpg" },
  { title: "Delivered To Your Doorstep", img: "/assets/stack/2.jpg" },
  { title: "Backed By Advanced Diagnostics", img: "/assets/stack/3.jpg" },
  { title: "Focused On Lifelong Wellness", img: "/assets/stack/4.jpg" },
];

// falls back to the shared placeholder photo, then a maroon gradient
const FALLBACK = "/assets/featured-placeholder.jpg";

export default function StackCards() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-[1180px]">
        {CARDS.map((c, i) => (
          <div
            key={i}
            className="sticky mb-6 last:mb-0"
            style={{ top: 100 + i * 20, zIndex: i + 1 }}
          >
            <article
              className="relative h-[clamp(320px,44vw,460px)] w-full overflow-hidden rounded-[28px] shadow-[0_34px_70px_-30px_rgba(30,10,16,0.7)] ring-1 ring-[color:var(--gold)]/15"
              style={{
                backgroundImage: `url(${c.img}), url(${FALLBACK}), linear-gradient(120deg,#3d1226,#1c0910)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* maroon wash so the title stays legible (dark left, image breathes on the right) */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#280e15] via-[#280e15]/85 to-[#280e15]/25" />
              {/* soft gold glow behind the title */}
              <div className="pointer-events-none absolute -left-10 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,75,0.25),transparent_70%)] blur-2xl" />

              <div className="absolute inset-y-0 left-0 flex max-w-[62%] items-center p-7 sm:p-10 lg:p-14">
                <h3 className="font-title bg-gradient-to-r from-[#eccf8f] via-[#f7ecc9] to-[#c9a24b] bg-clip-text text-2xl leading-[1.1] text-transparent sm:text-4xl lg:text-[42px]">
                  {c.title}
                </h3>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
