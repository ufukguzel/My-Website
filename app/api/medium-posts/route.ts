import { NextResponse } from 'next/server';
import { getMediumPosts } from '@/lib/medium';

export async function GET() {
  try {
    const { posts } = await getMediumPosts(5);

    type MediumPost = {
      title: string;
      link: string;
      pubDate: string;
      contentSnippet: string;
      thumbnail: string | null;
    };

    const formattedPosts = posts.map((post: MediumPost) => ({
      title: post.title,
      description: post.contentSnippet,
      url: post.link,
      publishedAt: post.pubDate,
      thumbnail: post.thumbnail,
    }));

    return NextResponse.json(formattedPosts, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Medium API error:', error);
    return NextResponse.json({ error: 'Failed to fetch Medium posts' }, { status: 500 });
  }
}