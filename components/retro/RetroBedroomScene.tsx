"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { RetroTV } from "@/components/retro/RetroTV";
import { SoundToggle } from "@/components/retro/SoundToggle";
import { KonamiEasterEgg } from "@/components/retro/KonamiEasterEgg";
import { useFirstAvailableImageAsset } from "@/components/retro/useFirstAvailableImageAsset";
import { loadMediaManifest } from "@/lib/media-manifest";

const SCENE_IMAGE_CANDIDATES = [
  "/assets/scene/bedroom-night-v2.webp",
  "/assets/scene/bedroom-night-v2.png",
  "/assets/scene/bedroom-night.png",
  "/assets/scene/bedroom-night.webp"
] as const;

type SceneCssVars = CSSProperties & Record<"--scene-image", string>;

export function RetroBedroomScene() {
  const [images, setImages] = useState<string[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const sceneImage = useFirstAvailableImageAsset(SCENE_IMAGE_CANDIDATES, "");

  useEffect(() => {
    let isMounted = true;

    void loadMediaManifest().then((manifestImages) => {
      if (isMounted) {
        setImages(manifestImages);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const roomStyle = useMemo<SceneCssVars>(
    () => ({
      "--scene-image": sceneImage ? `url("${sceneImage}")` : "none"
    }),
    [sceneImage]
  );

  return (
    <main className="retro-scene">
      <header className="retro-header">
        <SoundToggle soundEnabled={soundEnabled} onToggle={() => setSoundEnabled((current) => !current)} />
      </header>
      <KonamiEasterEgg />

      <section className="retro-room" aria-label="1980s San Francisco Victorian bedroom scene" style={roomStyle}>
        <div className="retro-room-scene">
          <div className="retro-room-backdrop" aria-hidden="true" />
          <div className="retro-room-lamp-haze" aria-hidden="true" />
          <div className="retro-tv-anchor">
            <RetroTV images={images} soundEnabled={soundEnabled} />
          </div>
        </div>

        <div className="retro-room-film-grain" aria-hidden="true" />
        <div className="retro-room-vignette" aria-hidden="true" />
      </section>
    </main>
  );
}
