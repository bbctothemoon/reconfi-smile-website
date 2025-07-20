import { MetadataRoute } from 'next'
import { getBlogPosts, getCategories } from '@/lib/airtable'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://reconfihk.com'
  
  // 獲取blog文章和分類
  let posts: any[] = []
  let categories: any[] = []
  
  try {
    [posts, categories] = await Promise.all([
      getBlogPosts(),
      getCategories()
    ])
  } catch (error) {
    console.log('無法獲取blog數據，使用靜態sitemap')
  }
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#testimonials`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/#team`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]
  
  // 添加blog文章
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
  
  // 添加blog分類
  const blogCategories = categories.map((category) => ({
    url: `${baseUrl}/blog/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  return [...staticPages, ...blogPosts, ...blogCategories]
} 