export const tournamentYear = 2027;

export const tournamentDatesConfirmed = false;

/** Set when schedule dates are confirmed, e.g. new Date("2027-05-29T09:00:00+01:00") */
export const firstFixtureDate: Date | null = null;

export const tournamentStats = [
  {
    title: "14 Age groups",
    description:
      "Upwards of 400 teams attending. Boys tournament U10 - U18. Girls tournament GU12 - GU18. Age groups relate to season 2027/28.",
  },
  {
    title: "The Country's Best Teams",
    description:
      "Teams from all over the country represent their nearest town or city all with a chance of becoming ACES National Champions",
  },
  {
    title: "Register interest!",
    description:
      "Our vision has always been about attracting the best teams to compete, to showcase talent on a national scale.",
  },
];

export const tournamentOverview = {
  title: "THE ACES NATIONALS 2027 FOOTBALL TOURNAMENT",
  paragraphs: [
    "The 19th annual ACES Nationals 2027 football tournament will be held over four weekends in May & June. An invitation only tournament open to elite junior boys and girls football teams, all in with a chance to represent their towns or cities for a shot at the prestigious ACES National title.",
    "The tournament is held at the superb facilities of the University of Nottingham's Riverside Sports complex, Lenton Lane NG7 2SA.",
    "Scouts from professional clubs across the premier, WSL and football league attend the event on the lookout for potential stars.",
    "Each year The ACES Nationals is fully sanctioned by the Football Association prior to the tournament commencing.",
    "Are you league champions or county cup winners in your town/city? Register interest below!",
  ],
};

export type ScheduleDay = {
  date: string;
  label: string;
  ageGroups: string[];
};

export const tournamentSchedule: ScheduleDay[] = [
  { date: "Coming soon", label: "Weekend 1", ageGroups: [] },
  { date: "Coming soon", label: "Weekend 2", ageGroups: [] },
  { date: "Coming soon", label: "Weekend 3", ageGroups: [] },
  { date: "Coming soon", label: "Weekend 4", ageGroups: [] },
];

export const entryCriteriaFaqs = [
  {
    question: "Can we contact the ACES team to request an entry form?",
    answer:
      "Yes. Use the contact form on our website — for example, if you're looking good to win the league or the season hasn't finished yet, get in touch and we will put you on the ACES holding list.",
  },
  {
    question: "We are looking likely to finish 2nd in our league, do we have a chance of entering?",
    answer:
      "Yes, if your champions cannot enter for any reason, then you will have the opportunity to represent your city/town.",
  },
  {
    question: "My team is not affiliated to any league, can we enter?",
    answer:
      "Unfortunately, not. Only league affiliated teams are eligible to enter. For example no representative squads are allowed. Teams are considered based on their performance for the season leading up to the tournament.",
  },
  {
    question: "Can two teams from the same city be entered in the same age group?",
    answer:
      "This can happen if: (i) They play in different leagues within a county boundary; (ii) League champions, county cup winners are from the same town/city (other local cup competitions will be considered); (iii) For any league that covers more than 5 affiliated FA regions, a team must finish in the top 5 to reach the entry criteria. If two teams from the same city are in the top five only the highest ranked team will reach the required entry criteria.",
  },
];

export const entryCriteriaList = [
  "Defending National Champions",
  "Winning the League (highest ranked division within any respective league e.g. Premier, Div1, Div A)",
  "Any league that covers more than 5 affiliated FA Regions, Aces will allow more qualification places subject to individual circumstances.",
  "County Cup",
  "Local Cup Competitions",
];

export const entryCriteriaNotes = [
  "If your league is not completed, but you are looking to be likely winners please contact us to discuss a place.",
  "Subsequently if you are interested in reserving a place but look like you will not reach the criteria for entry (all may not be lost!!!) Please contact us to register your interest to be placed on a reserve list. This can happen if we have for example last minute withdrawals etc.",
  "If a team is playing in an older age group and wish to be considered for their actual age group, they must have finished in a top four position within the league they have competed in. Note this league must the highest ranked division within any respective league.",
  "All Cities/Towns will be allowed a representative in the ACES i.e. If a team finished 5th in a multi-regional league but are deemed to be the strongest within their City/Town boundary, they will have the opportunity to request a place in the ACES if a place is available.",
  "International teams are welcome to apply to play at the ACES. Acceptance to the competition will be solely at the discretion of ACES management.",
  "On reaching the required entry criteria level the final decision on a team's entry will be solely at the discretion of ACES management.",
];

