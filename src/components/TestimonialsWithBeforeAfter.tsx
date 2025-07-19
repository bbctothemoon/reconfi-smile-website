'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { getCustomerCases } from '@/lib/content';

export default function TestimonialsWithBeforeAfter() {
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});
  
  const customerCases = getCustomerCases();

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            客戶真實體驗
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            聽聽我們的客戶如何評價 ReConfi 的專業服務，了解他們的笑容蛻變故事
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="flex gap-8 pb-4" style={{ minWidth: 'max-content' }}>
            {customerCases.slice(0, 3).map((customerCase) => {
              return (
                <div
                  key={customerCase.id}
                  className="w-96 flex-shrink-0"
                >
                  {/* Customer Photo - 1080x1080 */}
                  <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
                    <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                      {!imageErrors[customerCase.id] ? (
                        <img
                          src={customerCase.image}
                          alt={customerCase.title}
                          className="w-full h-full object-cover"
                          onError={() => setImageErrors(prev => ({...prev, [customerCase.id]: true}))}
                        />
                      ) : (
                        <div className="flex items-center justify-center text-gray-500 text-sm">
                          客戶照片
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {[...Array(customerCase.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    {/* Comment */}
                    <blockquote className="text-base text-gray-700 mb-4 italic">
                      &ldquo;{customerCase.content}&rdquo;
                    </blockquote>

                    {/* Name and Age */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{customerCase.name}</h4>
                        <p className="text-sm text-gray-500">{customerCase.age} 歲</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-blue-600 font-medium">{customerCase.treatment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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