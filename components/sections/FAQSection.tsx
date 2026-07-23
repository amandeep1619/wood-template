"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQ } from "@/types";
import { generalFAQs } from "@/lib/data/faqs";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ faq, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${isOpen ? "border-gold/50 shadow-sm shadow-gold/10" : "border-wood-200/60"}`}>
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full px-6 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className={`text-base font-semibold pr-4 transition-colors leading-snug ${isOpen ? "text-walnut" : "text-dark-wood group-hover:text-walnut"}`}>
          {faq.question}
        </span>
        <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${isOpen ? "bg-walnut text-cream" : "bg-wood-100 text-dark-wood group-hover:bg-walnut group-hover:text-cream"}`}>
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-wood-100 pt-4">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FAQSectionProps {
  faqs?: FAQ[];
  title?: string;
  subtitle?: string;
}

export default function FAQSection({
  faqs = generalFAQs,
  title = "Questions & Answers",
  subtitle = "Everything you need to know before starting your project.",
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <ScrollReveal direction="left" className="lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark mb-3">
              FAQ
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-dark-wood mb-5 leading-[1.15]">
              {title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {subtitle}
            </p>
            <div className="p-6 bg-beige rounded-xl border border-wood-200/50">
              <p className="text-sm text-dark-wood/70 mb-3">
                Still have questions? We're happy to help.
              </p>
              <a
                href="tel:+12125551234"
                className="block w-full py-3 text-center bg-walnut text-cream font-semibold rounded text-sm tracking-wide hover:bg-dark-wood transition-colors"
              >
                Call (212) 555-1234
              </a>
            </div>
          </ScrollReveal>

          {/* Right */}
          <StaggerContainer className="space-y-3" staggerDelay={0.06} delayChildren={0.2}>
            {faqs.map((faq, i) => (
              <StaggerItem key={i}>
                <FAQItem
                  faq={faq}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
