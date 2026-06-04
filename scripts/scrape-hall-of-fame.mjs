/**
 * Scrapes tournament photos from acesfootball.co.uk/hall-of-fame per year.
 * Photos are stored as a gallery only — not linked to individual winning teams.
 */
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "hall-of-fame");
const MAP_PATH = path.join(__dirname, "hof-photos.json");

const YEARS = [2025, 2024, 2023, 2022, 2021, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009];

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function normalizeUrl(u) {
  return u.replace(/-\d+x\d+(?=\.\w+$)/, "").split("?")[0];
}

function parseImages(chunk) {
  const imgs = [];
  for (const m of chunk.matchAll(
    /href=['"](https:\/\/acesfootball\.co\.uk\/wp-content\/uploads\/[^'"]+\.(?:jpg|jpeg|png))['"]/gi
  )) {
    const u = normalizeUrl(m[1]);
    const skip = ["no-year", "HALL-OF-FAME", "2026-1.png", "cropped-new-master", "Men-Vets"];
    if (skip.some((s) => u.includes(s))) continue;
    if (!imgs.includes(u)) imgs.push(u);
  }
  return imgs;
}

function getSection(page, year) {
  const anchor = `>${year} WINNERS`;
  const start = page.indexOf(anchor, 50_000);
  if (start < 0) return "";
  let end = page.length;
  for (const y2 of YEARS) {
    if (y2 >= year) continue;
    const e = page.indexOf(`>${y2} WINNERS`, start + 100);
    if (e > 0) {
      end = e;
      break;
    }
  }
  return page.slice(start, end);
}

async function main() {
  const { execSync } = await import("child_process");
  const page = execSync(
    'curl -sL -A "Mozilla/5.0" "https://acesfootball.co.uk/hall-of-fame/"',
    { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 }
  );

  const result = {};

  for (const year of YEARS) {
    const chunk = getSection(page, year);
    const imgs = parseImages(chunk);

    await mkdir(path.join(OUT_DIR, String(year)), { recursive: true });
    result[year] = [];

    for (let i = 0; i < imgs.length; i++) {
      const src = imgs[i];
      const ext = path.extname(new URL(src).pathname) || ".jpg";
      const filename = `${String(i + 1).padStart(2, "0")}${ext}`;
      const dest = path.join(OUT_DIR, String(year), filename);
      const publicPath = `/hall-of-fame/${year}/${filename}`;
      try {
        execSync(
          `curl -sL -A "Mozilla/5.0" -o ${JSON.stringify(dest)} ${JSON.stringify(src)}`,
          { stdio: "pipe" }
        );
        result[year].push(publicPath);
        console.log(`✓ ${year} ${filename}`);
      } catch (e) {
        console.warn(`✗ ${year} ${filename}: ${e.message}`);
      }
    }
  }

  await writeFile(MAP_PATH, JSON.stringify(result, null, 2));
  await writeFile(path.join(ROOT, "content", "hall-of-fame-photos.json"), JSON.stringify(result, null, 2));
  console.log(`\nWrote ${MAP_PATH} and content/hall-of-fame-photos.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
