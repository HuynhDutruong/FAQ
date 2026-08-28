/**
 * Dữ liệu Lịch Phụng Vụ Công Giáo chi tiết từ loichuahomnay.vn
 * Bao gồm Lễ gì trong ngày, Bậc Lễ, Các Bài Đọc & Tin Mừng, Màu Áo Lễ Linh Mục.
 */

export interface LiturgicalDayDetail {
  date: string;       // DD/MM
  title: string;      // Thánh lễ / Ý nghĩa ngày lễ
  rank: string;       // Lễ trọng / Lễ kính / Lễ nhớ / Ngày trong tuần
  readings: string;   // Bài đọc 1, Đáp ca, Bài đọc 2, Phúc âm
  color: string;      // Trắng / Đỏ / Xanh / Tím / Hồng
  colorHex: string;   // Mã màu hiển thị
}

export const LITURGICAL_CALENDAR_DATA: Record<string, LiturgicalDayDetail> = {
  "08-24": {
    "date": "24/08",
    "title": "Thánh Barthôlômêô, tông đồ",
    "rank": "Lễ kính",
    "readings": "Kh 21,9b-14; Ga 1,45-51; (Đ)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "08-25": {
    "date": "25/08",
    "title": "Thánh Luy, vua nước Pháp và thánh Giuse Calasanz, linh mục",
    "rank": "Ngày trong tuần",
    "readings": "2 Tx 2,1-3a.14-17; Mt 23,23-26; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "08-26": {
    "date": "26/08",
    "title": "Thứ Tư trong tuần thứ Hai Mươi-Nhất Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "2 Tx 3,6-10.16-18; Mt 23,27-32; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "08-27": {
    "date": "27/08",
    "title": "Thánh nữ Mônica",
    "rank": "Lễ nhớ",
    "readings": "1 Cr 1,1-9; Mt 24,42-51; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "08-28": {
    "date": "28/08",
    "title": "Thánh Augustinô, giám mục, tiến sĩ Hội Thánh",
    "rank": "Lễ nhớ",
    "readings": "1 Cr 1,17-25; Mt 25,1-13; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "08-29": {
    "date": "29/08",
    "title": "Thánh Gioan Tẩy Giả bị trảm quyết",
    "rank": "Lễ nhớ",
    "readings": "Gr 1,17-19; Mc 6,17-29; (Đ)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "08-30": {
    "date": "30/08",
    "title": "CHÚA NHẬT XXII THƯỜNG NIÊN. Thánh vịnh tuần II",
    "rank": "Lễ trọng",
    "readings": "Gr 20,7-9; Rm 12,1-2; Mt 16,21-27; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "08-01": {
    "date": "01/08",
    "title": "Thứ bảy đầu tháng. Thánh Alphongsô Maria Ligôri, giám mục, tiến sĩ Hội Thánh",
    "rank": "Lễ nhớ",
    "readings": "Gr 26,11-16.24; Mt 14,1-12; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "08-02": {
    "date": "02/08",
    "title": "CHÚA NHẬT XVIII THƯỜNG NIÊN. Thánh vịnh tuần II",
    "rank": "Lễ trọng",
    "readings": "Is 55,1-3; Rm 8,35.37-39; Mt 14,13-21; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "08-03": {
    "date": "03/08",
    "title": "Thứ Hai trong tuần thứ Mười Tám Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Gr 28,1-17; Mt 14,22-36; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "08-04": {
    "date": "04/08",
    "title": "Thánh Gioan Maria Vianney, linh mục",
    "rank": "Lễ nhớ",
    "readings": "Gr 30,1-2.12-15.18-22; Mt 15,1-2.10-14; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "08-05": {
    "date": "05/08",
    "title": "Cung hiến thánh đường Đức Maria",
    "rank": "Ngày trong tuần",
    "readings": "Gr 31,1-7; Mt 15,21-28; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "08-06": {
    "date": "06/08",
    "title": "CHÚA HIỂN DUNG",
    "rank": "Lễ kính",
    "readings": "Đn 7.9-10,13-14 (hay 2 Pr 1,16-19); Mt 17,1-9; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "08-07": {
    "date": "07/08",
    "title": "Thánh Xystô II, giáo hoàng và các bạn, tử đạo. Thánh Cajêtanô, linh mục",
    "rank": "Ngày trong tuần",
    "readings": "Nk 2,1.3; 3,1-3.6-7; Mt 16,24-28; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "08-08": {
    "date": "08/08",
    "title": "Thánh Đa Minh, linh mục",
    "rank": "Lễ nhớ",
    "readings": "Kb 1,12-2,4; Mt 17,14-20; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "08-09": {
    "date": "09/08",
    "title": "CHÚA NHẬT XIX THƯỜNG NIÊN. Thánh vịnh tuần III",
    "rank": "Lễ trọng",
    "readings": "1 V 19,9a.11-13a; Rm 9,1-5; Mt 14,22-33; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "08-10": {
    "date": "10/08",
    "title": "Thánh Laurensô, Phó tế, Tử đạo",
    "rank": "Lễ kính",
    "readings": "2 Cr 9,6-10; Ga 12,24-26; (Đ)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "08-11": {
    "date": "11/08",
    "title": "Thánh Clara, trinh nữ",
    "rank": "Lễ nhớ",
    "readings": "Ed 2,8-3,4; Mt 18,1-5.10.12-14; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "08-12": {
    "date": "12/08",
    "title": "Thánh Joanna Phanxica Chantal, nữ tu. Thánh Giacôbê Đỗ Mai Năm, linh mục; thánh Antôn Nguyễn Tiến Đích, chánh trương; thánh Micae Nguyễn Huy Mỹ, lý trưởng, tử đạo († 1838)",
    "rank": "Ngày trong tuần",
    "readings": "Ed 9,1-7; 10,18-22; Mt 18,15-20; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "08-13": {
    "date": "13/08",
    "title": "Thánh Pontianô, giáo hoàng và thánh Hippôlytô, linh mục, tử đạo",
    "rank": "Ngày trong tuần",
    "readings": "Ed 12,1-12; Mt 18,21-19,1; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "08-14": {
    "date": "14/08",
    "title": "Thánh Maximilianô Maria Kolbê, linh mục, tử đạo. Chiều: LỄ VỌNG ĐỨC MẸ LÊN TRỜI (Tr)",
    "rank": "Lễ nhớ",
    "readings": "Ed 16,1-15.60.63; Mt 19,3-12. Chiều: 1 Sb 15,3-4.15-16; 16,1-2; 1 Cr 15, 54b-57; Lc 11,27-28; (Đ)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "08-15": {
    "date": "15/08",
    "title": "ĐỨC MẸ LÊN TRỜI",
    "rank": "Lễ trọng",
    "readings": "Kh 11,19a; 12,1-6a.10ab; 1 Cr 15,20-27; Lc 1, 39-56; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "08-16": {
    "date": "16/08",
    "title": "CHÚA NHẬT XX THƯỜNG NIÊN. Thánh vịnh tuần IV",
    "rank": "Lễ trọng",
    "readings": "Is 56,1.6-7; Rm 11,13-15.29-32; Mt 15,21-28; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "08-17": {
    "date": "17/08",
    "title": "Thứ Hai trong tuần thứ Hai Mươi Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Ed 24,15-14; Mt 19,16-22; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "08-18": {
    "date": "18/08",
    "title": "Thứ Ba trong tuần thứ Hai Mươi Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Ed 28,1-10; Mt 19,23-30; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "08-19": {
    "date": "19/08",
    "title": "Thánh Gioan Êuđê, linh mục",
    "rank": "Ngày trong tuần",
    "readings": "Ed 34,1-11; Mt 20,1-16a; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "08-20": {
    "date": "20/08",
    "title": "Thánh Bernarđô, viện phụ, tiến sĩ Hội Thánh",
    "rank": "Lễ nhớ",
    "readings": "Ed 36,23-28; Mt 22,1-14; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "08-21": {
    "date": "21/08",
    "title": "Thánh Piô X, Giáo hoàng",
    "rank": "Lễ nhớ",
    "readings": "Ed 37,1-14; Mt 22,34-40; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "08-22": {
    "date": "22/08",
    "title": "Đức Maria Nữ Vương",
    "rank": "Lễ nhớ",
    "readings": "Is 9,1-6 ; Lc 1,26-38 (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "08-23": {
    "date": "23/08",
    "title": "CHÚA NHẬT XXI THƯỜNG NIÊN. Thánh vịnh tuần I",
    "rank": "Lễ trọng",
    "readings": "Is 22,19-23; Rm 11,33-36; Mt 16,13-20; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "08-31": {
    "date": "31/08",
    "title": "Thứ Hai trong tuần thứ Hai Mươi-Hai Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "1 Cr 2,1-5; Lc 4,16-30; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "09-01": {
    "date": "01/09",
    "title": "Thứ Ba trong tuần thứ Hai Mươi-Hai Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "1 Cr 2,10b-16; Lc 4,31-37; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "09-02": {
    "date": "02/09",
    "title": "Ngày Quốc khánh. Cầu cho Tổ quốc",
    "rank": "Ngày trong tuần",
    "readings": "1 Cr 3,1-9; Lc 4,38-44; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "09-03": {
    "date": "03/09",
    "title": "Thánh Grêgôriô Cả, giáo hoàng, tiến sĩ Hội Thánh",
    "rank": "Lễ nhớ",
    "readings": "1 Cr 3,18-23; Lc 5,1-11; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "09-04": {
    "date": "04/09",
    "title": "Thứ sáu đầu tháng",
    "rank": "Ngày trong tuần",
    "readings": "1 Cr 4,1-5; Lc 5,33-39; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "09-05": {
    "date": "05/09",
    "title": "Thứ bảy đầu tháng. Thánh Têrêsa Calcutta, nữ tu (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "1 Cr 4,6b-15; Lc 6,1-5; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "09-06": {
    "date": "06/09",
    "title": "CHÚA NHẬT XXIII THƯỜNG NIÊN. Thánh vịnh tuần III",
    "rank": "Lễ trọng",
    "readings": "Ed 33,7-9; Rm 13,8-10; Mt 18,15-20; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "09-07": {
    "date": "07/09",
    "title": "Thứ Hai trong tuần thứ Hai Mươi-Ba Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "1 Cr 5,1-8; Lc 6,6-11; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "09-08": {
    "date": "08/09",
    "title": "SINH NHẬT ĐỨC TRINH NỮ MARIA",
    "rank": "Lễ kính",
    "readings": "Mk 5,1-4a (hay Rm 8,28-30); Mt 1,1-16.18-23 (hay Mt 1,18-23); (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "09-09": {
    "date": "09/09",
    "title": "Thánh Phêrô Claver, linh mục",
    "rank": "Ngày trong tuần",
    "readings": "1 Cr 7,25-31; Lc 6,20-26; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "09-10": {
    "date": "10/09",
    "title": "Thứ Năm trong tuần thứ Hai Mươi-Ba Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "1 Cr 8,1-7.11-13; Lc 6,27-38; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "09-11": {
    "date": "11/09",
    "title": "Thứ Sáu trong tuần thứ Hai Mươi-Ba Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "1 Cr 9,16-19.22b-27; Lc 6,39-4s; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "09-12": {
    "date": "12/09",
    "title": "Danh Thánh Đức Maria",
    "rank": "Ngày trong tuần",
    "readings": "1 Cr 10,14-22; Lc 6,43-49 . Lễ về Đức Mẹ Gl 4,4-7 hay Ep 1,3-6.11-12; Lc 1,39-47; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "09-13": {
    "date": "13/09",
    "title": "CHÚA NHẬT XXIV THƯỜNG NIÊN. Thánh vịnh tuần IV",
    "rank": "Lễ nhớ",
    "readings": "Hc 27,30-28,7; Rm 14,7-9; Mt 18,21-35; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "09-14": {
    "date": "14/09",
    "title": "Suy tôn Thánh giá",
    "rank": "Lễ kính",
    "readings": "Ds 21,4b-9 hay Pl 2,6-11; Ga 3,13-17; (Đ)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "09-15": {
    "date": "15/09",
    "title": "Đức Mẹ Sầu Bi",
    "rank": "Lễ nhớ",
    "readings": "Dt 5,7-9; Ga 19,25-27 (hay Lc 2,33-35); (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "09-16": {
    "date": "16/09",
    "title": "Thánh Cornêliô, giáo hoàng, tử đạo và thánh Cyprianô, giám mục, tử đạo",
    "rank": "Lễ nhớ",
    "readings": "1 Cr 12,31-13,13; Lc 7,31-35; (Đ)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "09-17": {
    "date": "17/09",
    "title": "Thánh Robertô Bellarminô, giám mục, tiến sĩ Hội Thánh. Thánh Hildegardis Bingensis, trinh nữ, tiến sĩ Hội Thánh. Thánh Emmanuel Nguyễn Văn Triệu, linh mục, tử đạo († 1798)",
    "rank": "Ngày trong tuần",
    "readings": "1 Cr 15,1-11; Lc 7,36-50; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "09-18": {
    "date": "18/09",
    "title": "Thứ Sáu trong tuần thứ Hai Mươi-Tư Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "1 Cr 15,12-20; Lc 8,1-3; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "09-19": {
    "date": "19/09",
    "title": "Thánh Januariô, giám mục, tử đạo.",
    "rank": "Ngày trong tuần",
    "readings": "1 Cr 15,35-37.42-49; Lc 8,4-15; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "09-20": {
    "date": "20/09",
    "title": "CHÚA NHẬT XXV THƯỜNG NIÊN. Thánh vịnh tuần I",
    "rank": "Lễ nhớ",
    "readings": "Is 55,6-9; Pl 1,20c-24.27a; Mt 20,1-16a; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "09-21": {
    "date": "21/09",
    "title": "Thánh Matthêô, Tông đồ, Tác giả sách Tin Mừng",
    "rank": "Ngày trong tuần",
    "readings": "Ep 4,1-7.11-13; Mt 9,9-13; (Đ)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "09-22": {
    "date": "22/09",
    "title": "Thứ Ba trong tuần thứ Hai Mươi-Năm Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Cn 21,1-6.10-13; Lc 8,19-21; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "09-23": {
    "date": "23/09",
    "title": "Thánh Piô Pietrelcina, linh mục",
    "rank": "Lễ nhớ",
    "readings": "Cn 30,5-9; Lc 9,1-6; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "09-24": {
    "date": "24/09",
    "title": "Thứ Năm trong tuần thứ Hai Mươi-Năm Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Gv 1,2-11; Lc 9,7-9; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "09-25": {
    "date": "25/09",
    "title": "Ngày Trung thu. Cầu cho thiếu nhi.",
    "rank": "Ngày trong tuần",
    "readings": "Gv 3,1-11; Lc 9,18-22; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "09-26": {
    "date": "26/09",
    "title": "Thánh Cosma và thánh Đamianô, tử đạo",
    "rank": "Ngày trong tuần",
    "readings": "Gv 11,9-12,8; Lc 9,43b-45; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "09-27": {
    "date": "27/09",
    "title": "CHÚA NHẬT XXVI THƯỜNG NIÊN. Thánh vịnh tuần II",
    "rank": "Lễ trọng",
    "readings": "Ed 18,25-28; Pl 2,1-11; Mt 21,28-32; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "09-28": {
    "date": "28/09",
    "title": "Thánh Venceslaô , Tử đạo (Đ). Thánh Laurensô Ruiz và các bạn, Tử đạo (Đ)",
    "rank": "Ngày trong tuần",
    "readings": "G 1,6-22; Lc 9,46-50; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "09-29": {
    "date": "29/09",
    "title": "CÁC TỔNG LÃNH THIÊN THẦN MICHAEL, GABRIEL, RAPHAEL",
    "rank": "Lễ kính",
    "readings": "Ðn 7,9-10.13-14 (hay Kh 12,7-12a; Ga 1,47-51; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "09-30": {
    "date": "30/09",
    "title": "Thánh Giêrônimô, linh mục, tiến sĩ Hội Thánh",
    "rank": "Lễ nhớ",
    "readings": "G 9,1-12.14-16; Lc 9,57-62; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "10-01": {
    "date": "01/10",
    "title": "Thánh Tê-rê-xa Hài Đồng Giê-su, trinh nữ, tiến sĩ Hội Thánh",
    "rank": "Lễ kính",
    "readings": "Is 66,10-14c [Rm 8,14-17]; Mt 18,1-5; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "10-02": {
    "date": "02/10",
    "title": "Các thiên thần hộ thủ",
    "rank": "Lễ nhớ",
    "readings": "Xh 23,20-23; Mt 18,1-5.10; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "10-03": {
    "date": "03/10",
    "title": "Thứ bảy đầu tháng",
    "rank": "Ngày trong tuần",
    "readings": "G 42,1-3.5-6.12-16; Lc 10,17-24; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "10-04": {
    "date": "04/10",
    "title": "CHÚA NHẬT XXVII THƯỜNG NIÊN. Thánh vịnh tuần III. Được kính trọng thể lễ Đức Mẹ Mân Côi (Tr)",
    "rank": "Lễ nhớ",
    "readings": "Is 5,1-7; Pl 4,6-9; Mt 21,33-43; Lễ Mẹ Mân Côi Cv 1,12-14; Gl 4,4-7; Lc 1,26-38; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "10-05": {
    "date": "05/10",
    "title": "Thánh Faustina Kowalska, trinh nữ (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "Gl 1,6-12; Lc 10,25-37; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "10-06": {
    "date": "06/10",
    "title": "Thánh Brunô, linh mục (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "Gl 1,13-24; Lc 10,38-42; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "10-07": {
    "date": "07/10",
    "title": "Lễ Đức Mẹ Mân Côi",
    "rank": "Lễ nhớ",
    "readings": "Cv 1, 12-14 (hay Gl 4,4-7); Lc 1, 26-38; (Tr)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "10-08": {
    "date": "08/10",
    "title": "Thứ Năm trong tuần thứ Hai Mươi-Bảy Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Gl 3,1-5; Lc 11,5-13; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "10-09": {
    "date": "09/10",
    "title": "Thánh Điônysiô, giám mục, và các bạn, tử đạo (Đ). Thánh Gioan Lêônarđô, linh mục (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "Gl 3,7-14; Lc 11,15-26; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "10-10": {
    "date": "10/10",
    "title": "Thứ Bảy trong tuần thứ Hai Mươi-Bảy Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Gl 3,22-29; Lc 11,27-28; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "10-11": {
    "date": "11/10",
    "title": "CHÚA NHẬT XXVIII THƯỜNG NIÊN. Thánh vịnh tuần IV",
    "rank": "Lễ trọng",
    "readings": "Is 25,6-10a; Pl 4,12-14.19-20; Mt 22,1-14 hay Mt 22,1-10; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "10-12": {
    "date": "12/10",
    "title": "Thứ Hai trong tuần thứ Hai Mươi-Tám Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Gl 4,22-24.26-27.31-5,1; Lc 11,29-32; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "10-13": {
    "date": "13/10",
    "title": "Thứ Ba trong tuần thứ Hai Mươi-Tám Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Gl 5,1-6; Lc 11,37-41; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "10-14": {
    "date": "14/10",
    "title": "Thánh Callistô I, giáo hoàng, tử đạo (Đ)",
    "rank": "Ngày trong tuần",
    "readings": "Gl 5,18-25; Lc 11,42-46; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "10-15": {
    "date": "15/10",
    "title": "Thánh Tê-rê-xa Giê-su, trinh nữ, tiến sĩ Hội Thánh",
    "rank": "Lễ nhớ",
    "readings": "Ep 1,1-10; Lc 11,47-54; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "10-16": {
    "date": "16/10",
    "title": "Thánh Hedviges, nữ tu (Tr). Thánh Margarita Alacoque, trinh nữ (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "Ep 1,11-14; Lc 12,1-7; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "10-17": {
    "date": "17/10",
    "title": "Thánh I-nha-xi-ô thành An-ti-ô-khi-a, giám mục, tử đạo",
    "rank": "Lễ nhớ",
    "readings": "Ep 1,15-23; Lc 12,8-12; (Đ)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "10-18": {
    "date": "18/10",
    "title": "CHÚA NHẬT XXIX THƯỜNG NIÊN. Thánh vịnh tuần I. Chúa nhật truyền giáo",
    "rank": "Lễ trọng",
    "readings": "Is 45,1.4-6; 1 Tx 1,1-5b; Mt 22,15-21; (Đ)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "10-19": {
    "date": "19/10",
    "title": "Thánh Gioan Brêbeuf, linh mục, thánh Isaac Jôgues, linh mục, và các bạn, tử đạo (Đ), thánh Phaolô Thánh Giá, linh mục (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "Ep 2,1-10; Lc 12,13-21; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "10-20": {
    "date": "20/10",
    "title": "Thứ Ba trong tuần thứ Hai Mươi-Chín Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Ep 2,12-22; Lc 12,35-38; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "10-21": {
    "date": "21/10",
    "title": "Thứ Tư trong tuần thứ Hai Mươi-Chín Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Ep 3,2-12; Lc 12,39-48; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "10-22": {
    "date": "22/10",
    "title": "Thánh Gioan Phaolô II, giáo hoàng (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "Ep 3,14-21; Lc 12,49-53 hay Lễ Giáo hoàng Is 52,7-10; Ga 21,15-17; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "10-23": {
    "date": "23/10",
    "title": "Thánh Gioan Capestranô, linh mục (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "Ep 4,1-6; Lc 12,54-59; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "10-24": {
    "date": "24/10",
    "title": "Thánh Antôn Maria Claret, giám mục (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "Ep 4,7-16; Lc 13,1-9; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "10-25": {
    "date": "25/10",
    "title": "CHÚA NHẬT XXX THƯỜNG NIÊN. Thánh vịnh tuần II",
    "rank": "Lễ trọng",
    "readings": "Xh 22,20-26; 1 Tx 1,5c-10; Mt 22,34-40; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "10-26": {
    "date": "26/10",
    "title": "Thứ Hai trong tuần thứ Ba Mươi Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Ep 4,32-5,8; Lc 13,10-17; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "10-27": {
    "date": "27/10",
    "title": "Thứ Ba trong tuần thứ Ba Mươi Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Ep 5,21-33; Lc 13,18-21; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "10-28": {
    "date": "28/10",
    "title": "Thánh Si-mon và thánh Giu-đa, tông đồ",
    "rank": "Lễ kính",
    "readings": "Ep 2,19-22; Lc 6, 12-19; (Đ)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "10-29": {
    "date": "29/10",
    "title": "Thứ Năm trong tuần thứ Ba Mươi Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Ep 6,10-20; Lc 13,31-35; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "10-30": {
    "date": "30/10",
    "title": "Thứ Sáu trong tuần thứ Ba Mươi Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Pl 1,1-11; Lc 14,1-6; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "10-31": {
    "date": "31/10",
    "title": "Thứ Bảy trong tuần thứ Ba Mươi Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Pl 1,18-26; Lc 14,1.7-11; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "11-01": {
    "date": "01/11",
    "title": "CHÚA NHẬT XXXI THƯỜNG NIÊN. CÁC THÁNH NAM NỮ.",
    "rank": "Lễ trọng",
    "readings": "Kh 7.2-4.9-14; 1 Ga 3,1-3; Mt 5,1-12a; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "11-02": {
    "date": "02/11",
    "title": "Cầu Cho Các Tín Hữu Đã Qua Đời",
    "rank": "Ngày trong tuần",
    "readings": "",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "11-03": {
    "date": "03/11",
    "title": "Thánh Mác-ti-nô Po-ret, tu sĩ (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "Pl 2,5-11; Lc 14,15-24; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "11-04": {
    "date": "04/11",
    "title": "Thánh Ca-rô-lô Bô-rô-mê-ô, giám mục",
    "rank": "Lễ nhớ",
    "readings": "Pl 2,12-18; Lc 14,25-33; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "11-05": {
    "date": "05/11",
    "title": "Thứ năm đầu tháng Thánh Đa-minh Đinh Đức Mậu, Linh mục (+1862), Tử đạo",
    "rank": "Ngày trong tuần",
    "readings": "Pl 3,3-8a; Lc 15,1-10; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "11-06": {
    "date": "06/11",
    "title": "Thứ sáu đầu tháng",
    "rank": "Ngày trong tuần",
    "readings": "Pl 3,17-4,1; Lc 16,1-8; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "11-07": {
    "date": "07/11",
    "title": "Thứ bảy đầu tháng",
    "rank": "Ngày trong tuần",
    "readings": "Pl 4,10-19; Lc 16,9-15; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "11-08": {
    "date": "08/11",
    "title": "CHÚA NHẬT XXXII THƯỜNG NIÊN. Thánh vịnh tuần IV",
    "rank": "Lễ trọng",
    "readings": "Kn 6,12-16; 1 Tx 4,13-18 hay 1 Tx 4,13-14; Mt 25,1-13; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "11-09": {
    "date": "09/11",
    "title": "Cung hiến thánh đường La-tê-ra-nô",
    "rank": "Lễ kính",
    "readings": "Ed 47,1-2.8-9.12 hay 1Cr 3,9c-11.16-17; Ga 2,13-22; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "11-10": {
    "date": "10/11",
    "title": "Thánh Lê-ô Cả, giáo hoàng, tiến sĩ Hội Thánh",
    "rank": "Lễ nhớ",
    "readings": "Tt 2,1-8.11-14; Lc 17,7-10; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "11-11": {
    "date": "11/11",
    "title": "Thánh Mác-ti-nô thành Tua, giám mục",
    "rank": "Lễ nhớ",
    "readings": "Tt 3,1-7; Lc 17,11-19; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "11-12": {
    "date": "12/11",
    "title": "Thánh Giô-sa-phát, giám mục, tử đạo",
    "rank": "Ngày trong tuần",
    "readings": "Plm 7-20; Lc 17,20-25; (Đ)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "11-13": {
    "date": "13/11",
    "title": "Thứ Sáu i trong tuần thứ Ba Mươi-Hai Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "2 Ga 4-9; Lc 17,26-37; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "11-14": {
    "date": "14/11",
    "title": "Thứ Bảy i trong tuần thứ Ba Mươi-Hai Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "3 Ga 5-8; Lc 18,1-8; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "11-15": {
    "date": "15/11",
    "title": "CHÚA NHẬT XXXIII THƯỜNG NIÊN. Thánh vịnh tuần I. Kính trọng thể Các Thánh Tử Đạo Việt Nam (Đ)",
    "rank": "Lễ trọng",
    "readings": "Cn 31,10-13.19-20.30-31; 1 Tx 5,1-6; Mt 25,14-30 hay Mt 25,14-15.19-21; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "11-16": {
    "date": "16/11",
    "title": "Thánh nữ Margarita Scotland (Tr). Thánh Gertruđê, trinh nữ (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "Kh 1,1-4; 2,1-5a; Lc 18,35-43; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "11-17": {
    "date": "17/11",
    "title": "Thánh nữ Ê-li-sa-bet nước Hung-ga-ri",
    "rank": "Lễ nhớ",
    "readings": "Kh 3,1-6.14-22; Lc 19,1-10; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "11-18": {
    "date": "18/11",
    "title": "Cung hiến đền thờ Thánh Phê-rô và đền thờ Thánh Phao-lô ở Rôma (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "Kh 4,1-11; Lc 19,11-28 hay lễ về hai Thánh Tông đồ Cv 28,11-16.30-31; Mt 14,22-23; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "11-19": {
    "date": "19/11",
    "title": "Thứ Năm trong tuần thứ Ba Mươi-Ba Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Kh 5,1-10; Lc 19,41-44; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "11-20": {
    "date": "20/11",
    "title": "Thứ Sáu trong tuần thứ Ba Mươi-Ba Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Kh 10,8-11; Lc 19,45-48; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "11-21": {
    "date": "21/11",
    "title": "Đức Mẹ dâng mình trong đền thờ",
    "rank": "Lễ nhớ",
    "readings": "Dcr 2,14-17; Mt 12,46-50; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "11-22": {
    "date": "22/11",
    "title": "CHÚA NHẬT XXXIV THƯỜNG NIÊN. CHÚA GIÊ-SU KI-TÔ VUA VŨ TRỤ",
    "rank": "Lễ trọng",
    "readings": "Ed 34,11-12.15-17; 1 Cr 15,20-26.28; Mt 25,31-46; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "11-23": {
    "date": "23/11",
    "title": "Thánh vịnh tuần II. Thánh Clêmentê I, Giáo hoàng, Tử đạo (Đ). Thánh Côlumbanô, Viện phụ (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "Kh 14,1-3.4b-5; Lc 21,1-4; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "11-24": {
    "date": "24/11",
    "title": "CÁC THÁNH TỬ ĐẠO VIỆT NAM. Bổn mạng Hội Thánh Việt Nam",
    "rank": "Lễ trọng",
    "readings": "",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "11-25": {
    "date": "25/11",
    "title": "Thánh Ca-ta-ri-na A-lê-xan-ri-a, Trinh nữ, Tử đạo (Đ)",
    "rank": "Ngày trong tuần",
    "readings": "Kh 15,1-4; Lc 21,12-19; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "11-26": {
    "date": "26/11",
    "title": "Thứ Năm trong tuần thứ Ba Mươi-Tư Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Kh 18,1-2.21-23; 19,1-3.9a; Lc 21,20-28; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "11-27": {
    "date": "27/11",
    "title": "Thứ Sáu trong tuần thứ Ba Mươi-Tư Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Kh 20,1-4.11-21,2; Lc 21,29-33; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "11-28": {
    "date": "28/11",
    "title": "Hết năm phụng vụ 2026",
    "rank": "Ngày trong tuần",
    "readings": "Kh 22,1-7; Lc 21,34-36; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "11-29": {
    "date": "29/11",
    "title": "CHÚA NHẬT I MÙA VỌNG",
    "rank": "Lễ trọng",
    "readings": "Đn 7,15-27; Lc 21,34-36; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "11-30": {
    "date": "30/11",
    "title": "Thánh Anrê Tông đồ",
    "rank": "Lễ kính",
    "readings": "Đn 7,15-27; Lc 21,34-36; (Đ)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "12-01": {
    "date": "01/12",
    "title": "Thứ Ba trong tuần thứ Nhất Mùa Vọng",
    "rank": "Ngày trong tuần",
    "readings": "",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "12-02": {
    "date": "02/12",
    "title": "Thứ Tư trong tuần thứ Nhất Mùa Vọng",
    "rank": "Ngày trong tuần",
    "readings": "",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "12-03": {
    "date": "03/12",
    "title": "Thứ năm đầu tháng. Thánh Phanxicô Xaviê, Linh mục. Bổn mạng các xứ truyền giáo",
    "rank": "Lễ kính",
    "readings": "",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "12-04": {
    "date": "04/12",
    "title": "Thứ sáu đầu tháng. Thánh Gioan Đamas, Linh mục, Tiến sĩ Hội Thánh (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "12-05": {
    "date": "05/12",
    "title": "Thứ Bảy trong tuần thứ Nhất Mùa Vọng",
    "rank": "Ngày trong tuần",
    "readings": "",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "12-06": {
    "date": "06/12",
    "title": "Chúa nhật II Mùa Vọng",
    "rank": "Ngày trong tuần",
    "readings": "",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "12-07": {
    "date": "07/12",
    "title": "Thánh Ambrôsiô, Giám mục, Tiến sĩ Hội Thánh",
    "rank": "Lễ nhớ",
    "readings": "",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "12-08": {
    "date": "08/12",
    "title": "Đức Maria vô nhiễm nguyên tội",
    "rank": "Lễ trọng",
    "readings": "",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "12-09": {
    "date": "09/12",
    "title": "Thứ Tư trong tuần thứ Hai Mùa Vọng",
    "rank": "Ngày trong tuần",
    "readings": "",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "12-10": {
    "date": "10/12",
    "title": "Thứ Năm trong tuần thứ Hai Mùa Vọng",
    "rank": "Ngày trong tuần",
    "readings": "",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "12-11": {
    "date": "11/12",
    "title": "(Tr) Thánh Đa-ma-xô I, Giáo hoàng",
    "rank": "Ngày trong tuần",
    "readings": "",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "12-12": {
    "date": "12/12",
    "title": "(Tr) Đức Trinh Nữ Ma-ri-a Goa-đa-lu-pê (Guadalupe)",
    "rank": "Ngày trong tuần",
    "readings": "",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "12-13": {
    "date": "13/12",
    "title": "CHÚA NHẬT III MÙA VỌNG",
    "rank": "Lễ trọng",
    "readings": "",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "12-14": {
    "date": "14/12",
    "title": "Thánh Gioan Thánh Giá, Linh mục, Tiến sĩ Hội Thánh",
    "rank": "Lễ nhớ",
    "readings": "",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "12-15": {
    "date": "15/12",
    "title": "Thứ Ba trong tuần thứ Ba Mùa Vọng",
    "rank": "Ngày trong tuần",
    "readings": "",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "12-16": {
    "date": "16/12",
    "title": "Thứ Tư trong tuần thứ Ba Mùa Vọng",
    "rank": "Ngày trong tuần",
    "readings": "",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "12-17": {
    "date": "17/12",
    "title": "17 tháng 12 Mùa Vọng",
    "rank": "Ngày trong tuần",
    "readings": "",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "12-18": {
    "date": "18/12",
    "title": "18 tháng 12 Mùa Vọng",
    "rank": "Ngày trong tuần",
    "readings": "",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "12-19": {
    "date": "19/12",
    "title": "19 tháng 12 Mùa Vọng",
    "rank": "Ngày trong tuần",
    "readings": "",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "12-20": {
    "date": "20/12",
    "title": "Chúa Nhật thứ Tư Mùa Vọng",
    "rank": "Ngày trong tuần",
    "readings": "",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "12-21": {
    "date": "21/12",
    "title": "21 tháng 12 Mùa Vọng",
    "rank": "Ngày trong tuần",
    "readings": "",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "12-22": {
    "date": "22/12",
    "title": "22 tháng 12 Mùa Vọng",
    "rank": "Ngày trong tuần",
    "readings": "",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "12-23": {
    "date": "23/12",
    "title": "23 tháng 12 Mùa Vọng",
    "rank": "Ngày trong tuần",
    "readings": "",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "12-24": {
    "date": "24/12",
    "title": "24 tháng 12 Mùa Vọng",
    "rank": "Ngày trong tuần",
    "readings": "",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "12-25": {
    "date": "25/12",
    "title": "Chúa Giáng Sinh",
    "rank": "Lễ trọng",
    "readings": "",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "12-26": {
    "date": "26/12",
    "title": "Thánh Tê-pha-nô, tử đạo tiên khởi",
    "rank": "Lễ kính",
    "readings": "",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "12-27": {
    "date": "27/12",
    "title": "Thánh Gio-an, tông đồ, tác giả sách Tin Mừng",
    "rank": "Lễ kính",
    "readings": "",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "12-28": {
    "date": "28/12",
    "title": "Thánh Gia Thất: Chúa Giê-su, Đức Maria và thánh Giu-se",
    "rank": "Lễ kính",
    "readings": "",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "12-29": {
    "date": "29/12",
    "title": "Ngày thứ năm trong tuần Bát Nhật Lễ Giáng Sinh",
    "rank": "Ngày trong tuần",
    "readings": "",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "12-30": {
    "date": "30/12",
    "title": "Ngày thứ sáu trong tuần Bát Nhật Lễ Giáng Sinh",
    "rank": "Ngày trong tuần",
    "readings": "",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "01-01": {
    "date": "01/01",
    "title": "Thánh Ma-ri-a, Ðức Mẹ Chúa Trời",
    "rank": "Lễ trọng",
    "readings": "Ds 6,22-27; GI 4,4-7; Lc 2,16-21",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "01-02": {
    "date": "02/01",
    "title": "Thánh Basiliô Cả và thánh Grêgôriô Nazianzênô, giám mục, tiến sĩ Hội Thánh",
    "rank": "Lễ nhớ",
    "readings": "1 Ga 2,22-28 ; Ga 1,19-28",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "01-03": {
    "date": "03/01",
    "title": "Thứ Sáu trước Lễ Hiển Linh - Kính Danh rất thánh Chúa Giê-su. Chiều: Lễ vọng Chúa Hiển Linh",
    "rank": "Ngày trong tuần",
    "readings": "Pl 2,1-11 ; Lc 2,21-24",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "01-04": {
    "date": "04/01",
    "title": "Chúa Hiển Linh",
    "rank": "Lễ trọng",
    "readings": "Is 60,1-6; Ep 3,2-3a.5-6; Mt 2,1-12",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "01-05": {
    "date": "05/01",
    "title": "Thứ Hai sau Lễ Hiển Linh",
    "rank": "Ngày trong tuần",
    "readings": "1 Ga 3,22-4,6; Mt 4,12-17.23-25",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "01-06": {
    "date": "06/01",
    "title": "Thứ Ba sau Lễ Hiển Linh - Thánh Rây-mun-đô Pê-nha-pho, linh mục",
    "rank": "Ngày trong tuần",
    "readings": "1 Ga 4,7-10; Mc 6,34-44; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "01-07": {
    "date": "07/01",
    "title": "Thánh Rây-mun-đô Pê-nha-pho, linh mục",
    "rank": "Ngày trong tuần",
    "readings": "1 Ga 4,11-18; Mc 6,45-52; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "01-08": {
    "date": "08/01",
    "title": "Thứ Năm sau Lễ Hiển Linh",
    "rank": "Ngày trong tuần",
    "readings": "1 Ga 4,19–5,4; Lc 4,14-22a; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "01-09": {
    "date": "09/01",
    "title": "Thứ Sáu sau Lễ Hiển Linh",
    "rank": "Ngày trong tuần",
    "readings": "1 Ga 5,5-13; Lc 5,12-16; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "01-10": {
    "date": "10/01",
    "title": "Thứ Bảy sau Lễ Hiển Linh",
    "rank": "Ngày trong tuần",
    "readings": "1 Ga 5,14-21; Ga 3,22-30; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "01-11": {
    "date": "11/01",
    "title": "Chúa Giê-su Chịu Phép Rửa",
    "rank": "Lễ kính",
    "readings": "Is 42,1-4.6-7 (hay Is 40,1-5.9-11); Cv 10,34-38 (hay Tt 2,11-14; 3,4-7); Lc 3,15-16.21-22; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "01-12": {
    "date": "12/01",
    "title": "Thứ Hai Tuần I Thường niên",
    "rank": "Ngày trong tuần",
    "readings": "1 Sm 1,1-8; Mc 1,14-20; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "01-13": {
    "date": "13/01",
    "title": "Thánh Hi-la-ri-ô, giám mục, tiến sĩ Hội Thánh",
    "rank": "Ngày trong tuần",
    "readings": "1 Sm 1,9-20; Mc 1,21-28; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "01-14": {
    "date": "14/01",
    "title": "Thứ Tư Tuần I Thường niên",
    "rank": "Ngày trong tuần",
    "readings": "1 Sm 3,1-10.19-20; Mc 1,29-39; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "01-15": {
    "date": "15/01",
    "title": "Thứ Năm Tuần I Thường niên",
    "rank": "Ngày trong tuần",
    "readings": "1 Sm 4,1-11; Mc 1,40-45; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "01-16": {
    "date": "16/01",
    "title": "Thứ Sáu Tuần I Thường niên",
    "rank": "Ngày trong tuần",
    "readings": "1 Sm 8,4-7.10-22a; Mc 2,1-12; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "01-17": {
    "date": "17/01",
    "title": "Thánh An-tôn, viện phụ",
    "rank": "Lễ nhớ",
    "readings": "1 Sm 9,1-4.17-19; 10,1a; Mc 2,13-17; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "01-18": {
    "date": "18/01",
    "title": "Chúa nhật II Thường niên. Thánh vịnh tuần II",
    "rank": "Ngày trong tuần",
    "readings": "Is 49,3.5-6; 1 Cr 1,1-3; Ga 1,29-34; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "01-19": {
    "date": "19/01",
    "title": "Thứ Hai trong tuần thứ Hai Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "1 Sm 15,16-23; Mc 2,18-22; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "01-20": {
    "date": "20/01",
    "title": "Thánh Fabianô, Giáo hoàng, Tử đạo (Đ). Thánh Sêbastianô, Tử đạo (Đ)",
    "rank": "Ngày trong tuần",
    "readings": "1 Sm 16,1-13; Mc 2,23-28; (X)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "01-21": {
    "date": "21/01",
    "title": "Thánh Anee, Trinh nữ, Tử đạo",
    "rank": "Lễ nhớ",
    "readings": "1 Sm 17,32-33.37.40-51; Mc 3,1-6; (Đ)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "01-22": {
    "date": "22/01",
    "title": "Thánh Vinh Sơn, phó tế, Tử đạo (Đ)",
    "rank": "Ngày trong tuần",
    "readings": "1 Sm 18,6-9; 19,1-7; Mc 3,7-12; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "01-23": {
    "date": "23/01",
    "title": "Thứ Sáu trong tuần thứ Hai Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "1 Sm 24,3-21; Mc 3,13-19; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "01-24": {
    "date": "24/01",
    "title": "Thánh Phan-xi-cô Sa-lê-si-ô, Giám mục, Tiến sĩ Hội Thánh",
    "rank": "Lễ nhớ",
    "readings": "2 Sm 1,1-4.11-12.19.23-27; Mc 3,20-21; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "01-25": {
    "date": "25/01",
    "title": "Chúa nhật III Thường niên. Thánh vịnh tuần III",
    "rank": "Ngày trong tuần",
    "readings": "Is 8,23b-9,3; 1 Cr 1,10-13.17; Mt 4,12-23; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "01-26": {
    "date": "26/01",
    "title": "Thánh Ti-mô-thê-ô và Thánh Ti-tô, Giám mục",
    "rank": "Lễ nhớ",
    "readings": "2 Tm 1,1-8; Lc 10,1-9; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "01-27": {
    "date": "27/01",
    "title": "Thánh An-gê-la Mê-ri-ci, Trinh nữ (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "2 Sm 6,12b-15.17-19; Mc 3,31-35; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "01-28": {
    "date": "28/01",
    "title": "Thánh Tô-ma A-qui-nô, Linh mục, Tiến sĩ Hội Thánh",
    "rank": "Lễ nhớ",
    "readings": "2 Sm 7,4-17; Mc 4,1-20; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "01-29": {
    "date": "29/01",
    "title": "Thứ Năm trong tuần thứ Ba Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "2 Sm 7,19-19.24-29; Mc 4,21-25; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "01-30": {
    "date": "30/01",
    "title": "Thứ Sáu trong tuần thứ Ba Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "2 Sm 11,1-4a.5-10a.13-17; Mc 4,26-34; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "01-31": {
    "date": "31/01",
    "title": "Thánh Gio-an Bos-co, Linh mục",
    "rank": "Lễ nhớ",
    "readings": "2 Sm 12,1-7a.10-17; Mc 4,35-41; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "02-01": {
    "date": "01/02",
    "title": "Chúa nhật IV Thường niên. Thánh vịnh tần IV",
    "rank": "Ngày trong tuần",
    "readings": "Xp 2,3; 3,12-13; 1 Cr 1,26-31; Mt 5,1-12a; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "02-02": {
    "date": "02/02",
    "title": "Lễ dâng Chúa Giê-su trong Đền thánh",
    "rank": "Lễ kính",
    "readings": "Ml 3,1-4 (hay Dt, 2,14-18); Lc 2,22-40; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "02-03": {
    "date": "03/02",
    "title": "Thánh Blasiô, Giám mục, Tử đạo (Đ). Thánh Ansgariô, Giám mục (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "2 Sm 18,9-10.14b.24-25a.30-19,3; Mc 5,21-43; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "02-04": {
    "date": "04/02",
    "title": "Thứ Tư trong tuần thứ Tư Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "2 Sm 24,2.9-17; Mc 6,1-6; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "02-05": {
    "date": "05/02",
    "title": "Thứ năm đầu tháng. Thánh Agatha, Trinh nữ, Tử đạo",
    "rank": "Lễ nhớ",
    "readings": "1 V 2,1-4.10-12; Mc 6,7-13; (Đ)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "02-06": {
    "date": "06/02",
    "title": "Thứ sáu đầu tháng. Thánh Phaolô Miki và các bạn, tử đạo",
    "rank": "Lễ nhớ",
    "readings": "Hc 47,2-11; Mc 6,14-29; (Đ)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "02-07": {
    "date": "07/02",
    "title": "Thứ bảy đầu tháng",
    "rank": "Ngày trong tuần",
    "readings": "1 V 3,4-13; Mc 6,30-34; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "02-08": {
    "date": "08/02",
    "title": "Chúa nhật V Thường niên. Thánh vịnh tuần I",
    "rank": "Ngày trong tuần",
    "readings": "Is 58,7-10; 1 Cr 2,1-5; Mt 5,13-16; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "02-09": {
    "date": "09/02",
    "title": "Thứ Hai trong tuần thứ Năm Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "1 V 8,1-7.9-13; Mc 6,53-56; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "02-10": {
    "date": "10/02",
    "title": "Thánh Scholastica, trinh nữ.",
    "rank": "Lễ nhớ",
    "readings": "1 V 8,22-23.27-30; Mc 7,1-13; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "02-11": {
    "date": "11/02",
    "title": "Đức Mẹ Lộ Đức (Tr). Ngày Quốc Tế Bệnh Nhân. Thánh Tôma Ngô Túc Khuông, linh mục, tử đạo",
    "rank": "Ngày trong tuần",
    "readings": "1 V 10,1-10; Mc 7,14-23; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "02-12": {
    "date": "12/02",
    "title": "Thứ Năm trong tuần thứ Năm Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "1 V 11,4-13; Mc 7,24-30; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "02-13": {
    "date": "13/02",
    "title": "Thứ Sáu trong tuần thứ Năm Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "1 V 11,29-32; 12,19; Mc 7,31-37; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "02-14": {
    "date": "14/02",
    "title": "Thánh Cyrillô, đan sĩ và thánh Mêthôđiô, giám mục",
    "rank": "Lễ nhớ",
    "readings": "1 V 12,26-32; Mt 5, 17-37; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "02-15": {
    "date": "15/02",
    "title": "CHÚA NHẬT VI THƯỜNG NIÊN. Thánh Vịnh Tuần II",
    "rank": "Lễ trọng",
    "readings": "Hc 15,16-21; 1 Cr 2,6-10; Mt 5,17-37; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "02-16": {
    "date": "16/02",
    "title": "Thứ Hai trong tuần thứ Sáu Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Gc 1,1-11; Mc 8,11-13; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "02-17": {
    "date": "17/02",
    "title": "Mồng một Tết Bính Ngọ. Cầu bình an cho năm mới. Bảy Thánh lập Dòng Tôi Tới Đức Trinh Nữ Maria (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "Gc 1,12-18; Mc 8,14-21; (X) Có thể cử hành lễ ngoại lịch. Lễ Giao thừa Ds 6,22-27 ; 1 Tx 5,16-26.28 ; Mt 5,1-10 . Lễ Tân Niên St 1,14-18 ; Pl 4,4-8 ; Mt 6,25-34",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "02-18": {
    "date": "18/02",
    "title": "Kính nhớ Tổ tiên, ông bà, cha mẹ",
    "rank": "Ngày trong tuần",
    "readings": "Hc 44,1.10-15; Ep 6,1-4.18-23; Mt 15,1-6; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "02-19": {
    "date": "19/02",
    "title": "Thánh hóa công ăn việc làm",
    "rank": "Ngày trong tuần",
    "readings": "St 2,4b-9.15; Cv 20,32-35; Mt 25,14-30; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "02-20": {
    "date": "20/02",
    "title": "Lễ Tro",
    "rank": "Lễ trọng",
    "readings": "Ge 2,12-18; 2 Cr 5,20-6,2; Mt 6,1-6.16-18; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "02-21": {
    "date": "21/02",
    "title": "Thánh Phêrô Đamianô, giám mục, tiến sĩ Hội Thánh",
    "rank": "Ngày trong tuần",
    "readings": "Is 58,9b-14; Lc 5,27-32; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "02-22": {
    "date": "22/02",
    "title": "Chúa nhật I Mùa Chay. Thánh vịnh tuần I",
    "rank": "Ngày trong tuần",
    "readings": "St 2,7-9; 3,1-7; Rm 5,12-19; Mt 4,1-11; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "02-23": {
    "date": "23/02",
    "title": "Thánh Pôlycarpô, giám mục, tử đạo",
    "rank": "Ngày trong tuần",
    "readings": "Lv 19,1-2.11-18; Mt 25,31-46; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "02-24": {
    "date": "24/02",
    "title": "Thứ Ba trong tuần thứ Nhất Mùa Chay",
    "rank": "Ngày trong tuần",
    "readings": "Is 55,10-11; Mt 6,7-15; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "02-25": {
    "date": "25/02",
    "title": "Thứ Tư trong tuần thứ Nhất Mùa Chay",
    "rank": "Ngày trong tuần",
    "readings": "Gn 3,1-10; Lc 11,29-32; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "02-26": {
    "date": "26/02",
    "title": "Thứ Năm trong tuần thứ Nhất Mùa Chay",
    "rank": "Ngày trong tuần",
    "readings": "Et 4,17k-17m.17r-17t; Mt 7,7-12; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "02-27": {
    "date": "27/02",
    "title": "Thánh Grêgôriô Naracensiô, viện phụ, tiến sĩ Hội Thánh",
    "rank": "Ngày trong tuần",
    "readings": "Ed 18,21-28; Mt 5,20-26; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "02-28": {
    "date": "28/02",
    "title": "Thứ Bảy trong tuần thứ Nhất Mùa Chay",
    "rank": "Ngày trong tuần",
    "readings": "Đnl 26,16-19; Mt 5,43-48; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-01": {
    "date": "01/03",
    "title": "CHÚA NHẬT II MÙA CHAY. Thánh vịnh tuần II",
    "rank": "Lễ trọng",
    "readings": "St 12,1-4a; 2 Tm 1,8b-10; Mt 17,1-9; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-02": {
    "date": "02/03",
    "title": "Thứ Hai trong tuần thứ Hai Mùa Chay",
    "rank": "Ngày trong tuần",
    "readings": "Ddn 9,4b-10; Lc 6,36-38; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-03": {
    "date": "03/03",
    "title": "Thứ Ba trong tuần thứ Hai Mùa Chay",
    "rank": "Ngày trong tuần",
    "readings": "Is 1,10.16-20; Mt 23,1-12; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-04": {
    "date": "04/03",
    "title": "Thánh Casimirô",
    "rank": "Ngày trong tuần",
    "readings": "Gr 18,18-20; Mt 20,17-28; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-05": {
    "date": "05/03",
    "title": "Thứ năm đầu tháng",
    "rank": "Ngày trong tuần",
    "readings": "Gr 17,5-10; Lc 16,19-31; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-06": {
    "date": "06/03",
    "title": "Thứ sáu đầu tháng",
    "rank": "Ngày trong tuần",
    "readings": "St 37,3-4.12-13a.17b-28; Mt 21,33-43.45-46; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-07": {
    "date": "07/03",
    "title": "Thứ bảy đầu tháng. Thánh nữ Perpêtua và thánh nữ Fêlicita, tử đạo",
    "rank": "Ngày trong tuần",
    "readings": "Mk 7,14-15.18-20; Lc 15,1-3.11-32; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-08": {
    "date": "08/03",
    "title": "CHÚA NHẬT III MÙA CHAY. Thánh vịnh tuần III",
    "rank": "Lễ trọng",
    "readings": "Xh 17,3-7; Rm 5,1-2.5-8; Ga 4,5-42; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-09": {
    "date": "09/03",
    "title": "Thánh Phanxica Rôma, nữ tu",
    "rank": "Ngày trong tuần",
    "readings": "2 V 5,1-15a; Lc 4,24-30; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-10": {
    "date": "10/03",
    "title": "Thứ Ba trong tuần thứ Ba Mùa Chay",
    "rank": "Ngày trong tuần",
    "readings": "Đn 3,25.34-43; Mt 18,21-35; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-11": {
    "date": "11/03",
    "title": "Thứ Tư trong tuần thứ Ba Mùa Chay",
    "rank": "Ngày trong tuần",
    "readings": "Đnl 4,1.5-9; Mt 5,17-19; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-12": {
    "date": "12/03",
    "title": "Thứ Năm trong tuần thứ Ba Mùa Chay",
    "rank": "Ngày trong tuần",
    "readings": "Gr 7,23-28; Lc 11,14-23; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-13": {
    "date": "13/03",
    "title": "Thứ Sáu trong tuần thứ Ba Mùa Chay",
    "rank": "Ngày trong tuần",
    "readings": "Hs 14,2-10; Mc 12,28b-34; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-14": {
    "date": "14/03",
    "title": "Thứ Bảy trong tuần thứ Ba Mùa Chay",
    "rank": "Ngày trong tuần",
    "readings": "Hs 6,1-6; Lc 18,9-14; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-15": {
    "date": "15/03",
    "title": "CHÚA NHẬT IV MÙA CHAY. Thánh vịnh tuần IV",
    "rank": "Lễ trọng",
    "readings": "1 Sm 16,1b.6-7.10-13a; Ep 5,8-14; Ga 9,1-41; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-16": {
    "date": "16/03",
    "title": "Thứ Hai trong tuần thứ Tư Mùa Chay",
    "rank": "Ngày trong tuần",
    "readings": "Is 65,17-21; Ga 4,43-54; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-17": {
    "date": "17/03",
    "title": "Thánh Patriciô, giám mục",
    "rank": "Ngày trong tuần",
    "readings": "Ed 47,1-9.12; Ga 5,1-3a.5-16; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-18": {
    "date": "18/03",
    "title": "Thánh Cyrillô Giêrusalem, giám mục, tiến sĩ Hội Thánh",
    "rank": "Ngày trong tuần",
    "readings": "Is 49,8-15; Ga 5,17-30; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-19": {
    "date": "19/03",
    "title": "THÁNH GIUSE, BẠN TRĂM NĂM ĐỨC MARIA. Bổn mạng Hội Thánh hoàn vũ, Hội Thánh Việt Nam",
    "rank": "Lễ trọng",
    "readings": "2 Sm 7,4-5a.12-14a.16; Rm 4,13.16-18.22; Mt 1,16.18-21.24a (hay Lc 2,41-51a); (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "03-20": {
    "date": "20/03",
    "title": "Thứ Sáu trong tuần thứ Tư Mùa Chay",
    "rank": "Ngày trong tuần",
    "readings": "Kn 2,1a.12-22; Ga 7,1-2.10.25-30; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-21": {
    "date": "21/03",
    "title": "Thứ Bảy trong tuần thứ Tư Mùa Chay",
    "rank": "Ngày trong tuần",
    "readings": "Gr 11,18-20; Ga 7,40-53; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-22": {
    "date": "22/03",
    "title": "Chúa nhật V Mùa Chay. Thánh vịnh tuần I",
    "rank": "Ngày trong tuần",
    "readings": "Ed 37,12-14; Rm 8,8-11; Ga 11,1-45 hay Ga 11,3-7.17.20-27.33b-45; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-23": {
    "date": "23/03",
    "title": "Thánh Turibiô Môgrôvêjô, Giám mục",
    "rank": "Ngày trong tuần",
    "readings": "Đn 13,1-9.15-17.19-30.33-62; Ga 8,1-11; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-24": {
    "date": "24/03",
    "title": "Thứ Ba trong tuần thứ Năm Mùa Chay",
    "rank": "Ngày trong tuần",
    "readings": "Ds 21,4-9; Ga 8,21-30; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-25": {
    "date": "25/03",
    "title": "LỄ TRUYỀN TIN",
    "rank": "Lễ Trọng",
    "readings": "Is 7,10-14; 8,10; Đt 10,4-10; Lc 1,26-38; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "03-26": {
    "date": "26/03",
    "title": "Thứ Năm trong tuần thứ Năm Mùa Chay",
    "rank": "Ngày trong tuần",
    "readings": "St 17,3-9; Ga 8,51-59; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-27": {
    "date": "27/03",
    "title": "Thứ Sáu trong tuần thứ Năm Mùa Chay",
    "rank": "Ngày trong tuần",
    "readings": "Gr 20,10-13; Ga 10,31-42; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-28": {
    "date": "28/03",
    "title": "Thứ Bảy trong tuần thứ Năm Mùa Chay",
    "rank": "Ngày trong tuần",
    "readings": "Ed 37,21-28; Ga 11,45-56; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-29": {
    "date": "29/03",
    "title": "Chúa nhật Lễ lá. Tưởng niệm cuộc Thương khó của Chúa. Thánh vịnh tuần II",
    "rank": "Ngày trong tuần",
    "readings": "Is 50,4-7; Pl 2,6-11; Mt 26,14-27,66 hay Mt 27,11-54; (Đ)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "03-30": {
    "date": "30/03",
    "title": "Thứ hai Tuần Thánh",
    "rank": "Ngày trong tuần",
    "readings": "Is 42,1-7; Ga 12,1-11; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "03-31": {
    "date": "31/03",
    "title": "Thứ ba Tuần Thánh",
    "rank": "Ngày trong tuần",
    "readings": "Is 49,1-6; Ga 13,21-33.36-38; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "04-01": {
    "date": "01/04",
    "title": "Thứ Tư Tuần Thánh",
    "rank": "Ngày trong tuần",
    "readings": "Is 50,4-9a; Mt 26,14-25; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "04-02": {
    "date": "02/04",
    "title": "Thứ Năm Tuần Thánh. Thánh lễ sáng: Thánh lễ làm phép dầu (Tr). Thánh lễ chiều: Thánh lễ Tiệc ly (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "Sáng Is 61,1-3a.6a.8b-9; Kh 1,5-8; Lc 4,16-21. Chiều: Xh 12,1-8.11-14; 1 Cr 11,23-26; Ga 13,1-15; (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "04-03": {
    "date": "03/04",
    "title": "Thứ Sáu Tuần Thánh. Tưởng niệm Cuộc Thương khó của Chúa",
    "rank": "Ngày trong tuần",
    "readings": "Is 52,13-53,12; Dt 4,14-16; 5,7-9; Ga 18,1-19,42; (Đ) Giữ chay và kiêng thịt",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "04-04": {
    "date": "04/04",
    "title": "Thứ Bảy Tuần Thánh",
    "rank": "Ngày trong tuần",
    "readings": "Kn 2,1a.12-22 ; Ga 7,1-2.10.25-30 (Tm)",
    "color": "Tím",
    "colorHex": "#7C3AED"
  },
  "04-05": {
    "date": "05/04",
    "title": "CHÚA NHẬT PHỤC SINH. MỪNG CHÚA GIÊSU SỐNG LẠI",
    "rank": "Lễ trọng",
    "readings": "1) St 1,1–2,2 (hay St 1,1.26-31a) 2) St 22,1-18 (hay St 22,1-2.9a.10-13.15-18) 3) Xh 14,15–15,1a. 4) Is 54,5-14. 5) Is 55,1-11. 6) Br 3,9-15.32–4,4. 7) Ed 36,16-17a.18-28. 8) Rm 6,3-11. 9) Mt 28,1-10; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "04-06": {
    "date": "06/04",
    "title": "Thứ hai trong Tuần bát nhật Phục sinh",
    "rank": "Ngày trong tuần",
    "readings": "Cv 2,14.22-32; Mt 28,8-15; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "04-07": {
    "date": "07/04",
    "title": "Thứ ba trong Tuần bát nhật Phục sinh",
    "rank": "Ngày trong tuần",
    "readings": "Cv 2,36-41; Ga 20,11-18; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "04-08": {
    "date": "08/04",
    "title": "Thứ tư trong Tuần bát nhật Phục sinh",
    "rank": "Ngày trong tuần",
    "readings": "Cv 3,1-10; Lc 24,13-35; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "04-09": {
    "date": "09/04",
    "title": "Thứ năm trong Tuần bát nhật Phục sinh",
    "rank": "Ngày trong tuần",
    "readings": "Cv 3,11-26; Lc 24,35-48; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "04-10": {
    "date": "10/04",
    "title": "Thứ sáu trong Tuần bát nhật Phục sinh",
    "rank": "Ngày trong tuần",
    "readings": "Cv 4,1-12; Ga 21,1-14; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "04-11": {
    "date": "11/04",
    "title": "Thứ bảy trong Tuần bát nhật Phục sinh",
    "rank": "Ngày trong tuần",
    "readings": "Cv 4,13-21; Mc 16,9-15; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "04-12": {
    "date": "12/04",
    "title": "CHÚA NHẬT II PHỤC SINH. CHÚA NHẬT VỀ LÒNG THƯƠNG XÓT CỦA THIÊN CHÚA",
    "rank": "Lễ trọng",
    "readings": "Cv 2,42-47; 1 Pr 1,3-9; Ga 20,19-31; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "04-13": {
    "date": "13/04",
    "title": "Thánh vịnh tuần II. Thánh Martinô I, Giáo hoàng, Tử đạo (Đ)",
    "rank": "Ngày trong tuần",
    "readings": "Cv 4,23-31; Ga 3,1-8; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "04-14": {
    "date": "14/04",
    "title": "Thứ Ba trong tuần thứ Hai Mùa Phục Sinh",
    "rank": "Ngày trong tuần",
    "readings": "Cv 4,32-37; Ga 3,7b-15; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "04-15": {
    "date": "15/04",
    "title": "Thứ Tư trong tuần thứ Hai Mùa Phục Sinh",
    "rank": "Ngày trong tuần",
    "readings": "Cv 5,17-26; Ga 3,16-21; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "04-16": {
    "date": "16/04",
    "title": "Thứ Năm trong tuần thứ Hai Mùa Phục Sinh",
    "rank": "Ngày trong tuần",
    "readings": "Cv 5,27-33; Ga 3,31-36; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "04-17": {
    "date": "17/04",
    "title": "Thứ Sáu trong tuần thứ Hai Mùa Phục Sinh",
    "rank": "Ngày trong tuần",
    "readings": "Cv 5,34-42; Ga 6,1-15; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "04-18": {
    "date": "18/04",
    "title": "Thứ Bảy trong tuần thứ Hai Mùa Phục Sinh",
    "rank": "Ngày trong tuần",
    "readings": "Cv 6,1-7; Ga 6,16-21; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "04-19": {
    "date": "19/04",
    "title": "CHÚA NHẬT III PHỤC SINH. Thánh Vịnh Tuần III",
    "rank": "Lễ trọng",
    "readings": "Cv 2,14.22b-33; 1 Pr 1,17-21; Lc 24,13-35; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "04-20": {
    "date": "20/04",
    "title": "Thứ Hai trong tuần thứ Ba Mùa Phục Sinh",
    "rank": "Ngày trong tuần",
    "readings": "Cv 6,8-15; Ga 6,22-29; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "04-21": {
    "date": "21/04",
    "title": "Thánh Anselmô, Giám mục, Tiến sĩ Hội Thánh (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "Cv 7,51-8,1a; Ga 6,30-35; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "04-22": {
    "date": "22/04",
    "title": "Thứ Tư trong tuần thứ Ba Mùa Phục Sinh",
    "rank": "Ngày trong tuần",
    "readings": "Cv 8,1b-8; Ga 6,35-40; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "04-23": {
    "date": "23/04",
    "title": "Thánh Giorgiô, Tử đạo (Đ). Thánh Ađalbertô, Giám mục, Tử đạo (Đ)",
    "rank": "Ngày trong tuần",
    "readings": "Cv 8,26-40; Ga 6,44-51; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "04-24": {
    "date": "24/04",
    "title": "Thánh Fiđêlê Sigmaringen, Linh mục, Tử đạo (Đ)",
    "rank": "Ngày trong tuần",
    "readings": "Cv 9,1-20; Ga 6,52-59; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "04-25": {
    "date": "25/04",
    "title": "Thánh Marcô, tác giả sách Tin Mừng",
    "rank": "Lễ kính",
    "readings": "1 Pr 5,5b-14; Mc 16,15-20; (Đ)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "04-26": {
    "date": "26/04",
    "title": "Chúa nhật IV Phục sinh. Thánh vịnh Tuần IV. Chúa nhật Chúa Chiên lành",
    "rank": "Ngày trong tuần",
    "readings": "Cv 2,14a.36-41; 1 Pr 2,20b-25; Ga 10,1-10; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "04-27": {
    "date": "27/04",
    "title": "Thứ Hai trong tuần thứ Tư Mùa Phục Sinh",
    "rank": "Ngày trong tuần",
    "readings": "Cv 11,1-18; Ga 10,11-18; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "04-28": {
    "date": "28/04",
    "title": "Thánh Phêrô Chanel, linh mục, tử đạo (Đ). Thánh Luy Grignion Montfort, linh mục (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "Cv 11,19-26; Ga 10,22-30; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "04-29": {
    "date": "29/04",
    "title": "Thánh Catarina Siêna, trinh nữ, tiến sĩ Hội Thánh",
    "rank": "Lễ nhớ",
    "readings": "Cv 12,24-13,5a; Ga 12,44-50; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "04-30": {
    "date": "30/04",
    "title": "Thánh Piô V, Giáo hoàng",
    "rank": "Ngày trong tuần",
    "readings": "Cv 13,13-25; Ga 13,16-20; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-01": {
    "date": "01/05",
    "title": "Thứ sáu đầu tháng. Thánh Giuse Thợ (Tr)",
    "rank": "Lễ nhớ",
    "readings": "Cv 13,26-33; Ga 14,1-6; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-02": {
    "date": "02/05",
    "title": "Thứ bảy đầu tháng. Thánh Athanasiô, giám mục, tiến sĩ Hội Thánh.",
    "rank": "Lễ nhớ",
    "readings": "Cv 13,44-52; Ga 14,7-14; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-03": {
    "date": "03/05",
    "title": "CHÚA NHẬT V PHỤC SINH. Thánh Vịnh Tuần I",
    "rank": "Lễ trọng",
    "readings": "Cv 6,1-7; 1 Pr 2,4-9; Ga 14,1-12; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-04": {
    "date": "04/05",
    "title": "Thứ Hai trong tuần thứ Năm Mùa Phục Sinh",
    "rank": "Ngày trong tuần",
    "readings": "Cv 14,5-18; Ga 14,21-26; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-05": {
    "date": "05/05",
    "title": "Thứ Ba trong tuần thứ Năm Mùa Phục Sinh",
    "rank": "Ngày trong tuần",
    "readings": "Cv 14,19-28; Ga 14,27-31a; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-06": {
    "date": "06/05",
    "title": "Thứ Tư trong tuần thứ Năm Mùa Phục Sinh",
    "rank": "Ngày trong tuần",
    "readings": "Cv 15,1-6; Ga 15,1-8; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-07": {
    "date": "07/05",
    "title": "Thứ năm đầu tháng",
    "rank": "Ngày trong tuần",
    "readings": "Cv 15,7-21; Ga 15,9-11; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-08": {
    "date": "08/05",
    "title": "Kỷ niệm 1 năm ngày Đức Lêô XIV được bầu làm Giáo hoàng",
    "rank": "Ngày trong tuần",
    "readings": "Cv 15,22-31; Ga 15,12-17; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-09": {
    "date": "09/05",
    "title": "Thứ Bảy trong tuần thứ Năm Mùa Phục Sinh",
    "rank": "Ngày trong tuần",
    "readings": "Cv 16,1-10; Ga 15,18-21; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-10": {
    "date": "10/05",
    "title": "CHÚA NHẬT VI PHỤC SINH. Thánh Vịnh Tuần II",
    "rank": "Lễ trọng",
    "readings": "Cv 8,5-8.14-17; 1 Pr 3,15-18; Ga 14,15-21; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-11": {
    "date": "11/05",
    "title": "Thứ Hai trong tuần thứ Sáu Mùa Phục Sinh",
    "rank": "Ngày trong tuần",
    "readings": "Cv 16,11-15; Ga 15,26–16,4a; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-12": {
    "date": "12/05",
    "title": "Thánh Nêrêô và thánh Achilêô, tử đạo (Đ). Thánh Pancratiô, tử đạo (Đ)",
    "rank": "Ngày trong tuần",
    "readings": "Cv 16,22-34; Ga 16,5-11; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-13": {
    "date": "13/05",
    "title": "Đức Mẹ Fatima",
    "rank": "Ngày trong tuần",
    "readings": "Cv 17,15.22–18,1; Ga 16,12-15; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-14": {
    "date": "14/05",
    "title": "THÁNH MATTHIA, TÔNG ĐỒ",
    "rank": "Lễ kính",
    "readings": "Cv 1,15-17.20-26; Ga 15,9-17; (Đ)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "05-15": {
    "date": "15/05",
    "title": "Thứ Sáu trong tuần thứ Sáu Mùa Phục Sinh",
    "rank": "Ngày trong tuần",
    "readings": "Cv 18,9-18; Ga 16,20-23a; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-16": {
    "date": "16/05",
    "title": "Chiều: Lễ vọng Chúa Thăng thiên (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "Cv 18,23-28; Ga 16,23b-28; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-17": {
    "date": "17/05",
    "title": "Chúa nhật VII Phục sinh. Chúa thăng thiên",
    "rank": "Lễ trọng",
    "readings": "Cv 1,1-11; Ep 1,17-23; Mt 28,16-20; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-18": {
    "date": "18/05",
    "title": "Thánh vịnh tuần III. Thánh Gioan I, Giáo hoàng, Tử đạo (Đ)",
    "rank": "Ngày trong tuần",
    "readings": "Cv 19,1-8; Ga 16,29-33; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-19": {
    "date": "19/05",
    "title": "Thứ Ba trong tuần thứ Bảy Mùa Phục Sinh",
    "rank": "Ngày trong tuần",
    "readings": "Cv 20,17-27; Ga 17,1-11a; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-20": {
    "date": "20/05",
    "title": "Thánh Bernarđinô Siêna, linh mục (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "Cv 20,28-38; Ga 17,11b-19; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-21": {
    "date": "21/05",
    "title": "Thánh Christôphôrô Magalla-nes, linh mục và các bạn, tử đạo",
    "rank": "Ngày trong tuần",
    "readings": "Cv 22,30; 23,6-11; Ga 17,20-26; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-22": {
    "date": "22/05",
    "title": "Thánh Rita Cascia, nữ tu. Thánh Micae Hồ Đình Hy, quan thái bộc, tử đạo († 1857); thánh Laurensô Phạm Viết Ngôn, giáo dân, tử đạo († 1862)",
    "rank": "Ngày trong tuần",
    "readings": "Cv 25,13b-21; Ga 21,15-19; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-23": {
    "date": "23/05",
    "title": "Chiều: Lễ vọng Chúa Thánh thần hiện xuống (Đ)",
    "rank": "Ngày trong tuần",
    "readings": "Cv 28,16-20.30-31; Ga 21,20-25; Chiều St 11,1-9; Rm 8,22-27; Ga 7,37-39; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-24": {
    "date": "24/05",
    "title": "Chúa Thánh thần hiện xuống",
    "rank": "Lễ trọng",
    "readings": "Cv 2,1-11; 1 Cr 12,3b-7.12-13; Ga 20,19-23; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-25": {
    "date": "25/05",
    "title": "Thánh vịnh tuần IV. Đức Trinh nữ Maria, Mẹ Hội Thánh",
    "rank": "Lễ nhớ",
    "readings": "St 3,9-15.20; Ga 19,25-34; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-26": {
    "date": "26/05",
    "title": "Thánh Philipphê Nêri, linh mục.",
    "rank": "Lễ nhớ",
    "readings": "1 Pr 1,10-16; Mc 10,28-31; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-27": {
    "date": "27/05",
    "title": "Thánh Augustinô Cantuariô, giám mục",
    "rank": "Ngày trong tuần",
    "readings": "1 Pr 1,10-16; Mc 10,28-31; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "05-28": {
    "date": "28/05",
    "title": "Thứ Năm trong tuần thứ Tám Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "1 Pr 2,2-5.9-12; Mc 10,46-52; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-29": {
    "date": "29/05",
    "title": "Thánh Phaolô VI, Giáo hoàng (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "1 Pr 4,7-13; Mc 11,11-26; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "05-30": {
    "date": "30/05",
    "title": "Thứ Bảy trong tuần thứ Tám Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Gđ 17,20b-25; Mc 11,27-33; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "05-31": {
    "date": "31/05",
    "title": "Chúa nhật IX thường niên. Chúa Ba ngôi",
    "rank": "Lễ trọng",
    "readings": "Xh 34,4b-6.8-9; 2 Cr 13,11-13; Ga 3,16-18; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "06-01": {
    "date": "01/06",
    "title": "Thánh vịnh tuần I. Thánh Justinô, Tử đạo",
    "rank": "Lễ nhớ",
    "readings": "2 Pr 1,2-7; Mc 12,1-12; (Đ)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "06-02": {
    "date": "02/06",
    "title": "Thánh Marcellinô và thánh Phêrô, tử đạo (Đ)",
    "rank": "Ngày trong tuần",
    "readings": "2 Pr 3,12-15a.17-18; Mc 12,13-17; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "06-03": {
    "date": "03/06",
    "title": "Thánh Carôlô Lwanga và các bạn, tử đạo.",
    "rank": "Lễ nhớ",
    "readings": "2 Tm 1,1-3.6-12; Mc 12,18-27; (Đ)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "06-04": {
    "date": "04/06",
    "title": "Thứ năm đầu tháng",
    "rank": "Ngày trong tuần",
    "readings": "2 Tm 2,8-15; Mc 12,28b-34; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "06-05": {
    "date": "05/06",
    "title": "Thứ sáu đầu tháng. Thánh Bônifatiô, giám mục, tử đạo",
    "rank": "Lễ nhớ",
    "readings": "2 Tm 3,10-17; Mc 12,35-37; (Đ)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "06-06": {
    "date": "06/06",
    "title": "Thứ bảy đầu tháng. Thánh Norbertô, giám mục (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "2 Tm 4,1-8; Mc 12,38-44; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "06-07": {
    "date": "07/06",
    "title": "Chúa nhật X thường niên. Mình và Máu Thánh Chúa Ki-tô",
    "rank": "Lễ trọng",
    "readings": "Đnl 8,2-3.14b-16a; 1 Cr 10,16-17; Ga 6,51-58; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "06-08": {
    "date": "08/06",
    "title": "Thánh vịnh tuần II",
    "rank": "Ngày trong tuần",
    "readings": "1 V 17,1-6; Mt 5,1-12; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "06-09": {
    "date": "09/06",
    "title": "Thánh Ephrem, Phó tế, Tiến sĩ Hội Thánh (Tr)",
    "rank": "Lễ nhớ",
    "readings": "1 V 17,7-16; Mt 5,13-16; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "06-10": {
    "date": "10/06",
    "title": "Thứ Tư trong tuần thứ Mười Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "1 V 18,20-39; Mt 5,17-19; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "06-11": {
    "date": "11/06",
    "title": "THÁNH BARNABA, TÔNG ĐỒ",
    "rank": "Lễ nhớ",
    "readings": "Cv 11,21b-26; 13,1-3; Mt 10,6-13; (Đ)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "06-12": {
    "date": "12/06",
    "title": "Thánh tâm Chúa Giêsu",
    "rank": "Lễ trọng",
    "readings": "Đnl 7,6-11; 1 Ga 4,7-16; Mt 11,25-30; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "06-13": {
    "date": "13/06",
    "title": "Trái tim Vô Nhiễm Đức Mẹ",
    "rank": "Lễ nhớ",
    "readings": "Is 61,9-11; Lc 2,41-51; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "06-14": {
    "date": "14/06",
    "title": "Chúa nhật XI thường niên. Thánh vịnh tuần III",
    "rank": "Ngày trong tuần",
    "readings": "Xh 19,2-6a; Rm 5,6-11; Mt 9,36-10,8; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "06-15": {
    "date": "15/06",
    "title": "Thứ Hai trong tuần thứ Mười Một Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "1 V 21,1-16; Mt 5,38-42; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "06-16": {
    "date": "16/06",
    "title": "Thứ Ba trong tuần thứ Mười Một Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "1 V 21,17-29; Mt 5,43-48; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "06-17": {
    "date": "17/06",
    "title": "Thứ Tư trong tuần thứ Mười Một Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "2 V 2,1.4.6-14; Mt 6,1-6.16-18; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "06-18": {
    "date": "18/06",
    "title": "Thứ Năm trong tuần thứ Mười Một Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Hc 48,1-14; Mt 6,7-15; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "06-19": {
    "date": "19/06",
    "title": "Thánh Rômualđô, viện phụ (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "2 V 11,1-4.9-18.20; Mt 6,19-23; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "06-20": {
    "date": "20/06",
    "title": "Thứ Bảy trong tuần thứ Mười Một Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "2 Sb 24,17-25 Mt 6,24-34;",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "06-21": {
    "date": "21/06",
    "title": "Chúa nhật XII thường niên. Thánh vịnh tuần IV",
    "rank": "Lễ nhớ",
    "readings": "Gr 20,10-13; Rm 5,12-15; Mt 10,26-33; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "06-22": {
    "date": "22/06",
    "title": "Thánh Paulinô, giám mục Nôla (Tr); thánh Gioan Fisher, giám mục và thánh Tôma More, tử đạo (Đ)",
    "rank": "Ngày trong tuần",
    "readings": "2 V 17,5-8.13-15a.18; Mt 7,1-5; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "06-23": {
    "date": "23/06",
    "title": "Ban chiều: LỄ VỌNG SINH NHẬT THÁNH GIOAN TẨY GIẢ (Tr)",
    "rank": "Lễ vọng",
    "readings": "Ban sáng: 2 V 19,9b-11.14-21.31-35a.36; Mt 7,6.12-14 . Ban chiều: Gr 1,4-10; 1 Pr 1,8-12; Lc 1,5-17; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "06-24": {
    "date": "24/06",
    "title": "SINH NHẬT THÁNH GIOAN TẨY GIẢ",
    "rank": "Lễ trọng",
    "readings": "Is 49,1-6; Cv 13,22-26; Lc 1,57-66.80; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "06-25": {
    "date": "25/06",
    "title": "Thứ Năm trong tuần thứ Mười Hai Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "2 V 24,8-17; Mt 7,21-29; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "06-26": {
    "date": "26/06",
    "title": "Thứ Sáu trong tuần thứ Mười Hai Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "2 V 25,1-12; Mt 8,1-4; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "06-27": {
    "date": "27/06",
    "title": "Thánh Cyrillô Alexandria, tiến sĩ Hội Thánh (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "Ac 2,2.10-14.18-19; Mt 8,5-17; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "06-28": {
    "date": "28/06",
    "title": "Chúa nhật XIII thường niên. Thánh vịnh tuần I. Ban chiều: LỄ VỌNG THÁNH PHÊRÔ VÀ THÁNH PHAOLÔ, TÔNG ĐỒ (Đ)",
    "rank": "Lễ vọng",
    "readings": "Ban sáng: 2 V 4,8-11.14-16a; Rm 6,3-4.8-11; Mt 10,37-42. Ban chiều: Cv 3,1-10; GI 1,11-20; Ga 21,15-19; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "06-29": {
    "date": "29/06",
    "title": "THÁNH PHÊRÔ VÀ THÁNH PHAOLÔ, TÔNG ĐỒ",
    "rank": "Lễ trọng",
    "readings": "Cv 12,1-11; 2 Tm 4,6-8.17-18; Mt 16,13-19; (Đ)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "06-30": {
    "date": "30/06",
    "title": "Các thánh tử đạo tiên khởi của giáo đoàn Rôma (Đ)",
    "rank": "Ngày trong tuần",
    "readings": "Am 5,14-15.21-24; Mt 8,28-34; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "07-01": {
    "date": "01/07",
    "title": "Thứ Tư trong tuần thứ Mười Ba Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "St 19,15-29; Mt 8,23-27; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "07-02": {
    "date": "02/07",
    "title": "Thứ năm đầu tháng",
    "rank": "Ngày trong tuần",
    "readings": "Am 7,10-17 Mt 9,1-8; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "07-03": {
    "date": "03/07",
    "title": "THÁNH TÔMA, TÔNG ĐỒ",
    "rank": "Lễ kính",
    "readings": "Ep 2,19-22; Ga 20,24-29; (Đ)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "07-04": {
    "date": "04/07",
    "title": "Thánh nữ Êlisabeth Bồ Đào Nha (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "Am 9,11-15; Mt 9,14-17; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "07-05": {
    "date": "05/07",
    "title": "Chúa nhật XIV thường niên. Thánh vịnh tuần II",
    "rank": "Ngày trong tuần",
    "readings": "Dcr 9,9-10; Rm 8,9.11-13; Mt 11,25-30; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "07-06": {
    "date": "06/07",
    "title": "thánh Maria Gôretti, trinh nữ, tử đạo (Đ)",
    "rank": "Ngày trong tuần",
    "readings": "Hs 2,16.17b-18.21-22; Mt 9,18-26; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "07-07": {
    "date": "07/07",
    "title": "Thứ Ba trong tuần thứ Mười Bốn Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Hs 8,4-7.11-13; Mt 9,32-38; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "07-08": {
    "date": "08/07",
    "title": "Thứ Tư trong tuần thứ Mười Bốn Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Hs 10,1-3.7-8.12; Mt 10,1-7; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "07-09": {
    "date": "09/07",
    "title": "Thánh Augustinô Zhao Rong, linh mục và các bạn, tử đạo (Đ)",
    "rank": "Ngày trong tuần",
    "readings": "Hs 11,1.3-4.5c.8ac-9; Mt 10,7-15; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "07-10": {
    "date": "10/07",
    "title": "Thứ Sáu trong tuần thứ Mười Bốn Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Hs 14,2-10; Mt 10,16-23; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "07-11": {
    "date": "11/07",
    "title": "Thánh Bênêđictô, viện phụ",
    "rank": "Lễ nhớ",
    "readings": "Is 6,1-8; Mt 10,24-33; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "07-12": {
    "date": "12/07",
    "title": "Chúa nhật XV thường niên. Thánh vịnh tuần III",
    "rank": "Ngày trong tuần",
    "readings": "Is 55,10-11; Rm 8,18-23; Mt 13,1-23; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "07-13": {
    "date": "13/07",
    "title": "Thánh Henricô (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "Is 1,10-17; Mt 10,34-11,1; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "07-14": {
    "date": "14/07",
    "title": "Thánh Camillô Lellis, linh mục (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "Is 7,1-9; Mt 11,20-24; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "07-15": {
    "date": "15/07",
    "title": "Thánh Bônaventura, giám mục, tiến sĩ Hội Thánh",
    "rank": "Lễ nhớ",
    "readings": "Is 10,5-7.13-16; Mt 11,25-27; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "07-16": {
    "date": "16/07",
    "title": "Đức Mẹ núi Carmêlô (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "Is 26,7-9.12.16-19; Mt 11,28-30 hay lễ về Đức Mẹ Dcr 2,14-17; Mt 12,46-50; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "07-17": {
    "date": "17/07",
    "title": "Thứ Sáu trong tuần thứ Mười Lăm Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Is 38,1-6.21-22.7-8; Mt 12,1-8; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "07-18": {
    "date": "18/07",
    "title": "Thứ Bảy trong tuần thứ Mười Lăm Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Mk 2,1-5; Mt 12,14-21; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "07-19": {
    "date": "19/07",
    "title": "Chúa nhật XVI thường niên. Thánh vịnh tuần IV",
    "rank": "Ngày trong tuần",
    "readings": "Kn 12,13.16-19; Rm 8,26-27; Mt 13,24-43 hay Mt 13,24-30; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "07-20": {
    "date": "20/07",
    "title": "Thánh Apôllinarê, Giám mục, Tử đạo (Đ)",
    "rank": "Ngày trong tuần",
    "readings": "Mk 6,1-4.6-8; Mt 12,38-42; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "07-21": {
    "date": "21/07",
    "title": "Thánh Laurensô Brinđisi, linh mục, Tiến sĩ Hội Thánh (Tr)",
    "rank": "Ngày trong tuần",
    "readings": "Mk 7,14-15.18-20; Mt 12,46-50; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "07-22": {
    "date": "22/07",
    "title": "THÁNH NỮ MARIA MAGĐA-LÊNA",
    "rank": "Lễ kính",
    "readings": "Dc 3,1-4a (hay 2 Cr 5,14-17); Ga 20,1-2.11-18; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "07-23": {
    "date": "23/07",
    "title": "Thánh Birgitta, nữ tu",
    "rank": "Ngày trong tuần",
    "readings": "Gr 2,1-3.7-8.12-13; Mt 13,10-17; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "07-24": {
    "date": "24/07",
    "title": "Thánh Sarbêliô Makhluf, linh mục. Thánh José Fernandez Hiền, linh mục, tử đạo († 1838)",
    "rank": "Ngày trong tuần",
    "readings": "Gr 3,14-17; Mt 13,18-23; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "07-25": {
    "date": "25/07",
    "title": "THÁNH GIACÔBÊ, TÔNG ĐỒ",
    "rank": "Lễ kính",
    "readings": "2 Cr 4,7-15; Mt 20,20-28; (Đ)",
    "color": "Đỏ",
    "colorHex": "#DC2626"
  },
  "07-26": {
    "date": "26/07",
    "title": "Chúa nhật XVII thường niên. Thánh vịnh tuần I",
    "rank": "Ngày trong tuần",
    "readings": "1 V 3,5.7-12; Rm 8,28-30; Mt 13,44-52 hay Mt 13,44-46; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "07-27": {
    "date": "27/07",
    "title": "Thứ Hai trong tuần thứ Mười Bảy Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Gr 13,1-11; Mt 13,31-35; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "07-28": {
    "date": "28/07",
    "title": "Thứ Ba trong tuần thứ Mười Bảy Mùa Quanh Năm",
    "rank": "Ngày trong tuần",
    "readings": "Gr 14,17-22; Mt 13,36-43; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "07-29": {
    "date": "29/07",
    "title": "Thánh nữ Martha, Maria và Ladarô",
    "rank": "Lễ nhớ",
    "readings": "1 Ga 4,7-16; Ga 11,19-27 (hay Lc 10,38-42); (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  },
  "07-30": {
    "date": "30/07",
    "title": "Thánh Phêrô Kim Ngôn, giám mục, tiến sĩ Hội Thánh",
    "rank": "Ngày trong tuần",
    "readings": "Gr 18,1-6; Mt 13,47-53; (X)",
    "color": "Xanh",
    "colorHex": "#059669"
  },
  "07-31": {
    "date": "31/07",
    "title": "Thánh Ignatiô Loyôla, linh mục",
    "rank": "Lễ nhớ",
    "readings": "Gr 26,1-9; Mt 13,54-58; (Tr)",
    "color": "Trắng",
    "colorHex": "#D97706"
  }
};

export function getScrapedLiturgicalDay(d: Date): LiturgicalDayDetail {
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const key = `${month}-${day}`;

  if (LITURGICAL_CALENDAR_DATA[key]) {
    return LITURGICAL_CALENDAR_DATA[key];
  }

  // Fallback default
  const isSunday = d.getDay() === 0;
  return {
    date: `${day}/${month}`,
    title: isSunday ? 'Chúa Nhật Thường Niên' : 'Ngày trong tuần',
    rank: isSunday ? 'Lễ trọng' : 'Ngày thường',
    readings: '',
    color: isSunday ? 'Xanh' : 'Xanh',
    colorHex: '#059669'
  };
}
