"use client";

type SoundToggleProps = {
  soundEnabled: boolean;
  onToggle: () => void;
};

export function SoundToggle({ soundEnabled, onToggle }: SoundToggleProps) {
  return (
    <button
      type="button"
      className="retro-sound-toggle"
      onClick={onToggle}
      aria-pressed={soundEnabled}
      aria-label={soundEnabled ? "Disable TV static audio" : "Enable TV static audio"}
    >
      {soundEnabled ? "Sound: On" : "Sound: Off"}
    </button>
  );
}
