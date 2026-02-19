"use client";

import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { TPMSimulator } from "@/components/field-ops/TPMSimulator";
import { useXpStore } from "@/stores/xp-store";

export function FieldOpsModule() {
  const [roadmapLoad, setRoadmapLoad] = useState(45);

  const { completed, simulatorCompleted, decisionViewed, openModule, runSimulator, viewDecisionExplanation } = useXpStore(
    useShallow((state) => ({
      completed: state.completedModules["field-ops"],
      simulatorCompleted: state.fieldOpsSimulatorRun,
      decisionViewed: state.fieldOpsDecisionViewed,
      openModule: state.openModule,
      runSimulator: state.fieldOpsRunSimulator,
      viewDecisionExplanation: state.fieldOpsViewDecisionExplanation
    }))
  );

  useEffect(() => {
    openModule("field-ops");
  }, [openModule]);

  const loadState = useMemo(() => {
    if (roadmapLoad < 35) {
      return "Structured execution: high confidence and clear sequencing.";
    }

    if (roadmapLoad < 70) {
      return "Balanced load: moderate tradeoff pressure and normal escalation risk.";
    }

    return "High concurrency risk: scope conflicts and coordination drag likely.";
  }, [roadmapLoad]);

  return (
    <div className="space-y-4">
      <section className="surface-card rounded-xl p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-accent/90">TPM Simulator</p>
        <div className="mt-3">
          <TPMSimulator
            simulatorCompleted={simulatorCompleted}
            decisionViewed={decisionViewed}
            onSubmitRanking={runSimulator}
            onRevealDecision={viewDecisionExplanation}
          />
        </div>
      </section>

      <section className="surface-card rounded-xl p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-accent/90">Roadmap Load Visualizer</p>
        <div className="mt-3 space-y-3">
          <label htmlFor="roadmap-load" className="text-sm text-foreground/82">
            Concurrent initiatives: <span className="font-semibold">{roadmapLoad}</span>
          </label>
          <input
            id="roadmap-load"
            type="range"
            min={10}
            max={100}
            step={1}
            value={roadmapLoad}
            onChange={(event) => setRoadmapLoad(Number(event.target.value))}
            className="w-full accent-accent"
          />
          <p className="text-sm text-foreground/75">{loadState}</p>
        </div>
      </section>

      <section className="surface-card rounded-xl p-4">
        {completed ? (
          <p className="text-xs uppercase tracking-wide text-success">Field Ops module completed (+40 XP)</p>
        ) : (
          <p className="text-xs text-foreground/65">Complete the simulator and review the decision explanation to finish this module.</p>
        )}
      </section>
    </div>
  );
}
