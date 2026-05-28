import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { tournamentVideos, getVideoByYear } from "@/content/videos";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateStaticParams() {
  return tournamentVideos.map((v) => ({ year: v.year }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;
  const video = getVideoByYear(year);
  if (!video) return { title: "Tournament Video" };
  return { title: video.title, description: video.description };
}

export default async function VideoYearPage({ params }: Props) {
  const { year } = await params;
  const video = getVideoByYear(year);
  if (!video) notFound();

  return (
    <>
      <PageHero
        title={video.title}
        subtitle={video.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tournament Videos", href: "/videos" },
          { label: video.year },
        ]}
      />

      <Section>
        <div className="mx-auto max-w-4xl">
          <div className="aspect-video overflow-hidden rounded-xl bg-black">
            <YouTubeEmbed id={video.youtubeId} title={video.title} />
          </div>
          <Link href="/videos" className="mt-8 inline-block font-semibold text-aces-red hover:underline">
            ← Back to all videos
          </Link>
        </div>
      </Section>
    </>
  );
}
