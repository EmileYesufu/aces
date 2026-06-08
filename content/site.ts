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
  "Register interest",
  "Shop / kit orders",
  "Complaint",
  "Other",
] as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "2026 Tournament",
    href: "/tournament",
    children: [
      { label: "The 2026 Tournament", href: "/tournament" },
      { label: "Entry Criteria", href: "/tournament/entry-criteria" },
      { label: "Rules", href: "/tournament/rules" },
      { label: "About us", href: "/tournament/about" },
    ],
  },
  { label: "News", href: "/news" },
  {
    label: "Tournament Videos",
    href: "/videos",
    children: [
      { label: "2025 Tournament Video", href: "/videos/2025" },
      { label: "2024 Tournament Video", href: "/videos/2024" },
      { label: "2023 Tournament Video", href: "/videos/2023" },
      { label: "2022 Tournament Video", href: "/videos/2022" },
    ],
  },
  { label: "Hall of Fame", href: "/hall-of-fame" },
  { label: "2026 Gallery", href: "/gallery" },
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
