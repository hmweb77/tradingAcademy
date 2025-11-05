"use client";

import { Mail, Phone, MapPin, ArrowUp, TrendingUp } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useRef, useState, useEffect } from "react";

export default function Footer() {
  const { t, isRTL } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll to top button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleStartJourney = () => {
    scrollToSection("resources");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: isRTL ? 10 : -10 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <footer ref={ref} className="bg-[#0f172a] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          className="py-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* FIXED: Better grid layout for RTL */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            {/* Company Info - FIXED: Better RTL handling */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <motion.h3
                className={`text-2xl font-bold flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                whileHover={{ scale: 1.05 }}
              >
                <TrendingUp className="h-6 w-6 text-[#f5b53f]" />
                Ten Percent Academy
              </motion.h3>
              <p className="text-white/80 leading-relaxed">
                {t.footer.tagline}
              </p>
              <div className="pt-4">
                <motion.button
                  onClick={handleStartJourney}
                  className="bg-[#f5b53f] hover:bg-[#e6a52e] text-white px-6 py-3 rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid="footer-cta"
                >
                  {t.footer.startJourney}
                </motion.button>
              </div>
            </motion.div>

            {/* Quick Links - FIXED: RTL support */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <h4 className="text-lg font-semibold">{t.footer.quickLinks}</h4>
              <motion.nav
                className="space-y-2"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {[
                  { id: "about", label: t.footer.aboutUs },
                  { id: "live-trading", label: t.footer.liveTrading },
                  { id: "coaching", label: t.footer.groupCoaching },
                  { id: "resources", label: t.footer.freeResources },
                ].map((link) => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`block text-white/80 hover:text-white transition-colors group w-full ${isRTL ? 'text-right' : 'text-left'}`}
                    variants={linkVariants}
                    whileHover={{ x: isRTL ? -5 : 5 }}
                    data-testid={`footer-${link.id}`}
                  >
                    <span className="relative">
                      {link.label}
                      <span className={`absolute bottom-0 w-0 h-0.5 bg-[#f5b53f] group-hover:w-full transition-all duration-300 ${isRTL ? 'right-0' : 'left-0'}`}></span>
                    </span>
                  </motion.button>
                ))}
              </motion.nav>
            </motion.div>

            {/* Programs - FIXED: RTL support */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <h4 className="text-lg font-semibold">{t.footer.programs}</h4>
              <motion.nav
                className="space-y-2"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <motion.button
                  onClick={() => scrollToSection("coaching")}
                  className={`block text-white/80 hover:text-white transition-colors w-full ${isRTL ? 'text-right' : 'text-left'}`}
                  variants={linkVariants}
                  whileHover={{ x: isRTL ? -5 : 5 }}
                  data-testid="footer-group-coaching"
                >
                  {t.footer.intensive}
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection("live-trading")}
                  className={`block text-white/80 hover:text-white transition-colors w-full ${isRTL ? 'text-right' : 'text-left'}`}
                  variants={linkVariants}
                  whileHover={{ x: isRTL ? -5 : 5 }}
                  data-testid="footer-private-group"
                >
                  {t.footer.privateGroup}
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection("discovery")}
                  className={`block text-white/80 hover:text-white transition-colors w-full ${isRTL ? 'text-right' : 'text-left'}`}
                  variants={linkVariants}
                  whileHover={{ x: isRTL ? -5 : 5 }}
                  data-testid="footer-private-group"
                >
                  {t.footer.mentorship}
                  </motion.button>
              </motion.nav>
            </motion.div>

            {/* Contact Info - FIXED: RTL support for icons and text */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <h4 className="text-lg font-semibold">{t.footer.contact}</h4>
              <div className="space-y-3">
                {[
                  {
                    icon: Mail,
                    text: "info@tenpercentacademy.com",
                    href: "mailto:info@tenpercentacademy.com",
                  },
                  {
                    icon: Phone,
                    text: "+212 724687666",
                    href: "tel:+212724687666",
                  },
                  { icon: MapPin, text: "Casablanca", href: null },
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-center gap-3 group ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                    variants={linkVariants}
                    whileHover={{ x: isRTL ? -5 : 5 }}
                  >
                    <contact.icon className="h-5 w-5 text-[#f5b53f] group-hover:scale-110 transition-transform flex-shrink-0" />
                    {contact.href ? (
                      <a
                        href={contact.href}
                        className="text-white/80 hover:text-white transition-colors"
                        dir="ltr"
                      >
                        {contact.text}
                      </a>
                    ) : (
                      <span className="text-white/80">
                        {contact.text}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Footer - FIXED: RTL support */}
        <motion.div
          className="border-t border-white/20 py-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className={`flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <div className="text-white/60 text-sm">
              {t.footer.copyright}
            </div>
            <div className={`flex space-x-6 text-sm ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {[
                { label: t.footer.privacy },
                { label: t.footer.terms },
                { label: t.footer.disclaimer },
              ].map((item, index) => (
                <motion.button
                  key={index}
                  className="text-white/60 hover:text-white transition-colors relative group"
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  <span className={`absolute bottom-0 w-0 h-0.5 bg-[#f5b53f] group-hover:w-full transition-all duration-300 ${isRTL ? 'right-0' : 'left-0'}`}></span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button - FIXED: Position for RTL */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className={`fixed bottom-8 ${isRTL ? 'left-8' : 'right-8'} bg-[#f5b53f] hover:bg-[#e6a52e] text-white p-3 rounded-full shadow-lg z-40`}
            initial={{ opacity: 0, scale: 0, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 100 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}