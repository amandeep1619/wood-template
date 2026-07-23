import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/api/publicData";
import BlogCard from "@/components/cards/BlogCard";
import CTABanner from "@/components/sections/CTABanner";
import ScrollReveal from "@/components/animations/ScrollReveal";

export async function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `https://www.tirath-wood-works.com/blog/${slug}`,
      title: `${post.title} | Tirath Wood Works`,
      description: post.excerpt,
      siteName: "Tirath Wood Works",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: `${post.coverImage}?w=1200&h=630&fit=crop&q=90`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`${post.coverImage}?w=1200&h=630&fit=crop&q=90`],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getBlogPosts();
  const related = allPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);
  const otherPosts = related.length > 0 ? related : allPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-0 min-h-[60vh] flex items-end bg-dark-wood overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-dark-wood/95 via-dark-wood/60 to-dark-wood/20" />
        </div>
        <div className="container-wide relative pb-16 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={14} /> All Articles
          </Link>
          <span className="inline-block text-xs font-semibold px-3 py-1 bg-gold text-dark-wood rounded-full mb-4 capitalize">
            {post.category}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-[1.15]">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-sm text-white/60">
            <div className="flex items-center gap-2.5">
              <div className="relative w-7 h-7 rounded-full overflow-hidden">
                <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" sizes="28px" />
              </div>
              <span>{post.author.name}</span>
            </div>
            <span className="flex items-center gap-1.5"><Calendar size={13} />
              {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1.5"><Clock size={13} /> {post.readTime} min read</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <article className="lg:col-span-2">
              <ScrollReveal>
                <p className="text-lg text-dark-wood/80 leading-relaxed mb-8 font-medium border-l-4 border-gold pl-5 py-2">
                  {post.excerpt}
                </p>
                <div
                  className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-dark-wood prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-dark-wood prose-h2:text-2xl prose-h2:mt-8 prose-h3:text-xl"
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .replace(/## /g, '<h2 class="font-serif text-2xl font-bold text-dark-wood mt-10 mb-4">')
                      .replace(/### /g, '<h3 class="font-serif text-xl font-bold text-dark-wood mt-8 mb-3">')
                      .replace(/\n\n/g, '</p><p class="text-muted-foreground leading-relaxed my-4">')
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-dark-wood font-semibold">$1</strong>')
                      .replace(/- (.*?)(\n|$)/g, '<li class="text-muted-foreground leading-relaxed">$1</li>')
                  }}
                />
              </ScrollReveal>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-wood-200">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-beige text-walnut text-xs font-semibold rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Author bio */}
              <div className="mt-10 p-6 bg-beige rounded-xl border border-wood-200/50 flex gap-5">
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                  <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" sizes="64px" />
                </div>
                <div>
                  <p className="text-base font-bold text-dark-wood mb-0.5">{post.author.name}</p>
                  <p className="text-sm text-gold-dark font-medium mb-2">{post.author.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.author.bio}</p>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-8">
              <ScrollReveal delay={0.1}>
                <div className="p-6 bg-cream rounded-xl border border-wood-200/50">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-dark-wood/60 mb-4">More Articles</h3>
                  <div className="space-y-1">
                    {allPosts.filter((p) => p.id !== post.id).slice(0, 5).map((p) => (
                      <BlogCard key={p.id} post={p} variant="horizontal" />
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="p-6 bg-walnut rounded-xl text-white">
                  <h3 className="text-base font-bold mb-2">Start Your Project</h3>
                  <p className="text-sm text-white/70 mb-4">Inspired? Let's talk about bringing your vision to life.</p>
                  <Link href="/contact" className="block w-full py-3 text-center bg-gold text-dark-wood font-semibold rounded text-sm hover:bg-gold-light transition-colors">
                    Free Consultation
                  </Link>
                </div>
              </ScrollReveal>
            </aside>
          </div>
        </div>
      </section>

      {/* Related */}
      {otherPosts.length > 0 && (
        <section className="section-padding bg-beige">
          <div className="container-wide">
            <ScrollReveal className="flex items-center justify-between mb-10">
              <h2 className="font-serif text-3xl font-bold text-dark-wood">You Might Also Like</h2>
              <Link href="/blog" className="text-sm font-semibold text-walnut hover:text-dark-wood flex items-center gap-1 transition-colors">
                All Articles <ArrowRight size={13} />
              </Link>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherPosts.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 0.1}><BlogCard post={p} /></ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
