import { getCollections } from '@/lib/raindrop';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const collections = await getCollections();
    return NextResponse.json(collections);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch collections' }, 
      { status: 500 }
    );
  }
}