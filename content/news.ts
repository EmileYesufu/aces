export type NewsArticle = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  body: string[];
};

/** Newest first. Add new articles to the top. */
export const newsArticles: NewsArticle[] = [
  {
    slug: "2027-nationals-registration-open",
    title: "Register your interest for the 2027 ACES Nationals",
    date: "2026-06-01",
    category: "Entry",
    excerpt:
      "The holding list for the 19th ACES Nationals is now open. League champions, county cup winners and defending champions are invited to register their interest.",
    body: [
      "Planning for the 19th annual ACES Nationals is underway, and we are now taking expressions of interest for the 2027 tournament at the University of Nottingham's Riverside Sports Complex.",
      "Entry is invitation only. If your team are league champions, county cup winners or defending ACES National Champions, we encourage you to register early to secure a place on the holding list.",
      "If your season is still in progress, get in touch anyway — teams looking likely to finish as champions can be added to the holding list ahead of confirmation.",
      "Use the contact form to tell us about your team, your city or town, and your age group, and the ACES team will be in touch.",
    ],
  },
  {
    slug: "2027-dates-coming-soon",
    title: "2027 tournament dates to be confirmed",
    date: "2026-05-20",
    category: "Tournament",
    excerpt:
      "The 2027 ACES Nationals will once again run across four weekends in May and June. Exact dates and the weekend age-group split will be published soon.",
    body: [
      "The 2027 ACES Nationals will be held over four weekends in May and June, following the format that has made the tournament the highlight of the junior grassroots calendar.",
      "We are finalising the schedule with the venue and the Football Association, and will publish confirmed dates and the age-group allocation for each weekend as soon as they are locked in.",
      "Keep an eye on this page and our social channels for the announcement, and register your interest now so you don't miss out when invitations go out.",
    ],
  },
  {
    slug: "celebrating-junior-grassroots-football",
    title: "What makes the ACES Nationals special",
    date: "2026-05-05",
    category: "About",
    excerpt:
      "From 20 teams in Leicester in 2009 to over 400 teams from across Great Britain and abroad, the ACES Nationals has become the event in junior grassroots football.",
    body: [
      "Since the first tournament kicked off in Leicester in 2009, the ACES Nationals has grown into the country's premier invitation-only junior football tournament.",
      "Each year the very best league champions and cup winners from towns and cities across the country come together to compete for the prestigious ACES National title, watched by scouts from Premier League, WSL and Football League clubs.",
      "It is ultimately a celebration of junior football — a fantastic opportunity for teams to showcase their talent on a national stage in a friendly and safe environment.",
    ],
  },
];

export const newsSlugs = newsArticles.map((a) => a.slug);

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}

export function getLatestNews(count: number): NewsArticle[] {
  return [...newsArticles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export function formatNewsDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
