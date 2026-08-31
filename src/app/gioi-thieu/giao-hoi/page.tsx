'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Eye, ScrollText } from 'lucide-react';
import PopesContinuousMarquee from '@/components/PopesContinuousMarquee';
import KhungTrang from '../KhungTrang';
import { CuaSoLyLich, CuaSoAnh } from '../CuaSo';
import MetaUpdater from '@/components/MetaUpdater';
import { POPE_LEO_XIV_BIO } from '../duLieu';
import type { DetailedBioRecord } from '../duLieu';

export default function Trang() {
  const [lyLich, setLyLich] = useState<DetailedBioRecord | null>(null);
  const [anh, setAnh] = useState<{ src: string; caption: string } | null>(null);
  const allBios = [POPE_LEO_XIV_BIO];

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
      if (found) setLyLich(found);
    }
  }, []);

  return (
    <KhungTrang
      tieuDe="Giáo Hội Hoàn Vũ"
      phuDe="Từ buổi sơ khai trên bờ hồ Galilê — qua hai mươi thế kỷ đức tin, tử đạo, công đồng và canh tân — đến Giáo hội Công giáo hoàn vũ đang hiện diện trên toàn thế giới hôm nay."
      duongDan="/gioi-thieu/giao-hoi"
    >
      <section id="giao-hoi-hoan-vu" style={{ marginBottom: '40px' }}>

        {/* ── ẢNH NỔI PHẢI: Vatican ── */}
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
            onClick={() => moAnh({
              src: '/images/vatican_st_peter.jpg',
              caption: 'Quảng trường và Vương Cung Thánh Đường Thánh Phêrô nhìn từ trên cao — trung tâm của Giáo hội Công giáo Hoàn Vũ, được xây dựng trên nền mộ Thánh Tông Đồ Phêrô. Kiệt tác Phục Hưng–Baroque hoàn thành năm 1626, thiết kế bởi Michelangelo, Bernini và nhiều bậc thầy kiến trúc.'
            })}
          >
            <Image
              src="/images/vatican_st_peter.jpg"
              alt="Quảng trường và Vương Cung Thánh Đường Thánh Phêrô, Vatican"
              fill sizes="290px"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', marginTop: '6px', lineHeight: 1.4 }}>
            Vương Cung Thánh Đường Thánh Phêrô, Vatican.<br />
            <em>Nơi Đức Thánh Cha cử hành Đại Lễ Phụng vụ toàn cầu.</em>
          </div>
        </div>

        {/* ── PHẦN VĂN XUÔI LIỀN MẠCH ── */}
        <p className="doc-para">
          Câu chuyện của Giáo hội Công giáo bắt đầu không phải tại Rôma, không phải trong một cung điện hay một học viện, mà trên bờ hồ Galilê — nơi một người thợ đánh cá tên <strong>Simôn</strong> nghe lời gọi: <em>«Hãy theo Ta»</em>, và lập tức bỏ lưới xuống. Đó là khoảnh khắc Giáo hội bắt đầu. Chúa Giêsu thành Nazareth — mà các môn đồ tin nhận là Đấng Kitô, Con Thiên Chúa — tập họp xung quanh mình mười hai Tông Đồ, rao giảng Nước Trời khắp miền Palestine, và trao cho Simôn cái tên mới: <strong>Phêrô</strong> (tiếng Hy Lạp: <em>Petra</em> — Đá). <em>«Trên đá này, Ta sẽ xây Hội Thánh của Ta»</em> (Mt 16,18).<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[1]</sup>
        </p>

        <p className="doc-para">
          Sau cái chết và sự Phục Sinh của Chúa Giêsu (khoảng năm <strong>30–33 SCN</strong>), các Tông Đồ nhận lãnh Chúa Thánh Thần vào ngày <strong>Lễ Ngũ Tuần</strong> — Giáo hội sơ khai bùng lên tại Giêrusalem. Thánh Phêrô rao giảng và cộng đoàn tín hữu đầu tiên hình thành với khoảng 3.000 người chịu phép rửa trong một ngày. Từ Giêrusalem, đức tin lan tỏa theo các con đường của Đế quốc Rôma: Antiôkia, Alexandria, Côrintô, Êphêsô — và sau cùng, chính trái tim của Đế quốc: <strong>Rôma</strong>. Thánh Phêrô đến Rôma vào khoảng năm 60 SCN và đặt nền móng cho cộng đoàn Kitô giáo tại đây, trước khi bị bắt và đóng đinh lộn ngược trên đồi Vatican dưới triều hoàng đế Nero (khoảng năm <strong>64–68 SCN</strong>). Mộ ngài trở thành nơi các tín hữu tụ họp cầu nguyện — đặt nền cho toàn bộ lịch sử sau này của Vatican.
        </p>

        <p className="doc-para">
          Trong những thế kỷ đầu, cộng đoàn Kitô giáo sống và thờ phượng trong bí mật. Các cuộc bách hại dưới triều Nero (64), Domitian (81–96), Decius (250–251), Valerian (257–258) và Diocletian (303–311) đã cướp đi sinh mạng của hàng chục ngàn tín hữu. Những <strong>vị tử đạo</strong> này — trong tiếng Hy Lạp <em>martys</em> nghĩa là «nhân chứng» — không chỉ là những người chết vì đức tin, họ còn là hạt giống làm Giáo hội lớn lên. Tertullian (160–220), Giáo phụ sơ khai, đã để lại câu nói lịch sử: <em>«Máu các vị tử đạo là hạt giống của Kitô hữu»</em>.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[2]</sup> Các hang Catacomb của Rôma — những mê cung ngầm dài hàng trăm kilômét — là nơi các tín hữu sơ khai cử hành Thánh Lễ bên cạnh hài cốt những người đã khuất, vừa là nơi an táng vừa là nhà thờ bí mật.
        </p>

        {/* Doc-box: Ngũ Tòa Thượng Phụ */}
        <div className="doc-box">
          <div className="doc-box-title">Ngũ Tòa Thượng Phụ cổ đại — Pentarchia</div>
          <p className="doc-box-text">
            Trong thế kỷ III–IV, Giáo hội tổ chức theo mô hình <strong>Ngũ Tòa Thượng Phụ</strong> (<em>Pentarchia</em>): năm trung tâm quyền lực tôn giáo lớn nhất. <strong>Rôma</strong> — do Thánh Phêrô đặt nền, được nhìn nhận ưu tiên danh dự. <strong>Côstantinôpôl</strong> — thủ đô Đế quốc Đông Rôma từ 330 SCN, "Rôma mới". <strong>Alexandria</strong> — do Thánh Máccô sáng lập, trung tâm thần học lớn nhất thế kỷ III. <strong>Antiôkia</strong> — nơi môn đồ Chúa Giêsu lần đầu được gọi là "Kitô hữu" (Cv 11,26). <strong>Giêrusalem</strong> — cái nôi của Kitô giáo, nơi Chúa Giêsu chịu Thương Khó và Phục Sinh. Sự chia rẽ năm <strong>1054</strong> (Ly giáo Đông–Tây) đã tách Côstantinôpôl, Alexandria (Hy Lạp), Antiôkia và Giêrusalem khỏi hiệp thông với Rôma, hình thành Giáo hội Chính Thống giáo Đông phương đến ngày nay.
          </p>
        </div>

        <p className="doc-para">
          Bước ngoặt quyết định đến vào năm <strong>313</strong>, khi hoàng đế <strong>Côstantinô Đại Đế</strong> ban hành Chiếu chỉ Milan, chính thức cho phép thực hành Kitô giáo tự do trong đế quốc. Năm <strong>380</strong>, hoàng đế Theodosius I tuyên bố Kitô giáo là quốc giáo của Đế quốc Rôma. Từ địa vị của một tôn giáo bị bách hại, Giáo hội bỗng trở thành trung tâm đời sống văn hóa, chính trị và tinh thần của thế giới cổ đại. Đây cũng là giai đoạn các <strong>Công Đồng Đại Kết</strong> đầu tiên định hình tín lý: Công Đồng Nixêa (325) công bố Chúa Kitô đồng bản thể với Chúa Cha; Côstantinôpôl (381) định hình Kinh Tin Kính mà Giáo hội còn đọc đến ngày nay; Êphêsô (431) tuyên xưng Đức Maria là <em>Theotokos</em> — Đấng Sinh Ra Thiên Chúa.
        </p>

        <p className="doc-para">
          Khi Đế quốc Tây Rôma sụp đổ năm <strong>476</strong>, Giáo hội Rôma — dưới sự lãnh đạo của các Giáo hoàng — trở thành trụ cột duy nhất gìn giữ văn minh Latin tại Tây Âu. <strong>Thánh Lêô Cả</strong> (Giáo hoàng 440–461) là vị đầu tiên thực sự xác lập quyền bính của Giám mục Rôma trên toàn Giáo hội; chính ngài đã ngăn Attila và đoàn Hung Nô không tiến vào phá hủy Rôma năm 452. Qua suốt thời Trung Cổ, các tu viện Benedictine trở thành những trung tâm học thuật và văn hóa duy nhất còn sáng đèn, sao chép và bảo tồn toàn bộ di sản cổ đại Hy–La cho hậu thế.
        </p>

        {/* ── ẢNH PHẢI: Nội thất Đền thờ Thánh Phêrô ── */}
        <figure className="doc-figure doc-figure-right">
          <button
            type="button" className="tntt-thumb-btn"
            onClick={() => moAnh({
              src: '/images/vatican_basilica_interior.jpg',
              caption: 'Gian Cung thánh uy nghiêm và Mái vòm Baldacchino bằng đồng của Bernini bên trong Đền thờ Thánh Phêrô, Vatican. Mái vòm do Michelangelo thiết kế, cao 136,57 m. Bàn thờ Giáo hoàng đặt ngay trên nền mộ Thánh Phêrô.'
            })}
            aria-label="Phóng to ảnh bên trong Đền thờ Thánh Phêrô"
          >
            <Image
              src="/images/vatican_basilica_interior.jpg"
              alt="Bên trong Đền thờ Thánh Phêrô, Vatican"
              width={900} height={700}
              sizes="(max-width: 720px) 92vw, 320px"
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </button>
          <figcaption className="doc-caption">
            Gian Cung thánh Đền thờ Thánh Phêrô — Baldacchino bằng đồng của Bernini (1623–1634), Mái vòm Michelangelo cao 136 m.
          </figcaption>
        </figure>

        <p className="doc-para">
          Vương Cung Thánh Đường Thánh Phêrô như chúng ta thấy ngày nay là kết tinh của hơn <strong>1.700 năm lịch sử</strong>. Basilica đầu tiên do hoàng đế Côstantinô xây năm <strong>324</strong> trên nền mộ Thánh Phêrô — tồn tại hơn 1.100 năm. Năm <strong>1506</strong>, Giáo hoàng Julius II khởi công ngôi nhà thờ mới, qua bàn tay của Bramante, Raphael, Michelangelo và cuối cùng là Carlo Maderno — hoàn thành năm <strong>1626</strong>. Quảng trường Thánh Phêrô với hai hàng cột ôm vòng như đôi tay mở ra đón nhận cả thế giới, do Bernini thiết kế (1656–1667), trở thành hình ảnh biểu tượng nhất của Kitô giáo toàn cầu. Bên dưới sàn nhà thờ là <em>Hang Toại Đạo Vatican</em> — nơi lưu giữ hài cốt các vị Giáo hoàng và di tích khảo cổ hai thiên niên kỷ.
        </p>

        <p className="doc-para">
          Lịch sử Giáo hội không phải là một con đường thẳng tắp. Bên cạnh những trang vinh quang — các Công Đồng, các vị Thánh, nền văn minh Kitô giáo — là những trang tối mà Giáo hội không né tránh. Vụ <strong>ly giáo Đông–Tây năm 1054</strong> chia đôi Kitô giáo thành Công giáo Rôma và Chính Thống giáo Đông phương. Cuộc <strong>Đại Ly Giáo Tây Phương</strong> (1378–1417) chứng kiến hai, rồi ba người cùng tự nhận là Giáo hoàng. Nạn bán <strong>bùa xá tội</strong> và nạn tham nhũng trong hàng giáo sĩ thời Trung Cổ muộn đã châm ngòi cho cuộc <strong>Cải Cách Tin Lành</strong> năm 1517, khi Martin Luther đóng 95 luận điểm vào cánh cửa nhà thờ Wittenberg. <strong>Tòa Án Dị Giáo</strong>, <strong>Cuộc Thập Tự Chinh</strong> (1095–1291), <strong>Vụ Galileo</strong> (1633) — tất cả là những vết thương lịch sử mà Giáo hội đã phải đối diện, thú nhận và học hỏi từ đó.
        </p>

        <p className="doc-para">
          Không ít vị Giáo hoàng đã đứng ra để dọn sạch và canh tân. <strong>Đức Grêgôriô VII</strong> (1073–1085) cải cách chế độ phong kiến giáo hội, cấm mua bán chức vụ thánh (<em>simonie</em>). <strong>Công Đồng Trentô</strong> (1545–1563) — được triệu tập đáp lại Cải Cách Luther — khởi đầu cuộc Phản Cải Cách, làm sáng tỏ tín lý, thanh luyện phụng vụ và cải tổ chủng viện đào tạo linh mục. <strong>Đức Lêô XIII</strong> (1878–1903) với Thông điệp <em>Rerum Novarum</em> (1891) đặt nền móng cho Học thuyết Xã hội Công giáo, bảo vệ quyền lợi công nhân trước làn sóng công nghiệp hóa. <strong>Công Đồng Vatican II</strong> (1962–1965) dưới triều <strong>Đức Gioan XXIII</strong> và <strong>Đức Phaolô VI</strong> là cuộc canh tân toàn diện nhất trong thế kỷ XX — đổi ngôn ngữ phụng vụ từ Latinh sang tiếng bản địa, mở rộng đối thoại đại kết và liên tôn, tái khẳng định phẩm giá con người và tự do tôn giáo.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[3]</sup>
        </p>

        <p className="doc-para">
          Thế kỷ XX chứng kiến những bê bối lớn nhất trong thời hiện đại, và cũng chứng kiến những nỗ lực xưng thú dũng cảm chưa từng có. Năm <strong>2002</strong>, hàng loạt vụ xâm hại tình dục của linh mục bị phơi bày tại Boston và lan ra toàn thế giới. <strong>Đức Gioan Phaolô II</strong> (1978–2005) — vị Giáo hoàng đầu tiên xin lỗi về những tội lỗi lịch sử của Giáo hội trong Năm Thánh 2000, bao gồm Tòa Án Dị Giáo, các cuộc bạo lực Thập Tự Chinh và sự im lặng trước Holocaust — đã gọi tội xâm hại là «một tội ác nghiêm trọng». <strong>Đức Bênêđíctô XVI</strong> (2005–2013) thiết lập các quy trình xử lý nghiêm minh hơn, trực tiếp gặp nạn nhân và viết thư xin lỗi, rồi làm điều mà chưa vị Giáo hoàng nào làm trong 600 năm: <strong>tự nguyện từ chức</strong> (11/2/2013). <strong>Đức Phanxicô</strong> (2013–2024) ban hành <em>Vos Estis Lux Mundi</em> (2019), tạo cơ chế báo cáo toàn cầu bảo vệ nạn nhân và truy cứu trách nhiệm cả cấp giám mục.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[4]</sup>
        </p>

        {/* ── CÁC TRIỀU ĐẠI GIÁO HOÀNG ── */}
        <div className="doc-box">
          <div className="doc-box-title">Các triều đại Giáo hoàng — Những cột mốc định hình lịch sử</div>
          <p className="doc-box-text" style={{ marginBottom: '10px' }}>
            Trong 267 đời Giáo hoàng, một số triều đại đặc biệt để lại dấu ấn sâu sắc nhất:
          </p>
          <div style={{ display: 'grid', gap: '8px', fontSize: '0.82rem', lineHeight: 1.65 }}>
            {[
              { period: 'TK I–II', name: 'Thánh Phêrô & các Giáo hoàng sơ khai', desc: 'Lêmêntê I, Ignatiô, Polycarpe — xây dựng cơ cấu Giáo hội, hy sinh làm chứng nhân.' },
              { period: 'TK IV–V', name: 'Thánh Lêô Cả (440–461)', desc: 'Khẳng định quyền ưu tiên của Giám mục Rôma. Ngăn Attila phá hủy Rôma. Định hình học thuyết về bản tính Chúa Kitô.' },
              { period: 'TK VI', name: 'Thánh Grêgôriô Cả (590–604)', desc: 'Đặt nền cho âm nhạc phụng vụ Gregorian, tổ chức sứ vụ thừa sai sang Anh, định hình vai trò mục tử của Giáo hoàng.' },
              { period: 'TK XI–XII', name: 'Innôcentê III (1198–1216)', desc: 'Đỉnh cao quyền lực thế tục của Giáo hoàng. Chủ trì Công Đồng Lateranô IV (1215). Nhưng cũng là thời Thập Tự Chinh thứ Tư cướp phá Côstantinôpôl.' },
              { period: 'TK XVI', name: 'Phaolô III (1534–1549) & Pio IV (1559–1565)', desc: 'Triệu tập và chủ trì Công Đồng Trentô — cuộc Phản Cải Cách toàn diện nhất lịch sử Giáo hội.' },
              { period: 'TK XIX', name: 'Lêô XIII (1878–1903)', desc: 'Rerum Novarum (1891) — Học thuyết Xã hội Công giáo. Thư viện Vatican mở cửa. Mở rộng đối thoại với khoa học hiện đại.' },
              { period: 'TK XX', name: 'Gioan XXIII & Phaolô VI (1958–1978)', desc: 'Công Đồng Vatican II (1962–1965) — Canh tân toàn diện phụng vụ, đại kết và xã hội.' },
              { period: 'TK XX–XXI', name: 'Gioan Phaolô II (1978–2005)', desc: '27 năm — triều đài lâu nhất thế kỷ XX. Tôn phong 482 Hiển Thánh. Sụp đổ Cộng Sản Đông Âu. 117 Thánh Tử Đạo Việt Nam (1988).' },
              { period: '2013–2024', name: 'Phanxicô', desc: 'Người Mỹ Latinh đầu tiên. Cải tổ Giáo triều Rôma. Laudato Si về môi trường. Synodality — Giáo hội lắng nghe.' },
            ].map((row) => (
              <div key={row.name} style={{
                display: 'grid', gridTemplateColumns: '80px 1fr',
                gap: '10px', paddingBottom: '8px',
                borderBottom: '1px solid var(--color-border-subtle)'
              }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-red)', paddingTop: '2px' }}>{row.period}</span>
                <div>
                  <strong style={{ color: 'var(--color-dark)', fontSize: '0.83rem' }}>{row.name}</strong>
                  <span style={{ color: 'var(--color-subtle)' }}> — {row.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BĂNG CHUYỀN 267 GIÁO HOÀNG ── */}
        <p className="doc-para">
          Tính từ Thánh Phêrô đến Đức Lêô XIV hôm nay, Giáo hội Công giáo đã trải qua <strong>267 vị Giáo hoàng</strong> trong một dây tông truyền liên tục không đứt đoạn gần hai ngàn năm — điều không có thiết chế chính trị hay tôn giáo nào khác trên thế giới có thể sánh kịp. Vị Giáo hoàng hiện tại, <strong>Đức Lêô XIV</strong>, đắc cử tại Mật viện Hồng Y năm 2024, tiếp nối truyền thống của Thánh Lêô Cả với khẩu hiệu <em>«In Veritate et Caritate»</em> — Trong Chân Lý và Đức Ái.
        </p>

        <div style={{ marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-dark)' }}>
              Biên niên sử 267 Giáo triều tông truyền — từ Thánh Phêrô đến Đức Lêô XIV
            </span>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-red)', backgroundColor: 'rgba(153,27,27,0.08)', padding: '2px 10px', borderRadius: '16px', border: '1px solid rgba(153,27,27,0.15)' }}>
              267 Giáo Triều
            </span>
          </div>
          <PopesContinuousMarquee />
        </div>

        {/* ── ĐỨC THÁNH CHA ĐƯƠNG KIM ── */}
        <div
          className="floating-img-270"
          style={{
            padding: '8px',
            backgroundColor: 'var(--color-card-bg)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            marginTop: '8px'
          }}
        >
          <div
            style={{ position: 'relative', width: '100%', height: '310px', cursor: 'pointer', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'var(--color-input-bg)' }}
            onClick={() => moLyLich(POPE_LEO_XIV_BIO)}
          >
            <Image
              src="/images/pope_leo_xiv.jpg"
              alt="Đức Giáo hoàng Lêô XIV"
              fill sizes="270px"
              style={{ objectFit: 'cover', objectPosition: 'top center' }}
            />
            <div style={{
              position: 'absolute', bottom: '8px', right: '8px',
              backgroundColor: 'rgba(0,0,0,0.75)', color: '#FFF',
              padding: '3px 8px', borderRadius: '6px',
              fontSize: '0.7rem', fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: '4px'
            }}>
              <Eye size={12} /> Xem tiểu sử
            </div>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', marginTop: '6px', lineHeight: 1.4 }}>
            <strong>Đức Thánh Cha Lêô XIV</strong> — Đấng kế vị thứ 267 của Thánh Phêrô.
            <br /><em>Khẩu hiệu: «In Veritate et Caritate»</em>
          </div>
        </div>

        <p className="doc-para">
          Hôm nay, Giáo hội Công giáo hoàn vũ có hơn <strong>1,3 tỷ tín hữu</strong> — khoảng 17% dân số thế giới — hiện diện tại 193 quốc gia, qua hơn 3.000 giáo phận, hơn 400.000 linh mục và hàng triệu tu sĩ, giáo lý viên, nhân viên mục vụ.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[5]</sup> Tòa Thánh Vatican — với diện tích vỏn vẹn 0,49 km² nhưng được 183 quốc gia công nhận ngoại giao — là quốc gia nhỏ nhất thế giới nhưng có tầm ảnh hưởng toàn cầu không tỷ lệ thuận với kích thước địa lý. Hoạt động của Giáo hội trải rộng từ trường học và bệnh viện (Giáo hội điều hành khoảng 28% cơ sở y tế trên toàn thế giới) đến hỗ trợ nhân đạo, đối thoại hòa bình, bảo tồn di sản văn hóa nhân loại.
        </p>

        <p className="doc-para">
          Trong đời sống thiêng liêng, Giáo hội hoàn vũ nuôi dưỡng tín hữu qua <strong>bảy bí tích</strong> — từ bí tích Rửa Tội đặt nền đức tin, Thêm Sức củng cố, Thánh Thể là trung tâm, Hòa Giải chữa lành, Hôn Phối thánh hiến, Truyền Chức trao sứ mạng, đến Xức Dầu Bệnh Nhân đồng hành trong giờ thử thách. <strong>Phụng vụ các Giờ Kinh</strong>, cầu nguyện Mân Côi, đời sống đan tu chiêm niệm, các phong trào canh tân đặc sủng — tất cả cùng dệt nên một nền linh đạo đa dạng mà thống nhất, nơi mỗi tín hữu — từ một giáo dân ở vùng sâu đồng bằng Cửu Long đến một hồng y tại Rôma — đều là chi thể của cùng một thân thể.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[6]</sup> Đó chính là ý nghĩa của từ «Công giáo»: <em>Katholikê</em> — phổ quát, dành cho tất cả mọi người, ở khắp mọi nơi, qua mọi thời đại.
        </p>

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
            <li>[1] Mt 16,18; Lc 5,1-11; J.N.D. Kelly, <em>The Oxford Dictionary of Popes</em>, Oxford University Press (2010), tr. 1.</li>
            <li>[2] Tertullian, <em>Apologeticum</em>, 197 SCN, ch. 50: «Semen est sanguis Christianorum»; Eusebius, <em>Historia Ecclesiastica</em>, TK IV.</li>
            <li>[3] Công Đồng Vatican II: <em>Sacrosanctum Concilium</em> (Phụng Vụ, 1963), <em>Lumen Gentium</em> (Giáo hội, 1964), <em>Gaudium et Spes</em> (Giáo hội trong thế giới, 1965).</li>
            <li>[4] Đức Phanxicô, <em>Vos Estis Lux Mundi</em>, Tông Thư, 7/5/2019; Vatican News — Báo cáo hội nghị lạm dụng tình dục, 2/2019.</li>
            <li>[5] Annuario Pontificio 2024; Pew Research Center, <em>Global Christianity</em> (2023); UNAIDS/WHO về cơ sở y tế Công giáo.</li>
            <li>[6] <em>Catechismus Catholicae Ecclesiae</em> — Sách Giáo Lý Giáo Hội Công Giáo (1992), số 1113–1134 (bảy bí tích), số 1174–1178 (Phụng vụ giờ kinh).</li>
          </ol>
        </div>

      </section>

      <MetaUpdater
        title={lyLich ? `${lyLich.name} — ${lyLich.role}` : undefined}
        description={lyLich ? lyLich.shortDesc : undefined}
        image={lyLich?.image ? `https://chanhtoa.tnttgiaophanmytho.online${lyLich.image}` : undefined}
        url={`https://chanhtoa.tnttgiaophanmytho.online/gioi-thieu/giao-hoi?bio=${lyLich?.id}`}
      />
      <CuaSoLyLich bio={lyLich} onClose={() => setLyLich(null)} />
      <CuaSoAnh anh={anh} onClose={() => setAnh(null)} />
    </KhungTrang>
  );
}
