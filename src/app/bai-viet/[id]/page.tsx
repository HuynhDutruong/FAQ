import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { fetchPostDetail, getLastPostFailure } from '@/lib/fetchPostDetail';
import ArticleDetailView from '@/components/ArticleDetailView';

export const dynamic = 'force-dynamic';
export const revalidate = 300; // Tự động làm mới cache mỗi 5 phút

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchPostDetail(id);

  const baseUrl = 'https://chanhtoa.tnttgiaophanmytho.online';
  const postUrl = `${baseUrl}/bai-viet/${encodeURIComponent(id)}`;

  if (!post) {
    return {
      title: 'Bài Viết | Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Chánh Tòa Mỹ Tho',
      description: 'Trang thông tin chính thức Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Giáo Xứ Chánh Tòa Giáo Phận Mỹ Tho.'
    };
  }

  const rawTitle = (post.message || '').split('\n')[0]?.trim() || 'Bài viết Xứ Đoàn Các Thánh Tử Đạo';
  const title = rawTitle.length > 90 ? `${rawTitle.slice(0, 87)}...` : rawTitle;

  const rawDesc = (post.message || '')
    .split('\n')
    .slice(1)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim() || rawTitle;
  const description = rawDesc.length > 180 ? `${rawDesc.slice(0, 177)}...` : rawDesc;

  const ogImageUrl = `${baseUrl}/api/article-image?id=${encodeURIComponent(id)}`;

  return {
    title: `${title} | Xứ Đoàn Các Thánh Tử Đạo Việt Nam`,
    description,
    keywords: [
      "Xứ Đoàn Các Thánh Tử Đạo Việt Nam - Giáo Xứ Chánh toà Mỹ Tho",
      "giáo xứ chánh toà mỹ tho",
      "nhà thờ lớn mỹ tho",
      "giáo phận mỹ tho",
      "thiếu nhi thánh thể mỹ tho",
      "tntt mỹ tho",
      "giờ lễ mỹ tho",
      "tin tức xứ đoàn mỹ tho",
      "sinh hoạt thiếu nhi thánh thể chánh tòa"
    ],
    alternates: {
      canonical: postUrl
    },
    openGraph: {
      type: 'article',
      locale: 'vi_VN',
      url: postUrl,
      siteName: 'Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Giáo Xứ Chánh Tòa Mỹ Tho',
      title: `${title} — Xứ Đoàn Chánh Tòa Mỹ Tho`,
      description,
      publishedTime: post.created_time,
      authors: ['Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Giáo Xứ Chánh Tòa Mỹ Tho'],
      images: [
        {
          url: ogImageUrl,
          secureUrl: ogImageUrl,
          alt: title,
          width: 1200,
          height: 630,
          type: 'image/jpeg'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — Xứ Đoàn Chánh Tòa Mỹ Tho`,
      description,
      images: [ogImageUrl]
    }
  };
}

export default async function BaiVietPage({ params }: Props) {
  const { id } = await params;
  const post = await fetchPostDetail(id);

  const baseUrl = 'https://chanhtoa.tnttgiaophanmytho.online';
  const postUrl = `${baseUrl}/bai-viet/${encodeURIComponent(id)}`;

  if (!post) {
    return (
      <div
        style={{
          maxWidth: '640px',
          margin: '60px auto',
          padding: '32px 20px',
          textAlign: 'center',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px'
        }}
      >
        <h2 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '12px' }}>
          {getLastPostFailure() === 'unavailable'
            ? 'Tạm thời chưa tải được bài viết'
            : 'Không tìm thấy bài viết'}
        </h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px', fontSize: '0.95rem' }}>
          {getLastPostFailure() === 'unavailable'
            ? 'Máy chủ đang không kết nối được tới nguồn bài viết. Bài viết vẫn còn — xin thử lại sau ít phút.'
            : 'Bài viết có thể đã bị gỡ bỏ hoặc bạn đã nhập sai đường dẫn.'}
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            backgroundColor: 'var(--color-primary)',
            color: '#FFF',
            borderRadius: '999px',
            fontWeight: 600,
            textDecoration: 'none'
          }}
        >
          <ArrowLeft size={16} /> Quay lại Trang Chủ
        </Link>
      </div>
    );
  }

  const rawTitle = (post.message || '').split('\n')[0]?.trim() || 'Bài viết Xứ Đoàn';
  const coverImage = post.images?.[0] || `${baseUrl}/logo.jpg`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl
    },
    headline: rawTitle,
    image: [coverImage],
    datePublished: post.created_time,
    dateModified: post.created_time,
    author: {
      '@type': 'Organization',
      name: 'Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Giáo Xứ Chánh Tòa Mỹ Tho',
      url: baseUrl
    },
    publisher: {
      '@type': 'Organization',
      name: 'Xứ Đoàn Các Thánh Tử Đạo Việt Nam — Giáo Xứ Chánh Tòa Mỹ Tho',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.jpg`
      }
    },
    description: (post.message || '').slice(0, 200)
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleDetailView post={post} postUrl={postUrl} />
    </>
  );
}
