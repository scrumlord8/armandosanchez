"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";
import { TPMSimulator } from "@/components/field-ops/TPMSimulator";
import { ModuleNode } from "@/components/ModuleNode";
import { type ModuleId, useXpStore } from "@/stores/xp-store";

type ModuleData = {
  id: ModuleId;
  icon: string;
  label: string;
  tooltip: string;
  orbitPosition: string;
  driftX: number;
  driftY: number;
  driftDuration: number;
  driftDelay: number;
};

const GUIDE_DISMISSED_KEY = "armandoos-guide-dismissed";
const FIRST_OPEN_TOAST_SESSION_KEY = "armandoos-first-open-toast-shown";

const descriptors = ["Senior TPM Leader", "AI Builder", "Systems Thinker", "Dad + Music Builder"];

const modules: ModuleData[] = [
  {
    id: "systems",
    icon: "◎",
    label: "Systems",
    tooltip: "Map leadership frameworks and decision architecture.",
    orbitPosition: "left-4 top-6 md:left-20",
    driftX: 4,
    driftY: 7,
    driftDuration: 8.5,
    driftDelay: 0
  },
  {
    id: "projects",
    icon: "△",
    label: "Projects",
    tooltip: "Index of shipped products and architectural tradeoffs.",
    orbitPosition: "right-4 top-14 md:right-20",
    driftX: 6,
    driftY: 4,
    driftDuration: 9.2,
    driftDelay: 0.8
  },
  {
    id: "field-ops",
    icon: "◫",
    label: "Field Ops",
    tooltip: "Execution models and incident response under pressure.",
    orbitPosition: "-left-2 top-1/2 -translate-y-1/2 md:left-8",
    driftX: 5,
    driftY: 8,
    driftDuration: 10.1,
    driftDelay: 1.2
  },
  {
    id: "lab",
    icon: "◧",
    label: "Lab",
    tooltip: "Experimental builds, prototypes, and agentic workflows.",
    orbitPosition: "right-0 top-1/2 -translate-y-1/2 md:right-8",
    driftX: 3,
    driftY: 6,
    driftDuration: 7.7,
    driftDelay: 0.4
  },
  {
    id: "signal",
    icon: "∿",
    label: "Signal",
    tooltip: "Creative layer where music informs operating rhythm.",
    orbitPosition: "left-6 bottom-12 md:left-24",
    driftX: 4,
    driftY: 5,
    driftDuration: 8.9,
    driftDelay: 1.4
  },
  {
    id: "loyalty",
    icon: "◍",
    label: "Loyalty",
    tooltip: "Identity through teams, resilience, and long-game lessons.",
    orbitPosition: "right-6 bottom-12 md:right-24",
    driftX: 5,
    driftY: 7,
    driftDuration: 9.6,
    driftDelay: 0.6
  },
  {
    id: "origin",
    icon: "✦",
    label: "Origin",
    tooltip: "Constellation of values, family, and builder mindset.",
    orbitPosition: "left-1/2 bottom-3 -translate-x-1/2",
    driftX: 4,
    driftY: 6,
    driftDuration: 8.2,
    driftDelay: 1.1
  }
];

