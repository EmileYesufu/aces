"use client";

import Image from "next/image";
import type { Winner } from "@/content/hall-of-fame";
import { Medal } from "lucide-react";

type HallOfFameGalleryProps = {
  year: number;
  winners?: Winner[];
  photos?: string[];
  labeled: boolean;
};

export function HallOfFameGallery({ year, winners = [], photos = [], labeled }: HallOfFameGalleryProps) {
  const labeledWinners = winners.filter((w) => w.photo);

  if (labeled) {
    if (labeledWinners.length === 0) return null;

    return (
      <div className="mb-10">
        <h3 className="mb-4 font-display text-lg font-bold uppercase text-aces-navy">
          {year} Champions Gallery
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {labeledWinners.map((winner) => (
            <figure
              key={`${winner.ageGroup}-${winner.team}`}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image
                  src={winner.photo!}
                  alt={`${winner.team} — ${winner.ageGroup} ${year} champions`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
              <figcaption className="space-y-0.5 p-3">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-aces-red">
                  <Medal className="h-3 w-3 shrink-0" aria-hidden="true" />
                  {winner.ageGroup}
                </p>
                <p className="line-clamp-2 text-sm font-semibold text-aces-navy">{winner.team}</p>
                <p className="text-xs text-aces-muted">{winner.town}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    );
  }

  if (photos.length === 0) return null;

  return (
    <div className="mb-10">
      <h3 className="mb-2 font-display text-lg font-bold uppercase text-aces-navy">
        {year} Tournament Photos
      </h3>
      <p className="mb-4 text-sm text-aces-muted">
        Photos from the {year} ACES Nationals. Champion teams are listed in the table below — images
        are not labelled by team.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {photos.map((src, index) => (
          <figure
            key={src}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="relative aspect-[4/3] bg-gray-100">
              <Image
                src={src}
                alt={`ACES Nationals ${year}, photo ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}
