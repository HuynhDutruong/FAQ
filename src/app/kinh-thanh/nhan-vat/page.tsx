'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, User, X, Shield } from 'lucide-react';
import { BIBLE_CHARACTERS, BibleCharacter } from '@/lib/bible/bibleCharacters';
import { removeAccents } from '@/lib/textUtils';
import CharacterProfileModal from '@/components/CharacterProfileModal';

export default function BibleCharactersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCharacter, setActiveCharacter] = useState<BibleCharacter | null>(null);

  // Filter characters based on search
  const filteredCharacters = useMemo(() => {
    if (!searchQuery.trim()) return BIBLE_CHARACTERS;
    
    const q = removeAccents(searchQuery.trim().toLowerCase());
    return BIBLE_CHARACTERS.filter((c) => {
      const nameMatch = removeAccents(c.name.toLowerCase()).includes(q);
      const aliasMatch = c.aliases.some(a => removeAccents(a.toLowerCase()).includes(q));
      const roleMatch = removeAccents(c.role.toLowerCase()).includes(q);
      return nameMatch || aliasMatch || roleMatch;
    });
  }, [searchQuery]);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      {/* HEADER HERO */}
      <header
        style={{
          position: 'relative',
          backgroundImage: 'linear-gradient(180deg, rgba(15, 8, 8, 0.85) 0%, rgba(45, 15, 15, 0.75) 50%, rgba(15, 8, 8, 0.95) 100%), url("/images/bible/creation_of_adam.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          color: '#FFFFFF',
          padding: '20px 14px 26px',
          borderBottom: '1px solid rgba(217, 119, 6, 0.35)',
          boxShadow: 'inset 0 -12px 28px rgba(0,0,0,0.5)'
        }}
      >
        <div style={{ maxWidth: '1140px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Link
              href="/kinh-thanh"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.5)',
                color: '#FFFFFF',
                border: '1px solid rgba(253, 230, 138, 0.3)',
                backdropFilter: 'blur(6px)',
                textDecoration: 'none',
                flexShrink: 0
              }}
              title="Về Trang Kinh Thánh"
            >
              <ArrowLeft size={16} />
            </Link>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                color: '#FDE68A',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              <Link href="/kinh-thanh" style={{ color: '#FDE68A', textDecoration: 'none', opacity: 0.9 }}>
                Kinh Thánh
              </Link>
              <span>/</span>
              <span style={{ fontWeight: 700, color: '#FFFFFF' }}>Từ Điển Nhân Vật</span>
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 800,
                color: '#FDE68A',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '3px'
              }}
            >
              LỊCH SỬ CỨU ĐỘ
            </div>
            <h1
              style={{
                fontSize: 'clamp(1.25rem, 4.2vw, 1.85rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                margin: 0,
                color: '#FFFFFF',
                lineHeight: 1.25,
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
              }}
            >
              Từ Điển Nhân Vật
            </h1>
            <p
              style={{
                margin: '6px 0 0',
                fontSize: '0.84rem',
                color: '#E2E8F0',
                lineHeight: 1.45,
                maxWidth: '760px',
                opacity: 0.95
              }}
            >
              Khám phá chi tiết lịch sử, tiểu sử và vai trò của các vị Vua, Ngôn sứ và những nhân vật nổi bật trong Kinh Thánh Công Giáo.
            </p>
          </div>
        </div>
      </header>

      {/* SEARCH SECTION */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          backgroundColor: 'var(--color-card-bg)',
          borderBottom: '1px solid var(--color-border-subtle)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          padding: '12px 16px'
        }}
      >
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ position: 'relative' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-subtle)'
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm nhân vật (VD: Đa-vít, Sa-lô-môn, Vua...)"
              style={{
                width: '100%',
                padding: '12px 38px 12px 42px',
                borderRadius: '12px',
                border: '1px solid var(--color-input-border)',
                backgroundColor: 'var(--color-input-bg)',
                color: 'var(--color-input-text)',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.02)'
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-subtle)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CHARACTER LIST */}
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '24px 16px 64px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-dark)' }}>
            Danh Sách ({filteredCharacters.length} Nhân vật)
          </div>
        </div>

        {filteredCharacters.length === 0 ? (
          <div
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: '16px',
              border: '1px dashed var(--color-border-subtle)'
            }}
          >
            <User size={48} color="var(--color-subtle)" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-dark)', margin: '0 0 6px' }}>
              Không tìm thấy nhân vật nào
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-subtle)' }}>
              Hãy thử tìm với tên khác hoặc từ khóa khác.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px'
            }}
          >
            {filteredCharacters.map((character) => (
              <div
                key={character.id}
                onClick={() => setActiveCharacter(character)}
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  borderRadius: '16px',
                  border: '1px solid var(--color-border-subtle)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                }}
              >
                {/* Thumbnail */}
                <div style={{ position: 'relative', width: '100%', height: '180px', backgroundColor: '#222' }}>
                  <img
                    src={character.imageUrl}
                    alt={character.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)'
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    right: '12px'
                  }}>
                    <div style={{ 
                      display: 'inline-block',
                      fontSize: '0.65rem', 
                      fontWeight: 700, 
                      color: '#FDE68A',
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      marginBottom: '4px',
                      backdropFilter: 'blur(4px)'
                    }}>
                      {character.role}
                    </div>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#FFF' }}>
                      {character.name}
                    </h3>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <p style={{
                    fontSize: '0.82rem',
                    color: 'var(--color-subtle)',
                    margin: 0,
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {character.shortSummary}
                  </p>
                  
                  <div style={{
                    marginTop: 'auto',
                    paddingTop: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid var(--color-border-subtle)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'var(--color-red)'
                  }}>
                    <span>Xem chi tiết hồ sơ</span>
                    <Shield size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      <CharacterProfileModal
        character={activeCharacter}
        onClose={() => setActiveCharacter(null)}
      />
    </main>
  );
}
