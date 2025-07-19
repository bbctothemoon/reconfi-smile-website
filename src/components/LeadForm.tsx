'use client';

import { useState } from 'react';
import { User, Phone, Mail, Calendar, MessageCircle } from 'lucide-react';

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredDate: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 構建 WhatsApp 消息
    const message = `您好！我是 ${formData.name}，想預約諮詢陶瓷貼片服務。

聯絡電話：${formData.phone}
電子郵件：${formData.email}
偏好日期：${formData.preferredDate}
留言：${formData.message}

請安排時間為我提供專業諮詢，謝謝！`;

    // 編碼消息
    const encodedMessage = encodeURIComponent(message);
    
    // 跳轉到 WhatsApp
    window.open(`https://wa.me/85265306270?text=${encodedMessage}`, '_blank');
    
    // 清空表單
    setFormData({
      name: '',
      phone: '',
      email: '',
      preferredDate: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-16 bg-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            立即預約諮詢
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            填寫以下資料，我們的專業團隊將盡快與您聯繫，為您安排最適合的諮詢時間
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 姓名 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  姓名 *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="請輸入您的姓名"
                />
              </div>

              {/* 電話 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  聯絡電話 *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="請輸入您的電話號碼"
                />
              </div>

              {/* 電子郵件 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  電子郵件
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="請輸入您的電子郵件"
                />
              </div>

              {/* 偏好日期 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  偏好諮詢日期
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* 留言 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MessageCircle className="w-4 h-4 inline mr-2" />
                留言
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="請描述您的需求或任何問題..."
              />
            </div>

            {/* 提交按鈕 */}
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                立即發送諮詢
              </button>
            </div>

            <p className="text-sm text-gray-500 text-center">
              點擊提交後，將自動跳轉到 WhatsApp 與我們的專業團隊聯繫
            </p>
          </form>
        </div>
      </div>
    </section>
  );
} 