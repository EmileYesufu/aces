# ACES Nationals Football Tournament

Modern mockup website for [ACES Football](https://acesfootball.co.uk/) — the country's premier invitation-only junior football tournament.

Built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**.

## Prerequisites

- [Node.js](https://nodejs.org/) 20 or later
- npm (included with Node.js)
- Git

## Run the site locally

From the project root:

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The dev server reloads when you save files.

### Production build (optional)

To preview the production build locally:

```bash
npm run build
npm start
```

Then open [http://localhost:3000](http://localhost:3000). Use `Ctrl+C` in the terminal to stop the server.

### Lint

```bash
npm run lint
```

## Push to GitHub

If this is your first push from a new clone:

```bash
git add .
git commit -m "Your commit message"
git push -u origin main
```

For later changes:

```bash
git add .
git commit -m "Describe your changes"
git push
```

Remote: `https://github.com/EmileYesufu/aces.git`

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, credibility strip, schedule, experience, entry path, Hall of Fame, social, partners |
| `/tournament` | 2026 tournament overview |
| `/tournament/register` | Register interest form (UI mockup) |
| `/tournament/entry-criteria` | Entry criteria and FAQs |
| `/tournament/rules` | Tournament rules |
| `/tournament/about` | About ACES Nationals and heritage timeline |
| `/news` | News listing |
| `/news/[slug]` | News article detail |
| `/videos` | Tournament video hub |
| `/videos/[year]` | Individual video embed (2022–2025) |
| `/hall-of-fame` | Winners archive 2009–2025 (filterable) |
| `/shop` | ACES Shop — 28 products from Grip Active partner store |
| `/contact` | Enquiry form and venue map |
| `/policies/[slug]` | Policy documents |

## Content

Static content lives in `content/` — tournament dates, Hall of Fame data, news posts, policies, and site config. Update these files to change copy without touching components.

## Brand colours

- ACES Red: `#b5162c` / `#d30f29`
- ACES Navy: `#002237`
- ACES Gold: `#c8a24a` (champions / prestige moments)
- Display font: Oswald (headings) · Body: Inter

## Visual features

- Hero with live countdown to the first 2026 fixture (May 30)
- Credibility strip, schedule with boys/girls filter and ICS downloads
- "A Day at the ACES" video + captioned gallery with accessible lightbox
- Entry journey section and accessible multi-step register form
- Hall of Fame champion spotlight and mobile-friendly year pills
- Testimonials carousel with pause control
- Live Instagram profile embed from [@acesnationals](https://www.instagram.com/acesnationals/)
- Scroll animations, mobile sticky CTA bar, sitemap/robots, and Event JSON-LD

## Notes

- Register Interest form validates client-side and shows a success message — no backend submission.
- Tournament video IDs (YouTube + Vimeo) are in `content/videos.ts`; re-scrape with `node scripts/scrape-tournament-videos.mjs`.
- Shop page lists official Grip Active ACES merchandise with prices and links to checkout.