"use client";

import { useEffect, useState } from "react";
import {
  Dna,
  Brain,
  HeartPulse,
  Hourglass,
  Apple,
  Wheat,
  House,
  Droplets,
  HandHelping,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import SectionTitle from "./SectionTitle";

type Pkg = {
  n: string;
  icon: LucideIcon;
  title: string;
  desc?: string;
  phd?: boolean;
  price: number;
};

const PACKAGES: Pkg[] = [
  {
    n: "01",
    icon: Dna,
    title: "A-Z Mapping",
    desc: "Complete genetic blueprint of your health",
    price: 5000,
  },
  {
    n: "02",
    icon: Dna,
    title: "DNA Life Geno",
    desc: "Genetic insights for lifestyle & nutrition",
    price: 3600,
  },
  {
    n: "03",
    icon: Dna,
    title: "DNA Methylation",
    desc: "Reveal your true biological ageing markers",
    price: 3600,
  },
  {
    n: "04",
    icon: Droplets,
    title: "GUT Microbiome",
    desc: "Gut health analysis with Zonulin",
    price: 4400,
  },
  {
    n: "05",
    icon: Brain,
    title: "Brain Mapping",
    desc: "Cognitive & neural performance profile",
    price: 5000,
  },
  {
    n: "06",
    icon: HeartPulse,
    title: "HRV",
    desc: "Heart-rate variability & stress resilience",
    price: 0,
  },
  {
    n: "07",
    icon: Hourglass,
    title: "Determination of Biological Age",
    desc: "Using Telomeric Length Studies",
    price: 2400,
  },
  {
    n: "08",
    icon: Apple,
    title: "Fox Food Intolerance",
    desc: "Identify foods that don't agree with you",
    phd: true,
    price: 1300,
  },
  {
    n: "09",
    icon: Wheat,
    title: "Food Allergy",
    desc: "Full allergy screening – Alex",
    phd: true,
    price: 1300,
  },
  {
    n: "10",
    icon: House,
    title: "6 Doctor consultations",
    desc: "At home to keep your care plan updated",
    price: 3600,
  },
  {
    n: "11",
    icon: Droplets,
    title: "6 IV therapies",
    desc: "Per year, a combination of your choice",
    price: 3600,
  },
  {
    n: "12",
    icon: HandHelping,
    title: "12 physiotherapy sessions at Home",
    desc: "Cupping, hijama and dry needling",
    price: 2400,
  },
  {
    n: "13",
    icon: Lightbulb,
    title: "6 Red Light Therapy",
    desc: "Recovery & cellular energy boost",
    price: 2400,
  },
];

function PackageCard({ pkg, active }: { pkg: Pkg; active: boolean }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = pkg.icon;

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-label={`${pkg.title}, reveal annual price`}
      className={`h-[172px] w-full text-left transition-transform duration-700 ease-out hover:scale-[1.04] [perspective:1200px] ${
        active ? "z-10 scale-[1.04]" : "scale-100"
      }`}
    >
      <div
        className="relative h-full w-full transition-transform duration-[600ms] [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* front */}
        <div className="absolute inset-0 flex flex-col rounded-[22px] bg-white p-5 shadow-[0_12px_30px_-22px_rgba(20,10,16,0.5)] ring-1 ring-black/5 [backface-visibility:hidden]">
          <span className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-[color:var(--maroon)] text-[12px] font-semibold text-white">
            {pkg.n}
          </span>
          <div className="flex flex-1 items-start gap-4 pr-9">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[color:var(--cream)] text-[color:var(--maroon)]">
              <Icon className="h-7 w-7" strokeWidth={1.6} />
            </span>
            <div className="min-w-0">
              <h3 className="text-[16px] font-semibold leading-snug text-[#1c1c1c]">
                {pkg.title}
              </h3>
              {pkg.desc && (
                <p className="mt-1 text-[12.5px] leading-snug text-black/50">
                  {pkg.desc}
                </p>
              )}
              {pkg.phd && (
                <span className="mt-2 inline-block rounded-md bg-[color:var(--cream)] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[color:var(--maroon)]">
                  PHD
                </span>
              )}
            </div>
          </div>
          <span className="mt-auto text-[11.5px] font-medium text-black/30">
            Tap to reveal annual price →
          </span>
        </div>

        {/* back */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-[22px] p-5 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{
            backgroundImage: "linear-gradient(150deg, #4a1c20 0%, #6C2A37 100%)",
          }}
        >
          <span className="text-[12px] uppercase tracking-wide text-white/55">
            {pkg.title}
          </span>
          {pkg.price > 0 ? (
            <span className="text-[34px] font-bold leading-none text-[color:var(--gold-light)]">
              <span className="align-top text-[15px] font-semibold text-white/70">
                AED{" "}
              </span>
              {pkg.price.toLocaleString()}
            </span>
          ) : (
            <span className="text-[28px] font-bold leading-none text-[color:var(--gold-light)]">
              Included
            </span>
          )}
          <span className="mt-1 text-[11.5px] text-white/45">
            per year · tap to flip back
          </span>
        </div>
      </div>
    </button>
  );
}

export default function AnnualPackages() {
  const [active, setActive] = useState<number[]>([]);

  // periodically zoom a random card or two to hint they're clickable
  useEffect(() => {
    const pick = () => {
      const count = 1 + Math.floor(Math.random() * 2); // 1 or 2
      const idxs = new Set<number>();
      while (idxs.size < count) {
        idxs.add(Math.floor(Math.random() * PACKAGES.length));
      }
      setActive([...idxs]);
    };
    pick();
    const id = setInterval(pick, 1900);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-[#f7f8fa] px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-2xl text-center">
          <SectionTitle className="text-[1.9rem] text-[color:var(--maroon)] sm:text-[2.4rem]">
            Annual Subscription Packages
          </SectionTitle>
          <p className="mt-3 text-[15px] text-black/55">
            One membership, a full year of proactive care. Tap any package to
            reveal its annual price.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <PackageCard key={pkg.n} pkg={pkg} active={active.includes(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
