"use client";

import { XIcon } from "@/components/ui/SocialIcons";
import { SocialProfileEmbed } from "@/components/social/SocialProfileEmbed";
import { socialFeedConfig } from "@/content/social-feed";

export function XFeed() {
  const { x } = socialFeedConfig;

  return (
    <SocialProfileEmbed
      platform="X"
      displayName={x.displayName}
      profileUrl={x.profileUrl}
      embedUrl={x.embedUrl}
      embedHeight={x.embedHeight}
      icon={<XIcon className="h-5 w-5 text-white" />}
      iconClassName="bg-black"
    />
  );
}
