import AnimatedCounter from "@/components/animations/AnimatedCounter";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";
import { Award, Users, Clock, Star } from "lucide-react";

const stats = [
  {
    value: 850,
    suffix: "+",
    label: "Projects Completed",
    description: "Across residential, commercial, and institutional clients",
    icon: Award,
    color: "bg-gold/10 text-gold-dark",
  },
  {
    value: 25,
    suffix: "+",
    label: "Years of Excellence",
    description: "A quarter century of master craftsmanship",
    icon: Clock,
    color: "bg-walnut/10 text-walnut",
  },
  {
    value: 620,
    suffix: "+",
    label: "Happy Clients",
    description: "Who recommend us to friends and family",
    icon: Users,
    color: "bg-gold/10 text-gold-dark",
  },
  {
    value: 12,
    suffix: "",
    label: "Industry Awards",
    description: "Recognizing design excellence and craftsmanship",
    icon: Star,
    color: "bg-walnut/10 text-walnut",
  },
];

export default function StatsSection() {
  return (
    <section className="section-padding bg-beige relative overflow-hidden">
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236B4226' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="container-wide relative">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark mb-3">
            By The Numbers
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-dark-wood">
            A Legacy Built in Wood
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.12}>
          {stats.map(({ value, suffix, label, description, icon: Icon, color }) => (
            <StaggerItem key={label}>
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-wood-200/30 hover:shadow-md hover:border-gold/30 transition-all duration-300 h-full flex flex-col items-center">
                <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-5`}>
                  <Icon size={24} />
                </div>
                {/* Numbers use Inter Black — precise, punchy, modern */}
                <div className="text-5xl font-black tracking-tight text-dark-wood mb-1 leading-none">
                  <AnimatedCounter value={value} suffix={suffix} />
                </div>
                <h3 className="font-semibold text-dark-wood text-base mt-2 mb-2">{label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
