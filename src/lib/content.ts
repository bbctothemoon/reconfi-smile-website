import contentData from '../../data/content.json';
import promoData from '../../data/promo-codes.json';

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
}

export function getBrandInfo(): BrandInfo {
  return contentData.brand;
}

export function getPrices(): PriceItem[] {
  return contentData.prices;
}

export function getCustomerCases(): CustomerCase[] {
  return contentData.customerCases as CustomerCase[];
}

export function getTestimonials(): CustomerCase[] {
  return contentData.customerCases.filter(case_ => case_.type === 'testimonial') as CustomerCase[];
}

export function getBeforeAfterCases(): CustomerCase[] {
  return contentData.customerCases.filter(case_ => case_.type === 'beforeAfter') as CustomerCase[];
}

export function getBlogPosts(): BlogPost[] {
  return contentData.blogPosts.filter(post => post.isPublished) as BlogPost[];
}

export function getPromoCodes(): PromoCode[] {
  return promoData.promoCodes as PromoCode[];
}

export function validatePromoCode(code: string): PromoCode | null {
  const promoCode = promoData.promoCodes.find(
    promo => promo.code.toLowerCase() === code.toLowerCase() && promo.isActive
  ) as PromoCode | undefined;
  
  if (!promoCode) return null;
  
  // 檢查使用次數
  if (promoCode.usageCount >= promoCode.maxUsage) return null;
  
  // 檢查有效期
  const now = new Date();
  const validFrom = new Date(promoCode.validFrom);
  const validTo = new Date(promoCode.validTo);
  
  if (now < validFrom || now > validTo) return null;
  
  return promoCode;
}

// 更新內容的函數（需要實現文件寫入）
export async function updateContent(newContent: unknown) {
  // 這裡可以實現保存到文件的邏輯
  console.log('更新內容:', newContent);
  return true;
} 