"use client";

import { Users, MessageSquare, Trophy, BookOpen, CheckCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function GroupCoachingSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleLearnMore = () => {
    console.log("Learn more about group coaching triggered");
    // TODO: Implement learn more functionality
  };

  const benefits = [
    {
      icon: Users,
      title: t.coaching.benefit1Title,
      description: t.coaching.benefit1Desc,
    },
    {
      icon: MessageSquare,
      title: t.coaching.benefit2Title,
      description: t.coaching.benefit2Desc,
    },
    {
      icon: Trophy,
      title: t.coaching.benefit3Title,
      description: t.coaching.benefit3Desc,
    },
    {
      icon: BookOpen,
      title: t.coaching.benefit4Title,
      description: t.coaching.benefit4Desc,
    },
  ];

  const features = [
    t.coaching.feature1,
    t.coaching.feature2,
    t.coaching.feature3,
    t.coaching.feature4,
    t.coaching.feature5,
    t.coaching.feature6,
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatingCardVariants = {
    hidden: { opacity: 0, y: 50, x: -50 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.7,
        delay: 0.5,
        ease: "easeOut",
      },
    },
  };

  const featureItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <section id="coaching" ref={ref} className="py-24 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            {t.coaching.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t.coaching.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Benefits & Features */}
          <div className="space-y-8">
            {/* Benefits Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                  variants={cardVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="p-6 text-center">
                    <motion.div
                      className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <benefit.icon className="h-6 w-6 text-accent" />
                    </motion.div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Features Card */}
            <motion.div
              className="bg-accent/5 border-accent/20 rounded-lg border"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  {t.coaching.includedTitle}
                </h3>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3 group"
                      variants={featureItemVariants}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-accent rounded-full flex-shrink-0"
                        whileHover={{ scale: 1.5 }}
                      />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Image with Floating Price Card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="relative rounded-lg overflow-hidden shadow-xl"
              variants={imageVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/trading2.png"
                alt="Group coaching session with diverse professionals"
                width={600}
                height={400}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>

            {/* Floating Price Card */}
            <motion.div
              className="absolute -bottom-8 -left-8 bg-card/95 backdrop-blur-sm max-w-xs rounded-lg border shadow-lg"
              variants={floatingCardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <div className="p-6">
                <div className="text-center">
                  <motion.div
                    className="text-2xl font-bold text-accent mb-1"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {t.coaching.weeks}
                  </motion.div>
                  <div className="text-sm text-muted-foreground mb-4">
                    {t.coaching.program}
                  </div>
                  <div className="text-lg font-semibold text-foreground">
                    {t.coaching.price}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t.coaching.payment}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="max-w-2xl mx-auto bg-card rounded-lg border shadow-lg hover:shadow-xl transition-shadow">
            <div className="p-8">
              <motion.h3
                className="text-2xl font-bold text-foreground mb-4 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="h-6 w-6 text-accent" />
                {t.coaching.readyTitle}
              </motion.h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t.coaching.readyDesc}
              </p>
              <div className="space-y-4">
                <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
                  <span>{t.coaching.nextCohort}</span>
                  <span className="text-accent font-semibold">
                    {t.coaching.spotsAvailable}
                  </span>
                </div>
                <motion.button
                  onClick={handleLearnMore}
                  className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg font-semibold rounded-lg inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  data-testid="group-coaching-cta"
                >
                  <Trophy className="h-5 w-5" />
                  {t.coaching.reserveButton}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}