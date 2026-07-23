import type { Metadata } from "next";
import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ProjectsFilterGrid from "@/components/sections/ProjectsFilterGrid";
import { getProjects } from "@/lib/api/publicData";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse 850+ completed projects — custom furniture, kitchen cabinetry, office fit-outs, and architectural woodwork crafted by Tirath Wood Works.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    type: "website",
    url: "https://www.tirath-wood-works.com/projects",
    title: "Portfolio | Tirath Wood Works",
    description:
      "Browse 850+ completed projects — custom furniture, kitchen cabinetry, office fit-outs, and architectural woodwork crafted by Tirath Wood Works.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&h=630&fit=crop&q=90",
        width: 1200,
        height: 630,
        alt: "Tirath Wood Works – Project Portfolio",
      },
    ],
  },
};

export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-dark-wood overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1600&q=80"
            alt="Featured project"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </div>
        <div className="container-wide relative">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
              Portfolio
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
              Our Portfolio
            </h1>
            <p className="text-white/65 text-lg max-w-2xl leading-relaxed">
              Every project here represents a real client, a real challenge, and a real solution. Browse by category or search to find work that resonates with your vision.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Interactive filter + grid — client component */}
      <ProjectsFilterGrid projects={projects} />
    </>
  );
}
