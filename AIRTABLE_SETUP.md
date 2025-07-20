# Airtable CMS 設定指南

## 1. 建立 Airtable 帳戶和資料庫

1. 前往 [Airtable.com](https://airtable.com) 註冊帳戶
2. 建立新的 Workspace
3. 建立新的 Base（資料庫）

## 2. 建立資料表結構

### Courses 表（課程）
| 欄位名稱 | 類型 | 說明 |
|---------|------|------|
| Name | Single line text | 課程名稱 |
| Description | Long text | 課程描述 |
| Duration | Single line text | 課程時長（如：2小時） |
| Price | Single line text | 課程價格（如：$1,200） |
| Features | Long text | 課程特色（用逗號分隔） |
| Image | URL | 課程圖片連結 |
| IsPopular | Checkbox | 是否為熱門課程 |

### Testimonials 表（見證）
| 欄位名稱 | 類型 | 說明 |
|---------|------|------|
| Name | Single line text | 客戶姓名 |
| Content | Long text | 見證內容 |
| Rating | Number | 評分（1-5） |
| Treatment | Single line text | 治療項目 |
| BeforeImage | URL | 治療前圖片 |
| AfterImage | URL | 治療後圖片 |
| Date | Date | 見證日期 |

### Treatments 表（治療項目）
| 欄位名稱 | 類型 | 說明 |
|---------|------|------|
| Name | Single line text | 治療項目名稱 |
| Description | Long text | 治療描述 |
| Price | Single line text | 價格 |
| Duration | Single line text | 治療時長 |
| Features | Long text | 特色（用逗號分隔） |
| Image | URL | 圖片連結 |

### Team 表（團隊成員）
| 欄位名稱 | 類型 | 說明 |
|---------|------|------|
| Name | Single line text | 成員姓名 |
| Title | Single line text | 職稱 |
| Bio | Long text | 個人簡介 |
| Image | URL | 個人照片 |
| Specialties | Long text | 專長（用逗號分隔） |

### BlogPosts 表（部落格文章）
| 欄位名稱 | 類型 | 說明 |
|---------|------|------|
| Title | Single line text | 文章標題 |
| Slug | Single line text | URL 路徑（如：ceramic-veneers-guide） |
| Excerpt | Long text | 文章摘要 |
| Content | Long text | 文章內容（支援 HTML） |
| Author | Single line text | 作者姓名 |
| PublishedAt | Date | 發布日期 |
| Category | Single select | 分類（關聯到 Categories 表） |
| Tags | Long text | 標籤（用逗號分隔） |
| FeaturedImage | URL | 特色圖片 |
| IsPublished | Checkbox | 是否發布 |
| ReadTime | Number | 閱讀時間（分鐘） |
| Views | Number | 瀏覽次數 |

### Categories 表（分類）
| 欄位名稱 | 類型 | 說明 |
|---------|------|------|
| Name | Single line text | 分類名稱 |
| Slug | Single line text | URL 路徑（如：ceramic-veneers） |
| Description | Long text | 分類描述 |
| Color | Single line text | 顏色代碼（如：#3B82F6） |

## 3. 獲取 API 金鑰

1. 前往 [Airtable API 頁面](https://airtable.com/api)
2. 選擇您的 Base
3. 複製 Base ID（在 URL 中）
4. 前往 [Account API 頁面](https://airtable.com/account) 生成 API 金鑰

## 4. 設定環境變數

在專案根目錄建立 `.env.local` 檔案：

```env
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_BASE_ID=your_airtable_base_id_here
```

## 5. 在 Vercel 中設定環境變數

1. 前往 Vercel 專案設定
2. 在 Environment Variables 部分添加：
   - `AIRTABLE_API_KEY`
   - `AIRTABLE_BASE_ID`

## 6. 測試 API

部署後，您可以測試以下 API 端點：
- `/api/airtable/courses` - 獲取課程資料
- `/api/airtable/testimonials` - 獲取見證資料
- `/api/airtable/treatments` - 獲取治療項目資料
- `/api/airtable/team` - 獲取團隊成員資料
- `/api/airtable/blog` - 獲取部落格文章
- `/api/airtable/categories` - 獲取分類資料

## 7. 使用方式

在 React 組件中使用：

```tsx
import { useCourses, useTestimonials, useBlogPosts } from '@/lib/hooks/useAirtable';

function MyComponent() {
  const { courses, loading, error } = useCourses();
  const { testimonials } = useTestimonials();
  const { posts } = useBlogPosts();
  
  // 使用資料...
}
```

## 8. 部落格功能

### 部落格頁面
- `/blog` - 部落格列表頁面
- `/blog/[slug]` - 單篇文章頁面
- `/blog/category/[slug]` - 分類頁面

### 功能特色
- 響應式設計
- SEO 優化
- 分類和標籤系統
- 閱讀時間和瀏覽次數
- 相關文章推薦
- 社交分享功能

## 注意事項

- 確保 Airtable API 金鑰的安全性
- 定期備份 Airtable 資料
- 考慮設定 API 請求限制
- 在生產環境中使用適當的錯誤處理
- 部落格內容支援 HTML 格式
- 建議使用 CDN 來優化圖片載入速度 