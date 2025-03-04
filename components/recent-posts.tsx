import Link from "next/link";
import { formatDistance } from "date-fns";

// This would typically come from your WordPress API
const posts = [
  {
    id: 1,
    title: "Building Modern WordPress Themes with Next.js",
    excerpt: "Learn how to create a WordPress theme using Next.js and shadcn/ui...",
    date: "2024-03-15",
    slug: "building-modern-wordpress-themes",
  },
  // Add more posts here
];

export function RecentPosts() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.id} className="space-y-2">
            <Link href={`/blog/${post.slug}`} className="block group">
              <h3 className="text-xl font-medium group-hover:text-primary transition-colors">
                {post.title}
              </h3>
            </Link>
            <p className="text-muted-foreground">{post.excerpt}</p>
            <time className="text-sm text-muted-foreground">
              {formatDistance(new Date(post.date), new Date(), { addSuffix: true })}
            </time>
          </article>
        ))}
      </div>
      <div className="mt-8">
        <Link
          href="/blog"
          className="text-primary hover:underline"
        >
          View all posts →
        </Link>
      </div>
    </section>
  );
}