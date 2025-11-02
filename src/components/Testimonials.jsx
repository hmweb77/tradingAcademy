"use client";

import { Star, MessageCircle, Phone, CheckCheck } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useRef } from "react";
import Image from "next/image";

export default function TestimonialsSe() {
  const { t, language } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Message-style testimonials data
  const messageTestimonials = [
    {
      id: 1,
      // Placeholder for actual screenshot image
      screenshot: "/testimonial1.jpg",
      senderName: t.testimonials.message1Name,
      time: "14:23",
      messageText: t.testimonials.message1Text,
      verified: true,
      platform: "whatsapp", // whatsapp, telegram, or messenger
      aspectRatio: "9/16" // for different image sizes
    },
    {
      id: 2,
      screenshot: "/testimonial2.jpg",
      senderName: t.testimonials.message2Name,
      time: "09:45",
      messageText: t.testimonials.message2Text,
      verified: true,
      platform: "telegram",
      aspectRatio: "3/4"
    },
    {
      id: 3,
      screenshot: "/testimonial3.jpg",
      senderName: t.testimonials.message3Name,
      time: "18:30",
      messageText: t.testimonials.message3Text,
      verified: true,
      platform: "whatsapp",
      aspectRatio: "9/16"
    }
  ];

  // Traditional testimonials for variety
  const additionalTestimonials = [
    {
      name: t.testimonials.additional1Name,
      role: t.testimonials.additional1Role,
      text: t.testimonials.additional1Text,
      rating: 5,
      profit: "+250%"
    },
    {
      name: t.testimonials.additional2Name,
      role: t.testimonials.additional2Role,
      text: t.testimonials.additional2Text,
      rating: 5,
      profit: "+180%"
    }
  ];

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

  const messageCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateY: -30
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const phoneFrameVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "backOut",
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

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
      >
        <Star
          className={`h-4 w-4 ${
            i < rating ? "text-[#fbbf24] fill-current" : "text-[#d1d5db]"
          }`}
        />
      </motion.div>
    ));
  };

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-[#f8f9fb] via-white to-[#f8f9fb] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-[#00b66f]/10 text-[#00b66f] px-4 py-2 rounded-full text-sm font-semibold mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <MessageCircle className="h-4 w-4" />
            {t.testimonials.badge || "Real Messages from Real Traders"}
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-6">
            {t.testimonials.title}
          </h2>
          <p className="text-xl text-[#6e7b8a] max-w-3xl mx-auto leading-relaxed">
            {t.testimonials.subtitle}
          </p>
        </motion.div>

        {/* Message Screenshots Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {messageTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="relative group"
              variants={messageCardVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              {/* Phone Frame Container */}
              <motion.div
                className="relative bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-[2.5rem] p-2 shadow-2xl"
                variants={phoneFrameVariants}
              >
                {/* Phone Screen */}
                <div className="bg-black rounded-[2rem] p-1 relative overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
                  
                  {/* Message Screenshot Container */}
                  <div className={`relative bg-gray-900 rounded-[1.8rem] overflow-hidden ${
                    testimonial.aspectRatio === "9/16" ? "aspect-[9/16]" : 
                    testimonial.aspectRatio === "3/4" ? "aspect-[3/4]" : 
                    "aspect-[9/16]"
                  }`}>
                    {/* Placeholder for actual screenshot */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900">
                      {/* Message Header */}
                      <div className="bg-gray-800/90 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                           
                          </div>
                          <div>
                            <div className="text-white font-semibold text-sm">
                              {testimonial.senderName}
                            </div>
                            <div className="text-gray-400 text-xs">Online</div>
                          </div>
                        </div>
                        {testimonial.verified && (
                          <motion.div
                            className="bg-[#00b66f] px-2 py-1 rounded-full flex items-center gap-1"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <CheckCheck className="h-3 w-3 text-white" />
                            <span className="text-xs text-white font-medium">Verified</span>
                          </motion.div>
                        )}
                      </div>

                      {/* Message Content */}
                      <div className="p-4">
                        <div className={`${language === 'ar' ? 'ml-auto' : 'mr-auto'} max-w-[85%]`}>
                          <div className="bg-gray-800 rounded-2xl p-4 relative">
                            {/* Message bubble tail */}
                            <div className={`absolute top-4 ${language === 'ar' ? 'right-0 translate-x-2' : 'left-0 -translate-x-2'} w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ${language === 'ar' ? 'border-l-[10px] border-l-gray-800' : 'border-r-[10px] border-r-gray-800'}`}></div>
                            
                            <p className="text-gray-200 text-sm leading-relaxed mb-2">
                              {testimonial.messageText}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500 text-xs">{testimonial.time}</span>
                              <CheckCheck className="h-4 w-4 text-blue-400" />
                            </div>
                          </div>
                        </div>

                        {/* Reply Message (from admin) */}
                        <div className={`${language === 'ar' ? 'mr-auto' : 'ml-auto'} max-w-[85%] mt-3`}>
                          <div className="bg-[#00b66f] rounded-2xl p-4 relative">
                            <div className={`absolute top-4 ${language === 'ar' ? 'left-0 -translate-x-2' : 'right-0 translate-x-2'} w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ${language === 'ar' ? 'border-r-[10px] border-r-[#00b66f]' : 'border-l-[10px] border-l-[#00b66f]'}`}></div>
                            
                            <p className="text-white text-sm">
                              {t.testimonials.adminReply || "Thank you for your trust! 🙏"}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-white/70 text-xs">
                                {parseInt(testimonial.time.split(':')[0]) + 1}:{parseInt(testimonial.time.split(':')[1]) + 5}
                              </span>
                              <CheckCheck className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Bar */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gray-800/90 backdrop-blur-sm px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-700 rounded-full px-4 py-2 text-gray-400 text-sm">
                            Type a message...
                          </div>
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Platform Badge */}
                <motion.div
                  className="absolute -bottom-2 -right-2 bg-white rounded-full p-3 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {testimonial.platform === 'whatsapp' && (
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                  )}
                  {testimonial.platform === 'telegram' && (
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                  )}
                </motion.div>
              </motion.div>

              {/* Hover Overlay with Details */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <div className="p-6 text-white">
                  <p className="font-semibold mb-1">{testimonial.senderName}</p>
                  <p className="text-sm text-white/80">Verified Student Success</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Traditional Testimonials */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {additionalTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl border border-[#e2e5e9] shadow-sm hover:shadow-lg transition-all p-6"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-[#0f172a]">{testimonial.name}</h4>
                  <p className="text-sm text-[#6e7b8a]">{testimonial.role}</p>
                </div>
                <div className="bg-[#00b66f]/10 text-[#00b66f] px-3 py-1 rounded-full text-sm font-semibold">
                  {testimonial.profit}
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-[#6e7b8a] leading-relaxed">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
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
              className="text-center"
              variants={statVariants}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold text-[#00b66f] mb-2"
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
              <div className="text-[#6e7b8a] text-sm md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}