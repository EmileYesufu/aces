import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { siteConfig } from "@/content/site";
import { Car, Train, Hotel, Utensils, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Visiting & Travel",
  description:
    "How to get to the ACES Nationals at the University of Nottingham Riverside Sports Complex — directions, parking, public transport, accommodation, and food on the day.",
};

const infoCards = [
  {
    icon: Car,
    title: "By car & parking",
    desc: "The Riverside Sports Complex is just off Lenton Lane (NG7 2SA) with parking on site. Arrive in good time on busy tournament mornings, and follow marshal directions on arrival.",
  },
  {
    icon: Train,
    title: "By train & tram",
    desc: "Nottingham railway station is around 10 minutes away by car or taxi, with national connections. The NET tram network and local buses also serve the city centre nearby.",
  },
  {
    icon: Hotel,
    title: "Accommodation",
    desc: "Nottingham has a wide range of hotels and guest houses, many within a short drive of the venue and city centre — ideal for teams and families travelling from further afield.",
  },
  {
    icon: Utensils,
    title: "Food & drink",
    desc: "Refreshments are available at the venue across tournament days. Bring plenty of water for players, especially in warm weather.",
  },
];

const dayPlan = [
  { time: "08:45", label: "Latest check-in for managers and captains" },
  { time: "Morning", label: "Managers' meeting and opening ceremony, group draws" },
  { time: "Daytime", label: "Group stages followed by knockout rounds" },
  { time: "Afternoon", label: "Finals and presentations for the day's age groups" },
];

export default function VisitingPage() {
  return (
    <>
      <PageHero
        title="Visiting & Travel"
        subtitle="Everything teams, families and supporters need to plan their trip to the ACES Nationals in Nottingham."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Visiting & Travel" },
        ]}
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2">
          {infoCards.map(({ icon: Icon, title, desc }) => (
            <Card key={title}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-aces-red/10">
                <Icon className="h-6 w-6 text-aces-red" aria-hidden="true" />
              </div>
              <h2 className="mt-4 font-display text-lg font-bold uppercase tracking-tight text-aces-navy">
                {title}
              </h2>
              <p className="mt-2 text-sm text-aces-muted">{desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeader title="What a tournament day looks like" centered />
        <div className="mx-auto max-w-2xl space-y-4">
          {dayPlan.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-4 rounded-card border border-gray-200 bg-white p-5"
            >
              <span className="flex shrink-0 items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-aces-red">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {item.time}
              </span>
              <span className="text-aces-muted">{item.label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader title="The venue" />
        <div className="mb-6 flex items-start gap-3">
          <MapPin className="mt-0.5 h-6 w-6 shrink-0 text-aces-red" aria-hidden="true" />
          <div>
            <p className="font-semibold text-aces-navy">{siteConfig.contact.venue}</p>
            <p className="text-aces-muted">{siteConfig.contact.address}</p>
          </div>
        </div>
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
    </>
  );
}
