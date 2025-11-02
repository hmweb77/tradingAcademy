"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, Star, Quote, Pause, Play } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";

export default function TestimonialImagesSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [imageLoadErrors, setImageLoadErrors] = useState({});

  // Testimonial images data - replace with your actual image paths
  const testimonialImages = [
    {
      id: 1,
      imagePath: "/testimonials/screenshot-1.jpg",
      fallbackImage: "/testimonial-placeholder-1.jpg",
      platform: "whatsapp",
      studentName: "Ahmad Hassan",
      country: "UAE",
      profitPercentage: "+320%",
      duration: "6 months",
      rating: 5
    },
    {
      id: 2,
      imagePath: "/testimonials/screenshot-2.jpg",
      fallbackImage: "/testimonial-placeholder-2.jpg",
      platform: "telegram",
      studentName: "Sarah Mitchell",
      country: "UK",
      profitPercentage: "+250%",
      duration: "4 months",
      rating: 5
    },
    {
      id: 3,
      imagePath: "/testimonials/screenshot-3.jpg",
      fallbackImage: "/testimonial-placeholder-3.jpg",
      platform: "whatsapp",
      studentName: "Carlos Rodriguez",
      country: "Spain",
      profitPercentage: "+180%",
      duration: "5 months",
      rating: 5
    },
    {
      id: 4,
      imagePath: "/testimonials/screenshot-4.jpg",
      fallbackImage: "/testimonial-placeholder-4.jpg",
      platform: "messenger",
      studentName: "Jennifer Chen",
      country: "Canada",
      profitPercentage: "+420%",
      duration: "8 months",
      rating: 5
    },
    {
      id: 5,
      imagePath: "/testimonials/screenshot-5.jpg",
      fallbackImage: "/testimonial-placeholder-5.jpg",
      platform: "whatsapp",
      studentName: "Michael Thompson",
      country: "USA",
      profitPercentage: "+290%",
      duration: "7 months",
      rating: 5
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonialImages.length) % testimonialImages.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonialImages.length);
  };

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleImageError = (imageId) => {
    setImageLoadErrors(prev => ({ ...prev, [imageId]: true }));
  };

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
      },
    },
  };

  const floatingElementVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 0.1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0"
        variants={backgroundVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32"
          variants={floatingElementVariants}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Quote className="w-full h-full text-[#00b66f]" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40"
          variants={floatingElementVariants}
          animate={{
            y: [0, 20, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <MessageCircle className="w-full h-full text-[#f5b53f]" />
        </motion.div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00b66f]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#f5b53f]/10 rounded-full blur-3xl"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-[#00b66f]/20 text-[#00b66f] px-6 py-3 rounded-full backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(0, 182, 111, 0.2)",
                "0 0 40px rgba(0, 182, 111, 0.4)",
                "0 0 20px rgba(0, 182, 111, 0.2)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Star className="h-5 w-5" />
            <span className="font-semibold">Student Success Stories</span>
            <Star className="h-5 w-5" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Real Results, Real People
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Authentic screenshots from our students showing their incredible trading transformations
          </p>
        </motion.div>

        {/* Main Carousel Container */}
        <div className="relative">
          {/* Carousel Viewport */}
          <div className="relative h-[600px] md:h-[700px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.4 },
                  rotateY: { duration: 0.4 },
                }}
                className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
              >
                {/* Phone Frame with Screenshot */}
                <div className="relative max-w-sm w-full">
                  {/* Phone Frame */}
                  <motion.div
                    className="relative bg-gradient-to-br from-gray-700 to-gray-800 rounded-[3rem] p-3 shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Phone Screen */}
                    <div className="relative bg-black rounded-[2.5rem] p-2 overflow-hidden">
                      {/* Notch */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-black rounded-full z-10"></div>
                      
                      {/* Screenshot Container */}
                      <div className="relative aspect-[9/16] rounded-[2.3rem] overflow-hidden bg-gray-900">
                        {!imageLoadErrors[testimonialImages[currentIndex].id] ? (
                          <Image
                            src={testimonialImages[currentIndex].imagePath}
                            alt={`Testimonial from ${testimonialImages[currentIndex].studentName}`}
                            fill
                            className="object-cover"
                            onError={() => handleImageError(testimonialImages[currentIndex].id)}
                            priority
                          />
                        ) : (
                          /* Fallback gradient if image fails to load */
                          <div className="absolute inset-0 bg-gradient-to-br from-[#00b66f]/20 to-[#f5b53f]/20 flex items-center justify-center">
                            <div className="text-center text-white p-6">
                              <MessageCircle className="h-16 w-16 mx-auto mb-4 text-[#00b66f]" />
                              <p className="text-lg font-semibold mb-2">
                                {testimonialImages[currentIndex].studentName}
                              </p>
                              <p className="text-3xl font-bold text-[#00b66f] mb-2">
                                {testimonialImages[currentIndex].profitPercentage}
                              </p>
                              <p className="text-gray-400">
                                in {testimonialImages[currentIndex].duration}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Platform Badge */}
                    <motion.div
                      className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-xl"
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        testimonialImages[currentIndex].platform === 'whatsapp' ? 'bg-green-500' :
                        testimonialImages[currentIndex].platform === 'telegram' ? 'bg-blue-500' :
                        'bg-purple-500'
                      }`}>
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Info Card */}
                  <motion.div
                    className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-xs"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-white font-semibold">
                            {testimonialImages[currentIndex].studentName}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {testimonialImages[currentIndex].country}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#00b66f] font-bold text-xl">
                            {testimonialImages[currentIndex].profitPercentage}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {testimonialImages[currentIndex].duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonialImages[currentIndex].rating
                                ? "text-[#fbbf24] fill-current"
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all hover:scale-110"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 rounded-full transition-all hover:scale-110"
            >
              {isAutoPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {testimonialImages.map((testimonial, index) => (
              <motion.button
                key={testimonial.id}
                onClick={() => handleDotClick(index)}
                className={`relative overflow-hidden rounded-lg transition-all ${
                  index === currentIndex
                    ? "w-20 h-20 ring-2 ring-[#00b66f] ring-offset-2 ring-offset-gray-900"
                    : "w-16 h-16 opacity-50 hover:opacity-75"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00b66f]/30 to-[#f5b53f]/30">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <p className="text-white text-xs font-semibold">
                        {testimonial.profitPercentage}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00b66f] to-[#f5b53f]"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentIndex + 1) / testimonialImages.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {[
            { value: "500+", label: "Success Stories" },
            { value: "90%", label: "Win Rate" },
            { value: "$2.5M+", label: "Total Profits" },
            { value: "50+", label: "Countries" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 182, 111, 0.1)" }}
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold text-[#00b66f] mb-2"
                animate={isInView ? { scale: [1, 1.2, 1] } : {}}
                transition={{ delay: index * 0.1 + 0.8, duration: 0.5 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}