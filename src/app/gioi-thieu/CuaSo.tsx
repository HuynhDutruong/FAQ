'use client';

/**
 * Hai cửa sổ dùng chung cho cả bộ trang khảo cứu: xem lý lịch một nhân vật và
 * phóng to một tấm ảnh tư liệu. Tách riêng để bốn trang con cùng dùng mà không
 * phải chép lại.
 */

import React from 'react';
import Image from 'next/image';
import { X, Award, BookOpen, Church, Cross, Calendar, MapPin, Users } from 'lucide-react';
import { DetailedBioRecord, PortraitFrame } from './duLieu';

export function CuaSoLyLich({ bio, onClose }: { bio: DetailedBioRecord | null; onClose: () => void }) {
  if (!bio) return null;
  return (

    <div
      onClick={() => onClose()}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100015,
        backgroundColor: 'rgba(5, 3, 2, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '660px',
          maxHeight: '90vh',
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: '16px',
          border: '1px solid var(--color-border-subtle)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        {/* Top Modal Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--color-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(153, 27, 27, 0.04)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cross size={18} color="var(--color-red)" />
            <div>
              <div style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--color-red)' }}>
                TIỂU SỬ HÀNG GIÁO PHẨM CÔNG GIÁO
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-subtle)' }}>
                Bản nghiên cứu lịch sử Giáo phận Mỹ Tho
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onClose()}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-dark)',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px' }}>
          {/* Header profile */}
          <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '20px' }}>
            {/* Ảnh chân dung đầy đủ không bị cắt đầu */}
            <PortraitFrame src={bio.image} name={bio.name} width={110} height={150} />

            <div style={{ flex: '1 1 240px', minWidth: 0 }}>
              <h3 style={{ margin: '0 0 4px', fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                {bio.name}
              </h3>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-red)', marginBottom: '4px' }}>
                {bio.role}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', marginBottom: '8px' }}>
                Tên Thánh: <strong>{bio.saintName}</strong> • {bio.period}
              </div>

              {bio.motto && (
                <div
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(153, 27, 27, 0.04)',
                    border: '1px solid var(--color-border-subtle)',
                    fontSize: '0.82rem',
                    fontStyle: 'italic',
                    color: 'var(--color-dark)'
                  }}
                >
                  Khẩu hiệu: <strong>{bio.motto}</strong>
                  {bio.mottoLatin && (
                    <span style={{ display: 'block', fontSize: '0.74rem', color: '#B45309' }}>
                      ({bio.mottoLatin})
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Thông tin trích ngang dạng bảng */}
          <div
            style={{
              backgroundColor: 'var(--color-input-bg)',
              borderRadius: '10px',
              padding: '12px 16px',
              marginBottom: '20px',
              fontSize: '0.82rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '8px 16px'
            }}
          >
            {bio.birth && (
              <div>
                <strong>Sinh ngày / Nơi sinh:</strong> {bio.birth}
              </div>
            )}
            {bio.origin && (
              <div>
                <strong>Gốc / Tổ chức:</strong> {bio.origin}
              </div>
            )}
            {bio.death && (
              <div>
                <strong>Qua đời / An nghỉ:</strong> {bio.death}
              </div>
            )}
            {bio.priestOrdination && (
              <div>
                <strong>Thụ phong Linh mục:</strong> {bio.priestOrdination}
              </div>
            )}
            {bio.bishopConsecration && (
              <div>
                <strong>Tấn phong Giám mục:</strong> {bio.bishopConsecration}
              </div>
            )}
            {bio.consecrator && (
              <div style={{ gridColumn: '1 / -1' }}>
                <strong>Giám mục Chủ phong:</strong> {bio.consecrator}
              </div>
            )}
          </div>

          {/* Quá trình phục vụ theo thời gian (Timeline) */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ margin: '0 0 12px', fontSize: '0.96rem', fontWeight: 800, color: 'var(--color-red)' }}>
              Quá trình tu học &amp; Sứ vụ mục tử
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {bio.chronology.map((c, i) => (
                <div
                  key={i}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '8px',
                    borderLeft: '3.5px solid var(--color-red)',
                    backgroundColor: 'var(--color-card-bg)',
                    border: '1px solid var(--color-border-subtle)',
                    borderLeftWidth: '3.5px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.86rem', color: 'var(--color-dark)' }}>
                      {c.title}
                    </span>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-red)' }}>
                      {c.time}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-subtle)', lineHeight: 1.5, textAlign: 'justify' }}>
                    {c.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Chức vụ — ẩn khi chưa có tư liệu */}
          {bio.offices && bio.offices.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <h4 style={{ margin: '0 0 8px', fontSize: '0.96rem', fontWeight: 800, color: 'var(--color-red)' }}>
                Chức vụ đã và đang đảm nhiệm
              </h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.82rem', lineHeight: 1.65, color: 'var(--color-dark)' }}>
                {bio.offices.map((o, i) => (
                  <li key={i} style={{ marginBottom: '3px' }}>{o}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Công trình nổi bật — ẩn hẳn khi chưa có tư liệu */}
          {bio.works && bio.works.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <h4 style={{ margin: '0 0 8px', fontSize: '0.96rem', fontWeight: 800, color: 'var(--color-red)' }}>
                Công trình nổi bật
              </h4>
              <div style={{ display: 'grid', gap: '8px' }}>
                {bio.works.map((w, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '9px',
                      border: '1px solid var(--color-border-subtle)',
                      backgroundColor: 'rgba(153, 27, 27, 0.03)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.86rem', color: 'var(--color-dark)', minWidth: 0 }}>
                        {w.name}
                        {w.now && (
                          <span
                            style={{
                              fontWeight: 600,
                              fontSize: '0.78rem',
                              color: 'var(--color-red)',
                              marginLeft: '6px',
                              whiteSpace: 'normal'
                            }}
                          >
                            → nay là: {w.now}
                          </span>
                        )}
                      </span>
                      <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-red)', flexShrink: 0 }}>
                        {w.time}
                      </span>
                    </div>
                    <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: 'var(--color-subtle)', lineHeight: 1.55, textAlign: 'justify' }}>
                      {w.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dấu ấn và di sản — ẩn khi chưa có tư liệu */}
          {bio.milestones.length > 0 && (
            <div>
              <h4 style={{ margin: '0 0 8px', fontSize: '0.96rem', fontWeight: 800, color: 'var(--color-red)' }}>
                Dấu ấn lịch sử &amp; Di sản để lại
              </h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--color-dark)' }}>
                {bio.milestones.map((m, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Modal Close */}
        <div
          style={{
            padding: '12px 20px',
            borderTop: '1px solid var(--color-border-subtle)',
            display: 'flex',
            justifyContent: 'flex-end',
            backgroundColor: 'var(--color-input-bg)'
          }}
        >
          <button
            type="button"
            onClick={() => onClose()}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              backgroundColor: 'var(--color-red)',
              color: '#FFF',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.84rem',
              cursor: 'pointer'
            }}
          >
            Đóng Cửa Sổ
          </button>
        </div>
      </div>
    </div>
  
  );
}

export function CuaSoAnh({
  anh,
  onClose
}: {
  anh: { src: string; caption: string } | null;
  onClose: () => void;
}) {
  if (!anh) return null;
  return (

    <div
      onClick={() => onClose()}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100010,
        backgroundColor: 'rgba(0,0,0,0.92)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <button
        onClick={() => onClose()}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          color: '#FFF',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <X size={24} />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '900px',
          width: '100%',
          maxHeight: '80vh',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '65vh' }}>
          <Image
            src={anh.src}
            alt="Phóng to"
            fill
            sizes="900px"
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div
          style={{
            color: '#FFF',
            marginTop: '12px',
            textAlign: 'center',
            fontSize: '0.9rem',
            fontStyle: 'italic'
          }}
        >
          {anh.caption}
        </div>
      </div>
    </div>
  
  );
}
