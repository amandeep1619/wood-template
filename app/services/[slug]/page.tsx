import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Armchair, Layout, Home, Briefcase, Wrench, RefreshCw } from "lucide-react";
import { getServices, getServiceBySlug, getProjects } from "@/lib/api/publicData";
import FAQSection from "@/components/sections/FAQSection";
import CTABanner from "@/components/sections/CTABanner";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";
import ProjectCard from "@/components/cards/ProjectCard";

const iconMap: Record<string, React.ElementType> = {
  Armchair, Layout, Home, Briefcase, Wrench, RefreshCw,
};

export async function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.description.slice(0, 160),
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      type: "website",
      url: `https://www.tirath-wood-works.com/services/${slug}`,
      title: `${service.title} | Tirath Wood Works`,
      description: service.description.slice(0, 160),
      images: [
        {
          url: `${service.image}?w=1200&h=630&fit=crop&q=90`,
          width: 1200,
          height: 630,
          alt: `Tirath Wood Works – ${service.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | Tirath Wood Works`,
      description: service.description.slice(0, 160),
      images: [`${service.image}?w=1200&h=630&fit=crop&q=90`],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const allProjects = getProjects();
  const allServices = getServices();
  const Icon = iconMap[service.icon] ?? Armchair;
  const relatedProjects = allProjects.filter((p) => p.serviceSlug === service.slug).slice(0, 3);
  const otherServices = allServices.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-0 bg-dark-wood overflow-hidden min-h-[70vh] flex items-end">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-dark-wood via-dark-wood/70 to-dark-wood/30" />
        </div>
        <div className="container-wide relative pb-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={14} />
            All Services
          </Link>
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-gold rounded-xl flex items-center justify-center shrink-0 hidden sm:flex">
              <Icon size={24} className="text-dark-wood" />
            </div>
            <div>
              {service.startingPrice && (
                <span className="inline-block text-xs font-semibold px-3 py-1 bg-gold/20 text-gold border border-gold/30 rounded-full mb-3">
                  Starting from {service.startingPrice}
                </span>
              )}
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4 leading-[1.1]">
                {service.title}
              </h1>
              <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
                {service.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding bg-cream">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ScrollReveal>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark mb-4">
                  Service Overview
                </p>
                <h2 className="font-serif text-3xl font-bold text-dark-wood mb-6">
                  What's Included
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base whitespace-pre-line">
                  {service.description}
                </p>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {service.features.length > 0 && (
                <ScrollReveal delay={0.15}>
                  <div className="p-6 bg-white rounded-xl border border-wood-200/50">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-dark-wood/60 mb-4">
                      What We Offer
                    </h3>
                    <ul className="space-y-3">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <CheckCircle2 size={15} className="text-gold shrink-0 mt-0.5" />
                          <span className="text-sm text-dark-wood/80">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              )}

              <ScrollReveal delay={0.25}>
                <div className="p-6 bg-walnut rounded-xl text-white">
                  <h3 className="text-base font-bold mb-3">
                    Free Consultation
                  </h3>
                  <p className="text-sm text-white/75 mb-4">
                    No obligation. Discuss your project and get expert advice.
                  </p>
                  <Link
                    href="/contact"
                    className="block w-full py-3 text-center bg-gold text-dark-wood font-semibold rounded text-sm hover:bg-gold-light transition-colors"
                  >
                    Schedule Now
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      {service.benefits.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-wide">
            <ScrollReveal className="text-center max-w-xl mx-auto mb-12">
              <h2 className="font-serif text-3xl font-bold text-dark-wood">Why Choose Us for {service.title}</h2>
            </ScrollReveal>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.12}>
              {service.benefits.map((b) => (
                <StaggerItem key={b.title}>
                  <div className="p-8 bg-beige rounded-xl border border-wood-200/40 hover:shadow-md transition-shadow h-full">
                    <div className="w-10 h-10 bg-gold/15 rounded-lg flex items-center justify-center mb-4">
                      <CheckCircle2 size={18} className="text-gold-dark" />
                    </div>
                    <h3 className="text-base font-semibold text-dark-wood mb-2">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Gallery */}
      {service.gallery.length > 0 && (
        <section className="section-padding bg-beige">
          <div className="container-wide">
            <ScrollReveal className="mb-10">
              <h2 className="font-serif text-3xl font-bold text-dark-wood">Our {service.title} Work</h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {service.gallery.map((img, i) => (
                <ScrollReveal key={i} delay={i * 0.08} className={i === 0 ? "col-span-2 row-span-2" : ""}>
                  <div className={`relative overflow-hidden rounded-xl ${i === 0 ? "h-80" : "h-36"}`}>
                    <Image
                      src={img}
                      alt={`${service.title} gallery ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-wide">
            <ScrollReveal className="flex items-center justify-between mb-10">
              <h2 className="font-serif text-3xl font-bold text-dark-wood">Related Projects</h2>
              <Link href="/projects" className="text-sm font-semibold text-walnut hover:text-dark-wood transition-colors flex items-center gap-1">
                All Projects <ArrowRight size={14} />
              </Link>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {service.faqs.length > 0 && (
        <FAQSection
          faqs={service.faqs}
          title={`${service.title} Questions`}
          subtitle={`Common questions about our ${service.title.toLowerCase()} service.`}
        />
      )}

      {/* Other services */}
      <section className="section-padding bg-beige">
        <div className="container-wide">
          <ScrollReveal className="mb-10">
            <h2 className="font-serif text-3xl font-bold text-dark-wood">Other Services</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {otherServices.map((s) => (
              <ScrollReveal key={s.id}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group block p-6 bg-white rounded-xl border border-wood-200/50 hover:border-walnut/40 hover:shadow-md transition-all"
                >
                  <h3 className="text-base font-semibold text-dark-wood group-hover:text-walnut transition-colors mb-1">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{s.shortDescription}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-walnut mt-4">
                    Learn more <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline={`Start Your ${service.title} Project`}
        subheadline="Ready to move forward? Get in touch for a free consultation and transparent quote."
        primaryLabel="Get a Free Quote"
      />
    </>
  );
}
