"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./logo";

const links = [
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-8">
        <Logo />
        <nav className="flex gap-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-muted-foreground hover:text-foreground transition-colors",
                pathname === href && "text-foreground font-medium"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <ThemeToggle />
    </header>
  );
}