import { Section, SectionHeader } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { InstagramFeed } from "@/components/social/InstagramFeed";
import { XFeed } from "@/components/social/XFeed";
import { fetchInstagramPosts } from "@/lib/instagram";
import {
  socialFeedConfig,
  instagramFallbackPosts,
} from "@/content/social-feed";
import type { InstagramPost } from "@/lib/instagram";

async function getInstagramPosts(): Promise<InstagramPost[]> {
  const posts = await fetchInstagramPosts(
    socialFeedConfig.instagram.username,
    socialFeedConfig.instagram.postLimit
  );

  if (posts.length > 0) return posts;

  return instagramFallbackPosts.map((url, i) => ({
    id: `fallback-${i}`,
    url,
    thumbnail: "",
    caption: "",
    timestamp: 0,
  }));
}

export async function SocialFeedSection() {
  const posts = await getInstagramPosts();

  return (
    <Section className="bg-surface bg-pitch-pattern">
      <ScrollReveal>
        <SectionHeader
          title="Follow the ACES"
          subtitle="Latest updates from Instagram and X — tournament news, highlights, and behind-the-scenes"
          centered
        />
      </ScrollReveal>

      <div className="grid gap-12 lg:grid-cols-2">
        <ScrollReveal delay={0.1}>
          <InstagramFeed posts={posts} />
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <XFeed />
        </ScrollReveal>
      </div>
    </Section>
  );
}
