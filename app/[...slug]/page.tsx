import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import WhoWeAre from "@/components/WhoWeAre";
import MissionVision from "@/components/MissionVision";
import Careers from "@/components/Careers";
import FaqPage from "@/components/FaqPage";
import DoctorOnCall from "@/components/DoctorOnCall";
import HowItWorks from "@/components/HowItWorks";
import ServiceBody from "@/components/ServiceBody";
import { SERVICE_BODIES } from "@/lib/service-content";
import MediaBody from "@/components/MediaBody";
import { MEDIA_BODIES } from "@/lib/media-content";
import {
  PAGE_META,
  HERO_IMAGES,
  DEFAULT_HERO_IMAGES,
  ALL_PATHS,
} from "@/lib/page-content";

// routes with a fully custom page instead of the default slider hero
const CUSTOM_PAGES: Record<string, React.ComponentType> = {
  "/about/who-we-are": WhoWeAre,
  "/about/mission-vision": MissionVision,
  "/about/careers": Careers,
  "/about/faqs": FaqPage,
};

// routes that keep the default slider hero, then render a custom body below it
const CUSTOM_BODIES: Record<string, React.ComponentType> = {
  "/services/doctor-on-call": DoctorOnCall,
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
  const meta = PAGE_META["/" + slug.join("/")];
  return {
    title: meta ? `${meta.title} — NADZ Healthcare` : "NADZ Healthcare",
    description: meta?.description,
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
