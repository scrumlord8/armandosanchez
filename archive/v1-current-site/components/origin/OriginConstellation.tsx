"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";
import { useXpStore } from "@/stores/xp-store";

type OriginStar = {
  id: string;
  label: string;
  reflection: string;
  x: number;
  y: number;
  size: number;
};

const stars: OriginStar[] = [
  {
    id: "husband",
    label: "Husband",
    reflection: "Partnership keeps ambition grounded and decision-making honest.",
    x: 18,
    y: 22,
    size: 10
  },
  {
    id: "dad",
    label: "Dad",
    reflection: "Patience and consistency matter more than occasional intensity.",
    x: 46,
    y: 14,
    size: 9
  },
  {
    id: "builder",
    label: "Builder",
    reflection: "Momentum comes from shipping small systems that compound over time.",
    x: 78,
    y: 28,
    size: 11
  },
  {
    id: "systems-thinker",
    label: "Systems Thinker",
    reflection: "Reliable outcomes follow clear structure, feedback loops, and ownership.",
    x: 68,
    y: 58,
    size: 10
  },
  {
    id: "musician",
    label: "Musician",
    reflection: "Creative rhythm helps me find signal and pace under uncertainty.",
    x: 34,
    y: 60,
    size: 8
  },
  {
    id: "entrepreneur",
    label: "Entrepreneur",
    reflection: "Comfort with risk and iteration turns ideas into real operating leverage.",
    x: 14,
    y: 68,
    size: 9
  }
];

const edges: Array<[string, string]> = [
  ["husband", "dad"],
  ["dad", "builder"],
  ["builder", "systems-thinker"],
  ["systems-thinker", "musician"],
  ["musician", "entrepreneur"],
  ["entrepreneur", "husband"],
  ["dad", "musician"]
];

const starById = Object.fromEntries(stars.map((star) => [star.id, star])) as Record<string, OriginStar>;

export function OriginConstellation() {
  const [activeStarId, setActiveStarId] = useState<string>(stars[0].id);

  const { originStarsHovered, originCompleted, openModule, originHoverStar } = useXpStore(
    useShallow((state) => ({
      originStarsHovered: state.originStarsHovered,
      originCompleted: state.completedModules.origin,
      openModule: state.openModule,
      originHoverStar: state.originHoverStar
    }))
  );

  useEffect(() => {
    openModule("origin");
  }, [openModule]);

  const exploredCount = Object.keys(originStarsHovered).length;
  const activeStar = starById[activeStarId] ?? stars[0];

  const relatedIds = useMemo(() => {
    const ids = new Set<string>([activeStar.id]);

    edges.forEach(([a, b]) => {
      if (a === activeStar.id) {
        ids.add(b);
      }
      if (b === activeStar.id) {
        ids.add(a);
      }
    });

    return ids;
  }, [activeStar.id]);

  function inspectStar(starId: string) {
    setActiveStarId(starId);
    originHoverStar(starId);
  }

  return (
    <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
      <section className="surface-card rounded-xl p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.18em] text-accent/90">Constellation Map</p>
          <p className="text-xs uppercase tracking-wide text-foreground/70">Explored {exploredCount}/4</p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 md:hidden">
          {stars.map((star) => {
            const explored = Boolean(originStarsHovered[star.id]);
            const isActive = star.id === activeStar.id;

            return (
              <button
                key={star.id}
                type="button"
                onClick={() => inspectStar(star.id)}
                className={[
                  "rounded-md border px-3 py-2 text-left",
                  explored ? "border-accent/60" : "border-white/20",
                  isActive ? "bg-accent/10" : "bg-black/55"
                ].join(" ")}
              >
                <p className="text-xs uppercase tracking-wide text-accent/85">{star.label}</p>
                <p className="mt-1 text-xs text-foreground/70">Select to inspect reflection</p>
              </button>
            );
          })}
        </div>

        <div
          className={[
            "relative mt-3 hidden h-[360px] overflow-hidden rounded-lg border border-white/10 bg-[#070d18] md:block",
            exploredCount >= 4 ? "constellation-shimmer" : ""
          ].join(" ")}
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {edges.map(([a, b]) => {
              const from = starById[a];
              const to = starById[b];
              const highlighted = a === activeStar.id || b === activeStar.id;

              return (
                <line
                  key={`${a}-${b}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={highlighted ? "rgba(var(--accent-rgb), 0.72)" : "rgba(148, 163, 184, 0.24)"}
                  strokeWidth={highlighted ? 0.34 : 0.2}
                />
              );
            })}
          </svg>

          {stars.map((star) => {
            const explored = Boolean(originStarsHovered[star.id]);
            const isActive = star.id === activeStar.id;
            const shouldDim = !relatedIds.has(star.id);

            return (
              <motion.button
                key={star.id}
                type="button"
                onMouseEnter={() => inspectStar(star.id)}
                onFocus={() => inspectStar(star.id)}
                whileHover={{ scale: 1.08 }}
                aria-label={`Inspect ${star.label} identity node`}
                className={[
                  "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border transition duration-200",
                  explored ? "border-accent/75 bg-accent/45 shadow-neon" : "border-white/45 bg-white/20",
                  isActive ? "shadow-neon" : "",
                  shouldDim ? "opacity-45" : "opacity-100"
                ].join(" ")}
                style={{ left: `${star.x}%`, top: `${star.y}%`, width: `${star.size}px`, height: `${star.size}px` }}
              />
            );
          })}
        </div>

        {originCompleted ? (
          <p className="mt-3 text-xs uppercase tracking-wide text-success">Origin module completed (+40 XP)</p>
        ) : (
          <p className="mt-3 text-xs text-foreground/65">Hover or focus 4 unique stars to complete this module.</p>
        )}
      </section>

      <aside className="surface-card rounded-xl p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-accent/90">Identity Node</p>
        <h2 className="mt-2 text-xl font-semibold">{activeStar.label}</h2>
        <p className="mt-3 text-sm text-foreground/82">{activeStar.reflection}</p>
      </aside>
    </div>
  );
}
