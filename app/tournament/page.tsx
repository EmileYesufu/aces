import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { CTABanner } from "@/components/ui/CTABanner";
import { tournamentOverview, tournamentSchedule } from "@/content/tournament-2026";
import { siteConfig } from "@/content/site";
import { Calendar, MapPin, Shield, Eye } from "lucide-react";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "The 2026 Tournament",
  description: "ACES Nationals 2026 — four weekends in May & June at Riverside Sports Complex, Nottingham.",
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  name: "ACES Nationals 2026 Football Tournament",
  description:
    "The 18th annual ACES Nationals — an invitation-only junior football tournament for elite boys and girls teams from across the country.",
  startDate: "2026-05-30",
  endDate: "2026-06-21",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  sport: "Football",
  location: {
    "@type": "Place",
    name: "University of Nottingham Riverside Sports Complex",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Trent Side, Lenton Lane",
      addressLocality: "Nottingham",
      postalCode: "NG7 2SA",
      addressCountry: "GB",
    },
  },
  organizer: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.contact.email,
  },
};

export default function TournamentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <PageHero
        title="The 2026 Tournament"
        subtitle="The 18th annual ACES Nationals football tournament — invitation only, elite junior boys and girls teams."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "2026 Tournament" },
        ]}
      />

      <Section>
        <div className="mx-auto max-w-4xl space-y-4 text-lg text-aces-muted">
          {tournamentOverview.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Calendar, title: "May & June 2026", desc: "Four tournament weekends" },
            { icon: MapPin, title: "Nottingham", desc: siteConfig.contact.venue },
            { icon: Shield, title: "FA Sanctioned", desc: "Fully sanctioned by the Football Association" },
            { icon: Eye, title: "Scouts Attending", desc: "Premier League, WSL and Football League scouts" },
          ].map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="text-center">
              <Icon className="mx-auto h-8 w-8 text-aces-red" />
              <h3 className="mt-3 font-bold text-aces-navy">{title}</h3>
              <p className="mt-2 text-sm text-aces-muted">{desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader title="Tournament Schedule" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tournamentSchedule.map((day) => (
            <Card key={day.date + day.ageGroups.join()}>
              <p className="text-sm font-medium text-aces-red">{day.label}</p>
              <p className="mt-1 text-xl font-bold text-aces-navy">{day.date}</p>
              <ul className="mt-3 space-y-1 capitalize text-aces-muted">
                {day.ageGroups.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
