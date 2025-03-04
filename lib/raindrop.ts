import { cache } from 'react';
import { Collection } from '@/types/collection';
import { Bookmark } from '@/types/bookmark';

const RAINDROP_TOKEN = process.env.RAINDROP_ACCESS_TOKEN;
const RAINDROP_API = 'https://api.raindrop.io/rest/v1';

export const getCollections = cache(async (): Promise<Collection[]> => {
  if (!RAINDROP_TOKEN) {
    throw new Error('Raindrop access token is not configured');
  }

  try {
    const res = await fetch(`${RAINDROP_API}/collections`, {
      headers: {
        Authorization: `Bearer ${RAINDROP_TOKEN}`,
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch collections: ${res.statusText}`);
    }

    const data = await res.json();
    return data.items
      .filter((collection: any) => !collection.hidden)
      .map((collection: any) => ({
        _id: collection._id,
        title: collection.title,
        count: collection.count,
      }))
      .sort((a: Collection, b: Collection) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw error;
  }
});

export const getBookmarksByCollection = cache(async (collectionId: number): Promise<Bookmark[]> => {
  if (!RAINDROP_TOKEN) {
    throw new Error('Raindrop access token is not configured');
  }

  try {
    const res = await fetch(
      `${RAINDROP_API}/raindrops/${collectionId}?perpage=50&sort=-created`,
      {
        headers: {
          Authorization: `Bearer ${RAINDROP_TOKEN}`,
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch bookmarks: ${res.statusText}`);
    }

    const data = await res.json();
    return data.items.map((item: any) => ({
      _id: item._id,
      title: item.title,
      excerpt: item.excerpt || '',
      link: item.link,
      cover: item.cover || 'https://source.unsplash.com/random/800x600?technology',
      tags: item.tags || [],
      created: item.created,
    }));
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    throw error;
  }
});
