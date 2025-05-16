'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface MediumPost {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  thumbnail: string;
}

export const MediumPosts = () => {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/medium-posts');
        if (!response.ok) {
          throw new Error('Yazılar alınamadı');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError('Medium yazıları yüklenirken bir hata oluştu');
        console.error('Medium yazıları hatası:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Yazılar yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Son Medium Yazılarım</h2>
      <div className="grid gap-6">
        {posts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start space-x-4">
              {post.thumbnail && (
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-24 h-24 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                  {post.description}
                </p>
                <time className="text-sm text-gray-500">
                  {format(new Date(post.publishedAt), 'd MMMM yyyy', { locale: tr })}
                </time>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};