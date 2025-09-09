import { getCollections } from '@/lib/raindrop';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    if (!process.env.RAINDROP_ACCESS_TOKEN) {
      return NextResponse.json([]);
    }
    const collections = await getCollections();
    return NextResponse.json(collections);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json([]);
  }
}