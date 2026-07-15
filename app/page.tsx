import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ComprehensiveCare from "@/components/ComprehensiveCare";
import FeaturedServices from "@/components/FeaturedServices";
import StackCards from "@/components/StackCards";
import AnnualPackages from "@/components/AnnualPackages";
import ServicesSection from "@/components/ServicesSection";
import HowItWorks from "@/components/HowItWorks";
import ExpertTeam from "@/components/ExpertTeam";
import PartnersSection from "@/components/PartnersSection";
import TestimonialsBento from "@/components/TestimonialsBento";
import FaqSection from "@/components/FaqSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <TopBar />
      <div className="relative">
        {/* sticky navbar, glass over the hero, solid on scroll */}
        <Navbar />
        {/* pull the hero up so the navbar floats over it at the top */}
        <main className="flex-1 -mt-20 sm:-mt-[84px] lg:-mt-[88px]">
          <Hero />
          <ComprehensiveCare />
          <FeaturedServices />
          <StackCards />
          <AnnualPackages />
          <ServicesSection />
          <HowItWorks />
          <ExpertTeam />
          <PartnersSection />
          <TestimonialsBento />
          <FaqSection />
          <BlogSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
}
