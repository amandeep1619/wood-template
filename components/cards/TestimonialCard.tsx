import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { Testimonial } from "@/types";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: "default" | "featured";
}

export default function TestimonialCard({ testimonial, variant = "default" }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "relative p-8 rounded-2xl border flex flex-col h-full",
        variant === "featured"
          ? "bg-walnut text-white border-walnut"
          : "bg-white text-dark-wood border-wood-200/50"
      )}
    >
      {/* Quote icon */}
      <div
        className={cn(
          "absolute top-6 right-6",
          variant === "featured" ? "text-white/20" : "text-gold/30"
        )}
      >
        <Quote size={48} className="fill-current" />
      </div>

      {/* Stars */}
      <div className="flex items-center gap-1 mb-5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={14} className="fill-gold text-gold" />
        ))}
      </div>

      {/* Text */}
      <blockquote
        className={cn(
          "text-base leading-relaxed flex-1 relative z-10",
          variant === "featured" ? "text-white/90" : "text-dark-wood/80"
        )}
      >
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4 mt-6 pt-6 border-t border-current/10">
        <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-gold/30 shrink-0">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div>
          <p
            className={cn(
              "font-semibold text-sm tracking-tight",
              variant === "featured" ? "text-white" : "text-dark-wood"
            )}
          >
            {testimonial.name}
          </p>
          <p
            className={cn(
              "text-xs mt-0.5",
              variant === "featured" ? "text-gold-light" : "text-muted-foreground"
            )}
          >
            {testimonial.role}
            {testimonial.company && `, ${testimonial.company}`}
          </p>
        </div>
      </div>
    </div>
  );
}
