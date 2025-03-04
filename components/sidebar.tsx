"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "md:hidden fixed top-4 z-50 p-2 bg-background border rounded-md",
          isOpen ? "left-52" : "left-4"
        )}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-screen w-64 border-r bg-background p-6 transition-transform duration-200 ease-in-out z-40",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="flex h-full flex-col justify-between">
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
          <div className="flex items-center space-x-4 fixed bottom-8 left-0 w-full p-4 justify-around z-10 md:static md:flex-none">
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
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
