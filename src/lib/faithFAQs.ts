export interface FaithFAQ {
  id: string;
  category: 'giao-ly' | 'phung-vu' | 'bi-tich' | 'hon-nhan' | 'cau-nguyen' | 'gioi-tre';
  categoryLabel: string;
  categoryIcon: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string[];
  reference?: string;
  tags: string[];
}

export const FAITH_CATEGORIES = [
  { id: 'all', label: 'Tất Cả', icon: '✨' },
  { id: 'giao-ly', label: 'Giáo Lý & Đức Tin', icon: '📖' },
  { id: 'phung-vu', label: 'Phụng Vụ & Thánh Lễ', icon: '⛪' },
  { id: 'bi-tich', label: 'Bí Tích & Xưng Tội', icon: '🕊️' },
  { id: 'hon-nhan', label: 'Hôn Nhân & Gia Đình', icon: '👨‍👩‍👧‍👦' },
  { id: 'cau-nguyen', label: 'Cầu Nguyện & Mân Côi', icon: '📿' },
  { id: 'gioi-tre', label: 'Thắc Mắc Giới Trẻ', icon: '💡' }
] as const;

export const FAITH_FAQS: FaithFAQ[] = [
  {
    id: 'thanh-le-chua-nhat-y-nghia',
    category: 'phung-vu',
    categoryLabel: 'Phụng Vụ & Thánh Lễ',
    categoryIcon: '⛪',
    question: 'Tại sao người Công Giáo bắt buộc phải tham dự Thánh Lễ Chúa Nhật?',
    shortAnswer: 'Chúa Nhật là ngày của Chúa, kỷ niệm Chúa Phục Sinh. Tham dự Thánh Lễ là lời tạ ơn và đón nhận nguồn sống từ Lời Chúa và Thánh Thể.',
    detailedAnswer: [
      'Chúa Nhật là Ngày của Chúa (Dies Domini), ngày Chúa Giêsu Kitô khải hoàn phục sinh từ cõi chết, khai mở công trình cứu chuộc nhân loại.',
      'Việc tham dự Thánh Lễ Chúa Nhật là điều răn thứ ba của Thiên Chúa và là điều răn thứ nhất của Hội Thánh: "Giữ ngày Chúa Nhật và các ngày lễ buộc".',
      'Thánh Lễ không chỉ là bổn phận mà là đặc ân vô giá: nơi cộng đoàn tín hữu quy tụ để lắng nghe Lời Chúa, hiệp nhất trong tình bác ái và đón rước Mình Máu Thánh Chúa Kitô làm lương thực nuôi dưỡng linh hồn.',
      'Bỏ lễ Chúa Nhật mà không có lý do chính đáng (như ốm đau nặng, chăm sóc người bệnh nguy tử, hoặc ngăn trở bất khả kháng) là mắc tội trọng.'
    ],
    reference: 'GLHTCG số 2174 - 2188; Giáo luật điều 1247',
    tags: ['thánh lễ', 'chúa nhật', 'bổn phận', 'luật hội thánh', 'phục sinh']
  },
  {
    id: 'giu-chay-truoc-khi-ruoc-le',
    category: 'phung-vu',
    categoryLabel: 'Phụng Vụ & Thánh Lễ',
    categoryIcon: '⛪',
    question: 'Quy định giữ chay (kiêng ăn uống) trước khi Rước Lễ là bao lâu?',
    shortAnswer: 'Cần kiêng mọi thức ăn và thức uống trong vòng ít nhất 1 giờ trước khi rước lễ, ngoại trừ nước lọc và thuốc men.',
    detailedAnswer: [
      'Theo Giáo luật điều 919 §1: Người sắp rước Thánh Thể phải kiêng mọi thức ăn thức uống trong khoảng thời gian ít nhất là 1 giờ trước khi rước lễ, chỉ trừ nước lã và thuốc men.',
      'Mục đích của việc giữ chay Thánh Thể là để bày tỏ lòng tôn kính, sự chuẩn bị tâm hồn và thân xác xứng hợp trước khi đón nhận Mình Thánh Chúa Kitô.',
      'Trường hợp miễn chuẩn (Điều 919 §3): Người cao tuổi, người đau yếu liệt giường hoặc những người chăm sóc họ có thể rước lễ dù có ăn uống chút ít trước đó mà không phải giữ trọn 1 giờ.'
    ],
    reference: 'Bộ Giáo Luật 1983, Điều 919',
    tags: ['rước lễ', 'giữ chay', 'thánh thể', 'giáo luật', 'người cao tuổi']
  },
  {
    id: 'xung-toi-bao-lau-mot-lan',
    category: 'bi-tich',
    categoryLabel: 'Bí Tích & Xưng Tội',
    categoryIcon: '🕊️',
    question: 'Người Công Giáo nên xưng tội bao lâu một lần? Khi nào buộc phải xưng tội?',
    shortAnswer: 'Hội Thánh dạy xưng tội ít nhất mỗi năm một lần (mùa Phục Sinh), và buộc phải xưng tội trước khi rước lễ nếu ý thức mình mắc tội trọng.',
    detailedAnswer: [
      'Điều răn thứ hai của Hội Thánh: "Xưng tội trong một năm ít là một lần" (thường trong Mùa Chay hoặc Phục Sinh).',
      'Nếu ý thức mình mắc tội trọng (tội nặng phạm điều răn Chúa với sự hiểu biết đầy đủ và hoàn toàn ưng thuận), người tín hữu KHÔNG ĐƯỢC rước lễ nếu chưa lãnh nhận Bí tích Hoà Giải.',
      'Các Đức Giáo Hoàng và các Thánh luôn khích lệ việc xưng tội thường xuyên (hàng tháng hoặc cách tuần), dù chỉ là tội nhẹ, để nhận được ơn trợ lực thiêng liêng, gia tăng lòng khiêm nhường và gìn giữ sự bình an trong tâm hồn.'
    ],
    reference: 'GLHTCG số 1457; Giáo luật điều 989',
    tags: ['xưng tội', 'hoà giải', 'tội trọng', 'mùa chay', 'rước lễ']
  },
  {
    id: 'ket-hon-khac-dao-chuan-bi',
    category: 'hon-nhan',
    categoryLabel: 'Hôn Nhân & Gia Đình',
    categoryIcon: '👨‍👩‍👧‍👦',
    question: 'Người Công Giáo kết hôn với người không cùng tôn giáo cần những điều kiện gì?',
    shortAnswer: 'Cần xin phép chuẩn chuẩn hôn phối khác đạo từ Đức Giám Mục Giáo phận và cam kết giữ vững đức tin cùng rửa tội, giáo dục con cái theo đạo Công Giáo.',
    detailedAnswer: [
      'Hội Thánh thừa nhận và chúc phúc cho hôn nhân dị giáo (khác đạo) khi có Phép Chuẩn (Dispensation) của Bản Quyền Giáo Phận.',
      'Bên Công Giáo tuyên bố sẵn sàng tránh mọi hiểm nguy làm mất đức tin, và thành thật cam kết sẽ làm hết sức để con cái sinh ra được rửa tội và giáo dục trong Hội Thánh Công Giáo.',
      'Bên không Công Giáo được thông báo rõ ràng về những lời cam kết của người bạn đời Công Giáo để thấu hiểu và tôn trọng quyền tự do tôn giáo của nhau.',
      'Cả hai cùng tham dự lớp Giáo Lý Hôn Nhân để hiểu rõ bản chất hôn nhân Công Giáo: duy nhất, bất khả phân ly và hướng về sự sinh sản, giáo dục con cái.'
    ],
    reference: 'Bộ Giáo Luật Điều 1124 - 1129; GLHTCG 1633 - 1637',
    tags: ['hôn nhân', 'khác đạo', 'phép chuẩn', 'giáo lý hôn nhân', 'gia đình']
  },
  {
    id: 'y-nghia-kinh-man-coi',
    category: 'cau-nguyen',
    categoryLabel: 'Cầu Nguyện & Mân Côi',
    categoryIcon: '📿',
    question: 'Tại sao chuỗi Mân Côi là lời kinh đẹp lòng Đức Mẹ và mang lại nhiều ơn lành?',
    shortAnswer: 'Kinh Mân Côi là bản tóm lược toàn bộ Tin Mừng, giúp người tín hữu cùng Mẹ Maria chiêm ngắm cuộc đời, cái chết và sự phục sinh của Chúa Giêsu.',
    detailedAnswer: [
      'Kinh Mân Côi gồm các mầu nhiệm: Vui (Nhập thể), Sáng (Sứ vụ công khai), Thương (Cuộc khổ nạn) và Mừng (Phục sinh & Vinh hiển).',
      'Khi lần hạt Mân Côi, môi miệng ta đọc lời kinh Thiên Thần chào Mẹ (Kinh Kính Mừng), trong khi tâm trí ta cùng Đức Mẹ chiêm ngưỡng khuôn mặt Đức Kitô.',
      'Đức Thánh Cha Gioan Phaolô II từng khẳng định: "Kinh Mân Côi là lời cầu nguyện tuyệt vời, đơn sơ nhưng sâu thẳm, mang lại bình an cho tâm hồn và các gia đình."',
      'Rất nhiều ơn lành, sự bảo vệ và phép lạ đã được ban tặng cho các cá nhân và dân tộc qua việc siêng năng lần chuỗi Mân Côi mỗi ngày.'
    ],
    reference: 'Tông thư Rosarium Virginis Mariae (2002)',
    tags: ['mân côi', 'đức mẹ', 'cầu nguyện', 'kinh kính mừng', 'bình an']
  },
  {
    id: 'nguoi-cao-tuoi-om-dau-thanh-le',
    category: 'phung-vu',
    categoryLabel: 'Phụng Vụ & Thánh Lễ',
    categoryIcon: '⛪',
    question: 'Người cao tuổi, đau ốm không thể đến nhà thờ có phải mắc tội bỏ lễ Chúa Nhật không?',
    shortAnswer: 'Hoàn toàn KHÔNG mắc tội. Người bệnh tật hoặc già yếu được miễn chuẩn luật đi lễ và có thể hiệp thông qua Thánh Lễ trực tuyến cùng rước lễ thiêng liêng.',
    detailedAnswer: [
      'Giáo luật và Giáo huấn Hội Thánh luôn nhấn mạnh: luật buộc đi lễ Chúa Nhật không áp dụng khi có ngăn trở thể lý hoặc luân lý nghiêm trọng (ốm đau, già yếu, đi lại khó khăn, thời tiết bão lũ nguy hiểm).',
      'Các cụ cao tuổi hoặc bệnh nhân có thể hiệp thông với Hội Thánh bằng cách xem Thánh Lễ trực tuyến qua truyền hình/internet, đọc Kinh Thánh, lần chuỗi Mân Côi và dâng những cơn đau bệnh kết hợp với hy tế Thập giá của Chúa Giêsu.',
      'Gia đình nên báo với Cha Xứ hoặc Ban Mục Vụ Bệnh Nhân của giáo xứ để xin Linh Mục hoặc Thừa Tác Viên đưa Mình Thánh Chúa đến tận nhà trao cho các cụ đều đặn.'
    ],
    reference: 'GLHTCG số 2181; Giáo luật điều 1248 §2',
    tags: ['người cao tuổi', 'bệnh nhân', 'miễn chuẩn', 'rước lễ tại nhà', 'thánh lễ online']
  },
  {
    id: 'bi-tich-xuc-dau-benh-nhan',
    category: 'bi-tich',
    categoryLabel: 'Bí Tích & Xưng Tội',
    categoryIcon: '🕊️',
    question: 'Khi nào cần xin lãnh nhận Bí tích Xức Dầu Bệnh Nhân? Có phải chỉ dành cho người sắp qua đời?',
    shortAnswer: 'Bí tích Xức Dầu dành cho bất kỳ tín hữu nào bắt đầu gặp nguy hiểm vì bệnh tật nặng hoặc tuổi già, chứ KHÔNG phải chỉ chờ đến phút lâm chung.',
    detailedAnswer: [
      'Trước đây thường gọi là "Phép Xức Dầu Sau Cùng", nhưng Công đồng Vaticanô II đã làm sáng tỏ: đây là Bí tích chữa lành và ban ơn nâng đỡ người đau bệnh.',
      'Thời điểm thích hợp để lãnh nhận: khi một người bắt đầu lâm cơn bệnh nặng, trước khi bước vào ca phẫu thuật nguy hiểm, hoặc khi tuổi già sức yếu suy sụp dần.',
      'Nếu người bệnh đã hồi phục sau đó lại tái phát bệnh nặng, hoặc bệnh tình trở nên trầm trọng hơn, họ có thể lãnh nhận lại Bí tích này nhiều lần.',
      'Hiệu quả của Bí tích: ban ơn an ủi, can đảm, bình an của Thánh Thần, tha thứ tội lỗi và nếu đẹp lòng Chúa, có thể phục hồi sức khoẻ thể xác.'
    ],
    reference: 'GLHTCG số 1511 - 1515; Thư Giacôbê 5, 14-15',
    tags: ['xức dầu', 'bệnh nhân', 'chữa lành', 'người cao tuổi', 'bình an']
  },
  {
    id: 'dat-ten-thanh-va-quan-thay',
    category: 'giao-ly',
    categoryLabel: 'Giáo Lý & Đức Tin',
    categoryIcon: '📖',
    question: 'Ý nghĩa của việc chọn Tên Thánh (Bổn Mạng) khi Rửa Tội là gì?',
    shortAnswer: 'Tên Thánh mang lại cho người tín hữu một vị quan thầy bầu cử trước toà Chúa và là mẫu gương nhân đức sáng ngời để noi theo trong suốt cuộc đời.',
    detailedAnswer: [
      'Khi chịu phép Rửa Tội, người Kitô hữu nhận một Tên Thánh (thường là tên một vị Thánh nam hoặc nữ trong lịch sử Hội Thánh).',
      'Vị Thánh bổn mạng trở thành người cha/người mẹ thiêng liêng, luôn cầu bầu cùng Thiên Chúa cho người mang tên ngài.',
      'Người tín hữu được mời gọi tìm hiểu tiểu sử vị Thánh của mình, học đòi các nhân đức (yêu mến, hy sinh, bác ái, trung tín) và mừng lễ quan thầy hằng năm với tâm tình tri ân.'
    ],
    reference: 'GLHTCG số 2156; Giáo luật điều 855',
    tags: ['tên thánh', 'bổn mạng', 'rửa tội', 'gương thánh nhân', 'đức tin']
  }
];
