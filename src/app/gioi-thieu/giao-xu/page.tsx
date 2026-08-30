'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin, Church, Landmark, Crown, Award, Users, BookOpen, Cross, Eye, Calendar, Clock, ScrollText, Star, Scroll
} from 'lucide-react';
import { useChanhToaMassTimes } from '@/lib/useChanhToaMassTimes';
import KhungTrang from '../KhungTrang';
import { CuaSoLyLich, CuaSoAnh } from '../CuaSo';
import {
  ALL_COMMUNITY_BIOS,
  BISHOPS_LINKED,
  PASTOR_TIMELINE,
  PRIESTS_SERVED
,
  ROMAN,
  SUNDAY_MASS_NOTES
} from '../duLieu';
import type { DetailedBioRecord } from '../duLieu';

export default function Trang() {
  const chanhToa = useChanhToaMassTimes();
  const [lyLich, setLyLich] = useState<DetailedBioRecord | null>(null);
  const [anh, setAnh] = useState<{ src: string; caption: string } | null>(null);
  const moLyLich = (b: DetailedBioRecord | null) => setLyLich(b);
  const moAnh = (a: { src: string; caption: string } | null) => setAnh(a);

  return (
    <KhungTrang tieuDe="Giáo Xứ Chánh Tòa Mỹ Tho" phuDe="Lịch sử họ đạo từ năm 1861, ba lần dựng nhà thờ, niên biểu các đời linh mục chánh sở và kho ảnh tư liệu qua các thời kỳ." duongDan="/gioi-thieu/giao-xu">
        <section id="lich-su" style={{ marginBottom: '36px' }}>
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
            3. Giáo Xứ Chánh Tòa — Lịch sử hình thành và phát triển
          </h2>

          {/* Minh họa ảnh nổi bên phải chuẩn Wikipedia */}
          <div
            className="floating-img-290"
            style={{
              padding: '8px',
              backgroundColor: 'var(--color-card-bg)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}
          >
            <div
              style={{ position: 'relative', width: '100%', height: '185px', cursor: 'pointer', borderRadius: '8px', overflow: 'hidden' }}
              onClick={() => moAnh({ src: '/images/nhatho2.jpg', caption: 'Toàn cảnh ngôi thánh đường Chánh Tòa Mỹ Tho cổ kính xây dựng năm 1906.' })}
            >
              <Image
                src="/images/nhatho2.jpg"
                alt="Nhà thờ Chánh Tòa Mỹ Tho xưa"
                fill
                sizes="290px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', marginTop: '6px', lineHeight: 1.4 }}>
              Toàn cảnh ngôi thánh đường Chánh Tòa Mỹ Tho cổ kính xây dựng năm 1906.
            </div>
          </div>

          <h3 id="lich-su-so-khai" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '18px 0 8px' }}>
            3.1. Thời kỳ sơ khai &amp; Họ đạo Vĩnh Tường (Thế kỷ XVII – 1866)
          </h3>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
            Hạt giống Tin Mừng được gieo vãi tại vùng đất Mỹ Tho từ rất sớm vào thế kỷ XVII nhờ bước chân truyền giáo của
            các vị thừa sai Dòng Phanxicô và Hội Thừa sai Paris (MEP). Họ đạo đầu tiên dâng kính Thánh Phanxicô Xaviê được
            hình thành tại họ Điều Hòa.
          </p>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
            Đến năm 1866, Đức Giám mục Dominique Miche (đại diện Tông tòa Tây Đàng Trong) cho xây dựng ngôi nhà thờ
            Vĩnh Tường (tước hiệu Thánh Tâm Chúa Giêsu) tại vị trí gần chợ Cũ Mỹ Tho nhằm đáp ứng nhu cầu sinh hoạt tôn
            giáo ngày càng tăng của giáo dân địa phương.
          </p>

          <h3 id="lich-su-xay-dung" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '22px 0 8px' }}>
            3.2. Xây dựng ngôi thánh đường hiện nay (1906 – 1910)
          </h3>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
            Nhận thấy ngôi nhà thờ cũ đã xuống cấp và diện tích chật hẹp, ngày 11 tháng 8 năm 1906, Linh mục Régnier (thường
            được bà con giáo dân gọi thân mật là <em>cố Gẫm</em>) đã chính thức đặt viên đá đầu tiên khởi công xây dựng
            ngôi thánh đường thứ ba tại đại lộ Bourdais (nay là số 32 đường Hùng Vương). Sau 4 năm thi công kiên cố với vật
            liệu gạch ngói chuyển trực tiếp từ Pháp và thợ lành nghề miền Nam, nhà thờ được khánh thành trọng thể vào năm
            1910.
          </p>

          <h3 id="lich-su-chinh-toa" style={{ fontSize: '1.18rem', fontWeight: 800, color: 'var(--color-red)', margin: '26px 0 10px' }}>
            3.3. Sắc Chỉ Tông Hiến Venerabilium Nostrorum &amp; Nâng Lên Chính Tòa (1960)
          </h3>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 16px' }}>
            Ngày <strong>24 tháng 11 năm 1960</strong> là mốc son chói lọi trong lịch sử Giáo hội Công giáo Việt Nam khi <strong>Thánh Giáo hoàng Gioan XXIII</strong> (<em>Ioannes PP. XXIII</em>) ban hành Tông hiến lịch sử <strong>&ldquo;Venerabilium Nostrorum&rdquo;</strong> (<em>Chư Huynh Đáng Kính</em>). Văn kiện long trọng này chính thức thiết lập Hàng Giáo Phẩm Công Giáo Việt Nam, đồng thời khai sinh <strong>Giáo phận Mỹ Tho</strong> (<em>Dioecesis Mythoensis</em>) và nâng ngôi Thánh đường Mỹ Tho thành <strong>Nhà thờ Chính Tòa Đức Mẹ Vô Nhiễm Nguyên Tội</strong>.
          </p>

          {/* BỘ ĐÔI HÌNH ẢNH TƯ LIỆU LỊCH SỬ SẮC LỆNH 1960 */}
          <div
            className="responsive-grid"
          >
            <div
              style={{
                backgroundColor: 'var(--color-card-bg)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                gap: '14px',
                alignItems: 'center',
                boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
              }}
            >
              <div
                style={{
                  width: '76px',
                  height: '100px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative',
                  flexShrink: 0,
                  border: '1.5px solid #B45309'
                }}
              >
                <Image
                  src="/images/popes/pope_261.jpg"
                  alt="Thánh Giáo hoàng Gioan XXIII"
                  fill
                  sizes="76px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--color-red)' }}>
                  Thánh Giáo hoàng Gioan XXIII
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--color-subtle)', marginTop: '2px' }}>
                  Đấng ban hành Sắc chỉ <em>Venerabilium Nostrorum</em> (24/11/1960) thiết lập Hàng Giáo Phẩm Việt Nam &amp; Giáo phận Mỹ Tho.
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'var(--color-card-bg)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                gap: '14px',
                alignItems: 'center',
                boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
              }}
            >
              <div
                style={{
                  width: '76px',
                  height: '100px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative',
                  flexShrink: 0,
                  border: '1.5px solid #B45309'
                }}
              >
                <Image
                  src="/images/bishop_1_tran_van_thien.jpg"
                  alt="Đức Cha Giuse Trần Văn Thiện"
                  fill
                  sizes="76px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--color-red)' }}>
                  Đức Cha Giuse Trần Văn Thiện
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--color-subtle)', marginTop: '2px' }}>
                  Giám mục Tiên khởi Giáo phận Mỹ Tho, được Tòa Thánh bổ nhiệm lãnh đạo tân giáo phận từ năm 1960.
                </div>
              </div>
            </div>
          </div>

          {/* KHUNG TƯ LIỆU VĂN BẢN: BẢN GỐC LATIN & BẢN DỊCH TIẾNG VIỆT */}
          <div
            style={{
              backgroundColor: 'var(--color-card-bg)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: '12px',
              padding: '18px',
              margin: '20px 0',
              wordBreak: 'break-word'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '8px' }}>
              <div style={{ marginTop: '2px', flexShrink: 0 }}><Scroll size={18} color="var(--color-red)" /></div>
              <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-red)' }}>
                Văn Khố Tòa Thánh: Trích Bản Gốc Tiếng Latinh (AAS 53, 1961, pp. 346–348)
              </span>
            </div>

            <div
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.86rem',
                lineHeight: 1.7,
                color: 'var(--color-dark)',
                backgroundColor: 'rgba(180, 83, 9, 0.04)',
                padding: '14px 16px',
                borderRadius: '8px',
                borderLeft: '3px solid #B45309',
                marginBottom: '16px',
                fontStyle: 'italic'
              }}
            >
              &ldquo;IOANNES EPISCOPUS SERVUS SERVORUM DEI AD PERPETUAM REI MEMORIAM.<br />
              <strong>CONSTITUTIO APOSTOLICA &ldquo;VENERABILIUM NOSTRORUM&rdquo;</strong><br /><br />
              In Vietnamia, post diuturnos labores et praeclara martyrum testimonia, christiana religio ad tantam maturitatem pervenit ut hierarchia episcopalis ibidem canonice erigi possit. Quapropter, audito Venerabili Fratre Nostro S.R.E. Cardinali Sacrae Congregationi de Propaganda Fide Praefecto, Nostra Apostolica Auctoritate, constituimus et decernimus:<br />
              Tres Ecclesiasticas Provincias in Vietnamia erigimus: Hanoiensem, Huensem, et Saigonensem... Novas autem dioeceses erigimus, inter quas Dioecesim Mythoensem, cuius Ecclesiam Cathedralem constituimus sub titulo Immaculatae Conceptionis Beatae Mariae Virginis...&rdquo;
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '10px' }}>
              <div style={{ marginTop: '2px', flexShrink: 0 }}><BookOpen size={16} color="var(--color-red)" /></div>
              <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--color-dark)' }}>
                Bản Dịch Việt Ngữ Chính Thức:
              </span>
            </div>

            <div
              style={{
                fontSize: '0.88rem',
                lineHeight: 1.75,
                color: 'var(--color-dark)',
                textAlign: 'justify',
                backgroundColor: 'var(--color-input-bg)',
                padding: '14px 16px',
                borderRadius: '8px'
              }}
            >
              &ldquo;GIOAN GIÁM MỤC, TÔI TỚ CÁC TÔI TỚ CỦA THIÊN CHÚA, ĐỂ GHI NHỚ MUÔN ĐỜI SỰ VIỆC.<br />
              Tại Việt Nam, sau những năm tháng lao nhọc trường kỳ và những chứng tá đức tin anh dũng rạng ngời của các bậc Tử Đạo, đạo Thánh Chúa Kitô nay đã đạt tới sự trưởng thành đức tin viên mãn để có thể chính thức thiết lập Hàng Giáo Phẩm Chính Tòa. Vì thế, sau khi lắng nghe ý kiến của Chư Huynh Đáng Kính là các Đấng Hồng Y thuộc Thánh Bộ Truyền Bá Đức Tin, với Quyền Bính Tông Tòa Tối Cao, Ta thiết lập và chuẩn định: Thiết lập 3 Giáo Tỉnh tại Việt Nam gồm Hà Nội, Huế và Sài Gòn... Đồng thời thành lập các Giáo phận mới, trong đó có <strong>Giáo phận Mỹ Tho</strong>, và nâng ngôi thánh đường tại Mỹ Tho làm <strong>Nhà thờ Chính Tòa</strong> dâng kính tước hiệu <strong>Đức Mẹ Vô Nhiễm Nguyên Tội</strong>.&rdquo;
            </div>
          </div>

          {/* TÓM TẮT 5 QUYẾT ĐỊNH LỊCH SỬ TRỌNG YẾU */}
          <div
            style={{
              backgroundColor: 'rgba(153, 27, 27, 0.03)',
              border: '1px solid rgba(153, 27, 27, 0.12)',
              borderRadius: '12px',
              padding: '16px 20px',
              margin: '18px 0 24px'
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '0.94rem', color: 'var(--color-red)', marginBottom: '10px' }}>
              📌 Tóm Tắt 5 Quyết Định Lịch Sử Trọng Yếu Của Tông Hiến Venerabilium Nostrorum:
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.88rem', lineHeight: 1.8, color: 'var(--color-dark)' }}>
              <li>
                <strong>Chấm dứt quy chế Thừa sai Đại diện Tông Tòa (Vicariatus Apostolicus)</strong>: Đánh dấu sự trưởng thành trọn vẹn của Giáo hội Việt Nam sau hơn 300 năm hình thành kể từ hai Địa phận tiên khởi Đàng Trong và Đàng Ngoài (1659).
              </li>
              <li>
                <strong>Thiết lập 3 Tổng Giáo Phận (Giáo Tỉnh)</strong>: Giáo tỉnh Hà Nội (miền Bắc), Giáo tỉnh Huế (miền Trung) và Giáo tỉnh Sài Gòn (miền Nam).
              </li>
              <li>
                <strong>Nâng cấp đồng loạt</strong>: Tất cả các Giáo phận Tông Tòa hiện hữu tại Việt Nam được nâng lên hàng Giáo phận Chính Tòa (Dioecesis).
              </li>
              <li>
                <strong>Khai sinh Giáo phận Mỹ Tho (Dioecesis Mythoensis)</strong>: Tách các tỉnh Định Tường, Long An, Kiến Tường, Kiến Phong từ Tổng Giáo phận Sài Gòn để lập thành giáo phận độc lập thuộc Giáo tỉnh Sài Gòn (được cụ thể hóa bằng Sắc chỉ <em>Quod Venerabiles Fratres</em> ngày 27/11/1960).
              </li>
              <li>
                <strong>Chính thức công nhận Nhà thờ Chính Tòa Mỹ Tho</strong>: Thánh đường tọa lạc trên đại lộ Bourdais (nay là Hùng Vương) chính thức mang tước hiệu Nhà thờ Chính Tòa Đức Mẹ Vô Nhiễm, đặt dưới quyền cai quản của Đức Giám mục Tiên khởi Giuse Trần Văn Thiện.
              </li>
            </ul>
          </div>

          <h3 id="lich-su-cung-hien" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '22px 0 8px' }}>
            3.4. Lễ Cung Hiến &amp; Đại trùng tu Bách chu niên (2000 – 2006)
          </h3>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 14px' }}>
            Nhân dịp Đại Năm Thánh 2000, ngày <strong>21/01/2000</strong>, Đức Giám mục Giáo phận Phaolô Bùi Văn Đọc đã
            long trọng cử hành <strong>Lễ Cung Hiến Nhà thờ Chánh Tòa Mỹ Tho</strong> và chọn ngày Lễ Đức Mẹ Hồn Xác
            Lên Trời (15 tháng 8) làm lễ Bổn mạng thứ hai của nhà thờ.
          </p>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.75, textAlign: 'justify', margin: '0 0 16px' }}>
            Đến năm 2006, đánh dấu kỷ niệm 100 năm ngày khởi công xây dựng,{' '}
            <button
              type="button"
              onClick={() => {
                const bio = ALL_COMMUNITY_BIOS.find((b) => b.id === 'cha-ha-van-xung');
                if (bio) moLyLich(bio);
              }}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: 'var(--color-red)',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontFamily: 'inherit'
              }}
            >
              Linh mục Chánh xứ Giacôbê Hà Văn Xung
            </button>{' '}
            (Linh mục Trưởng Hạt Giáo hạt Mỹ Tho) đã xin ý kiến Đức Giám mục để trùng tu và nới rộng nhà thờ. Lễ khởi
            công được cử hành ngày <strong>14/06/2006</strong>, gồm thay mái ngói, nới rộng hai bên hông nhà thờ, xây
            lại phòng thánh, cải tạo tháp chuông và đặt 14 chặng Đàng Thánh Giá xung quanh nhà thờ. Sau 9 tháng thi
            công, ngày <strong>21/05/2007</strong> Đức Giám mục Giáo phận đã dâng lễ tạ ơn và khai mạc Năm Thánh mừng
            kỷ niệm 100 năm xây dựng ngôi thánh đường.
          </p>

          <h3 id="lich-su-anh-tu-lieu" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-red)', margin: '26px 0 10px' }}>
            3.5. Ảnh Tư Liệu Nhà Thờ Qua Các Thời Kỳ
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--color-subtle)', margin: '0 0 14px', lineHeight: 1.7 }}>
            Những bức ảnh dưới đây ghi lại diện mạo ngôi thánh đường và khuôn viên qua hơn một thế kỷ,
            từ thời Pháp thuộc đến trước ngày đại trùng tu năm 2006.
          </p>

          <div className="tntt-gallery">
            {[
              {
                src: '/images/lichsu_ban_khac_nha_tho_1877.jpg',
                cap: 'Tư liệu hình ảnh xưa nhất về ngôi nhà thờ thứ hai: bản khắc mặt tiền in trên tuần báo Les Missions Catholiques năm 1877, chú thích gốc “Cochinchine occidentale (Annam) — Façade de l’église de Mytho”. Nhà thờ dài 42 m, rộng 18 m, cao 36 m, 32 cột Corinthiên cao 8 m.'
              },
              {
                src: '/images/lichsu_nha_tho_dinh_tuong.jpg',
                cap: 'Chính ngôi nhà thờ trong bản khắc 1877, chụp lại thời Pháp thuộc với chú thích gốc “Cathédrale de My Tho”. Đối chiếu hai hình thấy trùng khớp từng chi tiết: mái vòm có đèn lồng, các cửa tròn trên tang trống, trán tường Baroque cuộn và ba vòm cửa. Đây là ngôi thánh đường Cha Sorel dựng, Cha Moulins hoàn tất, làm phép 12/03/1876 và bị tháo dỡ khoảng năm 1900.'
              },
              {
                src: '/images/lichsu_nha_tho_1920s_ngoai_that.jpg',
                cap: 'Ngôi Nhà thờ Chánh Tòa hiện nay nhìn từ bên hông, khoảng 1920 – 1929. Ảnh mang chú thích gốc “My Tho 1920-1929 — L’Église”. Tháp chuông khi đó còn nằm liền với thánh đường.'
              },
              {
                src: '/images/lichsu_nha_tho_1920s_noi_that.jpg',
                cap: 'Lòng nhà thờ khoảng 1920 – 1929, trang hoàng cờ và lá dừa cho một đại lễ. Thấy rõ hàng cột tròn chống đỡ, mái vòm và nền gạch bông hoa văn thời Pháp.'
              },
              {
                src: '/images/lichsu_mat_tien_xua.jpg',
                cap: 'Mặt tiền thánh đường trước đợt đại trùng tu 2006 — ba vòm cửa nhọn, hai cửa sổ hoa hồng tròn và tháp chuông khung thép dựng bên hông.'
              },
              {
                src: '/images/lichsu_dai_lo_hung_vuong_xua.jpg',
                cap: 'Nhà thờ nhìn từ đại lộ Hùng Vương (trước là đại lộ Bourdais) trong nhịp sống thường nhật của Mỹ Tho xưa.'
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
            Ảnh tư liệu do giáo xứ cung cấp; riêng bản khắc năm 1877 lấy từ tuần báo Les Missions Catholiques
            (Thư viện Quốc gia Pháp — Gallica, ark:/12148/bpt6k105617d, tr.595). Chú thích niên đại theo ghi chú gốc in
            trên ảnh. Ảnh tư liệu về Ba Giồng và Giáo phận nằm ở mục 4.1.
          </p>

          {/* NIÊN BIỂU CÁC ĐỜI LINH MỤC CHÁNH SỞ HỌ ĐẠO CHÁNH TÒA MỸ THO */}
          <h3 id="nien-bieu-cha-so" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-red)', margin: '26px 0 10px' }}>
            3.6. Niên Biểu Các Đời Linh Mục Chánh Sở Nhà Thờ Chánh Tòa Mỹ Tho (1861 – Nay)
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--color-subtle)', margin: '0 0 6px' }}>
            Nhấn vào tên linh mục để xem lý lịch đầy đủ. Niên hiệu và tiểu sử các vị thừa sai
            Hội Thừa Sai Paris được đối chiếu với hồ sơ lưu trữ của Viện Nghiên cứu Pháp – Á (IRFA).
          </p>
          <div
            style={{
              border: '1px solid var(--color-border-subtle)',
              backgroundColor: 'rgba(153, 27, 27, 0.03)',
              borderRadius: '10px',
              padding: '12px 14px',
              margin: '0 0 16px'
            }}
          >
            <p style={{ fontSize: '0.88rem', lineHeight: 1.7, margin: '0 0 8px', textAlign: 'justify' }}>
              <strong>Vì sao bảng này chỉ có mười mấy tên?</strong> Theo tài liệu chính thức của Giáo phận Mỹ Tho,
              từ năm <strong>1866 đến 1960</strong> — gần một trăm năm — họ đạo được <strong>hơn 80 linh mục</strong>{' '}
              hướng dẫn chăm sóc, trong đó <strong>khoảng 30 vị là linh mục thừa sai</strong> ngoại quốc, số còn lại là
              linh mục Việt Nam. Bảng dưới đây chỉ liệt kê các vị <strong>chánh sở</strong>, không phải toàn bộ linh mục
              phục vụ.
            </p>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.7, margin: '0 0 8px', textAlign: 'justify' }}>
              Lý do con số chênh nhau lớn như vậy: <strong>&ldquo;vùng Mỹ Tho&rdquo;</strong> thời ấy được hiểu là một
              địa hạt rộng, gồm các họ đạo Mỹ Tho, Bình Tạo, Điều Hoà, Vĩnh Tường, Thạnh Trị, Mỹ Chánh, mở rộng đến cả
              Kinh Điều và Bình Đại. Phần lớn trong hơn 80 vị ấy là các cha phó và các cha coi sóc những họ nhánh đó,
              chứ không phải chánh sở nhà thờ mẹ. Từ <strong>1960 đến 2007</strong>, giáo xứ có thêm{' '}
              <strong>20 linh mục</strong> phục vụ, <strong>trong đó 6 vị làm cha sở</strong>.
            </p>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.7, margin: '0 0 8px', textAlign: 'justify' }}>
              Báo cáo thường niên năm <strong>1897</strong> của Hội Thừa Sai Paris cho biết con số cụ thể:{' '}
              <em>&ldquo;My-tho est le chef-lieu d&rsquo;un district qui compte près de 4.000 fidèles, 19 chrétientés,
              avec 8 prêtres pour les desservir&rdquo;</em> — Mỹ Tho là lỵ sở một địa hạt gần 4.000 giáo dân, 19 họ đạo,
              do <strong>8 linh mục</strong> coi sóc. Tám vị cùng lúc, thay phiên nhau qua gần một trăm năm, chính là
              cách con số <strong>hơn 80</strong> hình thành.
            </p>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.65, margin: 0, color: 'var(--color-subtle)' }}>
              Số giáo dân qua các mốc: <strong>28/01/1862 — 1.986 người</strong> (ghi nhận của Cha Renier);{' '}
              <strong>1881 – 1882 — 3.651 người</strong>, gồm 330 người Âu châu và 3.321 người Việt Nam;{' '}
              <strong>1897 — gần 4.000 giáo dân</strong> trong toàn địa hạt;{' '}
              <strong>năm 2017 — khoảng 3.600 giáo dân</strong> trong giáo xứ. Số người lớn được rửa tội mỗi năm tại
              địa hạt Mỹ Tho theo báo cáo thường niên: 206 (1885), 403 (1889), 402 (1891), 243 (1892), 214 (1893).
              Những khoảng thời gian còn thiếu tư liệu trong bảng được ghi rõ là <em>chưa cập nhật</em> thay vì suy đoán.
            </p>
          </div>

          <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
            <table className="pastor-timeline-table">
              <caption className="sr-only">
                Niên biểu các đời linh mục chánh sở Nhà thờ Chánh Tòa Mỹ Tho
              </caption>
              <thead>
                <tr>
                  <th scope="col" style={{ width: '50px' }}>STT</th>
                  <th scope="col" style={{ width: '130px' }}>Thời Gian</th>
                  <th scope="col">Linh Mục Chánh Sở</th>
                  <th scope="col">Dấu Ấn Mục Vụ &amp; Lịch Sử</th>
                </tr>
              </thead>
              <tbody>
                {PASTOR_TIMELINE.map((row, idx) => {
                  const bio = row.bioId
                    ? ALL_COMMUNITY_BIOS.find((b) => b.id === row.bioId)
                    : undefined;
                  const isCurrent = row.period.includes('nay');

                  return (
                    <tr key={`${row.period}-${idx}`} className={bio ? undefined : 'pastor-row-empty'}>
                      <td style={{ fontWeight: 700 }}>{idx + 1}</td>
                      <td style={{ fontWeight: 600, color: isCurrent ? 'var(--color-red)' : 'var(--color-subtle)' }}>
                        {row.period}
                      </td>
                      <td>
                        {bio ? (
                          <button
                            type="button"
                            className="pastor-name-btn"
                            onClick={() => moLyLich(bio)}
                            aria-label={`Xem lý lịch ${bio.name}`}
                          >
                            {bio.name}
                          </button>
                        ) : (
                          <em style={{ color: 'var(--color-subtle)' }}>
                            {row.name ?? 'Chưa cập nhật'}
                          </em>
                        )}
                      </td>
                      <td style={{ color: bio ? 'var(--color-dark)' : 'var(--color-subtle)' }}>
                        {row.note ?? (
                          <em>Chưa cập nhật — còn thiếu tư liệu về giai đoạn này.</em>
                        )}
                        {row.source && (
                          <div className="pastor-source">Nguồn: {row.source}</div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Ghi công các linh mục khác — chữ nhỏ và mờ hơn phần chính */}
          <p
            style={{
              fontSize: '0.74rem',
              lineHeight: 1.75,
              color: 'var(--color-subtle)',
              opacity: 0.72,
              margin: '-8px 0 24px',
              textAlign: 'justify'
            }}
          >
            <strong style={{ fontWeight: 700 }}>Các Linh mục đã phục vụ họ đạo</strong> — ngoài hàng chánh sở kể trên,
            trong gần một trăm năm 1866 – 1960 còn hơn 80 linh mục nữa hướng dẫn chăm sóc họ đạo, khoảng 30 vị trong số
            đó là linh mục thừa sai. Đã tra được {PRIESTS_SERVED.length} vị từ văn khố Hội Thừa Sai Paris, mỗi tên kèm mã
            hồ sơ để tra cứu lại:{' '}
            {PRIESTS_SERVED.map((c, i) => (
              <span key={c.ma}>
                {i > 0 && ' · '}
                <strong style={{ fontWeight: 700 }}>{c.name}</strong> <em>({c.note} — {c.ma})</em>
              </span>
            ))}
            .{' '}
            <br />
            <strong style={{ fontWeight: 700 }}>Các Đức Giám mục có dấu ấn trực tiếp trên họ đạo:</strong>{' '}
            {BISHOPS_LINKED.map((c, i) => (
              <span key={c.name}>
                {i > 0 && ' · '}
                <strong style={{ fontWeight: 700 }}>{c.name}</strong> <em>({c.note}{c.ma ? ` — ${c.ma}` : ''})</em>
              </span>
            ))}
            .{' '}
            <br />
            Khoảng 50 linh mục Việt Nam từng phục vụ họ đạo chưa có nguồn số hoá công khai — tên các ngài nằm trong sổ bộ
            họ đạo và văn khố Tòa Giám mục; trang này để trống còn hơn ghi sai tên người đã phục vụ.
          </p>
          <h3 id="kien-truc-anh" style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-red)', margin: '26px 0 10px' }}>
            3.7. Kiến trúc &amp; Nghệ thuật Thánh
          </h3>
          {/* Gallery ảnh kiến trúc */}
          <div
            className="responsive-grid"
          >
            {[
              { src: '/images/thanh_le_dong_te_my_tho.jpg', title: 'Mặt tiền Phục Hưng', desc: 'Kiến trúc cột trụ đối xứng hài hòa' },
              { src: '/images/nhatho2.jpg', title: 'Gian Thánh Cung', desc: 'Vòm Romanesque & Bàn thờ cẩm thạch' },
              { src: '/images/nhatho3.jpg', title: 'Tháp Chuông', desc: 'Kiến trúc tách rời độc đáo' },
              { src: '/images/nhatho_dai_duc_me.jpg', title: 'Đài Đức Mẹ Lộ Đức', desc: 'Khuôn viên linh thiêng cầu nguyện' }
            ].map((img, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '10px',
                  padding: '8px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
                  cursor: 'pointer'
                }}
                onClick={() => moAnh({ src: img.src, caption: `${img.title} — ${img.desc}` })}
              >
                <div style={{ position: 'relative', width: '100%', height: '140px', borderRadius: '6px', overflow: 'hidden' }}>
                  <Image src={img.src} alt={img.title} fill sizes="240px" style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.84rem', marginTop: '6px', color: 'var(--color-dark)' }}>
                  {img.title}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-subtle)' }}>{img.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="phung-vu" style={{ marginBottom: '36px' }}>
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
            3.8. Giờ Thánh Lễ &amp; Lịch Mục Vụ
          </h2>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.75, margin: '0 0 14px' }}>
            Giờ phụng vụ tại Nhà Thờ Chính Tòa Mỹ Tho được cử hành đều đặn mỗi ngày. Bảng dưới đây đồng bộ trực tiếp với
            lịch giờ lễ của Giáo phận: Ban Phụng Vụ sửa giờ ở mục Giờ Lễ thì trang này đổi theo ngay, không cần đăng lại.
          </p>

          <div
            style={{
              backgroundColor: 'var(--color-card-bg)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: '12px',
              padding: '16px 20px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
            }}
          >
            <div className="responsive-grid">
              <div>
                <div style={{ fontWeight: 800, color: 'var(--color-red)', fontSize: '0.9rem', marginBottom: '6px' }}>
                  CÁC NGÀY TRONG TUẦN
                </div>
                {chanhToa.weekdayMass.map((time) => (
                  <div key={time} style={{ fontSize: '0.86rem', color: 'var(--color-dark)' }}>
                    • Thánh lễ: <strong>{time}</strong>
                  </div>
                ))}

                {chanhToa.saturdayMass && chanhToa.saturdayMass.length > 0 && (
                  <>
                    <div style={{ fontWeight: 800, color: 'var(--color-red)', fontSize: '0.9rem', margin: '10px 0 6px' }}>
                      THỨ BẢY (LỄ VỌNG CHÚA NHẬT)
                    </div>
                    {chanhToa.saturdayMass.map((time) => (
                      <div key={time} style={{ fontSize: '0.86rem', color: 'var(--color-dark)' }}>
                        • Thánh lễ: <strong>{time}</strong>
                      </div>
                    ))}
                  </>
                )}
              </div>

              <div>
                <div style={{ fontWeight: 800, color: 'var(--color-red)', fontSize: '0.9rem', marginBottom: '6px' }}>
                  CHÚA NHẬT (NGÀY CỦA CHÚA)
                </div>
                {chanhToa.sundayMass.map((time, idx) => (
                  <div key={time} style={{ fontSize: '0.86rem', color: 'var(--color-dark)' }}>
                    • Lễ {ROMAN[idx] ?? idx + 1}: <strong>{time}</strong>
                    {SUNDAY_MASS_NOTES[time] ? ` (${SUNDAY_MASS_NOTES[time]})` : ''}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                marginTop: '14px',
                paddingTop: '10px',
                borderTop: '1px dashed var(--color-border-subtle)',
                fontSize: '0.8rem',
                fontStyle: 'italic',
                color: 'var(--color-subtle)'
              }}
            >
              Bí tích Hòa Giải (Giải tội): Trước và sau tất cả các Thánh lễ trong tuần hoặc liên hệ trực tiếp văn phòng
              nhà xứ.
            </div>
          </div>
        </section>

      <CuaSoLyLich bio={lyLich} onClose={() => setLyLich(null)} />
      <CuaSoAnh anh={anh} onClose={() => setAnh(null)} />
    </KhungTrang>
  );
}
