import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { tournamentVideos, getYoutubeThumbnail } from "@/content/videos";
import { Play } from "lucide-react";

export const metadata: Metadata = {
  title: "Tournament Videos",
  description: "Watch highlights from previous ACES Nationals tournaments.",
};

export default function VideosPage() {
  return (
    <>
      <PageHero
        title="Tournament Videos"
        subtitle="Relive the action from previous ACES Nationals tournaments."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tournament Videos" },
        ]}
      />

      <Section>
        <div className="grid gap-8 md:grid-cols-3">
          {tournamentVideos.map((video, i) => (
            <ScrollReveal key={video.year} delay={i * 0.1}>
              <Link href={`/videos/${video.year}`}>
                <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:border-aces-red/30 hover:shadow-md">
                  <div className="relative aspect-video">
                    <Image
                      src={getYoutubeThumbnail(video.youtubeId)}
                      alt={video.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-aces-navy/30 transition-colors group-hover:bg-aces-navy/40">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-aces-red text-white shadow-lg transition-transform group-hover:scale-110">
                        <Play className="h-8 w-8 fill-current" />
                      </div>
                    </div>
                    <span className="absolute bottom-3 left-3 rounded bg-black/70 px-2 py-1 text-sm font-medium text-white">
                      {video.year}
                    </span>
                  </div>
                  <div className="p-6">
                    <h2 className="font-display text-lg font-bold uppercase text-aces-navy">{video.title}</h2>
                    <p className="mt-2 text-sm text-aces-muted">{video.description}</p>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Section>
    </>
  );
}
