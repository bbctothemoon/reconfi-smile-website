'use client';

import { Star } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    title: '首席牙科美容專家',
    description: '擁有15年牙科美容經驗，專精於陶瓷貼片和笑容設計',
    image: '/images/team-1.jpg',
    specialties: ['陶瓷貼片', '笑容設計', '牙科美容'],
    experience: '15年',
    rating: 4.9,
    patients: 2000
  },
  {
    id: 2,
    name: 'Dr. Michael Wong',
    title: '資深牙科醫師',
    description: '專注於前牙美觀修復，擅長微創牙科技術',
    image: '/images/team-2.jpg',
    specialties: ['前牙修復', '微創技術', '牙科治療'],
    experience: '12年',
    rating: 4.8,
    patients: 1800
  },
  {
    id: 3,
    name: 'Dr. Emily Liu',
    title: '牙科美容顧問',
    description: '結合美學與醫學，為患者打造完美笑容',
    image: '/images/team-3.jpg',
    specialties: ['美學設計', '患者諮詢', '治療規劃'],
    experience: '10年',
    rating: 4.9,
    patients: 1500
  }
];

export default function Team() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            專業團隊
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            我們的專業團隊擁有豐富的牙科美容經驗，致力於為每位患者提供最優質的服務
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-64 bg-gray-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {member.name}
                  </h3>
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-600">
                      {member.rating}
                    </span>
                  </div>
                </div>
                
                <p className="text-blue-600 font-medium mb-2">
                  {member.title}
                </p>
                
                <p className="text-gray-600 mb-4">
                  {member.description}
                </p>
                
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <span>經驗：{member.experience}</span>
                  <span>患者：{member.patients}+</span>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    專長領域
                  </h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.specialties.map((specialty: string, index: number) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            想要了解更多關於我們的團隊？
          </p>
          <button className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            預約諮詢
          </button>
        </div>
      </div>
    </section>
  );
} 