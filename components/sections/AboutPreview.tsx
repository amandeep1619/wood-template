import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ParallaxImage from "@/components/animations/ParallaxImage";

const highlights = [
  "Over 25 years of unbroken master craftsmanship",
  "Traditional European joinery techniques",
  "Premium hardwoods sourced from certified forests",
  "Every piece designed in-house, built in-house",
  "White-glove delivery and professional installation",
];

export default function AboutPreview() {
  return (
    <section className="section-padding bg-cream overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Images */}
          <ScrollReveal direction="left" className="relative">
            <div className="relative h-[500px] lg:h-[600px]">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=800&q=80"
                alt="Master craftsman working"
                className="absolute inset-0 rounded-2xl"
              />
              {/* Overlapping accent image */}
              <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-xl overflow-hidden border-4 border-cream shadow-xl hidden sm:block">
                <Image
                  src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=400&q=80"
                  alt="Workshop detail"
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
              {/* Award badge */}
              <div className="absolute top-6 -left-6 hidden lg:block">
                <div className="bg-walnut text-white p-5 rounded-xl shadow-xl max-w-[160px]">
                  <div className="text-3xl font-black text-gold leading-none mb-1 tracking-tight">25+</div>
                  <div className="text-xs text-white/80 leading-snug">Years of master craftsmanship</div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal direction="right" delay={0.15}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark mb-4">
                Our Story
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-dark-wood mb-6 leading-[1.15]">
                Crafted with Purpose,
                <br />
                <span className="italic text-walnut">Built to Last</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5 text-base">
                In 1998, Marcus Reeves opened a small workshop in a rented barn with one workbench, a set of hand planes, and the conviction that great furniture should outlast its owner. That conviction hasn't changed — only the workshop has grown.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8 text-base">
                Today, Artisan Wood Co. is a team of 18 dedicated craftspeople. We build custom furniture, kitchen cabinetry, and architectural millwork for discerning homeowners, architects, and designers across the Northeast.
              </p>

              <ul className="space-y-3 mb-10">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-gold shrink-0 mt-0.5" />
                    <span className="text-sm text-dark-wood/80 font-medium">{h}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/about"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-walnut text-cream font-semibold rounded text-sm tracking-wide hover:bg-dark-wood transition-colors duration-200"
              >
                Meet Our Team
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
