import { readFileSync, writeFileSync } from 'node:fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, writeBatch, setDoc, getDocs, collection, query, where } from 'firebase/firestore';

const cfg = {
  apiKey: 'AIzaSyADDC3-1BYxJX5hs-ofxUmM9lHiXbmk3zo',
  authDomain: 'faqfeedback-d3653.firebaseapp.com',
  projectId: 'faqfeedback-d3653',
  storageBucket: 'faqfeedback-d3653.firebasestorage.app',
  messagingSenderId: '291729919545',
  appId: '1:291729919545:web:10c3aed11820ab5085c7e8',
};

const rawData = [
  {
    "giao_hat": "CÁC NHÀ THỜ LỚN",
    "giao_xu": [
      {
        "ten_giao_xu": "CHÁNH TOÀ",
        "dia_chi": "1 Công xã Paris, P.Bến Nghé, Q.1",
        "gio_le": {
          "ngay_thuong_sang": "05.30",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "05.30, 06.30, 07.30, 09.30",
          "chua_nhat_chieu": "16.00, 17.15, 18.30"
        }
      },
      {
        "ten_giao_xu": "TÂN ĐỊNH",
        "dia_chi": "289 Hai Bà Trưng, P.8, Q.3",
        "gio_le": {
          "ngay_thuong_sang": "05.00, 06.15",
          "ngay_thuong_chieu": "17.30, 19.00(T7)",
          "chua_nhat_sang": "05.00, 06.15, 07.30, 09.00",
          "chua_nhat_chieu": "16.00, 17.30, 19.00"
        }
      },
      {
        "ten_giao_xu": "GIA ĐỊNH",
        "dia_chi": "280 Bùi Hữu Nghĩa, P.2, Bình Thạnh",
        "gio_le": {
          "ngay_thuong_sang": "04.45",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "04.30, 05.30, 07.00, 08.30",
          "chua_nhat_chieu": "16.30, 18.30"
        }
      },
      {
        "ten_giao_xu": "THỊ NGHÈ",
        "dia_chi": "22B Xô Viết Nghệ Tĩnh, P.19, Bình Thạnh",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 06.30, 08.00",
          "chua_nhat_chieu": "15.00, 16.30, 18.00"
        }
      },
      {
        "ten_giao_xu": "CHỢ ĐŨI",
        "dia_chi": "1 Tôn Thất Tùng, Q.1",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 06.30, 08.00",
          "chua_nhat_chieu": "16.30, 18.00"
        }
      },
      {
        "ten_giao_xu": "CHỢ QUÁN",
        "dia_chi": "120 Trần Bình Trọng, P.2, Q.5",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 06.30, 08.00",
          "chua_nhat_chieu": "16.30, 18.00"
        }
      },
      {
        "ten_giao_xu": "HÀNG XANH",
        "dia_chi": "76 Bạch Đằng, P.24, Bình Thạnh",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 06.00, 07.00",
          "chua_nhat_chieu": "16.30, 18.00"
        }
      },
      {
        "ten_giao_xu": "PHANXICÔ Đakao",
        "dia_chi": "50 Nguyễn Đình Chiểu, P.Đakao, Q.1",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 06.30, 08.00",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "VƯỜN XOÀI",
        "dia_chi": "413 Lê Văn Sỹ, P.12, Q.3",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 06.30, 08.00",
          "chua_nhat_chieu": "16.00, 17.30, 19.00"
        }
      },
      {
        "ten_giao_xu": "ĐAMINH BA CHUÔNG",
        "dia_chi": "190 Lê Văn Sỹ, P.10, Q.Phú Nhuận",
        "gio_le": {
          "ngay_thuong_sang": "05.00, 05.45",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 06.15, 07.30, 09.00, 10.30 (English Mass)",
          "chua_nhat_chieu": "16.00, 17.30, 19.00"
        }
      },
      {
        "ten_giao_xu": "HẠNH THÔNG TÂY",
        "dia_chi": "53/7 Quang Trung, P.11, Q.Gò Vấp",
        "gio_le": {
          "ngay_thuong_sang": "04.45",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 07.30, 09.30",
          "chua_nhat_chieu": "16.00, 17.30, 19.00"
        }
      },
      {
        "ten_giao_xu": "TH PHANXICÔ X.",
        "dia_chi": "25 Học Lạc, P.14, Q.5",
        "gio_le": {
          "ngay_thuong_sang": "05.30",
          "ngay_thuong_chieu": "17.30, 18.30(T7), 19.30(T7)",
          "chua_nhat_sang": "05.30, 07.00, 08.30",
          "chua_nhat_chieu": "16.00, 17.00"
        }
      }
    ]
  },
  {
    "giao_hat": "TRUNG TÂM MỤC VỤ (TIẾNG NƯỚC NGOÀI)",
    "giao_xu": [
      {
        "ten_giao_xu": "Trung tâm Mục vụ TGP.TPHCM",
        "dia_chi": "6 bis Tôn Đức Thắng, Bến Nghé, Q1",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "18:00 thứ sáu đầu tháng (Chầu Thánh Thể tiếng Anh)",
          "chua_nhat_sang": "",
          "chua_nhat_chieu": "18:30 thứ bẩy (Thánh lễ tiếng Anh - Phụng vụ Chúa nhật)"
        }
      }
    ]
  },
  {
    "giao_hat": "HẠT BÌNH AN",
    "giao_xu": [
      {
        "ten_giao_xu": "BÌNH AN",
        "dia_chi": "2287 Phạm Thế Hiển, P.6, Q.8",
        "gio_le": {
          "ngay_thuong_sang": "04.30",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "04.30, 06.00, 07.30",
          "chua_nhat_chieu": "16.00, 18.00"
        }
      },
      {
        "ten_giao_xu": "BÌNH AN THƯỢNG",
        "dia_chi": "2903 Phạm Thế Hiển, P. 7, Q.8",
        "gio_le": {
          "ngay_thuong_sang": "04.45",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "04.45, 07.00",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "BÌNH ĐÔNG",
        "dia_chi": "119 Bến Mễ Cốc, P.15, Q.8",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30, 18.00(T5,7)",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "BÌNH HƯNG",
        "dia_chi": "A24/09, Quốc lộ 50, Ấp 1, xã Bình Hưng, Bình Chánh",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "07.30",
          "chua_nhat_chieu": "16.30"
        }
      },
      {
        "ten_giao_xu": "BÌNH MINH",
        "dia_chi": "132/69B Bến Bình Đông, P.14, Q.8",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "07.30",
          "chua_nhat_chieu": "16.00"
        }
      },
      {
        "ten_giao_xu": "BÌNH SƠN",
        "dia_chi": "3012 Phạm Thế Hiển, P.7, Q.8",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "18.00"
        }
      },
      {
        "ten_giao_xu": "BÌNH THÁI",
        "dia_chi": "1755 Phạm Thế Hiển, P.6, Q.8",
        "gio_le": {
          "ngay_thuong_sang": "04.30",
          "ngay_thuong_chieu": "17.45",
          "chua_nhat_sang": "04.30, 06.15, 07.30",
          "chua_nhat_chieu": "16.00, 18.00"
        }
      },
      {
        "ten_giao_xu": "BÌNH THUẬN",
        "dia_chi": "3131 Phạm Thế Hiển, P.7, Q.8",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 07.15",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "BÌNH XUYÊN",
        "dia_chi": "68 Dương Bá Trạc, P.2, Q.8",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 07.15",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "CHÁNH HƯNG",
        "dia_chi": "45 đường 15 Phạm Thế Hiển, P.4, Q.8",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "06.00",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "HƯNG PHÚ",
        "dia_chi": "100-102 Bến Nguyễn Duy, P.9, Q.8",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "07.30",
          "chua_nhat_chieu": "18.00"
        }
      },
      {
        "ten_giao_xu": "MÔNG TRIỆU",
        "dia_chi": "11E Phạm Thế Hiển, Dạ Nam, Cầu chữ Y, P.3, Q.8",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "06.00, 08.00",
          "chua_nhat_chieu": "18.00"
        }
      },
      {
        "ten_giao_xu": "NAM HẢI",
        "dia_chi": "277 Chánh Hưng, P.4, Q.8",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30, 19.30(T7)",
          "chua_nhat_sang": "05.30, 07.30",
          "chua_nhat_chieu": "16.00, 18.00"
        }
      }
    ]
  },
  {
    "giao_hat": "HẠT CHÍ HOÀ",
    "giao_xu": [
      {
        "ten_giao_xu": "AN LẠC",
        "dia_chi": "15/2 CMT8, P.5, Q.Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.15",
          "chua_nhat_sang": "04.30, 05.45, 07.15",
          "chua_nhat_chieu": "16.00, 17.00, 18.15"
        }
      },
      {
        "ten_giao_xu": "THÁNH ANTÔN",
        "dia_chi": "189/13/3 CMT8, P.7, Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "07.00",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "CHÍ HOÀ",
        "dia_chi": "149 Bành Văn Trân, P.7, Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 06.30, 08.00",
          "chua_nhat_chieu": "15.00, 16.00, 18.00"
        }
      },
      {
        "ten_giao_xu": "KHIẾT TÂM",
        "dia_chi": "28 Long Hưng, P.7, Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "04.45, 06.00, 07.15",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "LỘC HƯNG",
        "dia_chi": "58/6 Chấn Hưng, P.6, Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "04.30",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "04.30, 06.00",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "MẪU TÂM",
        "dia_chi": "389 Hoàng Văn Thụ, P.2, Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "05.30",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "05.30, 07.30",
          "chua_nhat_chieu": "17.00, 18.30"
        }
      },
      {
        "ten_giao_xu": "NAM HOÀ",
        "dia_chi": "35/40/9 Đ. Đất Thánh, P.6, Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "04.30",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "04.30, 07.00",
          "chua_nhat_chieu": "15.30, 17.30"
        }
      },
      {
        "ten_giao_xu": "NAM THÁI",
        "dia_chi": "168/50 CMT8, P.5, Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "NGHĨA HOÀ",
        "dia_chi": "25/18 Nghĩa Phát, P.6, Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "05.30",
          "ngay_thuong_chieu": "17.00, 18.30(T5)",
          "chua_nhat_sang": "04.30, 06.00, 07.30",
          "chua_nhat_chieu": "16.30"
        }
      },
      {
        "ten_giao_xu": "SAO MAI",
        "dia_chi": "130/54 Nghĩa Phát, P.7, Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "TÂN DÂN",
        "dia_chi": "1392 Hoàng văn Thụ, P.4, Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "TÂN CHÍ LINH",
        "dia_chi": "6/25 Phạm văn Hai, P.3, Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.00, 18.30(T5), 17.30(T7)",
          "chua_nhat_sang": "05.00, 07.30",
          "chua_nhat_chieu": "16.00, 17.30"
        }
      },
      {
        "ten_giao_xu": "TÂN SA CHÂU",
        "dia_chi": "387 Lê văn Sỹ, P.2, Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "16.30, 18.00"
        }
      },
      {
        "ten_giao_xu": "THÁI HOÀ",
        "dia_chi": "320/456 CMT8, P.5, Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.30, 18.00(T5)",
          "chua_nhat_sang": "06.00, 07.30",
          "chua_nhat_chieu": "17.30, 19.00"
        }
      },
      {
        "ten_giao_xu": "VINH SƠN 6 – NGHĨA HOÀ",
        "dia_chi": "1/10/2 Nghĩa Phát, P.6, Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "04.30",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "04.30, 06.30",
          "chua_nhat_chieu": "16.00, 18.00"
        }
      },
      {
        "ten_giao_xu": "VINH SƠN – ÔNG TẠ",
        "dia_chi": "154/333 Phạm văn Hai, P.3, Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "04.30",
          "ngay_thuong_chieu": "16.00",
          "chua_nhat_sang": "04.30, 07.30",
          "chua_nhat_chieu": "16.00, 18.30"
        }
      },
      {
        "ten_giao_xu": "XÂY DỰNG",
        "dia_chi": "5/27 Bành văn Trân, P.6, Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "04.20",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "04.30, 06.30, 09.00",
          "chua_nhat_chieu": "17.00"
        }
      }
    ]
  },
  {
    "giao_hat": "HẠT CHỢ QUÁN",
    "giao_xu": [
      {
        "ten_giao_xu": "AN BÌNH",
        "dia_chi": "4 An Bình, P.5, Q.5",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "06.00, 07.30 (Hoa)",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "BÌNH PHƯỚC",
        "dia_chi": "634 Phạm văn Chí, P.8, Q.5",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "CHỢ QUÁN",
        "dia_chi": "120 Trần Bình Trọng, P.2, Q.5",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 06.30, 08.00",
          "chua_nhat_chieu": "16.30, 18.00"
        }
      },
      {
        "ten_giao_xu": "HIỂN LINH",
        "dia_chi": "582 Kinh Dương Vương, P.13, Q.6",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "06.00, 08.00",
          "chua_nhat_chieu": "16.30"
        }
      },
      {
        "ten_giao_xu": "TH JEANNE D’ARC",
        "dia_chi": "116B Hùng Vương, P.9, Q.5",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "16.00"
        }
      },
      {
        "ten_giao_xu": "MAI KHÔI",
        "dia_chi": "48/39 Bến Hàm Tử, P.1, Q.5",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "06.30",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "TH PHANXICÔ X.",
        "dia_chi": "25 Học Lạc, P.14, Q.5",
        "gio_le": {
          "ngay_thuong_sang": "05.30",
          "ngay_thuong_chieu": "17.30, 18.30(T7), 19.30(T7)",
          "chua_nhat_sang": "05.30, 07.00, 08.30",
          "chua_nhat_chieu": "16.00, 17.00"
        }
      }
    ]
  },
  {
    "giao_hat": "HẠT GIA ĐỊNH",
    "giao_xu": [
      {
        "ten_giao_xu": "BÌNH HOÀ",
        "dia_chi": "93/9 Nơ Trang Long, P.11, Q.Bình Thạnh",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "05.30, 07.30",
          "chua_nhat_chieu": "18.00"
        }
      },
      {
        "ten_giao_xu": "Họ THÁNH TÂM",
        "dia_chi": "Bình Thạnh",
        "gio_le": {
          "ngay_thuong_sang": "05.30 (2,4,6)",
          "ngay_thuong_chieu": "17.30 (3,5,7)",
          "chua_nhat_sang": "06.30",
          "chua_nhat_chieu": "16.30"
        }
      },
      {
        "ten_giao_xu": "BÌNH LỢI",
        "dia_chi": "453 Nơ Trang Long, P.13, Q.Bình Thạnh",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "05.00, 08.00",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "CHÍNH LỘ",
        "dia_chi": "45/4N Điện Biên Phủ, P.15, Q.Bình Thạnh",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 08.15",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "VÔ NHIỄM",
        "dia_chi": "4Bis Hoàng Hoa Thám, P.7, Q.Bình Thạnh",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 06.30, 08.00",
          "chua_nhat_chieu": "15.00, 17.30"
        }
      },
      {
        "ten_giao_xu": "GIA ĐỊNH",
        "dia_chi": "280 Bùi Hữu Nghĩa, P.2, Q.Bình Thạnh",
        "gio_le": {
          "ngay_thuong_sang": "04.45",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "04.30, 05.30, 07.00, 08.30",
          "chua_nhat_chieu": "16.30, 18.30"
        }
      },
      {
        "ten_giao_xu": "HÀNG XANH",
        "dia_chi": "76 Bạch Đằng, P.24, Q.Bình Thạnh",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 06.00, 07.00",
          "chua_nhat_chieu": "16.30, 18.00"
        }
      },
      {
        "ten_giao_xu": "HIỂN LINH",
        "dia_chi": "5 GH Ngô Tất Tố, P.22, Q.Bình Thạnh",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.15",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "17.15"
        }
      },
      {
        "ten_giao_xu": "MÔNG TRIỆU",
        "dia_chi": "78 Nguyễn Cửu Vân, P.17, Q.Bình Thạnh",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "06.00, 08.00",
          "chua_nhat_chieu": "18.00"
        }
      },
      {
        "ten_giao_xu": "Họ NỮ VƯƠNG HÒA BÌNH",
        "dia_chi": "16-20 Trường Sa, P.17, Q.Bình Thạnh",
        "gio_le": {
          "ngay_thuong_sang": "05.15",
          "ngay_thuong_chieu": "",
          "chua_nhat_sang": "06.00",
          "chua_nhat_chieu": ""
        }
      },
      {
        "ten_giao_xu": "N.D.KHANG",
        "dia_chi": "195/29 XVNT, P.17, Q.Bình Thạnh",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.45",
          "chua_nhat_sang": "05.00, 07.30",
          "chua_nhat_chieu": "17.45"
        }
      },
      {
        "ten_giao_xu": "PHÚ HIỀN",
        "dia_chi": "214/57bis Vạn Kiếp, P.3, Q.Bình Thạnh",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 07.30",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "THANH ĐA",
        "dia_chi": "801/67 XVNT, P.26, Q.Bình Thạnh",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.30, 07.30",
          "chua_nhat_chieu": "17.00, 18.30"
        }
      },
      {
        "ten_giao_xu": "THÁNH TỊNH",
        "dia_chi": "47/57 Nguyễn Văn Đậu, P.6, Q.Bình Thạnh",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "05.00, 06.30",
          "chua_nhat_chieu": "16.30"
        }
      },
      {
        "ten_giao_xu": "THỊ NGHÈ",
        "dia_chi": "22B Xô Viết Nghệ Tĩnh, P.19, Q.Bình Thạnh",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 06.30, 08.00",
          "chua_nhat_chieu": "15.00, 16.30, 18.00"
        }
      }
    ]
  },
  {
    "giao_hat": "HẠT GÒ VẤP",
    "giao_xu": [
      {
        "ten_giao_xu": "BÁC ÁI",
        "dia_chi": "144 Nguyễn Thượng Hiền, P.1, Q.Gò Vấp",
        "gio_le": {
          "ngay_thuong_sang": "04.45",
          "ngay_thuong_chieu": "17.30, 19.00(T5)",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "17.30, 19.00"
        }
      },
      {
        "ten_giao_xu": "BẾN CÁT",
        "dia_chi": "173/2/3 Dương Quảng Hàm,P.5, Q.Gò Vấp",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "17.00, 19.00"
        }
      },
      {
        "ten_giao_xu": "BẾN HẢI",
        "dia_chi": "332/60 Dương Quảng Hàm, P.5, Q.Gò Vấp",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "ĐỨC TIN",
        "dia_chi": "112/11 Phan Văn Trị, P.10, Q.Gò Vấp",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "GÒ VẤP",
        "dia_chi": "45 Nguyễn Văn Bảo, P.4, Q.Gò Vấp",
        "gio_le": {
          "ngay_thuong_sang": "04.45",
          "ngay_thuong_chieu": "18.30",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "HẠNH THÔNG TÂY",
        "dia_chi": "53/7 Quang Trung, P.11, Q.Gò Vấp",
        "gio_le": {
          "ngay_thuong_sang": "04.45",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 07.30, 09.30",
          "chua_nhat_chieu": "16.00, 17.30, 19.00"
        }
      },
      {
        "ten_giao_xu": "VĨNH HIỆP",
        "dia_chi": "52/382E Quang Trung, P.12, Gò Vấp",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.30, 07.30",
          "chua_nhat_chieu": "17.00, 19.00"
        }
      },
      {
        "ten_giao_xu": "HOÀ BÌNH",
        "dia_chi": "95/645 Nguyễn Kiệm, P.3, Q.Gò Vấp",
        "gio_le": {
          "ngay_thuong_sang": "05.45",
          "ngay_thuong_chieu": "17.45",
          "chua_nhat_sang": "05.00, 06.30, 08.00",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "MÂN CÔI",
        "dia_chi": "90 Nguyễn Thái Sơn, P.3, Q.Gò Vấp",
        "gio_le": {
          "ngay_thuong_sang": "04.45",
          "ngay_thuong_chieu": "17.45",
          "chua_nhat_sang": "05.00, 07.00, 08.30",
          "chua_nhat_chieu": "15.30, 17.45"
        }
      },
      {
        "ten_giao_xu": "THÁNH GIUSE",
        "dia_chi": "32 Nguyễn Du, P.7, Q.Gò Vấp",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 06.30, 09.30",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "XÓM THUỐC",
        "dia_chi": "213 Quang Trung, P. 10, Q.Gò Vấp",
        "gio_le": {
          "ngay_thuong_sang": "04.45",
          "ngay_thuong_chieu": "17.45",
          "chua_nhat_sang": "05.00, 07.30",
          "chua_nhat_chieu": "16.30, 18.00, 19.30"
        }
      }
    ]
  },
  {
    "giao_hat": "HẠT HÓC MÔN",
    "giao_xu": [
      {
        "ten_giao_xu": "BA THÔN",
        "dia_chi": "5/6 KP.1, P.Thạnh Lộc, Quận 12",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "18.15",
          "chua_nhat_sang": "05.30, 07.30",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "BÀ ĐIỂM",
        "dia_chi": "10/8 Ấp Trung Lân, Bà Điểm, Hóc Môn",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30 (T5,7)",
          "chua_nhat_sang": "06.30",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "BẠCH ĐẰNG",
        "dia_chi": "591/A Khu Phố 3, P.Trung Mỹ Tây, Q.12",
        "gio_le": {
          "ngay_thuong_sang": "04.30",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.30, 07.00",
          "chua_nhat_chieu": "16.00, 18.00"
        }
      },
      {
        "ten_giao_xu": "BÙI MÔN",
        "dia_chi": "4/2 Ấp Tân Tiến, Xuân Thới Đông, Q.12",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 08.00",
          "chua_nhat_chieu": "16.00, 17.30, 19.00"
        }
      },
      {
        "ten_giao_xu": "CẦU LỚN",
        "dia_chi": "Ấp 5, xã Xuân Thới Sơn, Hóc Môn",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "06.00",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "CHÂU NAM",
        "dia_chi": "76/8 Thống Nhất 2, Tân Thới Nhì, Hóc Môn",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "CHỢ CẦU",
        "dia_chi": "30/7 Nguyễn Văn Quá, Đông Hưng Thuận, Q.12",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.00, 19.00(T7)",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "ĐÔNG QUANG",
        "dia_chi": "169/6 Trường Chinh, KP.6, Đông Hưng Thuận, Q.12",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "17.00, 19.00"
        }
      },
      {
        "ten_giao_xu": "HÓC MÔN",
        "dia_chi": "5/15C Trần Hưng Đạo, KP. 8, Hóc Môn",
        "gio_le": {
          "ngay_thuong_sang": "05.15",
          "ngay_thuong_chieu": "17.30 (T5,7)",
          "chua_nhat_sang": "05.30, 07.30",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "LẠC QUANG",
        "dia_chi": "51/5 Lạc Quang, Tân Thới Nhất, Q.12",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "16.00, 18.00"
        }
      },
      {
        "ten_giao_xu": "NAM HƯNG",
        "dia_chi": "53/7 Thống Nhất, Tân Thới Nhì, Hóc Môn",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00",
          "chua_nhat_chieu": "16.30, 19.00"
        }
      },
      {
        "ten_giao_xu": "TÂN ĐÔNG",
        "dia_chi": "Xã Đông Thạnh, Huyện Hóc Môn",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.30, 18.00(T5)",
          "chua_nhat_sang": "05.30, 07.00",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "TÂN HIỆP",
        "dia_chi": "2/1 Ấp Tân Thới 3, Tân Hiệp, Hóc Môn",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "TÂN HƯNG",
        "dia_chi": "1C Khu phố I, P.Tân Thới Hiệp, Q.12",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "17.00, 19.00"
        }
      },
      {
        "ten_giao_xu": "TÂN MỸ",
        "dia_chi": "K.18 Mỹ Hoà 2, Xuân Thới Đông, Hóc Môn",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "18.00"
        }
      },
      {
        "ten_giao_xu": "TÂN QUY",
        "dia_chi": "1/1 Ấp 2, Xã Nhị Bình, Hóc Môn",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "05.30, 07.30",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "TÂN THỊNH",
        "dia_chi": "4/33A Ấp Nhị Tân 2, Tân Thới 2, Hóc Môn",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "19.00",
          "chua_nhat_sang": "05.30",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "TRUNG CHÁNH",
        "dia_chi": "103/5 Trung Chánh, Tân Xuân, Hóc Môn",
        "gio_le": {
          "ngay_thuong_sang": "04.30",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "04.30, 06.00, 07.00",
          "chua_nhat_chieu": "16.00, 19.00"
        }
      },
      {
        "ten_giao_xu": "TRUNG MỸ TÂY",
        "dia_chi": "40/4 Trung Mỹ Tây, Tân Xuân, Hóc Môn",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "17.00"
        }
      }
    ]
  },
  {
    "giao_hat": "HẠT PHÚ NHUẬN",
    "giao_xu": [
      {
        "ten_giao_xu": "THÁNH ĐAMINH",
        "dia_chi": "190 Lê Văn Sỹ, P.10, Q.Phú Nhuận",
        "gio_le": {
          "ngay_thuong_sang": "05.00, 05.45",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 06.15, 07.30, 09.00",
          "chua_nhat_chieu": "16.00, 17.30, 19.00"
        }
      },
      {
        "ten_giao_xu": "PHÁT DIỆM",
        "dia_chi": "485 Nguyễn Kiệm, P.9, Q.Phú Nhuận",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.15",
          "chua_nhat_sang": "05.00, 06.30, 08.00",
          "chua_nhat_chieu": "15.00, 17.00"
        }
      },
      {
        "ten_giao_xu": "PHÚ HẢI",
        "dia_chi": "69 Cô Giang, P.1, Q.Phú Nhuận",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.45",
          "chua_nhat_chieu": "15.00, 17.30"
        }
      },
      {
        "ten_giao_xu": "PHÚ HẠNH",
        "dia_chi": "121 Phan Đăng Lưu, P.7, Q.Phú Nhuận",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "05.00, 07.00, 08.15",
          "chua_nhat_chieu": "17.00, 19.00"
        }
      },
      {
        "ten_giao_xu": "PHÚ LỘC",
        "dia_chi": "109 -113 Duy Tân, P.15, Q.Phú Nhuận",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "PHÚ NHUẬN",
        "dia_chi": "91 Hoàng Văn Thụ, P.8, Q.Phú Nhuận",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "05.00, 06.30, 08.00",
          "chua_nhat_chieu": "16.00, 18.00"
        }
      },
      {
        "ten_giao_xu": "PHÚ QUÝ",
        "dia_chi": "130 Cao Thắng, Phường 17, Q.Phú Nhuận",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 06.45",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "TÂN HOÀ",
        "dia_chi": "525/92 Huỳnh Văn Bánh, P.14, Q.Phú Nhuận",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 06.30, 08.00",
          "chua_nhat_chieu": "17.30, 18.30"
        }
      }
    ]
  },
  {
    "giao_hat": "HẠT PHÚ THỌ",
    "giao_xu": [
      {
        "ten_giao_xu": "BẮC HÀ",
        "dia_chi": "419 Lý Thái Tổ, P.9, Q.10",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 06.00, 07.00, 09.00",
          "chua_nhat_chieu": "16.00, 17.00"
        }
      },
      {
        "ten_giao_xu": "BÌNH THỚI",
        "dia_chi": "161D/106/10 Lạc Long Quân, P.3, Q.11",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "06.00, 07.30",
          "chua_nhat_chieu": "18.00"
        }
      },
      {
        "ten_giao_xu": "ĐỒNG TIẾN",
        "dia_chi": "54 Thành Thái, P.12, Q.10",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "06.00, 07.30",
          "chua_nhat_chieu": "17.00, 18.30"
        }
      },
      {
        "ten_giao_xu": "HOÀ HƯNG",
        "dia_chi": "104 Tô Hiến Thành, P.15, Q.10",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30, 18.15(T7)",
          "chua_nhat_sang": "05.00, 06.15, 07.45",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "PHÚ BÌNH",
        "dia_chi": "423 Lạc Long Quân, P.5, Q.11",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "TÂN PHÚ HOÀ",
        "dia_chi": "173/45/51 Khuông Việt, P.Phú Trung, Q.Tân Phú",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "18.00, 17.00(T7)",
          "chua_nhat_sang": "05.00, 07.30",
          "chua_nhat_chieu": "16.30, 19.00"
        }
      },
      {
        "ten_giao_xu": "TÂN PHƯỚC",
        "dia_chi": "78/12 Nguyễn Thị Nhỏ, P.9, Q.Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.30, 07.30",
          "chua_nhat_chieu": "17.30, 19.00"
        }
      },
      {
        "ten_giao_xu": "TÂN TRANG",
        "dia_chi": "153/10/3 Tân Lập, P.8, Q.Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.45",
          "chua_nhat_sang": "05.00, 07.30",
          "chua_nhat_chieu": "17.00, 18.15"
        }
      },
      {
        "ten_giao_xu": "TỐNG VIẾT BƯỜNG",
        "dia_chi": "01 Hương Giang, Cư xá Bắc Hải, P.15, Q.10",
        "gio_le": {
          "ngay_thuong_sang": "05.30",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "06.00, 08.00",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "THÁNH PHAOLÔ",
        "dia_chi": "352 Lê Hồng Phong, P.1, Q.10",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "05.30, 07.30",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "THĂNG LONG",
        "dia_chi": "84/80 Tôn Thất Hiệp, P.13, Q.11",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "05.00, 07.30",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "VĨNH HOÀ",
        "dia_chi": "86/75 Ông Ích Khiêm, P.5, Q.11",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30, 19.00(T7)",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "PHÚ HÒA",
        "dia_chi": "19/2 Hoàng Xuân Nhị,P.Phú Trung, Q.Tân Phú",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 07.30",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "VINH SƠN PHAOLÔ",
        "dia_chi": "249-251 Đường 3/2, P.10, Q.10",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "06.00, 07.00, 08.30",
          "chua_nhat_chieu": "17.00"
        }
      }
    ]
  },
  {
    "giao_hat": "HẠT SÀIGÒN",
    "giao_xu": [
      {
        "ten_giao_xu": "CHÁNH TOÀ",
        "dia_chi": "1 Công xã Paris, P.Bến Nghé, Q.1",
        "gio_le": {
          "ngay_thuong_sang": "05.30",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "05.30, 06.30, 07.30, 09.30",
          "chua_nhat_chieu": "16.00, 17.15, 18.30"
        }
      },
      {
        "ten_giao_xu": "ANTÔN Cầu Ông Lãnh",
        "dia_chi": "18 Phan Văn Trường, Cầu Ông Lãnh, Q.1",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.30, 07.00",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "BÀN CỜ",
        "dia_chi": "48 Nguyễn Thiện Thuật, P.2, Q.3",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "06.00, 07.30, 09.00",
          "chua_nhat_chieu": "16.30, 18.00"
        }
      },
      {
        "ten_giao_xu": "CẦU KHO",
        "dia_chi": "31 Trần Đình Xu, P.Cầu Kho, Q.1",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "17.00, 18.00"
        }
      },
      {
        "ten_giao_xu": "CHỢ ĐŨI",
        "dia_chi": "1 Tôn Thất Tùng, Q.1",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 06.30, 08.00",
          "chua_nhat_chieu": "16.30, 18.00"
        }
      },
      {
        "ten_giao_xu": "VƯỜN CHUỐI",
        "dia_chi": "199/40/6 CMT8, P.4, Q.3",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "06.30, 09.00",
          "chua_nhat_chieu": "15.30, 17.30"
        }
      },
      {
        "ten_giao_xu": "ĐỨC BÀ FATIMA",
        "dia_chi": "212B/1A Nguyễn Trãi, Q.1",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "06.30",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "ĐỨC BÀ HOÀ BÌNH",
        "dia_chi": "26A Nguyễn Thái Bình, Q.1",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "06.30, 08.30",
          "chua_nhat_chieu": "18.00"
        }
      },
      {
        "ten_giao_xu": "MẠCTINHO",
        "dia_chi": "16A Nguyễn Thị Minh Khai, Q.1",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "07.00",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "PHANXICÔ Đakao",
        "dia_chi": "50 Nguyễn Đình Chiểu, P.Đakao, Q.1",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 06.30, 08.00",
          "chua_nhat_chieu": "17.00"
        }
      }
    ]
  },
  {
    "giao_hat": "HẠT TÂN ĐỊNH",
    "giao_xu": [
      {
        "ten_giao_xu": "AN PHÚ",
        "dia_chi": "205/45 Trần Văn Đang, P.11, Q.3",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "06.00, 08.30",
          "chua_nhat_chieu": "17.00, 19.00"
        }
      },
      {
        "ten_giao_xu": "BÙI PHÁT",
        "dia_chi": "453/105KC Lê Văn Sỹ, P.12, Q.3",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "18.00, 19.00",
          "chua_nhat_sang": "05.00, 06.30, 08.30",
          "chua_nhat_chieu": "16.00, 18.00"
        }
      },
      {
        "ten_giao_xu": "CÔNG LÝ",
        "dia_chi": "62/147A Lý Chính Thắng, P.8, Q.3",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "06.30, 09.30",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "ĐỨC MẸ HCG",
        "dia_chi": "38 Kỳ Đồng, P.9, Q.3",
        "gio_le": {
          "ngay_thuong_sang": "05.00, 06.00",
          "ngay_thuong_chieu": "17.00, 14.00(T7), 16.00(T7), 18.30(T7)",
          "chua_nhat_sang": "05.00, 06.30, 08.00, 10.00",
          "chua_nhat_chieu": "15.30, 17.00, 18.30, 20.00"
        }
      },
      {
        "ten_giao_xu": "MAI KHÔI",
        "dia_chi": "44 Tú Xương, P.7, Q.3",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.30, 07.00, 10.00(Pháp)",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "REGINA MUNDI",
        "dia_chi": "228 Nam Kỳ Khởi Nghĩa, P.6, Q.3",
        "gio_le": {
          "ngay_thuong_sang": "05.30",
          "ngay_thuong_chieu": "",
          "chua_nhat_sang": "07.00",
          "chua_nhat_chieu": ""
        }
      },
      {
        "ten_giao_xu": "TÂN ĐỊNH",
        "dia_chi": "289 Hai Bà Trưng, P.8, Q.3",
        "gio_le": {
          "ngay_thuong_sang": "05.00, 06.15",
          "ngay_thuong_chieu": "17.30, 19.00(T7)",
          "chua_nhat_sang": "05.00, 06.15, 07.30, 09.00",
          "chua_nhat_chieu": "16.00, 17.30, 19.00"
        }
      },
      {
        "ten_giao_xu": "THÁNH GIA",
        "dia_chi": "18/2 Trần Quý Khoách, Q.3",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "06.00, 08.00",
          "chua_nhat_chieu": "17.00, 19.00"
        }
      },
      {
        "ten_giao_xu": "THÁNH PHAOLÔ",
        "dia_chi": "262/14 Lê Văn Sỹ, P.14, Q.3",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "05.00, 07.45",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "VƯỜN XOÀI",
        "dia_chi": "413 Lê Văn Sỹ, P.12, Q.3",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 06.30, 08.00",
          "chua_nhat_chieu": "16.00, 17.30, 19.00"
        }
      },
      {
        "ten_giao_xu": "XÓM LÁCH",
        "dia_chi": "134/109/18 Lý Chính Thắng, Q.3",
        "gio_le": {
          "ngay_thuong_sang": "05.30",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "07.00, 09.00",
          "chua_nhat_chieu": "17.00"
        }
      }
    ]
  },
  {
    "giao_hat": "HẠT TÂN SƠN NHÌ",
    "giao_xu": [
      {
        "ten_giao_xu": "BÌNH CHÁNH",
        "dia_chi": "C5/1 Trịnh Như Khuê, Xã Bình Chánh, H.Bình Chánh",
        "gio_le": {
          "ngay_thuong_sang": "05.00(T2,7)",
          "ngay_thuong_chieu": "18.00(T3,4,5,6)",
          "chua_nhat_sang": "05.30, 08.00",
          "chua_nhat_chieu": "17.15, 17.30"
        }
      },
      {
        "ten_giao_xu": "BÌNH THUẬN",
        "dia_chi": "4/48 Tân Kỳ, Tân Quý, P.Bình Hưng Hoà, Q.Bình Tân",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "15.30, 17.00, 18.30"
        }
      },
      {
        "ten_giao_xu": "ĐẮC LỘ",
        "dia_chi": "97 Trường Chinh, P.12, Q.Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "04.30, 05.30",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "04.30, 05.30, 08.00",
          "chua_nhat_chieu": "16.00, 17.15"
        }
      },
      {
        "ten_giao_xu": "GÒ MÂY",
        "dia_chi": "791/2 Lê Trọng Tấn, KP2,P.Bình Hưng Hòa, Q.Bình Tân",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "17.00, 19.00"
        }
      },
      {
        "ten_giao_xu": "NHÂN HOÀ",
        "dia_chi": "45 Hồ Đắc Di, P.Tây Thạnh, Q.Tân Phú",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "05.00, 06.30, 08.00",
          "chua_nhat_chieu": "15.00, 17.00, 19.00"
        }
      },
      {
        "ten_giao_xu": "HY VỌNG",
        "dia_chi": "57 Phan Huy Ích, P.15, Q.Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "06.00, 08.00",
          "chua_nhat_chieu": "18.00"
        }
      },
      {
        "ten_giao_xu": "NINH PHÁT",
        "dia_chi": "3A62 Ấp 3, X. Phạm Văn Hai, Bình Chánh",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "THÁNH PHAOLÔ",
        "dia_chi": "Đường Vành Đai Trong, KP.3, P.Bình Trị Đông, Q.Bình Tân",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.15",
          "chua_nhat_sang": "05.00, 08.00",
          "chua_nhat_chieu": "17.15, 19.00"
        }
      },
      {
        "ten_giao_xu": "PHÚ HOÀ",
        "dia_chi": "338B Hoàng Xuân Nhị, P.Phú Trung, Q.Tân Phú",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.30, 07.30",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "PHÚ THỌ HÒA",
        "dia_chi": "1A Tổ 74, Luỹ Bán Bích, P.Hiệp Tân, Q.Tân Phú",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "17.30, 19.00"
        }
      },
      {
        "ten_giao_xu": "PHÚ TRUNG",
        "dia_chi": "1434 Lạc Long Quân, P.11, Q.Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "16.30, 18.00"
        }
      },
      {
        "ten_giao_xu": "TÂN CHÂU",
        "dia_chi": "98/1 Trường Chinh, P.12, Q.Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "04.30",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "TÂN HƯƠNG",
        "dia_chi": "1/30 Tân Hương, P.Tân Quý, Q.Tân Phú",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "16.00, 17.30"
        }
      },
      {
        "ten_giao_xu": "TÂN PHÚ",
        "dia_chi": "33/4 Ngưyễn Hậu, P.Tân Thành, Q.Tân Phú",
        "gio_le": {
          "ngay_thuong_sang": "04.00, 05.00",
          "ngay_thuong_chieu": "17.45",
          "chua_nhat_sang": "04.00, 05.30, 07.15",
          "chua_nhat_chieu": "16.00, 17.30, 19.00"
        }
      },
      {
        "ten_giao_xu": "TÂN THÁI SƠN",
        "dia_chi": "35/8 Hoàng Văn Hoè, P.Tân Quý, Q.Tân Phú",
        "gio_le": {
          "ngay_thuong_sang": "04.45",
          "ngay_thuong_chieu": "17.15",
          "chua_nhat_sang": "04.30, 07.00",
          "chua_nhat_chieu": "16.00, 18.00"
        }
      },
      {
        "ten_giao_xu": "TÂN THÀNH",
        "dia_chi": "371/35B Trường Chinh, P.14, Q.Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 07.30",
          "chua_nhat_chieu": "14.30, 17.30"
        }
      },
      {
        "ten_giao_xu": "TÂN VIỆT",
        "dia_chi": "241bis Trường Chinh, P.12, Q.Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.15",
          "chua_nhat_sang": "04.30, 06.00",
          "chua_nhat_chieu": "15.00, 17.15"
        }
      },
      {
        "ten_giao_xu": "THIÊN ÂN",
        "dia_chi": "58/21 Lê Niệm, P.Phú Thạnh, Q.Tân Phú",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 08.00",
          "chua_nhat_chieu": "17.00, 19.00"
        }
      },
      {
        "ten_giao_xu": "VĂN CÔI",
        "dia_chi": "97/41 Nguyễn Tử Nha, P.12, Q.Tân Bình",
        "gio_le": {
          "ngay_thuong_sang": "04.30",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "04.30, 07.00",
          "chua_nhat_chieu": "16.45"
        }
      }
    ]
  },
  {
    "giao_hat": "HẠT THỦ ĐỨC",
    "giao_xu": [
      {
        "ten_giao_xu": "BÌNH CHIỂU",
        "dia_chi": "50/6 KP.1, P.Bình Chiểu, Thủ Đức",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "04.30, 07.00",
          "chua_nhat_chieu": "18.00"
        }
      },
      {
        "ten_giao_xu": "BÌNH THỌ",
        "dia_chi": "356/20 Võ Văn Ngân, Thủ Đức",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "06.00",
          "chua_nhat_chieu": "18.00"
        }
      },
      {
        "ten_giao_xu": "FATIMA BÌNH TRIỆU",
        "dia_chi": "355/5 P.Hiệp Bình Chánh, Thủ Đức",
        "gio_le": {
          "ngay_thuong_sang": "05.15",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "05.30, 07.30",
          "chua_nhat_chieu": "16.30, 18.30"
        }
      },
      {
        "ten_giao_xu": "CHÂU BÌNH",
        "dia_chi": "470/17 Tỉnh lộ 43, P.Tam Phú, Thủ Đức",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 07.15",
          "chua_nhat_chieu": "16.30"
        }
      },
      {
        "ten_giao_xu": "HIỂN LINH",
        "dia_chi": "5E Ấp 2, P.Linh Trung, Thủ Đức",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "06.00, 08.00",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "KHIẾT TÂM",
        "dia_chi": "150B KP.4, P.Bình Chiểu, Thủ Đức",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "05.00, 07.00, 09.00",
          "chua_nhat_chieu": "16.00, 18.00, 19.45"
        }
      },
      {
        "ten_giao_xu": "THÁNH KHANG",
        "dia_chi": "220 KP.1, P.Linh Đông, Thủ Đức",
        "gio_le": {
          "ngay_thuong_sang": "04.30",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "04.30, 07.30",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "TAM HÀ",
        "dia_chi": "1312 KP.4, P.Tam Phú, Thủ Đức",
        "gio_le": {
          "ngay_thuong_sang": "05.30",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "04.30, 07.00",
          "chua_nhat_chieu": "16.00, 18.00"
        }
      },
      {
        "ten_giao_xu": "TAM HẢI",
        "dia_chi": "180 Tam Châu, KP.2, P.Tam Bình, TĐ",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "05.00, 07.00, 10.00",
          "chua_nhat_chieu": "16.00, 17.30, 19.30"
        }
      },
      {
        "ten_giao_xu": "THỦ ĐỨC",
        "dia_chi": "51 Võ Văn Ngân, P.Linh Chiểu, Thủ Đức",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "05.00, 07.00, 08.30",
          "chua_nhat_chieu": "17.00, 18.30"
        }
      },
      {
        "ten_giao_xu": "TỪ ĐỨC",
        "dia_chi": "42 Đường 4, KP.2, P.Bình Thọ, Thủ Đức",
        "gio_le": {
          "ngay_thuong_sang": "04.30",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "04.30, 07.00",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "XUÂN HIỆP",
        "dia_chi": "33/9A KP.4, P.Linh Xuân, Thủ Đức",
        "gio_le": {
          "ngay_thuong_sang": "05.30",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "05.00, 07.00, 09.00",
          "chua_nhat_chieu": "16.00, 17.30, 19.30"
        }
      }
    ]
  },
  {
    "giao_hat": "HẠT THỦ THIÊM",
    "giao_xu": [
      {
        "ten_giao_xu": "CAO THÁI",
        "dia_chi": "44/1 Vĩnh Thuận, P. Long Bình, Q.9",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "18.30",
          "chua_nhat_sang": "04.30, 07.00",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "CÔNG THÀNH",
        "dia_chi": "58 đường 27, P.Bình Trưng Tây, Q.2",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.45",
          "chua_nhat_sang": "05.45",
          "chua_nhat_chieu": "17.45"
        }
      },
      {
        "ten_giao_xu": "THÁNH GẪM",
        "dia_chi": "Ấp Gò Công, Long Thạnh Mỹ, Q.9",
        "gio_le": {
          "ngay_thuong_sang": "05.30",
          "ngay_thuong_chieu": "",
          "chua_nhat_sang": "06.00",
          "chua_nhat_chieu": ""
        }
      },
      {
        "ten_giao_xu": "LONG BÌNH",
        "dia_chi": "98/2 Nguyễn Xiển, P.Long Bình, Q.9",
        "gio_le": {
          "ngay_thuong_sang": "04.00",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "04.00, 07.00",
          "chua_nhat_chieu": "16.30"
        }
      },
      {
        "ten_giao_xu": "LONG ĐẠI",
        "dia_chi": "282P Long Đại, P.Long Phước, Q.9",
        "gio_le": {
          "ngay_thuong_sang": "05.30(T7)",
          "ngay_thuong_chieu": "18.00(T5,7), 17.30(T2,3,4,6)",
          "chua_nhat_sang": "06.00",
          "chua_nhat_chieu": ""
        }
      },
      {
        "ten_giao_xu": "LONG THẠNH MỸ",
        "dia_chi": "67 Phan Đạt Đức, Ấp 1, P.Long Thạnh Mỹ, Q.9",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "05.00, 06.15",
          "chua_nhat_chieu": "17.00, 19.00"
        }
      },
      {
        "ten_giao_xu": "MINH ĐỨC",
        "dia_chi": "7/89 Cây Dầu, P.Tân Phú, Q.9",
        "gio_le": {
          "ngay_thuong_sang": "04.45",
          "ngay_thuong_chieu": "17.45",
          "chua_nhat_sang": "04.45, 07.15",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "MỸ HOÀ",
        "dia_chi": "136 KP.1, Bình Trưng Đông, Q.2",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 06.45",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "PHÚ HỮU",
        "dia_chi": "139A, Nguyễn Duy Trinh, P.Phú Hữu, Q.9",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 07.30",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "TÂN ĐỨC",
        "dia_chi": "Đại lộ 1, P.Phước Bình, Q.9",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "05.00, 06.45",
          "chua_nhat_chieu": "18.00"
        }
      },
      {
        "ten_giao_xu": "TÂN LẬP",
        "dia_chi": "460 KP.2, Tân Lập, Bình Trưng Đông, Q.9",
        "gio_le": {
          "ngay_thuong_sang": "04.00",
          "ngay_thuong_chieu": "16.45",
          "chua_nhat_sang": "04.00, 06.00",
          "chua_nhat_chieu": "13.30, 16.00"
        }
      },
      {
        "ten_giao_xu": "THANH BÌNH",
        "dia_chi": "Ấp Bình Khánh, P.Bình Khánh, Q.2",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "18.00 (T.Năm)",
          "chua_nhat_sang": "",
          "chua_nhat_chieu": "18.00"
        }
      },
      {
        "ten_giao_xu": "THÁNH CẨM",
        "dia_chi": "16/1 Chân Phúc Cẩm, P.Long Thạnh Mỹ, Q.9",
        "gio_le": {
          "ngay_thuong_sang": "04.30",
          "ngay_thuong_chieu": "17.45",
          "chua_nhat_sang": "04.30, 08.00",
          "chua_nhat_chieu": "16.30"
        }
      },
      {
        "ten_giao_xu": "THÁNH GIUSE THỢ",
        "dia_chi": "120 KP.3, Phường Phước Long A, Q.9",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "06.30",
          "chua_nhat_chieu": "18.00"
        }
      },
      {
        "ten_giao_xu": "THÁNH LINH",
        "dia_chi": "1/6 KP I, P.Tăng Nhơn Phú B, Q.9",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "18.00"
        }
      },
      {
        "ten_giao_xu": "THÁNH TÂM",
        "dia_chi": "43 Trần Hưng Đạo, KP.2, P.Hiệp Phú, Q.9",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "07.00",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "THIÊN THẦN",
        "dia_chi": "600 Khu phố 4, Phường An Phú, Q.2",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": ""
        }
      },
      {
        "ten_giao_xu": "THỦ THIÊM",
        "dia_chi": "58 Khu phố I, P.Thủ Thiêm, Q.2",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "17.00"
        }
      }
    ]
  },
  {
    "giao_hat": "HẠT XÓM CHIẾU",
    "giao_xu": [
      {
        "ten_giao_xu": "AN PHÚ",
        "dia_chi": "258/7 Trần Xuân Soạn, Tân Hưng, Q.7",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "19.00 (T3,5,7)",
          "chua_nhat_sang": "06.00",
          "chua_nhat_chieu": ""
        }
      },
      {
        "ten_giao_xu": "AN THỚI ĐÔNG",
        "dia_chi": "Ap An Hòa,Xã An Thới Đông, H.Cần Giờ",
        "gio_le": {
          "ngay_thuong_sang": "05.00 (T2,5)",
          "ngay_thuong_chieu": "17.30 (T3,4,6,7)",
          "chua_nhat_sang": "07.00",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "CẦN GIỜ",
        "dia_chi": "1932/2 Miễu Nhì, Cần Thạnh, H.Cần Giờ",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "06.00",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "ĐỒNG HOÀ",
        "dia_chi": "Ấp An Hoà, xã Long Hoà, H.Cần Giờ",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "18.30",
          "chua_nhat_sang": "06.30",
          "chua_nhat_chieu": "18.30"
        }
      },
      {
        "ten_giao_xu": "THÁNH GIUSE",
        "dia_chi": "114B Ấp Trần Hưng Đạo, Tam Thôn Hiệp, H.Cần Giờ",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "18.00, 19.00",
          "chua_nhat_sang": "06.00, 07.00",
          "chua_nhat_chieu": "18.00, 19.00"
        }
      },
      {
        "ten_giao_xu": "KHÁNH HỘI",
        "dia_chi": "136 Tôn Đản, P.10, Q.4",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.30, 08.00",
          "chua_nhat_chieu": "17.00, 18.30"
        }
      },
      {
        "ten_giao_xu": "MẪU TÂM (Q7)",
        "dia_chi": "16-18 Phan Huy Thực, P.Tân Kiểng, Q.7",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "05.30, 07.30",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "TẮC RỖI",
        "dia_chi": "Khu Dân cư Tân Mỹ, P.Tân Phú, Q.7",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "18.30 (T3,5,7)",
          "chua_nhat_sang": "08.30",
          "chua_nhat_chieu": ""
        }
      },
      {
        "ten_giao_xu": "MÔI KHÔI",
        "dia_chi": "295 Huỳnh Tấn Phát, Tân Thuận Đông, Q.7",
        "gio_le": {
          "ngay_thuong_sang": "05.30 (T7)",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "06.00, 08.00",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "PHÚ XUÂN",
        "dia_chi": "6 Khóm 2, Khu phố 6, Nhà Bè",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "",
          "chua_nhat_sang": "07.00",
          "chua_nhat_chieu": "17.30"
        }
      },
      {
        "ten_giao_xu": "THUẬN PHÁT",
        "dia_chi": "253 Trần Xuân Soạn, P.Tân Kiểng, Q.7",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "05.30, 07.30",
          "chua_nhat_chieu": "17.00"
        }
      },
      {
        "ten_giao_xu": "VĨNH HỘI",
        "dia_chi": "158 Bến Vân Đồn, P.6, Q.4",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "15.00, 17.00, 19.00"
        }
      },
      {
        "ten_giao_xu": "MẪU TÂM (Q4)",
        "dia_chi": "72 Cù Lao Kiệu, P.1, Q.4",
        "gio_le": {
          "ngay_thuong_sang": "",
          "ngay_thuong_chieu": "17.30 (T6)",
          "chua_nhat_sang": "07.00",
          "chua_nhat_chieu": ""
        }
      },
      {
        "ten_giao_xu": "XÓM CHIẾU",
        "dia_chi": "92B/20 bis Tôn Thất Thuyết, P.16, Q.4",
        "gio_le": {
          "ngay_thuong_sang": "04.45",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "04.45, 06.00, 07.15",
          "chua_nhat_chieu": "16.00, 17.30, 19.00"
        }
      }
    ]
  },
  {
    "giao_hat": "HẠT XÓM MỚI",
    "giao_xu": [
      {
        "ten_giao_xu": "AN NHƠN",
        "dia_chi": "15/173 Lê Hoàng Phái, P.17, Gò vấp",
        "gio_le": {
          "ngay_thuong_sang": "04.45",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "16.00, 18.00"
        }
      },
      {
        "ten_giao_xu": "BẮC DŨNG",
        "dia_chi": "31/330 Thống Nhất, P.15, Gò vấp",
        "gio_le": {
          "ngay_thuong_sang": "04.30",
          "ngay_thuong_chieu": "16.30",
          "chua_nhat_sang": "04.00, 06.30",
          "chua_nhat_chieu": "15.45"
        }
      },
      {
        "ten_giao_xu": "ĐỨC MẸ HCG",
        "dia_chi": "5/82 Lê Đức Thọ, P.15, Gò vấp",
        "gio_le": {
          "ngay_thuong_sang": "05.00",
          "ngay_thuong_chieu": "18.00",
          "chua_nhat_sang": "05.00, 08.00",
          "chua_nhat_chieu": "17.30, 19.00"
        }
      },
      {
        "ten_giao_xu": "HÀ ĐÔNG",
        "dia_chi": "530 Thống Nhất, P.16, Gò vấp",
        "gio_le": {
          "ngay_thuong_sang": "04.15",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "05.00, 07.00",
          "chua_nhat_chieu": "17.00, 19.00"
        }
      },
      {
        "ten_giao_xu": "HÀ NỘI",
        "dia_chi": "49/7 Thống Nhất, P.13, Gò vấp",
        "gio_le": {
          "ngay_thuong_sang": "04.15",
          "ngay_thuong_chieu": "17.15",
          "chua_nhat_sang": "04.15, 05.30, 06.30",
          "chua_nhat_chieu": "16.30, 19.00"
        }
      },
      {
        "ten_giao_xu": "HOÀNG MAI",
        "dia_chi": "18/368 Lê Đức Thọ, P.15, Gò vấp",
        "gio_le": {
          "ngay_thuong_sang": "04.30, 09.30(T7)",
          "ngay_thuong_chieu": "16.45, 17.45",
          "chua_nhat_sang": "04.30, 06.30, 08.30",
          "chua_nhat_chieu": "15.45, 17.00, 19.00"
        }
      },
      {
        "ten_giao_xu": "HỢP AN",
        "dia_chi": "41/1 Phạm Văn Chiêu, P.13, Gò vấp",
        "gio_le": {
          "ngay_thuong_sang": "04.00",
          "ngay_thuong_chieu": "17.15",
          "chua_nhat_sang": "04.00, 06.00",
          "chua_nhat_chieu": "16.00"
        }
      },
      {
        "ten_giao_xu": "LAM SƠN",
        "dia_chi": "106/1124 Lê Đức Thọ, P.13, Gò vấp",
        "gio_le": {
          "ngay_thuong_sang": "04.30",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "04.30, 06.00",
          "chua_nhat_chieu": "16.30"
        }
      },
      {
        "ten_giao_xu": "LẠNG SƠN",
        "dia_chi": "25/1 Lê Đức Thọ, P.16, Gò vấp",
        "gio_le": {
          "ngay_thuong_sang": "04.45",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "04.30, 06.00, 07.30",
          "chua_nhat_chieu": "17.00, 19.00"
        }
      },
      {
        "ten_giao_xu": "NỮ VƯƠNG HOÀ BÌNH",
        "dia_chi": "62/3 Lê Đức Thọ, P.13, Gò vấp",
        "gio_le": {
          "ngay_thuong_sang": "04.45",
          "ngay_thuong_chieu": "17.45, 18.00(T5)",
          "chua_nhat_sang": "04.45, 06.15",
          "chua_nhat_chieu": "17.15, 19.00"
        }
      },
      {
        "ten_giao_xu": "TÂN HƯNG",
        "dia_chi": "2/43, Lê Đức Thọ P.15, Gò vấp",
        "gio_le": {
          "ngay_thuong_sang": "04.00",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "04.00, 06.00",
          "chua_nhat_chieu": "16.30"
        }
      },
      {
        "ten_giao_xu": "THÁI BÌNH",
        "dia_chi": "48/16 Thống Nhất, P.13, Gò vấp",
        "gio_le": {
          "ngay_thuong_sang": "04.15",
          "ngay_thuong_chieu": "17.30",
          "chua_nhat_sang": "04.15, 07.00",
          "chua_nhat_chieu": "15.00, 17.00"
        }
      },
      {
        "ten_giao_xu": "THẠCH ĐÀ",
        "dia_chi": "1/1 Phạm Văn Chiêu, P.12, Gò vấp",
        "gio_le": {
          "ngay_thuong_sang": "04.30",
          "ngay_thuong_chieu": "17.30, 19.00(T5,7)",
          "chua_nhat_sang": "04.30, 06.00, 07.30",
          "chua_nhat_chieu": "16.00, 17.30, 19.00"
        }
      },
      {
        "ten_giao_xu": "TRUNG BẮC",
        "dia_chi": "18/358 Lê Đức Thọ, P.15, Gò vấp",
        "gio_le": {
          "ngay_thuong_sang": "04.15",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "04.00, 06.00",
          "chua_nhat_chieu": "16.30"
        }
      },
      {
        "ten_giao_xu": "TỬ ĐÌNH",
        "dia_chi": "20/233 Thống Nhất, P.15, Gò vấp",
        "gio_le": {
          "ngay_thuong_sang": "04.15",
          "ngay_thuong_chieu": "17.00",
          "chua_nhat_sang": "04.15, 06.15",
          "chua_nhat_chieu": "16.00, 19.00"
        }
      }
    ]
  }
];

