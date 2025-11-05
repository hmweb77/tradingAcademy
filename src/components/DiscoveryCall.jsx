"use client";

import { useState, useRef } from "react";
import { Phone, Clock, CheckCircle, ChevronDown, Loader2, AlertTriangle } from "lucide-react";
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

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Validation functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    if (!phone) return true; // Phone is optional
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const validateField = (field, value) => {
    switch(field) {
      case 'name':
        if (!value || value.trim().length < 2) {
          return 'Name must be at least 2 characters';
        }
        return '';
      
      case 'email':
        if (!value) {
          return 'Email is required';
        }
        if (!validateEmail(value)) {
          return 'Please enter a valid email address';
        }
        return '';
      
      case 'phone':
        if (value && !validatePhone(value)) {
          return 'Please enter a valid phone number';
        }
        return '';
      
      case 'experience':
        if (!value) {
          return 'Please select your experience level';
        }
        return '';
      
      default:
        return '';
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
    
    // Real-time validation
    if (touched[field]) {
      const fieldError = validateField(field, value);
      setErrors(prev => ({
        ...prev,
        [field]: fieldError
      }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const fieldError = validateField(field, formData[field]);
    setErrors(prev => ({
      ...prev,
      [field]: fieldError
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      if (field !== 'phone' && field !== 'goals') { // These are optional
        const fieldError = validateField(field, formData[field]);
        if (fieldError) {
          newErrors[field] = fieldError;
        }
      }
    });
    
    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      experience: true
    });
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setError('Please fix the errors above');
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/discovery-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.rateLimitExceeded) {
          throw new Error('⏱️ Too many requests. You can try again in 1 hour. This helps us prevent spam.');
        }
        throw new Error(result.error || 'Failed to submit form');
      }

      setIsSubmitted(true);
      
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          experience: '',
          goals: ''
        });
        setIsSubmitted(false);
        setTouched({});
        setErrors({});
      }, 15000);

    } catch (err) {
      console.error('Form submission error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
          <h2 className="text-3xl md:text-5xl font-bold text-[#00b66f] mb-6">
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
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  // Success Message
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      className="w-20 h-20 bg-[#00b66f]/10 rounded-full flex items-center justify-center mx-auto mb-6"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5, repeat: 2 }}
                    >
                      <CheckCircle className="h-10 w-10 text-[#00b66f]" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-[#0f172a] mb-4">
                      Thank You!
                    </h3>
                    <p className="text-[#6e7b8a] mb-2">
                      Your discovery call request has been submitted successfully.
                    </p>
                    <p className="text-[#6e7b8a]">
                      We'll reach out to you within 24 hours to schedule your consultation.
                    </p>
                  </motion.div>
                ) : (
                  // Form
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    noValidate
                  >
                    {/* Global Error Message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2"
                      >
                        <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <span>{error}</span>
                      </motion.div>
                    )}

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
                        onBlur={() => handleBlur('name')}
                        placeholder={t.discovery.name}
                        disabled={isSubmitting}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-[#ffffff] text-[#0f172a] placeholder:text-[#6e7b8a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                          errors.name && touched.name
                            ? 'border-red-300 focus:ring-red-500'
                            : 'border-[#e2e5e9] focus:ring-[#00b66f]'
                        }`}
                        data-testid="input-name"
                      />
                      {errors.name && touched.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm flex items-center gap-1"
                        >
                          <AlertTriangle className="h-4 w-4" />
                          {errors.name}
                        </motion.p>
                      )}
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
                        onBlur={() => handleBlur('email')}
                        placeholder={t.discovery.email}
                        disabled={isSubmitting}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-[#ffffff] text-[#0f172a] placeholder:text-[#6e7b8a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                          errors.email && touched.email
                            ? 'border-red-300 focus:ring-red-500'
                            : 'border-[#e2e5e9] focus:ring-[#00b66f]'
                        }`}
                        data-testid="input-email"
                      />
                      {errors.email && touched.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm flex items-center gap-1"
                        >
                          <AlertTriangle className="h-4 w-4" />
                          {errors.email}
                        </motion.p>
                      )}
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
                        onBlur={() => handleBlur('phone')}
                        placeholder={t.discovery.phone}
                        disabled={isSubmitting}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-[#ffffff] text-[#0f172a] placeholder:text-[#6e7b8a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                          errors.phone && touched.phone
                            ? 'border-red-300 focus:ring-red-500'
                            : 'border-[#e2e5e9] focus:ring-[#00b66f]'
                        }`}
                        data-testid="input-phone"
                      />
                      {errors.phone && touched.phone && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm flex items-center gap-1"
                        >
                          <AlertTriangle className="h-4 w-4" />
                          {errors.phone}
                        </motion.p>
                      )}
                    </div>

                    {/* Experience Select */}
                    <div className="space-y-2">
                      <label htmlFor="experience" className="text-sm font-medium text-[#0f172a]">
                        {t.discovery.experience} *
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => !isSubmitting && setIsSelectOpen(!isSelectOpen)}
                          onBlur={() => handleBlur('experience')}
                          disabled={isSubmitting}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-[#ffffff] text-left flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                            errors.experience && touched.experience
                              ? 'border-red-300 focus:ring-red-500'
                              : 'border-[#e2e5e9] focus:ring-[#00b66f]'
                          }`}
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
                          {isSelectOpen && !isSubmitting && (
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
                      {errors.experience && touched.experience && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm flex items-center gap-1"
                        >
                          <AlertTriangle className="h-4 w-4" />
                          {errors.experience}
                        </motion.p>
                      )}
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
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-[#e2e5e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b66f] bg-[#ffffff] text-[#0f172a] placeholder:text-[#6e7b8a] resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                        data-testid="textarea-goals"
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#f5b53f] hover:bg-[#e6a52e] text-white py-4 text-lg font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      data-testid="submit-discovery-call"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        t.discovery.submitButton
                      )}
                    </motion.button>

                    <p className="text-sm text-[#6e7b8a] text-center">
                      {t.discovery.disclaimer}
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}