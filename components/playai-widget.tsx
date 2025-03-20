'use client';

import { useEffect } from 'react';

// PlayAI window tipini tanımla
declare global {
  interface Window {
    PlayAI?: {
      init: () => void;
    };
  }
}

export const PlayAIWidget = () => {
  useEffect(() => {
    // Script zaten yüklü mü kontrol et
    if (document.querySelector('script[src="https://cdn.playai.com/widget.js"]')) {
      return;
    }

    // Script elementini oluştur
    const script = document.createElement('script');
    script.src = 'https://cdn.playai.com/widget.js';
    script.async = true;
    script.defer = true;
    
    // Script yüklendiğinde widget'ı başlat
    script.onload = () => {
      if (window.PlayAI) {
        window.PlayAI.init();
      }
    };

    // Script'i head'e ekle
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://cdn.playai.com/widget.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="fixed right-4 bottom-4 z-[9999]">
      <div id="playai-widget"
        data-playai-key="ak-b9dfb92d484a4adb83e8f21a632cad28"
        data-playai-width="350px"
        data-playai-height="600px"
        data-playai-position="right"
        data-playai-show-launcher="true"
      />
    </div>
  );
}; 