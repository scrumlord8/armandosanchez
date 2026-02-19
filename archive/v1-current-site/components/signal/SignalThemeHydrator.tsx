"use client";

import { useEffect } from "react";
import { applySignalTone, isSignalTone, SIGNAL_TONE_STORAGE_KEY } from "@/lib/signal-theme";

export function SignalThemeHydrator() {
  useEffect(() => {
    const storedTone = window.localStorage.getItem(SIGNAL_TONE_STORAGE_KEY);
    if (isSignalTone(storedTone)) {
      applySignalTone(storedTone);
      return;
    }

    applySignalTone("clean");
  }, []);

  return null;
}
