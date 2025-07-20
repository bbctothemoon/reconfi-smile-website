import Airtable from 'airtable';
import { getBlogPostsFromCSV, generateCategoriesFromCSV } from './csv-content';

// 檢查是否有 Airtable API 金鑰
const hasAirtableConfig = process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID;

// 初始化 Airtable 客戶端（僅在有配置時）
const airtable = hasAirtableConfig ? new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}) : null;

// 獲取基礎資料庫（僅在有配置時）
const base = hasAirtableConfig ? airtable!.base(process.env.AIRTABLE_BASE_ID!) : null;

// 定義資料表名稱
export const TABLES = {
  COURSES: 'Courses',
  TESTIMONIALS: 'Testimonials',
  TREATMENTS: 'Treatments',
  TEAM: 'Team',
  BLOG_POSTS: 'BlogPosts',
  CATEGORIES: 'Categories',
} as const;

// 課程資料類型
export interface Course {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  features: string[];
  image?: string;
  isPopular?: boolean;
}

// 見證資料類型
export interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  treatment: string;
  beforeImage?: string;
  afterImage?: string;
  date: string;
}

// 治療項目資料類型
export interface Treatment {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  image?: string;
}

// 團隊成員資料類型
export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  image?: string;
  specialties: string[];
}

// 部落格文章資料類型
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  isPublished: boolean;
  readTime: number;
  views: number;
}

// 分類資料類型
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

