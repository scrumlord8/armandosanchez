import { ExecutiveBriefPanel } from "@/components/operator/ExecutiveBriefPanel";
import { GridOverlay } from "@/components/GridOverlay";
import { MissionControlHub } from "@/components/MissionControlHub";
import { StarfieldBackground } from "@/components/StarfieldBackground";
import { TopNav } from "@/components/TopNav";

export function AppShell() {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-4 md:px-10 md:py-8">
      <StarfieldBackground />
      <GridOverlay />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col">
        <TopNav />
        <MissionControlHub />
        <ExecutiveBriefPanel />
      </div>
    </main>
  );
}
