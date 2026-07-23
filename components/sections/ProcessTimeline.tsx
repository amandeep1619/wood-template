import { MessageSquare, PenTool, Hammer, Truck } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";

const steps = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Free Consultation",
    description:
      "We sit down with you — at your home or in our showroom — to understand your vision, lifestyle, space, and budget. No pressure, no obligation.",
    duration: "1–2 hours",
    color: "bg-walnut",
  },
  {
    step: "02",
    icon: PenTool,
    title: "Design & Quote",
    description:
      "Our designers produce detailed 3D drawings, a materials sample board, and a transparent fixed-price quote within 3–5 business days.",
    duration: "3–5 days",
    color: "bg-gold-dark",
  },
  {
    step: "03",
    icon: Hammer,
    title: "Expert Crafting",
    description:
      "Your assigned master craftsperson builds your piece in our climate-controlled workshop. You'll receive photo updates throughout the process.",
    duration: "8–14 weeks",
    color: "bg-walnut",
  },
  {
    step: "04",
    icon: Truck,
    title: "Delivery & Install",
    description:
      "Our own white-glove team delivers, assembles, and installs your piece. We don't leave until you're completely satisfied.",
    duration: "1 day",
    color: "bg-gold-dark",
  },
];

export default function ProcessTimeline() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Decorative line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-wood-200/50 hidden lg:block -translate-x-1/2" />

      <div className="container-wide">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark mb-3">
            How It Works
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-dark-wood mb-4">
            Your Project Journey
          </h2>
          <p className="text-muted-foreground">
            Four clear steps from first conversation to finished piece. We make the process as beautiful as the result.
          </p>
        </ScrollReveal>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          staggerDelay={0.15}
        >
          {steps.map(({ step, icon: Icon, title, description, duration, color }) => (
            <StaggerItem key={step}>
              <div className="group p-8 rounded-2xl bg-cream border border-wood-200/40 hover:shadow-lg hover:shadow-walnut/10 hover:border-gold/30 transition-all duration-300 h-full flex flex-col">
                {/* Step number */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-6xl font-black text-dark-wood/10 tracking-tighter">{step}</span>
                  <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
                    <Icon size={20} className="text-white" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-dark-wood mb-3">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {description}
                </p>
                <div className="mt-5 pt-4 border-t border-wood-200/50">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-walnut">
                    <span className="w-2 h-2 rounded-full bg-gold" />
                    Timeline: {duration}
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
