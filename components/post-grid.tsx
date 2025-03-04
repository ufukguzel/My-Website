import { formatDistance } from "date-fns";
import { ExternalLink } from "lucide-react";
import { FallbackImage } from "@/components/ui/fallback-image";
import { type Post } from "@/types/post";

export function PostGrid({ posts }: { posts: Post[] }) {
  if (!posts.length) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No posts found.
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {posts.map((post) => (
        <a
          key={post.link}
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block space-y-4"
        >
          <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
            <FallbackImage
              src={post.thumbnail || 'https://source.unsplash.com/random/800x600?technology'}
              alt={post.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-medium group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h2>
              <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </div>
            
            <p className="text-muted-foreground line-clamp-2">
              {post.contentSnippet}
            </p>
            
            <time className="text-sm text-muted-foreground block">
              {formatDistance(new Date(post.pubDate), new Date(), { addSuffix: true })}
            </time>
          </div>
        </a>
      ))}
    </div>
  );
}