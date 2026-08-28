'use client';

/** Khối skeleton cơ bản. Truyền chiều cao/rộng tuỳ chỗ dùng. */
export function Skel({ w, h, r, style }: { w?: string | number; h?: string | number; r?: string; style?: React.CSSProperties }) {
  return <div className="skeleton" style={{ width: w, height: h, borderRadius: r, ...style }} />;
}

/** Skeleton cho danh sách bài viết ở trang chủ: 1 bài nổi bật + n hàng gọn. */
export function NewsFeedSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div aria-busy="true" aria-label="Đang tải bài viết">
      <div style={{ marginBottom: '22px' }}>
        <Skel h={200} r="4px" style={{ marginBottom: '12px' }} />
        <div className="skeleton skel-title" style={{ width: '85%' }} />
        <div className="skeleton skel-line" style={{ width: '100%' }} />
        <div className="skeleton skel-line" style={{ width: '60%' }} />
      </div>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="skel-news-row">
          <div className="skeleton skel-news-thumb" />
          <div>
            <div className="skeleton skel-line" style={{ width: '95%' }} />
            <div className="skeleton skel-line" style={{ width: '78%' }} />
            <div className="skeleton skel-line" style={{ width: '35%', height: '10px' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Skeleton cho trang đọc bài viết. */
export function ArticleSkeleton() {
  return (
    <div className="article" aria-busy="true" aria-label="Đang tải bài viết">
      <div className="skeleton skel-line" style={{ width: '120px', marginBottom: '18px' }} />
      <div className="skeleton" style={{ height: '30px', width: '92%', marginBottom: '10px' }} />
      <div className="skeleton" style={{ height: '30px', width: '65%', marginBottom: '16px' }} />
      <div className="skeleton skel-line" style={{ width: '55%', marginBottom: '24px' }} />
      <Skel h={280} r="6px" style={{ marginBottom: '26px' }} />
      {Array.from({ length: 7 }, (_, i) => (
        <div key={i} className="skeleton skel-line" style={{ width: i % 3 === 2 ? '72%' : '100%', height: '14px', marginBottom: '12px' }} />
      ))}
    </div>
  );
}

/** Skeleton cho một thẻ bài viết trong trang quản trị Fanpage. */
export function FbPostSkeleton() {
  return (
    <div className="fb-card" aria-busy="true">
      <div className="fb-post-head" style={{ paddingBottom: '12px' }}>
        <div className="skeleton skel-circle" style={{ width: '40px', height: '40px' }} />
        <div style={{ flex: 1 }}>
          <div className="skeleton skel-line" style={{ width: '180px' }} />
          <div className="skeleton skel-line" style={{ width: '90px', height: '10px' }} />
        </div>
      </div>
      <div style={{ padding: '0 16px 12px' }}>
        <div className="skeleton skel-line" style={{ width: '100%' }} />
        <div className="skeleton skel-line" style={{ width: '88%' }} />
      </div>
      <Skel h={240} r="0" />
      <div className="fb-stats">
        <div className="skeleton skel-line" style={{ width: '70px', margin: 0 }} />
        <div className="skeleton skel-line" style={{ width: '140px', margin: 0 }} />
      </div>
    </div>
  );
}
