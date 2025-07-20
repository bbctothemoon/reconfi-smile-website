'use client';

import { useState, useEffect } from 'react';
import { getBrandInfo, getPrices, getCustomerCases, getBlogPosts, BrandInfo, PriceItem, CustomerCase, BlogPost } from '@/lib/content';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('brand');
  const [brandInfo, setBrandInfo] = useState<BrandInfo | null>(null);
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [customerCases, setCustomerCases] = useState<CustomerCase[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setBrandInfo(getBrandInfo());
      setPrices(getPrices());
      setCustomerCases(getCustomerCases());
      setBlogPosts(getBlogPosts());
      setLoading(false);
    } catch (err) {
      setError('載入數據時發生錯誤');
      setLoading(false);
    }
  }, []);

  const handleSave = async (type: string, data: unknown) => {
    try {
      const response = await fetch('/api/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [type]: data }),
      });
      
      if (response.ok) {
        alert('內容已成功保存！網站將在幾秒內更新。');
        // 重新載入數據
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert('保存失敗：' + (errorData.message || '請重試'));
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('保存時發生錯誤，請檢查網絡連接');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            重新載入
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ReConfi CMS 管理系統</h1>
              <p className="text-sm text-gray-500 mt-1">版本 v1.2.0</p>
            </div>
            <div className="text-sm text-gray-500">
              最後更新：{new Date().toLocaleString('zh-TW')}
            </div>
          </div>
          
          {/* 狀態提示 */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>提示：</strong> 修改內容後點擊保存，網站將自動更新。所有更改都會即時反映在網站上。
                </p>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'brand', name: '品牌信息', count: 1 },
                { id: 'prices', name: '價格方案', count: prices.length },
                { id: 'customerCases', name: '客戶案例', count: customerCases.length },
                { id: 'blogPosts', name: '部落格文章', count: blogPosts.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span>{tab.name}</span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          {activeTab === 'brand' && brandInfo && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">品牌信息</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">品牌名稱</label>
                  <input
                    type="text"
                    value={brandInfo.name}
                    onChange={(e) => setBrandInfo({...brandInfo, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">標語</label>
                  <input
                    type="text"
                    value={brandInfo.tagline}
                    onChange={(e) => setBrandInfo({...brandInfo, tagline: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">描述</label>
                  <textarea
                    value={brandInfo.description}
                    onChange={(e) => setBrandInfo({...brandInfo, description: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button
                onClick={() => handleSave('brand', brandInfo)}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                保存品牌信息
              </button>
            </div>
          )}

          {activeTab === 'prices' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">價格方案</h2>
                <span className="text-sm text-gray-500">共 {prices.length} 個方案</span>
              </div>
              <div className="space-y-4">
                {prices.map((price, index) => (
                  <div key={price.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">產品名稱</label>
                        <input
                          type="text"
                          value={price.name}
                          onChange={(e) => {
                            const newPrices = [...prices];
                            newPrices[index].name = e.target.value;
                            setPrices(newPrices);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">品牌</label>
                        <input
                          type="text"
                          value={price.brand}
                          onChange={(e) => {
                            const newPrices = [...prices];
                            newPrices[index].brand = e.target.value;
                            setPrices(newPrices);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">價格 (HKD)</label>
                        <input
                          type="number"
                          value={price.price}
                          onChange={(e) => {
                            const newPrices = [...prices];
                            newPrices[index].price = parseInt(e.target.value);
                            setPrices(newPrices);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">描述</label>
                      <textarea
                        value={price.description}
                        onChange={(e) => {
                          const newPrices = [...prices];
                          newPrices[index].description = e.target.value;
                          setPrices(newPrices);
                        }}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleSave('prices', prices)}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                保存價格方案
              </button>
            </div>
          )}

          {activeTab === 'customerCases' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">客戶案例</h2>
                <span className="text-sm text-gray-500">共 {customerCases.length} 個案例</span>
              </div>
              <div className="space-y-4">
                {customerCases.map((customerCase, index) => (
                  <div key={customerCase.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">姓名</label>
                        <input
                          type="text"
                          value={customerCase.name}
                          onChange={(e) => {
                            const newCases = [...customerCases];
                            newCases[index].name = e.target.value;
                            setCustomerCases(newCases);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">年齡</label>
                        <input
                          type="number"
                          value={customerCase.age}
                          onChange={(e) => {
                            const newCases = [...customerCases];
                            newCases[index].age = parseInt(e.target.value);
                            setCustomerCases(newCases);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">評分</label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={customerCase.rating}
                          onChange={(e) => {
                            const newCases = [...customerCases];
                            newCases[index].rating = parseInt(e.target.value);
                            setCustomerCases(newCases);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">治療項目</label>
                        <input
                          type="text"
                          value={customerCase.treatment}
                          onChange={(e) => {
                            const newCases = [...customerCases];
                            newCases[index].treatment = e.target.value;
                            setCustomerCases(newCases);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">評價內容</label>
                      <textarea
                        value={customerCase.content}
                        onChange={(e) => {
                          const newCases = [...customerCases];
                          newCases[index].content = e.target.value;
                          setCustomerCases(newCases);
                        }}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">圖片路徑</label>
                      <input
                        type="text"
                        value={customerCase.image}
                        onChange={(e) => {
                          const newCases = [...customerCases];
                          newCases[index].image = e.target.value;
                          setCustomerCases(newCases);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="/images/case-1.jpg"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleSave('customerCases', customerCases)}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                保存客戶案例
              </button>
            </div>
          )}

          {activeTab === 'blogPosts' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">部落格文章</h2>
                <span className="text-sm text-gray-500">共 {blogPosts.length} 篇文章</span>
              </div>
              <div className="space-y-4">
                {blogPosts.map((post, index) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">標題</label>
                        <input
                          type="text"
                          value={post.title}
                          onChange={(e) => {
                            const newPosts = [...blogPosts];
                            newPosts[index].title = e.target.value;
                            setBlogPosts(newPosts);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">分類</label>
                        <input
                          type="text"
                          value={post.category}
                          onChange={(e) => {
                            const newPosts = [...blogPosts];
                            newPosts[index].category = e.target.value;
                            setBlogPosts(newPosts);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">發布狀態</label>
                        <select
                          value={post.isPublished ? 'true' : 'false'}
                          onChange={(e) => {
                            const newPosts = [...blogPosts];
                            newPosts[index].isPublished = e.target.value === 'true';
                            setBlogPosts(newPosts);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="true">已發布</option>
                          <option value="false">草稿</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">摘要</label>
                      <textarea
                        value={post.excerpt}
                        onChange={(e) => {
                          const newPosts = [...blogPosts];
                          newPosts[index].excerpt = e.target.value;
                          setBlogPosts(newPosts);
                        }}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">內容 (HTML)</label>
                      <textarea
                        value={post.content}
                        onChange={(e) => {
                          const newPosts = [...blogPosts];
                          newPosts[index].content = e.target.value;
                          setBlogPosts(newPosts);
                        }}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="<p>您的HTML內容...</p>"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleSave('blogPosts', blogPosts)}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                保存部落格文章
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 