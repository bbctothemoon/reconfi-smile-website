'use client';

import { useState, useEffect } from 'react';
import { Phone, MessageCircle, X, ChevronUp } from 'lucide-react';

export default function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // 當滾動到頁面 20% 時顯示 CTA
      if (scrollY > windowHeight * 0.2) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      {isExpanded ? (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">立即預約諮詢</h3>
                <p className="text-blue-100 text-sm">專業牙科美容服務</p>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-white hover:text-blue-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <a
              href="https://wa.me/85265306270"
              className="flex items-center justify-center w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp 預約
            </a>
            
            <a
              href="tel:+85265306270"
              className="flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              致電預約
            </a>

            <div className="text-center text-sm text-gray-600">
              <p>營業時間：週一至週六</p>
              <p>上午 9:00 - 下午 6:00</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <button
            onClick={() => setIsExpanded(true)}
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
} 