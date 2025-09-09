import { Suspense } from 'react';
import { PostGrid } from '@/components/post-grid';
import { getMediumPosts } from '@/lib/medium';
import { PostGridSkeleton } from '@/components/post-grid-skeleton';
import { ClientPagination } from '@/components/client-pagination';
import { GetMetada } from '@/lib/page-metadata';

export const metadata = GetMetada('blog');

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const postsPerPage = 10;

  const { posts, total } = await getMediumPosts(postsPerPage, currentPage);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Writing</h1>
        <p className="text-muted-foreground">
          Read my latest blog post about web development, technology, and software engineering practices.
        </p>
      </div>

      <Suspense fallback={<PostGridSkeleton />}>
        <PostGrid posts={posts} />
        <ClientPagination
          currentPage={currentPage}
          postsPerPage={postsPerPage}
          totalPosts={total}
        />
      </Suspense>
    </div>
  );
}