"use client";

import Link from "next/link";
import { useState } from "react";
import type { ProjectDetail } from "@/lib/projects";

type ProjectDetailViewProps = {
  project: ProjectDetail;
};

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const [viewMode, setViewMode] = useState<"pm" | "engineering">("pm");
  const activeCopy = project.views[viewMode];

  return (
    <main className="relative min-h-screen px-4 py-8 md:px-10">
      <div className="mx-auto w-full max-w-4xl surface-panel rounded-2xl p-5 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent/90">Projects</p>
            <h1 className="mt-1 text-2xl font-semibold">{project.title}</h1>
          </div>
          <div className="surface-card flex w-full rounded-lg p-1 text-xs uppercase tracking-wide md:inline-flex md:w-auto">
            <button
              type="button"
              onClick={() => setViewMode("pm")}
              className={[
                "flex-1 rounded px-3 py-1.5 transition md:flex-none",
                viewMode === "pm" ? "bg-accent/20 text-foreground" : "text-foreground/70"
              ].join(" ")}
            >
              PM View
            </button>
            <button
              type="button"
              onClick={() => setViewMode("engineering")}
              className={[
                "flex-1 rounded px-3 py-1.5 transition md:flex-none",
                viewMode === "engineering" ? "bg-accent/20 text-foreground" : "text-foreground/70"
              ].join(" ")}
            >
              Engineering View
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <section className="surface-card rounded-lg p-4">
            <h2 className="text-sm uppercase tracking-[0.18em] text-accent/85">Problem</h2>
            <p className="mt-2 text-sm text-foreground/85">{project.problem}</p>
          </section>

          <section className="surface-card rounded-lg p-4">
            <h2 className="text-sm uppercase tracking-[0.18em] text-accent/85">Approach</h2>
            <p className="mt-2 text-sm text-foreground/85">{activeCopy.approach}</p>
          </section>

          <section className="surface-card rounded-lg p-4">
            <h2 className="text-sm uppercase tracking-[0.18em] text-accent/85">Architecture</h2>
            <div className="mt-2 rounded border border-dashed border-white/20 bg-black/35 p-5 text-sm text-foreground/70">
              {project.architecture}
            </div>
          </section>

          <section className="surface-card rounded-lg p-4">
            <h2 className="text-sm uppercase tracking-[0.18em] text-accent/85">Impact / Learnings</h2>
            <p className="mt-2 text-sm text-foreground/85">{activeCopy.impactLearnings}</p>
          </section>

          <section className="surface-card rounded-lg p-4">
            <h2 className="text-sm uppercase tracking-[0.18em] text-accent/85">Links</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded border border-white/20 px-3 py-1.5 text-xs uppercase tracking-wide text-foreground/80"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        </div>

        <Link href="/projects" className="mt-6 inline-block text-xs uppercase tracking-wide text-accent/90">
          Back To Projects
        </Link>
      </div>
    </main>
  );
}
