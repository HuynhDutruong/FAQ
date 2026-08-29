/**
 * DẪN NHẬP KINH THÁNH CHUẨN CÔNG GIÁO
 * Theo Giáo Huấn Hội Thánh Công Giáo, Bản Dịch Các Giờ Kinh Phụng Vụ (KTCGKPV)
 * và Lịch Sử Ơn Cứu Độ.
 */

export interface CatholicBookIntro {
  authorContext: string;       // Bối cảnh lịch sử & Tác giả
  coreMessage: string;         // Sứ điệp cốt lõi & Ơn Cứu Độ
  structure: string;           // Bố cục & Nội dung chính
  keyVerse: string;            // Câu Kinh Thánh ghi nhớ tiêu biểu
  catechismRef?: string;       // Liên kết Giáo lý Hội Thánh Công Giáo
}

export const CATHOLIC_BOOK_INTROS: Record<string, CatholicBookIntro> = {
  // =========================================================================
  // NGŨ THƯ (PENTATEUCH)
  // =========================================================================
  'sang-the': {
    authorContext: 'Sách đầu tiên trong bộ Ngũ Thư (Torah). Theo truyền thống do Môsê truyền thụ và được cộng đoàn Israel ghi nhận qua dòng lịch sử ơn cứu độ.',
    coreMessage: 'Thiên Chúa là Đấng Tạo Hóa dựng nên vũ trụ tốt lành. Dù loài người sa ngã phạm tội, Thiên Chúa đã khởi sự Kế Hoạch Cứu Độ qua việc tuyển chọn Tổ phụ Áp-ra-ham, ban lời hứa Chúc Phúc cho muôn dân.',
    structure: 'Gồm 50 chương chia làm 2 phần lớn: (1) Lịch sử nguyên thủy từ Tạo dựng đến Tháp Ba-ben (Ch. 1-11); (2) Lịch sử các Tổ phụ Áp-ra-ham, I-xa-ác, Gia-cóp và Giu-se (Ch. 12-50).',
    keyVerse: '“Lúc khởi đầu, Thiên Chúa sáng tạo trời đất... Thiên Chúa thấy mọi sự Người đã làm ra thật là rất tốt đẹp.” (St 1, 1.31)',
    catechismRef: 'GLHTCG số 289-301'
  },
  'xuat-hanh': {
    authorContext: 'Trọng tâm của Cựu Ước, ghi lại biến cố Thiên Chúa can thiệp giải phóng dân tộc Israel khỏi ách nô lệ Ai Cập vào khoảng thế kỷ XIII TCN dưới sự lãnh đạo của Môsê.',
    coreMessage: 'Thiên Chúa là Đấng Giải Phóng và Trung Tín. Người mạc khải Danh Thánh YHWH (ĐẤNG TỰ HỮU) và thiết lập Giao Ước Sinai, nhận Israel làm Dân Riêng và ban Thập Giới (Mười Điều Răn).',
    structure: '40 chương: (1) Giải phóng khỏi Ai Cập và Vượt Qua Biển Đỏ (Ch. 1-18); (2) Giao Ước tại núi Sinai và Ban Thập Giới (Ch. 19-24); (3) Nhà Tạm và Phụng vụ Giao Ước (Ch. 25-40).',
    keyVerse: '“Ta là ĐỨC CHÚA, Thiên Chúa của ngươi, Đấng đã đưa ngươi ra khỏi đất Ai-cập, khỏi cảnh nô lệ.” (Xh 20, 2)',
    catechismRef: 'GLHTCG số 2056-2083'
  },
  'le-vi': {
    authorContext: 'Sổ tay hướng dẫn phụng vụ thánh và lề luật của chi tộc Lê-vi phục vụ Đền Tạm, nhấn mạnh đời sống thánh thiện của Dân Thiên Chúa.',
    coreMessage: '“Các ngươi phải thánh thiện, vì Ta, ĐỨC CHÚA, Thiên Chúa của các ngươi, Ta là Đấng Thánh.” Thiên Chúa thiết lập các của lễ hy tế và Ngày Xá Tội (Yom Kippur) báo trước Hy tế Thập Giá Chúa Kitô.',
    structure: '27 chương: (1) Các của lễ toàn thiêu, tạ ơn, tạ tội (Ch. 1-7); (2) Thánh hiến Tư tế (Ch. 8-10); (3) Luật thanh sạch (Ch. 11-16); (4) Bộ luật Thánh Thiện (Ch. 17-27).',
    keyVerse: '“Ngươi phải yêu thương người lân cận như chính mình. Ta là ĐỨC CHÚA.” (Lv 19, 18)',
    catechismRef: 'GLHTCG số 2099-2100'
  },
  'dan-so': {
    authorContext: 'Ghi lại cuộc hành trình 40 năm của Dân Chúa xuyên qua sa mạc từ núi Sinai đến ngưỡng cửa Đất Hứa Canaan.',
    coreMessage: 'Bài học về sự kiên nhẫn, trung thành và lòng thương xót của Thiên Chúa đối với sự bất trung, lẩm bẩm kêu trách của con người. Hình ảnh con rắn đồng giương cao là hình bóng Chúa Giêsu chịu treo trên Thập Giá.',
    structure: '36 chương: (1) Kiểm tra dân số tại Sinai (Ch. 1-10); (2) Cuộc lữ hành trong sa mạc và các cuộc thử thách (Ch. 11-21); (3) Dừng chân tại đồng bằng Mô-áp (Ch. 22-36).',
    keyVerse: '“Nguyện ĐỨC CHÚA chúc lành và gìn giữ anh em! Nguyện ĐỨC CHÚA tươi nét mặt nhìn đến anh em và dủ lòng thương anh em!” (Ds 6, 24-25)'
  },
  'de-nhi-luat': {
    authorContext: 'Lời trăn trối và di huấn tâm huyết của Môsê gửi gắm dân Chúa trước khi ông qua đời trên núi Nê-bô.',
    coreMessage: 'Kinh Shema Israel: “Nghe đây, hỡi Israel! ĐỨC CHÚA, Thiên Chúa chúng ta, là ĐỨC CHÚA duy nhất. Hãy yêu mến ĐỨC CHÚA hết lòng, hết linh hồn, hết sức lực.” Mời gọi dân chọn lựa giữa Sự Sống và Sự Chết.',
    structure: '34 chương: (1) Bài giảng 1: Ôn lại lịch sử ơn cứu độ (Ch. 1-4); (2) Bài giảng 2: Nhắc lại Luật Giao Ước (Ch. 5-26); (3) Lời chúc lành và nguyền rủa (Ch. 27-30); (4) Lời từ biệt và sự qua đời của Môsê (Ch. 31-34).',
    keyVerse: '“Ngươi phải yêu mến ĐỨC CHÚA, Thiên Chúa của ngươi, hết lòng, hết linh hồn và hết sức lực ngươi.” (Đnl 6, 5)',
    catechismRef: 'GLHTCG số 2083'
  },

  // =========================================================================
  // PHÚC ÂM & TÂN ƯỚC (GOSPELS & NEW TESTAMENT)
  // =========================================================================
  'tin-mung-mat-theu': {
    authorContext: 'Tác giả là Thánh Mát-thêu (Lê-vi) Tông đồ, người thu thuế được Chúa kêu gọi. Sách được viết cho các tín hữu gốc Do Thái vào khoảng thập niên 70–80.',
    coreMessage: 'Đức Giêsu là Đấng Mê-si-a (Đấng Cứu Thế), Con Vua Đa-vít, Đấng làm trọn mọi lời tiên tri Cựu Ước. Người thiết lập Nước Trời qua Bài Giảng Trên Núi (Tám Mối Phúc Thật) và trao quyền lãnh đạo cho Phêrô.',
    structure: '28 chương xoay quanh 5 bài giảng lớn của Chúa Giêsu: (1) Bài giảng Trên Núi (Ch. 5-7); (2) Sai đi truyền giáo (Ch. 10); (3) Dụ ngôn Nước Trời (Ch. 13); (4) Đời sống cộng đoàn Giáo Hội (Ch. 18); (5) Cánh chung luận (Ch. 24-25).',
    keyVerse: '“Anh em hãy đi và làm cho muôn dân trở thành môn đệ, làm phép rửa cho họ nhân danh Chúa Cha, Chúa Con và Chúa Thánh Thần.” (Mt 28, 19)',
    catechismRef: 'GLHTCG số 541-546'
  },
  'tin-mung-mac-co': {
    authorContext: 'Thánh Mác-cô (môn đệ thân cận của Thánh Phêrô) biên soạn tại Rôma dành cho các Kitô hữu gốc ngoại giáo.',
    coreMessage: 'Tuyên xưng căn tính sâu sắc: Đức Giêsu là Con Thiên Chúa và là Người Tôi Tớ Đau Khổ hiến mạng sống làm giá chuộc muôn người. Nhấn mạnh mầu nhiệm Thập Giá và bí mật Đấng Mê-si-a.',
    structure: '16 chương cô đọng, diễn tiến dồn dập: (1) Sứ vụ tại Galilê (Ch. 1-8); (2) Hành trình lên Giê-ru-sa-lem (Ch. 8-10); (3) Cuộc Khổ Nạn và Phục Sinh vinh hiển (Ch. 11-16).',
    keyVerse: '“Quả thật, người này là Con Thiên Chúa!” (Mc 15, 39)'
  },
  'tin-mung-lu-ca': {
    authorContext: 'Thánh Lu-ca (vị lương y và bạn đồng hành của Thánh Phaolô) biên soạn một bản tường thuật cẩn thận và mỹ lệ dành cho Thê-ô-phi-lô.',
    coreMessage: 'Tin Mừng về Lòng Thương Xót, Niềm Vui Ơn Cứu Độ và Đức Ái phổ quát. Chúa Giêsu ưu ái người nghèo khó, tội lỗi, phụ nữ và người bị gạt ra bên lề xã hội (Dụ ngôn Người Cha Nhân Hậu, Người Samari Nhân Lành).',
    structure: '24 chương: (1) Tin Mừng Thời Thơ Ấu & Ca vịnh Magnificat (Ch. 1-2); (2) Sứ vụ Galilê (Ch. 3-9); (3) Hành trình lên Giê-ru-sa-lem (Ch. 9-19); (4) Khổ nạn & Phục sinh (Ch. 20-24).',
    keyVerse: '“Vì Con Người đến để tìm và cứu những gì đã mất.” (Lc 19, 10)',
    catechismRef: 'GLHTCG số 543-545'
  },
  'tin-mung-gio-an': {
    authorContext: 'Thánh Gio-an Tông đồ — người môn đệ được Chúa Giêsu yêu mến, viết vào cuối thế kỷ I tại Ê-phê-sô.',
    coreMessage: 'Đức Giêsu là Ngôi Lời Nhập Thể, Thiên Chúa thật và Người thật, là Ánh Sáng, Đường Đi, Sự Thật, Sự Sống và Bánh Hằng Sống. Ai tin vào Người thì có sự sống đời đời.',
    structure: '21 chương: (1) Lời tựa và Sách Các Dấu Lạ (Ch. 1-12); (2) Sách Giờ Vinh Hiển: Bữa Tiệc Ly, Rửa Chân, Khổ Nạn và Phục Sinh (Ch. 13-21).',
    keyVerse: '“Thiên Chúa yêu thế gian đến nỗi đã ban Con Một, để ai tin vào Con của Người thì khỏi phải chết, nhưng được sống muôn đời.” (Ga 3, 16)',
    catechismRef: 'GLHTCG số 456-460'
  },
  'cong-vu-tong-do': {
    authorContext: 'Phần tiếp theo của Tin Mừng Lu-ca, ghi lại lịch sử bùng nổ của Hội Thánh sơ khai dưới sự thúc đẩy của Chúa Thánh Thần.',
    coreMessage: 'Chúa Thánh Thần hiện xuống ngày Lễ Ngũ Tuần, khai sinh Giáo Hội truyền giáo từ Giê-ru-sa-lem, Giu-đê, Sa-ma-ri đến tận cùng trái đất qua bước chân Phêrô và Phaolô.',
    structure: '28 chương: (1) Giáo hội tại Giê-ru-sa-lem (Ch. 1-7); (2) Mở rộng sang dân ngoại và biến cố Phaolô trở lại (Ch. 8-12); (3) Ba chuyến hành trình truyền giáo của Phaolô đến Rôma (Ch. 13-28).',
    keyVerse: '“Anh em sẽ nhận được sức mạnh của Thánh Thần... và sẽ là chứng nhân của Thầy tại Giê-ru-sa-lem... cho đến tận cùng trái đất.” (Cv 1, 8)',
    catechismRef: 'GLHTCG số 731-741'
  },
  'thu-ro-ma': {
    authorContext: 'Thư thần học sâu sắc nhất của Thánh Phaolô gửi cộng đoàn Rôma vào khoảng năm 57–58 từ Cô-rin-tô.',
    coreMessage: 'Sự Công Chính Hóa nhờ Đức Tin vào Chúa Giêsu Kitô chứ không phải nhờ việc làm của Lề Luật. Ân sủng cứu độ được ban nhưng không cho cả người Do Thái lẫn Dân ngoại.',
    structure: '16 chương: (1) Mọi người đều phạm tội và cần ơn cứu chuộc (Ch. 1-3); (2) Ơn công chính hóa nhờ đức tin (Ch. 4-8); (3) Số phận dân tộc Israel (Ch. 9-11); (4) Đời sống luân lý Kitô hữu (Ch. 12-16).',
    keyVerse: '“Tôi không hổ thẹn vì Tin Mừng. Quả táo đó là sức mạnh Thiên Chúa dùng để cứu độ bất cứ ai có lòng tin.” (Rm 1, 16)',
    catechismRef: 'GLHTCG số 1987-2005'
  },
  'thu-giu-da': {
    authorContext: 'Thánh Giuđa Tađêô Tông đồ — người anh em của Thánh Giacôbê, viết gửi các cộng đoàn Kitô hữu đang đối mặt với các tà thuyết và sự suy đồi luân lý.',
    coreMessage: 'Mời gọi các tín hữu kiên vững chiến đấu vì Đức Tin Duy Nhất đã được trao phó cho các thánh; giữ mình trong tình yêu Thiên Chúa và trông đợi lòng thương xót Chúa Kitô.',
    structure: 'Chỉ có 1 chương duy nhất (25 câu): (1) Lời chào và mục đích viết thư (c. 1-4); (2) Cảnh báo chống lại các kẻ giả hình và sa đọa (c. 5-16); (3) Khuyên nhủ kiên vững trong đức tin, đức ái và lời chúc tụng Thiên Chúa vinh hiển (c. 17-25).',
    keyVerse: '“Anh em hãy xây dựng đời mình trên nền tảng đức tin rất thánh, hãy cầu nguyện trong Thánh Thần, gìn giữ mình trong tình yêu của Thiên Chúa.” (Gđ 1, 20-21)',
    catechismRef: 'GLHTCG số 162'
  },
  'khai-huyen': {
    authorContext: 'Thánh Gio-an Tông đồ được thị kiến mầu nhiệm trong khi bị lưu đày tại đảo Bát-mô vì Lời Chúa và lời chứng của Đức Giêsu.',
    coreMessage: 'Tin Mừng Hy Vọng và Chiến Thắng Cứu Độ: Con Chiên Đã Bị Giết nay Khải Hoàn ngự trị. Dù Giáo Hội phải trải qua bách hại, Thiên Chúa sẽ chiến thắng sự dữ, lau sạch mọi giọt nước mắt và tạo nên Trời Mới Đất Mới.',
    structure: '22 chương: (1) Thị kiến Khởi đầu và Thư gửi 7 Hội Thánh (Ch. 1-3); (2) Con Chiên mở 7 ấn, 7 tiếng kèn và 7 chén thịnh nộ (Ch. 4-16); (3) Sự sụp đổ của Ba-by-lon và chiến thắng của Vua muôn vua (Ch. 17-20); (4) Giê-ru-sa-lem Thiên Quốc Mới (Ch. 21-22).',
    keyVerse: '“Người sẽ lau sạch nước mắt họ. Sẽ không còn sự chết; cũng chẳng còn tang tóc, kêu than và đau khổ nữa.” (Kh 21, 4)',
    catechismRef: 'GLHTCG số 1042-1050'
  },
  'thanh-vinh': {
    authorContext: 'Tuyển tập 150 thánh thi cầu nguyện linh thiêng của Dân Chúa qua nhiều thế kỷ, gắn liền với Vua Đa-vít và truyền thống phụng vụ Đền Thờ.',
    coreMessage: 'Kinh nguyện tuyệt hảo của Giáo Hội: Thánh Vịnh bao gồm đủ mọi cung bậc tâm tình con người dâng lên Thiên Chúa: ca ngợi, cảm tạ, sám hối, tín thác, than thở trong gian truân và hy vọng Đấng Cứu Thế.',
    structure: '150 Thánh vịnh được chia thành 5 quyển tương ứng 5 sách Ngũ Thư: (1) TV 1-41; (2) TV 42-72; (3) TV 73-89; (4) TV 90-106; (5) TV 107-150.',
    keyVerse: '“Chúa là Mục Tử chăn dắt tôi, tôi chẳng thiếu thốn gì. Trong đồng cỏ xanh tươi, Người cho tôi nằm nghỉ.” (Tv 23, 1-2)',
    catechismRef: 'GLHTCG số 2585-2589'
  }
};

