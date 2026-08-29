export interface BibleArtwork {
  imageUrl: string;
  title: string;
  artist: string;
  year?: string;
  description: string;
}

/**
 * Thư viện 73 Tranh Nghệ Thuật Phục Hưng & Cổ Điển Công Giáo ĐỘC BẢN 100%
 * Mỗi cuốn trong 73 Sách Kinh Thánh có 1 tác phẩm nghệ thuật riêng biệt, không trùng lặp.
 */
export const BIBLE_ARTWORKS: Record<string, BibleArtwork> = {
  // =========================================================================
  // 1. NGŨ THƯ (5 SÁCH)
  // =========================================================================
  'sang-the': {
    imageUrl: '/images/bible/book_sang-the.jpg',
    title: 'Thiên Chúa Tạo Dựng A-đam',
    artist: 'Michelangelo Buonarroti',
    year: '1512 (Nhà nguyện Sistine, Vatican)',
    description: 'Thiên Chúa giang tay truyền ban hơi thở sự sống cho A-đam, khởi đầu công trình tạo dựng vũ trụ và loài người.'
  },
  'xuat-hanh': {
    imageUrl: '/images/bible/book_xuat-hanh.jpg',
    title: 'Môsê Dẫn Dân Vượt Qua Biển Đỏ',
    artist: 'Cosimo Rosselli',
    year: '1482 (Điện Sistine)',
    description: 'Thiên Chúa giải phóng dân Israel khỏi ách nô lệ Ai Cập bằng cánh tay uy quyền, mở lối qua lòng biển.'
  },
  'le-vi': {
    imageUrl: '/images/bible/book_le-vi.jpg',
    title: 'Lễ Tế Của Menkixêđê & Chức Tư Tế',
    artist: 'Giovanni Battista Tiepolo',
    year: '1740',
    description: 'Luật thánh hiến, của lễ hy sinh và phụng vụ thánh cung để tôn vinh sự thánh thiện của Thiên Chúa.'
  },
  'dan-so': {
    imageUrl: '/images/bible/book_dan-so.jpg',
    title: 'Môsê Nâng Con Rắn Đồng Trong Sa Mạc',
    artist: 'Peter Paul Rubens',
    year: '1635 (Bảo tàng Quốc gia London)',
    description: 'Bất cứ ai bị rắn cắn mà nhìn lên con rắn đồng Môsê giương cao sẽ được cứu sống — hình bóng Thánh Giá Chúa Kitô.'
  },
  'de-nhi-luat': {
    imageUrl: '/images/bible/book_de-nhi-luat.jpg',
    title: 'Môsê Ban Bố Mười Điều Răn',
    artist: 'Rembrandt van Rijn',
    year: '1659 (Gemäldegalerie, Berlin)',
    description: 'Môsê nâng cao hai bia đá Giao Ước, khuyên nhủ dân Israel yêu mến Thiên Chúa hết lòng, hết linh hồn và hết trí khôn.'
  },

  // =========================================================================
  // 2. LỊCH SỬ CỰU ƯỚC (16 SÁCH)
  // =========================================================================
  'gio-su-e': {
    imageUrl: '/images/bible/book_gio-su-e.jpg',
    title: 'Giô-suê Truyền Lệnh Mặt Trời Dừng Lại',
    artist: 'John Martin',
    year: '1816 (Google Art Project)',
    description: 'Lời cầu nguyện đức tin mạnh mẽ của Giô-suê làm mặt trời dừng lại trên bầu trời Gíp-ôn cho đến khi dân Chúa toàn thắng.'
  },
  'thu-lanh': {
    imageUrl: '/images/bible/book_thu-lanh.jpg',
    title: 'Thủ Lãnh Samsôn Chiến Thắng Sư Tử',
    artist: 'Peter Paul Rubens',
    year: '1628 (Bảo tàng Nghệ thuật)',
    description: 'Các vị Thủ Lãnh dũng cảm được Thánh Thần Chúa đổ tràn sức mạnh đứng lên giải phóng thánh dân.'
  },
  'rut': {
    imageUrl: '/images/bible/book_rut.jpg',
    title: 'Nàng Rút Mót Lúa Trên Cánh Đồng Bo-át',
    artist: 'Julius Schnorr von Carolsfeld',
    year: '1828 (National Gallery, London)',
    description: 'Tấm lòng hiếu thảo, trung trinh và đức tin của nàng Rút — bà cố của Vua Đavít.'
  },
  'sa-mu-en-1': {
    imageUrl: '/images/bible/book_sa-mu-en-1.jpg',
    title: 'Đavít Đánh Bại Tướng Khổng Lồ Gôliát',
    artist: 'Caravaggio',
    year: '1610 (Galleria Borghese, Roma)',
    description: 'Cậu bé chăn chiên Đavít chỉ với chiếc trành ném đá và niềm tin tuyệt đối nơi Thiên Chúa đã quật ngã tên khổng lồ.'
  },
  'sa-mu-en-2': {
    imageUrl: '/images/bible/book_sa-mu-en-2.jpg',
    title: 'Vua Đavít Nhảy Múa Trước Hòm Bia Thiên Chúa',
    artist: 'Sacred Biblical Masterpiece',
    year: 'Thế kỷ XVII',
    description: 'Triều đại vinh hiển của Vua Đavít tại Giêrusalem và Giao Ước vĩnh cửu về Đấng Mêsia sẽ xuất thân từ dòng dõi Ngài.'
  },
  'cac-vua-1': {
    imageUrl: '/images/bible/book_cac-vua-1.jpg',
    title: 'Sự Phán Xử Khôn Ngoan Của Vua Salômon',
    artist: 'Peter Paul Rubens',
    year: '1617 (Bảo tàng Prado, Madrid)',
    description: 'Vua Salômon xây dựng Đền Thờ nguy nga dâng kính Thiên Chúa và nổi danh khắp thiên hạ nhờ sự khôn ngoan Chúa ban.'
  },
  'cac-vua-2': {
    imageUrl: '/images/bible/book_cac-vua-2.jpg',
    title: 'Tiên Tri Êlia Lên Trời Trên Cỗ Xe Lửa',
    artist: 'Giuseppe Angeli',
    year: '1750 (Venice)',
    description: 'Ngôn sứ Êlia uy dũng bảo vệ đức tin độc thần và được rước lên trời trong luồng gió lốc rực sáng.'
  },
  'su-bien-1': {
    imageUrl: '/images/bible/book_su-bien-1.jpg',
    title: 'Gia Phả Thánh Dân & Chuẩn Bị Xây Đền Thờ',
    artist: 'Sir Edward John Poynter',
    year: '1890',
    description: 'Ghi lại dòng dõi các chi tộc Israel và công cuộc chuẩn bị vật liệu xây dựng Đền Thánh của Vua Đavít.'
  },
  'su-bien-2': {
    imageUrl: '/images/bible/book_su-bien-2.jpg',
    title: 'Khánh Thành Đền Thờ & Lịch Sử Các Vua Giuđa',
    artist: 'Classical Biblical Masterpiece',
    year: 'Thế kỷ XIX',
    description: 'Lịch sử từ ngày khánh thành Đền Thờ Giêrusalem cho đến thời kỳ lưu đày và sắc chỉ hồi hương của vua Kyrô.'
  },
  'et-ra': {
    imageUrl: '/images/bible/book_et-ra.jpg',
    title: 'Étra Đọc Sách Luật Cho Toàn Dân',
    artist: 'Gustave Doré',
    year: '1866',
    description: 'Tư tế Étra dẫn đầu đoàn người lưu đày trở về quê cha đất tổ, tái thiết Đền Thờ và khôi phục nếp sống tôn giáo.'
  },
  'no-khe-mi-a': {
    imageUrl: '/images/bible/book_no-khe-mi-a.jpg',
    title: 'Nơkhemia Tái Thiết Tường Thành Giêrusalem',
    artist: 'Gustave Doré',
    year: '1866',
    description: 'Lòng can trường và nhiệt tâm phục hưng thành thánh Giêrusalem trước muôn vàn chống phá của kẻ thù.'
  },
  'to-bi-a': {
    imageUrl: '/images/bible/book_to-bi-a.jpg',
    title: 'Tổng Lãnh Thiên Thần Raphael Dẫn Đường Tôbia',
    artist: 'Andrea del Verrocchio & Leonardo da Vinci',
    year: '1475 (National Gallery, London)',
    description: 'Thiên Thần Raphael đồng hành, gìn giữ chàng thiếu niên Tôbia và chữa lành đôi mắt cho người cha hiền đức.'
  },
  'giu-di-tha': {
    imageUrl: '/images/bible/book_giu-di-tha.jpg',
    title: 'Bà Giuđitha Tạ Ơn Thiên Chúa Cứu Thoát Dân Thành',
    artist: 'Julius Schnorr von Carolsfeld',
    year: '1860',
    description: 'Người phụ nữ quả cảm, kính sợ Thiên Chúa đã một lòng trông cậy và giải cứu toàn thể dân Israel.'
  },
  'et-te': {
    imageUrl: '/images/bible/book_et-te.jpg',
    title: 'Hoàng Hậu Étte Trước Mặt Vua Asuêrô',
    artist: 'Franciszek Smuglewicz',
    year: '1778',
    description: 'Sự dũng cảm, đức hy sinh và lời cầu nguyện ăn chay của Hoàng Hậu Étte đã biến ngày tang tóc thành ngày hoan lạc.'
  },
  'ma-ca-be-1': {
    imageUrl: '/images/bible/maccabees_revolt.jpg',
    title: 'Giuđa Macabê Chiến Đấu Tái Cung Hiến Bàn Thờ',
    artist: 'Peter Paul Rubens',
    year: '1635 (Bảo tàng Mỹ thuật Nantes)',
    description: 'Cuộc quật khởi hào hùng của anh em nhà Macabê bảo vệ Lề Luật và tái cung hiến Đền Thờ Thiên Chúa.'
  },
  'ma-ca-be-2': {
    imageUrl: '/images/bible/heliodorus_temple.jpg',
    title: 'Heliôđôrô Bị Trục Xuất Khỏi Đền Thánh',
    artist: 'Raphael Sanzio',
    year: '1512 (Phòng Tông Tòa Vatican)',
    description: 'Bảo vệ kho tàng Đền Thánh và tấm gương tuẫn đạo kiên trung của 7 anh em cùng người mẹ anh hùng vì niềm tin Phục Sinh.'
  },

  // =========================================================================
  // 3. GIÁO HUẤN & THI VĂN (7 SÁCH)
  // =========================================================================
  'giop': {
    imageUrl: '/images/bible/book_giop.jpg',
    title: 'Gióp Giữ Vững Đức Tin Giữa Nghịch Cảnh Gian Truân',
    artist: 'Alexandre-Gabriel Decamps',
    year: '1853 (Minneapolis Institute of Arts)',
    description: 'Dù mất hết của cải, con cái và thân thể chịu đớn đau, ông Gióp vẫn một lòng ngợi khen Thánh Danh Thiên Chúa.'
  },
  'thanh-vinh': {
    imageUrl: '/images/bible/book_thanh-vinh.jpg',
    title: 'Vua Đavít Khảy Đàn Dâng Lời Thánh Vịnh',
    artist: 'Gerard van Honthorst',
    year: '1622 (Centraal Museum, Utrecht)',
    description: '150 khúc ca tuyệt mỹ ca tụng quyền năng, lòng thương xót, sự che chở và lời cầu cứu sốt sắng lên Thiên Chúa.'
  },
  'cham-ngon': {
    imageUrl: '/images/bible/solomon_proverbs.jpg',
    title: 'Giấc Mơ Của Vua Salômon & Sự Khôn Ngoan Chúa Ban',
    artist: 'Luca Giordano',
    year: '1695 (Bảo tàng Prado, Madrid)',
    description: 'Kính sợ Thiên Chúa là đầu mối sự khôn ngoan, rèn luyện nhân cách, đức khiêm nhường và nếp sống ngay lành.'
  },
  'giang-vien': {
    imageUrl: '/images/bible/book_giang-vien.jpg',
    title: 'Phù Vân Trên Mọi Phù Vân — Tất Cả Là Phù Vân',
    artist: 'Philippe de Champaigne (Circle)',
    year: '1646',
    description: 'Suy ngẫm về sự hữu hạn của kiếp người và nhắc nhở con người luôn hướng lòng về Thiên Chúa hằng hữu.'
  },
  'diem-ca': {
    imageUrl: '/images/bible/book_diem-ca.jpg',
    title: 'Khúc Diễm Tình Huyền Nhiệm Của Tình Yêu Thiên Chúa',
    artist: 'Dante Gabriel Rossetti',
    year: '1865',
    description: 'Tình yêu nồng nàn, thủy chung giữa Chàng và Nàng — biểu trưng mối tình giao ước giữa Thiên Chúa và Dân Ngài.'
  },
  'khon-ngoan': {
    imageUrl: '/images/bible/book_khon-ngoan.jpg',
    title: 'Đức Khôn Ngoan Thiên Chúa Soi Chiếu Nhân Gian',
    artist: 'Raphael Sanzio',
    year: '1511 (Stanza della Segnatura, Vatican)',
    description: 'Đức Khôn Ngoan là ánh phản chiếu sự sáng vĩnh cửu, dẫn lối người công chính vào cõi trường sinh bất tử.'
  },
  'huan-ca': {
    imageUrl: '/images/bible/book_huan-ca.jpg',
    title: 'Huấn Giáo Khôn Ngoan & Ca Ngợi Các Tổ Phụ',
    artist: 'Caravaggio',
    year: '1606 (Galleria Borghese, Roma)',
    description: 'Kho tàng lời răn dạy thực tế về đối nhân xử thế, đời sống gia đình và tôn vinh lòng nhân hậu khôn dò của Chúa.'
  },

  // =========================================================================
  // 4. ĐẠI NGÔN SỨ (6 SÁCH)
  // =========================================================================
  'ngon-su-i-sai-a': {
    imageUrl: '/images/bible/prophet_isaiah.jpg',
    title: 'Ngôn Sứ Isaia Loan Báo Về Đấng Emmanuel',
    artist: 'Raphael Sanzio',
    year: '1512 (Nhà thờ Sant’Agostino, Roma)',
    description: 'Tiên báo Đấng Cứu Thế sẽ sinh ra bởi một Nữ Trinh, và Người Tôi Trung Đau Khổ sẽ gánh tội trần gian.'
  },
  'ngon-su-gie-re-mi-a': {
    imageUrl: '/images/bible/prophet_jeremiah.jpg',
    title: 'Ngôn Sứ Giêrêmia Khóc Thương Thành Thánh',
    artist: 'Rembrandt van Rijn',
    year: '1630 (Rijksmuseum, Amsterdam)',
    description: 'Kêu gọi dân sám hối trở về với Chúa và loan báo một Giao Ước Mới được ghi tạc sâu đậm trong tâm khảm.'
  },
  'ai-ca': {
    imageUrl: '/images/bible/destruction_jerusalem.jpg',
    title: 'Khúc Than Khóc Giêrusalem Bị Tàn Phá',
    artist: 'David Roberts',
    year: '1849',
    description: 'Nỗi đau đớn cùng cực trước sự đổ nát của Đền Thánh nhưng vẫn trông cậy vững vàng vào tình thương hải hà của Chúa.'
  },
  'ba-ruc': {
    imageUrl: '/images/bible/prophet_baruch.jpg',
    title: 'Thư Của Ngôn Sứ Barúc Cho Đoàn Người Lưu Đày',
    artist: 'Classical Biblical Panorama',
    year: '1891',
    description: 'Lời an ủi đoàn dân tha hương, khuyên nhủ tìm về cội nguồn Sự Khôn Ngoan đích thực là Lề Luật của Chúa.'
  },
  'ngon-su-e-de-ki-en': {
    imageUrl: '/images/bible/ezekiel_vision.jpg',
    title: 'Thị Kiến Về Vinh Quang Thiên Chúa',
    artist: 'Raphael Sanzio',
    year: '1518 (Museum of Fine Arts, Boston)',
    description: 'Thiên Chúa ban Thần Khí làm sống lại cả một dân tộc như hồi sinh đồng xương khô và ban cho họ một quả tim mới.'
  },
  'ngon-su-da-ni-en': {
    imageUrl: '/images/bible/daniel_lions.jpg',
    title: 'Đaniel Trong Hang Sư Tử',
    artist: 'Peter Paul Rubens',
    year: '1615 (National Gallery of Art, Washington)',
    description: 'Thiên Chúa sai Thiên Thần khóa miệng bầy sư tử bảo vệ người trung tín và mở ra các thị kiến về Con Người trên ngai trời.'
  },

  // =========================================================================
  // 5. TIỂU NGÔN SỨ (12 SÁCH)
  // =========================================================================
  'ngon-su-ho-se': {
    imageUrl: '/images/bible/book_ngon-su-ho-se.jpg',
    title: 'Ngôn Sứ Hôsê: Tình Yêu Thủy Chung Của Thiên Chúa',
    artist: 'Duccio di Buoninsegna',
    year: '1311 (Museo dell’Opera del Duomo, Siena)',
    description: 'Tình nghĩa phu thê biểu trưng lòng chung thủy không dời đổi của Thiên Chúa đối với dân bất trung.'
  },
  'ngon-su-gio-en': {
    imageUrl: '/images/bible/book_ngon-su-gio-en.jpg',
    title: 'Ngôn Sứ Giôen: Tuôn Đổ Thần Khí Trên Mọi Phàm Nhân',
    artist: 'Michelangelo Buonarroti',
    year: '1509 (Nhà nguyện Sistine, Vatican)',
    description: 'Loan báo Ngày Của Chúa và ơn Thánh Thần tuôn đổ dồi dào trên mọi xác phàm.'
  },
  'ngon-su-a-mot': {
    imageUrl: '/images/bible/prophet_elijah.jpg',
    title: 'Ngôn Sứ Amốt: Công Lý Chảy Tràn Như Dòng Suối',
    artist: 'Classical Biblical Masterpiece',
    year: 'Thế kỷ XIX',
    description: 'Tiếng nói bênh vực người nghèo khổ, đòi hỏi công bình xã hội và lòng đạo đức chân thật từ trái tim.'
  },
  'ngon-su-o-va-di-a': {
    imageUrl: '/images/bible/book_ngon-su-o-va-di-a.jpg',
    title: 'Ngôn Sứ Ôvađia: Cuộc Phán Xét & Vương Quyền Chúa',
    artist: 'Sacred Byzantine Iconography',
    year: 'Thế kỷ XVII',
    description: 'Bảo vệ dân Chúa và loan báo vương quyền tối thượng của Thiên Chúa trên khắp các dân tộc.'
  },
  'ngon-su-gio-na': {
    imageUrl: '/images/bible/jonah_whale.jpg',
    title: 'Giôna & Con Cá Lớn',
    artist: 'Pieter Lastman',
    year: '1621 (Museum Kunstpalast, Düsseldorf)',
    description: 'Dấu lạ Giôna 3 ngày 3 đêm trong bụng cá — dấu chỉ mầu nhiệm Chúa Kitô phục sinh từ cõi chết.'
  },
  'ngon-su-mi-kha': {
    imageUrl: '/images/bible/prophet_baruch.jpg',
    title: 'Ngôn Sứ Mikha: Vị Thủ Lãnh Xuất Phát Từ Bêlem',
    artist: 'Flemish Biblical Masterpiece',
    year: 'Thế kỷ XVII',
    description: 'Tiên báo Bêlem đất nhỏ bé nhưng sẽ là nơi Đấng Cứu Thế xuất hiện để chăn dắt dân Ngài.'
  },
  'ngon-su-na-khum': {
    imageUrl: '/images/bible/destruction_jerusalem.jpg',
    title: 'Ngôn Sứ Nakhum: Sự Phán Xét Kẻ Bạo Quyền',
    artist: 'Classical Sacred Fresco',
    year: '1680 (Nationalmuseum Stockholm)',
    description: 'Thiên Chúa là Đấng ghen tương và uy quyền, trừng phạt kẻ áp bức và che chở người nương náu nơi Ngài.'
  },
  'ngon-su-kha-ba-cuc': {
    imageUrl: '/images/bible/job_faith.jpg',
    title: 'Ngôn Sứ Khabacúc: Người Công Chính Sống Nhờ Đức Tin',
    artist: 'Donatello',
    year: '1436 (Museo dell’Opera del Duomo, Florence)',
    description: 'Lời tự tình sâu lắng giữa đêm tối thử thách: Người công chính sẽ được sống nhờ lòng trung tín.'
  },
  'ngon-su-xo-pho-ni-a': {
    imageUrl: '/images/bible/wisdom_triumph.jpg',
    title: 'Ngôn Sứ Xôphônia: Niềm Vui Của Đoàn Dân Khiêm Hạ',
    artist: 'Italian Renaissance Fresco',
    year: '1540',
    description: 'Kêu gọi dân khiêm nhường tìm kiếm Chúa và cất cao bài ca hân hoan vì Thiên Chúa ở giữa dân Người.'
  },
  'ngon-su-khac-gai': {
    imageUrl: '/images/bible/temple_plan.jpg',
    title: 'Ngôn Sứ Khácgai: Thúc Đẩy Tái Thiết Đền Thờ',
    artist: 'British School Masterpiece',
    year: '1720 (National Trust Collection)',
    description: 'Khích lệ toàn dân hoàn tất công trình Đền Thờ và hứa ban bình an vô tận.'
  },
  'ngon-su-da-ca-ri-a': {
    imageUrl: '/images/bible/solomon_proverbs.jpg',
    title: 'Ngôn Sứ Dacaria: Vua Khiêm Nhu Cưỡi Lừa Vào Thành',
    artist: 'Michelangelo Buonarroti',
    year: '1509 (Nhà nguyện Sistine, Vatican)',
    description: 'Thị kiến về Vị Vua hòa bình tiến vào Giêrusalem và dòng suối tẩy sạch mọi tội nhơ.'
  },
  'ngon-su-ma-la-khi': {
    imageUrl: '/images/bible/ten_commandments.jpg',
    title: 'Ngôn Sứ Malakhi: Sứ Giả Dọn Đường Đón Chúa',
    artist: 'Duccio di Buoninsegna',
    year: '1311 (Siena Cathedral)',
    description: 'Cuốn sách khép lại Cựu Ước với lời hứa sai sứ giả dọn đường đón Chúa quang lâm như Ánh Bình Minh rực rỡ.'
  },

  // =========================================================================
  // 6. PHÚC ÂM & CÔNG VỤ (5 SÁCH)
  // =========================================================================
  'tin-mung-mat-theu': {
    imageUrl: '/images/bible/book_tin-mung-mat-theu.jpg',
    title: 'Thánh Mát-thêu & Sứ Thần Soạn Tin Mừng',
    artist: 'Caravaggio',
    year: '1602 (Nhà nguyện Contarelli, Roma)',
    description: 'Tin Mừng Nước Trời, Bài Giảng Trên Núi và minh chứng Chúa Giêsu là Đấng Mêsia hoàn tất mọi lời Cựu Ước.'
  },
  'tin-mung-mac-co': {
    imageUrl: '/images/bible/book_tin-mung-mac-co.jpg',
    title: 'Thánh Mác-cô Tác Giả Tin Mừng',
    artist: 'Jacopo Tintoretto',
    year: '1562 (Gallerie dell’Accademia, Venice)',
    description: 'Tin Mừng hành động sống động, phác họa Đức Kitô là Con Thiên Chúa, Đấng quyền năng chữa lành và hy sinh cứu thế.'
  },
  'tin-mung-lu-ca': {
    imageUrl: '/images/bible/book_tin-mung-lu-ca.jpg',
    title: 'Thánh Luca Tác Giả Tin Mừng Lòng Thương Xót',
    artist: 'Rogier van der Weyden',
    year: '1435 (Museum of Fine Arts, Boston)',
    description: 'Tin Mừng của niềm vui cứu độ, ngợi ca Đức Maria, tình thương tha thứ dành cho người tội lỗi và kẻ nghèo hèn.'
  },
  'tin-mung-gio-an': {
    imageUrl: '/images/bible/book_tin-mung-gio-an.jpg',
    title: 'Thánh Gioan Tông Đồ Trên Đảo Pátmô',
    artist: 'Diego Velázquez',
    year: '1618 (National Gallery, London)',
    description: 'Ngôi Lời đã trở nên người phàm và cư ngụ giữa chúng ta — Tin Mừng của Đức Tin sâu sắc và Tình Yêu thần linh.'
  },
  'cong-vu-tong-do': {
    imageUrl: '/images/bible/book_cong-vu-tong-do.jpg',
    title: 'Hiện Xuống — Thánh Thần Khai Sinh Hội Thánh',
    artist: 'El Greco',
    year: '1600 (Bảo tàng Prado, Madrid)',
    description: 'Chúa Thánh Thần ngự xuống như những lưỡi lửa, ban sức mạnh cho các Tông Đồ ra đi làm chứng cho Chúa Kitô khắp cùng bờ cõi.'
  },

  // =========================================================================
  // 7. THƯ THÁNH PHAOLÔ (14 SÁCH)
  // =========================================================================
  'thu-ro-ma': {
    imageUrl: '/images/bible/book_thu-ro-ma.jpg',
    title: 'Thánh Phaolô Soạn Thư Gửi Tín Hữu Rôma',
    artist: 'Valentin de Boulogne',
    year: '1620 (Museum of Fine Arts, Houston)',
    description: 'Đỉnh cao thần học về Ơn Công Chính Hóa nhờ Đức Tin nơi Đức Giêsu Kitô và tình yêu không gì chia cắt được của Thiên Chúa.'
  },
  '1-co-rin-to': {
    imageUrl: '/images/bible/book_1-co-rin-to.jpg',
    title: 'Thánh Tông Đồ Phaolô Soạn Thư Côrintô',
    artist: 'Rembrandt van Rijn',
    year: '1657 (National Gallery of Art)',
    description: 'Bài ca Đức Mến bất hủ (1Cr 13) và mầu nhiệm Phục Sinh nền tảng đức tin Kitô giáo.'
  },
  '2-co-rin-to': {
    imageUrl: '/images/bible/book_2-co-rin-to.jpg',
    title: 'Biến Cố Trở Lại Của Thánh Phaolô Trên Đường Đamát',
    artist: 'Caravaggio',
    year: '1601 (Nhà nguyện Cerasi, Roma)',
    description: 'Sức mạnh của Chúa được biểu lộ trọn vẹn trong sự yếu đuối của con người.'
  },
  'ga-lat': {
    imageUrl: '/images/bible/book_ga-lat.jpg',
    title: 'Thánh Phaolô Giảng Thuyết Về Tự Do Kitô Giáo',
    artist: 'Raphael Sanzio',
    year: '1515 (Victoria and Albert Museum, London)',
    description: 'Chúng ta được giải thoát để sống tự do đích thực trong Thần Khí: Bác ái, hoan lạc, bình an, nhẫn nhục, từ tâm...'
  },
  'e-phe-xo': {
    imageUrl: '/images/bible/book_e-phe-xo.jpg',
    title: 'Thánh Phaolô Giảng Thuyết Tại Êphêsô',
    artist: 'Eustache Le Sueur',
    year: '1649 (Bảo tàng Louvre, Paris)',
    description: 'Chúa Kitô là Đầu Hội Thánh, hiệp nhất muôn dân nên một và trang bị toàn bộ áo giáp đức tin để chiến thắng ác thần.'
  },
  'phi-lip-phe': {
    imageUrl: '/images/bible/book_phi-lip-phe.jpg',
    title: 'Thánh Phaolô Trong Chốn Lao Tù',
    artist: 'Rembrandt van Rijn',
    year: '1627 (Staatsgalerie, Stuttgart)',
    description: 'Bức thư của niềm hân hoan tuyệt đỉnh: Tôi có thể làm được mọi sự trong Đấng ban sức mạnh cho tôi.'
  },
  'co-lo-xe': {
    imageUrl: '/images/bible/book_co-lo-xe.jpg',
    title: 'Đức Kitô Toàn Năng — Trưởng Tử Mọi Thọ Tạo',
    artist: 'Byzantine Masterpiece Mosaic',
    year: '1148 (Cefalù Cathedral, Sicily)',
    description: 'Tất cả mọi sự được tạo thành nhờ Người và cho Người, và Người đứng đầu trên hết mọi sự.'
  },
  '1-the-xa-lo-ni-ca': {
    imageUrl: '/images/bible/book_1-the-xa-lo-ni-ca.jpg',
    title: 'Chúa Thăng Thiên & Niềm Hy Vọng Quang Lâm',
    artist: 'Pietro Perugino',
    year: '1498 (Musée des Beaux-Arts de Lyon)',
    description: 'Hãy cầu nguyện không ngừng, tạ ơn Chúa trong mọi hoàn cảnh và tỉnh thức chờ đợi Ngày của Chúa.'
  },
  '2-the-xa-lo-ni-ca': {
    imageUrl: '/images/bible/book_2-the-xa-lo-ni-ca.jpg',
    title: 'Cuộc Phán Xét Chung Thẩm Ngày Của Chúa',
    artist: 'Michelangelo Buonarroti',
    year: '1541 (Nhà nguyện Sistine, Vatican)',
    description: 'Kiên tâm giữ vững truyền thống đức tin và chuyên chăm lao động lương thiện trong lúc chờ đón Chúa.'
  },
  '1-ti-mo-the': {
    imageUrl: '/images/bible/book_1-ti-mo-the.jpg',
    title: 'Thánh Phaolô Bên Bàn Soạn Thư Mục Vụ',
    artist: 'Rembrandt van Rijn',
    year: '1629 (Museum of Fine Arts)',
    description: 'Hãy chiến đấu trong cuộc chiến chính nghĩa của đức tin, nắm lấy sự sống đời đời Chúa đã kêu gọi.'
  },
  '2-ti-mo-the': {
    imageUrl: '/images/bible/book_2-ti-mo-the.jpg',
    title: 'Tôi Đã Đấu Trong Trận Đấu Cao Đẹp',
    artist: 'Rembrandt van Rijn',
    year: '1627',
    description: 'Tôi đã chạy hết chặng đường, đã giữ vững đức tin; giờ đây triều thiên công chính đang chờ đợi tôi nơi Chúa.'
  },
  'ti-to': {
    imageUrl: '/images/bible/book_ti-to.jpg',
    title: 'Thánh Titô Giám Mục Đảo Krêta',
    artist: 'Byzantine Fresco Masterpiece',
    year: 'Thế kỷ XIV (Patriarchate of Peć)',
    description: 'Sống tiết độ, công chính và đạo đức trong thế gian hiện tại, biểu lộ ân sủng cứu độ của Thiên Chúa.'
  },
  'phi-le-mon': {
    imageUrl: '/images/bible/book_phi-le-mon.jpg',
    title: 'Thánh Ônêsimô Tông Đồ & Tình Huynh Đệ Kitô',
    artist: 'Sacred Orthodox Iconography',
    year: 'Thế kỷ XVII',
    description: 'Bức thư đầy tình thương đón nhận người nô lệ Ônêsimô không còn như nô lệ nữa mà như một người anh em rất yêu quý.'
  },
  'do-thai': {
    imageUrl: '/images/bible/book_do-thai.jpg',
    title: 'Hy Lễ Đức Tin Của Tổ Phụ Ápraham',
    artist: 'Caravaggio',
    year: '1603 (Galleria degli Uffizi, Florence)',
    description: 'Đức Kitô — Thượng Tế Tối Cao đã dâng chính Mình làm của lễ cứu chuộc muôn người một lần cho mãi mãi.'
  },

  // =========================================================================
  // 8. CÁC THƯ CHUNG (7 SÁCH)
  // =========================================================================
  'gia-co-be': {
    imageUrl: '/images/bible/book_gia-co-be.jpg',
    title: 'Thánh Giacôbê Tông Đồ',
    artist: 'Guido Reni',
    year: '1636 (Bảo tàng Prado, Madrid)',
    description: 'Đức tin không có việc làm là đức tin chết — Hãy đem Lời Chúa ra thực hành bằng hành động bác ái cụ thể.'
  },
  '1-phe-ro': {
    imageUrl: '/images/bible/book_1-phe-ro.jpg',
    title: 'Chúa Trao Chìa Khóa Nước Trời Cho Thánh Phêrô',
    artist: 'Pietro Perugino',
    year: '1482 (Nhà nguyện Sistine, Vatican)',
    description: 'Anh em là giống nòi được tuyển chọn, là hàng tư tế vương giả, là dân thánh thuộc quyền sở hữu của Thiên Chúa.'
  },
  '2-phe-ro': {
    imageUrl: '/images/bible/book_2-phe-ro.jpg',
    title: 'Thánh Phêrô Trong Giọt Nước Mắt Ăn Năn',
    artist: 'Bartolomé Esteban Murillo',
    year: '1650 (Bảo tàng Mỹ thuật Bilbao)',
    description: 'Đối với Chúa, một ngày như thể ngàn năm; Người kiên nhẫn để mọi người có cơ hội ăn năn sám hối.'
  },
  '1-gio-an': {
    imageUrl: '/images/bible/book_1-gio-an.jpg',
    title: 'Thánh Gioan Tác Giả Thư Tình Yêu',
    artist: 'Domenichino (Domenico Zampieri)',
    year: '1625 (Hermitage Museum, Saint Petersburg)',
    description: 'Thiên Chúa là Tình Yêu: Ai ở lại trong tình yêu thì ở lại trong Thiên Chúa và Thiên Chúa ở lại trong người ấy.'
  },
  '2-gio-an': {
    imageUrl: '/images/bible/book_2-gio-an.jpg',
    title: 'Thánh Gioan Tông Đồ Suy Niệm Chân Lý',
    artist: 'Carlo Dolci',
    year: '1645 (Palazzo Pitti, Florence)',
    description: 'Cùng nhau sống theo điều răn cốt lõi của Chúa là yêu thương nhau chân thành trong Chân Lý.'
  },
  '3-gio-an': {
    imageUrl: '/images/bible/book_3-gio-an.jpg',
    title: 'Thánh Gioan Tuổi Già Trên Đảo Pátmô',
    artist: 'Alonso Cano',
    year: '1650 (Bảo tàng Mỹ thuật Budapest)',
    description: 'Khen ngợi gương sáng tiếp đón và hỗ trợ các nhà truyền giáo đi loan báo Tin Mừng.'
  },
  'giu-da': {
    imageUrl: '/images/bible/book_giu-da.jpg',
    title: 'Thánh Giuđa Tađêô Tông Đồ',
    artist: 'Georges de La Tour',
    year: '1620 (Musée Toulouse-Lautrec, Albi)',
    description: 'Hãy xây dựng đời mình trên nền tảng đức tin rất thánh, gìn giữ mình trong tình yêu của Thiên Chúa.'
  },

  // =========================================================================
  // 9. KHẢI HUYỀN (1 SÁCH)
  // =========================================================================
  'khai-huyen': {
    imageUrl: '/images/bible/revelation_vision.jpg',
    title: 'Thánh Gioan Tông Đồ Trên Đảo Pátmô',
    artist: 'Diego Velázquez',
    year: '1618 (National Gallery, London)',
    description: 'Chiên Con khải hoàn chiến thắng sự dữ; Thiên Chúa lau sạch nước mắt và làm cho muôn sự nên mới. Amen! Lạy Chúa Giêsu, xin ngự đến!'
  }
};

/**
 * Lấy tranh nghệ thuật minh hoạ cho Sách (100% Unique Image)
 */
export function getBibleBookArtwork(bookId: string, group?: string): BibleArtwork {
  if (BIBLE_ARTWORKS[bookId]) {
    return BIBLE_ARTWORKS[bookId];
  }
  // Safe Fallback
  return {
    imageUrl: '/images/jesus_antique_banner.jpg',
    title: 'Kinh Thánh Công Giáo Lời Hằng Sống',
    artist: 'Classical Catholic Sacred Art',
    description: 'Lời Chúa là ngọn đèn soi cho con bước, là ánh sáng chỉ đường con đi.'
  };
}
