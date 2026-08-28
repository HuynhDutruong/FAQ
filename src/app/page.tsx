'use client';

import { useState } from 'react';
import FacebookFeed from '@/components/FacebookFeed';
import NoticeBoard from '@/components/NoticeBoard';
import SidebarWidgets from '@/components/SidebarWidgets';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { GOSPEL_VERSES, getDailyGospelVerseIndex } from '@/lib/gospelVerses';

export default function Home() {
  const [verseIndex] = useState(() => getDailyGospelVerseIndex());
  const [feedFilter, setFeedFilter] = useState<'all' | 'notice' | 'news'>('all');
  const { t, lang } = useLanguage();

  const currentVerse = GOSPEL_VERSES[verseIndex];
  const verseText = currentVerse?.texts[lang] || currentVerse?.texts.vi || t.description;

  const handleSelectNoticeFilter = () => {
    setFeedFilter('notice');
    setTimeout(() => {
      const feedEl =
        document.getElementById('facebook-notice-feed') ||
        document.getElementById('facebook-news-feed');
      if (feedEl) {
        feedEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <main style={{ flex: 1, padding: '20px 16px 48px' }}>
      <div style={{ width: '100%', maxWidth: '1060px', margin: '0 auto' }} className="home-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* DÒNG BÀI VIẾT & BỘ LỌC ĐA NĂNG */}
          <section>
            <div className="hdgm-section-head">
              <h2 className="hdgm-section-title">{t.newsLatestTitle || 'Bài Viết & Sinh Hoạt'}</h2>
            </div>
            <FacebookFeed
              category={feedFilter}
              onCategoryChange={(newCat) => setFeedFilter(newCat)}
            />
          </section>

          {/* BẢNG THÔNG BÁO XỨ ĐOÀN - NẰM Ở DƯỚI BẢNG BÀI VIẾT */}
          <NoticeBoard onSelectNoticeFilter={handleSelectNoticeFilter} />
        </div>

        <SidebarWidgets verseText={verseText} />
      </div>
    </main>
  );
}
