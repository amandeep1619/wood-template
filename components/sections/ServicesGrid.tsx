import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getServices } from "@/lib/api/publicData";
import ServiceCard from "@/components/cards/ServiceCard";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";

export default async function ServicesGrid() {
  const services = await getServices();
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <ScrollReveal className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark mb-3">
              What We Do
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-dark-wood leading-[1.15]">
              Six Disciplines,
              <br />
              One Standard
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="hidden md:block">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-walnut hover:text-dark-wood transition-colors"
            >
              All Services
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        </div>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.1}
        >
          {services.map((service) => (
            <StaggerItem key={service.id} className="h-full">
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal className="mt-10 text-center md:hidden">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-walnut text-walnut font-semibold rounded text-sm tracking-wide hover:bg-walnut hover:text-cream transition-all duration-200"
          >
            View All Services
            <ArrowRight size={14} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
