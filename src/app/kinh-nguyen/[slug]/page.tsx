import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { PRAYERS, PRAYER_CATEGORIES } from '@/lib/prayersData';

const BASE_URL = 'https://chanhtoa.tnttgiaophanmytho.online';

type Params = { params: Promise<{ slug: string }> };

/** 39 trang tĩnh — mỗi bản kinh một URL thật thay cho /kinh-nguyen?id=... */
export function generateStaticParams() {
  return PRAYERS.map((p) => ({ slug: p.id }));
}

export const dynamicParams = false;

function getPrayer(slug: string) {
  return PRAYERS.find((p) => p.id === slug);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const prayer = getPrayer(slug);
  if (!prayer) return {};

  const cat = PRAYER_CATEGORIES.find((c) => c.id === prayer.category);
  const excerpt = prayer.content.replace(/\s+/g, ' ').trim().slice(0, 155);

  return {
    title: `${prayer.title}${prayer.latinTitle ? ` (${prayer.latinTitle})` : ''} — Bản Kinh Công Giáo Đầy Đủ`,
    description: `Toàn văn ${prayer.title} theo bản kinh Công giáo Việt Nam${cat ? `, thuộc nhóm ${cat.label}` : ''}. ${excerpt}`,
    keywords: [prayer.title, prayer.latinTitle, 'kinh nguyện công giáo', cat?.label].filter(Boolean) as string[],
    alternates: { canonical: `${BASE_URL}/kinh-nguyen/${prayer.id}` },
    openGraph: {
      type: 'article',
      title: `${prayer.title} — Bản Kinh Công Giáo Đầy Đủ`,
      description: excerpt,
      url: `${BASE_URL}/kinh-nguyen/${prayer.id}`
    }
  };
}

export default async function PrayerPage({ params }: Params) {
  const { slug } = await params;
  const prayer = getPrayer(slug);
  if (!prayer) notFound();

  const cat = PRAYER_CATEGORIES.find((c) => c.id === prayer.category);
  const related = PRAYERS.filter((p) => p.category === prayer.category && p.id !== prayer.id).slice(0, 6);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${BASE_URL}/kinh-nguyen/${prayer.id}#prayer`,
    name: prayer.title,
    alternateName: prayer.latinTitle,
    genre: 'Kinh nguyện Công giáo',
    inLanguage: 'vi-VN',
    text: prayer.content,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    publisher: { '@id': `${BASE_URL}/#organization` }
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Kinh Nguyện', item: `${BASE_URL}/kinh-nguyen` },
      { '@type': 'ListItem', position: 3, name: prayer.title, item: `${BASE_URL}/kinh-nguyen/${prayer.id}` }
    ]
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-gradient)', padding: '16px 12px 56px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <article style={{ maxWidth: '760px', margin: '0 auto' }}>
        <nav aria-label="Đường dẫn" style={{ marginBottom: '14px' }}>
          <Link
            href="/kinh-nguyen"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-red)', textDecoration: 'none'
            }}
          >
            <ArrowLeft size={16} /> Kho tàng kinh nguyện
          </Link>
        </nav>

        <header style={{ marginBottom: '20px' }}>
          {cat && (
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#B71C1C', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
              {cat.label}
            </div>
          )}
          <h1 style={{ margin: 0, fontSize: 'clamp(1.5rem, 5vw, 2.1rem)', fontWeight: 900, color: 'var(--color-dark)', lineHeight: 1.25 }}>
            {prayer.title}
          </h1>
          {prayer.latinTitle && (
            <p style={{ margin: '6px 0 0', fontStyle: 'italic', color: 'var(--color-subtle)', fontSize: '0.95rem' }}>
              {prayer.latinTitle}
            </p>
          )}
        </header>

        <div
          style={{
            whiteSpace: 'pre-line',
            fontSize: '1.08rem',
            lineHeight: 1.95,
            color: 'var(--color-dark)',
            backgroundColor: 'var(--color-card-bg)',
            border: '1px solid var(--color-border-subtle)',
            borderLeft: '4px solid var(--color-red)',
            borderRadius: '10px',
            padding: '20px 22px'
          }}
        >
          {prayer.content}
        </div>

        {prayer.note && (
          <p style={{ marginTop: '14px', fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--color-subtle)', lineHeight: 1.6 }}>
            {prayer.note}
          </p>
        )}

        {related.length > 0 && (
          <section style={{ marginTop: '34px' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-dark)', display: 'flex', alignItems: 'center', gap: '7px', margin: '0 0 12px' }}>
              <BookOpen size={18} /> Kinh cùng nhóm {cat?.label}
            </h2>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '8px' }}>
              {related.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/kinh-nguyen/${p.id}`}
                    style={{
                      display: 'block', padding: '11px 14px', borderRadius: '8px',
                      border: '1px solid var(--color-border-subtle)', backgroundColor: 'var(--color-card-bg)',
                      color: 'var(--color-dark)', textDecoration: 'none', fontWeight: 600, fontSize: '0.94rem'
                    }}
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
}
