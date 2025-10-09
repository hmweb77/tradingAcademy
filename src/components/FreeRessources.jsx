"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Download, FileText, TrendingUp, Shield, BookOpen, X, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

export default function FreeResourcesSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const resources = [
    {
      id: 1,
      icon: TrendingUp,
      title: t.resources.resource1Title,
      description: t.resources.resource1Desc,
      pages: `50 ${t.resources.pages}`,
      image: "/api/placeholder/400/250",
      features: [
        t.resources.resource1Feature1,
        t.resources.resource1Feature2,
        t.resources.resource1Feature3,
        t.resources.resource1Feature4,
      ],
    },
    {
      id: 2,
      icon: Shield,
      title: t.resources.resource2Title,
      description: t.resources.resource2Desc,
      pages: `25 ${t.resources.pages}`,
      image: "/api/placeholder/400/250",
      features: [
        t.resources.resource2Feature1,
        t.resources.resource2Feature2,
        t.resources.resource2Feature3,
        t.resources.resource2Feature4,
      ],
    },
    {
      id: 3,
      icon: BookOpen,
      title: t.resources.resource3Title,
      description: t.resources.resource3Desc,
      pages: `15 ${t.resources.pages}`,
      image: "/api/placeholder/400/250",
      features: [
        t.resources.resource3Feature1,
        t.resources.resource3Feature2,
        t.resources.resource3Feature3,
        t.resources.resource3Feature4,
      ],
    },
    {
      id: 4,
      icon: FileText,
      title: t.resources.resource4Title,
      description: t.resources.resource4Desc,
      pages: `12 ${t.resources.pages}`,
      image: "/api/placeholder/400/250",
      features: [
        t.resources.resource4Feature1,
        t.resources.resource4Feature2,
        t.resources.resource4Feature3,
        t.resources.resource4Feature4,
      ],
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % resources.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + resources.length) % resources.length);
  };

  const handleGetResource = (resource) => {
    setSelectedResource(resource);
    setIsPopupOpen(true);
    setFormData({ name: "", email: "" });
    setIsSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Download requested for ${selectedResource.title}:`, formData);
    setIsSubmitted(true);
    // TODO: Implement resource download functionality
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedResource(null);
    setFormData({ name: "", email: "" });
    setIsSubmitted(false);
  };

  // Animation variants
  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    nextSlide();
  };

  const handlePrev = () => {
    setDirection(-1);
    prevSlide();
  };

  return (
    <section id="resources" ref={ref} className="py-24 bg-[#f8f9fb]/30 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-6">
            {t.resources.title}
          </h2>
          <p className="text-xl text-[#6e7b8a] max-w-3xl mx-auto leading-relaxed">
            {t.resources.subtitle}
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-lg">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
              >
                <div className="mx-4">
                  <motion.div
                    className="bg-[#f7f9fa] rounded-lg border border-[#e2e5e9] shadow-lg hover:shadow-xl transition-shadow"
                    whileHover={{ y: -5 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                      {/* Resource Info */}
                      <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                          <motion.div
                            className="w-12 h-12 bg-[#00b66f]/10 rounded-lg flex items-center justify-center"
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          >
                            {(() => {
                              const Icon = resources[currentSlide].icon;
                              return <Icon className="h-6 w-6 text-[#00b66f]" />;
                            })()}
                          </motion.div>
                          <div>
                            <h3 className="text-2xl font-bold text-[#0f172a]">
                              {resources[currentSlide].title}
                            </h3>
                            <span className="text-sm text-[#00b66f] font-medium bg-[#00b66f]/10 px-2 py-1 rounded">
                              {resources[currentSlide].pages}
                            </span>
                          </div>
                        </div>

                        <p className="text-[#6e7b8a] leading-relaxed text-lg">
                          {resources[currentSlide].description}
                        </p>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-[#0f172a]">
                            {t.resources.includedTitle}
                          </h4>
                          <ul className="space-y-2">
                            {resources[currentSlide].features.map((feature, index) => (
                              <motion.li
                                key={index}
                                className="flex items-center space-x-3 group"
                                custom={index}
                                variants={featureVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover={{ x: 5 }}
                              >
                                <motion.div
                                  className="w-2 h-2 bg-[#00b66f] rounded-full"
                                  whileHover={{ scale: 1.5 }}
                                />
                                <span className="text-[#6e7b8a] group-hover:text-[#0f172a] transition-colors">
                                  {feature}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        <motion.button
                          onClick={() => handleGetResource(resources[currentSlide])}
                          className="bg-[#00b66f] hover:bg-[#00b66f]/90 text-white px-8 py-4 text-lg font-semibold rounded-lg inline-flex items-center gap-2 group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          data-testid={`get-resource-${resources[currentSlide].id}`}
                        >
                          <Download className="h-5 w-5 group-hover:scale-110 transition-transform" />
                          {t.resources.getButton}
                        </motion.button>
                      </div>

                      {/* Resource Preview */}
                      <div className="flex items-center justify-center">
                        <motion.div
                          className="bg-gradient-to-br from-[#00b66f]/10 to-[#00b66f]/5 rounded-lg p-8 w-full h-64 flex items-center justify-center"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="text-center">
                            <motion.div
                              animate={{ y: [0, -10, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {(() => {
                                const Icon = resources[currentSlide].icon;
                                return <Icon className="h-16 w-16 text-[#00b66f] mx-auto mb-4" />;
                              })()}
                            </motion.div>
                            <div className="text-sm text-[#6e7b8a]">
                              {t.resources.preview}
                            </div>
                            <div className="font-semibold text-[#0f172a]">
                              {resources[currentSlide].title}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <motion.button
              onClick={handlePrev}
              className="bg-[#ffffff]/90 backdrop-blur-sm border border-[#e2e5e9] rounded-lg p-2 hover:bg-[#00b66f]/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              data-testid="carousel-prev"
            >
              <ChevronLeft className="h-4 w-4" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2">
              {resources.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentSlide ? 1 : -1);
                    setCurrentSlide(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? "bg-[#00b66f]" : "bg-[#6e7b8a]/30"
                  }`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  data-testid={`carousel-dot-${index}`}
                />
              ))}
            </div>

            <motion.button
              onClick={handleNext}
              className="bg-[#ffffff]/90 backdrop-blur-sm border border-[#e2e5e9] rounded-lg p-2 hover:bg-[#00b66f]/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              data-testid="carousel-next"
            >
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Download Popup */}
      <AnimatePresence>
        {isPopupOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-[#ffffff]/80 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
            />

            {/* Dialog */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="bg-[#f7f9fa] rounded-lg border border-[#e2e5e9] shadow-xl max-w-md w-full p-6 relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <motion.button
                  onClick={closePopup}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[#00b66f]/10 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-4 w-4" />
                </motion.button>

                {/* Header */}
                <div className="flex items-center space-x-3 mb-6">
                  {selectedResource && (
                    <>
                      <selectedResource.icon className="h-6 w-6 text-[#00b66f]" />
                      <h3 className="text-xl font-bold">
                        {t.resources.downloadTitle} {selectedResource.title}
                      </h3>
                    </>
                  )}
                </div>

                {isSubmitted ? (
                  <motion.div
                    className="py-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <motion.div
                      className="w-16 h-16 bg-[#00b66f]/10 rounded-full flex items-center justify-center mx-auto mb-6"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle2 className="h-8 w-8 text-[#00b66f]" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-[#0f172a] mb-4">
                      {t.resources.checkEmail}
                    </h3>
                    <p className="text-[#6e7b8a] mb-6">
                      {t.resources.emailSent} "{selectedResource?.title}".{" "}
                      {t.resources.checkInbox}
                    </p>
                    <motion.button
                      onClick={closePopup}
                      className="w-full bg-[#00b66f] hover:bg-[#00b66f]/90 text-white px-4 py-2 rounded-lg font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t.resources.closeButton}
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-6 py-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="text-center mb-6">
                      <p className="text-[#6e7b8a]">
                        {t.resources.downloadDesc}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="popup-name" className="text-sm font-medium">
                        {t.resources.fullName}
                      </label>
                      <input
                        id="popup-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder={t.resources.fullName}
                        required
                        className="w-full px-4 py-2 border border-[#e2e5e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b66f] bg-[#ffffff]"
                        data-testid="popup-input-name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="popup-email" className="text-sm font-medium">
                        {t.resources.emailAddress}
                      </label>
                      <input
                        id="popup-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, email: e.target.value }))
                        }
                        placeholder={t.resources.emailAddress}
                        required
                        className="w-full px-4 py-2 border border-[#e2e5e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b66f] bg-[#ffffff]"
                        data-testid="popup-input-email"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      className="w-full bg-[#00b66f] hover:bg-[#00b66f]/90 text-white py-3 text-lg font-semibold rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      data-testid="popup-submit"
                    >
                      {t.resources.receiveButton}
                    </motion.button>

                    <p className="text-xs text-[#6e7b8a] text-center">
                      {t.resources.privacy}
                    </p>
                  </motion.form>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}