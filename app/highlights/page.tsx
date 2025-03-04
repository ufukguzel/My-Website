import { ImageDialog } from '@/components/ui/image-dialog';
import { HighlightList } from '@/lib/highlights-data';
import { GetMetada } from '@/lib/page-metadata';

export const metadata = GetMetada('highlights');

export default function HighlightPage() {
  return (
    <div className="max-w-4xl space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Highlights</h1>
        <p className="text-muted-foreground">
          Important points of my career and life, a kind of timeline.
        </p>
      </div>

      <div className="space-y-16">
        {HighlightList.map((item) => (
          <div key={item.year} className="relative grid grid-cols-[100px_1fr] gap-8">
            <div className="text-xl font-medium sticky top-20">
              {item.year}
            </div>

            <div className="space-y-12 relative">
              {item.events.map((event, eventIndex) => (
                <div
                  key={`${item.year}-${eventIndex}`}
                  className="relative pl-12"
                >
                  {/* Connecting line only between events */}
                  {eventIndex < item.events.length - 1 && (
                    <div className="absolute left-[11px] top-[28px] h-[calc(100%+20px)] w-[2px] bg-border/30" />
                  )}

                  {/* Plus icon */}
                  <div className="absolute left-0 top-1.5">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <span className="text-sm font-medium">+</span>
                    </div>
                  </div>

                  <div className="group">
                    <h3 className="text-lg font-medium mb-3 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                    { /* Image */}
                    {event.imageUrl && (
                      <div className="mt-4">
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
    </div>
  );
}
