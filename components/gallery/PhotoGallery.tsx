"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { TournamentGalleryPhoto } from "@/content/tournament-gallery";

type PhotoGalleryProps = {
  photos: TournamentGalleryPhoto[];
  year: number;
};

const SWIPE_THRESHOLD = 50;

export function PhotoGallery({ photos, year }: PhotoGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const didSwipe = useRef(false);

  const items = photos.map((photo, index) => ({
    src: photo.src,
    alt: photo.alt ?? `ACES Nationals ${year}, photo ${index + 1}`,
    caption: photo.caption,
  }));

  const open = useCallback((index: number) => {
    triggerRef.current = document.activeElement as HTMLElement;
    setLightbox(index);
  }, []);

  const close = useCallback(() => {
    setLightbox(null);
    triggerRef.current?.focus();
  }, []);

  const goPrev = useCallback(() => {
    setLightbox((current) => (current === null || current === 0 ? current : current - 1));
  }, []);

  const goNext = useCallback(() => {
    setLightbox((current) =>
      current === null || current === items.length - 1 ? current : current + 1
    );
  }, [items.length]);

  useEffect(() => {
    if (lightbox === null) return;
    closeBtnRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox, close, goPrev, goNext]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    didSwipe.current = false;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return;
      const dx = touchStart.current.x - e.changedTouches[0].clientX;
      const dy = touchStart.current.y - e.changedTouches[0].clientY;
      touchStart.current = null;

      if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) <= Math.abs(dy)) return;

      didSwipe.current = true;
      if (dx > 0) goNext();
      else goPrev();
    },
    [goNext, goPrev]
  );

  const handleBackdropClick = useCallback(() => {
    if (didSwipe.current) {
      didSwipe.current = false;
      return;
    }
    close();
  }, [close]);

  if (photos.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-surface px-6 py-16 text-center">
        <p className="font-display text-lg font-bold uppercase text-aces-navy">Photos coming soon</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-aces-muted">
          Gallery photos from the {year} ACES Nationals will appear here as each tournament weekend is
          completed.
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="mb-4 text-sm text-aces-muted">
        Click a photo to view it larger. Swipe or use arrow keys to browse.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map((item, index) => (
          <figure
            key={item.src}
            className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            <button
              type="button"
              onClick={() => open(index)}
              className="relative block aspect-[4/3] w-full cursor-zoom-in bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aces-red"
              aria-label={`View larger: ${item.alt}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            </button>
            {item.caption && (
              <figcaption className="p-3 text-sm text-aces-muted">{item.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>

      {lightbox !== null && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[60] flex touch-none items-center justify-center bg-black/90 p-4"
          onClick={handleBackdropClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${lightbox + 1} of ${items.length}: ${items[lightbox].alt}`}
        >
          <button
            ref={closeBtnRef}
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-20 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>

          <div
            className="relative z-10 flex w-full max-w-6xl items-center gap-2 sm:gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={goPrev}
              disabled={lightbox === 0}
              className="hidden shrink-0 rounded-full bg-white/15 p-2 text-white hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:block sm:p-3"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-8 w-8" aria-hidden="true" />
            </button>

            <div className="min-w-0 flex-1 select-none">
              <Image
                key={items[lightbox].src}
                src={items[lightbox].src}
                alt={items[lightbox].alt}
                width={1200}
                height={900}
                className="pointer-events-none mx-auto max-h-[85vh] w-auto rounded-lg object-contain"
                draggable={false}
              />
              <p className="mt-3 text-center text-sm text-gray-400">
                {lightbox + 1} / {items.length}
              </p>
              {items[lightbox].caption && (
                <p className="mt-1 text-center text-sm text-gray-300">{items[lightbox].caption}</p>
              )}
            </div>

            <button
              type="button"
              onClick={goNext}
              disabled={lightbox === items.length - 1}
              className="hidden shrink-0 rounded-full bg-white/15 p-2 text-white hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:block sm:p-3"
              aria-label="Next photo"
            >
              <ChevronRight className="h-8 w-8" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
