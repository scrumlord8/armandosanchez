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

function toWebpVariant(path: string): string {
  return path.replace(/\.[^/.]+$/i, ".webp");
}

async function assetExists(path: string): Promise<boolean> {
  try {
    const headResponse = await fetch(path, {
      method: "HEAD",
      cache: "no-store"
    });

    if (headResponse.ok) {
      return true;
    }

    // Some servers do not support HEAD for static assets.
    if (headResponse.status !== 405) {
      return false;
    }

    const getResponse = await fetch(path, {
      cache: "no-store"
    });

    return getResponse.ok;
  } catch {
    return false;
  }
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

  const uniqueNormalized = Array.from(new Set(normalized));
  const resolvedPaths = await Promise.all(
    uniqueNormalized.map(async (path) => {
      const webpPath = toWebpVariant(path);

      if (webpPath !== path && (await assetExists(webpPath))) {
        return webpPath;
      }

      if (await assetExists(path)) {
        return path;
      }

      return null;
    })
  );

  return Array.from(new Set(resolvedPaths.filter((entry): entry is string => Boolean(entry))));
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
