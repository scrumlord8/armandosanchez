"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";
import { useXpStore } from "@/stores/xp-store";

type SystemsNode = {
  id: string;
  label: string;
  teaser: string;
  context: string;
  action: string;
  result: string;
  reflection: string;
  x: number;
  y: number;
};

const systemsNodes: SystemsNode[] = [
  {
    id: "roadmap-architecture",
    label: "Roadmap Architecture",
    teaser: "Structured sequencing across dependencies.",
    context: "Multiple initiatives shared infra dependencies and release windows.",
    action: "Mapped critical path milestones and staged delivery with explicit decision gates.",
    result: "Reduced cross-team blocking risk and improved forecast confidence for leadership.",
    reflection: "Architecture thinking applies to roadmaps as much as codebases.",
    x: 20,
    y: 18
  },
  {
    id: "incident-framework",
    label: "Incident Decision Framework",
    teaser: "Severity clarity under pressure.",
    context: "Incident responses were inconsistent across squads during peak events.",
    action: "Standardized severity criteria and escalation paths with role ownership.",
    result: "Faster triage and more consistent executive updates during active incidents.",
    reflection: "Calm execution is usually the product of clear operating rules.",
    x: 76,
    y: 20
  },
  {
    id: "capacity-modeling",
    label: "Capacity Modeling",
    teaser: "Realistic planning under load.",
    context: "Delivery plans routinely exceeded actual team capacity.",
    action: "Introduced weighted capacity scoring and scenario-based planning.",
    result: "Improved on-time delivery rates and reduced emergency reprioritization churn.",
    reflection: "Visible constraints create better prioritization conversations.",
    x: 12,
    y: 50
  },
  {
    id: "ai-enablement",
    label: "AI Enablement",
    teaser: "Practical AI, not novelty AI.",
    context: "Teams wanted AI acceleration but lacked repeatable integration patterns.",
    action: "Built a pilot playbook with guardrails, confidence thresholds, and reviews.",
    result: "Increased productivity with reduced rollout risk and clearer adoption metrics.",
    reflection: "Enablement succeeds when experimentation and control are both present.",
    x: 86,
    y: 50
  },
  {
    id: "executive-communication",
    label: "Executive Communication",
    teaser: "Signal over noise for leadership.",
    context: "Status updates mixed tactical details with strategic decisions.",
    action: "Shifted to decision-first narratives with explicit risk and dependency framing.",
    result: "Faster alignment and fewer reactive status escalations.",
    reflection: "Good communication is a systems design problem.",
    x: 28,
    y: 82
  },
  {
    id: "talent-development",
    label: "Talent Development",
    teaser: "Scaling leaders, not just output.",
    context: "Rapid growth increased mentorship load and execution variance.",
    action: "Implemented operating playbooks and rotation opportunities for emerging leads.",
    result: "Stronger delegation confidence and more resilient team execution.",
    reflection: "Long-term velocity depends on leadership depth.",
    x: 72,
    y: 82
  }
];

const edges: Array<[string, string]> = [
  ["roadmap-architecture", "capacity-modeling"],
  ["roadmap-architecture", "executive-communication"],
  ["incident-framework", "ai-enablement"],
  ["incident-framework", "executive-communication"],
  ["capacity-modeling", "talent-development"],
  ["ai-enablement", "talent-development"],
  ["executive-communication", "talent-development"]
];

const nodeMap = Object.fromEntries(systemsNodes.map((node) => [node.id, node])) as Record<string, SystemsNode>;

