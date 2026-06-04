/**
 * Scrapes winner photos from acesfootball.co.uk/hall-of-fame and writes
 * public/hall-of-fame/{year}/ assets plus scripts/hof-photos.json mapping.
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

function slugify(ageGroup) {
  return ageGroup
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function normalizeUrl(u) {
  return u.replace(/-\d+x\d+(?=\.\w+$)/, "").split("?")[0];
}

function parseWinners(chunk) {
  const texts = [...chunk.matchAll(/eae-table-body__text[^>]*>([^<]+)/gi)].map((m) =>
    m[1].trim()
  );
  const start =
    texts[0] === "Age Group" && texts[1] === "Team" && texts[2] === "Town" ? 3 : 0;
  const winners = [];
  for (let i = start; i + 2 < texts.length; i += 3) {
    const row = { ageGroup: texts[i], team: texts[i + 1], town: texts[i + 2] };
    const key = `${row.ageGroup}|${row.team}`;
    if (!winners.some((w) => `${w.ageGroup}|${w.team}` === key)) {
      winners.push(row);
    }
  }
  return winners;
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

function matchPhotos(winners, imgs) {
  const mapping = {};
  if (winners.length === imgs.length) {
    winners.forEach((w, i) => {
      mapping[w.ageGroup] = imgs[i];
    });
    return mapping;
  }

  const used = new Set();
  for (const w of winners) {
    const age = w.ageGroup.toLowerCase();
    const uNum = age.match(/u(\d+)/)?.[1];
    const isGirl = age.includes("girl") || age.includes("gu");
    const teamTokens = w.team.toLowerCase().split(/\s+/).filter((t) => t.length > 3);

    let best = null;
    let bestScore = 0;
    for (const img of imgs) {
      if (used.has(img)) continue;
      const name = img.toLowerCase();
      let score = 0;
      if (uNum && (name.includes(`u${uNum}`) || name.includes(`-${uNum}-`) || name.includes(`u${uNum}-`)))
        score += 3;
      if (isGirl && (name.includes("girl") || name.includes("gu") || name.includes("ladies"))) score += 2;
      if (!isGirl && name.includes("boys")) score += 1;
      for (const tok of teamTokens) {
        if (name.includes(tok)) score += 2;
      }
      if (score > bestScore) {
        bestScore = score;
        best = img;
      }
    }
    if (best && bestScore >= 2) {
      mapping[w.ageGroup] = best;
      used.add(best);
    }
  }

  // Fill remaining by order for leftovers
  const remainingWinners = winners.filter((w) => !mapping[w.ageGroup]);
  const remainingImgs = imgs.filter((i) => !used.has(i));
  remainingWinners.forEach((w, idx) => {
    if (remainingImgs[idx]) mapping[w.ageGroup] = remainingImgs[idx];
  });

  return mapping;
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
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
    const winners = parseWinners(chunk);
    const imgs = parseImages(chunk);
    const photoMap = matchPhotos(winners, imgs);

    await mkdir(path.join(OUT_DIR, String(year)), { recursive: true });
    result[year] = {};

    for (const w of winners) {
      const src = photoMap[w.ageGroup];
      if (!src) continue;
      const ext = path.extname(new URL(src).pathname) || ".jpg";
      const slug = slugify(w.ageGroup);
      const filename = `${slug}${ext}`;
      const dest = path.join(OUT_DIR, String(year), filename);
      const publicPath = `/hall-of-fame/${year}/${filename}`;
      try {
      execSync(
        `curl -sL -A "Mozilla/5.0" -o ${JSON.stringify(dest)} ${JSON.stringify(src)}`,
        { stdio: "pipe" }
      );
      result[year][w.ageGroup] = publicPath;
      console.log(`✓ ${year} ${w.ageGroup}`);
    } catch (e) {
      console.warn(`✗ ${year} ${w.ageGroup}: ${e.message}`);
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
