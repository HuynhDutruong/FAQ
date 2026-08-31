'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin, Church, Landmark, Crown, Award, Users, BookOpen, Cross, Eye, Calendar, Clock, ScrollText, Star
} from 'lucide-react';
import KhungTrang from '../KhungTrang';
import { CuaSoLyLich, CuaSoAnh } from '../CuaSo';
import MetaUpdater from '@/components/MetaUpdater';
import {
  ScarfIcon,
  TNTT_CHAPLAINS,
  TNTT_HUYNH_TRUONG,
  TNTT_NGANH,
  TRO_UY_BIOS,
  PortraitFrame,
  BDH_BIOS,
  ALL_COMMUNITY_BIOS,
  CHAPLAINS_EXTENDED_DATA
} from '../duLieu';
import type { DetailedBioRecord } from '../duLieu';

export default function Trang() {
  const [lyLich, setLyLich] = useState<DetailedBioRecord | null>(null);
  const [anh, setAnh] = useState<{ src: string; caption: string } | null>(null);

  const allBios = [...ALL_COMMUNITY_BIOS, ...BDH_BIOS, ...TRO_UY_BIOS, ...CHAPLAINS_EXTENDED_DATA];

  const moLyLich = (b: DetailedBioRecord | null) => {
    setLyLich(b);
    if (b) {
      const url = new URL(window.location.href);
      url.searchParams.set('bio', b.id);
      window.history.replaceState(null, '', url.toString());
    } else {
      const url = new URL(window.location.href);
      url.searchParams.delete('bio');
      window.history.replaceState(null, '', url.toString());
    }
  };

  const moAnh = (a: { src: string; caption: string } | null) => setAnh(a);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const bioId = params.get('bio');
    if (bioId) {
      const found = allBios.find(b => b.id === bioId);
      if (found) {
        setLyLich(found);
      }
    }
  }, []);

  return (
    <KhungTrang tieuDe="Xứ Đoàn Các Thánh Tử Đạo Việt Nam" phuDe="Bản chất và tôn chỉ Phong trào Thiếu Nhi Thánh Thể, hệ thống khăn quàng, mười đời cha tuyên uý và ngày tái lập Xứ Đoàn năm 2005." duongDan="/gioi-thieu/xu-doan">
        <section id="xu-doan" style={{ marginBottom: '36px' }}>

          <h3 id="xu-doan-ton-chi" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '18px 0 8px' }}>
            Bản chất, Mục đích &amp; Tôn chỉ Phong trào
          </h3>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 12px' }}>
            <strong>Thiếu Nhi Thánh Thể</strong> là một đoàn thể Công giáo tiến hành, một trường giáo dục chuyên biệt
            giúp thiếu nhi thăng tiến và thực hành sống đạo. Phong trào lấy tinh thần Đạo Binh Thánh Giá thời Trung cổ:
            thay vì bảo vệ thánh địa vật chất, Phong trào bảo vệ và tô điểm đền thờ thiêng liêng là tâm hồn các em, với
            vũ khí là <strong>Cầu Nguyện, Rước Lễ, Hy Sinh và Làm Tông Đồ</strong>.
          </p>
          <div style={{ display: 'grid', gap: '12px', margin: '0 0 16px' }}>
            {[
              {
                time: '1865 – 1929',
                title: 'Từ Hội Tông Đồ Cầu Nguyện đến Nghĩa Binh Thánh Thể',
                body: (
                  <>
                    Phong trào bắt nguồn từ Hội Tông Đồ Cầu Nguyện bên Pháp, do hai linh mục Léonard Cros và Henri
                    Ramière khởi xướng năm <strong>1865</strong>. Khi vào Việt Nam nhờ hai cha Léon Paliard và Paul Urureau,
                    tinh thần Thánh Thể ấy dần tìm được hình thức sinh hoạt phù hợp với thiếu nhi. Đến năm{' '}
                    <strong>1929</strong>, Phong trào mang tên <em>Nghĩa Binh Thánh Thể</em>.
                  </>
                )
              },
              {
                time: '1965 – 2003',
                title: 'Thiếu Nhi Thánh Thể Việt Nam và giai đoạn tái lập',
                body: (
                  <>
                    Năm <strong>1965</strong>, Phong trào đổi thành <em>Thiếu Nhi Thánh Thể Việt Nam</em> và đưa phương
                    pháp sinh hoạt trẻ vào như một phương cách giáo dục mới. Năm <strong>1971</strong>, tài liệu huấn luyện
                    được hoàn thiện; năm <strong>1975</strong>, Phong trào ngưng mọi hoạt động; đến năm <strong>2003</strong>
                    được tái lập cho phù hợp hoàn cảnh mới. Danh xưng và phương pháp thay đổi, nhưng bản chất vẫn là giáo
                    dục thiếu nhi về đức tin và hướng dẫn các em làm tông đồ.
                  </>
                )
              },
              {
                time: '2011 – 2015',
                title: 'Phong trào bén rễ tại Giáo phận Mỹ Tho',
                body: (
                  <>
                    Theo bài “Quá trình hình thành và phát triển của TNTT GP. Mỹ Tho”, Phong trào Thiếu Nhi Thánh Thể tại
                    Giáo phận Mỹ Tho bắt đầu hoạt động từ năm <strong>2011</strong>. Cha Tuyên Uý Liên đoàn đầu tiên là cha{' '}
                    <strong>Phêrô Nguyễn Ngọc Long</strong>, do Đức Giám mục <strong>Phaolô Bùi Văn Đọc</strong> bổ nhiệm.
                    Khoá huấn luyện Huynh Trưởng đầu tiên diễn ra từ ngày <strong>06/06 đến 10/06/2011</strong> tại Trung tâm
                    Mục vụ Giáo phận, với khoảng một trăm sa mạc sinh. Giai đoạn đầu, Mỹ Tho được các Huấn Luyện Viên thuộc
                    Liên đoàn Anrê Phú Yên — Giáo phận Sài Gòn nâng đỡ, rồi dần hình thành Liên đoàn Các Thánh Tử Đạo Việt
                    Nam — Giáo phận Mỹ Tho.
                  </>
                )
              },
              {
                time: '2012 – 2017',
                title: 'Sa mạc huấn luyện và sự hiệp thông với Xứ Đoàn Chánh Tòa',
                body: (
                  <>
                    Liên đoàn Mỹ Tho lớn lên qua các sa mạc huấn luyện: <strong>Vươn Lên 2</strong> năm 2012,{' '}
                    <strong>Vươn Lên 3</strong> năm 2013, <strong>Lên Đường 1</strong> năm 2014, rồi khoá huấn luyện Trợ Uý
                    đầu tiên cho quý dì Mến Thánh Giá Tân An năm 2015. Đến năm 2017, sa mạc <strong>Vươn Lên 4</strong> quy
                    tụ hơn 310 sa mạc sinh; Ban Chấp Hành mới của Liên đoàn ra mắt, và trưởng{' '}
                    <strong>Phêrô Lê Tấn Phải</strong> của Xứ Đoàn Chánh Tòa được bầu làm Chủ tịch Liên đoàn nhiệm kỳ 2017 –
                    2020. Từ đây có thể thấy sự hiệp thông rõ rệt: Xứ Đoàn Chánh Tòa vừa đón nhận đường hướng từ Liên đoàn,
                    vừa đóng góp nhân sự cho đời sống Phong trào của toàn Giáo phận Mỹ Tho.
                  </>
                )
              }
            ].map((moc) => (
              <div
                key={moc.time}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--color-border-subtle)',
                  backgroundColor: 'rgba(153, 27, 27, 0.035)',
                  display: 'grid',
                  gridTemplateColumns: '110px minmax(0, 1fr)',
                  gap: '12px'
                }}
              >
                <div style={{ color: 'var(--color-red)', fontWeight: 800, fontSize: '0.82rem' }}>{moc.time}</div>
                <div>
                  <h4 style={{ margin: '0 0 5px', fontSize: '0.94rem', color: 'var(--color-dark)', fontWeight: 800 }}>
                    {moc.title}
                  </h4>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.7, textAlign: 'justify', margin: 0, color: 'var(--color-subtle)' }}>
                    {moc.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.86rem', lineHeight: 1.65, textAlign: 'justify', margin: '0 0 14px', color: 'var(--color-subtle)', fontStyle: 'italic' }}>
            Nguồn đối chiếu: bài “Quá trình hình thành và phát triển của TNTT GP. Mỹ Tho — Liên đoàn Các Thánh Tử Đạo Việt
            Nam”, tnttgioitremytho.com.
          </p>

          <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 8px' }}>
            <strong style={{ color: 'var(--color-red)' }}>Mục đích</strong> — Điều 2, Chương I Nội Quy Tổng Liên Đoàn nêu
            hai mục đích quấn quyện và bổ sung cho nhau, không thể thiếu một:
          </p>
          <ol style={{ fontSize: '0.93rem', lineHeight: 1.7, margin: '0 0 14px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '6px' }}>
              <strong>Đào luyện</strong> thanh thiếu nhi về hai phương diện <strong>tự nhiên</strong> (con người kiện toàn
              về thể chất, tinh thần và nhân cách, có ý thức góp phần xây dựng xã hội) và <strong>siêu nhiên</strong>
              (Kitô hữu hoàn hảo, hiểu biết giáo lý, sống đạo trưởng thành, ý thức ơn gọi nên thánh và làm tông đồ).
            </li>
            <li>
              <strong>Đoàn ngũ hoá</strong> thiếu nhi để hướng dẫn các em truyền thông Tin Mừng, góp phần xây dựng xã hội
              theo tinh thần Tin Mừng.
            </li>
          </ol>

          <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 10px' }}>
            <strong style={{ color: 'var(--color-red)' }}>Tôn chỉ</strong> — Điều 5 Nội Quy: <em>Sống Lời Chúa và kết hợp
            với Chúa Giêsu Thánh Thể</em> qua bốn phương thế, nhất là làm tông đồ cho giới trẻ, vì
            &ldquo;người trẻ phải làm tông đồ trước tiên và trực tiếp cho giới trẻ&rdquo; (Sắc lệnh Tông Đồ Giáo Dân, số 12).
          </p>

          {/* 4 phương thế của Tôn chỉ */}
          <div
            className="responsive-grid"
          >
            {[
              { title: 'CẦU NGUYỆN', desc: 'Nuôi dưỡng đời sống kết hiệp mật thiết với Chúa Giêsu Thánh Thể mỗi ngày.' },
              { title: 'RƯỚC LỄ', desc: 'Tham dự Thánh lễ sốt sắng và rước Mình Máu Thánh Chúa để được biến đổi.' },
              { title: 'HY SINH', desc: 'Vui vẻ chấp nhận gian khó, biết từ bỏ ý riêng và quảng đại vì tha nhân.' },
              { title: 'LÀM TÔNG ĐỒ', desc: 'Làm chứng cho Tin Mừng bằng đời sống gương mẫu, bác ái và yêu thương.' }
            ].map((k, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(153, 27, 27, 0.04)',
                  border: '1px solid var(--color-border-subtle)',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontWeight: 800, color: 'var(--color-red)', fontSize: '0.86rem', marginBottom: '4px' }}>
                  {idx + 1}. {k.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', lineHeight: 1.4 }}>{k.desc}</div>
              </div>
            ))}
          </div>

          <ul style={{ fontSize: '0.93rem', lineHeight: 1.7, margin: '14px 0 0', paddingLeft: '20px' }}>
            <li><strong>Thánh Kinh và Thánh Thể</strong> là nền tảng của Phong trào.</li>
            <li>Tôn sùng <strong>Mẹ Maria</strong> và cậy nhờ Mẹ dẫn đưa các em đến với Chúa.</li>
            <li>Noi gương <strong>các Thánh Tử Đạo Việt Nam</strong>.</li>
            <li>Sống gắn bó với Giáo Hội, yêu mến và vâng phục <strong>Đức Thánh Cha</strong> — vị thủ lãnh của Phong trào.</li>
          </ul>

          <h3 id="xu-doan-khan-quang" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '22px 0 8px' }}>
            Hệ thống Ngành &amp; Ý nghĩa Khăn Quàng TNTT
          </h3>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
            Khăn quàng TNTT là biểu tượng của tinh thần dâng hiến và trách nhiệm tông đồ. Dưới đây là bảng phân cấp các
            ngành trong Xứ Đoàn:
          </p>

          <div className="scarf-list">
            {TNTT_NGANH.map((r) => (
              <div key={r.id} className="scarf-card">
                <div className="scarf-card-head">
                  <ScarfIcon scarf={r} />
                  <div className="scarf-card-title">
                    <div className="scarf-name">
                      Khăn Ngành {r.name} — <span className="scarf-motto">{r.motto}</span>
                    </div>
                    <div className="scarf-meta">
                      {r.age} • Khăn {r.scarfName.toLowerCase()}, không viền • {r.crossName}
                    </div>
                  </div>
                </div>
                <p className="scarf-symbolism">{r.symbolism}</p>
                {r.leaderTrim && <p className="scarf-trim-note">{r.leaderTrim}.</p>}
              </div>
            ))}
          </div>

          <h3 id="xu-doan-khan-huynh-truong" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '26px 0 8px' }}>
            Khăn Quàng Huynh Trưởng &amp; Ban Điều Hành
          </h3>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
            Ngoài khăn của các ngành, Phong trào còn quy định khăn riêng cho những người phục vụ và
            hướng dẫn Đoàn Thiếu Nhi Thánh Thể:
          </p>

          <div className="scarf-list">
            {TNTT_HUYNH_TRUONG.map((r) => (
              <div key={r.id} className="scarf-card">
                <div className="scarf-card-head">
                  <ScarfIcon scarf={r} />
                  <div className="scarf-card-title">
                    <div className="scarf-name">
                      {r.name}
                      {r.motto && <> — <span className="scarf-motto">{r.motto}</span></>}
                    </div>
                    <div className="scarf-meta">
                      {r.age} • Khăn {r.scarfName.toLowerCase()}
                      {r.trimName ? `, ${r.trimName}` : ''} • {r.crossName}
                    </div>
                  </div>
                </div>
                <p className="scarf-symbolism">{r.symbolism}</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '0.82rem', fontStyle: 'italic', color: 'var(--color-subtle)', margin: '14px 0 0', lineHeight: 1.6 }}>
            Nguồn: bảng &ldquo;Mẫu khăn quàng và các cấp hiệu trong Phong trào Thiếu Nhi Thánh Thể Việt Nam&rdquo; —
            Liên đoàn Các Thánh Tử Đạo Việt Nam, Giáo phận Mỹ Tho.
          </p>

          <h3 id="xu-doan-tai-lap" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '26px 0 8px' }}>
            Khoá Huấn Luyện Huynh Trưởng Đầu Tiên &amp; Ngày Tái Lập Xứ Đoàn (2005)
          </h3>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
            Đoàn Thiếu Nhi Thánh Thể tại Giáo xứ Chánh Tòa đã vắng bóng trong sinh hoạt giáo xứ
            kể từ sau biến cố năm 1975. Đến mùa thu năm 2005, Cha sở Giacôbê Hà Văn Xung đứng ra
            tổ chức lớp huấn luyện Huynh Trưởng đầu tiên — không chỉ cho giáo xứ Chánh Tòa mà cho
            cả các giáo xứ trong Giáo hạt Mỹ Tho — mở đường cho Xứ Đoàn hồi sinh.
          </p>

          <div
            style={{
              backgroundColor: 'rgba(153, 27, 27, 0.03)',
              border: '1px solid rgba(153, 27, 27, 0.12)',
              borderLeft: '4px solid var(--color-red)',
              borderRadius: '10px',
              padding: '14px 16px',
              margin: '0 0 16px'
            }}
          >
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-red)', marginBottom: '8px', letterSpacing: '0.02em' }}>
              TRÍCH SỔ TAY GIÁO XỨ — NGÀY 16.10.2005
            </div>
            <blockquote style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.8, fontStyle: 'italic', color: 'var(--color-dark)' }}>
              &ldquo;Đoàn Thiếu Nhi Thánh Thể tại Giáo xứ Chánh Toà đã vắng bóng trong sinh hoạt của
              giáo xứ từ sau biến cố 1975. Nay đã đến lúc cho đoàn thể này hồi sinh theo trào lưu
              chung của đời sống Giáo Hội. Cha Sở Giacôbê đã tổ chức lớp huấn luyện các anh chị
              huynh trưởng Thiếu Nhi Thánh Thể cho giáo xứ &amp; các giáo xứ trong Giáo Hạt Mỹ Tho.
              <br /><br />
              Phần huấn luyện được thực hiện trong 6 ngày Chúa Nhật liên tiếp (từ CN 16/10/2005).
              Trong đó Chúa Nhật thứ sáu là ngày thực tập, và Chúa Nhật kế tiếp (4/12/2005) là ngày
              vào sa mạc. Trong ngày nầy các anh chị huynh trưởng được khảo hạch về các bài đã học.
              Kết thúc ngày sa mạc nầy là giờ Chầu Thánh Thể, trong đó có nghi thức làm phép khăn
              quàng &amp; trao khăn. Cuối cùng là nghi thức sai đi với hành trang Lời Chúa.&rdquo;
            </blockquote>
          </div>

          <div style={{ display: 'grid', gap: '8px', marginBottom: '14px' }}>
            {[
              { d: '16/10/2005', t: 'Khai giảng khoá huấn luyện Huynh Trưởng đầu tiên sau 1975' },
              { d: '6 Chúa Nhật liên tiếp', t: 'Chương trình huấn luyện; Chúa Nhật thứ sáu dành cho thực tập' },
              { d: '04/12/2005', t: 'Ngày vào sa mạc: khảo hạch, giờ Chầu Thánh Thể, làm phép và trao khăn quàng, nghi thức sai đi với hành trang Lời Chúa' }
            ].map((m) => (
              <div
                key={m.d}
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-start',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border-subtle)'
                }}
              >
                <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--color-red)', flexShrink: 0, minWidth: 0 }}>
                  {m.d}
                </span>
                <span style={{ fontSize: '0.86rem', lineHeight: 1.6, color: 'var(--color-dark)' }}>{m.t}</span>
              </div>
            ))}
          </div>

          <div className="tntt-gallery">
            {[
              { src: '/images/tntt2005_so_tay_16102005.jpg', cap: 'Trang sổ tay giáo xứ đề ngày 16.10.2005 ghi lại việc mở khoá huấn luyện Huynh Trưởng đầu tiên sau năm 1975.' },
              { src: '/images/tntt2005_vong_tron_sinh_hoat.jpg', cap: 'Vòng tròn sinh hoạt trong khuôn viên nhà thờ — các anh chị Huynh Trưởng mang khăn quàng đỏ, một số mang khăn Huấn Luyện Viên viền màu.' },
              { src: '/images/tntt2005_nghi_thuc_trao_khan.jpg', cap: 'Nghi thức làm phép khăn quàng và trao khăn trong giờ Chầu Thánh Thể kết thúc ngày sa mạc.' },
              { src: '/images/tntt2005_huynh_truong_ruoc_co.jpg', cap: 'Đoàn Huynh Trưởng cùng cờ đoàn tiến vào nhà thờ trong nghi thức sai đi.' },
              { src: '/images/tntt2005_doan_sinh_trong_nha_tho.jpg', cap: 'Đoàn sinh Thiếu Nhi Thánh Thể quy tụ trong lòng Nhà thờ Chánh Tòa sau ngày Xứ Đoàn được tái lập.' }
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

          <p style={{ fontSize: '0.82rem', fontStyle: 'italic', color: 'var(--color-subtle)', margin: 0, lineHeight: 1.6 }}>
            Nguồn: sổ tay ghi chép của Giáo xứ Chánh Tòa Mỹ Tho, trang đề ngày 16.10.2005 (bản chụp
            do giáo xứ cung cấp). Ghi chép này cũng xác nhận Cha Giacôbê Hà Văn Xung đã là Cha sở
            Chánh Tòa vào tháng 10 năm 2005.
          </p>
        </section>

          <h3 id="xu-doan-tuyen-uy" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '26px 0 8px' }}>
            Các Đời Cha Tuyên Uý Xứ Đoàn
          </h3>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
            Cha Tuyên Uý là linh mục được trao trách nhiệm linh hướng Xứ Đoàn. Dưới đây là các vị đã
            phục vụ Xứ Đoàn Các Thánh Tử Đạo Việt Nam từ ngày tái lập năm 2005 đến nay —
            <strong> nhấn vào tên để xem lý lịch đầy đủ</strong>:
          </p>

          <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
            <table className="pastor-timeline-table">
              <caption className="sr-only">
                Danh sách các đời cha tuyên uý Xứ Đoàn Các Thánh Tử Đạo Việt Nam
              </caption>
              <thead>
                <tr>
                  <th scope="col" style={{ width: '50px' }}>STT</th>
                  <th scope="col" style={{ width: '150px' }}>Thời Gian</th>
                  <th scope="col">Cha Tuyên Uý</th>
                </tr>
              </thead>
              <tbody>
                {TNTT_CHAPLAINS.map((row, idx) => (
                  <tr key={row.bio.id}>
                    <td>{idx + 1}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{row.period}</td>
                    <td>
                      <button
                        type="button"
                        className="pastor-name-btn"
                        onClick={() => moLyLich(row.bio)}
                        aria-label={`Xem lý lịch ${row.bio.name}`}
                      >
                        {row.bio.name}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* =====================================================================
              TÁI LẬP XỨ ĐOÀN NĂM 2005
              ===================================================================== */}
            <h3 id="xu-doan-ban-dieu-hanh" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '26px 0 10px' }}>
              Ban Điều Hành Xứ Đoàn
            </h3>

            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
              Theo <strong>Điều 27 Nội Quy Thiếu Nhi Thánh Thể Việt Nam</strong>, các Ngành trong giáo xứ hợp thành Xứ
              Đoàn, do cha Tuyên Uý dẫn dắt với sự cộng tác của Ban Điều Hành. Ban Thường vụ gồm{' '}
              <strong>Xứ Đoàn Trưởng</strong>, <strong>một Phó đặc trách quản trị</strong>,{' '}
              <strong>một Phó đặc trách huấn luyện</strong>, <strong>một Thư ký</strong> và{' '}
              <strong>một Thủ quỹ</strong>; ngoài ra còn các trưởng ngành và các uỷ viên. Đoàn trưởng và hai đoàn phó do
              Hội đồng Huynh Trưởng Xứ Đoàn bầu lên; thư ký, thủ quỹ, các ngành trưởng và uỷ viên do ba vị này đề cử.
              Mọi huynh trưởng trong Ban Điều Hành đều phải được cha Tuyên Uý chấp thuận.{' '}
              <strong>Nhiệm kỳ là hai năm và được tái cử.</strong>
            </p>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.72, textAlign: 'justify', margin: '0 0 8px', color: 'var(--color-subtle)' }}>
              Điều 28 đặt thêm điều kiện: có chứng chỉ Huynh Trưởng cấp II trở lên, đã phục vụ Xứ Đoàn ít nhất một năm với
              tư cách huynh trưởng, và được cha Tuyên Uý chứng nhận tư cách, đạo đức cùng khả năng. Điều 29 xác định bốn
              trách nhiệm: báo cáo hành chánh lên cấp trên, phối hợp hoạt động các ngành, đại diện Xứ Đoàn đối ngoại, và
              đào tạo Trợ Tá, Dự Trưởng, Tông Đồ Đội Trưởng cùng bồi dưỡng các huynh trưởng.
            </p>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.72, textAlign: 'justify', margin: '0 0 18px', color: 'var(--color-subtle)' }}>
              Tại Chánh Tòa, hai chức phó quen được gọi theo lối địa phương là <em>Phó nội vụ</em> và{' '}
              <em>Phó ngoại vụ</em>, tương ứng với <em>Phó đặc trách quản trị</em> và <em>Phó đặc trách huấn luyện</em>{' '}
              trong Nội Quy. Vì Xứ Đoàn tái lập năm 2005 còn non trẻ, Ban Điều Hành trải qua nhiều lần gián đoạn. Nhật ký
              dưới đây ghi lại các giai đoạn ấy đúng như đã diễn ra.
            </p>

            {/* ---- Giai đoạn 1 ---- */}
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-dark)', margin: '0 0 6px' }}>
              Giai đoạn đầu — nhen nhóm lại tinh thần Thiếu Nhi Thánh Thể
            </h4>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, margin: '0 0 10px', color: 'var(--color-subtle)' }}>
              Ban Điều Hành đầu tiên sau ngày tái lập, gồm các trưởng:
            </p>
            <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
              <table className="pastor-timeline-table">
                <caption className="sr-only">Ban Điều Hành Xứ Đoàn giai đoạn đầu</caption>
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '50px' }}>STT</th>
                    <th scope="col" style={{ width: '210px' }}>Chức vụ</th>
                    <th scope="col">Huynh Trưởng</th>
                  </tr>
                </thead>
                <tbody>
                  {['Xứ Đoàn Trưởng', 'Xứ Đoàn Phó (nội vụ)', 'Xứ Đoàn Phó (ngoại vụ)', 'Thư Ký', 'Thủ Quỹ'].map((cv, i) => (
                    <tr key={cv}>
                      <td>{i + 1}</td>
                      <td style={{ whiteSpace: 'nowrap' }}>{cv}</td>
                      <td><em style={{ color: 'var(--color-subtle)' }}>Chưa cập nhật</em></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ---- Giai đoạn 2 ---- */}
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-dark)', margin: '0 0 6px' }}>
              Khoảng 2013 – 2019 — hợp nhất với Ban Giáo Lý
            </h4>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, margin: '0 0 10px', color: 'var(--color-subtle)', textAlign: 'justify' }}>
              Sau một thời gian Xứ Đoàn và Ban Giáo Lý hoạt động song song rồi phối hợp qua lại, giáo xứ bước vào một giai
              đoạn kiện toàn quan trọng: tìm cách đặt sinh hoạt Thiếu Nhi Thánh Thể và chương trình giáo lý thiếu nhi dưới
              một nhịp điều hành chung. Đây là một chọn lựa có ý nghĩa, vì đời sống Xứ Đoàn không chỉ nằm ở sinh hoạt vòng
              tròn, trò chơi, chuyên môn hay nghi thức khăn quàng, mà còn gắn chặt với việc giáo dục đức tin thường xuyên
              cho các em. Khi hai mảng này được nối lại, Huynh Trưởng và Giáo Lý Viên có cơ hội cùng nhìn về một mục tiêu:
              đào luyện thiếu nhi trở thành Kitô hữu trưởng thành, biết sống đạo, biết tham dự phụng vụ và biết phục vụ
              trong tinh thần Phong trào.
            </p>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, margin: '0 0 10px', color: 'var(--color-subtle)', textAlign: 'justify' }}>
              Từ hướng đi đó, giáo xứ quyết định kiện toàn một Ban Điều Hành chung. Ban này vừa mang trách nhiệm tổ chức
              sinh hoạt Xứ Đoàn, vừa giữ vai trò nối kết với chương trình giáo lý, giúp các ngành và các lớp học không còn
              đứng tách rời nhau như hai hệ thống riêng biệt. Trong ký ức của nhiều huynh trưởng, đây là thời kỳ Xứ Đoàn có
              đường hướng rõ hơn, có người đại diện trong sinh hoạt đối nội, đối ngoại, và có khả năng phối hợp với cấp
              Liên đoàn trong các khoá huấn luyện, sinh hoạt giáo phận và những chương trình chung của Phong trào:
            </p>
            <div style={{ overflowX: 'auto', marginBottom: '10px' }}>
              <table className="pastor-timeline-table">
                <caption className="sr-only">Ban Điều Hành Xứ Đoàn khoảng 2013 – 2019</caption>
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '50px' }}>STT</th>
                    <th scope="col" style={{ width: '210px' }}>Chức vụ</th>
                    <th scope="col">Huynh Trưởng</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Xứ Đoàn Trưởng', 'bdh-le-tan-phai'],
                    ['Xứ Đoàn Phó (nội vụ)', 'bdh-vo-tan-hoang-viet'],
                    ['Xứ Đoàn Phó (ngoại vụ)', 'bdh-le-thanh-nhan']
                  ].map(([cv, id], i) => {
                    const b = BDH_BIOS.find((x) => x.id === id)!;
                    return (
                      <tr key={id}>
                        <td>{i + 1}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>{cv}</td>
                        <td>
                          <button
                            type="button"
                            className="pastor-name-btn"
                            onClick={() => moLyLich(b)}
                            aria-label={`Xem lý lịch ${b.name}`}
                          >
                            {b.name}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, margin: '0 0 14px', color: 'var(--color-subtle)', textAlign: 'justify' }}>
              Trong nhiệm kỳ này, Xứ Đoàn Trưởng <strong>Phêrô Lê Tấn Phải</strong> còn được tín nhiệm ở cấp giáo phận:
              tháng <strong>07/2017</strong>, nhân khoá huấn luyện Vươn Lên 4 với hơn 310 sa mạc sinh, Ban Chấp Hành mới
              của Liên đoàn ra mắt Đức Cha và Huynh Trưởng đoàn, và trưởng Lê Tấn Phải{' '}
              <strong>được bầu làm Chủ tịch Liên đoàn Các Thánh Tử Đạo Việt Nam — Giáo phận Mỹ Tho, nhiệm kỳ 2017 –
              2020</strong>. Chỉ trong năm tháng cuối năm 2017, Liên đoàn có thêm ba Xứ Đoàn mới được thành lập.{' '}
              <em style={{ fontSize: '0.84rem' }}>
                (Nguồn: bài &ldquo;Quá trình hình thành và phát triển của TNTT Giáo phận Mỹ Tho&rdquo;,
                tnttgioitremytho.com, 26/11/2018)
              </em>
            </p>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, margin: '0 0 10px', color: 'var(--color-subtle)', textAlign: 'justify' }}>
              Hai năm <strong>2018 – 2019</strong>, Xứ Đoàn có thêm sự đồng hành của một nữ tu với vai trò Trợ Uý:
            </p>
            <div style={{ overflowX: 'auto', marginBottom: '14px' }}>
              <table className="pastor-timeline-table">
                <caption className="sr-only">Trợ Uý đồng hành với Xứ Đoàn</caption>
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '50px' }}>STT</th>
                    <th scope="col" style={{ width: '210px' }}>Chức vụ</th>
                    <th scope="col">Tu sĩ đồng hành</th>
                  </tr>
                </thead>
                <tbody>
                  {TRO_UY_BIOS.map((b, i) => (
                    <tr key={b.id}>
                      <td>{i + 1}</td>
                      <td style={{ whiteSpace: 'nowrap' }}>Trợ Uý Xứ Đoàn</td>
                      <td>
                        <button
                          type="button"
                          className="pastor-name-btn"
                          onClick={() => moLyLich(b)}
                          aria-label={`Xem lý lịch ${b.name}`}
                        >
                          {b.name}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.7, margin: '0 0 20px', color: 'var(--color-subtle)', textAlign: 'justify' }}>
              Ban Điều Hành này phục vụ đến năm <strong>2019</strong> thì từ nhiệm, và trưởng Têrêsa Lê Thanh Nhàn từ đó
              không còn sinh hoạt tại Xứ Đoàn Chánh Tòa — nhưng không rời Phong trào: trưởng đảm nhiệm chức{' '}
              <strong>Thư ký Liên đoàn Các Thánh Tử Đạo Việt Nam — Giáo phận Mỹ Tho</strong> suốt hai nhiệm kỳ liên tiếp{' '}
              <strong>2020 – 2025</strong> và <strong>2025 – 2030</strong>. Như vậy nhiệm kỳ 2013 – 2019 của Xứ Đoàn
              Chánh Tòa đã góp cho Liên đoàn cấp giáo phận <strong>hai người</strong>: một Chủ tịch và một Thư ký.
            </p>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.7, margin: '0 0 20px', color: 'var(--color-subtle)', textAlign: 'justify' }}>
              Tuy nhiên, sự hợp nhất giữa Xứ Đoàn và Ban Giáo Lý đã không đi trọn đến hồi kết. Khi Ban Điều Hành từ nhiệm,
              cơ chế phối hợp chung mất đi điểm tựa; rồi bước ngoặt đại dịch <strong>Covid-19</strong> làm sinh hoạt giáo xứ,
              lớp học giáo lý và sinh hoạt thiếu nhi bị gián đoạn trong một thời gian dài. Từ đó, tiến trình hợp nhất dần
              chững lại, không kịp hoàn thiện thành một mô hình bền vững. Giai đoạn 2013 – 2019 vì thế vừa là một dấu son
              của nỗ lực nối kết, vừa để lại một bài học: muốn Xứ Đoàn và chương trình giáo lý đi chung lâu dài thì cần
              một cơ cấu điều hành ổn định, có người kế thừa và có lộ trình giáo dục đức tin được ghi nhận rõ ràng.
            </p>

            {/* ---- Giai đoạn 3 ---- */}
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-dark)', margin: '0 0 6px' }}>
              2020 – 2024 — những năm vắng bóng Ban Điều Hành
            </h4>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, margin: '0 0 20px', color: 'var(--color-subtle)', textAlign: 'justify' }}>
              Suốt năm năm, Xứ Đoàn không có Ban Điều Hành chính thức. Đây là một khoảng lặng dài trong lịch sử điều hành
              của Xứ Đoàn sau ngày tái lập: sinh hoạt vẫn còn, các lớp vẫn học, các em vẫn đến nhà thờ, nhưng thiếu một cơ
              cấu đứng giữa để nối kết, định hướng và chịu trách nhiệm chung. Công việc được chia đôi: trưởng{' '}
              <strong>Matthêu Lê Hoàng Thiên Phúc</strong> được giao trông coi sinh hoạt Thiếu Nhi Thánh Thể, còn thầy{' '}
              <strong>Augustinô Võ Tấn Hoàng Việt</strong> phụ trách Giáo Lý Viên. Vì chưa có một Ban Điều Hành được nhìn nhận
              như đầu mối chung, hai phần việc này nhiều lúc vận hành song song hơn là cùng đi trong một đường lối thống
              nhất. Những việc lẽ ra cần được bàn bạc, phân công và ghi nhận theo hệ thống thì thường phải xử lý theo từng
              vụ, tuỳ hoàn cảnh, tuỳ người phụ trách và tuỳ nhu cầu trước mắt.
            </p>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, margin: '0 0 20px', color: 'var(--color-subtle)', textAlign: 'justify' }}>
              Dấu vết rõ nhất của giai đoạn này nằm ở chương trình giáo lý. Sách giáo lý và cách tổ chức chương trình học
              bắt đầu có sự thay đổi; mỗi ngành dần hình thành một chương trình riêng, phù hợp hơn với độ tuổi, khả năng
              tiếp nhận và nhịp sinh hoạt của từng nhóm. Việc phân ngành như thế tự nó không phải là điều xấu, vì giáo dục
              đức tin cho thiếu nhi cần biết tôn trọng từng lứa tuổi. Nhưng khi thiếu một Ban Điều Hành chung để điều phối,
              thiếu một người hoặc một nhóm có trách nhiệm ráp nối các chương trình ấy thành một lộ trình xuyên suốt, sự
              phân tách ban đầu dần trở thành khoảng cách. Mỗi ngành có thể lo tốt phần của mình, nhưng toàn thể giáo xứ lại
              chưa có một bộ giáo lý chung để bảo đảm các em đi từ ngành này sang ngành khác mà vẫn được đào luyện trong một
              mạch thống nhất.
            </p>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, margin: '0 0 20px', color: 'var(--color-subtle)', textAlign: 'justify' }}>
              Hệ quả ấy kéo dài đến hôm nay và trở thành một bài học lớn cho Xứ Đoàn: sinh hoạt có thể duy trì bằng thiện
              chí của từng người, nhưng giáo dục đức tin cần một chương trình chung, có định hướng, có người chịu trách
              nhiệm và có sự liên tục giữa các thế hệ. Những năm 2020 – 2024 vì thế không chỉ là thời kỳ vắng bóng Ban Điều
              Hành, mà còn là giai đoạn cho thấy rõ nhu cầu phải tái lập lại cơ cấu điều hành, thống nhất lại lộ trình đào
              luyện thiếu nhi và xây dựng một nền giáo lý chung cho toàn giáo xứ.
            </p>

            {/* ---- Giai đoạn 4 ---- */}
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-dark)', margin: '0 0 6px' }}>
Tháng 6 năm 2025 — Ban Điều Hành trở lại theo thỉnh nguyện của Huynh Trưởng đoàn
            </h4>
            <p className="doc-para">
              Năm năm không có Ban Điều Hành là năm năm mỗi việc phải xử lý theo từng vụ. Không có ai đại diện Xứ Đoàn đối
              ngoại, không có ai đứng ra phân công giữa các ngành, và những khoá huấn luyện nội bộ thì tuỳ lúc tuỳ người.
              Các anh chị Huynh Trưởng là những người thấy rõ nhất chỗ trống ấy — vì chính họ phải bù vào.
            </p>
            <p className="doc-para">
              Vì vậy, việc Ban Điều Hành trở lại không đến từ một quyết định áp xuống, mà{' '}
              <strong>xuất phát từ mong muốn và thỉnh nguyện của chính Huynh Trưởng đoàn</strong>. Sau khi các trưởng bày
              tỏ nguyện vọng, <strong>vào tháng 6 năm 2025</strong>, cha Tuyên Uý <strong>Phêrô Nguyễn Ngọc</strong> chính
              thức bổ nhiệm Ban Điều Hành mới với nhiệm kỳ hai năm theo Nội Quy. Sau sáu năm kể từ ngày ban cũ từ nhiệm
              năm 2019, Xứ Đoàn lại có một guồng máy đầy đủ năm chức vụ:
            </p>
            <p className="doc-para">
              Trong thời kỳ này, Xứ Đoàn từng bước đi đến tình liên đới rộng hơn giữa các xứ đoàn với nhau, lớn lên mạnh
              mẽ qua nhiều chương trình chung. Các trưởng thuộc Ban Điều Hành được đưa đi huấn luyện tại Liên đoàn Giáo
              phận và Tổng Liên đoàn thuộc Tổng Giáo phận Sài Gòn, nhằm chuẩn bị nhân sự cho công cuộc xây dựng lại Xứ
              Đoàn sau hai mươi năm tái lập và phát triển.
            </p>
            <p className="doc-para">
              Cùng với việc củng cố nhân sự, các trưởng phân công và xây dựng lại hệ thống phục vụ của Xứ Đoàn qua các
              ban chuyên trách: <strong>Ban Truyền thông - Kỹ thuật</strong> do trưởng{' '}
              <strong>Giuse Mai Hồng Phúc</strong> làm trưởng ban; <strong>Ban Môi trường</strong> do trưởng{' '}
              <strong>Maria Đoàn Nguyễn Phương Anh</strong> làm trưởng ban; <strong>Ban Y tế</strong> do trưởng{' '}
              <strong>Maria Đào Ngọc Nhã Trân</strong> làm trưởng ban; <strong>Ban Phụng vụ</strong> và{' '}
              <strong>Ban Trực</strong> do trưởng <strong>Têrêsa Trần Ngọc Tú Trân</strong> làm trưởng ban. Những phân nhiệm này
              nhằm giúp sinh hoạt được tổ chức rõ ràng hơn, từng bước tái xây dựng nề nếp điều hành theo tinh thần Nội Quy
              của Phong trào Thiếu Nhi Thánh Thể.
            </p>
            <p className="doc-para">
              Đến dịp <strong>Trung Thu năm 2025</strong>, các trưởng cùng cha Tuyên Uý tổ chức hội chợ Trung Thu với sự
              góp mặt của các giáo xứ <strong>Nữ Vương Hoà Bình</strong>, <strong>Antôn</strong>, <strong>Bình Tạo</strong>,{' '}
              <strong>Giuse Lao Công</strong> và nhiều giáo xứ khách mời khác. Buổi Trung Thu diễn ra tốt đẹp và được ghi
              nhận như một trong những chương trình thành công nổi bật nhất trong hai mươi năm hình thành, tái lập và phát
              triển của Xứ Đoàn.
            </p>
            <div style={{ overflowX: 'auto', marginBottom: '10px' }}>
              <table className="pastor-timeline-table">
                <caption className="sr-only">Ban Điều Hành Xứ Đoàn nhiệm kỳ từ tháng 6/2025</caption>
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '50px' }}>STT</th>
                    <th scope="col" style={{ width: '210px' }}>Chức vụ</th>
                    <th scope="col">Huynh Trưởng</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Xứ Đoàn Trưởng', 'bdh-le-hoang-thien-phuc'],
                    ['Xứ Đoàn Phó (nội vụ)', 'bdh-le-dang-thu-thao'],
                    ['Xứ Đoàn Phó (ngoại vụ)', 'bdh-le-gia-huy'],
                    ['Thư Ký Đoàn', 'bdh-nguyen-phuc-khang'],
                    ['Thủ Quỹ Đoàn', 'bdh-tran-thao-my']
                  ].map(([cv, id], i) => {
                    const b = BDH_BIOS.find((x) => x.id === id)!;
                    return (
                      <tr key={id}>
                        <td>{i + 1}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>{cv}</td>
                        <td>
                          <button
                            type="button"
                            className="pastor-name-btn"
                            onClick={() => moLyLich(b)}
                            aria-label={`Xem lý lịch ${b.name}`}
                          >
                            {b.name}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="doc-para">
              Trong phần định hướng sinh hoạt cuối năm <strong>2025</strong>, trưởng{' '}
              <strong>Matthêu Lê Hoàng Thiên Phúc</strong> và trưởng <strong>Phêrô Lê Gia Huy</strong> đã đưa ý kiến và
              thúc đẩy việc đưa <strong>chương trình ngành Hiệp Sĩ</strong> cùng <strong>khăn Hiệp Sĩ</strong> vào sinh hoạt
              chính thức của Xứ Đoàn. Đây là bước chuẩn bị để hệ thống ngành được đầy đủ hơn, giúp các em lớn có môi
              trường tiếp tục đào luyện và phục vụ trong tinh thần Thiếu Nhi Thánh Thể.
            </p>
            <p className="doc-para">
              Cũng trong hướng chuẩn bị nhân sự lâu dài, trưởng <strong>Matthêu Lê Hoàng Thiên Phúc</strong>, trưởng{' '}
              <strong>Phêrô Lê Gia Huy</strong> và trưởng <strong>Phêrô Nguyễn Phúc Khang</strong> cùng tham gia xây dựng{' '}
              <strong>chương trình đào tạo Huynh Trưởng Xứ Đoàn</strong>, nhằm tạo một lộ trình nội bộ rõ ràng hơn cho
              Dự Trưởng, Trợ Tá và các anh chị đang phục vụ các ngành.
            </p>

            <p className="doc-para" style={{ fontSize: '0.88rem', color: 'var(--color-subtle)' }}>
              Một ghi chú để người sau đối chiếu. Nguyện vọng tái lập đến từ Huynh Trưởng đoàn, đúng tinh thần Nội Quy;
              nhưng về hình thức thì cách tiến hành có vài chỗ chưa khớp. <strong>Điều 27</strong> quy định Xứ Đoàn
              Trưởng và hai Đoàn Phó <strong>do Hội đồng Huynh Trưởng Xứ Đoàn bầu lên</strong>; thư ký, thủ quỹ và các
              ngành trưởng thì do ba vị ấy đề cử. Vai trò của cha Tuyên Uý Xứ Đoàn trong điều khoản này là{' '}
              <strong>chấp thuận</strong>. Còn việc <strong>bổ nhiệm</strong> Ban Thường vụ, theo{' '}
              <strong>Điều 28</strong>, thuộc thẩm quyền <strong>cha Tuyên Uý Liên đoàn</strong>. Lần tái lập này, cả năm
              chức vụ đều được bổ nhiệm thẳng. Nhiệm kỳ hai năm thì đúng Nội Quy; phần còn lại thì chưa.
            </p>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, margin: '0 0 12px', color: 'var(--color-subtle)', textAlign: 'justify' }}>
              Nhiệm kỳ này kết thúc sớm hơn dự định. Ngày <strong>12/12/2025</strong>, nhân Đêm Thánh Ca “Ánh Sáng Hy Vọng” của Giáo hạt Mỹ Tho tổ chức tại
              Nhà thờ Chánh Tòa, Ban Điều Hành được cha Tuyên Uý cho ngưng nhiệm vụ. Tính đến nay Xứ Đoàn <strong>chưa có người đứng đầu Ban Điều
              Hành</strong>.
            </p>
            <p style={{ fontSize: '0.86rem', lineHeight: 1.7, margin: '0 0 18px', color: 'var(--color-subtle)', textAlign: 'justify', fontStyle: 'italic' }}>
              Ghi chú của bản khảo cứu: theo Điều 27, nhiệm kỳ Ban Điều Hành Xứ Đoàn là hai năm. Trong bốn giai đoạn kể
              trên, chỉ giai đoạn 2013 – 2019 đi trọn được nhiều nhiệm kỳ liên tiếp — cũng là giai đoạn duy nhất Ban Điều
              Hành được hình thành đúng quy trình bầu cử của Điều 27. Đây là điều dễ hiểu với một Xứ Đoàn mới tái lập năm
              2005, và cũng là điều đáng ghi lại: một Ban Điều Hành do Hội đồng Huynh Trưởng bầu lên thì có chỗ dựa để
              đứng, còn một Ban Điều Hành được đặt vào thì cũng có thể được gỡ ra.
            </p>

      <MetaUpdater
        title={lyLich ? `${lyLich.name} — ${lyLich.role}` : undefined}
        description={lyLich ? lyLich.shortDesc : undefined}
        image={lyLich?.image ? `https://chanhtoa.tnttgiaophanmytho.online${lyLich.image}` : (lyLich ? `https://chanhtoa.tnttgiaophanmytho.online/api/og/${lyLich.id}` : undefined)}
        url={`https://chanhtoa.tnttgiaophanmytho.online/gioi-thieu/xu-doan?bio=${lyLich?.id}`}
      />
      <CuaSoLyLich bio={lyLich} onClose={() => setLyLich(null)} />
      <CuaSoAnh anh={anh} onClose={() => setAnh(null)} />
    </KhungTrang>
  );
}
