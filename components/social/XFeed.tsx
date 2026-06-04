"use client";

import { TwitterTimeline } from "@/components/social/TwitterTimeline";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { socialFeedConfig } from "@/content/social-feed";
import { XIcon } from "@/components/ui/SocialIcons";
import { LazyMount } from "@/components/ui/LazyMount";

export function XFeed() {
  const { x } = socialFeedConfig;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black">
            <XIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold uppercase text-aces-navy">X</h3>
            <p className="text-sm text-aces-muted">{x.displayName}</p>
          </div>
        </div>
        <Link
          href={x.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-semibold text-aces-red hover:underline"
        >
          Follow
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <LazyMount minHeight={x.timelineHeight}>
          <TwitterTimeline
            screenName={x.username}
            height={x.timelineHeight}
            chrome="noheader nofooter transparent"
            tweetLimit={5}
          />
        </LazyMount>
      </div>
    </div>
  );
}
