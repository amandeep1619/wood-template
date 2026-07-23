import Image from "next/image";
import { Shield, Leaf, Clock, Users, Paintbrush, Package } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";

const reasons = [
  {
    icon: Shield,
    title: "25-Year Structural Warranty",
    description:
      "Every piece we build carries a 25-year warranty on all structural joinery. We build things to last, and we stand behind them.",
  },
  {
    icon: Leaf,
    title: "Responsibly Sourced Wood",
    description:
      "We source exclusively from FSC-certified suppliers and domestic sawyers, ensuring every board we use supports sustainable forestry.",
  },
  {
    icon: Clock,
    title: "On-Time, Every Time",
    description:
      "Our dedicated project managers ensure every commission arrives on schedule. We've maintained a 97% on-time delivery rate for three years running.",
  },
  {
    icon: Users,
    title: "Dedicated Artisan Team",
    description:
      "You'll work directly with your assigned craftsperson throughout your project — no handoffs, no outsourcing, no surprises.",
  },
  {
    icon: Paintbrush,
    title: "In-House Design Studio",
    description:
      "Our designers produce detailed 3D visualizations before a single board is cut, so you know exactly what you're getting before we start.",
  },
  {
    icon: Package,
    title: "White-Glove Delivery",
    description:
      "Our own installation team delivers and installs every piece. We won't leave until it's perfect and the space is clean.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-dark-wood relative overflow-hidden">
      {/* Decorative wood grain pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(212,163,115,0.3) 2px,
            rgba(212,163,115,0.3) 3px
          )`,
          backgroundSize: "60px 100%",
        }}
      />

      <div className="container-wide relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — text + image */}
          <div>
            <ScrollReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
                Why Artisan Wood Co.
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.15]">
                The Difference Is in
                <br />
                <span className="text-gold italic">the Details</span>
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-10 max-w-lg">
                Anyone can put boards together. What we offer is the difference between furniture you buy and furniture you keep — pieces that earn their place in your home and your family's story.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative h-72 rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?w=800&q=80"
                  alt="Master craftsman detail work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-dark-wood/60 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <blockquote className="text-white text-sm italic leading-relaxed">
                    &ldquo;We don't make fast furniture. We make furniture that's still going to look beautiful in your grandchildren's homes.&rdquo;
                  </blockquote>
                  <p className="text-gold text-xs font-semibold mt-2">— Marcus Reeves, Founder</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — reasons grid */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-5" staggerDelay={0.08} delayChildren={0.3}>
            {reasons.map(({ icon: Icon, title, description }) => (
              <StaggerItem key={title} className="h-full">
                <div className="group h-full flex flex-col p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-gold/30 transition-all duration-300">
                  <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center mb-4 shrink-0 group-hover:bg-gold/20 transition-colors">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
