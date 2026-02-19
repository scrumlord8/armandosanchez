"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ModuleState = "idle" | "hover" | "unlocked" | "completed";

type ModuleNodeProps = {
  icon: string;
  label: string;
  tooltip: string;
  unlockedState: boolean;
  completionState: boolean;
  xpValue: number;
  onClick: () => void;
  orbitPosition: string;
  driftX: number;
  driftY: number;
  driftDuration: number;
  driftDelay: number;
};

export function ModuleNode({
  icon,
  label,
  tooltip,
  unlockedState,
  completionState,
  xpValue,
  onClick,
  orbitPosition,
  driftX,
  driftY,
  driftDuration,
  driftDelay
}: ModuleNodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const nodeState: ModuleState = completionState ? "completed" : unlockedState ? "unlocked" : "idle";
  const nodeLabelId = `tooltip-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <motion.div className={["absolute z-20", orbitPosition].join(" ")} onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)}>
      <motion.button
        type="button"
        onClick={onClick}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        animate={{ x: [0, driftX, 0, -driftX * 0.5, 0], y: [0, -driftY, 0, driftY * 0.6, 0] }}
        transition={{ duration: driftDuration, delay: driftDelay, ease: "easeInOut", repeat: Infinity }}
        whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(var(--accent-rgb), 0.4)" }}
        whileTap={{ scale: 0.98 }}
        className={[
          "relative flex h-28 w-28 items-center justify-center rounded-full border backdrop-blur transition-all duration-200 md:h-32 md:w-32",
          "before:absolute before:inset-2 before:rounded-full before:border before:content-['']",
          "border-white/20 bg-backgroundMuted/80 before:border-white/10",
          nodeState === "completed" ? "border-success/70 shadow-ringSuccess before:border-success/50" : "",
          nodeState === "unlocked" ? "border-accent/60 shadow-neon before:border-accent/45" : "",
          nodeState === "idle" ? "opacity-65" : "opacity-100"
        ].join(" ")}
        aria-label={`${label} module`}
        aria-describedby={nodeLabelId}
      >
        <span className="relative z-10 flex flex-col items-center px-2 text-center">
          <span className="text-lg leading-none md:text-xl">{icon}</span>
          <span className="mt-1.5 text-xs font-medium uppercase tracking-[0.14em]">{label}</span>
          <span className="mono-metric mt-1 text-[10px] uppercase tracking-[0.2em] text-foregroundMuted">+{xpValue} xp</span>
        </span>
      </motion.button>

      <AnimatePresence>
        {isHovered ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            id={nodeLabelId}
            className="pointer-events-none absolute left-1/2 top-full mt-2 w-52 -translate-x-1/2 rounded-md border border-white/15 bg-backgroundElevated px-3 py-2 text-xs text-foreground/85 shadow-surface"
          >
            {tooltip}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
