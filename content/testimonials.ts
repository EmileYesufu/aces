export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  club: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "The ACES Nationals is the pinnacle of junior grassroots football. Our lads got to test themselves against the best teams in the country — an experience they'll never forget.",
    author: "Team Manager",
    role: "U14 Boys",
    club: "Northampton",
  },
  {
    quote:
      "From the opening ceremony to the final whistle, the organisation is first class. Riverside is a superb venue and the atmosphere is electric.",
    author: "Club Secretary",
    role: "GU15 Girls",
    club: "Cambridge",
  },
  {
    quote:
      "We've been coming for three years now. The standard of football keeps rising and the scouts on the touchline make it feel truly special for the players.",
    author: "Head Coach",
    role: "U16 Boys",
    club: "Walsall",
  },
];
