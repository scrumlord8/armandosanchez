import Link from "next/link";
import { projects } from "@/lib/projects";

export default function ProjectsIndexPage() {
  return (
    <main className="relative min-h-screen px-4 py-8 md:px-10">
      <div className="mx-auto w-full max-w-4xl surface-panel rounded-2xl p-5 md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-accent/90">Project Index</p>
        <h1 className="mt-1 text-2xl font-semibold">Project Detail Pages</h1>
        <p className="mt-2 text-sm text-foreground/75">
          Each project follows a consistent five-section pattern and supports PM vs Engineering content perspective.
        </p>

        <div className="mt-6 grid gap-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="surface-card rounded-lg p-4 transition hover:border-accent/50"
            >
              <p className="text-sm font-medium text-foreground">{project.title}</p>
              <p className="mt-1 text-xs text-foreground/70">{project.problem}</p>
            </Link>
          ))}
        </div>

        <Link href="/" className="mt-6 inline-block text-xs uppercase tracking-wide text-accent/90">
          Back To Mission Control
        </Link>
      </div>
    </main>
  );
}
