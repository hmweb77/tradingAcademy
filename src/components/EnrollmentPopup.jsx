"use client";

import { useState } from "react";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Reusable Enrollment Popup Component
 * Used for both Live Trading and Group Coaching enrollments
 * 
 * @param {boolean} isOpen - Controls popup visibility
 * @param {function} onClose - Callback when popup closes
 * @param {string} type - Either 'live-trading' or 'group-coaching'
 * @param {string} title - Popup title
 * @param {string} description - Popup description
 */
export default function EnrollmentPopup({ isOpen, onClose, type, title, description }) {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goal: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Determine API endpoint based on type
  const apiEndpoint = type === 'live-trading' 
    ? '/api/live-trading' 
    : '/api/group-coaching';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      // Show success message
      setIsSubmitted(true);
      
      // Reset form and close popup after 3 seconds
      setTimeout(() => {
        handleClose();
      }, 3000);

    } catch (err) {
      console.error('Form submission error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleClose = () => {
    // Reset form state
    setFormData({ name: '', email: '', phone: '', goal: '' });
    setIsSubmitted(false);
    setError('');
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Popup Dialog */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="bg-[#f7f9fa] rounded-lg border border-[#e2e5e9] shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-[#f7f9fa] border-b border-[#e2e5e9] p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-[#0f172a]">{title}</h3>
                  <p className="text-sm text-[#6e7b8a] mt-1">{description}</p>
                </div>
                <motion.button
                  onClick={handleClose}
                  className="p-2 rounded-lg hover:bg-[#00b66f]/10 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  data-testid="close-popup"
                >
                  <X className="h-5 w-5 text-[#6e7b8a]" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6">
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
                        <CheckCircle2 className="h-10 w-10 text-[#00b66f]" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-[#0f172a] mb-4">
                        Thank You!
                      </h3>
                      <p className="text-[#6e7b8a] mb-2">
                        Your enrollment request has been submitted successfully.
                      </p>
                      <p className="text-[#6e7b8a]">
                        We'll reach out to you soon with next steps.
                      </p>
                    </motion.div>
                  ) : (
                    // Form
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      {/* Error Message */}
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
                        >
                          {error}
                        </motion.div>
                      )}

                      {/* Name Input */}
                      <div className="space-y-2">
                        <label htmlFor="popup-name" className="text-sm font-medium text-[#0f172a]">
                          Full Name *
                        </label>
                        <input
                          id="popup-name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Enter your full name"
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 border border-[#e2e5e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b66f] bg-[#ffffff] text-[#0f172a] placeholder:text-[#6e7b8a] disabled:opacity-50 disabled:cursor-not-allowed"
                          data-testid="popup-input-name"
                        />
                      </div>

                      {/* Email Input */}
                      <div className="space-y-2">
                        <label htmlFor="popup-email" className="text-sm font-medium text-[#0f172a]">
                          Email Address *
                        </label>
                        <input
                          id="popup-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your.email@example.com"
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 border border-[#e2e5e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b66f] bg-[#ffffff] text-[#0f172a] placeholder:text-[#6e7b8a] disabled:opacity-50 disabled:cursor-not-allowed"
                          data-testid="popup-input-email"
                        />
                      </div>

                      {/* Phone Input */}
                      <div className="space-y-2">
                        <label htmlFor="popup-phone" className="text-sm font-medium text-[#0f172a]">
                          Phone Number
                        </label>
                        <input
                          id="popup-phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 border border-[#e2e5e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b66f] bg-[#ffffff] text-[#0f172a] placeholder:text-[#6e7b8a] disabled:opacity-50 disabled:cursor-not-allowed"
                          data-testid="popup-input-phone"
                        />
                      </div>

                      {/* Goal Textarea */}
                      <div className="space-y-2">
                        <label htmlFor="popup-goal" className="text-sm font-medium text-[#0f172a]">
                          What's your goal for joining? *
                        </label>
                        <textarea
                          id="popup-goal"
                          value={formData.goal}
                          onChange={(e) => handleInputChange('goal', e.target.value)}
                          placeholder="Tell us what you hope to achieve..."
                          rows={4}
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 border border-[#e2e5e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b66f] bg-[#ffffff] text-[#0f172a] placeholder:text-[#6e7b8a] resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                          data-testid="popup-textarea-goal"
                        />
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#00b66f] hover:bg-[#00b66f]/90 text-white py-3 text-lg font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                        data-testid="popup-submit"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          'Submit Request'
                        )}
                      </motion.button>

                      <p className="text-xs text-[#6e7b8a] text-center">
                        We'll review your application and get back to you within 24 hours.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}