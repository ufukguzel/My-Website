import { ExternalLink, Github } from "lucide-react";
import { FallbackImage } from "@/components/ui/fallback-image";
import { type Project } from "@/types/project";
import {
  PlayIcon,
  AppleIcon
} from "lucide-react";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group rounded-lg border bg-card overflow-hidden transition-colors hover:border-primary">
      <div className="aspect-video relative bg-muted">
        <FallbackImage
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>

      <div className="p-6 space-y-4">
        <h3 className="font-medium group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-muted-foreground">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-3">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 test-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>View</span>
            </a>
          )}

          {project.storeLinks?.map((store) => (
            <a
              key={store.type}
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 test-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {store.type === 'appstore' ? <AppleIcon size={16} /> : <PlayIcon size={16} />}
              <span>{store.type === 'appstore' ? 'App Store' : 'Play Store'}</span>
            </a>
          ))}

          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 test-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>Source</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}