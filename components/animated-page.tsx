'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Sayfa içindeki [data-reveal] elemanlarını scroll ile fade+slide olarak açar.
 * data-reveal elemanları ilk render'da DOM'da olmalı (async eklenenler kapsanmaz);
 * async içerik için elemanın kendisini değil statik kapsayıcısını işaretleyin.
 */
export function AnimatedPage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!els.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(els, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(els, { y: 28, opacity: 0 });
      ScrollTrigger.batch(els, {
        start: 'top 92%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.08,
            overwrite: true,
          }),
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
