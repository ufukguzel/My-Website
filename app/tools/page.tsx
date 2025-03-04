import { GetMetada } from '@/lib/page-metadata';
import { ToolsData } from '@/lib/tools-data';

export const metadata = GetMetada('tools');

export default function ToolsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Tools & Software</h1>
        <p className="text-muted-foreground">
          A curated list of tools and software that I use daily to improve my workflow and productivity.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {ToolsData.map(({ category, icon: Icon, items }) => (
          <div key={category} className="rounded-lg border p-6">
            <div className="flex items-center gap-3 mb-6">
              <Icon className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">{category}</h2>
            </div>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.name} className="group">
                  <h3 className="font-medium group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}