"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function LoadingProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <div
      className={cn(
        "fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-background/50 px-3 py-1.5 text-sm text-muted-foreground backdrop-blur transition-all",
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>Loading</span>
    </div>
  );
}