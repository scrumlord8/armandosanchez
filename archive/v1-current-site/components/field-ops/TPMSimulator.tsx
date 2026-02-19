"use client";

import { useMemo, useState } from "react";

type Initiative = {
  id: string;
  name: string;
  blurb: string;
  impactSignals: string[];
};

type JudgmentItem = {
  id: string;
  principle: string;
  rationale: string;
};

type TPMSimulatorProps = {
  simulatorCompleted: boolean;
  decisionViewed: boolean;
  onSubmitRanking: () => void;
  onRevealDecision: () => void;
};

const initiatives: Initiative[] = [
  {
    id: "payments-reliability",
    name: "Payment Reliability Stabilization",
    blurb: "Checkout retries are rising during peak windows across two regions.",
    impactSignals: ["Revenue Exposure: High", "Customer Impact: High", "Delivery Window: Immediate"]
  },
  {
    id: "ai-assistant",
    name: "Internal AI Support Assistant",
    blurb: "Deflect repetitive support tasks with guided, policy-aware responses.",
    impactSignals: ["Compounding Value: High", "Execution Risk: Medium", "Time to Value: 6-8 weeks"]
  },
  {
    id: "data-contracts",
    name: "Cross-Team Data Contract Program",
    blurb: "Reduce downstream breakages by formalizing schema ownership and change controls.",
    impactSignals: ["Risk Containment: High", "Stakeholder Load: Medium", "Adoption Dependency: High"]
  },
  {
    id: "onboarding-refresh",
    name: "Customer Onboarding Refresh",
    blurb: "Improve first-30-day activation with clearer setup flows and playbooks.",
    impactSignals: ["Customer Impact: Medium", "Growth Influence: Medium", "Operational Complexity: Low"]
  },
  {
    id: "cost-observability",
    name: "Cloud Cost Observability Upgrade",
    blurb: "Add granular service-level cost visibility and guardrails for scaling teams.",
    impactSignals: ["Efficiency Gain: Medium", "Risk Containment: Medium", "Compounding Value: Medium"]
  }
];

const judgmentModel: JudgmentItem[] = [
  {
    id: "payments-reliability",
    principle: "Customer Impact + Risk Containment",
    rationale:
      "Revenue and trust are both exposed now. Stabilizing payment reliability is the highest-leverage move under time pressure."
  },
  {
    id: "data-contracts",
    principle: "Operational Reality",
    rationale:
      "Contract discipline prevents recurring cross-team incidents. It is foundational for reducing avoidable execution drag."
  },
  {
    id: "ai-assistant",
    principle: "Compounding Value",
    rationale:
      "Once reliability fundamentals are protected, this creates durable productivity lift across multiple teams."
  },
  {
    id: "onboarding-refresh",
    principle: "Customer Impact",
    rationale:
      "Improving activation matters, but urgency is lower than active revenue risk and systemic reliability dependencies."
  },
  {
    id: "cost-observability",
    principle: "Operational Efficiency",
    rationale:
      "Important for scale discipline, but impact timing is less immediate than core stability and coordination priorities."
  }
];

export function TPMSimulator({
  simulatorCompleted,
  decisionViewed,
  onSubmitRanking,
  onRevealDecision
}: TPMSimulatorProps) {
  const [orderedIds, setOrderedIds] = useState<string[]>(initiatives.map((initiative) => initiative.id));
  const [submitted, setSubmitted] = useState(false);

  const orderedInitiatives = useMemo(() => {
    const lookup = new Map(initiatives.map((initiative) => [initiative.id, initiative]));
    return orderedIds.map((id) => lookup.get(id)).filter((item): item is Initiative => Boolean(item));
  }, [orderedIds]);

  function moveItem(index: number, direction: "up" | "down") {
    const swapWith = direction === "up" ? index - 1 : index + 1;
    if (swapWith < 0 || swapWith >= orderedIds.length) {
      return;
    }

    const nextOrder = [...orderedIds];
    const [current] = nextOrder.splice(index, 1);
    nextOrder.splice(swapWith, 0, current);
    setOrderedIds(nextOrder);
  }

  function submitRanking() {
    if (submitted) {
      return;
    }

    setSubmitted(true);
    onSubmitRanking();
  }

  return (
    <div className="space-y-3 text-sm">
      <p className="text-foreground/85">Rank these initiatives from 1-5 based on first-priority order under constrained capacity.</p>

      <div className="space-y-2">
        {orderedInitiatives.map((initiative, index) => (
          <div key={initiative.id} className="rounded-lg border border-white/10 bg-black/35 p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-accent/85">Priority {index + 1}</p>
                <p className="mt-1 font-medium text-foreground">{initiative.name}</p>
                <p className="mt-1 text-xs text-foreground/75">{initiative.blurb}</p>
                <p className="mt-2 text-xs text-foreground/60">{initiative.impactSignals.join(" • ")}</p>
              </div>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => moveItem(index, "up")}
                  disabled={submitted || index === 0}
                  className="rounded border border-white/20 px-2 py-1 text-xs disabled:opacity-35"
                >
                  Up
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(index, "down")}
                  disabled={submitted || index === orderedInitiatives.length - 1}
                  className="rounded border border-white/20 px-2 py-1 text-xs disabled:opacity-35"
                >
                  Down
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={submitRanking}
          disabled={submitted}
          className="rounded border border-white/20 px-3 py-1.5 text-xs uppercase tracking-wide disabled:opacity-40"
        >
          Submit Ranking
        </button>
        <span className="text-xs text-foreground/65">{simulatorCompleted ? "Simulator complete" : "Simulator pending"}</span>
      </div>

      {submitted ? (
        <div className="surface-card rounded-lg p-3">
          <p className="text-xs uppercase tracking-[0.18em] text-accent/85">Reference Ranking Model</p>
          <ol className="mt-3 space-y-2">
            {judgmentModel.map((item, index) => {
              const ranked = initiatives.find((initiative) => initiative.id === item.id);
              if (!ranked) {
                return null;
              }

              return (
              <li key={item.id} className="surface-card rounded p-2">
                  <p className="text-xs uppercase tracking-wide text-foreground/60">Rank {index + 1}</p>
                  <p className="mt-1 text-sm font-medium">{ranked.name}</p>
                  <p className="mt-1 text-xs text-accent/90">Decision Principle: {item.principle}</p>
                  <p className="mt-1 text-xs text-foreground/75">{item.rationale}</p>
                </li>
              );
            })}
          </ol>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onRevealDecision}
              className="rounded border border-accent/60 bg-accent/10 px-3 py-1.5 text-xs uppercase tracking-wide"
            >
              Review Decision Rationale
            </button>
            <span className="text-xs text-foreground/65">{decisionViewed ? "Explanation viewed" : "Explanation pending"}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
