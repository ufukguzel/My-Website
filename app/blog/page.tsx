import { MediumPosts } from '@/components/medium-posts';
import { GetMetada } from '@/lib/page-metadata';

export const metadata = GetMetada('blog');

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Yazılarım</h1>
      <MediumPosts />
    </div>
  );
}