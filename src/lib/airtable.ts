import { getBlogPostsFromCSV, generateCategoriesFromCSV } from './csv-content';

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
  return [];
}

// 獲取見證資料
export async function getTestimonials(): Promise<Testimonial[]> {
  return [];
}

// 獲取治療項目資料
export async function getTreatments(): Promise<Treatment[]> {
  return [];
}

// 獲取團隊成員資料
export async function getTeamMembers(): Promise<TeamMember[]> {
  return [];
}

// 獲取所有部落格文章 - 使用CSV數據
export async function getBlogPosts(): Promise<BlogPost[]> {
  console.log('Using CSV data for blog posts');
  return getBlogPostsFromCSV();
}

// 根據 slug 獲取單篇部落格文章
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPostsFromCSV();
  return posts.find(post => post.slug === slug) || null;
}

// 獲取分類資料
export async function getCategories(): Promise<Category[]> {
  return generateCategoriesFromCSV();
}

// 根據分類獲取部落格文章
export async function getBlogPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  const posts = await getBlogPostsFromCSV();
  const categories = await generateCategoriesFromCSV();
  const category = categories.find((cat: Category) => cat.slug === categorySlug);
  if (!category) return [];
  
  return posts.filter(post => post.category === category.name);
} 