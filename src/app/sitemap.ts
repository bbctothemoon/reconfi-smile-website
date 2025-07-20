import { MetadataRoute } from 'next';
import { getBlogPosts, getBlogCategories, BlogPost } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://reconfihk.com';
  
  // 靜態頁面
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
      priority: 0.8,
    },
  ];

  // 動態頁面 - 部落格文章
  let blogPosts: BlogPost[] = [];
  
  try {
    blogPosts = getBlogPosts();
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    // 使用空數組作為fallback
    blogPosts = [];
  }

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug || post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // 動態頁面 - 部落格分類
  let categories: ReturnType<typeof getBlogCategories> = [];
  
  try {
    categories = getBlogCategories();
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error);
    // 使用空數組作為fallback
    categories = [];
  }

  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/blog/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...blogPages, ...categoryPages];
} 