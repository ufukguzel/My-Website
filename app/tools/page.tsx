import { GetMetada } from '@/lib/page-metadata';
import { ToolsData } from '@/lib/tools-data';
import { SquareMousePointer, Sparkles, Workflow } from 'lucide-react';

export const metadata = GetMetada('tools');

const heroHighlights = [
  {
    title: 'Productivity-first selection',
    description: 'Tools tested with teams to jump seamlessly between code, design, and automation.',
    icon: <Workflow className="h-5 w-5 text-primary" />,
  },
  {
    title: 'AI-powered flow',
    description: 'AI-driven assistants that accelerate daily decision making and experimentation.',
    icon: <Sparkles className="h-5 w-5 text-primary" />,
  },
  {
    title: 'Documented experience',
    description: 'I keep usage notes and process documentation for every tool to onboard teammates quickly.',
    icon: <SquareMousePointer className="h-5 w-5 text-primary" />,
  },
];

export default function ToolsPage() {
  return (
    <div className="relative space-y-16">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/70 p-8 md:p-12 shadow-xl backdrop-blur">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.1),_transparent_60%)]" aria-hidden />
        <div className="relative space-y-7">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              My daily tool stack
            </span>
            <div className="space-y-3">
              <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                Tools & Software
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                A curated list of the products that support my coding, design, data, and mentoring workflows. Each one is chosen for speed, collaboration, and repeatability.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {heroHighlights.map((item) => (
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

      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">Tools by category</h2>
          <p className="text-sm text-muted-foreground">
            Development, design, and workflow essentials I rely on—each supported with living notes and documentation.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {ToolsData.map(({ category, icon: Icon, items }) => (
            <div
              key={category}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-background/85 via-background/75 to-background/80 p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="flex items-center gap-3 border-b border-border/40 pb-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold tracking-tight">{category}</h3>
              </div>

              <div className="flex flex-1 flex-col gap-5 pt-5">
                {items.map((item) => (
                  <div key={item.name} className="rounded-2xl border border-border/40 bg-background/70 p-4 transition hover:border-primary/40">
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="text-sm font-semibold text-foreground">{item.name}</h4>
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
                        In daily rotation
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}