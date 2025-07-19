import contentData from '../data/content.json';

export interface CustomerCase {
  id: number;
  type: string;
  name: string;
  age: number;
  rating: number;
  content: string;
  treatment: string;
  image: string;
  title: string;
  description: string;
  results: string[];
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  isPublished: boolean;
}

export interface ContentData {
  brand: {
    name: string;
    tagline: string;
    description: string;
    contact: {
      phone: string;
      whatsapp: string;
      email: string;
    };
  };
  prices: Array<{
    id: string;
    name: string;
    brand: string;
    price: number;
    description: string;
  }>;
  customerCases: CustomerCase[];
  blogPosts: BlogPost[];
}

export function getCustomerCases(): CustomerCase[] {
  return (contentData as ContentData).customerCases || [];
}

export function getBlogPosts(): BlogPost[] {
  return (contentData as ContentData).blogPosts || [];
}

export function getPublishedBlogPosts(): BlogPost[] {
  return getBlogPosts().filter(post => post.isPublished);
}

export function getBlogPostById(id: number): BlogPost | undefined {
  return getBlogPosts().find(post => post.id === id);
}

export function getBrandInfo() {
  return (contentData as ContentData).brand;
}

export function getPrices() {
  return (contentData as ContentData).prices;
}

export function saveContent(data: ContentData): void {
  // 在實際應用中，這裡會寫入檔案
  // 目前只是更新記憶體中的資料
  Object.assign(contentData, data);
} 