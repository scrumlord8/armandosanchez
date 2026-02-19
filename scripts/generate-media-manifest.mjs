#!/usr/bin/env node

import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

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

  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
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
