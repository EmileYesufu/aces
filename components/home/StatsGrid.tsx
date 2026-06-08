import { Card } from "@/components/ui/Card";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { tournamentStats } from "@/content/tournament-2027";
import { Users, Trophy, Flag } from "lucide-react";

const icons = [Users, Trophy, Flag];

export function StatsGrid() {
  return (
    <Section className="bg-surface">
      <ScrollReveal>
        <SectionHeader
          title="National Finals"
          subtitle="The country's premier junior grassroots football tournament"
          centered
        />
      </ScrollReveal>
      <div className="grid gap-6 md:grid-cols-3">
        {tournamentStats.map((stat, i) => {
          const Icon = icons[i] ?? Users;
          return (
            <ScrollReveal key={stat.title} delay={i * 0.1}>
              <Card className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-aces-red/10">
                  <Icon className="h-7 w-7 text-aces-red" />
                </div>
                <h3 className="font-display text-xl font-bold text-aces-navy">{stat.title}</h3>
                <p className="mt-3 text-aces-muted">{stat.description}</p>
              </Card>
            </ScrollReveal>
          );
        })}
      </div>
    </Section>
  );
}
