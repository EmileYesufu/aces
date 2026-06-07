import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { HallOfFameTable } from "@/components/hall-of-fame/HallOfFameTable";

export const metadata: Metadata = {
  title: "Hall of Fame",
  description: "ACES Nationals champions from 2009 to 2026 — every age group winner since the tournament began.",
};

export default function HallOfFamePage() {
  return (
    <>
      <PageHero
        title="Hall of Fame"
        subtitle="Every ACES National Champion since 2009 — boys and girls age groups from towns and cities across the country."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Hall of Fame" },
        ]}
      />

      <Section>
        <HallOfFameTable />
      </Section>
    </>
  );
}
