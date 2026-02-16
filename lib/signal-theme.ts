export type SignalTone = "clean" | "crunch" | "metal";

export const SIGNAL_TONE_STORAGE_KEY = "armando-os-signal-tone";

export const signalToneConfig: Record<
  SignalTone,
  {
    label: string;
    accent: string;
    accentRgb: string;
    gridOpacity: string;
    pulseSpeed: string;
    pulseStrength: string;
    description: string;
  }
> = {
  clean: {
    label: "Clean",
    accent: "#31a9ff",
    accentRgb: "49, 169, 255",
    gridOpacity: "0.09",
    pulseSpeed: "18s",
    pulseStrength: "0.06",
    description: "Balanced and precise. Clear signal, low noise."
  },
  crunch: {
    label: "Crunch",
    accent: "#c8944f",
    accentRgb: "200, 148, 79",
    gridOpacity: "0.11",
    pulseSpeed: "14s",
    pulseStrength: "0.08",
    description: "Slight amber warmth with controlled urgency and clear rhythm."
  },
  metal: {
    label: "Metal",
    accent: "#256ec3",
    accentRgb: "37, 110, 195",
    gridOpacity: "0.13",
    pulseSpeed: "10s",
    pulseStrength: "0.1",
    description: "Deeper blue with a subtle intensity bump for focused execution."
  }
};

export function isSignalTone(value: string | null): value is SignalTone {
  return value === "clean" || value === "crunch" || value === "metal";
}

export function applySignalTone(tone: SignalTone) {
  if (typeof document === "undefined") {
    return;
  }

  const config = signalToneConfig[tone];
  const root = document.documentElement;

  root.style.setProperty("--accent", config.accent);
  root.style.setProperty("--accent-rgb", config.accentRgb);
  root.style.setProperty("--grid-opacity", config.gridOpacity);
  root.style.setProperty("--pulse-speed", config.pulseSpeed);
  root.style.setProperty("--pulse-strength", config.pulseStrength);
  root.setAttribute("data-signal-tone", tone);
}
