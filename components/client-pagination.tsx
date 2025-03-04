"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import { Pagination, type PaginationProps } from './pagination';

type ClientPaginationProps = Omit<PaginationProps, 'pathname' | 'searchParams'>;

export function ClientPagination({
  currentPage,
  postsPerPage,
  totalPosts,
}: ClientPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <Pagination
      currentPage={currentPage}
      postsPerPage={postsPerPage}
      totalPosts={totalPosts}
      pathname={pathname}
      searchParams={searchParams}
    />
  );
}