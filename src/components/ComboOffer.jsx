"use client";

import { Trophy, Bell, Sparkles, CheckCircle, Clock } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useRef, useState, useEffect } from "react";
import EnrollmentPopup from "@/components/EnrollmentPopup";

export default function ComboOfferSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  // Countdown timer state - ends Sunday midnight (Nov 24, 2024 00:00:00)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date: Sunday, November 24, 2024 at midnight
    const targetDate = new Date('2025-11-23T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

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
         
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Countdown Timer Banner */}
        {/* Countdown Timer Banner */}
<motion.div
  className="mb-8 bg-gradient-to-r from-red-600 to-red-600 rounded-xl p-4 sm:p-5 shadow-lg"
  initial={{ opacity: 0, y: -20 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  <div className="flex flex-col items-center gap-3 sm:gap-4 text-center">
    {/* Title */}
    <div className="flex items-center justify-center gap-2 flex-wrap">
      <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-white animate-pulse" />
      <span className="text-white font-bold text-sm sm:text-base md:text-lg">
        🔥 LIMITED TIME OFFER ENDS IN:
      </span>
    </div>

    {/* Time boxes */}
    <div className="grid grid-cols-2 gap-3 w-full max-w-xs sm:max-w-none sm:flex sm:flex-row sm:justify-center">
      {/* Days */}
      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-center flex-1 sm:flex-none min-w-[0]">
        <div className="text-2xl sm:text-3xl font-bold text-white">
          {timeLeft.days}
        </div>
        <div className="text-[10px] sm:text-xs text-white/90 uppercase tracking-wide">
          Days
        </div>
      </div>

      {/* Hours */}
      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-center flex-1 sm:flex-none min-w-[0]">
        <div className="text-2xl sm:text-3xl font-bold text-white">
          {String(timeLeft.hours).padStart(2, "0")}
        </div>
        <div className="text-[10px] sm:text-xs text-white/90 uppercase tracking-wide">
          Hours
        </div>
      </div>

      {/* Minutes */}
      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-center flex-1 sm:flex-none min-w-[0]">
        <div className="text-2xl sm:text-3xl font-bold text-white">
          {String(timeLeft.minutes).padStart(2, "0")}
        </div>
        <div className="text-[10px] sm:text-xs text-white/90 uppercase tracking-wide">
          Minutes
        </div>
      </div>

      {/* Seconds */}
      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-center flex-1 sm:flex-none min-w-[0]">
        <div className="text-2xl sm:text-3xl font-bold text-white">
          {String(timeLeft.seconds).padStart(2, "0")}
        </div>
        <div className="text-[10px] sm:text-xs text-white/90 uppercase tracking-wide">
          Seconds
        </div>
      </div>
    </div>
  </div>
</motion.div>


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
                        SAVE $400!
                      </div>
                      <div className="text-sm text-gray-300 mb-2">{t.combo.bundlePrice}</div>
                      <div className="text-5xl font-bold text-[#f5b53f] mb-2">$197</div>
                      <div className="text-gray-300">{t.combo.oneTime}</div>
                    </motion.div>

                    {/* <div className="space-y-3 pt-4 border-t border-white/20">
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
                        <span className="text-green-400 font-semibold">-$216</span>
                      </div>
                    </div> */}

                    <motion.button
                      onClick={() => setIsPopupOpen(true)}
                      className="w-full bg-[#f5b53f] hover:bg-[#e6a52e] text-white px-8 py-4 text-lg font-semibold rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Sparkles className="h-5 w-5" />
                      {t.combo.ctaButton}
                    </motion.button>

                  
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