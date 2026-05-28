"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

type YouTubeEmbedProps = {
  id: string;
  title: string;
  className?: string;
};

/** Click-to-load YouTube facade — defers the iframe/player JS until the user opts in. */
export function YouTubeEmbed({ id, title, className }: YouTubeEmbedProps) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${id}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={className ?? "h-full w-full"}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className="group relative block h-full w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aces-red"
      aria-label={`Play video: ${title}`}
    >
      <Image
        src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <span className="absolute inset-0 bg-aces-navy/30 transition-colors group-hover:bg-aces-navy/20" />
      <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-aces-red text-white shadow-lg transition-transform group-hover:scale-110">
        <Play className="h-7 w-7 translate-x-0.5 fill-current" aria-hidden="true" />
      </span>
    </button>
  );
}
