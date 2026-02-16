"use client";

import { useShallow } from "zustand/react/shallow";
import { useXpStore } from "@/stores/xp-store";

export function ExecutiveBriefPanel() {
  const { executiveBriefUnlocked, operatorModeEnabled } = useXpStore(
    useShallow((state) => ({
      executiveBriefUnlocked: state.executiveBriefUnlocked,
      operatorModeEnabled: state.operatorModeEnabled
    }))
  );

  if (!executiveBriefUnlocked) {
    return null;
  }

  return (
    <section
      id="executive-brief"
      className={[
        "relative z-10 mt-6 rounded-2xl p-5 md:p-8",
        operatorModeEnabled ? "surface-panel border-accent/45" : "surface-panel"
      ].join(" ")}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-accent/90">Executive Brief</p>
      <h2 className="mt-2 text-2xl font-semibold">System Fully Mapped</h2>
      <p className="mt-3 max-w-3xl text-sm text-foreground/82">
        ArmandoOS demonstrates a leadership operating model built around systems clarity, practical AI enablement,
        and calm execution under pressure. The core differentiator is structured decision quality at scale.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <article className="surface-card rounded-lg p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-accent/85">Leadership Signal</p>
          <p className="mt-2 text-sm text-foreground/82">Balances strategic framing with execution discipline across cross-functional systems.</p>
        </article>
        <article className="surface-card rounded-lg p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-accent/85">Builder Signal</p>
          <p className="mt-2 text-sm text-foreground/82">Ships interactive, data-informed experiences that communicate technical credibility clearly.</p>
        </article>
        <article className="surface-card rounded-lg p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-accent/85">Operator Signal</p>
          <p className="mt-2 text-sm text-foreground/82">Prioritizes risk containment, compounding value, and organizational throughput.</p>
        </article>
      </div>

      <button
        type="button"
        className="mt-5 rounded-md border border-accent/60 bg-accent/10 px-4 py-2 text-xs uppercase tracking-[0.14em]"
      >
        Download Executive Summary (Placeholder)
      </button>
    </section>
  );
}
