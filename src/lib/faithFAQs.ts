export interface FaithFAQ {
  id: string;
  category: "giao-ly" | "phung-vu" | "bi-tich" | "luan-ly" | "hon-nhan" | "cau-nguyen" | "gioi-tre";
  categoryLabel: string;
  categoryIcon: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string[];
  reference?: string;
  tags: string[];
}

export const FAITH_CATEGORIES = [
  {
    "id": "all",
    "label": "Tất Cả",
    "icon": "✨"
  },
  {
    "id": "giao-ly",
    "label": "Giáo Lý & Đức Tin",
    "icon": "📖"
  },
  {
    "id": "bi-tich",
    "label": "7 Bí Tích",
    "icon": "🕊️"
  },
  {
    "id": "phung-vu",
    "label": "Phụng Vụ & Thánh Lễ",
    "icon": "⛪"
  },
  {
    "id": "luan-ly",
    "label": "Luân Lý & 10 Điều Răn",
    "icon": "⚖️"
  },
  {
    "id": "hon-nhan",
    "label": "Hôn Nhân & Gia Đình",
    "icon": "👨‍👩‍👧‍👦"
  },
  {
    "id": "cau-nguyen",
    "label": "Kinh Nguyện & Mân Côi",
    "icon": "📿"
  },
  {
    "id": "gioi-tre",
    "label": "Thắc Mắc Giới Trẻ",
    "icon": "💡"
  }
] as const;

