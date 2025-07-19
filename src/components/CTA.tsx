import { Phone, Mail, MessageCircle } from 'lucide-react';

export default function CTA() {
  return (
    <section id="contact" className="py-16 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            準備好擁有完美笑容了嗎？
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            立即預約諮詢，ReConfi 專業團隊將為您提供最適合的治療方案，讓您擁有自然、自信的完美笑容
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">電話諮詢</h3>
            <p className="text-blue-100 mb-4">直接致電我們的專業團隊</p>
            <a
              href="tel:+85265306270"
              className="inline-flex items-center text-white hover:text-blue-200 transition-colors"
            >
              +852 6530 6270
            </a>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">WhatsApp 諮詢</h3>
            <p className="text-blue-100 mb-4">即時訊息，快速回應您的問題</p>
            <a
              href="https://wa.me/85265306270"
              className="inline-flex items-center text-white hover:text-blue-200 transition-colors"
            >
              立即開始對話
            </a>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">電郵諮詢</h3>
            <p className="text-blue-100 mb-4">詳細諮詢，獲得完整資訊</p>
            <a
              href="mailto:info@reconfihk.com"
              className="inline-flex items-center text-white hover:text-blue-200 transition-colors"
            >
              info@reconfihk.com
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            預約諮詢表單
          </h3>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  姓名 *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="請輸入您的姓名"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  電話 *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="請輸入您的電話號碼"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                電郵
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="請輸入您的電郵地址"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                諮詢內容
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="請描述您的需求或問題..."
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                提交諮詢
              </button>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-blue-100 mb-4">
            我們會在 24 小時內回覆您的諮詢
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-200">
            <span>• 免費諮詢服務</span>
            <span>• 專業牙醫團隊</span>
            <span>• 國際品牌材料</span>
          </div>
        </div>
      </div>
    </section>
  );
} 