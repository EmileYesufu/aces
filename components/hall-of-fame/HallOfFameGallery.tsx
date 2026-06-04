"use client";

import Image from "next/image";

type HallOfFameGalleryProps = {
  year: number;
  photos: string[];
};

export function HallOfFameGallery({ year, photos }: HallOfFameGalleryProps) {
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
