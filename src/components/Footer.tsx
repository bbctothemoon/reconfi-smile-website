import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">ReConfi</h3>
            <p className="text-gray-300 mb-4">
              專業的陶瓷貼片服務，讓您擁有完美的笑容。我們致力於提供最優質的牙科美容服務，使用國際品牌材料，為您度身訂造自然、自信的完美笑容。
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/85265306270" className="text-blue-400 hover:text-blue-300">
                WhatsApp
              </a>
              <a href="tel:+85265306270" className="text-blue-400 hover:text-blue-300">
                電話
              </a>
              <a href="mailto:info@reconfihk.com" className="text-blue-400 hover:text-blue-300">
                電郵
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">服務項目</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="#calculator" className="hover:text-blue-400 transition-colors">
                  陶瓷貼片
                </Link>
              </li>
              <li>
                <Link href="#before-after" className="hover:text-blue-400 transition-colors">
                  前後對比
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="hover:text-blue-400 transition-colors">
                  客戶評價
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-blue-400 transition-colors">
                  預約諮詢
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">聯絡資訊</h4>
            <div className="space-y-2 text-gray-300">
              <p>電話：+852 6530 6270</p>
              <p>WhatsApp：+852 6530 6270</p>
              <p>電郵：info@reconfihk.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2025 ReConfi. 保留所有權利。
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm">
                私隱政策
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm">
                服務條款
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm">
                免責聲明
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 