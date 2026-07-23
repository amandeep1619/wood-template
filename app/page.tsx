import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import AboutPreview from "@/components/sections/AboutPreview";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTABanner from "@/components/sections/CTABanner";
import { getProjects } from "@/lib/api/publicData";

export const metadata: Metadata = {
  title: {
    absolute: "Tirath Wood Works | Master Carpentry & Custom Woodwork",
  },
  description:
    "Premium custom furniture, kitchen cabinetry, and architectural woodwork handcrafted by master artisans. Serving clients with quality craftsmanship since 1998.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://www.tirath-wood-works.com",
    title: "Tirath Wood Works | Master Carpentry & Custom Woodwork",
    description:
      "Premium custom furniture, kitchen cabinetry, and architectural woodwork handcrafted by master artisans. Quality craftsmanship since 1998.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=630&fit=crop&q=90",
        width: 1200,
        height: 630,
        alt: "Tirath Wood Works – Master Carpentry & Custom Woodwork",
      },
    ],
  },
};

export default function HomePage() {
  const projects = getProjects();
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutPreview />
      <ServicesGrid />
      <WhyChooseUs />
      <FeaturedProjects projects={projects} />
      <ProcessTimeline />
      <TestimonialsSection />
      <FAQSection />
      <CTABanner />
    </>
  );
}
