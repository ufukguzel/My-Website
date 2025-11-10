'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { ArrowUpRight } from 'lucide-react';
import { FallbackImage } from '@/components/ui/fallback-image';

interface MediumPost {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  thumbnail: string;
}

const skeletonArray = Array.from({ length: 4 });

export const MediumPosts = () => {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/medium-posts', {
          cache: 'no-store',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError('An error occurred while loading Medium posts');
        console.error('Medium post error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const content = useMemo(() => {
    if (loading) {
      return (
        <div className="grid gap-4 md:grid-cols-2">
          {skeletonArray.map((_, index) => (
            <div
              key={index}
              className="h-full rounded-2xl border border-border/50 bg-background/60 p-6 shadow-sm"
            >
              <div className="space-y-4">
                <div className="h-36 w-full rounded-xl bg-muted/40" />
                <div className="h-4 w-3/4 rounded bg-muted/40" />
                <div className="h-4 w-full rounded bg-muted/30" />
                <div className="h-4 w-5/6 rounded bg-muted/30" />
                <div className="h-3 w-24 rounded bg-muted/30" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-sm text-destructive">
          {error}
        </div>
      );
    }

    if (!posts.length) {
      return (
        <div className="rounded-2xl border border-border/60 bg-background/70 p-10 text-center text-sm text-muted-foreground">
          There are no published Medium posts at the moment. I’ll add new content soon.
        </div>
      );
    }

    return (
      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-background/80 via-background/70 to-background/80 p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
          >
            <div className="relative mb-5 h-40 overflow-hidden rounded-2xl border border-border/50 bg-muted/40">
              {post.thumbnail ? (
                <FallbackImage
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(min-width: 768px) 40vw, 80vw"
                  priority={false}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  No image available
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            </div>
            <div className="flex flex-1 flex-col">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground/80">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                    Medium
                  </span>
                  <time>{format(new Date(post.publishedAt), 'd MMMM yyyy', { locale: tr })}</time>
                </div>
                <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {post.description}
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:gap-3">
                Read article
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    );
  }, [error, loading, posts]);

  return content;
};