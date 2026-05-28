import { Section, SectionHeader } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ScheduleSection } from "@/components/home/ScheduleSection";
import { tournamentOverview } from "@/content/tournament-2026";

export function TournamentOverview() {
  return (
    <>
      <Section>
        <ScrollReveal>
          <SectionHeader title={tournamentOverview.title.replace("THE ", "")} />
        </ScrollReveal>
        <div className="mx-auto max-w-4xl space-y-4 text-lg text-aces-muted">
          {tournamentOverview.paragraphs.map((p, i) => (
            <ScrollReveal key={p.slice(0, 40)} delay={i * 0.05}>
              <p>{p}</p>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <ScheduleSection />
    </>
  );
}
