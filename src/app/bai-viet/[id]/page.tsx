'use client';
import { useEffect, useState, use, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart, Loader2, MessageCircle, Repeat2, User, X } from 'lucide-react';
import { ArticleSkeleton } from '@/components/Skeleton';
import { playerSrc, LinkButtons } from '@/components/PostMedia';
import { cleanUrl, type PostMediaInfo } from '@/lib/postIntel';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useClientTranslation } from '@/lib/clientTranslator';

interface Reply { id: string; message: string; created_time: string; author: string }
interface Comment { id: string; message: string; created_time: string; author: string; likeCount: number; replies: Reply[] }
interface PostDetail extends PostMediaInfo {
  id: string;
  message: string;
  created_time: string;
  images: string[];
  permalink_url: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
}

type Block =
  | { kind: 'heading'; text: string }
  | { kind: 'para'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'byline'; text: string };

const formatDateTime = (s: string) =>
  new Date(s).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

const BYLINE = /^(bài viết|hình ảnh|ảnh|nguồn|tác giả|biên tập|thực hiện|chuyển ngữ|xem thêm|nguồn tin|source|author|photo|by)\b/i;
const BULLET = /^\s*[-–—•*+▪➤👉✅]\s+/;

/** Chữ hoa toàn bộ và đủ ngắn thì coi là tiểu đề — kiểu viết quen thuộc của bài Facebook. */
const isHeading = (line: string) =>
  line.length <= 120 && line === line.toUpperCase() && /[A-ZÀ-Ỹ]/.test(line) && !line.endsWith('.');

/** Tách nội dung thô của Facebook thành các khối để dựng bài đọc. */
function parseBody(message: string): Block[] {
  const lines = message.split('\n');
  const body = lines.slice(1); // dòng đầu đã dùng làm tiêu đề
  const blocks: Block[] = [];
  let buffer: string[] = [];
  let bullets: string[] = [];

  const flushPara = () => {
    if (buffer.length) {
      blocks.push({ kind: 'para', text: buffer.join(' ') });
      buffer = [];
    }
  };
  const flushList = () => {
    if (bullets.length) {
      blocks.push({ kind: 'list', items: bullets });
      bullets = [];
    }
  };

  for (const raw of body) {
    const line = raw.trim();
    if (!line) { flushPara(); flushList(); continue; }

    if (BULLET.test(line)) {
      flushPara();
      bullets.push(line.replace(BULLET, ''));
      continue;
    }
    flushList();

    if (BYLINE.test(line)) { flushPara(); blocks.push({ kind: 'byline', text: line }); continue; }
    if (isHeading(line)) { flushPara(); blocks.push({ kind: 'heading', text: line }); continue; }

    buffer.push(line);
  }
  flushPara();
  flushList();
  return blocks;
}

/** URL trong nội dung mở được ngay, tab mới để người đọc không mất bài đang xem. */
function linkify(text: string) {
  return text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
    /^https?:\/\//.test(part)
      ? (
        <a key={i} href={cleanUrl(part)} target="_blank" rel="noopener noreferrer" className="article-url">
          {part}
        </a>
      )
      : part
  );
}

/** Màu avatar suy ra từ id bình luận, để danh sách khuyết danh vẫn có nhịp thị giác. */
const AVATAR_COLORS = ['#B71C1C', '#0F766E', '#B45309', '#4338CA', '#9D174D', '#166534', '#7C2D12'];

function CommentAvatar({ seed, small }: { seed: string; small?: boolean }) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return (
    <div className="comment-avatar" style={{ backgroundColor: AVATAR_COLORS[hash % AVATAR_COLORS.length] }} aria-hidden>
      <User size={small ? 14 : 16} strokeWidth={2.2} />
    </div>
  );
}

/** Thời gian tương đối, gọn hơn ngày giờ đầy đủ trong danh sách bình luận. */
function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 3600) return `${Math.max(1, Math.floor(diff / 60))} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} ngày trước`;
  return new Date(iso).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

const readingMinutes = (text: string) => Math.max(1, Math.round(text.split(/\s+/).length / 200));

