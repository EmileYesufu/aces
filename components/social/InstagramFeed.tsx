"use client";

import { InstagramIcon } from "@/components/ui/SocialIcons";
import { SocialProfileEmbed } from "@/components/social/SocialProfileEmbed";
import { socialFeedConfig } from "@/content/social-feed";

export function InstagramFeed() {
  const { instagram } = socialFeedConfig;

  return (
    <SocialProfileEmbed
      platform="Instagram"
      displayName={instagram.displayName}
      profileUrl={instagram.profileUrl}
      embedUrl={instagram.embedUrl}
      embedHeight={instagram.embedHeight}
      icon={<InstagramIcon className="h-5 w-5 text-white" />}
      iconClassName="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"
    />
  );
}
