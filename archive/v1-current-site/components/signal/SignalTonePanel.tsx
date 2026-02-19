"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { applySignalTone, isSignalTone, SIGNAL_TONE_STORAGE_KEY, signalToneConfig, type SignalTone } from "@/lib/signal-theme";
import { useXpStore } from "@/stores/xp-store";

const toneOrder: SignalTone[] = ["clean", "crunch", "metal"];

export function SignalTonePanel() {
  const [tone, setTone] = useState<SignalTone>("clean");

  const { toneSwitched, signalCompleted, openModule, signalSwitchTone } = useXpStore(
    useShallow((state) => ({
      toneSwitched: state.signalToneSwitched,
      signalCompleted: state.completedModules.signal,
      openModule: state.openModule,
      signalSwitchTone: state.signalSwitchTone
    }))
  );

  useEffect(() => {
    openModule("signal");

    const storedTone = window.localStorage.getItem(SIGNAL_TONE_STORAGE_KEY);
    if (isSignalTone(storedTone)) {
      setTone(storedTone);
      applySignalTone(storedTone);
      return;
    }

    applySignalTone("clean");
  }, [openModule]);

  function handleToneChange(nextTone: SignalTone) {
    setTone(nextTone);
    applySignalTone(nextTone);
    window.localStorage.setItem(SIGNAL_TONE_STORAGE_KEY, nextTone);

    if (nextTone !== tone) {
      signalSwitchTone();
    }
  }

  return (
    <div className="space-y-4">
      <div className="surface-card rounded-xl p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-accent/90">Tone Controls</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {toneOrder.map((toneId) => {
            const config = signalToneConfig[toneId];
            const isActive = tone === toneId;

            return (
              <button
                key={toneId}
                type="button"
                onClick={() => handleToneChange(toneId)}
                className={[
                  "rounded border px-3 py-1.5 text-xs uppercase tracking-wide transition",
                  isActive ? "border-accent/70 bg-accent/20 text-foreground" : "border-white/20 text-foreground/80"
                ].join(" ")}
              >
                {config.label}
              </button>
            );
          })}
        </div>

        <p className="mt-3 text-sm text-foreground/80">{signalToneConfig[tone].description}</p>
      </div>

      <div className="surface-card rounded-xl p-4">
        <p className="text-sm text-foreground/80">Tone switched: {toneSwitched ? "Yes" : "No"}</p>
        {signalCompleted ? (
          <p className="mt-2 text-xs uppercase tracking-wide text-success">Signal module completed (+40 XP)</p>
        ) : (
          <p className="mt-2 text-xs text-foreground/65">Switch tone once to complete this module.</p>
        )}
      </div>

      <Link href="/" className="inline-block text-xs uppercase tracking-wide text-accent/90">
        Back To Mission Control
      </Link>
    </div>
  );
}
