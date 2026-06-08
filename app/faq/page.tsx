import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FAQ } from "@/components/ui/FAQ";
import { CTABanner } from "@/components/ui/CTABanner";
import { generalFaqs } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Frequently asked questions about the ACES Nationals — venue, timings, match format, parking, food, and what to bring.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: generalFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about attending the ACES Nationals — for managers, players, and families."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FAQs" },
        ]}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHeader title="Tournament FAQs" />
          <FAQ items={generalFaqs} />
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
