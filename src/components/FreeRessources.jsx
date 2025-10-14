"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Download, X, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { sanityFetch } from "../../sanity/lib/client";
import { freeResourcesQuery } from "../../sanity/lib/queries";
import Image from "next/image";

export default function FreeResourcesSection() {
  const { t, language } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState(0);

  // Fetch resources from Sanity
  useEffect(() => {
    async function fetchResources() {
      try {
        setIsLoading(true);
        const data = await sanityFetch({ 
          query: freeResourcesQuery,
          tags: ['freeResource']
        });
        setResources(data || []);
      } catch (error) {
        console.error('Error fetching free resources:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchResources();
  }, []);

  // Get multilingual content for a resource
  const getContent = (resource, field) => {
    if (!resource) return '';
    if (language === 'fr' && resource[`${field}Fr`]) {
      return resource[`${field}Fr`];
    }
    if (language === 'ar' && resource[`${field}Ar`]) {
      return resource[`${field}Ar`];
    }
    return resource[field];
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % resources.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + resources.length) % resources.length);
  };

  const handleGetResource = (resource) => {
    setSelectedResource(resource);
    setIsPopupOpen(true);
    setFormData({ name: "", email: "" });
    setIsSubmitted(false);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/free-resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          resourceId: selectedResource._id,
          resourceTitle: getContent(selectedResource, 'title')
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      setIsSubmitted(true);
      
      setTimeout(() => {
        closePopup();
      }, 5000);

    } catch (err) {
      console.error('Form submission error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedResource(null);
    setFormData({ name: "", email: "" });
    setIsSubmitted(false);
    setError('');
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

  const currentResource = resources[currentSlide];

  return (
    <section id="resources" ref={ref} className="py-24 bg-[#f8f9fb]/30 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Always visible */}
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

        {/* Loading State */}
        {isLoading && (
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#00b66f]" />
            <p className="text-[#6e7b8a] mt-4">Loading resources...</p>
          </div>
        )}

        {/* No Resources State */}
        {!isLoading && resources.length === 0 && (
          <div className="text-center">
            <p className="text-[#6e7b8a]">No resources available at the moment.</p>
          </div>
        )}

        {/* Carousel - Only show when there are resources */}
        {!isLoading && resources.length > 0 && (
          <>
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
                              <div>
                                <h3 className="text-2xl font-bold text-[#0f172a]">
                                  {getContent(currentResource, 'title')}
                                </h3>
                                <span className="text-sm text-[#00b66f] font-medium bg-[#00b66f]/10 px-2 py-1 rounded">
                                  {getContent(currentResource, 'pagesDisplay')}
                                </span>
                              </div>
                            </div>

                            <p className="text-[#6e7b8a] leading-relaxed text-lg">
                              {getContent(currentResource, 'description')}
                            </p>

                            <div className="space-y-3">
                              <h4 className="font-semibold text-[#0f172a]">
                                {t.resources.includedTitle}
                              </h4>
                              <ul className="space-y-2">
                                {(getContent(currentResource, 'features') || currentResource.features || []).map((feature, index) => (
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
                              onClick={() => handleGetResource(currentResource)}
                              className="bg-[#00b66f] hover:bg-[#00b66f]/90 text-white px-8 py-4 text-lg font-semibold rounded-lg inline-flex items-center gap-2 group"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.98 }}
                              data-testid={`get-resource-${currentResource._id}`}
                            >
                              <Download className="h-5 w-5 group-hover:scale-110 transition-transform" />
                              {t.resources.getButton}
                            </motion.button>
                          </div>

                          {/* Resource Preview */}
                          <div className="flex items-center justify-center">
                            {currentResource.imageUrl ? (
                              <motion.div
                                className="relative w-full h-64 rounded-lg overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                              >
                                <Image
                                  src={currentResource.imageUrl}
                                  alt={getContent(currentResource, 'title')}
                                  fill
                                  className="object-cover"
                                />
                              </motion.div>
                            ) : (
                              <motion.div
                                className="bg-gradient-to-br from-[#00b66f]/10 to-[#00b66f]/5 rounded-lg p-8 w-full h-64 flex items-center justify-center"
                                whileHover={{ scale: 1.02 }}
                              >
                                <div className="text-center">
                                  <div className="text-sm text-[#6e7b8a]">
                                    {t.resources.preview}
                                  </div>
                                  <div className="font-semibold text-[#0f172a]">
                                    {getContent(currentResource, 'title')}
                                  </div>
                                </div>
                              </motion.div>
                            )}
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
                  onClick={prevSlide}
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
                  onClick={nextSlide}
                  className="bg-[#ffffff]/90 backdrop-blur-sm border border-[#e2e5e9] rounded-lg p-2 hover:bg-[#00b66f]/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  data-testid="carousel-next"
                >
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Download Popup */}
      <AnimatePresence>
        {isPopupOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
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
                      <h3 className="text-xl font-bold">
                        {t.resources.downloadTitle} {getContent(selectedResource, 'title')}
                      </h3>
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
                    <p className="text-[#6e7b8a] mb-2">
                      {t.resources.emailSent} "{getContent(selectedResource, 'title')}".{" "}
                      {t.resources.checkInbox}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-6 py-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
                      >
                        {error}
                      </motion.div>
                    )}

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
                        disabled={isSubmitting}
                        className="w-full px-4 py-2 border border-[#e2e5e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b66f] bg-[#ffffff] disabled:opacity-50"
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
                        disabled={isSubmitting}
                        className="w-full px-4 py-2 border border-[#e2e5e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b66f] bg-[#ffffff] disabled:opacity-50"
                        data-testid="popup-input-email"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#00b66f] hover:bg-[#00b66f]/90 text-white py-3 text-lg font-semibold rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                      whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      data-testid="popup-submit"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        t.resources.receiveButton
                      )}
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