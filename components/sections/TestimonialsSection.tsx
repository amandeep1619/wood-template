"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";
import type { Testimonial } from "@/types";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface TestimonialSlideProps {
  testimonial: Testimonial;
  featured?: boolean;
}

function TestimonialSlide({ testimonial, featured = false }: TestimonialSlideProps) {
  return (
    <div
      className={`relative h-full flex flex-col rounded-2xl border p-8 ${
        featured
          ? "bg-walnut text-white border-walnut"
          : "bg-white text-dark-wood border-wood-200/50"
      }`}
    >
      {/* Decorative quote */}
      <div className={`absolute top-6 right-6 ${featured ? "text-white/15" : "text-gold/20"}`}>
        <Quote size={52} className="fill-current" />
      </div>

      {/* Stars */}
      <div className="flex items-center gap-1 mb-5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={14} className="fill-gold text-gold" />
        ))}
      </div>

      {/* Quote text */}
      <blockquote
        className={`text-base leading-relaxed flex-1 relative z-10 ${
          featured ? "text-white/90" : "text-dark-wood/80"
        }`}
      >
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>

      {/* Author */}
      <div
        className={`flex items-center gap-4 mt-6 pt-6 border-t ${
          featured ? "border-white/15" : "border-wood-100"
        }`}
      >
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
            className={`font-semibold text-sm tracking-tight ${
              featured ? "text-white" : "text-dark-wood"
            }`}
          >
            {testimonial.name}
          </p>
          <p
            className={`text-xs mt-0.5 ${
              featured ? "text-gold-light" : "text-muted-foreground"
            }`}
          >
            {testimonial.role}
            {testimonial.company && `, ${testimonial.company}`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="section-padding bg-cream relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-walnut/5 rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative">
        {/* Header */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark mb-3">
              Client Stories
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-dark-wood mb-3">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The measure of our work is how clients feel about it decades later.
            </p>
          </div>

          {/* Prev / Next buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-11 h-11 rounded-full border-2 border-walnut text-walnut flex items-center justify-center hover:bg-walnut hover:text-cream transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-11 h-11 rounded-full border-2 border-walnut text-walnut flex items-center justify-center hover:bg-walnut hover:text-cream transition-all duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </ScrollReveal>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Navigation, Pagination, A11y]}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            el: ".testimonials-pagination",
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
          grabCursor={true}
          a11y={{
            prevSlideMessage: "Previous testimonial",
            nextSlideMessage: "Next testimonial",
          }}
          className="pb-14! [&_.swiper-wrapper]:items-stretch"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={t.id} className="h-auto!">
              <TestimonialSlide testimonial={t} featured={i % 3 === 1} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom pagination dots */}
        <div className="testimonials-pagination flex justify-center gap-2 mt-2 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-wood-300 [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet-active]:bg-walnut [&_.swiper-pagination-bullet-active]:w-6" />
      </div>
    </section>
  );
}
