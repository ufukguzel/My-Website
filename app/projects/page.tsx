import { ProjectList } from "@/lib/projects-data";
import { ProjectCard } from "@/components/project-card";
import { GetMetada } from '@/lib/page-metadata';

export const metadata = GetMetada('projects');

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-muted-foreground">
          A collection of mobile apps and web projects I've built.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {ProjectList.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}