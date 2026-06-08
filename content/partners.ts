export type Partner = {
  name: string;
  href: string;
  description: string;
  logo?: string;
  tier: string;
};

export const partners: Partner[] = [
  {
    name: "Soccer Assist",
    href: "https://soccer-assist.co.uk/scholarships/",
    description: "U.S College Soccer Scholarship agency providing opportunities worldwide.",
    logo: "/partners/soccer-assist.png",
    tier: "Headline Partner",
  },
  {
    name: "University of Nottingham Sport",
    href: "https://www.nottingham.ac.uk/sport/",
    description: "Host venue at the Riverside Sports Complex.",
    logo: "/partners/uon-sport.png",
    tier: "Venue Partner",
  },
  {
    name: "Veo",
    href: "https://www.veo.co",
    description: "Official video partner for tournament coverage.",
    logo: "/partners/veo.svg",
    tier: "Official Video Partner",
  },
];
