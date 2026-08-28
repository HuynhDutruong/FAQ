// Dữ liệu các Kinh Nguyện Cốt Lõi & Chính Thống của Giáo Hội Công Giáo Việt Nam
export interface Prayer {
  id: string;
  title: string;
  category: string;
  isPopular?: boolean;
  content: string;
  latinTitle?: string;
  note?: string;
}

export interface PrayerCategory {
  id: string;
  label: string;
  description: string;
}

export const PRAYER_CATEGORIES: PrayerCategory[] = [
  { id: 'all', label: 'Tất Cả', description: 'Toàn bộ các kinh nguyện Công Giáo cốt lõi' },
  { id: 'popular', label: 'Kinh Phổ Biến', description: 'Các kinh căn bản thường đọc hàng ngày' },
  { id: 'hang-ngay', label: 'Hằng Ngày & Sáng Tối', description: 'Kinh Dấu Thánh Giá, Lạy Cha, Kính Mừng, Sáng Danh, Ăn Năn Tội, Dâng Ngày...' },
  { id: 'duc-me', label: 'Đức Mẹ & Mân Côi', description: 'Chuỗi Mân Côi, Hãy Nhớ, Lạy Nữ Vương, Truyền Tin, Đức Mẹ La Vang...' },
  { id: 'thanh-giuse-cac-thanh', label: 'Thánh Giuse & Các Thánh', description: 'Kinh Thánh Cả Giuse, Các Thánh Tử Đạo VN, Thiên Thần Micae, Kinh Hòa Bình...' },
  { id: 'thanh-the-thuong-xot', label: 'Thánh Thể & Lòng Thương Xót', description: 'Chuỗi Lòng Thương Xót 3h Chiều, Rước Lễ Thiêng Liêng, Viếng Thánh Thể...' },
  { id: 'dang-thanh-gia', label: '14 Đàng Thánh Giá', description: '14 Chặng Đàng Thánh Giá, Kính Năm Dấu Thánh...' },
  { id: 'giao-ly-dieu-ran', label: 'Giáo Lý & Điều Răn', description: '10 Điều Răn, 6 Điều Răn Hội Thánh, 8 Mối Phúc Thật, 14 Mối Thương Người...' },
  { id: 'gia-dinh-linh-hon', label: 'Gia Đình & Các Linh Hồn', description: 'Kinh Cầu Cho Gia Đình, Cha Mẹ, Ơn Gọi, Kinh Vực Sâu Cầu Cho Các Linh Hồn...' }
];

