import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { MilestoneTimeline } from "@/components/home/MilestoneTimeline";
import { aboutContent, tournamentSchedule } from "@/content/tournament-2026";
import { partners } from "@/content/partners";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About us",
  description: "About the ACES Nationals — the country's premier junior grassroots football tournament since 2009.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About the ACES Nationals"
        subtitle="Eighteen years of showcasing the best junior grassroots football talent in the country."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "2026 Tournament", href: "/tournament" },
          { label: "About us" },
        ]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-4 text-aces-muted">
            {aboutContent.intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <div className="space-y-4 text-aces-muted">
            {aboutContent.growth.slice(0, 2).map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-4 text-aces-muted">
            {aboutContent.growth.slice(2).map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
            <Button href={siteConfig.social.youtube} external variant="secondary">
              See Previous Event Videos
            </Button>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-aces-navy">Age Groups and Dates</h2>
            <div className="mt-4 h-1 w-16 rounded bg-aces-red" />
            <ul className="mt-6 space-y-2 capitalize text-aces-muted">
              {tournamentSchedule.map((day) => (
                <li key={day.date}>
                  <strong className="text-aces-navy">{day.date}</strong> — {day.ageGroups.join(", ")}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          title="Our story since 2009"
          subtitle="From 20 teams in Leicester to the country's premier junior grassroots tournament"
          centered
        />
        <div className="mx-auto max-w-3xl">
          <MilestoneTimeline />
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader title="Nottingham University Riverside Sports Complex" />
        <p className="mb-6 text-aces-muted">{siteConfig.contact.venue}</p>
        <div className="aspect-video overflow-hidden rounded-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d38487.07034469801!2d-1.2116822221269175!3d52.9224738195695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879c242818d33a3%3A0x9aba9848c667e43a!2sNottingham%20NG7%202SA!5e0!3m2!1sen!2suk!4v1492696678166"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Riverside Sports Complex map"
          />
        </div>
      </Section>

      <Section>
        <SectionHeader title="Partnered with" centered />
        <div className="flex flex-wrap items-center justify-center gap-12">
          {partners.map((partner) => (
            <a key={partner.name} href={partner.href} target="_blank" rel="noopener noreferrer">
              {partner.logo ? (
                <Image src={partner.logo} alt={partner.name} width={180} height={60} className="h-14 w-auto object-contain" />
              ) : (
                <span className="text-lg font-bold text-aces-navy">{partner.name}</span>
              )}
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
