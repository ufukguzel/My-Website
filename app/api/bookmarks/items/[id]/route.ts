import { getBookmarksByCollection } from '@/lib/raindrop';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!process.env.RAINDROP_ACCESS_TOKEN) {
      return NextResponse.json([]);
    }
    const bookmarks = await getBookmarksByCollection(Number(params.id));
    return NextResponse.json(bookmarks);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json([]);
  }
}