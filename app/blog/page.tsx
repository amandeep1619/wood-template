import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBlogPosts, getFeaturedBlogPosts } from "@/lib/api/publicData";
import BlogCard from "@/components/cards/BlogCard";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";
import CTABanner from "@/components/sections/CTABanner";
import NewsletterForm from "@/components/forms/NewsletterForm";

export const metadata: Metadata = {
  title: "Wood Craft Blog",
  description:
    "Expert insights on woodworking, furniture care, design inspiration, and the craft behind Tirath Wood Works.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: "https://www.tirath-wood-works.com/blog",
    title: "Wood Craft Blog | Tirath Wood Works",
    description:
      "Expert insights on woodworking, furniture care, design inspiration, and the craft behind Tirath Wood Works.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&h=630&fit=crop&q=90",
        width: 1200,
        height: 630,
        alt: "Tirath Wood Works – Wood Craft Blog",
      },
    ],
  },
};

export default function BlogPage() {
  const blogPosts = getBlogPosts();
  const featured = getFeaturedBlogPosts();
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-dark-wood overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1600&q=80"
            alt="Woodworking blog"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </div>
        <div className="container-wide relative">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
              Knowledge & Craft
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.1]">
              The Artisan
              <br />
              <span className="italic text-gold">Journal</span>
            </h1>
            <p className="text-white/65 text-lg max-w-xl leading-relaxed">
              Expert insights on wood species, joinery techniques, design trends, and care tips from our master craftspeople.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured posts */}
      <section className="section-padding bg-cream">
        <div className="container-wide">
          <ScrollReveal className="mb-10">
            <h2 className="font-serif text-3xl font-bold text-dark-wood">Featured Articles</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 items-stretch">
            {featured.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 0.1} className="h-full">
                <BlogCard post={post} />
              </ScrollReveal>
            ))}
          </div>

          {rest.length > 0 && (
            <>
              <ScrollReveal className="mb-8 mt-14">
                <h2 className="font-serif text-3xl font-bold text-dark-wood">All Articles</h2>
              </ScrollReveal>
              <StaggerContainer
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
                staggerDelay={0.08}
              >
                {rest.map((post) => (
                  <StaggerItem key={post.id} className="h-full">
                    <BlogCard post={post} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </>
          )}

          {/* Newsletter CTA */}
          <ScrollReveal className="mt-16">
            <div className="bg-walnut rounded-2xl p-8 md:p-12 text-center text-white">
              <h3 className="font-serif text-3xl font-bold mb-3">Stay Inspired</h3>
              <p className="text-white/70 mb-6 max-w-md mx-auto">
                Join 2,400 subscribers who get our latest articles, project reveals, and wood knowledge once a month.
              </p>
              <NewsletterForm />
              <p className="text-xs text-white/40 mt-3">No spam. Unsubscribe anytime.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTABanner
        headline="Ready to Start Your Own Project?"
        subheadline="Reading about great woodwork is one thing. Let's make something together."
        primaryLabel="Book a Consultation"
      />
    </>
  );
}
