"use client";

import { useEffect } from "react";
import Navigation from "@/components/Navbar";
import HeroSection from "@/components/Hero";
import AboutSection from "@/components/About";
import LiveTradingSection from "@/components/LiveTrading";
import GroupCoachingSection from "@/components/GroupCoaching";
import FreeResourcesSection from "@/components/FreeRessources";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import DiscoveryCallSection from "@/components/DiscoveryCall";
import ProgramPillarsSection from "@/components/Pillars";
import ComboOfferSection from "@/components/ComboOffer";
import SignalsSection from "@/components/SignalsSection";
import TestimonialsSection from "@/components/Testimonialss";
import FAQSection from "@/components/FAQ";

export default function Home() {
  const { isRTL } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = isRTL ? "ar" : "en";
    
    // CRITICAL: Prevent horizontal scroll on mobile
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    document.body.style.width = '100%';
    document.body.style.maxWidth = '100vw';
    
    return () => {
      document.documentElement.style.overflowX = '';
      document.body.style.overflowX = '';
      document.body.style.width = '';
      document.body.style.maxWidth = '';
    };
  }, [isRTL]);

  return (
    <main className="min-h-screen overflow-x-hidden w-full max-w-[100vw]">
      <Navigation/>
      <HeroSection />
      <ProgramPillarsSection/>
      {/* <AboutSection /> */}
      <ComboOfferSection/>
      <DiscoveryCallSection/>
      <LiveTradingSection />
      <GroupCoachingSection />
      <SignalsSection/>
      <FreeResourcesSection />
      <TestimonialsSection/>
      <FAQSection/>
      <Footer />
    </main>
  );
}