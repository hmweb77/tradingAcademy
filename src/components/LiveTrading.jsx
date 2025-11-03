"use client";

import { Calendar, Users, TrendingUp, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import EnrollmentPopup from "@/components/EnrollmentPopup";

import { sanityFetch } from "../../sanity/lib/client";
import { liveTradingSettingsQuery } from "../../sanity/lib/queries";

export default function LiveTradingSection() {
  const { t, language } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await sanityFetch({ 
          query: liveTradingSettingsQuery,
          tags: ['liveTradingSettings']
        });
        setSettings(data);
      } catch (error) {
        console.error('Error fetching live trading settings:', error);
      } 
    }
    fetchSettings();
  }, []);

  const handleJoinGroup = () => {
    setIsPopupOpen(true);
  };

  // Get multilingual content
  const getContent = (field) => {
    if (!settings) return '';
    if (language === 'fr' && settings[`${field}Fr`]) {
      return settings[`${field}Fr`];
    }
    if (language === 'ar' && settings[`${field}Ar`]) {
      return settings[`${field}Ar`];
    }
    return settings[field];
  };

  const benefits = [
    {
      icon: Calendar,
      title: t.liveTrading.benefit1Title,
      description: t.liveTrading.benefit1Desc,
    },
    {
      icon: Users,
      title: t.liveTrading.benefit2Title,
      description: t.liveTrading.benefit2Desc,
    },
    {
      icon: TrendingUp,
      title: t.liveTrading.benefit3Title,
      description: t.liveTrading.benefit3Desc,
    },
    {
      icon: Clock,
      title: t.liveTrading.benefit4Title,
      description: t.liveTrading.benefit4Desc,
    },
  ];

  // Show/hide enrollment button based on Sanity settings
  const showEnrollmentButton = settings?.isAcceptingApplications !== false;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const benefitVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, x: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const detailVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };



  return (
    <section id="live-trading" ref={ref} className="py-24 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#00b66f] mb-6">
            {t.liveTrading.title}
          </h2>
          <p className="text-xl text-[#6e7b8a] max-w-3xl mx-auto leading-relaxed">
            {t.liveTrading.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Benefits List */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4 group"
                variants={benefitVariants}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-12 h-12 bg-[#00b66f]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#00b66f]/20 transition-colors"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <benefit.icon className="h-6 w-6 text-[#00b66f]" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0f172a] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[#6e7b8a] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pricing Card with Sanity Data */}
          <motion.div
            className="bg-[#f7f9fa] rounded-lg border border-[#e2e5e9] shadow-lg hover:shadow-xl transition-shadow"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ y: -5 }}
          >
            <div className="p-8">
              <div className="text-center">
                <motion.div
                  className="w-20 h-20 bg-[#00b66f]/10 rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-[#00b66f]/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 2, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <Users className="h-10 w-10 text-[#00b66f] relative z-10" />
                </motion.div>

                <h3 className="text-2xl font-bold text-[#0f172a] mb-4">
                  {t.liveTrading.cardTitle}
                </h3>
                <p className="text-[#6e7b8a] mb-8 leading-relaxed">
                  {t.liveTrading.cardDesc}
                </p>

                {/* Session Details from Sanity */}
                <motion.div
                  className="space-y-4 mb-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <motion.div
                    className="flex justify-between items-center p-3 bg-[#f8f9fb]/50 rounded-lg hover:bg-[#f8f9fb] transition-colors"
                    variants={detailVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="font-medium">{t.liveTrading.sessionDays}</span>
                    <span className="text-[#00b66f] font-semibold">
                      {getContent('sessionDaysDisplay') || t.liveTrading.tuesdayThursday}
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex justify-between items-center p-3 bg-[#f8f9fb]/50 rounded-lg hover:bg-[#f8f9fb] transition-colors"
                    variants={detailVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="font-medium">{t.liveTrading.time}</span>
                    <span className="text-[#00b66f] font-semibold">
                      {getContent('timeDisplay') || t.liveTrading.timeSlot}
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex justify-between items-center p-3 bg-[#f8f9fb]/50 rounded-lg hover:bg-[#f8f9fb] transition-colors"
                    variants={detailVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="font-medium">{t.liveTrading.price}</span>
                    <span className="text-[#00b66f] font-semibold">
                      {getContent('priceDisplay') || t.liveTrading.monthlyPrice}
                    </span>
                  </motion.div>
                </motion.div>

                {/* CTA Button - conditionally shown */}
                {showEnrollmentButton ? (
                  <>
                    <motion.button
                      onClick={handleJoinGroup}
                      className="bg-[#f5b53f] hover:bg-[#e6a52e] text-white px-8 py-4 text-lg font-semibold rounded-lg group inline-flex items-center transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}  
                      data-testid="join-live-trading"
                    >
                      <Zap className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                      {t.liveTrading.joinButton}
                    </motion.button>

                    <motion.p
                      className="text-sm text-[#6e7b8a] mt-4"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      {t.liveTrading.disclaimer}
                    </motion.p>
                  </>
                ) : (
                  <motion.div
                    className="bg-[#f5b53f]/10 border border-[#f5b53f]/30 rounded-lg p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className="text-[#6e7b8a] font-medium">
                      Applications currently closed. Check back soon!
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enrollment Popup */}
      {showEnrollmentButton && (
        <EnrollmentPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          type="live-trading"
          title="Join Live Trading Group"
          description="Limited to 20 participants - Apply now!"
        />
      )}
    </section>
  );
}