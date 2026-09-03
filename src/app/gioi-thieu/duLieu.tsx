'use client';

/**
 * Dữ liệu và thành phần dùng chung cho bộ trang khảo cứu lịch sử.
 *
 * Trang gốc dài khoảng 17.500 chữ trên một địa chỉ nên được tách thành bốn
 * trang: Giáo Hội, Giáo Phận, Giáo Xứ và Xứ Đoàn. Toàn bộ dữ liệu gom về đây
 * để cả bốn trang cùng dùng, tránh chép lặp và tránh lệch nhau về sau.
 */

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  MapPin,
  Church,
  Calendar,
  Layers,
  BookOpen,
  Users,
  Info,
  Maximize2,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Quote,
  ShieldCheck,
  Search,
  Globe,
  Award,
  Clock,
  Cross,
  Sparkles,
  Heart,
  Flame,
  CheckCircle2,
  X,
  Eye,
  FileText,
  Scroll
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useChanhToaMassTimes } from '@/lib/useChanhToaMassTimes';
import PopesContinuousMarquee from '@/components/PopesContinuousMarquee';

/**
 * Từ điển lịch sử dùng chung cho bộ trang khảo cứu. Mỗi mục là một chú giải
 * bấm-để-mở cho một cái tên, một địa danh, một tông sắc hay một ông vua xuất
 * hiện trong chính văn — kèm ảnh tư liệu cổ nhất tìm được và danh mục nguồn.
 *
 * Quy ước ghi nguồn: `source` là nguồn gốc chính (một dòng, hiện ngay dưới bài);
 * `refs` là danh mục đối chiếu đầy đủ, gồm cả sử liệu Việt và văn khố quốc tế.
 */
export interface TuDienRecord {
  id: string;
  type: 'Vua' | 'Triều đại' | 'Địa danh' | 'Nhân vật' | 'Sự kiện' | 'Tông sắc';
  name: string;
  /** Tên gốc trong văn khố: Hán–Nôm, Latinh hoặc tiếng Âu châu. */
  altName?: string;
  period?: string;
  description: string;
  /** Trích một câu nguyên văn từ chính văn kiện hoặc chính sử. */
  quote?: string;
  quoteSource?: string;
  /**
   * Nhãn minh bạch về sử liệu, hiện ngay đầu cửa sổ để người đọc biết mình
   * đang đọc thứ gì: một sự kiện có văn khố đối chiếu, một truyền thống được
   * đồng thuận nhưng chưa kiểm chứng, hay một điểm giới sử học còn cãi nhau.
   */
  doTinCay?: 'Có văn khố' | 'Truyền thống' | 'Đang tranh luận';
  /** Các mục nội dung chi tiết, mỗi mục một tiêu đề riêng. */
  sections?: { title: string; body: string }[];
  /**
   * Phần bắt buộc phải có với mọi nhân vật và biến cố nhạy cảm: điều ít được
   * kể, chỗ sử liệu mâu thuẫn, hoặc mặt tối mà các trang đạo thường bỏ qua.
   */
  gocKhuat?: { title: string; body: string }[];
  image?: string;
  imageCaption?: string;
  gallery?: { src: string; caption: string }[];
  source?: string;
  refs?: string[];
}

export const TU_DIEN: Record<string, TuDienRecord> = {

  /* ─────────────── TÔNG SẮC · TÔNG HIẾN · HUẤN THỊ ─────────────── */

  'inscrutabili-1622': {
    id: 'inscrutabili-1622',
    doTinCay: 'Có văn khố',
    type: 'Tông sắc',
    name: 'Tông sắc Inscrutabili Divinae Providentiae',
    altName: 'Inscrutabili Divinae Providentiae Arcano — Đức Grêgôriô XV, 22/06/1622',
    period: 'Ban hành ngày 22 tháng 6 năm 1622',
    description: 'Văn kiện khai sinh Thánh Bộ Truyền Bá Đức Tin (Sacra Congregatio de Propaganda Fide). Ngày 06/01/1622, Đức Grêgôriô XV triệu tập mười ba Hồng y và hai Giám chức để công bố ý định lập một cơ quan thường trực lo việc truyền giáo; ngày 22/6 cùng năm, tông sắc chính thức được ban hành. Ý nghĩa của nó với Việt Nam là quyết định: từ đây quyền điều hành các xứ truyền giáo được rút dần khỏi tay hai vương triều Bồ Đào Nha và Tây Ban Nha (chế độ bảo trợ) để về thẳng Toà Thánh. Chính Bộ này về sau lập hai Hạt Đại diện Tông toà Việt Nam năm 1659, và chính nhà in của Bộ ở Rôma in cuốn Từ điển Việt–Bồ–La năm 1651. Đây cũng là văn bản đầu tiên dùng chữ "propaganda" theo nghĩa hiện đại.',
    image: '/images/tudien_sl_inscrutabili_1622.jpg',
    imageCaption: 'Chính văn tông sắc, in trong Bullarium Romanum (bản Taurinensis), tập XII, tr. 690, mục LX: «Erectio Congregationis de Propaganda Fide — Gregorius Papa XV, servus servorum Dei, ad perpetuam rei memoriam — Inscrutabili divinae providentiae arcano…». Bản số hoá: archive.org, phạm vi công cộng.',
    source: 'Bullarium Romanum, t. XII; Acta S.C. de Propaganda Fide',
    refs: [
      'Grêgôriô XV, Tông sắc "Inscrutabili Divinae Providentiae Arcano", Rôma, 22/06/1622 — Bullarium Romanum, tập XII, tr. 690–693.',
      'Catholic Encyclopedia (1913), mục "Sacred Congregation of Propaganda", newadvent.org/cathen/12456a.htm.',
      'Congregatio pro Gentium Evangelizatione, "Profilo storico", vatican.va.',
      'IRFA (Viện Nghiên cứu Pháp–Á), "400 ans de la Propagation de la Foi", irfa.paris, 2022.'
    ]
  },

  'apostolatus-officium-1658': {
    id: 'apostolatus-officium-1658',
    doTinCay: 'Có văn khố',
    type: 'Tông sắc',
    name: 'Tông chiếu Apostolatus Officium',
    altName: 'Apostolatus Officium — Đức Alexanđê VII, 17/08/1658',
    period: 'Bổ nhiệm 29/07/1658 — Tông chiếu 17/08/1658',
    description: 'Bước thứ nhất của quyết định 1659. Ngày 29/07/1658, Đức Alexanđê VII bổ nhiệm hai linh mục Pháp làm Giám mục hiệu toà: cha François Pallu làm Giám mục hiệu toà Héliopolis và cha Pierre Lambert de la Motte làm Giám mục hiệu toà Béryte. Tông chiếu ngày 17/08/1658 trao cho hai vị trách nhiệm các xứ truyền giáo Trung Hoa và các nước lân cận, kèm quyền chọn thêm một vị Đại diện Tông toà thứ ba — vị ấy là cha Ignace Cotolendi. Đây là lần đầu tiên Toà Thánh bổ nhiệm Giám mục cho vùng Viễn Đông mà không qua sự đề cử của vua Bồ Đào Nha, và là hệ quả trực tiếp của những năm cha Đắc Lộ vận động tại Rôma và Paris.',
    source: 'Catholic Encyclopedia (1913); Văn khố MEP/IRFA',
    refs: [
      'Ảnh tư liệu: chưa tìm được bản số hoá công khai của chính tông chiếu 1658; các bộ sưu tập Bullarium Romanum (Taurinensis) và Collectanea S.C.P.F. đều không in văn bản này.',
      'Catholic Encyclopedia (1913), mục "Society of Foreign Missions of Paris": "By a Brief of 17 August 1658, Alexander VII nominated François Pallu and Pierre de la Motte Lambert…".',
      'IRFA, hồ sơ thừa sai số 0012 — PALLU François, irfa.paris.',
      'A. Launay, Histoire générale de la Société des Missions Étrangères, Paris, 1894, t. I.',
      'Hội đồng Giám mục Việt Nam, Biên niên sử Giáo hội Công giáo Việt Nam, mục năm 1658.'
    ]
  },

  'super-cathedram-1659': {
    id: 'super-cathedram-1659',
    doTinCay: 'Có văn khố',
    gocKhuat: [
      { title: 'Một quyết định châm ngòi cho ba mươi năm nội chiến trong lòng Giáo hội', body: 'Lập Đại diện Tông toà người Pháp cho Đàng Trong và Đàng Ngoài nghĩa là Toà Thánh lấy lại quyền mà vương triều Bồ Đào Nha vẫn giữ theo chế độ bảo trợ. Lisbon và Macao không chấp nhận. Các Giám mục MEP bị cản đường, bị từ chối công nhận, có lúc bị đe doạ vạ tuyệt thông từ phía đối lập; ngược lại các ngài cũng dùng vũ khí giáo luật với những ai không tuân phục. Nhiều thừa sai Dòng Tên Bồ Đào Nha ở Đàng Trong từ chối trình diện với Đức cha Lambert de la Motte. Cuộc giằng co ấy kéo dài tới cuối thế kỷ XVII, và người thiệt trước tiên là giáo dân Việt Nam, những người có lúc bị chính hai phe giáo sĩ yêu cầu chọn bên.' },
      { title: 'Bản thân tông sắc chưa tìm được ảnh chụp công khai', body: 'Trang này đã đối chiếu Bullarium Romanum bản Taurinensis, Bullarium Pontificium S.C. de Propaganda Fide và bộ Iuris Pontificii de Propaganda Fide của de Martinis mà không bộ nào in nguyên văn tông sắc 1659. Nội dung phân định lãnh thổ của nó chỉ còn đọc lại được qua một đoản sắc năm 1669 của Đức Clêmentê IX in trong Collectanea S.C.P.F., t. I, tr. 61. Nói cách khác: văn kiện khai sinh Giáo hội Việt Nam về mặt hành chính hiện chưa có bản số hoá công khai nào để người đọc tự kiểm chứng.' },
      { title: 'Ranh giới vẽ trên giấy, không vẽ trên đất', body: 'Tông sắc trao cho Đức cha Pallu cả Lào và năm tỉnh nam Trung Hoa, cho Đức cha Lambert de la Motte cả năm tỉnh đông nam Trung Hoa và đảo Hải Nam. Trên thực tế không vị nào cai quản nổi những vùng ấy, và phần lớn thời gian các ngài còn không vào được chính Đàng Trong hay Đàng Ngoài, phải trú tại Ayutthaya bên Xiêm. Bản đồ trong văn kiện Rôma và bản đồ thực tế là hai thứ rất khác nhau.' },
    ],
    type: 'Tông sắc',
    name: 'Tông sắc Super Cathedram Principis Apostolorum',
    altName: 'Super Cathedram Principis Apostolorum — Đức Alexanđê VII, 09/09/1659',
    period: 'Ban hành ngày 9 tháng 9 năm 1659',
    description: 'Giấy khai sinh hành chính của Giáo hội Việt Nam. Tông sắc thiết lập và phân định ranh giới hai Hạt Đại diện Tông toà đầu tiên trên đất Việt: Đàng Ngoài — trao cho Đức cha François Pallu, gồm cả Lào và năm tỉnh nam Trung Hoa (Vân Nam, Quý Châu, Hồ Quảng, Tứ Xuyên, Quảng Tây); và Đàng Trong — trao cho Đức cha Pierre Lambert de la Motte, gồm cả năm tỉnh đông nam Trung Hoa (Chiết Giang, Phúc Kiến, Quảng Đông, Giang Tây, Hải Nam). Từ một cánh đồng truyền giáo vô danh dưới quyền bảo trợ Bồ Đào Nha, Việt Nam lần đầu có địa chỉ riêng trong Giáo hội hoàn vũ, trực thuộc thẳng Toà Thánh. Chuỗi phân chia bắt đầu từ đây: Đàng Ngoài tách đôi năm 1679, Đàng Trong tách đôi năm 1844 — và nhánh Tây Đàng Trong chính là tổ phụ của Giáo phận Mỹ Tho hôm nay.',
    quote: '"Super cathedram principis apostolorum, inscrutabili divinae Providentiae arcano, collocati…"',
    quoteSource: 'Câu mở đầu tông sắc — cố ý nhắc lại chính câu mở đầu tông sắc lập Bộ Truyền Bá Đức Tin năm 1622.',
    source: 'Bullarium Romanum; Hội đồng Giám mục Việt Nam',
    refs: [
      'Ảnh tư liệu: chưa tìm được bản số hoá công khai của chính tông sắc 1659. Đã đối chiếu Bullarium Romanum (Taurinensis) t. XVI, Bullarium Pontificium S.C. de Propaganda Fide và Iuris Pontificii de Propaganda Fide — không bộ nào in nguyên văn. Phần phân định lãnh thổ của tông sắc được nhắc lại nguyên văn trong đoản sắc năm 1669 của Đức Clêmentê IX, Collectanea S.C.P.F., t. I, tr. 61.',
      'Alexanđê VII, "Super Cathedram Principis Apostolorum", 09/09/1659 — toàn văn Latinh tại papalencyclicals.net và documentacatholicaomnia.eu.',
      'Lưu ý niên đại: các nguồn Việt Nam và MEP thống nhất ghi 09/09/1659; vài bản Latinh in lại đề 08/09 hoặc 09/10/1659. Bài này dùng mốc 09/09/1659 theo Hội đồng Giám mục Việt Nam.',
      'Hội đồng Giám mục Việt Nam, Chronology of the Catholic Church in Vietnam, cbcvietnam.org, mục 1659.',
      'IRFA, "Présence des Missions Étrangères de Paris au Vietnam, 1664–1975", irfa.paris.'
    ]
  },

  'instructio-1659': {
    id: 'instructio-1659',
    doTinCay: 'Có văn khố',
    gocKhuat: [
      { title: 'Bản văn tiến bộ nhất của thế kỷ, và điều đã xảy ra sau đó', body: 'Huấn thị 1659 cấm áp đặt phong tục Âu châu và buộc đào tạo giáo sĩ bản quốc — nguyên tắc mà mãi tới Công Đồng Vatican II mới được Giáo hội phổ quát nói lại rõ ràng như thế. Nhưng chỉ hơn năm mươi năm sau, chính Rôma ban hành Ex Illa Die (1715) rồi Ex Quo Singulari (1742) cấm tiệt việc tế tổ tiên — làm ngược lại đúng tinh thần huấn thị của mình. Bản văn hay nhất và bản văn tai hại nhất cho Á Đông đều mang cùng một con dấu.' },
      { title: 'Việc đào tạo linh mục bản quốc cũng đi rất chậm so với lời hứa', body: 'Bốn linh mục Việt Nam đầu tiên chịu chức năm 1668, chín năm sau huấn thị — nhanh. Nhưng phải đợi tới năm 1933, tức 274 năm sau, Việt Nam mới có vị Giám mục người Việt đầu tiên là Đức cha Gioan Baotixita Nguyễn Bá Tòng; và tới năm 1960 mới có Hàng Giáo phẩm riêng. Nguyên tắc được viết năm 1659; việc thực hiện đầy đủ mất ba thế kỷ.' },
    ],
    type: 'Tông sắc',
    name: 'Huấn thị 1659 của Bộ Truyền Bá Đức Tin',
    altName: 'Instructio S.C. de Propaganda Fide ad Vicarios Apostolicos, 1659',
    period: 'Năm 1659',
    description: 'Bản văn được giới sử học gọi là "Đại Hiến chương" của công cuộc truyền giáo cận đại, trao tận tay ba vị Đại diện Tông toà trước khi lên đường. Huấn thị cấm các thừa sai áp đặt phong tục Âu châu lên dân bản xứ, trừ khi phong tục địa phương trái rõ ràng với đức tin và luân lý; và đặt lên hàng đầu nhiệm vụ đào tạo hàng giáo sĩ bản quốc. Với Việt Nam, đây không phải lý thuyết suông: chín năm sau huấn thị, bốn linh mục Việt Nam đầu tiên được truyền chức (1668), và mười một năm sau, Dòng Mến Thánh Giá — dòng nữ bản địa tiên khởi — được lập (1670).',
    quote: '«Nullum studium ponite, nullaque ratione suadete illis populis ut ritus suos, consuetudines et mores mutent, modo non sint apertissime Religioni et bonis moribus contraria. Quid enim absurdius quam Galliam, Hispaniam, aut Italiam, aut aliam Europae partem in Sinas invehere?» — Đừng bận tâm, đừng vì bất cứ lẽ gì mà thuyết phục các dân ấy đổi lễ nghi, tập tục và phong hoá của họ, miễn là những điều đó không trái rõ ràng với Đạo và với luân lý. Còn gì vô lý hơn là mang cả nước Pháp, nước Tây Ban Nha hay một miền nào khác của Âu châu sang đất Trung Hoa?',
    quoteSource: 'Nguyên văn Huấn thị 1659 — Collectanea S.C. de Propaganda Fide, Rôma 1907, t. I, số 135, tr. 42.',
    image: '/images/tudien_sl_instructio_1659.jpg',
    imageCaption: 'Chính văn huấn thị: Collectanea S. Congregationis de Propaganda Fide, Rôma 1907, tập I, trang 42, mục 135 — «Instr. S. C. de Propag. Fide 1659 (Ad Vicarios App. Societatis Mission. ad Exteros)». Câu «Quid enim absurdius quam Galliam, Hispaniam, aut Italiam, aut aliam Europae partem in Sinas invehere?» nằm ở cuối cột trái. Bản số hoá: archive.org, phạm vi công cộng.',
    source: 'Collectanea S.C. de Propaganda Fide, t. I, n. 135',
    refs: [
      'Sacra Congregatio de Propaganda Fide, "Instructio ad Vicarios Apostolicos in regna Sinarum proficiscentes", 1659 — Collectanea S.C.P.F., Rôma, 1907, t. I, số 135.',
      'H. Chappoulie, Aux origines d’une Église: Rome et les missions d’Indochine au XVIIe siècle, Paris, 1943.',
      'G. Criveller, "A Century of Incoherent Missionary Policy: Propaganda Fide and China", Journal of the Centre for Catholic Studies, CUHK, số 14 (2023), tr. 189–199.',
      'F. Pallu & P. Lambert de la Motte, Monita ad Missionarios, Paris, 1665 — bản triển khai huấn thị này cho các thừa sai tại chỗ.'
    ]
  },

  'ex-illa-die-1715': {
    id: 'ex-illa-die-1715',
    doTinCay: 'Có văn khố',
    gocKhuat: [
      { title: 'Một cuộc tranh luận trăm năm, quyết định trong mười lăm phút của người không ở đó', body: 'Cuộc tranh luận về lễ nghi phương Đông kéo dài từ cuối thế kỷ XVI, giữa một bên là các thừa sai Dòng Tên sống lâu năm tại chỗ, chủ trương hội nhập văn hoá, và bên kia là các dòng tu tới sau cùng các cơ quan ở Rôma. Phần thắng cuối cùng thuộc về phía chưa từng sống ở Á Đông. Chính vì thế mà khi Rôma đảo ngược năm 1939, nhiều nhà nghiên cứu coi đó là một sự thừa nhận muộn màng rằng phía Dòng Tên đã đúng.' },
    ],
    type: 'Tông sắc',
    name: 'Tông hiến Ex Illa Die',
    altName: 'Ex Illa Die — Đức Clêmentê XI, 19/03/1715',
    period: 'Ban hành ngày 19 tháng 3 năm 1715',
    description: 'Văn kiện dứt điểm cuộc tranh luận về "lễ nghi phương Đông": cấm người Công giáo Trung Hoa và Việt Nam cử hành các nghi lễ tế Khổng Tử và tế tổ tiên, buộc mọi thừa sai phải tuyên thệ tuân giữ. Hệ quả tại Việt Nam kéo dài hơn hai thế kỷ và rất nặng nề: khi người có đạo không được thắp hương bái lạy tổ tiên, các quan lại Nho học có ngay lập luận trung tâm để gọi đạo Công giáo là "tả đạo" — thứ đạo dạy người ta bất hiếu, "vô quân vô phụ". Gần như mọi dụ cấm đạo của các chúa Nguyễn và của triều Nguyễn về sau đều lấy lý do ấy làm đầu.',
    image: '/images/tudien_sl_ex_quo_singulari_1742.jpg',
    imageCaption: 'Trang bìa ấn bản Rôma – Firenze năm 1742: «Confirmatio et innovatio Constitutionis incipientis: Ex illa die, a Clemente Papa XI, in causa rituum seu ceremoniarum Sinensium editae» — văn bản chính thức xác nhận và tái ban hành hiến chế 1715, kèm công thức tuyên thệ mới buộc các thừa sai. Đây là ấn bản đương thời còn lưu được của hiến chế Ex Illa Die; chưa có bản số hoá công khai của chính ấn bản 1715. Nguồn: Wikimedia Commons, CC0.',
    source: 'Bullarium Romanum; Collectanea S.C. de Propaganda Fide',
    refs: [
      'Clêmentê XI, Tông hiến "Ex Illa Die", 19/03/1715.',
      'Bênêđictô XIV, Tông hiến "Ex Quo Singulari", 11/07/1742 — xác nhận dứt khoát lệnh cấm.',
      'Bộ Truyền Bá Đức Tin, Huấn thị "Plane Compertum Est", 08/12/1939 — nới lỏng lệnh cấm sau 224 năm.',
      'G. Minamiki, The Chinese Rites Controversy from Its Beginning to Modern Times, Loyola University Press, 1985.'
    ]
  },

  'ex-quo-singulari-1742': {
    id: 'ex-quo-singulari-1742',
    doTinCay: 'Có văn khố',
    gocKhuat: [
      { title: 'Một quyết định ở Rôma làm nặng thêm cuộc bách hại ở Việt Nam', body: 'Khi Toà Thánh cấm người có đạo tế tổ tiên, các quan lại Nho học có ngay lập luận trung tâm và dễ hiểu nhất với dân chúng: đạo này dạy người ta bỏ ông bà, tức là bất hiếu, tức là «vô quân vô phụ». Không phải ngẫu nhiên mà gần như mọi dụ cấm đạo của chúa Nguyễn và triều Nguyễn đều mở đầu bằng đúng lý lẽ đó. Người ra quyết định ở Rôma không phải người trả giá; người trả giá là các gia đình Việt Nam bị chính họ hàng làng xóm coi là kẻ chối bỏ tổ tiên.' },
      { title: 'Gần hai thế kỷ sau, chính Rôma đảo ngược quyết định của mình', body: 'Ngày 08/12/1939, Bộ Truyền Bá Đức Tin ban Huấn thị «Plane Compertum Est» dưới triều Đức Piô XII, nhìn nhận việc kính nhớ tổ tiên mang ý nghĩa văn hoá và tôn kính chứ không phải thờ cúng ngẫu tượng, và cho phép người Công giáo Á Đông thực hành. Nghĩa là lệnh cấm từng góp phần định hình hai thế kỷ bách hại đã được chính cơ quan ban hành nó rút lại sau 197 năm. Tại Việt Nam, Hội đồng Giám mục về sau còn ra thông cáo hướng dẫn cụ thể việc kính nhớ tổ tiên trong gia đình Công giáo.' },
      { title: 'Người bị buộc tuyên thệ là các thừa sai, người bị hỏi cung là giáo dân', body: 'Hiến chế 1742 kèm một công thức tuyên thệ buộc mọi thừa sai đi Viễn Đông phải đọc. Nhưng thừa sai chỉ phải giữ lời thề trước bề trên; còn giáo dân Việt Nam phải giữ nó trước bàn thờ tổ tiên nhà mình, trước lý trưởng và trước quan phủ. Khoảng cách giữa hai vị trí ấy là chỗ mà lịch sử truyền giáo hay bỏ trống.' },
    ],
    type: 'Tông sắc',
    name: 'Tông hiến Ex Quo Singulari',
    altName: 'Ex Quo Singulari — Đức Bênêđictô XIV, 11/07/1742',
    period: 'Ban hành ngày 11 tháng 7 năm 1742',
    description: 'Bản án cuối cùng của cuộc tranh luận lễ nghi. Đức Bênêđictô XIV huỷ mọi châm chước từng được ban, tái xác nhận lệnh cấm của tông hiến Ex Illa Die (1715) và buộc mọi thừa sai đi Viễn Đông phải tuyên thệ theo một công thức thống nhất. Lệnh cấm ấy đứng vững đúng 197 năm, cho tới Huấn thị Plane Compertum Est ngày 08/12/1939 mới được nới. Riêng tại Đàng Trong, chỉ tám năm sau tông hiến này, chúa Võ Vương Nguyễn Phúc Khoát ra lệnh trục xuất toàn bộ thừa sai (1750).',
    image: '/images/tudien_sl_ex_quo_singulari_1742.jpg',
    imageCaption: 'Trang bìa chính bản in Rôma – Firenze năm 1742 của hiến chế, tại nhà in Ioannis Baptistae Bruscagli & Sociorum: «Confirmatio et innovatio Constitutionis incipientis: Ex illa die, a Clemente Papa XI… necnon revocatio, rescissio, abolitio, cassatio, annullatio ac damnatio permissionum super iisdem ritibus… cum praescriptione novae formulae iuramenti per missionarios illarum partium praestandi». Nguồn: Wikimedia Commons, CC0.',
    source: 'Bullarium Benedicti XIV, t. I',
    refs: [
      'Bênêđictô XIV, Tông hiến "Ex Quo Singulari", 11/07/1742 — Bullarium Benedicti XIV, Rôma, t. I.',
      'Lê Quý Đôn, Phủ biên tạp lục, 1776 — ghi chép về lệnh trục xuất thừa sai của Võ Vương năm 1750.',
      'G. Minamiki, The Chinese Rites Controversy, Loyola University Press, 1985, ch. 5.'
    ]
  },

  'chia-dang-trong-1844': {
    id: 'chia-dang-trong-1844',
    doTinCay: 'Có văn khố',
    type: 'Tông sắc',
    name: 'Sắc lệnh chia Hạt Đại diện Tông toà Đàng Trong (1844)',
    altName: 'Đức Grêgôriô XVI, tháng 3 năm 1844',
    period: 'Tháng 3 năm 1844',
    description: 'Sau 185 năm là một khối duy nhất, Hạt Đại diện Tông toà Đàng Trong được Đức Grêgôriô XVI chia làm hai: Đông Đàng Trong — từ Bình Thuận trở ra, toà đặt tại Quy Nhơn, giao Đức cha Étienne-Théodore Cuénot (Cố Thể); và Tây Đàng Trong — toàn bộ Nam Kỳ lục tỉnh cùng Cao Miên, giao Đức cha Dominique Lefèbvre. Chính nhánh Tây Đàng Trong này về sau đổi tên thành Địa phận Sài Gòn (1924), rồi năm 1960 tách bốn tỉnh Định Tường, Long An, Kiến Tường, Kiến Phong để lập Giáo phận Mỹ Tho. Quyết định 1844 vì thế là nhịp nối trực tiếp giữa tông sắc 1659 và ngôi nhà thờ Chánh toà bên sông Tiền.',
    source: 'Acta Gregorii XVI; Catholic-Hierarchy; Văn khố MEP/IRFA',
    refs: [
      'Ảnh tư liệu: chưa tìm được bản số hoá công khai của chính sắc lệnh tháng 3/1844.',
      'Ngày tháng chính xác có hai dị bản trong tài liệu: 02/03/1844 và 11/03/1844. Bài này ghi "tháng 3/1844".',
      'A. Launay, Histoire de la Mission de Cochinchine 1658–1823, Paris, 1923–1925, 3 tập.',
      'IRFA, hồ sơ thừa sai số 0418 — LEFEBVRE Dominique, irfa.paris.',
      'Hội đồng Giám mục Việt Nam, Biên niên sử Giáo hội Công giáo Việt Nam, mục năm 1844.'
    ]
  },

  'venerabilium-nostrorum-1960': {
    id: 'venerabilium-nostrorum-1960',
    doTinCay: 'Có văn khố',
    type: 'Tông sắc',
    name: 'Tông hiến Venerabilium Nostrorum',
    altName: 'Venerabilium Nostrorum — Thánh Gioan XXIII, 24/11/1960',
    period: 'Ban hành ngày 24 tháng 11 năm 1960',
    description: 'Văn kiện chấm dứt quy chế "xứ truyền giáo" kéo dài 301 năm và thiết lập Hàng Giáo phẩm Công giáo Việt Nam. Ba Giáo tỉnh được lập: Hà Nội, Huế và Sài Gòn; các Hạt Đại diện Tông toà được nâng thành Giáo phận chính toà do Giám mục chính toà cai quản, thay vì Giám mục hiệu toà đại diện Đức Giáo hoàng. Cùng dịp này, ba giáo phận mới ra đời: Đà Lạt, Mỹ Tho và Long Xuyên. Tông hiến được công bố tại Việt Nam ngày 08/12/1960 và đăng trên công báo Toà Thánh Acta Apostolicae Sedis, tập 53 (1961), tr. 346–350.',
    quote: '«VI — VIETNAMENSIS. In Vietnamensi regione Hierarchia Episcopalis constituitur.»',
    quoteSource: 'Tiêu đề chính thức của văn kiện trong Acta Apostolicae Sedis 53 (1961), tr. 346.',
    image: '/images/tudien_sl_venerabilium_1960.jpg',
    imageCaption: 'Chính văn Tông hiến trên công báo Toà Thánh: Acta Apostolicae Sedis, tập 53 (1961), trang 346 — «VI. VIETNAMENSIS. In Vietnamensi regione Hierarchia Episcopalis constituitur. IOANNES EPISCOPUS, SERVUS SERVORUM DEI, AD PERPETUAM REI MEMORIAM. Venerabilium Nostrorum S. R. E. Fratrum Cardinalium Sacro Fidei Propagandae Consilio praepositorum sententiam probantes…». Nguồn: vatican.va.',
    source: 'Acta Apostolicae Sedis 53 (1961), tr. 346–350',
    refs: [
      'Gioan XXIII, Tông hiến "Venerabilium Nostrorum", 24/11/1960 — AAS 53 (1961), tr. 346–350.',
      'Bản dịch Việt ngữ: Tổng Giáo phận Sài Gòn, tgpsaigon.net; Giáo phận Đà Lạt, giaophandalat.com; báo Công giáo và Dân tộc.',
      'Hội đồng Giám mục Việt Nam, Chronology of the Catholic Church in Vietnam, cbcvietnam.org, mục 24/11/1960.'
    ]
  },

  'quod-venerabiles-fratres-1960': {
    id: 'quod-venerabiles-fratres-1960',
    doTinCay: 'Có văn khố',
    type: 'Tông sắc',
    name: 'Sắc chỉ Quod Venerabiles Fratres',
    altName: 'Quod Venerabiles Fratres — Thánh Gioan XXIII, 27/11/1960',
    period: 'Ký tại Rôma ngày 27 tháng 11 năm 1960',
    description: 'Sắc chỉ khai sinh Giáo phận Mỹ Tho — Dioecesis Mythoënsis. Ba ngày sau Tông hiến Venerabilium Nostrorum, Toà Thánh tách bốn tỉnh Định Tường, Long An, Kiến Tường và Kiến Phong khỏi Tổng Giáo phận Sài Gòn để lập giáo phận mới, thuộc Giáo tỉnh Sài Gòn, cùng lúc với Giáo phận Đà Lạt tách từ Kontum. Nhà thờ do cha Lucien Régnier (Cha Gẫm) khởi công năm 1906 được nâng lên hàng Nhà thờ Chánh toà, tước hiệu Đức Mẹ Vô Nhiễm Nguyên Tội. Giám mục tiên khởi: Đức cha Giuse Trần Văn Thiện.',
    quote: '"Diviso territorio archidioecesium Saigonensis et Kontumensis, novae conduntur dioeceses Mythoënsis et Dalatensis appellandae." — Chia lãnh thổ hai tổng giáo phận Sài Gòn và Kontum, lập các giáo phận mới mang tên Mỹ Tho và Đà Lạt.',
    quoteSource: 'Acta Apostolicae Sedis, tập 53 (1961), tr. 474.',
    image: '/images/lichsu_sac_chi_mytho_1960.jpg',
    imageCaption: 'Trang 474, Acta Apostolicae Sedis, tập 53 (1961) — nguyên văn sắc chỉ khai sinh Giáo phận Mỹ Tho, ký tại Rôma ngày 27/11/1960.',
    source: 'Acta Apostolicae Sedis 53 (1961), tr. 474',
    refs: [
      'Gioan XXIII, Sắc chỉ "Quod Venerabiles Fratres", 27/11/1960 — AAS 53 (1961), tr. 474.',
      'Giáo phận Mỹ Tho, "60 Năm Thành Lập Hàng Giáo Phẩm Việt Nam, 60 Năm Thành Lập Giáo Phận Mỹ Tho", giaophanmytho.net, 2020.',
      'Toà Giám mục Mỹ Tho, Kỷ yếu Giáo phận Mỹ Tho.'
    ]
  },

  /* ─────────────── VUA · CHÚA · TRIỀU ĐÌNH ─────────────── */

  'le-trang-tong': {
    id: 'le-trang-tong',
    doTinCay: 'Có văn khố',
    gocKhuat: [
      { title: 'Ông vua chỉ là cái mốc thời gian, không phải nhân vật của câu chuyện', body: 'Lê Trang Tông không hề biết đến sự kiện được chép dưới niên hiệu của mình, và cũng không có quyền lực thực tế: ngài được Nguyễn Kim tôn lên ở đất Ai Lao để làm ngọn cờ chính danh chống nhà Mạc, cả triều đình lúc ấy còn lưu vong ở vùng Thanh Hoá. Việc lấy niên hiệu Nguyên Hoà làm mốc khởi đầu của Giáo hội Việt Nam chỉ là chuyện quy chiếu thời gian của người chép sử ba trăm năm sau.' },
      { title: 'Chính sử ghi mốc ấy trong ngữ cảnh một lệnh cấm', body: 'Câu văn của Cương Mục không phải một ghi nhận trung tính. Nó nằm trong mạch chép về việc cấm «tả đạo», và dùng chữ «lén lút» cùng «ngấm ngầm truyền tà giáo». Nghĩa là ngay từ dòng chữ đầu tiên nói về sự hiện diện của đạo Công giáo trên đất Việt, giọng của nhà nước đã là giọng cấm đoán.' },
    ],
    type: 'Vua',
    name: 'Vua Lê Trang Tông',
    altName: 'Lê Duy Ninh 黎維寧 — niên hiệu Nguyên Hoà 元和',
    period: 'Trị vì: 1533 – 1548',
    description: 'Vị vua mở đầu thời Lê Trung Hưng, được Nguyễn Kim tôn lên ở đất Ai Lao rồi đưa về Thanh Hoá để dựng lại nhà Lê chống nhà Mạc. Niên hiệu của ngài — Nguyên Hoà — bắt đầu năm 1533, và chính chữ "Nguyên Hoà nguyên niên" ấy là toạ độ thời gian duy nhất cho cột mốc khởi đầu của Giáo hội Công giáo Việt Nam: bộ Khâm Định Việt Sử Thông Giám Cương Mục chép rằng tháng 3 năm Nguyên Hoà nguyên niên, có người Tây Dương tên I-nê-khu lén vào giảng đạo Gia Tô ở Ninh Cường, Quần Anh và Trà Lũ. Cần nói rõ: bản thân Cương Mục dẫn nguồn từ "Dã Lục" — một ghi chép tư nhân nay đã thất truyền — nên 1533 là cột mốc tưởng niệm được đồng thuận, chưa phải sự kiện đã kiểm chứng bằng văn khố.',
    image: '/images/tudien_nguyen_hoa_thong_bao.png',
    imageCaption: 'Đồng tiền "Nguyên Hoà thông bảo" 元和通寶 đúc dưới niên hiệu Nguyên Hoà của Lê Trang Tông — hiện vật đương thời gần nhất với mốc năm 1533. Bản đồ hoạ theo sưu tập Toda. Nguồn: Wikimedia Commons, phạm vi công cộng.',
    source: 'Khâm Định Việt Sử Thông Giám Cương Mục, Chính biên, q. XXXIII, tờ 6b',
    refs: [
      'Quốc Sử Quán triều Nguyễn, Khâm Định Việt Sử Thông Giám Cương Mục, Chính biên, quyển XXXIII, tờ 6b (soạn 1856–1884), bản dịch Viện Sử học.',
      'Đại Việt sử ký toàn thư, Bản kỷ tục biên — chép việc Nguyễn Kim lập Lê Duy Ninh năm 1533.',
      'Lm. Võ Đình Đệ, "Thực hư có giáo sĩ I-nê-xu lén truyền giáo ở Đại Việt năm 1533", gpquinhon.org — tổng hợp phản biện.',
      'Hội đồng Giám mục Việt Nam, Biên niên sử Giáo hội Công giáo Việt Nam, mục năm 1533.'
    ]
  },

  'chua-sai': {
    id: 'chua-sai',
    doTinCay: 'Có văn khố',
    gocKhuat: [
      { title: 'Đón thừa sai vì cần súng, không vì mến đạo', body: 'Năm 1615 Đàng Trong đang đối đầu với họ Trịnh ở phía bắc và rất cần vũ khí, đại bác cùng thợ đúc súng — những thứ chỉ có thể mua từ thuyền buôn Bồ Đào Nha ghé Hội An. Thừa sai đi cùng thuyền buôn, và giữ được thừa sai nghĩa là giữ được mối buôn. Các thư từ đương thời của chính các thừa sai cũng nói rõ họ hiểu vị thế của mình. Đây là nền móng thực tế của cơ sở truyền giáo đầu tiên trên đất Việt: một tính toán quân sự và thương mại.' },
      { title: 'Và khi tính toán thay đổi thì thái độ cũng thay đổi', body: 'Về cuối triều, trước sức ép của các quan và giới tăng lữ bản địa, cùng những năm mất mùa hạn hán bị quy cho người theo đạo mới, chúa bắt đầu hạn chế việc giảng đạo và có lệnh trục xuất. Cùng một vị chúa, cùng một triều đại: mở cửa khi cần, đóng cửa khi hết cần. Toàn bộ lịch sử truyền giáo ở Đàng Trong thế kỷ XVII vận hành theo nhịp đó.' },
    ],
    type: 'Vua',
    name: 'Chúa Sãi Nguyễn Phúc Nguyên',
    altName: 'Nguyễn Phúc Nguyên 阮福源 — Chúa Sãi, Chúa Bụt',
    period: 'Trị vì Đàng Trong: 1613 – 1635',
    description: 'Chúa Nguyễn thứ hai của Đàng Trong, con Nguyễn Hoàng. Chính dưới thời ngài, ngày 18/01/1615, nhóm tu sĩ Dòng Tên chạy khỏi cuộc bách hại ở Nhật Bản được phép cập bến Cửa Hàn và ở lại — cơ sở truyền giáo thường trú đầu tiên trên đất Việt. Lý do khoan dung phần lớn là thương mại: chúa cần thuyền buôn Bồ Đào Nha ở Hội An để mua vũ khí đối phó họ Trịnh, mà thừa sai đi cùng thuyền buôn. Về cuối triều, trước sức ép của các quan và giới tăng lữ bản địa, chúa bắt đầu hạn chế việc giảng đạo. Ngài cũng là người gả công nữ Ngọc Vạn cho vua Chân Lạp Chey Chettha II năm 1620 — bước mở đầu cho người Việt vào định cư vùng Prey Nokor, tức miền đất sau này có Sài Gòn và Mỹ Tho.',
    image: '/images/tudien_chua_sai_nguyen_phuc_nguyen.jpg',
    imageCaption: 'Chân dung thế tử Nguyễn Phúc Nguyên ở Đàng Trong, tranh thế kỷ XVII — hình ảnh đương thời hiếm hoi của vị chúa cho phép Dòng Tên ở lại năm 1615. Nguồn: Wikimedia Commons, phạm vi công cộng.',
    source: 'Đại Nam thực lục, Tiền biên; Cristoforo Borri, Relatione della nuova missione (1631)',
    refs: [
      'Quốc Sử Quán triều Nguyễn, Đại Nam thực lục, Tiền biên, quyển II–III, bản dịch Viện Sử học.',
      'C. Borri, Relatione della nuova missione delli PP. della Compagnia di Giesu al Regno della Cocincina, Rôma, 1631 — tường thuật của một thừa sai có mặt tại Đàng Trong 1618–1622.',
      'Hội đồng Giám mục Việt Nam, Biên niên sử Giáo hội Công giáo Việt Nam, mục 18/01/1615.',
      'Lê Quý Đôn, Phủ biên tạp lục, 1776.'
    ]
  },

  'trinh-trang': {
    id: 'trinh-trang',
    doTinCay: 'Có văn khố',
    gocKhuat: [
      { title: 'Đổ vỡ vì chế độ đa thê, không vì thần học', body: 'Chúa Trịnh Tráng ban đầu trọng đãi cha Đắc Lộ vì hiếu kỳ với đồng hồ, sách toán và kiến thức thiên văn. Quan hệ hỏng khi giáo lý một vợ một chồng đụng thẳng vào cấu trúc quyền lực của phủ chúa — nơi hôn nhân là công cụ liên minh giữa các dòng họ. Các bà phi và các quan vận động, và ngày 18/6/1628 chúa ra lệnh cấm người Việt lui tới với thừa sai. Cuộc va chạm đầu tiên giữa đạo Công giáo và xã hội Việt Nam không phải về Thiên Chúa, mà về gia đình.' },
      { title: 'Ba năm ấy để lại nhiều hơn người ta tưởng', body: 'Cha Đắc Lộ bị trục xuất năm 1630, nhưng cộng đoàn Đàng Ngoài không tan. Tổ chức Thầy Giảng — những giáo dân nam độc thân dấn thân trọn đời, do chính ngài lập ra để thay thế linh mục khi không có linh mục — chính là thứ giữ cho đạo sống qua các lệnh trục xuất về sau. Đây có lẽ là sáng kiến mục vụ quan trọng nhất của giai đoạn này, và ít được nhắc hơn cuốn từ điển rất nhiều.' },
    ],
    type: 'Vua',
    name: 'Chúa Trịnh Tráng',
    altName: 'Trịnh Tráng 鄭梉 — Thanh Đô Vương',
    period: 'Chấp chính Đàng Ngoài: 1623 – 1657',
    description: 'Vị chúa Trịnh đón cha Alexandre de Rhodes vào Đàng Ngoài. Cha Đắc Lộ cập bến Cửa Bạng (Thanh Hoá) ngày 19/03/1627 rồi được đưa ra Kẻ Chợ — Thăng Long; chúa ban đầu trọng đãi vì hiếu kỳ với đồng hồ, sách toán và khả năng thiên văn của thừa sai. Quan hệ đổ vỡ khi giáo lý một vợ một chồng đụng thẳng vào chế độ hậu cung; các quan và các bà phi vận động, và ngày 18/06/1628 chúa ra lệnh cấm người Việt lui tới với thừa sai Âu châu. Cha Đắc Lộ bị trục xuất khỏi Đàng Ngoài năm 1630 — nhưng ba năm ngắn ngủi ấy đã để lại một cộng đoàn có tổ chức và, quan trọng hơn, khối tư liệu ngôn ngữ dẫn tới cuốn từ điển năm 1651.',
    image: '/images/tudien_chua_trinh_trang.jpg',
    imageCaption: 'Chúa Trịnh Tráng (1577–1657), Thanh Đô Vương. Nguồn: Wikimedia Commons, phạm vi công cộng.',
    source: 'Đại Việt sử ký toàn thư; A. de Rhodes, Histoire du Royaume de Tunquin (1651)',
    refs: [
      'A. de Rhodes, Histoire du Royaume de Tunquin, Lyon, 1651 — tường thuật của chính người trong cuộc.',
      'A. de Rhodes, Divers voyages et missions, Paris, 1653.',
      'Đại Việt sử ký toàn thư, Bản kỷ tục biên, kỷ nhà Lê — Trịnh.',
      'Hội đồng Giám mục Việt Nam, Chronology of the Catholic Church in Vietnam, mục 1627 và 18/06/1628.'
    ]
  },

  'nguyen-phuc-lan': {
    id: 'nguyen-phuc-lan',
    doTinCay: 'Có văn khố',
    type: 'Vua',
    name: 'Chúa Thượng Nguyễn Phúc Lan',
    altName: 'Nguyễn Phúc Lan 阮福瀾 — Chúa Thượng',
    period: 'Trị vì Đàng Trong: 1635 – 1648',
    description: 'Chúa Nguyễn thứ ba. Dưới triều ngài, ngày 26/07/1644, thầy giảng Anrê Phú Yên — mười chín tuổi — bị xử trảm tại Kẻ Chàm (Thanh Chiêm), dinh Quảng Nam, theo lệnh quan trấn thủ mà các tài liệu thừa sai gọi là "Ông Nghè Bộ". Đó là giọt máu đầu tiên của một người Công giáo Việt Nam đổ ra vì đức tin. Cha Alexandre de Rhodes có mặt tại chỗ, đưa thi hài xuống thuyền về Macao an táng và mang thủ cấp về đặt tại nhà Bề trên Cả Dòng Tên ở Rôma; chính tường thuật của ngài là nguồn sử liệu gốc cho biến cố này.',
    source: 'A. de Rhodes, La glorieuse mort d’André, catéchiste (Paris, 1653)',
    refs: [
      'A. de Rhodes, La glorieuse mort d’André, catéchiste de la Cochinchine, Paris, 1653 — tường thuật của nhân chứng trực tiếp.',
      'Quốc Sử Quán triều Nguyễn, Đại Nam thực lục, Tiền biên, quyển IV.',
      'Hồ sơ tuyên phong Chân phước Anrê Phú Yên; Gioan Phaolô II tôn phong Chân phước ngày 05/03/2000.',
      'Hội đồng Giám mục Việt Nam, Biên niên sử Giáo hội Công giáo Việt Nam, mục 26/07/1644.'
    ]
  },

  'nguyen-phuc-chu': {
    id: 'nguyen-phuc-chu',
    doTinCay: 'Có văn khố',
    gocKhuat: [
      { title: 'Cùng một ông chúa mở đất phương Nam và cấm đạo', body: 'Năm 1698 Quốc Chúa sai Nguyễn Hữu Cảnh kinh lược, lập phủ Gia Định — nền hành chính đầu tiên của chính vùng đất mà Giáo phận Mỹ Tho đứng trên hôm nay. Cũng chính ông chúa ấy ra các lệnh cấm đạo những năm 1700, 1704, 1712, 1724. Nghĩa là cộng đồng Công giáo ở đồng bằng sông Cửu Long tồn tại được là nhờ một cuộc mở cõi do một người đang cấm đạo tiến hành.' },
    ],
    type: 'Vua',
    name: 'Quốc Chúa Nguyễn Phúc Chu',
    altName: 'Nguyễn Phúc Chu 阮福淍 — hiệu Thiên Túng Đạo Nhân',
    period: 'Trị vì Đàng Trong: 1691 – 1725',
    description: 'Chúa Nguyễn thứ sáu, người đầu tiên xưng "Quốc Chúa". Triều ngài là thời mở cõi mạnh nhất về phương Nam: năm 1698 sai Nguyễn Hữu Cảnh kinh lược, lập phủ Gia Định — nền hành chính đầu tiên của cả vùng đất mà Giáo phận Mỹ Tho đứng trên hôm nay. Ngài mộ đạo Phật, tự lấy hiệu Thiên Túng Đạo Nhân và năm 1695 mời hoà thượng Thạch Liêm từ Quảng Đông sang; song song, ngài ra một loạt lệnh cấm đạo Công giáo (các năm 1700, 1704, 1712, 1724), phá nhà thờ, buộc thừa sai tập trung về Hội An chờ trục xuất. Chính trong khoảng cấm cách ấy, năm 1723, cha Francisco José García Dòng Phanxicô vẫn lặng lẽ đến được Mỹ Tho, Cái Mơn, Cái Nhum và Cái Bè.',
    source: 'Đại Nam thực lục, Tiền biên; Lê Quý Đôn, Phủ biên tạp lục',
    refs: [
      'Quốc Sử Quán triều Nguyễn, Đại Nam thực lục, Tiền biên, quyển VII–VIII, bản dịch Viện Sử học.',
      'Lê Quý Đôn, Phủ biên tạp lục, 1776.',
      'A. Launay, Histoire de la Mission de Cochinchine 1658–1823, Paris, 1923, t. I–II — văn khố MEP về các lệnh cấm 1700–1724.',
      'Thích Đại Sán (Thạch Liêm), Hải ngoại kỷ sự, 1696 — ghi chép của chính vị hoà thượng được chúa mời sang.'
    ]
  },

  'nguyen-phuc-khoat': {
    id: 'nguyen-phuc-khoat',
    doTinCay: 'Có văn khố',
    gocKhuat: [
      { title: 'Hai văn kiện ở hai đầu thế giới gặp nhau trên lưng giáo dân', body: 'Năm 1742 Toà Thánh ban Ex Quo Singulari cấm dứt khoát việc tế tổ tiên. Năm 1750, tức tám năm sau, Võ Vương ra lệnh trục xuất toàn bộ thừa sai khỏi Đàng Trong. Không có bằng chứng nào cho thấy hai việc có quan hệ nhân quả trực tiếp, nhưng chúng cùng vận hành trên một logic: Rôma buộc giáo dân Việt Nam từ bỏ nghi lễ tổ tiên, và triều đình lấy đúng điều đó làm bằng chứng rằng đây là thứ đạo phá hoại luân thường.' },
    ],
    type: 'Vua',
    name: 'Võ Vương Nguyễn Phúc Khoát',
    altName: 'Nguyễn Phúc Khoát 阮福濶 — Võ Vương',
    period: 'Trị vì Đàng Trong: 1738 – 1765',
    description: 'Chúa Nguyễn thứ tám, xưng Vương năm 1744 và định chế lại toàn bộ triều nghi ở Phú Xuân — trong đó có lệnh cải cách y phục thường được coi là cội nguồn của chiếc áo dài. Với Giáo hội, triều ngài là một trong những khúc nặng nhất của thế kỷ XVIII: năm 1750 chúa ra lệnh trục xuất toàn bộ thừa sai ngoại quốc khỏi Đàng Trong, phá huỷ nhà thờ, cấm dân theo đạo; hàng chục linh mục bị tống giam rồi đưa xuống tàu. Chỉ một số ít lén ở lại hoạt động chui. Lệnh này ban ra tám năm sau khi Toà Thánh dứt khoát cấm nghi lễ tế tổ tiên bằng tông hiến Ex Quo Singulari (1742) — hai văn kiện ở hai đầu thế giới, gặp nhau trên lưng người giáo dân Việt.',
    image: '/images/tudien_vo_vuong_nguyen_phuc_khoat.jpg',
    imageCaption: 'Chân dung Võ Vương Nguyễn Phúc Khoát (1714–1765). Nguồn: Wikimedia Commons, phạm vi công cộng.',
    source: 'Lê Quý Đôn, Phủ biên tạp lục (1776); Đại Nam thực lục, Tiền biên',
    refs: [
      'Lê Quý Đôn, Phủ biên tạp lục, 1776, quyển I–II — nguồn đương thời gần nhất về triều Võ Vương.',
      'Quốc Sử Quán triều Nguyễn, Đại Nam thực lục, Tiền biên, quyển X.',
      'A. Launay, Histoire de la Mission de Cochinchine 1658–1823, Paris, 1924, t. II — hồ sơ cuộc trục xuất năm 1750.',
      'Bênêđictô XIV, Tông hiến "Ex Quo Singulari", 11/07/1742.'
    ]
  },

  'gia-long': {
    id: 'gia-long',
    doTinCay: 'Có văn khố',
    sections: [
      { title: 'Một vị giám mục và một vương tôn mười lăm tuổi', body: 'Năm 1777 quân Tây Sơn diệt gần hết họ Nguyễn ở Gia Định. Nguyễn Phúc Ánh, khi ấy mười lăm tuổi, chạy về vùng Hà Tiên và được Giám mục Pierre Pigneau de Behaine — người Việt gọi là Bá Đa Lộc — che giấu. Quan hệ bắt đầu từ đó và kéo dài hai mươi hai năm, cho tới khi vị giám mục chết ngoài mặt trận.' },
      { title: 'Chuyến đi Pháp của hoàng tử Cảnh', body: 'Năm 1783 Nguyễn Ánh trao con trai là hoàng tử Cảnh, khi ấy bốn tuổi, cho Bá Đa Lộc đưa sang Pháp cầu viện, cùng ấn tín làm tin. Đoàn qua Pondichéry rồi tới Versailles; hoàng tử Cảnh trở thành nhân vật gây chú ý ở triều đình Louis XVI. Ngày 28/11/1787, Hiệp ước Versailles được ký.' },
      { title: 'Triều đại không cấm đạo — nhưng cũng không theo đạo', body: 'Suốt mười tám năm trị vì, Gia Long không ban một dụ cấm đạo nào, cho phép xây sửa nhà thờ và dùng nhiều người Công giáo trong bộ máy. Nhưng chính ngài cũng không bao giờ theo đạo, giữ nguyên khuôn khổ Nho giáo trong luật lệ và điển chế, và cuối đời chọn người kế vị là hoàng tử Đảm — sau này là Minh Mạng — chứ không phải dòng của hoàng tử Cảnh vốn gần với Công giáo.' },
    ],
    gocKhuat: [
      { title: 'Hiệp ước Versailles 1787: tờ giấy người Pháp lấy làm cớ bảy mươi năm sau', body: 'Theo hiệp ước, Pháp cấp tàu chiến và quân để giúp Nguyễn Ánh, đổi lại Pháp được cửa biển Đà Nẵng và quần đảo Côn Lôn cùng quyền tự do buôn bán. Triều đình Pháp rốt cuộc không thi hành: Toàn quyền Pondichéry là Thomas Conway được lệnh tuỳ nghi và đã từ chối. Nhưng văn bản thì vẫn còn đó. Đến giữa thế kỷ XIX, khi Pháp chuẩn bị đánh Việt Nam, chính hiệp ước không bao giờ được thi hành này được đem ra viện dẫn như một cơ sở pháp lý cho yêu sách về Đà Nẵng. Một chữ ký năm 1787 của một giám mục thay mặt một vương tôn lưu vong trở thành lập luận cho tàu chiến năm 1858.' },
      { title: 'Bá Đa Lộc tự xoay tiền, tự mộ người', body: 'Khi Pháp bỏ rơi hiệp ước, vị giám mục không dừng lại: ngài quyên tiền từ thương nhân Pháp ở Pondichéry và Ile de France, tự mua tàu, tự mua vũ khí và mộ những sĩ quan tình nguyện — trong đó có Jean-Baptiste Chaigneau và Philippe Vannier, những người sau này làm quan trong triều Gia Long. Đây là việc làm cá nhân của một giáo sĩ, không phải chính sách nhà nước Pháp — nhưng chính vì thế mà nó khó gỡ khỏi câu hỏi lớn: một người của Giáo hội đã trực tiếp góp phần quyết định vào một cuộc nội chiến Việt Nam.' },
      { title: 'Ngài cũng bị chính Rôma khiển trách', body: 'Bá Đa Lộc chủ trương mềm dẻo với việc thờ cúng tổ tiên và có những bất đồng với các quyết định của Toà Thánh về lễ nghi phương Đông. Ngài cũng bị một số bề trên phê phán vì dấn quá sâu vào việc quân sự và chính trị. Đây không phải một vị thánh trong sách; đây là một con người phức tạp, làm những việc mà chính Giáo hội của ngài cũng không hoàn toàn tán thành.' },
      { title: 'Gia Long biết ơn nhưng vẫn cảnh giác', body: 'Đại Nam thực lục chép việc nhà vua cử quốc tang cho Bá Đa Lộc năm 1799 với nghi thức rất trọng. Nhưng cũng chính nhà vua, khi bàn việc kế vị, đã bỏ qua dòng hoàng tử Cảnh. Sử triều Nguyễn ghi lại lời dặn dò của ngài với người kế vị theo hướng cảnh giác với người phương Tây. Lòng biết ơn cá nhân và tính toán của một ông vua là hai chuyện khác nhau.' },
    ],
    type: 'Vua',
    name: 'Vua Gia Long',
    altName: 'Nguyễn Phúc Ánh 阮福暎 — niên hiệu Gia Long 嘉隆',
    period: 'Trị vì: 1802 – 1820',
    description: 'Hoàng đế sáng lập triều Nguyễn, thống nhất đất nước sau ba mươi năm nội chiến. Quan hệ của ngài với Giáo hội gắn liền với một con người: Giám mục Pierre Pigneau de Behaine — Bá Đa Lộc. Năm 1777, khi Nguyễn Ánh còn là một vương tôn mười lăm tuổi chạy trốn quân Tây Sơn, chính vị giám mục này che giấu ngài ở Hà Tiên. Năm 1787, Bá Đa Lộc đưa hoàng tử Cảnh sang Pháp và ký Hiệp ước Versailles ngày 28/11/1787 — hiệp ước mà triều đình Pháp rốt cuộc không thi hành, nên giám mục tự quyên tiền, mua tàu và mộ những sĩ quan tình nguyện. Bá Đa Lộc mất tại mặt trận Thị Nại ngày 09/10/1799; Nguyễn Ánh cử quốc tang và an táng ngài trọng thể ở Gia Định — khu mộ dân gian gọi là Lăng Cha Cả. Bản thân Gia Long không theo đạo và vẫn giữ nguyên khuôn khổ Nho giáo, nhưng suốt triều ngài không có dụ cấm đạo nào.',
    image: '/images/tudien_vua_gia_long.jpg',
    imageCaption: 'Chân dung vua Gia Long (1762–1820). Nguồn: Wikimedia Commons, phạm vi công cộng.',
    source: 'Đại Nam thực lục, Chính biên, Đệ nhất kỷ; Văn khố MEP',
    refs: [
      'Quốc Sử Quán triều Nguyễn, Đại Nam thực lục, Chính biên, Đệ nhất kỷ, bản dịch Viện Sử học.',
      'Quốc Sử Quán triều Nguyễn, Quốc triều chánh biên toát yếu.',
      'A. Launay, Histoire de la Mission de Cochinchine 1658–1823, Paris, 1925, t. III — thư từ của chính Đức cha Bá Đa Lộc.',
      'Hiệp ước Versailles ngày 28/11/1787 — bản gốc lưu tại Archives Nationales, Paris.'
    ]
  },

  'minh-mang': {
    id: 'minh-mang',
    doTinCay: 'Có văn khố',
    sections: [
      { title: 'Bảy đạo dụ trong hai mươi mốt năm', body: 'Các năm 1825, 1826, 1830, 1833, 1834, 1836 và 1838. Dụ đầu tiên năm 1825 chỉ nhắm việc ngăn thừa sai theo tàu buôn vào nước; tới dụ ngày 06/01/1833 thì thành lệnh cấm toàn quốc: triệt hạ nhà thờ, buộc người có đạo bước qua thập giá. Các dụ 1836 và 1838 siết thêm, đặt giải thưởng bắt đạo trưởng và quy trách nhiệm liên đới cho lý trưởng, hàng xóm.' },
      { title: 'Quá khoá — phép thử tàn nhẫn nhất', body: '«Quá khoá» nghĩa đen là bước qua. Người bị nghi theo đạo bị dẫn tới một cây thập giá đặt dưới đất và bị buộc bước qua để chứng tỏ đã bỏ đạo. Phép thử này hiệu quả về mặt cai trị vì nó rẻ, nhanh, và biến việc giữ đạo thành một hành vi công khai chống lệnh vua trước mặt cả làng. Rất nhiều hồ sơ tử đạo triều Minh Mạng bắt đầu đúng từ khoảnh khắc một người từ chối bước.' },
    ],
    gocKhuat: [
      { title: 'Vụ Lê Văn Khôi: chỗ mà cả hai bên đều có lý của mình', body: 'Năm 1833, Lê Văn Khôi — con nuôi Tả quân Lê Văn Duyệt — nổi dậy chiếm thành Phiên An, và mục tiêu tuyên bố là lật Minh Mạng để đưa An Hoà, con của hoàng tử Cảnh, lên ngôi. Cả hai cha con đều là người Công giáo. Trong thành có linh mục Joseph Marchand (Cố Du) của Hội Thừa sai Paris. Ngài khai rằng chỉ lo việc đạo, và khi Khôi ép ký thư kêu gọi nổi dậy thì ngài đã đốt hết; nhưng ngài cũng được giao coi một trong sáu thớt voi chiến và đứng đầu khối giáo dân trong thành. Từ chỗ đứng của triều đình, đó là bằng chứng. Từ chỗ đứng của Giáo hội, ngài là con tin. Không có tài liệu nào giải quyết dứt điểm được câu hỏi này.' },
      { title: 'Sau 1835, cấm đạo thôi không còn là chuyện tôn giáo', body: 'Thành Phiên An bị hạ tháng 9/1835. Cố Du bị bắt, tra tấn bằng kìm nung, và bị xử lăng trì ngày 30/11/1835 với hai tội danh ghi rõ trong bản án: là đạo trưởng, và tiếp tay Lê Văn Khôi. Từ đó trở đi triều Nguyễn không còn coi đạo Công giáo là một tà thuyết cần răn dạy, mà là một lực lượng chính trị có tổ chức, có ngoại viện và có ứng viên ngai vàng. Cách nhìn ấy sống rất dai — nó còn vọng lại trong lập luận của nhà nước Việt Nam khi phản đối lễ phong thánh năm 1988, hơn một thế kỷ rưỡi sau.' },
      { title: 'Cấm đạo không phải chính sách duy nhất, và không phải điều duy nhất đáng nhớ về ông vua này', body: 'Minh Mạng cũng là người hoàn chỉnh bộ máy hành chính từ Nam chí Bắc, lập tỉnh thay dinh trấn, mở Quốc Tử Giám, chỉnh lý điển lệ, và cho biên soạn nhiều bộ sách lớn. Một trang khảo cứu tử tế không thể rút gọn ngài thành «ông vua giết đạo», cũng như không thể im lặng về việc dưới triều ngài hàng vạn người chết vì đức tin. Cả hai đều là ngài.' },
    ],
    type: 'Vua',
    name: 'Vua Minh Mạng',
    altName: 'Nguyễn Phúc Đảm 阮福膽 — niên hiệu Minh Mệnh 明命',
    period: 'Trị vì: 1820 – 1841',
    description: 'Hoàng đế thứ hai triều Nguyễn, một nhà cai trị Nho học chặt chẽ và là người khởi động cuộc bách hại quy mô quốc gia đầu tiên. Ngài ban bảy dụ liên quan tới đạo Công giáo, vào các năm 1825, 1826, 1830, 1833, 1834, 1836 và 1838. Bước ngoặt là dụ ngày 06/01/1833: lệnh triệt hạ nhà thờ trên toàn quốc và buộc người có đạo phải bước qua thập giá — "quá khoá" — để chứng tỏ đã bỏ đạo. Cuộc nổi loạn Lê Văn Khôi ở thành Phiên An (1833–1835), trong đó thừa sai Joseph Marchand (Cố Du) bị bắt trong thành, khiến triều đình càng tin đạo Công giáo là mối hoạ chính trị: Cố Du bị xử lăng trì ngày 30/11/1835, và các dụ 1836, 1838 siết chặt thêm. Trong số các vị tử đạo triều Minh Mạng có Thánh Anrê Trần An Dũng Lạc, bị trảm quyết tại Hà Nội ngày 21/12/1839.',
    image: '/images/tudien_vua_minh_mang.png',
    imageCaption: 'Chân dung vua Minh Mạng (1791–1841) theo bản khắc Âu châu thế kỷ XIX. Nguồn: Wikimedia Commons, phạm vi công cộng.',
    source: 'Đại Nam thực lục, Chính biên, Đệ nhị kỷ',
    refs: [
      'Quốc Sử Quán triều Nguyễn, Đại Nam thực lục, Chính biên, Đệ nhị kỷ, bản dịch Viện Sử học — nguyên văn các dụ 1833, 1836, 1838.',
      'Khâm Định Đại Nam Hội Điển Sự Lệ — phần chép các điều lệ trừng trị "tả đạo".',
      'Hội đồng Giám mục Việt Nam, Hồ sơ 117 Thánh Tử Đạo Việt Nam, 1988.',
      'Giáo hội Công giáo Việt Nam — "Những thời kỳ bị bách hại", vntaiwan.catholic.org.tw, thống kê bảy dụ cấm đạo triều Minh Mạng.'
    ]
  },

  'thieu-tri': {
    id: 'thieu-tri',
    doTinCay: 'Có văn khố',
    gocKhuat: [
      { title: 'Bảy năm tương đối yên, kết thúc vì một loạt đại bác của Pháp', body: 'Thiệu Trị thi hành luật cấm đạo nhẹ tay hơn cha mình và năm 1843 còn tha án tử cho năm thừa sai Pháp đang bị giam khi hạm trưởng Lévêque của chiến hạm Héroïne tới Đà Nẵng đòi người. Chính sự nhân nhượng ấy dẫn tới hậu quả ngược: ngày 15/4/1847, hai chiến hạm Pháp Gloire và Victorieuse của đại tá Lapierre bắn chìm các thuyền chiến Việt ở vịnh Đà Nẵng. Bị làm nhục, nhà vua ban một dụ gay gắt rồi băng hà tháng 11 cùng năm, để lại cho Tự Đức một triều đình đã hết thiện cảm với người Âu. Đây là ví dụ rõ nhất cho thấy sức ép quân sự của phương Tây làm hại người có đạo chứ không cứu họ.' },
    ],
    type: 'Vua',
    name: 'Vua Thiệu Trị',
    altName: 'Nguyễn Phúc Miên Tông 阮福綿宗 — niên hiệu Thiệu Trị 紹治',
    period: 'Trị vì: 1841 – 1847',
    description: 'Hoàng đế thứ ba triều Nguyễn, một quãng lặng ngắn giữa hai cơn bão. Ngài không bãi bỏ luật cấm đạo của vua cha nhưng thi hành nhẹ tay hơn, và năm 1843 đã tha án tử cho năm thừa sai Pháp đang bị giam khi hạm trưởng Lévêque của chiến hạm Héroïne tới Đà Nẵng đòi thả người. Chính sự nhân nhượng ấy lại dẫn tới đổ vỡ: ngày 15/04/1847, hai chiến hạm Pháp Gloire và Victorieuse của đại tá Lapierre nổ súng bắn chìm các thuyền chiến Việt ở vịnh Đà Nẵng. Bị làm nhục, vua ban một dụ cấm đạo gay gắt và treo giải bắt thừa sai; ngài băng hà ngày 04/11/1847, để lại ngôi cho vua Tự Đức và một triều đình đã mất hết thiện cảm với người Âu.',
    image: '/images/tudien_sac_chi_thieu_tri.jpg',
    imageCaption: 'Một đạo sắc chỉ triều Thiệu Trị — mẫu văn bản hành chính bằng chữ Hán có ấn tỷ của nhà vua, cùng dạng với các dụ cấm đạo cùng thời. Nguồn: Wikimedia Commons, phạm vi công cộng.',
    source: 'Đại Nam thực lục, Chính biên, Đệ tam kỷ',
    refs: [
      'Quốc Sử Quán triều Nguyễn, Đại Nam thực lục, Chính biên, Đệ tam kỷ, bản dịch Viện Sử học.',
      'A. Launay, Histoire de la Mission de Cochinchine, t. III — hồ sơ vụ Héroïne (1843) và vụ Đà Nẵng 15/04/1847.',
      'Giáo hội Công giáo Việt Nam — "Những thời kỳ bị bách hại", vntaiwan.catholic.org.tw: hai dụ cấm đạo triều Thiệu Trị.'
    ]
  },

  'tu-duc': {
    id: 'tu-duc',
    doTinCay: 'Có văn khố',
    sections: [
      { title: 'Mười ba đạo dụ, ba mươi sáu năm', body: 'Ngay năm lên ngôi 1848, nhà vua gọi người có đạo là «tả đạo» và ra lệnh cấm trên cả nước. Tháng 3/1851: thừa sai ngoại quốc bị ném xuống sông biển, linh mục Việt bị chém làm đôi. Tháng 9/1855: đốt nhà thờ, cấm hội họp. Ngày 06/6/1857: buộc người có đạo cưới hỏi ma chay theo nghi lễ cổ truyền có tế tổ tiên. Ngày 15/12/1859: giáng chức mọi quan lại theo đạo, quan lớn không chối đạo thì xử tử. Ngày 05/8/1861: Chiếu Phân Sáp.' },
      { title: 'Kết thúc bằng một hoà ước, không bằng một sự hối cải', body: 'Cuộc bách hại chấm dứt sau Hoà ước Nhâm Tuất ký ngày 05/6/1862, trong đó triều đình phải cam kết để dân tự do theo đạo Gia Tô. Cuối năm 1862 nhà vua ban dụ bãi bỏ toàn bộ các lệnh cấm trước đó. Nghĩa là điều mà ba trăm năm cầu nguyện và chịu chết không đạt được, thì bốn năm tàu chiến đạt được — và đó chính là gốc rễ của một vết thương sẽ còn nhức suốt một thế kỷ sau.' },
    ],
    gocKhuat: [
      { title: 'Các con số không khớp nhau, và phần lớn đến từ một phía', body: 'Con số thường gặp cho riêng giai đoạn 1848–1860 là khoảng 25 thừa sai ngoại quốc, 300 linh mục Việt Nam và 30.000 giáo dân thiệt mạng; con số cho toàn bộ ba thế kỷ bách hại thường được ghi là hơn 130.000, có tài liệu đẩy lên cao hơn nữa. Cần nói thẳng: các con số ấy chủ yếu đến từ báo cáo của thừa sai gửi về châu Âu và từ hồ sơ phong thánh, không có tổng điều tra độc lập, và Châu bản cùng Đại Nam thực lục ghi số vụ xử ít hơn nhiều. Không ai biết con số thật. Điều chắc chắn là quy mô rất lớn; điều không chắc chắn là bao nhiêu.' },
      { title: 'Cuộc bách hại trở thành cớ cho tàu chiến — và có người trong đạo đã góp phần', body: 'Ngày 20/7/1857, Giám mục Dòng Đaminh người Tây Ban Nha José María Díaz Sanjurjo (Đức cha An) bị xử trảm tại pháp trường Bảy Mẫu, Nam Định. Cái chết của ngài là cớ để Tây Ban Nha góp quân cho cuộc viễn chinh của Pháp. Cũng năm 1857, Napoléon III lập một uỷ ban nghiên cứu vấn đề Việt Nam, và trong uỷ ban ấy có Giám mục Pellerin, Đại diện Tông toà Bắc Đàng Trong. Năm 1858, khi hạm đội Pháp – Tây Ban Nha nổ súng vào Đà Nẵng, Giám mục Pellerin có mặt trên chiến hạm chỉ huy Némésis bên cạnh tướng Rigault de Genouilly với tư cách cố vấn chính trị, và đã khẳng định với phía Pháp rằng giáo dân Việt Nam sẽ nổi lên ủng hộ. Điều đó đã không xảy ra.' },
      { title: 'Cái giá của việc ấy do người ở lại trả', body: 'Việc một số chức sắc trong đạo cổ vũ can thiệp quân sự đã cho triều đình đúng thứ lập luận họ cần: rằng người Công giáo là nội ứng của giặc. Chiếu Phân Sáp năm 1861 ban ra giữa lúc chiến sự đang diễn ra, và nhắm thẳng vào toàn thể cộng đồng giáo dân — những người không hề được hỏi ý kiến và không có tiếng nói nào trong các tính toán ở Paris hay Madrid. Đây là góc khuất nặng nhất của cả giai đoạn: người chịu chết phần lớn không phải người đã gọi tàu chiến tới.' },
      { title: 'Tự Đức không phải một bạo chúa đơn giản', body: 'Ngài là ông vua hay chữ nhất triều Nguyễn, để lại khối lượng thơ văn và châu phê đồ sộ, cho tổ chức việc trị thuỷ, khuyến nông, và chính ngài đã cho biên soạn bộ Khâm Định Việt Sử Thông Giám Cương Mục — cũng chính là bộ sách ghi lại mốc 1533 của đạo Công giáo. Cùng một triều đại vừa đàn áp đạo vừa lưu giữ cho đạo cái mốc khởi đầu duy nhất mà nó có.' },
    ],
    type: 'Vua',
    name: 'Vua Tự Đức',
    altName: 'Nguyễn Phúc Hồng Nhậm 阮福洪任 — niên hiệu Tự Đức 嗣德',
    period: 'Trị vì: 1847 – 1883',
    description: 'Hoàng đế thứ tư triều Nguyễn và là người ban nhiều dụ cấm đạo nhất — mười ba đạo dụ trong ba mươi sáu năm trị vì. Ngay năm lên ngôi, ngài gọi người Công giáo là "tả đạo" và ra lệnh cấm trên cả nước; tháng 3/1851 buộc thừa sai ngoại quốc bị ném xuống sông biển, linh mục Việt bị chém làm đôi; tháng 9/1855 lệnh đốt nhà thờ; ngày 06/06/1857 buộc người có đạo phải cưới hỏi ma chay theo nghi lễ cổ truyền có tế tổ tiên; ngày 15/12/1859 giáng chức mọi quan lại theo đạo. Đỉnh điểm là Chiếu Phân Sáp ngày 05/08/1861. Chỉ ước tính giai đoạn 1848–1860 đã có khoảng 25 thừa sai ngoại quốc, 300 linh mục Việt Nam và 30.000 giáo dân thiệt mạng. Cuộc bách hại chấm dứt sau Hoà ước Nhâm Tuất ký ngày 05/06/1862; cuối năm 1862 nhà vua ban dụ bãi bỏ toàn bộ các lệnh cấm trước đó.',
    image: '/images/tudien_vua_tu_duc.jpg',
    imageCaption: 'Vua Tự Đức (1829–1883). Nguồn: Wikimedia Commons, phạm vi công cộng.',
    source: 'Đại Nam thực lục, Chính biên, Đệ tứ kỷ',
    refs: [
      'Quốc Sử Quán triều Nguyễn, Đại Nam thực lục, Chính biên, Đệ tứ kỷ, bản dịch Viện Sử học.',
      'Hoà ước Nhâm Tuất (Hiệp ước Sài Gòn), ký ngày 05/06/1862.',
      'Hội đồng Giám mục Việt Nam, Hồ sơ 117 Thánh Tử Đạo Việt Nam, 1988.',
      'Giáo hội Công giáo Việt Nam — "Những thời kỳ bị bách hại", vntaiwan.catholic.org.tw: danh mục 13 dụ cấm đạo triều Tự Đức.'
    ]
  },

  /* ─────────────── SỰ KIỆN · VĂN BẢN TRIỀU ĐÌNH ─────────────── */

  'phan-sap': {
    id: 'phan-sap',
    doTinCay: 'Có văn khố',
    gocKhuat: [
      { title: 'Ban ra giữa lúc đang thua trận', body: 'Chiếu Phân Sáp ký ngày 05/8/1861, tức là sau khi Pháp đã chiếm Gia Định và đang đánh rộng ra Nam Kỳ. Đây không phải một quyết định thuần tôn giáo mà là một biện pháp an ninh thời chiến: triều đình tin rằng các làng Công giáo là hậu cứ tiềm tàng của quân địch nên phải phá vỡ chúng thành từng mảnh. Hiểu như vậy không làm nó bớt tàn nhẫn, nhưng cho thấy vì sao nó xảy ra đúng vào năm 1861 chứ không phải năm nào khác.' },
      { title: 'Điều khoản độc nhất: tách vợ chồng, tách con khỏi cha mẹ', body: 'Điểm khiến chiếu này nặng hơn mọi dụ cấm đạo trước đó không phải án tử, mà là khoản buộc tách gia đình theo giới tính và đưa đi các tỉnh khác nhau. Mục tiêu công khai là triệt đường sinh con nối đạo và làm tan rã cộng đoàn từ gốc. Nhiều gia đình không bao giờ tìm lại được nhau sau năm 1862, kể cả khi lệnh đã được bãi bỏ.' },
      { title: 'Bị bãi bỏ vì hoà ước, không vì thay đổi quan niệm', body: 'Chiếu Phân Sáp chấm dứt sau Hoà ước Nhâm Tuất 05/6/1862, trong đó triều đình buộc phải cam kết để dân theo đạo tự do. Cuối năm 1862 nhà vua ban dụ bãi bỏ các lệnh cấm. Nghĩa là chính sách này không được xét lại từ bên trong; nó bị buộc phải dừng từ bên ngoài. Chi tiết ấy về sau trở thành lập luận nặng nhất chống lại người Công giáo Việt Nam: rằng tự do của họ đến từ nòng súng ngoại bang.' },
    ],
    type: 'Sự kiện',
    name: 'Chiếu Phân Sáp',
    altName: 'Dụ phân sáp của vua Tự Đức, 05/08/1861',
    period: 'Ban hành ngày 5 tháng 8 năm 1861',
    description: 'Chính sách tàn khốc nhất trong ba thế kỷ bách hại. Chiếu gồm năm khoản: giải tán toàn bộ làng Công giáo và phân tán mọi tín hữu — bất kể nam nữ, già trẻ, giàu nghèo — vào các làng bên lương; mỗi người có đạo bị năm người ngoại đạo canh giữ; vợ chồng con cái bị tách theo giới tính và đưa đi các tỉnh khác nhau để triệt đường tái lập cộng đoàn; triệt hạ mọi nhà thờ; tịch thu toàn bộ ruộng đất và tài sản. Mỗi người bị thích vào hai bên má bằng dùi sắt nung đỏ: một bên hai chữ "tả đạo", bên kia tên tổng, huyện quê quán, để không thể trốn. Chính sách kết thúc cùng cuộc bách hại sau Hoà ước Nhâm Tuất ngày 05/06/1862.',
    source: 'Đại Nam thực lục, Chính biên, Đệ tứ kỷ; Hồ sơ Thánh tử đạo Việt Nam',
    refs: [
      'Lưu ý niên đại: một số tài liệu ghi 1860 (năm dự thảo, chuẩn bị) và một số ghi 1851 (một dụ cấm đạo khác của Tự Đức). Bản khảo cứu này dùng mốc 05/08/1861 theo Đại Nam thực lục và hồ sơ tử đạo.',
      'Quốc Sử Quán triều Nguyễn, Đại Nam thực lục, Chính biên, Đệ tứ kỷ.',
      'Hội đồng Giám mục Việt Nam, Hồ sơ 117 Thánh Tử Đạo Việt Nam, 1988.',
      'Giáo hội Công giáo Việt Nam — "Những thời kỳ bị bách hại", vntaiwan.catholic.org.tw: nguyên văn năm khoản của chiếu phân sáp.'
    ]
  },

  'trinh-nguyen': {
    id: 'trinh-nguyen',
    doTinCay: 'Có văn khố',
    type: 'Sự kiện',
    name: 'Trịnh – Nguyễn phân tranh',
    period: '1627 – 1672',
    description: 'Cuộc nội chiến gần nửa thế kỷ giữa họ Trịnh ở Đàng Ngoài và họ Nguyễn ở Đàng Trong, kết thúc bằng việc hai bên lấy sông Gianh làm ranh giới. Cuộc phân tranh này định hình luôn bản đồ truyền giáo: vì đất nước bị chia đôi trên thực tế, Toà Thánh năm 1659 cũng lập hai Hạt Đại diện Tông toà riêng — Đàng Trong và Đàng Ngoài — thay vì một. Nó cũng lý giải vì sao các chúa lúc thì mở cửa đón thừa sai (để mua súng đạn của thuyền buôn Bồ Đào Nha), lúc lại cấm gắt: chính sách với đạo Công giáo luôn là hàm số của nhu cầu quân sự và áp lực của giới quan lại Nho học.',
    source: 'Đại Nam thực lục, Tiền biên; Đại Việt sử ký toàn thư',
    refs: [
      'Quốc Sử Quán triều Nguyễn, Đại Nam thực lục, Tiền biên.',
      'Đại Việt sử ký toàn thư, Bản kỷ tục biên.',
      'Lê Quý Đôn, Phủ biên tạp lục, 1776.'
    ]
  },

  'mtg': {
    id: 'mtg',
    doTinCay: 'Có văn khố',
    sections: [
      { title: 'Hai nữ tu đầu tiên có tên', body: 'Ngày 19/02/1670 tại Kiên Lao, Đàng Ngoài, Đức cha Lambert de la Motte nhận lời khấn của hai phụ nữ Việt Nam lấy tên thánh là Anê và Paula. Đó là buổi khai sinh của dòng nữ bản địa đầu tiên trong lịch sử Giáo hội Việt Nam, và cũng là một trong những dòng nữ bản địa sớm nhất ở toàn cõi Á Đông. Năm sau, 1671, dòng được lập tại An Chỉ, Đàng Trong.' },
      { title: 'Lực lượng giữ đạo bền nhất trong ba thế kỷ bách hại', body: 'Vì là phụ nữ và là người bản xứ, các nữ tu Mến Thánh Giá đi lại được ở những nơi linh mục không thể đến. Trong các giai đoạn vắng bóng linh mục — có khi hàng chục năm liền ở một vùng — chính họ dạy giáo lý, rửa tội cho trẻ hấp hối, giữ sổ sách họ đạo, nuôi giấu và chuyển thư cho các cha. Rất nhiều họ đạo còn sống sót tới thế kỷ XX là nhờ mạng lưới này.' },
    ],
    gocKhuat: [
      { title: 'Được lập ra sớm, nhưng rất lâu mới được nhìn nhận đúng vị trí', body: 'Trong suốt hai thế kỷ, Mến Thánh Giá không có quy chế dòng tu theo giáo luật phổ quát mà chỉ là các «nhà phước» sống theo luật riêng từng địa phận, dưới quyền trực tiếp của Giám mục và cha sở. Mãi tới thế kỷ XX các hội dòng mới lần lượt được chuẩn nhận theo giáo luật. Công lao thì có ngay từ 1670; danh phận thì đến rất muộn.' },
      { title: 'Hầu như không ai trong số họ có tên trong danh sách tử đạo', body: 'Các nữ tu Mến Thánh Giá chịu chung mọi đợt bách hại, bị bắt, bị phân sáp, bị thích chữ vào mặt như mọi giáo dân khác. Nhưng trong 117 vị được tuyên thánh năm 1988 không có một nữ tu Mến Thánh Giá nào. Lý do phần lớn mang tính kỹ thuật — hồ sơ phong thánh cần nhân chứng và biên bản mà những cái chết lặng lẽ trong lưu đày không để lại — nhưng kết quả là một khoảng trống rất lớn trong ký ức chính thức.' },
    ],
    type: 'Sự kiện',
    name: 'Dòng Mến Thánh Giá',
    altName: 'Amantes Crucis — Congrégation des Amantes de la Croix',
    period: 'Thành lập ngày 19/02/1670',
    description: 'Dòng nữ bản địa đầu tiên của Giáo hội Công giáo Việt Nam và là dòng nữ đầu tiên do một Giám mục Đại diện Tông toà lập ra ở Á Đông. Đức cha Pierre Lambert de la Motte lập dòng tại Kiên Lao, Đàng Ngoài ngày 19/02/1670 với hai nữ tu tiên khởi Anê và Paula, rồi lập tại An Chỉ, Đàng Trong năm 1671. Đây chính là hoa trái trực tiếp của Huấn thị 1659 — bản văn buộc các thừa sai phải gây dựng lực lượng bản quốc thay vì trông vào người Âu. Trong ba thế kỷ bách hại, các nữ tu Mến Thánh Giá là mạng lưới giữ đạo âm thầm mà bền nhất ở các họ đạo miền quê: dạy giáo lý, rửa tội cho trẻ hấp hối, nuôi giấu linh mục.',
    source: 'Hội đồng Giám mục Việt Nam; Văn khố MEP/IRFA',
    refs: [
      'P. Lambert de la Motte, Nhật ký và thư từ — Văn khố Hội Thừa sai Paris (AMEP), tập 858 và 877.',
      'Hội đồng Giám mục Việt Nam, Chronology of the Catholic Church in Vietnam, mục 19/02/1670.',
      'A. Launay, Histoire de la Mission du Tonkin, Paris, 1927.',
      'Liên hiệp Nữ tu Mến Thánh Giá Việt Nam, Hiến chương và lịch sử Dòng.'
    ]
  },

  /* ─────────────── ĐỊA DANH ─────────────── */

  'ninh-cuong-quan-anh-tra-lu': {
    id: 'ninh-cuong-quan-anh-tra-lu',
    doTinCay: 'Đang tranh luận',
    gocKhuat: [
      { title: 'Ba cái tên, không một hiện vật', body: 'Ninh Cường, Quần Anh và Trà Lũ là ba địa danh có thật, tra được trong địa bạ và địa dư chí. Nhưng không có một hiện vật khảo cổ, một ngôi mộ, một mảnh tượng ảnh hay một sổ sách nào ở ba nơi ấy có niên đại thế kỷ XVI để xác nhận đã có một cộng đoàn Kitô hữu tại đó năm 1533. Đài kỷ niệm Bến I-nê-khu ở Lác Môn là một công trình tưởng niệm do giáo dân dựng thời hiện đại, không phải một di tích khảo cổ.' },
    ],
    type: 'Địa danh',
    name: 'Ninh Cường – Quần Anh – Trà Lũ',
    period: 'Ghi trong chính sử: năm 1533',
    description: 'Ba làng được Khâm Định Việt Sử Thông Giám Cương Mục nêu đích danh là nơi người Tây Dương tên I-nê-khu lén giảng đạo Gia Tô năm 1533: Ninh Cường và Quần Anh thuộc huyện Nam Chân, Trà Lũ thuộc huyện Giao Thuỷ. Cả ba nay đều nằm trong địa bàn Giáo phận Bùi Chu, tỉnh Nam Định — Ninh Cường còn nguyên tên, Quần Anh nay là vùng Quần Phương (Hải Hậu), Trà Lũ nay là vùng Phú Nhai (Xuân Trường). Tại Lác Môn, giáo dân đã dựng đài kỷ niệm mang tên Bến I-nê-khu, đánh dấu nơi được tin là chỗ Tin Mừng lần đầu cập bờ đất Việt.',
    source: 'Khâm Định Việt Sử Thông Giám Cương Mục, Chính biên, q. XXXIII, tờ 6b',
    refs: [
      'Quốc Sử Quán triều Nguyễn, Khâm Định Việt Sử Thông Giám Cương Mục, Chính biên, quyển XXXIII, tờ 6b — bản dịch Viện Sử học.',
      'Giáo phận Bùi Chu, Lịch sử Giáo phận Bùi Chu, gpbuichu.org.',
      'Lm. Võ Đình Đệ, "Thực hư có giáo sĩ I-nê-xu lén truyền giáo ở Đại Việt năm 1533", gpquinhon.org.',
      'Đồng Khánh địa dư chí — đối chiếu tên huyện Nam Chân và Giao Thuỷ với địa danh hiện nay.'
    ]
  },

  'cua-han': {
    id: 'cua-han',
    doTinCay: 'Có văn khố',
    type: 'Địa danh',
    name: 'Cửa Hàn – Hội An – Nước Mặn',
    altName: 'Cửa Hàn (Tourane, Đà Nẵng) · Hội An (Faifo) · Nước Mặn (Quy Nhơn)',
    period: 'Từ 18/01/1615',
    description: 'Ba cái tên làm nên tam giác truyền giáo đầu tiên của Đàng Trong. Ngày 18/01/1615, cha Francesco Buzomi và cha Diogo Carvalho — cùng nhóm tu sĩ Dòng Tên chạy khỏi cuộc bách hại ở Nhật Bản — cập bến Cửa Hàn, tức vịnh Đà Nẵng ngày nay. Từ đó các ngài chuyển về Hội An, thương cảng quốc tế có phố Nhật và phố Khách, nơi thuyền buôn Bồ Đào Nha ghé mỗi mùa gió; rồi năm 1618 mở cơ sở ở Nước Mặn thuộc phủ Quy Nhơn. Khác với những chuyến ghé chân chớp nhoáng của thế kỷ trước, đây là cơ sở truyền giáo thường trú đầu tiên trên đất Việt — và từ mốc này trở đi, mọi niên đại đều có văn khố đối chiếu.',
    source: 'Hội đồng Giám mục Việt Nam; C. Borri, Relatione della nuova missione (1631)',
    refs: [
      'C. Borri, Relatione della nuova missione delli PP. della Compagnia di Giesu al Regno della Cocincina, Rôma, 1631.',
      'Hội đồng Giám mục Việt Nam, Chronology of the Catholic Church in Vietnam, mục 18/01/1615.',
      'Archivum Romanum Societatis Iesu (ARSI), phông Japonica-Sinica — thư từ của các thừa sai Dòng Tên tại Đàng Trong.',
      'Đỗ Quang Chính, Lịch sử chữ Quốc ngữ 1620–1659, Sài Gòn, 1972.'
    ]
  },

  'dinh-chiem': {
    id: 'dinh-chiem',
    doTinCay: 'Có văn khố',
    type: 'Địa danh',
    name: 'Thanh Chiêm (Kẻ Chàm), dinh Quảng Nam',
    altName: 'Dinh Chiêm · Kẻ Chàm · Cacciam trong thư tịch thừa sai',
    period: 'Thế kỷ XVII',
    description: 'Dinh trấn của thế tử Nguyễn ở Quảng Nam, và là cái nôi có thật của chữ Quốc ngữ. Tại đây, khoảng 1617–1625, cha Francisco de Pina mở lớp dạy tiếng Việt cho các thừa sai — học trò của ngài có Alexandre de Rhodes và António de Fontes — và bắt đầu dùng mẫu tự Latinh ghi âm tiếng Việt một cách có hệ thống. Cũng chính tại Kẻ Chàm, ngày 26/07/1644, thầy giảng Anrê Phú Yên bị xử trảm, trở thành người Công giáo Việt Nam đầu tiên đổ máu vì đức tin.',
    source: 'Đỗ Quang Chính, Lịch sử chữ Quốc ngữ 1620–1659',
    refs: [
      'Đỗ Quang Chính, Lịch sử chữ Quốc ngữ 1620–1659, Sài Gòn, Ra Khơi, 1972 — khảo cứu trên thủ bút gốc lưu tại ARSI và Thư viện Vatican.',
      'A. de Rhodes, La glorieuse mort d’André, catéchiste de la Cochinchine, Paris, 1653.',
      'Roland Jacques, Portuguese Pioneers of Vietnamese Linguistics, Bangkok, Orchid Press, 2002 — phục dựng vai trò của Francisco de Pina.',
      'Quốc Sử Quán triều Nguyễn, Đại Nam thực lục, Tiền biên — về dinh trấn Thanh Chiêm.'
    ]
  },

  'ke-cho': {
    id: 'ke-cho',
    doTinCay: 'Có văn khố',
    type: 'Địa danh',
    name: 'Kẻ Chợ (Thăng Long)',
    altName: 'Kecho · Cachao trong thư tịch Âu châu thế kỷ XVII',
    period: 'Từ 19/03/1627',
    description: 'Tên người Âu quen gọi kinh đô Thăng Long — nghĩa đen là "chợ của xứ này", theo cách gọi dân gian. Cha Alexandre de Rhodes cùng cha Pedro Marques cập bến Cửa Bạng (Thanh Hoá) ngày 19/03/1627 rồi được đưa ra Kẻ Chợ yết kiến chúa Trịnh Tráng. Ba năm hoạt động tại đây — theo chính lời cha Đắc Lộ, khoảng 6.700 người chịu phép rửa — đã dựng nên cộng đoàn Đàng Ngoài và tổ chức Thầy Giảng, mô hình giáo dân dấn thân trọn đời sẽ giữ cho đạo sống sót qua ba thế kỷ vắng bóng linh mục.',
    image: '/images/tu-dien/tudien_kecho.png',
    imageCaption: 'Bản khắc "The City of CHA-CHO the Metropolis of TONQUEEN" (Thành phố Kẻ Chợ, thủ đô xứ Đàng Ngoài) in trong sách của Samuel Baron (1685).',
    source: 'A. de Rhodes, Histoire du Royaume de Tunquin (1651)',
    refs: [
      'A. de Rhodes, Histoire du Royaume de Tunquin, Lyon, 1651 — con số 6.700 là do chính tác giả đưa ra, cần đọc như một tường thuật của người trong cuộc.',
      'A. de Rhodes, Divers voyages et missions, Paris, 1653.',
      'S. Baron, A Description of the Kingdom of Tonqueen, London, 1683 — mô tả Kẻ Chợ của một người sinh tại chỗ.',
      'Đại Việt sử ký toàn thư, Bản kỷ tục biên.'
    ]
  },

  'macao': {
    id: 'macao',
    doTinCay: 'Có văn khố',
    type: 'Địa danh',
    name: 'Macao và Học viện Thánh Phaolô',
    altName: 'Macau · Colégio de São Paulo · Địa phận Macao lập năm 1576',
    period: 'Thế kỷ XVI – XVIII',
    description: 'Bàn đạp của toàn bộ công cuộc truyền giáo Viễn Đông dưới chế độ bảo trợ Bồ Đào Nha. Địa phận Macao lập năm 1576 nắm quyền tài phán trên cả Trung Hoa, Nhật Bản và Việt Nam; Học viện Thánh Phaolô là nơi các thừa sai học tiếng, học phong tục trước khi lên đường — và chính từ Macao, nhóm của cha Buzomi xuống thuyền đi Cửa Hàn năm 1615. Thi hài thầy giảng Anrê Phú Yên cũng được đưa về an táng ở đây năm 1644. Sau trận hoả hoạn năm 1835, học viện và nhà thờ chỉ còn lại bức tường mặt tiền bằng đá — di tích nổi tiếng ngày nay.',
    image: '/images/ruins_st_pauls.jpg',
    imageCaption: 'Di tích mặt tiền nhà thờ Thánh Phaolô ở Macao — tất cả những gì còn lại của học viện Dòng Tên nơi các thừa sai đầu tiên đến Việt Nam được đào tạo.',
    source: 'Archivum Romanum Societatis Iesu, phông Japonica-Sinica',
    refs: [
      'Archivum Romanum Societatis Iesu (ARSI), Japonica-Sinica — thư từ và danh mục thừa sai của tỉnh dòng Nhật Bản đóng tại Macao.',
      'C. R. Boxer, The Portuguese Seaborne Empire 1415–1825, London, 1969.',
      'A. de Rhodes, Divers voyages et missions, Paris, 1653.',
      'Hội đồng Giám mục Việt Nam, Biên niên sử Giáo hội Công giáo Việt Nam, mục năm 1615.'
    ]
  },

  'ayutthaya': {
    id: 'ayutthaya',
    doTinCay: 'Có văn khố',
    type: 'Địa danh',
    name: 'Ayutthaya và Chủng viện Thánh Giuse',
    altName: 'Ayutthaya (Xiêm La) · Séminaire Saint-Joseph, lập năm 1665',
    period: 'Thế kỷ XVII – XVIII',
    description: 'Cố đô Xiêm La, và là tổng hành dinh trên thực tế của Hội Thừa sai Paris tại Đông Nam Á suốt hơn một thế kỷ. Vì cả Đàng Trong lẫn Đàng Ngoài đều cấm đạo từng đợt, các Giám mục Đại diện Tông toà đặt cơ sở ở đây: Đức cha Lambert de la Motte lập Chủng viện Thánh Giuse năm 1665 làm chủng viện chung cho cả vùng Viễn Đông — nơi các chủng sinh Việt, Hoa, Xiêm cùng học — và Công đồng Ayutthaya năm 1664 họp tại đây đã định ra đường lối mục vụ cho các xứ truyền giáo. Nhiều Giám mục Đàng Trong lánh nạn, qua đời và được an táng tại nhà thờ Thánh Giuse. Kinh đô bị quân Miến Điện phá huỷ năm 1767.',
    image: '/images/st_joseph_ayutthaya.jpg',
    imageCaption: 'Nhà thờ Thánh Giuse tại Ayutthaya, Thái Lan — cơ sở của Hội Thừa sai Paris nơi nhiều Giám mục Đại diện Tông toà Đàng Trong đặt trụ sở và được an táng.',
    source: 'Văn khố Hội Thừa sai Paris (AMEP); IRFA',
    refs: [
      'Văn khố Hội Thừa sai Paris (AMEP), phông Siam — biên bản Công đồng Ayutthaya 1664 và hồ sơ Chủng viện Thánh Giuse.',
      'A. Launay, Histoire de la Mission de Siam 1662–1811, Paris, 1920.',
      'IRFA, "Présence des Missions Étrangères de Paris", irfa.paris.',
      'Hội đồng Giám mục Việt Nam, Biên niên sử Giáo hội Công giáo Việt Nam, mục năm 1665.'
    ]
  },

  'thi-nai': {
    id: 'thi-nai',
    doTinCay: 'Có văn khố',
    gocKhuat: [
      { title: 'Một giám mục chết ngoài mặt trận', body: 'Cần gọi đúng tên sự việc: Đức cha Bá Đa Lộc không qua đời trong một nhà thờ hay một chủng viện, mà tại một mặt trận, trong đoàn quân của Nguyễn Ánh, giữa một cuộc nội chiến Việt Nam. Ngài mất vì bệnh kiết lỵ ngày 09/10/1799 ở tuổi 58. Việc một giám mục có mặt ở đó là điều mà cả sử đạo lẫn sử đời đều phải giải thích, chứ không thể kể lướt qua.' },
    ],
    type: 'Địa danh',
    name: 'Cảng Thị Nại (Quy Nhơn)',
    period: 'Cuối thế kỷ XVIII',
    description: 'Cửa biển chiến lược của phủ Quy Nhơn và là chiến trường ác liệt nhất giữa quân Tây Sơn và quân Nguyễn Ánh. Đức cha Pierre Pigneau de Behaine — Bá Đa Lộc — theo Nguyễn Ánh ra mặt trận này và qua đời tại đây ngày 09/10/1799 vì bệnh kiết lỵ, thọ 58 tuổi. Nguyễn Ánh đích thân cử quốc tang, đưa linh cữu về an táng ở Gia Định, khu mộ mà dân gian gọi là Lăng Cha Cả.',
    image: '/images/lang_cha_ca.jpg',
    imageCaption: 'Lăng Cha Cả tại Gia Định — nơi an táng Đức cha Bá Đa Lộc sau khi ngài mất tại mặt trận Thị Nại năm 1799. Ảnh tư liệu.',
    source: 'Quốc triều chánh biên toát yếu; Đại Nam thực lục, Chính biên, Đệ nhất kỷ',
    refs: [
      'Quốc Sử Quán triều Nguyễn, Đại Nam thực lục, Chính biên, Đệ nhất kỷ; Quốc triều chánh biên toát yếu.',
      'A. Launay, Histoire de la Mission de Cochinchine, t. III — thư của các thừa sai về cái chết của Đức cha Bá Đa Lộc.',
      'IRFA, hồ sơ thừa sai PIGNEAU DE BEHAINE Pierre, irfa.paris.'
    ]
  },

  'ba-giong': {
    id: 'ba-giong',
    doTinCay: 'Có văn khố',
    gocKhuat: [
      { title: 'Con số 25 hay 27 vị, và chuyện tên tuổi đã mất', body: 'Cha Théodule Hamon ghi lại 25 vị bô lão bị bắt và xử tại gò Chết Chém, cộng thêm hai người chết khi trốn chạy, thành 27 vị. Nhưng đó là con số của những người có chức việc trong họ đạo — tức những người có tên trong sổ sách. Số giáo dân thường chết trong đêm vây làng, khi vượt sông, hoặc sau đó trong lưu đày thì không ai đếm được. Cuốn sách của cha Hamon in năm 1882, mười năm sau khi ngài quy tập hài cốt, và hai mươi năm sau biến cố.' },
      { title: 'Không một vị nào trong số họ được tuyên thánh', body: 'Trong 117 vị được tôn phong năm 1988 có cha Phêrô Nguyễn Văn Lựu, cha sở Ba Giồng, nhưng không có các bô lão và giáo dân bị tàn sát năm 1862 tại chính họ đạo của ngài. Lý do là hồ sơ: cần nhân chứng, cần biên bản, cần chứng cứ về động cơ tử đạo cho từng người. Ba Giồng vì thế là ví dụ cụ thể nhất cho khoảng cách giữa số người chết vì đạo và số người được ghi tên.' },
    ],
    type: 'Địa danh',
    name: 'Ba Giồng',
    altName: 'Tân Lý Tây, Châu Thành, Tiền Giang',
    period: 'Từ giữa thế kỷ XVII',
    description: 'Họ đạo cổ nhất của vùng đất nay là Giáo phận Mỹ Tho, và là điểm mà Chương II của bản khảo cứu này bắt đầu. Tại đây còn những ngôi mộ cổ khắc thập giá có niên đại 1663 — tức chỉ bốn năm sau tông sắc lập Hạt Đại diện Tông toà Đàng Trong. Trong cuộc bách hại năm 1862, giáo dân Ba Giồng bị tàn sát; năm 1872 cha Théodule Hamon quy tập hài cốt các vị tử đạo và năm 1882 cho xuất bản tập sách Martyre de vingt-sept Chrétiens kể lại biến cố, kèm những bản khắc hình nay là tư liệu hình ảnh sớm nhất về vùng này.',
    source: 'Th. Hamon, Martyre de vingt-sept Chrétiens (1882)',
    refs: [
      'Th. Hamon (MEP), Martyre de vingt-sept Chrétiens, 1882 — kèm các bản khắc minh hoạ.',
      'Văn khố Hội Thừa sai Paris (AMEP), phông Cochinchine occidentale.',
      'Toà Giám mục Mỹ Tho, Kỷ yếu Giáo phận Mỹ Tho — hồ sơ họ đạo Ba Giồng.'
    ]
  },

  'phu-xuan': {
    id: 'phu-xuan',
    doTinCay: 'Có văn khố',
    type: 'Địa danh',
    name: 'Phú Xuân (Huế)',
    period: 'Từ 1687; kinh đô triều Nguyễn 1802 – 1945',
    description: 'Thủ phủ các chúa Nguyễn từ năm 1687 và kinh đô của triều Nguyễn từ 1802. Đây là nơi ký gần như toàn bộ các văn bản đã định đoạt số phận Giáo hội Việt Nam trong hai thế kỷ: lệnh trục xuất thừa sai năm 1750 của Võ Vương, dụ cấm đạo ngày 06/01/1833 của vua Minh Mạng, và Chiếu Phân Sáp ngày 05/08/1861 của vua Tự Đức. Cũng chính tại đây, các phái đoàn Pháp lần lượt tới thương thuyết — và khi thương thuyết thất bại thì tàu chiến nổ súng ở Đà Nẵng.',
    source: 'Đại Nam thực lục; Khâm Định Đại Nam Hội Điển Sự Lệ',
    refs: [
      'Quốc Sử Quán triều Nguyễn, Đại Nam thực lục, Chính biên — các Đệ nhất đến Đệ tứ kỷ.',
      'Khâm Định Đại Nam Hội Điển Sự Lệ, Nội các triều Nguyễn.',
      'Trung tâm Lưu trữ Quốc gia I, Châu bản triều Nguyễn — bản gốc có ngự phê của các vua.'
    ]
  },

  /* ─────────────── NHÂN VẬT ─────────────── */

  'thay-giang': {
    id: 'thay-giang',
    type: 'Sự kiện',
    name: 'Tổ chức Thầy Giảng',
    altName: 'Catechistae — thành lập tại Đàng Ngoài, khoảng 1630',
    period: 'Từ khoảng năm 1630',
    doTinCay: 'Có văn khố',
    description: 'Sáng kiến mục vụ quan trọng nhất mà cha Alexandre de Rhodes để lại, và cũng là thứ ít được nhắc nhất. Đây là những giáo dân nam độc thân, khấn dâng mình trọn đời, được huấn luyện để dạy giáo lý, chuẩn bị người dự tòng, rửa tội khi cần và coi sóc cộng đoàn — làm gần như mọi việc của một linh mục, trừ việc cử hành Thánh Lễ và ban các bí tích dành riêng cho chức linh mục.',
    sections: [
      { title: 'Vì sao phải có tổ chức này', body: 'Vì thừa sai ngoại quốc có thể bị trục xuất bất cứ lúc nào, mà linh mục người Việt thì tới năm 1668 mới có. Trong khoảng trống ấy, nếu không có một lớp người bản xứ đứng ra gánh vác thì cộng đoàn tan ngay sau chuyến tàu chở thừa sai rời bến. Cha Đắc Lộ lập tổ chức này chính là để chuẩn bị cho ngày ngài bị đuổi — và ngài bị đuổi thật, năm 1630.' },
      { title: 'Người tử đạo đầu tiên là một thầy giảng', body: 'Anrê Phú Yên, mười chín tuổi, khấn dâng mình trong tổ chức Thầy Giảng ngày 31/7/1643 và bị xử trảm ngày 26/7/1644. Người Công giáo Việt Nam đầu tiên đổ máu vì đức tin không phải một linh mục hay một giám mục, mà là một giáo dân trẻ thuộc tổ chức này.' }
    ],
    gocKhuat: [
      { title: 'Gánh phần nguy hiểm nhất, nhận phần ghi công ít nhất', body: 'Trong ba thế kỷ bách hại, người bị bắt trước tiên thường không phải thừa sai ngoại quốc — vì các vị ấy trốn được, có nơi ẩn náu và đôi khi có bảo hộ ngoại giao — mà là các thầy giảng và giáo dân địa phương, những người không thể trốn khỏi chính làng mình. Nhưng phần lớn tên tuổi họ không được ghi lại, vì thư từ gửi về châu Âu chủ yếu kể về các thừa sai.' },
      { title: 'Mô hình bị quên khi có đủ linh mục', body: 'Khi hàng giáo sĩ bản quốc lớn mạnh dần từ thế kỷ XIX, vai trò thầy giảng thu hẹp lại rồi gần như biến mất khỏi cơ cấu chính thức. Điều đáng chú ý là hơn ba trăm năm sau, Công Đồng Vatican II lại đặt lại đúng vấn đề mà cha Đắc Lộ đã giải quyết năm 1630: vai trò của giáo dân dấn thân trong đời sống Giáo hội.' }
    ],
    source: 'A. de Rhodes, Histoire du Royaume de Tunquin (1651)',
    refs: [
      'A. de Rhodes, Histoire du Royaume de Tunquin, Lyon, 1651 — mô tả việc lập tổ chức Thầy Giảng và công thức khấn hứa.',
      'A. de Rhodes, La glorieuse mort d’André, catéchiste de la Cochinchine, Paris, 1653.',
      'Đỗ Quang Chính, Lịch sử chữ Quốc ngữ 1620–1659, Sài Gòn, 1972.'
    ]
  },

  'marchand-co-du': {
    id: 'marchand-co-du',
    type: 'Nhân vật',
    name: 'Thánh Joseph Marchand (Cố Du)',
    altName: 'Joseph Marchand, MEP (1803 – 1835)',
    period: '1803 – 30/11/1835',
    doTinCay: 'Đang tranh luận',
    description: 'Thừa sai Hội Thừa sai Paris, người có mặt trong thành Phiên An suốt cuộc nổi dậy Lê Văn Khôi (1833 – 1835) và bị vua Minh Mạng xử lăng trì ngày 30/11/1835. Cái chết của ngài là bước ngoặt: từ đó triều Nguyễn không còn coi đạo Công giáo là một tà thuyết cần răn dạy, mà là một lực lượng chính trị có ngoại viện. Ngài được tuyên thánh trong số 117 vị ngày 19/6/1988.',
    sections: [
      { title: 'Bối cảnh cuộc nổi dậy', body: 'Năm 1833, Lê Văn Khôi — con nuôi Tả quân Lê Văn Duyệt — chiếm thành Phiên An ở Gia Định. Mục tiêu tuyên bố của cuộc nổi dậy là lật Minh Mạng và đưa An Hoà, con của hoàng tử Cảnh, lên ngôi. Hoàng tử Cảnh chính là người từng được Giám mục Bá Đa Lộc đưa sang Pháp năm 1783, và cả hai cha con đều là người Công giáo. Điều đó khiến cuộc nổi dậy, dù nguyên nhân chính là mâu thuẫn giữa Minh Mạng với phe Lê Văn Duyệt, mang màu sắc tôn giáo trong mắt triều đình.' },
      { title: 'Bản án hai tội danh', body: 'Thành thất thủ tháng 9/1835. Cố Du bị bắt khi vừa dâng lễ xong, bị nhốt trong cũi và tra tấn nhiều lần bằng kìm nung. Bản án của triều đình ghi rõ hai tội: là đạo trưởng, và tiếp tay Lê Văn Khôi. Ngài bị xử lăng trì ngày 30/11/1835.' }
    ],
    gocKhuat: [
      { title: 'Ngài có tham gia nổi dậy hay không — câu hỏi chưa có lời đáp dứt khoát', body: 'Theo lời khai của chính ngài dưới tra tấn, ngài chỉ dạy giáo lý, cầu nguyện và dâng lễ; khi Lê Văn Khôi ép ký những lá thư kêu gọi nổi dậy thì ngài đã đốt hết. Nhưng các ghi chép cũng cho thấy trong thành ngài được giao coi một trong sáu thớt voi chiến và đứng đầu khối giáo dân. Phía Giáo hội đọc đó là hoàn cảnh của một con tin bị giữ trong thành; phía triều đình đọc đó là bằng chứng cộng tác. Không có tài liệu nào giải quyết được dứt điểm, và trang này không giả vờ là có.' },
      { title: 'Hậu quả đổ lên đầu người không liên quan', body: 'Dù sự thật là gì, kết quả thực tế thì rõ: sau năm 1835, mọi giáo dân trên toàn cõi Đại Nam đều bị nhìn qua lăng kính vụ Phiên An. Các dụ cấm đạo 1836 và 1838 gay gắt hơn hẳn giai đoạn trước, và lập luận «người Công giáo là nội ứng» từ đó có chỗ đứng trong tư duy nhà nước — một lập luận sẽ còn được nhắc lại rất lâu, kể cả trong phản ứng của nhà nước Việt Nam trước lễ phong thánh năm 1988.' }
    ],
    source: 'Đại Nam thực lục, Chính biên, Đệ nhị kỷ; Hồ sơ 117 Thánh Tử Đạo Việt Nam',
    refs: [
      'Quốc Sử Quán triều Nguyễn, Đại Nam thực lục, Chính biên, Đệ nhị kỷ — bản án và diễn biến vụ thành Phiên An.',
      'Hội đồng Giám mục Việt Nam, Hồ sơ 117 Thánh Tử Đạo Việt Nam, 1988.',
      'IRFA, Notices biographiques — hồ sơ thừa sai MARCHAND Joseph, irfa.paris.',
      'Lưu ý: các nguồn Giáo hội và các nguồn sử học nhà nước mô tả vai trò của ngài trong thành Phiên An theo hai hướng khác nhau; mục này ghi cả hai.'
    ]
  },

  'pellerin': {
    id: 'pellerin',
    type: 'Nhân vật',
    name: 'Giám mục François-Marie Pellerin',
    altName: 'Đại diện Tông toà Bắc Đàng Trong (1813 – 1862)',
    period: '1813 – 1862',
    doTinCay: 'Có văn khố',
    description: 'Giám mục Hội Thừa sai Paris, Đại diện Tông toà Bắc Đàng Trong, và là nhân vật đứng ở đúng chỗ giao nhau giữa việc truyền giáo và cuộc xâm lược. Sau khi trốn khỏi Việt Nam trong cuộc bách hại của vua Tự Đức, ngài sang Pháp vận động can thiệp quân sự, tham gia uỷ ban nghiên cứu vấn đề Việt Nam do Napoléon III lập năm 1857, và năm 1858 có mặt trên chiến hạm chỉ huy Némésis bên cạnh tướng Rigault de Genouilly khi hạm đội Pháp – Tây Ban Nha nổ súng vào Đà Nẵng.',
    gocKhuat: [
      { title: 'Lời tiên đoán sai đã làm hại chính giáo dân', body: 'Giám mục Pellerin khẳng định với phía Pháp rằng đánh Đà Nẵng sẽ không khó vì giáo dân Việt Nam sẽ nổi lên ủng hộ. Điều đó đã không xảy ra: cộng đồng Công giáo không nổi dậy, quân Pháp sa lầy ở Đà Nẵng, và hậu quả duy nhất mà lời tiên đoán ấy tạo ra là củng cố đúng điều triều đình vẫn nghi ngờ — rằng người có đạo là nội ứng của giặc. Ba năm sau là Chiếu Phân Sáp.' },
      { title: 'Vì sao mục này phải có mặt trên một trang của giáo phận', body: 'Rất dễ kể lịch sử Giáo hội Việt Nam như một chuỗi tử đạo thuần khiết. Nhưng nếu chỉ kể thế thì không ai hiểu nổi vì sao suốt hơn một thế kỷ sau đó, cụm từ «đạo theo Tây» lại bám dai đến vậy. Nó bám được vì có những sự việc có thật để bám vào, và đây là một trong số đó. Ghi ra không phải để kết tội một người đã chết gần một trăm sáu mươi năm; ghi ra để những người chịu chết vì đức tin không bị lẫn với những người đã gọi tàu chiến tới.' }
    ],
    source: 'Văn khố Hội Thừa sai Paris (AMEP); GS Đinh Xuân Lâm, «Đà Nẵng trong ý đồ chiến lược của tư bản Pháp trước 1858»',
    refs: [
      'Đinh Xuân Lâm, «Đà Nẵng trong ý đồ chiến lược của tư bản Pháp trước chiến tranh xâm lược Việt Nam (1858)», Khoa Lịch sử, Trường ĐH KHXH&NV — ĐHQG Hà Nội.',
      'IRFA / AMEP, Notices biographiques — hồ sơ thừa sai PELLERIN François-Marie.',
      'Các nghiên cứu về Uỷ ban Nam Kỳ (Commission de la Cochinchine) do Napoléon III lập năm 1857.'
    ]
  },

  'diaz-sanjurjo': {
    id: 'diaz-sanjurjo',
    type: 'Nhân vật',
    name: 'Thánh José María Díaz Sanjurjo (Đức cha An)',
    altName: 'José María Díaz Sanjurjo, OP (1818 – 1857)',
    period: '1818 – 20/7/1857',
    doTinCay: 'Có văn khố',
    description: 'Giám mục Dòng Đaminh người Tây Ban Nha, Đại diện Tông toà Trung Đàng Ngoài, bị xử trảm tại pháp trường Bảy Mẫu, Nam Định ngày 20/7/1857 dưới triều vua Tự Đức. Ngài được tuyên thánh trong số 117 vị ngày 19/6/1988.',
    gocKhuat: [
      { title: 'Cái chết của ngài là cớ để Tây Ban Nha tham chiến', body: 'Sau khi ngài bị xử, chính phủ Tây Ban Nha lấy đó làm lý do đưa một lực lượng viễn chinh đặt dưới quyền điều động của Pháp cho chiến dịch trừng phạt Việt Nam. Đó là lý do vì sao cuộc tấn công Đà Nẵng năm 1858 là một cuộc tấn công của liên quân Pháp – Tây Ban Nha chứ không phải của riêng Pháp. Một vị giám mục chết vì đức tin, và cái chết ấy được chính phủ nước ngài dùng làm giấy phép cho một cuộc chiến — hai chuyện tách rời nhau trong ý hướng, nhưng dính chặt vào nhau trong hậu quả.' }
    ],
    source: 'Hồ sơ 117 Thánh Tử Đạo Việt Nam; Catholic-Hierarchy',
    refs: [
      'Hội đồng Giám mục Việt Nam, Hồ sơ 117 Thánh Tử Đạo Việt Nam, 1988.',
      'Catholic-Hierarchy, mục Bishop St. José María Díaz Sanjurjo.',
      'Các nghiên cứu về chiến dịch Nam Kỳ (Cochinchina Campaign) 1858 – 1862 và vai trò của lực lượng Tây Ban Nha.'
    ]
  },

  'hiep-uoc-versailles-1787': {
    id: 'hiep-uoc-versailles-1787',
    type: 'Sự kiện',
    name: 'Hiệp ước Versailles 1787',
    altName: 'Traité de Versailles, 28/11/1787',
    period: 'Ký ngày 28 tháng 11 năm 1787',
    doTinCay: 'Có văn khố',
    description: 'Văn kiện do Giám mục Pierre Pigneau de Behaine — Bá Đa Lộc — ký thay mặt Nguyễn Ánh với triều đình Louis XVI. Theo đó Pháp cấp tàu chiến và quân giúp Nguyễn Ánh giành lại ngôi, đổi lại Pháp được nhượng cửa biển Đà Nẵng và quần đảo Côn Lôn cùng quyền tự do buôn bán. Hiệp ước chưa bao giờ được thi hành: Toàn quyền Pondichéry là Thomas Conway được lệnh tuỳ nghi và đã từ chối cấp quân.',
    gocKhuat: [
      { title: 'Một tờ giấy chết được hồi sinh bảy mươi năm sau', body: 'Vì không được thi hành, hiệp ước 1787 lẽ ra chỉ là một chú thích trong sử. Nhưng đến giữa thế kỷ XIX, khi Pháp chuẩn bị can thiệp vào Việt Nam, chính văn bản này được đem ra viện dẫn như một cơ sở pháp lý cho yêu sách về Đà Nẵng — nghĩa là chữ ký của một giám mục thay mặt một vương tôn lưu vong trở thành lập luận cho hạm đội năm 1858.' },
      { title: 'Người ký không có tư cách nhà nước', body: 'Nguyễn Ánh lúc ấy không phải vua của một quốc gia được thừa nhận, mà là người đứng đầu một lực lượng đang thua trận và lưu vong. Bá Đa Lộc thì là một giáo sĩ, không phải sứ thần. Về mặt công pháp, đây là một văn kiện có vấn đề ngay từ đầu — điều đó không ngăn nó gây hậu quả thật.' },
      { title: 'Không có nó thì có lẽ cũng không có triều Nguyễn', body: 'Mặt còn lại phải nói cho công bằng: khi Pháp bỏ rơi hiệp ước, Bá Đa Lộc tự quyên tiền, mua tàu và mộ sĩ quan tình nguyện. Số người Pháp ấy — Chaigneau, Vannier, Dayot và những người khác — góp phần đáng kể vào việc hiện đại hoá thuỷ quân của Nguyễn Ánh và vào chiến thắng cuối cùng năm 1802. Lịch sử ở đây không có phía nào sạch sẽ hoàn toàn.' }
    ],
    source: 'Archives Nationales, Paris; Đại Nam thực lục, Chính biên, Đệ nhất kỷ',
    refs: [
      'Bản gốc Hiệp ước Versailles ngày 28/11/1787 — Archives Nationales, Paris.',
      'A. Launay, Histoire de la Mission de Cochinchine 1658–1823, Paris, 1925, t. III.',
      'Quốc Sử Quán triều Nguyễn, Đại Nam thực lục, Chính biên, Đệ nhất kỷ.'
    ]
  },

  'hoa-uoc-nham-tuat-1862': {
    id: 'hoa-uoc-nham-tuat-1862',
    type: 'Sự kiện',
    name: 'Hoà ước Nhâm Tuất (1862)',
    altName: 'Hiệp ước Sài Gòn, ký ngày 05/6/1862',
    period: 'Ký ngày 5 tháng 6 năm 1862',
    doTinCay: 'Có văn khố',
    description: 'Hoà ước triều Nguyễn ký với Pháp và Tây Ban Nha, nhượng ba tỉnh miền Đông Nam Kỳ là Biên Hoà, Gia Định, Định Tường cùng đảo Côn Lôn, bồi thường chiến phí, mở ba cửa biển cho tàu buôn — và cam kết để dân theo đạo Gia Tô được tự do hành đạo. Cuối năm 1862, vua Tự Đức ban dụ bãi bỏ toàn bộ các lệnh cấm đạo trước đó.',
    gocKhuat: [
      { title: 'Tự do tôn giáo đến bằng nòng súng, và cái giá kéo dài một thế kỷ', body: 'Điều mà ba trăm năm cầu nguyện và hàng vạn cái chết không giành được thì bốn năm tàu chiến giành được. Kể từ 1862, người Công giáo Việt Nam có tự do hành đạo, nhưng thứ tự do ấy nằm trong cùng một văn bản với việc mất ba tỉnh Nam Kỳ. Từ đó, mọi lập luận cho rằng đạo Công giáo là công cụ của ngoại bang đều có một tờ hoà ước để chỉ vào. Đây là gốc rễ sâu nhất của mối nghi kỵ kéo dài suốt thế kỷ XX.' },
      { title: 'Định Tường — tức Mỹ Tho — nằm ngay trong ba tỉnh bị nhượng', body: 'Điều này không phải chuyện xa xôi với vùng đất của giáo phận này. Định Tường là một trong ba tỉnh bị cắt cho Pháp theo hoà ước. Nghĩa là ở đúng nơi mà năm 1861 cha Phêrô Nguyễn Văn Lựu bị xử trảm ngoài thành Mỹ Tho và giáo dân Ba Giồng bị tàn sát, thì chỉ một năm sau đã thành đất thuộc Pháp. Cùng một mảnh đất, hai vết thương chồng lên nhau trong vòng mười hai tháng.' },
      { title: 'Người Công giáo không phải bên đàm phán', body: 'Cần nói rõ để tránh một ngộ nhận phổ biến: hoà ước do triều đình Huế ký với chính phủ Pháp và Tây Ban Nha. Cộng đồng Công giáo Việt Nam không có đại diện, không được hỏi ý kiến và không có quyền quyết định gì trong đó. Họ nhận được tự do như một điều khoản trong bản hợp đồng của người khác — và sau đó phải mang tiếng vì chính điều khoản ấy.' }
    ],
    source: 'Đại Nam thực lục, Chính biên, Đệ tứ kỷ; văn bản Hoà ước Nhâm Tuất',
    refs: [
      'Hoà ước Nhâm Tuất (Traité de Saigon), ký ngày 05/6/1862 — nguyên văn Pháp ngữ và bản dịch.',
      'Quốc Sử Quán triều Nguyễn, Đại Nam thực lục, Chính biên, Đệ tứ kỷ.',
      'Hội đồng Giám mục Việt Nam, Hồ sơ 117 Thánh Tử Đạo Việt Nam, 1988 — về việc chấm dứt bách hại.'
    ]
  },

  'lang-cha-ca': {
    id: 'lang-cha-ca',
    type: 'Địa danh',
    name: 'Lăng Cha Cả',
    altName: 'Khu mộ Giám mục Bá Đa Lộc, Gia Định — 1799 đến 1983',
    period: '1799 – 1983',
    doTinCay: 'Có văn khố',
    description: 'Khu mộ của Giám mục Pierre Pigneau de Behaine tại vùng Tân Sơn Nhất, Gia Định. Sau khi ngài mất tại mặt trận Thị Nại ngày 09/10/1799, Nguyễn Ánh cho đưa linh cữu về an táng với nghi thức quốc tang. Dân gian gọi khu mộ là Lăng Cha Cả, và cái tên ấy trở thành địa danh của cả một khu vực Sài Gòn — đến nay vòng xoay ở đó vẫn mang tên này, dù ngôi mộ đã không còn.',
    gocKhuat: [
      { title: 'Ngôi mộ bị giải toả năm 1983, di cốt được đưa về Pháp', body: 'Năm 1980 có quyết định giải toả khu mộ; ngày 02/3/1983 công trình bị phá dỡ và việc cải táng hoàn tất. Di cốt của Giám mục Bá Đa Lộc được bàn giao cho Tổng lãnh sự Pháp để đưa về Pháp, và được an táng tại nhà nguyện Chủng viện Hội Thừa sai Paris ở phố Bac. Người từng được một hoàng đế Việt Nam cử quốc tang, gần hai trăm năm sau rời khỏi đất Việt trong im lặng.' },
      { title: 'Một địa danh còn lại sau khi vật thể đã mất', body: 'Điều đáng chú ý là cái tên vẫn sống. Hàng triệu người Sài Gòn hôm nay đi qua vòng xoay Lăng Cha Cả mỗi ngày mà phần lớn không biết «Cha Cả» là ai, vì sao có lăng, và vì sao lăng không còn. Đây có lẽ là ví dụ rõ nhất cho thấy lịch sử Công giáo Việt Nam đã chìm sâu tới mức nào trong đời sống thường ngày — hiện diện khắp nơi dưới dạng tên gọi, mà gần như vô hình dưới dạng ký ức.' }
    ],
    image: '/images/lang_cha_ca.jpg',
    imageCaption: 'Lăng Cha Cả tại Gia Định — khu mộ Giám mục Bá Đa Lộc trước khi bị giải toả năm 1983. Ảnh tư liệu.',
    source: 'Đại Nam thực lục, Chính biên, Đệ nhất kỷ; tư liệu báo chí về việc giải toả năm 1983',
    refs: [
      'Quốc Sử Quán triều Nguyễn, Đại Nam thực lục, Chính biên, Đệ nhất kỷ — về quốc tang và việc an táng năm 1799.',
      'Tư liệu và ảnh về Lăng Cha Cả trước 1983; các bài khảo cứu trên báo VnExpress và Thanh Niên về lịch sử khu mộ.',
      'Văn khố Hội Thừa sai Paris (AMEP) — hồ sơ tiếp nhận di cốt năm 1983, nhà nguyện Chủng viện phố Bac, Paris.'
    ]
  },


  'i-ne-khu': {
    id: 'i-ne-khu',
    doTinCay: 'Đang tranh luận',
    sections: [
      { title: 'Toàn bộ bằng chứng: đúng một câu', body: 'Tất cả những gì lịch sử biết về người này nằm trong một câu duy nhất của Khâm Định Việt Sử Thông Giám Cương Mục, Chính biên, quyển XXXIII, tờ 6b: tháng 3 năm Nguyên Hoà nguyên niên, có người Tây Dương tên I-nê-khu đi đường biển lén vào giảng đạo Gia Tô ở Ninh Cường, Quần Anh và Trà Lũ. Không có tên dòng tu, không có tên thuyền, không có ngày tháng cụ thể, không có tên người đã rửa tội, không một dòng nào khác trong bất kỳ bộ sử nào.' },
      { title: 'Bộ sử ấy được viết sau đó ba trăm hai mươi năm', body: 'Cương Mục do Quốc Sử Quán triều Nguyễn biên soạn dưới triều Tự Đức, khởi từ khoảng 1856 và hoàn tất năm 1884 — tức là sự kiện năm 1533 được đặt bút ghi lại hơn ba thế kỷ sau khi nó được cho là đã xảy ra. Và chính các sử quan cũng không nhận đó là ghi chép của quốc sử: họ dẫn nguồn là «Dã Lục» — một thứ ghi chép tư nhân trong dân gian. Bản Dã Lục đó đến nay đã thất truyền, không ai còn đối chiếu được.' },
      { title: 'Vì sao Giáo hội Việt Nam vẫn giữ mốc này', body: 'Vì đây là điểm quy chiếu duy nhất được cả cộng đồng chấp nhận, và vì nó được chính bộ chính sử của nhà nước phong kiến ghi lại — nghĩa là ngay cả một triều đình đang cấm đạo cũng thừa nhận đạo đã có mặt từ năm ấy. Hội đồng Giám mục Việt Nam giữ 1533 trong Biên niên sử chính thức, và Giáo hội Việt Nam đang hướng tới năm 2033 để mừng 500 năm theo đúng mốc quy ước này.' },
    ],
    gocKhuat: [
      { title: 'Chi tiết này có thể bắt nguồn từ một cuốn sách chống đạo', body: 'Linh mục Võ Đình Đệ (Giáo phận Quy Nhơn) đã tổng hợp phản biện của các nhà nghiên cứu Chu Thiên, Đinh Xuân Lâm, Trần Thanh Ái và linh mục Bùi Đức Sinh, nêu khả năng chi tiết I-nê-khu không đến từ một ghi chép trung tính, mà có gốc từ «Tây Dương Gia Tô Bí Lục» — một cuốn sách công kích đạo Công giáo lưu hành thế kỷ XIX. Nếu đúng vậy thì cái mốc mà Giáo hội Việt Nam lấy làm năm khởi đầu lại đến từ ngòi bút của những người chống đạo. Đây là điều gần như không trang sử đạo nào ghi ra.' },
      { title: 'Không một văn khố châu Âu nào xác nhận', body: 'Nếu có một thừa sai tên Inácio hay Ignacio thật sự đến Đại Việt năm 1533, thì các dòng tu và các nhà nước bảo trợ ở châu Âu lẽ ra phải có dấu vết: danh sách người lên tàu, thư báo cáo về bề trên, sổ chi tiêu. Đến nay chưa tìm được gì trong văn khố Bồ Đào Nha, Tây Ban Nha hay Dòng Tên. Thêm một điểm khó: Dòng Tên chỉ được thành lập năm 1540, tức bảy năm sau mốc 1533, nên nếu có người ấy thì chắc chắn không phải tu sĩ Dòng Tên.' },
      { title: 'Cách đọc công bằng', body: 'Không thể nói mốc 1533 là bịa, cũng không thể nói nó đã được chứng minh. Nó là một cột mốc tưởng niệm được đồng thuận — giá trị của nó nằm ở chỗ cả một cộng đồng cùng nhận nhau qua nó, chứ không nằm ở chỗ nó đã qua kiểm chứng văn khố. Ghi rõ điều đó không làm mốc 1533 mất giá; ngược lại, nó cho thấy Giáo hội Việt Nam đủ tự tin để nói thật về chính điểm khởi đầu của mình.' },
    ],
    type: 'Nhân vật',
    name: 'I-nê-khu',
    altName: 'Có thể là Inácio (Bồ) hoặc Íñigo / Ignacio (Tây Ban Nha)',
    period: 'Được chép: tháng 3 năm Nguyên Hoà nguyên niên — 1533',
    description: 'Người mang cái tên duy nhất còn lại từ cột mốc khởi đầu của Giáo hội Công giáo Việt Nam — và cũng là người ta biết ít nhất. Khâm Định Việt Sử Thông Giám Cương Mục chép có "người Tây Dương tên là I-nê-khu" đi đường biển lén vào giảng đạo Gia Tô ở Ninh Cường, Quần Anh và Trà Lũ. Cái tên nhiều phần là lối phiên âm Hán–Việt của Inácio trong tiếng Bồ hay Íñigo / Ignacio trong tiếng Tây Ban Nha: ta biết ông có thể tên gì, mà không biết ông là ai, thuộc dòng tu nào, đi trên thuyền nào. Không một văn khố Bồ Đào Nha, Tây Ban Nha hay Dòng Tên nào cùng thời xác nhận chuyến đi này, và chính Cương Mục cũng ghi nguồn là "Dã Lục" — một ghi chép tư nhân nay đã thất truyền. Vì thế 1533 là cột mốc tưởng niệm được cả Giáo hội Việt Nam đồng thuận, chứ không phải một sự kiện đã kiểm chứng bằng văn khố.',
    image: '/images/ghvn_cuong_muc_trang_sach.jpg',
    imageCaption: 'Trang sách Cương Mục chép mốc năm 1533 và tên I-nê-khu — Chính biên, quyển XXXIII, tờ 6b. Nguồn: Wikimedia Commons, phạm vi công cộng.',
    source: 'Khâm Định Việt Sử Thông Giám Cương Mục, Chính biên, q. XXXIII, tờ 6b',
    refs: [
      'Quốc Sử Quán triều Nguyễn, Khâm Định Việt Sử Thông Giám Cương Mục, Chính biên, quyển XXXIII, tờ 6b — bản dịch Viện Sử học.',
      'Lm. Võ Đình Đệ, "Thực hư có giáo sĩ I-nê-xu lén truyền giáo ở Đại Việt năm 1533", gpquinhon.org — tổng hợp phản biện của Chu Thiên, Đinh Xuân Lâm, Trần Thanh Ái, Lm. Bùi Đức Sinh.',
      'Ofmvn.org, "Thừa sai I-nê-xu của sách Cương Mục và thừa sai I-nê-xu Dòng Phan Sinh".',
      'Hội đồng Giám mục Việt Nam, Biên niên sử Giáo hội Công giáo Việt Nam — vẫn giữ 1533 làm năm khởi đầu.'
    ]
  },

  'hien-thanh-tu-dao': {
    id: 'hien-thanh-tu-dao',
    doTinCay: 'Có văn khố',
    sections: [
      { title: 'Ai được ghi tên', body: '117 vị gồm 96 người Việt Nam, 11 thừa sai Tây Ban Nha Dòng Đaminh và 10 thừa sai Pháp thuộc Hội Thừa sai Paris. Trong số người Việt có 37 linh mục, còn lại là thầy giảng, chủng sinh và giáo dân thường — trong đó có phụ nữ, lý trưởng, lính, thợ may, người bán hàng. Các vị chịu chết rải suốt từ năm 1745 đến 1862, dưới thời chúa Trịnh, chúa Nguyễn, Tây Sơn và bốn đời vua triều Nguyễn.' },
      { title: 'Vì sao mãi tới 1988', body: 'Các án phong được mở từ thế kỷ XIX và các vị lần lượt được phong Chân phước qua bốn đợt: 1900, 1906, 1909 và 1951. Việc gộp tất cả lại thành một lễ tuyên thánh chung chỉ diễn ra ngày 19/6/1988 tại Quảng trường Thánh Phêrô, do Đức Gioan Phaolô II chủ sự — thành cuộc tuyên thánh đông người nhất trong một nghi lễ tính đến lúc đó.' },
    ],
    gocKhuat: [
      { title: 'Lễ phong thánh 1988 là một biến cố chính trị, không chỉ tôn giáo', body: 'Toà Thánh công bố quyết định phong thánh mà không báo trước cho nhà nước Việt Nam. Tháng 3/1988, ông Nguyễn Quang Huy, Trưởng ban Tôn giáo Chính phủ, gặp các giám mục và cảnh báo rằng việc phong thánh sẽ gây hậu quả nặng nề cho quan hệ giữa người Công giáo và phần còn lại của xã hội. Lập luận chính thức của phía nhà nước là nhiều vị trong danh sách gắn với thế lực thực dân châu Âu. Một chiến dịch tuyên truyền được mở, và cuối cùng không một giáo dân nào từ trong nước được phép sang Rôma dự lễ. Có giám mục — như Đức cha Phaolô Huỳnh Đông Các của Quy Nhơn — đã khuyên giáo dân không tổ chức mừng để tránh căng thẳng.' },
      { title: 'Con số 117 là phần lập được hồ sơ, không phải tổng số người chết', body: 'Muốn được ghi tên phải có hồ sơ: nhân chứng, biên bản, chứng cứ về động cơ tử đạo. Phần lớn những người chết trong ba thế kỷ bách hại không để lại thứ gì như thế — họ chết trong các đợt phân sáp, trong khi bị lưu đày, trong những vụ tàn sát cả làng như Ba Giồng năm 1862, và không ai kịp ghi tên. Con số 117 vì thế nói về khả năng lưu trữ của Giáo hội, chứ không nói về quy mô của cuộc bách hại.' },
      { title: 'Chân phước Anrê Phú Yên không nằm trong 117 vị', body: 'Người Công giáo Việt Nam đầu tiên đổ máu vì đức tin, tử đạo năm 1644, lại không có tên trong danh sách 1988 — thầy được tôn phong riêng, ở bậc Chân phước, ngày 05/3/2000. Đây là chi tiết rất hay bị nhầm trên các trang giáo xứ.' },
      { title: 'Ba mươi năm sau, cùng một sự kiện được kỷ niệm công khai trong nước', body: 'Điều đáng ghi nhận là căng thẳng ấy đã nguội. Các dịp kỷ niệm 25 năm và 30 năm ngày phong thánh về sau được tổ chức công khai tại Việt Nam. Ghi lại phản ứng năm 1988 không phải để khơi lại, mà vì nếu bỏ qua thì người đọc sẽ không hiểu vì sao suốt một thời gian dài cụm từ «các Thánh Tử Đạo Việt Nam» lại là một cụm từ nhạy cảm.' },
    ],
    type: 'Sự kiện',
    name: '117 Thánh Tử Đạo Việt Nam',
    altName: 'Lễ tuyên phong Hiển thánh, Rôma, 19/06/1988',
    period: 'Tôn phong ngày 19 tháng 6 năm 1988',
    description: 'Ngày 19/06/1988 tại Quảng trường Thánh Phêrô, Đức Gioan Phaolô II tôn phong Hiển thánh cùng lúc 117 vị tử đạo tại Việt Nam — cuộc tuyên thánh đông người nhất trong một nghi lễ của lịch sử Giáo hội cho tới lúc đó. Trong số đó có 96 người Việt Nam, 11 thừa sai Tây Ban Nha thuộc Dòng Đaminh và 10 thừa sai Pháp thuộc Hội Thừa sai Paris; các vị chịu chết dưới bốn triều đại và nhiều đời chúa, từ năm 1745 đến 1862. Con số này chỉ là phần được lập hồ sơ đầy đủ: ước tính tổng số tín hữu thiệt mạng trong ba thế kỷ bách hại lên tới hơn 130.000 người. Giáo phận Mỹ Tho có Thánh Phêrô Nguyễn Văn Lựu, cha sở Ba Giồng, bị xử trảm ngoài thành Mỹ Tho ngày 07/04/1861 — nay là Thánh Bổn Mạng của giáo phận. Lễ kính chung: ngày 24 tháng 11.',
    source: 'Acta Apostolicae Sedis 81 (1989); Hồ sơ 117 Thánh Tử Đạo Việt Nam',
    refs: [
      'Gioan Phaolô II, Bài giảng lễ tuyên phong Hiển thánh 117 vị tử đạo Việt Nam, Rôma, 19/06/1988 — vatican.va.',
      'Hội đồng Giám mục Việt Nam, Hồ sơ 117 Thánh Tử Đạo Việt Nam, 1988.',
      'Bộ Phong Thánh, hồ sơ án phong — Congregatio de Causis Sanctorum.',
      'Chân phước Anrê Phú Yên (1644) được tôn phong riêng ngày 05/03/2000, không nằm trong danh sách 117 vị.'
    ]
  },


  'alexandre-vii': {
    id: 'alexandre-vii',
    doTinCay: 'Có văn khố',
    type: 'Nhân vật',
    name: 'Đức Giáo hoàng Alexanđê VII',
    altName: 'Fabio Chigi (1599 – 1667), Giáo hoàng 1655 – 1667',
    period: 'Tại vị: 1655 – 1667',
    description: 'Vị Giáo hoàng đã ký hai văn kiện khai sinh cơ cấu Giáo hội tại Việt Nam: tông chiếu Apostolatus Officium (17/08/1658) bổ nhiệm François Pallu và Pierre Lambert de la Motte làm Giám mục, và tông sắc Super Cathedram Principis Apostolorum (09/09/1659) lập hai Hạt Đại diện Tông toà Đàng Ngoài và Đàng Trong. Trước khi lên ngôi, ngài là Sứ thần Toà Thánh tại Köln và tham dự đàm phán Hoà ước Westphalia. Ngài cũng là vị Giáo hoàng đã giao cho Bernini dựng hàng cột ôm vòng Quảng trường Thánh Phêrô (1656–1667).',
    image: '/images/tudien_dgh_alexandro_vii.jpg',
    imageCaption: 'Đức Alexanđê VII (Fabio Chigi), tranh của Giovanni Battista Gaulli — Il Baciccio. Nguồn: Wikimedia Commons, phạm vi công cộng.',
    source: 'J.N.D. Kelly, The Oxford Dictionary of Popes',
    refs: [
      'J.N.D. Kelly & M.J. Walsh, The Oxford Dictionary of Popes, Oxford University Press, 2010.',
      'Alexanđê VII, "Super Cathedram Principis Apostolorum", 09/09/1659.',
      'Catholic Encyclopedia (1913), mục "Pope Alexander VII".'
    ]
  },

  'gioan-xxiii': {
    id: 'gioan-xxiii',
    doTinCay: 'Có văn khố',
    type: 'Nhân vật',
    name: 'Thánh Giáo hoàng Gioan XXIII',
    altName: 'Angelo Giuseppe Roncalli (1881 – 1963), Giáo hoàng 1958 – 1963',
    period: 'Tại vị: 1958 – 1963',
    description: 'Vị Giáo hoàng đã ban Tông hiến Venerabilium Nostrorum ngày 24/11/1960 lập Hàng Giáo phẩm Việt Nam, và ba ngày sau ký sắc chỉ Quod Venerabiles Fratres khai sinh Giáo phận Mỹ Tho. Cùng năm ấy, ngài đang chuẩn bị Công Đồng Vatican II — công đồng mà chính ngài triệu tập và khai mạc ngày 11/10/1962, cuộc canh tân toàn diện nhất của Giáo hội trong thế kỷ XX. Ngài qua đời ngày 03/06/1963 và được tôn phong Hiển thánh ngày 27/04/2014.',
    image: '/images/tudien_dgh_gioan_xxiii.jpg',
    imageCaption: 'Thánh Giáo hoàng Gioan XXIII (Angelo Giuseppe Roncalli), ảnh chụp trong triều đại 1958–1963. Nguồn: Wikimedia Commons, phạm vi công cộng.',
    source: 'Acta Apostolicae Sedis; Annuario Pontificio',
    refs: [
      'Gioan XXIII, Tông hiến "Venerabilium Nostrorum", 24/11/1960 — AAS 53 (1961), tr. 346–350.',
      'Gioan XXIII, Sắc chỉ "Quod Venerabiles Fratres", 27/11/1960 — AAS 53 (1961), tr. 474.',
      'J.N.D. Kelly & M.J. Walsh, The Oxford Dictionary of Popes, Oxford University Press, 2010.'
    ]
  },

  'dac-lo': {
    id: 'dac-lo',
    doTinCay: 'Có văn khố',
    sections: [
      { title: 'Ba mươi năm, bốn lần bị trục xuất', body: 'Sinh tại Avignon năm 1593, vào Dòng Tên năm 1612, rời Lisbon năm 1619, tới Macao rồi vào Đàng Trong năm 1624. Năm 1627 ra Đàng Ngoài, bị trục xuất năm 1630. Trở lại Đàng Trong giai đoạn 1640–1645, bị bắt, bị kết án tử rồi giảm thành trục xuất vĩnh viễn. Về châu Âu vận động suốt gần mười năm, cuối đời bị cử đi Ba Tư và qua đời tại Isfahan ngày 05/11/1660, cách Việt Nam nửa vòng trái đất.' },
      { title: 'Ba cuốn sách năm 1651', body: 'Trong cùng một năm, nhà in Bộ Truyền Bá Đức Tin tại Rôma cho ra ba tác phẩm của ngài: «Dictionarium Annamiticum Lusitanum et Latinum» (từ điển Việt–Bồ–La), «Linguae Annamiticae seu Tunchinensis Brevis Declaratio» (sách văn phạm ngắn) và «Cathechismus pro iis qui volunt suscipere Baptismum» — tức Phép giảng tám ngày, cuốn sách văn xuôi đầu tiên in bằng chữ quốc ngữ, in song song Latinh và quốc ngữ.' },
      { title: 'Công lớn nhất có lẽ không phải cuốn từ điển', body: 'Điều ngài làm có hậu quả lâu dài nhất là suốt những năm ở Rôma và Paris, ngài kiên trì thuyết phục Toà Thánh cử Giám mục sang Việt Nam — vì chỉ Giám mục mới truyền chức được, và chỉ khi có linh mục người Việt thì đạo mới sống sót qua những lần trục xuất người Âu. Nỗ lực ấy dẫn thẳng tới Hội Thừa sai Paris và tông sắc năm 1659. Chín năm sau tông sắc, bốn linh mục Việt Nam đầu tiên chịu chức.' },
    ],
    gocKhuat: [
      { title: 'Câu văn năm 1653 và cuộc tranh cãi chưa dứt', body: 'Trong «Divers voyages et missions» (Paris, 1653), cha Đắc Lộ viết ngài tin rằng nước Pháp, vương quốc đạo đức nhất thế giới, sẽ cấp cho ngài «plusieurs soldats» — nhiều chiến sĩ — để đi «chinh phục toàn cõi Đông phương», mà quy phục Chúa Giêsu Kitô, và nhất là ở đó ngài sẽ tìm được cách có các Giám mục. Người phê phán đọc câu này là lời mời quân đội Pháp sang phương Đông. Người bênh vực chỉ vào chính vế sau của câu — điều ngài xin là Giám mục — và vào ngữ cảnh tu đức thế kỷ XVII, nơi chữ «chiến sĩ» thường chỉ người rao giảng. Cuộc tranh luận này chưa có hồi kết và trang này không đứng về phía nào; điều tối thiểu phải làm là ghi rằng câu văn ấy có thật và đọc được theo hai cách.' },
      { title: 'Năm 2019: Đà Nẵng dừng đặt tên đường mang tên ngài', body: 'Cuối năm 2019, Sở Văn hoá và Thể thao Đà Nẵng lấy ý kiến cho đề án đặt tên gần 140 đường phố và công trình, trong đó có tên Alexandre de Rhodes và Francisco de Pina. Một nhóm nhà nghiên cứu văn hoá và lịch sử gửi kiến nghị phản đối, với lý do hai vị hoạt động trong bối cảnh thuộc địa. Thành phố quyết định dừng vô thời hạn việc đặt hai tên đường này. Đây là sự việc có thật, xảy ra gần đây, và cho thấy vị trí của cha Đắc Lộ trong ký ức người Việt tới nay vẫn chưa yên.' },
      { title: 'Ngài không phát minh ra chữ quốc ngữ', body: 'Cách nói «cha Đắc Lộ sáng chế chữ quốc ngữ» là một rút gọn sai. Người đặt nền là các thừa sai Bồ Đào Nha đi trước, đứng đầu là cha Francisco de Pina — chính thầy dạy tiếng Việt của ngài — cùng Gaspar do Amaral và António Barbosa, những người đã soạn các bản từ vựng Việt–Bồ và Bồ–Việt mà cha Đắc Lộ nói rõ trong lời tựa từ điển 1651 là ngài có dùng. Công của ngài là hệ thống hoá, bổ sung phần Latinh và đưa được cả công trình lên máy in ở Rôma — đủ lớn để không cần phóng đại thêm.' },
      { title: 'Những con số là do chính ngài đưa ra', body: 'Con số khoảng 6.700 người chịu phép rửa ở Đàng Ngoài trong ba năm, cũng như nhiều số liệu khác về giai đoạn này, đến từ chính các tường thuật của cha Đắc Lộ gửi về châu Âu — thể loại văn bản vừa là báo cáo vừa là vận động quyên góp và nhân sự. Không có nguồn độc lập đối chiếu. Nên đọc chúng như lời của người trong cuộc, không phải như số liệu thống kê.' },
      { title: 'Bị chính anh em cùng dòng phản đối', body: 'Việc ngài vận động Toà Thánh cử Giám mục người Pháp sang Đông phương đụng thẳng vào quyền bảo trợ của vương triều Bồ Đào Nha, và bị nhiều tu sĩ Dòng Tên Bồ Đào Nha ở Macao xem là phản bội. Đó là một lý do khiến bề trên cử ngài đi Ba Tư năm 1654 thay vì để ngài tiếp tục việc Đông Á. Ngài chết ở Isfahan mà chưa bao giờ được trở lại Việt Nam.' },
    ],
    type: 'Nhân vật',
    name: 'Lm. Alexandre de Rhodes (Cha Đắc Lộ)',
    altName: 'Alexandre de Rhodes, S.J. (1593 – 1660)',
    period: '1593 – 1660',
    description: 'Thừa sai Dòng Tên sinh tại Avignon, đến Đàng Trong năm 1624, mở cửa Đàng Ngoài năm 1627 và bị trục xuất năm 1630; trở lại Đàng Trong 1640–1645 rồi bị trục xuất vĩnh viễn. Năm 1651 tại Rôma, nhà in Bộ Truyền Bá Đức Tin cho ra ba tác phẩm của ngài: Dictionarium Annamiticum Lusitanum et Latinum (Từ điển Việt–Bồ–La), sách văn phạm Linguae Annamiticae Brevis Declaratio và Phép giảng tám ngày — bộ ba khai sinh chữ Quốc ngữ in. Cần nói cho đúng: ngài là người hệ thống hoá và công bố, còn công đặt nền thuộc về các thừa sai Bồ Đào Nha trước đó, đứng đầu là cha Francisco de Pina. Công lớn thứ hai của ngài là suốt những năm ở châu Âu đã vận động Toà Thánh cử Giám mục cho Việt Nam để có thể truyền chức cho người bản xứ — nỗ lực dẫn thẳng tới Hội Thừa sai Paris và tông sắc 1659. Ngài qua đời tại Isfahan, Ba Tư, ngày 05/11/1660.',
    image: '/images/alexandre_de_rhodes.jpg',
    imageCaption: 'Chân dung cha Alexandre de Rhodes. Nguồn: Wikimedia Commons, phạm vi công cộng.',
    source: 'Dictionarium Annamiticum Lusitanum et Latinum (Rôma, 1651)',
    refs: [
      'A. de Rhodes, Dictionarium Annamiticum Lusitanum et Latinum, Rôma, Typis Sacrae Congregationis de Propaganda Fide, 1651.',
      'A. de Rhodes, Divers voyages et missions, Paris, 1653; Histoire du Royaume de Tunquin, Lyon, 1651.',
      'Đỗ Quang Chính, Lịch sử chữ Quốc ngữ 1620–1659, Sài Gòn, 1972.',
      'Roland Jacques, Portuguese Pioneers of Vietnamese Linguistics, Orchid Press, 2002 — phân định lại công trạng giữa de Pina và de Rhodes.'
    ]
  },

  'francisco-de-pina': {
    id: 'francisco-de-pina',
    doTinCay: 'Có văn khố',
    sections: [
      { title: 'Người đầu tiên giảng bằng tiếng Việt không cần thông ngôn', body: 'Đến Đàng Trong năm 1617, de Pina học tiếng Việt theo cách không ai làm trước đó: sống trong dân, nghe người bản xứ nói, và tìm cách ghi lại đúng thanh điệu — thứ mà mọi thừa sai trước ngài đều bó tay. Trong một lá thư còn giữ được, ngài than rằng các anh em khác cứ giảng qua thông ngôn nên nói mãi không ai hiểu, và ngài cho rằng phải nắm được thanh điệu thì mới nói được tiếng này.' },
      { title: 'Trường dạy tiếng Việt đầu tiên', body: 'Tại Thanh Chiêm (Kẻ Chàm), dinh trấn Quảng Nam, ngài mở lớp dạy tiếng Việt cho các thừa sai mới tới. Hai học trò được nhắc đến nhiều nhất là Alexandre de Rhodes và António de Fontes, cả hai đến năm 1624. Ngôi trường đó, chứ không phải một thư phòng ở Rôma, mới là nơi chữ quốc ngữ thật sự thành hình.' },
    ],
    gocKhuat: [
      { title: 'Người làm nhiều nhất lại là người ít được nhắc nhất', body: 'De Pina chết đuối ở vịnh Đà Nẵng ngày 15/12/1625, mới bốn mươi tuổi, khi ra thuyền lấy hàng và bị lật thuyền — ngài biết bơi nhưng vướng áo dòng. Ngài chết trước khi kịp in bất cứ thứ gì mang tên mình. Toàn bộ vinh dự vì thế dồn cho người học trò biết viết sách và có đường tới nhà in Rôma. Mãi tới năm 2002, công trình «Portuguese Pioneers of Vietnamese Linguistics» của Roland Jacques — công bố và phân tích thủ bút của chính de Pina — mới trả lại tên cho ngài trong giới nghiên cứu quốc tế.' },
      { title: 'Năm 2019 tên ngài cũng bị gạt khỏi đề án đặt tên đường', body: 'Trong đề án đặt tên đường của Đà Nẵng năm 2019, tên Francisco de Pina được đề xuất cùng với Alexandre de Rhodes, và cũng bị dừng cùng lúc sau kiến nghị phản đối. Nghịch lý là ngài bị loại vì gắn với bối cảnh thuộc địa, dù ngài mất năm 1625 — hơn hai trăm ba mươi năm trước khi tàu chiến Pháp bắn vào Đà Nẵng, chính nơi ngài chết đuối.' },
    ],
    type: 'Nhân vật',
    name: 'Lm. Francisco de Pina',
    altName: 'Francisco de Pina, S.J. (1585 – 1625)',
    period: '1585 – 1625',
    description: 'Thừa sai Dòng Tên người Bồ Đào Nha, sinh tại Guarda, đến Đàng Trong năm 1617. Ngài là người phương Tây đầu tiên nói tiếng Việt thông thạo đến mức giảng đạo trực tiếp không cần thông ngôn, và là người đầu tiên dùng mẫu tự Latinh ghi âm tiếng Việt một cách có hệ thống — kể cả việc nhận ra và ký hiệu hoá các thanh điệu. Tại Thanh Chiêm (Kẻ Chàm) ngài mở lớp dạy tiếng Việt cho thừa sai; hai học trò nổi tiếng nhất là Alexandre de Rhodes và António de Fontes. Ngài chết đuối ở vịnh Đà Nẵng ngày 15/12/1625 khi ra thuyền lấy hàng, mới bốn mươi tuổi — trước khi kịp in bất cứ thứ gì mang tên mình.',
    source: 'Roland Jacques, Portuguese Pioneers of Vietnamese Linguistics (2002)',
    refs: [
      'Roland Jacques, Portuguese Pioneers of Vietnamese Linguistics prior to 1650, Bangkok, Orchid Press, 2002 — công bố và phân tích lá thư thủ bút của Francisco de Pina.',
      'Archivum Romanum Societatis Iesu (ARSI), Japonica-Sinica 69 — thư của F. de Pina, khoảng 1622–1623.',
      'Đỗ Quang Chính, Lịch sử chữ Quốc ngữ 1620–1659, Sài Gòn, 1972.'
    ]
  },

  'buzomi': {
    id: 'buzomi',
    doTinCay: 'Có văn khố',
    type: 'Nhân vật',
    name: 'Lm. Francesco Buzomi',
    altName: 'Francesco Buzomi, S.J. (1576 – 1639)',
    period: '1576 – 1639',
    description: 'Thừa sai Dòng Tên người Napoli, bề trên nhóm tu sĩ cập bến Cửa Hàn ngày 18/01/1615 — nhóm đã lập cơ sở truyền giáo thường trú đầu tiên trên đất Việt. Ngài phụ trách xứ truyền giáo Đàng Trong trong hơn hai mươi năm, qua nhiều đợt bị hạn chế và trục xuất, dựng các cộng đoàn ở Hội An, Nước Mặn và Thanh Chiêm. Ngài qua đời tại Macao năm 1639.',
    source: 'Archivum Romanum Societatis Iesu; Hội đồng Giám mục Việt Nam',
    refs: [
      'Archivum Romanum Societatis Iesu (ARSI), Japonica-Sinica — báo cáo thường niên của xứ truyền giáo Đàng Trong.',
      'C. Borri, Relatione della nuova missione, Rôma, 1631.',
      'Hội đồng Giám mục Việt Nam, Chronology of the Catholic Church in Vietnam, mục 18/01/1615.'
    ]
  },

  'anre-phu-yen': {
    id: 'anre-phu-yen',
    doTinCay: 'Có văn khố',
    gocKhuat: [
      { title: 'Thầy bị bắt thay cho người khác', body: 'Lệnh bắt của quan trấn thủ nhắm vào một thầy giảng lớn tuổi cũng tên Anrê. Khi lính tới không gặp người ấy, họ bắt thầy Anrê trẻ tuổi đang có mặt. Nghĩa là cái chết mở đầu cho toàn bộ danh sách tử đạo Việt Nam bắt đầu bằng một sự nhầm lẫn — hoặc, tuỳ cách nhìn, bằng việc một người trẻ nhận lấy phần của người khác.' },
      { title: 'Thi hài và thủ cấp đi hai hướng, không ở lại Việt Nam', body: 'Cha Đắc Lộ đưa thi hài xuống thuyền về Macao an táng, và mang thủ cấp về đặt tại nhà Bề trên Cả Dòng Tên ở Rôma. Người Công giáo Việt Nam đầu tiên chết vì đức tin trên đất Việt không có phần mộ nào trên đất Việt.' },
      { title: 'Không có tên trong danh sách 117 vị', body: 'Thầy được tôn phong riêng ở bậc Chân phước ngày 05/3/2000, tức là mười hai năm sau lễ tuyên thánh 117 vị năm 1988 và tới nay vẫn ở bậc Chân phước. Rất nhiều trang giáo xứ ghi nhầm thầy vào danh sách 117 Thánh Tử Đạo.' },
    ],
    type: 'Nhân vật',
    name: 'Chân phước Anrê Phú Yên',
    altName: 'Thầy giảng Anrê (khoảng 1625 – 1644)',
    period: 'Khoảng 1625 – 26/07/1644',
    description: 'Người Công giáo Việt Nam đầu tiên đổ máu vì đức tin. Quê Phú Yên, được cha Alexandre de Rhodes đưa về Hội An học năm 1642; ngày 31/07/1643 thầy cùng các bạn khấn dâng mình trọn đời phục vụ Giáo hội trong tổ chức Thầy Giảng. Bị bắt tại Quảng Nam thay cho một thầy giảng lớn tuổi hơn cùng tên, thầy bị xử trảm tại Kẻ Chàm ngày 26/07/1644, mới mười chín tuổi. Cha Đắc Lộ chứng kiến tận nơi, đưa thi hài về Macao an táng và mang thủ cấp về nhà Bề trên Cả Dòng Tên ở Rôma. Đức Gioan Phaolô II tôn phong Chân phước ngày 05/03/2000.',
    image: '/images/ghvn_cuong_muc_trang_sach.jpg',
    imageCaption: 'Trang Khâm Định Việt Sử Thông Giám Cương Mục ghi mốc 1533; đây là tư liệu bối cảnh lịch sử, không phải chân dung Anrê Phú Yên.',
    gallery: [
      {
        src: '/images/ghvn_map_cochinchina_1650.jpg',
        caption: 'Bản đồ Đàng Trong khoảng năm 1650, giúp định vị Quảng Nam, Thanh Chiêm và mạng lưới truyền giáo thời Anrê. Nguồn: Wikimedia Commons, phạm vi công cộng.'
      },
      {
        src: '/images/ghvn_cuong_muc_quyen_thu.jpg',
        caption: 'Quyển thủ Khâm Định Việt Sử Thông Giám Cương Mục, bộ quốc sử triều Nguyễn. Nguồn: Wikimedia Commons, phạm vi công cộng.'
      },
      {
        src: '/images/ghvn_cuong_muc_trang_sach.jpg',
        caption: 'Trang Cương Mục ghi mốc Nguyên Hòa nguyên niên và I-nê-khu; dùng để đặt Anrê trong chuỗi lịch sử buổi đầu, không phải chứng tích trực tiếp về ngài. Nguồn: Wikimedia Commons, phạm vi công cộng.'
      },
      {
        src: '/images/alexandre_de_rhodes.jpg',
        caption: 'Chân dung Alexandre de Rhodes, người chứng kiến cuộc tử đạo và viết tường thuật về Anrê. Nguồn: Wikimedia Commons, phạm vi công cộng.'
      },
      {
        src: '/images/ghvn_alexandre_de_rhodes.jpg',
        caption: 'Một bản chân dung khác của Alexandre de Rhodes trong bộ tư liệu lịch sử. Nguồn: Wikimedia Commons, phạm vi công cộng.'
      },
      {
        src: '/images/ghvn_divers_voyages_1653.jpg',
        caption: 'Bìa Divers voyages et missions (Paris, 1653), sách có các tường thuật truyền giáo thế kỷ XVII. Nguồn: Wikimedia Commons, phạm vi công cộng.'
      },
      {
        src: '/images/ghvn_dictionarium_1651.jpg',
        caption: 'Bìa Dictionarium Annamiticum Lusitanum et Latinum (Rôma, 1651), tư liệu cùng thời kỳ truyền giáo tại Đàng Trong. Nguồn: Wikimedia Commons, phạm vi công cộng.'
      },
      {
        src: '/images/tu_dien_viet_bo_la_1651.jpg',
        caption: 'Một bản hình khác của Từ điển Việt-Bồ-La năm 1651. Đây là tư liệu ngôn ngữ liên quan bối cảnh, không phải thánh tích của Anrê.'
      },
      {
        src: '/images/ruins_st_pauls.jpg',
        caption: 'Di tích nhà thờ Thánh Phaolô tại Macao, nơi truyền thống tư liệu ghi thi hài Anrê được đưa về an táng. Ảnh hiện trạng, không phải ảnh ngôi mộ thế kỷ XVII.'
      },
      {
        src: '/images/lichsu_ba_giong_lang_1882_hires.jpg',
        caption: 'Bản khắc làng Ba Giồng năm 1882, tư liệu hình ảnh sớm về một cộng đoàn Công giáo Nam Bộ sau thời Anrê; không phải nơi tử đạo của Anrê.'
      },
      {
        src: '/images/lichsu_ba_giong_martyre_1882_hires.jpg',
        caption: 'Bản khắc cuộc tử đạo Ba Giồng năm 1862, in năm 1882. Đưa vào để phân biệt truyền thống tử đạo Nam Bộ về sau với cuộc tử đạo Anrê năm 1644.'
      },
      {
        src: '/images/lichsu_ba_giong_fuite_1882_hires.jpg',
        caption: 'Bản khắc giáo hữu Ba Giồng tháo chạy năm 1862, thuộc lớp tư liệu thế kỷ XIX, không phải thánh tích trực tiếp của Anrê.'
      },
      {
        src: '/images/lichsu_lmc_ba_giong_martyre_1882.jpg',
        caption: 'Bản in trên Les Missions Catholiques năm 1882 về Ba Giồng. Nguồn: Gallica (BnF).'
      },
      {
        src: '/images/lichsu_hoa_trai_bia_sach_1882.jpg',
        caption: 'Trang bìa sách Martyre de vingt-sept Chrétiens (Lyon, 1882), tư liệu về Ba Giồng và lịch sử tử đạo Nam Bộ thế kỷ XIX.'
      }
    ],
    source: 'A. de Rhodes, La glorieuse mort d’André, catéchiste (Paris, 1653)',
    refs: [
      'A. de Rhodes, La glorieuse mort d’André, catéchiste de la Cochinchine, Paris, 1653.',
      'Hồ sơ tuyên phong Chân phước — Bộ Phong Thánh, 2000.',
      'Hội đồng Giám mục Việt Nam, Biên niên sử Giáo hội Công giáo Việt Nam, mục 26/07/1644.'
    ]
  },

  'mep': {
    id: 'mep',
    doTinCay: 'Có văn khố',
    gocKhuat: [
      { title: 'Không thể tách hoàn toàn khỏi bộ máy thuộc địa', body: 'MEP là hội dòng đã đào tạo và gửi sang Việt Nam phần lớn các Giám mục Đại diện Tông toà, và cũng là hội dòng có nhiều người chết vì đạo nhất tại đây. Nhưng cùng lúc đó, một số thành viên của Hội — rõ nhất là Giám mục Pellerin trong uỷ ban của Napoléon III năm 1857 và trên chiến hạm Némésis năm 1858 — đã trực tiếp cổ vũ và tham gia can thiệp quân sự. Sau khi Pháp lập nền cai trị, các cơ sở của Hội hoạt động trong khuôn khổ chính quyền thuộc địa và hưởng sự bảo hộ của nó. Cả hai mặt đều có thật, và một trang khảo cứu tử tế phải để chúng cạnh nhau.' },
      { title: 'Nhưng chính MEP cũng là nơi giữ lại ký ức mà Việt Nam đã mất', body: 'Văn khố Hội Thừa sai Paris ở phố Bac, nay do Viện Nghiên cứu Pháp – Á quản lý, là kho tư liệu gốc lớn nhất còn lại về Giáo hội Việt Nam thời cấm đạo: thư từ, sổ rửa tội, bản đồ, ảnh chụp thế kỷ XIX. Rất nhiều điều người Việt hôm nay biết được về chính họ đạo của mình là nhờ những trang giấy được giữ ở Paris, sau khi bản gốc trong nước đã mất vì chiến tranh và thời gian.' },
    ],
    type: 'Nhân vật',
    name: 'Hội Thừa Sai Paris (MEP)',
    altName: 'Missions Étrangères de Paris — thành lập 1658 – 1663',
    period: 'Từ năm 1658',
    description: 'Hội các linh mục triều được lập tại Paris để đưa người sang Á Đông với một mục tiêu ghi rõ trong quy chế: đào tạo hàng giáo sĩ bản quốc, chứ không phải thay thế họ mãi mãi. Hội hình thành quanh François Pallu và Pierre Lambert de la Motte sau khi hai vị được bổ nhiệm Giám mục năm 1658; chủng viện ở phố Bac, Paris được vua Pháp công nhận năm 1663. Trong ba trăm năm sau đó, MEP là hội dòng in dấu sâu nhất lên lịch sử Giáo hội Việt Nam: gần như toàn bộ các Giám mục Đại diện Tông toà Đàng Trong và Đàng Ngoài đều là người của Hội, và văn khố của Hội tại Paris — nay do Viện Nghiên cứu Pháp–Á (IRFA) quản lý — là kho tư liệu gốc lớn nhất về Giáo hội Việt Nam thời cấm đạo.',
    source: 'Văn khố Hội Thừa sai Paris (AMEP); IRFA',
    refs: [
      'Văn khố Hội Thừa sai Paris (AMEP), 128 rue du Bac, Paris — phông Tonkin và Cochinchine.',
      'IRFA, Notices biographiques des missionnaires, irfa.paris — tiểu sử từng thừa sai.',
      'A. Launay, Histoire générale de la Société des Missions Étrangères, Paris, 1894, 3 tập.',
      'Hội đồng Giám mục Việt Nam, Chronology of the Catholic Church in Vietnam, mục 11/11/1659 và 1663.'
    ]
  },

  'padroado': {
    id: 'padroado',
    doTinCay: 'Có văn khố',
    gocKhuat: [
      { title: 'Truyền giáo đi chung thuyền với thương mại và súng đạn', body: 'Theo chế độ bảo trợ, vua Bồ Đào Nha vừa có quyền đề cử giám mục vừa có nghĩa vụ chi tiền và chở người. Hệ quả là suốt hơn một thế kỷ, thừa sai đến Việt Nam đi trên chính những con tàu chở hàng và vũ khí, và các chúa Nguyễn hiểu rất rõ điều đó — họ đón thừa sai vì muốn giữ mối buôn bán với người Bồ, chứ không phải vì mến đạo. Việc đạo và việc buôn dính vào nhau ngay từ ngày đầu, và không thể tách ra khi kể lại.' },
      { title: 'Cùng một hệ văn kiện đã chia đôi thế giới cho hai vương triều', body: 'Chuỗi văn kiện làm nền cho chế độ bảo trợ — Romanus Pontifex (1455), Inter Caetera (1493), Praecelsae Devotionis (1514) — cũng chính là chuỗi văn kiện mà giới nghiên cứu hiện đại gọi là «học thuyết khám phá», nền tảng pháp lý cho việc các cường quốc châu Âu chiếm hữu đất đai ngoài châu Âu. Đây là một chương mà chính Giáo hội ngày nay nhìn lại một cách phê phán.' },
    ],
    type: 'Sự kiện',
    name: 'Chế độ Bảo trợ Bồ Đào Nha (Padroado)',
    altName: 'Padroado Real — quyền bảo trợ truyền giáo của vua Bồ Đào Nha',
    period: 'Thế kỷ XV – XIX',
    description: 'Cơ chế qua đó Toà Thánh nhượng cho vua Bồ Đào Nha quyền — và nghĩa vụ — tổ chức, tài trợ và đề cử nhân sự cho các xứ truyền giáo trong vùng ảnh hưởng của mình, dựa trên chuỗi văn kiện Romanus Pontifex (1455), Inter Caetera (1493) và Praecelsae Devotionis (1514). Theo cơ chế ấy, Việt Nam thuộc quyền tài phán của Địa phận Malacca (1557) rồi Địa phận Macao (1576), và mọi thừa sai đến Việt Nam đều phải đi qua Lisbon hoặc Macao. Khi Bộ Truyền Bá Đức Tin lập các Hạt Đại diện Tông toà năm 1659 và cử Giám mục Pháp sang, xung đột tài phán bùng nổ và kéo dài hàng chục năm — đây là bối cảnh phải hiểu để đọc đúng những căng thẳng giữa các thừa sai Dòng Tên Bồ Đào Nha và các Giám mục MEP ở Đàng Trong cuối thế kỷ XVII.',
    source: 'Bullarium Patronatus Portugalliae Regum',
    refs: [
      'Bullarium Patronatus Portugalliae Regum in Ecclesiis Africae, Asiae atque Oceaniae, Lisbon, 1868–1879.',
      'Nicôla V, "Romanus Pontifex", 1455; Alexanđê VI, "Inter Caetera", 1493; Lêô X, "Praecelsae Devotionis", 1514.',
      'C. R. Boxer, The Portuguese Seaborne Empire 1415–1825, London, 1969.',
      'H. Chappoulie, Aux origines d’une Église: Rome et les missions d’Indochine au XVIIe siècle, Paris, 1943.'
    ]
  },

  'francisco-garcia': {
    id: 'francisco-garcia',
    doTinCay: 'Truyền thống',
    gocKhuat: [
      { title: 'Mốc 1723 dựa trên truyền khẩu nhiều hơn văn khố', body: 'Việc cha Francisco José García là linh mục đầu tiên tới Mỹ Tho, Cái Mơn, Cái Nhum và Cái Bè từ năm 1723 được nhắc lại trong nhiều tài liệu của giáo phận, nhưng dấu vết trong văn khố Dòng Phanxicô rất mỏng. Lý do dễ hiểu: ngài hoạt động đúng vào giai đoạn Quốc Chúa Nguyễn Phúc Chu đang thi hành các lệnh cấm đạo, nên mọi việc phải làm lén và ghi chép càng ít càng an toàn. Nhưng lý do dễ hiểu không biến truyền khẩu thành văn khố, và mục này ghi rõ điều đó.' },
    ],
    type: 'Nhân vật',
    name: 'Lm. Francisco José García (OFM)',
    period: 'Đầu thế kỷ XVIII',
    description: 'Thừa sai Dòng Phanxicô người Tây Ban Nha, được ghi nhận là linh mục đầu tiên đặt chân tới vùng Mỹ Tho, Cái Mơn, Cái Nhum và Cái Bè từ năm 1723, tổ chức các cộng đoàn tín hữu sơ khai. Ngài hoạt động đúng vào giai đoạn Quốc Chúa Nguyễn Phúc Chu đang thi hành các lệnh cấm đạo — nghĩa là toàn bộ công việc phải làm lén, và đó là lý do dấu vết văn khố về giai đoạn này rất mỏng.',
    source: 'Biên niên sử Dòng Phanxicô tỉnh dòng Philippines',
    refs: [
      'Archivo Franciscano Ibero-Oriental (AFIO), Madrid — hồ sơ tỉnh dòng San Gregorio Magno, Philippines.',
      'Toà Giám mục Mỹ Tho, Kỷ yếu Giáo phận Mỹ Tho — phần lịch sử các họ đạo tiên khởi.',
      'Ofmvn.org, Lịch sử Dòng Phanxicô tại Việt Nam.'
    ]
  },

  'theodule-hamon': {
    id: 'theodule-hamon',
    doTinCay: 'Có văn khố',
    gocKhuat: [
      { title: 'Cuốn sách viết hai mươi năm sau, bởi một người không có mặt', body: '«Martyre de vingt-sept Chrétiens» in năm 1882, kể lại biến cố năm 1862 — hai mươi năm sau. Cha Hamon không chứng kiến vụ tàn sát; ngài tới Ba Giồng sau đó, thu thập lời kể của người sống sót và năm 1872 quy tập hài cốt. Đây là sử liệu quý nhất còn lại về biến cố ấy, và cũng là sử liệu duy nhất — nghĩa là gần như mọi điều người ta biết về Ba Giồng năm 1862 đều đi qua đúng một ngòi bút, của một thừa sai Pháp, viết cho độc giả Pháp, vào lúc Nam Kỳ đã thành thuộc địa.' },
    ],
    type: 'Nhân vật',
    name: 'Lm. Théodule Hamon (MEP)',
    period: 'Thế kỷ XIX',
    description: 'Linh mục Hội Thừa sai Paris, từng coi sóc họ đạo Mỹ Tho và Ba Giồng. Năm 1872 ngài quy tập hài cốt các vị tử đạo Ba Giồng, và năm 1882 cho xuất bản tập Martyre de vingt-sept Chrétiens thuật lại cuộc tàn sát năm 1862 — cùng với những bản khắc minh hoạ nay là tư liệu hình ảnh sớm nhất còn lại về vùng đất này.',
    source: 'Th. Hamon, Martyre de vingt-sept Chrétiens (1882)',
    refs: [
      'Th. Hamon (MEP), Martyre de vingt-sept Chrétiens, 1882.',
      'IRFA, Notices biographiques — hồ sơ thừa sai HAMON Théodule, irfa.paris.',
      'Văn khố Hội Thừa sai Paris (AMEP), phông Cochinchine occidentale.'
    ]
  }
};

/**
 * Khung chân dung nhân vật. Nhiều cha sở thời sơ khai (1860–1956) không còn
 * ảnh tư liệu nào trong kho lưu trữ MEP/IRFA; những trường hợp đó hiển thị ô
 * trống có chú thích thay vì mượn ảnh nhà thờ làm ảnh chân dung.
 */
export function PortraitFrame({
  src,
  name,
  width,
  height
}: {
  src?: string;
  name: string;
  width: number;
  height: number;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const frameStyle: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: width > 100 ? '10px' : '8px',
    overflow: 'hidden',
    position: 'relative',
    flexShrink: 0,
    border: '1.5px solid #B45309',
    backgroundColor: 'var(--color-input-bg)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  };

  if (src && failedSrc !== src) {
    return (
      <div style={frameStyle}>
        <Image
          src={src}
          alt={`Chân dung ${name}`}
          fill
          sizes={`${width}px`}
          style={{ objectFit: 'cover', objectPosition: 'top center' }}
          onError={() => setFailedSrc(src)}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        ...frameStyle,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        padding: '6px',
        textAlign: 'center',
        backgroundColor: 'rgba(180, 83, 9, 0.06)'
      }}
      role="img"
      aria-label={`Chưa có ảnh tư liệu của ${name}`}
      title="Chưa tìm được ảnh tư liệu xác thực"
    >
      <Cross size={width > 100 ? 28 : 22} color="#B45309" strokeWidth={1.6} />
      <span
        style={{
          fontSize: width > 100 ? '0.62rem' : '0.55rem',
          fontWeight: 700,
          lineHeight: 1.25,
          color: 'var(--color-subtle)'
        }}
      >
        Chưa có ảnh tư liệu
      </span>
    </div>
  );
}

export interface DetailedBioRecord {
  id: string;
  name: string;
  saintName: string;
  role: string;
  period: string;
  birth?: string;
  death?: string;
  origin: string;
  /** Nghề nghiệp hoặc bậc học ngoài đời — tách riêng, không lẫn vào chức vụ trong Xứ Đoàn. */
  nghe?: string;
  motto?: string;
  mottoLatin?: string;
  priestOrdination?: string;
  bishopConsecration?: string;
  consecrator?: string;
  /** Bỏ trống khi không có ảnh tư liệu xác thực — KHÔNG dùng ảnh thay thế. */
  image?: string;
  /** Một dòng dấu ấn mục vụ, hiển thị ở bảng niên biểu cha sở. */
  tableNote?: string;
  /** Xuất xứ thông tin, hiện dưới cột dấu ấn để người đọc tự thẩm định. */
  source?: string;
  shortDesc: string;
  chronology: { time: string; title: string; content: string }[];
  milestones: string[];
  /**
   * Công trình nổi bật do vị đó chủ trì hoặc khởi xướng. Chỉ ghi khi có tư
   * liệu xác thực — vị nào chưa tra được thì bỏ trống và khối này tự ẩn, thà
   * thiếu còn hơn gán cho một vị công trình không phải của mình.
   */
  /** Các chức vụ đã và đang đảm nhiệm — ghi rõ để người đọc không phải suy đoán. */
  offices?: string[];
  works?: {
    time: string;
    name: string;
    detail: string;
    /** Công trình đó ngày nay là gì / nằm ở đâu — giúp người đọc hình dung ngay. */
    now?: string;
  }[];
  quotes?: string;
}

export const BISHOPS_EXTENDED_DATA: DetailedBioRecord[] = [
  {
    id: 'duc-cha-tran-van-thien',
    name: 'Đức Cha Giuse Trần Văn Thiện',
    saintName: 'Thánh Giuse (Joseph)',
    role: 'Giám mục Tiên khởi Giáo phận Mỹ Tho',
    period: '1960 – 1989 (29 năm Giám mục)',
    birth: '01/10/1908 tại Ngũ Hiệp, huyện Cai Lậy, tỉnh Tiền Giang',
    death: '24/02/1989 tại Tòa Giám Mục Mỹ Tho (Hưởng thọ 81 tuổi)',
    origin: 'Cái Nhum, Vĩnh Long',
    motto: '“Phần rỗi trong Thánh Giá”',
    mottoLatin: 'Salus Animarum Suprema Lex',
    priestOrdination: '21/09/1935',
    bishopConsecration: '22/01/1961 tại Nhà thờ Đức Bà Sài Gòn',
    consecrator: 'Đức Tổng Giám Mục Phêrô Máctinô Ngô Đình Thục (Chủ phong)',
    offices: [
      'Giám mục Tiên khởi Giáo phận Mỹ Tho (1960 – 1989)',
      'Đấng sáng lập Tiểu Chủng viện Gioan XXIII Mỹ Tho',
      'Đấng thiết lập Dòng Mến Thánh Giá Mỹ Tho'
    ],
    image: '/images/bishop_1_tran_van_thien.jpg',
    shortDesc: 'Được Thánh Giáo hoàng Gioan XXIII bổ nhiệm làm Giám mục Tiên khởi ngày 24/11/1960. Ngài đặt nền móng cơ sở hạ tầng, thành lập Tiểu Chủng viện Gioan XXIII, quy tụ linh mục đoàn và kiến thiết giáo phận trong thời kỳ sơ khai đầy gian khó.',
    chronology: [
      {
        time: '1908 – 1928',
        title: 'Tu học và thụ phong Linh mục',
        content: 'Sinh trưởng trong một gia đình đạo đức tại Cái Nhum. Ngài gia nhập Tiểu Chủng viện Sài Gòn từ nhỏ, sau đó tiếp tục học triết học và thần học tại Đại Chủng viện Thánh Giuse Sài Gòn. Thụ phong linh mục ngày 21/09/1928 khi mới 20 tuổi (được Tòa Thánh chuẩn miễn tuổi).'
      },
      {
        time: '1928 – 1960',
        title: 'Mục vụ truyền giáo và Giáo sư Chủng viện',
        content: 'Phục vụ tại các họ đạo miền Tây Nam Bộ, làm giáo sư Chủng viện Sài Gòn, đào tạo nhiều thế hệ linh mục ưu tú cho Giáo hội Việt Nam.'
      },
      {
        time: '24/11/1960',
        title: 'Bổ nhiệm Giám mục Tiên khởi Mỹ Tho',
        content: 'Thánh Giáo hoàng Gioan XXIII ban hành Tông hiến Venerabilium Nostrorum thiết lập Giáo phận Mỹ Tho và bổ nhiệm Linh mục Giuse Trần Văn Thiện làm Giám mục Tiên khởi coi sóc tân giáo phận gồm 3 tỉnh Tiền Giang, Long An và Đồng Tháp.'
      },
      {
        time: '1961 – 1989',
        title: '29 năm kiên cường lèo lái Giáo phận',
        content: 'Thành lập Tiểu Chủng viện Gioan XXIII tại Mỹ Tho, thiết lập Dòng Nữ Tu Mến Thánh Giá Mỹ Tho, Dòng Con Đức Mẹ và hiệp nhất đoàn chiên vượt qua giai đoạn chiến tranh và thời kỳ khó khăn sau năm 1975.'
      }
    ],
    milestones: [
      'Sáng lập Tiểu Chủng viện Gioan XXIII Mỹ Tho.',
      'Thành lập và định hướng linh đạo Dòng Mến Thánh Giá Mỹ Tho.',
      'Phân chia 6 giáo hạt và quy hoạch mạng lưới các giáo xứ nông thôn.',
      'Giữ vững đức tin và phụng vụ thánh thiện cho cộng đoàn trong suốt 29 năm biến động lịch sử.'
    ],
    works: [
      {
        time: 'Thập niên 1960',
        name: 'Tiểu Chủng viện Gioan XXIII',
        detail:
          'Cơ sở đào tạo linh mục đầu tiên của Giáo phận Mỹ Tho non trẻ, mang tên vị Giáo hoàng đã ký sắc chỉ thành lập giáo phận năm 1960. Đây là nền móng cho hàng giáo sĩ bản xứ của giáo phận.'
      },
      {
        time: 'Thập niên 1960',
        name: 'Dòng Mến Thánh Giá Mỹ Tho',
        now: 'Hội dòng Mến Thánh Giá Mỹ Tho, vẫn đang phục vụ giáo phận',
        detail:
          'Thiết lập và định hướng linh đạo cho hội dòng nữ tu riêng của giáo phận, lực lượng nòng cốt trong giáo dục, y tế và mục vụ giáo xứ suốt các thập niên sau.'
      },
      {
        time: '1960 – 1989',
        name: 'Quy hoạch 6 giáo hạt',
        now: 'khung 6 giáo hạt mà Giáo phận Mỹ Tho về căn bản vẫn dùng',
        detail:
          'Phân chia toàn giáo phận thành 6 giáo hạt và quy hoạch mạng lưới giáo xứ nông thôn — khung tổ chức mục vụ mà Giáo phận Mỹ Tho về căn bản vẫn dùng đến nay.'
      }
    ]
  },
  {
    id: 'duc-cha-nguyen-van-nam',
    name: 'Đức Cha Anrê Nguyễn Văn Nam',
    saintName: 'Thánh Anrê Tông Đồ (Andrew)',
    role: 'Giám mục Chính tòa thứ II Giáo phận Mỹ Tho',
    period: '1989 – 1999 (Kế vị từ 1989, Giám mục Phó từ 1975)',
    birth: '22/02/1922 tại Thạnh Mỹ, Gia Định (Sài Gòn)',
    death: '16/03/2006 tại TP. Hồ Chí Minh (Hưởng thọ 84 tuổi)',
    origin: 'Thới Lai, Cần Thơ',
    motto: '“Vui mừng trong Thánh Giá Chúa Kitô”',
    mottoLatin: 'Crux Spes Unica',
    priestOrdination: '29/03/1952',
    bishopConsecration: '10/06/1975 (Giám mục phó Mỹ Tho); kế vị Giám mục chánh tòa 24/02/1989; nghỉ hưu 15/04/1999',
    consecrator: 'Đức Cha Giuse Trần Văn Thiện (Chủ phong)',
    offices: [
      'Giám mục Phó Giáo phận Mỹ Tho (bổ nhiệm 06/06/1975, tấn phong 10/06/1975)',
      'Giám mục Chính tòa Giáo phận Mỹ Tho (24/02/1989 – 15/04/1999)',
      'Nghỉ hưu từ năm 1999'
    ],
    image: '/images/bishop_nguyen_van_nam.jpg',
    shortDesc: 'Coi sóc giáo phận trong giai đoạn đất nước Đổi Mới. Ngài hết lòng củng cố sự hiệp thông, chăm lo đời sống thiêng liêng cho bà con giáo dân và xây dựng tình bác ái huynh đệ khắp các giáo xứ vùng sông nước miền Tây.',
    chronology: [
      {
        time: '1922 – 1953',
        title: 'Tu học và thụ phong Linh mục',
        content: 'Tu học tại Tiểu Chủng viện Cù Lao Giêng và Đại Chủng viện Thánh Giuse Sài Gòn. Thụ phong linh mục ngày 29/03/1953.'
      },
      {
        time: '24/07/1975',
        title: 'Bổ nhiệm Giám mục Phó Mỹ Tho',
        content: 'Đức Giáo hoàng Phaolô VI bổ nhiệm ngài làm Giám mục Phó Giáo phận Mỹ Tho với quyền kế vị để trợ giúp Đức Cha Giuse Trần Văn Thiện.'
      },
      {
        time: '1989 – 1999',
        title: 'Kế vị Giám mục Chính tòa Mỹ Tho',
        content: 'Kế vị chính thức ngày 24/02/1989. Ngài củng cố tinh thần hiệp nhất, mở lại các lớp huấn giáo đào tạo ơn gọi linh mục, tu sĩ và chăm lo cho các giáo điểm nghèo vùng sâu Đồng Tháp Mười.'
      },
      {
        time: '1999 – 2006',
        title: 'Nghỉ hưu và cầu nguyện',
        content: 'Trao quyền coi sóc cho Đức Cha Phaolô Bùi Văn Đọc vào năm 1999, ngài sống đời cầu nguyện âm thầm và an nghỉ trong Chúa ngày 16/03/2006.'
      }
    ],
    milestones: [
      'Gắn kết sự hiệp thông bền chặt giữa giáo sĩ và giáo dân sau năm 1975.',
      'Khôi phục các khóa tĩnh tâm, đào tạo tu sĩ và tái thiết cơ sở tôn giáo.',
      'Gương mẫu đời sống mục tử khó nghèo, hiền hòa và đầy tình phụ tử.'
    ]
  },
  {
    id: 'duc-hong-y-pham-minh-man',
    name: 'Đức Hồng Y Gioan Baotixita Phạm Minh Mẫn',
    saintName: 'Thánh Gioan Baotixita (John the Baptist)',
    role: 'Giám mục Phó Giáo phận Mỹ Tho (1993 – 1998) • Nguyên Tổng Giám Mục TGP Sài Gòn',
    period: '1993 – 1998 (Tại Mỹ Tho)',
    birth: '05/03/1934 tại Hòa Thành, Cà Mau',
    origin: 'Cà Mau',
    motto: '“Như Thầy yêu thương”',
    mottoLatin: 'Sicut Dilexi Vos (Ga 13,34)',
    priestOrdination: '25/05/1965 tại Nhà thờ Lớn Cần Thơ',
    bishopConsecration: '11/08/1993 tại Cần Thơ',
    consecrator: 'Đức Giám mục Emmanuel Lê Phong Thuận (Chủ phong)',
    offices: [
      'Giám mục Phó Giáo phận Mỹ Tho (1993 – 1998)',
      'Tổng Giám mục Tổng Giáo phận TP. Hồ Chí Minh (1998 – 2014)',
      'Hồng Y (được vinh thăng năm 2003)'
    ],
    image: '/images/bishop_3_pham_minh_man.jpg',
    shortDesc: 'Trong 5 năm phục vụ với cương vị Giám mục Phó Giáo phận Mỹ Tho, Ngài phụ trách công tác đào tạo chủng sinh, linh mục và xây dựng các chương trình bác ái Caritas trước khi được Tòa Thánh tấn phong Tổng Giám mục TGP Sài Gòn và thăng tước Hồng Y.',
    chronology: [
      {
        time: '1934 – 1965',
        title: 'Thời niên thiếu và tu nghiệp quốc tế',
        content: 'Tu học tại Tiểu Chủng viện Cù Lao Giêng, Chủng viện Nam Vang (Campuchia) và Đại học Loyola (Hoa Kỳ) chuyên ngành Sư phạm Giáo dục. Thụ phong linh mục ngày 25/05/1965.'
      },
      {
        time: '1993 – 1998',
        title: 'Giám mục Phó Giáo phận Mỹ Tho',
        content: 'Đức Giáo hoàng Gioan Phaolô II bổ nhiệm làm Giám mục Phó Mỹ Tho. Ngài đẩy mạnh công tác đào tạo thần học, phụ trách Giám đốc Đại Chủng viện Thánh Quý (Cần Thơ) và xây dựng mạng lưới bác ái xã hội.'
      },
      {
        time: '1998 – 2014',
        title: 'Tổng Giám Mục Tổng Giáo Phận Sài Gòn - TP.HCM',
        content: 'Chính thức nhậm chức Tổng Giám mục TGP Sài Gòn ngày 01/03/1998, lãnh đạo giáo phận lớn nhất cả nước trong giai đoạn hội nhập quốc tế.'
      },
      {
        time: '21/10/2003',
        title: 'Thăng tước Hồng Y Đẳng Linh Mục',
        content: 'Đức Thánh Cha Gioan Phaolô II vinh thăng ngài làm Hồng Y tước hiệu San Giustino, trở thành vị Hồng Y thứ 5 trong lịch sử Giáo hội Công giáo Việt Nam.'
      }
    ],
    milestones: [
      'Đặt nền tảng sư phạm thần học hiện đại cho Đại Chủng viện Thánh Quý.',
      'Xây dựng các nhịp cầu đối thoại văn hóa, giáo dục và bác ái giữa Giáo hội và Xã hội.',
      'Vị Hồng Y đầy lòng nhân ái, luôn kiên trì sống theo châm ngôn “Như Thầy yêu thương”.'
    ]
  },
  {
    id: 'duc-tgm-bui-van-doc',
    name: 'Đức Tổng Giám Mục Phaolô Bùi Văn Đọc',
    saintName: 'Thánh Phaolô Tông Đồ (Paul)',
    role: 'Giám mục Chính tòa thứ III Giáo phận Mỹ Tho (1999 – 2013) • Nguyên Chủ tịch HĐGMVN',
    period: '1999 – 2013 (Tại Mỹ Tho)',
    birth: '11/11/1944 tại Đà Lạt, Lâm Đồng',
    death: '06/03/2018 tại Rôma, Vatican (Hưởng thọ 74 tuổi)',
    origin: 'Đà Lạt (Gốc Quảng Bình)',
    motto: '“Chúa là nguồn vui của con”',
    mottoLatin: 'Dominus Lux Mea (Tv 27,1)',
    priestOrdination: '17/12/1970 tại Nhà thờ Chính Tòa Đà Lạt',
    bishopConsecration: '20/05/1999 tại Nhà thờ Chính Tòa Đà Lạt (bổ nhiệm 26/03/1999, nhận giáo phận 27/05/1999)',
    consecrator: 'Đức Tổng Giám mục Gioan Baotixita Phạm Minh Mẫn (Chủ phong)',
    offices: [
      'Giám mục Chính tòa Giáo phận Mỹ Tho (1999 – 2013)',
      'Tổng Giám mục Tổng Giáo phận TP. Hồ Chí Minh (bổ nhiệm 28/09/2013)',
      'Chủ tịch Hội đồng Giám mục Việt Nam (2013 – 2016)'
    ],
    image: '/images/bishop_4_bui_van_doc.jpg',
    shortDesc: 'Thời kỳ Ngài coi sóc ghi dấu những bước phát triển vượt bậc: xây dựng Tòa Giám mục mới, Trung tâm Mục vụ khang trang, cử hành Lễ Cung Hiến Nhà thờ Chánh Tòa Năm Thánh 2000 và truyền giáo mạnh mẽ tại Đồng Tháp Mười.',
    chronology: [
      {
        time: '1944 – 1970',
        title: 'Tu học thần học tại Rôma (Đại học Urbaniana)',
        content: 'Theo học tại Tiểu Chủng viện Thánh Giuse Sài Gòn và được cử sang Rôma du học tại Đại học Giáo hoàng Urbaniana, đạt thủ khoa Thần học Triết học. Thụ phong linh mục ngày 17/12/1970.'
      },
      {
        time: '1975 – 1999',
        title: 'Giám đốc Đại Chủng viện Minh Hòa Đà Lạt',
        content: 'Chuyên gia thần học hàng đầu, giáo sư tín lý tại các Đại Chủng viện Sài Gòn, Huế, Hà Nội và Giám đốc Chủng viện Minh Hòa.'
      },
      {
        time: '1999 – 2013',
        title: '14 năm Giám mục Chính tòa Giáo phận Mỹ Tho',
        content: 'Chính thức nhậm chức ngày 26/03/1999. Ngài xây dựng Tòa Giám mục mới, thiết lập Trung tâm Mục vụ, cử hành Lễ Cung Hiến Nhà thờ Chánh Tòa Năm Thánh 2000 và thành lập hàng loạt giáo xứ tại vùng Đồng Tháp Mười.'
      },
      {
        time: '2013 – 2018',
        title: 'Tổng Giám Mục Sài Gòn & Chủ tịch Hội Đồng Giám Mục',
        content: 'Đức Thánh Cha Phanxicô bổ nhiệm làm Tổng Giám mục TGP Sài Gòn và giữ trọng trách Chủ tịch HĐGMVN nhiệm kỳ 2013 – 2016.'
      }
    ],
    milestones: [
      'Xây dựng Tòa Giám Mục và Trung tâm Mục vụ Giáo phận Mỹ Tho bề thế.',
      'Cung hiến Nhà thờ Chính Tòa Mỹ Tho vào Năm Thánh 2000.',
      'Khai phá và gieo mầm Tin Mừng trên toàn vùng trũng Đồng Tháp Mười.',
      'Nhà thần học lỗi lạc với phong thái mục tử hân hoan, vui tươi đầy bình an.'
    ],
    works: [
      {
        time: '1999 – 2013',
        name: 'Tòa Giám Mục & Trung tâm Mục vụ Giáo phận',
        now: 'Tòa Giám mục và Trung tâm Mục vụ Giáo phận, 32 Hùng Vương',
        detail:
          'Xây dựng cơ sở điều hành và trung tâm huấn luyện của giáo phận tại 32 Hùng Vương, ngay bên cạnh Nhà thờ Chính Tòa — nơi quy tụ các khoá thường huấn linh mục, tu sĩ và giáo lý viên.'
      },
      {
        time: 'Năm Thánh 2000',
        name: 'Cung hiến Nhà thờ Chính Tòa Mỹ Tho',
        now: 'ngày cung hiến vẫn được Giáo xứ Chánh Tòa mừng hằng năm',
        detail:
          'Chủ sự nghi thức cung hiến ngôi thánh đường xây năm 1906 – 1910, chính thức thánh hiến nhà thờ mẹ của giáo phận đúng vào Đại Năm Thánh 2000.'
      }
    ]
  },
  {
    id: 'duc-cha-nguyen-van-kham',
    name: 'Đức Cha Phêrô Nguyễn Văn Khảm',
    saintName: 'Thánh Phêrô Tông Đồ (Peter)',
    role: 'Giám mục Chính tòa đương nhiệm Giáo phận Mỹ Tho (từ 2014)',
    period: '2014 – nay',
    source: 'Tiểu sử theo TGP Sài Gòn (tgpsaigon.net) — bài "Đức Giám mục Phêrô Nguyễn Văn Khảm nhận Giáo phận Mỹ Tho", 30/08/2014.',
    birth: '02/10/1952 tại Đàn Giản, Hà Đông (nay thuộc Hà Nội)',
    origin: 'Đàn Giản, Hà Đông (nay thuộc Hà Nội)',
    motto: '“Hãy theo Thầy”',
    mottoLatin: 'Sequere Me (Ga 21,22)',
    priestOrdination: '30/08/1980',
    bishopConsecration:
      'Bổ nhiệm Giám mục Phụ tá TGP TP.HCM 15/10/2008; tấn phong 15/11/2008 tại Đại Chủng viện Thánh Giuse TP.HCM',
    consecrator: 'Đức Hồng Y Gioan Baotixita Phạm Minh Mẫn (Chủ phong)',
    offices: [
      'Giám mục Chính tòa Giáo phận Mỹ Tho (bổ nhiệm 26/07/2014, nhận giáo phận 30/08/2014) — đương nhiệm',
      'Viện trưởng Học viện Công giáo Việt Nam (Toà Thánh bổ nhiệm, công bố ngày 14/09/2024) — đương nhiệm',
      'Chủ tịch Uỷ ban Tu sĩ trực thuộc Hội đồng Giám mục Việt Nam — đương nhiệm',
      'Thành viên Bộ Truyền Thông Toà Thánh Vatican',
      'Nguyên Tổng Thư ký Hội đồng Giám mục Việt Nam',
      'Nguyên Phó Tổng Thư ký HĐGMVN (2010 – 2013 và 2013 – 2016)',
      'Nguyên Chủ tịch Uỷ ban Giáo dục Công giáo (2009 – 2010) và Chủ tịch Uỷ ban Truyền thông Xã hội',
      'Nguyên Giám mục Phụ tá Tổng Giáo phận TP. Hồ Chí Minh (2008 – 2014), Giám đốc Trung tâm Mục vụ TGP Sài Gòn'
    ],
    image: '/images/bishop_5_nguyen_van_kham.jpg',
    shortDesc: 'Được bổ nhiệm làm Giám mục Chính tòa Mỹ Tho ngày 26/07/2014. Với tâm hồn mục tử sâu sắc, kiến thức thần học uyên bác và tài thuyết giảng truyền cảm hứng, Ngài không ngừng định hướng phụng vụ, đào tạo giáo dân và chăm lo ơn gọi toàn giáo phận.',
    chronology: [
      {
        time: '1952 – 1980',
        title: 'Tu học và thụ phong Linh mục',
        content:
          'Tu học tại Tiểu Chủng viện Thánh Giuse Sài Gòn và Đại Chủng viện Thánh Giuse. Thụ phong linh mục ngày 30/08/1980, sau đó làm linh mục phụ tá Giáo xứ Hà Đông, hạt Xóm Mới (1980 – 1983).'
      },
      {
        time: '2000 – 2004',
        title: 'Tiến sĩ Thần học Mục vụ tại Hoa Kỳ (CUA)',
        content: 'Du học tại Đại học Công giáo Hoa Kỳ (Catholic University of America) tại Washington D.C., bảo vệ xuất sắc luận án Tiến sĩ Thần học Mục vụ.'
      },
      {
        time: '2008 – 2014',
        title: 'Giám mục Phụ tá Tổng Giáo Phận Sài Gòn',
        content:
          'Tháng 3/2008 làm Thư ký điều hành Hội đồng Giám mục Việt Nam. Ngày 15/10/2008, Đức Giáo hoàng Bênêđictô XVI bổ nhiệm làm Giám mục Phụ tá Tổng Giáo phận TP.HCM; tấn phong ngày 15/11/2008 tại Đại Chủng viện Thánh Giuse TP.HCM do Đức Hồng Y Gioan Baotixita Phạm Minh Mẫn chủ phong. Ngài đồng thời làm Giám đốc Trung tâm Mục vụ TGP Sài Gòn.'
      },
      {
        time: '26/07/2014 – nay',
        title: 'Giám mục Chính tòa Giáo phận Mỹ Tho',
        content:
          'Ngày 26/07/2014, Đức Giáo hoàng Phanxicô bổ nhiệm ngài làm Giám mục Giáo phận Mỹ Tho; ngày 30/08/2014 ngài chính thức nhận giáo phận — cũng là ngày kỷ niệm 34 năm linh mục. Trong Hội đồng Giám mục Việt Nam, ngài từng là Phó Tổng Thư ký (2010 – 2013 và 2013 – 2016), Chủ tịch Uỷ ban Giáo dục Công giáo (2009 – 2010) và Chủ tịch Uỷ ban Truyền thông Xã hội, sau đó là Tổng Thư ký. Ngài được Tòa Thánh bổ nhiệm làm Thành viên Bộ Truyền Thông Vatican.'
      }
    ],
    milestones: [
      'Định hình nền tảng mục vụ phụng vụ và loan báo Tin Mừng sâu sắc cho Giáo phận.',
      'Thúc đẩy phong trào Thiếu Nhi Thánh Thể, Huynh Trưởng và Giới trẻ phát triển mạnh mẽ.',
      'Thành viên Bộ Truyền Thông Tòa Thánh Vatican đại diện cho Giáo hội Việt Nam.',
      'Nhà thuyết giảng thần học và Huấn giáo Kinh Thánh uyên bác hàng đầu Việt Nam.'
    ],
    works: [
      {
        time: 'Đặt viên đá 12/05/2023',
        name: 'Trung tâm Hành hương Ba Giồng',
        now: 'Trung tâm Hành hương Ba Giồng, nơi hành hương chính của Giáo phận Mỹ Tho',
        detail:
          'Công trình mới của trung tâm hành hương kính các Thánh Tử Đạo, tổng diện tích xây dựng khoảng 3.500 m², gồm một tầng trệt và hai tầng lầu mái ngói, có nhà nguyện kính Cha Phêrô Nguyễn Văn Lựu cùng hội trường và phòng triển lãm. Ba Giồng được nâng lên hàng trung tâm hành hương của giáo phận từ năm 2004; sau hơn hai mươi năm, nhà thờ cũ xuống cấp và không còn đủ chỗ đón khách hành hương.'
      }
    ]
  }
];

export const POPE_LEO_XIV_BIO: DetailedBioRecord = {
  id: 'duc-thanh-cha-leo-xiv',
  name: 'Đức Giáo Hoàng Lêô XIV (Pope Leo XIV)',
  saintName: 'Robert Francis Prevost, O.S.A.',
  role: 'Vị Giáo hoàng thứ 267 của Giáo hội Công giáo Hoàn Vũ (Đương nhiệm)',
  period: '2025 – nay',
  birth: 'Sinh ngày 14/09/1955 tại Chicago, bang Illinois, Hoa Kỳ',
  origin: 'Hoa Kỳ — mang thêm quốc tịch Peru sau nhiều năm truyền giáo tại đây',
  motto: '“Trong Đấng duy nhất, chúng ta nên một”',
  mottoLatin: 'In Illo uno unum',
  priestOrdination: 'Thụ phong linh mục ngày 19/06/1982, Dòng Thánh Augustinô (O.S.A.)',
  bishopConsecration: 'Tấn phong Giám mục cuối năm 2014, coi sóc giáo phận Chiclayo, Peru',
  image: '/images/pope_leo_xiv.jpg',
  source: 'Vatican News và Toà Thánh, tháng 5/2025; Annuario Pontificio.',
  shortDesc:
    'Đấng kế vị thứ 267 của Thánh Phêrô, đắc cử ngày 08/05/2025 sau khi Đức Phanxicô qua đời. Ngài là vị Giáo hoàng đầu tiên sinh tại Hoa Kỳ, tu sĩ Dòng Thánh Augustinô, và đã trải phần lớn đời linh mục làm thừa sai rồi Giám mục tại Peru trước khi về phục vụ Giáo triều Rôma.',
  offices: [
    'Bề trên Tổng quyền Dòng Thánh Augustinô (2001 – 2013)',
    'Giám mục giáo phận Chiclayo, Peru (2015 – 2023)',
    'Bộ trưởng Bộ Giám mục, Giáo triều Rôma (2023 – 2025)',
    'Hồng y (từ 30/09/2023)',
    'Giáo hoàng (từ 08/05/2025)'
  ],
  chronology: [
    {
      time: '1955 – 1982',
      title: 'Từ Chicago đến Dòng Thánh Augustinô',
      content:
        'Sinh tại Chicago năm 1955, ngài gia nhập Dòng Thánh Augustinô và thụ phong linh mục năm 1982. Dòng Augustinô lấy linh đạo hiệp nhất cộng đoàn làm nền — cũng chính là ý nghĩa khẩu hiệu ngài sẽ chọn sau này.'
    },
    {
      time: '1985 – 2013',
      title: 'Những năm truyền giáo tại Peru',
      content:
        'Phần lớn đời linh mục của ngài gắn với Peru: dạy học, coi xứ, đào tạo chủng sinh. Ngài nhận thêm quốc tịch Peru. Từ năm 2001 đến 2013 ngài làm Bề trên Tổng quyền của Dòng Thánh Augustinô trên toàn thế giới.'
    },
    {
      time: '2014 – 2023',
      title: 'Giám mục Chiclayo rồi Bộ trưởng Bộ Giám mục',
      content:
        'Được tấn phong Giám mục cuối năm 2014 và coi sóc giáo phận Chiclayo, Peru từ 2015. Năm 2023, Đức Phanxicô gọi ngài về Rôma làm Bộ trưởng Bộ Giám mục — cơ quan lo việc tuyển chọn giám mục cho toàn Giáo hội — và phong Hồng y ngày 30/09/2023.'
    },
    {
      time: '08/05/2025',
      title: 'Đắc cử Giáo hoàng thứ 267',
      content:
        'Sau khi Đức Phanxicô qua đời ngày 21/04/2025, Mật viện Hồng Y bầu ngài làm Giáo hoàng ngày 08/05/2025. Ngài chọn tông hiệu Lêô XIV, nối tiếp Đức Lêô XIII của Thông điệp Rerum Novarum — chọn lựa được hiểu như một lời tuyên bố về học thuyết xã hội của Giáo hội trước thời đại mới.'
    }
  ],
  milestones: [
    'Vị Giáo hoàng đầu tiên sinh tại Hoa Kỳ trong hai ngàn năm lịch sử Giáo hội.',
    'Vị Giáo hoàng đầu tiên xuất thân Dòng Thánh Augustinô kể từ thế kỷ XIV.',
    'Chọn tông hiệu Lêô XIV, nối lại truyền thống học thuyết xã hội của Đức Lêô XIII.',
    'Khẩu hiệu “In Illo uno unum” lấy từ chú giải Thánh vịnh của Thánh Augustinô.'
  ]
};

export const PASTORS_EXTENDED_DATA: DetailedBioRecord[] = [
  {
    id: 'cha-marc-guillou',
    source:
      'Hồ sơ lưu trữ IRFA 0682 — nguyên văn: "En 1861, il eut à diriger le district de Mi-tho ; en 1863, celui de Cai-mong. Nommé provicaire en 1864, il revint à Mi-tho, et, en 1865, il passa à Thu-dau-mot."',
    tableNote: 'Cha sở tiên khởi. Coi sóc địa hạt Mỹ Tho từ 1861; năm 1863 chuyển sang địa hạt Cái Mơn, được đặt làm Phó Đại diện Tông tòa năm 1864 rồi trở lại Mỹ Tho, đến 1865 đi Thủ Dầu Một. Cộng đoàn Công giáo Mỹ Tho hình thành năm 1861 khi giáo dân các tỉnh miền Tây về đây lánh nạn bách hại; ngài quy tụ và dựng ngôi nhà thờ đầu tiên kính Thánh Phanxicô Xaviê.',
    name: 'Lm. Jean-Marie Guillou (MEP)',
    saintName: 'Thánh Gioan Maria (Jean-Marie)',
    role: 'Linh mục Quản xứ Tiên khởi Họ đạo Mỹ Tho (1861 – 1865)',
    period: '1861 – 1865',
    birth: '22/10/1828 tại Prat, Giáo phận Saint-Brieuc, Pháp',
    death: '16/03/1866 tại Sài Gòn (Hưởng dương 37 tuổi), an táng tại Lăng Cha Cả',
    priestOrdination: 'Thụ phong Linh mục ngày 17/12/1853',
    origin: 'Hội Thừa Sai Paris (Missions Étrangères de Paris - MEP) — Hồ sơ lưu trữ IRFA số 0682',
    shortDesc: 'Vị mục tử đầu tiên đến coi sóc cộng đoàn Công giáo Mỹ Tho thời kỳ sơ khai sau biến cố phân sáp và cuộc tử đạo của Cha Thánh Phêrô Nguyễn Văn Lựu (1861). Ngài có công quy tụ giáo dân, thiết lập các sổ sách bí tích đầu tiên và dựng ngôi nhà nguyện đầu tiên kính Thánh Phanxicô Xaviê tại đồn Mỹ Tho.',
    chronology: [
      {
        time: '1856 – 1860',
        title: 'Thừa sai vùng người Stiêng',
        content: 'Lên đường sang Đàng Trong ngày 23/01/1856 giữa thời kỳ bách hại; truyền giáo cho người Stiêng và đồng sáng lập cộng đoàn Bro-lam.'
      },
      {
        time: '1861',
        title: 'Coi sóc địa hạt Mỹ Tho',
        content:
          'Được cử làm bề trên địa hạt Mỹ Tho. Bản báo cáo viết tay của Cha Renier, hiện lưu trữ tại Tòa Tổng Giám mục TGP. TP.HCM, ghi rõ: "Trước năm 1861 chưa có cộng đoàn Công giáo Mỹ Tho. Chỉ có những người Công giáo bị lính An Nam giam giữ trong đồn. Những người này thuộc bổn đạo của họ Thủ Ngữ, Ba Giồng hay những họ đạo khác." Cũng theo bản báo cáo ấy, đến ngày 28/01/1862 họ đạo Mỹ Tho đã có 1.986 giáo dân — một sự gia tăng đột biến mà tài liệu giáo xứ gắn với gương tử đạo của Cha Thánh Phêrô Nguyễn Văn Lựu tháng 4/1861, vị vẫn thường vào đồn thăm viếng và an ủi các bổn đạo bị giam.'
      },
      {
        time: '1863 – 1864',
        title: 'Cái Mơn rồi trở lại Mỹ Tho',
        content: 'Chuyển sang coi sóc địa hạt Cái Mơn năm 1863; năm 1864 được đặt làm Phó Đại diện Tông tòa và trở lại Mỹ Tho.'
      },
      {
        time: '1861',
        title: 'Thời kỳ thử thách & Chứng nhân tử đạo',
        content: 'Đồng hành nâng đỡ đức tin cho giáo dân trong giai đoạn bách hại; ghi nhận và tôn kính cuộc tử đạo của Cha Thánh Phêrô Nguyễn Văn Lựu tại Mỹ Tho (07/04/1861).'
      },
      {
        time: '1865 – 1866',
        title: 'Thủ Dầu Một & Những ngày cuối',
        content: 'Được điều về Thủ Dầu Một năm 1865. Ngài qua đời tại Sài Gòn ngày 16/03/1866 khi mới 37 tuổi và được an táng tại Lăng Cha Cả.'
      }
    ],
    milestones: [
      'Vị mục tử tiên khởi của Họ đạo Mỹ Tho, coi sóc địa hạt từ năm 1861.',
      'Dựng ngôi nhà thờ đầu tiên của họ đạo — một nhà thờ nhỏ lợp lá, kính Thánh Phanxicô Xaviê.',
      'Dưới thời ngài, vùng Mỹ Tho từ chỗ chưa có cộng đoàn Công giáo lên 1.986 giáo dân chỉ trong vòng một năm (28/01/1862).',
      'Đồng sáng lập cộng đoàn Kitô hữu Bro-lam giữa người Stiêng.',
      'Phó Đại diện Tông tòa Giáo phận Tây Đàng Trong (1864).'
    ]
  },
  {
    id: 'cha-gernot',
    name: 'Lm. Charles Gernot (MEP)',
    saintName: 'Thừa sai Hội Thừa Sai Paris',
    role: 'Linh mục Chánh sở Họ đạo Mỹ Tho (28/01/1862 – đầu 1864)',
    period: '1862 – 1864',
    birth: '04/11/1836 tại Joppécourt, Moselle, Pháp',
    origin: 'Hội Thừa Sai Paris (MEP) — hồ sơ IRFA 0794',
    priestOrdination: 'Thụ phong linh mục ngày 25/05/1861',
    source:
      'Kỷ yếu Mừng Năm Thánh 100 năm Nhà thờ Chánh Tòa Mỹ Tho (1907 – 2007), trang 24 – 25 — "Cha Guillou rời Mỹ Tho và được thay thế bởi cha Gernot, ngài nhận nhiệm sở ngày 28 tháng 01 năm 1862". Tiểu sử theo hồ sơ lưu trữ IRFA 0794. Hai nguồn lệch nhau ở mốc rời Mỹ Tho: Kỷ yếu ghi ngài ở Mỹ Tho khoảng hai năm rồi đi Cái Mơn đầu năm 1864, còn hồ sơ IRFA ghi ngài được đặt về Cái Mơn ngay trong năm 1862.',
    tableNote:
      'Kế nhiệm Cha Guillou, nhận nhiệm sở ngày 28/01/1862 khi họ đạo Mỹ Tho có 1.986 giáo dân. Chính bản tường trình ngài gửi Đức cha Lefebvre năm 1863 dẫn tới việc các Nữ tu Thánh Phaolô thành Chartres đến Mỹ Tho năm 1864. Đầu năm 1864 ngài chuyển về Cái Mơn, dẫn theo các nữ tu Bãi Xan từng lánh nạn tại Mỹ Tho.',
    shortDesc:
      'Vị chánh sở thứ hai của họ đạo Mỹ Tho, nhận nhiệm sở ngày 28/01/1862. Về sau tại Cái Mơn ngài làm nên một công trình lớn của cả địa phận: đào tạo các nữ tu Mến Thánh Giá thành giáo lý viên và giáo viên.',
    chronology: [
      {
        time: '1836 – 1861',
        title: 'Xuất thân và ơn gọi',
        content:
          'Sinh ngày 04/11/1836 tại Joppécourt (Moselle). Học cổ điển tại tiểu chủng viện Metz, triết học tại đại chủng viện cùng thành phố. Vào Chủng viện Thừa Sai ngày 17/09/1858, thụ phong linh mục ngày 25/05/1861 và lên đường ngày 09/08 cùng năm.'
      },
      {
        time: '28/01/1862',
        title: 'Nhận nhiệm sở Mỹ Tho',
        content:
          'Tới Sài Gòn ngày 28/01/1862 và nhận ngay nhiệm sở Mỹ Tho — lỵ sở một địa hạt 2.300 giáo dân theo hồ sơ IRFA. Kỷ yếu giáo xứ ghi con số 1.986 giáo dân tại thời điểm ngài nhận xứ, và riêng năm 1861 họ đạo có 2.250 lượt xưng tội cùng 207 em rước lễ.'
      },
      {
        time: '1863',
        title: 'Bản tường trình mở đường cho các Nữ tu Thánh Phaolô',
        content:
          'Ngài gửi Đức cha Lefebvre một bản tường trình có dẫn chứng về nhu cầu của họ đạo. Kết quả: năm 1864 các Nữ tu Thánh Phaolô thành Chartres đến Mỹ Tho, thay chỗ các nữ tu Việt Nam vừa ra đi, với bề trên đầu tiên là sơ Lizion. Cũng trong năm 1864 các trường học dành cho thanh thiếu niên nam nữ bắt đầu hoạt động, cùng một cô nhi viện.'
      },
      {
        time: 'Đầu 1864',
        title: 'Chuyển về Cái Mơn',
        content:
          'Ngài rời Mỹ Tho về Cái Mơn, dẫn theo các nữ tu dòng Bãi Xan từng lánh nạn tại Mỹ Tho từ cuối năm 1861. Tại Cái Mơn ngài giữ chức Phó Đại diện Tông toà các tỉnh miền tây cho tới năm 1865.'
      },
      {
        time: '1864 – 1910',
        title: 'Công trình lớn tại Cái Mơn',
        content:
          'Ngài mạnh dạn sai các nữ tu Mến Thánh Giá đi dạy giáo lý cho tân tòng — một sáng kiến chưa từng có. Chỉ vài năm sau đã có 1.250 dự tòng được rửa tội; từ 1880 đến 1910 các nữ tu dạy dỗ 4.500 tân tòng. Ngài còn huấn luyện họ thành giáo viên: năm 1875 các nữ tu coi 8 trường với 382 học sinh, đến năm 1910 là 1 cô nhi viện, 44 trường và 1.890 trẻ. Năm 1871 ngài khởi sự đào tạo giáo lý viên nam; năm 1874 đã có 26 người đủ trình độ được sai đi các làng.'
      }
    ],
    milestones: [
      'Vị chánh sở thứ hai của họ đạo Mỹ Tho, nhận nhiệm sở ngày 28/01/1862.',
      'Bản tường trình năm 1863 của ngài mở đường cho các Nữ tu Thánh Phaolô đến Mỹ Tho.',
      'Tại Cái Mơn: sai các nữ tu Mến Thánh Giá đi dạy giáo lý — sáng kiến đưa tới 1.250 dự tòng rửa tội chỉ trong vài năm.'
    ]
  },
  {
    id: 'cha-lize',
    name: 'Lm. François-René Lizé (MEP)',
    saintName: 'Thánh Phanxicô',
    role: 'Linh mục coi sóc Họ đạo Mỹ Tho & Vĩnh Tường (1864 – 1874)',
    period: '1864 – 1869',
    birth: '08/06/1838 tại Châteaugiron, Giáo phận Rennes, Pháp',
    death: '08/02/1887 tại nhà an dưỡng Béthanie, Hồng Kông',
    priestOrdination: 'Thụ phong Linh mục ngày 25/05/1861',
    origin: 'Hội Thừa Sai Paris (MEP) — Hồ sơ lưu trữ IRFA số 0792',
    source:
      'Hồ sơ lưu trữ IRFA 0792 và bài cáo phó của Hội Thừa Sai Paris (Đức cha Colombert, thư ngày 11/02/1887)',
    tableNote: 'Về Mỹ Tho năm 1864, giúp các Nữ tu Thánh Phaolô thành Chartres lập cơ sở Thánh Nhi (Sainte-Enfance). Từ năm 1866 cùng Cha Marc phụ trách họ đạo. Khoảng 1869 chuyển hẳn về Vĩnh Tường — khi đó còn là họ nhánh của Mỹ Tho — và lập tại đó một bệnh viện bản xứ.',
    shortDesc: 'Vị thừa sai gắn bó với Mỹ Tho suốt mười năm. Ngài về đây năm 1864 và giúp các Nữ tu Thánh Phaolô thành Chartres thiết lập cơ sở Thánh Nhi. Từ năm 1866 ngài cùng Cha Marc phụ trách họ đạo Mỹ Tho. Khoảng năm 1869 ngài chuyển hẳn sang Vĩnh Tường — lúc bấy giờ còn là họ nhánh của Mỹ Tho — và lập ở đó một bệnh viện bản xứ do các Nữ tu đảm nhiệm. Được đặt làm Phó Đại diện Tông tòa khoảng năm 1872.',
    chronology: [
      {
        time: '1861 – 1864',
        title: 'Thụ phong & Những năm đầu tại Nam Kỳ',
        content: 'Thụ phong linh mục ngày 25/05/1861 và lên đường sang Giáo phận Tây Đàng Trong ngày 09/08/1861. Khởi đầu tại Bưng trước khi về Mỹ Tho năm 1864.'
      },
      {
        time: '1864 – 1866',
        title: 'Lập cơ sở Thánh Nhi tại Mỹ Tho',
        content: 'Giúp các Nữ tu Thánh Phaolô thành Chartres thiết lập cơ sở Thánh Nhi (Sainte-Enfance) tại Mỹ Tho, chăm sóc trẻ mồ côi và trẻ bị bỏ rơi.'
      },
      {
        time: '1866 – 1869',
        title: 'Cùng Cha Marc phụ trách họ đạo',
        content: 'Kho lưu trữ MEP ghi từ năm 1866 ngài cùng Cha Marc-Dassa đảm trách giáo xứ Mỹ Tho.'
      },
      {
        time: 'khoảng 1869 – 1874',
        title: 'Về Vĩnh Tường & lập bệnh viện bản xứ',
        content: 'Chuyển hẳn về Vĩnh Tường, khi ấy còn là họ nhánh của Mỹ Tho, và lập tại đó một bệnh viện bản xứ. Được đặt làm Phó Đại diện Tông tòa khoảng năm 1872.'
      },
      {
        time: '1866 – 1867',
        title: 'Mùa gặt lớn nhất của họ đạo',
        content:
          'Cáo phó của Hội Thừa Sai ghi rõ con số: riêng năm 1866 ngài rửa tội cho 385 người lớn, năm 1867 vượt quá 400 — mức cao nhất trong lịch sử buổi đầu của họ đạo Mỹ Tho.'
      },
      {
        time: '1874 – 1878',
        title: 'Rời Hội Thừa Sai rồi trở lại',
        content:
          'Bệnh nặng buộc ngài về Pháp năm 1874. Ngài rời Hội Thừa Sai Paris, nhận mục vụ tại giáo phận quê nhà và làm cha sở La Selle-Guerchaise. Bình phục, năm 1878 ngài xin đi lại Nam Kỳ và được đặt làm tuyên uý cơ sở Thánh Nhi tại Sài Gòn.'
      },
      {
        time: '1881 – 1887',
        title: 'Địa hạt Vĩnh Long',
        content:
          'Đức cha Colombert trao cho ngài địa hạt Vĩnh Long. Ngài lập nhiều họ đạo, dựng vài nhà nguyện, mở trường; số người lớn được rửa tội mỗi năm từ 156 đến 267, có năm địa hạt của ngài đứng đầu toàn giáo phận. Ngài qua đời đột ngột vì tai biến tại nhà an dưỡng Béthanie, Hồng Kông, rạng sáng 08/02/1887.'
      },
      {
        time: '1878 – 1887',
        title: 'Trở lại Nam Kỳ & những năm cuối',
        content: 'Bình phục, ngài trở lại Tây Đàng Trong năm 1878, làm tuyên úy cơ sở Thánh Nhi Sài Gòn; năm 1881 Đức cha Colombert trao cho ngài địa hạt Vĩnh Long, nơi ngài lập nhiều họ đạo và nhà nguyện. Ngài qua đời ngày 08/02/1887 tại Hồng Kông.'
      }
    ],
    milestones: [
      'Về Mỹ Tho năm 1864; cùng Cha Marc phụ trách họ đạo từ 1866.',
      'Giúp các Nữ tu Thánh Phaolô thành Chartres lập cơ sở Thánh Nhi tại Mỹ Tho.',
      'Lập bệnh viện bản xứ tại Vĩnh Tường (khoảng 1869).',
      'Phó Đại diện Tông tòa Giáo phận Tây Đàng Trong (khoảng 1872).'
    ],
    works: [
      {
        time: 'Khoảng 1866 – 1869',
        name: 'Cơ sở Thánh Nhi (Sainte-Enfance) của các Nữ tu Thánh Phaolô thành Chartres',
        detail:
          'Giúp các nữ tu lập cơ sở nuôi dạy trẻ tại Mỹ Tho — công trình bác ái đầu tiên của họ đạo.'
      },
      {
        time: 'Khoảng 1869',
        name: 'Bệnh viện bản xứ Vĩnh Tường',
        detail:
          'Lập bệnh viện dành cho người bản xứ tại Vĩnh Tường, mở đầu hoạt động y tế của họ đạo Mỹ Tho.'
      }
    ]
  },
  {
    id: 'cha-marc-dassa',
    name: 'Lm. François-Timothée Marc-Dassa (MEP)',
    saintName: 'Thánh Phanxicô',
    role: 'Linh mục phụ trách Giáo xứ Mỹ Tho (1866 – 1870)',
    period: '1866 – 1870',
    birth: '22/01/1826 tại La Grâce-Dieu, Giáo phận Toulouse, Pháp',
    death: '11/04/1870 tại La Grâce-Dieu, Pháp',
    priestOrdination: 'Thụ phong Linh mục ngày 23/05/1850',
    origin: 'Hội Thừa Sai Paris (MEP) — Hồ sơ lưu trữ IRFA số 0657. Thường được gọi vắn tắt là "Cha Marc"',
    source:
      'Hồ sơ lưu trữ IRFA 0657 — nguyên văn: "De 1866 à 1870, il fut chargé d\'abord avec Lizé, et ensuite seul, de la paroisse de Mi-tho"; và bài "Variétés: Mytho" trên Les Missions Catholiques 1877, tr.598',
    tableNote: 'Trước khi vào Nam Kỳ, ngài truyền giáo ở Nam Đàng Ngoài và phải lánh về Sài Gòn năm 1860 vì bách hại; tại đây ngài làm thông ngôn cho đoàn quân viễn chinh và các quan cai trị đầu tiên của thuộc địa. Phụ trách giáo xứ Mỹ Tho, ban đầu cùng Cha Lizé rồi sau đó một mình, với chức Phó Đại diện Tông tòa. Ngài xin được ân xá cho một số nghĩa quân; những người này về sau theo đạo và lập nên họ đạo An Đức. Suốt nhiệm kỳ ngài phải dâng lễ trong một nhà nguyện lợp lá vì công trình nhà thờ bị đình lại.',
    shortDesc: 'Thường được gọi vắn tắt là "Cha Marc". Ngài truyền giáo tại Bắc Kỳ từ năm 1854 nhưng cuộc bách hại buộc ngài rời nhiệm sở; năm 1860 ngài lánh về Sài Gòn và gia nhập địa phận Tây Đàng Trong, vừa coi sóc một số họ đạo vừa làm thông ngôn. Từ 1866 đến 1870 ngài phụ trách giáo xứ Mỹ Tho — ban đầu cùng Cha Lizé, sau đó một mình. Dấu ấn đặc biệt của ngài là xin được ân xá cho một số nghĩa quân; những người này sau đó theo đạo và lập nên họ đạo An Đức.',
    chronology: [
      {
        time: '1850 – 1860',
        title: 'Thừa sai Bắc Kỳ giữa cơn bách hại',
        content: 'Thụ phong linh mục tại Toulouse ngày 23/05/1850, vào Chủng viện Thừa Sai Paris năm 1853 và lên đường sang Bắc Kỳ ngày 22/03/1854. Cuộc bách hại buộc ngài rời nhiệm sở; năm 1860 ngài lánh về Sài Gòn và được sáp nhập vào địa phận Tây Đàng Trong.'
      },
      {
        time: '1860 – 1866',
        title: 'Coi sóc các họ đạo & làm thông ngôn',
        content: 'Vừa coi sóc một số họ đạo vừa làm thông ngôn cho đoàn quân viễn chinh và những viên chức đầu tiên của chính quyền thuộc địa.'
      },
      {
        time: '1866 – 1870',
        title: 'Phụ trách giáo xứ Mỹ Tho',
        content: 'Đảm trách giáo xứ Mỹ Tho, ban đầu cùng Cha Lizé rồi sau đó một mình. Ngài xin được ân xá cho một số nghĩa quân; những người này về sau đón nhận đức tin và lập nên họ đạo An Đức.'
      },
      {
        time: '1870',
        title: 'Trở về Pháp & qua đời',
        content: 'Lâm bệnh nặng năm 1870, ngài về Pháp và qua đời ngày 11/04/1870 ngay tại quê nhà La Grâce-Dieu.'
      }
    ],
    milestones: [
      'Phụ trách giáo xứ Mỹ Tho 1866 – 1870.',
      'Xin được ân xá cho một số nghĩa quân, những người sau đó lập nên họ đạo An Đức.',
      'Vận động và chứng kiến Đức cha Miche đặt viên đá đầu tiên ngôi nhà thờ họ đạo năm 1866.',
      'Làm thông ngôn cho đoàn quân viễn chinh và các quan cai trị đầu tiên của thuộc địa.',
      'Thừa sai Bắc Kỳ 1854 – 1860 giữa thời kỳ bách hại.'
    ]
  },
  {
    id: 'cha-sorel',
    source: 'Hồ sơ lưu trữ IRFA 0869',
    name: 'Lm. Constant-Joseph Sorel (MEP)',
    saintName: 'Thánh Giuse',
    role: 'Linh mục Chánh sở Họ đạo Mỹ Tho • Người xây ngôi nhà thờ thứ hai (1870 – 1872)',
    period: '1870 – 1872',
    birth: '14/04/1840 tại Bulles, Giáo phận Beauvais, Pháp',
    death: '26/02/1873 tại Nice, Pháp; an táng tại Marseille',
    priestOrdination: 'Thụ phong Linh mục ngày 17/12/1864',
    origin: 'Hội Thừa Sai Paris (MEP) — Hồ sơ lưu trữ IRFA số 0869',
    image: '/images/cha_sorel.jpg',
    tableNote: 'Vốn có kiến thức kiến trúc, ngài tự vẽ đồ án, mua vật liệu, thuê thợ và nhiều khi cầm bay xây như một người thợ lành nghề, dựng lên ngôi nhà thờ thứ hai của họ đạo mà Cha Marc chỉ mới đặt được viên đá năm 1866. Ngã bệnh khi mặt tiền và cung thánh còn dang dở; Cha Moulins hoàn tất.',
    shortDesc: 'Trước khi về Mỹ Tho, ngài phục vụ tại Thủ Dầu Một và dựng ở đó một ngôi nhà thờ gạch khiêm tốn nhưng nhiều năm liền được coi là đẹp nhất địa phận, được các sĩ quan công binh Pháp đánh giá cao. Tháng 7/1868 ngài theo cánh quân của thiếu tá Darros đi cứu giáo dân Thị Tính nhưng đến nơi sau khi cuộc thảm sát đã xảy ra. Năm 1870 ngài về Mỹ Tho, nơi công trình nhà thờ do Cha Marc khởi xướng đã ngưng từ lâu, tường mới cao một mét. Vốn am hiểu kiến trúc, ngài tự nghiên cứu đồ án, xin ngân khoản, mua vật liệu, thuê thợ, trực tiếp chỉ huy thợ nề thợ mộc và nhiều khi cầm bay làm việc như một người thợ lành nghề. Tường lên đủ độ cao, mái đã lợp, ngài đang làm mặt tiền và cung thánh thì kiệt sức; phải sang nhà hưu Hồng Kông rồi về Nice, qua đời ngày 26/02/1873 tại nhà các Sư huynh Thánh Gioan Thiên Chúa.',
    chronology: [
      {
        time: '1861 – 1865',
        title: 'Vào Chủng viện Thừa Sai & Lên đường',
        content: 'Vào Chủng viện Hội Thừa Sai Paris ngày 02/09/1861, thụ phong linh mục ngày 17/12/1864 và lên đường sang Giáo phận Tây Đàng Trong ngày 15/02/1865.'
      },
      {
        time: '1865 – 1870',
        title: 'Nhiệm sở Thủ Dầu Một',
        content: 'Xây tại Thủ Dầu Một một ngôi nhà thờ khiêm tốn nhưng trong nhiều năm được xem là đẹp nhất địa phận. Tháng 7/1868 ngài tháp tùng đoàn quân đi cứu giáo dân Thị Tính, đến nơi thì cuộc thảm sát đã xảy ra.'
      },
      {
        time: '1870 – 1872',
        title: 'Về Mỹ Tho & dựng ngôi nhà thờ thứ hai của họ đạo',
        content:
          'Nhận họ đạo Mỹ Tho năm 1870 và bắt tay xây dựng ngôi nhà thờ mà Đức cha Miche đã đặt viên đá năm 1866 rồi phải bỏ dở. Công trình được Cha Moulins hoàn tất và Đức cha Colombert làm phép trọng thể ngày 12/03/1876. Ngôi nhà thờ này bị tháo dỡ khoảng năm 1900 và nay không còn — chính là ngôi thánh đường trong bản khắc năm 1877 và trong tấm ảnh cũ đề "Cathédrale de My Tho".'
      },
      {
        time: '1872 – 1873',
        title: 'Trở về Pháp & qua đời',
        content: 'Ngã bệnh nặng, ngài về Pháp năm 1872 và qua đời ngày 26/02/1873 tại Nice, được an táng tại Marseille.'
      }
    ],
    milestones: [
      'Chánh sở họ đạo Mỹ Tho 1870 – 1872.',
      'Xây dựng ngôi nhà thờ thứ hai của họ đạo Mỹ Tho, tự tay chỉ huy công trường.',
      'Xây nhà thờ Thủ Dầu Một, nhiều năm được coi là đẹp nhất địa phận Tây Đàng Trong.'
    ],
    works: [
      {
        time: '1870 – 1872 (làm phép 12/03/1876)',
        name: 'Ngôi nhà thờ thứ hai của họ đạo — quen gọi là Nhà thờ Vĩnh Tường',
        now: 'không còn — bị tháo dỡ khoảng năm 1900; ngôi Chánh Tòa 1906 – 1910 thay thế',
        detail:
          'Tư liệu Pháp gọi đơn giản là "église de Mytho", tư liệu Việt quen gọi là Nhà thờ Vĩnh Tường, kính Thánh Tâm — cùng một ngôi nhà thờ. Đó là một thánh đường Baroque bề thế: dài 42 m, rộng 18 m, cao 36 m; lòng chính rộng 9,40 m; 32 cột Corinthiên cao 8 m; trần vòm cuốn; toàn bộ phào chỉ và trang trí bằng vữa stuc kiểu Hoa, do một người thợ Hoa đắp tay tại chỗ; 16 cửa sổ kính màu và một cửa kính hậu cung sáu huy hiệu kể các mầu nhiệm chính của đạo. Đức cha Colombert làm phép ngày 12/03/1876 trước sự hiện diện của đại tá Trève cùng toàn thể binh sĩ đồn trú, các Sư huynh Lasan và các Nữ tu Thánh Phaolô.'
      },
      {
        time: 'Sau 1872',
        name: 'Nhà thờ Thủ Dầu Một',
        detail:
          'Xây dựng ngôi thánh đường mà trong nhiều năm được xem là đẹp nhất địa phận Tây Đàng Trong.'
      }
    ]
  },
  {
    id: 'cha-moulins',
    source: 'Hồ sơ lưu trữ IRFA 1056',
    name: 'Lm. Pierre-Henri Moulins (MEP)',
    saintName: 'Thánh Phêrô Tông Đồ',
    role: 'Linh mục Chánh sở Họ đạo Mỹ Tho (1873 – 1899), sau là Chánh sở Nhà thờ Chánh Tòa Sài Gòn',
    period: '1873 – 1899',
    birth: '19/09/1844 tại Les Cabannes, Ariège, Pháp',
    death: '22/01/1900 tại nhà an dưỡng Béthanie, Hồng Kông',
    priestOrdination: 'Thụ phong Linh mục ngày 22/05/1869',
    origin: 'Hội Thừa Sai Paris (MEP) — Hồ sơ lưu trữ IRFA số 1056',
    image: '/images/cha_moulins.jpg',
    tableNote: 'Coi sóc họ đạo suốt 27 năm — nhiệm kỳ dài nhất trong lịch sử. Trong ba năm, ngài vừa lo kinh phí vừa tự làm thợ chạm, thợ mộc, thợ trang trí để hoàn tất ngôi nhà thờ Cha Sorel bỏ dở; tái lập họ đạo Xoài Mút và lập địa hạt Bình Đại. Năm 1899 được gọi về làm Chánh sở Nhà thờ Chánh Tòa Sài Gòn.',
    shortDesc: 'Vị chánh sở gắn bó với Mỹ Tho lâu nhất trong lịch sử họ đạo — 27 năm liên tục. Trước khi về Mỹ Tho ngài tập sự tại Chủng viện Sài Gòn, Lái Thiêu, rồi Cái Mơn — nơi ngài phụ giúp Cha Gernot xây nhà thờ. Ngài hoàn tất ngôi nhà thờ do Cha Sorel bỏ dở, phát triển giáo xứ, tái lập họ đạo Xoài Mút và thành lập địa hạt Bình Đại; xây nhiều nhà xứ và nhà nguyện tại Xoài Mút, An Đức và Bình Đại. Dưới thời ngài, Mỹ Tho trở thành nơi dừng chân của các thừa sai từ các tỉnh miền dưới, Campuchia và Lào. Năm 1899 Đức cha Mossard mời ngài nhận chức Chánh sở Nhà thờ Chánh Tòa Sài Gòn, nhưng ngài chỉ đảm nhiệm được vài tháng thì qua đời.',
    chronology: [
      {
        time: '1869 – 1873',
        title: 'Thụ phong & Những nhiệm sở đầu',
        content: 'Thụ phong linh mục ngày 22/05/1869, vào Chủng viện Thừa Sai Paris và lên đường sang Tây Đàng Trong ngày 06/07/1870. Khởi đầu tại chủng viện Sài Gòn, tạm thay quản lý địa phận, rồi về Lái Thiêu; hoàn tất giai đoạn đào tạo tại Cái Mơn, nơi ngài phụ giúp Cha Gernot xây nhà thờ.'
      },
      {
        time: '1873',
        title: 'Nhận họ đạo Mỹ Tho',
        content:
          'Được trao coi sóc họ đạo Mỹ Tho. Trong ba năm, ngài lo được nguồn kinh phí và tự mình làm thợ chạm, thợ mộc, thợ trang trí để đưa công trình dang dở của Cha Sorel đến đích. Đức cha Colombert làm phép trọng thể ngôi nhà thờ ngày 12/03/1876.'
      },
      {
        time: '1873 – 1899',
        title: 'Phát triển họ đạo & mở rộng địa bàn',
        content: 'Tái lập họ đạo Xoài Mút, thành lập địa hạt Bình Đại, xây nhiều nhà xứ và nhà nguyện tại Xoài Mút, An Đức, Bình Đại. Ngài có ba đến bốn linh mục Việt Nam làm phó xứ thường trú tại các họ đạo xa và được ghi nhận là điều hành khéo léo, tế nhị.'
      },
      {
        time: '1899 – 1900',
        title: 'Về Nhà thờ Chánh Tòa Sài Gòn & qua đời',
        content: 'Sau 27 năm tại Mỹ Tho, Đức cha Mossard mời ngài nhận chức Chánh sở Nhà thờ Chánh Tòa Sài Gòn — Cha Rénier được cử về Mỹ Tho thay ngài. Ngài chỉ đảm nhiệm được vài tháng rồi qua đời ngày 22/01/1900 tại nhà an dưỡng Béthanie, Hồng Kông.'
      }
    ],
    milestones: [
      'Chánh sở họ đạo Mỹ Tho suốt 27 năm (1873 – 1899) — nhiệm kỳ dài nhất trong lịch sử họ đạo.',
      'Hoàn tất ngôi nhà thờ thứ hai của họ đạo, làm phép ngày 12/03/1876.',
      'Tái lập họ đạo Xoài Mút và thành lập địa hạt Bình Đại.',
      'Chánh sở Nhà thờ Chánh Tòa Sài Gòn (1899 – 1900).'
    ],
    works: [
      {
        time: 'Hoàn tất dưới thời 1873 – 1899',
        name: 'Hoàn tất ngôi nhà thờ thứ hai — Nhà thờ Vĩnh Tường, kính Thánh Tâm',
        now: 'không còn — tháo dỡ khoảng năm 1900; ngôi Chánh Tòa 1906 – 1910 thay thế',
        detail:
          'Ba năm ròng vừa lo kinh phí vừa đích thân làm thợ chạm, thợ mộc và thợ trang trí. Đức cha Colombert làm phép ngày 12/03/1876. Ngôi thánh đường phục vụ họ đạo hai mươi lăm năm, đến khoảng năm 1900 thì được tháo dỡ vì hư hỏng nặng và vì giáo dân đã dời lên khu Thượng Mỹ Tho.'
      },
      {
        time: '1873 – 1899',
        name: 'Tái lập họ đạo Xoài Mút và lập địa hạt Bình Đại',
        detail:
          'Mở rộng địa bàn mục vụ của họ đạo Mỹ Tho ra các vùng lân cận trong suốt nhiệm kỳ 27 năm — nhiệm kỳ dài nhất trong lịch sử họ đạo.'
      }
    ]
  },
  {
    id: 'cha-regnier-co-gam',
    source:
      'Hồ sơ lưu trữ IRFA 1502 và bài cáo phó của Hội Thừa Sai Paris năm 1922. Hồ sơ gốc viết tên là RENIER (không dấu); giáo dân Mỹ Tho quen gọi ngài là "Cố Gẫm".',
    tableNote: 'Đặt viên đá đầu tiên ngày 11/08/1906 và khánh thành năm 1910 ngôi Nhà thờ Chánh Tòa hiện nay; xây trường của các Sư huynh Lasan, nội trú các Nữ tu Thánh Phaolô, nhà thờ Ngũ Hiệp.',
    name: 'Lm. Jean-Marie Rénier (Cố Gẫm - MEP)',
    saintName: 'Thánh Gioan Maria (Jean-Marie)',
    role: 'Linh mục Chánh sở Họ đạo Mỹ Tho • Người kiến thiết Nhà thờ Chánh Tòa (1899 – 1922)',
    period: '1899 – 1922',
    birth: '29/10/1853 tại Challain-la-Potherie, Giáo phận Angers, Pháp',
    death: '24/04/1922 tại Sài Gòn (Hưởng thọ 68 tuổi, 41 năm truyền giáo)',
    priestOrdination: 'Thụ phong Linh mục ngày 23/12/1876',
    origin: 'Hội Thừa Sai Paris (MEP) — Hồ sơ lưu trữ IRFA số 1502',
    shortDesc: 'Vị chánh sở coi sóc họ đạo Mỹ Tho suốt hơn hai mươi năm và là người kiến thiết ngôi Nhà thờ Chánh Tòa hiện nay. Ngày 11/08/1906 ngài đặt viên đá đầu tiên trên đại lộ Bourdais (nay là đại lộ Hùng Vương), hoàn thành năm 1910. Ngài còn mở trường học do các Sư huynh Lasan điều hành, nội trú do các Nữ tu Thánh Phaolô đảm trách, xây nhà thờ Ngũ Hiệp và tái thiết nguyện đường Thánh Anna. Kho lưu trữ MEP ghi lại ngài là "một mục tử thông minh, tận tụy, không mệt mỏi", dáng cao lớn, tóc bạc, tính tình vui vẻ hiếu khách, có uy tín đạo đức lớn trong cả tỉnh.',
    image: '/images/cha_renier_co_gam.jpg',
    chronology: [
      {
        time: '1876 – 1881',
        title: 'Thụ phong & Lên đường Thừa sai',
        content: 'Thụ phong linh mục ngày 23/12/1876 tại Pháp; lên đường sang Giáo phận Tây Đàng Trong (Cochinchine occidentale) ngày 26/10/1881.'
      },
      {
        time: '1881 – 1899',
        title: 'Các nhiệm sở đầu tiên',
        content: 'Phụ tá tại Mặc Bắc (1881 – 1883), coi sóc Đá Trắng (1883 – 1887), Biên Hòa (1887 – 1889) rồi Chợ Đũi (1891 – 1899) trước khi về Mỹ Tho.'
      },
      {
        time: '1899',
        title: 'Về nhận họ đạo Mỹ Tho',
        content: 'Được bổ nhiệm chánh sở họ đạo Mỹ Tho, khởi đầu hơn hai thập kỷ gắn bó cho đến khi qua đời.'
      },
      {
        time: '1906',
        title: 'Đặt viên đá đầu tiên (11/08/1906)',
        content: 'Khởi công ngôi nhà thờ thứ ba trên khu đất sình lầy đại lộ Bourdais, thay cho Nhà thờ Vĩnh Tường đã chật hẹp.'
      },
      {
        time: '1910',
        title: 'Khánh thành ngôi Thánh đường',
        content: 'Hoàn thành ngôi nhà thờ bề thế bậc nhất tỉnh Mỹ Tho lúc bấy giờ — chính là Nhà thờ Chánh Tòa hiện nay.'
      },
      {
        time: '1910 – 1922',
        title: 'Giáo dục & Bác ái',
        content: 'Mở trường học do các Sư huynh Lasan điều hành và nội trú do các Nữ tu Thánh Phaolô đảm trách; xây nhà thờ Ngũ Hiệp và tái thiết nguyện đường Thánh Anna. Ngài qua đời tại Sài Gòn ngày 24/04/1922.'
      }
    ],
    milestones: [
      'Chánh sở họ đạo Mỹ Tho suốt 23 năm (1899 – 1922).',
      'Khởi công (11/08/1906) và hoàn thành (1910) ngôi Nhà thờ Chánh Tòa Mỹ Tho hiện hữu.',
      'Mở trường học của các Sư huynh Lasan và nội trú của các Nữ tu Thánh Phaolô tại Mỹ Tho.',
      'Xây nhà thờ Ngũ Hiệp và tái thiết nguyện đường Thánh Anna.',
      'Vị chủ chăn được giáo dân kính trọng gọi là "Cố Gẫm".',
      'Trông coi việc tháo dỡ ngôi nhà thờ cũ ở Hạ Mỹ Tho và dời trung tâm họ đạo lên Thượng Mỹ Tho.',
      'Chứng kiến trại phong Cù Lao Rồng và bệnh viện của Nhà nước được trao cho các Nữ tu Thánh Phaolô.',
      'Là cha sở có uy tín và là chỗ dựa tinh thần lớn của cả tỉnh lỵ Mỹ Tho suốt 23 năm.'
    ],
    works: [
      {
        time: '1899 – khoảng 1900',
        name: 'Dời trung tâm họ đạo lên Thượng Mỹ Tho',
        now: 'khu vực nhà thờ và Tòa Giám mục ngày nay, 32 Hùng Vương',
        detail:
          'Trận bão lớn năm 1904 được báo cáo thường niên của Hội Thừa Sai ghi lại: "Le typhon a causé, à Mytho et dans tous les villages de la contrée, des pertes considérables" — bão gây thiệt hại nặng cho Mỹ Tho và mọi làng mạc quanh vùng; cơ sở Thánh Nhi hư hỏng và không được dựng lại, nhà nuôi trẻ phải dời về Vĩnh Tường. Khi ngài về nhận họ đạo, cộng đoàn chia làm hai khu vốn từng là hai họ đạo riêng: Thượng Mỹ Tho (Vĩnh Tường) có nhà xứ cho cha phó, một nhà thờ và bệnh viện bản xứ do các Nữ tu Thánh Phaolô coi sóc; Hạ Mỹ Tho là nơi cha sở ở, có ngôi nhà thờ lớn cùng cơ sở Thánh Nhi và nhà nuôi trẻ. Người Pháp đến ngày một đông khiến giáo dân dời dần lên Thượng Mỹ Tho, trong khi ngôi nhà thờ lớn và tháp chuông ở Hạ Mỹ Tho — vốn là niềm tự hào của khu phố — hư hỏng nặng. Sau khi Nhà nước và Đức Giám mục bàn bạc, người ta quyết định tháo dỡ ngôi nhà thờ ấy vì thấy không nên dồn tiền của vào nơi giáo dân đã rời đi. Ngài rời căn phòng trên phòng thánh lớn, lên ở nhờ căn nhà lá của cha phó, rồi lần lượt ở hai căn chòi lá cho tới ngày khánh thành nhà xứ mới — nơi ngài sống mười sáu năm cuối đời.'
      },
      {
        time: 'Khởi công 11/08/1906 — hoàn thành 1910',
        name: 'NHÀ THỜ CHÁNH TÒA MỸ THO hiện hữu',
        now: 'chính ngôi nhà thờ đang đứng tại 32 Hùng Vương, Phường 7, TP. Mỹ Tho',
        detail:
          'Công trình lớn nhất trong lịch sử họ đạo: ngôi thánh đường đang đứng tại 32 Hùng Vương ngày nay, cũng là nhà thờ mẹ của Giáo phận Mỹ Tho từ năm 1960. Ngôi nhà thờ này được cung hiến vào Đại Năm Thánh 2000 và đại trùng tu nhân dịp bách chu niên 2006 – 2007.'
      },
      {
        time: '1899 – 1922',
        name: 'Trường Sư huynh Lasan và nội trú Nữ tu Thánh Phaolô',
        detail:
          'Mở hai cơ sở giáo dục Công giáo tại Mỹ Tho, đặt nền cho mạng lưới trường học của họ đạo phát triển mạnh dưới thời Cha Bar.'
      },
      {
        time: '1899 – 1922',
        name: 'Nhà thờ Ngũ Hiệp và nguyện đường Thánh Anna',
        detail:
          'Xây mới nhà thờ Ngũ Hiệp và tái thiết nguyện đường Thánh Anna trong địa hạt mục vụ của họ đạo Mỹ Tho.'
      }
    ]
  },
  {
    id: 'cha-bar-co-bach',
    source:
      'Hồ sơ lưu trữ IRFA 2241. Giáo dân Mỹ Tho quen gọi ngài là "Cố Bạch".',
    tableNote: 'Trước khi về Mỹ Tho, ngài dạy triết tại Chủng viện Sài Gòn, làm tuyên uý Dòng Kín Cát Minh (1899) rồi coi địa hạt Bãi Xan. Tại Mỹ Tho: đón Đệ tử các Sư huynh Lasan (1929); năm 1930 trường Sư huynh có 400 học sinh, trường Nữ tu Thánh Phaolô 300 nữ sinh; năm 1933 ghi nhận 642 người được rửa tội và lập ba họ đạo Bàn Hạn, Thược, Phú Vang — họ Phú Vang trao cho cha Tôma Kỳ. Mang bệnh ung thư vòm họng, ngài qua đời ngay tại nhiệm sở sau khi lãnh Xức Dầu trước mặt giáo dân và nói lời từ biệt cuối cùng.',
    name: 'Lm. Henri Bar (Cố Bạch - MEP)',
    saintName: 'Thánh Giuse (tên rửa tội: Henri Edmond Joseph)',
    role: 'Linh mục Chánh sở Họ đạo Mỹ Tho (khoảng 1922 – 1948)',
    period: 'khoảng 1922 – 1948',
    birth: '29/04/1870 tại Flines-lez-Raches, Giáo phận Cambrai, Pháp',
    death: '19/03/1948 tại Mỹ Tho, đúng ngày lễ Thánh Giuse bổn mạng (hưởng thọ 78 tuổi, 52 năm truyền giáo)',
    priestOrdination: 'Thụ phong Linh mục ngày 28/06/1896',
    origin: 'Hội Thừa Sai Paris (MEP) — Hồ sơ lưu trữ IRFA số 2241',
    image: '/images/cha_bar_co_bach.jpg',
    shortDesc: 'Kế nhiệm Cha Rénier, ngài gắn bó với họ đạo Mỹ Tho cho đến hơi thở cuối cùng và là vị kỳ cựu nhất của địa phận khi qua đời. Kho lưu trữ MEP mô tả ngài là "một thừa sai khiêm nhường, làm việc trong thinh lặng và kín đáo". Năm 1929 ngài đón nhóm Đệ tử các Sư huynh Lasan, nhường một phần nhà xứ làm chỗ ở; đến 1930 trường của các Sư huynh nuôi dạy 400 học sinh và các Nữ tu Thánh Phaolô 300 nữ sinh. Năm 1933 ngài ghi nhận 642 lượt rửa tội và lập ba họ đạo mới. Ngài qua đời vì ung thư vòm họng sau khi lãnh Bí tích Xức Dầu trước mặt cộng đoàn và ngỏ lời từ biệt lần cuối.',
    chronology: [
      {
        time: '1896 – 1899',
        title: 'Thụ phong & Sang Đàng Trong',
        content: 'Thụ phong linh mục ngày 28/06/1896, lên đường sang Giáo phận Tây Đàng Trong ngày 26/08/1896. Dạy triết học tại Đại Chủng viện Sài Gòn và làm tuyên úy Dòng Kín Carmel năm 1899.'
      },
      {
        time: 'trước 1922',
        title: 'Địa hạt Bái Xan',
        content: 'Phục vụ tại họ đạo và địa hạt Bái Xan, một trong những cộng đoàn Kitô hữu lâu đời nhất vùng ruộng vườn Nam Bộ.'
      },
      {
        time: '1929 – 1930',
        title: 'Đón các Sư huynh Lasan & mở rộng trường học',
        content: 'Đón nhóm Đệ tử các Sư huynh Lasan về Mỹ Tho, nhường một phần nhà xứ làm nơi ở. Đến năm 1930, trường của các Sư huynh đón 400 học sinh và các Nữ tu Thánh Phaolô đón 300 nữ sinh.'
      },
      {
        time: '1933',
        title: 'Mùa gặt đức tin & lập họ đạo mới',
        content: 'Ghi nhận 642 lượt rửa tội trong địa hạt; lập ba họ đạo mới Bàn Hạn, Thược và Phú Vang — họ Phú Vang được trao cho Cha Tôma Kỳ coi sóc.'
      },
      {
        time: '1941 – 1945',
        title: 'Che chở giáo dân thời loạn lạc',
        content: 'Cùng Cha Ad. Keller đón nhận giáo dân chạy nạn trong thời kỳ biến động; chứng kiến tại chỗ giai đoạn kết thúc chiếm đóng của quân đội Nhật và những xáo trộn sau đó.'
      },
      {
        time: '19/03/1948',
        title: 'Qua đời giữa lòng họ đạo',
        content: 'Sau thời gian dài chống chọi ung thư vòm họng, ngài lãnh Bí tích Xức Dầu trước mặt cộng đoàn, xin lỗi vì những điều có thể đã làm phiền lòng giáo dân và khuyên họ trung thành với bổn phận Kitô hữu. Ngài qua đời ngay tại Mỹ Tho đúng ngày lễ Thánh Giuse.'
      }
    ],
    milestones: [
      'Chánh sở họ đạo Mỹ Tho khoảng một phần tư thế kỷ, qua đời ngay tại nhiệm sở (1948).',
      'Đón các Sư huynh Lasan về Mỹ Tho (1929); đến 1930 trường Sư huynh có 400 học sinh, trường Nữ tu Thánh Phaolô 300 nữ sinh.',
      'Lập ba họ đạo mới Bàn Hạn, Thược và Phú Vang (1933).',
      'Năm 1941, cùng cha Ad. Keller đón nhận giáo dân chạy loạn về nương náu tại họ đạo.',
      'Năm 1933 ghi nhận 642 người được rửa tội trong toàn địa hạt.',
      'Dạy triết học tại Chủng viện Sài Gòn và làm tuyên uý Dòng Kín Cát Minh (1899) trước khi về Mỹ Tho.',
      'Trước lúc qua đời, ngài xin lỗi giáo dân và nhắn nhủ họ giữ trọn bổn phận người Kitô hữu.'
    ],
    works: [
      {
        time: '1929 – 1930',
        name: 'Hệ thống trường học Công giáo Mỹ Tho',
        detail:
          'Đón các Sư huynh Lasan về Mỹ Tho năm 1929. Đến năm 1930 trường Sư huynh đã có 400 học sinh và trường Nữ tu Thánh Phaolô 300 nữ sinh — quy mô giáo dục lớn nhất của họ đạo tính đến thời điểm đó.'
      },
      {
        time: '1933',
        name: 'Ba họ đạo Bàn Hạn, Thược và Phú Vang',
        detail:
          'Thành lập cùng lúc ba họ đạo mới, mở rộng đáng kể địa bàn Công giáo quanh Mỹ Tho.'
      }
    ]
  },
  {
    id: 'cha-nguyen-minh-chieu',
    image: '/images/cha_nguyen_minh_chieu.png',
    source: 'giaophanmytho.net (xác nhận ngài là cha sở năm 1958); niên hiệu 1948 – 1960 theo tư liệu giáo xứ',
    tableNote: 'Kế nhiệm Cha Henri Bar, và là vị cha sở cuối cùng coi sóc Mỹ Tho khi nơi đây còn là một giáo xứ thuộc Giáo phận Sài Gòn. Năm 1958 cho dời quả chuông từ tháp bên hông nữ lên tháp cao bên nam.',
    name: 'Lm. Phaolô Nguyễn Minh Chiếu',
    saintName: 'Thánh Phaolô Tông Đồ',
    role: 'Linh mục Chánh xứ Họ đạo Mỹ Tho (1948 – 1960)',
    period: '1948 – 1960',
    origin: 'Giáo phận Sài Gòn / Giáo hạt Mỹ Tho',
    shortDesc: 'Kế nhiệm Cha Henri Bar sau khi ngài qua đời ngay tại nhiệm sở năm 1948. Ngài coi sóc họ đạo suốt hơn một thập kỷ và là vị cha sở cuối cùng của Mỹ Tho khi nơi đây còn là một giáo xứ thuộc Giáo phận Sài Gòn — trước khi Tòa Thánh thành lập Giáo phận Mỹ Tho năm 1960 và nhà thờ được nâng lên hàng Chánh Tòa. Dấu ấn còn lại đến nay là công trình dời quả chuông lớn từ tháp bên hông nữ lên tháp cao bên nam vào năm 1958.',
    chronology: [
      {
        time: '1948',
        title: 'Kế nhiệm Cha Henri Bar',
        content: 'Nhận coi sóc họ đạo Mỹ Tho sau khi Cha Henri Bar (Cố Bạch) qua đời ngay tại nhiệm sở ngày 19/03/1948.'
      },
      {
        time: '1956',
        title: 'Chính thức nhậm chức Cha sở người Việt đầu tiên',
        content: 'Tiếp quản họ đạo từ các linh mục thừa sai Pháp MEP, mở ra kỷ nguyên tự quản của giáo sĩ bản xứ.'
      },
      {
        time: '1957',
        title: 'Kiện toàn sổ sách & Ban Quới Chức',
        content: 'Tổ chức lại các khu họ nhánh và đào tạo giáo lý phụng vụ.'
      },
      {
        time: '1960',
        title: 'Chuyển giao khi Giáo phận Mỹ Tho được thành lập',
        content: 'Cuối năm 1960 Tòa Thánh thành lập Giáo phận Mỹ Tho và nâng nhà thờ họ đạo lên hàng Nhà thờ Chánh Tòa với tước hiệu Đức Mẹ Vô Nhiễm Nguyên Tội. Ngài là vị cha sở cuối cùng của họ đạo dưới danh nghĩa một giáo xứ thuộc Giáo phận Sài Gòn, trước khi Cha Micae Nguyễn Khoa Học trở thành cha sở tiên khởi của Nhà thờ Chánh Tòa.'
      },
      {
        time: '1958',
        title: 'Di dời chuông lớn lên tháp Nam',
        content: 'Tháp chuông đầu tiên vốn dựng bên hông nữ của nhà thờ. Năm 1958 ngài tổ chức công trình dời quả chuông đồng cổ kính lên tháp cao bên nam.'
      }
    ],
    milestones: [
      'Linh mục người Việt Nam đầu tiên làm Chánh xứ Họ đạo Mỹ Tho (1956).',
      'Chủ trì công trình di dời chuông nhà thờ lên tháp cao phía Nam (1958).',
      'Đặt nền móng quản trị họ đạo bản xứ trước khi Giáo phận Mỹ Tho được thành lập.'
    ],
    works: [
      {
        time: '1958',
        name: 'Di dời chuông nhà thờ lên tháp cao phía Nam',
        now: 'bộ chuông sau này được chuyển sang tháp chuông riêng do Cha Chúc xây năm 1995',
        detail:
          'Đưa bộ chuông lên tháp cao phía Nam của ngôi thánh đường, thay đổi rõ rệt diện mạo mặt tiền nhà thờ. Đây là công trình cải tạo lớn đầu tiên do một linh mục người Việt chủ trì tại họ đạo.'
      }
    ]
  },
  {
    id: 'cha-nguyen-khoa-hoc',
    image: '/images/cha_nguyen_khoa_hoc.jpg',
    source: 'giaophanmytho.net (cha sở tiên khởi Nhà thờ Chánh Tòa; bài Giáo xứ Bình Tạo cho biết Cha Phêrô Niềm kế nhiệm năm 1965) + gxhanhthongtay.net (cha sở Hạnh Thông Tây 1968 – 1974; ảnh chân dung lấy từ trang Các đời Cha xứ của giáo xứ này)',
    name: 'Lm. Micae Nguyễn Khoa Học',
    saintName: 'Thánh Micae Tổng lãnh Thiên thần',
    role: 'Linh mục Chánh sở Tiên khởi của Nhà thờ Chánh Tòa Mỹ Tho (1960 – 1965)',
    period: '1960 – 1965',
    origin: 'Giáo phận Mỹ Tho',
    tableNote: 'Cha sở tiên khởi của Nhà thờ Chánh Tòa sau khi giáo phận được thành lập (1960). Đảm trách xây dựng Tòa Giám Mục, Nhà Tĩnh Tâm, Nghênh Đài Đức Mẹ và Nhà Cha Sở trong khuôn viên cạnh nhà thờ; thành lập Trường Tiểu học Thánh Giuse tại giáo xứ. Rời Chánh Tòa năm 1965; từ 1968 đến 1974 làm cha sở Giáo xứ Hạnh Thông Tây (Sài Gòn).',
    shortDesc: 'Khi Giáo phận Mỹ Tho được thành lập năm 1960, giáo phận chưa có Tòa Giám Mục; Đức Cha Giuse Trần Văn Thiện phải tạm trú tại một ngôi nhà trên đường Lê Lợi, đối diện Bưu điện Mỹ Tho. Là cha sở tiên khởi của Nhà thờ Chánh Tòa, ngài đảm trách xây dựng cả cụm công trình trong khuôn viên cạnh nhà thờ — Tòa Giám Mục, Nhà Tĩnh Tâm, Nghênh Đài Đức Mẹ và Nhà Cha Sở — vẫn còn đến ngày nay. Chỉ sau khi Tòa Giám Mục hoàn thành, Đức Cha Giuse mới chính thức về thường trú.',
    chronology: [
      {
        time: '1960',
        title: 'Cha sở tiên khởi Nhà thờ Chánh Tòa',
        content: 'Sau khi Tòa Thánh nâng nhà thờ họ đạo Mỹ Tho lên hàng Nhà thờ Chánh Tòa với tước hiệu Đức Mẹ Vô Nhiễm Nguyên Tội, ngài trở thành vị chánh sở tiên khởi của ngôi thánh đường ở cương vị mới này.'
      },
      {
        time: 'sau 1960',
        title: 'Xây dựng cụm công trình Tòa Giám Mục',
        content: 'Đảm trách xây dựng Tòa Giám Mục, Nhà Tĩnh Tâm, Nghênh Đài Đức Mẹ và Nhà Cha Sở trong cùng khuôn viên cạnh Nhà thờ Chánh Tòa. Nhờ đó Đức Giám mục tiên khởi mới có nơi ở và làm việc chính thức của giáo phận.'
      },
      {
        time: 'thập niên 1960',
        title: 'Thành lập Trường Tiểu học Thánh Giuse',
        content: 'Thành lập Trường Tiểu học Thánh Giuse ngay tại giáo xứ Chánh Tòa, mở rộng công cuộc giáo dục cho con em trong họ đạo.'
      },
      {
        time: '1965',
        title: 'Bàn giao Nhà thờ Chánh Tòa',
        content: 'Năm 1965 Cha Phêrô Ngô Văn Niềm được sai về làm Chánh xứ Nhà thờ Chánh Tòa Mỹ Tho, kế nhiệm ngài.'
      },
      {
        time: '1968 – 1974',
        title: 'Chánh sở Giáo xứ Hạnh Thông Tây',
        content: 'Làm Chánh sở Giáo xứ Hạnh Thông Tây (Gò Vấp, Sài Gòn) từ 1968 đến 1974, kế nhiệm Cha Anrê Nguyễn Văn Đại. Giai đoạn này ngài lo trùng tu thánh đường sau những thiệt hại của chiến cuộc.'
      }
    ],
    milestones: [
      'Linh mục Chánh sở tiên khởi của Nhà thờ Chánh Tòa Mỹ Tho (1960 – 1965).',
      'Đảm trách xây dựng Tòa Giám Mục Mỹ Tho đầu tiên, Nhà Tĩnh Tâm, Nghênh Đài Đức Mẹ và Nhà Cha Sở.',
      'Thành lập Trường Tiểu học Thánh Giuse tại giáo xứ Chánh Tòa.',
      'Chánh sở Giáo xứ Hạnh Thông Tây, Gò Vấp (1968 – 1974).'
    ],
    works: [
      {
        time: '1960 – 1965',
        name: 'Tòa Giám Mục Mỹ Tho đầu tiên',
        now: 'khuôn viên Tòa Giám mục Mỹ Tho, 32 Hùng Vương — sát bên nhà thờ',
        detail:
          'Xây dựng trụ sở điều hành cho giáo phận vừa được thành lập năm 1960 — công trình bản lề biến khuôn viên Chánh Tòa thành trung tâm của cả giáo phận.'
      },
      {
        time: '1960 – 1965',
        name: 'Nhà Tĩnh Tâm, Nghênh Đài Đức Mẹ và Nhà Cha Sở',
        detail:
          'Ba hạng mục hoàn thiện khuôn viên nhà thờ: nơi tĩnh tâm cho giáo sĩ và giáo dân, đài kính Đức Mẹ, và nhà ở của cha sở.'
      },
      {
        time: '1960 – 1965',
        name: 'Trường Tiểu học Thánh Giuse',
        now: 'không còn hoạt động dưới danh nghĩa trường Công giáo',
        detail:
          'Thành lập trường tiểu học của giáo xứ Chánh Tòa, nối tiếp truyền thống giáo dục Công giáo có từ thời Cha Rénier và Cha Bar.'
      }
    ]
  },
  {
    id: 'cha-nguyen-van-niem',
    name: 'Lm. Phêrô Ngô Văn Niềm',
    saintName: 'Thánh Phêrô Tông Đồ',
    role: 'Linh mục Chánh sở Nhà thờ Chánh Tòa Mỹ Tho (1965 – 1971)',
    period: '1965 – 1971',
    image: '/images/cha_ngo_van_niem.jpg',
    origin: 'Giáo phận Mỹ Tho',
    source:
      'Kỷ yếu Mừng Năm Thánh 100 năm Nhà thờ Chánh Tòa Mỹ Tho (1907 – 2007), trang 49 — ghi rõ "Phêrô Ngô Văn Niềm (1965 – 1971)" kèm chân dung. Trang này trước đây chép nhầm họ thành Nguyễn và kéo dài nhiệm kỳ tới 1975; nay sửa theo Kỷ yếu của chính giáo xứ. Mốc khởi đầu 1965 khớp với bài Giáo xứ Bình Tạo trên giaophanmytho.net.',
    tableNote: 'Trước đó là Cha Sở Giáo xứ An Đức (1959 – 1965), kiêm nhiệm cả họ đạo Bình Tạo. Về Chánh Tòa năm 1965, coi sóc họ đạo qua giai đoạn chiến sự ác liệt từ biến cố Mậu Thân 1968; giữ vững sinh hoạt phụng vụ và tổ chức công tác bác ái trợ giúp đồng bào di tản đổ về thành phố Mỹ Tho.',
    shortDesc: 'Kế nhiệm trực tiếp Cha Micae Nguyễn Khoa Học, ngài gánh vác họ đạo Chánh Tòa qua một giai đoạn đầy thử thách. Nhận nhiệm sở đúng lúc chiến sự trở nên ác liệt từ biến cố Mậu Thân 1968, sứ vụ của ngài tập trung vào việc giữ vững sinh hoạt phụng vụ, ổn định đời sống đức tin và tổ chức công tác bác ái trợ giúp làn sóng đồng bào di tản từ vùng chiến sự đổ về trung tâm thành phố. Ngài cũng là cộng sự đắc lực bên cạnh Đức Cha tiên khởi Giuse Trần Văn Thiện trong việc kiện toàn cơ cấu của một giáo phận còn non trẻ.',
    chronology: [
      {
        time: '1959 – 1965',
        title: 'Cha Sở Giáo xứ An Đức',
        content: 'Coi sóc Giáo xứ An Đức và kiêm nhiệm họ đạo Bình Tạo từ năm 1959 đến 1965, khi số giáo dân Bình Tạo đã trên 160 người.'
      },
      {
        time: '1965',
        title: 'Về nhận Nhà thờ Chánh Tòa',
        content: 'Được sai đi làm Cha Chánh Xứ Nhà thờ Chánh Tòa Mỹ Tho; Cha Tađêô Võ Thành Tích thay ngài coi sóc Giáo xứ An Đức và kiêm nhiệm Bình Tạo.'
      },
      {
        time: '1968 – 1975',
        title: 'Giữ vững đời sống đức tin & công tác bác ái',
        content: 'Duy trì các sinh hoạt phụng vụ tại nhà thờ mẹ của giáo phận, ổn định đời sống đức tin cộng đoàn và tổ chức trợ giúp đồng bào di tản từ các vùng chiến sự về trung tâm thành phố Mỹ Tho.'
      },
      {
        time: '1968 – 1975',
        title: 'Cộng sự của Đức Cha tiên khởi',
        content: 'Sát cánh cùng Đức Cha Giuse Trần Văn Thiện trong việc phát triển cơ cấu hành chính và mục vụ của Giáo phận Mỹ Tho còn non trẻ.'
      },
      {
        time: 'đầu 1975',
        title: 'Bàn giao sứ vụ',
        content: 'Hoàn thành nhiệm kỳ và trao lại quyền chánh sở cho Cha Giuse Nguyễn Văn Chúc.'
      }
    ],
    milestones: [
      'Chánh sở Nhà thờ Chánh Tòa Mỹ Tho 1965 – đầu 1975.',
      'Cha Sở Giáo xứ An Đức kiêm nhiệm họ đạo Bình Tạo (1959 – 1965).',
      'Giữ vững sinh hoạt phụng vụ tại nhà thờ mẹ của giáo phận suốt thời chiến.',
      'Tổ chức công tác bác ái trợ giúp đồng bào di tản về thành phố Mỹ Tho.'
    ]
  },
  {
    id: 'cha-nguyen-van-chuc',
    image: '/images/cha_nguyen_van_chuc.jpg',
    tableNote: 'Nhận xứ ngay trước biến cố tháng 4/1975, giữ vững sinh hoạt phụng vụ qua giai đoạn biến động nhất. Đầu năm 1975 ngài cùng giáo dân mua một căn nhà lá làm nhà nguyện, đặt nền móng cho Họ đạo Tân Long; từ 1975 đến 1992 ngài cùng Cha Phêrô Trần Xuân Lộc và Cha Đôminicô Lê Văn Bền — đều thuộc Giáo xứ Chánh Tòa — phụ trách họ đạo Tân Long. Năm 1995 ngài chủ trì xây tháp chuông tách rời khỏi thánh đường: đặt viên đá 16/02/1995, khánh thành 30/11/1995.',
    name: 'Lm. Giuse Nguyễn Văn Chúc',
    saintName: 'Thánh Giuse (Joseph)',
    role: 'Linh mục phục vụ Nhà thờ Chánh Tòa Mỹ Tho (1963 – 1998)',
    period: '1963 – 1998',
    death: '14/12/1999 tại Tiền Giang',
    origin: 'Giáo phận Mỹ Tho',
    source:
      'Kỷ yếu Mừng Năm Thánh 100 năm Nhà thờ Chánh Tòa Mỹ Tho (1907 – 2007), trang 49 — ghi "Giuse Nguyễn Văn Chúc (1963 – 1998)". Trang này trước đây ghi 1975 – 1999; nay sửa theo Kỷ yếu của chính giáo xứ. Khoảng thời gian ấy chồng lấn với Cha Ngô Văn Niềm (1965 – 1971) và Cha Micae Nguyễn Khoa Học (1960 – 1965), nên nhiều phần ngài phục vụ với tư cách cha phó trước khi làm chánh sở — Kỷ yếu ghi chung là "đã phục vụ Giáo xứ" chứ không phân định.',
    shortDesc: 'Vị mục tử nhân hiền, hiền hòa và tận tụy phục vụ giáo xứ Chánh Tòa suốt hơn 20 năm qua giai đoạn đầy gian khó sau năm 1975. Dấu ấn kiến trúc lớn nhất của ngài là tháp chuông tách rời hẳn khỏi nhà thờ (1995): vì lo tiếng chuông rung chấn làm hư hại ngôi thánh đường xây từ 1906, ngài cho dựng một tháp chuông riêng — Đức Cha Anrê Nguyễn Văn Nam đặt viên đá đầu tiên ngày 16/02/1995, công trình khánh thành sau hơn 9 tháng vào ngày 30/11/1995.',
    chronology: [
      {
        time: '1975 – 1992',
        title: 'Giữ vững đức tin qua giai đoạn biến động',
        content: 'Nhận xứ ngay trước biến cố tháng 4/1975, ngài kiên trì ở lại, duy trì các thánh lễ và ổn định đời sống tinh thần cho giáo dân giữa bối cảnh xã hội đổi thay sâu sắc. Cùng thời gian này, ngài và Cha Phêrô Trần Xuân Lộc, Cha Đôminicô Lê Văn Bền — đều thuộc Giáo xứ Chánh Tòa — phụ trách họ đạo Tân Long cho đến năm 1992.'
      },
      {
        time: 'đầu 1975',
        title: 'Đặt nền móng Họ đạo Tân Long',
        content: 'Dù hoàn cảnh kinh tế xã hội hết sức thắt ngặt, ngài cùng giáo dân vẫn mua một căn nhà lá làm nhà nguyện — nền móng đầu tiên hình thành Họ đạo Tân Long sau này.'
      },
      {
        time: '1975 – 1985',
        title: 'Dẫn dắt họ đạo qua thời kỳ gian nan',
        content: 'Kiên trì dâng thánh lễ hằng ngày, giữ vững sự hiệp nhất trong cộng đoàn giáo xứ và duy trì các lớp giáo lý bí tích.'
      },
      {
        time: '1995',
        title: 'Xây dựng Tháp chuông tách rời (16/02 – 30/11/1995)',
        content: 'Để tránh rung chấn làm hư hại vòm và tường gạch cổ của nhà thờ xây từ năm 1906, ngài cho dựng một tháp chuông tách hẳn khỏi thánh đường. Đức Cha Anrê Nguyễn Văn Nam đặt viên đá đầu tiên ngày 16/02/1995; sau hơn 9 tháng thi công, tháp chuông mới được khánh thành ngày 30/11/1995 và trở thành biểu tượng của Chánh Tòa Mỹ Tho.'
      },
      {
        time: '1998 – 1999',
        title: 'Phục vụ tại Bà Tồn và an nghỉ trong Chúa',
        content: 'Tiếp tục dấn thân mục vụ tại Giáo xứ Bà Tồn cho đến khi được Chúa gọi về ngày 14/12/1999.'
      }
    ],
    milestones: [
      'Chủ trì xây dựng tháp chuông tách rời khỏi nhà thờ (đặt viên đá 16/02/1995, khánh thành 30/11/1995) để bảo vệ ngôi thánh đường cổ.',
      'Đặt nền móng cho Họ đạo Tân Long (đầu năm 1975).',
      'Mục tử nhân ái gìn giữ sự bình an và đức tin kiên trung của Giáo xứ Chánh Tòa suốt hơn 20 năm.',
      'Thành lập họ đạo Tân Long và chăm lo đời sống người nghèo khó.'
    ],
    works: [
      {
        time: 'Đặt viên đá 16/02/1995 — khánh thành 30/11/1995',
        name: 'Tháp chuông tách rời Nhà thờ Chánh Tòa',
        now: 'tháp chuông đứng riêng bên cạnh nhà thờ, nhìn thấy ngay từ đường Hùng Vương',
        detail:
          'Dựng tháp chuông thành một khối riêng, tách khỏi thân nhà thờ, nhằm gỡ tải trọng và rung chấn của bộ chuông khỏi ngôi thánh đường đã gần chín mươi tuổi. Đây là lý do Nhà thờ Chánh Tòa Mỹ Tho có tháp chuông đứng riêng như hiện nay.'
      },
      {
        time: 'Đầu năm 1975',
        name: 'Họ đạo Tân Long',
        detail:
          'Đặt nền móng và thành lập họ đạo Tân Long ngay trong giai đoạn biến động nhất của lịch sử giáo phận.'
      }
    ]
  },
  {
    id: 'cha-rene-detry',
    name: 'Lm. René Detry (MEP)',
    saintName: 'Thừa sai Hội Thừa Sai Paris — người Bỉ',
    role: 'Linh mục Chánh sở Nhà thờ Chánh Tòa Mỹ Tho (1948 – 1949)',
    period: '1948 – 1949',
    birth: '26/06/1890 tại Couillet, giáo phận Tournai, tỉnh Hainaut, Bỉ',
    death: '24/06/1983 tại Audregnies, Bỉ — trước sinh nhật thứ 94 đúng một ngày; an táng tại nghĩa trang Jurbise',
    origin: 'Hội Thừa Sai Paris (MEP), người Bỉ — hồ sơ IRFA 3246',
    priestOrdination: 'Thụ phong linh mục ngày 10/08/1913 tại Tournai',
    image: '/images/cha_rene_detry.jpg',
    source:
      'Kỷ yếu Mừng Năm Thánh 100 năm Nhà thờ Chánh Tòa Mỹ Tho (1907 – 2007), trang 49 — ghi "René Detry (1948 – 1949)" kèm chân dung. Tiểu sử theo hồ sơ lưu trữ IRFA 3246.',
    tableNote:
      'Vị thừa sai cuối cùng coi sóc họ đạo, và là người Bỉ chứ không phải người Pháp. Kế nhiệm Cha Bar sau khi vị này qua đời tại nhiệm sở năm 1948; nhiệm kỳ chỉ hơn một năm.',
    shortDesc:
      'Thừa sai người Bỉ, nghệ sĩ vĩ cầm, say mê nhiếp ảnh và điện ảnh. Đức cha Cassaigne cho ngài chọn giữa Đà Lạt và Mỹ Tho — ngài chọn Mỹ Tho. Nhiệm kỳ chỉ hơn một năm rồi ngài từ nhiệm và về hẳn châu Âu.',
    chronology: [
      {
        time: '1890 – 1913',
        title: 'Xuất thân và ơn gọi tại Bỉ',
        content:
          'Sinh ngày 26/06/1890 tại Couillet, giáo phận Tournai, vùng Charleroi, tỉnh Hainaut nước Bỉ. Anh cả của ngài là Cha Désiré, linh mục giáo phận Tournai. Học tiểu chủng viện Bonne-Espérance rồi đại chủng viện Tournai; chịu chức phó tế ngày 06/10/1912 và thụ phong linh mục ngày 10/08/1913. Làm cha phó tại Obourg, giáo sư Trường Saint Vincent de Soignies, rồi cha phó La Bouverie.'
      },
      {
        time: '22/04/1922',
        title: 'Đơn xin gia nhập Hội Thừa Sai — sau nhiều lần bị từ chối',
        content:
          'Ngài mở đầu lá đơn bằng một câu Thánh vịnh: "Laqueus contritus est, et nos liberati sumus" — "Lưới đã đứt và chúng tôi thoát được". Hồ sơ IRFA ghi đây hẳn là ám chỉ những lần xin trước đã bị bác: Đức Giám mục thì đồng ý, nhưng cha Tổng Đại Diện thì không. Ngài được nhận ngày 30/04/1922.'
      },
      {
        time: '1923 – 1947',
        title: 'Hai mươi lăm năm tại Nam Kỳ',
        content:
          'Tới Sài Gòn đầu tháng 11/1923, học tiếng Việt tại Cái Mơn. Vốn là nhạc sĩ có đôi tai tinh, ngài bắt các thanh điệu tiếng Việt rất nhanh và phát âm chuẩn. Lần lượt làm cha phó Nhà thờ Chánh Tòa Sài Gòn, cha sở Thủ Dầu Một (từ 02/1932), giáo sư tín lý Đại Chủng viện Sài Gòn, rồi cha sở Xóm Chiếu và Chợ Quán — nơi ngài ở khoảng mười năm. Ngày 25/09/1945, giữa làn sóng bài ngoại sau các biến cố tháng 9/1945, ngài phải rời Chợ Quán về lánh tại Toà Giám mục Sài Gòn.'
      },
      {
        time: '26/03/1948',
        title: 'Chọn Mỹ Tho thay vì Đà Lạt',
        content:
          'Sau hai năm dưỡng bệnh tại Bỉ, ngài trở lại nhiệm sở. Đức cha Cassaigne đưa ra hai lựa chọn — Đà Lạt hoặc Mỹ Tho — và ngài chọn Mỹ Tho, về kế nhiệm Cha Henri Bar vừa qua đời tại nhiệm sở ngày 19/03/1948.'
      },
      {
        time: '1948 – 1949',
        title: 'Một năm tại Chánh Tòa rồi từ nhiệm',
        content:
          'Hồ sơ IRFA ghi thẳng: tuy tình hình đã lắng bớt, tại Mỹ Tho vẫn hình thành một nhóm nhỏ không đồng thuận với cha sở mới, điều ấy đè nặng lên một con người vốn rất nhạy cảm như ngài. Ngài không muốn cố chấp, xin từ nhiệm và về hẳn châu Âu, tới Pháp ngày 06/09/1949.'
      },
      {
        time: '1949 – 1983',
        title: 'Ba mươi tư năm cuối tại Bỉ',
        content:
          'Coi sóc lần lượt các giáo xứ Forêt-lès-Anvin, Erbisouil và Herchies, rồi làm tuyên uý bệnh viện Sept-Douleurs tại Frameries. Năm 1963 ngài về với người anh Désiré, lo phần thiêng liêng cho các nữ tu và người trọ tại Foyer Notre-Dame ở Audregnies, phục vụ tới năm 1980. Ngài qua đời tại đó ngày 24/06/1983, trước sinh nhật thứ 94 đúng một ngày.'
      }
    ],
    milestones: [
      'Vị thừa sai cuối cùng coi sóc họ đạo Mỹ Tho — và là người Bỉ, không phải người Pháp.',
      'Nghệ sĩ vĩ cầm, say mê nhiếp ảnh và điện ảnh; thú tiêu khiển ưa thích là vẽ phong cảnh và những gương mặt có thần.',
      'Học tiếng Việt rất nhanh nhờ đôi tai nhạc sĩ, phát âm đúng thanh điệu.',
      'Từ nhiệm thay vì cố giữ chức khi gặp chống đối — "ngài không muốn cố chấp".'
    ]
  },
  {
    id: 'cha-nguyen-thanh-thong',
    name: 'Lm. Phêrô Nguyễn Thành Thông',
    saintName: 'Thánh Phêrô Tông Đồ',
    role: 'Linh mục phục vụ Nhà thờ Chánh Tòa Mỹ Tho (1959 – 1961)',
    period: '1959 – 1961',
    origin: 'Giáo phận Mỹ Tho',
    image: '/images/cha_nguyen_thanh_thong.jpg',
    source: 'Kỷ yếu Mừng Năm Thánh 100 năm Nhà thờ Chánh Tòa Mỹ Tho (1907 – 2007), trang 49, kèm chân dung.',
    tableNote:
      'Phục vụ họ đạo đúng vào khúc giao thời: Giáo phận Mỹ Tho được thiết lập ngày 24/11/1960 và nhà thờ được nâng lên hàng Chánh Tòa ngay trong nhiệm kỳ của ngài.',
    shortDesc:
      'Phục vụ Nhà thờ Chánh Tòa trong hai năm bản lề 1959 – 1961, đúng lúc Giáo phận Mỹ Tho được khai sinh và ngôi thánh đường được nâng lên hàng Chánh Tòa.',
    chronology: [
      {
        time: '1959 – 1961',
        title: 'Phục vụ Nhà thờ Chánh Tòa',
        content:
          'Nhiệm kỳ của ngài trùng với mốc lớn nhất trong lịch sử ngôi thánh đường: ngày 24/11/1960, Tông hiến Venerabilium Nostrorum thiết lập Giáo phận Mỹ Tho và nâng nhà thờ Mỹ Tho lên hàng Nhà thờ Chính Tòa, tước hiệu Đức Mẹ Vô Nhiễm Nguyên Tội.'
      }
    ],
    milestones: ['Phục vụ họ đạo đúng năm Giáo phận Mỹ Tho được khai sinh và nhà thờ được nâng lên hàng Chánh Tòa.']
  },
  {
    id: 'cha-ho-ban-chanh',
    source:
      'Kỷ yếu Mừng Năm Thánh 100 năm Nhà thờ Chánh Tòa Mỹ Tho (1907 – 2007) — chân dung và ảnh chụp nguyên văn Giấy Bổ Nhiệm ngày 18/05/1998. Trang này trước đây ghi nhiệm kỳ 1999 – 2005; nay sửa thành 1998 – 2005 theo chính văn thư bổ nhiệm. Danh sách GP Mỹ Tho 2009 ghi ngài là Tổng Đại Diện Giáo phận; giaophanmytho.net (03/2011) gọi ngài là "nguyên Tổng Đại Diện", sau coi sóc Giáo xứ Thủ Ngữ.',
    image: '/images/cha_ho_ban_chanh_kyyeu.jpg',
    name: 'Lm. Phêrô Hồ Bản Chánh',
    saintName: 'Thánh Phêrô Tông Đồ',
    role: 'Tổng Đại Diện Giáo phận kiêm Chánh sở Nhà thờ Chánh Tòa Mỹ Tho (1998 – 2005)',
    period: '1998 – 2005',
    origin: 'Giáo phận Mỹ Tho',
    tableNote: 'Kế nhiệm Cha Giuse Nguyễn Văn Chúc, coi sóc họ đạo Chánh Tòa qua thời kỳ Đại Năm Thánh 2000 — dịp Đức Cha Phaolô Bùi Văn Đọc cử hành Lễ Cung hiến Nhà thờ Chánh Tòa ngày 21/01/2000. Ngài nhận cùng lúc hai trọng trách theo Giấy Bổ Nhiệm ngày 18/05/1998.',
    shortDesc: 'Được Đức cha Anrê Nguyễn Văn Nam bổ nhiệm ngày 18/05/1998, cùng lúc làm Tổng Đại Diện Giáo phận và phụ trách Giáo xứ Chánh Tòa. Ngài coi sóc họ đạo Chánh Tòa qua thời kỳ Đại Năm Thánh 2000 — giai đoạn ngôi thánh đường được Đức Cha Phaolô Bùi Văn Đọc long trọng cử hành Lễ Cung hiến ngày 21/01/2000 và nhận Lễ Đức Mẹ Hồn Xác Lên Trời làm lễ Bổn mạng thứ hai. Năm 2005 ngài chuyển giao giáo xứ cho Cha Giacôbê Hà Văn Xung. Về sau ngài xin thôi chức Tổng Đại Diện và về coi sóc Giáo xứ Thủ Ngữ.',
    chronology: [
      {
        time: '18/05/1998',
        title: 'Giấy Bổ Nhiệm của Đức cha Anrê Nguyễn Văn Nam',
        content:
          'Toà Giám mục Mỹ Tho ban hành Giấy Bổ Nhiệm, nguyên văn: "Vì nhu cầu mục vụ của Giáo Phận, sau khi suy nghĩ, cầu nguyện và lấy ý kiến tham vấn của một số Cha trong Giáo Phận, tôi quyết định đề cử: Cha làm Linh Mục Tổng Đại Diện Giáo Phận và về phụ trách Giáo Xứ Chánh Tòa Mỹ Tho." Văn thư ký tại Mỹ Tho ngày 18/05/1998, do Đức cha Anrê Nguyễn Văn Nam — Giám mục Giáo phận Mỹ Tho — ký và đóng dấu. Như vậy ngài nhận cùng lúc hai trọng trách: Tổng Đại Diện Giáo phận và Chánh sở Nhà thờ Chánh Tòa.'
      },
      {
        time: '1999',
        title: 'Nhận Nhà thờ Chánh Tòa',
        content: 'Được bổ nhiệm làm Cha sở Nhà thờ Chánh Tòa Mỹ Tho sau khi Cha Giuse Nguyễn Văn Chúc mãn nhiệm.'
      },
      {
        time: '2000',
        title: 'Đại Năm Thánh & Lễ Cung hiến',
        content: 'Coi sóc họ đạo trong dịp Đại Năm Thánh 2000. Ngày 21/01/2000 Đức Cha Phaolô Bùi Văn Đọc cử hành Lễ Cung hiến Nhà thờ Chánh Tòa Mỹ Tho và chọn Lễ Đức Mẹ Hồn Xác Lên Trời làm lễ Bổn mạng thứ hai của nhà thờ.'
      },
      {
        time: '2005',
        title: 'Chuyển giao sứ vụ',
        content: 'Trao lại quyền chánh sở cho Cha Giacôbê Hà Văn Xung.'
      },
      {
        time: 'sau 2005',
        title: 'Tổng Đại Diện Giáo phận Mỹ Tho',
        content: 'Được đặt làm Tổng Đại Diện Giáo phận Mỹ Tho, đồng thời là Phó Chủ tịch Hội đồng Mục vụ Giáo phận. Đến năm 2011 ngài xin thôi chức Tổng Đại Diện và về coi sóc Giáo xứ Thủ Ngữ.'
      }
    ],
    milestones: [
      'Chánh sở Nhà thờ Chánh Tòa Mỹ Tho 1999 – 2005.',
      'Coi sóc họ đạo trong dịp Lễ Cung hiến Nhà thờ Chánh Tòa, Đại Năm Thánh 2000.',
      'Tổng Đại Diện Giáo phận Mỹ Tho.'
    ]
  },
  {
    id: 'cha-ha-van-xung',
    priestOrdination: 'Thụ phong Linh mục ngày 27/06/1992',
    source: 'Tư liệu giáo xứ (thụ phong 27/06/1992; về Tòa Giám mục năm 1999, sáu năm sau được trao giáo xứ Chánh Tòa) + giaophanmytho.net (chủ trì trùng tu khởi công 14/06/2006; danh sách linh mục đoàn 2009 ghi ngài ở Chánh Tòa)',
    tableNote: 'Thụ phong 27/06/1992, làm phó biệt cư họ đạo Tân Phước hai năm, du học Pháp về mục vụ giáo lý từ 1994, về Tòa Giám mục năm 1999 làm thư ký Đức Cha Phaolô Bùi Văn Đọc và đặc trách giáo lý toàn giáo phận; sáu năm sau được trao giáo xứ Chánh Tòa. Chủ trì đợt trùng tu 100 năm (khởi công 14/06/2006, lễ tạ ơn 21/05/2007), xây Đài Đức Mẹ (2009) và Nhà Mục vụ Giáo xứ (2020).',
    name: 'Linh mục Giacôbê Hà Văn Xung',
    saintName: 'Thánh Giacôbê Tông Đồ (James / Jacob)',
    role: 'Linh mục Trưởng Hạt (Hạt Trưởng) Giáo hạt Mỹ Tho • Linh mục Chánh xứ Nhà thờ Chánh Tòa Mỹ Tho',
    period: '2005 – nay',
    birth: 'Giáo phận Mỹ Tho',
    origin: 'Giáo phận Mỹ Tho',
    motto: '“Tôi tớ trung tín phục vụ Dân Chúa”',
    mottoLatin: 'In Caritate et Ministerio',
    image: '/images/cha_so_ha_van_xung.jpg',
    shortDesc: 'Linh mục Trưởng Hạt (Hạt Trưởng) Giáo hạt Mỹ Tho kiêm Linh mục Chánh xứ Nhà thờ Chánh Tòa Mỹ Tho. Ngài luôn đồng hành chặt chẽ cùng Đức Giám mục Giáo phận, điều phối sứ vụ mục tử liên xứ trong giáo hạt, chăm lo đời sống thiêng liêng cho cộng đoàn Chánh Tòa và dẫn dắt các phong trào hội đoàn giáo dân.',
    chronology: [
      {
        time: '1992 – 1994',
        title: 'Thụ phong Linh mục & Bài sai đầu tiên',
        content: 'Thụ phong linh mục ngày 27/06/1992. Bài sai đầu tiên là phó biệt cư tại họ đạo Tân Phước, phục vụ ở đó hai năm.'
      },
      {
        time: '1994 – 1999',
        title: 'Du học Pháp về Mục vụ Giáo lý',
        content: 'Được bề trên cử đi du học tại Pháp, chuyên ngành mục vụ giáo lý.'
      },
      {
        time: '1999 – 2005',
        title: 'Thư ký Đức Giám mục & Đặc trách Giáo lý Giáo phận',
        content: 'Về công tác tại Tòa Giám mục Giáo phận Mỹ Tho, làm thư ký cho Đức Cha Phaolô Bùi Văn Đọc và đặc trách các hoạt động giáo lý trong toàn giáo phận.'
      },
      {
        time: '2005',
        title: 'Nhận coi sóc Giáo xứ Chánh Tòa',
        content: 'Sáu năm sau khi về Tòa Giám mục, ngài được trao phó trông coi giáo xứ Chánh Tòa, kế nhiệm Cha Phêrô Hồ Bản Chánh, và gắn bó với "nhà thờ mẹ" của giáo phận từ đó đến nay.'
      },
      {
        time: '2009',
        title: 'Tôn tạo Đài Đức Mẹ',
        content: 'Xây dựng lại Đài Đức Mẹ quy mô và trang nghiêm hơn ngay giữa khuôn viên nhà thờ.'
      },
      {
        time: 'Trọng trách Giáo Hạt',
        title: 'Linh mục Trưởng Hạt (Hạt Trưởng) Giáo hạt Mỹ Tho',
        content: 'Được Đức Giám mục Giáo phận tín nhiệm giao phó trọng trách Linh mục Trưởng Hạt (Hạt Trưởng) Giáo hạt Mỹ Tho. Ngài chịu trách nhiệm điều phối công tác mục vụ giữa các giáo xứ trong hạt, chủ tọa các phiên họp linh mục hạt, tổ chức các cuộc hành hương Năm Thánh, đại lễ liên xứ và gắn kết sự hiệp thông với Tòa Giám mục.'
      },
      {
        time: 'Mục tử Chánh xứ',
        title: 'Cha Sở Nhà thờ Chánh Tòa Mỹ Tho',
        content: 'Trực tiếp coi sóc ngôi Thánh đường Mẹ của Giáo phận Mỹ Tho. Ngài đã xin ý kiến Đức Giám mục để trùng tu và nới rộng nhà thờ nhân 100 năm xây dựng: lễ khởi công ngày 14/06/2006, gồm thay mái ngói, nới rộng hai bên hông, xây lại phòng thánh, cải tạo tháp chuông và đặt 14 chặng Đàng Thánh Giá quanh nhà thờ. Sau 9 tháng thi công, ngày 21/05/2007 Đức Giám mục dâng lễ tạ ơn và khai mạc Năm Thánh mừng 100 năm. Ngài còn khánh thành Nhà Mục vụ Giáo xứ (2020) và công trình Lễ đài Đức Mẹ.'
      },
      {
        time: 'Sứ vụ Mục vụ',
        title: 'Cử hành Phụng vụ & Đồng hành Đoàn thể',
        content: 'Chủ tế và đồng tế trong các thánh lễ đại triều của Giáo phận, cử hành các bí tích, giải tội, xức dầu bệnh nhân, chăm sóc người cao tuổi, và linh hướng cho các đoàn thể nòng cốt như Xứ Đoàn Thiếu Nhi Thánh Thể Các Thánh Tử Đạo Việt Nam, Huynh Trưởng và Hội Các Bà Mẹ Công Giáo.'
      }
    ],
    milestones: [
      'Linh mục Trưởng Hạt Giáo hạt Mỹ Tho, điều phối và gắn kết các linh mục cùng các cộng đoàn giáo xứ trong hạt.',
      'Linh mục Chánh xứ Nhà thờ Chánh Tòa Mỹ Tho, ngôi Thánh đường Mẹ của Giáo phận.',
      'Chủ trì công trình Đại trùng tu Bách Chu Niên Nhà thờ Chánh Tòa (2006 – 2007) và xây dựng Nhà Mục vụ Giáo xứ (2020).',
      'Mục tử tận tụy trong việc cử hành bí tích, chăm sóc mục vụ bệnh nhân và nâng đỡ các đoàn thể đức tin.'
    ],
    works: [
      {
        time: '2006 – 2007',
        name: 'Đại trùng tu Bách Chu Niên Nhà thờ Chánh Tòa',
        now: 'diện mạo Nhà thờ Chánh Tòa mà giáo dân thấy hiện nay',
        detail:
          'Trùng tu toàn diện ngôi thánh đường đúng dịp tròn một trăm năm ngày khởi công (11/08/1906), giữ nguyên kiến trúc gốc thời Cha Rénier.'
      },
      {
        time: '2020',
        name: 'Nhà Mục vụ Giáo xứ',
        now: 'Nhà Mục vụ trong khuôn viên Giáo xứ Chánh Tòa, nơi Xứ Đoàn sinh hoạt',
        detail:
          'Xây dựng nhà mục vụ phục vụ giáo lý, sinh hoạt đoàn thể và các lớp huấn luyện của giáo xứ, trong đó có Xứ Đoàn Thiếu Nhi Thánh Thể.'
      }
    ]
  }
];

/**
 * Một dòng của bảng niên biểu cha sở: hoặc trỏ tới lý lịch đã có, hoặc là
 * khoảng trống lịch sử chưa tra được nguồn.
 */
/**
 * Các cha phó xứ. Để riêng vì bảng niên biểu chỉ liệt kê hàng chánh sở; các
 * ngài được nhắc trong phần ghi chú dưới bảng.
 */
export const CHA_PHO_BIOS: DetailedBioRecord[] = [
  {
    id: 'cha-tran-xuan-loc',
    name: 'Lm. Phêrô Trần Xuân Lộc',
    saintName: 'Thánh Phêrô Tông Đồ',
    role: 'Cha Phó xứ Nhà thờ Chánh Tòa Mỹ Tho (1958 – 1983)',
    period: '1958 – 1983',
    origin: 'Giáo phận Mỹ Tho',
    image: '/images/cha_tran_xuan_loc.jpg',
    source:
      'Kỷ yếu Mừng Năm Thánh 100 năm Nhà thờ Chánh Tòa Mỹ Tho (1907 – 2007), trang 49, ghi rõ "Phêrô Trần Xuân Lộc (Phó xứ 1958 – 1983)" kèm chân dung. Bài Gx. Tân Long trên giaophanmytho.net cũng nêu tên ngài trong nhóm các cha phụ trách Giáo xứ Chánh Tòa giai đoạn 1975 – 1992.',
    tableNote:
      'Hai mươi lăm năm làm cha phó — nhiệm kỳ phó xứ dài nhất được ghi nhận tại Chánh Tòa, trải qua bốn đời cha sở và cả biến cố năm 1975.',
    shortDesc:
      'Cha phó xứ Nhà thờ Chánh Tòa suốt hai mươi lăm năm, từ 1958 đến 1983 — nhiệm kỳ phó xứ dài nhất được ghi nhận, trải qua bốn đời cha sở và cả giai đoạn biến động sau năm 1975.',
    chronology: [
      {
        time: '1958 – 1983',
        title: 'Hai mươi lăm năm làm cha phó',
        content:
          'Ngài bắt đầu phục vụ trước khi Giáo phận Mỹ Tho được thành lập và tiếp tục cho tới năm 1983, đi qua các đời cha sở Nguyễn Minh Chiếu, Nguyễn Thành Thông, Nguyễn Khoa Học, Ngô Văn Niềm và Nguyễn Văn Chúc.'
      },
      {
        time: '1975 – 1983',
        title: 'Giai đoạn sau năm 1975',
        content:
          'Bài Gx. Tân Long ghi: "Từ năm 1975 đến 1992, các cha thuộc Giáo xứ Chánh Tòa phụ trách gồm có: cha Giuse Nguyễn Văn Chúc, cha Phêrô Trần Xuân Lộc, và cha Đôminicô Lê Văn Bền."'
      }
    ],
    milestones: [
      'Nhiệm kỳ cha phó dài nhất được ghi nhận tại Nhà thờ Chánh Tòa: hai mươi lăm năm.',
      'Cùng Cha Nguyễn Văn Chúc và Cha Lê Văn Bền gánh vác họ đạo trong giai đoạn khó khăn sau năm 1975.'
    ]
  },
  {
    id: 'cha-le-van-ben',
    name: 'Lm. Đôminicô Lê Văn Bền',
    saintName: 'Thánh Đôminicô',
    role: 'Cha Phó xứ Nhà thờ Chánh Tòa Mỹ Tho (1970 – 1984)',
    period: '1970 – 1984',
    origin: 'Giáo phận Mỹ Tho',
    image: '/images/cha_le_van_ben.jpg',
    source:
      'Kỷ yếu Mừng Năm Thánh 100 năm Nhà thờ Chánh Tòa Mỹ Tho (1907 – 2007), trang 49, ghi rõ "Đôminicô Lê Văn Bền (Phó xứ 1970 – 1984)" kèm chân dung. Bài Gx. Tân Long trên giaophanmytho.net cũng nêu tên ngài trong nhóm các cha phụ trách Giáo xứ Chánh Tòa giai đoạn 1975 – 1992.',
    tableNote:
      'Mười bốn năm làm cha phó, cùng Cha Trần Xuân Lộc và Cha Nguyễn Văn Chúc gánh vác họ đạo qua biến cố 1975.',
    shortDesc:
      'Cha phó xứ Nhà thờ Chánh Tòa từ 1970 đến 1984, cùng Cha Phêrô Trần Xuân Lộc và Cha Giuse Nguyễn Văn Chúc gánh vác họ đạo qua biến cố năm 1975 và những năm khó khăn tiếp theo.',
    chronology: [
      {
        time: '1970 – 1984',
        title: 'Mười bốn năm làm cha phó',
        content:
          'Ngài phục vụ suốt giai đoạn chuyển tiếp khó khăn nhất của họ đạo, từ cuối thời Cha Ngô Văn Niềm cho tới giữa thời Cha Nguyễn Văn Chúc.'
      }
    ],
    milestones: ['Cùng Cha Trần Xuân Lộc và Cha Nguyễn Văn Chúc gánh vác Giáo xứ Chánh Tòa giai đoạn 1975 – 1984.']
  },
];

export interface PastorTimelineRow {
  period: string;
  bioId?: string;
  name?: string;
  note?: string;
  source?: string;
  sortKey?: number;
}

/**
 * Các khoảng thời gian chưa xác định được ai coi sóc họ đạo. Giữ lại trong
 * bảng để người đọc thấy rõ đâu là chỗ còn thiếu tư liệu, thay vì kéo dài
 * niên hiệu của vị trước cho liền mạch một cách sai lệch.
 */
export const PASTOR_GAPS: PastorTimelineRow[] = [];

/** Năm bắt đầu của một mốc thời gian, dùng để xếp bảng theo đúng niên đại. */
function startYear(period: string): number | null {
  const m = period.match(/\d{4}/);
  return m ? Number(m[0]) : null;
}

/**
 * PASTORS_EXTENDED_DATA vốn đã xếp đúng niên đại. Mục nào chưa xác định được
 * năm (ví dụ Cha Huỳnh Kim Do) thì thừa kế năm của vị liền trước cộng một
 * phần nhỏ, để giữ nguyên vị trí trong chuỗi thay vì rơi xuống cuối bảng.
 */
let lastKnownYear = 0;
export const PASTOR_TIMELINE: PastorTimelineRow[] = [
  ...PASTORS_EXTENDED_DATA.map((p, i) => {
    const y = startYear(p.period);
    if (y !== null) lastKnownYear = y;
    return {
      period: p.period,
      bioId: p.id,
      name: p.name,
      note: p.tableNote,
      source: p.source,
      sortKey: (y ?? lastKnownYear) + i / 1000
    };
  }),
  ...PASTOR_GAPS.map((g) => ({ ...g, sortKey: startYear(g.period) ?? 0 }))
].sort((a, b) => a.sortKey - b.sortKey);

export const NON_PASTOR_BIOS: DetailedBioRecord[] = [
  {
    id: 'thanh-phero-nguyen-van-luu',
    name: 'Thánh Phêrô Nguyễn Văn Lựu',
    saintName: 'Thánh Phêrô',
    role: 'Linh mục Tử Đạo (1812 - 1861)',
    period: 'Tử đạo ngày 07/04/1861 tại Mỹ Tho',
    birth: 'Năm 1812 tại Gò Vấp, tỉnh Gia Định',
    death: '07/04/1861 tại pháp trường Mỹ Tho',
    origin: 'Gò Vấp, Giáo phận Đàng Trong',
    source: 'Hồ sơ Phong Thánh; Báo cáo của các thừa sai MEP',
    image: '/images/thanh_phero_luu.png',
    shortDesc: 'Vị linh mục tử đạo can trường, quản nhiệm họ đạo Ba Giồng và các vùng phụ cận. Bị bắt năm 1860 khi vào đồn Mỹ Tho thăm viếng giáo dân, ngài bị xử trảm ngày 07/04/1861 và thi hài được rước về Ba Giồng. Ngài được Giáo phận Mỹ Tho nhận làm Thánh Bổn mạng.',
    chronology: [
      {
        time: '1812 - 1853',
        title: 'Thân thế và Ơn gọi',
        content: 'Sinh tại Gò Vấp, dâng mình cho Chúa từ nhỏ. Ngài theo học tại Chủng viện Penang (Malaysia) và thụ phong linh mục.'
      },
      {
        time: 'Trước 1860',
        title: 'Sứ vụ mục tử',
        content: 'Coi sóc các họ đạo Mặc Bắc, Sa Đéc, và sau đó là vùng Ba Giồng, Mỹ Tho. Ngài nổi tiếng là vị mục tử hiền lành, tận tâm giảng dạy và không ngại gian khổ để ban các bí tích cho giáo dân.'
      },
      {
        time: '1860 - 07/04/1861',
        title: 'Bị bắt và Tử đạo',
        content: 'Năm 1860, khi lén vào đồn Mỹ Tho để thăm viếng và xưng tội cho giáo dân đang bị giam cầm, ngài bị lính phát hiện. Bị điệu ra tra khảo, ngài dõng dạc nhận mình là "đạo trưởng" và chấp nhận chịu mọi cực hình. Bị xử trảm ngày 07/04/1861 tại pháp trường ngoài thành Mỹ Tho.'
      }
    ],
    milestones: [
      'Năm 1861: Chịu phúc tử đạo tại Mỹ Tho.',
      'Ngày 02/05/1909: Được Đức Thánh Cha Piô X suy tôn Chân phước.',
      'Ngày 19/06/1988: Được Đức Thánh Cha Gioan Phaolô II phong Hiển Thánh.',
      'Là Thánh Bổn mạng của Giáo phận Mỹ Tho.'
    ]
  },
  {
    id: 'cha-eugene-faron',
    name: 'Lm. Eugène Faron (MEP)',
    saintName: 'Thừa sai Hội Thừa Sai Paris',
    role: 'Tuyên uý Quân y viện Mỹ Tho & Người xây Nhà thờ Thánh Tâm',
    period: 'Phục vụ tại Mỹ Tho các năm 1878 và từ 1882',
    birth: 'Sinh năm 1845 tại Pháp',
    death: 'Tháng 7/1895, tang lễ cử hành tại Mỹ Tho',
    priestOrdination: 'Thụ phong linh mục ngày 11/06/1870',
    origin: 'Hội Thừa Sai Paris (MEP) — Hồ sơ lưu trữ IRFA số 1189',
    source: 'Hồ sơ lưu trữ IRFA 1189',
    image: '/images/cha_faron.jpg',
    shortDesc: 'Vị linh mục thừa sai gắn bó với các thương binh, bệnh nhân và quân nhân Pháp tại Mỹ Tho. Ngài khởi đầu với vai trò tuyên uý quân y viện, sau đó quyên góp và xây dựng nhà thờ Thánh Tâm dành cho người Pháp và cộng đoàn Công giáo tại trung tâm tỉnh lỵ.',
    chronology: [],
    milestones: []
  },
  {
    id: 'cha-adrien-launay',
    name: 'Lm. Adrien Launay (MEP)',
    saintName: 'Thừa sai Hội Thừa Sai Paris',
    role: 'Cha phó kiêm Tuyên uý Quân y viện Mỹ Tho (1878 – 1879)',
    period: '1878 – 1879',
    origin: 'Hội Thừa Sai Paris (MEP) — Hồ sơ lưu trữ IRFA số 1325',
    source: 'Hồ sơ lưu trữ IRFA 1325',
    image: '/images/cha_launay.jpg',
    shortDesc: 'Phục vụ tại Mỹ Tho trong hai năm 1878-1879 với tư cách cha phó và tuyên uý. Về sau, ngài trở thành sử gia lỗi lạc của Hội Thừa Sai Paris, ghi chép và lưu giữ phần lớn lịch sử truyền giáo tại Viễn Đông.',
    chronology: [],
    milestones: []
  },
  {
    id: 'cha-jacques-hirbec',
    name: 'Lm. Jacques Hirbec (MEP)',
    saintName: 'Thừa sai Hội Thừa Sai Paris',
    role: 'Tuyên uý Quân y viện Mỹ Tho',
    period: 'Từ năm 1879',
    origin: 'Hội Thừa Sai Paris (MEP) — Hồ sơ lưu trữ IRFA số 1061',
    source: 'Hồ sơ lưu trữ IRFA 1061',
    image: '/images/cha_hirbec.jpg',
    shortDesc: 'Được Đức cha Colombert bổ nhiệm làm tuyên uý quân y viện Mỹ Tho năm 1879. Sau một thời gian ngắn phải đi dưỡng bệnh, ngài lại trở về tiếp tục nhiệm sở này, đồng hành cùng các bệnh nhân và giáo dân.',
    chronology: [],
    milestones: []
  },
  {
    id: 'cha-thieng',
    name: 'Cha Thiềng',
    saintName: '',
    role: 'Linh mục bản xứ',
    period: 'Trước năm 1861',
    origin: 'Giáo phận Tây Đàng Trong',
    source: 'Các báo cáo của Thừa sai MEP năm 1861',
    shortDesc: 'Vị linh mục bản xứ lão thành, năm 1861 dù đã 80 tuổi vẫn bị quan quân triều đình giam giữ tại đồn Mỹ Tho trong đợt bách hại dữ dội. Gương sáng của ngài và các giáo dân bị giam cầm đã làm chứng cho đức tin mãnh liệt của cộng đoàn tiên khởi.',
    chronology: [],
    milestones: []
  },
  {
    id: 'cha-phien',
    name: 'Cha Phiên',
    saintName: '',
    role: 'Linh mục phụ tá',
    period: 'Năm 1861',
    origin: 'Giáo phận Tây Đàng Trong',
    source: 'Các báo cáo của Thừa sai MEP (Cha Renier, Cha Guillou)',
    shortDesc: 'Linh mục bản xứ phụ tá cho Cha Bề trên Guillou trong giai đoạn 1861. Ngài được giao coi sóc ngôi nhà thờ lá nhỏ đầu tiên của họ đạo Mỹ Tho khi Cha Guillou bận rộn với các công tác mục vụ và cứu trợ giáo dân.',
    chronology: [],
    milestones: []
  }
];

export const ALL_COMMUNITY_BIOS: DetailedBioRecord[] = [
  ...BISHOPS_EXTENDED_DATA,
  ...PASTORS_EXTENDED_DATA,
  ...NON_PASTOR_BIOS,
  POPE_LEO_XIV_BIO
];

/**
 * Khăn quàng TNTT theo bảng "Mẫu khăn quàng và các cấp hiệu trong Phong trào
 * Thiếu Nhi Thánh Thể Việt Nam" của Liên đoàn Các Thánh Tử Đạo Việt Nam —
 * Giáo phận Mỹ Tho.
 *
 * LƯU Ý QUAN TRỌNG: khăn của các NGÀNH (Chiên Con, Ấu Nhi, Thiếu Nhi, Nghĩa
 * Sĩ, Hiệp Sĩ) đều KHÔNG CÓ VIỀN. Viền chỉ dành riêng cho đội trưởng và đội
 * phó. Bản dữ liệu trước đây gán viền cho mọi ngành là sai.
 */
export interface TnttScarf {
  id: string;
  name: string;
  /** Tuyên Uý không có khẩu hiệu riêng nên để trống. */
  motto?: string;
  age?: string;
  /** Màu khăn */
  scarf: string;
  scarfName: string;
  /** Màu Thánh Giá sau chéo */
  cross: string;
  crossName: string;
  /** Viền khăn — chỉ đặt khi cấp bậc đó thực sự có viền */
  trim?: string;
  trimName?: string;
  /** Quy định viền riêng cho đội trưởng / đội phó của ngành */
  leaderTrim?: string;
  symbolism: string;
}

/** Vẽ khăn quàng: hình tam giác đúng dáng khăn, có Thánh Giá chéo và viền nếu có. */
export function ScarfIcon({ scarf }: { scarf: TnttScarf }) {
  const needsOutline = scarf.scarf.toUpperCase() === '#FFFFFF';
  return (
    <svg viewBox="0 0 48 34" width={48} height={34} role="img" aria-label={`Khăn ${scarf.scarfName}`} style={{ flexShrink: 0 }}>
      <polygon
        points="2,3 46,3 24,31"
        fill={scarf.scarf}
        stroke={scarf.trim ?? (needsOutline ? 'var(--color-border-subtle)' : 'none')}
        strokeWidth={scarf.trim ? 2.5 : 1}
        strokeLinejoin="round"
      />
      <g stroke={scarf.cross} strokeWidth="2.2" strokeLinecap="round">
        <line x1="24" y1="9" x2="24" y2="19" />
        <line x1="19" y1="13" x2="29" y2="13" />
      </g>
    </svg>
  );
}

export const TNTT_NGANH: TnttScarf[] = [
  {
    id: 'chien-con',
    name: 'Chiên Con (Khai Tâm)',
    motto: 'Hiền Lành',
    age: '4 – 6 tuổi',
    scarf: '#F8A5C2',
    scarfName: 'Hồng',
    cross: '#DC2626',
    crossName: 'Thánh Giá đỏ, cỡ 4cm',
    leaderTrim: 'Đội trưởng và đội phó có 1 viền đỏ',
    symbolism: 'Màu hồng tượng trưng cho tâm hồn đơn sơ, trong trắng và vui tươi của các em.'
  },
  {
    id: 'au-nhi',
    name: 'Ấu Nhi',
    motto: 'Ngoan',
    age: '7 – 9 tuổi',
    scarf: '#4CAF50',
    scarfName: 'Xanh lá cây',
    cross: '#FBBF24',
    crossName: 'Thánh Giá vàng, cỡ 4cm',
    leaderTrim: 'Đội trưởng và đội phó có 1 viền đỏ',
    symbolism: 'Màu xanh mạ non diễn tả các em như một lá non trên cành cây đang vươn mình lớn dậy — màu của lứa tuổi hồn nhiên, ngây thơ, biểu tượng cho tâm tình luôn trông cậy vào cha mẹ và phó thác vào Chúa.'
  },
  {
    id: 'thieu-nhi',
    name: 'Thiếu Nhi',
    motto: 'Hy Sinh',
    age: '10 – 12 tuổi',
    scarf: '#1E3A8A',
    scarfName: 'Xanh dương',
    cross: '#FBBF24',
    crossName: 'Thánh Giá vàng, cỡ 5cm',
    leaderTrim: 'Đội trưởng và đội phó có 1 viền vàng',
    symbolism: 'Màu khăn xanh biển tượng trưng cho một sức sống mạnh mẽ như trời xanh biển rộng và một hy vọng lớn lao cho tương lai của Giáo Hội và quê hương.'
  },
  {
    id: 'nghia-si',
    name: 'Nghĩa Sĩ',
    motto: 'Chinh Phục',
    age: '13 – 15 tuổi',
    scarf: '#EAB308',
    scarfName: 'Vàng nghệ',
    cross: '#DC2626',
    crossName: 'Thánh Giá đỏ, cỡ 5cm',
    leaderTrim: 'Đội trưởng và đội phó có 1 viền đỏ',
    symbolism: 'Màu vàng nghệ tượng trưng cho bình minh đang ló dạng và toả sáng của lứa tuổi sắp vào đời, nhắc các em luôn thể hiện tinh thần vượt khó để chinh phục bản thân theo đường lối của Thiên Chúa.'
  },
  {
    id: 'hiep-si',
    name: 'Hiệp Sĩ',
    motto: 'Dấn Thân',
    age: '16 – 17 tuổi',
    scarf: '#6B4423',
    scarfName: 'Nâu đất',
    cross: '#FBBF24',
    crossName: 'Thánh Giá vàng, cỡ 5cm',
    leaderTrim: 'Đội trưởng và đội phó có 1 viền vàng',
    symbolism: 'Màu nâu như màu của đất, nơi dòng máu đức tin của các Thánh Tử Đạo Việt Nam đã đổ ra và chảy vào lòng đất mẹ — nói lên lòng trung thành với đất nước và tình yêu đối với Thiên Chúa, xứng đáng với tuổi hiệp sĩ hào hùng.'
  }
];

export const TNTT_HUYNH_TRUONG: TnttScarf[] = [
  {
    id: 'du-truong',
    name: 'Dự Trưởng',
    motto: 'Phụng Sự',
    age: 'Giáo lý viên dự bị',
    scarf: '#DC2626',
    scarfName: 'Đỏ, không viền',
    cross: '#FBBF24',
    crossName: 'Thánh Giá cỡ 6cm',
    symbolism: 'Khăn đỏ không viền nói lên sự sửa soạn để trở thành Huynh Trưởng chính thức. Màu đỏ là màu của sự hy sinh và tràn đầy sức sống dám quên mình để tập phục vụ Chúa qua các em một cách vui tươi và hăng hái.'
  },
  {
    id: 'huynh-truong',
    name: 'Huynh Trưởng',
    motto: 'Phụng Sự',
    age: 'Giáo lý viên các cấp',
    scarf: '#DC2626',
    scarfName: 'Đỏ',
    cross: '#FBBF24',
    crossName: 'Thánh Giá vàng, cỡ 6cm',
    trim: '#FBBF24',
    trimName: '1 viền vàng',
    symbolism: 'Màu đỏ là màu của máu, tượng trưng cho sự hy sinh hiến tế và gian khổ mà người Huynh Trưởng phải chấp nhận để hướng dẫn và dìu dắt các em đến với Chúa. Viền vàng tượng trưng cho niềm vui mừng và hy vọng.'
  },
  {
    id: 'huan-luyen-vien',
    name: 'Huấn Luyện Viên',
    motto: 'Sẵn Sàng',
    age: 'Ban huấn luyện các sa mạc',
    scarf: '#7C3AED',
    scarfName: 'Tím',
    cross: '#FBBF24',
    crossName: 'Thánh Giá vàng, cỡ 6cm',
    trim: '#FBBF24',
    trimName: 'Viền vàng (cấp I), thêm viền xanh dương (cấp II), thêm viền xanh lá (cấp III)',
    symbolism: 'Màu tím là màu của sự hãm mình hy sinh trong vui tươi và tràn đầy hy vọng; màu của sự "sẵn sàng", tự thân và tự huấn luyện để nhắc nhớ người Huấn Luyện Viên phải biết mình luôn hy sinh, phục vụ không quản ngại khó khăn.'
  },
  {
    id: 'tro-ta',
    name: 'Trợ Tá',
    motto: 'Phục Vụ',
    age: 'Cộng tác viên giáo dân',
    scarf: '#DC2626',
    scarfName: 'Đỏ',
    cross: '#2563EB',
    crossName: 'Thánh Giá xanh dương, cỡ 6cm',
    trim: '#2563EB',
    trimName: 'Viền xanh dương',
    symbolism: 'Màu đỏ là màu của hy lễ và lòng hy sinh nhẫn nại phục vụ. Viền xanh nước biển — màu của Thiếu Nhi — nói lên lòng quảng đại phục vụ các em Thiếu Nhi của người Trợ Tá.'
  },
  {
    id: 'tro-uy',
    name: 'Trợ Uý',
    motto: 'Nhiệt Thành',
    age: 'Tu sĩ nam nữ',
    scarf: '#DC2626',
    scarfName: 'Đỏ',
    cross: '#FFFFFF',
    crossName: 'Thánh Giá trắng, cỡ 6cm',
    trim: '#FFFFFF',
    trimName: 'Viền trắng',
    symbolism: 'Màu đỏ là màu của hy lễ hiến tế và hy sinh phục vụ. Viền trắng — màu khăn của tuyên uý — tượng trưng sự trong sạch, sự nhẫn nại và lòng độ lượng của người Trợ Uý trong Phong trào.'
  },
  {
    id: 'tuyen-uy',
    name: 'Tuyên Uý',
    age: 'Linh mục',
    scarf: '#FFFFFF',
    scarfName: 'Trắng',
    cross: '#FBBF24',
    crossName: 'Thánh Giá vàng, cỡ 6cm',
    trim: '#FBBF24',
    trimName: 'Viền vàng',
    symbolism: 'Màu trắng là màu trong sạch, tượng trưng cho sự trong sáng tinh tuyền, niềm hy vọng và lòng cậy trông để dâng hiến cuộc đời làm hy tế và làm chứng tá cho Chúa và Giáo Hội. Vì vậy, Ngài sẽ là Người đại diện cho Chúa để hướng dẫn Đoàn Thiếu Nhi Thánh Thể.'
  }
];

/**
 * Các đời cha tuyên uý Xứ Đoàn, tính từ ngày tái lập năm 2005.
 * Nguồn: ghi chép của Xứ Đoàn, do Ban Điều Hành cung cấp.
 */

/**
 * Ghi chú riêng của từng thánh lễ Chúa Nhật tại Chánh Tòa. Khoá theo giờ: Admin
 * đổi giờ thì ghi chú tự biến mất, không dán nhầm sang thánh lễ khác.
 */
export const SUNDAY_MASS_NOTES: Record<string, string> = {
  '05:30': 'Thánh lễ sáng sớm',
  '07:00': 'Lễ dành cho Thiếu nhi & Giới trẻ',
  '16:00': 'Lễ chiều',
  '18:00': 'Lễ chiều tối'
};

export const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

/**
 * Lý lịch các đời cha tuyên uý Xứ Đoàn.
 *
 * Nguồn gốc dữ liệu:
 *  - Năm sinh, năm chịu chức và nhiệm sở: danh sách Linh mục đương nhiệm Giáo
 *    phận Mỹ Tho cập nhật 11.2024 (giaophanmytho.net).
 *  - Ngày sinh, ngày chịu chức và quê quán: thông báo và bản tin phong chức
 *    của Toà Giám mục Mỹ Tho, chỉ có cho các khoá 2017, 2022 và 2024.
 *  - Nhiệm kỳ tuyên uý: ghi chép của Xứ Đoàn do Ban Điều Hành cung cấp.
 *
 * Những mục chưa tra được nguồn thì bỏ trống để hiển thị "chưa cập nhật" —
 * không suy đoán. Chưa vị nào có ảnh tư liệu nên đều để trống trường image.
 */
export const CHAPLAINS_EXTENDED_DATA: DetailedBioRecord[] = [
  {
    id: 'tuyen-uy-nguyen-ngoc-long',
    name: 'Lm. Phêrô Nguyễn Ngọc Long',
    saintName: 'Thánh Phêrô Tông Đồ',
    role: 'Cha Tuyên Uý Xứ Đoàn (2005 – 2009)',
    period: '2005 – 2009',
    birth: 'Sinh năm 1977',
    origin: 'Giáo phận Mỹ Tho',
    priestOrdination: 'Thụ phong linh mục năm 2004',
    image: '/images/tuyen_uy_nguyen_ngoc_long.jpg',
    source:
      'Ảnh do giáo xứ cung cấp. Tiểu sử theo danh sách Linh mục đương nhiệm Giáo phận Mỹ Tho 11.2024 và bài "Gx. Lương Hoà Hạ: Thánh lễ nhận xứ của cha Phêrô Nguyễn Ngọc Long", giaophanmytho.net, 01/08/2023',
    shortDesc:
      'Vị tuyên uý đầu tiên của Xứ Đoàn sau ngày tái lập năm 2005. Ngài đồng hành với Xứ Đoàn ngay từ khoá huấn luyện Huynh Trưởng đầu tiên, đặt nền cho sinh hoạt Thiếu Nhi Thánh Thể tại Giáo xứ Chánh Tòa. Từ năm 2023 ngài là cha sở Giáo xứ Lương Hoà Hạ, Giáo hạt Đức Hoà.',
    chronology: [
      { time: '2004', title: 'Thụ phong linh mục', content: 'Chịu chức linh mục thuộc Giáo phận Mỹ Tho.' },
      {
        time: '2005 – 2009',
        title: 'Cha Tuyên Uý Xứ Đoàn Các Thánh Tử Đạo Việt Nam',
        content:
          'Linh hướng Xứ Đoàn trong bốn năm đầu tiên sau ngày tái lập, giai đoạn hình thành ban điều hành và các ngành.'
      },
      {
        time: '19/06/2023',
        title: 'Bổ nhiệm cha sở Giáo xứ Lương Hoà Hạ',
        content:
          'Đức Cha Phêrô Nguyễn Văn Khảm ký văn thư bổ nhiệm ngài làm cha sở Giáo xứ Lương Hoà Hạ, Giáo hạt Đức Hoà.'
      },
      {
        time: '31/07/2023',
        title: 'Thánh lễ nhận xứ Lương Hoà Hạ',
        content:
          'Lúc 09g30 ngày 31/07/2023, Đức Cha Phêrô Nguyễn Văn Khảm chủ sự thánh lễ nhận xứ tại Giáo xứ Lương Hoà Hạ, toạ lạc Ấp 7, xã Lương Hoà, huyện Bến Lức, tỉnh Long An. Cha Gabriel Nguyễn Tấn Di — Hạt trưởng Hạt Đức Hoà — công bố văn thư bổ nhiệm.'
      }
    ],
    milestones: ['Cha Tuyên Uý tiên khởi của Xứ Đoàn sau ngày tái lập năm 2005.']
  },
  {
    id: 'tuyen-uy-nguyen-nhut-cuong',
    name: 'Lm. Gioan Baotixita Nguyễn Nhựt Cương',
    saintName: 'Thánh Gioan Baotixita',
    role: 'Cha Tuyên Uý Xứ Đoàn (2010 – 2013)',
    period: '2010 – 2013',
    birth: 'Sinh năm 1976',
    origin: 'Giáo phận Mỹ Tho',
    priestOrdination: 'Thụ phong linh mục năm 2008',
    image: '/images/tuyen_uy_nguyen_nhut_cuong.jpg',
    source:
      'Ảnh do giáo xứ cung cấp. Tiểu sử theo danh sách Linh mục đương nhiệm Giáo phận Mỹ Tho 11.2024 và bài "Cha Gioan Baotixita Nguyễn Nhựt Cương nhận xứ Tân Quới", giaophanmytho.net, 28/07/2023',
    shortDesc:
      'Cha Tuyên Uý thứ hai của Xứ Đoàn, đồng hành trong giai đoạn Xứ Đoàn kiện toàn hệ thống ngành và đội sau những năm đầu tái lập. Từ năm 2023 ngài là cha sở Giáo xứ Tân Quới, Giáo hạt Cù Lao Tây.',
    chronology: [
      { time: '2008', title: 'Thụ phong linh mục', content: 'Chịu chức linh mục thuộc Giáo phận Mỹ Tho.' },
      {
        time: '2010 – 2013',
        title: 'Cha Tuyên Uý Xứ Đoàn',
        content: 'Linh hướng Xứ Đoàn Các Thánh Tử Đạo Việt Nam tại Giáo xứ Chánh Tòa Mỹ Tho.'
      },
      {
        time: '19/06/2023',
        title: 'Bổ nhiệm cha sở Giáo xứ Tân Quới',
        content:
          'Đức Cha Phêrô Nguyễn Văn Khảm bổ nhiệm ngài làm cha sở Giáo xứ Tân Quới, kế nhiệm cha Inhaxiô Võ Viết Chuyên.'
      },
      {
        time: '28/07/2023',
        title: 'Thánh lễ nhận xứ Tân Quới',
        content:
          'Lúc 09g30 ngày 28/07/2023, cha Tổng Đại Diện Phaolô Trần Kỳ Minh chủ sự thánh lễ tạ ơn và nghi thức nhận xứ, cùng 24 linh mục hạt Cù Lao Tây và hạt Cái Bè đồng tế.'
      },
      {
        time: 'Nhiệm sở hiện nay',
        title: 'Giáo xứ Tân Quới, Giáo hạt Cù Lao Tây',
        content:
          'Nhà thờ Tân Quới toạ lạc tại xã Tân Quới, huyện Thanh Bình, tỉnh Đồng Tháp. Giáo xứ thành lập từ năm 1862, trước năm 1974 gọi là Họ đạo Cù Lao Tây, hiện có 2.562 giáo dân và 682 gia đình công giáo.'
      }
    ],
    milestones: []
  },
  {
    id: 'tuyen-uy-tran-trong-khuong',
    name: 'Lm. Phêrô Trần Trọng Khương',
    saintName: 'Thánh Phêrô Tông Đồ',
    role: 'Cha Tuyên Uý Xứ Đoàn (giữa 2013 – đầu 2016)',
    period: 'Giữa 2013 – đầu 2016',
    birth: 'Sinh năm 1981',
    origin: 'Giáo phận Mỹ Tho',
    priestOrdination: 'Thụ phong linh mục năm 2011',
    image: '/images/tuyen_uy_tran_trong_khuong.jpg',
    source:
      'Ảnh do giáo xứ cung cấp. Tiểu sử theo danh sách Linh mục đương nhiệm Giáo phận Mỹ Tho, cập nhật 11.2024 (giaophanmytho.net)',
    shortDesc:
      'Cha Tuyên Uý thứ ba của Xứ Đoàn. Theo danh sách linh mục đoàn cập nhật tháng 11/2024, hiện ngài đang trong thời gian nghỉ bệnh.',
    chronology: [
      { time: '2011', title: 'Thụ phong linh mục', content: 'Chịu chức linh mục thuộc Giáo phận Mỹ Tho.' },
      {
        time: 'Giữa 2013 – đầu 2016',
        title: 'Cha Tuyên Uý Xứ Đoàn',
        content: 'Linh hướng Xứ Đoàn Các Thánh Tử Đạo Việt Nam tại Giáo xứ Chánh Tòa Mỹ Tho.'
      },
      {
        time: 'Khoảng 2013 – 2016',
        title: 'Cha phó Giáo xứ Chánh Tòa Mỹ Tho',
        content:
          'Trong chính giai đoạn làm tuyên uý, ngài phục vụ với tư cách cha phó Giáo xứ Chánh Tòa. Bản tin của giáo phận ghi nhận ngài trong các sinh hoạt của giáo xứ như Đại hội Các Bà Mẹ Công Giáo năm 2013 và cuộc rước kiệu tôn vinh Mẹ Maria năm 2016.'
      },
      {
        time: 'Hiện nay',
        title: 'Tình trạng',
        content: 'Nghỉ bệnh (theo danh sách linh mục đoàn 11.2024). Xin cộng đoàn cầu nguyện cho ngài.'
      }
    ],
    milestones: []
  },
  {
    id: 'tuyen-uy-nguyen-thanh-danh',
    name: 'Lm. Phêrô Nguyễn Thành Danh',
    saintName: 'Thánh Phêrô Tông Đồ',
    role: 'Cha Tuyên Uý Xứ Đoàn (cuối 2016 – 2019)',
    period: 'Cuối 2016 – 2019',
    birth: 'Sinh năm 1978',
    origin: 'Giáo phận Mỹ Tho',
    priestOrdination: 'Thụ phong linh mục năm 2013',
    image: '/images/tuyen_uy_nguyen_thanh_danh.jpg',
    source:
      'Ảnh do giáo xứ cung cấp. Tiểu sử theo danh sách Linh mục đương nhiệm Giáo phận Mỹ Tho 11.2024 và bài "Gx. An Thái Trung: Thánh lễ Tạ ơn và nhận sở mới của cha Phêrô Nguyễn Thành Danh", giaophanmytho.net, 31/08/2023',
    shortDesc:
      'Cha Tuyên Uý thứ tư của Xứ Đoàn, đồng hành gần ba năm trong giai đoạn Xứ Đoàn mở rộng số đoàn sinh và củng cố đội ngũ Huynh Trưởng. Từ năm 2019 đến 2023, ngài là cha nhiệm sở Nhà thờ Đông Hoà và giám quản Giáo họ Vĩnh Kim; từ năm 2023 ngài là cha sở Giáo xứ An Thái Trung, Giáo hạt Cái Bè.',
    chronology: [
      { time: '2013', title: 'Thụ phong linh mục', content: 'Chịu chức linh mục thuộc Giáo phận Mỹ Tho.' },
      {
        time: 'Cuối 2016 – 2019',
        title: 'Cha Tuyên Uý Xứ Đoàn',
        content: 'Linh hướng Xứ Đoàn Các Thánh Tử Đạo Việt Nam tại Giáo xứ Chánh Tòa Mỹ Tho.'
      },
      {
        time: '2019 – 2023',
        title: 'Cha nhiệm sở Nhà thờ Đông Hoà và giám quản Giáo họ Vĩnh Kim',
        content:
          'Sau nhiệm kỳ tuyên uý tại Xứ Đoàn Chánh Tòa, ngài phục vụ với trách nhiệm cha nhiệm sở Nhà thờ Đông Hoà, đồng thời giám quản Giáo họ Vĩnh Kim.'
      },
      {
        time: '31/08/2023',
        title: 'Thánh lễ tạ ơn và nhận sở mới tại Giáo xứ An Thái Trung',
        content:
          'Đức Cha Phêrô Nguyễn Văn Khảm chủ sự thánh lễ nhận sở tại Giáo xứ An Thái Trung, Ấp 2, xã An Thái Trung, huyện Cái Bè, tỉnh Tiền Giang. Đồng tế có cha Tổng Đại Diện Phaolô Trần Kỳ Minh, quý cha Hạt trưởng hạt Mỹ Tho và hạt Cái Bè cùng 66 linh mục trong và ngoài giáo phận.'
      },
      {
        time: 'Nhiệm sở hiện nay',
        title: 'Giáo xứ An Thái Trung, Giáo hạt Cái Bè',
        content:
          'Giáo xứ do các thừa sai Dòng Chúa Cứu Thế (Cái Nhum) khai mở, công cuộc truyền giáo bắt đầu trong hai năm 1958 – 1959 tại vùng phía tây Mỹ Tho.'
      }
    ],
    milestones: [
      'Cha nhiệm sở Nhà thờ Đông Hoà và giám quản Giáo họ Vĩnh Kim giai đoạn 2019 – 2023.'
    ]
  },
  {
    id: 'tuyen-uy-phan-van-dai',
    name: 'Lm. Antôn Phan Văn Đại',
    saintName: 'Thánh Antôn',
    role: 'Cha Tuyên Uý Xứ Đoàn (2019 – 2020) • Phó Giám Đốc Tiểu Chủng viện Gioan XXIII (từ 2025)',
    period: '2019 – 2020',
    birth: 'Sinh năm 1984',
    origin: 'Giáo xứ Anrê, Thanh Bình, Đồng Tháp',
    priestOrdination: 'Thụ phong linh mục ngày 21/04/2017 tại Nhà thờ Chánh Tòa Mỹ Tho',
    image: '/images/tuyen_uy_phan_van_dai.jpg',
    source:
      'Ảnh do giáo xứ cung cấp. Tiểu sử theo thông báo phong chức linh mục của Toà Giám mục Mỹ Tho ngày 04/02/2017 và danh sách Linh mục đương nhiệm Giáo phận Mỹ Tho 11.2024',
    shortDesc:
      'Cha Tuyên Uý thứ năm của Xứ Đoàn. Sau nhiệm kỳ tuyên uý, ngài đi du học hai năm tại Philippines rồi sang Rôma. Năm 2025, Đức cha Phêrô Nguyễn Văn Khảm đặt ngài làm Phó Giám Đốc Tiểu Chủng viện Gioan XXIII — chính ngôi chủng viện do Đức cha Giuse Trần Văn Thiện sáng lập những năm đầu của giáo phận.',
    chronology: [
      {
        time: '21/04/2017',
        title: 'Thụ phong linh mục',
        content:
          'Chịu chức linh mục lúc 09g30 tại Nhà thờ Chánh Tòa Mỹ Tho, cùng khoá với sáu tân linh mục khác của giáo phận.'
      },
      {
        time: '2019 – 2020',
        title: 'Cha Tuyên Uý Xứ Đoàn',
        content: 'Linh hướng Xứ Đoàn Các Thánh Tử Đạo Việt Nam tại Giáo xứ Chánh Tòa Mỹ Tho.'
      },
      {
        time: '2020 – 2022',
        title: 'Du học tại Philippines',
        content:
          'Sau nhiệm kỳ tuyên uý, ngài được cử đi du học tại Philippines trong hai năm. Danh sách linh mục đoàn cập nhật tháng 11/2024 vẫn ghi nhiệm sở của ngài là Philippines.'
      },
      {
        time: 'Từ khoảng 2022',
        title: 'Sang Rôma tiếp tục học',
        content: 'Hết hai năm tại Philippines, ngài sang Rôma tiếp tục chương trình học cho tới năm 2025.'
      },
      {
        time: '2025 – nay',
        title: 'Phó Giám Đốc Tiểu Chủng viện Gioan XXIII',
        content:
          'Đức cha Phêrô Nguyễn Văn Khảm bổ nhiệm ngài làm Phó Giám Đốc Tiểu Chủng viện Gioan XXIII. Đây là ngôi chủng viện do Đức cha Giuse Trần Văn Thiện — Giám mục Tiên khởi — sáng lập những năm đầu của giáo phận, mang tên vị Giáo hoàng đã ký Tông hiến khai sinh Giáo phận Mỹ Tho năm 1960. Từ một cha tuyên uý Xứ Đoàn, ngài trở về góp phần đào tạo lớp linh mục kế tiếp cho giáo phận.'
      }
    ],
    milestones: [
      'Du học hai năm tại Philippines, rồi tiếp tục học tại Rôma.',
      'Phó Giám Đốc Tiểu Chủng viện Gioan XXIII từ năm 2025 — cơ sở đào tạo linh mục của Giáo phận Mỹ Tho.'
    ]
  },
  {
    id: 'tuyen-uy-truong-ngoc-duc',
    name: 'Lm. Phêrô Trương Ngọc Đức',
    saintName: 'Thánh Phêrô Tông Đồ',
    role: 'Cha Tuyên Uý Xứ Đoàn (cuối 2020 – đầu 2022)',
    period: 'Cuối 2020 – đầu 2022',
    birth: 'Sinh năm 1986',
    origin: 'Giáo phận Mỹ Tho',
    priestOrdination: 'Thụ phong linh mục năm 2019',
    image: '/images/tuyen_uy_truong_ngoc_duc.jpg',
    source:
      'Ảnh do giáo xứ cung cấp. Tiểu sử theo danh sách Linh mục đương nhiệm Giáo phận Mỹ Tho 11.2024 và bài "Cha Phêrô Trương Ngọc Đức – Tân chánh xứ Giáo xứ Mỹ Điền", giaophanmytho.net, 04/08/2023',
    shortDesc:
      'Cha Tuyên Uý thứ sáu của Xứ Đoàn, đồng hành đúng vào giai đoạn đại dịch khi mọi sinh hoạt tập trung của Xứ Đoàn bị gián đoạn. Nguyên cha phó Giáo xứ Tân An, từ năm 2023 ngài là chánh xứ Giáo xứ Mỹ Điền.',
    chronology: [
      { time: '2019', title: 'Thụ phong linh mục', content: 'Chịu chức linh mục thuộc Giáo phận Mỹ Tho.' },
      {
        time: 'Cuối 2020 – đầu 2022',
        title: 'Cha Tuyên Uý Xứ Đoàn',
        content:
          'Linh hướng Xứ Đoàn trong giai đoạn dịch bệnh, khi các buổi sinh hoạt và thánh lễ tập trung phải tạm ngưng nhiều đợt.'
      },
      {
        time: 'Trước 2023',
        title: 'Cha phó Giáo xứ Tân An',
        content: 'Phục vụ với tư cách cha phó Giáo xứ Tân An trước khi được bổ nhiệm làm chánh xứ.'
      },
      {
        time: '04/08/2023',
        title: 'Tân chánh xứ Giáo xứ Mỹ Điền',
        content:
          'Đức Cha Phêrô Nguyễn Văn Khảm chủ sự thánh lễ nhận xứ tại Nhà thờ Mỹ Điền, xã Long Hựu Tây, huyện Cần Đước, tỉnh Long An, thuộc Giáo hạt Đức Hoà.'
      }
    ],
    milestones: []
  },
  {
    id: 'tuyen-uy-tran-anh-duy',
    name: 'Lm. Phêrô Trần Anh Duy',
    saintName: 'Thánh Phêrô Tông Đồ',
    role: 'Cha Tuyên Uý Xứ Đoàn (đầu 2022 – 2023)',
    period: 'Đầu 2022 – 2023',
    birth: 'Sinh năm 1985',
    origin: 'Giáo phận Mỹ Tho',
    priestOrdination: 'Thụ phong linh mục năm 2019',
    image: '/images/tuyen_uy_tran_anh_duy.jpg',
    source:
      'Ảnh do giáo xứ cung cấp. Tiểu sử theo danh sách Linh mục đương nhiệm Giáo phận Mỹ Tho 11.2024 và bài "Giáo xứ Gò Da: Cha Tổng Đại Diện chủ sự thánh lễ nhận xứ", giaophanmytho.net, 10/08/2023',
    shortDesc:
      'Cha Tuyên Uý thứ bảy của Xứ Đoàn, đồng hành trong giai đoạn Xứ Đoàn khôi phục sinh hoạt sau đại dịch. Từ năm 2023 ngài là cha sở Giáo xứ Gò Da, Giáo hạt Cù Lao Tây.',
    chronology: [
      { time: '2019', title: 'Thụ phong linh mục', content: 'Chịu chức linh mục thuộc Giáo phận Mỹ Tho.' },
      {
        time: 'Đầu 2022 – 2023',
        title: 'Cha Tuyên Uý Xứ Đoàn',
        content: 'Linh hướng Xứ Đoàn Các Thánh Tử Đạo Việt Nam tại Giáo xứ Chánh Tòa Mỹ Tho.'
      },
      {
        time: '10/08/2023',
        title: 'Thánh lễ nhận xứ Gò Da',
        content:
          'Cha Tổng Đại Diện Phaolô Trần Kỳ Minh chủ sự thánh lễ nhận xứ tại Nhà thờ Gò Da, xã Bình Phú, huyện Tân Hồng, tỉnh Đồng Tháp, thuộc Giáo hạt Cù Lao Tây, cùng 20 linh mục trong giáo phận đồng tế.'
      }
    ],
    milestones: []
  },
  {
    id: 'tuyen-uy-nguyen-hoang-anh',
    name: 'Lm. Phêrô Nguyễn Hoàng Anh',
    saintName: 'Thánh Phêrô Tông Đồ',
    role: 'Cha Tuyên Uý Xứ Đoàn (2023 – 2024)',
    period: '2023 – 2024',
    birth: '02/04/1987',
    origin: 'Giáo xứ Thiên Phước, Đồng Tháp',
    priestOrdination: 'Thụ phong linh mục ngày 29/12/2022 tại Nhà thờ Chánh Tòa Mỹ Tho',
    image: '/images/tuyen_uy_nguyen_hoang_anh.jpg',
    source:
      'Ảnh do giáo xứ cung cấp. Tiểu sử theo thông báo phong chức linh mục của Toà Giám mục Mỹ Tho ngày 22/11/2022, bản tin Thánh lễ phong chức 29/12/2022 (giaophanmytho.net), danh sách Linh mục đương nhiệm 11.2024 và Danh sách thuyên chuyển và bổ nhiệm Linh mục Gp. Mỹ Tho tháng 06.2026',
    shortDesc:
      'Cha Tuyên Uý thứ tám của Xứ Đoàn, nhận nhiệm vụ ngay trong năm đầu tiên sau khi thụ phong linh mục. Từ tháng 06/2026 ngài là chánh xứ Giáo xứ Vĩnh Kim, Giáo hạt Cái Bè.',
    chronology: [
      {
        time: '29/12/2022',
        title: 'Thụ phong linh mục',
        content:
          'Chịu chức linh mục lúc 09g30 tại Nhà thờ Chánh Tòa Mỹ Tho do Đức Cha Phêrô Nguyễn Văn Khảm chủ phong, cùng bảy tân linh mục khác của giáo phận.'
      },
      {
        time: '2023 – 2024',
        title: 'Cha Tuyên Uý Xứ Đoàn',
        content: 'Linh hướng Xứ Đoàn Các Thánh Tử Đạo Việt Nam tại Giáo xứ Chánh Tòa Mỹ Tho.'
      },
      {
        time: '2023 – 2024',
        title: 'Cha phó Giáo xứ Chánh Tòa Mỹ Tho',
        content:
          'Ngài phục vụ tại chính Giáo xứ Chánh Tòa trong thời gian làm tuyên uý Xứ Đoàn — nhờ vậy đồng hành sát sao với các em đoàn sinh và anh chị Huynh Trưởng.'
      },
      {
        time: 'Đến 06/2026',
        title: 'Phó xứ Giáo xứ Nữ Vương Hoà Bình, Giáo hạt Mỹ Tho',
        content:
          'Giáo xứ Nữ Vương Hoà Bình trải trên địa bàn các phường 6, 5, 4 và 1 của thành phố Mỹ Tho, tỉnh Tiền Giang, có khoảng 2.301 giáo dân.'
      },
      {
        time: '06/2026 – nay',
        title: 'Chánh xứ Giáo xứ Vĩnh Kim, Giáo hạt Cái Bè',
        content:
          'Theo danh sách thuyên chuyển và bổ nhiệm linh mục Giáo phận Mỹ Tho tháng 06/2026, ngài rời chức phó xứ Nữ Vương Hoà Bình để nhận nhiệm sở mới làm chánh xứ Giáo xứ Vĩnh Kim, Giáo hạt Cái Bè.'
      }
    ],
    milestones: []
  },
  {
    id: 'tuyen-uy-nguyen-ngoc',
    name: 'Lm. Phêrô Nguyễn Ngọc',
    saintName: 'Thánh Phêrô Tông Đồ',
    role: 'Cha Tuyên Uý Xứ Đoàn (2024 – 2026)',
    period: '2024 – 2026',
    birth: '30/05/1987',
    origin: 'Giáo xứ Lập Điền, Long An',
    priestOrdination: 'Thụ phong linh mục ngày 29/12/2022 tại Nhà thờ Chánh Tòa Mỹ Tho',
    image: '/images/tuyen_uy_nguyen_ngoc.jpg',
    source:
      'Ảnh do giáo xứ cung cấp. Tiểu sử theo thông báo phong chức linh mục của Toà Giám mục Mỹ Tho ngày 22/11/2022 và bản tin Thánh lễ phong chức 29/12/2022 (giaophanmytho.net); danh sách Linh mục đương nhiệm 11.2024',
    shortDesc:
      'Cha Tuyên Uý thứ chín của Xứ Đoàn. Ngài phục vụ ngay tại Giáo xứ Chánh Tòa, cùng khoá thụ phong với Cha Phêrô Nguyễn Hoàng Anh — vị tuyên uý tiền nhiệm.',
    chronology: [
      {
        time: '29/12/2022',
        title: 'Thụ phong linh mục',
        content:
          'Chịu chức linh mục lúc 09g30 tại Nhà thờ Chánh Tòa Mỹ Tho do Đức Cha Phêrô Nguyễn Văn Khảm chủ phong.'
      },
      {
        time: '2024 – 2026',
        title: 'Cha Tuyên Uý Xứ Đoàn',
        content: 'Linh hướng Xứ Đoàn Các Thánh Tử Đạo Việt Nam tại Giáo xứ Chánh Tòa Mỹ Tho.'
      },
      {
        time: '2024 – nay',
        title: 'Phục vụ tại Giáo xứ Chánh Tòa, Giáo hạt Mỹ Tho',
        content:
          'Danh sách linh mục đoàn cập nhật tháng 11/2024 ghi nhận ngài phục vụ tại Giáo xứ Chánh Tòa — cùng nhiệm sở với nhiệm kỳ tuyên uý Xứ Đoàn. Lưu ý: danh sách của giáo phận in tên ngài là "Phêrô Nguyên Ngọc", trong khi thông báo và bản tin phong chức năm 2022 đều ghi "Phêrô Nguyễn Ngọc"; trang này theo văn bản phong chức.'
      }
    ],
    milestones: []
  },
  {
    id: 'tuyen-uy-nguyen-van-thanh',
    name: 'Lm. Emmanuel Nguyễn Văn Thành',
    saintName: 'Emmanuel',
    role: 'Cha Tuyên Uý Xứ Đoàn đương nhiệm (2026 – nay)',
    period: '2026 – nay',
    birth: 'Sinh năm 1987',
    origin: 'Giáo xứ Bến Dinh, Đồng Tháp',
    priestOrdination: 'Thụ phong linh mục ngày 30/08/2024 tại Nhà thờ Chánh Tòa Mỹ Tho',
    image: '/images/tuyen_uy_nguyen_van_thanh.jpg',
    source:
      'Ảnh do giáo xứ cung cấp. Tiểu sử theo bản tin Thánh lễ truyền chức linh mục ngày 30/08/2024 (giaophanmytho.net), danh sách Linh mục đương nhiệm Giáo phận Mỹ Tho 11.2024 và Danh sách thuyên chuyển và bổ nhiệm Linh mục Gp. Mỹ Tho tháng 06.2026',
    shortDesc:
      'Cha Tuyên Uý đương nhiệm của Xứ Đoàn Các Thánh Tử Đạo Việt Nam. Ngài được điều về làm phó xứ Giáo xứ Chánh Toà trong đợt thuyên chuyển tháng 06/2026.',
    chronology: [
      {
        time: '30/08/2024',
        title: 'Thụ phong linh mục',
        content:
          'Chịu chức linh mục tại Nhà thờ Chánh Tòa Mỹ Tho do Đức Cha Phêrô Nguyễn Văn Khảm chủ phong, cùng năm tân linh mục khác. Thánh lễ đồng thời mừng Đức Cha Phêrô kỷ niệm 44 năm linh mục và 10 năm nhận Giáo phận Mỹ Tho.'
      },
      {
        time: '2024 – 2026',
        title: 'Phục vụ tại Giáo hạt Đức Hoà',
        content:
          'Ngay sau khi thụ phong, ngài được sai về Giáo hạt Đức Hoà: danh sách linh mục đoàn tháng 11/2024 ghi nhiệm sở Cần Giuộc, đến trước tháng 06/2026 ngài phục vụ tại Giáo xứ Lương Hoà Thượng cùng giáo hạt.'
      },
      {
        time: '06/2026',
        title: 'Phó xứ Giáo xứ Chánh Toà, Giáo hạt Mỹ Tho',
        content:
          'Danh sách thuyên chuyển và bổ nhiệm linh mục Giáo phận Mỹ Tho tháng 06/2026 điều ngài từ Giáo xứ Lương Hoà Thượng về làm phó xứ Giáo xứ Chánh Toà — cũng chính là nhiệm sở gắn ngài với sứ vụ Tuyên Uý Xứ Đoàn.'
      },
      {
        time: '2026 – nay',
        title: 'Cha Tuyên Uý Xứ Đoàn',
        content: 'Đương nhiệm linh hướng Xứ Đoàn Các Thánh Tử Đạo Việt Nam tại Giáo xứ Chánh Tòa Mỹ Tho.'
      }
    ],
    milestones: []
  }
];

/**
 * Bảng ghi công: các linh mục từng phục vụ họ đạo Mỹ Tho ngoài hàng chánh sở.
 *
 * Tài liệu Giáo phận Mỹ Tho ghi giai đoạn 1866 – 1960 có hơn 80 linh mục,
 * khoảng 30 vị là thừa sai. Danh sách dưới đây tra từ hồ sơ lưu trữ IRFA của
 * Hội Thừa Sai Paris — mỗi tên đều kèm mã hồ sơ để kiểm chứng được.
 *
 * Phần linh mục Việt Nam (khoảng 50 vị) chưa có nguồn số hoá công khai; tên
 * các ngài nằm trong sổ bộ họ đạo và văn khố Tòa Giám mục. Để trống còn hơn
 * ghi sai tên người đã phục vụ.
 */
/**
 * Các Đấng Bản Quyền coi sóc vùng Mỹ Tho TRƯỚC năm 1960.
 *
 * Trước Tông hiến Venerabilium Nostrorum, Mỹ Tho thuộc địa phận Tây Đàng
 * Trong (sau gọi là Sài Gòn). Chín vị Đại diện Tông toà kế tiếp nhau từ 1844
 * đến 1960 chính là các Đấng Bản Quyền của họ đạo Mỹ Tho suốt hơn một thế kỷ.
 *
 * Tiểu sử tra từ notice lưu trữ IRFA của Hội Thừa Sai Paris; chân dung sáu vị
 * lấy từ cùng văn khố, ba vị còn lại do Giáo xứ cung cấp.
 */
export const PRE1960_ORDINARIES: DetailedBioRecord[] = [
  {
    id: 'dgm-lambert-de-la-motte',
    name: 'Đức cha Pierre Lambert de la Motte',
    saintName: '',
    role: 'Đại diện Tông toà Đàng Trong (1659 – 1679)',
    period: '1659 – 1679',
    birth: '16/01/1624 tại Lisieux, Pháp',
    origin: 'Hội Thừa sai Paris (MEP)',
    priestOrdination: 'Thụ phong linh mục ngày 27/12/1655',
    bishopConsecration: 'Tấn phong Giám mục hiệu toà Berytus năm 1660',
    image: '/images/lambert_de_la_motte.png',
    source: 'Tài liệu Tòa Thánh, Hội Thừa sai Paris',
    shortDesc: 'Vị Đại diện Tông tòa tiên khởi của Đàng Trong, đồng sáng lập Hội Thừa sai Paris (MEP) và đấng sáng lập Dòng Mến Thánh Giá. Ngài đặt nền móng vững chắc cho việc tổ chức Hàng giáo sĩ bản địa.',
    chronology: [
      { time: '1659', title: 'Tông sắc Super Cathedram', content: 'Được Đức Thánh Cha Alexander VII bổ nhiệm làm Đại diện Tông tòa Đàng Trong.' },
      { time: '1664', title: 'Công đồng Juthia', content: 'Cùng với Đức cha Pallu soạn thảo "Huấn thị Monita" (Monita ad Missionarios) làm kim chỉ nam truyền giáo cho các thừa sai MEP.' },
      { time: '1670', title: 'Công đồng Phố Hiến', content: 'Triệu tập Công đồng Phố Hiến và lập Dòng nữ Mến Thánh Giá đầu tiên tại Đàng Trong và Đàng Ngoài.' },
      { time: '1679', title: 'Qua đời và An táng', content: 'Ngài qua đời ngày 15/06/1679 tại Ayutthaya, Thái Lan. Thi hài ngài được an táng tại Nhà thờ Thánh Giuse (St. Joseph\'s Church) ở cố đô Ayutthaya.' }
    ],
    milestones: [
      'Vị Giám mục đầu tiên cai quản Giáo hội Đàng Trong.',
      'Đồng tác giả Huấn thị Monita - nền tảng truyền giáo Á Châu.',
      'Sáng lập Dòng nữ Mến Thánh Giá (1670).',
      'Được an táng tại Nhà thờ Thánh Giuse, Ayutthaya (Thái Lan).'
    ]
  },
  {
    id: 'dgm-mahot',
    name: 'Đức cha Guillaume Mahot',
    saintName: '',
    role: 'Đại diện Tông toà Đàng Trong (1680 – 1684)',
    period: '1680 – 1684',
    birth: 'Năm 1630 tại Giáo phận Sées, Pháp',
    origin: 'Hội Thừa sai Paris (MEP)',
    priestOrdination: 'Thụ phong linh mục năm 1656',
    bishopConsecration: 'Tấn phong Giám mục hiệu toà Bida năm 1682',
    source: 'Hội Thừa sai Paris',
    shortDesc: 'Vị Đại diện Tông tòa thứ 2 của Đàng Trong. Ngài đã nỗ lực gìn giữ giáo phận trong giai đoạn bị bách hại dữ dội dưới thời các chúa Nguyễn.',
    chronology: [
      { time: '1680', title: 'Kế nhiệm', content: 'Được Tòa Thánh bổ nhiệm làm Đại diện Tông tòa Đàng Trong sau khi Đức cha Lambert de la Motte qua đời.' },
      { time: '1682', title: 'Tấn phong Giám mục', content: 'Được tấn phong Giám mục tại Ayutthaya (Thái Lan) bởi Đức cha Laneau.' },
      { time: '1684', title: 'Qua đời và An táng', content: 'Qua đời ngày 04/06/1684 tại Ayutthaya, Thái Lan. Được an táng tại Nhà thờ Thánh Giuse ở Ayutthaya, cùng nơi an nghỉ với vị tiền nhiệm.' }
    ],
    milestones: [
      'Đại diện Tông tòa thứ 2 của Đàng Trong.',
      'An táng tại Nhà thờ Thánh Giuse, Ayutthaya (Thái Lan).'
    ]
  },
  {
    id: 'dgm-perez',
    name: 'Đức cha François Perez',
    saintName: '',
    role: 'Đại diện Tông toà Đàng Trong (1687 – 1728)',
    period: '1687 – 1728',
    birth: 'Năm 1643 tại Ayutthaya (Thái Lan)',
    origin: 'Hội Thừa sai Paris (MEP)',
    bishopConsecration: 'Tấn phong Giám mục hiệu toà Bugia năm 1691',
    source: 'Hội Thừa sai Paris',
    shortDesc: 'Vị Giám mục sinh trưởng tại Thái Lan, là người gốc Á đầu tiên cai quản Đàng Trong suốt hơn 40 năm.',
    chronology: [
      { time: '1687', title: 'Kế nhiệm', content: 'Được Tòa Thánh bổ nhiệm làm Đại diện Tông tòa Đàng Trong. Ngài là Giám mục có xuất thân châu Á đầu tiên của khu vực.' },
      { time: '1728', title: 'Qua đời và An táng', content: 'Qua đời ngày 20/09/1728 tại Ayutthaya. An táng tại Nhà thờ Thánh Giuse, Thái Lan.' }
    ],
    milestones: [
      'Thời gian cai quản Đàng Trong kéo dài kỷ lục: hơn 41 năm.',
      'An táng tại Nhà thờ Thánh Giuse, Ayutthaya (Thái Lan).'
    ]
  },
  {
    id: 'dgm-alexandris',
    name: 'Đức cha Alexandre de Alexandris',
    saintName: '',
    role: 'Đại diện Tông toà Đàng Trong (1728 – 1738)',
    period: '1728 – 1738',
    birth: 'Năm 1684 tại Ý',
    origin: 'Dòng Barnabites (CRSP)',
    bishopConsecration: 'Tấn phong Giám mục hiệu toà Nabaca năm 1726',
    source: 'Hội Thừa sai Paris',
    shortDesc: 'Vị Giám mục người Ý thuộc dòng Barnabites, cai quản Đàng Trong trong một thập kỷ.',
    chronology: [
      { time: '1728', title: 'Kế nhiệm', content: 'Kế nhiệm Đức cha Perez làm Đại diện Tông tòa Đàng Trong.' },
      { time: '1738', title: 'Qua đời và An táng', content: 'Qua đời ngày 10/10/1738 tại Macao. An táng tại nhà thờ Thánh Phaolô ở Macao.' }
    ],
    milestones: [
      'Đại diện Tông tòa thứ 4 của Đàng Trong.',
      'An táng tại Macao.'
    ]
  },
  {
    id: 'dgm-lefebvre-arnaud',
    name: 'Đức cha Arnaud-Antoine Lefèbvre',
    saintName: '',
    role: 'Đại diện Tông toà Đàng Trong (1741 – 1760)',
    period: '1741 – 1760',
    birth: '20/08/1709 tại Giáo phận Amiens, Pháp',
    origin: 'Hội Thừa sai Paris (MEP)',
    priestOrdination: 'Thụ phong linh mục năm 1733',
    bishopConsecration: 'Tấn phong Giám mục hiệu toà Neadoli năm 1743',
    source: 'Hội Thừa sai Paris',
    shortDesc: 'Cai quản Đàng Trong trong thời kỳ cấm đạo khắc nghiệt dưới thời chúa Nguyễn Phúc Khoát.',
    chronology: [
      { time: '1741', title: 'Kế nhiệm', content: 'Được Tòa Thánh chọn làm Đại diện Tông tòa Đàng Trong.' },
      { time: '1750', title: 'Bị bách hại và trục xuất', content: 'Chứng kiến cuộc bách hại lớn, ngài cùng nhiều thừa sai bị chúa Võ Vương (Nguyễn Phúc Khoát) bắt giam và trục xuất khỏi Đàng Trong.' },
      { time: '1760', title: 'Qua đời và An táng', content: 'Qua đời ngày 27/03/1760 trên đường sang Xiêm. Thi hài được đưa về an táng tại Nhà thờ Thánh Giuse, Ayutthaya (Thái Lan).' }
    ],
    milestones: [
      'Trải qua cuộc bách hại diện rộng năm 1750.',
      'An táng tại Nhà thờ Thánh Giuse, Ayutthaya (Thái Lan).'
    ]
  },
  {
    id: 'dgm-piguel',
    name: 'Đức cha Guillaume Piguel',
    saintName: '',
    role: 'Đại diện Tông toà Đàng Trong (1762 – 1771)',
    period: '1762 – 1771',
    birth: '04/12/1722 tại Giáo phận Nantes, Pháp',
    origin: 'Hội Thừa sai Paris (MEP)',
    bishopConsecration: 'Tấn phong Giám mục hiệu toà Canatha năm 1764',
    source: 'Hội Thừa sai Paris',
    shortDesc: 'Vị Giám mục thứ 6 của Đàng Trong, là đấng truyền chức Giám mục cho Đức cha Bá Đa Lộc.',
    chronology: [
      { time: '1762', title: 'Kế nhiệm', content: 'Được bổ nhiệm làm Đại diện Tông tòa Đàng Trong.' },
      { time: '1771', title: 'Qua đời và An táng', content: 'Qua đời ngày 21/06/1771 tại Prambey Chhom (Campuchia) / vùng giáp ranh Hòn Đất (Hà Tiên). Ngài được an táng tại khu vực truyền giáo này.' }
    ],
    milestones: [
      'Đại diện Tông tòa thứ 6 của Đàng Trong.',
      'Người tấn phong Giám mục cho Đức cha Pigneau de Behaine (Bá Đa Lộc).',
      'An táng tại Hòn Đất (Kiên Giang, Việt Nam).'
    ]
  },
  {
    id: 'dgm-pigneau-de-behaine',
    name: 'Đức cha Pierre Pigneau de Behaine',
    saintName: 'Bá Đa Lộc',
    role: 'Đại diện Tông toà Đàng Trong (1771 – 1799)',
    period: '1771 – 1799',
    birth: '02/11/1741 tại Origny-en-Thiérache, Pháp',
    origin: 'Hội Thừa sai Paris (MEP)',
    priestOrdination: 'Thụ phong linh mục năm 1765',
    bishopConsecration: 'Tấn phong Giám mục hiệu toà Adran năm 1774',
    image: '/images/pigneau_de_behaine.jpg', 
    source: 'Hội Thừa sai Paris',
    shortDesc: 'Nhân vật lịch sử quan trọng cuối thế kỷ XVIII, có vai trò lớn trong sự nghiệp của vua Gia Long và việc biên soạn tự vị An Nam.',
    chronology: [
      { time: '1771', title: 'Giám mục Đàng Trong', content: 'Bắt đầu cai quản Hạt Đại diện Tông tòa Đàng Trong giữa lúc loạn lạc Tây Sơn.' },
      { time: '1772', title: 'Từ điển An Nam', content: 'Hoàn thành bản thảo Dictionarium Annamitico-Latinum (Tự vị An Nam - Latinh).' },
      { time: '1787', title: 'Hiệp ước Versailles', content: 'Đại diện Nguyễn Ánh ký Hiệp ước Versailles với triều đình Pháp nhằm tìm kiếm viện trợ quân sự.' },
      { time: '1799', title: 'Qua đời và Điếu văn', content: 'Qua đời ngày 09/10/1799 tại Thị Nại (Quy Nhơn). Vua Gia Long đã tổ chức quốc tang vô cùng trọng thể. Tại khu mộ phần của ngài có bình phong khắc dòng chữ Hán mang nội dung: "Thượng Đế nhơn từ cứu vớt Bá Đa Lộc linh hồn kim dĩ văn thế khiết thăng thiên quốc hưởng chân phước vô cùng".' },
      { time: 'An táng (Cũ)', title: 'Lăng Cha Cả (Sài Gòn)', content: 'Thi hài ngài ban đầu được an táng tại Sài Gòn (Tân Bình ngày nay), khu vực này từ đó dân gian gọi là Lăng Cha Cả.' },
      { time: 'Hiện tại', title: 'Lưu trữ tại MEP (Pháp)', content: 'Năm 1983, khu lăng mộ bị giải tỏa. Di cốt của ngài được đưa về Pháp và hiện đang được lưu giữ trang trọng tại Hội Thừa sai Paris (MEP).' }
    ],
    milestones: [
      'Soạn thảo từ điển Dictionarium Annamitico-Latinum (1772).',
      'Đóng vai trò chủ chốt trong Hiệp ước Versailles (1787).',
      'An táng ban đầu tại Lăng Cha Cả (Sài Gòn), nay di cốt lưu tại Paris.'
    ]
  },
  {
    id: 'dgm-cuenot',
    name: 'Đức cha Étienne-Théodore Cuénot',
    saintName: 'Cố Thể',
    role: 'Đại diện Tông toà Đàng Trong (1840 – 1844)',
    period: '1840 – 1844',
    birth: '08/02/1802 tại Le Bélieu, Pháp',
    origin: 'Hội Thừa sai Paris (MEP)',
    priestOrdination: 'Thụ phong linh mục ngày 24/09/1825',
    bishopConsecration: 'Tấn phong Giám mục hiệu toà Metellopolis năm 1833',
    image: '/images/cuenot.png',
    source: 'Hồ sơ Thánh tử đạo',
    shortDesc: 'Vị Giám mục cuối cùng cai quản toàn bộ Đàng Trong trước khi chia tách thành Đông - Tây năm 1844. Ngài gánh vác giáo phận trong giai đoạn cấm đạo khốc liệt nhất và là một Thánh tử đạo.',
    chronology: [
      { time: '1840', title: 'Cai quản Đàng Trong', content: 'Kế nhiệm Đức cha Taberd cai quản toàn Đàng Trong. Ngài tổ chức Công đồng Gò Thị (1841) nhằm củng cố hàng giáo sĩ bản xứ.' },
      { time: '1844', title: 'Chia tách Đàng Trong', content: 'Đề nghị Tòa Thánh chia Đàng Trong làm hai (Đông và Tây). Ngài nhận phần Đông Đàng Trong (Quy Nhơn ngày nay).' },
      { time: '1861', title: 'Tử đạo và An táng', content: 'Bị bắt ngày 24/10/1861. Ngài kiệt sức và qua đời trong ngục thất Bình Định ngày 08/02/1861 trước khi nhận án trảm quyết. Thi hài ngài ban đầu được an táng tại Gò Thị. Một phần thánh tích của ngài nay được tôn kính tại Chủng viện Qui Nhơn, phần khác lưu giữ tại Hội Thừa sai Paris. Được Đức Gioan Phaolô II phong Hiển thánh năm 1988.' }
    ],
    milestones: [
      'Đại diện Tông tòa cuối cùng của Đàng Trong nguyên vẹn.',
      'Truyền chức cho rất nhiều linh mục người Việt bất chấp cấm đạo.',
      'Được tuyên Thánh Tử Đạo Việt Nam năm 1988.',
      'Thánh tích hiện lưu giữ tại Qui Nhơn và Paris.'
    ]
  },
  {
    id: 'dgm-lefebvre',
    name: 'Đức cha Dominique Lefebvre',
    saintName: 'Cố Ngãi',
    role: 'Đại diện Tông toà Tây Đàng Trong (1844 – 1864)',
    period: '1844 – 1864',
    birth: '01/08/1810 tại Courtonne-la-Meurdrac, Calvados, Pháp',
    origin: 'Hội Thừa Sai Paris — hồ sơ IRFA 0418',
    priestOrdination: 'Thụ phong linh mục ngày 20/12/1834',
    bishopConsecration: 'Tấn phong Giám mục hiệu toà Isauropolis tại Gò Thị ngày 01/08/1841',
    image: '/images/dgm_lefebvre.jpg',
    source: 'Hồ sơ lưu trữ IRFA 0418. Chân dung do Giáo xứ Chánh Tòa Mỹ Tho cung cấp.',
    shortDesc:
      'Đấng Bản Quyền trong chính những năm cộng đoàn Công giáo Mỹ Tho hình thành. Ngài học tiếng Việt bên cạnh Cha Borie — vị sau này được tôn phong hiển thánh — và vào Đàng Trong đúng lúc cuộc bách hại lên cao.',
    chronology: [
      { time: '1810 – 1834', title: 'Thời niên thiếu và ơn gọi', content: 'Sinh ngày 01/08/1810 tại Courtonne-la-Meurdrac (Calvados), học tại tiểu chủng viện Lisieux và đại chủng viện Bayeux. Vào Chủng viện Thừa Sai Paris với chức phó tế đầu tháng 9/1833, thụ phong linh mục ngày 20/12/1834.' },
      { time: '1835 – 1840', title: 'Sang Đàng Trong giữa cơn bách hại', content: 'Lên đường ngày 15/03/1835. Cập bến Bắc Kỳ, học tiếng bên cạnh Cha Borie tại Bố Chính, rồi vào Đàng Trong đúng lúc bách hại lên cao. Ngài coi tiểu chủng viện ở Hạ Đàng Trong, thường trú tại Cái Nhum và Cái Mơn thuộc tỉnh Vĩnh Long, nhiều phen phải lánh đi để thoát các cuộc lục soát.' },
      { time: '1841', title: 'Tấn phong Giám mục', content: 'Được chọn làm Phó Đại diện Tông toà năm 1840, rồi làm Giám mục phó cho Đức cha Cuénot. Chiếu theo đoản sắc ngày 10/12/1839, ngài được tấn phong Giám mục hiệu toà Isauropolis tại Gò Thị ngày 01/08/1841. Đoản sắc Pastorale officium ngày 26/02/1841 đặt ngài kế vị Đức cha Cuénot nếu vị này qua đời — Rôma khi ấy không thể nắm tin tức kịp thời từ các địa phận An Nam.' },
      { time: '1861 – 1864', title: 'Với họ đạo Mỹ Tho', content: 'Là Đấng Bản Quyền khi giáo dân các tỉnh miền Tây chạy về Mỹ Tho lánh nạn và hình thành cộng đoàn đầu tiên. Chính ngài nhận bản tường trình năm 1863 của Cha Charles Gernot về nhu cầu của họ đạo — bản tường trình dẫn tới việc các Nữ tu Thánh Phaolô thành Chartres đến Mỹ Tho năm 1864.' }
    ],
    milestones: [
      'Đấng Bản Quyền của họ đạo Mỹ Tho trong những năm cộng đoàn hình thành (1861 – 1864).',
      'Nhận bản tường trình 1863 của Cha Gernot, mở đường cho các Nữ tu Thánh Phaolô đến Mỹ Tho.'
    ]
  },
  {
    id: 'dgm-miche',
    name: 'Đức cha Jean-Claude Miche',
    saintName: 'Cố Mịch',
    role: 'Đại diện Tông toà Tây Đàng Trong (1864 – 1873)',
    period: '1864 – 1873',
    birth: '09/08/1805 tại Bruyères, Vosges, Pháp',
    origin: 'Hội Thừa Sai Paris — hồ sơ IRFA 0423',
    priestOrdination: 'Thụ phong linh mục ngày 05/06/1830 tại Saint-Dié',
    image: '/images/dgm_miche.jpg',
    source: 'Hồ sơ lưu trữ IRFA 0423',
    shortDesc:
      'Vị Giám mục đã long trọng đặt viên đá đầu tiên xây ngôi nhà thờ thứ hai của họ đạo Mỹ Tho năm 1866 — ngôi thánh đường có trong bản khắc năm 1877.',
    chronology: [
      { time: '1805 – 1835', title: 'Xuất thân và ơn gọi', content: 'Sinh ngày 09/08/1805 tại Bruyères (Vosges) trong một gia đình khiêm tốn. Học tiểu chủng viện Sénaide rồi đại chủng viện Foucharupt, thụ phong linh mục ngày 05/06/1830 tại Saint-Dié. Làm cha phó trong giáo xứ của người anh ruột là Cha Joseph, rồi theo anh về Fraize năm 1832.' },
      { time: '1836 – 1841', title: 'Ba lần vào Đàng Trong', content: 'Vào Chủng viện Thừa Sai ngày 10/09/1835. Chuyến đi đầu bị bão lớn ở vịnh Gascogne chặn lại; ngài rời Pháp ngày 15/04/1836 trên tàu Denise. Vì cuộc bách hại của vua Minh Mạng, ngài không vào được nhiệm sở nên phải học tiếng Việt tại Chủng viện chung, nơi ngài dạy thần học luân lý. Mãi ngày 19/06/1841 ngài mới vào được Đàng Trong.' },
      { time: '1841 – 1864', title: 'Phó Đại diện Tông toà', content: 'Đến ở Gò Thị gần Quy Nhơn bên cạnh Đức cha Cuénot và được đặt làm Phó Đại diện Tông toà. Với chức vụ này, ngài dự phần vào một công đồng bàn về việc ban các bí tích và cách hành xử của các thừa sai.' },
      { time: '1866', title: 'Đặt viên đá nhà thờ Mỹ Tho', content: 'Ngài long trọng đặt viên đá đầu tiên xây ngôi nhà thờ kiên cố cho họ đạo Mỹ Tho. Công trình bị đình lại khi tường mới cao một mét; Cha Sorel tiếp tục từ 1870 và Cha Moulins hoàn tất, làm phép năm 1876.' }
    ],
    milestones: [
      'Đặt viên đá đầu tiên ngôi nhà thờ thứ hai của họ đạo Mỹ Tho năm 1866.',
      'Từng bị cuộc bách hại của vua Minh Mạng chặn lại năm năm mới vào được nhiệm sở.'
    ],
    works: [
      {
        time: '1866',
        name: 'Ngôi nhà thờ thứ hai của họ đạo Mỹ Tho',
        now: 'không còn — tháo dỡ khoảng năm 1900',
        detail:
          'Đặt viên đá đầu tiên. Công trình do Cha Sorel dựng từ năm 1870 và Cha Moulins hoàn tất, được Đức cha Colombert làm phép ngày 12/03/1876.'
      }
    ]
  },
  {
    id: 'dgm-colombert',
    name: 'Đức cha Isidore Colombert',
    saintName: 'Cố Mỹ',
    role: 'Đại diện Tông toà Tây Đàng Trong (1873 – 1894)',
    period: '1873 – 1894',
    birth: '19/03/1838 tại Sainte-Marie-du-Bois, Mayenne, Pháp',
    origin: 'Hội Thừa Sai Paris — hồ sơ IRFA 0830',
    priestOrdination: 'Thụ phong linh mục ngày 30/05/1863',
    bishopConsecration: 'Đoản sắc 06/02/1872 đặt làm Giám mục hiệu toà Samosate; tấn phong tại Sài Gòn ngày 25/07/1872',
    image: '/images/dgm_colombert.jpg',
    source: 'Hồ sơ lưu trữ IRFA 0830',
    shortDesc:
      'Vị Giám mục làm phép ngôi nhà thờ Mỹ Tho ngày 12/03/1876, trước sự hiện diện của đại tá Trève cùng toàn thể binh sĩ đồn trú, các Sư huynh Lasan và các Nữ tu Thánh Phaolô.',
    chronology: [
      { time: '1838 – 1863', title: 'Học vấn và ơn gọi', content: 'Sinh ngày 19/03/1838 tại Sainte-Marie-du-Bois (Mayenne). Học trường trung học Laval, tiểu chủng viện Précigné (1856 – 1858) và đại chủng viện Le Mans. Vào Chủng viện Thừa Sai ngày 04/10/1860, thụ phong linh mục ngày 30/05/1863 và lên đường sang Nam Kỳ ngày 16/07 cùng năm.' },
      { time: '1864 – 1872', title: 'Từ Cái Nhum tới Toà Giám mục', content: 'Học tiếng tại Mặc Bắc. Năm 1864 coi địa hạt Cái Nhum tỉnh Vĩnh Long, nơi ngài dựng một nhà nguyện và một nhà xứ. Năm 1866 làm thư ký riêng của Đức cha Miche tại Sài Gòn kiêm quản lý địa phận; tài quản trị của ngài bộc lộ rõ trong các chức vụ này, đến mức Đức cha Miche lúc cuối đời đã chọn ngài làm Giám mục phó.' },
      { time: '12/03/1876', title: 'Làm phép nhà thờ Mỹ Tho', content: 'Chủ sự nghi thức làm phép trọng thể ngôi nhà thờ Mỹ Tho do Cha Sorel dựng và Cha Moulins hoàn tất. Tường thuật năm 1877 ghi rõ có mặt đại tá hải quân lục chiến Trève, các quan cai trị hạt, sĩ quan và công chức, toàn thể binh sĩ đồn trú, các Sư huynh Lasan và các Nữ tu Thánh Phaolô cùng học sinh, và toàn thể giáo dân.' },
      { time: '1879 – 1894', title: 'Chăm lo mục vụ Mỹ Tho', content: 'Đặt các cha tuyên uý cho quân y viện Mỹ Tho — Cha Hirbec năm 1879, trước đó là Cha Faron và Cha Launay. Năm 1881 trao địa hạt Vĩnh Long cho Cha Lizé, vị thừa sai từng phục vụ Mỹ Tho mười lăm năm.' }
    ],
    milestones: [
      'Làm phép ngôi nhà thờ thứ hai của họ đạo Mỹ Tho ngày 12/03/1876.',
      'Đặt các cha tuyên uý cho quân y viện Mỹ Tho.',
      'Dưới thời ngài, các Sư huynh Lasan được mời vào thuộc địa và hệ thống chủng viện địa phận được kiện toàn.'
    ]
  },
  {
    id: 'dgm-depierre',
    name: 'Đức cha Jean-Marie Dépierre',
    saintName: 'Cố Đễ',
    role: 'Đại diện Tông toà Tây Đàng Trong (1895 – 1898)',
    period: '1895 – 1898',
    birth: '18/01/1855 tại Thoiry, Savoie, Pháp',
    origin: 'Hội Thừa Sai Paris — hồ sơ IRFA 1442',
    priestOrdination: 'Thụ phong linh mục ngày 20/09/1879',
    bishopConsecration: 'Đắc cử Giám mục hiệu toà Benda ngày 12/04/1895; tấn phong tại Sài Gòn ngày 25/07/1895',
    image: '/images/dgm_depierre.jpg',
    source: 'Hồ sơ lưu trữ IRFA 1442',
    shortDesc:
      'Nhà thần học của địa phận: giáo sư chủng viện Sài Gòn, soạn và cho in một sách giáo khoa triết học cùng một sách thần học. Chính ngài giao cho Cha Quinton lập chủng viện tại An Đức gần Mỹ Tho năm 1896.',
    chronology: [
      { time: '1855 – 1879', title: 'Học vấn', content: 'Sinh ngày 18/01/1855 tại Thoiry (Savoie). Học tiểu chủng viện Saint-Pierre d’Albigny, vài tháng ở đại chủng viện Chambéry, vào Chủng viện Thừa Sai ngày 08/09/1876 với tư cách giáo dân. Thụ phong linh mục ngày 20/09/1879.' },
      { time: '1879 – 1895', title: 'Giáo sư và tác giả', content: 'Lên đường sang Nam Kỳ ngày 26/11/1879. Sau một thời gian ngắn ở Biên Hoà, ngài được đặt làm giáo sư Chủng viện Sài Gòn, lần lượt dạy tu từ học, triết học và thần học tín lý. Trong giai đoạn này ngài soạn và cho in một sách giáo khoa triết học và một sách thần học.' },
      { time: '1895 – 1898', title: 'Đại diện Tông toà', content: 'Đắc cử Giám mục hiệu toà Benda ngày 12/04/1895, tấn phong tại Sài Gòn ngày 25/07/1895. Ngài tách tiểu chủng viện khỏi đại chủng viện — việc phân chia này không kéo dài được lâu.' },
      { time: '1896', title: 'Chủng viện tại An Đức, gần Mỹ Tho', content: 'Khi tách tiểu chủng viện khỏi đại chủng viện, ngài giao cho Cha Victor Quinton lập một cơ sở mới tại An Đức thuộc vùng phụ cận Mỹ Tho. Vài năm sau, khí hậu không lành ở đó buộc phải chuyển các chủng sinh về Tân Định.' }
    ],
    milestones: [
      'Soạn và cho in một sách giáo khoa triết học và một sách thần học cho chủng viện.',
      'Tách tiểu chủng viện khỏi đại chủng viện và lập tiểu chủng viện tại An Đức, gần Mỹ Tho (1896).'
    ]
  },
  {
    id: 'dgm-mossard',
    name: 'Đức cha Lucien Mossard',
    saintName: 'Cố Mão',
    role: 'Đại diện Tông toà Tây Đàng Trong (1899 – 1920)',
    period: '1899 – 1920',
    birth: '24/10/1851 tại Dampierre-sur-le-Doubs, giáo phận Besançon, Pháp',
    origin: 'Hội Thừa Sai Paris — hồ sơ IRFA 1299',
    priestOrdination: 'Thụ phong linh mục ngày 23/09/1876',
    image: '/images/dgm_mossard.jpg',
    source: 'Hồ sơ lưu trữ IRFA 1299',
    shortDesc:
      'Chính ngài cử Cha Renier về Mỹ Tho năm 1899 — vị sẽ xây ngôi thánh đường hiện nay. Trước khi sang Nam Kỳ, ngài được gửi sang Pondichéry học tiếng Tamil vì Sài Gòn khi ấy có đông người Ấn.',
    chronology: [
      { time: '1851 – 1876', title: 'Ơn gọi từ một giáo xứ nhỏ', content: 'Sinh ngày 24/10/1851 tại Dampierre-sur-le-Doubs trong một gia đình đạo đức sâu sắc. Cha sở giáo xứ là Cha Piquet gửi ngài vào tiểu chủng viện Marnay học trung học từ 1866 đến 1872, rồi một năm triết học tại Vesoul. Vào Chủng viện Thừa Sai ngày 23/09/1873, thụ phong linh mục ngày 23/09/1876 và hôm sau nhận bài sai đi Nam Kỳ.' },
      { time: '1876 – 1877', title: 'Một năm ở Ấn Độ học tiếng Tamil', content: 'Trước khi tới nhiệm sở, ngài được gửi sang Pondichéry học tiếng Tamil, vì nhiều người Ấn sinh sống tại Sài Gòn và vùng phụ cận. Ngài ở Ấn Độ khoảng một năm và tới Sài Gòn năm 1877.' },
      { time: '1899', title: 'Cử Cha Renier về Mỹ Tho', content: 'Ngài mời Cha Moulins — sau 27 năm ở Mỹ Tho — về nhận chức chánh sở Nhà thờ Chánh Tòa Sài Gòn, và cử Cha Renier từ Chợ Đũi về thay. Cha Renier chính là vị sẽ khởi công ngôi thánh đường hiện nay ngày 11/08/1906.' },
      { time: '1899 – 1920', title: 'Trường Lasan tại Mỹ Tho', content: 'Dưới thời ngài, các Sư huynh Lasan lập một trường tại Mỹ Tho và mở nội trú, số học sinh tăng nhanh. Trường Taberd tại Sài Gòn cũng tiếp tục phát triển.' }
    ],
    milestones: [
      'Cử Cha Renier về Mỹ Tho năm 1899 — vị xây ngôi Nhà thờ Chánh Tòa hiện nay.',
      'Dưới thời ngài, các Sư huynh Lasan lập trường và mở nội trú tại Mỹ Tho.'
    ]
  },
  {
    id: 'dgm-quinton',
    name: 'Đức cha Victor Quinton',
    saintName: 'Cố Tôn',
    role: 'Đại diện Tông toà Tây Đàng Trong (1920 – 1924)',
    period: '1920 – 1924',
    birth: '04/11/1866 tại xóm La Cointerie, giáo xứ Gorron, Mayenne, Pháp',
    origin: 'Hội Thừa Sai Paris — hồ sơ IRFA 1880',
    image: '/images/dgm_quinton.jpg',
    source: 'Hồ sơ lưu trữ IRFA 1880',
    shortDesc:
      'Trước khi làm Giám mục, chính ngài được Đức cha Dépierre giao lập tiểu chủng viện tại An Đức gần Mỹ Tho năm 1896 — họ đạo do các nghĩa quân được Cha Marc xin ân xá lập nên.',
    chronology: [
      { time: '1866', title: 'Gia đình', content: 'Sinh ngày 04/11/1866 tại xóm La Cointerie thuộc giáo xứ Gorron (Mayenne), rửa tội ngay hôm sau. Ngài là con thứ tư của ông Joseph Quinton và bà Victoire Garnier; một người chị hơn ngài hai tuổi tên Léonie đi tu dòng Bác Ái Évron.' },
      { time: 'Trước 1896', title: 'Học tiếng Việt và dạy chủng viện', content: 'Sau một thời gian ở Bà Rịa học tiếng Việt dưới sự hướng dẫn của Cha Combalbert, ngài được đặt về Chủng viện Sài Gòn.' },
      { time: '1896', title: 'Lập tiểu chủng viện tại An Đức, gần Mỹ Tho', content: 'Đức cha Dépierre tách tiểu chủng viện khỏi đại chủng viện và giao cho ngài lập một cơ sở mới tại An Đức thuộc vùng phụ cận Mỹ Tho. Vài năm sau, khí hậu không lành ở đó buộc ngài phải chuyển các chủng sinh đi nơi khác. Về Tân Định, nơi ngài tự tay dựng một khuôn viên đẹp đẽ, ngài sống những năm hạnh phúc nhất, yêu mến học trò và được các chủng sinh cùng anh em linh mục quý mến.' },
      { time: '1920 – 1924', title: 'Đại diện Tông toà', content: 'Kế vị Đức cha Mossard, coi sóc địa phận Tây Đàng Trong trong đó có họ đạo Mỹ Tho, cho tới khi qua đời.' }
    ],
    milestones: [
      'Lập tiểu chủng viện của địa phận tại An Đức, vùng phụ cận Mỹ Tho, năm 1896.',
      'Gây dựng cơ sở chủng viện tại Tân Định sau khi rời An Đức.'
    ],
    works: [
      {
        time: '1896',
        name: 'Tiểu chủng viện tại An Đức',
        now: 'không còn ở An Đức — chủng sinh đã chuyển về Tân Định vì khí hậu không lành',
        detail:
          'Cơ sở đào tạo do Đức cha Dépierre giao cho ngài lập tại An Đức, họ đạo gần Mỹ Tho do các nghĩa quân được Cha Marc xin ân xá lập nên. Đây là lần đầu vùng Mỹ Tho có một chủng viện của địa phận.'
      }
    ]
  },
  {
    id: 'dgm-dumortier',
    name: 'Đức cha Isidore Dumortier',
    saintName: 'Cố Đượm',
    role: 'Đại diện Tông toà Tây Đàng Trong (1926 – 1941)',
    period: '1926 – 1941',
    birth: '06/04/1869 tại Halluin, Nord, Pháp',
    origin: 'Hội Thừa Sai Paris — hồ sơ IRFA 2406',
    priestOrdination: 'Thụ phong linh mục ngày 27/05/1893',
    image: '/images/dgm_dumortier.jpg',
    source: 'Hồ sơ lưu trữ IRFA 2406. Chân dung do Giáo xứ Chánh Tòa Mỹ Tho cung cấp.',
    shortDesc:
      'Tiến sĩ triết học và thần học tại Đại học Grêgôriô ở Rôma. Ngài làm cha phó rồi kế nhiệm Cha Gernot tại Cái Mơn suốt 26 năm trước khi lên Giám mục.',
    chronology: [
      { time: '1869 – 1893', title: 'Học tại Rôma', content: 'Sinh ngày 06/04/1869 tại Halluin (Nord). Theo học Đại học Grêgôriô, đậu tiến sĩ triết học và tiến sĩ thần học trước khi thụ phong linh mục ngày 27/05/1893.' },
      { time: '1898 – 1924', title: 'Hai mươi sáu năm tại Cái Mơn', content: 'Vào Chủng viện Thừa Sai năm 1897, lên đường sang Nam Kỳ ngày 23/11/1898. Sau khi học tiếng Việt tại Sài Gòn, ngài được gửi tới Cái Mơn ở với Cha Gernot, làm cha phó rồi năm 1912 kế nhiệm. Ngài ở Cái Mơn 26 năm, đi khắp địa hạt thăm viếng giáo dân.' },
      { time: '1926 – 1941', title: 'Đại diện Tông toà', content: 'Sau khi Đức cha Quinton qua đời, ngài được đặt làm Giám mục hiệu toà Lipara và Đại diện Tông toà Tây Đàng Trong. Trong nhiệm kỳ, ngài lo nâng trình độ học vấn cho các nữ tu Mến Thánh Giá và vận động các Sư huynh Lasan lập Trường Taberd tại Sài Gòn.' },
      { time: '1929 – 1941', title: 'Với họ đạo Mỹ Tho', content: 'Là Đấng Bản Quyền suốt phần lớn nhiệm kỳ của Cha Bar tại Mỹ Tho: năm 1929 các Đệ tử Sư huynh Lasan về Mỹ Tho, đến 1930 trường Sư huynh có 400 học sinh và trường Nữ tu Thánh Phaolô 300 nữ sinh; năm 1933 địa hạt ghi nhận 642 người được rửa tội và ba họ đạo mới được lập.' }
    ],
    milestones: [
      'Tiến sĩ triết học và thần học tại Đại học Grêgôriô, Rôma.',
      'Nâng trình độ học vấn cho các nữ tu Mến Thánh Giá.',
      'Vận động các Sư huynh Lasan lập Trường Taberd Sài Gòn.'
    ]
  },
  {
    id: 'dgm-cassaigne',
    name: 'Đức cha Jean Cassaigne',
    saintName: 'Cố Sanh',
    role: 'Đại diện Tông toà Sài Gòn (1941 – 1955)',
    period: '1941 – 1955',
    birth: '30/01/1895 tại Grenade-sur-l’Adour, Landes, Pháp',
    origin: 'Hội Thừa Sai Paris — hồ sơ IRFA 3300',
    priestOrdination: 'Thụ phong linh mục ngày 19/12/1925 do Đức cha de Guébriant',
    image: '/images/dgm_cassaigne.jpg',
    source: 'Hồ sơ lưu trữ IRFA 3300',
    shortDesc:
      'Vị tông đồ của người phong. Sau nhiệm kỳ Giám mục, ngài xin về sống giữa các bệnh nhân phong tại Di Linh và qua đời ở đó.',
    chronology: [
      { time: '1895 – 1920', title: 'Từ nghề buôn rượu vang tới ơn gọi', content: 'Sinh ngày 30/01/1895 tại Grenade-sur-l’Adour (Landes). Học với các Sư huynh Lasan tại Lez, Tây Ban Nha, rồi năm 1911 bắt đầu học nghề buôn rượu vang với thân phụ. Được nhận vào Hội Thừa Sai ngày 07/09/1920.' },
      { time: '1925 – 1926', title: 'Thụ phong và lên đường', content: 'Thụ phong linh mục ngày 19/12/1925 do Đức cha de Guébriant, khi ấy là Bề trên Tổng quyền. Ngày 10/02/1926 nhận bài sai đi địa phận Sài Gòn và lên đường ngày 06/04 cùng năm.' },
      { time: '1941 – 1955', title: 'Đại diện Tông toà Sài Gòn', content: 'Coi sóc địa phận qua thời kỳ Nhật chiếm đóng và những năm biến động sau đó. Chính ngài phân bổ các thừa sai về Mỹ Tho trong giai đoạn này — hồ sơ Cha René Detry ghi ngài từng cho vị này chọn giữa Đà Lạt và Mỹ Tho.' },
      { time: 'Sau 1955', title: 'Trở về với người phong Di Linh', content: 'Sau khi từ nhiệm, ngài xin về sống giữa các bệnh nhân phong tại Di Linh — công cuộc ngài đã khởi sự từ khi còn là linh mục — và qua đời ở đó.' }
    ],
    milestones: [
      'Vị tông đồ của người phong tại Di Linh.',
      'Đấng Bản Quyền của họ đạo Mỹ Tho qua thời kỳ Nhật chiếm đóng và những năm cuối đời Cha Bar.'
    ]
  },
  {
    id: 'dgm-nguyen-van-hien',
    name: 'Đức cha Simon Hòa Nguyễn Văn Hiền',
    saintName: 'Thánh Simon',
    role: 'Đại diện Tông toà Sài Gòn (1955 – 1960) — vị người Việt đầu tiên',
    period: '1955 – 1960',
    origin: 'Việt Nam',
    image: '/images/dgm_nguyen_van_hien.jpg',
    source: 'Chân dung do Giáo xứ Chánh Tòa Mỹ Tho cung cấp.',
    shortDesc:
      'Vị Đại diện Tông toà người Việt Nam đầu tiên của địa phận Sài Gòn, và là Đấng Bản Quyền cuối cùng của họ đạo Mỹ Tho trước khi Giáo phận Mỹ Tho được khai sinh.',
    chronology: [
      { time: '1955 – 1960', title: 'Đại diện Tông toà người Việt đầu tiên', content: 'Ngài là người Việt Nam đầu tiên coi sóc địa phận Sài Gòn, kế nhiệm Đức cha Cassaigne. Suốt nhiệm kỳ này, họ đạo Mỹ Tho vẫn thuộc quyền ngài.' },
      { time: '24/11/1960', title: 'Bước ngoặt', content: 'Tông hiến Venerabilium Nostrorum thiết lập Hàng Giáo Phẩm Việt Nam: Sài Gòn được nâng lên Tổng Giáo phận, bốn tỉnh Định Tường, Long An, Kiến Tường và Kiến Phong tách ra lập Giáo phận Mỹ Tho. Từ đây họ đạo Mỹ Tho có Đấng Bản Quyền riêng là Đức cha Giuse Trần Văn Thiện.' },
      { time: '1960', title: 'Giám mục tiên khởi Đà Lạt', content: 'Cùng năm ấy, ngài được đặt làm Giám mục Chính tòa tiên khởi Giáo phận Đà Lạt.' }
    ],
    milestones: [
      'Vị Đại diện Tông toà người Việt Nam đầu tiên của địa phận Sài Gòn.',
      'Đấng Bản Quyền cuối cùng của họ đạo Mỹ Tho trước ngày lập Giáo phận Mỹ Tho.',
      'Giám mục Chính tòa tiên khởi Giáo phận Đà Lạt (1960).'
    ]
  }
];

export const PRIESTS_SERVED: { name: string; note: string; ma: string }[] = [
  { name: 'Cha Phanxicô Isiđôrê Gagelin', note: 'quản các địa hạt Mỹ Tho, Vĩnh Long và Châu Đốc từ năm 1828; sau là vị tử đạo được tôn phong hiển thánh', ma: 'IRFA 0342' },
  { name: 'Cha Charles Gernot', note: 'về Mỹ Tho năm 1862, khi ấy là lỵ sở một địa hạt 2.300 giáo dân; bản tường trình ngài gửi Đức cha Lefebvre năm 1863 đưa tới việc các Nữ tu Thánh Phaolô thành Chartres đến Mỹ Tho', ma: 'IRFA 0794' },
  { name: 'Cha Jean-Joseph Barou', note: 'coi họ đạo Thủ Ngữ gần Mỹ Tho trong cơn loạn tháng 12/1862', ma: 'IRFA 0738' },
  { name: 'Cha Théodule Hamon', note: 'học tiếng Việt tại Mỹ Tho rồi quyền coi họ đạo; sang Ba Giồng tháng 02/1870. Chính ngài viết bài tường thuật cuộc bách hại Ba Giồng đăng năm 1882', ma: 'IRFA 1002' },
  { name: 'Cha Jean Piault', note: 'khởi đầu sứ vụ tại Mỹ Tho tháng 6/1871 trước khi làm giáo sư Chủng viện Sài Gòn', ma: 'IRFA 1078' },
  { name: 'Cha Jules Leprince', note: 'lần lượt coi sóc các họ đạo Mỹ Tho, Thủ Dầu Một và Giồng Rùm', ma: 'IRFA 1009' },
  { name: 'Cha Émile Moreau', note: 'coi hai họ đạo Thủ Ngữ và Tân Xuân ngay ngoài Mỹ Tho, xây nhà thờ mới cho họ đạo', ma: 'IRFA 1012' },
  { name: 'Cha Eugène Faron', note: 'khởi đầu tại Mỹ Tho làm tuyên uý quân y viện; trở lại Mỹ Tho năm 1882 và tiếp tục coi sóc quân y viện', ma: 'IRFA 1189' },
  { name: 'Cha Adrien Launay', note: 'cha phó kiêm tuyên uý quân y viện Mỹ Tho hai năm 1878 – 1879; về sau là sử gia của Hội Thừa Sai Paris', ma: 'IRFA 1325' },
  { name: 'Cha Jacques Hirbec', note: 'Đức cha Colombert đặt làm tuyên uý quân y viện Mỹ Tho năm 1879; sau một thời gian dưỡng bệnh lại trở về chính nhiệm sở này', ma: 'IRFA 1061' },
  { name: 'Cha Alphonse Thévenin', note: 'trông coi một công trình xây dựng lớn tại Mỹ Tho', ma: 'IRFA 1761' },
  { name: 'Cha Joseph Guillot', note: 'lâm bệnh nặng trên đường về Sài Gòn và qua đời tại Mỹ Tho ngày 27/6/1894', ma: 'IRFA 1686' },
  { name: 'Cha Victor Quinton', note: 'được chỉ định lập cơ sở mới tại An Đức, vùng phụ cận Mỹ Tho', ma: 'IRFA 1880' },
  { name: 'Cha Ernest Hay', note: 'coi sóc An Đức cùng bốn họ đạo tách từ địa hạt Mỹ Tho, làm nguồn nuôi Trường Giáo Lý Viên', ma: 'IRFA 1987' },
  { name: 'Cha Henri Hay', note: 'phụ tá rồi kế nhiệm anh mình tại Trường Giáo Lý Viên An Đức', ma: 'IRFA 2126' },
  { name: 'Cha Jean Benoit', note: 'được đặt tại Tân An, một họ đạo thuộc địa hạt Mỹ Tho', ma: 'IRFA 1844' },
  { name: 'Cha Joseph Villeneuve', note: 'năm 1910 chứng kiến phong trào trở lại đạo tại địa hạt Mỹ Tho, sáu bảy họ đạo mới hình thành dọc sông Tiền', ma: 'IRFA 2520' },
  { name: 'Cha Marcel Piquet', note: 'học tiếng Việt tại Mỹ Tho và ở tại một họ nhánh của Mỹ Tho; về sau là Giám mục Nha Trang', ma: 'IRFA 3141' },
  { name: 'Cha René Detry', note: 'được Đức cha Cassaigne cho chọn giữa Đà Lạt và Mỹ Tho; ngài chọn Mỹ Tho và làm cha sở tại đây', ma: 'IRFA 3246' },
  { name: 'Cha Robert Seminel', note: 'cuối năm 1943 làm cha sở họ đạo cổ Thủ Ngữ, cách Mỹ Tho tám cây số; trải qua thời kỳ quân đội Nhật chiếm đóng Mỹ Tho', ma: 'IRFA 3365' }
];

/** Các Đức Giám mục có dấu ấn trực tiếp trên họ đạo Mỹ Tho. */
export const BISHOPS_LINKED: { name: string; note: string; ma: string }[] = [
  { name: 'Đức cha Dominique Lefebvre', note: 'Đại diện Tông tòa Tây Đàng Trong, nhận bản tường trình năm 1863 của Cha Gernot về nhu cầu của họ đạo Mỹ Tho', ma: '' },
  { name: 'Đức cha Jean-Claude Miche', note: 'đặt viên đá đầu tiên ngôi nhà thờ thứ hai năm 1866', ma: 'IRFA 0423' },
  { name: 'Đức cha Isidore Colombert', note: 'làm phép ngôi nhà thờ thứ hai ngày 12/03/1876; đặt các cha tuyên uý quân y viện Mỹ Tho', ma: 'IRFA 0830' },
  { name: 'Đức cha Lucien Mossard', note: 'điều Cha Moulins về Sài Gòn và cử Cha Renier về Mỹ Tho năm 1899; dưới thời ngài các Sư huynh Lasan lập trường và nội trú tại Mỹ Tho', ma: 'IRFA 1299' }
];

/**
 * Các tu sĩ đồng hành với Xứ Đoàn. Hiện chỉ có một vị tra được; để riêng một
 * mảng để sau này thêm mà không đụng tới các mảng khác.
 */
/**
 * Lý lịch các Huynh Trưởng và tu sĩ từng phục vụ trong Ban Điều Hành Xứ Đoàn.
 *
 * Phần lớn các trưởng chưa có tư liệu ngoài chức vụ đã đảm nhiệm — ghi rõ là
 * chưa cập nhật thay vì suy đoán, giống cách làm với bảng niên biểu cha sở.
 */
export const BDH_BIOS: DetailedBioRecord[] = [
  {
    id: 'bdh-le-tan-phai',
    name: 'Phêrô Lê Tấn Phải',
    saintName: 'Thánh Phêrô Tông Đồ',
    role: 'Nguyên Xứ Đoàn Trưởng Xứ Đoàn Các Thánh Tử Đạo Việt Nam • Nguyên Chủ tịch Liên Đoàn Các Thánh Tử Đạo Việt Nam — Giáo phận Mỹ Tho',
    period: 'Khoảng 2005 – 2019',
    image: '/images/bdh_le_tan_phai.jpg',
    origin: 'Xứ Đoàn Các Thánh Tử Đạo Việt Nam, Giáo xứ Chánh Tòa Mỹ Tho',
    source:
      'Ảnh do Giáo xứ cung cấp. Ghi chép của Xứ Đoàn do Ban Điều Hành cung cấp; bài "Quá trình hình thành và phát triển của TNTT Giáo phận Mỹ Tho — Liên đoàn Các Thánh Tử Đạo Việt Nam", tnttgioitremytho.com, 26/11/2018',
    shortDesc:
      'Phục vụ Xứ Đoàn khoảng mười bốn năm, từ Ban Điều Hành đời đầu năm 2005 đến khi ban từ nhiệm năm 2019, trong đó có nhiệm kỳ Xứ Đoàn Trưởng dài và liên tục nhất từ ngày tái lập. Đồng thời được bầu làm Chủ tịch Liên đoàn Các Thánh Tử Đạo Việt Nam của cả Giáo phận Mỹ Tho nhiệm kỳ 2017 – 2020.',
    chronology: [],
    milestones: [
      'Trong Phong trào, không ai tự nhận lấy việc phục vụ. Mỗi khoá huấn luyện đều khép lại bằng nghi thức sai đi với hành trang Lời Chúa — như chính sổ tay giáo xứ đã ghi trong ngày sa mạc 04/12/2005 — và mọi Huynh Trưởng đều bắt đầu từ chỗ được sai đến phục vụ các em, phụng sự Giáo Hội. Chức vụ đến sau, và đến từ sự tín nhiệm của cộng đoàn chứ không từ mong muốn của mình. Trưởng thuộc lớp người được sai đi sớm nhất: ngay trong Ban Điều Hành đời đầu sau ngày Xứ Đoàn hồi sinh năm 2005, trưởng đã giữ chức Xứ Đoàn Phó nội vụ, khi cả guồng máy còn chưa có tiền lệ nào để dựa vào. Từ đó đến năm 2019 là mười bốn năm phục vụ liên tục.',
      'Khoảng năm 2013, Hội đồng Huynh Trưởng bầu trưởng đứng đầu Ban Điều Hành, cùng thầy Augustinô Võ Tấn Hoàng Việt làm Phó nội vụ và Huấn Luyện Viên Têrêsa Lê Thanh Nhàn làm Phó ngoại vụ. Đó là nhiệm kỳ mà Xứ Đoàn và Ban Giáo Lý lần đầu được đặt dưới một nhịp điều hành chung, và cho tới nay vẫn là giai đoạn duy nhất Ban Điều Hành được hình thành đúng quy trình bầu cử của Điều 27 Nội Quy — do chính Hội đồng Huynh Trưởng bầu lên, chứ không phải được đặt vào. Cũng là nhiệm kỳ đi trọn nhiều chu kỳ hai năm liên tiếp, dài và liên tục nhất kể từ ngày tái lập.',
      'Tháng 7 năm 2017, tại khoá huấn luyện Vươn Lên 4 với hơn ba trăm mười sa mạc sinh, sau khi Trung tâm Mục vụ Giáo phận khánh thành, Ban Chấp Hành mới của Liên đoàn ra mắt Đức Cha và Huynh Trưởng đoàn. Trưởng được bầu làm Chủ tịch Liên đoàn Các Thánh Tử Đạo Việt Nam — Giáo phận Mỹ Tho, nhiệm kỳ 2017 – 2020. Chỉ trong năm tháng từ khoá huấn luyện ấy đến cuối năm, Liên đoàn có thêm ba Xứ Đoàn mới được thành lập.',
      'Năm 2019, Ban Điều Hành từ nhiệm. Nhưng dấu ấn của trưởng thì đã vượt khỏi ranh giới Chánh Toà từ hai năm trước đó: lần đầu tiên một Xứ Đoàn nhỏ bên bờ sông Tiền góp cho Phong trào của cả giáo phận người đứng đầu. Từ 2017, Xứ Đoàn này thôi chỉ là nơi nhận đường hướng, mà bắt đầu là nơi gửi người đi.'
    ]
  },
  {
    id: 'bdh-vo-tan-hoang-viet',
    name: 'Thầy Augustinô Võ Tấn Hoàng Việt',
    saintName: 'Thánh Augustinô',
    role: 'Nguyên Xứ Đoàn Phó nội vụ Xứ Đoàn Các Thánh Tử Đạo Việt Nam • Hiện quản lý Ban Giáo Lý Thiếu Nhi Giáo xứ Chánh Toà Mỹ Tho',
    period: 'Khoảng 2013 – nay',
    image: '/images/bdh_vo_tan_hoang_viet.jpg',
    origin: 'Giáo xứ Chánh Tòa Mỹ Tho — giáo viên môn Toán, Trường THCS Lê Ngọc Hân, thành phố Mỹ Tho',
    nghe: 'Giáo viên môn Toán, Trường THCS Lê Ngọc Hân, thành phố Mỹ Tho',
    source: 'Ghi chép của Xứ Đoàn do Ban Điều Hành cung cấp. Ảnh do Giáo xứ cung cấp.',
    shortDesc:
      'Giáo viên môn Toán tại Trường THCS Lê Ngọc Hân, thành phố Mỹ Tho. Phó nội vụ trong nhiệm kỳ 2013 – 2019, sau đó quản lý Ban Giáo Lý Thiếu Nhi của giáo xứ cho đến nay. Chữ "Thầy" trước tên là danh xưng nghề giáo.',
    chronology: [],
    milestones: [
      'Trưởng được sai đến với Xứ Đoàn để phục vụ, và mang theo cái nghề Chúa đã trao cho mình ngoài đời: thầy giáo dạy Toán tại Trường THCS Lê Ngọc Hân, thành phố Mỹ Tho — chữ "Thầy" trước tên là danh xưng nghề giáo. Việc đứng lớp và việc dạy đức tin cho thiếu nhi vốn cùng một công việc truyền đạt, chỉ khác đối tượng và khác nội dung, nên phần việc trưởng nhận trong Xứ Đoàn về sau là điều tự nhiên. Theo cách đối chiếu của bản khảo cứu, trưởng có mặt ngay trong Ban Điều Hành đời đầu sau ngày tái lập năm 2005.',
      'Khoảng 2013 đến 2019, trưởng làm Xứ Đoàn Phó nội vụ — theo Nội Quy tương ứng với Phó đặc trách quản trị của Ban Thường vụ — trong nhiệm kỳ mà Xứ Đoàn và Ban Giáo Lý lần đầu đi chung một đường lối.',
      'Rồi Ban Điều Hành từ nhiệm năm 2019 và Xứ Đoàn bước vào năm năm không có ban. Trưởng không rời đi. Từ năm 2020 đến nay, trưởng quản lý Ban Giáo Lý Thiếu Nhi của Giáo xứ Chánh Toà Mỹ Tho, song song với trưởng Matthêu Lê Hoàng Thiên Phúc trông coi sinh hoạt Thiếu Nhi Thánh Thể. Suốt quãng lặng dài nhất trong lịch sử điều hành của Xứ Đoàn, phần giáo lý của giáo xứ không đứt mạch — điều mà một bảng phân công để trống không ghi lại được, nhưng những lớp học vẫn mở đều mỗi tuần thì có.'
    ]
  },
  {
    id: 'bdh-le-thanh-nhan',
    name: 'Têrêsa Lê Thanh Nhàn',
    saintName: 'Thánh Têrêsa',
    role: 'Nguyên Xứ Đoàn Phó ngoại vụ Xứ Đoàn Các Thánh Tử Đạo Việt Nam • Hiện là Thư Ký Liên Đoàn Các Thánh Tử Đạo Việt Nam — Giáo phận Mỹ Tho',
    period: 'Khoảng 2013 – nay',
    image: '/images/bdh_le_thanh_nhan.jpg',
    origin: 'Xứ Đoàn Các Thánh Tử Đạo Việt Nam, Giáo xứ Chánh Tòa Mỹ Tho',
    nghe: 'Sư phạm Mầm non',
    source: 'Ghi chép của Xứ Đoàn do Ban Điều Hành cung cấp. Ảnh do Giáo xứ cung cấp.',
    shortDesc:
      'Huấn Luyện Viên của Phong trào, giữ chức Phó ngoại vụ Xứ Đoàn trong nhiệm kỳ 2013 – 2019. Rời Xứ Đoàn Chánh Tòa năm 2019 nhưng không rời Phong trào: trưởng tiếp tục phục vụ ở cấp giáo phận với chức Thư ký Liên đoàn Các Thánh Tử Đạo Việt Nam suốt hai nhiệm kỳ liên tiếp, 2020 – 2025 và 2025 – 2030.',
    chronology: [],
    milestones: [
      'Trưởng được sai đến phục vụ Phong trào và được Phong trào tin cậy trao lại cho việc đào tạo. Trưởng mang cấp hiệu Huấn Luyện Viên của Thiếu Nhi Thánh Thể — cấp bậc dành cho người không chỉ phục vụ mà còn huấn luyện ra người phục vụ, và là điều không ai tự nhận được: phải qua sa mạc huấn luyện, phải được cấp trên trong Phong trào công nhận.',
      'Khoảng 2013 đến 2019, trưởng làm Xứ Đoàn Phó ngoại vụ của Chánh Toà, theo Nội Quy tương ứng với Phó đặc trách huấn luyện — đúng với cấp hiệu của mình.',
      'Năm 2019, khi Ban Điều Hành từ nhiệm, trưởng không còn sinh hoạt tại Xứ Đoàn Chánh Toà. Nhưng rời một xứ đoàn không có nghĩa là rời Phong trào. Từ 2020 đến 2025 rồi tái cử tiếp nhiệm kỳ 2025 – 2030, trưởng đảm nhiệm chức Thư ký Liên đoàn Các Thánh Tử Đạo Việt Nam — Giáo phận Mỹ Tho: phần việc lo báo cáo hành chánh và lưu giữ hồ sơ sinh hoạt, thầm lặng, nhưng là chỗ dựa cho mọi khoá huấn luyện và mọi kỳ đại hội của cả giáo phận. Mười năm liền.',
      'Cùng với trưởng Phêrô Lê Tấn Phải, trưởng là người thứ hai của Chánh Toà giữ chức vụ trong Ban Điều Hành Liên đoàn cấp giáo phận. Một nhiệm kỳ duy nhất, 2013 – 2019, đã gửi lên Liên đoàn cả một Chủ tịch lẫn một Thư ký — và cả hai vị đều còn phục vụ rất lâu sau khi tên mình không còn trên bảng phân công của Xứ Đoàn.'
    ]
  },
  {
    id: 'bdh-le-hoang-thien-phuc',
    image: '/images/bdh_le_hoang_thien_phuc.jpg',
    name: 'Matthêu Lê Hoàng Thiên Phúc',
    saintName: 'Thánh Matthêu',
    role: 'Nguyên Trưởng Ban Truyền Thông • Nguyên Xứ Đoàn Trưởng Xứ Đoàn Các Thánh Tử Đạo Việt Nam • Hiện là Uỷ viên Ban Phụng vụ Liên Đoàn Các Thánh Tử Đạo Việt Nam — Giáo phận Mỹ Tho',
    period: '2017 – nay',
    origin: 'Xứ Đoàn Các Thánh Tử Đạo Việt Nam, Giáo xứ Chánh Tòa Mỹ Tho',
    nghe: 'Học viên cao học, Đại Học Gia Định — Thành phố Hồ Chí Minh',
    source: 'Ghi chép của Xứ Đoàn do Ban Điều Hành cung cấp',
    offices: [
      'Nguyên Trưởng Ban Truyền Thông Xứ Đoàn (2018 – 2020)',
      'Nguyên Xứ Đoàn Trưởng (tháng 6 – 12/2025)',
      'Hỗ trợ các vấn đề truyền thông Xứ Đoàn (2025 – nay)',
      'Uỷ viên ban Phụng vụ Liên đoàn Các Thánh Tử Đạo Việt Nam – Giáo phận Mỹ Tho (nhiệm kỳ 2025 – 2030)'
    ],
    shortDesc:
      'Uỷ viên ban Phụng vụ Liên đoàn Các Thánh Tử Đạo Việt Nam – Giáo phận Mỹ Tho (nhiệm kỳ 2025 – 2030). Phục vụ tại Xứ Đoàn từ năm 2017, làm Trưởng Ban Truyền Thông giai đoạn 2018 – 2020. Người giữ sinh hoạt Thiếu Nhi Thánh Thể suốt năm năm Xứ Đoàn không có Ban Điều Hành, rồi được cha Tuyên Uý bổ nhiệm làm Xứ Đoàn Trưởng khi Ban Điều Hành được tái lập tháng 6/2025 — việc tái lập xuất phát từ mong muốn và thỉnh nguyện của chính Huynh Trưởng đoàn sau năm năm Xứ Đoàn không có ban.',
    chronology: [],
    milestones: [
      'Năm 2017, trưởng được sai đến phục vụ tại Xứ Đoàn — như mọi Huynh Trưởng, bắt đầu không phải bằng một chức danh mà bằng việc đứng bên các em. Rồi ở lại liên tục cho tới nay, một quãng dài hiếm có ở một đoàn thể mà phần lớn người phục vụ đều đi qua tuổi sinh viên rồi rời đi. Mọi chức vụ trưởng nhận về sau đều là chức vụ được trao, sau khi đã phục vụ đủ lâu để cộng đoàn tín nhiệm.',
      'Từ 2018 đến 2020, trưởng phụ trách Ban Truyền Thông của Xứ Đoàn, cùng trưởng Phêrô Lê Gia Huy làm phó ban, lo phần ghi hình, hình ảnh và loan tin sinh hoạt.',
      'Nhưng dấu ấn lớn nhất của trưởng nằm ở đúng những năm mà bảng phân công của Xứ Đoàn để trống. Từ 2020 đến 2024, khi Xứ Đoàn không có Ban Điều Hành chính thức, trưởng là người được giao trông coi sinh hoạt Thiếu Nhi Thánh Thể, song song với thầy Augustinô Võ Tấn Hoàng Việt quản lý Ban Giáo Lý Thiếu Nhi của giáo xứ. Không có cơ cấu đứng sau, không có nhiệm kỳ để dựa vào, mỗi việc phải xử lý theo từng vụ — tuỳ hoàn cảnh, tuỳ người phụ trách, tuỳ nhu cầu trước mắt. Xứ Đoàn đi qua được năm năm ấy phần lớn là nhờ vậy.',
      'Tháng 6 năm 2025, sau khi Huynh Trưởng đoàn bày tỏ nguyện vọng tái lập Ban Điều Hành, cha Tuyên Uý Phêrô Nguyễn Ngọc bổ nhiệm trưởng làm Xứ Đoàn Trưởng, nhiệm kỳ hai năm theo Nội Quy. Cùng năm, trưởng được tín nhiệm làm Uỷ viên ban Phụng vụ Liên đoàn Các Thánh Tử Đạo Việt Nam — Giáo phận Mỹ Tho, nhiệm kỳ 2025 – 2030.',
      'Cuối năm 2025, trong ít tháng ngắn ngủi của nhiệm kỳ, trưởng cùng trưởng Phêrô Lê Gia Huy đưa chương trình ngành Hiệp Sĩ và khăn Hiệp Sĩ vào sinh hoạt chính thức — lần đầu tiên hệ thống ngành của Xứ Đoàn đủ mặt; và cùng trưởng Gia Huy với trưởng Batôlômêô Nguyễn Phúc Khang xây dựng chương trình đào tạo Huynh Trưởng Xứ Đoàn, lộ trình nội bộ mà Xứ Đoàn thiếu suốt hai mươi năm.',
      'Ngày 12 tháng 12 năm 2025, nhân Đêm Thánh Ca "Ánh Sáng Hy Vọng" của Giáo hạt Mỹ Tho tổ chức tại Nhà thờ Chánh Toà, Ban Điều Hành được cho ngưng nhiệm vụ, sớm hơn dự định. Nhưng hai công trình kia thì ở lại — chúng đã thành nếp sinh hoạt, và nếp thì không gỡ ra được bằng một quyết định. Trưởng cũng ở lại, quay về hỗ trợ đúng mảng truyền thông đã bắt đầu từ bảy năm trước, lần này không cần chức danh nào.'
    ]
  },
  {
    id: 'bdh-le-dang-thu-thao',
    image: '/images/bdh_le_dang_thu_thao.jpg',
    name: 'Maria Lê Đặng Thu Thảo',
    saintName: 'Đức Maria',
    role: 'Nguyên Trưởng Ban Sinh Hoạt • Nguyên Xứ Đoàn Phó nội vụ Xứ Đoàn Các Thánh Tử Đạo Việt Nam',
    period: '2020 – nay',
    origin: 'Xứ Đoàn Các Thánh Tử Đạo Việt Nam, Giáo xứ Chánh Tòa Mỹ Tho',
    source: 'Ghi chép của Xứ Đoàn do Ban Điều Hành cung cấp',
    offices: [
      'Nguyên Trưởng Ban Sinh Hoạt Xứ Đoàn',
      'Nguyên Xứ Đoàn Phó nội vụ (tháng 6 – 12/2025)'
    ],
    shortDesc: 'Hỗ trợ trưởng Matthêu Lê Hoàng Thiên Phúc trong năm năm Xứ Đoàn không có Ban Điều Hành chính thức (2020 – 2024). Phó nội vụ của Ban Điều Hành tái lập tháng 6/2025, tương ứng với Phó đặc trách quản trị theo Nội Quy.',
    chronology: [],
    milestones: [
      'Trưởng được sai đến phục vụ vào đúng quãng Xứ Đoàn không có gì để trao lại: năm năm liền không có Ban Điều Hành chính thức, nghĩa là không có chức danh nào để nhận, cũng không có nhiệm kỳ nào để hết. Việc phục vụ khi ấy không đi kèm một tước hiệu nào, và trưởng vẫn nhận lấy.',
      'Từ 2020 đến 2024, trưởng cùng anh chị em khác hỗ trợ trưởng Matthêu Lê Hoàng Thiên Phúc duy trì và tổ chức sinh hoạt Thiếu Nhi Thánh Thể. Trưởng cũng được trao trách nhiệm Trưởng Ban Sinh Hoạt của Xứ Đoàn — phần việc lo các buổi sinh hoạt vòng tròn, trò chơi và chuyên môn. Chức trưởng ban này đã qua nhiều nhiệm kỳ kế tiếp nhau; các trưởng không còn nhớ chính xác mốc thời gian, nên bản khảo cứu để trống thay vì ghi một niên đại không ai kiểm được. Công việc không tên, không ai bổ nhiệm, và cũng không có gì để ghi vào bảng phân công.',
      'Tháng 6 năm 2025, khi Ban Điều Hành được tái lập theo thỉnh nguyện của Huynh Trưởng đoàn, trưởng được tín nhiệm trao chức Xứ Đoàn Phó nội vụ — theo Nội Quy tương ứng với Phó đặc trách quản trị. Nhiệm kỳ kết thúc sớm ngày 12/12/2025. Nhưng việc một người đã âm thầm gánh phần nặng nhất vào lúc chưa ai trao cho mình chức vụ nào, rồi được cộng đoàn đặt đúng vào chỗ ấy khi cơ cấu trở lại, tự nó đã là một dấu ấn — và là thứ dấu ấn mà một quyết định ngưng nhiệm vụ không xoá được.'
    ]
  },
  {
    id: 'bdh-le-gia-huy',
    image: '/images/bdh_le_gia_huy.jpg',
    name: 'Phêrô Lê Gia Huy',
    saintName: 'Thánh Phêrô Tông Đồ',
    role: 'Nguyên Phó Ban Truyền Thông • Nguyên Trưởng Ban Trực • Nguyên Xứ Đoàn Phó ngoại vụ Xứ Đoàn Các Thánh Tử Đạo Việt Nam',
    period: '2018 – nay',
    origin: 'Xứ Đoàn Các Thánh Tử Đạo Việt Nam, Giáo xứ Chánh Tòa Mỹ Tho',
    nghe: 'Ứng viên cử nhân, Đại Học Greenwich — Cơ sở Hồ Chí Minh',
    source: 'Ghi chép của Xứ Đoàn do Ban Điều Hành cung cấp',
    offices: [
      'Nguyên Phó Ban Truyền Thông Xứ Đoàn (2018 – 2020)',
      'Nguyên Trưởng Ban Trực Xứ Đoàn',
      'Nguyên Xứ Đoàn Phó ngoại vụ (tháng 6 – 12/2025)',
      'Hỗ trợ các vấn đề truyền thông Xứ Đoàn (2025 – nay)'
    ],
    shortDesc: 'Phục vụ tại Xứ Đoàn từ năm 2018, khởi đầu với chức Phó Ban Truyền Thông (2018 – 2020). Trong năm năm Xứ Đoàn không có Ban Điều Hành chính thức, trưởng cùng anh chị em khác hỗ trợ trưởng Matthêu Lê Hoàng Thiên Phúc duy trì sinh hoạt. Phó ngoại vụ của Ban Điều Hành tái lập tháng 6/2025, tương ứng với Phó đặc trách huấn luyện theo Nội Quy.',
    chronology: [],
    milestones: [
      'Năm 2018, trưởng được sai đến phục vụ Xứ Đoàn, và phần việc được trao là mảng truyền thông: ghi hình, hình ảnh và loan tin sinh hoạt. Từ 2018 đến 2020, trưởng làm Phó Ban Truyền Thông, cùng trưởng Matthêu Lê Hoàng Thiên Phúc làm trưởng ban — hai người trẻ được giao lo cho Xứ Đoàn có cái để nhớ lại về sau.',
      'Rồi đến những năm 2020 – 2024, khi Xứ Đoàn không có Ban Điều Hành chính thức. Trưởng nằm trong nhóm người ở lại giữ cho sinh hoạt khỏi đứt mạch — phần việc không tên mà phải năm năm sau nhìn lại mới thấy hết giá trị.',
      'Tháng 6 năm 2025, trưởng được tín nhiệm trao chức Xứ Đoàn Phó ngoại vụ, theo Nội Quy tương ứng với Phó đặc trách huấn luyện: quản lý nhân sự Huynh Trưởng đoàn, phân công và bổ nhiệm, tổ chức đào tạo nội bộ và lên kế hoạch các chương trình lớn. Cùng năm, trưởng trở lại hỗ trợ mảng truyền thông đã khởi đầu bảy năm trước. Trưởng cũng từng được trao trách nhiệm Trưởng Ban Trực của Xứ Đoàn, phần việc giữ trật tự và trông coi các em trong giờ sinh hoạt và giờ lễ. Ban Trực cũng đã qua nhiều nhiệm kỳ kế tiếp nhau — từ tháng 6/2025 do trưởng Têrêsa Trần Ngọc Tú Trân phụ trách — nhưng mốc thời gian của các nhiệm kỳ trước thì các trưởng không còn nhớ chính xác, nên bản khảo cứu để trống.',
      'Cuối năm 2025, trưởng cùng trưởng Thiên Phúc đưa chương trình ngành Hiệp Sĩ và khăn Hiệp Sĩ vào sinh hoạt chính thức, giúp các em lớn có môi trường tiếp tục đào luyện; và cùng trưởng Thiên Phúc với trưởng Batôlômêô Nguyễn Phúc Khang xây dựng chương trình đào tạo Huynh Trưởng Xứ Đoàn — một lộ trình rõ ràng cho Dự Trưởng, Trợ Tá và các anh chị đang phục vụ các ngành.',
      'Nhiệm kỳ khép lại ngày 12/12/2025. Chương trình thì vẫn còn đó, và trưởng thì vẫn còn ở lại.'
    ]
  },
  {
    id: 'bdh-nguyen-phuc-khang',
    image: '/images/bdh_nguyen_phuc_khang.jpg',
    name: 'Batôlômêô Nguyễn Phúc Khang',
    saintName: 'Thánh Batôlômêô',
    role: 'Nguyên Thư Ký Đoàn Xứ Đoàn Các Thánh Tử Đạo Việt Nam',
    period: '2018 – nay',
    origin: 'Xứ Đoàn Các Thánh Tử Đạo Việt Nam, Giáo xứ Chánh Tòa Mỹ Tho',
    nghe: 'Học viên cao học, Đại Học Công Thương — ĐH Quốc gia Hồ Chí Minh',
    source: 'Ghi chép của Xứ Đoàn do Ban Điều Hành cung cấp',
    offices: [
      'Nguyên Thư Ký Đoàn (tháng 6 – 12/2025)',
      'Hỗ trợ các vấn đề truyền thông Xứ Đoàn (2025 – nay)'
    ],
    shortDesc: 'Phục vụ tại Xứ Đoàn từ năm 2018. Thư ký của Ban Điều Hành tái lập tháng 6/2025. Theo Nội Quy, thư ký do Xứ Đoàn Trưởng và hai phó đề cử.',
    chronology: [],
    milestones: [
      'Trưởng được sai đến phục vụ tại Xứ Đoàn Các Thánh Tử Đạo Việt Nam từ năm 2018, và phục vụ liên tục suốt bảy năm trước khi được trao một chức vụ nào. Đó là quãng dài nhất trong hồ sơ này mà một người có mặt đều đặn chỉ với phần việc được giao, và cũng là điều nói lên nhiều nhất về trưởng: việc phụng sự đến trước, chức vụ đến sau và đến từ sự tín nhiệm.',
      'Tháng 6 năm 2025, khi Ban Điều Hành được tái lập theo thỉnh nguyện của Huynh Trưởng đoàn, trưởng được đề cử làm Thư Ký Đoàn và được cha Tuyên Uý chấp thuận — đúng theo Nội Quy vốn quy định thư ký do Xứ Đoàn Trưởng và hai phó đề cử. Cùng năm, trưởng cộng tác với mảng truyền thông của Xứ Đoàn.',
      'Cuối năm 2025, trưởng cùng trưởng Matthêu Lê Hoàng Thiên Phúc và trưởng Phêrô Lê Gia Huy xây dựng chương trình đào tạo Huynh Trưởng Xứ Đoàn.',
      'Sang năm 2026, khi Ban Điều Hành đã ngưng nhiệm vụ và Xứ Đoàn chưa có người đứng đầu, trưởng vẫn tiếp tục đồng hành giáo lý lớp Vào Đời 1. Bảy năm trước khi có chức vụ, và vẫn ở lại sau khi hết chức vụ — với trưởng, việc phục vụ chưa bao giờ phụ thuộc vào một cái tên trên bảng phân công.'
    ]
  },
  {
    id: 'bdh-tran-thao-my',
    image: '/images/bdh_tran_thao_my.jpg',
    name: 'Maria Trần Thảo My',
    saintName: 'Đức Maria',
    role: 'Nguyên Trưởng Ban Sinh Hoạt • Nguyên Thủ Quỹ Đoàn Xứ Đoàn Các Thánh Tử Đạo Việt Nam',
    period: 'Từ tháng 6/2025',
    origin: 'Xứ Đoàn Các Thánh Tử Đạo Việt Nam, Giáo xứ Chánh Tòa Mỹ Tho',
    source: 'Ghi chép của Xứ Đoàn do Ban Điều Hành cung cấp',
    offices: [
      'Nguyên Trưởng Ban Sinh Hoạt Xứ Đoàn',
      'Nguyên Thủ Quỹ Đoàn (tháng 6 – 12/2025)'
    ],
    shortDesc: 'Thủ quỹ của Ban Điều Hành tái lập tháng 6/2025. Theo Nội Quy, thủ quỹ do Xứ Đoàn Trưởng và hai phó đề cử.',
    chronology: [],
    milestones: [
      'Trưởng được sai đến phục vụ ở lứa mới nhất của Xứ Đoàn, giữa lúc guồng máy vừa được dựng lại sau năm năm bỏ trống. Tháng 6 năm 2025, khi Ban Điều Hành được tái lập theo thỉnh nguyện của Huynh Trưởng đoàn, trưởng được các trưởng trong Ban Thường vụ đề cử và được cha Tuyên Uý chấp thuận trao chức Thủ Quỹ Đoàn — đúng theo Nội Quy, thủ quỹ do Xứ Đoàn Trưởng và hai phó đề cử. Trước đó trưởng đã được trao trách nhiệm Trưởng Ban Sinh Hoạt của Xứ Đoàn, phần việc lo các buổi sinh hoạt vòng tròn, trò chơi và chuyên môn — mảng gần các em nhất trong mọi phần việc của một Huynh Trưởng. Chức trưởng ban này đã qua nhiều nhiệm kỳ kế tiếp nhau; các trưởng không còn nhớ chính xác mốc thời gian, nên bản khảo cứu để trống thay vì ghi một niên đại không ai kiểm được.',
      'Nhiệm kỳ kết thúc sớm ngày 12 tháng 12 năm 2025, nên phần việc của trưởng trong Ban Điều Hành chỉ kéo dài hơn nửa năm. Bản khảo cứu ghi lại đúng chừng ấy và để trống phần còn lại, thay vì tô thêm cho đầy — một trang sử để ngỏ vẫn tử tế hơn một trang sử được viết hộ.'
    ]
  }
];

export const TRO_UY_BIOS: DetailedBioRecord[] = [
  {
    id: 'so-lucia-huyen-linh',
    name: 'Sơ Lucia Huyền Linh',
    saintName: 'Thánh Lucia',
    role: 'Nguyên Trợ Uý Xứ Đoàn • Hiện là Bề trên Dòng Nữ Tử Nhiệt Thành Thánh Tâm Chúa Giêsu tại Việt Nam',
    period: '2018 – 2019',
    image: '/images/so_lucia_huyen_linh.jpg',
    origin:
      'Dòng Nữ Tử Nhiệt Thành Thánh Tâm Chúa Giêsu — tên tiếng Ý Figlie del Divino Zelo (FDZ), hội dòng do Thánh Hannibal Maria Di Francia sáng lập, đặc sủng cầu nguyện cho ơn thiên triệu',
    source:
      'Ghi chép của Xứ Đoàn do Ban Điều Hành cung cấp. Bối cảnh lớp Huấn Luyện Viên đầu tiên theo bài "Quá trình hình thành và phát triển của TNTT Giáo phận Mỹ Tho", tnttgioitremytho.com, 26/11/2018. Phần giới thiệu hội dòng theo trang Dòng Tông Đồ Ơn Gọi. Ảnh do Giáo xứ cung cấp. Bản khảo cứu chưa tìm được nguồn công khai nào ghi chép tiểu sử riêng của sơ.',
    shortDesc:
      'Thuộc lớp Huấn Luyện Viên đầu tiên của Liên đoàn Các Thánh Tử Đạo Việt Nam — Giáo phận Mỹ Tho. Sơ đồng hành với Xứ Đoàn Chánh Tòa trong hai năm 2018 – 2019 với vai trò Trợ Uý, phụ trách và hướng dẫn lớp Huynh Trưởng. Hiện là Bề trên Dòng Nữ Tử Nhiệt Thành Thánh Tâm Chúa Giêsu tại Việt Nam.',
    chronology: [],
    milestones: [
      'Sơ được hội dòng và Phong trào sai đến với Xứ Đoàn Chánh Toà để phục vụ việc huấn luyện. Sơ thuộc lớp Huấn Luyện Viên đầu tiên của Liên đoàn Các Thánh Tử Đạo Việt Nam — Giáo phận Mỹ Tho, và ý nghĩa của cột mốc ấy lớn hơn vẻ ngoài của nó: những năm đầu sau khi Liên đoàn thành lập năm 2011, giáo phận chưa có Huấn Luyện Viên của riêng mình. Chính ghi chép của Liên đoàn nhìn nhận ban huấn luyện và ban điều hành sa mạc khi đó chủ yếu là các trưởng Huấn Luyện Viên của Liên đoàn Anrê Phú Yên — Giáo phận Sài Gòn. Lớp Huấn Luyện Viên đầu tiên của Mỹ Tho là lúc giáo phận thôi phải đi mượn người dạy.',
      'Hai năm 2018 – 2019, sơ đồng hành với Xứ Đoàn Chánh Toà trong vai trò Trợ Uý, phụ trách và hướng dẫn lớp Huynh Trưởng, đồng thời theo sát sinh hoạt thường kỳ của Phong trào. Theo bảng cấp hiệu Thiếu Nhi Thánh Thể, Trợ Uý là tu sĩ nam nữ phục vụ Phong trào, mang khăn đỏ viền trắng với khẩu hiệu "Nhiệt Thành" — trùng hợp thay, cũng chính là tên hội dòng của sơ: Dòng Nữ Tử Nhiệt Thành Thánh Tâm Chúa Giêsu.',
      'Hiện sơ là Bề trên của hội dòng tại Việt Nam. Hai năm bên một xứ đoàn nhỏ là một chương ngắn trong đời tu của sơ, nhưng với Xứ Đoàn thì đó là hai năm đầu tiên có một Trợ Uý thật sự đứng lớp — và lớp Huynh Trưởng ấy về sau chính là những người gánh Xứ Đoàn qua năm năm không có Ban Điều Hành.'
    ],
  }
];

export const TNTT_CHAPLAINS = CHAPLAINS_EXTENDED_DATA.map((c) => ({ period: c.period, bio: c }));
