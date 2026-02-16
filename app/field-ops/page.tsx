import Link from "next/link";
import { FieldOpsModule } from "@/components/field-ops/FieldOpsModule";

export default function FieldOpsPage() {
  return (
    <main className="relative min-h-screen px-4 py-8 md:px-10">
      <div className="mx-auto w-full max-w-4xl surface-panel rounded-2xl p-5 md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-accent/90">Field Ops</p>
        <h1 className="mt-1 text-2xl font-semibold">Execution Under Pressure</h1>
        <p className="mt-3 text-sm text-foreground/80">
          Incident decision quality under pressure. Run the prioritization simulation and inspect roadmap load posture.
        </p>
        <div className="mt-5">
          <FieldOpsModule />
        </div>
        <Link href="/" className="mt-6 inline-block text-xs uppercase tracking-wide text-accent/90">
          Back To Mission Control
        </Link>
      </div>
    </main>
  );
}
