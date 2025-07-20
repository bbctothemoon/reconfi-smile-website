import { getBlogPost, getBlogPosts, BlogPost } from '@/lib/content';
import Link from 'next/link';
import { Calendar, Clock, User, Tag, ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import React from 'react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  
  if (!post) {
    return {
      title: '文章未找到 - ReConfi Smile',
      description: '抱歉，您要查找的文章不存在。',
    };
  }

  return {
    title: `${post.title} - ReConfi Smile`,
    description: post.excerpt,
    keywords: [
      '牙科美容',
      '陶瓷貼片',
      '笑容設計',
      post.category,
      '香港牙科'
    ],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://reconfihk.com/blog/${slug}`,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug || post.id.toString(),
  }));
}

export default function BlogPostPage({ params }: PageProps) {
  const slug = params.then(p => p.slug);
  
  // 由於這是客戶端組件，我們需要異步處理
  const [post, setPost] = React.useState<BlogPost | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadPost() {
      try {
        const resolvedSlug = await slug;
        const foundPost = getBlogPost(resolvedSlug);
        setPost(foundPost || null);
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">載入中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">文章未找到</h1>
            <p className="text-gray-600 mb-8">抱歉，您要查找的文章不存在。</p>
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回部落格
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回部落格
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(post.date).toLocaleDateString('zh-TW')}
            <Clock className="w-4 h-4 ml-4 mr-1" />
            {post.readTime}
            <User className="w-4 h-4 ml-4 mr-1" />
            {post.author}
          </div>
          
          <div className="flex items-center">
            <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              <Tag className="w-3 h-3 mr-1" />
              {post.category}
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              發布於 {new Date(post.date).toLocaleDateString('zh-TW')}
            </div>
            <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              查看更多文章 →
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
} 