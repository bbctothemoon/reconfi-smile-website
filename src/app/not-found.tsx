import Link from 'next/link';
import { Metadata } from 'next';
import { Home, ArrowLeft, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: '頁面未找到 - ReConfi Smile',
  description: '抱歉，您要查找的頁面不存在。請返回首頁或使用導航菜單瀏覽我們的服務。',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
            <Search className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          頁面未找到
        </h2>
        <p className="text-gray-600 mb-8">
          抱歉，您要查找的頁面不存在。可能是網址輸入錯誤或頁面已被移動。
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            返回首頁
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              瀏覽部落格
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              聯絡我們
            </Link>
          </div>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            您可能感興趣的頁面
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <Link
              href="/#calculator"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              價格計算器
            </Link>
            <Link
              href="/#testimonials"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              客戶評價
            </Link>
            <Link
              href="/#team"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              專業團隊
            </Link>
            <Link
              href="/#contact"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              預約諮詢
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 