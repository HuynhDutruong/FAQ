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
      phuDe="Chương mở đầu của quyển sách. Từ bờ hồ Galilê qua hai mươi thế kỷ đức tin, tử đạo, công đồng và canh tân — và từ đó, theo các văn kiện của Toà Thánh, xuống tới một tỉnh lỵ ven sông Tiền. Ba chương sau đều bắt đầu từ một dòng chữ ký ở Rôma."
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
          Thế kỷ XX chứng kiến những bê bối lớn nhất trong thời hiện đại, và cũng chứng kiến những nỗ lực xưng thú dũng cảm chưa từng có. Năm <strong>2002</strong>, hàng loạt vụ xâm hại tình dục của linh mục bị phơi bày tại Boston và lan ra toàn thế giới. <strong>Đức Gioan Phaolô II</strong> (1978–2005) — vị Giáo hoàng đầu tiên xin lỗi về những tội lỗi lịch sử của Giáo hội trong Năm Thánh 2000, bao gồm Tòa Án Dị Giáo, các cuộc bạo lực Thập Tự Chinh và sự im lặng trước Holocaust — đã gọi tội xâm hại là «một tội ác nghiêm trọng». <strong>Đức Bênêđíctô XVI</strong> (2005–2013) thiết lập các quy trình xử lý nghiêm minh hơn, trực tiếp gặp nạn nhân và viết thư xin lỗi, rồi làm điều mà chưa vị Giáo hoàng nào làm trong 600 năm: <strong>tự nguyện từ chức</strong> (11/2/2013). <strong>Đức Phanxicô</strong> (2013–2025) ban hành <em>Vos Estis Lux Mundi</em> (2019), tạo cơ chế báo cáo toàn cầu bảo vệ nạn nhân và truy cứu trách nhiệm cả cấp giám mục.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[4]</sup>
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
              { period: '2013–2025', name: 'Phanxicô', desc: 'Người Mỹ Latinh đầu tiên. Cải tổ Giáo triều Rôma. Laudato Si về môi trường. Synodality — Giáo hội lắng nghe. Qua đời ngày 21/4/2025.' },
              { period: '2025–nay', name: 'Lêô XIV', desc: 'Đắc cử 8/5/2025, vị thứ 267. Người Hoa Kỳ đầu tiên; tu sĩ Dòng Thánh Augustinô, nhiều năm truyền giáo tại Peru. Khẩu hiệu In Illo uno unum.' },
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
          Tính từ Thánh Phêrô đến Đức Lêô XIV hôm nay, Giáo hội Công giáo đã trải qua <strong>267 vị Giáo hoàng</strong> trong một dây tông truyền liên tục không đứt đoạn gần hai ngàn năm — điều không có thiết chế chính trị hay tôn giáo nào khác trên thế giới có thể sánh kịp. Vị Giáo hoàng hiện tại, <strong>Đức Lêô XIV</strong>, đắc cử tại Mật viện Hồng Y ngày <strong>8 tháng 5 năm 2025</strong>, sau khi Đức Phanxicô qua đời ngày 21/4/2025. Ngài là <strong>vị Giáo hoàng đầu tiên sinh tại Hoa Kỳ</strong> — tu sĩ Dòng Thánh Augustinô, nhiều năm làm thừa sai rồi Giám mục tại Peru — và chọn khẩu hiệu <em>«In Illo uno unum»</em>, một câu của Thánh Augustinô: <em>trong Đấng duy nhất, chúng ta nên một</em>.
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
            <strong>Đức Thánh Cha Lêô XIV</strong> — Đấng kế vị thứ 267 của Thánh Phêrô, đắc cử 8/5/2025.
            <br /><em>Khẩu hiệu: «In Illo uno unum»</em>
          </div>
        </div>

        <p className="doc-para">
          Hôm nay, Giáo hội Công giáo hoàn vũ có hơn <strong>1,3 tỷ tín hữu</strong> — khoảng 17% dân số thế giới — hiện diện tại 193 quốc gia, qua hơn 3.000 giáo phận, hơn 400.000 linh mục và hàng triệu tu sĩ, giáo lý viên, nhân viên mục vụ.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[5]</sup> Tòa Thánh Vatican — với diện tích vỏn vẹn 0,49 km² nhưng được 183 quốc gia công nhận ngoại giao — là quốc gia nhỏ nhất thế giới nhưng có tầm ảnh hưởng toàn cầu không tỷ lệ thuận với kích thước địa lý. Hoạt động của Giáo hội trải rộng từ trường học và bệnh viện (Giáo hội điều hành khoảng 28% cơ sở y tế trên toàn thế giới) đến hỗ trợ nhân đạo, đối thoại hòa bình, bảo tồn di sản văn hóa nhân loại.
        </p>

        <p className="doc-para">
          Trong đời sống thiêng liêng, Giáo hội hoàn vũ nuôi dưỡng tín hữu qua <strong>bảy bí tích</strong> — từ bí tích Rửa Tội đặt nền đức tin, Thêm Sức củng cố, Thánh Thể là trung tâm, Hòa Giải chữa lành, Hôn Phối thánh hiến, Truyền Chức trao sứ mạng, đến Xức Dầu Bệnh Nhân đồng hành trong giờ thử thách. <strong>Phụng vụ các Giờ Kinh</strong>, cầu nguyện Mân Côi, đời sống đan tu chiêm niệm, các phong trào canh tân đặc sủng — tất cả cùng dệt nên một nền linh đạo đa dạng mà thống nhất, nơi mỗi tín hữu — từ một giáo dân ở vùng sâu đồng bằng Cửu Long đến một hồng y tại Rôma — đều là chi thể của cùng một thân thể.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[6]</sup> Đó chính là ý nghĩa của từ «Công giáo»: <em>Katholikê</em> — phổ quát, dành cho tất cả mọi người, ở khắp mọi nơi, qua mọi thời đại.
        </p>

        {/* ══════════════════════════════════════════════════════════════
            TIN MỪNG ĐẾN VIỆT NAM — khúc nối sang Chương II
            ══════════════════════════════════════════════════════════════ */}
        <h2 id="tin-mung-den-viet-nam" style={{ fontSize: '1.35rem', fontWeight: 800, fontFamily: 'serif', color: 'var(--color-dark)', margin: '38px 0 4px', paddingTop: '14px', borderTop: '2px solid var(--color-border-subtle)' }}>
          Tin Mừng đến Việt Nam
        </h2>
        <p style={{ fontSize: '0.84rem', fontStyle: 'italic', color: 'var(--color-subtle)', margin: '0 0 16px', lineHeight: 1.65 }}>
          Từ đây, câu chuyện hai ngàn năm bắt đầu thu hẹp lại thành câu chuyện của một dải đất, rồi một tỉnh lỵ ven sông,
          rồi một ngôi thánh đường. Ba chương còn lại của quyển sách này đều bắt đầu từ chỗ đó.
        </p>

        <figure className="doc-figure doc-figure-right">
          <button
            type="button" className="tntt-thumb-btn"
            onClick={() => moAnh({
              src: '/images/ghvn_cuong_muc_quyen_thu.jpg',
              caption: 'Tờ đầu quyển thủ bộ «Khâm Định Việt Sử Thông Giám Cương Mục» — chính bộ chính sử duy nhất chép mốc 1533 và tên I-nê-khu. Dòng dọc thứ hai từ phải ghi niên đại phụng mệnh: «Tự Đức bát niên thập nhị nguyệt thập ngũ nhật phụng» — ngày 15 tháng 12 năm Tự Đức thứ 8, tức đầu năm 1856. Nghĩa là ghi chép về năm 1533 được đặt bút hơn ba trăm hai mươi năm sau sự kiện. Quốc Sử Quán triều Nguyễn. Nguồn: Wikimedia Commons, phạm vi công cộng.'
            })}
            aria-label="Phóng to tờ đầu bộ Khâm Định Việt Sử Thông Giám Cương Mục"
          >
            <Image
              src="/images/ghvn_cuong_muc_quyen_thu.jpg"
              alt="Tờ đầu quyển thủ Khâm Định Việt Sử Thông Giám Cương Mục, đề niên đại Tự Đức thứ 8 (1856)"
              width={800} height={635}
              sizes="(max-width: 720px) 92vw, 320px"
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </button>
          <figcaption className="doc-caption">
            Tờ đầu bộ <em>Cương Mục</em>, đề &ldquo;Tự Đức bát niên thập nhị nguyệt thập ngũ nhật phụng&rdquo; — đầu năm
            1856. Mốc 1533 được chép ở quyển XXXIII, tờ 6b của chính bộ này.
          </figcaption>
        </figure>

        <p className="doc-para">
          Giáo hội hoàn vũ không đến Việt Nam bằng một sắc chỉ, mà bằng những chuyến thuyền lẻ. Cột mốc quy ước mà Giáo
          hội Công giáo Việt Nam vẫn lấy làm năm khởi đầu là <strong>năm 1533</strong>, và cột mốc ấy chỉ tồn tại nhờ đúng
          một dòng chữ trong một bộ chính sử soạn hơn ba trăm năm sau. Bộ{' '}
          <em>Khâm Định Việt Sử Thông Giám Cương Mục</em> — do Quốc Sử Quán triều Nguyễn biên soạn dưới triều Tự Đức,
          khoảng 1856 – 1884 — ở <strong>Chính biên, quyển XXXIII, tờ 6b</strong>, chép rằng: tháng 3 năm{' '}
          <strong>Nguyên Hoà nguyên niên</strong> đời Lê Trang Tông, có người Tây Dương tên là{' '}
          <strong>I-nê-khu</strong> đi đường biển lén vào giảng đạo Gia Tô ở làng <strong>Ninh Cường</strong> và{' '}
          <strong>Quần Anh</strong> thuộc huyện Nam Chân, và làng <strong>Trà Lũ</strong> thuộc huyện Giao Thuỷ.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[7]</sup>
        </p>

        <p className="doc-para">
          Ba địa danh ấy hôm nay đều nằm trong <strong>Giáo phận Bùi Chu, tỉnh Nam Định</strong>: Ninh Cường vẫn còn tên,
          Quần Anh nay là Quần Phương, Trà Lũ nay là vùng Phú Nhai. Tại Lác Môn, giáo dân đã dựng một đài kỷ niệm mang tên{' '}
          <strong>Bến I-nê-khu</strong>, đánh dấu nơi được tin là chỗ Tin Mừng lần đầu cập bờ đất Việt. Cái tên{' '}
          <em>I-nê-khu</em> nhiều phần là lối phiên âm của <em>Inácio</em> trong tiếng Bồ, hay <em>Íñigo / Ignacio</em>{' '}
          trong tiếng Tây Ban Nha — nghĩa là ta biết ông có thể tên gì, mà không biết ông là ai.
        </p>

        {/* Doc-box: sự thật về mốc 1533 */}
        <div className="doc-box">
          <div className="doc-box-title">Một cột mốc quy ước, không phải một cột mốc đã chứng minh</div>
          <p className="doc-box-text">
            Bản khảo cứu này ghi rõ chỗ yếu của mốc 1533, vì đó là điều một trang sử tử tế phải làm. Chính{' '}
            <em>Cương Mục</em> cũng không nhận đây là ghi chép của quốc sử: sách dẫn nguồn là <strong>&ldquo;Dã Lục&rdquo;</strong> —
            một thứ ghi chép tư nhân trong dân gian, và bản Dã Lục ấy <strong>đến nay đã thất truyền</strong>. Không một
            văn khố Bồ Đào Nha, Tây Ban Nha hay Dòng Tên nào cùng thời xác nhận chuyến đi này; cũng không rõ I-nê-khu
            thuộc dòng tu nào. Linh mục <strong>Võ Đình Đệ</strong> (Giáo phận Quy Nhơn) đã tổng hợp các phản biện ấy,
            dẫn thêm ý kiến của các nhà nghiên cứu <strong>Chu Thiên</strong>, <strong>Đinh Xuân Lâm</strong>,{' '}
            <strong>Trần Thanh Ái</strong> và linh mục <strong>Bùi Đức Sinh</strong>, và nêu khả năng chi tiết này bắt
            nguồn từ <em>Tây Dương Gia Tô Bí Lục</em> — một cuốn sách công kích đạo Công giáo ở thế kỷ XIX, không phải
            sử liệu.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[8]</sup>
          </p>
          <p className="doc-box-note">
            Ở phía ngược lại, các nhà chép sử Công giáo Việt Nam — Phan Phát Huồn, Hồng Lam, linh mục Trần Anh Dũng — và
            chính bản <em>Biên niên sử Giáo hội Công giáo Việt Nam</em> của Hội đồng Giám mục Việt Nam đều giữ 1533 làm
            năm khởi đầu. Cách hiểu công bằng nhất: <strong>1533 là một cột mốc tưởng niệm được cả Giáo hội Việt Nam
            đồng thuận, chứ không phải một sự kiện đã được kiểm chứng bằng văn khố.</strong> Giáo hội Việt Nam đang hướng
            tới năm 2033 để mừng 500 năm theo chính mốc quy ước này.
          </p>
        </div>

        <p className="doc-para">
          Sau I-nê-khu là gần một thế kỷ những lần ghé chân rời rạc, phần lớn do các tu sĩ đi theo thuyền buôn Bồ Đào
          Nha và Tây Ban Nha. Năm <strong>1550</strong>, cha <strong>Gaspar da Santa Cruz</strong> Dòng Đaminh giảng đạo
          ở vùng Hà Tiên. Khoảng <strong>1580 – 1586</strong>, hai cha Đaminh <strong>Luís da Fonseca</strong> và{' '}
          <strong>Grégoire de la Motte</strong> hoạt động tại Quảng Nam. Năm <strong>1583</strong>, bốn thừa sai Dòng
          Phanxicô từ Philippines ra miền Bắc. Không chuyến nào trong số đó để lại một cộng đoàn đứng vững: các ngài đến,
          rửa tội cho một số người, rồi đi hoặc chết.
        </p>

        <figure className="doc-figure doc-figure-left">
          <button
            type="button" className="tntt-thumb-btn"
            onClick={() => moAnh({
              src: '/images/ghvn_dictionarium_1651.jpg',
              caption: 'Trang bìa «Dictionarium Annamiticum Lusitanum et Latinum» — từ điển Việt–Bồ–La của Cha Alexandre de Rhodes, in tại Rôma năm 1651. Quyển sách khai sinh chữ quốc ngữ in. Đáng chú ý là dòng thứ tư: sách do «Sacrae Congregationis de Propaganda Fide» xuất bản — chính Bộ Truyền Bá Đức Tin mà Đức Grêgôriô XV lập năm 1622, cơ quan đã mở đường cho toàn bộ công cuộc truyền giáo tại Việt Nam. Nguồn: Wikimedia Commons, phạm vi công cộng.'
            })}
            aria-label="Phóng to trang bìa Dictionarium Annamiticum 1651"
          >
            <Image
              src="/images/ghvn_dictionarium_1651.jpg"
              alt="Trang bìa Dictionarium Annamiticum Lusitanum et Latinum, Rôma 1651"
              width={560} height={810}
              sizes="(max-width: 720px) 92vw, 300px"
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </button>
          <figcaption className="doc-caption">
            Từ điển Việt–Bồ–La, Rôma 1651 — do <em>Sacrae Congregationis de Propaganda Fide</em> in, tức chính Bộ Truyền
            Bá Đức Tin lập năm 1622 ở đầu chương này.
          </figcaption>
        </figure>

        <p className="doc-para">
          Lịch sử có tài liệu chắc chắn của Giáo hội Việt Nam thật sự bắt đầu ngày <strong>18 tháng 01 năm 1615</strong>,
          khi một nhóm tu sĩ <strong>Dòng Tên</strong> chạy khỏi cuộc bách hại ở Nhật Bản cập bến Cửa Hàn — Đà Nẵng ngày
          nay — do cha <strong>Francesco Buzomi</strong> và cha <strong>Diogo Carvalho</strong> dẫn đầu. Đây là cơ sở
          truyền giáo <em>thường trú</em> đầu tiên trên đất Việt, và từ đây trở đi mọi mốc đều có văn khố đối chiếu.
          Năm <strong>1627</strong>, cha <strong>Alexandre de Rhodes</strong> — người Việt quen gọi là{' '}
          <strong>Cha Đắc Lộ</strong> — mở cửa Đàng Ngoài. Năm <strong>1644</strong>, ngày 26 tháng 7, thầy giảng{' '}
          <strong>Anrê Phú Yên</strong> bị xử tại Quảng Nam, trở thành chứng nhân đức tin đầu tiên của Đàng Trong —{' '}
          <em>hai trăm mười bảy năm trước khi Cha Phêrô Nguyễn Văn Lựu chịu chém ngoài thành Mỹ Tho</em>. Năm{' '}
          <strong>1651</strong>, tại Rôma, Cha Đắc Lộ cho in ba tác phẩm chữ quốc ngữ đầu tiên, trong đó có cuốn{' '}
          <em>Dictionarium Annamiticum Lusitanum et Latinum</em> — quyển từ điển đã khai sinh ra chính thứ chữ mà trang
          này đang dùng để kể lại câu chuyện.
        </p>

        <p className="doc-para">
          Rồi đến văn kiện làm thay đổi tất cả. Ngày <strong>9 tháng 9 năm 1659</strong>, Đức Giáo hoàng{' '}
          <strong>Alexanđê VII</strong> ban tông sắc <em>Super Cathedram</em>, lập hai Phủ Doãn Tông Toà{' '}
          <strong>Đàng Trong</strong> và <strong>Đàng Ngoài</strong>, trao cho Đức cha{' '}
          <strong>Pierre Lambert de la Motte</strong> và Đức cha <strong>François Pallu</strong>. Từ chỗ là một cánh
          đồng truyền giáo không tên, Việt Nam lần đầu có địa chỉ hành chính trong Giáo hội hoàn vũ. Chín năm sau,{' '}
          <strong>1668</strong>, bốn linh mục Việt Nam đầu tiên được truyền chức tại Ayutthaya. Năm{' '}
          <strong>1670</strong>, Đức cha Lambert de la Motte họp <strong>Công đồng Phố Hiến</strong> và lập{' '}
          <strong>Dòng Mến Thánh Giá</strong> — dòng nữ bản địa đầu tiên, mà gần hai trăm năm sau sẽ có mặt trong câu
          chuyện của Chương III: chính các nữ tu Mến Thánh Giá từ Bãi Xan là những người được Cha Guillou gọi về tá túc
          bên ngôi nhà thờ lá Mỹ Tho cuối năm 1861.
        </p>

        <div className="tntt-gallery" style={{ marginBottom: '8px' }}>
          {[
            {
              src: '/images/ghvn_alexandre_de_rhodes.jpg',
              cap: 'Chân dung Cha Alexandre de Rhodes (1593 – 1660), người Việt quen gọi là Cha Đắc Lộ. Thừa sai Dòng Tên, vào Đàng Trong năm 1624 và mở cửa Đàng Ngoài năm 1627; chính ngài vận động Toà Thánh lập hàng giáo phẩm cho Việt Nam, dẫn tới tông sắc năm 1659. Nguồn: Wikimedia Commons, phạm vi công cộng.',
              label: 'Cha Alexandre de Rhodes (1593 – 1660)'
            },
            {
              src: '/images/ghvn_divers_voyages_1653.jpg',
              cap: 'Trang bìa «Divers voyages et missions du P. Alexandre de Rhodes en la Chine et autres royaumes de l’Orient», Paris, 1653 — thiên hồi ký ghi lại hành trình truyền giáo của ngài tại Đàng Trong và Đàng Ngoài, một trong những nguồn phương Tây sớm nhất mô tả xã hội Việt Nam thế kỷ XVII. Nguồn: Wikimedia Commons, phạm vi công cộng.',
              label: 'Divers voyages et missions · Paris 1653'
            },
            {
              src: '/images/ghvn_cuong_muc_trang_sach.jpg',
              cap: 'Một trang ruột bộ «Khâm Định Việt Sử Thông Giám Cương Mục» — bản khắc gỗ chữ Hán, khuôn khổ chính sử triều Nguyễn. Mốc 1533 và tên I-nê-khu nằm ở quyển XXXIII, tờ 6b của bộ sách này, kèm ghi chú dẫn nguồn là «Dã Lục» — một tập ghi chép tư nhân nay đã thất truyền. Nguồn: Wikimedia Commons, phạm vi công cộng.',
              label: 'Trang ruột Cương Mục · bản khắc gỗ'
            },
            {
              src: '/images/ghvn_vcth_phu_nhai.jpg',
              cap: 'Vương cung thánh đường Đức Mẹ Vô Nhiễm Nguyên Tội Phú Nhai, Xuân Trường, Nam Định — thuộc Giáo phận Bùi Chu. Phú Nhai chính là vùng làng Trà Lũ xưa, một trong ba địa danh mà Cương Mục chép là nơi I-nê-khu giảng đạo năm 1533. Ảnh: Hoangvantoanajc, Wikimedia Commons, giấy phép CC BY-SA 3.0.',
              label: 'Vương cung thánh đường Phú Nhai — làng Trà Lũ xưa'
            },
            {
              src: '/images/ghvn_nha_tho_bui_chu.jpg',
              cap: 'Nhà thờ Chính toà Bùi Chu, Nam Định. Cả ba địa danh Cương Mục nêu — Ninh Cường, Quần Anh (nay là Quần Phương) và Trà Lũ (nay là Phú Nhai) — đều nằm trong địa giới Giáo phận Bùi Chu ngày nay. Ảnh: Hoangvantoanajc, Wikimedia Commons, giấy phép CC BY-SA 3.0.',
              label: 'Nhà thờ Chính toà Bùi Chu, Nam Định'
            }
          ].map((img) => (
            <figure key={img.src} className="tntt-figure">
              <button
                type="button" className="tntt-thumb-btn"
                onClick={() => moAnh({ src: img.src, caption: img.cap })}
                aria-label={`Phóng to: ${img.label}`}
              >
                <Image src={img.src} alt={img.cap} width={640} height={480} sizes="(max-width: 520px) 46vw, 220px" className="tntt-photo" />
                <span className="tntt-zoom" aria-hidden="true"><Eye size={13} /> Xem</span>
              </button>
              <figcaption className="tntt-caption"><strong>{img.label}</strong><br />{img.cap.substring(0, 78)}…</figcaption>
            </figure>
          ))}
        </div>
        <p style={{ fontSize: '0.78rem', fontStyle: 'italic', color: 'var(--color-subtle)', margin: '0 0 22px', lineHeight: 1.6 }}>
          Ba ảnh đầu thuộc phạm vi công cộng (tác phẩm và bản khắc thế kỷ XVII – XIX). Hai ảnh nhà thờ Nam Định của tác
          giả <strong>Hoangvantoanajc</strong> trên Wikimedia Commons, dùng theo giấy phép <strong>CC BY-SA 3.0</strong>{' '}
          — ghi công theo đúng yêu cầu của giấy phép.
        </p>

        <p className="doc-para">
          Từ tông sắc 1659 đến ngôi thánh đường trên đại lộ Hùng Vương hôm nay chỉ còn ba nhịp. Năm{' '}
          <strong>1844</strong>, Đức Grêgôriô XVI chia Đàng Trong làm hai, và vùng đất sẽ thành Giáo phận Mỹ Tho rơi vào{' '}
          <strong>Địa phận Tây Đàng Trong</strong>. Năm <strong>1960</strong>, Đức Gioan XXIII lập Hàng Giáo Phẩm Việt
          Nam, và trong cùng đợt văn kiện ấy <strong>Giáo phận Mỹ Tho ra đời</strong>. Năm <strong>1988</strong>, Đức
          Gioan Phaolô II tôn phong <strong>117 Thánh Tử Đạo Việt Nam</strong> — trong đó có vị linh mục chịu chém ở Mỹ
          Tho năm 1861, người sẽ thành Bổn mạng của giáo phận, và là vị mà một xứ đoàn thiếu nhi sẽ lấy danh hiệu làm tên
          mình vào năm 2005.
        </p>

        <p className="doc-para">
          Đó là toàn bộ lý do quyển sách này có bốn chương thay vì một. Điều bắt đầu ở bờ hồ Galilê, đi qua Rôma, qua
          tông sắc 1659, qua máu các vị tử đạo, cuối cùng đọng lại thành một họ đạo có tên, một ngôi nhà thờ có ngày khởi
          công, và một đoàn thiếu nhi có khăn quàng. <strong>Chương II</strong> nhận lấy câu chuyện từ đúng chỗ này — từ
          những ngôi mộ cổ khắc thập giá ở Ba Giồng, có niên đại 1663 – 1664, tức chỉ bốn năm sau tông sắc của Đức
          Alexanđê VII.
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
            <li>[7] <em>Khâm Định Việt Sử Thông Giám Cương Mục</em>, Quốc Sử Quán triều Nguyễn, Chính biên, quyển XXXIII, tờ 6b (biên soạn 1856 – 1884). Bản dịch Viện Sử học; bản số hoá tại archive.org và cvdvn.net. Nguồn của mốc 1533, tên I-nê-khu và ba địa danh Ninh Cường, Quần Anh, Trà Lũ.</li>
            <li>[8] Lm. Võ Đình Đệ, <em>&ldquo;Thực hư có giáo sĩ I-nê-xu lén truyền giáo ở Đại Việt năm 1533&rdquo;</em>, gpquinhon.org — tổng hợp phản biện, dẫn Chu Thiên, Đinh Xuân Lâm, Trần Thanh Ái, Lm. Bùi Đức Sinh; đối chiếu với <em>Tây Dương Gia Tô Bí Lục</em>. Xem thêm ofmvn.org, <em>&ldquo;Thừa sai I-nê-xu của sách Cương Mục và thừa sai I-nê-xu Dòng Phan Sinh&rdquo;</em>. Truy cập 08/2026.</li>
            <li>[9] Hội đồng Giám mục Việt Nam, <em>Biên niên sử của Giáo hội Công giáo Việt Nam</em>, hdgmvietnam.com — nguồn của các mốc 1550, 1580 – 1586, 1583, 18/01/1615, 1627, 26/7/1644, 1651, 1659, 1668 và 1670. Truy cập 08/2026.</li>
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
