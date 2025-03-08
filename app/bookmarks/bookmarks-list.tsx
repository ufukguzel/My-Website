"use client";

import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { FallbackImage } from "@/components/ui/fallback-image";
import { Collection } from "@/types/collection";
import { Bookmark } from "@/types/bookmark";
import useSWR from "swr";

const DEFAULT_COLLECTION_ID = 52929212; // Senin koleksiyon ID'in

async function fetcher(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to fetch');
  }
  return res.json();
}

export function BookmarksList() {
  const { data: collections = [], error: collectionsError, isLoading: isLoadingCollections } = useSWR<Collection[]>(
    '/api/bookmarks/collections',
    fetcher,
    { revalidateOnFocus: false }
  );

  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);

  useEffect(() => {
    if (collections.length) {
      setSelectedCollection(collections.find(c => c._id === DEFAULT_COLLECTION_ID) || collections[0]);
    }
  }, [collections]);

  const { data: bookmarks = [], error: bookmarksError, isLoading: isLoadingBookmarks } = useSWR<Bookmark[]>(
    selectedCollection ? `/api/bookmarks/items/${selectedCollection._id}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  if (collectionsError) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Failed to load collections. Please try again later.
      </div>
    );
  }

  if (bookmarksError) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Failed to load bookmarks. Please try again later.
      </div>
    );
  }

  if (!collections.length && !isLoadingCollections) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No collections available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Categories Sidebar */}
      

      {/* Bookmarks Grid */}
      <div className="md:col-span-9">
        <div className="grid gap-6">
          {selectedCollection && (
            <h2 className="text-2xl font-semibold">{selectedCollection.title}</h2>
          )}

          {isLoadingBookmarks ? (
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-48 bg-gray-300 animate-pulse rounded-md"></div>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
              {bookmarks.length === 0 ? (
                <div className="col-span-full text-center text-muted-foreground py-12">
                  No bookmarks available.
                </div>
              ) : (
                bookmarks.map((bookmark) => (
                  <div
                    key={bookmark._id}
                    className="flex items-start gap-4 border p-6 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex-shrink-0 w-24 h-24 bg-gray-200">
                      <FallbackImage
                        src={bookmark.cover}
                        alt={bookmark.title}
                        className="object-cover w-full h-full rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{bookmark.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2">{bookmark.excerpt}</p>
                      <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                        <a
                          href={bookmark.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Visit
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
