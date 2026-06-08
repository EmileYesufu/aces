import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { PrintButton } from "@/components/ui/PrintButton";
import { tournamentRules } from "@/content/tournament-2027";
import { generalFaqs } from "@/content/faq";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Team Info Pack",
  description:
    "The ACES Nationals invited-team info pack — check-in, match format, what to bring, venue details and key information. Save or print for tournament day.",
};

const checklist = [
  "Full kit including shin pads",
  "Suitable footwear for grass pitches",
  "Match balls for warm-up",
  "Plenty of water and weather-appropriate clothing",
  "Team and player documents as requested in your invitation",
];

export default function InfoPackPage() {
  return (
    <>
      <PageHero
        title="Team Info Pack"
        subtitle="Everything invited teams need for tournament day — save this page as a PDF or print it for your managers."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "2027 Tournament", href: "/tournament" },
          { label: "Team Info Pack" },
        ]}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <p className="text-aces-muted">
              Tip: use your browser&apos;s &ldquo;Save as PDF&rdquo; option to keep a copy.
            </p>
            <PrintButton label="Download / Print pack" />
          </div>

          <div className="space-y-10">
            <section>
              <h2 className="font-display text-xl font-bold uppercase tracking-tight text-aces-navy">
                Venue
              </h2>
              <div className="mt-3 h-0.5 w-12 rounded bg-aces-red" />
              <p className="mt-4 text-aces-muted">{siteConfig.contact.venue}</p>
              <p className="text-aces-muted">{siteConfig.contact.address}</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold uppercase tracking-tight text-aces-navy">
                On the day
              </h2>
              <div className="mt-3 h-0.5 w-12 rounded bg-aces-red" />
              <ul className="mt-4 space-y-3">
                {tournamentRules.map((rule) => (
                  <li key={rule.title}>
                    <strong className="text-aces-navy">{rule.title}.</strong>{" "}
                    <span className="text-aces-muted">{rule.content}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold uppercase tracking-tight text-aces-navy">
                What to bring
              </h2>
              <div className="mt-3 h-0.5 w-12 rounded bg-aces-red" />
              <ul className="mt-4 list-disc space-y-2 pl-6 text-aces-muted">
                {checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold uppercase tracking-tight text-aces-navy">
                Key questions
              </h2>
              <div className="mt-3 h-0.5 w-12 rounded bg-aces-red" />
              <dl className="mt-4 space-y-4">
                {generalFaqs.slice(0, 6).map((faq) => (
                  <div key={faq.question}>
                    <dt className="font-semibold text-aces-navy">{faq.question}</dt>
                    <dd className="mt-1 text-aces-muted">{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold uppercase tracking-tight text-aces-navy">
                Contact
              </h2>
              <div className="mt-3 h-0.5 w-12 rounded bg-aces-red" />
              <p className="mt-4 text-aces-muted">
                Questions ahead of the tournament? Get in touch via the contact form at{" "}
                {siteConfig.url} and the ACES team will be happy to help.
              </p>
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}
