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
              <span className="mb-4 inline-flex rounded-full bg-aces-red/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-aces-red">
                {partner.tier}
              </span>
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

      <ScrollReveal delay={0.1}>
        <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-surface p-8 text-center">
          <h3 className="font-display text-xl font-bold uppercase tracking-tight text-aces-navy">
            Become an ACES Nationals partner
          </h3>
          <p className="max-w-2xl text-sm text-aces-muted">
            Put your brand in front of 400+ elite junior teams and thousands of players, coaches and
            families from across the country. Get in touch to discuss partnership and sponsorship
            opportunities.
          </p>
          <Button href="/contact?topic=Sponsorship%20enquiries" size="lg">
            Enquire about partnership
          </Button>
        </div>
      </ScrollReveal>
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
