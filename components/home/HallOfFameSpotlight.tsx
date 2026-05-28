import { Trophy, ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { hallOfFame } from "@/content/hall-of-fame";

export function HallOfFameSpotlight() {
  const latest = hallOfFame[0];
  if (!latest) return null;

  const featured = latest.winners.slice(0, 6);

  return (
    <Section dark className="relative overflow-hidden">
      <Trophy
        className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 text-aces-gold/10"
        aria-hidden="true"
      />
      <div className="relative">
        <ScrollReveal>
          <SectionHeader
            title={`${latest.year} National Champions`}
            subtitle="The reigning ACES Nationals title holders across the age groups"
            light
          />
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((w, i) => (
            <ScrollReveal key={`${w.ageGroup}-${w.team}`} delay={i * 0.06}>
              <div className="flex items-center gap-4 rounded-card border border-white/10 bg-white/5 p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-aces-gold/15">
                  <Trophy className="h-5 w-5 text-aces-gold-bright" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-aces-gold-bright">
                    {w.ageGroup}
                  </p>
                  <p className="truncate font-semibold text-white">{w.team}</p>
                  <p className="truncate text-sm text-gray-300">{w.town}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.1}>
          <div className="mt-10 flex justify-center">
            <Button href="/hall-of-fame" variant="outline-white" size="lg">
              View the full Hall of Fame
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}
