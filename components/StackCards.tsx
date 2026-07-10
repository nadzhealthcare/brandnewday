const CARDS: { title: string; img: string }[] = [
  { title: "Doctor-Led Care", img: "/assets/doctorled.jpg" },
  { title: "Delivered To Your Doorstep", img: "/assets/Delivered.jpg" },
  { title: "Backed By Advanced Diagnostics", img: "/assets/advanced.jpg" },
  { title: "Focused On Lifelong Wellness", img: "/assets/lifestyle.jpg" },
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
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                <h3 className="font-title text-xl uppercase leading-[1.1] text-white sm:text-3xl lg:text-[34px]">
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
