import { SignalTonePanel } from "@/components/signal/SignalTonePanel";

export default function SignalPage() {
  return (
    <main className="relative min-h-screen px-4 py-8 md:px-10">
      <div className="mx-auto w-full max-w-4xl surface-panel rounded-2xl p-5 md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-accent/90">Signal</p>
        <h1 className="mt-1 text-2xl font-semibold">Signal Layer</h1>
        <p className="mt-3 text-sm text-foreground/80">
          Shift the interface tone between Clean, Crunch, and Metal. The selected tone changes global accent and
          atmosphere intensity across the system.
        </p>
        <div className="mt-5">
          <SignalTonePanel />
        </div>
      </div>
    </main>
  );
}
