import { Section, SectionHeader } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MapPin, Globe } from "lucide-react";
import { hallOfFame } from "@/content/hall-of-fame";

function getChampionTowns(): string[] {
  const towns = new Set<string>();
  for (const year of hallOfFame) {
    for (const winner of year.winners) {
      if (winner.town) towns.add(winner.town.trim());
    }
  }
  return Array.from(towns).sort((a, b) => a.localeCompare(b));
}

export function TeamsAttending() {
  const towns = getChampionTowns();
  if (towns.length === 0) return null;

  return (
    <Section>
      <ScrollReveal>
        <SectionHeader
          title="From towns and cities across the country"
          subtitle={`Champions have come from ${towns.length}+ towns and cities since 2009 — and international teams are welcome too`}
          centered
        />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="flex flex-wrap justify-center gap-2.5">
          {towns.map((town) => (
            <span
              key={town}
              className="inline-flex items-center gap-1.5 rounded-full border border-aces-navy/10 bg-surface px-3.5 py-1.5 text-sm font-medium text-aces-navy"
            >
              <MapPin className="h-3.5 w-3.5 text-aces-red" aria-hidden="true" />
              {town}
            </span>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <p className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-aces-muted">
          <Globe className="h-4 w-4 text-aces-red" aria-hidden="true" />
          International teams are welcome to apply each year
        </p>
      </ScrollReveal>
    </Section>
  );
}
