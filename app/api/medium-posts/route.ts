import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const username = 'ufukkguzel'; // Medium kullanıcı adınız
    const response = await fetch(`https://api.medium.com/v1/users/${username}/posts`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Medium API yanıt vermedi');
    }

    const data = await response.json();
    
    // Son 5 yazıyı al
    const posts = data.data.slice(0, 5).map((post: any) => ({
      title: post.title,
      description: post.description,
      url: post.url,
      publishedAt: post.publishedAt,
      thumbnail: post.thumbnail,
    }));

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Medium API Hatası:', error);
    return NextResponse.json({ error: 'Medium yazıları alınamadı' }, { status: 500 });
  }
} 