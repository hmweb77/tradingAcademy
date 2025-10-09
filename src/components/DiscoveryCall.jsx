"use client";

import { useState, useRef } from "react";
import { Phone, Clock, CheckCircle, ChevronDown } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

export default function DiscoveryCallSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    goals: ''
  });

  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Discovery call form submitted:', formData);
    // TODO: Implement form submission
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const benefits = [
    t.discovery.benefit1,
    t.discovery.benefit2,
    t.discovery.benefit3,
    t.discovery.benefit4,
    t.discovery.benefit5
  ];

  const experienceOptions = [
    { value: 'complete-beginner', label: t.discovery.beginner },
    { value: 'some-knowledge', label: t.discovery.someKnowledge },
    { value: 'intermediate', label: t.discovery.intermediate },
    { value: 'experienced', label: t.discovery.experienced }
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
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="discovery" ref={ref} className="py-24 bg-[#f8f9fb]/30 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-6">
            {t.discovery.title}
          </h2>
          <p className="text-xl text-[#6e7b8a] max-w-3xl mx-auto leading-relaxed">
            {t.discovery.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Benefits */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Main Benefits Card */}
            <motion.div
              className="bg-[#f7f9fa] rounded-lg border border-[#e2e5e9] shadow-sm"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <motion.div
                    className="w-12 h-12 bg-[#00b66f]/10 rounded-lg flex items-center justify-center"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Phone className="h-6 w-6 text-[#00b66f]" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#0f172a]">
                      {t.discovery.consultationTitle}
                    </h3>
                    <p className="text-[#6e7b8a]">{t.discovery.duration}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-3 group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <CheckCircle className="h-5 w-5 text-[#00b66f] mt-0.5 flex-shrink-0" />
                      <span className="text-[#6e7b8a] group-hover:text-[#0f172a] transition-colors">
                        {benefit}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* What to Expect Card */}
            <motion.div
              className="bg-[#f7f9fa] rounded-lg border border-[#e2e5e9] shadow-sm"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <Clock className="h-6 w-6 text-[#00b66f]" />
                  <h3 className="text-lg font-semibold text-[#0f172a]">
                    {t.discovery.expectTitle}
                  </h3>
                </div>
                <ul className="space-y-3 text-[#6e7b8a]">
                  {[
                    t.discovery.expect1,
                    t.discovery.expect2,
                    t.discovery.expect3,
                    t.discovery.expect4
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start space-x-2 group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <span className="w-1.5 h-1.5 bg-[#00b66f] rounded-full mt-2 flex-shrink-0"></span>
                      <span className="group-hover:text-[#0f172a] transition-colors">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            className="bg-[#f7f9fa] rounded-lg border border-[#e2e5e9] shadow-lg"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ y: -5 }}
          >
            <div className="p-6 border-b border-[#e2e5e9]">
              <h3 className="text-2xl font-bold text-[#0f172a] text-center">
                {t.discovery.formTitle}
              </h3>
            </div>
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-[#0f172a]">
                    {t.discovery.name} *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder={t.discovery.name}
                    required
                    className="w-full px-4 py-3 border border-[#e2e5e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b66f] bg-[#ffffff] text-[#0f172a] placeholder:text-[#6e7b8a]"
                    data-testid="input-name"
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-[#0f172a]">
                    {t.discovery.email} *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder={t.discovery.email}
                    required
                    className="w-full px-4 py-3 border border-[#e2e5e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b66f] bg-[#ffffff] text-[#0f172a] placeholder:text-[#6e7b8a]"
                    data-testid="input-email"
                  />
                </div>

                {/* Phone Input */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-[#0f172a]">
                    {t.discovery.phone}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder={t.discovery.phone}
                    className="w-full px-4 py-3 border border-[#e2e5e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b66f] bg-[#ffffff] text-[#0f172a] placeholder:text-[#6e7b8a]"
                    data-testid="input-phone"
                  />
                </div>

                {/* Experience Select */}
                <div className="space-y-2">
                  <label htmlFor="experience" className="text-sm font-medium text-[#0f172a]">
                    {t.discovery.experience} *
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsSelectOpen(!isSelectOpen)}
                      className="w-full px-4 py-3 border border-[#e2e5e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b66f] bg-[#ffffff] text-left flex items-center justify-between"
                      data-testid="select-experience"
                    >
                      <span className={formData.experience ? "text-[#0f172a]" : "text-[#6e7b8a]"}>
                        {formData.experience 
                          ? experienceOptions.find(opt => opt.value === formData.experience)?.label 
                          : t.discovery.experiencePlaceholder}
                      </span>
                      <ChevronDown className={`h-4 w-4 text-[#6e7b8a] transition-transform ${isSelectOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isSelectOpen && (
                        <motion.div
                          className="absolute z-10 w-full mt-2 bg-[#ffffff] border border-[#e2e5e9] rounded-lg shadow-lg overflow-hidden"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {experienceOptions.map((option) => (
                            <motion.button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                handleInputChange('experience', option.value);
                                setIsSelectOpen(false);
                              }}
                              className="w-full px-4 py-3 text-left hover:bg-[#00b66f]/10 transition-colors text-[#0f172a]"
                              whileHover={{ x: 5 }}
                            >
                              {option.label}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Goals Textarea */}
                <div className="space-y-2">
                  <label htmlFor="goals" className="text-sm font-medium text-[#0f172a]">
                    {t.discovery.goals}
                  </label>
                  <textarea
                    id="goals"
                    value={formData.goals}
                    onChange={(e) => handleInputChange('goals', e.target.value)}
                    placeholder={t.discovery.goalsPlaceholder}
                    rows={4}
                    className="w-full px-4 py-3 border border-[#e2e5e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b66f] bg-[#ffffff] text-[#0f172a] placeholder:text-[#6e7b8a] resize-none"
                    data-testid="textarea-goals"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full bg-[#f5b53f] hover:bg-[#e6a52e] text-white py-4 text-lg font-semibold rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-testid="submit-discovery-call"
                >
                  {t.discovery.submitButton}
                </motion.button>

                <p className="text-sm text-[#6e7b8a] text-center">
                  {t.discovery.disclaimer}
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}