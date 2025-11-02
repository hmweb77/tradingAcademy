"use client";

import { Trophy, Bell, Sparkles, CheckCircle } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useRef, useState } from "react";
import EnrollmentPopup from "@/components/EnrollmentPopup";

export default function ComboOfferSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const features = [
    t.combo.feature1,
    t.combo.feature2,
    t.combo.feature3,
    t.combo.feature4,
    t.combo.feature5,
    t.combo.feature6,
    t.combo.feature7,
    t.combo.feature8
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-[#f8f9fb] via-white to-[#f8f9fb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          
          <h2 className="text-3xl md:text-5xl font-bold text-[#00b66f] mb-6">
            {t.combo.title}
          </h2>
          <p className="text-xl text-[#6e7b8a] max-w-3xl mx-auto leading-relaxed">
            {t.combo.subtitle}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
              <div className="text-white space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex gap-2">
                    <div className="w-12 h-12 bg-[#f5b53f]/20 rounded-lg flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-[#f5b53f]" />
                    </div>
                    <div className="w-12 h-12 bg-[#f5b53f]/20 rounded-lg flex items-center justify-center">
                      <Bell className="h-6 w-6 text-[#f5b53f]" />
                    </div>
                  </div>
                </div>

                <h3 className="text-3xl font-bold">{t.combo.packageTitle}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {t.combo.packageDesc}
                </p>

                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <CheckCircle className="h-5 w-5 text-[#f5b53f] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-200">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center space-y-6">
                    <div>
                      <div className="text-gray-400 text-sm mb-2">{t.combo.regularPrice}</div>
                      <div className="text-2xl text-gray-400 line-through">{t.combo.regularPriceAmount}</div>
                    </div>

                    <motion.div
                      className="relative"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="absolute -top-4 -right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold transform rotate-12">
                        {t.combo.saveAmount}
                      </div>
                      <div className="text-sm text-gray-300 mb-2">{t.combo.bundlePrice}</div>
                      <div className="text-5xl font-bold text-[#f5b53f] mb-2">{t.combo.bundlePriceAmount}</div>
                      <div className="text-gray-300">{t.combo.oneTime}</div>
                    </motion.div>

                    <div className="space-y-3 pt-4 border-t border-white/20">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">{t.combo.coachingLabel}</span>
                        <span className="text-white font-semibold">{t.combo.coachingPrice}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">{t.combo.signalsLabel}</span>
                        <span className="text-white font-semibold">{t.combo.signalsPrice}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-400">{t.combo.discountLabel}</span>
                        <span className="text-green-400 font-semibold">{t.combo.discountAmount}</span>
                      </div>
                    </div>

                    <motion.button
                      onClick={() => setIsPopupOpen(true)}
                      className="w-full bg-[#f5b53f] hover:bg-[#e6a52e] text-white px-8 py-4 text-lg font-semibold rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Sparkles className="h-5 w-5" />
                      {t.combo.ctaButton}
                    </motion.button>

                    <p className="text-xs text-gray-400 mt-4">
                      {t.combo.guarantee}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <EnrollmentPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        type="combo"
        title={t.combo.title}
        description={t.combo.subtitle}
      />
    </section>
  );
}
