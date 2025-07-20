import { getBlogPostsByCategory, getBlogCategories, BlogPost } from '@/lib/content';
import Link from 'next/link';
import { Calendar, Clock, User, Tag, ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import React from 'react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface Category {
  name: string;
  slug: string;
  count: number;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = getBlogCategories();
  const category = categories.find(cat => cat.slug === slug);
  
  if (!category) {
    return {
      title: '分類未找到 - ReConfi Smile',
      description: '抱歉，您要查找的分類不存在。',
    };
  }

  return {
    title: `${category.name} - ReConfi Smile`,
    description: `瀏覽 ${category.name} 相關的牙科美容文章和專業知識。`,
    keywords: [
      '牙科美容',
      '陶瓷貼片',
      '笑容設計',
      category.name,
      '香港牙科'
    ],
    openGraph: {
      title: `${category.name} - ReConfi Smile`,
      description: `瀏覽 ${category.name} 相關的牙科美容文章和專業知識。`,
      type: 'website',
      url: `https://reconfihk.com/blog/category/${slug}`,
    },
    alternates: {
      canonical: `/blog/category/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const categories = getBlogCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage({ params }: PageProps) {
  const slug = params.then(p => p.slug);
  
  // 由於這是客戶端組件，我們需要異步處理
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [category, setCategory] = React.useState<Category | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadData() {
      try {
        const resolvedSlug = await slug;
        const categories = getBlogCategories();
        const foundCategory = categories.find(cat => cat.slug === resolvedSlug);
        const categoryPosts = getBlogPostsByCategory(foundCategory?.name || '');
        
        setCategory(foundCategory || null);
        setPosts(categoryPosts);
      } catch (error) {
        console.error('Error loading category:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">載入中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">分類未找到</h1>
            <p className="text-gray-600 mb-8">抱歉，您要查找的分類不存在。</p>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回部落格
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {category.name}
          </h1>
          <p className="text-xl text-gray-600">
            共 {category.count} 篇文章
          </p>
        </div>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(post.date).toLocaleDateString('zh-TW')}
                  <Clock className="w-4 h-4 ml-4 mr-1" />
                  {post.readTime}
                  <User className="w-4 h-4 ml-4 mr-1" />
                  {post.author}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  <Link href={`/blog/${post.slug || post.id}`} className="hover:text-blue-600 transition-colors">
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    <Tag className="w-3 h-3 mr-1" />
                    {post.category}
                  </span>
                  
                  <Link
                    href={`/blog/${post.slug || post.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    閱讀更多 →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">暫無文章</h3>
            <p className="text-gray-600">此分類下暫無文章，請稍後再來查看。</p>
          </div>
        )}
      </div>
    </div>
  );
} 