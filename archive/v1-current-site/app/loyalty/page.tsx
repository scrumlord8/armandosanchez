import Link from "next/link";
import { LoyaltyCards } from "@/components/loyalty/LoyaltyCards";

export default function LoyaltyPage() {
  return (
    <main className="relative min-h-screen px-4 py-8 md:px-10">
      <div className="mx-auto w-full max-w-4xl surface-panel rounded-2xl p-5 md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-accent/90">Loyalty</p>
        <h1 className="mt-1 text-2xl font-semibold">Giants + 49ers</h1>
        <p className="mt-3 text-sm text-foreground/80">
          Flip both cards to reveal leadership principles tied to team identity and complete the module.
        </p>

        <div className="mt-5">
          <LoyaltyCards />
        </div>

        <Link href="/" className="mt-6 inline-block text-xs uppercase tracking-wide text-accent/90">
          Back To Mission Control
        </Link>
      </div>
    </main>
  );
}
