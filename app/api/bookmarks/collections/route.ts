import { getCollections } from '@/lib/raindrop';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    if (process.env.RAINDROP_ACCESS_TOKEN) {
      const collections = await getCollections();
      return NextResponse.json(collections);
    }

    // Fallback: no token configured -> expose a single public collection id (used with RSS in items route)
    const fallbackId = Number(process.env.NEXT_PUBLIC_RAINDROP_COLLECTION_ID || "52929212");
    return NextResponse.json([
      {
        _id: fallbackId,
        title: "Bookmarks",
        count: 0,
      },
    ]);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json([]);
  }
}