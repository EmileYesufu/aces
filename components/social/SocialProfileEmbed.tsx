"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

type SocialProfileEmbedProps = {
  platform: string;
  displayName: string;
  profileUrl: string;
  embedUrl: string;
  embedHeight: number;
  icon: React.ReactNode;
  iconClassName?: string;
};

/** Official social profile embed iframe — content stays up to date from the platform. */
export function SocialProfileEmbed({
  platform,
  displayName,
  profileUrl,
  embedUrl,
  embedHeight,
  icon,
  iconClassName,
}: SocialProfileEmbedProps) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconClassName ?? "bg-gray-900"}`}
          >
            {icon}
          </div>
          <div>
            <h3 className="font-display text-lg font-bold uppercase text-aces-navy">{platform}</h3>
            <p className="text-sm text-aces-muted">{displayName}</p>
          </div>
        </div>
        <Link
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-semibold text-aces-red hover:underline"
        >
          Follow
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <iframe
          src={embedUrl}
          title={`${displayName} on ${platform}`}
          height={embedHeight}
          className="w-full border-0"
          loading="lazy"
          allow="encrypted-media; clipboard-write"
        />
        <Link
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border-t border-gray-100 bg-gray-50 px-4 py-3 text-sm font-semibold text-aces-red hover:bg-gray-100"
        >
          View latest on {platform}
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
