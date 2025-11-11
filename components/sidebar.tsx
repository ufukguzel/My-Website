"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Home, 
  PenTool, 
  Map, 
  Layers,
  Briefcase,
  Bookmark,
  Github, 
  Twitter, 
  Linkedin,
  Menu,
  X,
  Code2,
  Music,
  Terminal,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

type SocialLink = {
  href: string;
  icon: LucideIcon | (() => JSX.Element);
  label: string;
};

const mainLinks = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/blog", icon: PenTool, label: "Writing" },
  { href: "/highlights", icon: Map, label: "Highlights" },
  { href: "/projects", icon: Code2, label: "Projects" },
  { href: "/music", icon: Music, label: "Music" },
  { href: "/playground", icon: Terminal, label: "Playground" },
  { href: "/mobile-apps", icon: Smartphone, label: "Mobile Apps" },
  { href: "/tools", icon: Layers, label: "Tools" },
  { href: "/workspace", icon: Briefcase, label: "Workspace" },
  { href: "/bookmarks", icon: Bookmark, label: "Bookmarks" },
];

const socialLinks: SocialLink[] = [
  { href: "https://github.com/ufukguzel", icon: Github, label: "GitHub" },
  { href: "https://x.com/ufukkguzel", icon: Twitter, label: "Twitter (X)" },
  { href: "https://www.linkedin.com/in/ufukguzel/", icon: Linkedin, label: "LinkedIn" }
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.setProperty("overflow", "hidden");
      document.body.style.setProperty("touch-action", "none");
    } else {
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("touch-action");
    }

    return () => {
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("touch-action");
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        className={cn(
          "md:hidden fixed left-4 top-4 z-50 inline-flex items-center justify-center rounded-full border border-border/60 bg-background/80 px-3 py-3 text-foreground shadow-lg backdrop-blur transition-all duration-300",
          isOpen && "translate-x-48 bg-primary text-primary-foreground"
        )}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-40 h-screen w-64 border-r border-border/70 bg-background/95 p-6 shadow-xl backdrop-blur-lg transition-transform duration-300 ease-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="flex h-full flex-col justify-between" id="primary-navigation">
          <div className="space-y-8">
            <Link href="/" className="block" onClick={() => setIsOpen(false)}>
              <div className="space-y-3">
                <Image
                  src="/images/ufuks.png"
                  alt="Ufuk"
                  width={48}
                  height={48}
                  className="rounded-full"
                  priority
                />
                <div>
                  <h2 className="font-semibold">Ufuk</h2>
                  <p className="text-sm text-muted-foreground">Software Developer & AI Enthusiast</p>
                </div>
              </div>
            </Link>

            <nav className="space-y-2">
              {mainLinks.map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                    pathname === href && "bg-accent text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-around gap-4 rounded-2xl border border-border/60 bg-background/80 p-4 text-muted-foreground transition md:border-none md:bg-transparent md:p-0">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-background/60 backdrop-blur-sm opacity-0 transition-opacity duration-300 md:hidden",
          isOpen && "pointer-events-auto opacity-100",
          !isOpen && "pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />
    </>
  );
}
