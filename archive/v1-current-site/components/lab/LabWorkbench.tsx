"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useXpStore } from "@/stores/xp-store";

type Experiment = {
  id: string;
  title: string;
  summary: string;
  status: string;
};

const TERMINAL_UNLOCK_KEY = "armando-os-lab-terminal-unlocked";
const TERMINAL_ENABLED_KEY = "armando-os-lab-terminal-enabled";

const experiments: Experiment[] = [
  {
    id: "agent-sandbox",
    title: "Agent Sandbox",
    summary: "Workflow for autonomous issue triage and scoped fix generation.",
    status: "Active Prototype"
  },
  {
    id: "atlas-proto",
    title: "Atlas Orchestration",
    summary: "Operational command layer for project sequencing and delivery checkpoints.",
    status: "Internal Beta"
  },
  {
    id: "crypto-signals",
    title: "Signal Scanner",
    summary: "Experimenting with indicator pipelines for structured market signal review.",
    status: "Research"
  }
];

export function LabWorkbench() {
  const [commandInput, setCommandInput] = useState("");
  const [terminalUnlockedByCommand, setTerminalUnlockedByCommand] = useState(false);
  const [terminalEnabled, setTerminalEnabled] = useState(false);

  const { opened, completed, operatorUnlocked, operatorModeEnabled, openModule, labOpenExperiment, labExperimentsOpened } = useXpStore(
    useShallow((state) => ({
      opened: state.openedModules.lab,
      completed: state.completedModules.lab,
      operatorUnlocked: state.operatorUnlocked,
      operatorModeEnabled: state.operatorModeEnabled,
      openModule: state.openModule,
      labOpenExperiment: state.labOpenExperiment,
      labExperimentsOpened: state.labExperimentsOpened
    }))
  );

  useEffect(() => {
    openModule("lab");

    const commandUnlock = window.localStorage.getItem(TERMINAL_UNLOCK_KEY) === "true";
    const enabled = window.localStorage.getItem(TERMINAL_ENABLED_KEY) === "true";

    setTerminalUnlockedByCommand(commandUnlock);
    setTerminalEnabled(enabled);
  }, [openModule]);

  useEffect(() => {
    if (operatorModeEnabled) {
      setTerminalEnabled(true);
    }
  }, [operatorModeEnabled]);

  const terminalAvailable = operatorUnlocked || terminalUnlockedByCommand;
  const openedCount = Object.keys(labExperimentsOpened).length;

  const terminalOutput = useMemo(() => {
    return [
      "$ lab status",
      `module_opened=${opened ? "true" : "false"}`,
      `experiments_opened=${openedCount}/2`,
      `operator_unlocked=${operatorUnlocked ? "true" : "false"}`,
      `terminal_skin=${terminalEnabled ? "enabled" : "disabled"}`
    ].join("\n");
  }, [opened, openedCount, operatorUnlocked, terminalEnabled]);

  function handleCommandSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (commandInput.trim().toLowerCase() === "operator") {
      setTerminalUnlockedByCommand(true);
      setTerminalEnabled(true);
      window.localStorage.setItem(TERMINAL_UNLOCK_KEY, "true");
      window.localStorage.setItem(TERMINAL_ENABLED_KEY, "true");
    }

    setCommandInput("");
  }

  function toggleTerminalSkin() {
    const next = !terminalEnabled;
    setTerminalEnabled(next);
    window.localStorage.setItem(TERMINAL_ENABLED_KEY, String(next));
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {experiments.map((experiment) => {
          const wasOpened = Boolean(labExperimentsOpened[experiment.id]);

          return (
            <article
              key={experiment.id}
              className={[
                "rounded-xl border p-4 transition",
                terminalEnabled ? "border-accent/40 bg-[#0a1a28]" : "surface-card"
              ].join(" ")}
            >
              <p className="text-xs uppercase tracking-[0.16em] text-accent/85">{experiment.status}</p>
              <h2 className="mt-2 text-lg font-semibold">{experiment.title}</h2>
              <p className="mt-2 text-sm text-foreground/80">{experiment.summary}</p>
              <button
                type="button"
                onClick={() => labOpenExperiment(experiment.id)}
                className="mt-4 rounded border border-white/20 px-3 py-1.5 text-xs uppercase tracking-wide"
              >
                {wasOpened ? "Opened" : "Open Experiment"}
              </button>
            </article>
          );
        })}
      </div>

      <section className={[
        "rounded-xl border p-4",
        terminalEnabled ? "border-accent/50 bg-[#07131f]" : "surface-card"
      ].join(" ")}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-[0.18em] text-accent/90">Terminal Skin</p>
          {terminalAvailable ? (
            <button
              type="button"
              onClick={toggleTerminalSkin}
              className="rounded border border-white/20 px-3 py-1 text-xs uppercase tracking-wide"
            >
              {terminalEnabled ? "Disable" : "Enable"} Terminal Skin
            </button>
          ) : (
            <span className="text-xs text-foreground/65">Locked until Operator unlock or hidden command</span>
          )}
        </div>

        <form onSubmit={handleCommandSubmit} className="mt-3 flex flex-wrap gap-2">
          <label htmlFor="lab-command-input" className="sr-only">
            Lab terminal command input
          </label>
          <input
            id="lab-command-input"
            value={commandInput}
            onChange={(event) => setCommandInput(event.target.value)}
            placeholder="Type command"
            className="min-w-[220px] flex-1 rounded border border-white/15 bg-background/45 px-3 py-2 text-sm outline-none focus:border-accent/60"
          />
          <button type="submit" className="rounded border border-white/20 px-3 py-2 text-xs uppercase tracking-wide">
            Run
          </button>
        </form>

        {terminalEnabled ? (
          <pre className="mono-metric mt-3 overflow-x-auto rounded border border-white/10 bg-black/45 p-3 text-xs text-[#8fd4ff]">
            {terminalOutput}
          </pre>
        ) : null}
      </section>

      <section className="surface-card rounded-xl p-4">
        <p className="text-sm text-foreground/80">Experiments opened: {openedCount}/2</p>
        {completed ? (
          <p className="mt-2 text-xs uppercase tracking-wide text-success">Lab module completed (+40 XP)</p>
        ) : (
          <p className="mt-2 text-xs text-foreground/65">Open 2 experiments to complete this module.</p>
        )}
      </section>
    </div>
  );
}
