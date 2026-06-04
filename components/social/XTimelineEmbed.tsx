"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

type XTimelineEmbedProps = {
  screenName: string;
  profileUrl: string;
  height?: number;
};

/**
 * X profile timeline via official syndication iframe.
 * More reliable than widgets.js (which is often blocked by ad blockers).
 */
export function XTimelineEmbed({ screenName, profileUrl, height = 520 }: XTimelineEmbedProps) {
  const src = `/api/x-timeline?screenName=${encodeURIComponent(screenName)}`;

  return (
    <div className="flex flex-col">
      <iframe
        src={src}
        title={`Recent posts from @${screenName} on X`}
        height={height}
        className="w-full border-0 bg-white"
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <p className="border-t border-gray-100 bg-gray-50 px-4 py-2 text-center text-xs text-aces-muted">
        If the timeline is empty, your browser may be blocking X embeds.{" "}
        <Link href={profileUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-aces-red hover:underline">
          Open @{screenName} on X
        </Link>
      </p>
      <Link
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-white px-4 py-3 text-sm font-semibold text-aces-red hover:bg-gray-50"
      >
        View all posts on X
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
