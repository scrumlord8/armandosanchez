"use client";

type CrtEffectsProps = {
  isTransitioning: boolean;
  reducedMotion: boolean;
};

export function CrtEffects({ isTransitioning, reducedMotion }: CrtEffectsProps) {
  return (
    <div className={`crt-effects ${isTransitioning ? "is-transitioning" : ""} ${reducedMotion ? "is-reduced" : ""}`} aria-hidden="true">
      <div className="fx-vignette" />
      <div className="fx-scanlines" />
      <div className="fx-noise" />
      <div className="fx-rgb-separation" />
      <div className="fx-flicker" />
      <div className="fx-static" />
    </div>
  );
}
