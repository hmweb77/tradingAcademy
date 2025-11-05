"use client";

import { useState, useRef } from "react";
import { ChevronDown, Search, Phone, HelpCircle } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

export default function FAQSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: t.faq.question1,
      answer: t.faq.answer1
    },
    {
      question: t.faq.question2,
      answer: t.faq.answer2
    },
    {
      question: t.faq.question3,
      answer: t.faq.answer3
    },
    {
      question: t.faq.question4,
      answer: t.faq.answer4
    },
    {
      question: t.faq.question5,
      answer: t.faq.answer5
    }
  ];

  // Filter FAQs based on search
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const scrollToDiscovery = () => {
    const element = document.getElementById("discovery");
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
        ease: "easeOut",
      },
    },
  };

  const answerVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 }
      }
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2, delay: 0.1 }
      }
    }
  };

  return (
    <section id="faq" ref={ref} className="py-4 bg-[#f8f9fb]/30 scroll-mt-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
         
          <h2 className="text-3xl md:text-5xl font-bold text-[#00b66f] mb-6">
            {t.faq.title}
          </h2>
          <p className="text-xl text-[#6e7b8a] leading-relaxed">
            {t.faq.subtitle}
          </p>
        </motion.div>

        {/* Search Bar */}
        {/* <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#6e7b8a]" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-[#e2e5e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b66f] bg-[#ffffff] text-[#0f172a] placeholder:text-[#6e7b8a]"
            />
          </div>
          {searchQuery && (
            <motion.p
              className="text-sm text-[#6e7b8a] mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'} found
            </motion.p>
          )}
        </motion.div> */}

        {/* FAQ Accordion */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-[#f7f9fa] rounded-lg border border-[#e2e5e9] overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#f8f9fb] transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-semibold text-[#0f172a] pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-[#6e7b8a] flex-shrink-0" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      variants={answerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-[#6e7b8a] leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-[#6e7b8a] mb-4">
                No questions found matching "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="text-[#00b66f] hover:text-[#00b66f]/80 font-medium"
              >
                Clear search
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-12 text-center bg-[#f7f9fa] rounded-lg border border-[#e2e5e9] p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-[#0f172a] mb-4">
            {t.faq.stillHaveQuestions}
          </h3>
          <p className="text-[#6e7b8a] mb-6">
            Our team is here to help you with any questions you may have.
          </p>
          <motion.button
            onClick={scrollToDiscovery}
            className="bg-[#f5b53f] hover:bg-[#e6a52e] text-white px-8 py-4 text-lg font-semibold rounded-lg inline-flex items-center gap-2 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="h-5 w-5" />
            {t.faq.bookCallButton}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}