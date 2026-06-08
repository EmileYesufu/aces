import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getLatestNews, formatNewsDate } from "@/content/news";
import { ArrowRight } from "lucide-react";

export function NewsHighlights() {
  const latest = getLatestNews(3);
  if (latest.length === 0) return null;

  return (
    <Section className="bg-surface">
      <ScrollReveal>
        <SectionHeader
          title="Latest News"
          subtitle="Announcements and updates from the ACES Nationals"
          centered
        />
      </ScrollReveal>

      <div className="grid gap-6 md:grid-cols-3">
        {latest.map((article, i) => (
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
                <h3 className="mt-3 font-display text-lg font-bold uppercase tracking-tight text-aces-navy">
                  {article.title}
                </h3>
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

      <ScrollReveal delay={0.1}>
        <div className="mt-10 flex justify-center">
          <Button href="/news" variant="outline" size="lg">
            View all news
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </ScrollReveal>
    </Section>
  );
}
