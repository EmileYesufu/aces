/**
 * Scrapes ACES shop products from Grip Active (linked on acesfootball.co.uk menu)
 * and writes content/shop.ts + public/shop/ images.
 */
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "shop");
const CONTENT_PATH = path.join(ROOT, "content", "shop.ts");

const COLLECTION_URL =
  "https://www.gripactive.com/collections/aces-nationals-tournament/products.json?limit=250";

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/^aces nationals tournament\s+/i, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function categoryFor(title) {
  const t = title.toLowerCase();
  if (/jersey|polo|hoodie|sweatshirt|baselayer|jacket|cap|bobble/.test(t)) return "Apparel";
  if (/ball|corner flag|shinpad|sock/.test(t)) return "Equipment";
  return "Accessories";
}

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; ACES-site-mirror/1.0)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function downloadImage(url, dest) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; ACES-site-mirror/1.0)" },
  });
  if (!res.ok) throw new Error(`Image ${res.status}: ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
}

async function main() {
  const { products } = await fetchJson(COLLECTION_URL);
  const seen = new Map();

  for (const p of products) {
    const title = p.title.trim();
    if (seen.has(title)) continue;
    const variant = p.variants[0];
    const price = parseFloat(variant.price);
    const compareAt = variant.compare_at_price ? parseFloat(variant.compare_at_price) : null;
    const imageUrl = p.images[0]?.src?.split("?")[0];
    if (!imageUrl) continue;

    seen.set(title, {
      id: slugify(title),
      title,
      slug: p.handle,
      category: categoryFor(title),
      price,
      compareAt: compareAt && compareAt > price ? compareAt : null,
      imageUrl,
      productUrl: `https://www.gripactive.com/products/${p.handle}`,
      excerpt: stripHtml(p.body_html).slice(0, 180) + (p.body_html.length > 180 ? "…" : ""),
    });
  }

  const items = [...seen.values()].sort((a, b) => a.title.localeCompare(b.title));
  await mkdir(OUT_DIR, { recursive: true });

  for (const item of items) {
    const ext = path.extname(new URL(item.imageUrl).pathname) || ".jpg";
    const filename = `${item.id}${ext}`;
    const localPath = path.join(OUT_DIR, filename);
    try {
      await downloadImage(item.imageUrl, localPath);
      item.image = `/shop/${filename}`;
    } catch (err) {
      console.warn(`Skip image ${item.title}:`, err.message);
      item.image = item.imageUrl;
    }
  }

  const ts = `export type ShopProduct = {
  id: string;
  title: string;
  slug: string;
  category: "Apparel" | "Accessories" | "Equipment";
  price: number;
  compareAt: number | null;
  image: string;
  productUrl: string;
};

export const shopConfig = {
  storeUrl: "https://www.gripactive.com/collections/aces-nationals-tournament",
  bundleUrl: "https://www.gripactive.com/bundle-offer",
  partner: "Grip Active",
  partnerNote:
    "Official ACES Nationals kit and merchandise, supplied by Grip Active — the tournament's official kit partner.",
  intro:
    "Browse official ACES Nationals branded kit and merchandise. Jerseys, polos, hoodies, training wear, and tournament accessories — order online through our partner store.",
} as const;

/** Scraped from Grip Active ACES collection (acesfootball.co.uk ACES Shop link). */
export const shopProducts: ShopProduct[] = ${JSON.stringify(
    items.map(({ imageUrl, excerpt, ...rest }) => rest),
    null,
    2
  )};
`;

  await writeFile(CONTENT_PATH, ts);
  console.log(`Wrote ${items.length} products to content/shop.ts`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
