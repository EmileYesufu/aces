export type VideoProvider = "youtube" | "vimeo";

export type TournamentVideo = {
  year: string;
  title: string;
  description: string;
  provider: VideoProvider;
  videoId: string;
};

/** Homepage “A Day at the ACES” — matches acesfootball.co.uk homepage embed */
export const featuredVideo = {
  provider: "youtube" as const,
  videoId: "vgplbpfPUS4",
  title: "A Day at the ACES",
};

/** @deprecated Use featuredVideo.videoId */
export const featuredVideoId = featuredVideo.videoId;

/** Scraped from acesfootball.co.uk/{year}-tournament-video/ */
export const tournamentVideos: TournamentVideo[] = [
  // Add 2026 when published at acesfootball.co.uk/2026-tournament-video/
  // Run: node scripts/scrape-tournament-videos.mjs
  // Then add nav entry in content/site.ts
  {
    year: "2025",
    title: "ACES National 2025",
    description: "Official highlights from the 2025 ACES Nationals tournament.",
    provider: "vimeo",
    videoId: "1126324139",
  },
  {
    year: "2024",
    title: "ACES Nationals 2024",
    description: "Relive the action from the 2024 ACES Nationals — the sixteenth anniversary tournament.",
    provider: "youtube",
    videoId: "vgplbpfPUS4",
  },
  {
    year: "2023",
    title: "Aces Nationals 2023",
    description: "Highlights from the 2023 ACES Nationals with over 340 teams in attendance.",
    provider: "youtube",
    videoId: "wZIDcfblAVk",
  },
  {
    year: "2022",
    title: "ACES 2022",
    description: "This is what the 2022 tournament was all about — relive the ACES Nationals action.",
    provider: "youtube",
    videoId: "Ct2tWy7PJrg",
  },
];

export function getVideoByYear(year: string) {
  return tournamentVideos.find((v) => v.year === year);
}

export function getVideoThumbnail(video: Pick<TournamentVideo, "provider" | "videoId">) {
  if (video.provider === "vimeo") {
    return `https://vumbnail.com/${video.videoId}.jpg`;
  }
  return `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;
}
