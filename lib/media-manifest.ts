type ManifestSource = {
  manifestPath: string;
  rootPath: string;
};

const MANIFEST_SOURCES: ManifestSource[] = [
  {
    manifestPath: "/assets/personal_crt/manifest.json",
    rootPath: "/assets/personal_crt/"
  },
  {
    manifestPath: "/media/personal/manifest.json",
    rootPath: "/media/personal/"
  }
];

function normalizeImagePath(value: string, rootPath: string): string | null {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return null;
  }

  if (trimmed.startsWith("/")) {
    return trimmed.startsWith(rootPath) ? trimmed : null;
  }

  return `${rootPath}${trimmed.replace(/^\.?\//, "")}`;
}

async function readManifest(source: ManifestSource): Promise<string[]> {
  const response = await fetch(source.manifestPath, {
    cache: "no-store"
  });

  if (!response.ok) {
    return [];
  }

  const payload = (await response.json()) as { images?: unknown };

  if (!payload || !Array.isArray(payload.images)) {
    return [];
  }

  const normalized = payload.images
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => normalizeImagePath(entry, source.rootPath))
    .filter((entry): entry is string => Boolean(entry));

  return Array.from(new Set(normalized));
}

export async function loadMediaManifest(): Promise<string[]> {
  for (const source of MANIFEST_SOURCES) {
    try {
      const images = await readManifest(source);

      if (images.length > 0) {
        return images;
      }
    } catch {
      // Keep searching through fallback manifest sources.
    }
  }

  return [];
}
