"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";
import { useXpStore } from "@/stores/xp-store";

type LoyaltyCard = {
  id: "giants" | "niners";
  title: string;
  subtitle: string;
  frontAccent: string;
  lesson: string;
};

const cards: LoyaltyCard[] = [
  {
    id: "giants",
    title: "San Francisco Giants",
    subtitle: "Patience + Development",
    frontAccent: "#f97316",
    lesson:
      "Leadership lesson: Build long-term systems, trust player development, and optimize for sustained performance rather than short-term spikes."
  },
  {
    id: "niners",
    title: "San Francisco 49ers",
    subtitle: "Resilience + Reinvention",
    frontAccent: "#dc2626",
    lesson:
      "Leadership lesson: Durable teams adapt across eras, recover from setbacks quickly, and keep standards stable while methods evolve."
  }
];

export function LoyaltyCards() {
  const { loyaltyCardsFlipped, loyaltyCompleted, openModule, loyaltyFlipCard } = useXpStore(
    useShallow((state) => ({
      loyaltyCardsFlipped: state.loyaltyCardsFlipped,
      loyaltyCompleted: state.completedModules.loyalty,
      openModule: state.openModule,
      loyaltyFlipCard: state.loyaltyFlipCard
    }))
  );

  useEffect(() => {
    openModule("loyalty");
  }, [openModule]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card) => {
          const flipped = Boolean(loyaltyCardsFlipped[card.id]);

          return (
            <div key={card.id} className="h-60 [perspective:1100px]">
              <motion.button
                type="button"
                onClick={() => loyaltyFlipCard(card.id)}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="relative h-full w-full rounded-xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="surface-card absolute inset-0 rounded-xl p-4 text-left"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-foreground/70">Loyalty Card</p>
                  <h2 className="mt-2 text-xl font-semibold">{card.title}</h2>
                  <p className="mt-1 text-sm text-foreground/75">{card.subtitle}</p>
                  <div className="mt-4 h-1.5 w-24 rounded-full" style={{ backgroundColor: card.frontAccent }} />
                  <p className="mt-4 text-xs uppercase tracking-wide text-accent/90">Select to view leadership lesson</p>
                </div>

                <div
                  className="absolute inset-0 rounded-xl border border-white/15 bg-backgroundMuted p-4 text-left shadow-surface"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-accent/90">Card Back</p>
                  <p className="mt-3 text-sm text-foreground/85">{card.lesson}</p>
                  <p className="mt-4 text-xs uppercase tracking-wide text-success">Flipped</p>
                </div>
              </motion.button>
            </div>
          );
        })}
      </div>

      <div className="surface-card rounded-lg p-4">
        <p className="text-sm text-foreground/80">Cards flipped: {Object.keys(loyaltyCardsFlipped).length}/2</p>
        {loyaltyCompleted ? (
          <p className="mt-2 text-xs uppercase tracking-wide text-success">Loyalty module completed (+40 XP)</p>
        ) : (
          <p className="mt-2 text-xs text-foreground/65">Flip both cards to complete this module.</p>
        )}
      </div>
    </div>
  );
}