export const tournamentRules = [
  {
    title: "General tournament rules",
    content:
      "All matches are played in accordance with FA rules and regulations. The ACES Nationals is fully sanctioned by the Football Association prior to the tournament commencing each year.",
  },
  {
    title: "Team eligibility",
    content:
      "Only league affiliated teams are eligible to enter. Representative squads are not permitted. Teams must meet the published entry criteria and receive an invitation from the ACES management team.",
  },
  {
    title: "Age groups",
    content:
      "Age groups relate to the 2027/28 season. Teams must compete in their correct age group as defined by the FA. Boys tournament U10 - U18. Girls tournament GU12 - GU18.",
  },
  {
    title: "Match format",
    content:
      "Group stages followed by knockout rounds. Format varies by age group (7v7, 9v9, or 11-a-side). Full details are provided to invited teams prior to the tournament.",
  },
  {
    title: "Check-in and timings",
    content:
      "08:45 am is the latest check-in. Managers and captains must arrive promptly. A managers meeting is held at the start of each day, prior to the opening ceremony. Groups are drawn at the opening ceremony.",
  },
  {
    title: "Safeguarding",
    content:
      "The ACES Nationals operates under strict safeguarding policies. All teams must comply with FA safeguarding requirements. Full safeguarding policy available on request.",
  },
];

export type Milestone = {
  year: string;
  title: string;
  description: string;
};

export const heritageMilestones: Milestone[] = [
  {
    year: "2009",
    title: "The first ACES",
    description:
      "The inaugural tournament kicks off in Leicester with 20 league champions from 20 towns and cities competing for the national title.",
  },
  {
    year: "2015",
    title: "A girls' tournament joins",
    description:
      "Girls' age groups are added to the programme, growing the ACES into a celebration of the whole junior game.",
  },
  {
    year: "2019",
    title: "300+ teams a year",
    description:
      "Demand soars across all age groups, with the tournament settling at the superb Riverside Sports Complex in Nottingham.",
  },
  {
    year: "2027",
    title: "The 19th edition",
    description:
      "Fourteen age groups over four weekends, attracting upwards of 400 teams from across Great Britain and abroad.",
  },
];

export const aboutContent = {
  intro: [
    "The ACES team are looking forward to the 2027 Nationals and the nineteenth anniversary tournament.",
    "It seems like yesterday that we hosted the first ACES tournament way back in 2009. Little did we believe that it would grow into the national tournament that it has. Recent years have seen a great tournament with over 340 teams attending. Demand for places was high in all age groups, but particularly the Girls groups.",
    "Teams from all corners of the country attended giving them the opportunity to play against opposition they wouldn't normally get chance to meet.",
  ],
  growth: [
    "The 2027 event will once again bring together 14 age groups over four weekends, attracting upwards of 400 teams to compete from across Great Britain and abroad all looking to leave Nottingham as Nationals champions.",
    "The first ACES tournament kicked off in Leicester in 2009, hosting 20 league champions from 20 different towns and cities all competing for the National title. Now nineteen years on it has grown to be the event in junior grassroots football.",
    "The vision of the event has always been about attracting the best of the best in junior grassroots football. Because of this, teams have to be invited to the tournament specifically by the ACES Nationals team. Fully sanctioned by the Football Association, the event is an exciting date in the junior football calendar for both boys and girls teams of 14 different age groups. The youth tournament is ultimately a celebration of junior football. It's a fantastic opportunity for teams to showcase a range of young talent in an exciting battle for the ACES Nationals title.",
    "It's also a great networking tool for managers and coaches to present their teams on a national scale in a friendly and safe environment.",
  ],
};
