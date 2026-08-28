'use client';
import React, { useState, useEffect } from 'react';
import { ExternalLink, MessageCircle, Heart, Share2, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface FBPost {
  id: string;
  message?: string;
  story?: string;
  created_time: string;
  full_picture?: string | null;
  permalink_url: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
}

export default function FacebookFeed() {
  const [posts, setPosts] = useState<FBPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/facebook/posts');
        const data = await res.json();
        if (data.posts) setPosts(data.posts);
      } catch (err) {
        console.error('Error fetching Facebook posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-subtle)' }}>
        <Loader2 size={32} className="spin" style={{ margin: '0 auto' }} />
        <p style={{ marginTop: '12px' }}>Đang tải bài viết...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-subtle)' }}>
        <p>Chưa có bài viết nào</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {posts.map(post => (
        <div
          key={post.id}
          className="liquid-glass"
          style={{
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            backgroundColor: 'rgba(255, 255, 255, 0.4)'
          }}
        >
          {/* Post Header */}
          <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-dark)' }}>
                  Xứ Đoàn Các Thánh Tử Đạo Việt Nam
                </p>
                <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: 'var(--color-subtle)' }}>
                  {formatDate(post.created_time)}
                </p>
              </div>
              <a href={post.permalink_url} target="_blank" rel="noopener noreferrer" style={{
                width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(24, 119, 242, 0.1)',
                color: '#1877F2', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
              }}>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Post Content */}
          <div style={{ padding: '14px 16px' }}>
            {post.full_picture && (
              <div style={{ marginBottom: '12px', borderRadius: '10px', overflow: 'hidden', maxHeight: '400px', backgroundColor: '#F3F4F6' }}>
                <img
                  src={post.full_picture}
                  alt="Post"
                  style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '400px', objectFit: 'cover' }}
                />
              </div>
            )}

            <p style={{
              margin: 0, fontSize: '0.95rem', color: 'var(--color-dark)', lineHeight: 1.6,
              maxHeight: expandedId === post.id ? 'none' : '120px',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: expandedId === post.id ? 'unset' : 3,
              WebkitBoxOrient: 'vertical'
            }}>
              {post.message || post.story || '(Không có nội dung)'}
            </p>

            {(post.message?.length || 0) > 300 && (
              <button
                onClick={() => setExpandedId(expandedId === post.id ? null : post.id)}
                style={{
                  marginTop: '8px',
                  padding: 0,
                  border: 'none',
                  background: 'none',
                  color: '#1877F2',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {expandedId === post.id ? 'Ẩn bớt' : 'Xem thêm'}
              </button>
            )}
          </div>

          {/* Stats */}
          <div style={{
            padding: '10px 16px',
            borderTop: '1px solid rgba(0, 0, 0, 0.05)',
            display: 'flex', justifyContent: 'space-around',
            fontSize: '0.8rem', color: 'var(--color-subtle)', fontWeight: 600
          }}>
            <span>❤️ {post.likesCount}</span>
            <span>💬 {post.commentsCount}</span>
            <span>↗️ {post.sharesCount}</span>
          </div>

          {/* Actions */}
          <div style={{
            padding: '10px 8px',
            display: 'flex', gap: '4px',
            borderTop: '1px solid rgba(0, 0, 0, 0.05)'
          }}>
            <a href={post.permalink_url} target="_blank" rel="noopener noreferrer" style={{
              flex: 1,
              padding: '8px',
              textAlign: 'center',
              borderRadius: '8px',
              background: 'rgba(24, 119, 242, 0.08)',
              color: '#1877F2',
              fontSize: '0.85rem',
              fontWeight: 700,
              textDecoration: 'none',
              cursor: 'pointer'
            }}>
              Xem trên Facebook
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
