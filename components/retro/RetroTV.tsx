"use client";

import NextImage from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { CrtEffects } from "@/components/retro/CrtEffects";
import { useFirstAvailableImageAsset } from "@/components/retro/useFirstAvailableImageAsset";

type RetroTVProps = {
  images: string[];
  manifestLoaded?: boolean;
  intervalMs?: number;
  soundEnabled: boolean;
  staticSoundSources?: readonly string[];
};

const SCANLINE_IMAGE_CANDIDATES = ["/assets/fx/scanlines.png"] as const;
const NOISE_IMAGE_CANDIDATES = ["/assets/fx/noise.png"] as const;
const VIGNETTE_IMAGE_CANDIDATES = ["/assets/fx/vignette.png"] as const;
const STATIC_IMAGE_CANDIDATES = [
  "/assets/fx/static_frames/0001.png",
  "/assets/fx/static_frames/0002.png",
  "/assets/fx/static_frames/0003.png",
  "/assets/fx/static_frames/0004.png",
  "/assets/fx/static_frames/0005.png",
  "/assets/fx/static_frames/0006.png",
  "/assets/fx/static_frames/0007.png",
  "/assets/fx/static_frames/0008.png",
  "/assets/fx/static_frames/0009.png",
  "/assets/fx/static_frames/0010.png",
  "/assets/fx/static_frames/001.png",
  "/assets/fx/noise.png"
] as const;

const DEFAULT_STATIC_SOUNDS = [
  "/assets/audio/static_tick_01.mp3",
  "/assets/audio/static_tick_02.mp3"
] as const;

type TvCssVars = CSSProperties &
  Record<
    | "--fx-scanlines-image"
    | "--fx-noise-image"
    | "--fx-vignette-image"
    | "--fx-static-image",
    string
  >;

function createShuffledOrder(total: number, excludedIndex?: number): number[] {
  const order: number[] = [];

  for (let index = 0; index < total; index += 1) {
    if (index !== excludedIndex) {
      order.push(index);
    }
  }

  for (let index = order.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const temp = order[index];
    order[index] = order[swapIndex];
    order[swapIndex] = temp;
  }

  return order;
}

function preloadImage(src: string) {
  if (!src) {
    return;
  }

  const image = new Image();
  image.decoding = "async";
  image.src = src;
}

