"use client";

import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="font-mono text-lg font-bold hover:text-primary transition-colors">
      <span className="text-primary">&lt;</span>
      <span className="text-muted-foreground">/</span>
      <span className="text-primary">&gt;</span>
    </Link>
  );
}