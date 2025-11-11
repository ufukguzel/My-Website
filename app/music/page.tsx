import { GetMetada } from "@/lib/page-metadata";
import MusicClient from "./music-client";

export const metadata = GetMetada("music");

export default function MusicPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Music</h1>
        <p className="text-sm text-muted-foreground">
          A selection from my SoundCloud playlist.
        </p>
      </div>

      <MusicClient />

      <p className="text-xs text-muted-foreground">
        Source: <a className="underline" href="https://soundcloud.com/ufuk-guezel/sets/melanhcolia" target="_blank" rel="noopener noreferrer">SoundCloud – Melanhcolia</a>
      </p>
    </div>
  );
}

