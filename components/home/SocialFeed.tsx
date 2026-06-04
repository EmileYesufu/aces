import { Section, SectionHeader } from "@/components/ui/Section";
import { InstagramFeed } from "@/components/social/InstagramFeed";
import { XFeed } from "@/components/social/XFeed";
import { fetchInstagramPosts } from "@/lib/instagram";
import {
  socialFeedConfig,
  instagramFallbackPosts,
} from "@/content/social-feed";

export async function SocialFeedSection() {
  const posts = await fetchInstagramPosts(
    socialFeedConfig.instagram.username,
    socialFeedConfig.instagram.postLimit
  );

  const embedUrls =
    posts.length > 0
      ? posts.map((p) => p.url)
      : instagramFallbackPosts;

  return (
    <Section className="bg-surface bg-pitch-pattern">
      <SectionHeader
        title="Follow the ACES"
        subtitle="Latest updates from Instagram and X — tournament news, highlights, and behind-the-scenes"
        centered
      />

      <div className="grid gap-12 lg:grid-cols-2">
        <InstagramFeed posts={posts} embedUrls={embedUrls} />
        <XFeed />
      </div>
    </Section>
  );
}
