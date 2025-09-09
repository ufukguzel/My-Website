import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    // Medium resmi API kısıtlı; RSS üzerinden güvenli fallback
    const rssUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@ufukguzel15';
    const response = await fetch(rssUrl, { next: { revalidate: 3600 } });
    if (!response.ok) {
      return NextResponse.json([]);
    }
    const data = await response.json();
    if (data.status !== 'ok' || !data.items) {
      return NextResponse.json([]);
    }
    const posts = data.items.slice(0, 5).map((item: any) => ({
      title: item.title,
      description: item.description?.replace(/<[^>]*>/g, '').slice(0, 160) + '...',
      url: item.link,
      publishedAt: item.pubDate,
      thumbnail: item.thumbnail || null,
    }));
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Medium API Hatası:', error);
    return NextResponse.json([]);
  }
} 