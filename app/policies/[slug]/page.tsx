import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { getPolicy, policySlugs } from "@/content/policies";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return policySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) return { title: "Policy" };
  return { title: policy.title, description: `${policy.title} — ACES Nationals Football Tournament.` };
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) notFound();

  return (
    <>
      <PageHero
        title={policy.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: policy.title },
        ]}
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-10">
          {policy.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-bold text-aces-navy">{section.heading}</h2>
              <div className="mt-4 h-0.5 w-12 rounded bg-aces-red" />
              <p className="mt-4 text-aces-muted leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
