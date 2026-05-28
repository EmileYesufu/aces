import { Hero } from "@/components/home/Hero";
import { CredibilityStrip } from "@/components/home/CredibilityStrip";
import { StatsGrid } from "@/components/home/StatsGrid";
import { TournamentOverview } from "@/components/home/TournamentOverview";
import { Partners, VideoSection } from "@/components/home/Partners";
import { Gallery } from "@/components/home/Gallery";
import { EntryJourney } from "@/components/home/EntryJourney";
import { HallOfFameSpotlight } from "@/components/home/HallOfFameSpotlight";
import { Testimonials } from "@/components/home/Testimonials";
import { SocialFeedSection } from "@/components/home/SocialFeed";
import { CTABanner } from "@/components/ui/CTABanner";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CredibilityStrip />
      <StatsGrid />
      <TournamentOverview />
      <VideoSection />
      <Gallery />
      <EntryJourney />
      <HallOfFameSpotlight />
      <Partners />
      <Testimonials />
      <SocialFeedSection />
      <ScrollReveal>
        <CTABanner />
      </ScrollReveal>
    </>
  );
}
