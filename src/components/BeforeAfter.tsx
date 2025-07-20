'use client';

import { ArrowRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { getCustomerCases } from '@/lib/content';

export default function BeforeAfter() {
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});
  
  const customerCases = getCustomerCases();

  return (
    <section id="before-after" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            前後對比案例
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            看看我們的專業陶瓷貼片如何改變客戶的笑容，讓他們重拾自信
          </p>
        </div>

        <div className="space-y-16">
          {customerCases.map((customerCase, index) => (
            <div
              key={customerCase.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Image */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="bg-white rounded-2xl shadow-lg p-4">
                  <div className="bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden" style={{ aspectRatio: '3/4' }}>
                    {!imageErrors[customerCase.id] ? (
                      <img
                        src={customerCase.image}
                        alt={customerCase.title}
                        className="w-full h-full object-cover object-center"
                        onError={() => setImageErrors(prev => ({...prev, [customerCase.id]: true}))}
                      />
                    ) : (
                      <div className="flex items-center justify-center text-gray-500 text-sm">
                        前後對比案例圖片
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {customerCase.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {customerCase.description}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">治療項目</h4>
                  <p className="text-blue-600 font-medium">{customerCase.treatment}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">改善效果</h4>
                  <div className="space-y-2">
                    {customerCase.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="https://wa.me/85265306270"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  了解詳情
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              準備好開始您的笑容蛻變之旅了嗎？
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              ReConfi 專業牙醫團隊將為您度身訂造最適合的治療方案，讓您擁有自然、自信的完美笑容
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/85265306270"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                立即預約諮詢
              </a>
              <a
                href="#calculator"
                className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                查看價格方案
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 