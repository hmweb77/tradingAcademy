"use client";

import { useRef } from "react";
import {
  Brain,
  Target,
  Shield,
  TrendingUp,
  Lightbulb,
  Users,
  Award,
  Zap,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

export default function ProgramPillarsSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const handleBookCall = () => {
    console.log("Book call triggered");
    const element = document.getElementById("discovery");
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Define pillars with icons and enhanced descriptions
  const pillars = [
    {
      icon: Brain,
      text: t.pillars.pillar1,
      color: "from-purple-500 to-pink-500",
      delay: 0.1,
    },
    {
      icon: Shield,
      text: t.pillars.pillar2,
      color: "from-blue-500 to-cyan-500",
      delay: 0.2,
    },
    {
      icon: Target,
      text: t.pillars.pillar3,
      color: "from-green-500 to-emerald-500",
      delay: 0.3,
    },
    {
      icon: TrendingUp,
      text: t.pillars.pillar4,
      color: "from-orange-500 to-red-500",
      delay: 0.4,
    },
    {
      icon: Lightbulb,
      text: t.pillars.pillar5,
      color: "from-yellow-500 to-amber-500",
      delay: 0.5,
    },
    {
      icon: Users,
      text: t.pillars.pillar6,
      color: "from-indigo-500 to-purple-500",
      delay: 0.6,
    },
    {
      icon: Award,
      text: t.pillars.pillar7,
      color: "from-pink-500 to-rose-500",
      delay: 0.7,
    },
    {
      icon: Zap,
      text: t.pillars.pillar8,
      color: "from-teal-500 to-green-500",
      delay: 0.8,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const pillarCardVariants = {
    hidden: {
      opacity: 0,
      x: -50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hidden: { rotate: -180, scale: 0 },
    visible: {
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const plusTextVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: 1.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-br from-[#f8f9fb] via-white to-[#f8f9fb] scroll-mt-16 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-[#00b66f]/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#f5b53f]/5 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with floating animation */}
        <motion.div
          className="text-center mb-16"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 className="text-4xl md:text-6xl font-bold text-[#00b66f] mb-6">
            {t.pillars.title}
          </motion.h2>

          <motion.p
            className="text-xl text-[#6e7b8a] max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {t.pillars.subtitle}
          </motion.p>
        </motion.div>

        {/* Pillars Grid with staggered animations */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={pillarCardVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#00b66f]/20 to-[#f5b53f]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative bg-white/80 backdrop-blur-sm rounded-xl border border-[#e2e5e9] p-6 hover:border-[#00b66f]/50 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  {/* Animated Icon Container */}
                  {/* Text Content */}
                  <div className="flex-1">
                    <motion.div
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                      }
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <CheckCircle className="h-5 w-5 text-[#00b66f] mt-0.5 flex-shrink-0" />
                      <p className="text-[#0f172a] leading-relaxed font-medium group-hover:text-[#00b66f] transition-colors duration-300">
                        {pillar.text}
                      </p>
                    </motion.div>
                  </div>
                </div>  
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
  
          >
            <motion.button
              onClick={handleBookCall}
              className="bg-[#f5b53f] hover:bg-[#e6a52e] text-white px-8 py-4 text-lg font-semibold rounded-lg group inline-flex items-center transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="hero-book-call"
            >
              {t.hero.bookCall}
            </motion.button>

            </motion.div>   
      </div>
    </section>
  );
}
