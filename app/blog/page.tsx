import { GetMetada } from '@/lib/page-metadata';
import BlogClient from './blog-client';

export const metadata = GetMetada('blog');

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BlogClient />
    </div>
  );
}