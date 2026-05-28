"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { galleryImages } from "@/content/gallery";

export function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

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

  return (
    <Section className="bg-pitch-pattern">
      <ScrollReveal>
        <SectionHeader
          title="From kick-off to trophy lift"
          subtitle="A single tournament day at the ACES Nationals — relive the atmosphere"
          centered
        />
      </ScrollReveal>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin md:grid md:grid-cols-3 md:overflow-visible md:pb-0 lg:grid-cols-5">
        {galleryImages.map((image, index) => (
          <ScrollReveal key={image.src} delay={index * 0.08} className="shrink-0 snap-center md:shrink">
            <button
              type="button"
              onClick={() => open(index)}
              className="group relative block aspect-[4/5] w-64 overflow-hidden rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aces-red md:w-full"
              aria-label={`View: ${image.caption}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 256px, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-aces-navy/80 via-transparent to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-3 text-left font-display text-sm font-bold uppercase tracking-wide text-white">
                {image.caption}
              </span>
            </button>
          </ScrollReveal>
        ))}
      </div>

      {lightbox !== null && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`Image: ${galleryImages[lightbox].caption}`}
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
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].alt}
              width={1200}
              height={800}
              className="max-h-[85vh] w-auto rounded-lg object-contain"
            />
            <p className="mt-3 text-center text-sm text-gray-300">{galleryImages[lightbox].alt}</p>
          </div>
        </div>
      )}
    </Section>
  );
}
