import sanitizeHtml from 'sanitize-html';
import he from 'he';

export async function getMediumPosts(limit = 10, page = 1) {
  try {
    const response = await fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@ufukguzel15',
      {
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (data.status !== 'ok' || !data.items) {
      throw new Error('Failed to fetch Medium posts');
    }

    const allPosts = data.items.map((item: any) => ({
      title: he.decode(item.title),
      link: item.link,
      pubDate: item.pubDate,
      contentSnippet: sanitizeHtml(item.description, {
        allowedTags: [],
      }).slice(0, 160) + '...',
      thumbnail: item.thumbnail || extractImageFromContent(item.content),
    }));

    const totalPosts = allPosts.length;
    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalPosts);

    return {
      posts: allPosts.slice(startIndex, endIndex),
      total: totalPosts,
    };
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return {
      posts: [],
      total: 0,
    };
  }
}

function extractImageFromContent(content: string): string {
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/);
  return imgMatch ? imgMatch[1] : '';
}
