/**
 * Downloads Instagram post thumbnails into public/social/instagram/
 * and prints JSON for content/social-feed.ts
 *
 * Run: node scripts/scrape-instagram-posts.mjs
 */
import { execSync } from "child_process";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public", "social", "instagram");

const URLS = [
  "https://www.instagram.com/p/DY4ydauIPc-/",
  "https://www.instagram.com/p/DYzdnSwoQmL/",
  "https://www.instagram.com/p/DYuM9W6IjRU/",
  "https://www.instagram.com/p/DYrMxXPo2gH/",
  "https://www.instagram.com/p/DYaB7dyIhP7/",
  "https://www.instagram.com/p/DYUUQZYILSk/",
];

function curl(url, out) {
  const args = ["-sL", "-A", "Mozilla/5.0", url];
  if (out) args.push("-o", out);
  return execSync(`curl ${args.map((a) => JSON.stringify(a)).join(" ")}`, { encoding: "utf8" });
}

function decodeCaption(raw) {
  return raw
    .replace(/&quot;/g, '"')
    .replace(/&#x2019;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\d+ likes, \d+ comments - acesnationals on [^:]+: /i, "")
    .replace(/^"|"$/g, "")
    .trim();
}

await mkdir(OUT, { recursive: true });

const posts = [];

for (const url of URLS) {
  const shortcode = url.split("/p/")[1].replace(/\/$/, "");
  const html = curl(url);
  const imgMatch = html.match(/property="og:image" content="([^"]+)"/);
  const capMatch = html.match(/property="og:description" content="([^"]*)"/);
  if (!imgMatch) {
    console.warn(`Skip ${shortcode}: no og:image`);
    continue;
  }
  const dest = path.join(OUT, `${shortcode}.jpg`);
  curl(imgMatch[1].replace(/&amp;/g, "&"), dest);
  posts.push({
    id: shortcode,
    url,
    thumbnail: `/social/instagram/${shortcode}.jpg`,
    caption: capMatch ? decodeCaption(capMatch[1]) : "",
    timestamp: 0,
  });
  console.log(`✓ ${shortcode}`);
}

await writeFile(path.join(__dirname, "instagram-posts.json"), JSON.stringify(posts, null, 2));
console.log(`\nWrote ${posts.length} posts to public/social/instagram/`);
