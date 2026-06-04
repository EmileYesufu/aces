"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { InstagramEmbedGrid } from "@/components/social/InstagramEmbedGrid";
import { socialFeedConfig } from "@/content/social-feed";
import type { InstagramPost } from "@/lib/instagram";

type InstagramFeedProps = {
  posts: InstagramPost[];
  embedUrls: string[];
};

export function InstagramFeed({ posts, embedUrls }: InstagramFeedProps) {
  const { instagram } = socialFeedConfig;
  const postsWithImages = posts.filter((p) => p.thumbnail);

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

      {postsWithImages.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {postsWithImages.map((post) => (
            <Link
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-aces-red/30 hover:shadow-md"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Image
                  src={post.thumbnail}
                  alt={post.caption.slice(0, 100) || "Instagram post from ACES Nationals"}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-aces-navy/0 transition-colors group-hover:bg-aces-navy/20" />
              </div>
              {post.caption && (
                <div className="p-4">
                  <p className="line-clamp-3 text-sm text-aces-muted">{post.caption}</p>
                </div>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <InstagramEmbedGrid postUrls={embedUrls} />
      )}
    </div>
  );
}
