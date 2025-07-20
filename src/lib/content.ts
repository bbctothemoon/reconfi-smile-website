// 定義類型
export interface BrandInfo {
  name: string;
  tagline: string;
  description: string;
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
  };
}

export interface PriceItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
}

export interface CustomerCase {
  id: number;
  type: 'testimonial' | 'beforeAfter';
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
  slug?: string;
}

export interface PromoCode {
  id: number;
  code: string;
  type: 'fixed' | 'percentage';
  value: number;
  description: string;
  isActive: boolean;
  usageCount: number;
  maxUsage: number;
  validFrom: string;
  validTo: string;
}

// 直接導入JSON數據
import contentData from '../../data/content.json';

// 品牌信息
export function getBrandInfo(): BrandInfo {
  return contentData.brand || {
    name: "ReConfi",
    tagline: "微笑設計專家",
    description: "自信重新，由微笑開始",
    contact: {
      phone: "+852 6530 6270",
      whatsapp: "+852 6530 6270",
      email: "info@reconfi.com"
    }
  };
}

// 價格方案
export function getPrices(): PriceItem[] {
  return contentData.prices || [];
}

// 客戶案例
export function getCustomerCases(): CustomerCase[] {
  return (contentData.customerCases || []) as CustomerCase[];
}

// 部落格文章
export function getBlogPosts(): BlogPost[] {
  return contentData.blogPosts || [];
}

// 獲取單個部落格文章
export function getBlogPost(slug: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find((post: BlogPost) => post.slug === slug);
}

// 獲取部落格分類
export function getBlogCategories() {
  const posts = getBlogPosts();
  const categories = [...new Set(posts.map((post: BlogPost) => post.category))];
  return categories.map((category: string) => ({
    name: category,
    slug: category.toLowerCase().replace(/\s+/g, '-'),
    count: posts.filter((post: BlogPost) => post.category === category).length
  }));
}

// 根據分類獲取文章
export function getBlogPostsByCategory(category: string): BlogPost[] {
  const posts = getBlogPosts();
  return posts.filter((post: BlogPost) => post.category === category);
}

// 驗證優惠碼
export function validatePromoCode(code: string): PromoCode | null {
  // 這裡可以實現優惠碼驗證邏輯
  // 暫時返回null
  return null;
} 