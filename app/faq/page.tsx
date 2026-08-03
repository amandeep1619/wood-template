import type { Metadata } from "next";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FAQSection from "@/components/sections/FAQSection";
import CTABanner from "@/components/sections/CTABanner";
import { getFaqs } from "@/lib/api/publicData";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about custom woodworking projects, pricing, timelines, and materials at Tirath Wood Works.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    type: "website",
    url: "https://www.tirath-wood-works.com/faq",
    title: "Frequently Asked Questions | Tirath Wood Works",
    description:
      "Answers to common questions about custom woodworking projects, pricing, timelines, and materials at Tirath Wood Works.",
  },
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <>
      <section className="relative pt-32 pb-20 bg-dark-wood overflow-hidden">
        <div className="container-wide relative">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
              Questions & Answers
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.1]">
              Frequently Asked
              <br />
              <span className="italic text-gold">Questions</span>
            </h1>
            <p className="text-white/65 text-lg max-w-xl leading-relaxed">
              Everything you need to know about working with us — pricing, timelines, materials, and process.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <FAQSection faqs={faqs} />

      <CTABanner
        headline="Still Have Questions?"
        subheadline="We're happy to talk through your project in detail."
        primaryLabel="Book a Consultation"
      />
    </>
  );
}
