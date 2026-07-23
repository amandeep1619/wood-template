import type { Metadata } from "next";
import Image from "next/image";
import { Award, CheckCircle2 } from "lucide-react";
import { team } from "@/lib/data/team";
import TeamCard from "@/components/cards/TeamCard";
import CTABanner from "@/components/sections/CTABanner";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn the story behind Tirath Wood Works — 25+ years of master craftsmanship, a dedicated team of artisans, and an unwavering commitment to quality.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    url: "https://www.tirath-wood-works.com/about",
    title: "About Us | Tirath Wood Works",
    description:
      "Learn the story behind Tirath Wood Works — 25+ years of master craftsmanship, a dedicated team of artisans, and an unwavering commitment to quality.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&h=630&fit=crop&q=90",
        width: 1200,
        height: 630,
        alt: "Tirath Wood Works – Workshop Interior",
      },
    ],
  },
};

const timeline = [
  {
    year: "1998",
    title: "The First Workbench",
    description:
      "Marcus Reeves opens a 400 sq. ft. workshop in a rented barn in Westchester, NY with a single bench and a philosophy: build things to outlast their owners.",
  },
  {
    year: "2003",
    title: "First Major Commission",
    description:
      "A complete library and study for a Greenwich estate establishes the company's reputation for architectural millwork and sets the direction for the next decade.",
  },
  {
    year: "2008",
    title: "New Workshop",
    description:
      "The team moves into a purpose-built 8,000 sq. ft. climate-controlled workshop equipped with precision German machinery alongside a fully equipped hand-tool room.",
  },
  {
    year: "2012",
    title: "Design Studio Opens",
    description:
      "Elena Vasquez joins as Head of Design. The new in-house design studio transforms how clients experience their custom projects, with full 3D visualization before fabrication.",
  },
  {
    year: "2018",
    title: "20th Anniversary",
    description:
      "Artisan Wood Co. celebrates 20 years with its 500th completed project — a private chapel in Connecticut in hand-carved white oak.",
  },
  {
    year: "2024",
    title: "Today",
    description:
      "A team of 18 master craftspeople, 850+ completed projects, and a reputation as one of the East Coast's finest custom woodwork studios.",
  },
];

const certifications = [
  "AWI (Architectural Woodwork Institute) Premium Member",
  "KCMA (Kitchen Cabinet Manufacturers Association) Certified",
  "NWFA (National Wood Flooring Association) Certified",
  "FSC Chain of Custody Certified",
  "OSHA Safety Certified Workshop",
  "NY State Licensed General Contractor",
];

const achievements = [
  { year: "2024", title: "Best Kitchen Design — NKBA Northeast Regional Award" },
  { year: "2023", title: "Custom Furniture Maker of the Year — Interior Design Magazine" },
  { year: "2022", title: "Fine Furnishings Award — American Society of Interior Designers" },
  { year: "2020", title: "Sustainability in Woodcraft Award — AWI" },
  { year: "2018", title: "20th Anniversary Excellence Award — Westchester Chamber of Commerce" },
  { year: "2015", title: "Master Craftsman Certification — Guild of Master Craftsmen" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-dark-wood overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1600&q=80"
            alt="Workshop interior"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </div>
        <div className="container-wide relative">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
              Our Story
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
              Built on Craft,
              <br />
              <span className="italic text-gold">Driven by Purpose</span>
            </h1>
            <p className="text-white/65 text-lg max-w-2xl leading-relaxed">
              A quarter-century ago, one craftsman opened a workshop with a simple belief: furniture should outlast its owner. That belief is still the foundation of everything we build.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-cream">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=800&q=80"
                  alt="Master craftsman at work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.15}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark mb-4">
                  Mission & Vision
                </p>
                <h2 className="font-serif text-4xl font-bold text-dark-wood mb-6 leading-[1.15]">
                  Why We Build
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  Our mission is to keep the tradition of master craftsmanship alive in an era of mass production. We believe there is a profound difference between furniture that is manufactured and furniture that is made — and that difference matters both to the maker and to the person who lives with the piece.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Our vision is a workshop whose work is still recognizable 100 years from now — pieces that carry the hand of their maker, wood that tells the story of the forest it came from, and joinery that holds together through everything time throws at it.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {["Master craftsmanship", "Sustainable materials", "Long-term relationships", "Zero compromise"].map((v) => (
                    <div key={v} className="flex items-center gap-2.5">
                      <CheckCircle2 size={16} className="text-gold shrink-0" />
                      <span className="text-sm font-medium text-dark-wood">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark mb-3">
              Our History
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-dark-wood">
              25 Years in the Making
            </h2>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-wood-200 hidden md:block" />
            <div className="space-y-10">
              {timeline.map(({ year, title, description }, i) => (
                <ScrollReveal key={year} delay={i * 0.08}>
                  <div className={`flex flex-col md:flex-row gap-6 md:gap-12 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                    <div className="md:w-1/2 flex md:justify-end">
                      <div className={`max-w-sm ${i % 2 === 1 ? "md:text-left" : "md:text-right"}`}>
                        <span className="inline-block text-xs font-bold px-3 py-1 bg-gold text-dark-wood rounded-full mb-3 font-sans">
                          {year}
                        </span>
                        <h3 className="font-serif text-xl font-bold text-dark-wood mb-2">{title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex items-start justify-center w-0">
                      <div className="w-4 h-4 rounded-full bg-walnut border-4 border-cream mt-2 -mx-2" />
                    </div>
                    <div className="md:w-1/2" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section-padding bg-beige">
        <div className="container-wide">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark mb-3">
              Our People
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-dark-wood mb-4">
              Meet the Craftspeople
            </h2>
            <p className="text-muted-foreground">
              Every commission is assigned to a specific master craftsperson who owns the project from first drawing to final installation.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {team.map((member) => (
              <StaggerItem key={member.id} className="h-full">
                <TeamCard member={member} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Certifications & Awards */}
      <section className="section-padding bg-dark-wood">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Certifications */}
            <ScrollReveal direction="left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-5">
                Certifications
              </p>
              <h2 className="font-serif text-3xl font-bold text-white mb-8">
                Standards We Uphold
              </h2>
              <ul className="space-y-4">
                {certifications.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Award size={12} className="text-gold" />
                    </div>
                    <span className="text-sm text-white/75">{c}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* Awards */}
            <ScrollReveal direction="right" delay={0.15}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-5">
                Recognition
              </p>
              <h2 className="font-serif text-3xl font-bold text-white mb-8">
                Awards & Accolades
              </h2>
              <ul className="space-y-4">
                {achievements.map(({ year, title }) => (
                  <li key={title} className="flex items-start gap-4 pb-4 border-b border-white/10 last:border-0">
                    <span className="text-xl font-black text-gold/30 leading-none shrink-0 w-12 tracking-tight">{year}</span>
                    <span className="text-sm text-white/75 leading-relaxed pt-0.5">{title}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Ready to Work with Us?"
        subheadline="Every great piece starts with a conversation. Tell us what you're dreaming of and we'll tell you how we'd build it."
        primaryLabel="Book a Consultation"
        primaryHref="/contact"
      />
    </>
  );
}
