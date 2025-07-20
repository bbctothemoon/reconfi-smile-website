// Instagram 資料類型
export interface InstagramPost {
  id: string;
  shortcode: string;
  display_url: string;
  thumbnail_url?: string;
  caption?: string;
  likes: number;
  comments: number;
  timestamp: number;
  is_video: boolean;
  video_url?: string;
  owner: {
    username: string;
    full_name: string;
    profile_pic_url: string;
  };
}

export interface InstagramProfile {
  username: string;
  full_name: string;
  profile_pic_url: string;
  followers: number;
  following: number;
  posts: number;
  biography: string;
  external_url?: string;
}

// 模擬 Instagram 資料（因為 Instagram API 需要認證）
export const mockInstagramPosts: InstagramPost[] = [
  {
    id: '1',
    shortcode: 'ABC123',
    display_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=500&fit=crop',
    thumbnail_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop',
    caption: '完美的笑容從專業的牙科美容開始 ✨ #陶瓷貼片 #牙科美容 #ReConfiSmile',
    likes: 128,
    comments: 15,
    timestamp: Date.now() - 86400000, // 1天前
    is_video: false,
    owner: {
      username: 'reconfismile',
      full_name: 'ReConfi Smile',
      profile_pic_url: '/logo-blue.png'
    }
  },
  {
    id: '2',
    shortcode: 'DEF456',
    display_url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&h=500&fit=crop',
    thumbnail_url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=150&h=150&fit=crop',
    caption: '治療前後的驚人變化！客戶非常滿意效果 😊 #前後對比 #牙科美容 #香港牙醫',
    likes: 256,
    comments: 28,
    timestamp: Date.now() - 172800000, // 2天前
    is_video: false,
    owner: {
      username: 'reconfismile',
      full_name: 'ReConfi Smile',
      profile_pic_url: '/logo-blue.png'
    }
  },
  {
    id: '3',
    shortcode: 'GHI789',
    display_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&h=500&fit=crop',
    thumbnail_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=150&h=150&fit=crop',
    caption: '專業的牙科美容團隊，為您提供最優質的服務 👨‍⚕️ #專業團隊 #牙科美容 #ReConfi',
    likes: 89,
    comments: 12,
    timestamp: Date.now() - 259200000, // 3天前
    is_video: false,
    owner: {
      username: 'reconfismile',
      full_name: 'ReConfi Smile',
      profile_pic_url: '/logo-blue.png'
    }
  },
  {
    id: '4',
    shortcode: 'JKL012',
    display_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=500&fit=crop',
    thumbnail_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop',
    caption: '無痛治療，自然美觀的陶瓷貼片 💎 #無痛治療 #陶瓷貼片 #笑容設計',
    likes: 167,
    comments: 19,
    timestamp: Date.now() - 345600000, // 4天前
    is_video: false,
    owner: {
      username: 'reconfismile',
      full_name: 'ReConfi Smile',
      profile_pic_url: '/logo-blue.png'
    }
  },
  {
    id: '5',
    shortcode: 'MNO345',
    display_url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&h=500&fit=crop',
    thumbnail_url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=150&h=150&fit=crop',
    caption: '每個笑容都是獨一無二的藝術品 🎨 #笑容設計 #牙科美容 #香港',
    likes: 203,
    comments: 24,
    timestamp: Date.now() - 432000000, // 5天前
    is_video: false,
    owner: {
      username: 'reconfismile',
      full_name: 'ReConfi Smile',
      profile_pic_url: '/logo-blue.png'
    }
  },
  {
    id: '6',
    shortcode: 'PQR678',
    display_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&h=500&fit=crop',
    thumbnail_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=150&h=150&fit=crop',
    caption: '預約諮詢，開始您的笑容蛻變之旅 📞 #預約諮詢 #牙科美容 #ReConfiSmile',
    likes: 145,
    comments: 16,
    timestamp: Date.now() - 518400000, // 6天前
    is_video: false,
    owner: {
      username: 'reconfismile',
      full_name: 'ReConfi Smile',
      profile_pic_url: '/logo-blue.png'
    }
  }
];

export const mockInstagramProfile: InstagramProfile = {
  username: 'reconfismile',
  full_name: 'ReConfi Smile',
  profile_pic_url: '/logo-blue.png',
  followers: 2847,
  following: 156,
  posts: 89,
  biography: '專業牙科美容服務 | 陶瓷貼片專家 | 香港 | 預約諮詢：+852 6530 6270',
  external_url: 'https://www.reconfihk.com'
};

// 獲取 Instagram 貼文
export async function getInstagramPosts(limit: number = 6): Promise<InstagramPost[]> {
  try {
    // 這裡可以整合真實的 Instagram API
    // 目前使用模擬資料
    return mockInstagramPosts.slice(0, limit);
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return [];
  }
}

// 獲取 Instagram 個人資料
export async function getInstagramProfile(): Promise<InstagramProfile | null> {
  try {
    // 這裡可以整合真實的 Instagram API
    // 目前使用模擬資料
    return mockInstagramProfile;
  } catch (error) {
    console.error('Error fetching Instagram profile:', error);
    return null;
  }
}

// 格式化時間
export function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 60) {
    return `${minutes}分鐘前`;
  } else if (hours < 24) {
    return `${hours}小時前`;
  } else {
    return `${days}天前`;
  }
}

// 格式化數字
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
} 