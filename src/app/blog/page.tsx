"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, User, Tag } from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/airtable/blog')
      .then(res => res.json())
      .then(data => {
        // 只取 fields 方便渲染
        setPosts(data.map((item: any) => ({ id: item.id, ...item.fields })));
        setLoading(false);
      })
      .catch(err => {
        setError('載入失敗');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-12">載入中...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">專業專欄</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">分享最新的牙科美容知識、治療技術和護理指南，幫助您了解如何擁有完美的笑容</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4 mr-1" />
                  {post.Date ? new Date(post.Date).toLocaleDateString('zh-TW') : ''}
                  <Clock className="w-4 h-4 ml-4 mr-1" />
                  {post.ReadTime || ''}
                  <User className="w-4 h-4 ml-4 mr-1" />
                  {post.Author || ''}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  <Link href={"/blog/" + (post.slug || post.id)} className="hover:text-blue-600 transition-colors">
                    {post.Title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.Excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    <Tag className="w-3 h-3 mr-1" />
                    {Array.isArray(post.Category) ? post.Category.join(', ') : post.Category}
                  </span>
                  <Link href={"/blog/" + (post.slug || post.id)} className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    閱讀更多 →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        {posts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">暫無文章</h3>
            <p className="text-gray-600">請稍後再來查看，或聯繫我們了解更多資訊。</p>
          </div>
        )}
      </div>
    </div>
  );
} 