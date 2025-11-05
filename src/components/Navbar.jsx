"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageSelector from "@/components/LanguageSelector";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const mobileMenuRef = useRef(null);

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
    setIsMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen && 
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('[data-menu-button]')
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Animation variants
  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff]/95 backdrop-blur-sm border-b border-[#e2e5e9]"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsMenuOpen(false);
            }}
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            aria-label="Go to homepage"
          >
            <span className="text-2xl font-bold text-[#0f172a] bg-gradient-to-r from-[#0f172a] to-[#00b66f] bg-clip-text">
              Ten Percent Academy
            </span>
          </motion.button>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {[
                { id: "about", label: t.nav.about },
                { id: "live-trading", label: t.nav.liveTrading },
                { id: "coaching", label: t.nav.coaching },
                { id: "resources", label: t.nav.resources },
                { id: "discovery", label: t.nav.discovery },
              ].map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-[#6e7b8a] hover:text-[#0f172a] px-3 py-2 text-sm font-medium transition-colors relative group"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`nav-${item.id}`}
                >
                  {item.label}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00b66f] origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* CTA Button and Language Selector */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <motion.button
              onClick={() => scrollToSection("coaching")}
              className="bg-[#f5b53f] hover:bg-[#e6a52e] text-white px-4 py-2 rounded-lg font-medium inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="nav-cta"
            >
              <PhoneCall className="h-4 w-4" />
              {t.nav.bookCall}
            </motion.button>
          </div>

          {/* Mobile menu button and language selector */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSelector />
            <motion.button
              className="p-2 rounded-lg hover:bg-[#00b66f]/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.9 }}
              data-testid="mobile-menu-toggle"
              data-menu-button
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                style={{ top: '64px' }}
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.2 }}
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Menu Content */}
              <motion.div
                ref={mobileMenuRef}
                className="md:hidden absolute top-full left-0 right-0 z-50"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className="px-2 pt-2 pb-3 space-y-1 bg-[#f7f9fa] rounded-b-lg mx-2 border-x border-b border-[#e2e5e9] shadow-lg">
                  {[
                    { id: "about", label: t.nav.about },
                    { id: "live-trading", label: t.nav.liveTrading },
                    { id: "coaching", label: t.nav.coaching },
                    { id: "resources", label: t.nav.resources },
                    { id: "discovery", label: t.nav.discovery },
                  ].map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-[#6e7b8a] hover:text-[#0f172a] hover:bg-[#00b66f]/10 block px-3 py-2 text-base font-medium w-full text-left rounded-md transition-colors"
                      variants={menuItemVariants}
                      whileTap={{ scale: 0.98 }}
                      data-testid={`mobile-nav-${item.id}`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                  <motion.div className="px-3 py-2" variants={menuItemVariants}>
                    <button
                      onClick={() => scrollToSection("coaching")}
                      className="w-full bg-[#f5b53f] hover:bg-[#e6a52e] text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center gap-2"
                      data-testid="mobile-nav-cta"
                    >
                      <PhoneCall className="h-4 w-4" />
                      {t.nav.bookCall}
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}