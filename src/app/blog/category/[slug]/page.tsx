import { getBlogPostsByCategory, getCategories } from '@/lib/airtable';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Eye, Tag } from 'lucide-react';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find(cat => cat.slug === slug);
  
  if (!category) {
    return {
      title: '分類未找到',
      description: '抱歉，您要查找的分類不存在。',
    };
  }

  return {
    title: `${category.name} - 牙科美容部落格 | ReConfi Smile`,
    description: category.description,
    keywords: [
      category.name,
      '牙科美容',
      '陶瓷貼片',
      '笑容設計',
      '香港牙醫',
      'ReConfi Smile'
    ],
    openGraph: {
      title: `${category.name} - 牙科美容部落格`,
      description: category.description,
      type: 'website',
      url: `https://reconfihk.com/blog/category/${category.slug}`,
      siteName: 'ReConfi Smile',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} - 牙科美容部落格`,
      description: category.description,
    },
    alternates: {
      canonical: `/blog/category/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [posts, categories] = await Promise.all([
    getBlogPostsByCategory(slug),
    getCategories()
  ]);
  
  const category = categories.find(cat => cat.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryPosts = posts.filter(post => 
    post.category === category.name
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回部落格
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {category.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              探索 {category.name} 相關的牙科美容知識和專業見解
            </p>
            <div className="mt-6 text-sm text-gray-500">
              <span>共 {categoryPosts.length} 篇文章</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Navigation */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/blog"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
            >
              全部
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/blog/category/${cat.slug}`}
                className={`px-4 py-2 rounded-full transition-colors ${
                  cat.slug === slug
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                style={cat.slug !== slug ? { backgroundColor: cat.color + '20', color: cat.color } : {}}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {categoryPosts.length === 0 ? (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                此分類目前沒有文章
              </h2>
              <p className="text-gray-600 mb-6">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryPosts.map((post) => (
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
                    
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                        {post.title}
                      </Link>
                    </h2>
                    
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
          )}
        </div>
      </section>

      {/* Structured Data for Category */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `${category.name} - 牙科美容部落格`,
            "description": `探索 ${category.name} 相關的牙科美容知識和專業見解`,
            "url": `https://reconfihk.com/blog/category/${slug}`,
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": categoryPosts.map((post, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "BlogPosting",
                  "headline": post.title,
                  "description": post.excerpt,
                  "url": `https://reconfihk.com/blog/${post.slug}`,
                  "datePublished": post.publishedAt,
                  "author": {
                    "@type": "Person",
                    "name": post.author
                  }
                }
              }))
            }
          })
        }}
      />
    </div>
  );
} 