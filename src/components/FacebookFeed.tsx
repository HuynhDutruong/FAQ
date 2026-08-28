'use client';
import React, { useState, useEffect } from 'react';
import { ExternalLink, Loader2 } from 'lucide-react';
import { designSystem } from '@/lib/designSystem';

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
  const [isDark, setIsDark] = useState(false);

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

    const isDarkMode = typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches || false;
    setIsDark(isDarkMode);
  }, []);

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('vi-VN', { year: 'numeric', month: 'short', day: 'numeric' });

  if (loading) return <div style={{ textAlign: 'center', padding: designSystem.spacing['2xl'], color: isDark ? designSystem.colors.darkTextSecondary : designSystem.colors.textSecondary }}><Loader2 size={32} className="spin" style={{ margin: '0 auto' }} /><p style={{ marginTop: designSystem.spacing.md }}>Đang tải...</p></div>;

  if (posts.length === 0) return <div style={{ textAlign: 'center', padding: designSystem.spacing['2xl'], color: isDark ? designSystem.colors.darkTextSecondary : designSystem.colors.textSecondary }}>Chưa có bài viết</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: designSystem.spacing.lg }}>
      {posts.map(post => (
        <div key={post.id} style={{
          borderRadius: designSystem.radius.lg,
          overflow: 'hidden',
          backgroundColor: isDark ? designSystem.colors.darkBgSecondary : designSystem.colors.bg,
          border: `1px solid ${isDark ? designSystem.colors.darkBorder : designSystem.colors.border}`,
          boxShadow: isDark ? designSystem.shadows.md : designSystem.shadows.sm
        }}>
          <div style={{ padding: designSystem.spacing.lg, borderBottom: `1px solid ${isDark ? designSystem.colors.darkBorder : designSystem.colors.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: designSystem.spacing.md }}>
              <div>
                <p style={{ margin: 0, fontSize: designSystem.fonts.sizes.lg, fontWeight: 700, color: isDark ? designSystem.colors.darkText : designSystem.colors.text }}>Xứ Đoàn Các Thánh Tử Đạo Việt Nam</p>
                <p style={{ margin: `${designSystem.spacing.sm} 0 0`, fontSize: designSystem.fonts.sizes.sm, color: isDark ? designSystem.colors.darkTextSecondary : designSystem.colors.textSecondary }}>{formatDate(post.created_time)}</p>
              </div>
              <a href={post.permalink_url} target="_blank" rel="noopener noreferrer" style={{
                width: '40px', height: '40px', borderRadius: '50%',
                backgroundColor: isDark ? designSystem.colors.darkBg : '#F0F9FF',
                color: designSystem.colors.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
              }}>
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          <div style={{ padding: designSystem.spacing.lg }}>
            {post.full_picture && <div style={{ marginBottom: designSystem.spacing.lg, borderRadius: designSystem.radius.md, overflow: 'hidden', maxHeight: '300px', backgroundColor: designSystem.colors.bgSecondary }}>
              <img src={post.full_picture} alt="Post" style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'cover' }} />
            </div>}

            <p style={{
              margin: 0, fontSize: designSystem.fonts.sizes.base, color: isDark ? designSystem.colors.darkText : designSystem.colors.text,
              lineHeight: 1.6,
              maxHeight: expandedId === post.id ? 'none' : '120px',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: expandedId === post.id ? 'unset' : 3,
              WebkitBoxOrient: 'vertical'
            }}>
              {post.message || post.story || '(Không có nội dung)'}
            </p>

            {(post.message?.length || 0) > 300 && <button onClick={() => setExpandedId(expandedId === post.id ? null : post.id)} style={{
              marginTop: designSystem.spacing.md, padding: 0, border: 'none', background: 'none',
              color: designSystem.colors.primary, fontSize: designSystem.fonts.sizes.sm, fontWeight: 700, cursor: 'pointer'
            }}>
              {expandedId === post.id ? 'Ẩn bớt' : 'Xem thêm'}
            </button>}
          </div>

          <div style={{
            padding: `${designSystem.spacing.md} ${designSystem.spacing.lg}`,
            borderTop: `1px solid ${isDark ? designSystem.colors.darkBorder : designSystem.colors.border}`,
            display: 'flex', justifyContent: 'space-around',
            fontSize: designSystem.fonts.sizes.sm, color: isDark ? designSystem.colors.darkTextTertiary : designSystem.colors.textTertiary
          }}>
            <span>❤️ {post.likesCount}</span>
            <span>💬 {post.commentsCount}</span>
            <span>↗️ {post.sharesCount}</span>
          </div>

          <div style={{ padding: designSystem.spacing.lg, borderTop: `1px solid ${isDark ? designSystem.colors.darkBorder : designSystem.colors.border}` }}>
            <a href={post.permalink_url} target="_blank" rel="noopener noreferrer" style={{
              display: 'block', padding: designSystem.spacing.md, textAlign: 'center',
              borderRadius: designSystem.radius.md, background: isDark ? 'rgba(37, 99, 235, 0.1)' : 'rgba(37, 99, 235, 0.08)',
              color: designSystem.colors.accent, fontSize: designSystem.fonts.sizes.sm, fontWeight: 700,
              textDecoration: 'none', cursor: 'pointer'
            }}>
              Xem trên Facebook
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
