import { extractPostMedia, type PostMediaInfo } from '@/lib/postIntel';

export interface PostDetail extends PostMediaInfo {
  id: string;
  message: string;
  created_time: string;
  images: string[];
  permalink_url: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
}

const POST_FIELDS =
  'id,message,story,created_time,full_picture,permalink_url,' +
  'attachments{media_type,title,url,unshimmed_url,target,media,subattachments},' +
  'shares,reactions.summary(total_count).limit(0),comments.summary(total_count).limit(0)';

// In-memory micro-cache to prevent double fetching during SSR and metadata generation
const memoryCache = new Map<string, { at: number; post: PostDetail }>();
const CACHE_TTL_MS = 60 * 1000; // 1 phút

/**
 * Phân biệt hai tình huống rất khác nhau mà trước đây đều trả về null:
 *  - 'missing'     : bài viết thật sự không còn trên Facebook.
 *  - 'unavailable' : máy chủ chưa lấy được (thiếu token, hết hạn mức Firestore,
 *                    Graph API lỗi). Bài viết vẫn còn, chỉ tạm thời không tải được.
 * Báo sai loại khiến người dùng tưởng bài đã bị gỡ.
 */
export type PostFetchFailure = 'missing' | 'unavailable';

let lastFailure: PostFetchFailure = 'missing';

/** Lý do của lần fetchPostDetail gần nhất trả về null. */
export function getLastPostFailure(): PostFetchFailure {
  return lastFailure;
}

export async function fetchPostDetail(id: string): Promise<PostDetail | null> {
  if (!id) return null;

  const cached = memoryCache.get(id);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return cached.post;
  }

  let pageToken = (
    process.env.FACEBOOK_PAGE_ACCESS_TOKEN ||
    process.env.FACEBOOK_PAGE_TOKEN ||
    process.env.FACEBOOK_ACCESS_TOKEN ||
    ''
  ).trim();

  if (!pageToken) {
    try {
      const { getFacebookCredentials } = await import('@/lib/facebookHelper');
      const creds = await getFacebookCredentials();
      pageToken = creds.pageToken;
    } catch {
      // Fallback
    }
  }

  if (!pageToken) {
    // Không có token nghĩa là hệ thống chưa sẵn sàng, không phải bài viết bị gỡ.
    lastFailure = 'unavailable';
    return null;
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v20.0/${id}?fields=${encodeURIComponent(POST_FIELDS)}&access_token=${pageToken}`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) {
      // 4xx do bài không tồn tại; còn lại coi là sự cố tạm thời.
      lastFailure = res.status === 404 || res.status === 400 ? 'missing' : 'unavailable';
      return null;
    }
    const post = await res.json();
    if (post.error) {
      const code = Number(post.error?.code);
      lastFailure = code === 100 || code === 803 ? 'missing' : 'unavailable';
      return null;
    }

    // Ảnh trong album: Graph trả nhiều ảnh con qua subattachments
    const attachment = post.attachments?.data?.[0];
    const images: string[] = attachment?.subattachments?.data?.length
      ? attachment.subattachments.data
          .map((a: { media?: { image?: { src?: string } } }) => a.media?.image?.src)
          .filter(Boolean)
      : post.full_picture
        ? [post.full_picture]
        : [];

    const message = post.message || post.story || '';
    const permalink = post.permalink_url || `https://facebook.com/${post.id}`;

    const detail: PostDetail = {
      id: post.id,
      message,
      created_time: post.created_time || new Date().toISOString(),
      images,
      permalink_url: permalink,
      likesCount: post.reactions?.summary?.total_count || 0,
      commentsCount: post.comments?.summary?.total_count || 0,
      sharesCount: post.shares?.count || 0,
      ...extractPostMedia(message, permalink, post.attachments?.data || [])
    };

    memoryCache.set(id, { at: Date.now(), post: detail });
    return detail;
  } catch (err) {
    console.error('Error fetching post detail for id', id, err);
    lastFailure = 'unavailable';
    return null;
  }
}
