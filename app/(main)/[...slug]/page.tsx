import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import WhoWeAre from "@/components/WhoWeAre";
import MissionVision from "@/components/MissionVision";
import Careers from "@/components/Careers";
import FaqPage from "@/components/FaqPage";
import ContactPage from "@/components/ContactPage";
import DoctorOnCall from "@/components/DoctorOnCall";
import StdSexualHealth from "@/components/StdSexualHealth";
import BookAppointment from "@/components/BookAppointment";
import HowItWorks from "@/components/HowItWorks";
import ServiceBody from "@/components/ServiceBody";
import VitalBrainExperience from "@/components/VitalBrainExperience";
import { SERVICE_BODIES } from "@/lib/service-content";
import MediaBody from "@/components/MediaBody";
import { MEDIA_BODIES } from "@/lib/media-content";
import {
  PAGE_META,
  HERO_IMAGES,
  DEFAULT_HERO_IMAGES,
  ALL_PATHS,
} from "@/lib/page-content";
import { SEO_OVERRIDES } from "@/lib/seo";
import { ROLES } from "@/lib/careers";

/* The careers page gets a hiring-specific share card: a branded image plus a
   title and description built from the open role, so a LinkedIn/social share
   reads "We're hiring: <role>" rather than a bare page title. Falls back to a
   plain careers card when nothing is open. */
function careersMetadata(path: string): Metadata {
  const open = ROLES[0];
  const many = ROLES.length > 1;
  const title =
    ROLES.length === 0
      ? "Careers at NADZ Healthcare"
      : many
        ? "We're Hiring — Join the NADZ Healthcare Team"
        : `We're Hiring: ${open.title} — NADZ Healthcare`;
  const description =
    ROLES.length === 0
      ? "Explore careers at NADZ Healthcare, Dubai's premium home-healthcare team."
      : many
        ? "Open roles at NADZ Healthcare. Join Dubai's premium home-healthcare team."
        : `${open.title} · ${open.location} · ${open.type}. Join Dubai's premium home-healthcare team.`;
  return {
    alternates: { canonical: path },
    title,
    description,
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      images: [
        {
          url: "/assets/careers.jpg",
          width: 1200,
          height: 630,
          alt: "We're hiring at NADZ Healthcare",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/careers.jpg"],
    },
  };
}

// routes with a fully custom page instead of the default slider hero
const CUSTOM_PAGES: Record<string, React.ComponentType> = {
  "/about/who-we-are": WhoWeAre,
  "/about/mission-vision": MissionVision,
  "/about/careers": Careers,
  "/about/faqs": FaqPage,
  "/contact": ContactPage,
  "/book": BookAppointment,
  /* Runs its own visual direction, so it replaces the standard hero+body. */
  "/exclusive/nadz-vital-brain": VitalBrainExperience,
};

// routes that keep the default slider hero, then render a custom body below it
const CUSTOM_BODIES: Record<string, React.ComponentType> = {
  "/services/doctor-on-call": DoctorOnCall,
  "/services/labs-at-home/std-sexual-health": StdSexualHealth,
};

// only pre-generate the known menu routes; anything else 404s
export const dynamicParams = false;

// media routes served by dedicated routes under app/media/*
const DEDICATED = [
  "/media/blogs",
  "/media/press-releases",
  "/media/events",
  "/media/awards",
  "/media/interviews-podcasts",
];

export function generateStaticParams() {
  return ALL_PATHS.filter(
    (p) => !DEDICATED.some((d) => p === d || p.startsWith(d + "/")),
  ).map((p) => ({ slug: p.replace(/^\//, "").split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = "/" + slug.join("/");
  if (path === "/about/careers") return careersMetadata(path);
  const meta = PAGE_META[path];
  // Restored original title/description wins, used verbatim. Otherwise the
  // page name runs through the "{label}, NADZ Healthcare" template.
  const seo = SEO_OVERRIDES[path];
  return {
    alternates: { canonical: path },
    title: seo
      ? seo.title
      : meta
        ? `${meta.title}, NADZ Healthcare`
        : "NADZ Healthcare",
    description: seo?.description ?? meta?.description,
  };
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = "/" + slug.join("/");
  const meta = PAGE_META[path];
  if (!meta) notFound();

  const Custom = CUSTOM_PAGES[path];
  const Body = CUSTOM_BODIES[path];
  const bodyData = SERVICE_BODIES[path];
  const mediaData = MEDIA_BODIES[path];
  const images = HERO_IMAGES[path] ?? DEFAULT_HERO_IMAGES;

  return (
    <>
      <TopBar />
      <div className="relative">
        <Navbar />
        <main className="flex-1 -mt-20 sm:-mt-[84px] lg:-mt-[88px]">
          {Custom ? (
            <Custom />
          ) : (
            <>
              <PageHero
                title={meta.title}
                description={meta.description}
                images={images}
              />
              {/* custom / data-driven bodies place HowItWorks themselves */}
              {Body ? (
                <Body />
              ) : bodyData ? (
                <ServiceBody data={bodyData} />
              ) : mediaData ? (
                <MediaBody data={mediaData} />
              ) : (
                path.startsWith("/services/") && <HowItWorks />
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}