export const FAITH_FAQS: FaithFAQ[] = [
  {
    "id": "thien-chua-ba-ngoi",
    "category": "giao-ly",
    "categoryLabel": "Giáo Lý & Đức Tin",
    "categoryIcon": "📖",
    "question": "Mầu nhiệm Thiên Chúa Ba Ngôi là gì?",
    "shortAnswer": "Thiên Chúa là duy nhất, nhưng Người có Ba Ngôi bằng nhau: Chúa Cha, Chúa Con và Chúa Thánh Thần.",
    "detailedAnswer": [
      "Mầu nhiệm Chúa Ba Ngôi là mầu nhiệm trung tâm của đức tin và đời sống Kitô giáo. Chỉ có một Thiên Chúa duy nhất, nhưng Thiên Chúa ấy có Ba Ngôi: Chúa Cha, Chúa Con và Chúa Thánh Thần.",
      "Ba Ngôi không phải là ba Thiên Chúa, mà là một Thiên Chúa duy nhất trong Ba Ngôi Vị phân biệt nhưng cùng một bản tính thần linh duy nhất.",
      "Chúa Cha sinh ra Chúa Con, Chúa Con được sinh ra từ Chúa Cha, và Chúa Thánh Thần nhiệm xuất từ Chúa Cha và Chúa Con. Mọi công trình tạo dựng, cứu chuộc và thánh hóa đều là công trình chung của Ba Ngôi Thiên Chúa."
    ],
    "reference": "GLHTCG số 232 - 267; Toát Yếu số 44 - 49",
    "tags": [
      "ba ngôi",
      "thiên chúa",
      "chúa cha",
      "chúa con",
      "chúa thánh thần",
      "mầu nhiệm"
    ]
  },
  {
    "id": "duc-giesu-nhap-the",
    "category": "giao-ly",
    "categoryLabel": "Giáo Lý & Đức Tin",
    "categoryIcon": "📖",
    "question": "Tại sao Con Thiên Chúa lại nhập thể làm người?",
    "shortAnswer": "Con Thiên Chúa làm người để cứu chuộc nhân loại khỏi tội lỗi, hòa giải con người với Thiên Chúa và mạc khải tình yêu vô biên của Ngài.",
    "detailedAnswer": [
      "Để cứu chuộc chúng ta bằng cách hòa giải chúng ta với Thiên Chúa: Đền thay tội lỗi bất phục tùng của loài người.",
      "Để chúng ta nhận biết tình yêu Thiên Chúa: \"Thiên Chúa yêu thế gian đến nỗi đã ban Con Một\" (Ga 3, 16).",
      "Để trở nên mẫu gương thánh thiện cho chúng ta noi theo trong đời sống hằng ngày.",
      "Để làm cho con người được thông phần vào bản tính thần linh của Thiên Chúa qua ân sủng."
    ],
    "reference": "GLHTCG số 456 - 460; Toát Yếu số 85",
    "tags": [
      "nhập thể",
      "chúa giêsu",
      "cứu độ",
      "giáng sinh",
      "tình yêu thiên chúa"
    ]
  },
  {
    "id": "bon-dac-tinh-hoi-thanh",
    "category": "giao-ly",
    "categoryLabel": "Giáo Lý & Đức Tin",
    "categoryIcon": "📖",
    "question": "Bốn đặc tính của Hội Thánh Công Giáo là gì?",
    "shortAnswer": "Hội Thánh là Duy Nhất, Thánh Thiện, Công Giáo và Tông Truyền.",
    "detailedAnswer": [
      "Duy nhất: Vì có một Thiên Chúa, một Đức tin, một Phép rửa, một Thân thể mầu nhiệm dưới sự lãnh đạo của Đức Giáo Hoàng và các Giám mục.",
      "Thánh thiện: Vì Đấng sáng lập là Đức Kitô là Đấng Thánh, và Chúa Thánh Thần luôn thánh hóa Hội Thánh qua các Bí tích và Lời Chúa.",
      "Công giáo (Phổ quát): Vì được sai đi loan báo Tin Mừng cho muôn dân thuộc mọi thời đại và mọi nền văn hóa.",
      "Tông truyền: Vì được xây dựng trên nền tảng các Tông đồ và được tiếp nối qua các vị Giám mục kế vị các Tông đồ."
    ],
    "reference": "GLHTCG số 811 - 870; Kinh Tin Kính",
    "tags": [
      "hội thánh",
      "duy nhất",
      "thánh thiện",
      "công giáo",
      "tông truyền"
    ]
  },
  {
    "id": "duc-me-hon-xac-len-troi",
    "category": "giao-ly",
    "categoryLabel": "Giáo Lý & Đức Tin",
    "categoryIcon": "📖",
    "question": "Bốn đặc ân cao trọng của Đức Mẹ Maria là gì?",
    "shortAnswer": "Đức Mẹ là Mẹ Thiên Chúa, Vô Nhiễm Nguyên Tội, Trọn Đời Đồng Trinh và Hồn Xác Lên Trời.",
    "detailedAnswer": [
      "Mẹ Thiên Chúa (Theotokos): Tín điều tuyên tín tại Công đồng Êphêsô (431), vì Người sinh ra Chúa Giêsu là Thiên Chúa thật và là người thật.",
      "Vô Nhiễm Nguyên Tội (Immaculata Conceptio): Tuyên bố bởi ĐGH Piô IX (1854), Mẹ được gìn giữ khỏi mọi vết nhơ tội nguyên tổ ngay từ lúc thụ thai.",
      "Trọn Đời Đồng Trinh (Semper Virgo): Mẹ thụ thai bởi Chúa Thánh Thần và trọn đời đồng trinh trước, trong và sau khi sinh Chúa Giêsu.",
      "Hồn Xác Lên Trời (Assumptio): Tuyên tín bởi ĐGH Piô XII (1950), sau khi hoàn tất cuộc đời trần thế, Mẹ được đưa cả hồn lẫn xác về vinh quang thiên quốc."
    ],
    "reference": "GLHTCG số 487 - 511, 963 - 975",
    "tags": [
      "đức mẹ",
      "vô nhiễm",
      "mẹ thiên chúa",
      "đồng trinh",
      "hồn xác lên trời"
    ]
  },
  {
    "id": "luyen-nguc-va-cau-cho-cac-linh-hon",
    "category": "giao-ly",
    "categoryLabel": "Giáo Lý & Đức Tin",
    "categoryIcon": "📖",
    "question": "Luyện ngục là gì? Tại sao người Công Giáo cầu nguyện cho các linh hồn?",
    "shortAnswer": "Luyện ngục là tình trạng thanh tẩy sau khi chết để đạt sự thánh thiện cần thiết trước khi vào Thiên Đàng. Lời cầu nguyện và Thánh lễ giúp các linh hồn sớm hưởng nhan Chúa.",
    "detailedAnswer": [
      "Những ai chết trong ân sủng và tình bạn của Thiên Chúa nhưng chưa được thanh tẩy hoàn toàn thì phải trải qua sự thanh luyện (Luyện ngục) để đạt được sự tinh tuyền bước vào hoan lạc Thiên Đàng.",
      "Mầu nhiệm Các Thánh Cùng Thông Công cho phép các tín hữu còn sống hiệp thông và giúp đỡ các đẳng linh hồn qua Thánh Lễ, lời cầu nguyện, việc bố thí và ân xá.",
      "Sách Kinh Thánh 2 Macabê 12, 46 dạy: \"Đó là ý nghĩ đạo đức và thánh thiện khi dâng lễ đền tội cho những người đã chết, để họ được giải thoát khỏi tội lỗi.\""
    ],
    "reference": "GLHTCG số 1030 - 1032; 2 Mcb 12, 46",
    "tags": [
      "luyện ngục",
      "các linh hồn",
      "cầu nguyện",
      "thánh lễ",
      "thanh luyện"
    ]
  },
  {
    "id": "thien-than-va-thien-than-ban-menh",
    "category": "giao-ly",
    "categoryLabel": "Giáo Lý & Đức Tin",
    "categoryIcon": "📖",
    "question": "Thiên Thần Bản Mệnh (Thiên thần Hộ thủ) có vai trò gì với mỗi người chúng ta?",
    "shortAnswer": "Mỗi tín hữu từ lúc khởi đầu sự sống cho đến khi lìa đời đều có một Thiên Thần Bản Mệnh ở bên cạnh để bảo vệ, hướng dẫn và bầu cử trước nhan Thiên Chúa.",
    "detailedAnswer": [
      "Thiên thần là thụ tạo thiêng liêng thuần túy thiêng liêng, có trí hiểu và ý chí, không có thân xác, được Thiên Chúa dựng nên để phụng sự và ca tụng Người.",
      "Thánh Vịnh 91, 11 khẳng định: \"Người truyền cho thiên sứ giữ gìn bạn trên khắp nẻo đường.\"",
      "Thiên Thần Bản Mệnh không ngừng soi sáng lương tâm, thúc đẩy làm điều lành, gìn giữ khỏi chước cám dỗ của ma quỷ và đưa lời cầu nguyện của chúng ta lên trước Tòa Chúa."
    ],
    "reference": "GLHTCG số 328 - 336; Tv 91, 11-12",
    "tags": [
      "thiên thần",
      "thiên thần hộ thủ",
      "bản mệnh",
      "bảo vệ",
      "cầu nguyện"
    ]
  },
  {
    "id": "phuc-sinh-va-than-xac-song-lai",
    "category": "giao-ly",
    "categoryLabel": "Giáo Lý & Đức Tin",
    "categoryIcon": "📖",
    "question": "Người Công Giáo tin gì về sự sống lại của thân xác ngày sau hết?",
    "shortAnswer": "Vào ngày tận thế, Đức Kitô sẽ ngự đến phán xét kẻ sống và kẻ chết, thân xác con người sẽ được phục sinh và kết hợp lại với linh hồn mãi mãi.",
    "detailedAnswer": [
      "Như Đức Kitô đã thực sự sống lại từ cõi chết và hằng sống muôn đời, những người công chính sau khi chết cũng sẽ được sống lại với Đức Kitô vào ngày sau hết.",
      "Thân xác phải hư nát của chúng ta sẽ được biến đổi nên thần thiêng, bất tử, giống như thân xác phục sinh vinh hiển của Chúa Kitô.",
      "Những ai làm lành sẽ sống lại để hưởng sự sống đời đời, còn những ai làm sự dữ và từ chối ơn tha thứ sẽ sống lại để chịu án phạt đời đời."
    ],
    "reference": "GLHTCG số 988 - 1004; 1 Cr 15, 12-58",
    "tags": [
      "sống lại",
      "phục sinh",
      "thân xác",
      "ngày sau hết",
      "thiên đàng"
    ]
  },
  {
    "id": "y-nghia-bi-tich-rua-toi",
    "category": "bi-tich",
    "categoryLabel": "7 Bí Tích",
    "categoryIcon": "🕊️",
    "question": "Bí tích Rửa Tội ban những ơn ích gì cho người lãnh nhận?",
    "shortAnswer": "Tẩy xóa tội nguyên tổ và mọi tội cá nhân, biến người thụ tẩy thành con cái Thiên Chúa, chi thể của Hội Thánh và đón nhận ấn tín thiêng liêng vĩnh viễn.",
    "detailedAnswer": [
      "Tẩy xóa tội nguyên tổ (tội tổ tông truyền) và mọi tội riêng đã phạm trước đó, cùng mọi hình phạt vì tội.",
      "Tái sinh làm con cái Thiên Chúa, thông phần vào Thần tính của Đức Kitô và trở nên đền thờ của Chúa Thánh Thần.",
      "Gia nhập vào Hội Thánh, Thân Thể Mầu Nhiệm của Chúa Kitô và tham dự vào chức tư tế cộng đồng của Đức Kitô.",
      "Ghi vào linh hồn một ấn tín thiêng liêng không thể tẩy xóa (dấu ấn vĩnh viễn), do đó Bí tích Rửa Tội chỉ lãnh nhận một lần duy nhất."
    ],
    "reference": "GLHTCG số 1213 - 1284; Toát Yếu số 252 - 264",
    "tags": [
      "rửa tội",
      "bí tích",
      "tái sinh",
      "con cái chúa",
      "tội nguyên tổ"
    ]
  },
  {
    "id": "bi-tich-them-suc-la-gi",
    "category": "bi-tich",
    "categoryLabel": "7 Bí Tích",
    "categoryIcon": "🕊️",
    "question": "Bí tích Thêm Sức đem lại những ơn ích đặc biệt nào?",
    "shortAnswer": "Ban tràn đầy Chúa Thánh Thần với 7 ơn thiêng, củng cố đức tin và trao sứ vụ làm chứng nhân cho Chúa Kitô giữa trần gian.",
    "detailedAnswer": [
      "Bí tích Thêm Sức làm cho ơn Rửa Tội được nên trọn hảo, liên kết người tín hữu mật thiết hơn với Hội Thánh.",
      "Ban ơn Chúa Thánh Thần dồi dào với 7 ơn thiêng: Khôn ngoan, Hiểu biết, Lo liệu, Sức mạnh, Thông minh, Đạo đức, và Kính sợ Chúa.",
      "Ghi dấu ấn tín thiêng liêng không thể phai mờ, trao ban sức mạnh đặc biệt để người tín hữu can đảm tuyên xưng, bảo vệ và truyền bá đức tin bằng lời nói và việc làm."
    ],
    "reference": "GLHTCG số 1285 - 1321; Toát Yếu số 265 - 270",
    "tags": [
      "thêm sức",
      "chúa thánh thần",
      "7 ơn chúa",
      "chứng nhân",
      "ấn tín"
    ]
  },
  {
    "id": "bi-tich-thanh-the-hien-dien-thuc-su",
    "category": "bi-tich",
    "categoryLabel": "7 Bí Tích",
    "categoryIcon": "🕊️",
    "question": "Bánh và Rượu trong Thánh Lễ thực sự trở thành Mình và Máu Chúa Kitô như thế nào?",
    "shortAnswer": "Qua lời truyền phép của Linh mục và quyền năng Chúa Thánh Thần, toàn bộ bản thể bánh và rượu biến đổi thành Thịt và Máu thật của Chúa Kitô (sự biến bản thể).",
    "detailedAnswer": [
      "Bí tích Thánh Thể là nguồn mạch và đỉnh cao của toàn bộ đời sống Kitô giáo. Trong Bí tích này, Chúa Giêsu Kitô hiện diện thực sự, sống động và trọn vẹn: Mình, Máu, Linh Hồn và Thần Tính của Ngài.",
      "Giáo lý Hội Thánh gọi sự biến đổi này là \"Biến bản thể\" (Transubstantiatio): dù hình thể bề ngoài (màu sắc, mùi vị, khối lượng) vẫn giữ nguyên là bánh và rượu, nhưng bản thể đích thực bên trong đã hoàn toàn trở thành Mình và Máu Chúa Giêsu.",
      "Chúa Giêsu hiện diện trong từng phần nhỏ nhất của tấm bánh và giọt rượu đã truyền phép chừng nào hình bánh và rượu còn tồn tại."
    ],
    "reference": "GLHTCG số 1373 - 1381; Toát Yếu số 282 - 286",
    "tags": [
      "thánh thể",
      "mình thánh chúa",
      "biến bản thể",
      "thánh lễ",
      "hiện diện thật"
    ]
  },
  {
    "id": "dieu-kien-xung-toi-nen-thanh",
    "category": "bi-tich",
    "categoryLabel": "7 Bí Tích",
    "categoryIcon": "🕊️",
    "question": "Năm điều kiện cần thiết để việc Xưng Tội được thành sự và có ơn ích là gì?",
    "shortAnswer": "1. Xét mình; 2. Ăn năn tội; 3. Dốc lòng chừa; 4. Xưng tội rõ ràng; 5. Làm việc đền tội.",
    "detailedAnswer": [
      "1. Xét mình: Hồi tâm dưới ánh sáng Lời Chúa và 10 Điều Răn để nhận ra mọi tội lỗi đã phạm qua tư tưởng, lời nói, việc làm và những điều thiếu sót.",
      "2. Ăn năn tội: Đau buồn chân thành vì đã xúc phạm đến Thiên Chúa là Đấng vô cùng nhân từ và trọn tốt trọn lành.",
      "3. Dốc lòng chừa: Quyết tâm cương quyết từ bỏ tội lỗi và tránh xa các dịp tội có thể dẫn đến việc phạm tội.",
      "4. Xưng tội cùng Linh Mục: Xưng đầy đủ, thành thật mọi tội trọng theo số lần và hoàn cảnh, không được cố tình giấu bất kỳ tội trọng nào.",
      "5. Làm việc đền tội: Sốt sắng thi hành các kinh nguyện hoặc việc bác ái mà Linh mục giải tội đã trao ban để đền bù những thiệt hại do tội gây ra."
    ],
    "reference": "GLHTCG số 1450 - 1460; Toát Yếu số 303 - 308",
    "tags": [
      "xưng tội",
      "hoà giải",
      "xét mình",
      "ăn năn tội",
      "dốc lòng chừa",
      "đền tội"
    ]
  },
  {
    "id": "an-bi-mat-giai-toi",
    "category": "bi-tich",
    "categoryLabel": "7 Bí Tích",
    "categoryIcon": "🕊️",
    "question": "Ấn tín Tòa Giải Tội (Bí mật giải tội) của Linh Mục tuyệt đối đến mức nào?",
    "shortAnswer": "Tuyệt đối không thể vi phạm. Linh mục không được phép tiết lộ bất kỳ điều gì đã nghe trong tòa giải tội vì bất cứ lý do nào, kể cả khi bị đe dọa tính mạng.",
    "detailedAnswer": [
      "Hội Thánh tuyên bố mọi linh mục giải tội bị buộc dưới những hình phạt nặng nhất phải giữ bí mật tuyệt đối về các tội mà hối nhân đã xưng.",
      "Linh mục giải tội không được tiết lộ tội lỗi của hối nhân bằng bất cứ lời nói, dấu hiệu hay hành động nào, trong bất kỳ hoàn cảnh nào, trước bất kỳ tòa án hay quyền lực trần gian nào.",
      "Linh mục cố tình vi phạm ấn tín tòa giải tội sẽ bị vạ tuyệt thông tiền kết (Latae Sententiae) dành riêng cho Tòa Thánh giải vạ."
    ],
    "reference": "Giáo luật Điều 983, 1388; GLHTCG số 1467",
    "tags": [
      "bí mật giải tội",
      "ấn tín",
      "linh mục",
      "xưng tội",
      "giáo luật"
    ]
  },
  {
    "id": "bi-tich-xuc-dau-benh-nhan",
    "category": "bi-tich",
    "categoryLabel": "7 Bí Tích",
    "categoryIcon": "🕊️",
    "question": "Khi nào cần xin lãnh nhận Bí tích Xức Dầu Bệnh Nhân?",
    "shortAnswer": "Bí tích Xức Dầu dành cho bất kỳ tín hữu nào bắt đầu gặp nguy hiểm vì bệnh tật nặng hoặc tuổi già, chứ KHÔNG phải chỉ chờ đến phút lâm chung.",
    "detailedAnswer": [
      "Trước đây thường gọi là \"Phép Xức Dầu Sau Cùng\", nhưng Công đồng Vaticanô II đã làm sáng tỏ: đây là Bí tích chữa lành và ban ơn nâng đỡ người đau bệnh.",
      "Thời điểm thích hợp để lãnh nhận: khi một người bắt đầu lâm cơn bệnh nặng, trước khi bước vào ca phẫu thuật nguy hiểm, hoặc khi tuổi già sức yếu suy sụp dần.",
      "Hiệu quả của Bí tích: ban ơn an ủi, can đảm, bình an của Thánh Thần, tha thứ tội lỗi và nếu đẹp lòng Chúa, có thể phục hồi sức khoẻ thể xác."
    ],
    "reference": "GLHTCG số 1511 - 1515; Thư Giacôbê 5, 14-15",
    "tags": [
      "xức dầu",
      "bệnh nhân",
      "chữa lành",
      "người cao tuổi",
      "bình an"
    ]
  },
  {
    "id": "bi-tich-truyen-chuc-thanh",
    "category": "bi-tich",
    "categoryLabel": "7 Bí Tích",
    "categoryIcon": "🕊️",
    "question": "Bí tích Truyền Chức Thánh gồm những bậc nào?",
    "shortAnswer": "Gồm ba cấp bậc: Giám Mục (cực phẩm chức thánh), Linh Mục (cộng tác viên của Giám mục) và Phó Tế (thừa tác vụ phục vụ).",
    "detailedAnswer": [
      "Giám mục (Episcopatus): Cấp bậc trọn hảo của Chức Thánh, tiếp nối sứ vụ các Tông đồ, là chủ chăn của Giáo phận và thành viên của Giám mục đoàn.",
      "Linh mục (Presbyteratus): Những người hiệp nhất với Giám mục trong phẩm trật tư tế, được thánh hiến để công bố Tin Mừng, cử hành Thánh Lễ và ban các Bí tích.",
      "Phó tế (Diaconatus): Được phong chức không phải để làm tư tế mà để thi hành thừa tác vụ phục vụ trong phụng vụ Lời Chúa, việc rửa tội, chứng hôn và các công việc bác ái."
    ],
    "reference": "GLHTCG số 1536 - 1600; Toát Yếu số 321 - 336",
    "tags": [
      "truyền chức",
      "giám mục",
      "linh mục",
      "phó tế",
      "chức thánh"
    ]
  },
  {
    "id": "thanh-le-chua-nhat-y-nghia",
    "category": "phung-vu",
    "categoryLabel": "Phụng Vụ & Thánh Lễ",
    "categoryIcon": "⛪",
    "question": "Tại sao người Công Giáo bắt buộc phải tham dự Thánh Lễ Chúa Nhật?",
    "shortAnswer": "Chúa Nhật là ngày của Chúa, kỷ niệm Chúa Phục Sinh. Tham dự Thánh Lễ là lời tạ ơn và đón nhận nguồn sống từ Lời Chúa và Thánh Thể.",
    "detailedAnswer": [
      "Chúa Nhật là Ngày của Chúa (Dies Domini), ngày Chúa Giêsu Kitô khải hoàn phục sinh từ cõi chết, khai mở công trình cứu chuộc nhân loại.",
      "Việc tham dự Thánh Lễ Chúa Nhật là điều răn thứ ba của Thiên Chúa và là điều răn thứ nhất của Hội Thánh: \"Giữ ngày Chúa Nhật và các ngày lễ buộc\".",
      "Thánh Lễ không chỉ là bổn phận mà là đặc ân vô giá: nơi cộng đoàn tín hữu quy tụ để lắng nghe Lời Chúa, hiệp nhất trong tình bác ái và đón rước Mình Máu Thánh Chúa Kitô.",
      "Bỏ lễ Chúa Nhật mà không có lý do chính đáng (như ốm đau nặng, chăm sóc người bệnh nguy tử, hoặc ngăn trở bất khả kháng) là mắc tội trọng."
    ],
    "reference": "GLHTCG số 2174 - 2188; Giáo luật điều 1247",
    "tags": [
      "thánh lễ",
      "chúa nhật",
      "bổn phận",
      "luật hội thánh",
      "phục sinh"
    ]
  },
  {
    "id": "cac-ngay-le-buoc-tai-viet-nam",
    "category": "phung-vu",
    "categoryLabel": "Phụng Vụ & Thánh Lễ",
    "categoryIcon": "⛪",
    "question": "Hội Thánh tại Việt Nam quy định những ngày Lễ Buộc nào trong năm?",
    "shortAnswer": "Ngoài tất cả các ngày Chúa Nhật, tại Việt Nam có 4 ngày Lễ Buộc: Lễ Giáng Sinh, Lễ Mẹ Thiên Chúa, Lễ Chúa Thăng Thiên và Lễ Đức Mẹ Hồn Xác Lên Trời.",
    "detailedAnswer": [
      "Theo Giáo luật chung, có 10 ngày Lễ Trọng buộc đi lễ. Tuy nhiên, Hội đồng Giám mục Việt Nam với sự chuẩn nhận của Tòa Thánh quy định 4 ngày lễ buộc chính:",
      "1. Lễ Chúa Giáng Sinh (25/12)",
      "2. Lễ Đức Maria Mẹ Thiên Chúa (01/01)",
      "3. Lễ Chúa Thăng Thiên (thường cử hành vào Chúa Nhật VII Phục Sinh)",
      "4. Lễ Đức Mẹ Hồn Xác Lên Trời (15/08)",
      "Vào các ngày này, người tín hữu có bổn phận tham dự Thánh Lễ và kiêng các công việc xác không cần thiết như ngày Chúa Nhật."
    ],
    "reference": "Giáo luật Điều 1246; HĐGM Việt Nam",
    "tags": [
      "lễ buộc",
      "giáng sinh",
      "mẹ thiên chúa",
      "thăng thiên",
      "hồn xác lên trời"
    ]
  },
  {
    "id": "giu-chay-truoc-khi-ruoc-le",
    "category": "phung-vu",
    "categoryLabel": "Phụng Vụ & Thánh Lễ",
    "categoryIcon": "⛪",
    "question": "Quy định giữ chay (kiêng ăn uống) trước khi Rước Lễ là bao lâu?",
    "shortAnswer": "Cần kiêng mọi thức ăn và thức uống trong vòng ít nhất 1 giờ trước khi rước lễ, ngoại trừ nước lọc và thuốc men.",
    "detailedAnswer": [
      "Theo Giáo luật điều 919 §1: Người sắp rước Thánh Thể phải kiêng mọi thức ăn thức uống trong khoảng thời gian ít nhất là 1 giờ trước khi rước lễ, chỉ trừ nước lã và thuốc men.",
      "Mục đích của việc giữ chay Thánh Thể là để bày tỏ lòng tôn kính, sự chuẩn bị tâm hồn và thân xác xứng hợp trước khi đón nhận Mình Thánh Chúa Kitô.",
      "Trường hợp miễn chuẩn (Điều 919 §3): Người cao tuổi, người đau yếu liệt giường hoặc những người chăm sóc họ có thể rước lễ dù có ăn uống chút ít trước đó."
    ],
    "reference": "Bộ Giáo Luật 1983, Điều 919",
    "tags": [
      "rước lễ",
      "giữ chay",
      "thánh thể",
      "giáo luật",
      "người cao tuổi"
    ]
  },
  {
    "id": "y-nghia-mua-chay-va-kieng-thit",
    "category": "phung-vu",
    "categoryLabel": "Phụng Vụ & Thánh Lễ",
    "categoryIcon": "⛪",
    "question": "Luật Giữ Chay và Kiêng Thịt trong Mùa Chay áp dụng cho những độ tuổi nào?",
    "shortAnswer": "Giữ chay áp dụng cho người từ đủ 18 đến trọn 59 tuổi (vào Thứ Tư Lễ Tro và Thứ Sáu Tuần Thánh). Kiêng thịt áp dụng cho người từ đủ 14 tuổi trở lên.",
    "detailedAnswer": [
      "Hội Thánh Công Giáo quy định 2 ngày buộc cả GIỮ CHAY và KIÊNG THỊT trong năm: Thứ Tư Lễ Tro và Thứ Sáu Tuần Thánh.",
      "Luật Kiêng Thịt: Buộc mọi tín hữu từ đủ 14 tuổi trở lên (vào các ngày Thứ Sáu Mùa Chay và 2 ngày giữ chay). Kiêng thịt các loài động vật máu nóng trên cạn, được phép ăn cá, tôm, hải sản và trứng sữa.",
      "Luật Giữ Chay: Buộc mọi tín hữu từ đủ 18 tuổi đến trọn 59 tuổi. Chỉ ăn một bữa no trọn vẹn trong ngày, hai bữa kia có thể ăn nhẹ nhưng không thành một bữa ăn bình thường, và không ăn vặt giữa các bữa.",
      "Miễn chuẩn: Người đau yếu, phụ nữ mang thai hoặc cho con bú, người lao động nặng nhọc được miễn giữ chay."
    ],
    "reference": "Bộ Giáo Luật Điều 1249 - 1253",
    "tags": [
      "mùa chay",
      "giữ chay",
      "kiêng thịt",
      "lễ tro",
      "thứ sáu tuần thánh"
    ]
  },
  {
    "id": "y-nghia-mau-ao-le",
    "category": "phung-vu",
    "categoryLabel": "Phụng Vụ & Thánh Lễ",
    "categoryIcon": "⛪",
    "question": "Ý nghĩa các màu phẩm phục (áo lễ) trong Phụng Vụ Công Giáo là gì?",
    "shortAnswer": "Trắng (Hân hoan, Phục sinh), Đỏ (Khổ nạn, Chúa Thánh Thần, Tử đạo), Xanh lá (Mùa Thường niên, Hy vọng), Tím (Mùa Vọng, Mùa Chay, Sám hối), Hồng (Vui mừng).",
    "detailedAnswer": [
      "Màu Trắng: Tượng trưng cho ánh sáng, sự tinh tuyền, niềm vui Phục Sinh. Dùng trong Mùa Phục Sinh, Mùa Giáng Sinh, các lễ kính Chúa Kitô, Đức Mẹ và các Thánh không tử đạo.",
      "Màu Đỏ: Tượng trưng cho Máu hy sinh và Lửa tình yêu Thánh Thần. Dùng vào Chúa Nhật Lễ Lá, Thứ Sáu Tuần Thánh, Lễ Hiện Xuống và các lễ kính các Thánh Tử Đạo.",
      "Màu Xanh lá cây: Tượng trưng cho niềm hy vọng, sự sống và phát triển đức tin. Dùng trong các ngày Mùa Thường Niên.",
      "Màu Tím: Tượng trưng cho sự sám hối, đền tội, tỉnh thức và chờ đợi. Dùng trong Mùa Vọng, Mùa Chay và Phụng vụ Cầu hồn.",
      "Màu Hồng: Biểu hiện niềm vui giữa thời gian sám hối, dùng vào Chúa Nhật III Mùa Vọng (Gaudete) và Chúa Nhật IV Mùa Chay (Laetare)."
    ],
    "reference": "Quy Chế Tổng Quát Sách Lễ Rôma (GIRM) số 346",
    "tags": [
      "áo lễ",
      "màu phụng vụ",
      "mùa chay",
      "mùa vọng",
      "phục sinh",
      "thường niên"
    ]
  },
  {
    "id": "phan-biet-toi-trong-va-toi-nhe",
    "category": "luan-ly",
    "categoryLabel": "Luân Lý & 10 Điều Răn",
    "categoryIcon": "⚖️",
    "question": "Làm thế nào để phân biệt Tội Trọng và Tội Nhẹ?",
    "shortAnswer": "Tội trọng làm mất ơn nghĩa Chúa và đòi hỏi 3 yếu tố: phạm điều hệ trọng, hoàn toàn ý thức và cố tình ưng thuận. Tội nhẹ làm suy yếu đức mến nhưng không cắt đứt ơn nghĩa Chúa.",
    "detailedAnswer": [
      "Tội trọng phá hủy đức mến trong lòng người tín hữu bởi một vi phạm nghiêm trọng luật Thiên Chúa; làm cho con người quay lưng lại với Thiên Chúa. Để mắc tội trọng, cần hội đủ 3 điều kiện:",
      "1. Vấn đề nghiêm trọng: Phạm trực tiếp đến 10 Điều Răn Chúa hoặc điều luật trọng đại của Hội Thánh.",
      "2. Hoàn toàn ý thức: Biết rõ hành vi đó là tội lỗi nghiêm trọng xúc phạm đến Chúa.",
      "3. Hoàn toàn ưng thuận: Tự do và cố tình chọn lựa làm điều tội lỗi đó.",
      "Tội nhẹ: Là vi phạm luật luân lý trong vấn đề nhẹ, hoặc trong vấn đề nặng nhưng chưa hoàn toàn ý thức hoặc chưa hoàn toàn ưng thuận."
    ],
    "reference": "GLHTCG số 1854 - 1864; Toát Yếu số 394 - 396",
    "tags": [
      "tội trọng",
      "tội nhẹ",
      "luân lý",
      "xét mình",
      "ơn nghĩa chúa"
    ]
  },
  {
    "id": "quan-diem-ve-pha-thai-va-su-song",
    "category": "luan-ly",
    "categoryLabel": "Luân Lý & 10 Điều Răn",
    "categoryIcon": "⚖️",
    "question": "Lập trường của Hội Thánh Công Giáo về việc bảo vệ sự sống và phá thai là gì?",
    "shortAnswer": "Sự sống con người là thánh thiêng từ giây phút thụ thai cho đến khi chết tự nhiên. Phá thai trực tiếp là tội ác nghiêm trọng nghịch điều răn thứ năm: \"Chớ giết người\".",
    "detailedAnswer": [
      "Sự sống con người là quà tặng thiêng liêng thuộc quyền tối thượng của Thiên Chúa. Ngay từ giây phút thụ thai, phôi thai đã là một nhân vị con người hoàn chỉnh có quyền sống bất khả xâm phạm.",
      "Hội Thánh kiên quyết lên án việc phá thai trực tiếp dưới mọi hình thức như một tội ác chống lại sự sống.",
      "Người trực tiếp thực hiện hoặc tiếp tay dẫn đến việc phá thai thành công đều mắc vạ tuyệt thông tiền kết (Latae Sententiae) theo Giáo luật điều 1398.",
      "Hội Thánh luôn mở rộng vòng tay tha thứ và chữa lành qua Bí tích Hòa Giải cho những người mẹ và những ai đã lầm lỡ nhưng thật lòng ăn năn sám hối."
    ],
    "reference": "GLHTCG số 2270 - 2275; Thông điệp Evangelium Vitae",
    "tags": [
      "sự sống",
      "phá thai",
      "chớ giết người",
      "nhân phẩm",
      "luân lý"
    ]
  },
  {
    "id": "10-dieu-ran-duc-chua-troi",
    "category": "luan-ly",
    "categoryLabel": "Luân Lý & 10 Điều Răn",
    "categoryIcon": "⚖️",
    "question": "Mười Điều Răn Đức Chúa Trời được tóm gọn trong giới răn nào?",
    "shortAnswer": "Được tóm gọn trong Giới Răn Kính Mến: \"Mến Chúa trên hết mọi sự và Yêu người như chính mình\".",
    "detailedAnswer": [
      "3 Điều Răn đầu dạy bổn phận thảo kính đối với Thiên Chúa (Thờ phượng một Đức Chúa Trời, Chớ kêu tên Chúa vô cớ, Giữ ngày Chúa Nhật).",
      "7 Điều Răn sau dạy bổn phận bác ái đối với tha nhân (Thảo kính cha mẹ, Chớ giết người, Chớ dâm dục, Chớ trộm cắp, Chớ làm chứng dối, Chớ muốn vợ chồng người, Chớ tham lam của cải người).",
      "Chúa Giêsu đã đúc kết toàn bộ Lề Luật trong hai giới răn: Kính mến Thiên Chúa hết lòng, hết linh hồn, hết trí khôn và Yêu thương người thân cận như chính mình (Mt 22, 37-40)."
    ],
    "reference": "GLHTCG số 2052 - 2082; Mt 22, 34-40",
    "tags": [
      "10 điều răn",
      "mến chúa",
      "yêu người",
      "luân lý",
      "lề luật"
    ]
  },
  {
    "id": "luong-tam-va-tieng-noi-thien-chua",
    "category": "luan-ly",
    "categoryLabel": "Luân Lý & 10 Điều Răn",
    "categoryIcon": "⚖️",
    "question": "Lương tâm là gì và làm thế nào để đào tạo lương tâm ngay chính?",
    "shortAnswer": "Lương tâm là tiếng nói thâm sâu của Thiên Chúa bên trong con người, hối thúc làm lành lánh dữ. Cần đào tạo lương tâm bằng Lời Chúa, cầu nguyện và Giáo huấn Hội Thánh.",
    "detailedAnswer": [
      "Lương tâm là thánh điện bí mật nhất của con người, nơi con người hiện diện một mình với Thiên Chúa, Đấng mà tiếng Người vang dội trong nơi sâu thẳm tâm hồn.",
      "Lương tâm phán quyết luân lý về hành vi con người sắp làm hoặc đã làm: chấp thuận điều lành và tố giác điều dữ.",
      "Đào tạo lương tâm ngay chính bằng cách: thường xuyên đọc và suy gẫm Lời Chúa, học hỏi Giáo huấn Hội Thánh, năng cầu nguyện, xét mình mỗi tối và lãnh nhận Bí tích Hòa Giải."
    ],
    "reference": "GLHTCG số 1776 - 1802; Hiến chế Gaudium et Spes số 16",
    "tags": [
      "lương tâm",
      "luân lý",
      "làm lành lánh dữ",
      "đào tạo lương tâm"
    ]
  },
  {
    "id": "ket-hon-khac-dao-chuan-bi",
    "category": "hon-nhan",
    "categoryLabel": "Hôn Nhân & Gia Đình",
    "categoryIcon": "👨‍👩‍👧‍👦",
    "question": "Người Công Giáo kết hôn với người không cùng tôn giáo cần những điều kiện gì?",
    "shortAnswer": "Cần xin phép chuẩn hôn phối khác đạo từ Đức Giám Mục Giáo phận và cam kết giữ vững đức tin cùng rửa tội, giáo dục con cái theo đạo Công Giáo.",
    "detailedAnswer": [
      "Hội Thánh thừa nhận và chúc phúc cho hôn nhân dị giáo (khác đạo) khi có Phép Chuẩn (Dispensation) của Bản Quyền Giáo Phận.",
      "Bên Công Giáo tuyên bố sẵn sàng tránh mọi hiểm nguy làm mất đức tin, và thành thật cam kết sẽ làm hết sức để con cái sinh ra được rửa tội và giáo dục trong Hội Thánh Công Giáo.",
      "Bên không Công Giáo được thông báo rõ ràng về những lời cam kết của người bạn đời Công Giáo để thấu hiểu và tôn trọng quyền tự do tôn giáo của nhau.",
      "Cả hai cùng tham dự lớp Giáo Lý Hôn Nhân để hiểu rõ bản chất hôn nhân Công Giáo: duy nhất, bất khả phân ly và hướng về sự sinh sản, giáo dục con cái."
    ],
    "reference": "Bộ Giáo Luật Điều 1124 - 1129; GLHTCG 1633 - 1637",
    "tags": [
      "hôn nhân",
      "khác đạo",
      "phép chuẩn",
      "giáo lý hôn nhân",
      "gia đình"
    ]
  },
  {
    "id": "tinh-bat-kha-phan-ly-hon-nhan",
    "category": "hon-nhan",
    "categoryLabel": "Hôn Nhân & Gia Đình",
    "categoryIcon": "👨‍👩‍👧‍👦",
    "question": "Tại sao Hôn Nhân Công Giáo lại có đặc tính Bất Khả Phân Ly (không được ly dị)?",
    "shortAnswer": "Vì hôn nhân phản ánh giao ước tình yêu vĩnh cửu giữa Đức Kitô và Hội Thánh: \"Sự gì Thiên Chúa đã phối hợp, loài người không được phân ly\" (Mt 19, 6).",
    "detailedAnswer": [
      "Bí tích Hôn Phối thiết lập một mối dây liên kết vĩnh viễn và độc chiếm giữa hai người phối ngẫu được chính Thiên Chúa chuẩn nhận.",
      "Hôn nhân thành sự và đã hoàn hợp giữa hai người đã chịu phép Rửa Tội thì không bao giờ có thể bị tiêu hủy bởi bất cứ quyền lực trần gian nào, ngoại trừ cái chết.",
      "Sự bất khả phân ly bảo đảm sự an toàn, tôn trọng nhân phẩm người phối ngẫu và tạo môi trường ổn định tốt nhất để nuôi dạy con cái nên người."
    ],
    "reference": "GLHTCG số 1643 - 1651; Mt 19, 3-9; Mc 10, 9",
    "tags": [
      "hôn phối",
      "bất khả phân ly",
      "ly dị",
      "giao ước",
      "gia đình"
    ]
  },
  {
    "id": "giao-duc-duc-tin-cho-con-cai",
    "category": "hon-nhan",
    "categoryLabel": "Hôn Nhân & Gia Đình",
    "categoryIcon": "👨‍👩‍👧‍👦",
    "question": "Bổn phận giáo dục đức tin cho con cái của cha mẹ Công Giáo gồm những gì?",
    "shortAnswer": "Cha mẹ là những giáo lý viên đầu tiên và quan trọng nhất của con cái qua gương mẫu đời sống, cầu nguyện chung trong gia đình và cho con học giáo lý đầy đủ.",
    "detailedAnswer": [
      "Gia đình Kitô giáo được gọi là \"Hội Thánh tại gia\" (Ecclesia Domestica), nơi đức tin được trao truyền và nuôi dưỡng đầu tiên.",
      "Cha mẹ có bổn phận đưa con đi Rửa Tội sớm sau khi sinh, dạy con làm Dấu Thánh Giá, đọc kinh sớm tối và cùng tham dự Thánh Lễ Chúa Nhật.",
      "Gương mẫu sống yêu thương, tha thứ, siêng năng làm việc lành của cha mẹ là bài học sống động giá trị nhất cho con cái."
    ],
    "reference": "GLHTCG số 2221 - 2231; Tông huấn Familiaris Consortio",
    "tags": [
      "gia đình",
      "cha mẹ",
      "con cái",
      "giáo dục đức tin",
      "hội thánh tại gia"
    ]
  },
  {
    "id": "y-nghia-kinh-man-coi",
    "category": "cau-nguyen",
    "categoryLabel": "Kinh Nguyện & Mân Côi",
    "categoryIcon": "📿",
    "question": "Tại sao chuỗi Mân Côi là lời kinh đẹp lòng Đức Mẹ và mang lại nhiều ơn lành?",
    "shortAnswer": "Kinh Mân Côi là bản tóm lược toàn bộ Tin Mừng, giúp người tín hữu cùng Mẹ Maria chiêm ngắm cuộc đời, cái chết và sự phục sinh của Chúa Giêsu.",
    "detailedAnswer": [
      "Kinh Mân Côi gồm 20 mầu nhiệm chia thành 4 mùa: Vui (Nhập thể), Sáng (Sứ vụ công khai), Thương (Cuộc khổ nạn) và Mừng (Phục sinh & Vinh hiển).",
      "Khi lần hạt Mân Côi, môi miệng ta đọc lời kinh Thiên Thần chào Mẹ (Kinh Kính Mừng), trong khi tâm trí ta cùng Đức Mẹ chiêm ngưỡng khuôn mặt Đức Kitô.",
      "Đức Thánh Cha Gioan Phaolô II từng khẳng định: \"Kinh Mân Côi là lời cầu nguyện tuyệt vời, đơn sơ nhưng sâu thẳm, mang lại bình an cho tâm hồn và các gia đình.\"",
      "Rất nhiều ơn lành, sự bảo vệ và ơn hoán cải đã được ban tặng cho các cá nhân và dân tộc qua việc siêng năng lần chuỗi Mân Côi mỗi ngày."
    ],
    "reference": "Tông thư Rosarium Virginis Mariae (2002); GLHTCG số 2678, 2708",
    "tags": [
      "mân côi",
      "đức mẹ",
      "cầu nguyện",
      "kinh kính mừng",
      "bình an",
      "mầu nhiệm"
    ]
  },
  {
    "id": "kinh-lay-cha-kinh-nguyen-hoan-hao",
    "category": "cau-nguyen",
    "categoryLabel": "Kinh Nguyện & Mân Côi",
    "categoryIcon": "📿",
    "question": "Tại sao Kinh Lạy Cha được gọi là Bản Tóm Lược Toàn Bộ Tin Mừng?",
    "shortAnswer": "Vì Kinh Lạy Cha chính do Chúa Giêsu truyền dạy, chứa đựng 7 lời cầu xin hoàn hảo bao trùm mọi nhu cầu thiêng liêng và vật chất của con người.",
    "detailedAnswer": [
      "Kinh Lạy Cha là lời kinh mẫu mực tuyệt hảo nhất do chính Thầy Chí Thánh Giêsu dạy cho các môn đệ (Mt 6, 9-13; Lc 11, 2-4).",
      "Kinh Lạy Cha gồm 7 lời cầu xin:",
      "- 3 lời cầu đầu tiên hướng về Thiên Chúa: Danh Cha cả sáng, Nước Cha trị đến, Ý Cha thể hiện.",
      "- 4 lời cầu tiếp theo dâng lên các nhu cầu của chúng ta: Lương thực hằng ngày, Ơn tha thứ tội lỗi, Khỏi chước cám dỗ, và Cứu khỏi mọi sự dữ."
    ],
    "reference": "GLHTCG số 2759 - 2865; Thánh Tôma Aquinô",
    "tags": [
      "kinh lạy cha",
      "cầu nguyện",
      "tin mừng",
      "7 lời xin",
      "chúa giêsu dạy"
    ]
  },
  {
    "id": "cac-hinh-thuc-cau-nguyen",
    "category": "cau-nguyen",
    "categoryLabel": "Kinh Nguyện & Mân Côi",
    "categoryIcon": "📿",
    "question": "Người Kitô hữu có những hình thức cầu nguyện căn bản nào?",
    "shortAnswer": "Ba hình thức chính: Khẩu nguyện (đọc kinh thành tiếng), Suy niệm (suy ngẫm Lời Chúa) và Chiêm niệm (lặng ngắm tình yêu Chúa).",
    "detailedAnswer": [
      "1. Khẩu nguyện (Oratio vocalis): Cầu nguyện bằng lời nói thành tiếng hoặc thầm trong miệng kết hợp tâm trí (như Kinh Lạy Cha, Kinh Kính Mừng, các giờ kinh phụng vụ).",
      "2. Suy niệm (Meditatio): Dùng trí khôn, trí tưởng tượng, cảm xúc và ý chí để suy ngẫm một đoạn Lời Chúa, một mầu nhiệm đức tin hay một hình ảnh thánh thiện để rút ra bài học sống.",
      "3. Chiêm niệm (Contemplatio): Hình thức cầu nguyện sâu lắng nhất, khi tâm hồn hoàn toàn tĩnh lặng trong tình yêu, chăm chú lắng nghe và chiêm ngưỡng sự hiện diện của Thiên Chúa."
    ],
    "reference": "GLHTCG số 2700 - 2724; Toát Yếu số 568 - 571",
    "tags": [
      "cầu nguyện",
      "khẩu nguyện",
      "suy niệm",
      "chiêm niệm",
      "tĩnh tâm"
    ]
  },
  {
    "id": "khoa-hoc-va-duc-tin-co-mau-thuan",
    "category": "gioi-tre",
    "categoryLabel": "Thắc Mắc Giới Trẻ",
    "categoryIcon": "💡",
    "question": "Khoa học và Đức tin Công Giáo có mâu thuẫn hay triệt tiêu lẫn nhau không?",
    "shortAnswer": "Hoàn toàn KHÔNG mâu thuẫn. Cả hai đều bắt nguồn từ một Thiên Chúa là nguồn chân lý và bổ túc cho nhau trong việc tìm kiếm sự thật.",
    "detailedAnswer": [
      "Giáo lý Hội Thánh khẳng định: Đức tin và Lý trí (Fides et Ratio) giống như hai cánh của một cánh chim giúp tâm hồn con người vươn lên chiêm ngưỡng chân lý.",
      "Khoa học nghiên cứu thế giới vật chất vận hành như thế nào (\"Làm sao\"), còn Đức tin giải thích ý nghĩa tối hậu của cuộc sống, cùng đích con người và giá trị luân lý (\"Tại sao\").",
      "Nhiều nhà khoa học vĩ đại trong lịch sử là những tín hữu và linh mục Công Giáo sùng đạo (như Cha Georges Lemaître - cha đẻ thuyết Big Bang, Gregor Mendel - cha đẻ di truyền học, Louis Pasteur...)."
    ],
    "reference": "GLHTCG số 159, 283; Thông điệp Fides et Ratio (1998)",
    "tags": [
      "khoa học",
      "đức tin",
      "lý trí",
      "chân lý",
      "giới trẻ"
    ]
  },
  {
    "id": "phu-phep-boi-toan-xem-tuoi",
    "category": "gioi-tre",
    "categoryLabel": "Thắc Mắc Giới Trẻ",
    "categoryIcon": "💡",
    "question": "Người Công Giáo có được phép xem bói, coi tuổi cưới hỏi, phong thủy hay cúng bái không?",
    "shortAnswer": "Tuyệt đối KHÔNG. Mọi hình thức bói toán, coi tướng số, phong thủy mê tín dị đoan đều nghịch lại Điều răn thứ nhất: \"Thờ phượng một Đức Chúa Trời\".",
    "detailedAnswer": [
      "Điều răn thứ nhất truyền dạy phải tôn thờ một mình Thiên Chúa và đặt trọn vẹn niềm tin tưởng, phó thác tương lai vào bàn tay quan phòng của Ngài.",
      "Hội Thánh cấm mọi hình thức bói toán, tử vi, bói bài, coi ngày giờ tốt xấu, xem tuổi kết hôn, tin vào phong thủy hay cầu đồng giải hạn.",
      "Những thực hành này biểu lộ sự thiếu tin tưởng vào Chúa, tìm kiếm quyền lực huyền bí thay vì phó thác cuộc đời cho sự che chở của Chúa quan phòng."
    ],
    "reference": "GLHTCG số 2115 - 2117; Đnl 18, 10-12",
    "tags": [
      "mê tín",
      "xem bói",
      "coi tuổi",
      "phong thủy",
      "điều răn thứ nhất"
    ]
  },
  {
    "id": "song-thu-truoc-hon-nhan",
    "category": "gioi-tre",
    "categoryLabel": "Thắc Mắc Giới Trẻ",
    "categoryIcon": "💡",
    "question": "Tại sao Hội Thánh Công Giáo không chấp nhận việc \"sống thử\" hay quan hệ tình dục trước hôn nhân?",
    "shortAnswer": "Tình dục là quà tặng thánh thiêng chỉ thuộc về giao ước hôn nhân trọn đời. Sống thử xâm phạm phẩm giá thân xác và mâu thuẫn với bản chất tình yêu hiến dâng vô điều kiện.",
    "detailedAnswer": [
      "Thân xác con người là đền thờ của Chúa Thánh Thần (1 Cr 6, 19). Hành vi tính dục chỉ có ý nghĩa đích thực khi được đặt trong khuôn khổ cam kết hôn nhân công khai, vĩnh viễn và trọn vẹn.",
      "Sống thử mang tính tạm thời, có điều kiện (\"nếu hợp thì cưới, không hợp thì bỏ\"), làm biến chất tình yêu đích thực thành sự lợi dụng thể xác.",
      "Hội Thánh khích lệ các bạn trẻ thực hành đức khiết tịnh trước hôn nhân để tôi luyện lòng trung thành, sự tôn trọng và tình yêu sâu sắc bền vững cho tương lai gia đình."
    ],
    "reference": "GLHTCG số 2350, 2353, 2390; Youcat số 407",
    "tags": [
      "sống thử",
      "khiết tịnh",
      "giới trẻ",
      "hôn nhân",
      "tình yêu"
    ]
  }
];
