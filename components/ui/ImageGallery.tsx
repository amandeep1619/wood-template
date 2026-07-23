"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, Grid3x3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const isLightboxOpen = lightboxIndex !== null;

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen, prev, next]);

  if (!images.length) return null;

  const PREVIEW_LIMIT = 5;
  const visibleImages = showAll ? images : images.slice(0, PREVIEW_LIMIT);
  const hiddenCount = images.length - PREVIEW_LIMIT;

  return (
    <>
      {/* Grid */}
      <div className={cn(
        "grid gap-3",
        images.length === 1 && "grid-cols-1",
        images.length === 2 && "grid-cols-2",
        images.length >= 3 && "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      )}>
        {visibleImages.map((img, i) => {
          const isFirst = i === 0 && !showAll && images.length >= 3;
          const isLastVisible = !showAll && i === PREVIEW_LIMIT - 1 && hiddenCount > 0;

          return (
            <div
              key={i}
              className={cn(
                "relative overflow-hidden rounded-xl cursor-pointer group bg-wood-100",
                isFirst && "col-span-2 row-span-2",
                isFirst ? "h-72 md:h-full min-h-[280px]" : "h-40 md:h-44"
              )}
              onClick={() => openLightbox(i)}
            >
              <Image
                src={img}
                alt={`${title} — photo ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-dark-wood/0 group-hover:bg-dark-wood/25 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
              </div>

              {/* "+N more" overlay on last visible thumbnail */}
              {isLastVisible && (
                <div
                  className="absolute inset-0 bg-dark-wood/65 flex flex-col items-center justify-center gap-1"
                  onClick={(e) => { e.stopPropagation(); setShowAll(true); }}
                >
                  <Grid3x3 size={20} className="text-white" />
                  <span className="text-white font-bold text-lg leading-none">+{hiddenCount}</span>
                  <span className="text-white/70 text-xs">more photos</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Show all / collapse toggle */}
      {images.length > PREVIEW_LIMIT && (
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-walnut hover:text-dark-wood transition-colors"
          >
            <Grid3x3 size={15} />
            {showAll
              ? `Show less`
              : `View all ${images.length} photos`}
          </button>
          {showAll && (
            <span className="text-xs text-muted-foreground">· Click any photo to open fullscreen</span>
          )}
        </div>
      )}

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 z-10 text-white/60 text-sm font-medium">
            {lightboxIndex! + 1} / {images.length}
          </div>

          {/* Prev */}
          {images.length > 1 && (
            <button
              className="absolute left-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Image */}
          <div
            className="relative w-full h-full max-w-6xl max-h-[90vh] mx-16 my-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex!]}
              alt={`${title} — photo ${lightboxIndex! + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              className="absolute right-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
            >
              <ChevronRight size={22} />
            </button>
          )}

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto pb-1 px-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={cn(
                    "relative w-14 h-10 shrink-0 rounded overflow-hidden border-2 transition-all duration-150",
                    i === lightboxIndex
                      ? "border-gold scale-110"
                      : "border-white/20 hover:border-white/50 opacity-60 hover:opacity-100"
                  )}
                  aria-label={`Go to photo ${i + 1}`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