export function RetroTV({
  images,
  manifestLoaded = true,
  intervalMs = 8000,
  soundEnabled,
  staticSoundSources = DEFAULT_STATIC_SOUNDS
}: RetroTVProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [containImages, setContainImages] = useState<Record<string, boolean>>({});

  const currentIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const swapTimeoutRef = useRef<number | null>(null);
  const endTimeoutRef = useRef<number | null>(null);
  const audioPoolRef = useRef<HTMLAudioElement[]>([]);
  const pendingOrderRef = useRef<number[]>([]);

  const scanlineImage = useFirstAvailableImageAsset(SCANLINE_IMAGE_CANDIDATES, "");
  const noiseImage = useFirstAvailableImageAsset(NOISE_IMAGE_CANDIDATES, "");
  const vignetteImage = useFirstAvailableImageAsset(VIGNETTE_IMAGE_CANDIDATES, "");
  const staticImage = useFirstAvailableImageAsset(STATIC_IMAGE_CANDIDATES, "");
  const uniqueImages = useMemo(() => Array.from(new Set(images.filter(Boolean))), [images]);

  const hasImages = uniqueImages.length > 0;
  const hasMultipleImages = uniqueImages.length > 1;
  const currentImage = hasImages ? uniqueImages[currentIndex] : "";
  const currentImageUsesContain = currentImage ? containImages[currentImage] === true : false;

  const transitionTimings = useMemo(
    () =>
      reducedMotion
        ? {
            swapAtMs: 100,
            endAtMs: 220
          }
        : {
            swapAtMs: 150,
            endAtMs: 360
          },
    [reducedMotion]
  );

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    if (uniqueImages.length === 0) {
      setCurrentIndex(0);
      currentIndexRef.current = 0;
      pendingOrderRef.current = [];
      return;
    }

    const order = createShuffledOrder(uniqueImages.length);
    const firstIndex = order.shift() ?? 0;

    setCurrentIndex(firstIndex);
    currentIndexRef.current = firstIndex;
    pendingOrderRef.current = order;

    if (order.length > 0) {
      preloadImage(uniqueImages[order[0]]);
    }
  }, [uniqueImages]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setReducedMotion(mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    const uniqueSources = Array.from(new Set(staticSoundSources.filter(Boolean)));

    audioPoolRef.current = uniqueSources.map((source) => {
      const audio = new Audio(source);
      audio.preload = "auto";
      audio.volume = 0.42;
      return audio;
    });

    return () => {
      for (const audio of audioPoolRef.current) {
        audio.pause();
      }

      audioPoolRef.current = [];
    };
  }, [staticSoundSources]);

  useEffect(() => {
    return () => {
      if (swapTimeoutRef.current !== null) {
        window.clearTimeout(swapTimeoutRef.current);
      }

      if (endTimeoutRef.current !== null) {
        window.clearTimeout(endTimeoutRef.current);
      }
    };
  }, []);

  const playStaticSound = useCallback(() => {
    if (!soundEnabled || audioPoolRef.current.length === 0) {
      return;
    }

    const pool = audioPoolRef.current;
    const randomIndex = Math.floor(Math.random() * pool.length);
    const selectedAudio = pool[randomIndex];

    selectedAudio.currentTime = 0;
    void selectedAudio.play().catch(() => {
      // Visual transition continues when sound playback is unavailable.
    });
  }, [soundEnabled]);

  const handleImageLoadComplete = useCallback(
    (image: HTMLImageElement) => {
      if (!currentImage) {
        return;
      }

      const naturalWidth = image.naturalWidth;
      const naturalHeight = image.naturalHeight;

      if (!naturalWidth || !naturalHeight) {
        return;
      }

      const aspectRatio = naturalWidth / naturalHeight;
      const shouldContain = aspectRatio < 0.7;

      setContainImages((previous) => {
        if (previous[currentImage] === shouldContain) {
          return previous;
        }

        return {
          ...previous,
          [currentImage]: shouldContain
        };
      });
    },
    [currentImage]
  );

  const triggerChange = useCallback(() => {
    if (!hasMultipleImages || isTransitioningRef.current) {
      return;
    }

    if (pendingOrderRef.current.length === 0) {
      pendingOrderRef.current = createShuffledOrder(uniqueImages.length, currentIndexRef.current);
    }

    const nextIndex = pendingOrderRef.current.shift();

    if (typeof nextIndex !== "number") {
      return;
    }

    preloadImage(uniqueImages[nextIndex]);

    isTransitioningRef.current = true;
    setIsTransitioning(true);
    playStaticSound();

    if (swapTimeoutRef.current !== null) {
      window.clearTimeout(swapTimeoutRef.current);
    }

    if (endTimeoutRef.current !== null) {
      window.clearTimeout(endTimeoutRef.current);
    }

    swapTimeoutRef.current = window.setTimeout(() => {
      currentIndexRef.current = nextIndex;
      setCurrentIndex(nextIndex);

      if (pendingOrderRef.current.length === 0) {
        pendingOrderRef.current = createShuffledOrder(uniqueImages.length, nextIndex);
      }

      const followingIndex = pendingOrderRef.current[0];
      if (typeof followingIndex === "number") {
        preloadImage(uniqueImages[followingIndex]);
      }
    }, transitionTimings.swapAtMs);

    endTimeoutRef.current = window.setTimeout(() => {
      isTransitioningRef.current = false;
      setIsTransitioning(false);
    }, transitionTimings.endAtMs);
  }, [hasMultipleImages, playStaticSound, transitionTimings.endAtMs, transitionTimings.swapAtMs, uniqueImages]);

  useEffect(() => {
    if (!hasMultipleImages) {
      return;
    }

    const intervalId = window.setInterval(() => {
      triggerChange();
    }, intervalMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [hasMultipleImages, intervalMs, triggerChange]);

  const tvCssVars = useMemo<TvCssVars>(
    () => ({
      "--fx-scanlines-image": scanlineImage ? `url("${scanlineImage}")` : "none",
      "--fx-noise-image": noiseImage ? `url("${noiseImage}")` : "none",
      "--fx-vignette-image": vignetteImage ? `url("${vignetteImage}")` : "none",
      "--fx-static-image": staticImage ? `url("${staticImage}")` : "none"
    }),
    [noiseImage, scanlineImage, staticImage, vignetteImage]
  );

  return (
    <div className="tv" role="region" aria-label="Vintage CRT slideshow" style={tvCssVars}>
      <div className="tv-frame">
        <div className={`tv-screen ${isTransitioning ? "is-transitioning" : ""}`}>
          {currentImage ? (
            <NextImage
              src={currentImage}
              alt="Personal memory shown on CRT television"
              className={`tv-image ${currentImageUsesContain ? "is-contain" : "is-cover"}`}
              fill
              sizes="(max-width: 760px) 44vw, (max-width: 1200px) 30vw, 22vw"
              draggable={false}
              onLoadingComplete={handleImageLoadComplete}
            />
          ) : manifestLoaded ? (
            <div className="tv-empty-state">
              Add images to <code>public/assets/personal_crt</code> and create <code>manifest.json</code>.
            </div>
          ) : null}

          <CrtEffects isTransitioning={isTransitioning} reducedMotion={reducedMotion} />
        </div>
      </div>
    </div>
  );
}
