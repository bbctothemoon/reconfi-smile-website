'use client';

import { useState, useEffect } from 'react';
import { InstagramPost, InstagramProfile, getInstagramPosts, getInstagramProfile, formatTimeAgo, formatNumber } from '@/lib/instagram';
import { Heart, MessageCircle, Play, ExternalLink, Instagram } from 'lucide-react';

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [profile, setProfile] = useState<InstagramProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, profileData] = await Promise.all([
          getInstagramPosts(6),
          getInstagramProfile()
        ]);
        setPosts(postsData);
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching Instagram data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">載入 Instagram 內容中...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!profile || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Instagram className="w-8 h-8 text-pink-500 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">關注我們的 Instagram</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            追蹤我們的最新動態，查看真實的治療案例和客戶見證
          </p>
          
          {/* Profile Info */}
          <div className="flex items-center justify-center mb-8">
            <img
              src={profile.profile_pic_url}
              alt={profile.full_name}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div className="text-left">
              <h3 className="text-xl font-semibold text-gray-900">@{profile.username}</h3>
              <p className="text-gray-600">{profile.biography}</p>
              <div className="flex items-center gap-6 mt-2 text-sm text-gray-500">
                <span>{formatNumber(profile.posts)} 貼文</span>
                <span>{formatNumber(profile.followers)} 追蹤者</span>
                <span>{formatNumber(profile.following)} 追蹤中</span>
              </div>
            </div>
          </div>

          {/* Follow Button */}
          <a
            href={`https://instagram.com/${profile.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            <Instagram className="w-5 h-5 mr-2" />
            追蹤 Instagram
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg"
              onClick={() => setSelectedPost(post)}
            >
              <img
                src={post.display_url}
                alt={post.caption || 'Instagram post'}
                className="w-full h-48 object-cover transition-transform group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center">
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      <span className="text-sm">{formatNumber(post.likes)}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm">{formatNumber(post.comments)}</span>
                    </div>
                  </div>
                  {post.is_video && (
                    <Play className="w-8 h-8 mx-auto" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Latest Posts */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">最新貼文</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img
                    src={post.display_url}
                    alt={post.caption || 'Instagram post'}
                    className="w-full h-48 object-cover"
                  />
                  {post.is_video && (
                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img
                        src={post.owner.profile_pic_url}
                        alt={post.owner.full_name}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span className="font-medium text-gray-900">@{post.owner.username}</span>
                    </div>
                    <span className="text-sm text-gray-500">{formatTimeAgo(post.timestamp)}</span>
                  </div>
                  
                  {post.caption && (
                    <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                      {post.caption}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {formatNumber(post.likes)}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {formatNumber(post.comments)}
                      </div>
                    </div>
                    
                    <a
                      href={`https://instagram.com/p/${post.shortcode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500 hover:text-pink-600"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for selected post */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedPost.display_url}
                alt={selectedPost.caption || 'Instagram post'}
                className="w-full h-64 object-cover"
              />
              {selectedPost.is_video && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1">
                  <Play className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <img
                    src={selectedPost.owner.profile_pic_url}
                    alt={selectedPost.owner.full_name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="font-medium text-gray-900">@{selectedPost.owner.username}</span>
                </div>
                <span className="text-sm text-gray-500">{formatTimeAgo(selectedPost.timestamp)}</span>
              </div>
              
              {selectedPost.caption && (
                <p className="text-gray-600 text-sm mb-3">{selectedPost.caption}</p>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {formatNumber(selectedPost.likes)}
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {formatNumber(selectedPost.comments)}
                  </div>
                </div>
                
                <a
                  href={`https://instagram.com/p/${selectedPost.shortcode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-600"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 