"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Quote, Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { testimonials } from "@/content/testimonials";

const SWIPE_THRESHOLD = 50;

function initials(club: string) {
  return club.slice(0, 2).toUpperCase();
}

export function Testimonials() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const liveRef = useRef<HTMLParagraphElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const goPrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [paused, reducedMotion, goNext]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return;
      const dx = touchStart.current.x - e.changedTouches[0].clientX;
      const dy = touchStart.current.y - e.changedTouches[0].clientY;
      touchStart.current = null;

      if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) <= Math.abs(dy)) return;

      if (dx > 0) goNext();
      else goPrev();
    },
    [goNext, goPrev]
  );

  const current = testimonials[active];

  return (
    <Section className="bg-surface bg-pitch-pattern">
      <ScrollReveal>
        <SectionHeader
          title="What Teams Say"
          subtitle="400+ teams from towns and cities across the UK — hear from managers and coaches"
          centered
        />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <div
          className="relative mx-auto max-w-3xl px-12 text-center sm:px-14"
          aria-roledescription="carousel"
          aria-label="Testimonials"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-aces-navy/15 text-aces-navy transition-colors hover:border-aces-red/30 hover:bg-white hover:text-aces-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aces-red"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-aces-navy/15 text-aces-navy transition-colors hover:border-aces-red/30 hover:bg-white hover:text-aces-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aces-red"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          <Quote className="mx-auto h-10 w-10 text-aces-red" aria-hidden="true" />
          <blockquote className="mt-6 text-xl leading-relaxed text-aces-navy md:text-2xl">
            &ldquo;{current.quote}&rdquo;
          </blockquote>
          <figcaption ref={liveRef} aria-live="polite" className="mt-8 flex items-center justify-center gap-3">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full bg-aces-red font-display text-lg font-bold text-white"
              aria-hidden="true"
            >
              {initials(current.club)}
            </span>
            <span className="text-left">
              <span className="block font-semibold text-aces-navy">{current.author}</span>
              <span className="block text-sm text-aces-muted">
                {current.role} · {current.club}
              </span>
            </span>
          </figcaption>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.club}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show testimonial from ${t.club}`}
                  aria-pressed={i === active}
                  className={`h-2 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aces-red ${
                    i === active ? "w-8 bg-aces-red" : "w-2 bg-aces-navy/15 hover:bg-aces-navy/25"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Resume testimonials" : "Pause testimonials"}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-aces-navy/15 text-aces-muted transition-colors hover:border-aces-navy/30 hover:text-aces-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aces-red"
            >
              {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}
