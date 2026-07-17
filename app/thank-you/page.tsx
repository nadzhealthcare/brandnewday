import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle, Phone, Timer } from "lucide-react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  alternates: { canonical: "/thank-you" },
  title: "Thank You, NADZ Healthcare",
  description:
    "Thanks for your request. The NADZ care team will confirm your home visit on WhatsApp, usually within minutes.",
  // A conversion landing page has no business in search results.
  robots: { index: false, follow: true },
};

const NEXT_STEPS: { icon: typeof Timer; title: string; desc: string }[] = [
  {
    icon: MessageCircle,
    title: "Send the message",
    desc: "Your details are already filled in on WhatsApp, just press send so our team receives them.",
  },
  {
    icon: Timer,
    title: "We reply in minutes",
    desc: "A care coordinator confirms the visit, the timing and anything the clinician needs to know.",
  },
  {
    icon: CheckCircle2,
    title: "We come to you",
    desc: "A DHA-licensed doctor or nurse arrives at your door, typically within 30 minutes across Dubai.",
  },
];

export default function ThankYouPage() {
  return (
    <>
      <TopBar />
      <div className="relative">
        <Navbar />
        <main className="flex-1 -mt-20 bg-white sm:-mt-[84px] lg:-mt-[88px]">
          <section
            className="relative overflow-hidden px-4 pb-14 pt-28 text-center sm:px-6 sm:pb-16 sm:pt-36"
            style={{ backgroundImage: "linear-gradient(135deg,#3d1622,#611f2e)" }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgba(160,26,38,0.35),transparent_60%)]" />
            <div className="relative">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white/10 text-[color:var(--gold-light)] ring-1 ring-white/20 backdrop-blur">
                <CheckCircle2 className="h-9 w-9" />
              </span>
              <SectionTitle
                as="h1"
                className="mt-6 text-[2.2rem] leading-[1.05] text-white sm:text-[3.2rem]"
              >
                Thank You
              </SectionTitle>
              <p className="mx-auto mt-4 max-w-2xl text-[15.5px] leading-relaxed text-white/65">
                We&apos;ve got your details. Our care team will confirm your visit
                on WhatsApp, usually within minutes.
              </p>
            </div>
          </section>

          <section className="px-4 py-14 sm:px-6 sm:py-16">
            <div className="mx-auto max-w-[1180px]">
              <div className="grid gap-4 md:grid-cols-3">
                {NEXT_STEPS.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.title}
                      className="rounded-[22px] bg-[#faf8f5] p-6 ring-1 ring-black/5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-[color:var(--maroon)] ring-1 ring-black/5">
                          <Icon className="h-[22px] w-[22px]" strokeWidth={1.6} />
                        </span>
                        <span className="font-title text-[20px] leading-none text-[color:var(--maroon)]/25">
                          0{i + 1}
                        </span>
                      </div>
                      <h2 className="mt-4 text-[16px] font-semibold text-[#1c1c1c]">
                        {s.title}
                      </h2>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-black/55">
                        {s.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div
                className="mt-6 rounded-[22px] p-7 text-center text-white"
                style={{
                  backgroundImage: "linear-gradient(150deg,#4a1c20,#6C2A37)",
                }}
              >
                <h2 className="text-[16px] font-semibold text-white">
                  Didn&apos;t get through, or need us now?
                </h2>
                <p className="mx-auto mt-1.5 max-w-md text-[13.5px] text-white/60">
                  Our hotline is open 24/7, every day of the year.
                </p>
                <Link
                  href="tel:8004NADZ"
                  className="mt-4 inline-flex items-center gap-2.5 text-[22px] font-bold text-[color:var(--gold-light)] transition-transform hover:-translate-y-0.5"
                >
                  <Phone className="h-5 w-5" />
                  800 4 NADZ
                </Link>
                <p className="mt-2 text-[12.5px] text-white/45">800 4 6239</p>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/"
                  className="rounded-full bg-[color:var(--maroon)] px-6 py-3 text-[14px] font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  Back to home
                </Link>
                <Link
                  href="/media/blogs"
                  className="rounded-full border border-black/15 px-6 py-3 text-[14px] font-semibold text-[#241417] transition-colors hover:bg-black/5"
                >
                  Read health insights
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
