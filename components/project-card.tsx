import { ExternalLink, Github, PlayIcon, AppleIcon } from "lucide-react";
import { FallbackImage } from "@/components/ui/fallback-image";
import { type Project } from "@/types/project";

export function ProjectCard({ project }: { project: Project }) {
  const hasDemo = project.demoUrl && project.demoUrl !== '#';

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-background/85 via-background/70 to-background/80 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-muted/20" />
        <FallbackImage
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
          sizes="(min-width: 1024px) 45vw, (min-width: 768px) 60vw, 90vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/95 via-background/25 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6">
        <header className="space-y-3">
          <h3 className="text-lg font-semibold leading-tight tracking-tight text-foreground group-hover:text-primary">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </header>

        <footer className="mt-auto flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          {hasDemo && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-primary transition hover:bg-primary/20"
            >
              <ExternalLink className="h-4 w-4" />
              Live demo
            </a>
          )}

          {project.storeLinks?.map((store) => (
            <a
              key={store.type}
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 px-4 py-1.5 transition hover:border-primary/40 hover:text-primary"
            >
              {store.type === 'appstore' ? <AppleIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
              {store.type === 'appstore' ? 'App Store' : 'Play Store'}
            </a>
          ))}

          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 px-4 py-1.5 transition hover:border-primary/40 hover:text-primary"
            >
              <Github className="h-4 w-4" />
              Kaynak kodu
            </a>
          )}
        </footer>
      </div>
    </div>
  );
}