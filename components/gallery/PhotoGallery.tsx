"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { TournamentGalleryPhoto } from "@/content/tournament-gallery";

type PhotoGalleryProps = {
  photos: TournamentGalleryPhoto[];
  year: number;
};

export function PhotoGallery({ photos, year }: PhotoGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

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

  useEffect(() => {
    if (lightbox === null) return;
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightbox, close]);

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
      <p className="mb-4 text-sm text-aces-muted">Click a photo to view it larger.</p>
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
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`Image: ${items[lightbox].alt}`}
        >
          <button
            ref={closeBtnRef}
            type="button"
            onClick={close}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="relative max-h-[85vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={items[lightbox].src}
              alt={items[lightbox].alt}
              width={1200}
              height={900}
              className="max-h-[85vh] w-auto rounded-lg object-contain"
            />
            {items[lightbox].caption && (
              <p className="mt-3 text-center text-sm text-gray-300">{items[lightbox].caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
