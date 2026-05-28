export type TournamentVideo = {
  year: string;
  title: string;
  description: string;
  youtubeId: string;
};

/** Featured video used on homepage and as default highlight */
export const featuredVideoId = "238EECInrJA";

export const tournamentVideos: TournamentVideo[] = [
  {
    year: "2025",
    title: "2025 Tournament Video",
    description: "Highlights from the 2025 ACES Nationals tournament at Riverside Sports Complex.",
    youtubeId: "yqeb_X5F0sw",
  },
  {
    year: "2024",
    title: "2024 Tournament Video",
    description: "Relive the action from the 2024 ACES Nationals — the sixteenth anniversary tournament.",
    youtubeId: "238EECInrJA",
  },
  {
    year: "2023",
    title: "2023 Tournament Video",
    description: "Highlights from the 2023 ACES Nationals with over 340 teams in attendance.",
    youtubeId: "nM-juQe79kE",
  },
];

export function getVideoByYear(year: string) {
  return tournamentVideos.find((v) => v.year === year);
}

export function getYoutubeThumbnail(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}
