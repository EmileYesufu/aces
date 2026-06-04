import { Section, SectionHeader } from "@/components/ui/Section";
import { InstagramFeed } from "@/components/social/InstagramFeed";
import { XFeed } from "@/components/social/XFeed";

export function SocialFeedSection() {
  return (
    <Section className="bg-surface bg-pitch-pattern">
      <SectionHeader
        title="Follow the ACES"
        subtitle="Live feeds from Instagram and X — always up to date from each platform"
        centered
      />

      <div className="grid gap-12 lg:grid-cols-2">
        <InstagramFeed />
        <XFeed />
      </div>
    </Section>
  );
}
