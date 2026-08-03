import type { Metadata } from "next";
import Image from "next/image";
import { getServices } from "@/lib/api/publicData";
import ServiceCard from "@/components/cards/ServiceCard";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import CTABanner from "@/components/sections/CTABanner";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "From custom furniture and kitchen cabinetry to architectural woodwork and restoration — explore all six disciplines of Tirath Wood Works.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    url: "https://www.tirath-wood-works.com/services",
    title: "Our Services | Tirath Wood Works",
    description:
      "From custom furniture and kitchen cabinetry to architectural woodwork and restoration — explore all six disciplines of Tirath Wood Works.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?w=1200&h=630&fit=crop&q=90",
        width: 1200,
        height: 630,
        alt: "Tirath Wood Works – Woodworking Services",
      },
    ],
  },
};

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-dark-wood overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?w=1600&q=80"
            alt="Woodworking tools"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </div>
        <div className="container-wide relative">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
              What We Do
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
              Six Disciplines.
              <br />
              <span className="italic text-gold">One Standard.</span>
            </h1>
            <p className="text-white/65 text-lg max-w-2xl leading-relaxed">
              From the first consultation to the final installation, every service we offer is executed with the same commitment to precision, material quality, and enduring craftsmanship.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-cream">
        <div className="container-wide">
          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            staggerDelay={0.1}
          >
            {services.map((service) => (
              <StaggerItem key={service.id}>
                <ServiceCard service={service} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Why us strip */}
      <section className="py-16 bg-beige">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "Fixed-Price", label: "Transparent quotes" },
              { value: "25-Year", label: "Structural warranty" },
              { value: "In-House", label: "Design & fabrication" },
              { value: "White-Glove", label: "Delivery & install" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-black text-walnut mb-1 tracking-tight">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessTimeline />

      <CTABanner
        headline="Not Sure Which Service You Need?"
        subheadline="Tell us about your project and we'll guide you through the right approach. Free consultation, no obligation."
        primaryLabel="Get Free Consultation"
      />
    </>
  );
}