export default function BaiVietPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t, lang } = useLanguage();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/facebook/posts/${encodeURIComponent(id)}`)
      .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Không tải được bài viết');
        setPost(data.post);
        setComments(data.comments || []);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  // Client-side translation of full post content
  const { translatedText, isTranslating } = useClientTranslation(post?.message || '', lang);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLightbox(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const activeMessage = lang === 'vi' ? (post?.message || '') : (translatedText || post?.message || '');
  const blocks = useMemo(() => (activeMessage ? parseBody(activeMessage) : []), [activeMessage]);

  if (loading) return (
    <main style={{ flex: 1, padding: '20px 16px 64px' }}>
      <article className="article" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="skeleton" style={{ width: '120px', height: '18px' }} />
        <div className="skeleton" style={{ width: '90%', height: '36px', marginTop: '8px' }} />
        <div className="skeleton" style={{ width: '60%', height: '36px' }} />
        <div className="skeleton" style={{ width: '40%', height: '14px', margin: '4px 0 16px' }} />
        
        <div className="skeleton" style={{ width: '100%', height: '320px', borderRadius: '10px' }} />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
          <div className="skeleton" style={{ width: '100%', height: '16px' }} />
          <div className="skeleton" style={{ width: '95%', height: '16px' }} />
          <div className="skeleton" style={{ width: '88%', height: '16px' }} />
          <div className="skeleton" style={{ width: '100%', height: '16px', marginTop: '12px' }} />
          <div className="skeleton" style={{ width: '92%', height: '16px' }} />
          <div className="skeleton" style={{ width: '70%', height: '16px' }} />
        </div>
      </article>
    </main>
  );

  if (error || !post) return (
    <main style={{ flex: 1, padding: '64px 16px', textAlign: 'center' }}>
      <p style={{ color: 'var(--color-subtle)', marginBottom: '16px' }}>{error || 'Không tìm thấy bài viết.'}</p>
      <Link href="/" className="article-link"><ArrowLeft size={15} strokeWidth={2} /> {t.backToHome || 'Về trang chủ'}</Link>
    </main>
  );

  const title = activeMessage.split('\n')[0] || '(Không có tiêu đề)';
  const [cover, ...gallery] = post.images;
  const player = playerSrc(post);

  return (
    <main style={{ flex: 1, padding: '20px 16px 64px' }}>
      <article className="article">
        <Link href="/" className="article-back">
          <ArrowLeft size={16} /> {t.newsLatestTitle || 'Bài viết mới'}
        </Link>

        <h1 className="article-title">{title}</h1>

        <div className="article-meta">
          <span style={{ fontWeight: 700, color: 'var(--color-muted)' }}>
            {t.footerChapterName || 'Xứ Đoàn Các Thánh Tử Đạo Việt Nam'} · {t.subtitle || 'Giáo Xứ Chánh Toà — Giáo Phận Mỹ Tho'}
          </span>
          <span>{formatDateTime(post.created_time)}</span>
          <span>{readingMinutes(activeMessage)} {lang === 'vi' ? 'phút đọc' : 'min read'}</span>
          {isTranslating && (
            <span style={{ color: 'var(--color-red)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Loader2 size={12} className="spin" /> Đang dịch...
            </span>
          )}
        </div>

        {player ? (
          <figure className="article-cover article-player">
            {player.type === 'video' ? (
              <video src={player.src} controls playsInline poster={cover || undefined} />
            ) : (
              <iframe
                src={player.src.replace('&autoplay=1', '').replace('?autoplay=1&', '?')}
                title="Trình phát video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </figure>
        ) : cover && (
          <figure className="article-cover">
            <img src={cover} alt="" onClick={() => setLightbox(cover)} />
          </figure>
        )}

        {post.links?.length > 0 && <LinkButtons links={post.links} />}

        <div className="article-body">
          {blocks.map((b, i) => {
            if (b.kind === 'heading') return <h2 key={i}>{b.text}</h2>;
            if (b.kind === 'byline') return <p key={i} className="article-byline">{linkify(b.text)}</p>;
            if (b.kind === 'list') return (
              <ul key={i}>{b.items.map((it, j) => <li key={j}>{linkify(it)}</li>)}</ul>
            );
            return <p key={i} className={i === 0 ? 'article-lead' : undefined}>{linkify(b.text)}</p>;
          })}
        </div>

        {gallery.length > 0 && (
          <section className="article-gallery">
            <h2 className="hdgm-section-title" style={{ fontSize: '0.9rem', marginBottom: '12px' }}>
              {lang === 'vi' ? 'Hình ảnh' : 'Gallery'} ({post.images.length})
            </h2>
            <div className="article-gallery-grid">
              {gallery.map((src, i) => (
                <button key={i} onClick={() => setLightbox(src)} aria-label={`Xem ảnh ${i + 2}`}>
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </section>
        )}

        <footer className="article-footer">
          <div className="article-counts">
            <span><Heart size={15} strokeWidth={2} /> {post.likesCount}</span>
            <span><MessageCircle size={15} strokeWidth={2} /> {post.commentsCount}</span>
            <span><Repeat2 size={15} strokeWidth={2} /> {post.sharesCount}</span>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Link href="/" className="article-link"><ArrowLeft size={15} strokeWidth={2} /> {t.backToHome || 'Về trang chủ'}</Link>
          </div>
        </footer>

        {comments.length > 0 && (
          <section className="article-comments">
            <h2 className="hdgm-section-title" style={{ fontSize: '0.9rem', marginBottom: '16px' }}>
              {lang === 'vi' ? 'Bình luận nổi bật' : 'Featured Comments'} ({comments.length})
            </h2>

            {comments.every(c => c.author === 'Ẩn danh') && (
              <p className="comment-note">
                {lang === 'vi'
                  ? 'Facebook không chia sẻ tên người bình luận qua API, nên phần này chỉ hiển thị nội dung.'
                  : 'Facebook does not share commenter names through its API, so only the text is shown here.'}
              </p>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {comments.map(c => (
                <div key={c.id} className="comment-card">
                  <CommentAvatar seed={c.id} />
                  <div className="comment-bubble">
                    {c.author !== 'Ẩn danh' && <div className="comment-author">{c.author}</div>}
                    <div className="comment-msg">{c.message}</div>
                  </div>
                  <div className="comment-time">{timeAgo(c.created_time)}</div>

                  {c.replies && c.replies.length > 0 && (
                    <div className="comment-replies">
                      {c.replies.map(r => (
                        <div key={r.id} className="comment-card">
                          <CommentAvatar seed={r.id} small />
                          <div className="comment-bubble">
                            {r.author !== 'Ẩn danh' && <div className="comment-author">{r.author}</div>}
                            <div className="comment-msg">{r.message}</div>
                          </div>
                          <div className="comment-time">{timeAgo(r.created_time)}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </article>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} aria-label="Đóng"><X size={22} /></button>
          <img src={lightbox} alt="" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </main>
  );
}
