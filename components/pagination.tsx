import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReadonlyURLSearchParams } from "next/navigation";

export interface PaginationProps {
  currentPage: number;
  postsPerPage: number;
  totalPosts: number;
  pathname: string;
  searchParams: ReadonlyURLSearchParams;
}

export function Pagination({
  currentPage,
  postsPerPage,
  totalPosts,
  pathname,
  searchParams,
}: PaginationProps) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  
  function generatePageLink(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "p-2 hover:text-primary transition-colors",
          currentPage <= 1 && "pointer-events-none opacity-50"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </Link>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={generatePageLink(page)}
          className={cn(
            "px-4 py-2 rounded-md hover:text-primary transition-colors",
            currentPage === page && "bg-primary text-primary-foreground hover:text-primary-foreground"
          )}
        >
          {page}
        </Link>
      ))}
      
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "p-2 hover:text-primary transition-colors",
          currentPage >= totalPages && "pointer-events-none opacity-50"
        )}
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </Link>
    </div>
  );
}