export function SystemsLeadershipMap() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(systemsNodes[0].id);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const { systemsNodesOpened, systemsOpenedNodeIds, systemsCompleted, openModule, systemsOpenNode } = useXpStore(
    useShallow((state) => ({
      systemsNodesOpened: state.systemsNodesOpened,
      systemsOpenedNodeIds: state.systemsOpenedNodeIds,
      systemsCompleted: state.completedModules.systems,
      openModule: state.openModule,
      systemsOpenNode: state.systemsOpenNode
    }))
  );

  const selectedNode = nodeMap[selectedNodeId];

  useEffect(() => {
    openModule("systems");
  }, [openModule]);

  const focusNodeId = hoveredNodeId ?? selectedNodeId;

  const connectedNodes = useMemo(() => {
    const ids = new Set<string>([focusNodeId]);

    edges.forEach(([a, b]) => {
      if (a === focusNodeId) {
        ids.add(b);
      }
      if (b === focusNodeId) {
        ids.add(a);
      }
    });

    return ids;
  }, [focusNodeId]);

  function handleNodeSelect(nodeId: string) {
    setSelectedNodeId(nodeId);
    systemsOpenNode(nodeId);
  }

  return (
    <div className="grid gap-4 md:grid-cols-[1.25fr_1fr]">
      <section className="surface-card rounded-xl p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm uppercase tracking-[0.18em] text-accent/90">Systems Map</h2>
          <p className="text-xs uppercase tracking-wide text-foreground/70">Explored {systemsNodesOpened}/3</p>
        </div>

        <div className="mt-3 space-y-2 md:hidden">
          {systemsNodes.map((node) => {
            const explored = Boolean(systemsOpenedNodeIds[node.id]);
            const isSelected = selectedNodeId === node.id;

            return (
              <button
                key={node.id}
                type="button"
                onClick={() => handleNodeSelect(node.id)}
                className={[
                  "w-full rounded-md border px-3 py-2 text-left",
                  explored ? "border-accent/55" : "border-white/20",
                  isSelected ? "bg-accent/10" : "bg-black/55"
                ].join(" ")}
              >
                <p className="text-sm font-medium">{node.label}</p>
                <p className="mt-1 text-xs text-foreground/70">{node.teaser}</p>
              </button>
            );
          })}
        </div>

        <div className="relative mt-3 hidden h-[420px] rounded-lg border border-white/10 bg-[#070d18] md:block">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {edges.map(([a, b]) => {
              const from = nodeMap[a];
              const to = nodeMap[b];
              const highlighted = a === focusNodeId || b === focusNodeId;

              return (
                <motion.line
                  key={`${a}-${b}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={highlighted ? "rgba(var(--accent-rgb), 0.9)" : "rgba(148, 163, 184, 0.26)"}
                  strokeWidth={highlighted ? 0.42 : 0.22}
                  initial={{ opacity: 0.45 }}
                  animate={{ opacity: highlighted ? 1 : 0.35 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                />
              );
            })}
          </svg>

          {systemsNodes.map((node) => {
            const explored = Boolean(systemsOpenedNodeIds[node.id]);
            const isSelected = selectedNodeId === node.id;
            const shouldDim = !connectedNodes.has(node.id);

            return (
              <motion.button
                key={node.id}
                type="button"
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onFocus={() => setHoveredNodeId(node.id)}
                onBlur={() => setHoveredNodeId(null)}
                onClick={() => handleNodeSelect(node.id)}
                whileHover={{ scale: 1.08 }}
                aria-label={`Open systems node ${node.label}`}
                className={[
                  "group absolute -translate-x-1/2 -translate-y-1/2 rounded-full border transition duration-200",
                  "h-5 w-5 bg-background/90",
                  explored ? "border-accent/70" : "border-white/35",
                  isSelected ? "shadow-neon" : "",
                  shouldDim ? "opacity-45" : "opacity-100"
                ].join(" ")}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <span
                  className={[
                    "absolute left-1/2 top-6 w-28 -translate-x-1/2 text-center text-[10px] uppercase tracking-[0.14em] text-foregroundMuted transition",
                    isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                  ].join(" ")}
                >
                  {node.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {systemsCompleted ? (
          <p className="mt-3 text-xs uppercase tracking-wide text-success">Systems module completed (+40 XP)</p>
        ) : null}
      </section>

      <aside className="surface-card rounded-xl p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-accent/90">Selected Node</p>
        <h3 className="mt-2 text-xl font-semibold">{selectedNode.label}</h3>

        <div className="mt-4 space-y-3 text-sm">
          <div>
            <p className="text-xs uppercase tracking-wide text-foreground/60">Context</p>
            <p className="mt-1 text-foreground/82">{selectedNode.context}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-foreground/60">Action Taken</p>
            <p className="mt-1 text-foreground/82">{selectedNode.action}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-foreground/60">Measurable Result</p>
            <p className="mt-1 text-foreground/82">{selectedNode.result}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-foreground/60">Reflection</p>
            <p className="mt-1 text-foreground/82">{selectedNode.reflection}</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
