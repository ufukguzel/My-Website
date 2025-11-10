import { ImageDialog } from '@/components/ui/image-dialog';
import { HighlightList } from '@/lib/highlights-data';
import { GetMetada } from '@/lib/page-metadata';
import { CalendarDays, Sparkles, Trophy } from 'lucide-react';

export const metadata = GetMetada('highlights');

export default function HighlightPage() {
  return (
    <div className="relative space-y-14">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/70 p-8 shadow-xl backdrop-blur">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_55%)]" aria-hidden />
        <div className="relative space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            <Sparkles size={16} />
            Career timeline
          </span>
          <header className="space-y-3">
            <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              Highlights
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
              A snapshot of milestones across mentorship, product development, and community work—each one a reminder of learning, discipline, and collaboration.
            </p>
          </header>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-4 py-1.5">
              <CalendarDays className="h-4 w-4 text-primary" />
              2021 → Today
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-4 py-1.5">
              <Trophy className="h-4 w-4 text-primary" />
              Focused on product, community, and mentoring
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-border/40 to-transparent md:left-1/2" aria-hidden />
        <div className="space-y-12">
          {HighlightList.map((item, index) => (
            <div
              key={item.year}
              className="relative grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:items-start"
            >
              <div className={`relative flex flex-col gap-3 rounded-2xl border border-border/60 bg-background/70 p-6 shadow-sm ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <span className="text-sm font-semibold uppercase tracking-wide text-primary/80">
                  {item.year}
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.events.length} key moment{item.events.length > 1 ? 's' : ''}
                </p>
              </div>

              <div className={`space-y-8 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                {item.events.map((event, eventIndex) => (
                  <div
                    key={`${item.year}-${eventIndex}`}
                    className="group relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-background/85 via-background/70 to-background/80 p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                  >
                    <div className="absolute left-0 top-6 h-12 w-1 rounded-full bg-primary/40 md:-left-12" aria-hidden />
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary">
                          {event.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {event.description}
                      </p>
                      {event.imageUrl && (
                        <div className="mt-4 overflow-hidden rounded-2xl border border-border/60 bg-muted/20">
                          <ImageDialog imageUrl={event.imageUrl} altText={event.title} />
                        </div>
                      )}
                    </div>
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
