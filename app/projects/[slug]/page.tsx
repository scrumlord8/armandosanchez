import { notFound } from "next/navigation";
import { ProjectDetailView } from "@/components/projects/ProjectDetailView";
import { projectBySlug, projects } from "@/lib/projects";

type ProjectDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = projectBySlug[params.slug];

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} />;
}
