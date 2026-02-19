import Link from "next/link";
import { SystemsLeadershipMap } from "@/components/systems/SystemsLeadershipMap";

export default function SystemsPage() {
  return (
    <main className="relative min-h-screen px-4 py-8 md:px-10">
      <div className="mx-auto w-full max-w-6xl surface-panel rounded-2xl p-5 md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-accent/90">Systems</p>
        <h1 className="mt-1 text-2xl font-semibold">Leadership Systems Map</h1>
        <p className="mt-3 text-sm text-foreground/80">
          Explore system nodes to reveal context, action, result, and reflection. Opening three unique nodes completes
          the Systems module.
        </p>
        <div className="mt-5">
          <SystemsLeadershipMap />
        </div>
        <Link href="/" className="mt-6 inline-block text-xs uppercase tracking-wide text-accent/90">
          Back To Mission Control
        </Link>
      </div>
    </main>
  );
}
