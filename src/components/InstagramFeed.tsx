'use client';

import { Instagram, ExternalLink } from 'lucide-react';

export default function InstagramFeed() {
  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Instagram className="w-8 h-8 text-pink-500 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">關注我們的 Instagram</h2>
          </div>
          
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            追蹤我們的最新動態，查看真實的治療案例和客戶見證
          </p>
          
          {/* Instagram 按鈕 */}
          <a
            href="https://instagram.com/reconfihk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg mb-12"
          >
            <Instagram className="w-6 h-6 mr-3" />
            追蹤 @reconfihk
          </a>
        </div>

        {/* Instagram Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Instagram 貼文 1 - 最多觀看次數 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <iframe
              src="https://www.instagram.com/p/DLpFl0cytpU/embed"
              className="w-full aspect-square"
              frameBorder="0"
              scrolling="no"
              allowTransparency={true}
              title="Instagram Post 1 - Most Viewed"
            />
          </div>

          {/* Instagram 貼文 2 - 第二受歡迎 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <iframe
              src="https://www.instagram.com/p/DLW1LZnSZ08/embed"
              className="w-full aspect-square"
              frameBorder="0"
              scrolling="no"
              allowTransparency={true}
              title="Instagram Post 2 - Second Most Popular"
            />
          </div>

          {/* Instagram 貼文 3 - 第三受歡迎 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <iframe
              src="https://www.instagram.com/p/DLHHBOHyGuu/embed"
              className="w-full aspect-square"
              frameBorder="0"
              scrolling="no"
              allowTransparency={true}
              title="Instagram Post 3 - Third Most Popular"
            />
          </div>
        </div>

        {/* 更多貼文提示 */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">想看更多真實案例和客戶見證？</p>
          <a
            href="https://instagram.com/reconfihk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border-2 border-pink-500 text-pink-500 rounded-lg hover:bg-pink-500 hover:text-white transition-colors"
          >
            <Instagram className="w-5 h-5 mr-2" />
            查看更多貼文
          </a>
        </div>
      </div>
    </section>
  );
} 