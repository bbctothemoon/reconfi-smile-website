import { Shield, Clock, Star, Users } from 'lucide-react';

export default function USP() {
  const features = [
    {
      icon: Shield,
      title: "國際品牌材料",
      description: "使用 IPS e.max、VITA SUPRINITY 等頂級陶瓷材料"
    },
    {
      icon: Clock,
      title: "快速治療",
      description: "僅需2-3次診療即可完成"
    },
    {
      icon: Users,
      title: "度身訂造",
      description: "根據每位客戶需求，設計專屬笑容方案"
    }
  ];

  const stats = [
    { number: "10000+", label: "成功案例" },
    { number: "98%", label: "客戶滿意度" },
    { number: "24/7", label: "客戶支援" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            為什麼選擇 ReConfi？
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            我們提供最專業的陶瓷貼片服務，讓您擁有完美的笑容
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 