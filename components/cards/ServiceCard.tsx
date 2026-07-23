"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Armchair, Layout, Home, Briefcase, Wrench, RefreshCw } from "lucide-react";
import { Service } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  Armchair,
  Layout,
  Home,
  Briefcase,
  Wrench,
  RefreshCw,
};

interface ServiceCardProps {
  service: Service;
  variant?: "default" | "featured";
}

export default function ServiceCard({ service, variant = "default" }: ServiceCardProps) {
  const Icon = iconMap[service.icon] ?? Armchair;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="group h-full flex flex-col bg-white rounded-xl overflow-hidden border border-wood-200/50 hover:shadow-xl hover:shadow-walnut/10 transition-shadow duration-300"
    >
      {/* Fixed-height image */}
      <div className="relative h-52 shrink-0 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-dark-wood/80 via-dark-wood/20 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center">
            <Icon size={18} className="text-dark-wood" />
          </div>
        </div>
        {service.startingPrice && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-walnut text-xs font-semibold px-3 py-1.5 rounded-full">
            From {service.startingPrice}
          </div>
        )}
      </div>

      {/* Content — flex-col so the CTA is always pinned to the bottom */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="font-serif text-xl font-semibold text-dark-wood mb-2 group-hover:text-walnut transition-colors">
            {service.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            {service.shortDescription}
          </p>
          <ul className="space-y-1.5">
            {service.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-dark-wood/70">
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA always at the bottom */}
        <div className="pt-5 mt-5 border-t border-wood-100">
          <Link
            href={`/services/${service.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-walnut hover:text-dark-wood transition-colors group/link"
          >
            Explore Service
            <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
