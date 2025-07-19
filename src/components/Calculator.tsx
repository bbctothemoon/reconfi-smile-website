'use client';

import { useState } from 'react';
import { MessageCircle, Calculator as CalcIcon } from 'lucide-react';
import { validatePromoCode } from '@/lib/content';

export default function Calculator() {
  const [selectedType, setSelectedType] = useState('emax-cad');
  const [quantity, setQuantity] = useState(16);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [discountCodeApplied, setDiscountCodeApplied] = useState(false);
  const [discountCodeError, setDiscountCodeError] = useState('');

  const veneerTypes = [
    {
      id: 'emax-press',
      name: 'IPS e.max Press 壓鑄陶瓷',
      brand: 'ivoclar',
      price: 3380,
      description: '高品質壓鑄陶瓷，自然美觀效果，適合一般美觀需求'
    },
    {
      id: 'empress-cad',
      name: 'IPS Empress CAD 玻璃切割瓷',
      brand: 'ivoclar',
      price: 4080,
      description: '精密玻璃切割技術，自然透光效果，美觀度極佳'
    },
    {
      id: 'emax-cad',
      name: 'IPS e.max CAD 藍瓷',
      brand: 'ivoclar',
      price: 5080,
      description: '高品質藍瓷材料，自然美觀效果，耐用性強'
    },
    {
      id: 'suprinity',
      name: 'SUPRINITY 琥珀瓷',
      brand: 'VITA',
      price: 5380,
      description: '頂級琥珀瓷材料，自然透光效果，最高品質'
    },
    {
      id: 'celtra-duo',
      name: 'Celtra Duo 靈犀瓷',
      brand: 'Dentsply Sirona',
      price: 7480,
      description: '專業靈犀瓷技術，自然美觀效果，專業級品質'
    },
    {
      id: 'emax-press-ceram',
      name: 'IPS e.max Press + Ceram 半手工瓷',
      brand: 'ivoclar',
      price: 9380,
      description: '壓鑄陶瓷配合手工烤瓷，完美結合技術與藝術'
    },
    {
      id: 'emax-ceram',
      name: 'IPS e.max Ceram 全手工烤瓷',
      brand: 'ivoclar',
      price: 15680,
      description: '全手工烤瓷技術，最高品質，完美笑容設計'
    }
  ];

  const selectedVeneer = veneerTypes.find(type => type.id === selectedType);
  
  // 套裝折扣邏輯
  let basePrice = 0;
  let packagePrice = 0;
  let showPackageDiscount = false;
  let originalPrice = 0;
  
  if (selectedVeneer) {
    originalPrice = selectedVeneer.price * quantity;
    
    if (quantity >= 16) {
      // 16顆以上適用套裝價格
      showPackageDiscount = true;
      
      // 根據產品類型設定套裝價格
      const packagePrices: { [key: string]: number } = {
        'emax-press': 38000,
        'empress-cad': 52000,
        'emax-cad': 65000,
        'suprinity': 68000,
        'celtra-duo': 88000,
        'emax-press-ceram': 120000,
        'emax-ceram': 220000
      };
      
      packagePrice = packagePrices[selectedVeneer.id] || selectedVeneer.price * 16;
      basePrice = (packagePrice / 16) * quantity;
    } else {
      // 16顆以下正常價格
      basePrice = originalPrice;
    }
  }
  
  // 計算最終價格
  let finalPrice = basePrice;
  
  if (discount > 0) {
    if (discountCodeApplied) {
      // 固定金額折扣
      finalPrice = Math.max(0, basePrice - discount);
    } else {
      // 百分比折扣
      finalPrice = basePrice * (1 - discount / 100);
    }
  }

  const handlePromoCode = () => {
    const validPromo = validatePromoCode(promoCode);
    
    if (validPromo) {
      setDiscount(validPromo.value);
      setDiscountCodeApplied(validPromo.type === 'fixed');
      setDiscountCodeError('');
    } else {
      setDiscount(0);
      setDiscountCodeApplied(false);
      setDiscountCodeError('無效的優惠代碼');
    }
  };

  return (
    <section id="calculator" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <CalcIcon className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            價格計算器
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            選擇適合您的陶瓷貼片方案，立即計算價格。ReConfi 提供多種高品質陶瓷材料，為您度身訂造最適合的治療方案。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">選擇您的方案</h3>

            {/* Veneer Type Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                陶瓷貼片類型
              </label>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {veneerTypes.map((type) => (
                  <label
                    key={type.id}
                    className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedType === type.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="veneerType"
                      value={type.id}
                      checked={selectedType === type.id}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="mt-1 mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{type.name}</h4>
                          <p className="text-xs text-gray-500">{type.brand}</p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">
                          HK$ {type.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Quantity Slider */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                貼片數量: {quantity} 顆
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>1 顆</span>
                <span>20 顆</span>
              </div>
            </div>
          </div>

          {/* Price Display */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">價格明細</h3>
            
            {/* Promo Code */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-blue-100 mb-2">
                優惠代碼
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="輸入優惠代碼"
                  className="flex-1 px-4 py-2 border border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-blue-500 text-white placeholder-blue-200"
                />
                <button
                  onClick={handlePromoCode}
                  className="px-6 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
                >
                  應用
                </button>
              </div>
              {discount > 0 && (
                <p className="text-green-300 text-sm mt-2">
                  ✓ 已應用 {discountCodeApplied ? `HK$ ${discount}` : `${discount}%`} 折扣
                </p>
              )}
              {discountCodeError && (
                <p className="text-red-300 text-sm mt-2">
                  {discountCodeError}
                </p>
              )}
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span>單價</span>
                <span>HK$ {selectedVeneer?.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>數量</span>
                <span>{quantity} 顆</span>
              </div>
              <div className="flex justify-between items-center">
                <span>原價</span>
                <span>HK$ {originalPrice.toLocaleString()}</span>
              </div>
              {showPackageDiscount && (
                <div className="flex justify-between items-center text-yellow-300">
                  <span>全口優惠</span>
                  <span>-HK$ {(originalPrice - basePrice).toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span>優惠後價格</span>
                <span>HK$ {basePrice.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between items-center text-green-300">
                  <span>折扣 {discountCodeApplied ? `(HK$ ${discount})` : `(${discount}%)`}</span>
                  <span>-HK$ {discountCodeApplied ? discount.toLocaleString() : (basePrice * discount / 100).toLocaleString()}</span>
                </div>
              )}
              <div className="border-t border-blue-500 pt-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>總價</span>
                  <span>HK$ {finalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Package Discount Info */}
            {showPackageDiscount && (
              <div className="mt-6 p-4 bg-yellow-500 bg-opacity-20 rounded-lg border border-yellow-400">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  <span className="text-yellow-200 font-semibold">💎 全口優惠</span>
                </div>
                <p className="text-yellow-100 text-sm mb-2">
                  {selectedVeneer?.name} - HKD {packagePrice.toLocaleString()}/16顆
                </p>
                <p className="text-yellow-100 text-sm">
                  16顆以上適用套裝價格，每顆單價更優惠！
                </p>
              </div>
            )}
            
            {/* CTA Button */}
            <a
              href={`https://wa.me/85265306270?text=您好！我想了解 ${selectedVeneer?.name} ${quantity}顆，價格約 HK$ ${finalPrice.toLocaleString()} 的詳細資訊。`}
              className="w-full inline-flex items-center justify-center px-6 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              立即確認方案
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 