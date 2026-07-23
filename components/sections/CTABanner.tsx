"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

interface CTABannerProps {
  headline?: string;
  subheadline?: string;
  primaryLabel?: string;
  primaryHref?: string;
  image?: string;
}

export default function CTABanner({
  headline = "Ready to Create Something Extraordinary?",
  subheadline = "Tell us about your project. We'll respond within one business day with a free consultation.",
  primaryLabel = "Start Your Project",
  primaryHref = "/contact",
  image = "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1200&q=80",
}: CTABannerProps) {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt="Workshop craftsmanship"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-dark-wood/88" />
      </div>

      {/* Decorative accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="absolute -right-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold/10"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2 }}
          viewport={{ once: true }}
          className="absolute -right-20 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gold/15"
        />
      </div>

      <div className="container-wide relative">
        <div className="max-w-3xl">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
              Get Started Today
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1]">
              {headline}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-xl">
              {subheadline}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={primaryHref}
                className="group inline-flex items-center gap-2.5 px-8 py-4 bg-gold text-dark-wood font-semibold rounded text-sm tracking-wide hover:bg-gold-light transition-colors duration-200 shadow-lg shadow-gold/20"
              >
                {primaryLabel}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="tel:+12125551234"
                className="inline-flex items-center gap-2.5 px-8 py-4 border border-white/30 text-white font-semibold rounded text-sm tracking-wide hover:bg-white/10 backdrop-blur-sm transition-colors"
              >
                <Phone size={15} />
                (212) 555-1234
              </a>
            </div>
          </ScrollReveal>

          {/* Trust signals */}
          <ScrollReveal delay={0.4}>
            <div className="flex flex-wrap items-center gap-6 mt-10 pt-10 border-t border-white/15">
              {["Free Consultation", "Fixed-Price Quotes", "25-Year Warranty", "White-Glove Install"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="text-xs text-white/60 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
