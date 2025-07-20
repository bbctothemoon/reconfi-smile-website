import { getBlogPosts, getCategories } from '@/lib/airtable';
import Link from 'next/link';
import { Calendar, Clock, Eye, Tag } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '牙科美容部落格 - 專業知識與案例分享',
  description: '探索最新的牙科美容知識、技術趨勢和專業見解。ReConfi Smile 分享陶瓷貼片、笑容設計等專業內容，助您了解牙科美容服務。',
  keywords: [
    '牙科美容部落格',
    '陶瓷貼片知識',
    '笑容設計',
    '牙科美容技術',
    '牙科案例分享',
    '香港牙科資訊'
  ],
  openGraph: {
    title: '牙科美容部落格 - 專業知識與案例分享',
    description: '探索最新的牙科美容知識、技術趨勢和專業見解。',
    type: 'website',
    url: 'https://reconfihk.com/blog',
  },
  alternates: {
    canonical: '/blog',
  },
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    getCategories()
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              牙科美容部落格
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              分享最新的牙科美容知識、技術趨勢和專業見解
            </p>
            <div className="mt-6 text-sm text-gray-500">
              <span>共 {posts.length} 篇文章</span>
              {categories.length > 0 && (
                <>
                  <span className="mx-2">•</span>
                  <span>{categories.length} 個分類</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/blog"
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                全部
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/blog/category/${category.slug}`}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                  style={{ backgroundColor: category.color + '20', color: category.color }}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                目前沒有文章
              </h2>
              <p className="text-gray-600">
                敬請期待更多精彩內容
              </p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {posts.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">精選文章</h2>
                  <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="md:flex">
                      {posts[0].featuredImage && (
                        <div className="md:w-1/3 h-64 md:h-auto bg-gray-200">
                          <img
                            src={posts[0].featuredImage}
                            alt={posts[0].title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(posts[0].publishedAt).toLocaleDateString('zh-TW')}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {posts[0].readTime} 分鐘
                          </div>
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {posts[0].views}
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                          <Link href={`/blog/${posts[0].slug}`} className="hover:text-blue-600">
                            {posts[0].title}
                          </Link>
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {posts[0].excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <span>作者：{posts[0].author}</span>
                          </div>
                          
                          {posts[0].tags.length > 0 && (
                            <div className="flex items-center">
                              <Tag className="w-4 h-4 text-gray-400 mr-1" />
                              <span className="text-sm text-gray-500">
                                {posts[0].tags[0]}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <Link
                          href={`/blog/${posts[0].slug}`}
                          className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
                        >
                          閱讀更多 →
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              )}

              {/* Other Posts */}
              {posts.length > 1 && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">最新文章</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.slice(1).map((post) => (
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
            </>
          )}
        </div>
      </section>

      {/* Structured Data for Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "ReConfi Smile 牙科美容部落格",
            "description": "分享最新的牙科美容知識、技術趨勢和專業見解",
            "url": "https://reconfihk.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "ReConfi Smile",
              "url": "https://reconfihk.com"
            },
            "blogPost": posts.slice(0, 5).map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "author": {
                "@type": "Person",
                "name": post.author
              },
              "datePublished": post.publishedAt,
              "dateModified": post.publishedAt,
              "url": `https://reconfihk.com/blog/${post.slug}`,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://reconfihk.com/blog/${post.slug}`
              }
            }))
          })
        }}
      />
    </div>
  );
} 