/**
 * Trả về dẫn nhập Công Giáo chi tiết cho bất kỳ sách nào trong 73 sách Kinh Thánh.
 * Nếu chưa có định nghĩa riêng, hàm sẽ tạo dẫn nhập chuẩn mực dựa trên nhóm sách và bối cảnh quy điển.
 */
export function getCatholicBookIntro(bookId: string, bookName: string, groupLabel: string, totalChapters: number): CatholicBookIntro {
  if (CATHOLIC_BOOK_INTROS[bookId]) {
    return CATHOLIC_BOOK_INTROS[bookId];
  }

  // Fallback thông minh theo chuẩn Kinh Thánh Công Giáo
  return {
    authorContext: `Thuộc quy điển Kinh Thánh Công Giáo (${groupLabel}). Gồm ${totalChapters} chương bản văn được linh hứng bởi Chúa Thánh Thần và lưu truyền trong Hội Thánh.`,
    coreMessage: `Sách ${bookName} mạc khải chân lý thánh thiện của Thiên Chúa, hướng dẫn đời sống đức tin, luân lý và hướng lòng trông cậy về Ơn Cứu Độ nơi Đức Giêsu Kitô.`,
    structure: `Toàn văn gồm ${totalChapters} chương trình bày mạch lạc theo truyền thống Phụng vụ và Giáo Huấn Hội Thánh Công Giáo.`,
    keyVerse: `“Tất cả những gì viết trong Sách Thánh đều do Thiên Chúa linh hứng, và có ích cho việc giảng dạy, biện bác, sửa dạy, huấn luyện trong sự công chính.” (2 Tm 3, 16)`
  };
}
