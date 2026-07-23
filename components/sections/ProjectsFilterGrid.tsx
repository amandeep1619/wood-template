"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import ProjectCard from "@/components/cards/ProjectCard";
import CTABanner from "@/components/sections/CTABanner";
import { Project, ProjectCategory } from "@/types";

const categories: { label: string; value: "all" | ProjectCategory }[] = [
  { label: "All Projects", value: "all" },
  { label: "Residential", value: "residential" },
  { label: "Kitchen", value: "kitchen" },
  { label: "Office", value: "office" },
  { label: "Furniture", value: "furniture" },
  { label: "Restoration", value: "restoration" },
  { label: "Commercial", value: "commercial" },
];

export default function ProjectsFilterGrid({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<"all" | ProjectCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = projects.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Filter + Search */}
      <section className="py-8 bg-white border-b border-wood-200/50 sticky top-20 z-30 shadow-sm">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setActiveCategory(value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === value
                      ? "bg-walnut text-cream shadow-sm"
                      : "bg-beige text-dark-wood/70 hover:bg-wood-200 hover:text-dark-wood"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full border border-wood-200 bg-cream text-sm focus:outline-none focus:ring-2 focus:ring-walnut/20 focus:border-walnut"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding bg-cream">
        <div className="container-wide">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-xl font-semibold text-dark-wood/40 mb-3">No projects found</p>
                  <p className="text-muted-foreground text-sm">Try a different category or search term</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.map((project, i) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Showing {filtered.length} of {projects.length} projects
          </p>
        </div>
      </section>

      <CTABanner
        headline="Inspired by What You See?"
        subheadline="Let's talk about your project. Every commission begins with a free consultation."
      />
    </>
  );
}
