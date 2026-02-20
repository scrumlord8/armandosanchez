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
      <span className="retro-sound-toggle-led" aria-hidden="true" />
      <span className="retro-sound-toggle-switch" aria-hidden="true">
        <span className="retro-sound-toggle-thumb" />
      </span>
      <span className="retro-sound-toggle-label">Sound</span>
      <span className="retro-sound-toggle-value">{soundEnabled ? "On" : "Off"}</span>
    </button>
  );
}
