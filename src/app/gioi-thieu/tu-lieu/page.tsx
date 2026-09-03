'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import KhungTrang from '../KhungTrang';
import { CuaSoAnh } from '../CuaSo';

export default function Trang() {
  const [anh, setAnh] = useState<{ src: string; caption: string } | null>(null);

  return (
    <KhungTrang
      tieuDe="Tư Liệu Tham Khảo"
      phuDe="Toàn bộ nguồn của bản khảo cứu, kèm mã hồ sơ lưu trữ để người đọc tự mở lại đúng trang gốc — và cả những nơi đã tìm mà không thấy."
      duongDan="/gioi-thieu/tu-lieu"
    >
        <section id="tai-lieu" style={{ marginTop: '40px', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '20px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-dark)', margin: '0 0 10px' }}>
            Chú thích &amp; Tài liệu tham khảo
          </h3>

          <p style={{ fontSize: '0.8rem', color: 'var(--color-subtle)', lineHeight: 1.7, margin: '0 0 6px' }}>
            Trang này là một bản khảo cứu. Mỗi mốc lịch sử đều dẫn về nguồn dưới đây, kèm mã tra cứu để người đọc tự mở
            lại đúng trang gốc. Chỗ nào các nguồn mâu thuẫn nhau thì ghi rõ là mâu thuẫn; chỗ nào chưa tra được thì ghi{' '}
            <em>chưa cập nhật</em> thay vì suy đoán. Phần <strong>D</strong> liệt kê cả những nơi đã tìm mà{' '}
            <strong>không</strong> thấy — để người sau khỏi mất công tìm lại.
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-subtle)', lineHeight: 1.7, margin: '0 0 14px', fontStyle: 'italic' }}>
            Đợt khảo cứu tháng 8/2026 đã đọc: 3.089 hồ sơ thừa sai của Hội Thừa Sai Paris, 145 bản báo cáo thường niên
            địa phận Tây Đàng Trong (1872 – 1923), 62 tập tuần báo Les Missions Catholiques (1868 – 1940) và một album
            201 bưu ảnh Nam Kỳ.
          </p>

          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-red)', margin: '16px 0 6px' }}>
            A. Văn khố Hội Thừa Sai Paris (MEP) — Viện Nghiên cứu Pháp&nbsp;–&nbsp;Á (IRFA), Paris
          </h4>
          <ol style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', lineHeight: 1.75, paddingLeft: '20px', margin: 0 }}>
            <li>
              <strong>Notice tiểu sử từng thừa sai</strong> — <em>irfa.paris/missionnaire/&lt;mã&gt;</em>. Các vị coi sóc
              họ đạo: Guillou <strong>0682</strong>, Marc-Dassa <strong>0657</strong>, Lizé <strong>0792</strong>, Sorel{' '}
              <strong>0869</strong>, Moulins <strong>1056</strong>, Renier <strong>1502</strong>, Bar{' '}
              <strong>2241</strong>. Các vị khác từng phục vụ trong địa hạt: Gagelin 0342, Barou 0738, Gernot 0794,
              Hamon 1002, Leprince 1009, Moreau 1012, Hirbec 1061, Piault 1078, Faron 1189, Launay 1325, Guillot 1686,
              Thévenin 1761, Benoit 1844, Quinton 1880, Hay Ernest 1987, Hay Henri 2126, Villeneuve 2520, Piquet 3141,
              Detry 3246, Seminel 3365. Các Đức Giám mục: Miche 0423, Colombert 0830, Mossard 1299.
            </li>
            <li>
              <strong>Rapports annuels de la Mission de la Cochinchine occidentale</strong>, 1872 – 1923, 145 bản dạng
              PDF trên irfa.paris. Trích dẫn then chốt, báo cáo <strong>1897</strong>: &ldquo;My-tho est le chef-lieu
              d&rsquo;un district qui compte près de 4.000 fidèles, 19 chrétientés, avec 8 prêtres pour les
              desservir.&rdquo; Số người lớn rửa tội tại địa hạt Mỹ Tho: 206 (1885), 403 (1889), 402 (1891), 243 (1892),
              214 (1893). Báo cáo <strong>1904</strong> ghi trận bão: &ldquo;Le typhon a causé, à Mytho et dans tous les
              villages de la contrée, des pertes considérables.&rdquo;
            </li>
            <li>
              <strong>Kho ảnh chân dung thừa sai</strong> — <em>irfa.paris/wp-content/uploads/2021/12/&lt;mã&gt;.jpg</em>.
              Đã kiểm từng mã: <strong>có ảnh</strong> Sorel 0869, Moulins 1056, Renier 1502, Bar 2241;{' '}
              <strong>không có ảnh</strong> Guillou 0682, Lizé 0792, Marc-Dassa 0657 (trang notice hiện
              empty_thumbnail.jpg, mọi biến thể tên tệp đều trả về 404).
            </li>
          </ol>

          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-red)', margin: '16px 0 6px' }}>
            B. Tuần báo <em>Les Missions Catholiques</em> — Thư viện Quốc gia Pháp (Gallica/BNF)
          </h4>
          <ol start={4} style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', lineHeight: 1.75, paddingLeft: '20px', margin: 0 }}>
            <li>
              Le Mée (thừa sai MEP), <strong>&ldquo;Variétés: Mytho, Cochinchine occidentale&rdquo;</strong>,{' '}
              <em>Les Missions Catholiques</em>, năm 1877, <strong>tr.598</strong>, kèm bản khắc mặt tiền nhà thờ ở{' '}
              <strong>tr.595</strong> — Gallica <em>ark:/12148/bpt6k105617d</em> (ảnh f598 và f601). Nguồn của: ngày quân
              Pháp chiếm Mỹ Tho 12/4/1861; câu &ldquo;trước 1861 không thấy một Kitô hữu nào ở Mỹ Tho&rdquo;; họ đạo
              1.500 – 2.000 người; Đức cha Miche đặt viên đá 1866; Cha Marc dâng lễ trong nhà nguyện lợp lá; Cha Sorel
              cầm bay xây; Cha Moulins làm thợ chạm ba năm; Đức cha Colombert làm phép 12/03/1876; kích thước nhà thờ
              42 × 18 × 36 m, 32 cột Corinthiên cao 8 m, vữa stuc do thợ Hoa đắp, 16 cửa kính màu; nhân sự năm 1877:
              4 Sư huynh Lasan dạy 150 học sinh, 5 Nữ tu Thánh Phaolô coi trường nữ và cô nhi viện 70 – 75 em, 4 nữ tu
              khác ở bệnh viện bản xứ 40 – 45 bệnh nhân, 3 nữ tu ở quân y viện trong thành.
            </li>
            <li>
              Hamon (thừa sai MEP), <strong>&ldquo;Un épisode de la persécution en Cochinchine — Martyre de 27
              chrétiens&rdquo;</strong>, <em>Les Missions Catholiques</em> số <strong>670</strong>, ngày{' '}
              <strong>07/04/1882</strong>, tr.157, 160 – 161, 174 và 188, kèm bản khắc làng Ba Giồng — Gallica{' '}
              <em>ark:/12148/bpt6k105622v</em> (ảnh f163, f166, f167, f180, f194). Nguồn của: 16 vị chức việc Ba Giồng
              chịu tra tấn ba lần; hai vị Thađêô Nam và Inhaxiô Thịnh; cuộc tử đạo và nơi an nghỉ của Cha Phêrô Nguyễn
              Văn Lựu; việc quan quân phóng hoả nhà ngục trước khi rút; giáo dân Ba Giồng lánh về Mỹ Tho dưới cờ Pháp;
              mười tám tháng lưu lạc và chỉ còn 500 người trở về.
            </li>
            <li>
              Bản in thành sách riêng của bài trên: <em>Un épisode de la Persécution en Cochinchine — Martyre de
              vingt-sept Chrétiens</em>, Nhà in Pitrat Ainé, Lyon, 1882 (dấu nộp lưu chiểu Rhône số 317) — Gallica{' '}
              <em>ark:/12148/bpt6k58346217</em>.
            </li>
            <li>
              Tường thuật trận bão năm 1904 tại Mỹ Tho — <em>Les Missions Catholiques</em> 1904, Gallica{' '}
              <em>ark:/12148/bpt6k1056449</em> (ảnh f290 – f291).
            </li>
          </ol>

          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-red)', margin: '16px 0 6px' }}>
            C. Nguồn Giáo hội Việt Nam
          </h4>
          <ol start={8} style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', lineHeight: 1.75, paddingLeft: '20px', margin: 0 }}>
            <li>
              Ban Truyền Thông Giáo Phận Mỹ Tho, <strong>&ldquo;Các Gx: Chánh Tòa, Nữ Vương Hòa Bình, Chợ Cũ, Bình Tạo,
              An Đức, Giáo họ Thới Sơn&rdquo;</strong> — giaophanmytho.net. Nguồn của: hơn 80 linh mục 1866 – 1960 trong
              đó khoảng 30 vị thừa sai; ba lần xây dựng nhà thờ; cộng đoàn 1881 – 1882 có 3.651 người gồm 330 người Âu
              châu và 3.321 người Việt; phạm vi &ldquo;vùng Mỹ Tho&rdquo; gồm Mỹ Tho, Bình Tạo, Điều Hoà, Vĩnh Tường,
              Thạnh Trị, Mỹ Chánh, Kinh Điều, Bình Đại; đợt trùng tu 2006 nới rộng hai bên hông mỗi bên 4 mét.
            </li>
            <li>
              <strong>&ldquo;Dấu ấn họ đạo Chánh tòa Mỹ Tho theo dòng lịch sử&rdquo;</strong>,{' '}
              <em>Báo Công giáo và Dân tộc</em> (cgvdt.vn) — dẫn <strong>bản báo cáo viết tay của Cha Renier hiện lưu
              trữ tại Tòa Tổng Giám mục TGP. TP.HCM</strong>: &ldquo;Trước năm 1861 chưa có cộng đoàn Công giáo Mỹ Tho.
              Chỉ có những người Công giáo bị lính An Nam giam giữ trong đồn… Đến ngày 28.1.1862, họ đạo Mỹ Tho có 1986
              giáo dân.&rdquo; Cũng là nguồn của: các Nữ tu Thánh Phaolô đến năm 1864 với bề trên đầu tiên là dì
              Liziong; Sư huynh Lasan đến năm 1868.
            </li>
            <li>
              Giáo phận Mỹ Tho: <strong>Danh sách Linh mục đương nhiệm</strong> (cập nhật 11.2024);{' '}
              <strong>Thông báo và bản tin phong chức linh mục</strong> các năm 2017, 2022 và 2024;{' '}
              <strong>Danh sách thuyên chuyển và bổ nhiệm linh mục tháng 06.2026</strong>; các bản tin thánh lễ nhận xứ
              của từng cha tuyên uý — giaophanmytho.net.
            </li>
            <li>
              Tổng Giáo phận Sài Gòn (tgpsaigon.net), <strong>&ldquo;Đức Giám mục Phêrô Nguyễn Văn Khảm nhận Giáo phận
              Mỹ Tho&rdquo;</strong>, 30/08/2014 — nguồn tiểu sử Đức Cha Phêrô Nguyễn Văn Khảm.
            </li>
            <li>
              Tòa Giám Mục Mỹ Tho, <em>Kỷ yếu 50 năm thành lập Giáo phận Mỹ Tho (1960 – 2010)</em>, NXB Tôn Giáo, 2010;
              Hội Đồng Giám Mục Việt Nam, <em>Niên Giám Giáo Hội Công Giáo Việt Nam 2022</em>, NXB Tôn Giáo.
            </li>
            <li>
              Tòa Thánh Vatican, <em>Annuario Pontificio</em>, Libreria Editrice Vaticana. Nguyên văn hai văn kiện lập
              Giáo phận Mỹ Tho đăng trong Công báo Toà Thánh <em>Acta Apostolicae Sedis</em>, tập 53 (1961):{' '}
              Tông hiến <em>Venerabilium Nostrorum</em> ngày 24/11/1960 thiết lập Hàng Giáo Phẩm Việt Nam —{' '}
              <strong>trang 346</strong>; và Sắc chỉ <em>Quod Venerabiles Fratres</em> ngày 27/11/1960 chia lãnh thổ và
              lập giáo phận — <strong>trang 474</strong>. Bản số hoá tại vatican.va, tệp AAS-53-1961-ocr.pdf.
            </li>
            <li>
              Tổng Liên Đoàn Thiếu Nhi Thánh Thể Việt Nam, <em>Quy chế &amp; Nội quy Phong trào TNTT</em>; bảng
              &ldquo;Mẫu khăn quàng và các cấp hiệu&rdquo; — Liên đoàn Các Thánh Tử Đạo Việt Nam, Giáo phận Mỹ Tho; ghi
              chép của Xứ Đoàn do Ban Điều Hành cung cấp (danh sách các đời cha tuyên uý).
            </li>
          </ol>

          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-red)', margin: '16px 0 6px' }}>
            C-bis. Nguồn về buổi đầu Giáo hội Việt Nam — mốc 1533 và những gì đến sau
          </h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', lineHeight: 1.7, margin: '0 0 8px' }}>
            Phần này phục vụ đoạn <em>&ldquo;Tin Mừng đến Việt Nam&rdquo;</em> ở cuối Chương I. Đây là chỗ bản khảo cứu
            phải cẩn thận nhất, vì cột mốc 1533 vừa được toàn thể Giáo hội Việt Nam dùng, vừa bị chính giới nghiên cứu
            Công giáo phản biện. Cả hai phía đều ghi ở đây.
          </p>
          <ol style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', lineHeight: 1.75, paddingLeft: '20px', margin: 0 }}>
            <li>
              <strong>Nguồn gốc của mốc 1533</strong> — Quốc Sử Quán triều Nguyễn, <em>Khâm Định Việt Sử Thông Giám
              Cương Mục</em>, <strong>Chính biên, quyển XXXIII, tờ 6b</strong> (biên soạn khoảng 1856 – 1884, tức{' '}
              <strong>hơn ba trăm năm sau</strong> sự kiện được chép). Ghi tháng 3 năm Nguyên Hoà nguyên niên đời Lê
              Trang Tông, người Tây Dương tên <strong>I-nê-khu</strong> theo đường biển vào giảng đạo Gia Tô ở{' '}
              <strong>Ninh Cường</strong>, <strong>Quần Anh</strong> (huyện Nam Chân) và <strong>Trà Lũ</strong> (huyện
              Giao Thuỷ) — nay đều thuộc Giáo phận Bùi Chu, tỉnh Nam Định. Bản dịch Viện Sử học; bản số hoá đọc được tại
              archive.org và cvdvn.net.
            </li>
            <li>
              <strong>Điểm yếu của chính nguồn ấy, do chính sách nêu ra</strong> — <em>Cương Mục</em> dẫn xuất xứ là{' '}
              <strong>&ldquo;Dã Lục&rdquo;</strong>, tức ghi chép tư nhân trong dân gian chứ không phải hồ sơ quốc sử;
              và <strong>bản Dã Lục đó nay đã thất truyền</strong>. Không có bất kỳ văn khố Bồ Đào Nha, Tây Ban Nha hay
              Dòng Tên đương thời nào xác nhận chuyến đi; không rõ I-nê-khu thuộc dòng tu nào.
            </li>
            <li>
              <strong>Phản biện học thuật</strong> — Lm. <strong>Võ Đình Đệ</strong>, &ldquo;Thực hư có giáo sĩ I-nê-xu
              lén truyền giáo ở Đại Việt năm 1533&rdquo;, <em>gpquinhon.org</em>: tổng hợp lập luận và dẫn Chu Thiên,
              Đinh Xuân Lâm, Trần Thanh Ái, Lm. Bùi Đức Sinh; nêu khả năng chi tiết bắt nguồn từ{' '}
              <em>Tây Dương Gia Tô Bí Lục</em> — sách công kích đạo Công giáo thế kỷ XIX, không phải sử liệu. Xem thêm{' '}
              <em>ofmvn.org</em>, &ldquo;Thừa sai I-nê-xu của sách Cương Mục và thừa sai I-nê-xu Dòng Phan Sinh&rdquo;.
              Truy cập 08/2026.
            </li>
            <li>
              <strong>Phía giữ mốc 1533</strong> — Hội đồng Giám mục Việt Nam, <em>Biên niên sử của Giáo hội Công giáo
              Việt Nam</em>, <em>hdgmvietnam.com</em>; cùng các nhà chép sử Công giáo Phan Phát Huồn, Hồng Lam, Lm. Trần
              Anh Dũng. Đây cũng là nguồn của các mốc: 1550 (Gaspar da Santa Cruz, Hà Tiên), 1580 – 1586 (Luís da
              Fonseca và Grégoire de la Motte, Quảng Nam), 1583 (bốn thừa sai Phanxicô ra Bắc),{' '}
              <strong>18/01/1615</strong> (Dòng Tên lập cơ sở thường trú tại Cửa Hàn — Francesco Buzomi, Diogo
              Carvalho), 1627 (Alexandre de Rhodes vào Đàng Ngoài), <strong>26/07/1644</strong> (thầy Anrê Phú Yên),
              1651 (ba tác phẩm quốc ngữ in tại Rôma), <strong>1659</strong> (Alexanđê VII lập hai Phủ Doãn Tông Toà),
              1668 (bốn linh mục Việt Nam đầu tiên tại Ayutthaya) và 1670 (Công đồng Phố Hiến, lập Dòng Mến Thánh Giá).
              Truy cập 08/2026.
            </li>
            <li>
              <strong>Hình ảnh dùng cho đoạn này</strong> — tất cả lấy từ Wikimedia Commons, kiểm giấy phép từng tệp
              tháng 8/2026. <em>Phạm vi công cộng:</em> tờ đầu quyển thủ và một trang ruột <em>Cương Mục</em> (Quốc Sử
              Quán triều Nguyễn); trang bìa <em>Dictionarium Annamiticum Lusitanum et Latinum</em>, Rôma 1651; trang bìa{' '}
              <em>Divers voyages et missions du P. Alexandre de Rhodes</em>, Paris 1653; chân dung Cha Alexandre de
              Rhodes. <em>Giấy phép CC BY-SA 3.0, ghi công tác giả Hoangvantoanajc:</em> Vương cung thánh đường Phú Nhai
              và Nhà thờ Chính toà Bùi Chu. Tờ đầu <em>Cương Mục</em> đọc được niên đại phụng mệnh &ldquo;Tự Đức bát
              niên thập nhị nguyệt thập ngũ nhật&rdquo; — đầu năm 1856, xác nhận độc lập niên đại biên soạn nêu ở mục
              trên.
            </li>
            <li>
              <strong>Dấu vết vật chất</strong> — đài kỷ niệm <strong>Bến I-nê-khu</strong> tại Lác Môn, Giáo phận Bùi
              Chu (Nam Định), đánh dấu nơi được tin là chỗ Tin Mừng cập bờ đất Việt. Bản khảo cứu này{' '}
              <strong>chưa tự đến khảo sát tại chỗ</strong> và chưa có ảnh gốc do mình chụp; mọi mô tả đều là dẫn lại.
            </li>
          </ol>

          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-red)', margin: '16px 0 6px' }}>
            D. Đã tìm mà không thấy — và những chỗ chưa với tới được
          </h4>
          <ol start={15} style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', lineHeight: 1.75, paddingLeft: '20px', margin: 0 }}>
            <li>
              <strong>Bản &ldquo;Dã Lục&rdquo; mà Cương Mục dẫn</strong> — đã thất truyền. Đây là mắt xích quyết định
              của mốc 1533: chừng nào chưa tìm lại được nó, hoặc chưa tìm được một văn khố phương Tây cùng thời, thì
              1533 vẫn chỉ là <em>cột mốc quy ước</em> chứ không phải sự kiện đã kiểm chứng. Bản khảo cứu ghi rõ như vậy
              thay vì chọn một phía.
            </li>
            <li>
              <strong>Đức Cha Giuse Trần Văn Thiện có phải nghị phụ Công Đồng Vaticanô II hay không</strong> — Giáo
              phận Mỹ Tho lập tháng 11/1960, Công Đồng khai mạc tháng 10/1962, nên về nguyên tắc vị Giám mục Tiên khởi
              thuộc diện được triệu tập. Nhưng bản khảo cứu <em>chưa tra được</em> danh sách nghị phụ có tên ngài, nên
              không khẳng định. Cần đối chiếu <em>Acta Synodalia Sacrosancti Concilii Oecumenici Vaticani II</em>.
            </li>
            <li>
              <strong>Ảnh ngôi nhà thờ thứ nhất (1861)</strong> — không có và gần như chắc chắn chưa từng có. Ba nguồn
              độc lập đều tả đó là nhà nguyện <em>lợp lá</em>: tài liệu Giáo phận (&ldquo;chỉ là một nhà nguyện với mái
              tranh lá&rdquo;), Les Missions Catholiques 1877 (&ldquo;une chapelle en paille&rdquo;) và Báo Công giáo và
              Dân tộc.
            </li>
            <li>
              <strong>Ảnh ba thừa sai đầu tiên</strong> Guillou, Lizé, Marc-Dassa — kho ảnh IRFA không có (xem mục 3).
              Ba vị mất năm 1866, 1870 và 1887, trước thời chân dung thừa sai được chụp và lưu trữ có hệ thống.
            </li>
            <li>
              <strong>Ảnh nhà thờ Chánh Tòa thời Pháp thuộc, ngoài bản khắc 1877</strong> — đã tìm trong kho ảnh Gallica
              bằng bốn cụm từ khoá và soi từng tấm trong album <em>&ldquo;190 cartes postales de Cochinchine&rdquo;</em>{' '}
              (Gallica <em>ark:/12148/btv1b53194859s</em>, 201 ảnh). Album chỉ có Sài Gòn, Chợ Lớn và ảnh dân tộc học,
              không có Mỹ Tho.
            </li>
            <li>
              <strong>Danh tính khoảng 50 linh mục Việt Nam</strong> từng phục vụ họ đạo giai đoạn 1866 – 1960 — chưa có
              nguồn số hoá công khai. Tên các ngài nằm trong sổ bộ họ đạo và văn khố Tòa Giám mục.
            </li>
            <li>
              <strong>Ba nơi còn có thể có tư liệu mà bản khảo cứu này chưa truy cập được:</strong> kho ảnh của Hội Thừa
              Sai Paris tại Paris (mới số hoá phần notice); Trung tâm Lưu trữ Quốc gia II tại TP. Hồ Chí Minh (hồ sơ Nam
              Kỳ thời Pháp); và các bộ sưu tập bưu ảnh tư nhân.
            </li>
            <li>
              <strong>Mâu thuẫn giữa các nguồn, ghi lại nguyên trạng:</strong> ngày Cha Phêrô Nguyễn Văn Lựu tử đạo —
              bài của thừa sai Hamon năm 1882 ghi 18/3/1861, trong khi hồ sơ phong thánh và các nguồn Việt Nam ghi
              7/4/1861. Tên ngôi nhà thờ thứ hai — hồ sơ Renier đặt ngôi bị tháo dỡ ở <em>Hạ Mỹ Tho</em>, trong khi
              &ldquo;Vĩnh Tường&rdquo; là tên của <em>Thượng Mỹ Tho</em>. Chưa nguồn nào giải quyết dứt điểm.
            </li>
          </ol>

          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-red)', margin: '16px 0 6px' }}>
            E. Di Sản Văn Hóa & Sự Hình Thành Chữ Quốc Ngữ (Thế kỷ 17)
          </h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--color-subtle)', lineHeight: 1.7, margin: '0 0 14px' }}>
            Quá trình truyền giáo tại Việt Nam đã để lại một di sản văn hóa vô giá cho dân tộc: <strong>Chữ Quốc ngữ</strong>. Từ những nỗ lực phiên âm tiếng Việt sơ khai của Francisco de Pina, Gaspar do Amaral và António Barbosa, Cha <strong>Alexandre de Rhodes (Đắc Lộ)</strong> đã tổng hợp và điển chế hóa hệ thống chữ viết này, in thành hai tác phẩm kinh điển tại Rôma năm 1651.
          </p>

          <div className="responsive-grid" style={{ marginBottom: '16px' }}>
            {[
              {
                src: '/images/tu-lieu-derhodes.jpg',
                title: 'Alexandre de Rhodes (1591–1660)',
                desc: 'Giáo sĩ dòng Tên người Avignon, Pháp. Người có công lớn nhất trong việc hệ thống hóa và xuất bản các sách in bằng chữ Quốc ngữ đầu tiên. Ngài cũng là người vận động Tòa Thánh thành lập chế độ Đại diện Tông tòa tại Việt Nam.'
              },
              {
                src: '/images/tu-lieu-dictionarium.jpg',
                title: 'Từ điển Việt - Bồ - La (1651)',
                desc: 'Dictionarium Annamiticum Lusitanum et Latinum — Cuốn từ điển ba ngôn ngữ (Việt - Bồ Đào Nha - Latinh) in tại xưởng in của Thánh bộ Truyền bá Đức Tin (Propaganda Fide) ở Rôma, đánh dấu sự chuẩn hóa đầu tiên của chữ Quốc ngữ.'
              },
              {
                src: '/images/tu-lieu-catechismus.jpg',
                title: 'Phép giảng tám ngày (1651)',
                desc: 'Catechismus in octo dies divisus — Tác phẩm văn xuôi đầu tiên được viết bằng chữ Quốc ngữ, in song ngữ Latinh và tiếng Việt, nhằm phục vụ công cuộc truyền giáo.'
              }
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
                onClick={() => setAnh({ src: img.src, caption: `${img.title} — ${img.desc}` })}
              >
                <div style={{ position: 'relative', width: '100%', height: '200px', borderRadius: '6px', overflow: 'hidden' }}>
                  <Image src={img.src} alt={img.title} fill sizes="240px" style={{ objectFit: 'contain', backgroundColor: '#f9f9f9' }} />
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.84rem', marginTop: '10px', color: 'var(--color-dark)' }}>
                  {img.title}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-subtle)', marginTop: '4px', lineHeight: 1.5 }}>{img.desc}</div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '0.75rem', color: 'var(--color-subtle)', lineHeight: 1.7, margin: '16px 0 0', fontStyle: 'italic' }}>
            Ảnh tư liệu do Giáo xứ Chánh Tòa Mỹ Tho cung cấp, trừ: bản khắc nhà thờ 1877, bản khắc làng Ba Giồng 1882 và
            trang bìa sách tử đạo 1882 lấy từ bộ sưu tập số hoá của Thư viện Quốc gia Pháp (Gallica); các chân dung thừa
            sai lấy từ văn khố IRFA. Bản khảo cứu cập nhật tháng 8/2026.
          </p>
        </section>
      <CuaSoAnh anh={anh} onClose={() => setAnh(null)} />
    </KhungTrang>
  );
}