// 獲取課程資料
export async function getCourses(): Promise<Course[]> {
  if (!hasAirtableConfig || !base) {
    return [];
  }

  try {
    const records = await base(TABLES.COURSES).select().all();
    return records.map(record => ({
      id: record.id,
      name: record.get('Name') as string,
      description: record.get('Description') as string,
      duration: record.get('Duration') as string,
      price: record.get('Price') as string,
      features: (record.get('Features') as string)?.split(',').map(f => f.trim()) || [],
      image: record.get('Image') as string,
      isPopular: record.get('IsPopular') as boolean,
    }));
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

// 獲取見證資料
export async function getTestimonials(): Promise<Testimonial[]> {
  if (!hasAirtableConfig || !base) {
    return [];
  }

  try {
    const records = await base(TABLES.TESTIMONIALS).select().all();
    return records.map(record => ({
      id: record.id,
      name: record.get('Name') as string,
      content: record.get('Content') as string,
      rating: record.get('Rating') as number,
      treatment: record.get('Treatment') as string,
      beforeImage: record.get('BeforeImage') as string,
      afterImage: record.get('AfterImage') as string,
      date: record.get('Date') as string,
    }));
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

// 獲取治療項目資料
export async function getTreatments(): Promise<Treatment[]> {
  if (!hasAirtableConfig || !base) {
    return [];
  }

  try {
    const records = await base(TABLES.TREATMENTS).select().all();
    return records.map(record => ({
      id: record.id,
      name: record.get('Name') as string,
      description: record.get('Description') as string,
      price: record.get('Price') as string,
      duration: record.get('Duration') as string,
      features: (record.get('Features') as string)?.split(',').map(f => f.trim()) || [],
      image: record.get('Image') as string,
    }));
  } catch (error) {
    console.error('Error fetching treatments:', error);
    return [];
  }
}

// 獲取團隊成員資料
export async function getTeamMembers(): Promise<TeamMember[]> {
  if (!hasAirtableConfig || !base) {
    return [];
  }

  try {
    const records = await base(TABLES.TEAM).select().all();
    return records.map(record => ({
      id: record.id,
      name: record.get('Name') as string,
      title: record.get('Title') as string,
      bio: record.get('Bio') as string,
      image: record.get('Image') as string,
      specialties: (record.get('Specialties') as string)?.split(',').map(s => s.trim()) || [],
    }));
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

// 獲取所有部落格文章
export async function getBlogPosts(): Promise<BlogPost[]> {
  // 如果有 Airtable 配置，嘗試從 Airtable 獲取
  if (hasAirtableConfig && base) {
    try {
      const records = await base(TABLES.BLOG_POSTS)
        .select({
          filterByFormula: "{IsPublished} = 1",
          sort: [{ field: 'PublishedAt', direction: 'desc' }]
        })
        .all();
      
      return records.map(record => ({
        id: record.id,
        title: record.get('Title') as string,
        slug: record.get('Slug') as string,
        excerpt: record.get('Excerpt') as string,
        content: record.get('Content') as string,
        author: record.get('Author') as string,
        publishedAt: record.get('PublishedAt') as string,
        category: record.get('Category') as string,
        tags: (record.get('Tags') as string)?.split(',').map(t => t.trim()) || [],
        featuredImage: record.get('FeaturedImage') as string,
        isPublished: record.get('IsPublished') as boolean,
        readTime: record.get('ReadTime') as number || 5,
        views: record.get('Views') as number || 0,
      }));
    } catch (error) {
      console.error('Error fetching blog posts from Airtable:', error);
    }
  }
  
  // 如果沒有 Airtable 配置或出錯，使用 CSV 資料
  console.log('Using CSV data for blog posts');
  return await getBlogPostsFromCSV();
}

// 根據 slug 獲取單篇部落格文章
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  // 如果有 Airtable 配置，嘗試從 Airtable 獲取
  if (hasAirtableConfig && base) {
    try {
      const records = await base(TABLES.BLOG_POSTS)
        .select({
          filterByFormula: `AND({Slug} = '${slug}', {IsPublished} = 1)`,
          maxRecords: 1
        })
        .all();
      
      if (records.length === 0) return null;
      
      const record = records[0];
      return {
        id: record.id,
        title: record.get('Title') as string,
        slug: record.get('Slug') as string,
        excerpt: record.get('Excerpt') as string,
        content: record.get('Content') as string,
        author: record.get('Author') as string,
        publishedAt: record.get('PublishedAt') as string,
        category: record.get('Category') as string,
        tags: (record.get('Tags') as string)?.split(',').map(t => t.trim()) || [],
        featuredImage: record.get('FeaturedImage') as string,
        isPublished: record.get('IsPublished') as boolean,
        readTime: record.get('ReadTime') as number || 5,
        views: record.get('Views') as number || 0,
      };
    } catch (error) {
      console.error('Error fetching blog post by slug from Airtable:', error);
    }
  }
  
  // 如果沒有 Airtable 配置或出錯，從 CSV 資料中查找
  const posts = await getBlogPostsFromCSV();
  return posts.find(post => post.slug === slug) || null;
}

// 獲取分類資料
export async function getCategories(): Promise<Category[]> {
  // 如果有 Airtable 配置，嘗試從 Airtable 獲取
  if (hasAirtableConfig && base) {
    try {
      const records = await base(TABLES.CATEGORIES).select().all();
      return records.map(record => ({
        id: record.id,
        name: record.get('Name') as string,
        slug: record.get('Slug') as string,
        description: record.get('Description') as string,
        color: record.get('Color') as string,
      }));
    } catch (error) {
      console.error('Error fetching categories from Airtable:', error);
    }
  }
  
  // 如果沒有 Airtable 配置或出錯，從 CSV 資料生成分類
  const posts = await getBlogPostsFromCSV();
  return generateCategoriesFromCSV(posts);
}

// 根據分類獲取部落格文章
export async function getBlogPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  // 如果有 Airtable 配置，嘗試從 Airtable 獲取
  if (hasAirtableConfig && base) {
    try {
      const records = await base(TABLES.BLOG_POSTS)
        .select({
          filterByFormula: `AND({Category} = '${categorySlug}', {IsPublished} = 1)`,
          sort: [{ field: 'PublishedAt', direction: 'desc' }]
        })
        .all();
      
      return records.map(record => ({
        id: record.id,
        title: record.get('Title') as string,
        slug: record.get('Slug') as string,
        excerpt: record.get('Excerpt') as string,
        content: record.get('Content') as string,
        author: record.get('Author') as string,
        publishedAt: record.get('PublishedAt') as string,
        category: record.get('Category') as string,
        tags: (record.get('Tags') as string)?.split(',').map(t => t.trim()) || [],
        featuredImage: record.get('FeaturedImage') as string,
        isPublished: record.get('IsPublished') as boolean,
        readTime: record.get('ReadTime') as number || 5,
        views: record.get('Views') as number || 0,
      }));
    } catch (error) {
      console.error('Error fetching blog posts by category from Airtable:', error);
    }
  }
  
  // 如果沒有 Airtable 配置或出錯，從 CSV 資料中篩選
  const posts = await getBlogPostsFromCSV();
  const categories = generateCategoriesFromCSV(posts);
  const category = categories.find(cat => cat.slug === categorySlug);
  if (!category) return [];
  
  return posts.filter(post => post.category === category.name);
}

export default airtable; 