import { Section, SectionHeader } from "@/components/ui/Section";
import { InstagramFeed } from "@/components/social/InstagramFeed";

export function SocialFeedSection() {
  return (
    <Section className="bg-surface bg-pitch-pattern">
      <SectionHeader
        title="Follow the ACES"
        subtitle="Live updates from Instagram — tournament news, highlights, and behind-the-scenes"
        centered
      />

      <div className="mx-auto max-w-2xl">
        <InstagramFeed />
      </div>
    </Section>
  );
}
