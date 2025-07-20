import { ArrowRight, Star, Shield, Clock, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <div className="flex items-center text-yellow-400 mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                ))}
              </div>
              <span className="text-gray-600 text-sm md:text-base">為10000+個案例設計獨一無二的笑容</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              微笑設計專家
              <span className="text-blue-600 block">ReConfi</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
              自信重新，由微笑開始
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
              <a
                href="https://wa.me/85265306270"
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
              >
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                立即預約諮詢
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </a>
              <a
                href="#calculator"
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-sm md:text-base"
              >
                查看價格方案
              </a>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              <div className="flex items-center justify-center lg:justify-start">
                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base">專業品質</h3>
                  <p className="text-xs md:text-sm text-gray-600">國際品牌材料</p>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-start">
                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base">快速完成</h3>
                  <p className="text-xs md:text-sm text-gray-600">2-3次診療完成</p>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-start">
                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Star className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base">經驗豐富</h3>
                  <p className="text-xs md:text-sm text-gray-600">10000+ 成功案例</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-128">
              <Image
                src="/ori.png"
                alt="ReConfi 代言人 - 自信笑容"
                fill
                className="object-contain rounded-2xl mix-blend-multiply"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 