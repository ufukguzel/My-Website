import { Suspense } from 'react';
import { BookmarksList } from './bookmarks-list';
import { Loader2 } from 'lucide-react';
import { GetMetada } from '@/lib/page-metadata';

export const metadata = GetMetada("Ufuk'un Bookmarks Koleksiyonu");

export default function BookmarksPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Bookmarks</h1>
        <p className="text-muted-foreground">
        Here, I record the links, documents, github warehouses and tweets that I find useful while browsing the Internet.
        </p>
        <p className="text-muted-foreground">
        To all my bookmarks <a href="https://raindrop.io/ufukguzel15/bookmarks-52929212" target="_blank" className="text-blue-500 underline">from here</a> can reach.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="flex items-center justify-center py-12 text-muted-foreground/60">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        }
      >
        <BookmarksList />
      </Suspense>
    </div>
  );
}