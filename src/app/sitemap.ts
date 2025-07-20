import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/airtable';
import { getBlogPostsFromCSV } from '@/lib/csv-content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://reconfihk.com';
  
  // 基本頁面
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // 動態部落格頁面
  let blogPosts: Array<{ slug: string; publishedAt: string }> = [];
  
  try {
    blogPosts = await getBlogPosts();
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    // 如果Airtable失敗，使用CSV備用數據
    try {
      blogPosts = await getBlogPostsFromCSV();
    } catch (csvError) {
      console.error('Error fetching CSV data for sitemap:', csvError);
    }
  }

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // 分類頁面
  const categories = ['陶瓷貼片', '笑容設計', '牙科美容', '護理指南'];
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages, ...categoryPages];
} 