"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const XP_RULES = {
  firstModuleOpen: 10,
  moduleComplete: 40,
  easterEgg: 50,
  tpmSimulator: 100
} as const;

const UNDERSTANDING_TARGET_XP = 350;

export type ModuleId = "systems" | "projects" | "field-ops" | "lab" | "signal" | "loyalty" | "origin";

type XpState = {
  xp: number;
  systemUnderstanding: number;
  operatorUnlocked: boolean;
  executiveBriefUnlocked: boolean;
  operatorModeEnabled: boolean;
  openedModules: Record<ModuleId, boolean>;
  completedModules: Record<ModuleId, boolean>;
  systemsNodesOpened: number;
  systemsOpenedNodeIds: Record<string, boolean>;
  projectsViewed: Record<string, boolean>;
  projectsViewModeToggled: boolean;
  fieldOpsSimulatorRun: boolean;
  fieldOpsDecisionViewed: boolean;
  labExperimentsOpened: Record<string, boolean>;
  signalToneSwitched: boolean;
  loyaltyCardsFlipped: Record<string, boolean>;
  originStarsHovered: Record<string, boolean>;
  easterEggsFound: Record<string, boolean>;
  tpmSimulatorCompleted: boolean;
  openModule: (moduleId: ModuleId) => void;
  discoverEasterEgg: (eggId: string) => void;
  completeTpmSimulator: () => void;
  systemsOpenNode: (nodeId?: string) => void;
  projectsViewProject: (projectId: string) => void;
  projectsFlipViewToggle: () => void;
  fieldOpsRunSimulator: () => void;
  fieldOpsViewDecisionExplanation: () => void;
  labOpenExperiment: (experimentId: string) => void;
  signalSwitchTone: () => void;
  loyaltyFlipCard: (cardId: string) => void;
  originHoverStar: (starId: string) => void;
  toggleOperatorMode: () => void;
};

type PersistedXpState = Pick<
  XpState,
  | "xp"
  | "systemUnderstanding"
  | "operatorUnlocked"
  | "executiveBriefUnlocked"
  | "operatorModeEnabled"
  | "openedModules"
  | "completedModules"
  | "systemsNodesOpened"
  | "systemsOpenedNodeIds"
  | "projectsViewed"
  | "projectsViewModeToggled"
  | "fieldOpsSimulatorRun"
  | "fieldOpsDecisionViewed"
  | "labExperimentsOpened"
  | "signalToneSwitched"
  | "loyaltyCardsFlipped"
  | "originStarsHovered"
  | "easterEggsFound"
  | "tpmSimulatorCompleted"
>;

const moduleDefaults: Record<ModuleId, boolean> = {
  systems: false,
  projects: false,
  "field-ops": false,
  lab: false,
  signal: false,
  loyalty: false,
  origin: false
};

function deriveUnlockState(xp: number) {
  const systemUnderstanding = Math.min(100, Math.round((xp / UNDERSTANDING_TARGET_XP) * 100));
  const operatorUnlocked = systemUnderstanding >= 100;

  return {
    systemUnderstanding,
    operatorUnlocked,
    executiveBriefUnlocked: operatorUnlocked
  };
}

function ensureModuleCompletion(state: XpState, moduleId: ModuleId) {
  if (state.completedModules[moduleId]) {
    return state;
  }

  let qualifiesForCompletion = false;

  if (moduleId === "systems") {
    qualifiesForCompletion = state.systemsNodesOpened >= 3;
  }

  if (moduleId === "projects") {
    qualifiesForCompletion = Object.keys(state.projectsViewed).length >= 2 && state.projectsViewModeToggled;
  }

  if (moduleId === "field-ops") {
    qualifiesForCompletion = state.fieldOpsSimulatorRun && state.fieldOpsDecisionViewed;
  }

  if (moduleId === "lab") {
    qualifiesForCompletion = Object.keys(state.labExperimentsOpened).length >= 2;
  }

  if (moduleId === "signal") {
    qualifiesForCompletion = state.signalToneSwitched;
  }

  if (moduleId === "loyalty") {
    qualifiesForCompletion = state.loyaltyCardsFlipped.giants === true && state.loyaltyCardsFlipped.niners === true;
  }

  if (moduleId === "origin") {
    qualifiesForCompletion = Object.keys(state.originStarsHovered).length >= 4;
  }

  if (!qualifiesForCompletion) {
    return state;
  }

  const nextXp = state.xp + XP_RULES.moduleComplete;

  return {
    ...state,
    xp: nextXp,
    completedModules: {
      ...state.completedModules,
      [moduleId]: true
    },
    ...deriveUnlockState(nextXp)
  };
}

