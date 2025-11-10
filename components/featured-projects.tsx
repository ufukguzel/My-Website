import { ExternalLink, Github } from "lucide-react";
import { FallbackImage } from "@/components/ui/fallback-image";
import { ProjectList } from "@/lib/projects-data";
import { type Project } from "@/types/project";

function AppStoreIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M11.624 7.222c-.876 0-2.232-.996-3.66-.96-1.884.024-3.612 1.092-4.584 2.784-1.956 3.396-.504 8.412 1.404 11.172.936 1.344 2.04 2.856 3.504 2.808 1.404-.06 1.932-.912 3.636-.912 1.692 0 2.172.912 3.66.876 1.512-.024 2.472-1.368 3.396-2.724 1.068-1.56 1.512-3.072 1.536-3.156-.036-.012-2.94-1.128-2.976-4.488-.024-2.808 2.292-4.152 2.4-4.212-1.32-1.932-3.348-2.148-4.056-2.196-1.848-.144-3.396 1.008-4.26 1.008zm3.12-2.832c.78-.936 1.296-2.244 1.152-3.54-1.116.048-2.46.744-3.264 1.68-.72.828-1.344 2.16-1.176 3.432 1.236.096 2.508-.636 3.288-1.572z" />
    </svg>
  );
}

function PlayStoreIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M3.609 1.814L13.792 12 3.61 22.186c-.28.28-.657.423-1.033.423C1.82 22.609 1 21.789 1 20.794V3.206c0-.995.82-1.815 1.815-1.815.376 0 .754.143 1.033.423zm17.006 8.226l-3.95-2.281L5.866 1.814l14.749 8.226zm0 3.92L6.605 22.186l10.06-5.805 3.95-2.281zM20.615 12L5.866 22.186c.376.28.754.423 1.13.423.376 0 .753-.143 1.033-.423L20.615 12z" />
    </svg>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-background/80 via-background/70 to-background/80 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-muted/20" />
        <FallbackImage
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
          sizes="(min-width: 1024px) 35vw, (min-width: 768px) 45vw, 90vw"
          priority={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold leading-tight tracking-tight text-foreground group-hover:text-primary">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 px-4 py-1.5 transition hover:border-primary/40 hover:text-primary"
            >
              <Github className="h-4 w-4" />
              Kaynak
            </a>
          )}

          {project.demoUrl && project.demoUrl !== '#'
            ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-primary transition hover:bg-primary/20"
              >
                <ExternalLink className="h-4 w-4" />
                Live demo
              </a>
            ) : null}

          {project.storeLinks?.map((store) => (
            <a
              key={store.type}
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 px-4 py-1.5 transition hover:border-primary/40 hover:text-primary"
            >
              {store.type === 'appstore' ? <AppStoreIcon /> : <PlayStoreIcon />}
              {store.type === 'appstore' ? 'App Store' : 'Play Store'}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeaturedProjects({ limit = 4 }: { limit?: number }) {
  const featuredProjects = ProjectList.slice(0, limit);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {featuredProjects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  );
}