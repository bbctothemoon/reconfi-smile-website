import { getBlogPostsByCategory, getCategories } from '@/lib/airtable';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, Eye, Tag, ArrowLeft } from 'lucide-react';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const [posts, categories] = await Promise.all([
    getBlogPostsByCategory(params.slug),
    getCategories()
  ]);

  const currentCategory = categories.find(cat => cat.slug === params.slug);

  if (!currentCategory) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
          <h1 className="text-3xl font-bold text-gray-900">
            {currentCategory.name}
          </h1>
          {currentCategory.description && (
            <p className="text-gray-600 mt-2">
              {currentCategory.description}
            </p>
          )}
        </div>
      </div>

      {/* Categories Navigation */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/blog"
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition-colors"
            >
              全部
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog/category/${category.slug}`}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  category.slug === params.slug
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                style={
                  category.slug !== params.slug
                    ? { backgroundColor: category.color + '20', color: category.color }
                    : {}
                }
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                此分類目前沒有文章
              </h2>
              <p className="text-gray-600 mb-8">
                敬請期待更多精彩內容
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                查看所有文章
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentCategory.name} 文章 ({posts.length})
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    {post.featuredImage && (
                      <div className="h-48 bg-gray-200">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(post.publishedAt).toLocaleDateString('zh-TW')}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readTime} 分鐘
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {post.views}
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                        <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                          {post.title}
                        </Link>
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <span>作者：{post.author}</span>
                        </div>
                        
                        {post.tags.length > 0 && (
                          <div className="flex items-center">
                            <Tag className="w-4 h-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-500">
                              {post.tags[0]}
                            </span>
                          </div>
                        )}
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        閱讀更多 →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
} 