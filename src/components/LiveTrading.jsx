"use client";

import { Calendar, Users, TrendingUp, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function LiveTradingSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleJoinGroup = () => {
    console.log("Join live trading group triggered");
    // TODO: Implement join group functionality
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
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            {t.liveTrading.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
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
                  className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <benefit.icon className="h-6 w-6 text-accent" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pricing Card */}
          <motion.div
            className="bg-card rounded-lg border shadow-lg hover:shadow-xl transition-shadow"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ y: -5 }}
          >
            <div className="p-8">
              <div className="text-center">
                <motion.div
                  className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-accent/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 2, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <Users className="h-10 w-10 text-accent relative z-10" />
                </motion.div>

                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {t.liveTrading.cardTitle}
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {t.liveTrading.cardDesc}
                </p>

                {/* Session Details */}
                <motion.div
                  className="space-y-4 mb-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  {[
                    {
                      label: t.liveTrading.sessionDays,
                      value: t.liveTrading.tuesdayThursday,
                    },
                    {
                      label: t.liveTrading.time,
                      value: t.liveTrading.timeSlot,
                    },
                    {
                      label: t.liveTrading.price,
                      value: t.liveTrading.monthlyPrice,
                    },
                  ].map((detail, index) => (
                    <motion.div
                      key={index}
                      className="flex justify-between items-center p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                      variants={detailVariants}
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="font-medium">{detail.label}</span>
                      <span className="text-accent font-semibold">
                        {detail.value}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.button
                  onClick={handleJoinGroup}
                  className="w-full bg-accent hover:bg-accent/90 text-white py-4 text-lg font-semibold rounded-lg inline-flex items-center justify-center gap-2 group"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  data-testid="join-live-trading"
                >
                  <Zap className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  {t.liveTrading.joinButton}
                </motion.button>

                <motion.p
                  className="text-sm text-muted-foreground mt-4"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  {t.liveTrading.disclaimer}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}