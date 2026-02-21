#!/usr/bin/env node

import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);
const EXTENSION_PREFERENCE = [".avif", ".webp", ".jpg", ".jpeg", ".png", ".gif"];

const TARGETS = [
  {
    directory: path.resolve(process.cwd(), "public/assets/personal_crt"),
    webPrefix: "/assets/personal_crt"
  },
  {
    directory: path.resolve(process.cwd(), "public/media/personal"),
    webPrefix: "/media/personal"
  }
];

async function getImageEntries(directory, webPrefix) {
  const entries = await readdir(directory, { withFileTypes: true });
  const bestByStem = new Map();

  for (const entry of entries) {
    if (!entry.isFile()) {
      continue;
    }

    const name = entry.name;
    const extension = path.extname(name).toLowerCase();

    if (!IMAGE_EXTENSIONS.has(extension)) {
      continue;
    }

    const stem = path.basename(name, path.extname(name));
    const current = bestByStem.get(stem);
    const nextRank = EXTENSION_PREFERENCE.indexOf(extension);

    if (!current) {
      bestByStem.set(stem, { name, rank: nextRank });
      continue;
    }

    if (nextRank !== -1 && (current.rank === -1 || nextRank < current.rank)) {
      bestByStem.set(stem, { name, rank: nextRank });
    }
  }

  return Array.from(bestByStem.values())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b))
    .map((name) => `${webPrefix}/${name}`);
}

async function writeManifest(directory, images) {
  const manifestPath = path.resolve(directory, "manifest.json");
  const manifest = { images };

  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  return manifestPath;
}

async function generateManifests() {
  for (const target of TARGETS) {
    await mkdir(target.directory, { recursive: true });

    const images = await getImageEntries(target.directory, target.webPrefix);
    const manifestPath = await writeManifest(target.directory, images);

    console.log(`Wrote ${images.length} image entries to ${path.relative(process.cwd(), manifestPath)}`);
  }
}

generateManifests().catch((error) => {
  console.error("Failed to generate media manifests:", error);
  process.exitCode = 1;
});
