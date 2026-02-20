"use client";

import { useCallback, useEffect, useRef, useState, type AnimationEvent } from "react";

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a"
] as const;

type ActiveFlight = {
  id: number;
};

function normalizeKey(key: string) {
  if (key.length === 1) {
    return key.toLowerCase();
  }

  return key;
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  if (target.isContentEditable) {
    return true;
  }

  const tagName = target.tagName;
  return tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT";
}

export function KonamiEasterEgg() {
  const [activeFlight, setActiveFlight] = useState<ActiveFlight | null>(null);

  const currentIndexRef = useRef(0);
  const nextFlightIdRef = useRef(0);

  const launchEgg = useCallback(() => {
    nextFlightIdRef.current += 1;

    setActiveFlight({
      id: nextFlightIdRef.current
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || isEditableTarget(event.target)) {
        return;
      }

      const normalizedKey = normalizeKey(event.key);
      const expectedKey = KONAMI_SEQUENCE[currentIndexRef.current];

      if (normalizedKey === expectedKey) {
        currentIndexRef.current += 1;

        if (currentIndexRef.current === KONAMI_SEQUENCE.length) {
          currentIndexRef.current = 0;
          launchEgg();
        }

        return;
      }

      currentIndexRef.current = normalizedKey === KONAMI_SEQUENCE[0] ? 1 : 0;
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [launchEgg]);

  const handleAnimationEnd = useCallback((event: AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    setActiveFlight(null);
  }, []);

  if (!activeFlight) {
    return null;
  }

  return (
    <div
      key={activeFlight.id}
      className="konami-egg-stage"
      onAnimationEnd={handleAnimationEnd}
      aria-hidden="true"
    >
      <div className="konami-egg-backdrop" />
      <div className="konami-egg-burst" />
      <p className="konami-egg-banner">EASTER EGG UNLOCKED</p>

      <div className="konami-egg-hero">
        <EggSprite />
      </div>

      <div className="konami-egg-flight konami-egg-flight-a">
        <div className="konami-egg-sprite">
          <EggSprite />
        </div>
      </div>
      <div className="konami-egg-flight konami-egg-flight-b">
        <div className="konami-egg-sprite">
          <EggSprite />
        </div>
      </div>
      <div className="konami-egg-flight konami-egg-flight-c">
        <div className="konami-egg-sprite">
          <EggSprite />
        </div>
      </div>
    </div>
  );
}

function EggSprite() {
  return (
    <svg viewBox="0 0 20 20" className="konami-egg-svg">
      <rect x="8" y="2" width="4" height="1" fill="#1f1920" />
      <rect x="7" y="3" width="6" height="1" fill="#1f1920" />
      <rect x="6" y="4" width="8" height="1" fill="#1f1920" />
      <rect x="5" y="5" width="10" height="1" fill="#1f1920" />
      <rect x="4" y="6" width="12" height="1" fill="#1f1920" />
      <rect x="4" y="7" width="12" height="1" fill="#1f1920" />
      <rect x="4" y="8" width="12" height="1" fill="#1f1920" />
      <rect x="5" y="9" width="10" height="1" fill="#1f1920" />
      <rect x="5" y="10" width="10" height="1" fill="#1f1920" />
      <rect x="6" y="11" width="8" height="1" fill="#1f1920" />
      <rect x="7" y="12" width="6" height="1" fill="#1f1920" />
      <rect x="8" y="13" width="4" height="1" fill="#1f1920" />

      <rect x="8" y="3" width="4" height="1" fill="#ffd9e8" />
      <rect x="7" y="4" width="6" height="1" fill="#ffc6dd" />
      <rect x="6" y="5" width="8" height="1" fill="#ffeff4" />
      <rect x="5" y="6" width="10" height="1" fill="#f5f2a8" />
      <rect x="5" y="7" width="10" height="1" fill="#9dd4ff" />
      <rect x="5" y="8" width="10" height="1" fill="#f2a0bf" />
      <rect x="6" y="9" width="8" height="1" fill="#ffe0ec" />
      <rect x="6" y="10" width="8" height="1" fill="#f6e39b" />
      <rect x="7" y="11" width="6" height="1" fill="#ffcadf" />
      <rect x="8" y="12" width="4" height="1" fill="#fff3f8" />

      <rect x="2" y="7" width="2" height="1" fill="#f7f4ea" />
      <rect x="3" y="8" width="1" height="1" fill="#f7f4ea" />
      <rect x="16" y="7" width="2" height="1" fill="#f7f4ea" />
      <rect x="16" y="8" width="1" height="1" fill="#f7f4ea" />
    </svg>
  );
}
