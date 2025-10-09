"use client";

import { Mail, Phone, MapPin, ArrowUp, TrendingUp } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useRef, useState, useEffect } from "react";

export default function Footer() {
  const { t } = useTranslation();
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
    console.log(`Scrolling to ${sectionId}`);
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
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <footer ref={ref} className="bg-secondary text-secondary-foreground relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          className="py-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <motion.h3
                className="text-2xl font-bold flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <TrendingUp className="h-6 w-6 text-chart-3" />
                Ten Percent Academy
              </motion.h3>
              <p className="text-secondary-foreground/80 leading-relaxed">
                {t.footer.tagline}
              </p>
              <div className="pt-4">
                <motion.button
                  onClick={handleStartJourney}
                  className="bg-chart-3 hover:bg-chart-3/90 text-white px-6 py-3 rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid="footer-cta"
                >
                  {t.footer.startJourney}
                </motion.button>
              </div>
            </motion.div>

            {/* Quick Links */}
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
                    className="block text-secondary-foreground/80 hover:text-secondary-foreground transition-colors text-left group"
                    variants={linkVariants}
                    whileHover={{ x: 5 }}
                    data-testid={`footer-${link.id}`}
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-chart-3 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </motion.button>
                ))}
              </motion.nav>
            </motion.div>

            {/* Programs */}
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
                  className="block text-secondary-foreground/80 hover:text-secondary-foreground transition-colors text-left"
                  variants={linkVariants}
                  whileHover={{ x: 5 }}
                  data-testid="footer-group-coaching"
                >
                  {t.footer.intensive}
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection("live-trading")}
                  className="block text-secondary-foreground/80 hover:text-secondary-foreground transition-colors text-left"
                  variants={linkVariants}
                  whileHover={{ x: 5 }}
                  data-testid="footer-private-group"
                >
                  {t.footer.privateGroup}
                </motion.button>
                <motion.span
                  className="block text-secondary-foreground/60"
                  variants={linkVariants}
                >
                  {t.footer.mentorship}
                </motion.span>
              </motion.nav>
            </motion.div>

            {/* Contact Info */}
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
                    text: "+1 (555) 123-4567",
                    href: "tel:+15551234567",
                  },
                  { icon: MapPin, text: "New York, NY", href: null },
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 group"
                    variants={linkVariants}
                    whileHover={{ x: 5 }}
                  >
                    <contact.icon className="h-5 w-5 text-chart-3 group-hover:scale-110 transition-transform" />
                    {contact.href ? (
                      <a
                        href={contact.href}
                        className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                      >
                        {contact.text}
                      </a>
                    ) : (
                      <span className="text-secondary-foreground/80">
                        {contact.text}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          className="border-t border-secondary-foreground/20 py-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-secondary-foreground/60 text-sm">
              {t.footer.copyright}
            </div>
            <div className="flex space-x-6 text-sm">
              {[
                { label: t.footer.privacy },
                { label: t.footer.terms },
                { label: t.footer.disclaimer },
              ].map((item, index) => (
                <motion.button
                  key={index}
                  className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors relative group"
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-chart-3 group-hover:w-full transition-all duration-300"></span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-chart-3 hover:bg-chart-3/90 text-white p-3 rounded-full shadow-lg z-40"
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