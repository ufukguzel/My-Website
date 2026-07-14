"use client";

import { useMemo, useState } from "react";
import { MediumPosts } from "@/components/medium-posts";
import { AnimatedPage } from "@/components/animated-page";

export default function BlogClient() {
  const [query, setQuery] = useState("");

  const normalizedQuery = useMemo(() => query.trim(), [query]);

  return (
    <AnimatedPage className="space-y-6">
      <div data-reveal className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold">Blog Posts</h1>
          <p className="text-sm text-muted-foreground">
            Yazılar arasında hızlıca arayın (başlık ve açıklama).
          </p>
        </div>

        <div className="w-full sm:w-[320px]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ara…"
            className="h-10 w-full rounded-full border border-border/60 bg-background/70 px-4 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            aria-label="Blog içinde ara"
          />
        </div>
      </div>

      <div data-reveal>
        <MediumPosts query={normalizedQuery} />
      </div>
    </AnimatedPage>
  );
}


