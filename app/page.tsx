import { Hero } from "@/components/home/Hero";
import { LiveBanner } from "@/components/home/LiveBanner";
import { CredibilityStrip } from "@/components/home/CredibilityStrip";
import { StatsGrid } from "@/components/home/StatsGrid";
import { TournamentOverview } from "@/components/home/TournamentOverview";
import { Partners, VideoSection } from "@/components/home/Partners";
import { EntryJourney } from "@/components/home/EntryJourney";
import { HallOfFameSpotlight } from "@/components/home/HallOfFameSpotlight";
import { TeamsAttending } from "@/components/home/TeamsAttending";
import { Testimonials } from "@/components/home/Testimonials";
import { NewsHighlights } from "@/components/home/NewsHighlights";
import { SocialFeedSection } from "@/components/home/SocialFeed";
import { CTABanner } from "@/components/ui/CTABanner";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function HomePage() {
  return (
    <>
      <LiveBanner />
      <Hero />
      <CredibilityStrip />
      <StatsGrid />
      <TournamentOverview />
      <VideoSection />
      <EntryJourney />
      <HallOfFameSpotlight />
      <NewsHighlights />
      <Testimonials />
      <TeamsAttending />
      <Partners />
      <SocialFeedSection />
      <ScrollReveal>
        <CTABanner />
      </ScrollReveal>
    </>
  );
}
