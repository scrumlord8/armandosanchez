"use client";

import { useEffect, useMemo, useState } from "react";

function probeImage(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const image = new Image();

    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = src;
  });
}

export function useFirstAvailableImageAsset(candidates: readonly string[], fallback = "") {
  const [resolvedAsset, setResolvedAsset] = useState<string>(fallback);
  const candidatesKey = useMemo(() => candidates.join("|"), [candidates]);

  useEffect(() => {
    let isActive = true;

    const resolveAsset = async () => {
      for (const candidate of candidates) {
        if (!candidate) {
          continue;
        }

        const exists = await probeImage(candidate);

        if (exists) {
          if (isActive) {
            setResolvedAsset(candidate);
          }

          return;
        }
      }

      if (isActive) {
        setResolvedAsset(fallback);
      }
    };

    void resolveAsset();

    return () => {
      isActive = false;
    };
  }, [candidates, candidatesKey, fallback]);

  return resolvedAsset;
}
