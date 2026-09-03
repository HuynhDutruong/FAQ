'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, ScrollText } from 'lucide-react';
import KhungTrang from '../KhungTrang';
import { CuaSoLyLich, CuaSoAnh, CuaSoTuDien } from '../CuaSo';
import MetaUpdater from '@/components/MetaUpdater';
import {
  BISHOPS_EXTENDED_DATA,
  PASTORS_EXTENDED_DATA,
  PRE1960_ORDINARIES,
  PortraitFrame,
  NON_PASTOR_BIOS,
  TU_DIEN
} from '../duLieu';
import type { DetailedBioRecord, TuDienRecord } from '../duLieu';

export default function Trang() {
  const [lyLich, setLyLich] = useState<DetailedBioRecord | null>(null);
  const [anh, setAnh] = useState<{ src: string; caption: string } | null>(null);
  const [tuDien, setTuDien] = useState<TuDienRecord | null>(null);

  const allBios = [...BISHOPS_EXTENDED_DATA, ...PASTORS_EXTENDED_DATA, ...PRE1960_ORDINARIES, ...NON_PASTOR_BIOS];

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
      tieuDe="Lịch Sử Giáo Phận Mỹ Tho"
      phuDe="Chương II. Chương I dừng lại ở tông sắc năm 1659 của Đức Alexanđê VII; chương này bắt đầu bốn năm sau đó, ở những ngôi mộ khắc thập giá trên một dải gò đất giữa đồng lầy Định Tường — và đi tới ngày một sắc chỉ Rôma đặt tên cho vùng đất ấy."
      duongDan="/gioi-thieu/giao-phan"
    >
      <section id="lich-su-giao-phan" style={{ marginBottom: '36px' }}>

        {/* ── ẢNH NỔI PHẢI: Làng Ba Giồng 1882 ── */}
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
              src: '/images/lichsu_ba_giong_lang_1882_hires.jpg',
              caption: 'Bản khắc gỗ "COCHINCHINE. — Village de Ba-Giong" (Làng Ba Giồng), trang tiêu đề (p.9) cuốn "Un épisode de la Persécution en Cochinchine" của Cha Théodule Hamon, Lyon, 1882. Thấy rõ nhà thờ họ đạo với hai cây thánh giá, nhà dân ven rạch và ghe thuyền trên sông — khung cảnh nguyên vẹn của cộng đoàn đức tin tiên khởi. Khắc bởi Marichal. Nguồn: Gallica (BnF), ark:/12148/bpt6k58346217.'
            })}
          >
            <Image
              src="/images/lichsu_ba_giong_lang_1882_hires.jpg"
              alt="Bản khắc gỗ làng Ba Giồng — Village de Ba-Giong, 1882 — Gallica BnF"
              fill sizes="290px"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', marginTop: '6px', lineHeight: 1.4 }}>
            "Village de Ba-Giong" — khắc gỗ của Marichal,<br />in trong sách Cha Hamon, Lyon, 1882 (p.9).
            <br /><em>Gallica (BnF), ark:/12148/bpt6k58346217.</em>
          </div>
        </div>

        <p className="doc-para">
          Chương trước khép lại ở Rôma, ngày 9 tháng 9 năm 1659, khi Đức Alexanđê VII đặt bút lập hai Phủ Doãn Tông Toà
          cho một xứ sở mà ngài chưa từng thấy. Chương này bắt đầu ở đầu kia của cùng đường dây ấy, và bắt đầu sớm hơn
          người ta tưởng: <strong>chỉ bốn năm sau tông sắc đó</strong>, trên một dải gò đất nổi cao giữa đồng lầy Định
          Tường, đã có những ngôi mộ khắc hình thập giá — niên đại <strong>1663 – 1664</strong>, còn nằm nguyên trong
          khuôn viên Trung tâm Hành hương Ba Giồng hôm nay. Văn kiện của Toà Thánh và những nấm mộ ấy là hai đầu của
          cùng một sợi dây, và phần lớn chương này là chuyện sợi dây đó bị kéo căng đến mức nào.
        </p>

        <p className="doc-para">
          Giáo phận Mỹ Tho ngày nay trải rộng trên vùng đồng bằng sông Cửu Long — tỉnh Tiền Giang, tỉnh Long An và gần hai phần ba tỉnh Đồng Tháp — một lãnh thổ hơn <strong>9.262 km²</strong> với <strong>114 giáo xứ</strong>, gần <strong>181 linh mục</strong> và khoảng <strong>137.000 giáo dân</strong>.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[1]</sup> Nhưng cái vóc dáng ấy không xuất hiện trong một sớm một chiều. Nó được đúc nên từ hơn ba thế kỷ lịch sử — lịch sử của những người lặng lẽ khai phá, của những vị chứng nhân đổ máu, và của những vị mục tử kiên trì xây dựng. Đọc lịch sử Giáo phận Mỹ Tho là đọc lịch sử đức tin của cả một vùng đất.
        </p>

        <figure className="doc-figure doc-figure-left">
          <button
            type="button" className="tntt-thumb-btn"
            onClick={() => moAnh({
              src: '/images/ghvn_map_cochinchina_1650.jpg',
              caption: 'Bản đồ "Carte de la Cochinchine" do Cha Alexandre de Rhodes biên soạn khoảng năm 1650. Đây là một trong những tấm bản đồ phương Tây chi tiết đầu tiên vẽ xứ Đàng Trong, thể hiện sự am hiểu địa lý phục vụ cho công cuộc truyền giáo. Nguồn: Wikimedia Commons, phạm vi công cộng.'
            })}
            aria-label="Phóng to Bản đồ Đàng Trong"
          >
            <Image
              src="/images/ghvn_map_cochinchina_1650.jpg"
              alt="Bản đồ Đàng Trong của Cha Đắc Lộ, khoảng năm 1650"
              width={3024} height={2179}
              sizes="(max-width: 720px) 92vw, 320px"
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </button>
          <figcaption className="doc-caption">
            "Carte de la Cochinchine" do Cha Alexandre de Rhodes biên soạn khoảng năm 1650.
          </figcaption>
        </figure>

        <h3 className="doc-heading" style={{ marginTop: '2.5rem' }}>Những bước chân đầu tiên (1533 – 1659)</h3>

        <p className="doc-para">
          Ánh sáng Tin Mừng không đột ngột xuất hiện vào năm 1659, mà đã trải qua hơn một thế kỷ âm thầm gieo hạt. Dấu vết đầu tiên của Kitô giáo tại Việt Nam được ghi nhận trong chính sử là vào năm <strong>1533</strong>. Sách <em>Khâm Định Việt Sử Thông Giám Cương Mục</em> (Quyển 33) ghi lại chiếu chỉ cấm đạo dưới đời vua Lê Trang Tông: <em>"Tháng 3, năm Nguyên Hòa thứ 1... có người Tây dương tên là <button className="term-link" onClick={() => moTuDien('i-ne-khu')}>I-nê-khu</button> lén lút đến xã Ninh Cường, xã Quần Anh thuộc huyện Nam Chân và xã Trà Lũ thuộc huyện Giao Thủy ngấm ngầm truyền tà giáo..."</em>. "I-nê-khu" chính là cách phiên âm tên Inhaxio (Ignacio) — vị thừa sai vô danh đã để lại dấu chân đầu tiên trên đất Việt.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <figure className="doc-figure" style={{ margin: 0, float: 'none', width: '100%' }}>
            <button
              type="button" className="tntt-thumb-btn"
              onClick={() => moAnh({
                src: '/images/ghvn_cuong_muc_quyen_thu.jpg',
                caption: 'Quyển thủ của Khâm Định Việt Sử Thông Giám Cương Mục, bộ quốc sử do Quốc sử quán triều Nguyễn biên soạn.'
              })}
            >
              <Image src="/images/ghvn_cuong_muc_quyen_thu.jpg" alt="Quyển thủ Cương Mục" width={800} height={635} sizes="(max-width: 720px) 46vw, 320px" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
            </button>
            <figcaption className="doc-caption">Khâm Định Việt Sử Thông Giám Cương Mục.</figcaption>
          </figure>
          
          <figure className="doc-figure" style={{ margin: 0, float: 'none', width: '100%' }}>
            <button
              type="button" className="tntt-thumb-btn"
              onClick={() => moAnh({
                src: '/images/ghvn_cuong_muc_trang_sach.jpg',
                caption: 'Trang sách trong Cương Mục ghi chép về sự kiện năm Nguyên Hòa thứ 1 (1533) — văn bản chữ Hán đầu tiên nhắc đến đạo Công giáo ("tà giáo") và tên "I-nê-khu".'
              })}
            >
              <Image src="/images/ghvn_cuong_muc_trang_sach.jpg" alt="Trang sách Cương Mục năm 1533" width={777} height={506} sizes="(max-width: 720px) 46vw, 320px" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
            </button>
            <figcaption className="doc-caption">Trang mộc bản ghi chép sự kiện năm 1533.</figcaption>
          </figure>
        </div>

        <p className="doc-para">
          Hành trình truyền giáo thực sự mang tính hệ thống bắt đầu vào <strong>đầu thế kỷ XVII</strong>. Năm <strong>1615</strong>, để tránh cuộc bách hại đạo khốc liệt tại Nhật Bản, các thừa sai Dòng Tên (Jesuits) như Francesco Buzomi và Diego Carvalho đã cập bến Cửa Hàn (Đà Nẵng) rồi tiến vào Hội An. Họ nhanh chóng hòa nhập và lập nên cộng đoàn đầu tiên tại Đàng Trong.
        </p>

        <p className="doc-para">
          Nhưng bước ngoặt vĩ đại nhất của lịch sử Giáo hội — và của cả văn hóa Việt Nam — gắn liền với tên tuổi của linh mục <button className="term-link" onClick={() => moTuDien('dac-lo')}>Alexandre de Rhodes (Đắc Lộ)</button>. Đến Đàng Trong năm 1624, ngài cùng các thừa sai khác (Francisco de Pina, Gaspar do Amaral...) đã nghe, học và phiên âm tiếng Việt bằng mẫu tự Latinh. Năm <strong>1651</strong> tại Rôma, ngài xuất bản cuốn <em>Từ điển Việt-Bồ-La (Dictionarium Annamiticum Lusitanum et Latinum)</em>. Công trình này không chỉ là cẩm nang truyền giáo mà còn khai sinh ra <strong>Chữ Quốc Ngữ</strong> — thứ chữ viết giúp người Việt Nam hội nhập thế giới hiện đại.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <figure className="doc-figure" style={{ margin: 0, float: 'none', width: '100%' }}>
            <button
              type="button" className="tntt-thumb-btn"
              onClick={() => moAnh({ src: '/images/ghvn_alexandre_de_rhodes.jpg', caption: 'Chân dung Cha Alexandre de Rhodes (Đắc Lộ, 1591–1660) — người có công lớn trong việc khai sinh Chữ Quốc Ngữ.' })}
            >
              <Image src="/images/ghvn_alexandre_de_rhodes.jpg" alt="Alexandre de Rhodes" width={1126} height={1400} sizes="(max-width: 720px) 30vw, 200px" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
            </button>
            <figcaption className="doc-caption">Cha Alexandre de Rhodes.</figcaption>
          </figure>
          
          <figure className="doc-figure" style={{ margin: 0, float: 'none', width: '100%' }}>
            <button
              type="button" className="tntt-thumb-btn"
              onClick={() => moAnh({ src: '/images/ghvn_dictionarium_1651.jpg', caption: 'Bìa cuốn Từ điển Việt-Bồ-La xuất bản tại Rôma năm 1651. Tài liệu vô giá ấn định hình hài đầu tiên của chữ Quốc Ngữ.' })}
            >
              <Image src="/images/ghvn_dictionarium_1651.jpg" alt="Dictionarium Annamiticum" width={560} height={810} sizes="(max-width: 720px) 30vw, 200px" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
            </button>
            <figcaption className="doc-caption">Từ điển Việt-Bồ-La (1651).</figcaption>
          </figure>

          <figure className="doc-figure" style={{ margin: 0, float: 'none', width: '100%' }}>
            <button
              type="button" className="tntt-thumb-btn"
              onClick={() => moAnh({ src: '/images/ghvn_divers_voyages_1653.jpg', caption: 'Bìa cuốn Hành trình và Truyền giáo (Divers Voyages et Missions) xuất bản năm 1653 tại Paris.' })}
            >
              <Image src="/images/ghvn_divers_voyages_1653.jpg" alt="Divers Voyages 1653" width={781} height={1024} sizes="(max-width: 720px) 30vw, 200px" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
            </button>
            <figcaption className="doc-caption">Hành trình và Truyền giáo (1653).</figcaption>
          </figure>
        </div>

        <p className="doc-para">
          Chính nhờ nền móng vững chắc từ những vị thừa sai tiên khởi, ngày 9 tháng 9 năm <strong>1659</strong>, Giáo hoàng <button className="term-link" onClick={() => moTuDien('alexandre-vii')}>Alexanđê VII</button> đã ban <button className="term-link" onClick={() => moTuDien('super-cathedram-1659')}>sắc chỉ Super Cathedram</button> lập hai Phủ Doãn Tông Tòa <em>Đàng Trong</em> và <em>Đàng Ngoài</em> — cột mốc hành chính đầu tiên của Giáo hội Việt Nam.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[2]</sup> Vùng đất Nam Bộ, khi đó còn hoang vu, bắt đầu đón nhận người Công giáo từ khoảng năm <strong>1700</strong>. Trước áp lực các đợt cấm đạo của chúa Nguyễn tại miền Trung, nhiều gia đình tín hữu từ Phú Yên xuôi thuyền vào Nam, định cư tại những vùng đất mới chưa có dân cư đông đúc. Họ đặt lều ở <button className="term-link" onClick={() => moTuDien('ba-giong')}>Ba Giồng</button> — một dải gò đất nổi cao giữa đồng lầy, thuộc vùng Định Tường.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[3]</sup> Những ngôi mộ cổ có bia khắc hình thập giá còn lưu lại trong khuôn viên Trung tâm Hành hương Ba Giồng hôm nay, có niên đại từ năm <strong>1663–1664</strong>, là bằng chứng sống động cho sự hiện diện Kitô giáo từ buổi khai nguyên.
        </p>

        <p className="doc-para">
          Từ năm <strong>1722</strong>, các thừa sai Phanxicô người Tây Ban Nha từ Philippines bắt đầu coi sóc vùng này. Linh mục <button className="term-link" onClick={() => moTuDien('francisco-garcia')}>Francisco José García (OFM)</button> được ghi nhận là người đầu tiên đặt chân đến Mỹ Tho, Cái Mơn, Cái Nhum và Cái Bè từ năm 1723, tổ chức các cộng đoàn nhỏ, dạy giáo lý và cử hành các bí tích.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[4]</sup> Sang thế kỷ XIX, vai trò ấy dần chuyển sang Hội Thừa Sai Paris — những linh mục triều người Pháp đảm nhận việc đào tạo hàng giáo sĩ bản địa và phát triển hệ thống họ đạo có tổ chức, đặt nền móng cho một giáo phận tương lai. Nhưng trước khi giáo phận ấy ra đời, cộng đoàn đức tin non trẻ phải vượt qua những thử thách khốc liệt nhất trong lịch sử của mình.
        </p>

        <figure className="doc-figure doc-figure-right">
          <button
            type="button" className="tntt-thumb-btn"
            onClick={() => moAnh({
              src: '/images/lichsu_ba_giong_martyre_1882_hires.jpg',
              caption: 'Bản khắc gỗ "COCHINCHINE. — Martyre des chrétiens de Ba-Giong" (Tử đạo của các giáo hữu Ba Giồng), p.19. Cảnh hành hình 25 vị bô lão tại chợ Cổ Chi — "gò Chết Chém" — năm 1862. Quan mandarin ngồi trên cao; lính và dân chúng vây quanh. Khắc bởi Marichal. In trong cuốn sách của Cha Théodule Hamon, Lyon, 1882. Nguồn: Gallica (BnF), ark:/12148/bpt6k58346217.'
            })}
            aria-label="Phóng to bản khắc tử đạo Ba Giồng 1862"
          >
            <Image
              src="/images/lichsu_ba_giong_martyre_1882_hires.jpg"
              alt="Martyre des chrétiens de Ba-Giong, p.19, Hamon 1882"
              width={900} height={700}
              sizes="(max-width: 720px) 92vw, 320px"
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </button>
          <figcaption className="doc-caption">
            Hành hình 25 vị giáo hữu tại chợ Cổ Chi, 1862 — bản khắc gỗ Marichal, sách Cha Hamon, 1882. <em>Gallica (BnF)</em>.
          </figcaption>
        </figure>

        <p className="doc-para">
          Dưới ba triều vua nhà Nguyễn — <button className="term-link" onClick={() => moTuDien('minh-mang')}>Minh Mạng</button> (1820–1840), <button className="term-link" onClick={() => moTuDien('thieu-tri')}>Thiệu Trị</button> (1841–1847) và đặc biệt là <button className="term-link" onClick={() => moTuDien('tu-duc')}>Tự Đức</button> (1848–1883) — hàng trăm linh mục và hàng chục ngàn giáo dân bị tử hình vì đức tin trên khắp đất nước. Năm 1988, Đức Thánh Giáo hoàng Gioan Phaolô II tôn phong <strong>117 Thánh Tử Đạo Việt Nam</strong>, trong đó nhiều vị gắn liền với vùng đất Nam Kỳ.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[5]</sup>
        </p>

        <p className="doc-para">
          Tại vùng Định Tường, Cha <button className="term-link" onClick={() => moLyLich(allBios.find(b => b.id === 'thanh-phero-nguyen-van-luu') || null)}>Phêrô Nguyễn Văn Lựu</button> (1812–1861) là nhân vật trung tâm của thời kỳ bi hùng này. Sinh tại Gò Vấp, Gia Định, ngài theo học tại Chủng viện Pénang (Penang, Malaysia) trước khi thụ phong linh mục và phục vụ lần lượt ở Mặc Bắc, Sa Đéc, Mỹ Tho. Từ năm <strong>1853</strong>, ngài làm cha sở họ đạo Ba Giồng.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[6]</sup> Cuối năm 1860, khi tình hình bách hại trở nên nguy cấp, ngài vẫn kiên trì cải trang vào ngục thăm viếng và trao Mình Thánh Chúa cho các giáo hữu bị giam cầm. Bị phát giác và dẫn ra trước quan án, ngài khảng khái tuyên bố: <em style={{ color: 'var(--color-dark)' }}>«Đạo Thánh đã thấm nhập vào xương tủy tôi rồi, tôi làm sao bỏ được. Vả lại, một người giáo hữu thường, một thầy giảng còn không có quyền bỏ đạo, huống chi tôi đây là đạo trưởng.»</em><sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[7]</sup> Ngày <strong>7 tháng 4 năm 1861</strong>, ngài bị xử trảm tại pháp trường ngoài thành Mỹ Tho. Đức Giáo hoàng Gioan Phaolô II tôn phong ngài <button className="term-link" onClick={() => moTuDien('hien-thanh-tu-dao')}>Hiển Thánh ngày 19/6/1988</button>, và Giáo phận Mỹ Tho sau đó chọn ngài làm <button className="term-link" onClick={() => moLyLich(allBios.find(b => b.id === 'thanh-phero-nguyen-van-luu') || null)}>Thánh Bổn Mạng</button>, mừng lễ ngày 7/4 hàng năm.
        </p>

        <p className="doc-para">
          Cần dừng lại một nhịp ở đây, vì đây là chỗ hai chương của quyển sách này chạm vào nhau. Cha Phêrô Lựu bị chém
          <strong> tháng 4 năm 1861</strong>. <strong>Tháng 5 năm 1861</strong> — chưa đầy một tháng sau — quân Pháp chiếm
          Mỹ Tho, và người Công giáo khắp các tỉnh đồng bằng kéo về tỉnh lỵ ẩn náu. Chính đám người chạy loạn ấy làm nên
          cộng đoàn đầu tiên của họ đạo Mỹ Tho, trong một ngôi chùa bỏ hoang bên chợ. Nói cách khác:{' '}
          <strong>giáo xứ Chánh Toà ra đời từ chính cuộc bách hại đã giết vị Bổn mạng của giáo phận</strong>, cách nhau
          đúng một tháng và mười hai cây số. Câu chuyện ngôi nhà thờ ấy là{' '}
          <Link href="/gioi-thieu/giao-xu" style={{ color: 'var(--color-red)', fontWeight: 700 }}>Chương III</Link>;
          ở đây ta đi tiếp phần của vùng đất.
        </p>

        <p className="doc-para">
          Sau cái chết của Cha Phêrô Lựu, cuộc bách hại không dừng lại. Năm <strong>1862</strong>, <button className="term-link" onClick={() => moTuDien('phan-sap')}>chiếu chỉ Phân Sáp</button> (ban ngày 05/8/1861) được thi hành triệt để: quan quân vây họ đạo Ba Giồng trong đêm, ra lệnh giải tán các làng Công giáo và phân tán giáo dân vào các làng ngoại đạo. Một phần giáo hữu tháo chạy qua sông trong đêm khuya — cảnh tượng đó được ghi lại trong bản khắc gỗ <em>«Fuite des chrétiens de Ba-Giong»</em> của Cha Hamon: hàng trăm người lội giữa dòng nước tối, trên bờ vẫn còn thấy bóng thánh giá nhà thờ dưới trăng non. Nhưng phần lớn không thoát kịp. <strong>25 vị bô lão</strong> — chức việc cao niên của họ đạo — bị bắt và dẫn về chợ Cổ Chi, một địa điểm mà dân gian gọi là «gò Chết Chém», cách Ba Giồng khoảng 2 km. Trước lưỡi gươm hành quyết, các ngài đồng loạt khẳng định đức tin, kiên quyết không chối đạo.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[8]</sup> Thêm hai người chết khi trốn chạy — nâng tổng số lên <strong>27 vị tử đạo</strong> mà Cha <button className="term-link" onClick={() => moTuDien('theodule-hamon')}>Théodule Hamon</button> đã ghi chép lại mười năm sau, khi thân thức đến Ba Giồng để chủ trì lễ cải táng hài cốt các ngài.
        </p>

        <div className="doc-box">
          <div className="doc-box-title">Nguồn tư liệu gốc — Cha Théodule Hamon, MEP (1845–1911)</div>
          <p className="doc-box-text">
            Bài tường thuật đầy đủ nhất về cuộc tử đạo Ba Giồng do Cha <strong>Théodule Hamon</strong> (MEP) viết — người từng coi sóc họ đạo Mỹ Tho trước khi đến Ba Giồng. Theo lệnh Đức Cha Miche, ngày <strong>18/6/1872</strong> ông chủ trì việc cải táng hài cốt 25 vị giáo dân về Đất Thánh Ba Giồng. Mười năm sau, ông xuất bản thành sách: <em>«Un épisode de la Persécution en Cochinchine — Martyre de vingt-sept Chrétiens»</em>, Imprimerie de Pitrat Ainé, Lyon, 1882. Bản số hóa lưu tại Gallica (BnF), ark:/12148/bpt6k58346217.
          </p>
        </div>

        <div className="tntt-gallery" style={{ marginBottom: '8px' }}>
          {[
            {
              src: '/images/lichsu_ba_giong_lang_1882_hires.jpg',
              cap: 'Bản khắc gỗ "COCHINCHINE. — Village de Ba-Giong" (Làng Ba Giồng). Nhà thờ họ đạo với hai cây thánh giá, nhà dân ven rạch và ghe thuyền trên sông. Khắc bởi Marichal, Hamon, Lyon, 1882, p.9. Nguồn: Gallica (BnF), ark:/12148/bpt6k58346217.',
              label: 'Làng Ba Giồng · p.9 · Hamon 1882'
            },
            {
              src: '/images/lichsu_hoa_trai_bia_sach_1882.jpg',
              cap: 'Trang bìa cuốn "Un épisode de la Persécution en Cochinchine — Martyre de vingt-sept Chrétiens", Imprimerie de Pitrat Ainé, Lyon, 1882. Nguồn: Gallica (BnF), ark:/12148/bpt6k58346217.',
              label: 'Bìa sách · Hamon 1882'
            },
            {
              src: '/images/lichsu_ba_giong_fuite_1882_hires.jpg',
              cap: 'Bản khắc gỗ "COCHINCHINE. — Fuite des chrétiens de Ba-Giong" (Giáo hữu Ba Giồng tháo chạy), p.13. Đêm khuya, hàng trăm giáo dân lội qua sông trong bóng tối, ánh trăng non le lói. Phía sau vẫn thấy bóng nhà thờ với hai cây thánh giá. Khắc bởi Marichal. Gallica (BnF), ark:/12148/bpt6k58346217.',
              label: 'Giáo hữu tháo chạy · p.13 · Hamon 1882'
            },
            {
              src: '/images/lichsu_ba_giong_martyre_1882_hires.jpg',
              cap: 'Bản khắc gỗ "COCHINCHINE. — Martyre des chrétiens de Ba-Giong", p.19. Cảnh hành quyết 25 vị bô lão tại chợ Cổ Chi — "gò Chết Chém" — năm 1862. Quan mandarin ngồi trên cao; hàng trăm dân chúng và quân binh vây quanh. Khắc bởi Marichal. Gallica (BnF), ark:/12148/bpt6k58346217.',
              label: 'Tử đạo tại gò Chết Chém · p.19 · Hamon 1882'
            },
            {
              src: '/images/lichsu_lmc_ba_giong_martyre_1882.jpg',
              cap: 'Bản khắc gỗ "COCHINCHINE. — Martyre des chrétiens de Ba-Giong" in trong tạp chí Les Missions Catholiques, số ra tháng 4/1882, trang 187 — bản khắc thứ hai về biến cố Ba Giồng, phổ biến đến độc giả châu Âu qua báo chí thừa sai. Nguồn: Gallica (BnF), ark:/12148/bpt6k105622v.',
              label: 'Tử đạo Ba Giồng · Les Missions Catholiques 1882, tr.187'
            },
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
              <figcaption className="tntt-caption"><strong>{img.label}</strong><br />{img.cap.substring(0, 75)}…</figcaption>
            </figure>
          ))}
        </div>
        <p style={{ fontSize: '0.78rem', fontStyle: 'italic', color: 'var(--color-subtle)', margin: '0 0 28px', lineHeight: 1.6 }}>
          Năm bản khắc gỗ lịch sử: bốn bản in trong sách Cha Théodule Hamon, Lyon, 1882 (khắc bởi Marichal), một bản in trong <em>Les Missions Catholiques</em>, tháng 4/1882 — đều số hóa tại <em>Gallica (BnF)</em>. Sử dụng theo chính sách domaine public (PD-old-70).
        </p>

        <p className="doc-para">
          Máu của các vị tử đạo không chảy vô ích. Kể từ Sắc lệnh <em>Super Cathedram</em> năm <strong>1659</strong>, toàn bộ miền Nam nước Việt thuộc về <strong>Hạt Đại diện Tông tòa Đàng Trong</strong>. Đến năm <strong>1844</strong>, do nhu cầu mục vụ và hoàn cảnh cấm cách, <button className="term-link" onClick={() => moTuDien('chia-dang-trong-1844')}>Đàng Trong được chia cắt</button>, và Mỹ Tho rơi vào quyền cai quản của <strong>Tây Đàng Trong</strong> (về sau gọi là Sài Gòn). Các vị Đại diện Tông tòa — từ những đấng tiên khởi cai quản toàn Đàng Trong cho đến các Giám mục Tây Đàng Trong sau này — đã liên tục dẫn dắt đời sống đức tin của cộng đoàn vượt qua ba thế kỷ bách hại, chiến tranh và chuyển mình. <em>Nhấn vào từng vị để xem lý lịch đầy đủ.</em>
        </p>

        <div style={{ display: 'grid', gap: '10px', marginBottom: '8px' }}>
          {PRE1960_ORDINARIES.map((b, idx) => (
            <button
              key={b.id} type="button"
              onClick={() => moLyLich(b)}
              aria-label={`Xem lý lịch ${b.name}`}
              style={{
                display: 'flex', gap: '12px', alignItems: 'flex-start',
                padding: '12px', borderRadius: '10px',
                border: '1px solid var(--color-border-subtle)',
                backgroundColor: 'var(--color-card-bg)',
                textAlign: 'left', cursor: 'pointer', width: '100%',
                font: 'inherit', color: 'inherit'
              }}
            >
              <PortraitFrame src={b.image} name={b.name} width={72} height={96} />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--color-red)' }}>
                  {idx + 1}. {b.name}
                  {b.saintName.startsWith('Cố') && (
                    <span style={{ color: 'var(--color-subtle)', fontWeight: 600 }}> ({b.saintName})</span>
                  )}
                </div>
                <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--color-dark)', margin: '2px 0 4px' }}>{b.role}</div>
                <p style={{ margin: 0, fontSize: '0.8rem', lineHeight: 1.55, color: 'var(--color-subtle)', textAlign: 'justify' }}>{b.shortDesc}</p>
                <div style={{ marginTop: '5px', fontSize: '0.74rem', fontWeight: 700, color: 'var(--color-red)' }}>Nhấn để xem lý lịch →</div>
              </div>
            </button>
          ))}
        </div>
        <p style={{ fontSize: '0.78rem', fontStyle: 'italic', color: 'var(--color-subtle)', margin: '0 0 28px', lineHeight: 1.6 }}>
          Chân dung các vị Miche, Colombert, Dépierre, Mossard, Quinton và Cassaigne lấy từ văn khố Hội Thừa Sai Paris (IRFA). Chân dung Đức cha Lefebvre, Dumortier và Simon Hòa Nguyễn Văn Hiền do Giáo xứ cung cấp.
        </p>

        <p className="doc-para">
          Hành trình dài hơn một thế kỷ ấy kết thúc vào một buổi chiều tháng 11 lịch sử. Ngày <strong>24 tháng 11 năm 1960</strong>, Thánh Giáo hoàng <strong>Gioan XXIII</strong> ban hành <button className="term-link" onClick={() => moTuDien('venerabilium-nostrorum-1960')}>Tông hiến «Venerabilium Nostrorum»</button>, chính thức thiết lập Hàng Giáo Phẩm Công Giáo Việt Nam. Địa phận Tây Đàng Trong — lúc này mang tên Sài Gòn — được nâng lên hàng Tổng Giáo phận, và cùng văn kiện ấy, ngày <strong>27 tháng 11</strong>, Tòa Thánh ban hành <button className="term-link" onClick={() => moTuDien('quod-venerabiles-fratres-1960')}>Sắc chỉ «Quod Venerabiles Fratres»</button>: <strong>bốn tỉnh Định Tường, Long An, Kiến Tường và Kiến Phong</strong> được tách ra để lập thành <strong>Giáo phận Mỹ Tho</strong> (<em>Dioecesis Mythoensis</em>), thuộc Giáo tỉnh Sài Gòn.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[9]</sup>
        </p>

        <figure className="doc-figure doc-figure-right">
          <button
            type="button" className="tntt-thumb-btn"
            onClick={() => moAnh({
              src: '/images/lichsu_sac_chi_mytho_1960.jpg',
              caption: 'Ảnh chụp trang 474, Acta Apostolicae Sedis, tập 53 (1961). Tiêu đề: "SAIGONENSIS – KONTUMENSIS (MYTHOÊNSIS – DALATENSIS)". Dòng tóm tắt Latinh: "Diviso territorio archidioecesium Saigonensis et Kontumensis, novae conduntur dioeceses Mythoënsis et Dalatensis appellandae" — Chia lãnh thổ hai tổng giáo phận Sài Gòn và Kontum, lập các giáo phận mới Mỹ Tho và Đà Lạt. Ký tại Rôma, ngày 27/11/1960.'
            })}
            aria-label="Phóng to sắc chỉ khai sinh Giáo phận Mỹ Tho"
          >
            <Image
              src="/images/lichsu_sac_chi_mytho_1960.jpg"
              alt="Sắc chỉ Quod Venerabiles Fratres, AAS 53 (1961), tr.474"
              width={1000} height={608}
              sizes="(max-width: 720px) 92vw, 320px"
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </button>
          <figcaption className="doc-caption">
            Sắc chỉ <em>Quod Venerabiles Fratres</em> khai sinh Giáo phận Mỹ Tho — <em>Acta Apostolicae Sedis</em>, tập 53 (1961), tr. 474.
          </figcaption>
        </figure>

        <p className="doc-para">
          Cùng lúc đó, ngôi thánh đường do Cha <button className="term-link" onClick={() => moLyLich(allBios.find(b => b.id === 'cha-regnier-co-gam') || null)}>Lucien Régnier</button> — mà giáo dân quen gọi thân thương là <em>Cha Gẫm</em> — khởi công ngày 11/8/1906 và hoàn thành năm 1910, được nâng lên thành <strong>Nhà thờ Chính Tòa</strong>, mang tước hiệu <strong>Đức Mẹ Vô Nhiễm Nguyên Tội</strong>. Kiến trúc Hy Lạp–Rôma Phục Hưng, cao 24 m, dài 53 m, rộng 17 m — ngôi thánh đường từng phải hạ thấp chiều cao so với thiết kế ban đầu vì nền đất sình lầy — nay trở thành <em>nhà thờ mẹ</em> của cả một giáo phận.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[10]</sup> Vị Giám mục Tiên khởi được bổ nhiệm là <button className="term-link" onClick={() => moLyLich(allBios.find(b => b.id === 'duc-cha-tran-van-thien') || null)}>Đức Cha Giuse Trần Văn Thiện</button>.
        </p>

        <p className="doc-para">
          Từ ngày khai sinh đến nay, Giáo phận Mỹ Tho đã trải qua <strong>5 đời Giám mục</strong>, mỗi vị để lại dấu ấn riêng trên vùng đất này. <em>Nhấp vào từng vị để xem toàn văn tiểu sử, chức vụ và công trình.</em>
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          {BISHOPS_EXTENDED_DATA.map((b) => (
            <div
              key={b.id}
              onClick={() => moLyLich(b)}
              style={{
                display: 'flex', gap: '16px', padding: '14px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-card-bg)',
                border: '1px solid var(--color-border-subtle)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
                alignItems: 'center', cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              className="bishop-card-hover"
            >
              <PortraitFrame src={b.image} name={b.name} width={85} height={110} />
              <div style={{ flex: '1 1 220px', minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: 'var(--color-dark)' }}>{b.name}</h4>
                  <span style={{
                    fontSize: '0.72rem', fontWeight: 800,
                    backgroundColor: 'rgba(153, 27, 27, 0.08)', color: 'var(--color-red)',
                    padding: '2px 10px', borderRadius: '20px',
                    border: '1px solid rgba(153, 27, 27, 0.15)'
                  }}>{b.period}</span>
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-red)', margin: '3px 0 4px' }}>{b.role}</div>
                <div style={{ fontSize: '0.78rem', fontStyle: 'italic', color: 'var(--color-subtle)', marginBottom: '5px' }}>
                  Khẩu hiệu: <strong style={{ color: 'var(--color-dark)' }}>{b.motto}</strong>
                </div>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-subtle)', lineHeight: 1.5, textAlign: 'justify' }}>{b.shortDesc}</p>
                <div style={{ marginTop: '7px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-red)' }}>
                  <Eye size={12} /><span>Xem toàn văn tiểu sử &amp; quá trình phục vụ ➔</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="tntt-gallery" style={{ marginBottom: '8px' }}>
          {[
            {
              src: '/images/gpmt_linh_muc_doan_1961.jpg',
              cap: 'Linh mục đoàn Giáo phận Mỹ Tho năm 1961, một năm sau ngày giáo phận được thành lập. Ảnh mang chú thích gốc "DIOCESE DE MYTHO 1961" với tên từng vị ghi trên ảnh, trong đó có Đức Cha Thiện cùng Cha Niềm — vị sẽ làm Chánh sở Chánh Tòa từ năm 1965.'
            },
            {
              src: '/images/gpmt_giam_muc_kinh_ly.jpg',
              cap: 'Đức Cha Giuse Trần Văn Thiện — Giám mục Tiên khởi Giáo phận Mỹ Tho — đi thăm mục vụ giáo dân tại một họ đạo miền quê, có linh mục tháp tùng và cờ phướn giăng đón. Danh tính do Giáo xứ Chánh Tòa xác nhận.'
            },
            {
              src: '/images/gpmt_tan_gm_nguyen_van_nam_1975.jpg',
              cap: 'Đức Cha Anrê Nguyễn Văn Nam trong năm được tấn phong Giám mục Phó Giáo phận Mỹ Tho (10/06/1975). Ảnh mang chú thích gốc viết tay "Tân GM. Andre Nam 1975".'
            },
            {
              src: '/images/linh_muc_doan_my_tho.jpg',
              cap: 'Linh mục đoàn Giáo phận Mỹ Tho cùng Đức Giám mục trong Thánh lễ Truyền Dầu — nghi lễ đặc trưng đầu Tuần Thánh quy tụ toàn thể linh mục đoàn.'
            },
          ].map((img) => (
            <figure key={img.src} className="tntt-figure">
              <button
                type="button" className="tntt-thumb-btn"
                onClick={() => moAnh({ src: img.src, caption: img.cap })}
                aria-label={`Phóng to: ${img.cap.substring(0, 40)}...`}
              >
                <Image src={img.src} alt={img.cap} width={640} height={480} sizes="(max-width: 520px) 46vw, 220px" className="tntt-photo" />
                <span className="tntt-zoom" aria-hidden="true"><Eye size={13} /> Xem</span>
              </button>
              <figcaption className="tntt-caption">{img.cap}</figcaption>
            </figure>
          ))}
        </div>
        <p style={{ fontSize: '0.78rem', fontStyle: 'italic', color: 'var(--color-subtle)', margin: '0 0 28px', lineHeight: 1.6 }}>
          Ảnh tư liệu do Giáo xứ Chánh Tòa Mỹ Tho cung cấp. Chú thích niên đại theo ghi chú gốc trên ảnh.
        </p>

        <p className="doc-para">
          Sau hơn sáu mươi năm phát triển, Giáo phận Mỹ Tho hôm nay là một cộng đồng đức tin trưởng thành và sống động. Địa giới bao gồm tỉnh <strong>Tiền Giang</strong>, tỉnh <strong>Long An</strong> và khoảng <strong>2/3 tỉnh Đồng Tháp</strong> (phần phía bắc sông Tiền), tổng diện tích hơn <strong>9.262 km²</strong>.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[11]</sup> Đức Giám mục Chính tòa hiện nay là <button className="term-link" onClick={() => moLyLich(allBios.find(b => b.id === 'duc-cha-nguyen-van-kham') || null)}>Đức Cha Phêrô Nguyễn Văn Khảm</button> (sinh 02/10/1952), được Đức Thánh Cha Phanxicô bổ nhiệm ngày 26/7/2014. Tiến sĩ Thần học Mục vụ tại Đại học Công giáo Hoa Kỳ (2001–2004), ngài còn là Tổng Thư ký Hội đồng Giám mục Việt Nam (2016–2022) và Viện trưởng Học viện Công giáo Việt Nam (từ 2024).<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[12]</sup>
        </p>

        <p className="doc-para">
          Còn một mối nối nữa cần nói cho trọn, vì nó chạy suốt cả bốn chương. Ngày <strong>19 tháng 6 năm 1988</strong>,
          tại Rôma, Đức Gioan Phaolô II tôn phong <strong>117 Thánh Tử Đạo Việt Nam</strong> — sự kiện đã kể ở{' '}
          <Link href="/gioi-thieu/giao-hoi" style={{ color: 'var(--color-red)', fontWeight: 700 }}>Chương I</Link>{' '}
          như một cột mốc của Giáo hội hoàn vũ. Trong danh sách ấy có <strong>Cha Phêrô Nguyễn Văn Lựu</strong>, vị linh
          mục bị chém ngoài thành Mỹ Tho năm 1861, và Giáo phận Mỹ Tho đã chọn ngài làm <strong>Bổn mạng</strong>. Mười
          bảy năm sau nữa, khi đoàn thiếu nhi của Nhà thờ Chánh Toà được tái lập vào mùa thu 2005, các em lấy chính danh
          hiệu chung của các ngài làm tên mình: <strong>Xứ Đoàn Các Thánh Tử Đạo Việt Nam</strong> —{' '}
          <Link href="/gioi-thieu/xu-doan" style={{ color: 'var(--color-red)', fontWeight: 700 }}>Chương IV</Link>. Một
          bản án tử hình năm 1861, một lễ tôn phong năm 1988, và một chiếc khăn quàng năm 2005 là ba điểm trên cùng một
          đường thẳng.
        </p>

        <p className="doc-para">
          Ngày <strong>26/6/2026</strong>, Giáo phận long trọng cử hành Thánh lễ tạ ơn cung hiến Thánh đường mới tại <strong>Trung tâm Hành hương Ba Giồng</strong> — hoàn thành sau hơn ba mươi năm chuẩn bị. Ba Giồng được Đức Cha Phaolô Bùi Văn Đọc chọn làm Trung tâm Hành hương của Giáo phận từ ngày 21/11/2004, nay trở thành địa điểm hành hương trọng điểm của cả Giáo tỉnh Sài Gòn. Nơi đây, những ngôi mộ cổ từ thế kỷ XVII và di cốt của các vị tử đạo Ba Giồng vẫn được bảo tồn — sợi chỉ đỏ nối liền quá khứ đức tin với hiện tại sứ vụ của một Giáo phận đang lớn lên từng ngày.<sup style={{ color: 'var(--color-red)', fontSize: '0.72rem' }}>[13]</sup>
        </p>

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
            <li>[1] Annuario Pontificio 2023; báo cáo mục vụ Giáo phận Mỹ Tho 2023–2024; giaophanmytho.net.</li>
            <li>[2] Bulla <em>Super Cathedram</em> của Giáo hoàng Alexander VII, 9/9/1659; Đỗ Quang Chính SJ, <em>Dòng Tên Trong Xã Hội Đại Việt</em> (2008), tr. 45.</li>
            <li>[3] Legiomariaevn.com — <em>Lịch sử họ đạo Ba Giồng</em> (truy cập 08/2026); ngôi mộ cổ 1663–1664, Trung tâm Hành hương Ba Giồng, Tân Lý Đông, Châu Thành, Tiền Giang.</li>
            <li>[4] Báo cáo thừa sai Dòng Phanxicô (OFM), IRFA; hdgmvietnam.com — <em>Lịch sử Giáo phận Mỹ Tho</em> (truy cập 08/2026).</li>
            <li>[5] Tông hiến <em>Romani Pontifices</em>, Gioan Phaolô II, 19/6/1988; Hội đồng Giám mục Việt Nam, <em>Hạnh các Thánh Tử Đạo Việt Nam</em>.</li>
            <li>[6] Wikipedia VI — <em>Phêrô Nguyễn Văn Lựu</em> (vi.wikipedia.org, cập nhật 2026); gphaiphong.org — <em>Tiểu sử Thánh Phêrô Nguyễn Văn Lựu</em>.</li>
            <li>[7] T. Hamon (MEP), <em>Un épisode de la Persécution en Cochinchine — Martyre de vingt-sept Chrétiens</em>, Pitrat Ainé, Lyon, 1882, tr. 8.</li>
            <li>[8] Ibid., tr. 18–28; vietcatholic.net — <em>27 vị tử đạo Ba Giồng</em> (truy cập 08/2026).</li>
            <li>[9] Tông hiến <em>Venerabilium Nostrorum</em>, Gioan XXIII, 24/11/1960; <em>Acta Apostolicae Sedis</em> 53 (1961), tr. 346–348; Sắc chỉ <em>Quod Venerabiles Fratres</em>, 27/11/1960, AAS 53 (1961), tr. 474.</li>
            <li>[10] Wikipedia VI — <em>Nhà thờ Chính Tòa Mỹ Tho</em>; nhathoconggiaovietnam.com (truy cập 08/2026).</li>
            <li>[11] Catholic-hierarchy.org — <em>Diocese of My Tho</em>; tnttgioitremytho.com (truy cập 08/2026).</li>
            <li>[12] hdgmvietnam.com — <em>Tiểu sử Đức Cha Phêrô Nguyễn Văn Khảm</em>; giaophanmytho.net (truy cập 08/2026).</li>
            <li>[13] Quyết định Đức Cha Phaolô Bùi Văn Đọc, 21/11/2004; giaophanmytho.net — <em>Thánh lễ cung hiến Thánh đường Ba Giồng</em>, 26/6/2026.</li>
          </ol>
        </div>

      </section>

        <section id="phu-luc" style={{ marginBottom: '36px' }}>
          <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--color-dark)', margin: '32px 0 6px' }}>
            Phụ Lục: Tiểu sử các Linh mục và Thừa sai liên đới
          </div>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.75, margin: '0 0 14px' }}>
            Thông tin chi tiết về các vị linh mục đã góp phần đặt nền móng đức tin cho Giáo phận trong thời kỳ sơ khai nhưng không giữ cương vị Giám mục hay Đại diện Tông tòa. 
            Để xem danh sách các đời Cha sở của Nhà thờ Chánh Tòa Mỹ Tho, xin vui lòng xem tại trang <Link href="/gioi-thieu/giao-xu#lich-su" style={{ color: 'var(--color-red)', textDecoration: 'underline' }}>Giáo Xứ Chánh Tòa</Link>.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px',
              marginTop: '16px'
            }}
          >
            {NON_PASTOR_BIOS.map((bio) => (
              <div
                key={bio.id}
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '12px',
                  padding: '16px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  cursor: 'pointer'
                }}
                onClick={() => moLyLich(bio)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    moLyLich(bio);
                  }
                }}
                aria-label={`Xem lý lịch ${bio.name}`}
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ flexShrink: 0, width: '60px', height: '60px' }}>
                    <PortraitFrame src={bio.image} name={bio.name} width={60} height={60} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, color: 'var(--color-dark)', fontSize: '0.95rem' }}>{bio.name}</div>
                    <div style={{ color: 'var(--color-red)', fontSize: '0.8rem', fontWeight: 600 }}>{bio.role}</div>
                  </div>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-subtle)', lineHeight: 1.6 }}>
                  {bio.shortDesc}
                </div>
              </div>
            ))}
          </div>
        </section>
      <MetaUpdater
        title={lyLich ? `${lyLich.name} — ${lyLich.role}` : undefined}
        description={lyLich ? lyLich.shortDesc : undefined}
        image={lyLich?.image ? `https://chanhtoa.tnttgiaophanmytho.online${lyLich.image}` : undefined}
        url={`https://chanhtoa.tnttgiaophanmytho.online/gioi-thieu/giao-phan?bio=${lyLich?.id}`}
      />
      <CuaSoLyLich bio={lyLich} onClose={() => setLyLich(null)} />
      <CuaSoAnh anh={anh} onClose={() => setAnh(null)} />
      <CuaSoTuDien tuDien={tuDien} onClose={() => setTuDien(null)} />
    </KhungTrang>
  );
}
