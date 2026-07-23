"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "horizontal";
}

const categoryColors: Record<string, string> = {
  tips: "bg-blue-50 text-blue-700",
  projects: "bg-amber-50 text-amber-700",
  materials: "bg-green-50 text-green-700",
  design: "bg-purple-50 text-purple-700",
  maintenance: "bg-orange-50 text-orange-700",
  industry: "bg-gray-100 text-gray-700",
};

export default function BlogCard({ post, variant = "default" }: BlogCardProps) {
  if (variant === "horizontal") {
    return (
      <motion.article
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
        className="group flex gap-5 p-4 rounded-xl hover:bg-beige transition-colors"
      >
        <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="96px" />
        </div>
        <div className="flex-1 min-w-0">
          <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${categoryColors[post.category] ?? "bg-gray-100 text-gray-700"}`}>
            {post.category}
          </span>
          <h4 className="text-sm font-semibold text-dark-wood line-clamp-2 group-hover:text-walnut transition-colors mb-1.5 leading-snug">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h4>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock size={11} />
            {post.readTime} min read
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="group bg-white rounded-xl overflow-hidden border border-wood-200/50 hover:shadow-lg hover:shadow-walnut/10 transition-shadow duration-300"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute top-4 left-4">
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full capitalize ${categoryColors[post.category] ?? "bg-gray-100 text-gray-700"}`}>
              {post.category}
            </span>
          </div>
        </div>
      </Link>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" sizes="32px" />
          </div>
          <div>
            <p className="text-xs font-semibold text-dark-wood">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
          </div>
          <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
            <Clock size={11} />
            {post.readTime} min
          </div>
        </div>
        <h3 className="font-serif text-lg font-semibold text-dark-wood mb-2 leading-snug group-hover:text-walnut transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-walnut hover:text-dark-wood transition-colors group/link"
        >
          Read Article
          <ArrowRight size={12} className="transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}
