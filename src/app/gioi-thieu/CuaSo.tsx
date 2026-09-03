'use client';

/**
 * Hai cửa sổ dùng chung cho cả bộ trang khảo cứu: xem lý lịch một nhân vật và
 * phóng to một tấm ảnh tư liệu. Tách riêng để bốn trang con cùng dùng mà không
 * phải chép lại.
 */

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Award, BookOpen, Church, Cross, Calendar, MapPin, Users, Bookmark, ScrollText, Quote, Library, Maximize2, AlertTriangle, ShieldCheck, HelpCircle, Scale } from 'lucide-react';
import { DetailedBioRecord, PortraitFrame, TuDienRecord } from './duLieu';

/**
 * Nhãn ở đầu cửa sổ đổi theo loại nhân vật: cùng một cửa sổ dùng cho Đức Giám
 * mục, cha sở, cha tuyên uý lẫn huynh trưởng, nên không thể ghi cứng một nhãn.
 */
function nhanHoSo(bio: DetailedBioRecord): string {
  const id = bio.id;
  if (id.startsWith('bdh-') || id.startsWith('so-')) return 'TIỂU SỬ HUYNH TRƯỞNG ĐOÀN';
  if (id.startsWith('tuyen-uy-')) return 'TIỂU SỬ CHA TUYÊN UÝ XỨ ĐOÀN';
  if (id.startsWith('cha-')) {
    const roleLow = bio.role.toLowerCase();
    if (roleLow.includes('chánh sở') || roleLow.includes('chánh xứ') || roleLow.includes('quản xứ')) {
      return 'TIỂU SỬ LINH MỤC CHÁNH SỞ';
    }
    if (roleLow.includes('tử đạo')) {
      return 'TIỂU SỬ THÁNH TỬ ĐẠO';
    }
    return 'TIỂU SỬ LINH MỤC';
  }
  if (id.startsWith('duc-cha-') || id.startsWith('dgm-') || id.startsWith('gh-')) return 'TIỂU SỬ HÀNG GIÁO PHẨM CÔNG GIÁO';
  return 'TIỂU SỬ NHÂN VẬT';
}

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
        className="history-modal"
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
          className="history-modal-hero"
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
              <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-red)', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                {nhanHoSo(bio)}
              </h3>
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
            {bio.nghe && (
              <div style={{ gridColumn: '1 / -1' }}>
                <strong>Nghề nghiệp / Học vấn:</strong> {bio.nghe}
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

          {/* Dấu ấn và di sản — đặt trên cùng, đọc như phần mở đầu một mục từ */}
          {bio.milestones.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 8px', fontSize: '0.96rem', fontWeight: 800, color: 'var(--color-red)' }}>
                {bio.chronology.length === 0 ? 'Hành trình phục vụ & Dấu ấn để lại' : 'Dấu ấn lịch sử & Di sản để lại'}
              </h4>
              <div style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.8, color: 'var(--color-dark)', textAlign: 'justify' }}>
                {bio.milestones.map((m, i) => (
                  <p key={i} style={{ margin: i === bio.milestones.length - 1 ? 0 : '0 0 10px' }}>
                    {m}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Quá trình phục vụ theo thời gian — ẩn khi đã gộp vào phần văn xuôi ở trên */}
          {bio.chronology.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ margin: '0 0 12px', fontSize: '0.96rem', fontWeight: 800, color: 'var(--color-red)' }}>
              {bio.priestOrdination || bio.bishopConsecration ? 'Quá trình tu học và Sứ vụ mục tử' : 'Quá trình phục vụ'}
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

          )}

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