export const useXpStore = create<XpState>()(
  persist(
    (set) => ({
      xp: 0,
      ...deriveUnlockState(0),
      operatorModeEnabled: false,
      openedModules: moduleDefaults,
      completedModules: moduleDefaults,
      systemsNodesOpened: 0,
      systemsOpenedNodeIds: {},
      projectsViewed: {},
      projectsViewModeToggled: false,
      fieldOpsSimulatorRun: false,
      fieldOpsDecisionViewed: false,
      labExperimentsOpened: {},
      signalToneSwitched: false,
      loyaltyCardsFlipped: {},
      originStarsHovered: {},
      easterEggsFound: {},
      tpmSimulatorCompleted: false,

      openModule: (moduleId) =>
        set((state) => {
          if (state.openedModules[moduleId]) {
            return state;
          }

          const nextXp = state.xp + XP_RULES.firstModuleOpen;

          return {
            ...state,
            xp: nextXp,
            openedModules: {
              ...state.openedModules,
              [moduleId]: true
            },
            ...deriveUnlockState(nextXp)
          };
        }),

      discoverEasterEgg: (eggId) =>
        set((state) => {
          if (state.easterEggsFound[eggId]) {
            return state;
          }

          const nextXp = state.xp + XP_RULES.easterEgg;

          return {
            ...state,
            xp: nextXp,
            easterEggsFound: {
              ...state.easterEggsFound,
              [eggId]: true
            },
            ...deriveUnlockState(nextXp)
          };
        }),

      completeTpmSimulator: () =>
        set((state) => {
          if (state.tpmSimulatorCompleted) {
            return state;
          }

          const nextXp = state.xp + XP_RULES.tpmSimulator;

          return {
            ...state,
            xp: nextXp,
            tpmSimulatorCompleted: true,
            ...deriveUnlockState(nextXp)
          };
        }),

      systemsOpenNode: (nodeId) =>
        set((state) => {
          if (nodeId && state.systemsOpenedNodeIds[nodeId]) {
            return state;
          }

          const nextOpenedNodeIds = nodeId
            ? {
                ...state.systemsOpenedNodeIds,
                [nodeId]: true
              }
            : state.systemsOpenedNodeIds;

          const uniqueNodeCount = Object.keys(nextOpenedNodeIds).length;
          const nextCount = nodeId ? Math.min(3, uniqueNodeCount) : Math.min(3, state.systemsNodesOpened + 1);

          return ensureModuleCompletion(
            {
              ...state,
              systemsNodesOpened: nextCount,
              systemsOpenedNodeIds: nextOpenedNodeIds
            },
            "systems"
          );
        }),

      projectsViewProject: (projectId) =>
        set((state) =>
          ensureModuleCompletion(
            {
              ...state,
              projectsViewed: {
                ...state.projectsViewed,
                [projectId]: true
              }
            },
            "projects"
          )
        ),

      projectsFlipViewToggle: () =>
        set((state) =>
          ensureModuleCompletion(
            {
              ...state,
              projectsViewModeToggled: true
            },
            "projects"
          )
        ),

      fieldOpsRunSimulator: () =>
        set((state) =>
          ensureModuleCompletion(
            {
              ...state,
              fieldOpsSimulatorRun: true
            },
            "field-ops"
          )
        ),

      fieldOpsViewDecisionExplanation: () =>
        set((state) =>
          ensureModuleCompletion(
            {
              ...state,
              fieldOpsDecisionViewed: true
            },
            "field-ops"
          )
        ),

      labOpenExperiment: (experimentId) =>
        set((state) =>
          ensureModuleCompletion(
            {
              ...state,
              labExperimentsOpened: {
                ...state.labExperimentsOpened,
                [experimentId]: true
              }
            },
            "lab"
          )
        ),

      signalSwitchTone: () =>
        set((state) =>
          ensureModuleCompletion(
            {
              ...state,
              signalToneSwitched: true
            },
            "signal"
          )
        ),

      loyaltyFlipCard: (cardId) =>
        set((state) =>
          ensureModuleCompletion(
            {
              ...state,
              loyaltyCardsFlipped: {
                ...state.loyaltyCardsFlipped,
                [cardId]: true
              }
            },
            "loyalty"
          )
        ),

      originHoverStar: (starId) =>
        set((state) =>
          ensureModuleCompletion(
            {
              ...state,
              originStarsHovered: {
                ...state.originStarsHovered,
                [starId]: true
              }
            },
            "origin"
          )
        ),

      toggleOperatorMode: () =>
        set((state) => {
          if (!state.operatorUnlocked) {
            return state;
          }

          return {
            ...state,
            operatorModeEnabled: !state.operatorModeEnabled
          };
        })
    }),
    {
      name: "armando-os-xp-store",
      version: 2,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState, version) => {
        if (version < 2) {
          return {
            ...(persistedState as PersistedXpState),
            systemsOpenedNodeIds: {}
          };
        }

        return persistedState as PersistedXpState;
      },
      partialize: (state): PersistedXpState => ({
        xp: state.xp,
        systemUnderstanding: state.systemUnderstanding,
        operatorUnlocked: state.operatorUnlocked,
        executiveBriefUnlocked: state.executiveBriefUnlocked,
        operatorModeEnabled: state.operatorModeEnabled,
        openedModules: state.openedModules,
        completedModules: state.completedModules,
        systemsNodesOpened: state.systemsNodesOpened,
        systemsOpenedNodeIds: state.systemsOpenedNodeIds,
        projectsViewed: state.projectsViewed,
        projectsViewModeToggled: state.projectsViewModeToggled,
        fieldOpsSimulatorRun: state.fieldOpsSimulatorRun,
        fieldOpsDecisionViewed: state.fieldOpsDecisionViewed,
        labExperimentsOpened: state.labExperimentsOpened,
        signalToneSwitched: state.signalToneSwitched,
        loyaltyCardsFlipped: state.loyaltyCardsFlipped,
        originStarsHovered: state.originStarsHovered,
        easterEggsFound: state.easterEggsFound,
        tpmSimulatorCompleted: state.tpmSimulatorCompleted
      })
    }
  )
);
