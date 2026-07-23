"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/cards/ProjectCard";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Project, ProjectCategory } from "@/types";

const categories: { label: string; value: "all" | ProjectCategory }[] = [
  { label: "All Work", value: "all" },
  { label: "Residential", value: "residential" },
  { label: "Kitchen", value: "kitchen" },
  { label: "Office", value: "office" },
  { label: "Furniture", value: "furniture" },
  { label: "Restoration", value: "restoration" },
];

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<"all" | ProjectCategory>("all");

  const filtered = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="section-padding bg-beige">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <ScrollReveal className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark mb-3">
              Our Work
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-dark-wood">
              Craftsmanship
              <br />
              in Action
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="hidden md:block">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-walnut hover:text-dark-wood transition-colors"
            >
              All Projects
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Category filter */}
        <ScrollReveal className="flex flex-wrap gap-2 mb-8">
          {categories.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveCategory(value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === value
                  ? "bg-walnut text-cream shadow-md"
                  : "bg-white text-dark-wood/70 border border-wood-200 hover:border-walnut hover:text-walnut"
              }`}
            >
              {label}
            </button>
          ))}
        </ScrollReveal>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="h-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <ScrollReveal className="mt-10 text-center md:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-walnut text-walnut font-semibold rounded text-sm tracking-wide hover:bg-walnut hover:text-cream transition-all duration-200"
          >
            View All Projects
            <ArrowRight size={14} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
