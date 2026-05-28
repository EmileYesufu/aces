import { Section, SectionHeader } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { ClipboardCheck, Send, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: ClipboardCheck,
    title: "1. Check the criteria",
    desc: "League champions, county cup winners or defending champions? See if your team qualifies for an invitation.",
  },
  {
    icon: Send,
    title: "2. Register your interest",
    desc: "Tell us about your team and your season. It takes two minutes and puts you on the ACES holding list.",
  },
  {
    icon: ShieldCheck,
    title: "3. We review & invite",
    desc: "The ACES team assesses every submission against the criteria and invites qualifying teams by email.",
  },
];

const trust = ["FA Sanctioned", "Running since 2009", "400+ teams each year"];

export function EntryJourney() {
  return (
    <Section className="bg-surface">
      <ScrollReveal>
        <SectionHeader
          title="How to enter"
          subtitle="Entry is invitation-only — here's the path from qualifying to kick-off"
          centered
        />
      </ScrollReveal>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <ScrollReveal key={s.title} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-card border border-gray-200 bg-white p-6 shadow-[var(--shadow-card)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-aces-red/10">
                  <Icon className="h-6 w-6 text-aces-red" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-tight text-aces-navy">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-aces-muted">{s.desc}</p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      <ScrollReveal delay={0.1}>
        <div className="mt-10 flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-aces-muted">
            {trust.map((t, i) => (
              <span key={t} className="flex items-center gap-2">
                {i > 0 && <span className="hidden text-gray-300 sm:inline" aria-hidden="true">•</span>}
                <ShieldCheck className="h-4 w-4 text-aces-red" aria-hidden="true" />
                {t}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button href="/tournament/register" size="lg">
              Register Interest
            </Button>
            <Button href="/tournament/entry-criteria" variant="outline" size="lg">
              View Entry Criteria
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}
