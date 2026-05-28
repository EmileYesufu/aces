"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Quote, Pause, Play } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { testimonials } from "@/content/testimonials";

function initials(club: string) {
  return club.slice(0, 2).toUpperCase();
}

export function Testimonials() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const liveRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused, reducedMotion]);

  const current = testimonials[active];

  return (
    <Section className="bg-aces-navy text-white">
      <ScrollReveal>
        <SectionHeader
          title="What Teams Say"
          subtitle="400+ teams from towns and cities across the UK — hear from managers and coaches"
          centered
          light
        />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <div className="mx-auto max-w-3xl text-center" aria-roledescription="carousel" aria-label="Testimonials">
          <Quote className="mx-auto h-10 w-10 text-aces-red-bright opacity-80" aria-hidden="true" />
          <blockquote className="mt-6 text-xl leading-relaxed text-gray-100 md:text-2xl">
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
              <span className="block font-semibold text-white">{current.author}</span>
              <span className="block text-sm text-gray-300">
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
                  className={`h-2 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    i === active ? "w-8 bg-aces-red-bright" : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Resume testimonials" : "Pause testimonials"}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-gray-300 transition-colors hover:border-white/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}
