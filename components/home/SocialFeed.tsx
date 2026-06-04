import { Section, SectionHeader } from "@/components/ui/Section";
import { InstagramFeed } from "@/components/social/InstagramFeed";
import { XFeed } from "@/components/social/XFeed";
import { fetchInstagramPosts } from "@/lib/instagram";
import { socialFeedConfig, instagramStaticPosts } from "@/content/social-feed";
import type { InstagramPost } from "@/lib/instagram";

function mergeInstagramPosts(live: InstagramPost[]): InstagramPost[] {
  if (live.length === 0) return instagramStaticPosts;

  const liveWithImages = live.filter((p) => p.thumbnail);
  if (liveWithImages.length >= socialFeedConfig.instagram.postLimit) {
    return liveWithImages.slice(0, socialFeedConfig.instagram.postLimit);
  }

  const seen = new Set(liveWithImages.map((p) => p.id));
  const merged = [...liveWithImages];
  for (const post of instagramStaticPosts) {
    if (merged.length >= socialFeedConfig.instagram.postLimit) break;
    if (!seen.has(post.id)) merged.push(post);
  }
  return merged;
}

export async function SocialFeedSection() {
  const live = await fetchInstagramPosts(
    socialFeedConfig.instagram.username,
    socialFeedConfig.instagram.postLimit
  );
  const posts = mergeInstagramPosts(live);

  return (
    <Section className="bg-surface bg-pitch-pattern">
      <SectionHeader
        title="Follow the ACES"
        subtitle="Latest updates from Instagram and X — tournament news, highlights, and behind-the-scenes"
        centered
      />

      <div className="grid gap-12 lg:grid-cols-2">
        <InstagramFeed posts={posts} />
        <XFeed />
      </div>
    </Section>
  );
}
