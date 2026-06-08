import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { newsArticles, formatNewsDate } from "@/content/news";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "News & Updates",
  description:
    "The latest news from the ACES Nationals — tournament announcements, entry updates, and stories from junior grassroots football.",
};

const sortedArticles = [...newsArticles].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export default function NewsPage() {
  return (
    <>
      <PageHero
        title="News & Updates"
        subtitle="Tournament announcements, entry updates, and stories from across the ACES Nationals."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "News" },
        ]}
      />

      <Section>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sortedArticles.map((article, i) => (
            <ScrollReveal key={article.slug} delay={i * 0.08}>
              <Link href={`/news/${article.slug}`} className="block h-full">
                <Card className="flex h-full flex-col">
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-aces-red">
                    <span>{article.category}</span>
                    <span className="text-aces-muted" aria-hidden="true">
                      &middot;
                    </span>
                    <time dateTime={article.date} className="text-aces-muted">
                      {formatNewsDate(article.date)}
                    </time>
                  </div>
                  <h2 className="mt-3 font-display text-xl font-bold uppercase tracking-tight text-aces-navy">
                    {article.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm text-aces-muted">{article.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-aces-red">
                    Read more
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Section>
    </>
  );
}
