"use client";

import { Bell, TrendingUp, Users, Zap, CheckCircle } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useRef, useState } from "react";
import EnrollmentPopup from "@/components/EnrollmentPopup";

export default function SignalsSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const benefits = [
    {
      icon: Bell,
      title: t.signals.benefit1Title,
      description: t.signals.benefit1Desc
    },
    {
      icon: TrendingUp,
      title: t.signals.benefit2Title,
      description: t.signals.benefit2Desc
    },
    {
      icon: Users,
      title: t.signals.benefit3Title,
      description: t.signals.benefit3Desc
    },
    {
      icon: Zap,
      title: t.signals.benefit4Title,
      description: t.signals.benefit4Desc
    }
  ];

  const features = [
    t.signals.feature1,
    t.signals.feature2,
    t.signals.feature3,
    t.signals.feature4,
    t.signals.feature5,
    t.signals.feature6
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="signals" ref={ref} className="py-24 bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-[#f5b53f]/20 text-[#f5b53f] px-4 py-2 rounded-full text-sm font-semibold mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Bell className="h-4 w-4" />
            {t.signals.badge}
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {t.signals.title}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t.signals.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6 hover:bg-white/15 transition-all"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div
                  className="w-12 h-12 bg-[#f5b53f]/20 rounded-lg flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <benefit.icon className="h-6 w-6 text-[#f5b53f]" />
                </motion.div>
                <h3 className="font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">{t.signals.includedTitle}</h3>
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <CheckCircle className="h-5 w-5 text-[#f5b53f] flex-shrink-0" />
                  <span className="text-gray-200">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-[#f5b53f] mb-2">{t.signals.price}</div>
              <div className="text-gray-300">{t.signals.availability}</div>
            </div>

            <motion.button
              onClick={() => setIsPopupOpen(true)}
              className="w-full bg-[#f5b53f] hover:bg-[#e6a52e] text-white px-8 py-4 text-lg font-semibold rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="h-5 w-5" />
              {t.signals.joinButton}
            </motion.button>
          </motion.div>
        </div>
      </div>

      <EnrollmentPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        type="signals"
        title={t.signals.joinButton}
        description={t.signals.subtitle}
      />
    </section>
  );
}
