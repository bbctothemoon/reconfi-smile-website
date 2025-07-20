import { getBlogPosts, getBlogCategories } from '@/lib/content';
import Link from 'next/link';
import { Calendar, Clock, User, Tag } from 'lucide-react';

export default function BlogPage() {
  const posts = getBlogPosts();
  const categories = getBlogCategories();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            專業專欄
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            分享最新的牙科美容知識、治療技術和護理指南，幫助您了解如何擁有完美的笑容
          </p>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">分類瀏覽</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/blog/category/${category.slug}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
                >
                  <Tag className="w-4 h-4 mr-2" />
                  {category.name}
                  <span className="ml-2 bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {category.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

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
            <p className="text-gray-600">請稍後再來查看，或聯繫我們了解更多資訊。</p>
          </div>
        )}
      </div>
    </div>
  );
} 