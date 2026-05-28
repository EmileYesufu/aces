import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { RegisterInterestForm } from "@/components/forms/RegisterInterestForm";
import { ShieldCheck } from "lucide-react";

const trustSignals = ["FA Sanctioned", "Running since 2009", "400+ teams each year"];

export const metadata: Metadata = {
  title: "Register Interest",
  description: "Register your team's interest in the ACES Nationals 2026 football tournament.",
};

export default function RegisterPage() {
  return (
    <>
      <PageHero
        title="Register Interest"
        subtitle="Are you league champions or county cup winners in your town/city? Register your team's interest for the 2026 ACES Nationals."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "2026 Tournament", href: "/tournament" },
          { label: "Register Interest" },
        ]}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-aces-muted">
            Complete the form below to register your team&apos;s interest. The ACES team will review
            your submission against the entry criteria and be in touch.
          </p>
          <div className="mb-8 flex flex-wrap gap-x-6 gap-y-2 border-y border-gray-200 py-4 text-sm font-medium text-aces-muted">
            {trustSignals.map((t) => (
              <span key={t} className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-aces-red" aria-hidden="true" />
                {t}
              </span>
            ))}
          </div>
          <RegisterInterestForm />
        </div>
      </Section>
    </>
  );
}
