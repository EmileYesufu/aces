import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FAQ } from "@/components/ui/FAQ";
import { CTABanner } from "@/components/ui/CTABanner";
import {
  entryCriteriaFaqs,
  entryCriteriaList,
  entryCriteriaNotes,
} from "@/content/tournament-2026";

export const metadata: Metadata = {
  title: "Entry Criteria",
  description: "How to enter the ACES Nationals — eligibility, FAQs, and qualification criteria.",
};

export default function EntryCriteriaPage() {
  return (
    <>
      <PageHero
        title="Entry Criteria"
        subtitle="Entry to the ACES National finals is widely regarded as the ultimate prize in junior football."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "2026 Tournament", href: "/tournament" },
          { label: "Entry Criteria" },
        ]}
      />

      <Section>
        <p className="mx-auto mb-12 max-w-3xl text-lg text-aces-muted">
          The most frequent question we get asked is how do we enter the prestigious competition?
          Here is a guideline for a better understanding of how to enter the event, without having
          to wait for a call from the ACES Team.
        </p>

        <SectionHeader title="FAQs" />
        <FAQ items={entryCriteriaFaqs} />
      </Section>

      <Section className="bg-surface">
        <SectionHeader title="Criteria for Entry" />
        <ul className="mx-auto max-w-3xl list-disc space-y-3 pl-6 text-aces-muted">
          {entryCriteriaList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mx-auto mt-6 max-w-3xl text-sm text-aces-muted italic">
          Please note: If spaces are still available when the above criteria has been reached then
          wild card entries may be given to teams who have not won any of the above. This is to
          evenly balance groups.
        </p>
      </Section>

      <Section>
        <SectionHeader title="Notes" />
        <div className="mx-auto max-w-3xl space-y-4 text-aces-muted">
          {entryCriteriaNotes.map((note) => (
            <p key={note.slice(0, 40)}>{note}</p>
          ))}
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
