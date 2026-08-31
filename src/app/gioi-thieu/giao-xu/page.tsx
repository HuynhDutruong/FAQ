'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Eye, ScrollText, BookOpen, Scroll
} from 'lucide-react';
import { useChanhToaMassTimes } from '@/lib/useChanhToaMassTimes';
import KhungTrang from '../KhungTrang';
import { CuaSoLyLich, CuaSoAnh } from '../CuaSo';
import MetaUpdater from '@/components/MetaUpdater';
import {
  ALL_COMMUNITY_BIOS,
  BISHOPS_LINKED,
  PASTOR_TIMELINE,
  PRIESTS_SERVED,
  ROMAN,
  SUNDAY_MASS_NOTES
,
  CHA_PHO_BIOS
,
  PortraitFrame
} from '../duLieu';
import type { DetailedBioRecord } from '../duLieu';

export default function Trang() {
  const chanhToa = useChanhToaMassTimes();
  const [lyLich, setLyLich] = useState<DetailedBioRecord | null>(null);
  const [anh, setAnh] = useState<{ src: string; caption: string } | null>(null);

  const allBios = [...ALL_COMMUNITY_BIOS];

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
    <KhungTrang tieuDe="Giáo Xứ Chánh Tòa Mỹ Tho" phuDe="Chương III. Chương II khép lại ở một pháp trường tháng 4 năm 1861; chương này mở ra một tháng sau đó, cách mười hai cây số, trong một ngôi chùa bỏ hoang bên chợ — rồi ba lần dựng nhà thờ và mười sáu đời cha sở, đến ngôi thánh đường trên đại lộ Hùng Vương hôm nay." duongDan="/gioi-thieu/giao-xu">
        <section id="lich-su" style={{ marginBottom: '36px' }}>

          {/* ẢNH NỔI PHẢI: Nhà thờ Chánh Tòa */}
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
              onClick={() => moAnh({ src: '/images/nhatho2.jpg', caption: 'Toàn cảnh ngôi thánh đường Chánh Tòa Mỹ Tho cổ kính xây dựng năm 1906–1910. Kiến trúc Hy Lạp–Rôma Phục Hưng, dài 53 m, rộng 17 m.' })}
            >
              <Image
                src="/images/nhatho2.jpg"
                alt="Nhà thờ Chánh Tòa Mỹ Tho"
                fill
                sizes="290px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', marginTop: '6px', lineHeight: 1.4 }}>
              Nhà thờ Chánh Tòa Đức Mẹ Vô Nhiễm, Mỹ Tho — ngôi thánh đường thứ ba của họ đạo, khởi công 1906.
            </div>
          </div>

          <p className="doc-para">
            Hai chương trước đứng ở trên cao nhìn xuống: Chương I kể một Giáo hội trải hai ngàn năm và hai trăm sáu mươi
            bảy đời Giáo hoàng, Chương II kể một vùng đất trải ba thế kỷ đức tin. Chương này thì ngược lại — nó chỉ kể
            <strong> một ngôi nhà thờ</strong>, và kể thật kỹ. Cùng một biến cố, nhìn từ hai độ cao khác nhau, cho hai
            câu chuyện khác nhau: ở Chương II, năm 1861 là năm Cha Phêrô Nguyễn Văn Lựu tử đạo và họ đạo Ba Giồng tan
            tác; ở chương này, năm 1861 là năm những người sống sót của cuộc tan tác ấy dựng lên một cộng đoàn mới bên
            bờ sông. Cùng một năm, cùng một dòng người, hai câu chuyện.
          </p>

          <p className="doc-para">
            Nếu bạn muốn biết vì sao lại có cuộc bách hại đó, vì sao có Ba Giồng và ai là Cha Lựu, hãy đọc{' '}
            <Link href="/gioi-thieu/giao-phan" style={{ color: 'var(--color-red)', fontWeight: 700 }}>Chương II — Lịch
            sử Giáo Phận Mỹ Tho</Link> trước. Còn nếu bạn đã đọc rồi, thì đây là chỗ câu chuyện tiếp tục: từ đây trở đi
            mọi thứ đều đo được bằng mét, đếm được bằng sổ rửa tội, và có ngày tháng ghi trong báo cáo của các cha thừa
            sai.
          </p>

          {/* ── BẮT ĐẦU DÒNG CHẢY LỊCH SỬ ── */}
          <p className="doc-para">
            Bản báo cáo viết tay của Cha thừa sai <strong>Renier</strong>, hiện lưu trữ tại Toà Tổng Giám mục Sài Gòn, mở đầu lịch sử họ đạo
            bằng một câu dứt khoát: <strong>&ldquo;Trước năm 1861 chưa có cộng đoàn công giáo Mỹ Tho.&rdquo;</strong> Chỉ
            có những người Công giáo bị lính An Nam giam giữ trong đồn — họ thuộc bổn đạo Thủ Ngữ, Ba Giồng hay các họ đạo
            khác. Trong số tù nhân ấy có một cụ già tám mươi tuổi, <strong>Cha Thiềng</strong>, một linh mục Việt Nam.
          </p>

          <figure className="doc-figure doc-figure-right">
            <button type="button" className="tntt-thumb-btn" onClick={() => moAnh({ src: '/images/lichsu_nha_tho_la_dau_tien.jpg', caption: 'Nhà thờ lá đầu tiên của họ đạo Mỹ Tho — tranh phục dựng in trong Kỷ yếu 100 năm của giáo xứ. Đây vốn là một ngôi chùa cũ bên cạnh chợ, được Đô đốc Charner trao cho họ đạo làm nơi thờ phượng dưới sự bảo trợ của Thánh Phanxicô Xaviê.' })} aria-label="Phóng to ảnh tư liệu">
              <Image src="/images/lichsu_nha_tho_la_dau_tien.jpg" alt="Nhà thờ lá đầu tiên — tranh phục dựng in trong Kỷ yếu 100 năm" width={900} height={700} sizes="(max-width: 720px) 92vw, 320px" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
            </button>
            <figcaption className="doc-caption">Nhà thờ lá đầu tiên — ngôi chùa cũ bên chợ, Đô đốc Charner trao cho họ đạo. Tranh phục dựng in trong Kỷ yếu 100 năm.</figcaption>
          </figure>

          <p className="doc-para">
            <strong>Cha Phêrô Nguyễn Văn Lựu</strong> vừa từ Mặc Bắc đổi về Ba Giồng, cách Mỹ Tho khoảng 12 km, và được phép
            vào đồn thăm Cha Thiềng. Người giúp việc tên <strong>Danh</strong> trao cho Cha Lựu bức thư của Cha Thiềng.
            Rủi thay ngài lỡ tay đánh rơi. Lính nhặt được, báo lên xếp; ông này đòi xem thư rồi hỏi ngài là ai. Ngài đáp:
            <em>đạo trưởng</em>. Ngài bị tống ngục và bị kết án tử hình vì không chịu chối đạo và bước qua thập giá. Bản
            báo cáo còn đính chính một chi tiết mà người sau hay nhầm: <strong>Cha Lựu bị chém đầu vào tháng tư, không
            phải ở chỗ Cha Moulins về sau dựng cây thập giá bằng đá granit đối diện lò gạch trên đường đi Sài Gòn, mà
            ngay bên cạnh cổng vào lò gạch.</strong> <em>(Để hiểu rõ hơn về cuộc tử đạo và vai trò của Cha Lựu trong lịch sử Giáo phận, xem bài <Link href="/gioi-thieu/giao-phan" style={{ color: 'var(--color-red)', textDecoration: 'underline' }}>Lịch sử Giáo Phận Mỹ Tho</Link>.)</em>
          </p>

          <p className="doc-para">
            <strong>Tháng 5 năm 1861 người Pháp chiếm Mỹ Tho.</strong> Từ lúc đó, nhiều người Công giáo ở các tỉnh đồng bằng
            tìm về Mỹ Tho ẩn náu dưới lá cờ Pháp để tránh sự bách hại của triều đình An Nam. Cộng đoàn hình thành từ đó.
          </p>

          <p className="doc-para">
            <strong>Cha Bề Trên Guillou là cha sở đầu tiên của họ đạo mới này.</strong> Nhà thờ khi ấy là một ngôi chùa cũ nằm
            bên cạnh chợ; <strong>Đô đốc Charner</strong> đã cho họ đạo ngôi chùa này để dùng làm nơi thờ phượng dưới sự
            che chở của Thánh quan thầy Phanxicô Xaviê. Ngôi nhà thờ ấy làm bằng tranh, do một linh mục Việt Nam là{' '}
            <strong>Cha Phiên</strong> — cha phó của Cha Guillou — trông coi. Đối diện nhà thờ là ngôi nhà tranh của{' '}
            <strong>Cha Marc</strong>, mà giáo dân quen gọi là <strong>Cha Thanh</strong>: trước kia ngài là thừa sai ở
            Bắc Kỳ, nhưng được tách ra để làm thông dịch cho chính quyền Pháp.
          </p>

          <p className="doc-para">
            Cuối năm 1861, vì lo sợ cuộc bách hại sẽ ập tới dòng nữ tu Việt Nam ở Bãi Xan, Cha Guillou ra lệnh cho nhà dòng
            đến tá túc ở Mỹ Tho. Nhà của các chị được cất bằng tranh, gần nhà thờ Thánh Phanxicô Xaviê.
          </p>

          <p className="doc-para">
            Cha Guillou rời Mỹ Tho và được thay thế bởi <strong>Cha Gernot</strong>, nhận nhiệm sở{' '}
            <strong>ngày 28 tháng 01 năm 1862</strong>. Vào lúc này họ đạo Mỹ Tho có <strong>1.986 giáo dân</strong>.
            Riêng trong năm 1861 đã có <strong>2.250 lượt người xưng tội và 207 em rước lễ</strong>.
          </p>

          <p className="doc-para">
            Cha Gernot ở Mỹ Tho khoảng hai năm rồi đổi đi Cái Mơn vào khoảng đầu năm 1864, dẫn theo các chị em nữ tu dòng Bãi
            Xan. Cũng trong năm 1864, <strong>các sơ dòng Thánh Phaolô</strong> đến thế chỗ các sơ Việt Nam vừa ra đi, ở
            ngay nơi các nữ tu Mến Thánh Giá để lại. <strong>Mẹ Bề Trên đầu tiên của các sơ người Pháp ở Mỹ Tho là sơ
            Lizion.</strong> Chính trong năm 1864 đã khởi sự có các trường để giáo dục thanh thiếu niên nam nữ, do các sơ
            coi sóc, ngoài ra còn có một cô nhi viện.
          </p>

          <p className="doc-para">
            Từ năm 1862 đến 1864 không có tài liệu trực tiếp nào về hoạt động của họ đạo. Nhưng theo bản báo cáo của Cha Marc
            năm 1865, có thể kết luận rằng các cha Pháp và Việt Nam ở Mỹ Tho <em>không hề rảnh rỗi</em>. Họ đạo Mỹ Tho khi
            ấy gồm các cộng đoàn <strong>Bình Tạo, Điều Hòa, Chợ Cũ</strong> và có lẽ cả <strong>Vĩnh Tường</strong>; bốn
            nơi này làm thành họ đạo Thánh Phanxicô Xaviê ở Mỹ Tho. Ngoài ra còn <strong>Xoài Mút</strong> cách 7 km về
            phía tây, <strong>Thủ Ngữ</strong> 7 km, <strong>Tân Xuân</strong> 5 – 6 km, <strong>Họ Giồng</strong> tức Ba
            Giồng khoảng 15 km, <strong>Trấn Định</strong> tức Tân Hiệp, <strong>Vũng Gù</strong> tức Tân An, và{' '}
            <strong>Rạch Chanh</strong> qua khỏi Tân An.
          </p>

          <div className="doc-box">
            <div className="doc-box-title">Sổ rửa tội năm 1865 — bản báo cáo của Cha Marc</div>
            <p className="doc-box-text">
              <strong>Vùng Mỹ Tho:</strong> Bình Tạo 646 giáo dân · Điều Hòa 743 · Chợ Cũ 57 · Xoài Mút 68 · Thủ Ngữ 384 ·
              Tân Xuân 148. Số người lớn rửa tội năm 1865: <strong>121</strong>.
              <br />
              <strong>Họ Giồng (Ba Giồng):</strong> Họ Giồng 393 · Trấn Định 21 · Vũng Gù 47 · Rạch Chanh 9. Người lớn rửa
              tội: <strong>30</strong>.
            </p>
            <p className="doc-box-note">
              Con số cho thấy quy mô thật của &ldquo;vùng Mỹ Tho&rdquo; thời ấy: một địa hạt trải rộng chứ không phải một
              giáo xứ. Điều Hòa và Bình Tạo đông hơn cả trung tâm Mỹ Tho.
            </p>
          </div>

          {/* ── NGÔI NHÀ THỜ THỨ HAI ── */}
          <p className="doc-para">
            Nhà tranh không còn đủ cho một họ đạo đang lớn. Năm <strong>1866</strong>, Đức cha <strong>Miche</strong> long
            trọng đặt viên đá xây dựng một ngôi nhà thờ kiên cố. Nhưng tường mới cao chừng một mét thì công việc phải
            ngưng, và suốt nhiệm kỳ của mình <strong>Cha Marc vẫn phải dâng lễ trong một nhà nguyện lợp lá</strong>. Ngài
            qua đời năm 1870 mà chưa thấy ước nguyện thành sự.
          </p>

          <figure className="doc-figure doc-figure-right">
            <button type="button" className="tntt-thumb-btn" onClick={() => moAnh({ src: '/images/lichsu_ban_khac_nha_tho_1877.jpg', caption: 'Mặt tiền ngôi nhà thờ thứ hai, bản khắc in trên tuần báo Les Missions Catholiques năm 1877, trang 595. Kỷ yếu 100 năm của giáo xứ dẫn lại đúng bản khắc này với cùng số trang — hai nguồn độc lập gặp nhau.' })} aria-label="Phóng to ảnh tư liệu">
              <Image src="/images/lichsu_ban_khac_nha_tho_1877.jpg" alt="Mặt tiền ngôi nhà thờ thứ hai — Les Missions Catholiques 1877" width={900} height={700} sizes="(max-width: 720px) 92vw, 320px" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
            </button>
            <figcaption className="doc-caption">Mặt tiền ngôi nhà thờ thứ hai, bản khắc in trên tuần báo Les Missions Catholiques năm 1877, trang 595 — hai nguồn độc lập gặp nhau.</figcaption>
          </figure>

          <p className="doc-para">
            <strong>Cha Sorel</strong> về Mỹ Tho năm 1870. Vốn có kiến thức kiến trúc — trước đó ngài đã dựng ở Thủ Dầu Một
            một ngôi nhà thờ gạch mà các sĩ quan công binh Pháp đánh giá cao — ngài nghiên cứu đồ án, xin ngân khoản, mua
            vật liệu, thuê thợ, rồi trực tiếp có mặt trên công trường chỉ huy thợ nề thợ mộc, <strong>nhiều khi cầm bay
            làm việc như một người thợ lành nghề</strong>. Tường lên đủ độ cao, mái đã lợp, ngài đang làm mặt tiền và cung
            thánh thì sức lực phản bội: ngã bệnh nặng, ngài phải sang nhà hưu Hồng Kông rồi về Nice, qua đời ngày
            26/02/1873.
          </p>

          <p className="doc-para">
            Việc hoàn tất được giao cho <strong>Cha Moulins</strong> — khó tìm được đôi tay khéo hơn. Suốt ba năm ngài vừa lo
            được nguồn kinh phí vừa lần lượt làm thợ chạm, thợ mộc, thợ trang trí, đưa công trình gian nan ấy đến đích.
            <strong> Ngày 12 tháng 03 năm 1876, Đức cha Colombert làm phép trọng thể ngôi nhà thờ Mỹ Tho.</strong> Đại tá
            hải quân lục chiến Trève, các quan cai trị hạt, sĩ quan và công chức, toàn thể binh sĩ đồn trú, các Sư huynh
            Lasan và các Nữ tu Thánh Phaolô cùng học sinh, và toàn thể giáo dân đều có mặt.
          </p>

          <div className="doc-box">
            <div className="doc-box-title">Ngôi nhà thờ thứ hai qua mô tả năm 1877</div>
            <p className="doc-box-text">
              Dài <strong>42 m</strong>, rộng <strong>18 m</strong>, cao <strong>36 m</strong>. Lòng chính rộng 9,40 m;
              hai lòng bên 4,30 m; mỗi gian 4,60 m. <strong>32 cột Corinthiên cao 8 m</strong> đỡ các thức cột rời nối
              nhau bằng những vòm cuốn có trang trí; trần vòm cuốn, kiểu thùng ở lòng chính và giao nhau ở hai lòng bên.
              Toàn bộ phào chỉ và hoa văn đắp bằng <strong>vữa stuc kiểu Hoa</strong>, cứng và đẹp như đá. Các đầu cột lá
              phiên thảo, hoa văn vòm trần, bàn thờ và lan can đều do <strong>một người thợ Hoa</strong> đắp tay tại chỗ
              bằng chiếc bay nhỏ. <strong>16 cửa sổ kính màu</strong>; cửa kính hậu cung có sáu huy hiệu kể các mầu nhiệm
              chính của đạo.
            </p>
            <p className="doc-box-note">
              Tư liệu Pháp gọi đơn giản là &ldquo;église de Mytho&rdquo;, tư liệu Việt quen gọi là{' '}
              <strong>nhà thờ Vĩnh Tường</strong>, kính Thánh Tâm — cùng một ngôi.
            </p>
          </div>

          <p className="doc-para">
            Năm 1877, họ đạo đã có bộ máy mục vụ đầy đủ: <strong>4 Sư huynh Lasan dạy 150 học sinh</strong>;{' '}
            <strong>5 Nữ tu Thánh Phaolô</strong> coi trường nữ và một cô nhi viện 70 – 75 em; <strong>4 nữ tu khác</strong>{' '}
            chăm 40 – 45 bệnh nhân ở bệnh viện bản xứ; và <strong>3 nữ tu</strong> phục vụ quân y viện trong thành.
          </p>

          <p className="doc-para">
            Số giáo dân tăng đều suốt thời kỳ ổn định. Sổ họ đạo ghi: <strong>1881 – 1882</strong> có 3.651 người, gồm 330
            người Âu châu và 3.321 người Việt Nam. <strong>1895 – 1896</strong>: 462 người Âu, 912 người Việt — rồi cùng
            năm ấy 55 người Âu, 1.013 người Việt. Năm 1895 <strong>Bà Phó Vàng dâng 500 đồng</strong> để cất lại nhà
            nguyện Thánh Anna đã cũ ở đất thánh. <strong>1897 – 1903</strong>: người Âu trên dưới 100, người Việt trên
            dưới 1.000. Năm <strong>1897</strong>, báo cáo thường niên của Hội Thừa Sai ghi Mỹ Tho là lỵ sở một địa hạt
            <strong> gần 4.000 giáo dân, 19 họ đạo, do 8 linh mục coi sóc</strong>.
          </p>

          <p className="doc-para">
            Năm <strong>1903</strong>, theo lời kêu gọi của chính quyền, <strong>các sơ Phaolô đến làm y tá cho nhà thương
            cùi ở Cù Lao Rồng</strong> — 3 sơ Pháp và 2 sơ Việt Nam, chăm trung bình từ 180 đến 200 người cùi.
          </p>

          {/* ── NGÔI NHÀ THỜ THỨ BA — HIỆN NAY ── */}
          <p className="doc-para">
            Rồi đến khúc ngoặt lạ lùng nhất trong lịch sử ngôi thánh đường — may thay chính Cha Renier đã chép lại bằng ngôi
            thứ nhất. Năm 1903 ngài được phép cất một căn nhà gần nhà thờ và vào khoảng tháng 9 năm ấy thì dọn vào ở.
          </p>

          <p className="doc-para">
            <strong>Ngày 3 tháng 1 năm 1904</strong>, theo lệnh Đức Giám mục <strong>Monard</strong> và của chính quyền địa
            phương, vì sợ một ngày nào đó ngôi nhà thờ đã suy yếu sẽ sụp đổ, ngài cho <strong>hạ ngôi nhà thờ</strong>.
            Công việc cần đến ba tuần lễ. Rồi điều này xảy ra — nguyên văn lời ngài:{' '}
            <em>&ldquo;May thay ngày 1 tháng 5 năm 1904, một cơn bão khủng khiếp tàn phá tỉnh Mỹ Tho đã làm đổ nhào sườn
            nhà mà một số cây đang trong tình trạng mục nát. <strong>Cơn bão đã hạ nhà thờ thay bàn tay con
            người.</strong>&rdquo;</em> Trường học cách đó không xa cũng bị thiệt hại nặng nề; nhà trẻ và các trường được
            chuyển về nhà thờ Vĩnh Tường.
          </p>

          <figure className="doc-figure doc-figure-left">
            <button type="button" className="tntt-thumb-btn" onClick={() => moAnh({ src: '/images/lichsu_nha_tho_1920s_ngoai_that.jpg', caption: 'Ngôi nhà thờ hiện nay nhìn từ bên hông, ảnh chụp khoảng 1920 – 1929. Công trình khởi công tháng 1/1906 ở phía bên kia đại lộ Bourdais, đối diện ngôi nhà thờ cũ đã bị hạ.' })} aria-label="Phóng to ảnh tư liệu">
              <Image src="/images/lichsu_nha_tho_1920s_ngoai_that.jpg" alt="Nhà thờ Chánh Tòa hiện nay, ảnh khoảng 1920–1929" width={900} height={700} sizes="(max-width: 720px) 92vw, 320px" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
            </button>
            <figcaption className="doc-caption">Nhà thờ hiện nay nhìn từ bên hông, ảnh khoảng 1920 – 1929. Khởi công 1/1906, bên kia đại lộ Bourdais, đối diện ngôi nhà thờ cũ.</figcaption>
          </figure>

          <p className="doc-para">
            Trường học không còn gần nhà xứ nữa, và người Công giáo trong khu vực cũng dần bỏ đi. Đức Giám mục khuyên ngài đến
            ở trong nhà xứ Vĩnh Tường, gần <strong>nhà thờ Thánh Tâm do Cha Faron xây</strong>; <strong>ngày 18 tháng 3
            năm 1905</strong> ngài thực hiện lời khuyên này. Nhưng nhà thờ Thánh Tâm cũng xuống cấp trầm trọng vì cơn bão
            1904, lại quá nhỏ so với số giáo dân Mỹ Tho. Phải nghĩ đến một ngôi nhà thờ lớn hơn — và ngài khởi sự từ{' '}
            <strong>tháng 7 năm 1905</strong>.
          </p>

          <p className="doc-para">
            <strong>Bắt đầu từ tháng 1 năm 1906 khởi sự công việc làm móng ngôi nhà thờ mới.</strong> Một chi tiết mà ít người
            để ý: <strong>ngôi nhà thờ này nằm phía bên kia đại lộ Bourdais, đối diện ngôi nhà thờ cũ</strong> — nghĩa là
            nhà thờ Chánh Tòa hôm nay không đứng trên nền ngôi nhà thờ năm 1876, mà ở bên kia đường. Riêng việc xây móng
            kéo dài mãi đến năm 1907.
          </p>

          <p className="doc-para">
            Năm <strong>1907</strong>, những người Công giáo Mỹ Tho dâng một thỉnh nguyện thư lên Vị Đại Diện Tông Toà, trong
            đó họ cũng xin cho được phép xây dựng trong họ đạo một trường học — <strong>Trường Thánh Giuse</strong> —
            dành cho nam sinh dưới sự điều khiển của các Sư huynh Lasan.
          </p>

          <div className="doc-box">
            <div className="doc-box-title">Vì sao mốc &ldquo;100 năm&rdquo; là 1907 chứ không phải 1906 hay 1910</div>
            <p className="doc-box-text">
              Công trình khởi công tháng 1/1906 nhưng riêng phần móng kéo dài tới 1907, và cũng năm 1907 giáo dân dâng
              thỉnh nguyện thư lập trường. Giáo xứ lấy <strong>1907</strong> làm mốc chính thức thành lập, nên năm{' '}
              <strong>2007</strong> mừng Năm Thánh trăm năm — dịp Toà Ân Giải Tối Cao ban Ơn Toàn Xá và cũng là dịp đại
              trùng tu ngôi thánh đường.
            </p>
          </div>

          {/* ── SẮC CHỈ 1960 — CROSS-REFERENCE ── */}
          <p className="doc-para">
            Từ một họ đạo ven sông, ngôi thánh đường Mỹ Tho bước sang một chương mới hoàn toàn vào ngày <strong>24 tháng 11 năm 1960</strong>, khi Thánh Giáo hoàng <strong>Gioan XXIII</strong> ban hành Tông hiến lịch sử <strong>&ldquo;Venerabilium Nostrorum&rdquo;</strong>. Văn kiện này chính thức thiết lập Hàng Giáo Phẩm Công Giáo Việt Nam, đồng thời khai sinh <strong>Giáo phận Mỹ Tho</strong> và nâng ngôi thánh đường lên hàng <strong>Nhà thờ Chính Tòa Đức Mẹ Vô Nhiễm Nguyên Tội</strong>.
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

          {/* KHUNG TƯ LIỆU VĂN BẢN */}
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

          {/* CROSS-REFERENCE SAU SẮC CHỈ */}
          <div style={{
            backgroundColor: 'rgba(153,27,27,0.03)',
            border: '1px solid rgba(153,27,27,0.12)',
            borderRadius: '10px',
            padding: '12px 16px',
            marginBottom: '18px',
            fontSize: '0.85rem',
            lineHeight: 1.7
          }}>
            <strong style={{ color: 'var(--color-red)' }}>📌 Tóm tắt 5 quyết định lịch sử trọng yếu</strong> của Tông hiến <em>Venerabilium Nostrorum</em>: (1) Chấm dứt quy chế Thừa sai Đại diện Tông Tòa; (2) Thiết lập 3 Giáo Tỉnh (Hà Nội, Huế, Sài Gòn); (3) Nâng cấp đồng loạt các Giáo phận; (4) Khai sinh Giáo phận Mỹ Tho; (5) Chính thức công nhận Nhà thờ Chính Tòa.
            Để đọc chi tiết về các Đại Diện Tông Tòa trước 1960 và năm đời Giám mục từ 1960 đến nay, xem bài{' '}
            <Link href="/gioi-thieu/giao-phan" style={{ color: 'var(--color-red)', fontWeight: 700, textDecoration: 'underline' }}>Lịch sử Giáo Phận Mỹ Tho</Link>.
          </div>

          {/* ── LỄ CUNG HIẾN & TRÙNG TU ── */}
          <p className="doc-para">
            Ngôi thánh đường, vốn sinh ra từ gian truân — hạ rồi dựng, dựng rồi bão phá — nay bước vào thiên niên kỷ mới với hai mốc son đáng ghi nhớ. Nhân dịp Đại Năm Thánh 2000, ngày <strong>21/01/2000</strong>, Đức Giám mục Giáo phận <strong>Phaolô Bùi Văn Đọc</strong> đã
            long trọng cử hành <strong>Lễ Cung Hiến Nhà thờ Chánh Tòa Mỹ Tho</strong> và chọn ngày Lễ Đức Mẹ Hồn Xác
            Lên Trời (15 tháng 8) làm lễ Bổn mạng thứ hai của nhà thờ.
          </p>

          <p className="doc-para">
            Sáu năm sau, đánh dấu kỷ niệm 100 năm ngày khởi công xây dựng,{' '}
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

          <p className="doc-para">
            Một chi tiết mà hai chương của quyển sách này để lộ ra khi đặt cạnh nhau, mà đọc riêng từng chương thì không
            thấy. Cha sở đứng ra xin trùng tu ngôi thánh đường năm 2006 và khai mạc Năm Thánh trăm năm năm 2007 là{' '}
            <strong>Cha Giacôbê Hà Văn Xung</strong>. Cũng chính ngài, vào <strong>mùa thu năm 2005</strong> — trước lễ
            khởi công đúng tám tháng — đã đứng ra mở lớp huấn luyện Huynh Trưởng đầu tiên sau năm 1975, cho cả Giáo hạt
            Mỹ Tho, và đưa Đoàn Thiếu Nhi Thánh Thể trở lại giáo xứ sau ba mươi năm vắng bóng. Trong cùng hai năm ấy,
            một vị đã lo sửa cả phần xác lẫn phần hồn của ngôi nhà thờ: mái ngói và tháp chuông ở một bên, và ở bên kia
            là những đứa trẻ sẽ quàng khăn đứng trong lòng nhà thờ đó. Câu chuyện thứ hai là{' '}
            <Link href="/gioi-thieu/xu-doan" style={{ color: 'var(--color-red)', fontWeight: 700 }}>Chương IV</Link>.
          </p>

          {/* ── ẢNH TƯ LIỆU QUA CÁC THỜI KỲ ── */}
          <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-dark)', margin: '26px 0 6px' }}>
            Ảnh tư liệu nhà thờ qua các thời kỳ
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--color-subtle)', margin: '0 0 14px', lineHeight: 1.7 }}>
            Những bức ảnh dưới đây ghi lại diện mạo ngôi thánh đường và khuôn viên qua hơn một thế kỷ,
            từ thời Pháp thuộc đến trước ngày đại trùng tu năm 2006.
          </p>

          <div className="tntt-gallery">
            {[
              {
                src: '/images/lichsu_ban_khac_nha_tho_1877.jpg',
                cap: 'Tư liệu hình ảnh xưa nhất về ngôi nhà thờ thứ hai: bản khắc mặt tiền in trên tuần báo Les Missions Catholiques năm 1877, chú thích gốc "Cochinchine occidentale (Annam) — Façade de l\'église de Mytho". Nhà thờ dài 42 m, rộng 18 m, cao 36 m, 32 cột Corinthiên cao 8 m.'
              },
              {
                src: '/images/lichsu_nha_tho_dinh_tuong.jpg',
                cap: 'Chính ngôi nhà thờ trong bản khắc 1877, chụp lại thời Pháp thuộc với chú thích gốc "Cathédrale de My Tho". Đối chiếu hai hình thấy trùng khớp từng chi tiết: mái vòm có đèn lồng, các cửa tròn trên tang trống, trán tường Baroque cuộn và ba vòm cửa. Đây là ngôi thánh đường Cha Sorel dựng, Cha Moulins hoàn tất, làm phép 12/03/1876 và bị tháo dỡ khoảng năm 1900.'
              },
              {
                src: '/images/lichsu_nha_tho_1920s_ngoai_that.jpg',
                cap: 'Ngôi Nhà thờ Chánh Tòa hiện nay nhìn từ bên hông, khoảng 1920 – 1929. Ảnh mang chú thích gốc "My Tho 1920-1929 — L\'Église". Tháp chuông khi đó còn nằm liền với thánh đường.'
              },
              {
                src: '/images/lichsu_nha_tho_1920s_noi_that.jpg',
                cap: 'Lòng nhà thờ khoảng 1920 – 1929, trang hoàng cờ và lá dừa cho một đại lễ. Thấy rõ hàng cột tròn chống đỡ, mái vòm và nền gạch bông hoa văn thời Pháp.'
              },
              {
                src: '/images/lichsu_giay_bo_nhiem_1998.jpg',
                cap: 'Giấy Bổ Nhiệm ngày 18/05/1998 của Toà Giám mục Mỹ Tho, do Đức cha Anrê Nguyễn Văn Nam ký và đóng dấu, đặt Cha Phêrô Hồ Bản Chánh cùng lúc làm Tổng Đại Diện Giáo phận và phụ trách Giáo xứ Chánh Tòa. Ảnh chụp từ Kỷ yếu 100 năm của giáo xứ.'
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
            Ảnh tư liệu do giáo xứ cung cấp, trong đó chân dung các cha và Giấy Bổ Nhiệm 1998 chụp từ Kỷ yếu Mừng Năm Thánh 100 năm Nhà thờ Chánh Tòa Mỹ Tho (1907 – 2007); riêng bản khắc năm 1877 lấy từ tuần báo Les Missions Catholiques
            (Thư viện Quốc gia Pháp — Gallica, ark:/12148/bpt6k105617d, tr.595). Ảnh tư liệu về Ba Giồng và Giáo phận nằm trong bài <Link href="/gioi-thieu/giao-phan" style={{ color: 'var(--color-red)', textDecoration: 'underline' }}>Lịch sử Giáo Phận</Link>.
          </p>

          {/* ── NIÊN BIỂU CÁC ĐỜI CHA SỞ ── */}
          <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-dark)', margin: '26px 0 6px' }}>
            Niên biểu các đời Linh mục Chánh sở (1861 – nay)
          </div>
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
                  <th scope="col" style={{ width: '72px' }}>Ảnh</th>
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
                      <td className="pastor-photo-cell">
                        {bio ? (
                          <button
                            type="button"
                            className="pastor-photo-btn"
                            onClick={() => moLyLich(bio)}
                            aria-label={`Xem lý lịch ${bio.name}`}
                          >
                            <PortraitFrame src={bio.image} name={bio.name} width={56} height={72} />
                          </button>
                        ) : (
                          <span className="pastor-photo-empty" aria-hidden="true" />
                        )}
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

          {/* Ghi công các linh mục khác */}
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
            <strong style={{ fontWeight: 700 }}>Các Cha Phó xứ</strong> — bảng trên chỉ liệt kê hàng chánh sở. Theo Kỷ
            yếu 100 năm của giáo xứ, giữa thế kỷ XX còn có{' '}
            {CHA_PHO_BIOS.map((c, i) => (
              <span key={c.id}>
                {i > 0 && ' và '}
                <button
                  type="button"
                  className="pastor-name-btn"
                  style={{ fontSize: 'inherit' }}
                  onClick={() => moLyLich(c)}
                  aria-label={`Xem lý lịch ${c.name}`}
                >
                  {c.name}
                </button>{' '}
                <em>({c.period})</em>
              </span>
            ))}
            . Bài Gx. Tân Long trên giaophanmytho.net ghi hai ngài cùng Cha Giuse Nguyễn Văn Chúc phụ trách Giáo xứ
            Chánh Tòa giai đoạn 1975 – 1992.
            <br />
            <br />
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
            Xem thêm <Link href="/gioi-thieu/giao-phan" style={{ color: 'var(--color-red)', textDecoration: 'underline' }}>tiểu sử đầy đủ các Đức Giám mục tại trang Giáo Phận</Link>.
            <br />
            Khoảng 50 linh mục Việt Nam từng phục vụ họ đạo chưa có nguồn số hoá công khai — tên các ngài nằm trong sổ bộ
            họ đạo và văn khố Tòa Giám mục; trang này để trống còn hơn ghi sai tên người đã phục vụ.
          </p>

          {/* ── KIẾN TRÚC & NGHỆ THUẬT THÁNH ── */}
          <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-dark)', margin: '26px 0 6px' }}>
            Kiến trúc &amp; Nghệ thuật Thánh
          </div>
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

          {/* ── TÀI LIỆU THAM KHẢO ── */}
          <div style={{
            marginTop: '32px', paddingTop: '16px',
            borderTop: '1px solid var(--color-border-subtle)',
            fontSize: '0.77rem', color: 'var(--color-subtle)', lineHeight: 1.75
          }}>
            <div style={{ fontWeight: 800, color: 'var(--color-dark)', marginBottom: '8px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ScrollText size={13} style={{ color: 'var(--color-red)', flexShrink: 0 }} />
              Tài liệu tham khảo
            </div>
            <ol style={{ paddingLeft: '18px', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <li>Bản báo cáo viết tay của Cha Renier, lưu trữ tại Toà Tổng Giám mục TP. Hồ Chí Minh; cgvdt.vn — <em>Dấu ấn họ đạo Chánh tòa Mỹ Tho theo dòng lịch sử</em>.</li>
              <li>Kỷ yếu Mừng Năm Thánh 100 năm Nhà thờ Chánh Tòa Mỹ Tho (1907 – 2007), ấn hành 2007.</li>
              <li><em>Les Missions Catholiques</em>, tuần báo, Lyon, 1877, tr. 595 &amp; 598 — bản khắc mặt tiền nhà thờ. Gallica (BnF), ark:/12148/bpt6k105617d.</li>
              <li>IRFA (Viện Nghiên cứu Pháp–Á) — hồ sơ thừa sai: Guillou (#0682), Sorel (#0869), Moulins (#1056), Renier (#1502), Bar (#2241).</li>
              <li>Tông hiến <em>Venerabilium Nostrorum</em>, Gioan XXIII, 24/11/1960; <em>Acta Apostolicae Sedis</em> 53 (1961), tr. 346–348.</li>
              <li>giaophanmytho.net — <em>Lịch sử Khai Sinh Giáo Phận</em>, soạn 03/2009 cho Kỷ Yếu Năm Thánh 2010 HĐGMVN.</li>
              <li>Báo cáo thường niên Hội Thừa Sai Paris (MEP), 1897: lưu trữ tại IRFA.</li>
            </ol>
          </div>
        </section>

        <section id="phung-vu" style={{ marginBottom: '36px' }}>
          <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--color-dark)', margin: '32px 0 6px' }}>
            Giờ Thánh Lễ &amp; Lịch Mục Vụ
          </div>
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

      <MetaUpdater
        title={lyLich ? `${lyLich.name} — ${lyLich.role}` : undefined}
        description={lyLich ? lyLich.shortDesc : undefined}
        image={lyLich?.image ? `https://chanhtoa.tnttgiaophanmytho.online${lyLich.image}` : (lyLich ? `https://chanhtoa.tnttgiaophanmytho.online/api/og/${lyLich.id}` : undefined)}
        url={`https://chanhtoa.tnttgiaophanmytho.online/gioi-thieu/giao-xu?bio=${lyLich?.id}`}
      />
      <CuaSoLyLich bio={lyLich} onClose={() => setLyLich(null)} />
      <CuaSoAnh anh={anh} onClose={() => setAnh(null)} />
    </KhungTrang>
  );
}
