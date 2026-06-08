import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CTABanner } from "@/components/ui/CTABanner";
import { getArticleBySlug, newsSlugs, formatNewsDate } from "@/content/news";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return newsSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "News" };
  return { title: article.title, description: article.excerpt };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <PageHero
        title={article.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "News", href: "/news" },
          { label: article.category },
        ]}
      />

      <Section>
        <article className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-aces-red">
            <span>{article.category}</span>
            <span className="text-aces-muted" aria-hidden="true">
              &middot;
            </span>
            <time dateTime={article.date} className="text-aces-muted">
              {formatNewsDate(article.date)}
            </time>
          </div>

          <div className="mt-6 space-y-4 text-lg leading-relaxed text-aces-muted">
            {article.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <Link
            href="/news"
            className="mt-10 inline-flex items-center gap-2 font-semibold text-aces-red hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to all news
          </Link>
        </article>
      </Section>

      <CTABanner />
    </>
  );
}
