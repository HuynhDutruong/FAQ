'use client';

import React, { useMemo } from 'react';
import {
  TrendingUp,
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  BarChart3,
  Award,
  ExternalLink,
  Flame,
  FileText,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import type { FeedPost } from '@/lib/postIntel';

export default function PostIntelDashboard({ posts }: { posts: FeedPost[] }) {
  const stats = useMemo(() => {
    if (!posts.length) return null;

    let totalLikes = 0;
    let totalComments = 0;
    let totalShares = 0;
    let noticeCount = 0;
    let newsCount = 0;
    let withMediaCount = 0;

    posts.forEach((p) => {
      totalLikes += p.likesCount || 0;
      totalComments += p.commentsCount || 0;
      totalShares += p.sharesCount || 0;
      if (p.kind === 'notice') noticeCount++;
      else newsCount++;
      if (p.full_picture || p.video || p.youtube?.length) withMediaCount++;
    });

    const totalInteractions = totalLikes + totalComments + totalShares;
    const avgInteractionsPerPost = Math.round(totalInteractions / posts.length);

    // Top 5 bài tương tác cao nhất
    const sorted = [...posts].sort(
      (a, b) =>
        b.likesCount + b.commentsCount * 2 + b.sharesCount * 3 -
        (a.likesCount + a.commentsCount * 2 + a.sharesCount * 3)
    );
    const topPosts = sorted.slice(0, 5);

    // Đánh giá SEO bài viết
    let goodSeoCount = 0;
    posts.forEach((p) => {
      const text = p.message || '';
      const hasHeading = /[A-ZÀ-Ỹ]{3,}/.test(text);
      const hasHashtag = /#/.test(text);
      const isLongEnough = text.length >= 80;
      if ((hasHeading ? 1 : 0) + (hasHashtag ? 1 : 0) + (isLongEnough ? 1 : 0) >= 2) {
        goodSeoCount++;
      }
    });

    const seoScore = Math.round((goodSeoCount / posts.length) * 100);

    return {
      totalPosts: posts.length,
      totalLikes,
      totalComments,
      totalShares,
      totalInteractions,
      avgInteractionsPerPost,
      noticeCount,
      newsCount,
      withMediaCount,
      mediaRate: Math.round((withMediaCount / posts.length) * 100),
      seoScore,
      topPosts
    };
  }, [posts]);

  if (!stats) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
        Đang nạp dữ liệu phân tích bài viết...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Overview Stat Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px'
        }}
      >
        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '12px'
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Tổng Tương Tác
          </div>
          <div
            style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <TrendingUp size={22} />
            {stats.totalInteractions.toLocaleString('vi-VN')}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            Trung bình ~{stats.avgInteractionsPerPost} tương tác / bài
          </div>
        </div>

        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '12px'
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Lượt Thích & Thả Tim
          </div>
          <div
            style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              color: '#E11D48',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Heart size={22} fill="#E11D48" />
            {stats.totalLikes.toLocaleString('vi-VN')}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            Từ {stats.totalPosts} bài đã đăng
          </div>
        </div>

        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '12px'
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Bình Luận & Thảo Luận
          </div>
          <div
            style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              color: '#1877F2',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <MessageCircle size={22} />
            {stats.totalComments.toLocaleString('vi-VN')}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            {stats.totalShares} lượt chia sẻ
          </div>
        </div>

        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '12px'
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Chất Lượng SEO Bài Viết
          </div>
          <div
            style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              color: stats.seoScore >= 70 ? '#059669' : '#D97706',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={22} />
            {stats.seoScore}/100
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            {stats.mediaRate}% bài có hình ảnh/video
          </div>
        </div>
      </div>

      {/* Breakdown Bar */}
      <div
        style={{
          padding: '16px',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '12px'
        }}
      >
        <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '10px' }}>
          Phân bổ nội dung Fanpage & Website:
        </div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.85rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary)'
              }}
            />
            Thông báo Xứ Đoàn: <strong>{stats.noticeCount}</strong> ({Math.round((stats.noticeCount / stats.totalPosts) * 100)}%)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#0F766E'
              }}
            />
            Tin tức & Sinh hoạt: <strong>{stats.newsCount}</strong> ({Math.round((stats.newsCount / stats.totalPosts) * 100)}%)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#1877F2'
              }}
            />
            Có đa phương tiện (Ảnh/Video): <strong>{stats.withMediaCount}</strong> ({stats.mediaRate}%)
          </span>
        </div>
      </div>

      {/* Top Performing Posts Leaderboard */}
      <div
        style={{
          padding: '18px',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '12px'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}
        >
          <div
            style={{
              fontSize: '1rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Flame size={20} color="#E11D48" /> Top Bài Viết Lan Tỏa Nhất (Viral Marketing)
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
            Xếp hạng theo tổng tương tác
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {stats.topPosts.map((post, index) => {
            const headline = (post.message || '').split('\n')[0] || 'Bài viết Xứ Đoàn';
            const total = post.likesCount + post.commentsCount + post.sharesCount;
            const articleUrl = `https://chanhtoa.tnttgiaophanmytho.online/bai-viet/${encodeURIComponent(post.id)}`;

            return (
              <div
                key={post.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderRadius: '8px',
                  gap: '12px',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '240px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor:
                        index === 0 ? '#F59E0B' : index === 1 ? '#94A3B8' : index === 2 ? '#B45309' : 'rgba(0,0,0,0.1)',
                      color: '#FFF',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      display: 'grid',
                      placeItems: 'center'
                    }}
                  >
                    {index + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <a
                      href={articleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        color: 'var(--color-text)',
                        textDecoration: 'none',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {headline}
                    </a>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                      {new Date(post.created_time).toLocaleDateString('vi-VN')} · {post.kind === 'notice' ? 'Thông báo' : 'Tin tức'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.85rem' }}>
                  <span style={{ color: '#E11D48', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Heart size={14} fill="#E11D48" /> {post.likesCount}
                  </span>
                  <span style={{ color: '#1877F2', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <MessageCircle size={14} /> {post.commentsCount}
                  </span>
                  <span style={{ color: '#059669', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Share2 size={14} /> {post.sharesCount}
                  </span>

                  <a
                    href={articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Mở bài viết trên Web"
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-primary)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      textDecoration: 'none',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                  >
                    Xem <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
