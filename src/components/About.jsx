"use client";

import { TrendingUp, Users, Target, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: TrendingUp,
      title: t.about.feature1Title,
      description: t.about.feature1Desc,
    },
    {
      icon: Users,
      title: t.about.feature2Title,
      description: t.about.feature2Desc,
    },
    {
      icon: Target,
      title: t.about.feature3Title,
      description: t.about.feature3Desc,
    },
    {
      icon: BookOpen,
      title: t.about.feature4Title,
      description: t.about.feature4Desc,
    },
  ];

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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const pillarVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 bg-[#f8f9fb]/30  scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#00b66f] mb-4">
            {t.about.title}
          </h2>
          <p className="text-xl text-[#6e7b8a]  max-w-3xl mx-auto leading-relaxed">
            {t.about.subtitle}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-[#f7f9fa]  rounded-lg border border-[#e2e5e9]  shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="p-8 text-center">
                <motion.div
                  className="w-16 h-16 bg-[#00b66f]/10  rounded-full flex items-center justify-center mx-auto mb-6"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="h-8 w-8 text-[#00b66f] " />
                </motion.div>
                <h3 className="text-xl font-semibold text-[#0f172a]  mb-4">
                  {feature.title}
                </h3>
                <p className="text-[#6e7b8a]  leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          className="bg-[#f7f9fa]  p-8 md:p-12 rounded-lg border border-[#e2e5e9] "
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-[#0f172a]  mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4 }}
            >
              {t.about.whyTitle}
            </motion.h3>
            <motion.p
              className="text-lg text-[#6e7b8a]  mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              {t.about.whyDesc}
            </motion.p>

            {/* Three Pillars */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {[
                {
                  title: t.about.pillar1,
                  desc: t.about.pillar1Desc,
                },
                {
                  title: t.about.pillar2,
                  desc: t.about.pillar2Desc,
                },
                {
                  title: t.about.pillar3,
                  desc: t.about.pillar3Desc,
                },
              ].map((pillar, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-[#f8f9fb]/50  rounded-lg hover:bg-[#f8f9fb]/70  transition-colors"
                  variants={pillarVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-semibold text-[#0f172a]  mb-3">
                    {pillar.title}
                  </h4>
                  <p className="text-[#6e7b8a] ">{pillar.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}