"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type BranchId = "work" | "ai" | "projects" | "pressure" | "personal";

type BranchSectionItem = {
  title: string;
  body: string;
  details: string[];
};

type Branch = {
  id: BranchId;
  label: string;
  header: string;
  intro: string;
  sections: BranchSectionItem[];
};

const branches: Branch[] = [
  {
    id: "work",
    label: "Work",
    header: "Work",
    intro: "I build execution systems that keep teams aligned through uncertainty.",
    sections: [
      {
        title: "Roadmap Architecture",
        body: "I structure roadmap layers so leadership intent and delivery reality stay connected.",
        details: ["Portfolio framing", "Dependency mapping", "Decision cadence design"]
      },
      {
        title: "Capacity Logic",
        body: "I model constraints early, which keeps planning grounded and sequencing realistic.",
        details: ["Team allocation signals", "Risk-adjusted sequencing", "Delivery confidence checkpoints"]
      }
    ]
  },
  {
    id: "ai",
    label: "AI",
    header: "AI",
    intro: "I use AI as a practical systems multiplier, not a novelty layer.",
    sections: [
      {
        title: "Agentic Workflows",
        body: "I design workflows where agents handle repetitive synthesis and humans own judgment.",
        details: ["Prompted operations playbooks", "Review loops", "Constraint-aware automation"]
      },
      {
        title: "Experiment Discipline",
        body: "I run small tests with clear success criteria, then scale only what proves useful.",
        details: ["Hypothesis-first pilots", "Fast failure thresholds", "Reusable patterns"]
      }
    ]
  },
  {
    id: "projects",
    label: "Projects",
    header: "Projects",
    intro: "I ship focused builds that solve one hard problem with clear interaction design.",
    sections: [
      {
        title: "Signal",
        body: "A branching identity experience designed to communicate structure through restraint.",
        details: ["Narrative architecture", "Progressive interaction", "Performance-first build approach"]
      },
      {
        title: "Atlas",
        body: "A project framing system that turns messy context into executable workstreams.",
        details: ["Scope decomposition", "Execution snapshots", "Leadership briefing output"]
      }
    ]
  },
  {
    id: "pressure",
    label: "Pressure",
    header: "Pressure",
    intro: "Under pressure, I prioritize signal over noise and sequence decisions deliberately.",
    sections: [
      {
        title: "Decision Framework",
        body: "I separate irreversible from reversible choices before assigning energy and escalation.",
        details: ["Time-to-impact lens", "Consequence mapping", "Owner accountability"]
      },
      {
        title: "Communication Under Load",
        body: "I keep messaging brief, directional, and tied to the next executable action.",
        details: ["Current state clarity", "Known unknowns", "Immediate path forward"]
      }
    ]
  },
  {
    id: "personal",
    label: "Personal",
    header: "Personal",
    intro: "Family, sports, music, and entrepreneurship keep my thinking grounded and human.",
    sections: [
      {
        title: "Foundation",
        body: "Family is the center of my operating system and the lens for long-term decisions.",
        details: ["Commitment", "Consistency", "Perspective"]
      },
      {
        title: "Energy Sources",
        body: "Giants, 49ers, and music sharpen my focus, recovery, and creative rhythm.",
        details: ["Team loyalty", "Competitive mindset", "Creative reset"]
      }
    ]
  }
];

export function BranchSection() {
  const [activeBranch, setActiveBranch] = useState<BranchId | null>(null);
  const [hoveredBranch, setHoveredBranch] = useState<BranchId | null>(null);

  const selectedBranch = useMemo(
    () => branches.find((branch) => branch.id === activeBranch) ?? null,
    [activeBranch]
  );

  return (
    <section className="signal-section signal-section-branches" aria-label="Branch selection">
      <div className="signal-content">
        <nav className="signal-branch-nav" aria-label="Content branches">
          {branches.map((branch) => {
            const isActive = activeBranch === branch.id;
            const shouldDim = activeBranch !== null && !isActive;
            const isHovered = hoveredBranch === branch.id;

            return (
              <button
                key={branch.id}
                type="button"
                className={`signal-branch-label${isActive ? " is-active" : ""}${shouldDim ? " is-dimmed" : ""}${
                  isHovered ? " is-hovered" : ""
                }`}
                aria-pressed={isActive}
                onClick={() => setActiveBranch(branch.id)}
                onMouseEnter={() => setHoveredBranch(branch.id)}
                onMouseLeave={() => setHoveredBranch(null)}
                onFocus={() => setHoveredBranch(branch.id)}
                onBlur={() => setHoveredBranch(null)}
              >
                {branch.label}
              </button>
            );
          })}
        </nav>

        <div className="signal-branch-content">
          <AnimatePresence mode="wait">
            {selectedBranch ? (
              <motion.article
                key={selectedBranch.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="signal-branch-header">{selectedBranch.header}</h2>
                <p className="signal-branch-intro">{selectedBranch.intro}</p>
                <div className="signal-branch-sections">
                  {selectedBranch.sections.map((section) => (
                    <details key={section.title} className="signal-detail-panel">
                      <summary>{section.title}</summary>
                      <p>{section.body}</p>
                      <ul>
                        {section.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    </details>
                  ))}
                </div>
              </motion.article>
            ) : (
              <motion.p
                key="placeholder"
                className="signal-branch-placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                Select a branch to expand the narrative.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
