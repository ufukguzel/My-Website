import { ProjectList } from "@/lib/projects-data";
import { ProjectCard } from "@/components/project-card";
import { GetMetada } from '@/lib/page-metadata';
import { Box, Layers, Ribbon } from 'lucide-react';

export const metadata = GetMetada('projects');

const summaryStats = [
  {
    title: 'Product-led solutions',
    description: 'I build high-performance web apps for SaaS, internal tools, and data dashboards.',
    icon: <Layers className="h-5 w-5 text-primary" />,
  },
  {
    title: 'Cross-platform experience',
    description: 'React Native and Flutter projects that deliver consistent mobile experiences.',
    icon: <Box className="h-5 w-5 text-primary" />,
  },
  {
    title: 'Community & sharing',
    description: 'I contribute to open-source and publish technical writing to share what I learn.',
    icon: <Ribbon className="h-5 w-5 text-primary" />,
  },
];

export default function ProjectsPage() {
  return (
    <div className="relative space-y-16">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/70 p-8 md:p-12 shadow-xl backdrop-blur">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.12),_transparent_55%)]" aria-hidden />
        <div className="relative space-y-8">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              Behind the build
            </span>
            <div className="space-y-3">
              <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                Projects & contributions
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Explore the modern web apps, mobile experiences, and open-source work I craft for product teams—each centered on performance, accessibility, and thoughtful documentation.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {summaryStats.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-background/80 p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex items-center gap-3 text-sm font-semibold text-foreground">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    {item.icon}
                  </span>
                  {item.title}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
            <p className="text-sm text-muted-foreground">
              A curated selection of work delivered for teams across different industries.
            </p>
          </div>
          <a
            href="mailto:me@ufukguzel.com.tr"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
          >
            Let’s discuss a project
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {ProjectList.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}