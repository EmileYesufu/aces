import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { newsPosts, getFeaturedPost, getCategoryColor } from "@/content/news";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news and updates from the ACES Nationals football tournament.",
};

export default function NewsPage() {
  const featured = getFeaturedPost();
  const sorted = [...newsPosts]
    .filter((p) => p.slug !== featured.slug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <PageHero
        title="News"
        subtitle="Updates, announcements, and tournament news from the ACES team."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "News" },
        ]}
      />

      <Section>
        <ScrollReveal>
          <Link href={`/news/${featured.slug}`} className="group mb-12 block overflow-hidden rounded-2xl">
            <div className="relative aspect-[21/9] min-h-[240px]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-aces-navy via-aces-navy/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-10">
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getCategoryColor(featured.category)}`}>
                  {featured.category}
                </span>
                <h2 className="font-display mt-3 text-2xl font-bold uppercase text-white md:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-2 max-w-2xl text-gray-200 line-clamp-2">{featured.excerpt}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-aces-red-bright group-hover:underline">
                  Read featured article →
                </span>
              </div>
            </div>
          </Link>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.05}>
              <Link href={`/news/${post.slug}`}>
                <Card className="h-full overflow-hidden p-0">
                  <div className="relative aspect-video">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                      <time dateTime={post.date} className="text-sm text-aces-muted">
                        {new Date(post.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                    <h2 className="mt-3 text-lg font-bold text-aces-navy line-clamp-2">{post.title}</h2>
                    <p className="mt-2 text-sm text-aces-muted line-clamp-3">{post.excerpt}</p>
                    <span className="mt-4 inline-block text-sm font-semibold text-aces-red">
                      Read more →
                    </span>
                  </div>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Section>
    </>
  );
}
