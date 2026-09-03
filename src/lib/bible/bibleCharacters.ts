export interface CharacterReference {
  source: string;
  description: string;
  url?: string;
}

export interface BibleCharacter {
  id: string;
  name: string;
  aliases: string[];
  role: string;
  shortSummary: string;
  detailedHistory: string;
  imageUrl: string;
  imageCaption: string;
  references: CharacterReference[];
}

export const BIBLE_CHARACTERS: BibleCharacter[] = [
  {
    id: 'king-david',
    name: 'Vua Đa-vít',
    aliases: ['David', 'Thánh vương Đa-vít', 'Con Gie-sê'],
    role: 'Vua thứ hai của Vương quốc Israel thống nhất',
    shortSummary: 'Vị vua vĩ đại nhất của Israel, người chăn chiên đánh bại Gô-li-át, tác giả của nhiều Thánh Vịnh, và là tổ tiên theo xác phàm của Chúa Giê-su Ki-tô.',
    detailedHistory: `• Thông tin cá nhân: Đa-vít (sinh khoảng 1040 TCN - mất khoảng 970 TCN). Ông là con út của ông Gie-sê, thuộc chi tộc Giu-đa, xuất thân từ một cậu bé chăn chiên nhỏ bé tại Bê-lem.
• Thuộc vương triều: Vương quốc Ít-ra-en thống nhất. Ông là vị vua thứ hai và vĩ đại nhất của vương quốc.
• Nổi bật của vương triều: Đỉnh cao triều đại của ông là việc rước Hòm Bia Giao Ước về thủ đô, biến nơi đây thành trung tâm chính trị và tôn giáo của vương quốc. Đa-vít không chỉ là một chính trị gia lỗi lạc mà còn là một thi sĩ tài hoa, tác giả của 73 bài trong sách Thánh Vịnh. Dù phạm tội ngoại tình với bà Bát-sê-ba, nhưng lòng sám hối sâu sắc đã cứu rỗi ông. Thiên Chúa đã lập Giao ước Đa-vít vĩnh cửu, hứa rằng ngai vàng của ông sẽ tồn tại mãi (ứng nghiệm nơi Chúa Giê-su).
• Chiến công để lại: Nổi danh từ chiến công lịch sử đánh bại tên khổng lồ Gô-li-át của quân Phi-li-tinh chỉ bằng một chiếc ná thun. Sau khi lên ngôi, ông đã thống nhất 12 chi tộc Ít-ra-en, chinh phục thành Giê-bu và đổi tên thành Giê-ru-sa-lem (Thành Đa-vít), mở rộng bờ cõi vương quốc đến mức rộng lớn nhất trong lịch sử.`,
    imageUrl: '/images/bible/characters/david.jpg',
    imageCaption: 'Chân dung Vua Đa-vít - Tác phẩm cổ điển',
    references: [
      { source: '1 Sm 16,1-13', description: 'Sa-mu-en xức dầu tấn phong Đa-vít' },
      { source: '1 Sm 17', description: 'Đa-vít chiến thắng Gô-li-át' },
      { source: '2 Sm 11-12', description: 'Phạm tội cùng Bát-sê-ba và sự sám hối' },
      { source: '2 Sm 7,1-17', description: 'Lời hứa của Thiên Chúa với Đa-vít (Giao ước Đa-vít)' },
      { source: 'Mt 1,1', description: 'Gia phả Chúa Giê-su, Con vua Đa-vít' }
    ]
  },
  {
    id: 'king-solomon',
    name: 'Vua Sa-lô-môn',
    aliases: ['Solomon', 'Sa-lô-môn'],
    role: 'Vua thứ ba của Vương quốc Israel thống nhất',
    shortSummary: 'Con trai của Đa-vít và Bát-sê-ba, nổi tiếng với sự khôn ngoan xuất chúng, sự giàu có tột bậc và là người xây dựng Đền Thờ Giê-ru-sa-lem thứ nhất.',
    detailedHistory: `• Thông tin cá nhân: Sa-lô-môn (trị vì khoảng 970 TCN - 931 TCN) là con trai của Vua Đa-vít và bà Bát-sê-ba. Khi mới lên ngôi, ông đã khiêm tốn xin Thiên Chúa một "tâm hồn khôn ngoan và biết phân định" thay vì sự giàu có.
• Thuộc vương triều: Vương quốc Ít-ra-en thống nhất. Ông là vị vua thứ ba, kế vị cha mình trong bối cảnh vương quốc đang ở đỉnh cao quyền lực.
• Nổi bật của vương triều: Triều đại của ông nổi tiếng với sự khôn ngoan xuất chúng, sự giàu có vô song và nền hòa bình thịnh vượng chưa từng có (Nữ hoàng Sê-ba lặn lội từ xa đến chiêm ngưỡng). Ông được cho là tác giả của sách Châm Ngôn, Giảng Viên và Diễm Ca. Tuy nhiên, cuối đời vì cưới quá nhiều thê thiếp ngoại bang, ông đã sa ngã thờ lạy thần tượng, dẫn đến việc vương quốc bị xé đôi sau khi ông qua đời.
• Chiến công để lại: Công trình vĩ đại nhất lịch sử là việc xây dựng Đền Thờ Giê-ru-sa-lem (Đền Thờ thứ nhất) vô cùng tráng lệ trên núi Mô-ri-a, hoàn thành tâm nguyện mà vua cha chưa thực hiện được, trở thành trung tâm phụng tự duy nhất của toàn thể dân Ít-ra-en.`,
    imageUrl: '/images/bible/characters/solomon.jpg',
    imageCaption: 'Vua Sa-lô-môn - Họa phẩm cổ điển',
    references: [
      { source: '1 V 3,1-15', description: 'Sa-lô-môn xin Thiên Chúa sự khôn ngoan' },
      { source: '1 V 3,16-28', description: 'Phán quyết khôn ngoan của Sa-lô-môn về hai bà mẹ' },
      { source: '1 V 6-8', description: 'Xây dựng và cung hiến Đền Thờ Giê-ru-sa-lem' },
      { source: '1 V 11,1-13', description: 'Sự sa ngã của Sa-lô-môn' }
    ]
  },
  {
    id: 'king-saul',
    name: 'Vua Sa-un',
    aliases: ['Saul', 'Sa-un'],
    role: 'Vua đầu tiên của Vương quốc Israel',
    shortSummary: 'Vị vua đầu tiên của Israel do ngôn sứ Sa-mu-en xức dầu tấn phong, có khởi đầu đầy hứa hẹn nhưng sau đó bị Thiên Chúa từ bỏ vì sự bất tuân.',
    detailedHistory: `• Thông tin cá nhân: Sa-un (trị vì khoảng 1047 TCN - 1007 TCN) thuộc chi tộc Ben-gia-min. Ông được miêu tả là một thanh niên cao lớn, tuấn tú xuất chúng, "cao hơn mọi người từ vai trở lên".
• Thuộc vương triều: Vương quốc Ít-ra-en. Ông là vị vua đầu tiên, được ngôn sứ Sa-mu-en xức dầu tấn phong theo ý muốn của dân chúng muốn có vua cai trị.
• Nổi bật của vương triều: Có khởi đầu đầy hứa hẹn, nhưng quyền lực đã làm ông kiêu ngạo. Việc tự ý dâng của lễ và không vâng lời Thiên Chúa tiêu diệt dân A-ma-lếch đã khiến ông bị tước bỏ vương quyền. Những năm cuối đời, ông rơi vào hoang tưởng, ghen tuông điên cuồng và dành phần lớn thời gian truy sát bề tôi trung thành Đa-vít. Cuối cùng, ông tự sát bi thảm trên núi Ghin-bô-a.
• Chiến công để lại: Là nhà lãnh đạo quân sự xuất sắc trong giai đoạn đầu, ông đã thống nhất các chi tộc rời rạc thành một thể thống nhất và giành nhiều chiến thắng quan trọng, giải phóng dân Ít-ra-en khỏi ách áp bức của quân Am-môn, Mô-áp và Phi-li-tinh.`,
    imageUrl: '/images/bible/characters/saul.jpg',
    imageCaption: 'Chân dung Vua Sa-un - Tác phẩm cổ điển',
    references: [
      { source: '1 Sm 9-10', description: 'Sa-un được chọn và xức dầu làm vua' },
      { source: '1 Sm 13,8-14', description: 'Sa-un bất tuân tự ý dâng của lễ' },
      { source: '1 Sm 15', description: 'Sa-un không vâng lệnh tiêu diệt A-ma-lếch và bị Thiên Chúa từ bỏ' },
      { source: '1 Sm 31', description: 'Cái chết của Vua Sa-un trên núi Ghin-bô-a' }
    ]
  }
];

export function getCharacterById(id: string): BibleCharacter | undefined {
  return BIBLE_CHARACTERS.find(c => c.id === id);
}

export function searchCharacters(query: string): BibleCharacter[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return BIBLE_CHARACTERS;
  
  return BIBLE_CHARACTERS.filter(c => 
    c.name.toLowerCase().includes(normalizedQuery) ||
    c.aliases.some(a => a.toLowerCase().includes(normalizedQuery)) ||
    c.role.toLowerCase().includes(normalizedQuery)
  );
}
