"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Calendar } from "lucide-react";
import { Project } from "@/types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  project: Project;
  /** height class applied to the card — defaults to h-72 */
  height?: string;
}

const categoryLabels: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  kitchen: "Kitchen",
  furniture: "Furniture",
  restoration: "Restoration",
  renovation: "Renovation",
  office: "Office",
};

export default function ProjectCard({ project, height = "h-72" }: ProjectCardProps) {
  const router = useRouter()
  const handleOnClick = (link: string) => {
    router.push(link)
  }
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-dark-wood cursor-pointer",
        height
      )}
      onClick={() => handleOnClick(`/projects/${project.slug}`)}
    >
      <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10" aria-label={project.title} />

      <Image
        src={project.coverImage}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-dark-wood via-dark-wood/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

      {/* Category badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="inline-flex items-center px-3 py-1 bg-gold/90 backdrop-blur-sm text-dark-wood text-xs font-semibold rounded-full">
          {categoryLabels[project.category] ?? project.category}
        </span>
      </div>

      {/* Arrow icon */}
      <div className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        <ArrowUpRight size={16} className="text-white" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-base font-semibold text-white mb-2 leading-tight tracking-tight">
          {project.title}
        </h3>
        <p className="text-white/70 text-sm leading-relaxed mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-20 overflow-hidden">
          {project.shortDescription}
        </p>
        <div className="flex items-center gap-4 text-white/60 text-xs">
          <span className="flex items-center gap-1.5">
            <MapPin size={11} />
            {project.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={11} />
            {project.year}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
