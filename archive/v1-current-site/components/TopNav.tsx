"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";
import { useXpStore } from "@/stores/xp-store";

export function TopNav() {
  const {
    xp,
    systemUnderstanding,
    operatorUnlocked,
    executiveBriefUnlocked,
    operatorModeEnabled,
    toggleOperatorMode
  } = useXpStore(
    useShallow((state) => ({
      xp: state.xp,
      systemUnderstanding: state.systemUnderstanding,
      operatorUnlocked: state.operatorUnlocked,
      executiveBriefUnlocked: state.executiveBriefUnlocked,
      operatorModeEnabled: state.operatorModeEnabled,
      toggleOperatorMode: state.toggleOperatorMode
    }))
  );

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
      className="surface-panel relative z-20 flex w-full flex-col gap-3 rounded-xl px-4 py-3 md:flex-row md:items-center md:justify-between"
    >
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-accent/90">ArmandoOS</p>
        <h1 className="text-sm font-medium text-foreground/90 md:text-base">Mission Control</h1>
      </div>

      <div className="w-full max-w-sm text-right">
        <p className="text-xs uppercase tracking-[0.2em] text-foregroundMuted">System Understanding</p>
        <div
          className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-label="System understanding progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={systemUnderstanding}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${systemUnderstanding}%` }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="h-full rounded-full bg-accent shadow-neon"
          />
        </div>
        <p className="mono-metric mt-2 text-xs uppercase tracking-[0.12em] text-foreground/72">{systemUnderstanding}% • {xp} XP</p>
      </div>

      <div className="flex w-full items-center justify-end gap-2 md:w-auto">
        {operatorUnlocked ? (
          <button
            type="button"
            onClick={toggleOperatorMode}
            className={[
              "rounded-md border px-3 py-1.5 text-xs uppercase tracking-wide transition duration-200",
              operatorModeEnabled
                ? "border-accent/70 bg-accent/20 text-foreground"
                : "border-white/20 bg-transparent text-foreground/80 hover:border-accent/60"
            ].join(" ")}
          >
            Operator {operatorModeEnabled ? "On" : "Off"}
          </button>
        ) : (
          <span className="text-xs uppercase tracking-wide text-foreground/45">Operator Locked</span>
        )}

        {executiveBriefUnlocked ? (
          <Link
            href="/#executive-brief"
            className="rounded-md border border-accent/60 bg-accent/10 px-3 py-1.5 text-xs uppercase tracking-wide text-foreground transition hover:bg-accent/15"
          >
            Executive Brief
          </Link>
        ) : null}
      </div>
    </motion.header>
  );
}
