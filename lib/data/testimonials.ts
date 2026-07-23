import { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Catherine Hartwell",
    role: "Homeowner",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80",
    rating: 5,
    text: "The library is quite simply the finest room in our home. The craftsmanship is on a level I didn't know was still possible. Every guest who walks in stops speaking mid-sentence.",
    projectSlug: "hartwell-estate-library",
    featured: true,
  },
  {
    id: "2",
    name: "James Mercer",
    role: "Homeowner",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    rating: 5,
    text: "We've had three kitchens professionally designed over the years. This is the first one where we actually cook every meal at home. The functionality is extraordinary.",
    projectSlug: "north-shore-kitchen",
    featured: true,
  },
  {
    id: "3",
    name: "David Chen",
    role: "Managing Director",
    company: "Axiom Capital",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    rating: 5,
    text: "When institutional clients walk into our boardroom, the room closes deals before a word is spoken. That's exactly what we needed from a single interior element.",
    projectSlug: "axiom-capital-headquarters",
    featured: true,
  },
  {
    id: "4",
    name: "Margaret Bellmore",
    role: "Homeowner",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5,
    text: "My grandchildren will eat Sunday dinners at this table with their own grandchildren. I know this because of how it's built. The craftsmanship is an act of love.",
    projectSlug: "bellmore-dining-suite",
    featured: true,
  },
  {
    id: "5",
    name: "Robert Thornton",
    role: "Architect",
    company: "Thornton & Associates",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
    text: "As an architect, I'm very particular about the craftspeople I recommend. Artisan Wood Co. is at the top of the list for any client who won't accept compromise.",
    projectSlug: "westport-whole-home",
    featured: false,
  },
  {
    id: "6",
    name: "Sarah Kim",
    role: "Interior Designer",
    company: "Kim Design Studio",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80",
    rating: 5,
    text: "I've collaborated with many custom woodwork shops. None match the design sensitivity and fabrication quality. My clients are always blown away.",
    featured: false,
  },
];

export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.featured);
}
