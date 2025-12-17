"use client";

import { useState } from "react";

export function RaindropEmbed() {
  const [showListInstead, setShowListInstead] = useState(false);

  if (showListInstead) return null;

  return (
    <div className="rounded-2xl border border-border/60 bg-background/70 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2">
        <div className="text-sm font-medium">Raindrop</div>
        <button
          type="button"
          onClick={() => setShowListInstead(true)}
          className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Embed çalışmazsa listeyi göster
        </button>
      </div>

      <iframe
        title="Raindrop Embed"
        style={{ border: 0, width: "100%", height: 450 }}
        allowFullScreen
        frameBorder={0}
        src="https://raindrop.io/ufukguzel15/bookmarks-52929212/embed"
      />

      <div className="px-4 py-3 text-xs text-muted-foreground">
        Not: Bazı tarayıcılarda Raindrop iframe gömülmesini güvenlik nedeniyle engelleyebilir. Böyle bir durumda yukarıdan “listeyi göster”e tıklayın.
      </div>
    </div>
  );
}


