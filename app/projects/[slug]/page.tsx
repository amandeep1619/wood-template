import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Clock, Calendar, User, ArrowRight } from "lucide-react";
import { getProjects, getProjectBySlug } from "@/lib/api/publicData";
import TestimonialCard from "@/components/cards/TestimonialCard";
import ProjectCard from "@/components/cards/ProjectCard";
import CTABanner from "@/components/sections/CTABanner";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";
import ImageGallery from "@/components/ui/ImageGallery";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.shortDescription,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      type: "website",
      url: `https://www.tirath-wood-works.com/projects/${slug}`,
      title: `${project.title} | Tirath Wood Works`,
      description: project.shortDescription,
      images: [
        {
          url: `${project.coverImage}?w=1200&h=630&fit=crop&q=90`,
          width: 1200,
          height: 630,
          alt: `Tirath Wood Works – ${project.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Tirath Wood Works`,
      description: project.shortDescription,
      images: [`${project.coverImage}?w=1200&h=630&fit=crop&q=90`],
    },
  };
}

const categoryLabels: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  kitchen: "Kitchen",
  furniture: "Furniture",
  restoration: "Restoration",
  office: "Office",
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const allProjects = await getProjects();
  const related = allProjects.filter((p) => p.id !== project.id && p.category === project.category).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-0 min-h-[75vh] flex items-end bg-dark-wood overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-dark-wood/95 via-dark-wood/50 to-dark-wood/20" />
        </div>
        <div className="container-wide relative pb-16">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={14} />
            All Projects
          </Link>
          <span className="inline-block text-xs font-semibold px-3 py-1 bg-gold text-dark-wood rounded-full mb-4">
            {categoryLabels[project.category]}
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4 leading-[1.1]">
            {project.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
            <span className="flex items-center gap-2"><User size={14} /> {project.client}</span>
            <span className="flex items-center gap-2"><MapPin size={14} /> {project.location}</span>
            <span className="flex items-center gap-2"><Calendar size={14} /> {project.year}</span>
            <span className="flex items-center gap-2"><Clock size={14} /> {project.duration}</span>
          </div>
        </div>
      </section>

      {/* Project details */}
      <section className="section-padding bg-cream">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              {/* Overview */}
              <ScrollReveal>
                <h2 className="font-serif text-2xl font-bold text-dark-wood mb-4">Project Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
              </ScrollReveal>

              {/* Challenge */}
              {project.challenge && (
                <ScrollReveal delay={0.1}>
                  <div className="p-8 bg-white rounded-xl border-l-4 border-walnut">
                    <h3 className="font-serif text-xl font-bold text-dark-wood mb-3">The Challenge</h3>
                    <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
                  </div>
                </ScrollReveal>
              )}

              {/* Solution */}
              {project.solution && (
                <ScrollReveal delay={0.2}>
                  <div className="p-8 bg-walnut/5 rounded-xl border-l-4 border-gold">
                    <h3 className="font-serif text-xl font-bold text-dark-wood mb-3">Our Solution</h3>
                    <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
                  </div>
                </ScrollReveal>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ScrollReveal delay={0.15}>
                <div className="p-6 bg-white rounded-xl border border-wood-200/50">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-dark-wood/60 mb-4">Project Details</h3>
                  <dl className="space-y-3">
                    {[
                      { label: "Client", value: project.client },
                      { label: "Location", value: project.location },
                      { label: "Year", value: String(project.year) },
                      { label: "Duration", value: project.duration },
                      { label: "Category", value: categoryLabels[project.category] },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-start gap-4 pb-3 border-b border-wood-100 last:border-0 last:pb-0">
                        <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wide shrink-0">{label}</dt>
                        <dd className="text-sm text-dark-wood font-medium text-right">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </ScrollReveal>

              {/* Materials */}
              {project.materials.length > 0 && (
                <ScrollReveal delay={0.25}>
                  <div className="p-6 bg-white rounded-xl border border-wood-200/50">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-dark-wood/60 mb-4">Materials Used</h3>
                    <ul className="space-y-2">
                      {project.materials.map((m) => (
                        <li key={m} className="flex items-center gap-2 text-sm text-dark-wood/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              )}

              <ScrollReveal delay={0.3}>
                <Link
                  href="/contact"
                  className="block w-full py-3.5 text-center bg-walnut text-cream font-semibold rounded text-sm hover:bg-dark-wood transition-colors"
                >
                  Start a Similar Project
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-wide">
            <ScrollReveal className="mb-8">
              <h2 className="font-serif text-3xl font-bold text-dark-wood">Project Gallery</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <ImageGallery images={project.gallery} title={project.title} />
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {project.testimonial && (
        <section className="py-16 bg-beige">
          <div className="container-wide max-w-2xl mx-auto">
            <ScrollReveal className="text-center mb-8">
              <h2 className="font-serif text-2xl font-bold text-dark-wood">What the Client Said</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <TestimonialCard testimonial={project.testimonial} variant="featured" />
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-wide">
            <ScrollReveal className="flex items-center justify-between mb-10">
              <h2 className="font-serif text-3xl font-bold text-dark-wood">Similar Projects</h2>
              <Link href="/projects" className="text-sm font-semibold text-walnut hover:text-dark-wood transition-colors flex items-center gap-1">
                View All <ArrowRight size={13} />
              </Link>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((p) => (
                <ScrollReveal key={p.id}><ProjectCard project={p} /></ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner
        headline="Love What You See?"
        subheadline="Every project begins with a free consultation. Let's discuss your vision."
        primaryLabel="Start Your Project"
      />
    </>
  );
}
