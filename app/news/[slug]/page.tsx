import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { newsPosts, getNewsPost, getCategoryColor } from "@/content/news";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return newsPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) return { title: "News" };
  return { title: post.title, description: post.excerpt };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) notFound();

  const body = post.content ?? post.excerpt;

  return (
    <>
      <PageHero
        title={post.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "News", href: "/news" },
          { label: post.title },
        ]}
      />

      <Section>
        <article className="mx-auto max-w-3xl">
          <div className="relative mb-8 aspect-video overflow-hidden rounded-xl">
            <Image src={post.image} alt={post.title} fill className="object-cover" sizes="768px" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getCategoryColor(post.category)}`}>
              {post.category}
            </span>
            <time dateTime={post.date} className="text-sm font-medium text-aces-red">
              {new Date(post.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>
          <div className="prose prose-lg mt-8 max-w-none text-aces-muted whitespace-pre-line">
            {body}
          </div>
          <Link href="/news" className="mt-8 inline-block font-semibold text-aces-red hover:underline">
            ← Back to News
          </Link>
        </article>
      </Section>
    </>
  );
}
