import { BranchSection } from "@/components/BranchSection";
import { IdentityReveal } from "@/components/IdentityReveal";
import { SpineLine } from "@/components/SpineLine";

export default function Home() {
  return (
    <>
      <SpineLine />
      <main>
        <section className="signal-section signal-section-opening">
          <h1 className="signal-name text-center">Armando Sanchez</h1>
        </section>
        <IdentityReveal />
        <BranchSection />
      </main>
    </>
  );
}
