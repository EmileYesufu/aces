# ACES Nationals Football Tournament

Modern mockup website for [ACES Football](https://acesfootball.co.uk/) — the country's premier invitation-only junior football tournament.

Built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**.

## Branches

| Branch | Purpose |
|--------|---------|
| `main` | Live site for the **2026** tournament |
| `2027` | Staging branch for the **2027** tournament (merge to `main` when ready to go live) |

The `2027` branch points all live tournament content at `content/tournament-2027.ts`. Schedule dates show **"Coming soon"** until confirmed — then update `tournamentDatesConfirmed`, `firstFixtureDate`, and the schedule dates in that file.

### Go-live checklist (merge `2027` → `main`)

- [ ] 2027 schedule dates confirmed; countdown and calendar downloads enabled
- [ ] 2026 Hall of Fame complete (all 14 age groups + photos)
- [ ] 2026 tournament video published — add to `content/videos.ts` and nav in `content/site.ts`
- [ ] Merge `2027` → `main` and deploy
- [ ] Switch gallery to 2027 photos when available (`content/tournament-gallery.ts`, `app/gallery/page.tsx`)

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
| `/tournament` | 2027 tournament overview (on `2027` branch) |
| `/tournament/entry-criteria` | Entry criteria and FAQs |
| `/tournament/rules` | Tournament rules |
| `/tournament/about` | About ACES Nationals and heritage timeline |
| `/videos` | Tournament video hub |
| `/videos/[year]` | Individual video embed (2022–2025; 2026 when published) |
| `/hall-of-fame` | Winners archive 2009–2027 (filterable) |
| `/gallery` | 2026 tournament photo gallery (until 2027 photos are ready) |
| `/shop` | ACES Shop — 28 products from Grip Active partner store |
| `/contact` | Contact form, venue map, and social links |
| `/policies/[slug]` | Policy documents |

## Content

Static content lives in `content/` — tournament dates, Hall of Fame data, policies, and site config. Update these files to change copy without touching components.

- **Current tournament:** `content/tournament-2027.ts` (on `2027` branch)
- **Archive reference:** `content/tournament-2026.ts`

## Brand colours

- ACES Red: `#b5162c` / `#d30f29`
- ACES Navy: `#002237`
- ACES Gold: `#c8a24a` (champions / prestige moments)
- Display font: Oswald (headings) · Body: Inter

## Visual features

- Hero with countdown to first fixture (or "dates coming soon" when TBD)
- Credibility strip, schedule with boys/girls filter and ICS downloads (when dates confirmed)
- "A Day at the ACES" video section
- Entry journey section and contact form for registering interest
- Hall of Fame champion spotlight and mobile-friendly year pills
- Live Instagram profile embed from [@acesnationals](https://www.instagram.com/acesnationals/)
- Scroll animations, mobile sticky CTA bar, sitemap/robots, and Event JSON-LD

## Notes

- Contact form submits via Web3Forms — set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env` (see `.env.example`).
- Tournament video IDs (YouTube + Vimeo) are in `content/videos.ts`; re-scrape with `node scripts/scrape-tournament-videos.mjs`.
- Hall of Fame photos: `node scripts/scrape-hall-of-fame.mjs` (2026 uses labelled age-group photos in `hall-of-fame-photos.json`).
- Shop page lists official Grip Active ACES merchandise with prices and links to checkout.
