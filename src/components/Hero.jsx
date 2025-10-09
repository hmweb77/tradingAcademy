"use client";

import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

export default function HeroSection() {
  const { t } = useTranslation();

  const handleBookCall = () => {
    console.log("Book call triggered");
    const element = document.getElementById("coaching");
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

  const handleDownloadResources = () => {
    console.log("Download resources triggered");
    const element = document.getElementById("resources");
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/trading5.png"
          alt="Professional trading environment"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/80 to-background/70"></div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight"
            variants={itemVariants}
          >
            {t.hero.title}{" "}
            <span className="text-accent bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
              {t.hero.winners}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            variants={itemVariants}
          >
            <motion.button
              onClick={handleBookCall}
              className="bg-chart-3 hover:bg-chart-3/90 text-white px-8 py-4 text-lg font-semibold rounded-lg group inline-flex items-center transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="hero-book-call"
            >
              {t.hero.bookCall}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              onClick={handleDownloadResources}
              className="px-8 py-4 text-lg font-semibold border-2 rounded-lg group bg-background/80 backdrop-blur-sm inline-flex items-center hover:bg-accent/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="hero-download-resources"
            >
              <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              {t.hero.downloadResources}
            </motion.button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            variants={containerVariants}
          >
            <motion.div
              className="bg-card/80 backdrop-blur-sm p-6 rounded-lg hover:bg-card/90 transition-colors"
              variants={statVariants}
              whileHover={{ y: -5 }}
            >
              <div className="text-3xl font-bold text-accent mb-2">500+</div>
              <div className="text-muted-foreground">{t.hero.stat1}</div>
            </motion.div>

            <motion.div
              className="bg-card/80 backdrop-blur-sm p-6 rounded-lg hover:bg-card/90 transition-colors"
              variants={statVariants}
              whileHover={{ y: -5 }}
            >
              <div className="text-3xl font-bold text-accent mb-2">90%</div>
              <div className="text-muted-foreground">{t.hero.stat2}</div>
            </motion.div>

            <motion.div
              className="bg-card/80 backdrop-blur-sm p-6 rounded-lg hover:bg-card/90 transition-colors"
              variants={statVariants}
              whileHover={{ y: -5 }}
            >
              <div className="text-3xl font-bold text-accent mb-2">5+</div>
              <div className="text-muted-foreground">{t.hero.stat3}</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}