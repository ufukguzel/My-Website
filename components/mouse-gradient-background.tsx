"use client";

import React from "react";

export function MouseGradientBackground() {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const targetPosition = React.useRef({ x: 0, y: 0 });
  const frameRef = React.useRef<number>();
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    isMounted.current = true;
    targetPosition.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    setPosition(targetPosition.current);

    const handlePointerMove = (event: PointerEvent) => {
      targetPosition.current = { x: event.clientX, y: event.clientY };
    };

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      setPosition((prev) => {
        const { x: tx, y: ty } = targetPosition.current;
        const nextX = prev.x + (tx - prev.x) * 0.15;
        const nextY = prev.y + (ty - prev.y) * 0.15;

        if (Math.abs(nextX - prev.x) < 0.1 && Math.abs(nextY - prev.y) < 0.1) {
          return prev;
        }

        return { x: nextX, y: nextY };
      });
    };

    frameRef.current = requestAnimationFrame(animate);
    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      isMounted.current = false;
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-60 transition-opacity duration-700"
        style={{
          background: `radial-gradient(360px circle at ${position.x}px ${position.y}px, rgba(59,130,246,0.12), transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-80 mix-blend-screen"
        style={{
          background: `radial-gradient(220px circle at ${position.x}px ${position.y}px, rgba(147,197,253,0.45), rgba(37,99,235,0.15) 45%, transparent 75%)`,
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(14,165,233,0.18), transparent 70%)`,
        }}
      />
    </div>
  );
}

