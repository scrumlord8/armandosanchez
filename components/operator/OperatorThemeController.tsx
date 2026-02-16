"use client";

import { useEffect } from "react";
import { applySignalTone, isSignalTone, SIGNAL_TONE_STORAGE_KEY } from "@/lib/signal-theme";
import { useXpStore } from "@/stores/xp-store";

export function OperatorThemeController() {
  const operatorModeEnabled = useXpStore((state) => state.operatorModeEnabled);

  useEffect(() => {
    const root = document.documentElement;

    if (operatorModeEnabled) {
      root.setAttribute("data-operator-mode", "on");
      root.style.setProperty("--accent", "#2cc8d4");
      root.style.setProperty("--accent-rgb", "44, 200, 212");
      return;
    }

    root.setAttribute("data-operator-mode", "off");
    const storedTone = window.localStorage.getItem(SIGNAL_TONE_STORAGE_KEY);
    if (isSignalTone(storedTone)) {
      applySignalTone(storedTone);
      return;
    }

    applySignalTone("clean");
  }, [operatorModeEnabled]);

  return null;
}
