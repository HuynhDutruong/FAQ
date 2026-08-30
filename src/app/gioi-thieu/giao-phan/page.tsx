'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin, Church, Landmark, Crown, Award, Users, BookOpen, Cross, Eye, Calendar, Clock, ScrollText, Star
} from 'lucide-react';
import KhungTrang from '../KhungTrang';
import { CuaSoLyLich, CuaSoAnh } from '../CuaSo';
import {
  BISHOPS_EXTENDED_DATA,
  PRE1960_ORDINARIES,
  PortraitFrame
} from '../duLieu';
import type { DetailedBioRecord } from '../duLieu';

export default function Trang() {
  const [lyLich, setLyLich] = useState<DetailedBioRecord | null>(null);
  const [anh, setAnh] = useState<{ src: string; caption: string } | null>(null);
  const moLyLich = (b: DetailedBioRecord | null) => setLyLich(b);
  const moAnh = (a: { src: string; caption: string } | null) => setAnh(a);

  return (
    <KhungTrang tieuDe="Giáo Phận Mỹ Tho" phuDe="Từ thời Địa phận Tây Đàng Trong với chín Đấng Bản Quyền, qua ngày tách khỏi Sài Gòn năm 1960, đến năm đời Giám mục Chính tòa hôm nay." duongDan="/gioi-thieu/giao-phan">
        <section id="giao-phan" style={{ marginBottom: '36px' }}>
          <h2
            style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              color: 'var(--color-dark)',
              borderBottom: '1px solid var(--color-border-subtle)',
              paddingBottom: '6px',
              marginTop: '32px'
            }}
          >
            2. Giáo Phận Mỹ Tho — Cơ cấu &amp; Các Đời Giám Mục
          </h2>

          <h3 id="giao-phan-truoc-1960" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '26px 0 10px' }}>
            2.1. Thời kỳ Địa phận Tây Đàng Trong (1844 – 1960)
          </h3>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
            Giáo phận Mỹ Tho chỉ ra đời ngày <strong>24/11/1960</strong>. Trước đó, suốt hơn một thế kỷ, họ đạo Mỹ Tho
            thuộc quyền <strong>Địa phận Tây Đàng Trong</strong> — về sau gọi là Sài Gòn. Chín vị Đại diện Tông toà kế
            tiếp nhau từ năm 1844 đến 1960 chính là các Đấng Bản Quyền của họ đạo trong suốt thời kỳ ấy: các ngài đặt
            viên đá, làm phép nhà thờ, và cử từng cha sở về Mỹ Tho. <em>Nhấn vào từng vị để xem lý lịch đầy đủ.</em>
          </p>

          <div style={{ display: 'grid', gap: '12px', marginBottom: '18px' }}>
            {PRE1960_ORDINARIES.map((b, idx) => (
              <button
                key={b.id}
                type="button"
                onClick={() => moLyLich(b)}
                aria-label={`Xem lý lịch ${b.name}`}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid var(--color-border-subtle)',
                  backgroundColor: 'var(--color-card-bg)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  width: '100%',
                  font: 'inherit',
                  color: 'inherit'
                }}
              >
                <PortraitFrame src={b.image} name={b.name} width={78} height={104} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--color-red)' }}>
                    {idx + 1}. {b.name}
                    {b.saintName.startsWith('Cố') && (
                      <span style={{ color: 'var(--color-subtle)', fontWeight: 600 }}> ({b.saintName})</span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-dark)', margin: '2px 0 6px' }}>
                    {b.role}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--color-subtle)', textAlign: 'justify' }}>
                    {b.shortDesc}
                  </p>
                  <div style={{ marginTop: '6px', fontSize: '0.76rem', fontWeight: 700, color: 'var(--color-red)' }}>
                    Nhấn để xem lý lịch đầy đủ →
                  </div>
                </div>
              </button>
            ))}
          </div>

          <p style={{ fontSize: '0.82rem', fontStyle: 'italic', color: 'var(--color-subtle)', margin: 0, lineHeight: 1.65 }}>
            Chân dung sáu vị Miche, Colombert, Dépierre, Mossard, Quinton và Cassaigne lấy từ văn khố Hội Thừa Sai
            Paris (IRFA), mã hồ sơ ghi kèm từng vị; chân dung Đức cha Lefebvre và Đức cha Dumortier do Giáo xứ cung cấp.
            Chân dung Đức cha Simon Hòa Nguyễn Văn Hiền cũng do Giáo xứ cung cấp. Nay đủ chân dung cả chín vị Đấng Bản
            Quyền của họ đạo Mỹ Tho từ năm 1844 đến 1960.
          </p>
          <h3 id="giao-phan-thanh-lap" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '26px 0 10px' }}>
            2.2. Tách Khỏi Sài Gòn &amp; Khai Sinh Giáo Phận Mỹ Tho (1960)
          </h3>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
            Ngày <strong>24 tháng 11 năm 1960</strong>, Thánh Giáo hoàng Gioan XXIII ban hành Tông hiến{' '}
            <em>Venerabilium Nostrorum</em>, thiết lập Hàng Giáo Phẩm Công Giáo Việt Nam. Địa phận Tây Đàng Trong —
            lúc này mang tên Sài Gòn — được nâng lên hàng Tổng Giáo phận, đồng thời <strong>bốn tỉnh Định Tường, Long
            An, Kiến Tường và Kiến Phong được tách ra</strong> để lập thành một giáo phận mới: <strong>Giáo phận Mỹ
            Tho</strong> (<em>Dioecesis Mythoensis</em>). Việc phân định địa giới cụ thể được ấn định bằng Sắc chỉ{' '}
            <em>Quod Venerabiles Fratres</em> ngày 27/11/1960.
          </p>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
            Cùng văn kiện ấy, ngôi thánh đường Cha Renier xây năm 1906 – 1910 được nâng lên thành{' '}
            <strong>Nhà thờ Chính Tòa Mỹ Tho</strong>, tước hiệu <strong>Đức Mẹ Vô Nhiễm Nguyên Tội</strong>. Sau gần
            một trăm năm là một họ đạo trong địa hạt rộng lớn của Tây Đàng Trong, Mỹ Tho trở thành nhà thờ mẹ của cả
            một giáo phận. Vị Giám mục Tiên khởi được bổ nhiệm là <strong>Đức cha Giuse Trần Văn Thiện</strong>.
          </p>
          <figure style={{ margin: '0 0 14px' }}>
            <button
              type="button"
              className="tntt-thumb-btn"
              style={{ width: '100%', maxWidth: '620px', display: 'block' }}
              onClick={() =>
                moAnh({
                  src: '/images/lichsu_sac_chi_mytho_1960.jpg',
                  caption:
                    'Sắc chỉ Quod Venerabiles Fratres khai sinh Giáo phận Mỹ Tho, đăng nguyên văn trong Công báo Toà Thánh Acta Apostolicae Sedis, tập 53 (1961), trang 474.'
                })
              }
              aria-label="Phóng to ảnh chụp sắc chỉ khai sinh Giáo phận Mỹ Tho"
            >
              <Image
                src="/images/lichsu_sac_chi_mytho_1960.jpg"
                alt="Sắc chỉ Quod Venerabiles Fratres khai sinh Giáo phận Mỹ Tho, Công báo Toà Thánh 1961 trang 474"
                width={1000}
                height={608}
                sizes="(max-width: 640px) 92vw, 620px"
                style={{ width: '100%', height: 'auto', borderRadius: '8px', border: '1px solid var(--color-border-subtle)' }}
              />
            </button>
            <figcaption style={{ fontSize: '0.8rem', color: 'var(--color-subtle)', lineHeight: 1.65, marginTop: '8px', textAlign: 'justify' }}>
              <strong>Nguyên văn sắc chỉ khai sinh Giáo phận Mỹ Tho.</strong> Ảnh chụp trang 474 Công báo Toà Thánh{' '}
              <em>Acta Apostolicae Sedis</em>, tập 53 (1961). Tiêu đề ghi{' '}
              <strong>&ldquo;SAIGONENSIS - KONTUMENSIS (MYTHOÊNSIS - DALATENSIS)&rdquo;</strong> và dòng tóm tắt bằng
              tiếng Latinh: <em>&ldquo;Diviso territorio archidioecesium Saigonensis et Kontumensis, novae conduntur
              dioeceses «Mythoënsis» et «Dalatensis» appellandae&rdquo;</em> — <strong>Chia lãnh thổ hai tổng giáo phận
              Sài Gòn và Kontum, lập các giáo phận mới mang tên &laquo;Mỹ Tho&raquo; và &laquo;Đà Lạt&raquo;.</strong>{' '}
              Văn kiện mở đầu bằng chính hai chữ <em>Quod venerabiles</em> — theo lệ Toà Thánh, mấy chữ đầu tiên trở
              thành tên gọi của sắc chỉ. Bản ký tại Rôma, đền thờ Thánh Phêrô, ngày 27/11/1960.
            </figcaption>
          </figure>

          <p style={{ fontSize: '0.86rem', lineHeight: 1.7, textAlign: 'justify', margin: 0, color: 'var(--color-subtle)', fontStyle: 'italic' }}>
            Toàn văn năm quyết định của Tông hiến và diễn tiến nghi thức nâng lên Chính Tòa được trình bày chi tiết ở
            mục 3.3, phần Giáo Xứ Chánh Tòa.
          </p>

          <h3 id="giao-phan-cac-giam-muc" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '26px 0 10px' }}>
            2.3. Các Đời Giám Mục Giáo Phận Mỹ Tho (1960 – nay)
          </h3>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
            Từ ngày khai sinh năm 1960 đến nay, Giáo phận Mỹ Tho đã trải qua <strong>5 đời Giám mục</strong>.
            <em> Nhấp vào từng vị để xem toàn văn tiểu sử, chức vụ và công trình.</em>
          </p>

          {/* Ảnh Linh mục đoàn & Thánh lễ đồng tế */}
          <div
            className="responsive-grid"
          >
            <div
              style={{
                backgroundColor: 'var(--color-card-bg)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: '12px',
                padding: '10px',
                cursor: 'pointer',
                boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
              }}
              onClick={() => moAnh({ src: '/images/linh_muc_doan_my_tho.jpg', caption: 'Linh mục đoàn Giáo phận Mỹ Tho cùng Đức Giám mục trong Thánh lễ Truyền Dầu.' })}
            >
              <div style={{ position: 'relative', width: '100%', height: '150px', borderRadius: '8px', overflow: 'hidden', marginBottom: '6px' }}>
                <Image src="/images/linh_muc_doan_my_tho.jpg" alt="Linh Mục Đoàn Mỹ Tho" fill sizes="240px" style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.84rem', color: 'var(--color-dark)' }}>Linh Mục Đoàn Giáo Phận Mỹ Tho</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--color-subtle)' }}>Đồng tâm phụng sự cùng Đức Giám mục Chính tòa</div>
            </div>

            <div
              style={{
                backgroundColor: 'var(--color-card-bg)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: '12px',
                padding: '10px',
                cursor: 'pointer',
                boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
              }}
              onClick={() => moAnh({ src: '/images/nhatho_thanh_le.jpg', caption: 'Thánh lễ đồng tế đại triều tại Cung thánh Nhà thờ Chính Tòa Mỹ Tho.' })}
            >
              <div style={{ position: 'relative', width: '100%', height: '150px', borderRadius: '8px', overflow: 'hidden', marginBottom: '6px' }}>
                <Image src="/images/nhatho_thanh_le.jpg" alt="Thánh Lễ Đồng Tế" fill sizes="240px" style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.84rem', color: 'var(--color-dark)' }}>Thánh Lễ Đại Triều Tại Chánh Tòa</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--color-subtle)' }}>Cử hành phụng vụ trọng thể Năm Thánh</div>
            </div>
          </div>

          <p style={{ fontSize: '0.95rem', lineHeight: 1.75, margin: '0 0 18px', textAlign: 'justify' }}>
          </p>

          {/* DANH SÁCH GIÁM MỤC VỚI KHUNG ẢNH ĐỨNG CHUẨN KHÔNG BỊ CẮT ĐẦU */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {BISHOPS_EXTENDED_DATA.map((b) => (
              <div
                key={b.id}
                onClick={() => moLyLich(b)}
                style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                className="bishop-card-hover"
              >
                {/* Khung ảnh chân dung dọc (Aspect Ratio 3:4) */}
                <PortraitFrame src={b.image} name={b.name} width={85} height={110} />

                <div style={{ flex: '1 1 220px', minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                    <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                      {b.name}
                    </h4>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        backgroundColor: 'rgba(153, 27, 27, 0.08)',
                        color: 'var(--color-red)',
                        padding: '2px 10px',
                        borderRadius: '20px',
                        border: '1px solid rgba(153, 27, 27, 0.15)'
                      }}
                    >
                      {b.period}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-red)', margin: '3px 0 4px' }}>
                    {b.role}
                  </div>

                  <div style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--color-subtle)', marginBottom: '6px' }}>
                    Khẩu hiệu: <strong style={{ color: 'var(--color-dark)' }}>{b.motto}</strong>
                  </div>

                  <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--color-subtle)', lineHeight: 1.5, textAlign: 'justify' }}>
                    {b.shortDesc}
                  </p>

                  <div
                    style={{
                      marginTop: '8px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.76rem',
                      fontWeight: 800,
                      color: 'var(--color-red)'
                    }}
                  >
                    <Eye size={13} />
                    <span>Xem toàn văn tiểu sử &amp; quá trình phục vụ ➔</span>
                  </div>
                </div>
              </div>
            ))}
          </div>



          <h3 id="giao-phan-anh-tu-lieu" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '26px 0 10px' }}>
            2.4. Ảnh Tư Liệu Giáo Phận Mỹ Tho
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--color-subtle)', margin: '0 0 14px', lineHeight: 1.7 }}>
            Những bức ảnh hiếm ghi lại hàng giáo sĩ Giáo phận Mỹ Tho từ ngày thành lập năm 1960.
          </p>

          <div className="tntt-gallery">
            {[
              {
                src: '/images/lichsu_ban_khac_ba_giong_1882.jpg',
                cap: 'Làng Ba Giồng năm 1882 — bản khắc in trên Les Missions Catholiques số 670 ngày 07/04/1882, chú thích gốc “Cochinchine — Village de Ba Giong”. Ba Giồng thuộc làng Tân Lý Đông, nơi 16 vị chức việc chịu tra tấn vì đức tin ba lần và là nơi Cha Phêrô Nguyễn Văn Lựu coi sóc trước khi bị bắt. Ngày nay đây là Trung tâm Hành hương của Giáo phận Mỹ Tho.'
              },
              {
                src: '/images/lichsu_sach_tu_dao_ba_giong_1882.jpg',
                cap: 'Trang bìa cuốn “Un épisode de la Persécution en Cochinchine — Martyre de vingt-sept Chrétiens”, Nhà in Pitrat Ainé, Lyon, 1882. Đây là bản in thành sách riêng bài tường thuật của thừa sai Théodule Hamon — vị từng học tiếng Việt và quyền coi họ đạo Mỹ Tho trước khi sang Ba Giồng. Cuốn sách kể cuộc tử đạo của Cha Phêrô Nguyễn Văn Lựu và của các giáo hữu Ba Giồng.'
              },
              {
                src: '/images/gpmt_linh_muc_doan_1961.jpg',
                cap: 'Linh mục đoàn Giáo phận Mỹ Tho năm 1961, một năm sau ngày giáo phận được thành lập. Ảnh mang chú thích gốc “DIOCESE DE MYTHO 1961” và ghi tên từng vị ngay trên ảnh, trong đó có Đức Cha Thiện cùng Cha Niềm — vị sẽ làm Chánh sở Chánh Tòa từ năm 1965.'
              },
              {
                src: '/images/gpmt_tan_gm_nguyen_van_nam_1975.jpg',
                cap: 'Đức Cha Anrê Nguyễn Văn Nam trong năm được tấn phong Giám mục Phó Giáo phận Mỹ Tho (10/06/1975). Ảnh mang chú thích gốc viết tay “Tân GM. Andre Nam 1975”.'
              },
              {
                src: '/images/gpmt_giam_muc_kinh_ly.jpg',
                cap: 'Đức Cha Giuse Trần Văn Thiện — Giám mục Tiên khởi Giáo phận Mỹ Tho — đi thăm mục vụ giáo dân tại một họ đạo miền quê, có linh mục tháp tùng và cờ phướn giăng đón. Danh tính do Giáo xứ Chánh Tòa xác nhận.'
              }
            ].map((img) => (
              <figure key={img.src} className="tntt-figure">
                <button
                  type="button"
                  className="tntt-thumb-btn"
                  onClick={() => moAnh({ src: img.src, caption: img.cap })}
                  aria-label={`Phóng to: ${img.cap}`}
                >
                  <Image
                    src={img.src}
                    alt={img.cap}
                    width={640}
                    height={480}
                    sizes="(max-width: 520px) 46vw, 220px"
                    className="tntt-photo"
                  />
                  <span className="tntt-zoom" aria-hidden="true">
                    <Eye size={13} /> Xem
                  </span>
                </button>
                <figcaption className="tntt-caption">{img.cap}</figcaption>
              </figure>
            ))}
          </div>

          <p style={{ fontSize: '0.82rem', fontStyle: 'italic', color: 'var(--color-subtle)', margin: '0 0 6px', lineHeight: 1.6 }}>
            Hai tư liệu năm 1882 lấy từ bộ sưu tập số hoá của Thư viện Quốc gia Pháp (Gallica): bản khắc làng Ba Giồng
            — ark:/12148/bpt6k105622v, và trang bìa sách — ark:/12148/bpt6k58346217. Các ảnh còn lại do giáo xứ cung cấp;
            chú thích niên đại theo ghi chú gốc in trên ảnh, những gì ảnh không nói rõ thì ghi là chưa xác định.
          </p>
        </section>

      <CuaSoLyLich bio={lyLich} onClose={() => setLyLich(null)} />
      <CuaSoAnh anh={anh} onClose={() => setAnh(null)} />
    </KhungTrang>
  );
}
