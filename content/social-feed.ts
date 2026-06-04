import type { InstagramPost } from "@/lib/instagram";

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

/** Cached thumbnails in /public/social/instagram — run scripts/scrape-instagram-posts.mjs to refresh */
export const instagramStaticPosts: InstagramPost[] = [
  {
    id: "DY4ydauIPc-",
    url: "https://www.instagram.com/p/DY4ydauIPc-/",
    thumbnail: "/social/instagram/DY4ydauIPc-.jpg",
    caption: "TWO DAYS",
    timestamp: 0,
  },
  {
    id: "DYzdnSwoQmL",
    url: "https://www.instagram.com/p/DYzdnSwoQmL/",
    thumbnail: "/social/instagram/DYzdnSwoQmL.jpg",
    caption: "FOUR DAYS",
    timestamp: 0,
  },
  {
    id: "DYuM9W6IjRU",
    url: "https://www.instagram.com/p/DYuM9W6IjRU/",
    thumbnail: "/social/instagram/DYuM9W6IjRU.jpg",
    caption: "SIX DAYS",
    timestamp: 0,
  },
  {
    id: "DYrMxXPo2gH",
    url: "https://www.instagram.com/p/DYrMxXPo2gH/",
    thumbnail: "/social/instagram/DYrMxXPo2gH.jpg",
    caption: "7 Days",
    timestamp: 0,
  },
  {
    id: "DYaB7dyIhP7",
    url: "https://www.instagram.com/p/DYaB7dyIhP7/",
    thumbnail: "/social/instagram/DYaB7dyIhP7.jpg",
    caption: "The countdown continues — 2 weeks",
    timestamp: 0,
  },
  {
    id: "DYUUQZYILSk",
    url: "https://www.instagram.com/p/DYUUQZYILSk/",
    thumbnail: "/social/instagram/DYUUQZYILSk.jpg",
    caption: "Who's excited to see @iamkingrezz perform at the ACES this year?",
    timestamp: 0,
  },
];
