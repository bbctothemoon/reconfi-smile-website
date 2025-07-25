import { notFound } from 'next/navigation';
import { getBlogPost } from '@/lib/content';

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  if (!post) return notFound();

  return (
    <main>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </main>
  );
} 