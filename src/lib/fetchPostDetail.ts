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

  if (!pageToken) return null;

  try {
    const res = await fetch(
      `https://graph.facebook.com/v20.0/${id}?fields=${encodeURIComponent(POST_FIELDS)}&access_token=${pageToken}`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) return null;
    const post = await res.json();
    if (post.error) return null;

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
    return null;
  }
}