export const PRAYERS: Prayer[] = [
  // =========================================================================
  // 1. CÁC KINH CĂN BẢN & HẰNG NGÀY
  // =========================================================================
  {
    id: 'dau-thanh-gia',
    title: 'Dấu Thánh Giá',
    latinTitle: 'Signum Crucis',
    category: 'hang-ngay',
    isPopular: true,
    content: `Nhân danh Cha, và Con, và Thánh Thần.
Amen.`
  },
  {
    id: 'kinh-lay-cha',
    title: 'Kinh Lạy Cha',
    latinTitle: 'Pater Noster',
    category: 'hang-ngay',
    isPopular: true,
    content: `Lạy Cha chúng con ở trên trời,
chúng con nguyện danh Cha cả sáng,
nước Cha trị đến,
ý Cha thể hiện dưới đất cũng như trên trời.

Xin Cha cho chúng con hôm nay lương thực hằng ngày,
và tha nợ chúng con,
như chúng con cũng tha kẻ có nợ chúng con,
xin chớ để chúng con sa chước cám dỗ,
nhưng cứu chúng con cho khỏi sự dữ.
Amen.`
  },
  {
    id: 'kinh-kinh-mung',
    title: 'Kinh Kính Mừng',
    latinTitle: 'Ave Maria',
    category: 'hang-ngay',
    isPopular: true,
    content: `Kính mừng Maria đầy ơn phúc, Đức Chúa Trời ở cùng Bà,
Bà có phúc lạ hơn mọi người nữ,
và Giêsu Con lòng Bà gồm phúc lạ.

Thánh Maria Đức Mẹ Chúa Trời,
cầu cho chúng con là kẻ có tội,
khi này và trong giờ lâm tử.
Amen.`
  },
  {
    id: 'kinh-sang-danh',
    title: 'Kinh Sáng Danh',
    latinTitle: 'Gloria Patri',
    category: 'hang-ngay',
    isPopular: true,
    content: `Sáng danh Đức Chúa Cha, và Đức Chúa Con, và Đức Chúa Thánh Thần.
Như đã có trước vô cùng, và bây giờ, và hằng có, và đời đời chẳng cùng.
Amen.`
  },
  {
    id: 'kinh-tin-kinh',
    title: 'Kinh Tin Kính (Các Tông Đồ)',
    latinTitle: 'Symbolum Apostolicum',
    category: 'hang-ngay',
    isPopular: true,
    content: `Tôi tin kính Đức Chúa Trời là Cha phép tắc vô cùng dựng nên trời đất.

Tôi tin kính Đức Chúa Giêsu Kitô là Con Một Đức Chúa Cha cùng là Chúa chúng tôi; bởi phép Đức Chúa Thánh Thần mà Người xuống thai, sinh bởi Bà Maria đồng trinh: chịu nạn đời quan Phongxiô Philatô, chịu đóng đinh trên cây Thánh Giá, chết và táng xác; xuống ngục tổ tông, ngày thứ ba bởi trong kẻ chết mà sống lại; lên trời ngự bên hữu Đức Chúa Cha phép tắc vô cùng; ngày sau bởi trời lại xuống phán xét kẻ sống và kẻ chết.

Tôi tin kính Đức Chúa Thánh Thần.
Tôi tin có Hội Thánh hằng có ở khắp thế này, các thánh thông công.
Tôi tin phép tha tội.
Tôi tin xác loài người ngày sau sống lại.
Tôi tin hằng sống vậy.
Amen.`
  },
  {
    id: 'kinh-an-nan-toi',
    title: 'Kinh Ăn Năn Tội',
    category: 'hang-ngay',
    isPopular: true,
    content: `Lạy Chúa con, Chúa là Đấng trọn tốt trọn lành vô cùng. Chúa đã dựng nên con, và cho Con Chúa ra đời chịu nạn chịu chết vì con, mà con đã cả lòng phản nghịch lỗi nghĩa cùng Chúa, thì con lo buồn đau đớn, cùng chê ghét mọi tội con trên hết mọi sự.

Con dốc lòng chừa cải, và nhờ ơn Chúa thì con sẽ lánh xa dịp tội, cùng làm việc đền tội cho xứng.
Amen.`
  },
  {
    id: 'kinh-chua-thanh-than',
    title: 'Kinh Cầu Xin Chúa Thánh Thần',
    latinTitle: 'Veni Sancte Spiritus',
    category: 'hang-ngay',
    isPopular: true,
    content: `Chúng con lạy ơn Đức Chúa Thánh Thần thiêng liêng sáng láng vô cùng. Chúng con xin Đức Chúa Thánh Thần xuống đầy lòng chúng con, là kẻ tin cậy Đức Chúa Trời, và đốt lửa kính mến Đức Chúa Trời trong lòng chúng con. Chúng con xin Đức Chúa Trời cho Đức Chúa Thánh Thần xuống.

*Thưa:* Sửa lại mọi sự trong ngoài chúng con.

Chúng con cầu cùng Đức Chúa Trời, xưa đã cho Đức Chúa Thánh Thần xuống soi lòng dạy dỗ các Thánh Tông Đồ, thì rầy chúng con cũng xin Đức Chúa Trời cho Đức Chúa Thánh Thần lại xuống, an ủi dạy dỗ chúng con làm những việc lành, vì công nghiệp Đức Chúa Giêsu Kitô là Chúa chúng con.
Amen.`
  },
  {
    id: 'kinh-tin-cay-men',
    title: 'Kinh Tin – Cậy – Mến',
    category: 'hang-ngay',
    isPopular: true,
    content: `### Kinh Tin:
Lạy Chúa con, con tin thật có một Đức Chúa Trời là Đấng thưởng phạt vô cùng. Con lại tin thật Đức Chúa Trời có Ba Ngôi, mà Ngôi Thứ Hai đã xuống thế làm người, chịu nạn chịu chết mà chuộc tội cho thiên hạ. Bấy nhiêu điều ấy cùng các điều Hội Thánh dạy thì con tin vững vàng, vì Chúa là Đấng thông biết và chân thật vô cùng đã phán truyền cho Hội Thánh. Amen.

### Kinh Cậy:
Lạy Chúa con, con trông cậy vững vàng, vì công nghiệp Đức Chúa Giêsu, thì Chúa sẽ ban ơn cho con giữ đạo nên ở đời này, cho ngày sau được lên thiên đàng, xem thấy mặt Đức Chúa Trời hưởng phúc đời đời, vì Chúa là Đấng phép tắc và lòng lành vô cùng đã phán hứa, sự ấy chẳng có lẽ nào sai được. Amen.

### Kinh Kính Mến:
Lạy Chúa con, con kính mến Chúa hết lòng hết sức, trên hết mọi sự, vì Chúa là Đấng trọn tốt trọn lành vô cùng, lại vì Chúa thì con thương yêu người ta như mình con vậy. Amen.`
  },
  {
    id: 'kinh-sang-dang-ngay',
    title: 'Kinh Dâng Ngày (Kinh Buổi Sáng)',
    category: 'hang-ngay',
    isPopular: true,
    content: `Lạy Trái Tim Cực Thánh Đức Chúa Giêsu, con nhờ Trái Tim Vô Nhiễm Đức Mẹ Maria, mà dâng lên Chúa mọi lời con cầu nguyện, mọi việc con làm, mọi sự khó nhọc con chịu trong ngày hôm nay, để đền vì tội lỗi con và cầu nguyện theo mọi ý Chúa.

Cách riêng con xin dâng mọi việc hôm nay để cầu nguyện theo ý Đức Thánh Cha đang hướng tới trong tháng này.
Amen.`
  },
  {
    id: 'kinh-pho-dang-dem',
    title: 'Kinh Phó Dâng (Kinh Buổi Tối)',
    category: 'hang-ngay',
    isPopular: true,
    content: `Lạy Chúa, con phó linh hồn và xác con ở tay Chúa. Khi con thức cũng như khi con ngủ, xin Chúa gìn giữ con cho khỏi mọi sự dữ, và gìn giữ linh hồn con khỏi sa chước cám dỗ.

Lạy Thánh Thiên Thần Bản Mệnh, xin gìn giữ con đêm nay cho được an lành, để sáng mai thức dậy con được ngợi khen và phụng sự Chúa.
Amen.`
  },
  {
    id: 'kinh-truoc-va-sau-khi-an',
    title: 'Kinh Trước & Sau Khi Ăn',
    category: 'hang-ngay',
    isPopular: true,
    content: `### Trước khi ăn:
Lạy Chúa, xin chúc lành cho chúng con và của ăn này, mà chúng con sắp nhận lãnh do lòng từ bi Chúa, nhờ Đức Kitô Chúa chúng con.
Amen.

### Sau khi ăn:
Lạy Thiên Chúa toàn năng, chúng con cảm tạ Chúa vì mọi ơn lành Chúa đã ban cho chúng con, Đấng hằng sống và hiển trị muôn đời.
Amen.`
  },
  {
    id: 'kinh-cam-on',
    title: 'Kinh Cám Ơn',
    category: 'hang-ngay',
    isPopular: true,
    content: `Người ta ai nấy đều phải cảm tạ ơn Đức Chúa Trời đã dựng nên mình, lại gìn giữ mình hằng ngày, cùng ban muôn vàn ơn lành phần hồn phần xác.

Lạy Chúa, con cảm tạ Chúa đã gìn giữ con trong ngày hôm nay, xin Chúa thương tha thứ những thiếu sót lỗi lầm con đã phạm, và ban ơn cho con được trung thành phụng sự Chúa cho đến trọn đời.
Amen.`
  },
  {
    id: 'kinh-trong-cay',
    title: 'Kinh Trông Cậy',
    latinTitle: 'Sub Tuum Praesidium',
    category: 'hang-ngay',
    isPopular: true,
    content: `Chúng con trông cậy rất thánh Đức Mẹ Chúa Trời, xin chớ chê chớ bỏ lời chúng con nguyện, trong cơn gian nan thiếu thốn, Đức Nữ Đồng Trinh hiển vinh sáng láng.

*Thưa:* Hằng chữa chúng con cho khỏi mọi sự dữ. Amen.

• Lạy Rất Thánh Trái Tim Đức Chúa Giêsu. *(Thương xót chúng con)*
• Lạy Trái Tim Cực Thanh Cực Tịnh Rất Thánh Đức Bà Maria. *(Cầu cho chúng con)*
• Lạy Ông Thánh Giuse là bạn thanh sạch Đức Bà Maria trọn đời đồng trinh. *(Cầu cho chúng con)*
• Các Thánh Tử Đạo Nước Việt Nam. *(Cầu cho chúng con)*
• Nữ Vương Ban Sự Bình An. *(Cầu cho chúng con)*`
  },

  // =========================================================================
  // 2. KINH ĐỨC MẸ & TRÀNG HẠT MÂN CÔI
  // =========================================================================
  {
    id: 'chuoi-man-coi-tong-quat',
    title: 'Hướng Dẫn Lần Chuỗi Mân Côi',
    category: 'duc-me',
    isPopular: true,
    content: `Tràng Hạt Mân Côi là lời kinh tuyệt hảo kết hợp giữa lời kinh chúc tụng Thiên Chúa và suy niệm các mầu nhiệm Cứu Độ của Chúa Giêsu cùng Mẹ Maria.

### Trình tự lần hạt mỗi chục:
1. Đọc tên Mầu Nhiệm và xin ơn hoa quả của mầu nhiệm đó.
2. Đọc **1 Kinh Lạy Cha**.
3. Đọc **10 Kinh Kính Mừng**.
4. Đọc **1 Kinh Sáng Danh**.
5. Đọc **Lời nguyện Fatima**:
*“Lạy Chúa Giêsu, xin tha tội cho chúng con, xin cứu chúng con khỏi sa hỏa ngục, xin đem các linh hồn lên Thiên Đàng, nhất là những linh hồn cần đến lòng Chúa thương xót hơn.”*

### Phân chia các Mùa trong tuần:
• **Năm Sự Vui:** Thứ Hai & Thứ Bảy.
• **Năm Sự Sáng:** Thứ Năm.
• **Năm Sự Thương:** Thứ Ba & Thứ Sáu.
• **Năm Sự Mừng:** Chúa Nhật & Thứ Tư.`
  },
  {
    id: 'ngam-5-su-vui',
    title: 'Ngắm Năm Sự Vui (Thứ Hai & Thứ Bảy)',
    category: 'duc-me',
    isPopular: true,
    content: `• **Thứ nhất thì ngắm:** Đức Bà chịu thai. Ta hãy xin cho được ở khiêm nhường. *(1 Lạy Cha, 10 Kính Mừng, 1 Sáng Danh)*
• **Thứ hai thì ngắm:** Đức Bà đi viếng Bà Thánh Isave. Ta hãy xin cho được lòng yêu người. *(1 Lạy Cha, 10 Kính Mừng, 1 Sáng Danh)*
• **Thứ ba thì ngắm:** Đức Bà sinh Đức Chúa Giêsu nơi máng cỏ. Ta hãy xin cho được lòng khó khăn. *(1 Lạy Cha, 10 Kính Mừng, 1 Sáng Danh)*
• **Thứ bốn thì ngắm:** Đức Bà dâng Đức Chúa Giêsu trong Đền Thánh. Ta hãy xin cho được vâng lời chịu lụy. *(1 Lạy Cha, 10 Kính Mừng, 1 Sáng Danh)*
• **Thứ năm thì ngắm:** Đức Bà tìm được Đức Chúa Giêsu trong Đền Thánh. Ta hãy xin cho được giữ nghĩa cùng Chúa luôn. *(1 Lạy Cha, 10 Kính Mừng, 1 Sáng Danh)*`
  },
  {
    id: 'ngam-5-su-sang',
    title: 'Ngắm Năm Sự Sáng (Thứ Năm)',
    category: 'duc-me',
    isPopular: true,
    content: `• **Thứ nhất thì ngắm:** Đức Chúa Giêsu chịu phép Rửa tại sông Giođan. Ta hãy xin cho được sống xứng đáng là con cái Chúa. *(1 Lạy Cha, 10 Kính Mừng, 1 Sáng Danh)*
• **Thứ hai thì ngắm:** Đức Chúa Giêsu dự tiệc cưới Cana. Ta hãy xin cho được vững tin vào quyền năng của Chúa và vâng nghe lời Mẹ. *(1 Lạy Cha, 10 Kính Mừng, 1 Sáng Danh)*
• **Thứ ba thì ngắm:** Đức Chúa Giêsu rao giảng Nước Trời và kêu gọi sám hối. Ta hãy xin cho được hoán cải tâm hồn và đón nhận Tin Mừng. *(1 Lạy Cha, 10 Kính Mừng, 1 Sáng Danh)*
• **Thứ bốn thì ngắm:** Đức Chúa Giêsu biến hình trên núi Tabôrê. Ta hãy xin cho được biến đổi nhờ chiêm ngắm vinh quang Chúa. *(1 Lạy Cha, 10 Kính Mừng, 1 Sáng Danh)*
• **Thứ năm thì ngắm:** Đức Chúa Giêsu lập Bí Tích Thánh Thể. Ta hãy xin cho được sốt sắng kết hiệp với Chúa Giêsu Thánh Thể. *(1 Lạy Cha, 10 Kính Mừng, 1 Sáng Danh)*`
  },
  {
    id: 'ngam-5-su-thuong',
    title: 'Ngắm Năm Sự Thương (Thứ Ba & Thứ Sáu)',
    category: 'duc-me',
    isPopular: true,
    content: `• **Thứ nhất thì ngắm:** Đức Chúa Giêsu lo buồn đổ mồ hôi máu trong vườn Cây Dầu. Ta hãy xin cho được ăn năn tội nên. *(1 Lạy Cha, 10 Kính Mừng, 1 Sáng Danh)*
• **Thứ hai thì ngắm:** Đức Chúa Giêsu chịu đánh đòn nơi cột đá. Ta hãy xin cho được hãm mình chịu khó bằng lòng. *(1 Lạy Cha, 10 Kính Mừng, 1 Sáng Danh)*
• **Thứ ba thì ngắm:** Đức Chúa Giêsu chịu đội mão gai. Ta hãy xin cho được chịu mọi sự sỉ nhục vì Chúa. *(1 Lạy Cha, 10 Kính Mừng, 1 Sáng Danh)*
• **Thứ bốn thì ngắm:** Đức Chúa Giêsu vác cây Thánh Giá lên núi Canvê. Ta hãy xin cho được vác Thánh Giá theo chân Chúa. *(1 Lạy Cha, 10 Kính Mừng, 1 Sáng Danh)*
• **Thứ năm thì ngắm:** Đức Chúa Giêsu chịu đóng đinh và sinh thì trên cây Thánh Giá. Ta hãy xin cho được đóng đinh tính xác thịt vào Thánh Giá Chúa. *(1 Lạy Cha, 10 Kính Mừng, 1 Sáng Danh)*`
  },
  {
    id: 'ngam-5-su-mung',
    title: 'Ngắm Năm Sự Mừng (Chúa Nhật & Thứ Tư)',
    category: 'duc-me',
    isPopular: true,
    content: `• **Thứ nhất thì ngắm:** Đức Chúa Giêsu sống lại từ cõi chết. Ta hãy xin cho được sống lại thật về phần linh hồn. *(1 Lạy Cha, 10 Kính Mừng, 1 Sáng Danh)*
• **Thứ hai thì ngắm:** Đức Chúa Giêsu lên trời vinh hiển. Ta hãy xin cho được ái mộ những sự trên trời. *(1 Lạy Cha, 10 Kính Mừng, 1 Sáng Danh)*
• **Thứ ba thì ngắm:** Đức Chúa Thánh Thần hiện xuống trên các Tông Đồ. Ta hãy xin cho được đầy dẫy ơn Đức Chúa Thánh Thần. *(1 Lạy Cha, 10 Kính Mừng, 1 Sáng Danh)*
• **Thứ bốn thì ngắm:** Đức Chúa Trời cho Đức Mẹ lên trời cả hồn và xác. Ta hãy xin cho được chết lành trong tay Đức Mẹ. *(1 Lạy Cha, 10 Kính Mừng, 1 Sáng Danh)*
• **Thứ năm thì ngắm:** Đức Chúa Trời thưởng Đức Mẹ trên trời làm Nữ Vương trời đất. Ta hãy xin cho được thưởng cùng Đức Mẹ trên nước Thiên Đàng. *(1 Lạy Cha, 10 Kính Mừng, 1 Sáng Danh)*`
  },
  {
    id: 'kinh-lay-nu-vuong',
    title: 'Kinh Lạy Nữ Vương',
    latinTitle: 'Salve Regina',
    category: 'duc-me',
    isPopular: true,
    content: `Lạy Nữ Vương, Mẹ nhân lành, làm cho chúng con được sống, được vui, được cậy, thân lạy Mẹ!

Chúng con, con cháu E-và ở chốn khách đày kêu đến Mẹ, chúng con ở nơi khóc lóc than thở kêu khẩn Mẹ thương. Hỡi ôi! Bà là Chúa bầu chúng con, xin ghé mắt thương xem chúng con. Đến sau khỏi đày, xin cho chúng con được thấy Đức Chúa Giêsu con lòng Bà gồm phúc lạ.

Ôi khoan thay, nhân thay, dịu thay, Thánh Maria trọn đời đồng trinh.
Amen.`
  },
  {
    id: 'kinh-hay-nho',
    title: 'Kinh Hãy Nhớ',
    latinTitle: 'Memorare',
    category: 'duc-me',
    isPopular: true,
    content: `Lạy Thánh Nữ Đồng Trinh Maria, là Mẹ rất nhân từ, xin hãy nhớ xưa nay chưa từng nghe có người nào chạy đến cùng Đức Mẹ, xin bầu chữa cứu giúp, mà Đức Mẹ từ bỏ chẳng nhậm lời.

Nhân vì sự ấy, con lấy lòng trông cậy than van chạy đến sấp mình dưới chân Đức Mẹ, là Nữ Hoàng các Thánh Đồng Trinh, xin Mẹ đoái đến con là kẻ tội lỗi. Lạy Mẹ là Mẹ Chúa Cứu Thế, xin chớ chê bỏ lời con kêu van, một dủ lòng thương và nhậm lời con cùng.
Amen.`
  },
  {
    id: 'kinh-truyen-tin',
    title: 'Kinh Truyền Tin (Kinh Angelus)',
    latinTitle: 'Angelus Domini',
    category: 'duc-me',
    isPopular: true,
    content: `X: Đức Chúa Trời sai Thánh Thiên Thần truyền tin cho Rất Thánh Đức Bà Maria.
Đ: Và Rất Thánh Đức Bà chịu thai bởi phép Đức Chúa Thánh Thần.
*(1 Kinh Kính Mừng)*

X: Này tôi là tôi tá Đức Chúa Trời.
Đ: Tôi xin vâng như lời Thánh Thiên Thần truyền.
*(1 Kinh Kính Mừng)*

X: Chốc ấy Ngôi Thứ Hai xuống thế làm người.
Đ: Và ở cùng chúng con.
*(1 Kinh Kính Mừng)*

X: Lạy Rất Thánh Đức Mẹ Chúa Trời, xin cầu cho chúng con.
Đ: Đáng chịu lấy những sự Chúa Kitô đã hứa.

**Lời Nguyện:**
Lạy Chúa, chúng con xin Chúa ban ơn xuống trong linh hồn chúng con, là kẻ đã nhờ lời Thánh Thiên Thần truyền, mà biết thật Đức Chúa Giêsu Kitô là Con Chúa đã xuống thế làm người, thì xin vì công nghiệp Người chịu nạn chịu chết trên cây Thánh Giá, cho chúng con ngày sau được sống lại vinh hiển, cũng vì Đức Chúa Giêsu Kitô là Chúa chúng con.
Amen.`
  },
  {
    id: 'kinh-duc-me-la-vang',
    title: 'Kinh Đức Mẹ La Vang',
    category: 'duc-me',
    isPopular: true,
    content: `Lạy Đức Mẹ La Vang, Mẹ là Mẹ Thiên Chúa và là Mẹ chúng con. Xưa kia Mẹ đã hiện ra nơi rừng lá La Vang để an ủi, nâng đỡ con cái Mẹ trong cơn bách hại gian truân.

Nay chúng con hiệp lòng dâng lên Mẹ quê hương Việt Nam, Giáo phận và gia đình chúng con. Xin Mẹ thương gìn giữ đức tin của chúng con luôn kiên trung vững vàng, gia đình hòa thuận yêu thương, và ban cho đất nước chúng con được thái bình thịnh vượng.
Amen.`
  },

  // =========================================================================
  // 3. THÁNH GIUSE & CÁC THÁNH
  // =========================================================================
  {
    id: 'kinh-thanh-giuse',
    title: 'Kinh Cầu Cùng Thánh Cả Giuse',
    category: 'thanh-giuse-cac-thanh',
    isPopular: true,
    content: `Lạy Thánh Giuse xưa nay chưa từng nghe có người nào chạy đến cùng Người, xin bầu chữa cứu giúp mà Người từ bỏ chẳng nhậm lời.

Nhân vì sự ấy, con lấy lòng trông cậy bền đỗ mà chạy đến cùng Người, là Đấng giữ gìn Chúa Cứu Thế và là Đấng chở che Hội Thánh. Xin Người thương nhận lời chúng con khẩn nguyện, và hằng gìn giữ chúng con trong mọi lúc gian nan thử thách.
Amen.`
  },
  {
    id: 'kinh-cac-thanh-tu-dao-vn',
    title: 'Kinh Các Thánh Tử Đạo Việt Nam',
    category: 'thanh-giuse-cac-thanh',
    isPopular: true,
    content: `Lạy các Thánh Tử Đạo Việt Nam, là những bậc tiền nhân anh dũng đã đổ máu đào để minh chứng cho đức tin sắt son vào Chúa Kitô.

Các Ngài đã thà chịu trăm nghìn cực hình và cái chết đớn đau, chứ không chịu chối Chúa và lìa xa Giáo Hội. Xin các Ngài cầu bầu cùng Chúa cho con cháu hôm nay luôn can đảm sống đạo, giữ vững đức tin, nhiệt thành mến Chúa yêu người, và làm chứng cho Tin Mừng giữa lòng thế giới.
Amen.`
  },
  {
    id: 'kinh-tong-lanh-thien-than-micae',
    title: 'Kinh Thánh Tổng Lãnh Thiên Thần Micae',
    latinTitle: 'Sancte Michael Archangele',
    category: 'thanh-giuse-cac-thanh',
    isPopular: true,
    content: `Lạy Thánh Tổng Lãnh Thiên Thần Micae, xin hộ thủ chúng con trong chốn chiến trường, bảo vệ chúng con khỏi mưu ma chước quỷ hãm hại.

Chúng con khiêm tốn nài xin Thiên Chúa xua đuổi chúng, và lạy Người, là Tướng Lãnh đạo binh thiên quốc, xin dùng quyền năng Thiên Chúa mà giáng phạt Satan cùng bè lũ tà thần đang dong duổi khắp trần gian nhằm làm hại các linh hồn, xin tống xéo chúng xuống hỏa ngục.
Amen.`
  },
  {
    id: 'kinh-hoa-binh',
    title: 'Kinh Hòa Bình (Thánh Phanxicô Assisi)',
    category: 'thanh-giuse-cac-thanh',
    isPopular: true,
    content: `Lạy Chúa từ nhân, xin chứa chấp con như khí cụ bình an của Chúa:
• Để con đem yêu thương vào nơi oán thù,
• Đem thứ tha vào nơi lăng nhục,
• Đem an hòa vào nơi tranh chấp,
• Đem chân lý vào chốn lỗi lầm.

• Để con đem đức tin vào nơi nghi nan,
• Chiếu trông cậy vào nơi thất vọng,
• Để con dọi ánh sáng vào nơi tối tăm,
• Đem niềm vui đến chốn u sầu.

Lạy Chúa xin hãy dạy con:
• Tìm an ủi người hơn được người ủi an,
• Tìm hiểu biết người hơn được người hiểu biết,
• Tìm yêu mến người hơn được người mến yêu.

Bởi vì:
Chính khi hiến thân là khi được nhận lãnh,
chính lúc quên mình là lúc gặp lại bản thân,
chính khi thứ tha là khi được tha thứ,
chính lúc chết đi là khi vui sống muôn đời.
Amen.`
  },
  {
    id: 'kinh-thien-than-ban-menh',
    title: 'Kinh Thiên Thần Bản Mệnh',
    latinTitle: 'Angele Dei',
    category: 'thanh-giuse-cac-thanh',
    isPopular: true,
    content: `Lạy Thiên Thần của Thiên Chúa, là Đấng bảo trợ yêu dấu của con, Đấng mà lòng nhân lành Chúa đã giao phó con cho Người gìn giữ:

Xin soi sáng, gìn giữ, hướng dẫn và cai quản con trong ngày hôm nay.
Amen.`
  },

  // =========================================================================
  // 4. THÁNH THỂ & LÒNG THƯƠNG XÓT
  // =========================================================================
  {
    id: 'chuoi-long-thuong-xot',
    title: 'Kinh Lòng Thương Xót Chúa (Chuỗi 3 Giờ Chiều)',
    category: 'thanh-the-thuong-xot',
    isPopular: true,
    content: `### Giờ Lòng Thương Xót (3 Giờ Chiều):
“Lạy Chúa Giêsu, Chúa đã trút hơi thở cuối cùng, nhưng nguồn mạch sự sống đã tuôn trào cho các linh hồn, và đại dương lòng thương xót đã mở ra cho toàn thế giới. Ôi nguồn mạch sự sống, lòng thương xót khôn lường của Thiên Chúa, xin bao phủ toàn thế giới và tuôn đổ hết trên chúng con.”

“Ôi Máu và Nước tuôn trào từ Thánh Tâm Chúa Giêsu như nguồn mạch lòng thương xót chúng con, con trông cậy nơi Ngài!” *(3 lần)*

### Hướng dẫn lần chuỗi Lòng Thương Xót:
1. Đọc **1 Kinh Lạy Cha**, **1 Kinh Kính Mừng**, **1 Kinh Tin Kính**.
2. **Mỗi hạt lớn:**
*“Lạy Cha Hằng Hữu, con xin dâng lên Cha: Mình và Máu, Linh Hồn và Thần Tính của Con Rất Yêu Dấu Cha, là Đức Giêsu Kitô, Chúa chúng con, để đền vì tội lỗi chúng con và toàn thế giới.”*
3. **Mỗi hạt nhỏ (10 lần):**
*“Vì cuộc Tử Nạn đau thương của Chúa Giêsu Kitô, xin Cha thương xót chúng con và toàn thế giới.”*
4. **Kết thúc chuỗi (3 lần):**
*“Lạy Đấng Chí Thánh, là Thiên Chúa Toàn Năng Hằng Sống, xin thương xót chúng con và toàn thế giới.”*`
  },
  {
    id: 'kinh-ruoc-le-thieng-lieng',
    title: 'Kinh Rước Lễ Thiêng Liêng',
    category: 'thanh-the-thuong-xot',
    isPopular: true,
    content: `Lạy Đức Chúa Giêsu, con tin thật Chúa ngự trong Bí Tích Mình Thánh. Con yêu mến Chúa trên hết mọi sự, cùng ước ao rước Chúa vào linh hồn con.

Nhưng vì bây giờ con không thể rước Mình Thánh Chúa cách bí tích được, thì xin Chúa ngự vào linh hồn con cách thiêng liêng.

Con xin nghênh đón Chúa như Chúa đã ngự vào lòng con thật, cùng kết hiệp trọn vẹn với Chúa. Xin Chúa chớ để con lìa xa Chúa bao giờ.
Amen.`
  },
  {
    id: 'kinh-vieng-thanh-the',
    title: 'Kinh Thờ Lạy & Viếng Thánh Thể',
    latinTitle: 'Tantum Ergo',
    category: 'thanh-the-thuong-xot',
    isPopular: true,
    content: `Lạy Chúa Giêsu Thánh Thể, con sấp mình thờ lạy Chúa đang hiện diện thực sự trong Phép Bí Tích Cực Thánh này.

Chúa là Tình Yêu ngàn đời, là Bánh Hằng Sống từ trời xuống nuôi dưỡng linh hồn chúng con. Xin cho lòng con luôn khao khát kết hiệp cùng Chúa, xin đốt lên trong tim con ngọn lửa mến yêu nồng nàn để con sống xứng đáng với tình thương bao la của Ngài.
Amen.`
  },

  // =========================================================================
  // 5. 14 ĐÀNG THÁNH GIÁ
  // =========================================================================
  {
    id: '14-chang-dang-thanh-gia',
    title: '14 Chặng Đàng Thánh Giá Chúa Giêsu',
    category: 'dang-thanh-gia',
    isPopular: true,
    content: `*(Mỗi chặng: Quỳ - xướng: Chúng con thờ lạy và ngợi khen Chúa Kitô / Vì Chúa đã dùng Thánh Giá Chúa mà chuộc tội cho thiên hạ)*

• **Nơi Thứ Nhất:** Quan Philatô luận giết Đức Chúa Giêsu. *(Xin cho con ăn năn đền tội)*
• **Nơi Thứ Hai:** Đức Chúa Giêsu vác Thánh Giá. *(Xin cho con bằng lòng chịu sự khó theo chân Chúa)*
• **Nơi Thứ Ba:** Đức Chúa Giêsu ngã xuống đất lần thứ nhất. *(Xin gìn giữ con chớ để sa phạm tội lỗi)*
• **Nơi Thứ Bốn:** Đức Mẹ gặp Đức Chúa Giêsu vác Thánh Giá. *(Xin cho con được lòng ăn năn đau đớn)*
• **Nơi Thứ Năm:** Ông Simon vác đỡ Thánh Giá Chúa. *(Xin giúp sức cho con biết gánh vác đỡ gánh nặng tha nhân)*
• **Nơi Thứ Sáu:** Bà Veronica trao khăn lau mặt Chúa. *(Xin in hình tượng Chúa vào lòng con)*
• **Nơi Thứ Bảy:** Đức Chúa Giêsu ngã xuống đất lần thứ hai. *(Xin cho con giữ lòng vững vàng đi đàng nhân đức)*
• **Nơi Thứ Tám:** Đức Chúa Giêsu an ủi con cái thành Giêrusalem. *(Xin an ủi linh hồn con trong cơn hoạn nạn)*
• **Nơi Thứ Chín:** Đức Chúa Giêsu ngã xuống đất lần thứ ba. *(Xin Chúa gìn giữ con cho đến phút sau hết)*
• **Nơi Thứ Mười:** Quân dữ lột áo Đức Chúa Giêsu. *(Xin gìn giữ con khỏi mọi chước cám dỗ xác thịt)*
• **Nơi Thứ Mười Một:** Quân dữ đóng đinh Đức Chúa Giêsu. *(Xin đóng đinh tính xác thịt con vào Thánh Giá Chúa)*
• **Nơi Thứ Mười Hai:** Đức Chúa Giêsu sinh thì trên Thánh Giá. *(Xin cho con được phó linh hồn trong tay Chúa khi lâm chung)*
• **Nơi Thứ Mười Ba:** Tháo xác Đức Chúa Giêsu phó tay Đức Mẹ. *(Xin gỡ con cho khỏi mọi vết nhơ tội lỗi)*
• **Nơi Thứ Mười Bốn:** Táng xác Đức Chúa Giêsu trong mồ đá. *(Xin ban cho con lòng trong sạch để rước Mình Thánh Chúa)*`
  },

  // =========================================================================
  // 6. GIÁO LÝ CỐT LÕI & ĐIỀU RĂN
  // =========================================================================
  {
    id: '10-dieu-ran',
    title: 'Mười Điều Răn Đức Chúa Trời',
    category: 'giao-ly-dieu-ran',
    isPopular: true,
    content: `Đạo Đức Chúa Trời có Mười Điều Răn:

• **Thứ nhất:** Thờ phượng một Đức Chúa Trời và kính mến Người trên hết mọi sự.
• **Thứ hai:** Chớ kêu tên Đức Chúa Trời vô cớ.
• **Thứ ba:** Giữ ngày Chúa Nhật.
• **Thứ bốn:** Thảo kính cha mẹ.
• **Thứ năm:** Chớ giết người.
• **Thứ sáu:** Chớ làm sự dâm dục.
• **Thứ bảy:** Chớ lấy của người.
• **Thứ tám:** Chớ làm chứng dối.
• **Thứ chín:** Chớ muốn vợ chồng người.
• **Thứ mười:** Chớ tham của người.

*Mười điều răn ấy tóm về hai điều này mà chớ:*
**Trước kính mến một Đức Chúa Trời trên hết mọi sự, sau lại yêu người như mình ta vậy. Amen.**`
  },
  {
    id: '6-dieu-ran-hoi-thanh',
    title: 'Sáu Điều Răn Hội Thánh',
    category: 'giao-ly-dieu-ran',
    isPopular: true,
    content: `Hội Thánh có Sáu Điều Răn:

• **Thứ nhất:** Dâng lễ ngày Chúa Nhật cùng các ngày lễ buộc.
• **Thứ hai:** Chớ làm việc xác ngày Chúa Nhật cùng các ngày lễ buộc.
• **Thứ ba:** Xưng tội trong một năm ít là một lần.
• **Thứ bốn:** Rước Mình Thánh Chúa trong Mùa Phục Sinh.
• **Thứ năm:** Giữ chay và kiêng thịt những ngày Hội Thánh dạy.
• **Thứ sáu:** Đóng góp tài chính để giúp đỡ nhu cầu của Hội Thánh.`
  },
  {
    id: '8-moi-phuc-that',
    title: 'Tám Mối Phúc Thật (Hiến Chương Nước Trời)',
    category: 'giao-ly-dieu-ran',
    isPopular: true,
    content: `• **Thứ nhất:** Phúc cho ai có tinh thần nghèo khó, vì Nước Trời là của họ.
• **Thứ hai:** Phúc cho ai hiền lành, vì họ sẽ được Đất Hứa làm gia nghiệp.
• **Thứ ba:** Phúc cho ai sầu khổ, vì họ sẽ được Thiên Chúa ủi an.
• **Thứ bốn:** Phúc cho ai khao khát nên người công chính, vì họ sẽ được Thiên Chúa cho thỏa lòng.
• **Thứ năm:** Phúc cho ai biết xót thương người, vì họ sẽ được Thiên Chúa xót thương.
• **Thứ sáu:** Phúc cho ai có tâm hồn trong sạch, vì họ sẽ được nhìn ngắm Thiên Chúa.
• **Thứ bảy:** Phúc cho ai xây dựng hòa bình, vì họ sẽ được gọi là con Thiên Chúa.
• **Thứ tám:** Phúc cho ai bị bách hại vì sống công chính, vì Nước Trời là của họ.`
  },
  {
    id: '14-moi-thuong-nguoi',
    title: 'Mười Bốn Mối Thương Người',
    category: 'giao-ly-dieu-ran',
    isPopular: true,
    content: `### Thương xác bảy mối:
1. Cho kẻ đói ăn.
2. Cho kẻ khát uống.
3. Cho kẻ rách rưới ăn mặc.
4. Viếng kẻ liệt cùng kẻ tù rạc.
5. Cho khách đỗ nhà.
6. Chuộc kẻ làm tôi.
7. Chôn xác kẻ chết.

### Thương linh hồn bảy mối:
1. Lấy lời lành mà khuyên người.
2. Mở dạy kẻ mê muội.
3. Yên ủi kẻ âu lo.
4. Răn bảo kẻ có tội.
5. Tha kẻ dể ta.
6. Nhịn kẻ mất lòng ta.
7. Cầu cho kẻ sống và kẻ chết.`
  },

  // =========================================================================
  // 7. GIA ĐÌNH & CÁC LINH HỒN
  // =========================================================================
  {
    id: 'kinh-cau-cho-gia-dinh',
    title: 'Kinh Cầu Cho Gia Đình',
    category: 'gia-dinh-linh-hon',
    isPopular: true,
    content: `Lạy Chúa, Chúa đã tạo dựng loài người có nam có nữ, và lập nên bí tích Hôn Phối để thánh hóa tình yêu gia đình.

Chúng con xin dâng gia đình chúng con cho Thánh Tâm Chúa và Trái Tim Vô Nhiễm Mẹ Maria. Xin Chúa ban cho cha mẹ được tràn đầy ơn khôn ngoan, nhẫn nại và yêu thương; ban cho con cái thảo hiền ngoan ngoãn, biết vâng lời và siêng năng học hành. Xin gìn giữ gia đình chúng con luôn hiệp nhất, bình an và trung thành giữ đạo Chúa cho đến cùng.
Amen.`
  },
  {
    id: 'kinh-cau-cho-cha-me',
    title: 'Kinh Cầu Cho Cha Mẹ',
    category: 'gia-dinh-linh-hon',
    isPopular: true,
    content: `Lạy Chúa Giêsu, khi còn ở trần gian, Chúa đã hằng hiếu thảo vâng lời Mẹ Maria và Thánh Cả Giuse nơi mái nhà Nadarét.

Chúng con xin Chúa ban muôn ơn lành hồn xác cho cha mẹ chúng con. Xin cho cha mẹ được sức khỏe dồi dào, an vui thanh thản trong tuổi già. Xin dạy chúng con luôn biết hiếu thảo, phụng dưỡng, vâng lời và đem lại niềm vui cho cha mẹ, để đền đáp công ơn sinh thành dưỡng dục tựa biển trời.
Amen.`
  },
  {
    id: 'kinh-cau-cho-on-goi',
    title: 'Kinh Cầu Cho Ơn Gọi Linh Mục & Tu Sĩ',
    category: 'gia-dinh-linh-hon',
    isPopular: true,
    content: `Lạy Chúa Giêsu là Mục Tử Nhân Lành, Chúa đã phán: “Lúa chín đầy đồng mà thợ gặt lại ít”.

Chúng con tha thiết nài xin Chúa sai thêm nhiều tâm hồn quảng đại dấn thân vào cánh đồng truyền giáo. Xin Chúa ban cho các linh mục và tu sĩ luôn trung thành với sứ mạng, đầy lòng nhiệt thành và bác ái thánh thiện, để dẫn đưa muôn người về với Chúa.
Amen.`
  },
  {
    id: 'kinh-vuc-sau',
    title: 'Kinh Vực Sâu (Cầu Cho Các Linh Hồn)',
    latinTitle: 'De Profundis',
    category: 'gia-dinh-linh-hon',
    isPopular: true,
    content: `Lạy Chúa, con ở dưới vực sâu kêu lên Chúa, xin Chúa hãy thương nhậm lời con, hãy lắng tai nghe tiếng con cầu xin.

Nếu Chúa chấp tội nào ai rỗi được? Bởi vì Chúa hằng có lòng lành, cùng vì lời Chúa phán hứa, con đã trông cậy Chúa. Linh hồn con cậy vì lời hứa ấy, thì đã trông cậy Chúa.

Từ ánh bình minh cho đến đêm tối, dân Israel hãy trông cậy Chúa; vì Chúa rất nhân từ, cùng giàu ơn cứu chuộc, và Người sẽ chuộc hết mọi tội lỗi dân Israel.

Lạy Chúa, xin cho các linh hồn được nghỉ ngơi đời đời, và cho ánh sáng ngàn thu chiếu soi trên các linh hồn ấy.
Amen.`
  }
];
