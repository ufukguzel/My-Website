"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";

export default function MusicClient() {
  const { resolvedTheme } = useTheme();

  // Light/Dark temaya göre player rengi
  const color = useMemo(() => {
    return resolvedTheme === "dark" ? "#22d3ee" : "#2c7be5";
  }, [resolvedTheme]);

  const playlistUrl = useMemo(() => {
    const base = "https://w.soundcloud.com/player/";
    const params = new URLSearchParams({
      url: "https://soundcloud.com/ufuk-guezel/sets/melanhcolia",
      color: color.replace("#", "%23"),
      auto_play: "false",
      hide_related: "false",
      show_comments: "true",
      show_user: "true",
      show_reposts: "false",
      show_teaser: "true",
      visual: "true",
    });
    return `${base}?${params.toString()}`;
  }, [color]);

  return (
    <div className="rounded-2xl border border-border/60 bg-background/70 shadow-sm overflow-hidden">
      <div className="aspect-video w-full">
        <iframe
          title="SoundCloud Playlist"
          width="100%"
          height="100%"
          scrolling="no"
          allow="autoplay"
          src={playlistUrl}
        />
      </div>
    </div>
  );
}