function cleanDeanery(raw) {
  let d = raw.trim();
  if (d.startsWith('HẠT ')) d = d.substring(4).trim();
  if (d === 'CÁC NHÀ THỜ LỚN') return 'Các Nhà Thờ Lớn';
  if (d === 'TRUNG TÂM MỤC VỤ (TIẾNG NƯỚC NGOÀI)') return 'Trung Tâm Mục Vụ';
  if (d === 'SÀIGÒN') return 'Sài Gòn';
  
  return d
    .toLowerCase()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function cleanParishName(raw) {
  if (!raw) return '';
  let s = raw.trim();
  if (s.startsWith('Trung tâm') || s.startsWith('TRUNG TÂM')) return 'Trung tâm Mục vụ TGP.TPHCM';
  if (s === 'N.D.KHANG') return 'Giáo xứ N.D. Khang';
  if (s === 'REGINA MUNDI') return 'Giáo xứ Regina Mundi';
  if (s.includes('JEANNE')) return "Giáo xứ Thánh Jeanne d'Arc";
  if (s.includes('HCG')) return 'Giáo xứ Đức Mẹ Hằng Cứu Giúp';
  if (s.includes('PHANXICÔ X.')) return 'Giáo xứ Thánh Phanxicô Xaviê';
  if (s === 'PHANXICÔ Đakao') return 'Giáo xứ Phanxicô Đakao';
  if (s === 'ĐAMINH BA CHUÔNG') return 'Giáo xứ Đaminh Ba Chuông';
  if (s === 'ANTÔN Cầu Ông Lãnh') return 'Giáo xứ Antôn Cầu Ông Lãnh';
  
  let prefix = 'Giáo xứ ';
  if (s.startsWith('Họ ') || s.startsWith('HỌ ')) {
    prefix = 'Giáo họ ';
    s = s.substring(3).trim();
  } else if (s.startsWith('TH ') || s.startsWith('Th ') || s.startsWith('THÁNH ') || s.startsWith('Thánh ')) {
    if (s.startsWith('TH ') || s.startsWith('Th ')) s = 'Thánh ' + s.substring(3).trim();
  }
  
  const formatted = s
    .toLowerCase()
    .split(/(\s+|[-–—()\/])/)
    .map(w => {
      if (!w || /^\s+$/.test(w) || /^[-–—()\/]$/.test(w)) return w;
      if (w === 'q1' || w === 'q.1') return 'Q.1';
      if (w === 'q2' || w === 'q.2') return 'Q.2';
      if (w === 'q3' || w === 'q.3') return 'Q.3';
      if (w === 'q4' || w === 'q.4') return 'Q.4';
      if (w === 'q5' || w === 'q.5') return 'Q.5';
      if (w === 'q6' || w === 'q.6') return 'Q.6';
      if (w === 'q7' || w === 'q.7') return 'Q.7';
      if (w === 'q8' || w === 'q.8') return 'Q.8';
      if (w === 'q9' || w === 'q.9') return 'Q.9';
      if (w === 'q10' || w === 'q.10') return 'Q.10';
      if (w === 'q11' || w === 'q.11') return 'Q.11';
      if (w === 'q12' || w === 'q.12') return 'Q.12';
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join('');
    
  return formatted.startsWith('Giáo xứ ') || formatted.startsWith('Giáo họ ') 
    ? formatted 
    : prefix + formatted;
}

function parseTimeStr(str) {
  if (!str) return [];
  const times = [];
  const regex = /([0-2]?\d)[:.h]([0-5]\d)/g;
  let match;
  while ((match = regex.exec(str)) !== null) {
    const h = String(parseInt(match[1], 10)).padStart(2, '0');
    const m = match[2];
    times.push(`${h}:${m}`);
  }
  return [...new Set(times)];
}

function extractSaturdayTimes(raw) {
  if (!raw) return [];
  const times = [];
  const parts = raw.split(/[,;]+/);
  for (const p of parts) {
    if (p.includes('T7') || p.includes('thứ bẩy') || p.includes('Thứ 7')) {
      const parsed = parseTimeStr(p);
      times.push(...parsed);
    }
  }
  return times;
}

function extractWeekdayTimes(raw) {
  if (!raw) return [];
  const times = [];
  const parts = raw.split(/[,;]+/);
  for (const p of parts) {
    if (p.includes('(T7)') || p.includes('(Thứ 7)') || p.includes('(thứ bẩy)')) {
      continue;
    }
    const parsed = parseTimeStr(p);
    times.push(...parsed);
  }
  return times;
}

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// Build list of new MassTime rows
const newRows = [];
const seenIds = new Set();

for (const group of rawData) {
  const deanery = cleanDeanery(group.giao_hat);
  for (const item of group.giao_xu) {
    const parish = cleanParishName(item.ten_giao_xu);
    const dia_chi = item.dia_chi?.trim() || '';
    const address = dia_chi ? `${dia_chi}, TP. Hồ Chí Minh` : 'TP. Hồ Chí Minh';
    
    const weekdaySang = extractWeekdayTimes(item.gio_le.ngay_thuong_sang);
    const weekdayChieu = extractWeekdayTimes(item.gio_le.ngay_thuong_chieu);
    const weekdayMass = [...new Set([...weekdaySang, ...weekdayChieu])].sort();

    const satSang = extractSaturdayTimes(item.gio_le.ngay_thuong_sang);
    const satChieu = extractSaturdayTimes(item.gio_le.ngay_thuong_chieu);
    const satSundayChieu = extractSaturdayTimes(item.gio_le.chua_nhat_chieu);
    const saturdayMass = [...new Set([...satSang, ...satChieu, ...satSundayChieu])].sort();

    const sunSang = parseTimeStr(item.gio_le.chua_nhat_sang);
    const sunChieuParts = (item.gio_le.chua_nhat_chieu || '').split(/[,;]+/);
    const sunChieu = [];
    for (const p of sunChieuParts) {
      if (!p.includes('thứ bẩy') && !p.includes('T7')) {
        sunChieu.push(...parseTimeStr(p));
      }
    }
    const sundayMass = [...new Set([...sunSang, ...sunChieu])].sort();

    let baseId = `sg-${slugify(deanery)}-${slugify(item.ten_giao_xu)}`;
    let id = baseId;
    let count = 1;
    while (seenIds.has(id)) {
      id = `${baseId}-${count++}`;
    }
    seenIds.add(id);

    newRows.push({
      id,
      parish,
      diocese: 'Sài Gòn',
      deanery,
      province: 'TP. Hồ Chí Minh',
      address,
      weekdayMass,
      saturdayMass: saturdayMass.length > 0 ? saturdayMass : undefined,
      sundayMass,
      source: 'TGP Sài Gòn'
    });
  }
}

console.log(`Generated ${newRows.length} parish records for Sài Gòn.`);

const write = process.argv.includes('--write');

if (!write) {
  console.log('\n--- SAMPLE 10 RECORDS ---');
  console.log(JSON.stringify(newRows.slice(0, 10), null, 2));
  console.log('\n(Chạy với cờ --write để thực thi xoá và ghi vào Firestore + giole.json)');
  process.exit(0);
}

// 1. Update public/giole.json: Remove all old Sài Gòn records, add newRows
const giolePath = new URL('../public/giole.json', import.meta.url);
const currentGiole = JSON.parse(readFileSync(giolePath, 'utf8'));
const filteredGiole = currentGiole.filter(r => r.diocese !== 'Sài Gòn');
const updatedGiole = [...filteredGiole, ...newRows];
writeFileSync(giolePath, JSON.stringify(updatedGiole, null, 2), 'utf8');
console.log(`Đã cập nhật public/giole.json: ${currentGiole.length} -> ${updatedGiole.length} nhà thờ.`);

// 2. Connect to Firestore
const db = getFirestore(initializeApp(cfg));
const massCol = collection(db, 'massTimes');

// Find all existing Sài Gòn docs in Firestore
console.log('Đang tìm tất cả document Giáo phận Sài Gòn trong Firestore...');
const sgSnap = await getDocs(query(massCol, where('diocese', '==', 'Sài Gòn')));
console.log(`Tìm thấy ${sgSnap.size} document Sài Gòn cũ trong Firestore.`);

// Batch delete old Sài Gòn docs
for (let i = 0; i < sgSnap.docs.length; i += 400) {
  const batch = writeBatch(db);
  sgSnap.docs.slice(i, i + 400).forEach(d => batch.delete(d.ref));
  await batch.commit();
  console.log(`  Đã xoá ${Math.min(i + 400, sgSnap.docs.length)}/${sgSnap.docs.length}`);
}

// Batch write new Sài Gòn docs
console.log('Đang ghi document Sài Gòn mới vào Firestore...');
for (let i = 0; i < newRows.length; i += 400) {
  const batch = writeBatch(db);
  for (const { id, ...data } of newRows.slice(i, i + 400)) {
    const docData = { ...data };
    if (!docData.saturdayMass) delete docData.saturdayMass;
    batch.set(doc(massCol, id), docData);
  }
  await batch.commit();
  console.log(`  Đã ghi ${Math.min(i + 400, newRows.length)}/${newRows.length}`);
}

// 3. Re-tally facets & update meta doc
console.log('Đang cập nhật massTimesMeta/dioceses...');
const after = await getDocs(massCol);
const tally = (pick, fallback) => {
  const counts = new Map();
  after.docs.forEach(d => {
    const name = pick(d.data()) || fallback;
    counts.set(name, (counts.get(name) ?? 0) + 1);
  });
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name, 'vi'));
};
const provinces = tally(d => d.province, 'Chưa rõ tỉnh/thành');
const list = tally(d => d.diocese, 'Chưa rõ giáo phận');
await setDoc(doc(db, 'massTimesMeta', 'dioceses'), { provinces, list, total: after.size, updatedAt: Date.now() });

console.log(`\n Hoàn tất! Tổng số document trong Firestore: ${after.size}.`);
process.exit(0);
