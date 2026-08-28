'use client';

import { useSyncExternalStore } from 'react';
import { ensureIntel, type FeedPost } from './postIntel';

interface FeedState {
  posts: FeedPost[];
  loading: boolean;
}

/**
 * Kho dữ liệu dùng chung: mọi khu vực trên trang (Bài viết, Thông báo) đọc
 * cùng một lượt tải, không ai gọi API thêm lần nữa.
 */
const EMPTY: FeedState = { posts: [], loading: true };
let snapshot: FeedState = EMPTY;
let started = false;

const listeners = new Set<() => void>();

function publish(next: FeedState) {
  snapshot = next;
  listeners.forEach(l => l());
}

function start() {
  if (started) return;
  started = true;

  // Cache cục bộ vẽ ngay khung bài, dữ liệu mới ghi đè sau
  try {
    const cached = JSON.parse(localStorage.getItem('fb_feed_cache') || 'null');
    if (Array.isArray(cached?.posts) && cached.posts.length) {
      publish({ posts: cached.posts.map(ensureIntel), loading: false });
    }
  } catch {
    // Bỏ qua lỗi parse cache
  }

  fetch('/api/facebook/posts')
    .then(res => (res.ok ? res.json() : { posts: [] }))
    .then(data => {
      const posts: FeedPost[] = Array.isArray(data?.posts) ? data.posts : [];
      if (posts.length) {
        try {
          localStorage.setItem('fb_feed_cache', JSON.stringify({ posts, savedAt: Date.now() }));
        } catch {
          // Vượt quota thì bỏ qua, lần sau tải lại từ máy chủ
        }
      }
      publish({ posts: posts.length ? posts : snapshot.posts, loading: false });
    })
    .catch(err => {
      console.error('Error fetching Facebook posts:', err);
      started = false;
      publish({ posts: snapshot.posts, loading: false });
    });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  start();
  return () => { listeners.delete(listener); };
}

export function useFacebookPosts(): FeedState {
  return useSyncExternalStore(subscribe, () => snapshot, () => EMPTY);
}
