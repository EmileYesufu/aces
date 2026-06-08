export type TournamentGalleryPhoto = {
  src: string;
  alt?: string;
  caption?: string;
};

/** Add photos to public/gallery/2026/ and list them here as the 2026 tournament progresses. */
export const tournamentGallery2026: TournamentGalleryPhoto[] = [];

export function getTournamentGalleryPhotos(): TournamentGalleryPhoto[] {
  return tournamentGallery2026;
}
