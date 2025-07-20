// 此文件已棄用，所有數據現在通過CMS管理
// 請使用 src/lib/content.ts 來獲取數據

import { BlogPost } from './content';

// 本地類型定義
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

// 從CMS獲取部落格文章
export async function getBlogPosts(): Promise<BlogPost[]> {
  console.log('使用CMS數據獲取部落格文章');
  return [];
}

// 從CMS獲取分類
export async function getCategories(): Promise<Category[]> {
  console.log('使用CMS數據獲取分類');
  return [];
}

// 其他函數保持兼容性
export async function getCourses() {
  return [];
}

export async function getTestimonials() {
  return [];
}

export async function getTreatments() {
  return [];
}

export async function getTeamMembers() {
  return [];
}

export async function getBlogPost(slug: string) {
  return null;
}

export async function getPostsByCategory(category: string) {
  return [];
} 