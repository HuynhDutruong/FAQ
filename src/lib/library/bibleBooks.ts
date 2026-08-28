import { Book } from './types';

export const BIBLE_BOOKS: Book[] = [
  {
    id: 'kinh-thanh-cuu-uoc-ngu-thu',
    title: 'Kinh Thánh Cựu Ước: Bộ Ngũ Thư (Torah)',
    originalTitle: 'Pentateuch - 5 Sách Đầu Tiên Của Cựu Ước',
    author: 'Thiên Chúa phán truyền qua Môsê và các Tác giả Thánh',
    category: 'bible',
    categoryLabel: 'Kinh Thánh Trọn Bộ',
    coverColor: '#78350F',
    coverImage: '/logo.jpg',
    badge: 'Cựu Ước',
    summary: 'Sáng Thế (St), Xuất Hành (Xh), Lê-vi (Lv), Dân Số (Ds), Đệ Nhị Luật (Đnl) - Khởi nguyên vũ trụ, Giao ước tổ phụ và Hành trình Giải phóng Dân Chúa.',
    description: 'Bộ Ngũ Thư là nền tảng của toàn bộ Kinh Thánh Cựu Ước, ghi chép công trình Sáng tạo, sự sa ngã và Lời hứa Cứu độ của Thiên Chúa, Giao ước với các Tổ phụ Ápraham, Isaác, Giacóp; biến cố Xuất Hành vượt qua Biển Đỏ, Mười Điều Răn trên núi Sinai và hành trình 40 năm trong sa mạc tiến về Đất Hứa.',
    totalChapters: 5,
    estimatedReadingMinutes: 60,
    publishYear: 'BC',
    featured: true,
    tags: ['cuu uoc', 'ngu thu', 'sang the', 'xuat hanh', 'mose', 'giao uoc', 'kinh thanh'],
    chapters: [
      {
        id: 'cu-chuong-1-sach-sang-the',
        number: 1,
        title: 'Sách Sáng Thế (Genesis - St)',
        subtitle: 'Khởi nguyên trời đất, con người và Giao ước Ápraham',
        summary: '50 chương: Thiên Chúa sáng tạo vũ trụ tốt đẹp trong 6 ngày, vườn Địa đàng, sự sa ngã, lụt Đại Hồng Thủy Noê, tháp Babel và ơn gọi của Ápraham, Isaác, Giacóp, Giuse tại Ai Cập.',
        content: [
          'TỔNG QUAN SÁCH SÁNG THẾ (50 CHƯƠNG):',
          '',
          '1. CÔNG TRÌNH SÁNG TẠO & CON NGƯỜI (St 1 - 2):',
          '"Lúc khởi đầu, Thiên Chúa sáng tạo trời đất. Đất còn trống rỗng, chưa có hình dạng... Thiên Chúa phán: Ánh sáng hãy bừng lên! Và liền có ánh sáng." (St 1, 1-3).',
          'Thiên Chúa tạo dựng con người theo hình ảnh và họa ảnh của Ngài, ban cho họ cai quản mặt đất và sống trong hạnh phúc vườn Địa Đàng.',
          '',
          '2. SỰ SA NGÃ & LỜI HỨA CỨU ĐỘ TIÊN KHỞI (St 3):',
          'Con người nghe lời cám dỗ đã bất tuân lệnh Chúa, đánh mất ơn nghĩa ban đầu. Tuy nhiên, Thiên Chúa giàu lòng thương xót đã hứa ban Đấng Cứu Thế đạp nát đầu con rắn (Lời Tiền Tin Mừng - Protoevangelium St 3, 15).',
          '',
          '3. ƠN GỌI ÁPRAHAM & CÁC TỔ PHỤ (St 12 - 50):',
          'Thiên Chúa kêu gọi Ápraham rời bỏ quê hương, hứa ban cho ông một dòng dõi đông đúc như sao trên trời và ban Đất Hứa. Hành trình đức tin kiên vững của Ápraham, Isaác, Giacóp (Israel với 12 chi tộc) và câu chuyện Giuse bị bán sang Ai Cập để cứu sống gia đình.'
        ]
      },
      {
        id: 'cu-chuong-2-sach-xuat-hanh',
        number: 2,
        title: 'Sách Xuất Hành (Exodus - Xh)',
        subtitle: 'Biến cố Giải phóng, Vượt Qua Biển Đỏ & Giao Ước Sinai',
        summary: '40 chương: Dân Do Thái chịu cảnh nô lệ tại Ai Cập, Chúa chọn Môsê, 10 tai ương, Lễ Vượt Qua, vượt Biển Đỏ, 10 Điều Răn và Nhà Tạm Giao Ước.',
        content: [
          'TỔNG QUAN SÁCH XUẤT HÀNH (40 CHƯƠNG):',
          '',
          '1. TIẾNG KÊU NÔ LỆ & ƠN GỌI MÔSÊ (Xh 1 - 4):',
          'Dân Israel bị vua Phaolô Ai Cập bóc lột nặng nề. Thiên Chúa hiện ra với Môsê trong bụi gai cháy bừng bừng mà không tàn, mặc khải Danh Thánh Ngài: "TA LÀ ĐẤNG TỰ HỮU" (Yahweh - Xh 3, 14) và sai ông đi giải phóng dân.',
          '',
          '2. LỄ VƯỢT QUA & BĂNG QUA BIỂN ĐỎ (Xh 12 - 15):',
          'Chiên Vượt Qua không tỳ vết bị sát tế, máu bôi lên khung cửa để thần chết vượt qua. Môsê giơ gậy rẽ nước Biển Đỏ cho dân Israel đi qua ráo chân, chôn vùi quân thù Ai Cập. Đây là hình ảnh tiên trưng cho Phép Rửa và cuộc Vượt Qua của Chúa Giêsu Kitô.',
          '',
          '3. GIAO ƯỚC SINAI & MƯỜI ĐIỀU RĂN (Xh 19 - 20):',
          'Trên đỉnh núi Sinai rực lửa và khói, Thiên Chúa ban Thập Giới (10 Điều Răn) khắc trên bia đá, thiết lập Giao Ước: "Các ngươi sẽ là dân riêng của Ta, và Ta sẽ là Thiên Chúa của các ngươi."'
        ]
      },
      {
        id: 'cu-chuong-3-sach-levi',
        number: 3,
        title: 'Sách Lê-vi (Leviticus - Lv)',
        subtitle: 'Lề luật phụng tự, tư tế và ơn gọi nên thánh',
        summary: '27 chương: Các quy định về tế lễ, sự thanh sạch, ngày Đại Lễ Xá Tội (Yom Kippur) và Luật Thánh Thiện: "Các ngươi phải thánh thiện, vì Ta là Đấng Thánh".',
        content: [
          'TỔNG QUAN SÁCH LÊ-VI (27 CHƯƠNG):',
          '',
          '1. QUY CHẾ TẾ TỰ & CHỨC TƯ TẾ (Lv 1 - 10):',
          'Quy định chi tiết về các loại tế lễ: Lễ Toàn Thiêu, Lễ Tạ Ơn, Lễ Đền Tội và lễ tấn phong Thượng tế Aharon cùng chi tộc Lêvi coi sóc nơi tôn nghiêm.',
          '',
          '2. LUẬT NÊN THÁNH (Lv 17 - 26):',
          '"CÁC NGƯƠI HÃY NÊN THÁNH, VÌ TA, ĐỨC CHÚA, THIÊN CHÚA CỦA CÁC NGƯƠI, TA LÀ ĐẤNG THÁNH" (Lv 19, 2).',
          'Đỉnh cao của sách Lê-vi là lời mời gọi toàn dân sống công bình, yêu thương người ngoại kiều và người nghèo khó: "Ngươi phải yêu đồng loại như chính mình" (Lv 19, 18).'
        ]
      },
      {
        id: 'cu-chuong-4-sach-dan-so',
        number: 4,
        title: 'Sách Dân Số (Numbers - Ds)',
        subtitle: 'Hành trình 40 năm trong sa mạc và sự trung tín của Chúa',
        summary: '36 chương: Kiểm tra dân số 12 chi tộc, bánh Man-na và chim cút từ trời, nước phun từ tảng đá, con rắn đồng và hành trình tiến sát Đất Hứa.',
        content: [
          'TỔNG QUAN SÁCH DÂN SỐ (36 CHƯƠNG):',
          '',
          '1. THỬ THÁCH TRONG SA MẠC:',
          'Ghi lại chặng đường 40 năm gian khổ trong sa mạc Sinai. Dân chúng nhiều lần lẩm bẩm kêu trách Chúa và Môsê, nhưng Thiên Chúa vẫn kiên nhẫn nuôi sống họ bằng Bánh Manna mỗi sáng và Nước Hằng Sống tuôn ra từ tảng đá.',
          '',
          '2. CON RẮN ĐỒNG CHỮA LÀNH (Ds 21):',
          'Khi dân bị rắn độc cắn, Chúa truyền cho Môsê đúc một con rắn đồng treo lên cây cột; ai bị cắn mà ngước nhìn lên con rắn đồng thì được sống. Chúa Giêsu khẳng định đây là hình bóng Con Người bị giương cao trên Thập Giá để cứu rỗi nhân loại (Ga 3, 14).'
        ]
      },
      {
        id: 'cu-chuong-5-sach-de-nhi-luat',
        number: 5,
        title: 'Sách Đệ Nhị Luật (Deuteronomy - Đnl)',
        subtitle: 'Lời trăn trối của Môsê và Lời Tuyên Tín "Shema Israel"',
        summary: '34 chương: Môsê ôn lại lịch sử và luật pháp cho thế hệ mới trước khi vào Đất Hứa, kinh Shema Israel: "Hãy yêu mến Đức Chúa hết lòng, hết linh hồn, hết trí khôn".',
        content: [
          'TỔNG QUAN SÁCH ĐỆ NHỊ LUẬT (34 CHƯƠNG):',
          '',
          '1. KINH SHEMA ISRAEL (Đnl 6, 4-5):',
          '"NGHE ĐÂY, HỠI ISRAEL! ĐỨC CHÚA, THIÊN CHÚA CHÚNG TA, LÀ ĐỨC CHÚA DUY NHẤT. NGƯƠI PHẢI YÊU MẾN ĐỨC CHÚA, THIÊN CHÚA CỦA NGƯƠI, HẾT LÒNG, HẾT LINH HỒN VÀ HẾT SỨC LỰC NGƯƠI."',
          'Đây là điều răn trọng nhất mà Chúa Giêsu đã nhắc lại trong Tin Mừng.',
          '',
          '2. SỰ QUA ĐỜI CỦA MÔSÊ TRÊN NÚI NÊBÔ (Đnl 34):',
          'Môsê được Chúa cho ngắm nhìn toàn cảnh miền Đất Hứa từ đỉnh núi Nêbô trước khi nhắm mắt thanh thản trong tay Chúa ở tuổi 120, trao lại quyền lãnh đạo cho Giôsuê.'
        ]
      }
    ]
  },
  {
    id: 'kinh-thanh-tan-uoc-tin-mung-cong-vu',
    title: 'Kinh Thánh Tân Ước: Bốn Tin Mừng & Công Vụ Tông Đồ',
    originalTitle: 'Novum Testamentum - 4 Tin Mừng & Asctores Apostolorum',
    author: 'Thánh Mátthêu, Thánh Mác-cô, Thánh Luca, Thánh Gioan',
    category: 'bible',
    categoryLabel: 'Kinh Thánh Trọn Bộ',
    coverColor: '#1E3A8A',
    coverImage: '/logo.jpg',
    badge: 'Tân Ước',
    summary: 'Cuộc đời, giáo huấn, phép lạ, cuộc khổ nạn và phục sinh vinh hiển của Chúa Giêsu Kitô cùng sự khởi đầu của Hội Thánh sơ khai.',
    description: 'Trái tim của toàn bộ Kinh Thánh. 4 cuốn Tin Mừng soi chiếu cuộc đời Ngôi Lời Nhập Thể từ 4 góc nhìn thần học sâu sắc, kết hợp cùng Sách Công Vụ Tông Đồ ghi lại hoạt động mãnh liệt của Chúa Thánh Thần trên các Thánh Tông Đồ đi rao giảng Tin Mừng đến tận cùng trái đất.',
    totalChapters: 5,
    estimatedReadingMinutes: 60,
    publishYear: 'AD',
    featured: true,
    tags: ['tan uoc', 'tin mung', 'mattheu', 'macco', 'luca', 'gioan', 'cong vu tong do'],
    chapters: [
      {
        id: 'tu-chuong-1-tin-mung-mattheu',
        number: 1,
        title: 'Tin Mừng Theo Thánh Mátthêu (Matthew - Mt)',
        subtitle: 'Đức Giêsu - Đấng Mêsia Cứu Thế hoàn tất mọi lời Tiên Tri',
        summary: '28 chương: Gia phả Chúa Giêsu, Bài Giảng Trên Núi (Tám Mối Phúc), 5 bài giảng lớn về Nước Trời, cuộc Khổ Nạn, Phục Sinh và Lệnh Truyền Giáo toàn cầu.',
        content: [
          'TỔNG QUAN TIN MỪNG MÁTTHÊU (28 CHƯƠNG):',
          '',
          '1. BÀI GIẢNG TRÊN NÚI & TÁM MỐI PHÚC THẬT (Mt 5 - 7):',
          'Chúa Giêsu lên núi công bố Hiến Chương Nước Trời với 8 Mối Phúc Thật: "Phúc thay ai có tâm hồn nghèo khó, vì Nước Trời là của họ... Phúc thay ai xây dựng hòa bình, vì họ sẽ được gọi là con Thiên Chúa."',
          'Ngài mời gọi người môn đệ: "Chính anh em là muối cho đời và là ánh sáng cho trần gian."',
          '',
          '2. PHÊRÔ TUYÊN TÍN & NỀN TẢNG HỘI THÁNH (Mt 16, 18):',
          '"Thầy bảo cho anh biết: Anh là Phêrô, nghĩa là Tảng Đá, trên tảng đá này, Thầy sẽ xây Hội Thánh của Thầy, và quyền lực tử thần sẽ không thắng nổi."',
          '',
          '3. LỆNH TRUYỀN GIÁO TOÀN CẦU (Mt 28, 19-20):',
          '"ANH EM HÃY ĐI VÀ LÀM CHO MUÔN DÂN TRỞ THÀNH MÔN ĐỆ, LÀM PHÉP RỬA CHO HỌ NHÂN DANH CHÚA CHA, CHÚA CON VÀ CHÚA THÁNH THẦN... VÀ ĐÂY, THẦY Ở CÙNG ANH EM MỌI NGÀY CHO ĐẾN TẬN THẾ."'
        ]
      },
      {
        id: 'tu-chuong-2-tin-mung-macco',
        number: 2,
        title: 'Tin Mừng Theo Thánh Mác-cô (Mark - Mc)',
        subtitle: 'Đức Giêsu - Người Tôi Tớ Đau Khổ và Con Thiên Chúa Uy Quyền',
        summary: '16 chương: Cuốn Tin Mừng ngắn nhất, sinh động và trực tiếp nhất; tập trung vào các phép lạ quyền năng và mầu nhiệm Thập Giá.',
        content: [
          'TỔNG QUAN TIN MỪNG MÁC-CÔ (16 CHƯƠNG):',
          '',
          '1. LỜI KÊU GỌI SÁM HỐI KHỞI ĐẦU (Mc 1, 15):',
          '"Thời kỳ đã mãn, và Triều Đại Thiên Chúa đã đến gần. Anh em hãy sám hối và tin vào Tin Mừng."',
          '',
          '2. MẦU NHIỆM TÔI TỚ PHỤC VỤ (Mc 10, 45):',
          '"Vì Con Người đến không phải để được người ta phục vụ, nhưng là để phục vụ và hiến dâng mạng sống làm giá chuộc muôn người."',
          '',
          '3. LỜI TUYÊN TÍN DƯỚI CHÂN THẬP GIÁ (Mc 15, 39):',
          'Viên đại đội trưởng La Mã đứng đối diện khi thấy Chúa tắt thở liền thốt lên: "Quả thật, người này là Con Thiên Chúa!"'
        ]
      },
      {
        id: 'tu-chuong-3-tin-mung-luca',
        number: 3,
        title: 'Tin Mừng Theo Thánh Luca (Luke - Lc)',
        subtitle: 'Tin Mừng Của Lòng Thương Xót, Niềm Vui & Đức Maria',
        summary: '24 chương: Biến cố Truyền Tin, Kinh Magnificat, Dụ ngôn Người Cha Nhân Hậu, Người Samari Nhân Lành và hai môn đệ Emmau.',
        content: [
          'TỔNG QUAN TIN MỪNG LUCA (24 CHƯƠNG):',
          '',
          '1. ĐỨC MARIA & LỄ TRUYỀN TIN (Lc 1):',
          'Sứ thần Gáprien chào Đức Mẹ: "Mừng vui lên, hỡi Đấng đầy ân sủng, Đức Chúa ở cùng bà!" và lời thưa Xin Vâng khiêm nhường cứu độ nhân loại: "Này tôi là tôi tớ Chúa, xin Chúa cứ làm cho tôi như lời sứ thần nói."',
          '',
          '2. BA DỤ NGÔN VỀ LÒNG THƯƠNG XÓT (Lc 15):',
          'Con chiên lạc, đồng bạc bị mất và đặc biệt là Dụ ngôn Người Cha Nhân Hậu (Người con hoang đàng) mở rộng vòng tay ôm lấy tội nhân trở về.',
          '',
          '3. HAI MÔN ĐỆ TRÊN ĐƯỜNG EMMAU (Lc 24):',
          'Chúa Giêsu Phục Sinh đồng hành, giải thích Kinh Thánh làm bừng cháy tâm hồn hai môn đệ và nhận ra Ngài khi Ngài bẻ bánh.'
        ]
      },
      {
        id: 'tu-chuong-4-tin-mung-gioan',
        number: 4,
        title: 'Tin Mừng Theo Thánh Gioan (John - Ga)',
        subtitle: 'Đức Giêsu - Ngôi Lời Thiên Chúa Nhập Thể và Nguồn Sống Đích Thực',
        summary: '21 chương: Lời tựa tuyệt mỹ "Lúc khởi đầu đã có Ngôi Lời", Diễn từ Bánh Hằng Sống (Ga 6), Rửa Chân cho môn đệ, và Giới Răn Yêu Thương.',
        content: [
          'TỔNG QUAN TIN MỪNG GIOAN (21 CHƯƠNG):',
          '',
          '1. NGÔI LỜI NHẬP THỂ (Ga 1, 14):',
          '"VÀ NGÔI LỜI ĐÃ TRỞ NÊN NGƯỜI PHÀM VÀ CƯ NGỤ GIỮA CHÚNG TA. CHÚNG TÔI ĐÃ ĐƯỢC NGẮM NHÌN VINH QUANG CỦA NGƯỜI, VINH QUANG MÀ CHÚA CHA BAN CHO NGƯỜI CON MỘT ĐẦY TRÀN ÂN SỦNG VÀ SỰ THẬT."',
          '',
          '2. BÍ TÍCH THÁNH THỂ & BÁNH HẰNG SỐNG (Ga 6, 51):',
          '"Tôi là bánh hằng sống từ trời xuống. Ai ăn bánh này, sẽ được sống muôn đời. Và bánh tôi sẽ ban tặng, chính là thịt tôi đây, để cho thế gian được sống."',
          '',
          '3. ĐIỀU RĂN MỚI CỦA CHÚA GIÊSU (Ga 13, 34):',
          '"Thầy ban cho anh em một điều răn mới là anh em hãy yêu thương nhau; như Thầy đã yêu thương anh em, anh em cũng hãy yêu thương nhau."'
        ]
      },
      {
        id: 'tu-chuong-5-sach-cong-vu-tong-do',
        number: 5,
        title: 'Sách Công Vụ Tông Đồ (Acts - Cvtđ)',
        subtitle: 'Chúa Thánh Thần hiện xuống & Bước chân truyền giáo vĩ đại',
        summary: '28 chương: Đại lễ Hiện Xuống, đời sống cộng đoàn Hội Thánh tiên khởi, sự tử đạo của Thánh Têphanô và 3 chuyến hành trình truyền giáo của Thánh Phaolô.',
        content: [
          'TỔNG QUAN SÁCH CÔNG VỤ TÔNG ĐỒ (28 CHƯƠNG):',
          '',
          '1. CHÚA THÁNH THẦN HIỆN XUỐNG (Cv 2):',
          'Vào ngày lễ Ngũ Tuần, Chúa Thánh Thần ngự xuống trên các Tông đồ và Đức Mẹ dưới hình lưỡi lửa. Các Tông đồ tràn đầy ơn Thánh Thần, can đảm bước ra loan báo Tin Mừng Chúa Phục Sinh khiến 3.000 người xin chịu phép Rửa trong một ngày.',
          '',
          '2. ĐỜI SỐNG HỘI THÁNH TIÊN KHỞI (Cv 2, 42):',
          '"Các tín hữu chuyên cần lắng nghe các Tông Đồ giảng dạy, hiệp thông huynh đệ, siêng năng tham dự lễ Bẻ Bánh và cầu nguyện không ngừng."',
          '',
          '3. HÀNH TRÌNH TRUYỀN GIÁO CỦA THÁNH PHAOLÔ (Cv 9 - 28):',
          'Từ kẻ bắt đạo Saolô trở thành Tông Đồ Dân Ngoại Phaolô nhiệt thành, vượt qua muôn vàn bão tố, đắm tàu, tù đày để mang Tin Mừng đến tận thủ đô Rôma.'
        ]
      }
    ]
  }
];
