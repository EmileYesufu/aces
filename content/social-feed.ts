export const socialFeedConfig = {
  instagram: {
    username: "acesnationals",
    profileUrl: "https://www.instagram.com/acesnationals/",
    displayName: "@acesnationals",
    /** Official Instagram profile embed — live posts from Instagram */
    embedUrl: "https://www.instagram.com/acesnationals/embed",
    embedHeight: 560,
  },
  x: {
    username: "acesfootballuk",
    profileUrl: "https://x.com/acesfootballuk",
    displayName: "@acesfootballuk",
    /** Official X syndication timeline — live posts from X */
    embedUrl:
      "https://syndication.twitter.com/srv/timeline-profile/screen-name/acesfootballuk?showHeader=false&showReplies=false&showBorder=false&transparent=true&theme=light",
    embedHeight: 520,
  },
} as const;
