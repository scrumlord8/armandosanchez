export type ProjectViewCopy = {
  approach: string;
  impactLearnings: string;
};

export type ProjectDetail = {
  slug: string;
  title: string;
  problem: string;
  architecture: string;
  links: { label: string; href: string }[];
  views: {
    pm: ProjectViewCopy;
    engineering: ProjectViewCopy;
  };
};

export const projects: ProjectDetail[] = [
  {
    slug: "atlas",
    title: "Atlas Workflow Assistant",
    problem:
      "Execution planning was fragmented across docs, chat threads, and ad-hoc status updates, which made delivery risk difficult to surface early.",
    architecture:
      "Placeholder: architecture diagram area for request intake, planning agent, and delivery telemetry loop.",
    links: [
      { label: "GitHub (placeholder)", href: "#" },
      { label: "Demo (placeholder)", href: "#" }
    ],
    views: {
      pm: {
        approach:
          "Defined scope boundaries with stakeholders, prioritized a narrow first release, and aligned on measurable operating outcomes before implementation.",
        impactLearnings:
          "Created clearer decision cadence and faster risk visibility. Main learning: tight stakeholder alignment is what makes AI tooling adoption practical."
      },
      engineering: {
        approach:
          "Implemented a modular pipeline with typed task schemas, deterministic action handlers, and a thin orchestration layer for predictable outputs.",
        impactLearnings:
          "Reduced context-switch overhead and improved reproducibility of planning workflows. Main learning: strict interfaces matter more than model cleverness."
      }
    }
  },
  {
    slug: "signal-ai",
    title: "Signal AI Triage",
    problem:
      "Incident signals arrived from multiple systems with inconsistent severity framing, slowing prioritization during high-pressure windows.",
    architecture:
      "Placeholder: architecture diagram area for ingest, signal normalization, severity scoring, and human-in-the-loop escalation.",
    links: [
      { label: "GitHub (placeholder)", href: "#" },
      { label: "Live Runbook (placeholder)", href: "#" }
    ],
    views: {
      pm: {
        approach:
          "Established severity definitions with leadership, designed rollout phases around operational readiness, and embedded review checkpoints for trust.",
        impactLearnings:
          "Improved clarity in cross-functional incident prioritization. Main learning: governance and language consistency drive real execution speed."
      },
      engineering: {
        approach:
          "Built a signal normalization service and rule-based scoring baseline, then layered model-assisted suggestions behind explicit confidence thresholds.",
        impactLearnings:
          "Increased triage consistency while preserving operator control. Main learning: pair AI recommendations with transparent fallback logic."
      }
    }
  }
];

export const projectBySlug = Object.fromEntries(projects.map((project) => [project.slug, project])) as Record<string, ProjectDetail>;
