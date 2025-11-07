"use client";

import React from "react";

export function MouseGradientBackground() {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const rafRef = React.useRef<number>();

  React.useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: event.clientX, y: event.clientY });
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 transition-opacity duration-300"
      style={{
        background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(59,130,246,0.25), transparent 70%)`,
      }}
    />
  );
}

