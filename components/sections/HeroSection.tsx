"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Award, ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=90"
          alt="Master carpenter at work"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-dark-wood/92 via-dark-wood/70 to-dark-wood/30" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-dark-wood/40" />
      </div>

      {/* Content */}
      <div className="relative container-wide w-full pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-gold/30 rounded-full px-4 py-2 mb-8"
          >
            <Award size={14} className="text-gold" />
            <span className="text-sm text-white/90 font-medium tracking-wide">
              Master Craftsmen Since 1998 · Award-Winning Woodwork
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6"
          >
            Where Wood
            <br />
            <span className="text-gold italic">Becomes</span>
            <br />
            Heirloom.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg text-white/75 leading-relaxed max-w-xl mb-10"
          >
            We craft bespoke furniture, kitchen cabinetry, and architectural woodwork that outlasts generations. Every joint is cut by hand. Every finish is applied with intention.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gold text-dark-wood font-semibold rounded text-sm tracking-wide hover:bg-gold-light transition-colors duration-200 shadow-lg shadow-gold/20"
            >
              Start Your Project
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold rounded text-sm tracking-wide hover:bg-white/10 transition-colors duration-200 backdrop-blur-sm"
            >
              View Our Work
            </Link>
          </motion.div>
        </div>

        {/* Experience badge — rotated */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
          animate={{ opacity: 1, scale: 1, rotate: -12 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-24 right-8 lg:right-16 hidden lg:flex items-center justify-center"
        >
          <div className="relative w-28 h-28">
            <svg viewBox="0 0 120 120" className="w-full h-full animate-[spin_18s_linear_infinite]">
              <defs>
                <path id="circle" d="M 60,60 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
              </defs>
              <text className="text-[11.5px] fill-gold font-semibold tracking-[0.35em] uppercase">
                <textPath href="#circle">25+ Years of Excellence · Artisan Quality ·</textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white leading-none tracking-tight">25</span>
              <span className="text-xs text-gold tracking-widest uppercase">Years</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="absolute bottom-0 left-0 right-0 bg-walnut/90 backdrop-blur-sm border-t border-white/10"
      >
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
            {[
              { value: "850+", label: "Projects Completed" },
              { value: "25+", label: "Years Experience" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "12", label: "Industry Awards" },
            ].map(({ value, label }) => (
              <div key={label} className="py-4 px-6 text-center">
                <div className="text-2xl font-black text-gold mb-0.5 tracking-tight">{value}</div>
                <div className="text-xs text-white/70 font-medium tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