export function MissionControlHub() {
  const [activeModule, setActiveModule] = useState<ModuleId | null>(null);
  const [descriptorIndex, setDescriptorIndex] = useState(0);
  const [showGuideOverlay, setShowGuideOverlay] = useState(false);
  const [guideDismissedForever, setGuideDismissedForever] = useState(false);
  const [showFirstOpenToast, setShowFirstOpenToast] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const toastTimeoutRef = useRef<number | null>(null);
  const zoomTimeoutRef = useRef<number | null>(null);

  const {
    completedModules,
    openedModules,
    systemsNodesOpened,
    projectsViewed,
    projectsViewModeToggled,
    fieldOpsSimulatorRun,
    fieldOpsDecisionViewed,
    labExperimentsOpened,
    signalToneSwitched,
    loyaltyCardsFlipped,
    originStarsHovered,
    easterEggsFound,
    tpmSimulatorCompleted,
    openModule,
    discoverEasterEgg,
    completeTpmSimulator,
    systemsOpenNode,
    projectsViewProject,
    projectsFlipViewToggle,
    fieldOpsRunSimulator,
    fieldOpsViewDecisionExplanation,
    labOpenExperiment,
    signalSwitchTone,
    loyaltyFlipCard,
    originHoverStar
  } = useXpStore(
    useShallow((state) => ({
      completedModules: state.completedModules,
      openedModules: state.openedModules,
      systemsNodesOpened: state.systemsNodesOpened,
      projectsViewed: state.projectsViewed,
      projectsViewModeToggled: state.projectsViewModeToggled,
      fieldOpsSimulatorRun: state.fieldOpsSimulatorRun,
      fieldOpsDecisionViewed: state.fieldOpsDecisionViewed,
      labExperimentsOpened: state.labExperimentsOpened,
      signalToneSwitched: state.signalToneSwitched,
      loyaltyCardsFlipped: state.loyaltyCardsFlipped,
      originStarsHovered: state.originStarsHovered,
      easterEggsFound: state.easterEggsFound,
      tpmSimulatorCompleted: state.tpmSimulatorCompleted,
      openModule: state.openModule,
      discoverEasterEgg: state.discoverEasterEgg,
      completeTpmSimulator: state.completeTpmSimulator,
      systemsOpenNode: state.systemsOpenNode,
      projectsViewProject: state.projectsViewProject,
      projectsFlipViewToggle: state.projectsFlipViewToggle,
      fieldOpsRunSimulator: state.fieldOpsRunSimulator,
      fieldOpsViewDecisionExplanation: state.fieldOpsViewDecisionExplanation,
      labOpenExperiment: state.labOpenExperiment,
      signalSwitchTone: state.signalSwitchTone,
      loyaltyFlipCard: state.loyaltyFlipCard,
      originHoverStar: state.originHoverStar
    }))
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setDescriptorIndex((current) => (current + 1) % descriptors.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const dismissed = window.localStorage.getItem(GUIDE_DISMISSED_KEY) === "true";
    setGuideDismissedForever(dismissed);
  }, []);

  useEffect(() => {
    if (!showGuideOverlay) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowGuideOverlay(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showGuideOverlay]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
      if (zoomTimeoutRef.current) {
        window.clearTimeout(zoomTimeoutRef.current);
      }
    };
  }, []);

  function triggerZoomTransition() {
    setIsZooming(true);

    if (zoomTimeoutRef.current) {
      window.clearTimeout(zoomTimeoutRef.current);
    }

    zoomTimeoutRef.current = window.setTimeout(() => setIsZooming(false), 360);
  }

  function maybeShowFirstOpenToast(wasFirstOpen: boolean) {
    if (!wasFirstOpen) {
      return;
    }

    const shown = window.sessionStorage.getItem(FIRST_OPEN_TOAST_SESSION_KEY) === "true";
    if (shown) {
      return;
    }

    window.sessionStorage.setItem(FIRST_OPEN_TOAST_SESSION_KEY, "true");
    setShowFirstOpenToast(true);

    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = window.setTimeout(() => setShowFirstOpenToast(false), 1700);
  }

  function handleModuleOpen(moduleId: ModuleId) {
    const wasFirstOpen = !openedModules[moduleId];
    setActiveModule(moduleId);
    openModule(moduleId);
    triggerZoomTransition();
    maybeShowFirstOpenToast(wasFirstOpen);
  }

  function handleCoreNodeClick() {
    if (guideDismissedForever) {
      return;
    }

    setShowGuideOverlay(true);
  }

  function dismissGuideForever() {
    window.localStorage.setItem(GUIDE_DISMISSED_KEY, "true");
    setGuideDismissedForever(true);
    setShowGuideOverlay(false);
  }

  function moduleActions() {
    if (!activeModule) {
      return <p className="text-sm text-foreground/70">Open a module to start collecting XP and unlock Operator Mode.</p>;
    }

    if (activeModule === "systems") {
      return (
        <div className="space-y-2">
          <p className="text-sm text-foreground/80">Open leadership nodes: {systemsNodesOpened}/3</p>
          <button type="button" onClick={() => systemsOpenNode()} className="rounded border border-white/20 px-3 py-1.5 text-sm">
            Explore Node
          </button>
        </div>
      );
    }

    if (activeModule === "projects") {
      return (
        <div className="space-y-2 text-sm">
          <p className="text-foreground/80">Viewed projects: {Object.keys(projectsViewed).length}/2</p>
          <p className="text-foreground/80">PM/Eng toggled: {projectsViewModeToggled ? "Yes" : "No"}</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/projects/atlas"
              onClick={() => projectsViewProject("atlas")}
              className="rounded border border-white/20 px-3 py-1.5"
            >
              View Atlas
            </Link>
            <Link
              href="/projects/signal-ai"
              onClick={() => projectsViewProject("signal-ai")}
              className="rounded border border-white/20 px-3 py-1.5"
            >
              View Signal AI
            </Link>
            <button type="button" onClick={projectsFlipViewToggle} className="rounded border border-white/20 px-3 py-1.5">
              Flip PM/Eng
            </button>
          </div>
          <Link href="/projects" className="inline-block text-xs uppercase tracking-wide text-accent/90">
            Open Project Index
          </Link>
        </div>
      );
    }

    if (activeModule === "field-ops") {
      return (
        <TPMSimulator
          simulatorCompleted={fieldOpsSimulatorRun}
          decisionViewed={fieldOpsDecisionViewed}
          onSubmitRanking={fieldOpsRunSimulator}
          onRevealDecision={fieldOpsViewDecisionExplanation}
        />
      );
    }

    if (activeModule === "lab") {
      return (
        <div className="space-y-2 text-sm">
          <p className="text-foreground/80">Experiments opened: {Object.keys(labExperimentsOpened).length}/2</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => labOpenExperiment("agent-sandbox")} className="rounded border border-white/20 px-3 py-1.5">
              Open Agent Sandbox
            </button>
            <button type="button" onClick={() => labOpenExperiment("atlas-proto")} className="rounded border border-white/20 px-3 py-1.5">
              Open Atlas Prototype
            </button>
          </div>
        </div>
      );
    }

    if (activeModule === "signal") {
      return (
        <div className="space-y-2 text-sm">
          <p className="text-foreground/80">Tone switched: {signalToneSwitched ? "Done" : "Pending"}</p>
          <button type="button" onClick={signalSwitchTone} className="rounded border border-white/20 px-3 py-1.5">
            Switch Tone
          </button>
        </div>
      );
    }

    if (activeModule === "loyalty") {
      return (
        <div className="space-y-2 text-sm">
          <p className="text-foreground/80">Cards flipped: {Object.keys(loyaltyCardsFlipped).length}/2</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => loyaltyFlipCard("giants")} className="rounded border border-white/20 px-3 py-1.5">
              Flip Giants Card
            </button>
            <button type="button" onClick={() => loyaltyFlipCard("niners")} className="rounded border border-white/20 px-3 py-1.5">
              Flip 49ers Card
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-2 text-sm">
        <p className="text-foreground/80">Stars hovered: {Object.keys(originStarsHovered).length}/4</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => originHoverStar("husband")} className="rounded border border-white/20 px-3 py-1.5">
            Hover Husband
          </button>
          <button type="button" onClick={() => originHoverStar("dad")} className="rounded border border-white/20 px-3 py-1.5">
            Hover Dad
          </button>
          <button type="button" onClick={() => originHoverStar("builder")} className="rounded border border-white/20 px-3 py-1.5">
            Hover Builder
          </button>
          <button
            type="button"
            onClick={() => originHoverStar("systems-thinker")}
            className="rounded border border-white/20 px-3 py-1.5"
          >
            Hover Systems Thinker
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="surface-panel relative z-10 mt-8 rounded-2xl p-4 md:p-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ scale: isZooming ? 1.06 : 1, opacity: 1 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
        className="relative mx-auto flex h-[400px] w-full max-w-4xl items-center justify-center md:h-[540px]"
      >
        <div className="hidden md:block">
          {modules.map((module) => {
            return (
              <ModuleNode
                key={module.id}
                icon={module.icon}
                label={module.label}
                tooltip={module.tooltip}
                unlockedState={openedModules[module.id]}
                completionState={completedModules[module.id]}
                xpValue={openedModules[module.id] ? 40 : 10}
                orbitPosition={module.orbitPosition}
                driftX={module.driftX}
                driftY={module.driftY}
                driftDuration={module.driftDuration}
                driftDelay={module.driftDelay}
                onClick={() => handleModuleOpen(module.id)}
              />
            );
          })}
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          onClick={handleCoreNodeClick}
          aria-haspopup="dialog"
          aria-expanded={showGuideOverlay}
          aria-controls="how-to-explore-dialog"
          className="surface-card z-30 w-52 rounded-full border border-accent/35 p-5 text-center shadow-neon md:w-72 md:p-7"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-accent/90">Core Node</p>
          <h2 className="mt-2 text-2xl font-semibold md:text-3xl">ArmandoOS</h2>
          <AnimatePresence mode="wait">
            <motion.p
              key={descriptors[descriptorIndex]}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mt-3 text-sm text-foreground/80"
            >
              {descriptors[descriptorIndex]}
            </motion.p>
          </AnimatePresence>
          <p className="text-micro mt-3 text-xs uppercase tracking-wide">Open exploration guide</p>
        </motion.button>
      </motion.div>

      <div className="mx-auto mt-4 grid w-full max-w-4xl grid-cols-2 gap-2 md:hidden">
        {modules.map((module) => (
          <button
            key={module.id}
            type="button"
            onClick={() => handleModuleOpen(module.id)}
            aria-label={`Open ${module.label} module`}
            className="surface-card rounded px-2 py-2 text-left text-xs"
          >
            <span className="mr-1 text-accent/90">{module.icon}</span>
            <span>{module.label}</span>
          </button>
        ))}
      </div>

      <div className="mx-auto mt-6 grid w-full max-w-4xl gap-4 md:grid-cols-2">
        <div className="surface-card rounded-xl p-4">
          <h3 className="text-sm uppercase tracking-[0.16em] text-accent/90">Module Progress</h3>
          <div className="mt-3">{moduleActions()}</div>
          {activeModule && completedModules[activeModule] ? (
            <p className="mt-3 text-xs uppercase tracking-wide text-success">Module completed (+40 XP)</p>
          ) : null}
        </div>

        <div className="surface-card rounded-xl p-4">
          <h3 className="text-sm uppercase tracking-[0.16em] text-accent/90">System XP Events</h3>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <button
              type="button"
              onClick={() => discoverEasterEgg(`egg-${Object.keys(easterEggsFound).length + 1}`)}
              className="rounded border border-white/20 px-3 py-1.5"
            >
              Register Hidden Signal (+50)
            </button>
            <button
              type="button"
              onClick={completeTpmSimulator}
              className="rounded border border-white/20 px-3 py-1.5"
            >
              Mark TPM Simulation Complete (+100)
            </button>
          </div>
          <p className="mt-3 text-xs text-foreground/70">Easter eggs found: {Object.keys(easterEggsFound).length}</p>
          <p className="mt-1 text-xs text-foreground/70">TPM simulator: {tpmSimulatorCompleted ? "Completed" : "Not completed"}</p>
        </div>
      </div>

      <AnimatePresence>
        {showGuideOverlay ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex items-center justify-center bg-black/72 p-4"
          >
            <motion.div
              id="how-to-explore-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="how-to-explore-title"
              initial={{ y: 14, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 10, opacity: 0 }}
              className="surface-panel w-full max-w-md rounded-xl p-5"
            >
              <p id="how-to-explore-title" className="text-xs uppercase tracking-[0.2em] text-accent/90">Exploration Guide</p>
              <p className="mt-3 text-sm text-foreground/85">Open a module node, complete its actions, and raise System Understanding to unlock Operator Mode.</p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowGuideOverlay(false)}
                  aria-label="Close how to explore dialog"
                  className="rounded border border-white/20 px-3 py-1.5 text-xs uppercase tracking-wide transition hover:border-accent/45"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={dismissGuideForever}
                  aria-label="Don't show how to explore dialog again"
                  className="rounded border border-accent/60 bg-accent/10 px-3 py-1.5 text-xs uppercase tracking-wide transition hover:bg-accent/15"
                >
                  Don&apos;t Show Again
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {showFirstOpenToast ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: -3 }}
            exit={{ opacity: 0, y: -10 }}
            role="status"
            aria-live="polite"
            className="mono-metric fixed right-2 top-20 z-50 rounded-md border border-accent/50 bg-backgroundElevated px-3 py-2 text-xs uppercase tracking-[0.14em] text-foreground shadow-neon md:right-4 md:top-24 md:text-sm"
          >
            +10 XP
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