export function CuaSoTuDien({ tuDien, onClose }: { tuDien: TuDienRecord | null; onClose: () => void }) {
  const [zoomImage, setZoomImage] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<{ src: string; caption: string } | null>(null);

  if (!tuDien) return null;
  
  const Icon = tuDien.type === 'Vua' ? Award :
               tuDien.type === 'Địa danh' ? MapPin :
               tuDien.type === 'Sự kiện' ? Calendar :
               tuDien.type === 'Tông sắc' ? ScrollText : BookOpen;
               
  return (
    <div
      onClick={() => onClose()}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100020,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.25s ease-out'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: '24px',
          border: '1px solid rgba(153, 27, 27, 0.2)', // subtle red border for history
          boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          animation: 'slideUp 0.3s ease-out'
        }}
      >
        {/* Header section with Image Background or Solid Color */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: tuDien.image ? '280px' : '140px',
            backgroundColor: 'var(--color-dark)',
            flexShrink: 0,
            overflow: 'hidden'
          }}
        >
          {tuDien.image && (
            <>
              {/* Blurred Background for Aesthetics */}
              <img
                src={tuDien.image}
                alt=""
                style={{
                  position: 'absolute',
                  top: '-10%',
                  left: '-10%',
                  width: '120%',
                  height: '120%',
                  objectFit: 'cover',
                  filter: 'blur(20px)',
                  opacity: 0.4
                }}
                aria-hidden="true"
              />
              {/* Foreground Image - Uncropped */}
              <img
                src={tuDien.image}
                alt={tuDien.imageCaption || tuDien.name}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  display: 'block',
                  zIndex: 1
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.style.backgroundColor = 'var(--color-red)';
                }}
              />
            </>
          )}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              background: tuDien.image 
                ? 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 100%)'
                : 'linear-gradient(135deg, rgba(153,27,27,1) 0%, rgba(80,10,10,1) 100%)'
            }}
          />
          
          <button
            onClick={() => onClose()}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              backdropFilter: 'blur(4px)'
            }}
          >
            <X size={18} />
          </button>

          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '24px',
              right: '24px',
              zIndex: 5
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    backgroundColor: tuDien.image ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: '#FFF',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    marginBottom: '8px',
                    backdropFilter: 'blur(4px)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em'
                  }}
                >
                  <Icon size={12} /> {tuDien.type}
                </div>
                {tuDien.doTinCay && (
                  <div
                    title="Mức độ chắc chắn của sử liệu"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      padding: '4px 10px', borderRadius: '8px', marginLeft: '6px',
                      backgroundColor: tuDien.doTinCay === 'Có văn khố' ? 'rgba(21, 128, 61, 0.85)'
                        : tuDien.doTinCay === 'Đang tranh luận' ? 'rgba(180, 83, 9, 0.85)'
                        : 'rgba(71, 85, 105, 0.85)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: '#FFF', fontSize: '0.72rem', fontWeight: 700,
                      backdropFilter: 'blur(4px)', letterSpacing: '0.01em'
                    }}
                  >
                    {tuDien.doTinCay === 'Có văn khố' ? <ShieldCheck size={12} />
                      : tuDien.doTinCay === 'Đang tranh luận' ? <Scale size={12} />
                      : <HelpCircle size={12} />}
                    {tuDien.doTinCay}
                  </div>
                )}
                <h2
                  style={{
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    color: '#FFF',
                    margin: 0,
                    textShadow: tuDien.image ? '0 2px 4px rgba(0,0,0,0.8)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    lineHeight: 1.2
                  }}
                >
                  {tuDien.name}
                </h2>
                {tuDien.altName && (
                  <p style={{ margin: '4px 0 0', fontSize: '0.8rem', fontStyle: 'italic', color: tuDien.image ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                    {tuDien.altName}
                  </p>
                )}
                {tuDien.period && (
                  <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: tuDien.image ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
                    {tuDien.period}
                  </p>
                )}
              </div>
              
              {tuDien.image && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedGalleryImage({ src: tuDien.image!, caption: tuDien.imageCaption || tuDien.name });
                    setZoomImage(true);
                  }}
                  title="Xem ảnh gốc"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    color: '#FFF',
                    cursor: 'pointer',
                    flexShrink: 0,
                    marginTop: '24px'
                  }}
                >
                  <Maximize2 size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="history-modal-body" style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ 
              fontSize: '1.1rem', 
              fontWeight: 800, 
              color: 'var(--color-red)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              marginBottom: '12px',
              borderBottom: '1px solid var(--color-border-subtle)',
              paddingBottom: '8px'
            }}>
              <BookOpen size={18} /> Chi tiết lịch sử
            </h3>
            <div style={{
              fontSize: '0.95rem',
              lineHeight: 1.65,
              color: 'var(--color-dark)',
              opacity: 0.9,
              whiteSpace: 'pre-line'
            }}>
              {tuDien.description}
            </div>
          </div>

          {tuDien.gallery && tuDien.gallery.length > 0 && (
            <section style={{ marginBottom: '24px' }} aria-label={`Thư viện tư liệu của ${tuDien.name}`}>
              <h3 style={{
                fontSize: '1.05rem',
                fontWeight: 800,
                color: 'var(--color-red)',
                margin: '0 0 12px',
                paddingBottom: '8px',
                borderBottom: '1px solid var(--color-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <BookOpen size={18} /> Thư viện tư liệu ({tuDien.gallery.length})
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '10px'
              }}>
                {tuDien.gallery.map((item, index) => (
                  <button
                    key={`${item.src}-${index}`}
                    type="button"
                    onClick={() => {
                      setSelectedGalleryImage(item);
                      setZoomImage(false);
                      window.setTimeout(() => setZoomImage(true), 0);
                    }}
                    title={item.caption}
                    style={{
                      position: 'relative',
                      minWidth: 0,
                      aspectRatio: '4 / 3',
                      padding: 0,
                      border: '1px solid var(--color-border-subtle)',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: 'var(--color-input-bg)',
                      cursor: 'zoom-in'
                    }}
                  >
                    <img
                      src={item.src}
                      alt={item.caption}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      padding: '5px 6px',
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.78))',
                      color: '#FFF',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      textAlign: 'left'
                    }}>
                      Tư liệu {index + 1}
                    </span>
                  </button>
                ))}
              </div>
              <p style={{ margin: '10px 0 0', fontSize: '0.75rem', color: 'var(--color-subtle)', fontStyle: 'italic' }}>
                Chọn một ảnh để xem lớn và đọc chú thích nguồn bên dưới ảnh.
              </p>
            </section>
          )}

          {tuDien.quote && (
            <blockquote style={{
              margin: '0 0 20px',
              padding: '14px 16px 14px 18px',
              borderLeft: '3px solid var(--color-red)',
              backgroundColor: 'rgba(153, 27, 27, 0.05)',
              borderRadius: '0 12px 12px 0'
            }}>
              <Quote size={14} color="var(--color-red)" style={{ marginBottom: '4px' }} />
              <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.6, fontStyle: 'italic', color: 'var(--color-dark)' }}>
                {tuDien.quote}
              </p>
              {tuDien.quoteSource && (
                <p style={{ margin: '8px 0 0', fontSize: '0.75rem', color: 'var(--color-subtle)' }}>
                  — {tuDien.quoteSource}
                </p>
              )}
            </blockquote>
          )}

          {tuDien.sections && tuDien.sections.length > 0 && (
            <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {tuDien.sections.map((sec, i) => (
                <div key={i}>
                  <h4 style={{
                    margin: '0 0 6px', fontSize: '0.88rem', fontWeight: 800,
                    color: 'var(--color-dark)', display: 'flex', alignItems: 'center', gap: '6px'
                  }}>
                    <span style={{ width: '4px', height: '14px', borderRadius: '2px', backgroundColor: 'var(--color-red)', flexShrink: 0 }} />
                    {sec.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.68, color: 'var(--color-dark)', opacity: 0.9, textAlign: 'justify' }}>
                    {sec.body}
                  </p>
                </div>
              ))}
            </div>
          )}

          {tuDien.gocKhuat && tuDien.gocKhuat.length > 0 && (
            <div style={{
              marginBottom: '20px', padding: '16px', borderRadius: '12px',
              border: '1px solid rgba(180, 83, 9, 0.28)', backgroundColor: 'rgba(180, 83, 9, 0.06)'
            }}>
              <h3 style={{
                margin: '0 0 4px', fontSize: '0.9rem', fontWeight: 800, color: '#b45309',
                display: 'flex', alignItems: 'center', gap: '6px'
              }}>
                <AlertTriangle size={15} /> Góc khuất &amp; điều còn tranh luận
              </h3>
              <p style={{ margin: '0 0 12px', fontSize: '0.74rem', color: 'var(--color-subtle)', fontStyle: 'italic' }}>
                Phần này ghi lại những điều các trang sử đạo thường bỏ qua, và những chỗ sử liệu còn mâu thuẫn.
                Ghi ra không phải để hạ bệ ai, mà vì một trang khảo cứu tử tế phải nói cả hai phía.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {tuDien.gocKhuat.map((g, i) => (
                  <div key={i}>
                    <h4 style={{ margin: '0 0 4px', fontSize: '0.86rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                      {g.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.68, color: 'var(--color-dark)', opacity: 0.92, textAlign: 'justify' }}>
                      {g.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {tuDien.source && (
            <div style={{ 
              backgroundColor: 'var(--color-input-bg)', 
              borderRadius: '12px', 
              padding: '16px',
              border: '1px solid var(--color-border-subtle)'
            }}>
              <h3 style={{ 
                fontSize: '0.9rem', 
                fontWeight: 800, 
                color: 'var(--color-dark)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px',
                margin: '0'
              }}>
                <Bookmark size={14} color="var(--color-subtle)" /> Nguồn tham chiếu: <span style={{ color: 'var(--color-red)', fontWeight: 600 }}>{tuDien.source}</span>
              </h3>
            </div>
          )}

          {tuDien.refs && tuDien.refs.length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <h3 style={{
                fontSize: '0.82rem',
                fontWeight: 800,
                color: 'var(--color-dark)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                margin: '0 0 8px',
                textTransform: 'uppercase',
                letterSpacing: '0.02em'
              }}>
                <Library size={14} color="var(--color-red)" /> Thư mục đối chiếu
              </h3>
              <ol style={{
                margin: 0,
                paddingLeft: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                fontSize: '0.78rem',
                lineHeight: 1.6,
                color: 'var(--color-subtle)'
              }}>
                {tuDien.refs.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ol>
            </div>
          )}

          {tuDien.imageCaption && (
            <div style={{
              textAlign: 'center',
              marginTop: '20px',
              fontSize: '0.75rem',
              color: 'var(--color-subtle)',
              fontStyle: 'italic'
            }}>
              * Ảnh minh họa: {tuDien.imageCaption}
            </div>
          )}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}} />
      
      {zoomImage && tuDien.image && (
        <CuaSoAnh 
          anh={selectedGalleryImage || { src: tuDien.image, caption: tuDien.imageCaption || tuDien.name }}
          onClose={() => {
            setZoomImage(false);
            setSelectedGalleryImage(null);
          }}
        />
      )}
    </div>
  );
}
