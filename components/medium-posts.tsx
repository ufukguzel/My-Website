import { formatDistance } from "date-fns";
import { type MediumPost } from "@/types/medium-post";

export function MediumPosts({ 
  posts,
  showViewAll = false 
}: { 
  posts: MediumPost[];
  showViewAll?: boolean;
}) {
  if (!posts.length) return null;

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.link} className="group space-y-2">
            <a 
              href={post.link}
              target="_blank"
              rel="noopener noreferrer" 
              className="block"
            >
              <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
                {post.title}
              </h3>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {post.contentSnippet}
            </p>
            <time className="text-xs text-muted-foreground block">
              {formatDistance(new Date(post.pubDate), new Date(), { addSuffix: true })}
            </time>
          </article>
        ))}
      </div>
    </div>
  );
}