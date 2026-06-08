import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { partners } from "@/content/partners";
import { featuredVideo } from "@/content/videos";

export function Partners() {
  return (
    <Section>
      <ScrollReveal>
        <SectionHeader title="Our 2027 tournament partners" centered />
      </ScrollReveal>
      <div className="grid gap-8 md:grid-cols-3">
        {partners.map((partner, i) => (
          <ScrollReveal key={partner.name} delay={i * 0.1}>
            <a
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full flex-col items-center rounded-xl border border-gray-200 bg-white p-8 text-center transition-all hover:-translate-y-1 hover:border-aces-red/30 hover:shadow-md"
            >
              {partner.logo ? (
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={200}
                  height={80}
                  className="mb-4 h-16 w-auto object-contain"
                />
              ) : (
                <div className="mb-4 flex h-16 items-center justify-center font-display text-xl font-bold text-aces-navy">
                  {partner.name}
                </div>
              )}
              <h3 className="font-semibold text-aces-navy">{partner.name}</h3>
              <p className="mt-2 text-sm text-aces-muted">{partner.description}</p>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}

export function VideoSection() {
  return (
    <Section dark>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <ScrollReveal>
          <div>
            <SectionHeader title="A Day at the ACES" light />
            <p className="text-gray-300">
              Experience the atmosphere of the ACES Nationals — elite junior football, national scouts,
              opening ceremonies, and the battle to become ACES National Champions.
            </p>
            <Button href="/videos" className="mt-6">
              Watch Tournament Videos
            </Button>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="aspect-video overflow-hidden rounded-xl bg-black/40 shadow-2xl ring-1 ring-white/10">
            <VideoEmbed
              provider={featuredVideo.provider}
              id={featuredVideo.videoId}
              title={featuredVideo.title}
            />
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}
