'use client';

import { Check, Star } from 'lucide-react';

const courses = [
  {
    id: 1,
    name: '陶瓷貼片基礎課程',
    description: '學習陶瓷貼片的基本原理和操作技巧',
    price: 'HKD 3,800',
    duration: '2 天',
    features: [
      '理論基礎知識',
      '實操練習',
      '材料選擇指導',
      '案例分享',
      '證書頒發',
      '後續支援'
    ],
    isPopular: true,
    image: '/images/course-1.jpg'
  },
  {
    id: 2,
    name: '笑容設計進階課程',
    description: '深入學習笑容設計的藝術與科學',
    price: 'HKD 4,500',
    duration: '3 天',
    features: [
      '美學原理',
      '數位設計',
      '患者溝通',
      '實戰演練',
      '專家指導',
      '持續進修'
    ],
    isPopular: false,
    image: '/images/course-2.jpg'
  },
  {
    id: 3,
    name: '牙科美容綜合課程',
    description: '全面的牙科美容技術培訓',
    price: 'HKD 6,800',
    duration: '5 天',
    features: [
      '綜合技術',
      '實操訓練',
      '案例分析',
      '設備使用',
      '品質控制',
      '職業發展'
    ],
    isPopular: true,
    image: '/images/course-3.jpg'
  }
];

export default function Courses() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            專業培訓課程
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            我們提供專業的牙科美容培訓課程，幫助您掌握最新的技術和知識
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                course.isPopular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {course.isPopular && (
                <div className="bg-blue-500 text-white text-center py-2 text-sm font-medium">
                  最受歡迎
                </div>
              )}
              
              <div className="h-48 bg-gray-200">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {course.name}
                  </h3>
                  {course.isPopular && (
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-5 h-5 fill-current" />
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-blue-600">
                    {course.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    {course.duration}
                  </span>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    課程特色
                  </h4>
                  <ul className="space-y-1">
                    {course.features.slice(0, 3).map((feature: string, index: number) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {course.features.length > 3 && (
                    <p className="text-sm text-gray-500 mt-2">
                      還有 {course.features.length - 3} 個特色...
                    </p>
                  )}
                </div>
                
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  立即報名
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            需要更多課程資訊？
          </p>
          <button className="bg-gray-800 text-white py-3 px-8 rounded-lg hover:bg-gray-900 transition-colors font-medium">
            聯繫我們
          </button>
        </div>
      </div>
    </section>
  );
} 