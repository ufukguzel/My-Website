import { getBookmarksByCollection } from '@/lib/raindrop';
import { getPublicBookmarksFromRss } from '@/lib/raindrop-public';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (process.env.RAINDROP_ACCESS_TOKEN) {
      const bookmarks = await getBookmarksByCollection(Number(params.id));
      return NextResponse.json(bookmarks);
    }

    // Fallback: public RSS for your shared page (works without token)
    const bookmarks = await getPublicBookmarksFromRss({
      username: 'ufukguzel15',
      slugWithId: `bookmarks-${params.id}`,
    });

    return NextResponse.json(bookmarks, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json([]);
  }
}