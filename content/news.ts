export type NewsCategory = "Tournament" | "Partnership" | "Announcement";

export type NewsPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: NewsCategory;
  image: string;
  featured?: boolean;
  content?: string;
};

export const newsPosts: NewsPost[] = [
  {
    slug: "aces-nationals-2026-dates",
    title: "ACES Nationals 2026 — Tournament Dates Announced",
    date: "2026-01-10",
    category: "Tournament",
    image: "/gallery/tournament-2024.jpg",
    featured: true,
    excerpt:
      "The 18th annual ACES Nationals will be held over four weekends in May & June 2026 at Riverside Sports Complex, Nottingham.",
    content: `The 18th annual ACES Nationals 2026 football tournament will be held over four weekends in May & June.

An invitation only tournament open to elite junior boys and girls football teams, all in with a chance to represent their towns or cities for a shot at the prestigious ACES National title.

The tournament is held at the superb facilities of the University of Nottingham's Riverside Sports complex, Lenton Lane NG7 2SA.

Are you league champions or county cup winners in your town/city? Register your interest today!`,
  },
  {
    slug: "all-your-questions-answered-2024",
    title: "All your questions answered",
    date: "2024-05-15",
    category: "Tournament",
    image: "/gallery/tournament-action-1.jpg",
    excerpt:
      "ACES Nationals 2024 – all the FAQs covered and what you can expect on the day. Timings 08.45 am is the latest check-in, so managers and captains please arrive promptly.",
    content: `ACES Nationals 2024 – all the FAQs covered and what you can expect on the day.

Timings
08.45 am is the latest check-in, so managers and captains please arrive promptly. There will be a managers meeting at the start of each day, prior to the opening ceremony. Groups are drawn at the opening ceremony, then and there.

What to bring
Ensure all players have appropriate kit, shin pads, and plenty of water. First aid facilities are available on site.

Parking
Full parking details will be sent to registered teams prior to the tournament. Please follow steward instructions on arrival.

We look forward to welcoming you to Riverside Sports Complex for another fantastic ACES Nationals tournament.`,
  },
  {
    slug: "happy-christmas",
    title: "Happy Christmas",
    date: "2024-12-20",
    category: "Announcement",
    image: "/hero.jpg",
    excerpt:
      "Seasons greetings to you all, your teams, your families and friends. We look forward to seeing you at the 2024 Nationals tournament in June.",
    content: `Seasons greetings to you all, your teams, your families and friends.

We look forward to seeing you at the 2024 Nationals tournament in June.

Andy, Dave and the ACES team`,
  },
  {
    slug: "grip-active-2024-kit-partner",
    title: "Grip Active Sports the Official 2024 ACES Kit Partner",
    date: "2024-03-10",
    category: "Partnership",
    image: "/gallery/tournament-action-2.jpg",
    excerpt:
      "We are really pleased to announce that Grip Active Sports will be the 2024 ACES Nationals official kit partner.",
    content: `We are really pleased to announce that Grip Active Sports will be the 2024 ACES Nationals official kit partner.

Great to have them onboard for the second year running and we look forward to working together following on from the success of the 2023 tournament.

The Grip Active guys will once again be present at the tournament with their full range of kit and merchandise.`,
  },
  {
    slug: "2024-tournament-dates",
    title: "2024 Tournament dates",
    date: "2024-01-15",
    category: "Tournament",
    image: "/gallery/tournament-2024.jpg",
    excerpt:
      "2024 tournament age group dates: (age relates to season 2024/2025) U9 Boys (7v7) – Saturday 8th June...",
  },
  {
    slug: "boys-u12-u16-completed",
    title: "Boys U12 & U16 age groups completed",
    date: "2023-07-20",
    category: "Tournament",
    image: "/gallery/tournament-2023.jpg",
    excerpt:
      "The two age groups which had been cut short at the semi final stages on 18th June due to thunder and lightening were completed over the weekend of the 15th & 16th July.",
  },
  {
    slug: "boys-u12-u16-suspended",
    title: "Boys U12 & U16 age groups",
    date: "2023-06-18",
    category: "Tournament",
    image: "/gallery/tournament-action-3.jpg",
    excerpt:
      "Today, at the semi final stages of both the Boys U12 and U16 age groups we had to suspend play due to thunder and lightening close to the venue.",
  },
  {
    slug: "all-your-questions-answered-2023",
    title: "All your questions answered",
    date: "2023-05-20",
    category: "Tournament",
    image: "/gallery/tournament-action-1.jpg",
    excerpt:
      "ACES Nationals 2023 – all the FAQs covered and what you can expect on the day.",
  },
  {
    slug: "grip-active-2023-kit-partner",
    title: "Grip Active our new 2023 Official Kit Partner",
    date: "2023-03-01",
    category: "Partnership",
    image: "/gallery/tournament-action-2.jpg",
    excerpt:
      "We are pleased to announce that the London based company Grip Active Sports are to be the 2023 tournament Official Kit Partner.",
  },
  {
    slug: "2023-aces-merchandise",
    title: "2023 ACES Merchandise",
    date: "2023-02-15",
    category: "Announcement",
    image: "/hero.jpg",
    excerpt:
      "We are really pleased to announce that we have teamed up with Kitlocker to launch a range of ACES 2023 branded merchandise.",
  },
  {
    slug: "soccer-assist-partnership",
    title: "Welcome Soccer Assist our new ACES partner",
    date: "2023-01-20",
    category: "Partnership",
    image: "/partners/soccer-assist.png",
    excerpt:
      "We are pleased to announce a brand new partnership with Soccer Assist.",
  },
  {
    slug: "2022-tournament-video",
    title: "2022 ACES tournament video",
    date: "2022-08-01",
    category: "Announcement",
    image: "/gallery/tournament-2023.jpg",
    excerpt:
      "This is what the 2022 tournament was all about!! Interested in entering the 2023 tournament? Get in touch",
  },
];

export function getNewsPost(slug: string) {
  return newsPosts.find((p) => p.slug === slug);
}

export function getFeaturedPost() {
  return newsPosts.find((p) => p.featured) ?? newsPosts[0];
}

const categoryColors: Record<NewsCategory, string> = {
  Tournament: "bg-aces-navy text-white",
  Partnership: "bg-aces-red text-white",
  Announcement: "bg-gray-600 text-white",
};

export function getCategoryColor(category: NewsCategory) {
  return categoryColors[category];
}
