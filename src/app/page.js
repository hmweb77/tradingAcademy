"use client";

import { useEffect } from "react";
import Navigation from "@/components/Navbar";
import HeroSection from "@/components/Hero";
import AboutSection from "@/components/About";
import LiveTradingSection from "@/components/LiveTrading";
import GroupCoachingSection from "@/components/GroupCoaching";
import FreeResourcesSection from "@/components/FreeRessources";
import TestimonialsSection from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";


export default function Home() {
  const { isRTL } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = isRTL ? "ar" : "en";
  }, [isRTL]);

  return (
    <main className="min-h-screen">
   <Navigation/>
      <HeroSection />
      <AboutSection />
      <LiveTradingSection />
      <GroupCoachingSection />
      <FreeResourcesSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}