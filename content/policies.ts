export type Policy = {
  slug: string;
  title: string;
  sections: { heading: string; content: string }[];
};

export const policies: Policy[] = [
  {
    slug: "lost-child-procedure",
    title: "Lost Child Procedure",
    sections: [
      {
        heading: "Purpose",
        content:
          "This procedure ensures the safe and swift reunification of any child separated from their team or guardian during the ACES Nationals tournament.",
      },
      {
        heading: "Reporting",
        content:
          "Any lost child must be reported immediately to the nearest steward or tournament control point. All team managers should ensure players know the designated meeting points.",
      },
      {
        heading: "Response",
        content:
          "Tournament staff will coordinate a search of the venue and notify the child's team manager and guardian. If the child is not located within 15 minutes, local police will be contacted.",
      },
    ],
  },
  {
    slug: "risk-assessment",
    title: "Risk Assessment",
    sections: [
      {
        heading: "Overview",
        content:
          "A comprehensive risk assessment is conducted prior to each ACES Nationals tournament covering all aspects of the event at Riverside Sports Complex.",
      },
      {
        heading: "Key areas assessed",
        content:
          "Pitch conditions, spectator areas, parking, first aid provision, weather contingencies, and safeguarding measures are all reviewed and documented.",
      },
      {
        heading: "Review",
        content:
          "Risk assessments are reviewed annually and updated in response to any incidents or changes to venue layout or tournament format.",
      },
    ],
  },
  {
    slug: "safeguarding",
    title: "Safeguarding Policy & Procedures",
    sections: [
      {
        heading: "Commitment",
        content:
          "The ACES Nationals is committed to safeguarding and promoting the welfare of all children and young people participating in the tournament.",
      },
      {
        heading: "Requirements",
        content:
          "All teams must comply with FA safeguarding requirements. DBS-checked coaches and designated safeguarding officers must be present for each team.",
      },
      {
        heading: "Reporting concerns",
        content:
          "Any safeguarding concerns should be reported immediately to the ACES safeguarding lead or via the contact details provided at tournament registration.",
      },
    ],
  },
  {
    slug: "complaints",
    title: "Complaints Procedure",
    sections: [
      {
        heading: "How to complain",
        content:
          "Complaints should be submitted in writing to info@acesfootball.co.uk within 14 days of the incident. Include your team name, age group, and a detailed description of the complaint.",
      },
      {
        heading: "Investigation",
        content:
          "All complaints are acknowledged within 5 working days and investigated by the ACES management team. A written response will be provided within 28 days.",
      },
      {
        heading: "Appeals",
        content:
          "If you are dissatisfied with the outcome, you may request a review by writing to the ACES directors within 14 days of receiving the initial response.",
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms and Conditions",
    sections: [
      {
        heading: "Entry",
        content:
          "Entry to the ACES Nationals is by invitation only. Teams must meet the published entry criteria. The ACES management team reserves the right to accept or decline any entry at its discretion.",
      },
      {
        heading: "Conduct",
        content:
          "All participants, coaches, and spectators must conduct themselves in accordance with FA codes of conduct. The ACES reserves the right to remove any individual or team for misconduct.",
      },
      {
        heading: "Liability",
        content:
          "The ACES Nationals accepts no liability for injury, loss, or damage except where required by law. Teams are responsible for their own insurance arrangements.",
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy and cookie policy",
    sections: [
      {
        heading: "Data collection",
        content:
          "We collect personal information when you register interest, contact us, or use our website. This may include name, email, phone number, and team details.",
      },
      {
        heading: "Use of data",
        content:
          "Your data is used to process tournament entries, communicate about the event, and improve our services. We do not sell your personal information to third parties.",
      },
      {
        heading: "Cookies",
        content:
          "Our website uses cookies to improve your browsing experience and analyse site traffic. You can manage cookie preferences through your browser settings.",
      },
    ],
  },
];

export function getPolicy(slug: string) {
  return policies.find((p) => p.slug === slug);
}

export const policySlugs = policies.map((p) => p.slug);
