import { FallbackImage } from "@/components/ui/fallback-image";
import { WorkspaceIcons, WorkspaceData } from "@/lib/workspace-data";
import { GetMetada } from '@/lib/page-metadata';
import { MonitorSmartphone, Sparkles, Workflow } from 'lucide-react';

export const metadata = GetMetada('workspace');

const workspaceHighlights = [
  {
    title: 'Focused productivity',
    description: 'A clean setup built around my MacBook Pro and an external Dell display.',
    icon: <MonitorSmartphone className="h-5 w-5 text-primary" />,
  },
  {
    title: 'Multi-device flow',
    description: 'Switch between macOS and Windows workflows with a MacBook + Dell machine.',
    icon: <Workflow className="h-5 w-5 text-primary" />,
  },
  {
    title: 'Creative playground',
    description: 'A flexible space for coding, writing, and content creation.',
    icon: <Sparkles className="h-5 w-5 text-primary" />,
  },
];

export default function WorkspacePage() {
  return (
    <div className="relative space-y-16">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/70 p-8 md:p-12 shadow-xl backdrop-blur">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_55%)]" aria-hidden />
        <div className="relative space-y-7">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              My everyday workspace
            </span>
            <div className="space-y-3">
              <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                Workspace
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                I carefully curate the gear that supports my software development, design, and mentoring routines. The goal is an environment that balances comfort, performance, and productivity all at once.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {workspaceHighlights.map((item) => (
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

      <section className="space-y-12">
        {WorkspaceData.map(({ category, items }) => {
          const Icon = WorkspaceIcons[category as keyof typeof WorkspaceIcons];

          return (
            <div key={category} className="space-y-8">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">{category}</h2>
                    <p className="text-sm text-muted-foreground">
                      {category === 'Hardware'
                        ? 'Core hardware that delivers performance and multi-display comfort.'
                        : category === 'Accessory'
                        ? 'Complementary accessories that boost productivity and mobility.'
                        : 'Furniture choices optimized for comfort during long sessions.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-background/85 via-background/75 to-background/80 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden border-b border-border/50">
                      <FallbackImage
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.05]"
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/95 via-background/35 to-transparent" />
                    </div>

                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <div className="space-y-1">
                        <h3 className="text-base font-semibold leading-tight tracking-tight text-foreground group-hover:text-primary">
                          {item.name}
                        </h3>
                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
                          {category}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}