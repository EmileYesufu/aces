/**
 * Scrapes tournament video IDs from acesfootball.co.uk/{year}-tournament-video/
 * Run: node scripts/scrape-tournament-videos.mjs
 */
import { execSync } from "child_process";
import { writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const YEARS = ["2026", "2025", "2024", "2023", "2022"];

function fetchPage(url) {
  return execSync(`curl -sL -A "Mozilla/5.0" ${JSON.stringify(url)}`, {
    encoding: "utf8",
    maxBuffer: 5 * 1024 * 1024,
  });
}

function parseVideo(html) {
  const vimeo = html.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return { provider: "vimeo", videoId: vimeo[1] };

  const ytSettings = html.match(/"youtube_url":"([^"]+)"/);
  if (ytSettings) {
    const url = ytSettings[1].replace(/\\\//g, "/");
    const id = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/);
    if (id) return { provider: "youtube", videoId: id[1] };
  }
  return null;
}

async function main() {
  const videos = [];

  for (const year of YEARS) {
    const url = `https://acesfootball.co.uk/${year}-tournament-video/`;
    const html = fetchPage(url);
    const parsed = parseVideo(html);
    if (!parsed) {
      console.warn(`No video found for ${year}`);
      continue;
    }
    videos.push({ year, ...parsed });
    console.log(`${year}: ${parsed.provider} ${parsed.videoId}`);
  }

  // Homepage featured (YouTube on live site)
  const home = fetchPage("https://acesfootball.co.uk/");
  const homeYt = home.match(/"youtube_url":"([^"]+)"/);
  let featured = null;
  if (homeYt) {
    const url = homeYt[1].replace(/\\\//g, "/");
    const id = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/);
    if (id) featured = { provider: "youtube", videoId: id[1] };
  }

  const out = { featured, videos };
  await writeFile(path.join(__dirname, "tournament-videos.json"), JSON.stringify(out, null, 2));
  console.log("\nWrote scripts/tournament-videos.json");
}

main();
