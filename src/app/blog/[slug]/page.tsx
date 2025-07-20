import { getBlogPostBySlug, getBlogPosts } from '@/lib/airtable';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Eye, Share2 } from 'lucide-react';
import { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: '文章未找到',
      description: '抱歉，您要查找的文章不存在。',
    };
  }

  return {
    title: `${post.title} | ReConfi Smile 牙科美容部落格`,
    description: post.excerpt,
    keywords: [
      ...post.tags,
      '牙科美容',
      '陶瓷貼片',
      '笑容設計',
      '香港牙醫',
      'ReConfi Smile'
    ],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://reconfihk.com/blog/${post.slug}`,
      siteName: 'ReConfi Smile',
      images: post.featuredImage ? [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : ['/logo-blue.png'],
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : ['/logo-blue.png'],
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // 結構化數據
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featuredImage || "https://reconfihk.com/logo-blue.png",
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "ReConfi Smile",
      "logo": {
        "@type": "ImageObject",
        "url": "https://reconfihk.com/logo-blue.png"
      }
    },
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://reconfihk.com/blog/${post.slug}`
    },
    "keywords": post.tags.join(", "),
    "articleSection": "牙科美容",
    "inLanguage": "zh-HK"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 結構化數據 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回部落格
          </Link>
        </div>
      </div>
      
      {/* Article Content */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(post.publishedAt).toLocaleDateString('zh-TW')}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime} 分鐘閱讀
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {post.views} 次瀏覽
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>

              <p className="text-xl text-gray-600 mb-6">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-gray-700">作者：{post.author}</span>
                </div>
                
                <div className="flex items-center text-gray-500">
                  <Share2 className="w-4 h-4 mr-1" />
                  <span>分享</span>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="mb-8">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">標籤</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related Posts */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">相關文章</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* 這裡可以添加相關文章邏輯 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-gray-600">更多精彩內容敬請期待...</p>
                </div>
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="mt-12 bg-blue-600 rounded-lg p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">
                準備好開始您的笑容蛻變之旅了嗎？
              </h3>
              <p className="text-blue-100 mb-6">
                我們的專業團隊隨時為您提供諮詢服務
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/85265306270"
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  立即預約諮詢
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
                >
                  了解更多服務
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
} 