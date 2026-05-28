export const socialFeedConfig = {
  instagram: {
    username: "acesnationals",
    profileUrl: "https://www.instagram.com/acesnationals/",
    displayName: "@acesnationals",
    postLimit: 6,
  },
  x: {
    username: "acesfootballuk",
    profileUrl: "https://x.com/acesfootballuk",
    displayName: "@acesfootballuk",
    timelineHeight: 520,
  },
} as const;

/** Fallback post URLs if Instagram API is unavailable */
export const instagramFallbackPosts = [
  "https://www.instagram.com/p/DY4ydauIPc-/",
  "https://www.instagram.com/p/DYzdnSwoQmL/",
  "https://www.instagram.com/p/DYuM9W6IjRU/",
  "https://www.instagram.com/p/DYrMxXPo2gH/",
  "https://www.instagram.com/p/DYaB7dyIhP7/",
  "https://www.instagram.com/p/DYUUQZYILSk/",
];
