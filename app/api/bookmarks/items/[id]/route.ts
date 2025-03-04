import { getBookmarksByCollection } from '@/lib/raindrop';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const bookmarks = await getBookmarksByCollection(Number(params.id));
    return NextResponse.json(bookmarks);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch bookmarks' }, 
      { status: 500 }
    );
  }
}