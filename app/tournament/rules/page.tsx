import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { tournamentRules } from "@/content/tournament-2027";

export const metadata: Metadata = {
  title: "Tournament Rules",
  description: "Rules and regulations for the ACES Nationals football tournament.",
};

export default function RulesPage() {
  return (
    <>
      <PageHero
        title="Tournament Rules"
        subtitle="All matches are played in accordance with FA rules and regulations."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "2027 Tournament", href: "/tournament" },
          { label: "Rules" },
        ]}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {tournamentRules.map((rule) => (
            <Card key={rule.title}>
              <h2 className="text-lg font-bold text-aces-navy">{rule.title}</h2>
              <p className="mt-3 text-aces-muted">{rule.content}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
