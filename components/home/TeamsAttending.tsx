"use client";

import { useReducedMotion } from "framer-motion";
import { Globe, MapPin, Calendar, Users } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { hallOfFame } from "@/content/hall-of-fame";
import { cn } from "@/lib/utils";

function getChampionTowns(): string[] {
  const towns = new Set<string>();
  for (const year of hallOfFame) {
    for (const winner of year.winners) {
      if (winner.town) towns.add(winner.town.trim());
    }
  }
  return Array.from(towns).sort((a, b) => a.localeCompare(b));
}

const stats = (townCount: number) => [
  { icon: MapPin, value: `${townCount}+`, label: "Towns & cities" },
  { icon: Calendar, value: "2009", label: "Established" },
  { icon: Users, value: "400+", label: "Teams each year" },
  { icon: Globe, value: "Intl", label: "Teams welcome" },
];

function MarqueeRow({ towns, paused }: { towns: string[]; paused: boolean }) {
  const items = [...towns, ...towns];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-aces-navy to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-aces-navy to-transparent" aria-hidden="true" />
      <div
        className={cn("flex w-max gap-3", !paused && "animate-marquee")}
        aria-hidden="true"
      >
        {items.map((town, i) => (
          <span
            key={`${town}-${i}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white"
          >
            <MapPin className="h-3.5 w-3.5 text-aces-red-bright" aria-hidden="true" />
            {town}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TeamsAttending() {
  const reducedMotion = useReducedMotion();
  const towns = getChampionTowns();
  if (towns.length === 0) return null;

  return (
    <Section dark className="overflow-hidden">
      <ScrollReveal>
        <SectionHeader
          title="From towns and cities across the country"
          subtitle={`National champions have represented ${towns.length}+ towns and cities since 2009`}
          centered
          light
        />
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats(towns.length).map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-6 text-center"
            >
              <Icon className="mx-auto h-6 w-6 text-aces-red-bright" aria-hidden="true" />
              <p className="font-display mt-3 text-2xl font-bold text-white md:text-3xl">{value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-400">{label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.12}>
        <MarqueeRow towns={towns} paused={!!reducedMotion} />
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <p className="mt-10 flex items-center justify-center gap-2 text-sm font-medium text-gray-300">
          <Globe className="h-4 w-4 text-aces-red-bright" aria-hidden="true" />
          International teams are welcome to apply each year
        </p>
      </ScrollReveal>
    </Section>
  );
}
