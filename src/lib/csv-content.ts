import { BlogPost, Category } from './airtable';

// 從 CSV 資料解析部落格文章
export function parseCSVContent(csvData: string): BlogPost[] {
  const posts: BlogPost[] = [];
  
  // 使用更簡單的解析方法，直接按行處理
  const lines = csvData.split('\n');
  let currentPost: any = {};
  let inPostText = false;
  let postText = '';

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // 檢查是否是新的一行（以逗號開頭表示是 Post Text 的延續）
    if (line.startsWith(',')) {
      // 這是 Post Text 的延續
      postText += '\n' + line.substring(1);
      inPostText = true;
    } else if (line.includes(',') && !inPostText) {
      // 這是新的一行資料
      const parts = line.split(',');
      if (parts.length >= 5) {
        const [topic, text, attachment, scheduledDate, status] = parts;
        
        // 如果狀態包含 "posted"，則創建文章
        if (status && status.toLowerCase().includes('posted')) {
          const post: BlogPost = {
            id: `csv-${i}`,
            title: topic || '牙科美容知識分享',
            slug: generateSlug(topic || '牙科美容知識分享'),
            excerpt: extractExcerpt(text || ''),
            content: formatContent(text || ''),
            author: 'ReConfi Smile',
            publishedAt: scheduledDate || new Date().toISOString(),
            category: determineCategory(topic || ''),
            tags: extractTags(text || ''),
            featuredImage: attachment || '',
            isPublished: true,
            readTime: calculateReadTime(text || ''),
            views: Math.floor(Math.random() * 1000) + 100, // 模擬瀏覽量
          };

          posts.push(post);
        }
      }
    } else if (inPostText) {
      // 繼續收集 Post Text
      postText += '\n' + line;
    }
  }

  // 如果沒有找到任何文章，創建一些示例文章
  if (posts.length === 0) {
    posts.push(
      {
        id: 'sample-1',
        title: '陶瓷貼片：完美笑容的秘密武器',
        slug: 'ceramic-veneers-perfect-smile-secret',
        excerpt: '陶瓷貼片是現代牙科美容中最受歡迎的治療方式之一，能夠快速改善牙齒外觀，讓您擁有自信的笑容。',
        content: '<p>陶瓷貼片是一種薄如指甲的陶瓷殼，貼附在牙齒表面，能夠有效改善牙齒的顏色、形狀和排列。</p>',
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
        content: '<p>笑容設計結合了牙科技術和美學原理，為每位患者量身定制最適合的笑容方案。</p>',
        author: 'ReConfi Smile',
        publishedAt: new Date().toISOString(),
        category: '笑容設計',
        tags: ['笑容設計', '牙科美學', '個人化治療'],
        featuredImage: '',
        isPublished: true,
        readTime: 4,
        views: 980,
      }
    );
  }

  return posts;
}

// 解析 CSV 行，處理引號內的逗號
function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  values.push(current.trim());
  return values;
}

// 生成 slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// 提取摘要
function extractExcerpt(text: string): string {
  const cleanText = text.replace(/[#@]\w+/g, '').trim();
  return cleanText.length > 150 ? cleanText.substring(0, 150) + '...' : cleanText;
}

// 格式化內容
function formatContent(text: string): string {
  // 移除 hashtags 和 mentions
  let content = text.replace(/[#@]\w+/g, '').trim();
  
  // 將換行轉換為 HTML
  content = content.replace(/\n/g, '<br>');
  
  // 添加段落標籤
  content = `<p>${content}</p>`;
  
  return content;
}

// 確定分類
function determineCategory(topic: string): string {
  const topicLower = topic.toLowerCase();
  
  if (topicLower.includes('貼片') || topicLower.includes('陶瓷')) {
    return '陶瓷貼片';
  } else if (topicLower.includes('笑容') || topicLower.includes('微笑')) {
    return '笑容設計';
  } else if (topicLower.includes('美白') || topicLower.includes('清潔')) {
    return '牙科美容';
  } else if (topicLower.includes('護理') || topicLower.includes('保養')) {
    return '護理指南';
  } else {
    return '牙科美容';
  }
}

// 提取標籤
function extractTags(text: string): string[] {
  const tags: string[] = [];
  const hashtagRegex = /#(\w+)/g;
  let match;
  
  while ((match = hashtagRegex.exec(text)) !== null) {
    tags.push(match[1]);
  }
  
  // 添加預設標籤
  if (tags.length === 0) {
    tags.push('牙科美容', 'ReConfiHK');
  }
  
  return tags.slice(0, 5); // 最多 5 個標籤
}

// 計算閱讀時間
function calculateReadTime(text: string): number {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200)); // 假設每分鐘 200 字
}

// 從 CSV 檔案獲取部落格文章
export async function getBlogPostsFromCSV(): Promise<BlogPost[]> {
  try {
    // 使用正確的檔案路徑，處理空格和特殊字符
    const fileName = encodeURIComponent('ReConfi Smile-Complete Social Content List.csv');
    const response = await fetch(`/${fileName}`);
    const csvData = await response.text();
    return parseCSVContent(csvData);
  } catch (error) {
    console.error('Error fetching CSV data:', error);
    // 如果無法獲取 CSV 資料，返回示例文章
    return [
      {
        id: 'sample-1',
        title: '陶瓷貼片：完美笑容的秘密武器',
        slug: 'ceramic-veneers-perfect-smile-secret',
        excerpt: '陶瓷貼片是現代牙科美容中最受歡迎的治療方式之一，能夠快速改善牙齒外觀，讓您擁有自信的笑容。',
        content: '<p>陶瓷貼片是一種薄如指甲的陶瓷殼，貼附在牙齒表面，能夠有效改善牙齒的顏色、形狀和排列。</p>',
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
        content: '<p>笑容設計結合了牙科技術和美學原理，為每位患者量身定制最適合的笑容方案。</p>',
        author: 'ReConfi Smile',
        publishedAt: new Date().toISOString(),
        category: '笑容設計',
        tags: ['笑容設計', '牙科美學', '個人化治療'],
        featuredImage: '',
        isPublished: true,
        readTime: 4,
        views: 980,
      }
    ];
  }
}

// 從 CSV 生成分類
export function generateCategoriesFromCSV(posts: BlogPost[]): Category[] {
  const categoryMap = new Map<string, number>();
  
  posts.forEach(post => {
    const count = categoryMap.get(post.category) || 0;
    categoryMap.set(post.category, count + 1);
  });
  
  const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'];
  let colorIndex = 0;
  
  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    id: `category-${name}`,
    name,
    slug: generateSlug(name),
    description: `${name}相關的專業知識和見解`,
    color: colors[colorIndex++ % colors.length],
  }));
} 