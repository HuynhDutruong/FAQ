'use client';
import { useState } from 'react';
import FacebookFeed from '@/components/FacebookFeed';
import SidebarWidgets from '@/components/SidebarWidgets';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { GOSPEL_VERSES, getDailyGospelVerseIndex } from '@/lib/gospelVerses';

export default function Home() {
  const [verseIndex] = useState(() => getDailyGospelVerseIndex());
  const { t, lang } = useLanguage();

  const currentVerse = GOSPEL_VERSES[verseIndex];
  const verseText = currentVerse?.texts[lang] || currentVerse?.texts.vi || t.description;

  return (
    <main style={{ flex: 1, padding: '20px 16px 48px' }}>
      <div style={{ width: '100%', maxWidth: '1060px', margin: '0 auto' }} className="home-grid">
        <section>
          <div className="hdgm-section-head">
            <h2 className="hdgm-section-title">{t.newsLatestTitle || 'Bài Viết Mới'}</h2>
          </div>
          <FacebookFeed />
        </section>

        <SidebarWidgets verseText={verseText} />
      </div>
    </main>
  );
}
