"use client";

import { Star, Quote } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useRef } from "react";
import Image from "next/image";

export default function TestimonialsSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      name: t.testimonials.testimonial1Name,
      title: t.testimonials.testimonial1Title,
      image: "/trading1.png",
      testimonial: t.testimonials.testimonial1,
      rating: 5,
      results: t.testimonials.testimonial1Result,
    },
    {
      name: t.testimonials.testimonial2Name,
      title: t.testimonials.testimonial2Title,
      image: "/trading3.png",
      testimonial: t.testimonials.testimonial2,
      rating: 5,
      results: t.testimonials.testimonial2Result,
    },
    {
      name: t.testimonials.testimonial3Name,
      title: t.testimonials.testimonial3Title,
      image: "/trading4.png",
      testimonial: t.testimonials.testimonial3,
      rating: 5,
      results: t.testimonials.testimonial3Result,
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
      >
        <Star
          className={`h-5 w-5 ${
            i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      </motion.div>
    ));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
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

  const quoteVariants = {
    hidden: { opacity: 0, rotate: -180 },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            {t.testimonials.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t.testimonials.subtitle}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-card rounded-lg border shadow-sm hover:shadow-lg transition-shadow h-full"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-8 flex flex-col h-full">
                {/* Quote Icon */}
                <motion.div
                  className="mb-6"
                  variants={quoteVariants}
                  whileHover={{ scale: 1.2, rotate: 15 }}
                >
                  <Quote className="h-8 w-8 text-accent" />
                </motion.div>

                {/* Testimonial Text */}
                <blockquote className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                  "{testimonial.testimonial}"
                </blockquote>

                {/* Rating */}
                <div className="flex items-center mb-4 gap-1">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Results Badge */}
                <motion.div
                  className="mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                    {testimonial.results}
                  </span>
                </motion.div>

                {/* Profile */}
                <div className="flex items-center space-x-4 mt-auto">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src={testimonial.image}
                      alt={`${testimonial.name} - Testimonial`}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                      data-testid={`testimonial-image-${index}`}
                    />
                  </motion.div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.title}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {[
            { value: "500+", label: t.testimonials.stat1 },
            { value: "90%", label: t.testimonials.stat2 },
            { value: "$2.5M+", label: t.testimonials.stat3 },
            { value: "4.9/5", label: t.testimonials.stat4 },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-card p-6 rounded-lg border hover:border-accent/50 transition-colors"
              variants={statVariants}
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <motion.div
                className="text-3xl font-bold text-accent mb-2"
                animate={
                  isInView
                    ? {
                        scale: [1, 1.1, 1],
                      }
                    : {}
                }
                transition={{
                  duration: 0.5,
                  delay: index * 0.1 + 0.8,
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}