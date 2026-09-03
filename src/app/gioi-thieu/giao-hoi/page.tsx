'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Eye, ScrollText } from 'lucide-react';
import PopesContinuousMarquee from '@/components/PopesContinuousMarquee';
import KhungTrang from '../KhungTrang';
import { CuaSoLyLich, CuaSoAnh, CuaSoTuDien } from '../CuaSo';
import MetaUpdater from '@/components/MetaUpdater';
import { POPE_LEO_XIV_BIO, TU_DIEN, PRE1960_ORDINARIES } from '../duLieu';
import type { DetailedBioRecord, TuDienRecord } from '../duLieu';

export default function Trang() {
  const [lyLich, setLyLich] = useState<DetailedBioRecord | null>(null);
  const [anh, setAnh] = useState<{ src: string; caption: string } | null>(null);
  const [tuDien, setTuDien] = useState<TuDienRecord | null>(null);
  const allBios = [POPE_LEO_XIV_BIO, ...PRE1960_ORDINARIES];

  const moTuDien = (id: string) => setTuDien(TU_DIEN[id] || null);

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

        <figure className="doc-figure doc-figure-left">
          <button
            type="button" className="tntt-thumb-btn"
            onClick={() => moAnh({
              src: '/images/ghvn_christian_martyrs.jpg',
              caption: 'Bức họa "Lời cầu nguyện cuối cùng của các vị tử đạo Kitô giáo" (The Christian Martyrs Last Prayer) của Jean-Léon Gérôme (1883). Diễn tả cảnh các tín hữu sơ khai cầu nguyện trong Đấu trường La Mã trước khi bị thú dữ xé xác. Máu của họ đã trở thành hạt giống phát triển Giáo hội. Nguồn: Wikimedia Commons, phạm vi công cộng.'
            })}
            aria-label="Phóng to bức họa tử đạo"
          >
            <Image
              src="/images/ghvn_christian_martyrs.jpg"
              alt="Bức họa Lời cầu nguyện cuối cùng của các vị tử đạo"
              width={1040} height={632}
              sizes="(max-width: 720px) 92vw, 320px"
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </button>
          <figcaption className="doc-caption">
            "Lời cầu nguyện cuối cùng của các vị tử đạo" — tranh của Jean-Léon Gérôme, 1883.
          </figcaption>
        </figure>

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
          Tuy nhiên, bước đường của Giáo hội qua hai thiên niên kỷ không hề bình lặng. Bên cạnh những vinh quang, Giáo hội liên tục phải đối mặt với sóng gió từ các thế lực thù địch, sự can thiệp của cường quyền thế tục và những mầm mống dị giáo dẫn đến chia rẽ sâu sắc. Khát vọng thâu tóm quyền lực của các vương triều, kết hợp với những quan điểm thần học đối lập, đã gây ra những cuộc ly giáo đầy đau thương. Điển hình là vụ <strong>Ly giáo Đông–Tây năm 1054</strong> chia đôi Kitô giáo thành Công giáo Rôma và Chính Thống giáo Đông phương. Đến thế kỷ XVI, sự trỗi dậy của các thế lực chính trị muốn phá vỡ ảnh hưởng của Rôma đã châm ngòi cho cuộc <strong>Cải Cách Tin Lành</strong> năm 1517 do Martin Luther khởi xướng, và tiếp đó là sự ly khai của <strong>Anh giáo</strong> (1534). 
        </p>

        {/* CSS Sơ đồ phả các tôn giáo */}
        {/* CSS Sơ đồ phả các tôn giáo */}
        <div style={{ margin: '2rem 0', backgroundColor: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb', overflowX: 'auto', WebkitOverflowScrolling: 'touch', maxWidth: '100%' }}>
          <div style={{ padding: '2rem 1rem', minWidth: '900px' }}>
            <h4 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--color-navy)', fontSize: '1.25rem' }}>SƠ ĐỒ PHẢ HỆ VÀ CÁC CUỘC LY GIÁO</h4>
            <div className="genealogy-tree" style={{ width: '100%' }}>
              <style dangerouslySetInnerHTML={{ __html: `
                .genealogy-tree { display: flex; justify-content: center; }
                .genealogy-tree ul { padding-top: 15px; position: relative; display: flex; justify-content: center; padding-left: 0; margin: 0; }
                .genealogy-tree li { float: left; text-align: center; list-style-type: none; position: relative; padding: 15px 2px 0 2px; }
                .genealogy-tree li::before, .genealogy-tree li::after { content: ''; position: absolute; top: 0; right: 50%; border-top: 1.5px solid #ccc; width: 50%; height: 15px; }
                .genealogy-tree li::after { right: auto; left: 50%; border-left: 1.5px solid #ccc; }
                .genealogy-tree li:only-child::after, .genealogy-tree li:only-child::before { display: none; }
                .genealogy-tree li:only-child { padding-top: 0; }
                .genealogy-tree li:first-child::before, .genealogy-tree li:last-child::after { border: 0 none; }
                .genealogy-tree li:last-child::before { border-right: 1.5px solid #ccc; border-radius: 0 4px 0 0; }
                .genealogy-tree li:first-child::after { border-radius: 4px 0 0 0; }
                .genealogy-tree ul ul::before { content: ''; position: absolute; top: 0; left: 50%; border-left: 1.5px solid #ccc; width: 0; height: 15px; }
                .genealogy-tree li div.node { border: 1px solid #ccc; padding: 6px 8px; text-decoration: none; color: #333; font-family: inherit; font-size: 0.75rem; display: inline-block; border-radius: 6px; background-color: white; box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: all 0.2s ease; min-width: 80px; }
                .genealogy-tree li div.node.root { background-color: #f3f4f6; font-weight: bold; border-color: #d1d5db; }
                .genealogy-tree li div.node.catholic { background-color: #fee2e2; border-color: #fca5a5; font-weight: bold; color: #991b1b; }
                .genealogy-tree li div.node.orthodox { background-color: #e0e7ff; border-color: #c7d2fe; color: #3730a3; }
                .genealogy-tree li div.node.protestant { background-color: #fef3c7; border-color: #fde68a; color: #92400e; }
                .genealogy-tree li div.node.judaism { background-color: #dcfce7; border-color: #bbf7d0; color: #166534; }
                .genealogy-tree li div.node.islam { background-color: #f3e8ff; border-color: #e9d5ff; color: #6b21a8; }
                .genealogy-tree li div.node.heresy { background-color: #ffe4e6; border-color: #fda4af; color: #be123c; border-style: dashed; }
                .genealogy-tree li div.node:hover { transform: scale(1.05); box-shadow: 0 4px 8px rgba(0,0,0,0.1); z-index: 10; position: relative; }
                .genealogy-tree .sub-label { display: block; font-size: 0.65rem; color: #666; margin-top: 2px; font-weight: normal; }
                .genealogy-tree div.node.catholic .sub-label { color: #b91c1c; }
              `}} />
            <ul>
              <li>
                <div className="node root">Đạo Abraham<span className="sub-label">Cội nguồn (TK 19 TCN)</span></div>
                <ul>
                  <li>
                    <div className="node judaism">Do Thái giáo<span className="sub-label">TK 13 TCN</span></div>
                  </li>
                  <li>
                    <div className="node root">Kitô giáo<span className="sub-label">Thế kỷ 1 SCN</span></div>
                    <ul>
                      <li>
                        <div className="node heresy">GH Phương Đông<span className="sub-label">Ly giáo 431 (Nestorius)</span></div>
                      </li>
                      <li>
                        <div className="node heresy">GH Cổ Đông Phương<span className="sub-label">Ly giáo 451 (Coptic, Armenia)</span></div>
                      </li>
                      <li>
                        <div className="node orthodox">Chính Thống giáo<span className="sub-label">Đại Ly giáo 1054</span></div>
                      </li>
                      <li>
                        <div className="node catholic">Công giáo Rôma<span className="sub-label">Hiệp thông với Giáo hoàng</span></div>
                        <ul>
                          <li>
                            <div className="node protestant">Anh giáo<span className="sub-label">Ly khai 1534 (Vua Henry VIII)</span></div>
                            <ul>
                              <li><div className="node protestant">Giám Lý<span className="sub-label">Thế kỷ 18</span></div></li>
                              <li><div className="node protestant">Báp-tít<span className="sub-label">Thế kỷ 17</span></div></li>
                            </ul>
                          </li>
                          <li>
                            <div className="node protestant">Tin Lành<span className="sub-label">Cải cách 1517</span></div>
                            <ul>
                              <li><div className="node protestant">Lutheran<span className="sub-label">Đức (Martin Luther)</span></div></li>
                              <li><div className="node protestant">Calvinist<span className="sub-label">Thụy Sĩ (Jean Calvin)</span></div></li>
                              <li><div className="node protestant">Ngũ Tuần<span className="sub-label">Thế kỷ 20 (Ân tứ)</span></div></li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div className="node islam">Hồi giáo<span className="sub-label">TK 7 SCN</span></div>
                    <ul>
                      <li><div className="node islam">Sunni<span className="sub-label">Đa số (85%)</span></div></li>
                      <li><div className="node islam">Shia<span className="sub-label">Thiểu số (15%)</span></div></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <figure className="doc-figure" style={{ margin: 0, float: 'none', width: '100%' }}>
            <button
              type="button" className="tntt-thumb-btn"
              onClick={() => moAnh({
                src: '/images/ghvn_martin_luther.jpg',
                caption: 'Chân dung Martin Luther (1483–1546), người khởi xướng cuộc Cải Cách Tin Lành. Tranh của Lucas Cranach. Sự kiện này là một trong những biến cố lớn nhất dẫn đến sự chia rẽ của Giáo hội Tây phương. Nguồn: Wikimedia Commons.'
              })}
              aria-label="Phóng to chân dung Martin Luther"
            >
              <Image src="/images/ghvn_martin_luther.jpg" alt="Chân dung Martin Luther" width={479} height={700} sizes="(max-width: 720px) 46vw, 320px" style={{ width: '100%', height: 'auto', borderRadius: '8px', objectFit: 'contain' }} />
            </button>
            <figcaption className="doc-caption">Martin Luther (1483–1546) — người khởi xướng cuộc Cải Cách Tin Lành năm 1517.</figcaption>
          </figure>
          
          <figure className="doc-figure" style={{ margin: 0, float: 'none', width: '100%' }}>
            <button
              type="button" className="tntt-thumb-btn"
              onClick={() => moAnh({
                src: '/images/ghvn_council_of_trent.jpg',
                caption: 'Công đồng Trentô (1545–1563) họp tại Nhà thờ Santa Maria Maggiore ở Trento, Ý. Đây là nỗ lực vĩ đại của Giáo hội Công giáo nhằm đáp trả cuộc Cải Cách Tin Lành: chấn chỉnh kỷ luật, cấm bán bùa xá tội, và tái khẳng định các tín điều quan trọng. Tranh của Pasquale Cati, 1588. Nguồn: Wikimedia Commons.'
              })}
              aria-label="Phóng to tranh Công đồng Trentô"
            >
              <Image src="/images/ghvn_council_of_trent.jpg" alt="Công đồng Trentô" width={1600} height={1574} sizes="(max-width: 720px) 46vw, 320px" style={{ width: '100%', height: 'auto', borderRadius: '8px', objectFit: 'contain' }} />
            </button>
            <figcaption className="doc-caption">Công đồng Trentô (1545–1563) — cuộc Phản Cải Cách toàn diện của Giáo hội. Tranh: Pasquale Cati, 1588.</figcaption>
          </figure>
        </div>

        <p className="doc-para">
          Không ít vị Giáo hoàng đã đứng ra để dọn sạch và canh tân. <strong>Đức Grêgôriô VII</strong> (1073–1085) cải cách chế độ phong kiến giáo hội, cấm mua bán chức vụ thánh (<em>simonie</em>). <strong>Công Đồng Trentô</strong> (1545–1563) — được triệu tập đáp lại Cải Cách Luther — khởi đầu cuộc Phản Cải Cách, làm sáng tỏ tín lý, thanh luyện phụng vụ và cải tổ chủng viện đào tạo linh mục. <strong>Đức Lêô XIII</strong> (1878–1903) với Thông điệp <em>Rerum Novarum</em> (1891) đặt nền móng cho Học thuyết Xã hội Công giáo, bảo vệ quyền lợi công nhân trước làn sóng công nghiệp hóa. <strong>Công Đồng Vatican II</strong> (1962–1965) dưới triều <strong>Đức Gioan XXIII</strong> và <strong>Đức Phaolô VI</strong> là cuộc canh tân toàn diện nhất trong thế kỷ XX — đổi ngôn ngữ phụng vụ từ Latinh sang tiếng bản địa, mở rộng đối thoại đại kết và liên tôn, tái khẳng định phẩm giá con người và tự do tôn giáo.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[3]</sup>
        </p>

        <p className="doc-para">
          Dù trải qua muôn vàn thử thách và đối diện với sự chống phá từ nhiều thế lực qua các thời đại, Giáo hội vẫn không ngừng thanh luyện, kiên vững trong đức tin và lan tỏa Ánh sáng Tin Mừng đến tận cùng trái đất. Tinh thần canh tân không ngừng (<em>Ecclesia semper reformanda</em>) chính là sức sống mãnh liệt giúp Giáo hội trường tồn qua hơn hai mươi thế kỷ.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[4]</sup>
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
          <button className="term-link" onClick={() => moTuDien('le-trang-tong')}>Nguyên Hoà nguyên niên</button> đời Lê Trang Tông, có người Tây Dương tên là{' '}
          <button className="term-link" onClick={() => moTuDien('i-ne-khu')}>I-nê-khu</button> đi đường biển lén vào giảng đạo Gia Tô ở làng <strong>Ninh Cường</strong> và{' '}
          <strong>Quần Anh</strong> thuộc huyện Nam Chân, và làng <strong>Trà Lũ</strong> thuộc huyện Giao Thuỷ.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[7]</sup>
        </p>

        <p className="doc-para">
          <button className="term-link" onClick={() => moTuDien('ninh-cuong-quan-anh-tra-lu')}>Ba địa danh ấy</button> hôm nay đều nằm trong <strong>Giáo phận Bùi Chu, tỉnh Nam Định</strong>: Ninh Cường vẫn còn tên,
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

        <h3 className="doc-heading" style={{ marginTop: '2.5rem' }}>Dòng Tên và Những Hạt Giống Đầu Tiên (1615)</h3>

        <p className="doc-para">
          Lịch sử có tài liệu chắc chắn của Giáo hội Việt Nam thật sự bắt đầu ngày <strong>18 tháng 01 năm 1615</strong>,
          khi một nhóm tu sĩ <strong>Dòng Tên (Jesuits)</strong> chạy khỏi cuộc bách hại tàn khốc ở Nhật Bản, xuống thuyền từ <button className="term-link" onClick={() => moTuDien('macao')}>Macao</button> và cập bến <button className="term-link" onClick={() => moTuDien('cua-han')}>Cửa Hàn</button> — Đà Nẵng ngày
          nay — do cha <button className="term-link" onClick={() => moTuDien('buzomi')}>Francesco Buzomi</button> và cha <strong>Diogo Carvalho</strong> dẫn đầu. Vị chúa cho phép các ngài ở lại là <button className="term-link" onClick={() => moTuDien('chua-sai')}>Chúa Sãi Nguyễn Phúc Nguyên</button>. Khác với những
          lần ghé thăm chớp nhoáng trước đây, các cha Dòng Tên quyết định ở lại. Đây là cơ sở
          truyền giáo <em>thường trú</em> đầu tiên trên đất Việt, và từ đây trở đi mọi mốc đều có văn khố đối chiếu.
        </p>

        <p className="doc-para">
          Nổi bật trong giai đoạn này là cha <button className="term-link" onClick={() => moTuDien('francisco-de-pina')}>Francisco de Pina</button>. Ngài là người phương Tây đầu tiên
          thông thạo tiếng Việt đến mức có thể giảng đạo trực tiếp mà không cần thông dịch viên. Hơn thế nữa,
          chính ngài là người đặt những viên gạch đầu tiên cho việc dùng ký tự Latinh để ghi âm tiếng Việt, mở ra
          một công trình vĩ đại mà học trò của ngài sẽ hoàn thiện sau này: <strong>Chữ Quốc ngữ</strong>. Lớp học ấy đặt tại <button className="term-link" onClick={() => moTuDien('dinh-chiem')}>Thanh Chiêm (Kẻ Chàm), dinh Quảng Nam</button>.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <figure className="doc-figure" style={{ margin: 0, float: 'none', width: '100%' }}>
            <button
              type="button" className="tntt-thumb-btn"
              style={{ aspectRatio: '800 / 994', height: 'auto' }}
              onClick={() => moAnh({
                src: '/images/alexandre_de_rhodes.jpg',
                caption: 'Chân dung Cha Alexandre de Rhodes (1593 – 1660), người Việt quen gọi là Cha Đắc Lộ. Thừa sai Dòng Tên, vào Đàng Trong năm 1624 và mở cửa Đàng Ngoài năm 1627. Nguồn: Wikimedia Commons, phạm vi công cộng.'
              })}
            >
              <Image src="/images/alexandre_de_rhodes.jpg" alt="Alexandre de Rhodes" width={800} height={994} sizes="(max-width: 720px) 46vw, 320px" className="tntt-photo" style={{ width: '100%', height: '100%', borderRadius: '8px' }} />
            </button>
            <figcaption className="doc-caption">Cha Đắc Lộ (Alexandre de Rhodes).</figcaption>
          </figure>
          
          <figure className="doc-figure" style={{ margin: 0, float: 'none', width: '100%' }}>
            <button
              type="button" className="tntt-thumb-btn"
              style={{ aspectRatio: '800 / 1087', height: 'auto' }}
              onClick={() => moAnh({
                src: '/images/tu_dien_viet_bo_la_1651.jpg',
                caption: 'Trang bìa «Dictionarium Annamiticum Lusitanum et Latinum» — từ điển Việt–Bồ–La in tại Rôma năm 1651. Quyển sách khai sinh chữ quốc ngữ in. Chú ý dòng chữ: in bởi "Sacrae Congregationis de Propaganda Fide" (Bộ Truyền Bá Đức Tin, lập năm 1622). Nguồn: Wikimedia Commons.'
              })}
            >
              <Image src="/images/tu_dien_viet_bo_la_1651.jpg" alt="Từ điển Việt-Bồ-La 1651" width={800} height={1087} sizes="(max-width: 720px) 46vw, 320px" className="tntt-photo" style={{ width: '100%', height: '100%', borderRadius: '8px' }} />
            </button>
            <figcaption className="doc-caption">Từ điển Việt–Bồ–La (Rôma, 1651).</figcaption>
          </figure>
        </div>

        <h3 className="doc-heading" style={{ marginTop: '2.5rem' }}>Đắc Lộ, Chữ Quốc Ngữ và Sự Ra Đời Của Hội Thừa Sai Paris (MEP)</h3>

        <p className="doc-para">
          Người học trò xuất sắc nhất của cha Pina chính là <button className="term-link" onClick={() => moTuDien('dac-lo')}>Alexandre de Rhodes</button> — mà người Việt quen gọi
          trìu mến là <strong>Cha Đắc Lộ</strong>. Năm <strong>1627</strong>, ngài mở cửa truyền giáo tại Đàng Ngoài, được <button className="term-link" onClick={() => moTuDien('trinh-trang')}>chúa Trịnh Tráng</button> tiếp đón tại <button className="term-link" onClick={() => moTuDien('ke-cho')}>Kẻ Chợ</button>.
          Bằng tài năng ngôn ngữ và sự hội nhập văn hóa sâu sắc, ngài đã rửa tội cho hàng ngàn người và lập ra <button className="term-link" onClick={() => moTuDien('thay-giang')}>tổ chức Thầy Giảng</button>. Năm <strong>1651</strong>, tại Rôma, ngài cho in cuốn <em>Dictionarium Annamiticum Lusitanum et Latinum</em>
          (Từ điển Việt–Bồ–La) tại nhà in <button className="term-link" onClick={() => moTuDien('inscrutabili-1622')}>Bộ Truyền Bá Đức Tin</button>, chính thức hệ thống hóa thứ chữ viết đã thai nghén suốt mấy mươi năm: <strong>Chữ Quốc ngữ</strong>.
          Thứ chữ mà chúng ta đang dùng để đọc những dòng này, bắt nguồn trực tiếp từ khát vọng rao giảng Tin Mừng
          cho người Việt của các thừa sai.
        </p>

        <p className="doc-para">
          Bị trục xuất khỏi Việt Nam, cha Đắc Lộ trở về châu Âu với một trăn trở lớn: làm sao để Giáo hội Việt Nam
          tồn tại độc lập nếu các thừa sai ngoại quốc tiếp tục bị trục xuất? Câu trả lời của ngài là <strong>phải có
          linh mục bản xứ</strong>. Ngài đi khắp Rôma và Paris vận động Tòa Thánh bổ nhiệm Giám mục cho Việt Nam
          để các vị này có thể phong chức cho người bản địa. Nỗ lực này dẫn đến sự thành lập <button className="term-link" onClick={() => moTuDien('mep')}>Hội Thừa sai Paris (Missions Étrangères de Paris — MEP)</button> vào năm 1658, hội dòng sẽ ghi dấu ấn sâu đậm nhất
          trong suốt tiến trình lịch sử Giáo hội Việt Nam. Vì Đàng Trong và Đàng Ngoài đều cấm đạo từng đợt, tổng hành dinh trên thực tế của các ngài suốt hơn một thế kỷ đặt tại <button className="term-link" onClick={() => moTuDien('ayutthaya')}>Ayutthaya bên Xiêm La</button>.
        </p>

        <h3 className="doc-heading" style={{ marginTop: '2.5rem' }}>Kỷ Nguyên Tông Tòa (1659) và Hạt Giống Tử Đạo</h3>

        <p className="doc-para">
          Ngày <strong>9 tháng 9 năm 1659</strong>, Đức Giáo hoàng <button className="term-link" onClick={() => moTuDien('alexandre-vii')}>Alexanđê VII</button> ban tông sắc <button className="term-link" onClick={() => moTuDien('super-cathedram-1659')}>Super Cathedram Principis Apostolorum</button>,
          chính thức thiết lập hai Hạt Đại diện Tông Toà đầu tiên tại Việt Nam: <strong>Đàng Trong</strong> và <strong>Đàng Ngoài</strong>.
          Ngài bổ nhiệm Đức cha <strong>Pierre Lambert de la Motte</strong> cai quản Đàng Trong và Đức cha <strong>François Pallu</strong>
          cai quản Đàng Ngoài. Quyết định ấy đến sau <button className="term-link" onClick={() => moTuDien('apostolatus-officium-1658')}>tông chiếu Apostolatus Officium (1658)</button>, và được kèm theo <button className="term-link" onClick={() => moTuDien('instructio-1659')}>Huấn thị 1659</button> — bản văn buộc thừa sai phải đào tạo hàng giáo sĩ bản quốc thay vì mang Âu châu sang Á Đông. Từ chỗ là một cánh đồng truyền giáo vô danh chịu <button className="term-link" onClick={() => moTuDien('padroado')}>chế độ bảo trợ của Bồ Đào Nha</button>, Việt Nam
          lần đầu tiên có địa chỉ hành chính trong Giáo hội hoàn vũ, trực thuộc thẳng Tòa Thánh.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <figure className="doc-figure" style={{ margin: 0, float: 'none', width: '100%' }}>
            <button
              type="button" className="tntt-thumb-btn"
              style={{ aspectRatio: '800 / 1088', height: 'auto' }}
              onClick={() => moAnh({
                src: '/images/lambert_de_la_motte.png',
                caption: 'Đức cha Pierre Lambert de la Motte (1624–1679), vị Đại diện Tông tòa tiên khởi của Đàng Trong. Ngài là người sáng lập Dòng Mến Thánh Giá năm 1670. Nguồn: Wikimedia Commons.'
              })}
            >
              <Image src="/images/lambert_de_la_motte.png" alt="Pierre Lambert de la Motte" width={800} height={1088} sizes="(max-width: 720px) 46vw, 320px" className="tntt-photo" style={{ width: '100%', height: '100%', borderRadius: '8px' }} />
            </button>
            <figcaption className="doc-caption">Đức cha Pierre Lambert de la Motte.</figcaption>
          </figure>
          
          <figure className="doc-figure" style={{ margin: 0, float: 'none', width: '100%' }}>
            <button
              type="button" className="tntt-thumb-btn"
              style={{ aspectRatio: '800 / 964', height: 'auto' }}
              onClick={() => moAnh({
                src: '/images/francois_pallu.jpg',
                caption: 'Đức cha François Pallu (1626–1684), vị Đại diện Tông tòa tiên khởi của Đàng Ngoài. Cùng với Lambert de la Motte, ngài là đồng sáng lập Hội Thừa sai Paris (MEP). Nguồn: Wikimedia Commons.'
              })}
            >
              <Image src="/images/francois_pallu.jpg" alt="François Pallu" width={800} height={964} sizes="(max-width: 720px) 46vw, 320px" className="tntt-photo" style={{ width: '100%', height: '100%', borderRadius: '8px' }} />
            </button>
            <figcaption className="doc-caption">Đức cha François Pallu.</figcaption>
          </figure>
        </div>

        <p className="doc-para">
          Chín năm sau, <strong>1668</strong>, những linh mục Việt Nam đầu tiên được truyền chức. Năm <strong>1670</strong>,
          Đức cha <button className="term-link" onClick={() => moLyLich(allBios.find(b => b.id === 'dgm-lambert-de-la-motte') || null)}>Lambert de la Motte</button> lập <button className="term-link" onClick={() => moTuDien('mtg')}>Dòng Mến Thánh Giá</button> — dòng nữ bản địa tiên khởi.
          Sự lớn mạnh của Giáo hội non trẻ đi liền với máu và nước mắt. Các đợt bách hại khủng khiếp kéo dài suốt ba thế kỷ (từ thế kỷ XVII đến XIX) đã cướp đi sinh mạng của hơn 130.000 tín hữu. Một phần lý do nằm ở chính Rôma: tông hiến <button className="term-link" onClick={() => moTuDien('ex-illa-die-1715')}>Ex Illa Die (1715)</button> rồi <button className="term-link" onClick={() => moTuDien('ex-quo-singulari-1742')}>Ex Quo Singulari (1742)</button> cấm người có đạo cử hành nghi lễ tế tổ tiên, khiến các quan lại Nho học có ngay lập luận trung tâm để gọi đạo Công giáo là «tả đạo» — thứ đạo dạy người ta bất hiếu.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[12]</sup> Hạt giống tử đạo đã được gieo từ rất sớm với chứng nhân tiên khởi là thầy giảng <button className="term-link" onClick={() => moTuDien('anre-phu-yen')}>Anrê Phú Yên</button> (bị xử trảm tại <button className="term-link" onClick={() => moTuDien('dinh-chiem')}>Kẻ Chàm, Quảng Nam</button> năm 1644, dưới thời <button className="term-link" onClick={() => moTuDien('nguyen-phuc-lan')}>chúa Nguyễn Phúc Lan</button>), và <button className="term-link" onClick={() => moTuDien('hien-thanh-tu-dao')}>117 vị đã được Đức Gioan Phaolô II tôn phong Hiển thánh năm 1988</button>.
        </p>

        <p className="doc-para">
          Trong suốt thời kỳ giông bão ấy — từ cuộc <button className="term-link" onClick={() => moTuDien('trinh-nguyen')}>Trịnh - Nguyễn phân tranh</button>, đến sự cấm cách gắt gao của các chúa <button className="term-link" onClick={() => moTuDien('nguyen-phuc-chu')}>Nguyễn Phúc Chu</button> và <button className="term-link" onClick={() => moTuDien('nguyen-phuc-khoat')}>Nguyễn Phúc Khoát</button> — Hạt Đại diện Tông tòa Đàng Trong vẫn kiên cường tồn tại nhờ sự dấn thân của các Giám mục MEP<sup>[10]</sup>. Tiêu biểu như Đức cha <button className="term-link" onClick={() => moLyLich(allBios.find(b => b.id === 'dgm-pigneau-de-behaine') || null)}>Pierre Pigneau de Behaine</button> (Bá Đa Lộc), người đã dẫn dắt giáo đoàn vượt qua chiến cuộc cuối thế kỷ XVIII, qua đời tại <button className="term-link" onClick={() => moTuDien('thi-nai')}>mặt trận Thị Nại</button> năm 1799 — được an táng tại <button className="term-link" onClick={() => moTuDien('lang-cha-ca')}>Lăng Cha Cả</button> ở Gia Định — và trở thành ân nhân của <button className="term-link" onClick={() => moTuDien('gia-long')}>vua Gia Long</button>.
        </p>

        <p className="doc-para">
          Tuy nhiên, bão tố thực sự ập đến vào thế kỷ XIX. Dưới thời <button className="term-link" onClick={() => moTuDien('minh-mang')}>vua Minh Mạng</button> (Dụ cấm đạo ngày 06/01/1833), <button className="term-link" onClick={() => moTuDien('thieu-tri')}>vua Thiệu Trị</button>, và đỉnh điểm là <button className="term-link" onClick={() => moTuDien('tu-duc')}>vua Tự Đức</button> với <button className="term-link" onClick={() => moTuDien('phan-sap')}>Chiếu Phân Sáp</button> ngày 05/8/1861, đạo Công giáo bị cấm cách khốc liệt ở quy mô quốc gia<sup>[11]</sup>. Chính trong những năm tháng đen tối nhất này, Đức cha <button className="term-link" onClick={() => moLyLich(allBios.find(b => b.id === 'dgm-cuenot') || null)}>Étienne-Théodore Cuénot</button> (Cố Thể) đã gánh vác Đàng Trong và chịu tử đạo trong ngục thất Bình Định.
        </p>

        {/* ══════════════════════════════════════════════════════════════
            PHẦN MINH BẠCH — những điều một trang sử đạo thường không kể
            ══════════════════════════════════════════════════════════════ */}
        <h3 className="doc-heading" style={{ marginTop: '2.5rem' }}>Những điều một trang sử đạo thường không kể</h3>

        <p className="doc-para">
          Đến đây, bản khảo cứu này dừng lại một nhịp. Kể lịch sử Giáo hội Việt Nam như một chuỗi tử đạo
          thuần khiết thì dễ, và cũng đúng một phần. Nhưng nếu chỉ kể như thế, người đọc sẽ không sao hiểu nổi
          vì sao suốt hơn một thế kỷ sau đó, bốn chữ <em>«đạo theo Tây»</em> lại bám dai đến vậy. Nó bám được
          vì có những sự việc có thật để bám vào. Bốn chương của quyển sách này sẽ không có giá trị gì nếu
          chương đầu đã im lặng ở đúng những chỗ khó nói.
        </p>

        <div className="doc-box">
          <div className="doc-box-title">Bốn chỗ khó nói, ghi ra đây thay vì bỏ qua</div>
          <p className="doc-box-text" style={{ marginBottom: '10px' }}>
            <strong>Một.</strong> <button className="term-link" onClick={() => moTuDien('hiep-uoc-versailles-1787')}>Hiệp ước Versailles ký ngày 28/11/1787</button> do một
            giám mục đứng tên thay mặt một vương tôn lưu vong. Pháp không thi hành, nhưng bảy mươi năm sau chính
            văn bản chết ấy được đem ra viện dẫn làm cơ sở pháp lý cho yêu sách về Đà Nẵng.
          </p>
          <p className="doc-box-text" style={{ marginBottom: '10px' }}>
            <strong>Hai.</strong> Vụ thành Phiên An 1833 – 1835. Linh mục <button className="term-link" onClick={() => moTuDien('marchand-co-du')}>Joseph Marchand (Cố Du)</button> có
            mặt trong thành suốt cuộc nổi dậy của Lê Văn Khôi — cuộc nổi dậy nhằm đưa con của hoàng tử Cảnh,
            một người Công giáo, lên ngôi. Ngài khai chỉ lo việc đạo; triều đình kết ngài hai tội. Từ sau bản án
            ấy, cấm đạo ở Đại Nam thôi không còn là chuyện tôn giáo.
          </p>
          <p className="doc-box-text" style={{ marginBottom: '10px' }}>
            <strong>Ba.</strong> Năm 1857, sau khi Giám mục <button className="term-link" onClick={() => moTuDien('diaz-sanjurjo')}>José María Díaz Sanjurjo</button> bị
            xử trảm ở Nam Định, Tây Ban Nha lấy đó làm cớ góp quân cho Pháp. Cùng năm ấy, Giám mục{' '}
            <button className="term-link" onClick={() => moTuDien('pellerin')}>Pellerin</button> — Đại diện Tông toà Bắc Đàng Trong — ngồi trong uỷ ban nghiên cứu vấn đề
            Việt Nam của Napoléon III, và năm 1858 có mặt trên chiến hạm chỉ huy khi hạm đội nổ súng vào Đà Nẵng.
            Ngài đã khẳng định với phía Pháp rằng giáo dân sẽ nổi lên ủng hộ. Điều đó không xảy ra. Ba năm sau
            là <button className="term-link" onClick={() => moTuDien('phan-sap')}>Chiếu Phân Sáp</button>.
          </p>
          <p className="doc-box-note">
            <strong>Bốn.</strong> <button className="term-link" onClick={() => moTuDien('hoa-uoc-nham-tuat-1862')}>Hoà ước Nhâm Tuất ngày 05/6/1862</button> chấm dứt cuộc
            bách hại — trong cùng một văn bản đã cắt ba tỉnh miền Đông Nam Kỳ cho Pháp, trong đó có{' '}
            <strong>Định Tường</strong>, tức Mỹ Tho. Điều mà ba trăm năm cầu nguyện và hàng vạn cái chết không
            giành được thì bốn năm tàu chiến giành được. Người Công giáo Việt Nam không có mặt trong cuộc đàm
            phán ấy, không được hỏi ý kiến, và sau đó phải mang tiếng vì chính điều khoản họ không đòi.
          </p>
        </div>

        <p className="doc-para">
          Ghi bốn điều trên không phải để hạ bệ ai, và cũng không phải để nhận tội thay người đã chết gần hai trăm
          năm. Ghi ra là vì một lý do đơn giản: những người đổ máu vì đức tin ở Ba Giồng, ở pháp trường ngoài thành
          Mỹ Tho, trong các đợt phân sáp — họ không phải là những người đã gọi tàu chiến tới. Chỉ khi nói rõ hai
          nhóm ấy là hai nhóm khác nhau thì cái chết của họ mới được trả lại đúng ý nghĩa. Bản khảo cứu này gắn
          nhãn <em>Có văn khố</em>, <em>Truyền thống</em> hoặc <em>Đang tranh luận</em> trên từng mục từ điển, và
          mỗi mục nhân vật hay biến cố nhạy cảm đều có phần <em>Góc khuất</em> riêng — để người đọc luôn biết mình
          đang đọc thứ gì.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[18]</sup>
        </p>

        <p className="doc-para">
          Từ tông sắc 1659 đến ngôi thánh đường ở Mỹ Tho hôm nay chỉ còn ba nhịp nối. Năm{' '}
          <strong>1844</strong>, do nhu cầu mục vụ ngày càng lớn, <button className="term-link" onClick={() => moTuDien('chia-dang-trong-1844')}>Đàng Trong được chia làm hai</button>, vùng đất Nam Kỳ trở thành{' '}
          <strong>Tây Đàng Trong</strong>. Hơn một thế kỷ sau, năm <strong>1960</strong>, <button className="term-link" onClick={() => moTuDien('venerabilium-nostrorum-1960')}>Hàng Giáo Phẩm Việt Nam được thiết lập</button>, và <button className="term-link" onClick={() => moTuDien('quod-venerabiles-fratres-1960')}>Giáo phận Mỹ Tho ra đời</button>. Giáo hội từ một hạt giống
          nhỏ nhoi đã đâm chồi nảy lộc thành một cây cổ thụ vĩ đại.
        </p>

        <p className="doc-para">
          Đó là toàn bộ lý do quyển sách này có bốn chương. Điều bắt đầu ở bờ hồ Galilê, đi qua Rôma, qua
          Đàng Trong, qua máu các vị tử đạo, cuối cùng đọng lại thành một họ đạo có tên, một ngôi nhà thờ có ngày khởi
          công, và một đoàn thiếu nhi có khăn quàng. <strong>Chương II</strong> nhận lấy câu chuyện từ đúng chỗ này — từ
          những ngôi mộ cổ khắc thập giá ở Ba Giồng có niên đại 1663, tức chỉ bốn năm sau tông sắc của Đức
          Alexanđê VII lập Hạt Đại diện Tông tòa Đàng Trong.
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
            <li>[10] Viện Nghiên cứu Pháp - Á (IRFA) / Văn khố Hội Thừa sai Paris, <em>Notices Biographiques</em>. Nguồn dữ liệu lịch sử về các Giám mục Đại diện Tông tòa Đàng Trong (1659 - 1844).</li>
            <li>[11] Quốc sử quán triều Nguyễn, <em>Đại Nam thực lục</em> (bản dịch Viện Sử học); Hội đồng Giám mục Việt Nam, <em>Hồ sơ 117 Thánh Tử Đạo Việt Nam</em> (1988) — tài liệu tham chiếu các sắc lệnh cấm đạo và chiếu Phân sáp.</li>
            <li>[12] Clêmentê XI, Tông hiến <em>Ex Illa Die</em>, 19/3/1715; Bênêđictô XIV, Tông hiến <em>Ex Quo Singulari</em>, 11/7/1742; Bộ Truyền Bá Đức Tin, Huấn thị <em>Plane Compertum Est</em>, 8/12/1939. Xem G. Minamiki, <em>The Chinese Rites Controversy from Its Beginning to Modern Times</em>, Loyola University Press, 1985.</li>
            <li>[13] Alexanđê VII, Tông chiếu <em>Apostolatus Officium</em>, 17/8/1658; Tông sắc <em>Super Cathedram Principis Apostolorum</em>, 9/9/1659 — toàn văn Latinh tại papalencyclicals.net và documentacatholicaomnia.eu. Huấn thị 1659 của Bộ Truyền Bá Đức Tin trong <em>Collectanea S.C. de Propaganda Fide</em>, Rôma 1907, t. I, số 135.</li>
            <li>[14] Grêgôriô XV, Tông sắc <em>Inscrutabili Divinae Providentiae Arcano</em>, 22/6/1622 — <em>Bullarium Romanum</em>, t. XII. H. Chappoulie, <em>Aux origines d&rsquo;une Église: Rome et les missions d&rsquo;Indochine au XVIIe siècle</em>, Paris, 1943.</li>
            <li>[15] Gioan XXIII, Tông hiến <em>Venerabilium Nostrorum</em>, 24/11/1960 — <em>Acta Apostolicae Sedis</em> 53 (1961), tr. 346–350; Sắc chỉ <em>Quod Venerabiles Fratres</em>, 27/11/1960 — AAS 53 (1961), tr. 474.</li>
            <li>[16] Đỗ Quang Chính, <em>Lịch sử chữ Quốc ngữ 1620–1659</em>, Sài Gòn, Ra Khơi, 1972; Roland Jacques, <em>Portuguese Pioneers of Vietnamese Linguistics prior to 1650</em>, Bangkok, Orchid Press, 2002; Cristoforo Borri, <em>Relatione della nuova missione</em>, Rôma, 1631.</li>
            <li>[17] Lê Quý Đôn, <em>Phủ biên tạp lục</em>, 1776; <em>Khâm Định Đại Nam Hội Điển Sự Lệ</em>; Châu bản triều Nguyễn, Trung tâm Lưu trữ Quốc gia I — đối chiếu các dụ cấm đạo và niên đại triều đình.</li>
            <li>[18] Về phản ứng của nhà nước Việt Nam với lễ phong thánh 19/6/1988: UCA News, bản tin 09/3/1988 và 16/3/1988; <em>Vietnamese Martyrs</em>, Wikipedia (dẫn nguồn UCA News và Tòa Thánh). Về vai trò của Giám mục Pellerin: GS Đinh Xuân Lâm, <em>«Đà Nẵng trong ý đồ chiến lược của tư bản Pháp trước chiến tranh xâm lược Việt Nam (1858)»</em>, Khoa Lịch sử, Trường ĐH KHXH&amp;NV — ĐHQG Hà Nội. Về việc dừng đặt tên đường Alexandre de Rhodes và Francisco de Pina: báo <em>Người Lao Động</em> và <em>Pháp Luật TP.HCM</em>, tháng 11/2019.</li>
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
      <CuaSoTuDien tuDien={tuDien} onClose={() => setTuDien(null)} />
    </KhungTrang>
  );
}
