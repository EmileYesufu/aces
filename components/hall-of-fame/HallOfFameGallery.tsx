"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Winner } from "@/content/hall-of-fame";
import { Medal, X } from "lucide-react";

type GalleryItem = {
  src: string;
  alt: string;
  caption?: string;
};

type HallOfFameGalleryProps = {
  year: number;
  winners?: Winner[];
  photos?: string[];
  labeled: boolean;
};

export function HallOfFameGallery({ year, winners = [], photos = [], labeled }: HallOfFameGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const labeledWinners = winners.filter((w) => w.photo);

  const items: GalleryItem[] = labeled
    ? labeledWinners.map((winner) => ({
        src: winner.photo!,
        alt: `${winner.team} — ${winner.ageGroup} ${year} champions`,
        caption: `${winner.ageGroup} · ${winner.team} · ${winner.town}`,
      }))
    : photos.map((src, index) => ({
        src,
        alt: `ACES Nationals ${year}, photo ${index + 1}`,
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
        return;
      }
      if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightbox, close]);

  if (items.length === 0) return null;

  return (
    <>
      <div className="mb-10">
        <h3 className="mb-2 font-display text-lg font-bold uppercase text-aces-navy">
          {labeled ? `${year} Champions Gallery` : `${year} Tournament Photos`}
        </h3>
        {!labeled && (
          <p className="mb-4 text-sm text-aces-muted">
            Photos from the {year} ACES Nationals. Champion teams are listed in the table below — images
            are not labelled by team. Click a photo to view it larger.
          </p>
        )}
        {labeled && (
          <p className="mb-4 text-sm text-aces-muted">Click a photo to view it larger.</p>
        )}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {labeled
            ? labeledWinners.map((winner, index) => (
                <figure
                  key={`${winner.ageGroup}-${winner.team}`}
                  className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <button
                    type="button"
                    onClick={() => open(index)}
                    className="relative block aspect-[4/3] w-full cursor-zoom-in bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aces-red"
                    aria-label={`View larger: ${winner.team}, ${winner.ageGroup}`}
                  >
                    <Image
                      src={winner.photo!}
                      alt={`${winner.team} — ${winner.ageGroup} ${year} champions`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                  </button>
                  <figcaption className="space-y-0.5 p-3">
                    <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-aces-red">
                      <Medal className="h-3 w-3 shrink-0" aria-hidden="true" />
                      {winner.ageGroup}
                    </p>
                    <p className="line-clamp-2 text-sm font-semibold text-aces-navy">{winner.team}</p>
                    <p className="text-xs text-aces-muted">{winner.town}</p>
                  </figcaption>
                </figure>
              ))
            : photos.map((src, index) => (
                <figure
                  key={src}
                  className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => open(index)}
                    className="relative block aspect-[4/3] w-full cursor-zoom-in bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aces-red"
                    aria-label={`View larger: ${year} tournament photo ${index + 1}`}
                  >
                    <Image
                      src={src}
                      alt={`ACES Nationals ${year}, photo ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                  </button>
                </figure>
              ))}
        </div>
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
