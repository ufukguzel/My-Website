"use client";

import { useEffect } from "react";

const PlayAIEmbed: React.FC = () => {
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_PLAYAI_API_KEY;
    if (!apiKey) {
      console.error("PlayAI API key is missing!");
      return;
    }

    const handleLoad = () => {
      if (typeof window !== "undefined" && (window as any).PlayAI) {
        (window as any).PlayAI.open(apiKey);
      }

      // Mikrofon ikonuna stil ekleme
      const iframe = document.querySelector("iframe");
      if (iframe) {
        iframe.style.backgroundColor = "transparent";
        iframe.style.border = "none";
        iframe.style.overflow = "hidden";
      }
    };

    const script = document.createElement("script");
    script.src = "https://unpkg.com/@play-ai/web-embed";
    script.type = "text/javascript";
    script.async = true;
    script.onload = handleLoad;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return null;
};

export default PlayAIEmbed;
