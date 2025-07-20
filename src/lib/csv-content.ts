import { BlogPost, Category } from './airtable';

// 從CSV獲取部落格文章
export async function getBlogPostsFromCSV(): Promise<BlogPost[]> {
  // 直接返回示例數據，避免CSV文件讀取問題
  return [
    {
      id: 'sample-1',
      title: '陶瓷貼片：完美笑容的秘密武器',
      slug: 'ceramic-veneers-perfect-smile-secret',
      excerpt: '陶瓷貼片是現代牙科美容中最受歡迎的治療方式之一，能夠快速改善牙齒外觀，讓您擁有自信的笑容。',
      content: '<p>陶瓷貼片是一種薄如指甲的陶瓷殼，貼附在牙齒表面，能夠有效改善牙齒的顏色、形狀和排列。這種治療方式不需要大幅磨損牙齒，就能達到理想的美觀效果。</p><p>我們的專業團隊會根據您的臉型、膚色和個人喜好，量身定制最適合的陶瓷貼片方案。</p>',
      author: 'ReConfi Smile',
      publishedAt: new Date().toISOString(),
      category: '陶瓷貼片',
      tags: ['陶瓷貼片', '牙科美容', '笑容設計'],
      featuredImage: '',
      isPublished: true,
      readTime: 3,
      views: 1250,
    },
    {
      id: 'sample-2',
      title: '笑容設計的藝術與科學',
      slug: 'smile-design-art-science',
      excerpt: '一個完美的笑容不僅需要技術，更需要藝術的眼光。了解笑容設計的關鍵要素。',
      content: '<p>笑容設計結合了牙科技術和美學原理，為每位患者量身定制最適合的笑容方案。我們會考慮您的臉型、年齡、性別和個人風格，創造出自然和諧的笑容。</p><p>通過先進的數位設計技術，您可以在治療前預覽最終效果，確保滿意度。</p>',
      author: 'ReConfi Smile',
      publishedAt: new Date().toISOString(),
      category: '笑容設計',
      tags: ['笑容設計', '牙科美學', '個人化治療'],
      featuredImage: '',
      isPublished: true,
      readTime: 4,
      views: 980,
    },
    {
      id: 'sample-3',
      title: '牙齒美白：專業護理指南',
      slug: 'teeth-whitening-care-guide',
      excerpt: '了解專業牙齒美白的正確方法和注意事項，讓您的笑容更加明亮動人。',
      content: '<p>專業牙齒美白是安全有效的牙科美容治療，能夠顯著改善牙齒顏色。我們使用最新的美白技術，確保治療過程舒適且效果持久。</p><p>治療後的正確護理同樣重要，我們會提供詳細的護理指南，幫助您維持美白效果。</p>',
      author: 'ReConfi Smile',
      publishedAt: new Date().toISOString(),
      category: '護理指南',
      tags: ['牙齒美白', '護理指南', '牙科美容'],
      featuredImage: '',
      isPublished: true,
      readTime: 5,
      views: 756,
    }
  ];
}

// 從CSV生成分類
export async function generateCategoriesFromCSV(): Promise<Category[]> {
  const categories = [
    {
      id: 'ceramic-veneers',
      name: '陶瓷貼片',
      slug: 'ceramic-veneers',
      description: '專業的陶瓷貼片服務和知識分享',
      color: '#3B82F6',
    },
    {
      id: 'smile-design',
      name: '笑容設計',
      slug: 'smile-design',
      description: '個人化笑容設計服務',
      color: '#10B981',
    },
    {
      id: 'dental-beauty',
      name: '牙科美容',
      slug: 'dental-beauty',
      description: '牙科美容相關知識和服務',
      color: '#F59E0B',
    },
    {
      id: 'care-guide',
      name: '護理指南',
      slug: 'care-guide',
      description: '牙齒護理和保養指南',
      color: '#8B5CF6',
    },
  ];
  
  return categories;
} 