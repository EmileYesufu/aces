"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { socialFeedConfig } from "@/content/social-feed";
import type { InstagramPost } from "@/lib/instagram";

type InstagramFeedProps = {
  posts: InstagramPost[];
};

export function InstagramFeed({ posts }: InstagramFeedProps) {
  const { instagram } = socialFeedConfig;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
            <InstagramIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold uppercase text-aces-navy">Instagram</h3>
            <p className="text-sm text-aces-muted">{instagram.displayName}</p>
          </div>
        </div>
        <Link
          href={instagram.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-semibold text-aces-red hover:underline"
        >
          Follow
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 ring-1 ring-gray-200 transition-all hover:ring-aces-red/40 hover:shadow-md"
          >
            <Image
              src={post.thumbnail}
              alt={post.caption || "Instagram post from ACES Nationals"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 200px"
            />
            <div className="absolute inset-0 bg-aces-navy/0 transition-colors group-hover:bg-aces-navy/25" />
            <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 opacity-0 shadow transition-opacity group-hover:opacity-100">
              <InstagramIcon className="h-4 w-4 text-aces-navy" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
