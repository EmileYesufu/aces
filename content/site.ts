export const siteConfig = {
  name: "ACES Nationals Football Tournament",
  tagline: "Play The Best",
  description:
    "The ACES Nationals is an invitation-only junior football tournament bringing elite boys and girls teams from across the country to Nottingham.",
  url: "https://acesfootball.co.uk",
  contact: {
    address: "Riverside Sports Complex, Trent Side, Nottingham, NG7 2SA",
    venue: "University of Nottingham's Riverside Sports Complex, Lenton Lane NG7 2SA",
  },
  social: {
    instagram: "https://www.instagram.com/acesnationals/",
    youtube: "https://www.youtube.com/channel/UCVYKAiI6Pm7USGyjpUyetXw",
    facebook: "https://www.facebook.com/acesnationals/?locale=en_GB",
  },
} as const;

export const enquiryTopics = [
  "General enquiry",
  "Tournament entry",
  "Sponsorship enquiries",
  "Complaint",
  "Other",
] as const;

export const tournamentEntryTopic = "Tournament entry" as const;

export function requiresTeamDetails(topic: string): boolean {
  return topic === tournamentEntryTopic || topic.toLowerCase() === "register interest";
}

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "2027 Tournament",
    href: "/tournament",
    children: [
      { label: "The 2027 Tournament", href: "/tournament" },
      { label: "Entry Criteria", href: "/tournament/entry-criteria" },
      { label: "Rules", href: "/tournament/rules" },
      { label: "About us", href: "/tournament/about" },
    ],
  },
  {
    label: "Tournament Videos",
    href: "/videos",
    children: [
      // Add { label: "2026 Tournament Video", href: "/videos/2026" } when published — see content/videos.ts
      { label: "2025 Tournament Video", href: "/videos/2025" },
      { label: "2024 Tournament Video", href: "/videos/2024" },
      { label: "2023 Tournament Video", href: "/videos/2023" },
      { label: "2022 Tournament Video", href: "/videos/2022" },
    ],
  },
  { label: "Hall of Fame", href: "/hall-of-fame" },
  { label: "Gallery", href: "/gallery" },
  { label: "ACES Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
];

export const policyLinks = [
  { label: "Lost Child Procedure", slug: "lost-child-procedure" },
  { label: "Risk Assessment", slug: "risk-assessment" },
  { label: "Safeguarding Policy & Procedures", slug: "safeguarding" },
  { label: "Complaints Procedure", slug: "complaints" },
  { label: "Terms and Conditions", slug: "terms" },
  { label: "Privacy and cookie policy", slug: "privacy" },
];

export const footerNav = mainNav;
