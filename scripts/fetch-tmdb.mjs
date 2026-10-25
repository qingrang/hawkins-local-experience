/**
 * TMDB 预取脚本
 * 运行：node scripts/fetch-tmdb.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const envContent = readFileSync(resolve(ROOT, ".env.local"), "utf-8");
const env = {};
for (const line of envContent.split("\n")) {
  const m = line.match(/^([^=:#]+)=(.*)$/);
  if (m) env[m[1].trim()] = m[2].trim();
}
const API_KEY = env.TMDB_API_KEY;
const BASE = env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
const SHOW_ID = 66732;

if (!API_KEY) {
  console.error("Missing TMDB_API_KEY in .env.local");
  process.exit(1);
}

const dataDir = resolve(ROOT, "public/cache/data");
const imagesDir = resolve(ROOT, "public/cache/images");
mkdirSync(dataDir, { recursive: true });
mkdirSync(imagesDir, { recursive: true });

const TMDB_IMG = "https://image.tmdb.org/t/p/w300";

async function downloadImage(profilePath, outName) {
  if (!profilePath) return null;
  const url = `${TMDB_IMG}${profilePath}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  const outPath = resolve(imagesDir, outName);
  writeFileSync(outPath, buf);
  return `/cache/images/${outName}`;
}

async function fetchJson(path) {
  const url = `${BASE}${path}&api_key=${API_KEY}`;
  console.log(`  -> ${path}`);
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`  x ${res.status} ${res.statusText}`);
    return null;
  }
  return res.json();
}

function saveJson(name, data) {
  const p = resolve(dataDir, name);
  writeFileSync(p, JSON.stringify(data, null, 2), "utf-8");
  console.log(`  v ${name}`);
}

async function main() {
  console.log("=== TMDB prefetch: Stranger Things (66732) ===\n");

  console.log("[1/4] Show info");
  const show = await fetchJson(`/tv/${SHOW_ID}?language=zh-CN`);
  if (show) saveJson("show.json", show);

  console.log("\n[2/4] Cast + photos");
  const credits = await fetchJson(`/tv/${SHOW_ID}/credits?language=zh-CN`);
  if (credits) {
    const cast = (credits.cast || []).slice(0, 12);
    for (const actor of cast) {
      const imgName = `cast_${actor.id}.jpg`;
      const localPath = await downloadImage(actor.profile_path, imgName);
      actor.local_image = localPath;
      console.log(`    ${actor.name} (${actor.character}) -> ${localPath || "skip"}`);
    }
    saveJson("cast.json", cast);
  }

  console.log("\n[3/4] Images");
  const images = await fetchJson(`/tv/${SHOW_ID}/images`);
  if (images) {
    saveJson("images.json", {
      backdrops: (images.backdrops || []).slice(0, 20),
      posters: (images.posters || []).slice(0, 10),
    });
  }

  console.log("\n[4/4] Seasons");
  const seasons = [];
  for (let s = 1; s <= 5; s++) {
    const season = await fetchJson(`/tv/${SHOW_ID}/season/${s}?language=zh-CN`);
    if (season) seasons.push(season);
  }
  saveJson("seasons.json", seasons);

  console.log("\n=== Done ===");
}

main().catch((e) => {
  console.error("Failed:", e.message);
  process.exit(1);
});
