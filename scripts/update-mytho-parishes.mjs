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
    "ten_giao_xu": "Chánh Tòa",
    "giao_hat": "HẠT MỸ THO",
    "dia_chi": "32 Hùng Vương, P. 7, Tp. Mỹ Tho, TG",
    "gio_le": {
      "ngay_thuong_sang": "05g15",
      "ngay_thuong_chieu": "17g45",
      "chua_nhat_sang": "05g15, 07g30",
      "chua_nhat_chieu": "16g30, 18g30"
    }
  },
  {
    "ten_giao_xu": "Thánh Giuse Lao Công (Chợ Cũ)",
    "giao_hat": "HẠT MỸ THO",
    "dia_chi": "23/14 Học Lạc, P. 8, Tp. Mỹ Tho, TG",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "17g30",
      "chua_nhat_sang": "05g30",
      "chua_nhat_chieu": "17g30"
    }
  },
  {
    "ten_giao_xu": "An Đức",
    "giao_hat": "HẠT MỸ THO",
    "dia_chi": "Khu 3, Ấp Chợ, Trung An, Tp. Mỹ Tho, TG",
    "gio_le": {
      "ngay_thuong_sang": "Thứ 2,4,6: 05g00",
      "ngay_thuong_chieu": "Thứ 3,5,7: 17g00",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "17g00"
    }
  },
  {
    "ten_giao_xu": "Nữ Vương Hòa Bình",
    "giao_hat": "HẠT MỸ THO",
    "dia_chi": "23 Lý Thường Kiệt, P.6, Tp. Mỹ Tho, TG",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "17g30",
      "chua_nhat_sang": "05g00, 07g00",
      "chua_nhat_chieu": "17g15"
    }
  },
  {
    "ten_giao_xu": "Thánh Antôn",
    "giao_hat": "HẠT MỸ THO",
    "dia_chi": "227/4 Đinh Bộ Lĩnh, P. 2, Tp. Mỹ Tho, TG",
    "gio_le": {
      "ngay_thuong_sang": "",
      "ngay_thuong_chieu": "17g30",
      "chua_nhat_sang": "07g00",
      "chua_nhat_chieu": "17g30"
    }
  },
  {
    "ten_giao_xu": "Trung Lương",
    "giao_hat": "HẠT MỸ THO",
    "dia_chi": "KP.2, P.10, Tp. Mỹ Tho, TG",
    "gio_le": {
      "ngay_thuong_sang": "Thứ 2-6: 05g15",
      "ngay_thuong_chieu": "Thứ 7: 17g30",
      "chua_nhat_sang": "06g30",
      "chua_nhat_chieu": ""
    }
  },
  {
    "ten_giao_xu": "Thới Sơn",
    "giao_hat": "HẠT MỸ THO",
    "dia_chi": "Ấp Thới Thuận, Xã Thới Sơn, Tp. Mỹ Tho, TG",
    "gio_le": {
      "ngay_thuong_sang": "06g00",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "07g00",
      "chua_nhat_chieu": ""
    }
  },
  {
    "ten_giao_xu": "Bình Tạo",
    "giao_hat": "HẠT MỸ THO",
    "dia_chi": "90/4 Lê Hồng Gấm, Khóm Bình Tạo, Khu 2, P.6, Tp. Mỹ Tho, TG",
    "gio_le": {
      "ngay_thuong_sang": "",
      "ngay_thuong_chieu": "17g30",
      "chua_nhat_sang": "06g30",
      "chua_nhat_chieu": "17g00"
    }
  },
  {
    "ten_giao_xu": "Tân Long",
    "giao_hat": "HẠT MỸ THO",
    "dia_chi": "5/80 Tân Hòa, P. Tân Long, Tp. Mỹ Tho, TG",
    "gio_le": {
      "ngay_thuong_sang": "",
      "ngay_thuong_chieu": "17g30, Thứ 7: 18g30",
      "chua_nhat_sang": "05g30",
      "chua_nhat_chieu": ""
    }
  },
  {
    "ten_giao_xu": "Rạch Cầu",
    "giao_hat": "HẠT MỸ THO",
    "dia_chi": "Ấp Tân Định, Tân Thới, H. Tân Phú Đông, TG",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "17g00",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "16g00"
    }
  },
  {
    "ten_giao_xu": "Cồn Bà",
    "giao_hat": "HẠT MỸ THO",
    "dia_chi": "Ấp Tân Thành 2, Tân Thạnh, H. Tân Phú Đông, TG",
    "gio_le": {
      "ngay_thuong_sang": "",
      "ngay_thuong_chieu": "17g30",
      "chua_nhat_sang": "05g30",
      "chua_nhat_chieu": "16g00"
    }
  },
  {
    "ten_giao_xu": "Thủ Ngữ",
    "giao_hat": "HẠT MỸ THO",
    "dia_chi": "Xuân Đông, H. Chợ Gạo, TG",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "17g00",
      "chua_nhat_sang": "05g00, 07g00",
      "chua_nhat_chieu": "17g00"
    }
  },
  {
    "ten_giao_xu": "Thánh Tâm",
    "giao_hat": "HẠT MỸ THO",
    "dia_chi": "49 Nguyễn Trãi, P. 2, Tx. Gò Công, TG",
    "gio_le": {
      "ngay_thuong_sang": "",
      "ngay_thuong_chieu": "17g45",
      "chua_nhat_sang": "05g45",
      "chua_nhat_chieu": "17g30"
    }
  },
  {
    "ten_giao_xu": "Thánh Giuse",
    "giao_hat": "HẠT MỸ THO",
    "dia_chi": "Khu phố 3, P. 2, Tx.Gò Công, TG",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": ""
    }
  },
  {
    "ten_giao_xu": "Tân Phước",
    "giao_hat": "HẠT MỸ THO",
    "dia_chi": "Ấp 7, Tân Phước, H. Gò Công Đông, TG",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "Thứ 7: 15g30",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "15g30"
    }
  },
  {
    "ten_giao_xu": "Vàm Kinh",
    "giao_hat": "HẠT MỸ THO",
    "dia_chi": "Ấp Vàm Kinh, Tân Thành, H. Gò Công Đông, TG",
    "gio_le": {
      "ngay_thuong_sang": "Thứ 2: 5g30",
      "ngay_thuong_chieu": "Thứ 3-7: 17g30",
      "chua_nhat_sang": "07g00",
      "chua_nhat_chieu": "17g00"
    }
  },
  {
    "ten_giao_xu": "Tín Đức",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "Ấp Tân Thuận, Xã Bình Đức, H.Châu Thành, TG",
    "gio_le": {
      "ngay_thuong_sang": "04g45",
      "ngay_thuong_chieu": "16g45",
      "chua_nhat_sang": "04g45",
      "chua_nhat_chieu": "16g45"
    }
  },
  {
    "ten_giao_xu": "Kim Sơn",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "1, tổ 1, Phú Hoà, Phú Phong, H. Châu Thành, TG",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "17g00"
    }
  },
  {
    "ten_giao_xu": "Ba Giồng",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "Ấp Tân Quới, Xã Tân Lý Đông, H.Châu Thành, TG",
    "gio_le": {
      "ngay_thuong_sang": "Thứ 2: 05g00",
      "ngay_thuong_chieu": "Thứ 3-7: 17g30",
      "chua_nhat_sang": "04g30",
      "chua_nhat_chieu": "16g00"
    }
  },
  {
    "ten_giao_xu": "Tân Hiệp",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "331/1 Ấp Cá, TT. Tân Hiệp, H. Châu Thành, TG",
    "gio_le": {
      "ngay_thuong_sang": "",
      "ngay_thuong_chieu": "17g30",
      "chua_nhat_sang": "05g30",
      "chua_nhat_chieu": "17g30"
    }
  },
  {
    "ten_giao_xu": "Chợ Bưng",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "Ấp 1, Xã Tam Hiệp, H. Châu Thành, TG",
    "gio_le": {
      "ngay_thuong_sang": "Thứ 2,3,4,6,7: 04g45",
      "ngay_thuong_chieu": "Thứ 5: 17g30",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "17g00"
    }
  },
  {
    "ten_giao_xu": "Long Định 1",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "144, Khu Phố Lương Minh Chánh, Long Định, H. Châu Thành, TG",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "17g00"
    }
  },
  {
    "ten_giao_xu": "Long Định 2",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "319, Ấp Mới, Long Định, H. Châu Thành, TG",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "17g00"
    }
  },
  {
    "ten_giao_xu": "Nhị Bình",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "Ấp Tây, Xã Nhị Bình, H. Châu Thành, TG",
    "gio_le": {
      "ngay_thuong_sang": "",
      "ngay_thuong_chieu": "Thứ 5: 17g00",
      "chua_nhat_sang": "08g30",
      "chua_nhat_chieu": ""
    }
  },
  {
    "ten_giao_xu": "Bình Trưng",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "239, tổ 7, Ấp Bình Thới A, Xã Bình Trưng, H. Châu Thành, TG",
    "gio_le": {
      "ngay_thuong_sang": "Thứ 2-6: 05g30",
      "ngay_thuong_chieu": "Thứ 7: 17g00",
      "chua_nhat_sang": "05g30",
      "chua_nhat_chieu": ""
    }
  },
  {
    "ten_giao_xu": "Đông Hòa",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "Ấp Tây B, xã Đông Hoà, H. Châu Thành, TG",
    "gio_le": {
      "ngay_thuong_sang": "",
      "ngay_thuong_chieu": "17g00",
      "chua_nhat_sang": "08g00",
      "chua_nhat_chieu": ""
    }
  },
  {
    "ten_giao_xu": "Vĩnh Kim",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "Ấp Bình Thới A, Xã Bình Trưng, H. Châu Thành, TG",
    "gio_le": {
      "ngay_thuong_sang": "",
      "ngay_thuong_chieu": "18g00",
      "chua_nhat_sang": "06g30",
      "chua_nhat_chieu": ""
    }
  },
  {
    "ten_giao_xu": "Xoài Mút",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "Ấp Bờ Xe, Xã Thạnh Phú, H. Châu Thành, TG",
    "gio_le": {
      "ngay_thuong_sang": "",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "",
      "chua_nhat_chieu": ""
    }
  },
  {
    "ten_giao_xu": "Thuộc Nhiêu",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "Ấp Hòa, Xã Dưỡng Điềm, H. Châu Thành, TG",
    "gio_le": {
      "ngay_thuong_sang": "Thứ 2,4,6: 04g30",
      "ngay_thuong_chieu": "Thứ 3,5,7: 17g00",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "17g00"
    }
  },
  {
    "ten_giao_xu": "Giồng Cát",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "Ấp Tây, xã Nhị Bình, H. Châu Thành, TG",
    "gio_le": {
      "ngay_thuong_sang": "",
      "ngay_thuong_chieu": "Thứ 7: 17g00",
      "chua_nhat_sang": "08g00",
      "chua_nhat_chieu": ""
    }
  },
  {
    "ten_giao_xu": "Ngũ Hiệp",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "88, Ấp Hoà Hảo, Xã Ngũ Hiệp, H. Cai Lậy, TG",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "05g00, 08g00",
      "chua_nhat_chieu": "15g00"
    }
  },
  {
    "ten_giao_xu": "Long Quới",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "Ấp Long Quới, Xã Ngũ Hiệp, H. Cai Lậy, TG",
    "gio_le": {
      "ngay_thuong_sang": "Thứ 2,4,6: 05g00",
      "ngay_thuong_chieu": "Thứ 3,5,7: 17g15",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "16g00"
    }
  },
  {
    "ten_giao_xu": "Cai Lậy",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "KP 1, P.5, Tx. Cai Lậy, H. Cai Lậy, TG",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "06g00",
      "chua_nhat_chieu": "16g30"
    }
  },
  {
    "ten_giao_xu": "Nhị Quí",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "Ấp Quy Chánh, xã Nhị Quý, H. Cai Lậy, TG",
    "gio_le": {
      "ngay_thuong_sang": "",
      "ngay_thuong_chieu": "Thứ 3,4,5,6: 17g00",
      "chua_nhat_sang": "10g00",
      "chua_nhat_chieu": ""
    }
  },
  {
    "ten_giao_xu": "Bà Tồn",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "Ấp 6, xã Phú An, H. Cai Lậy, TG",
    "gio_le": {
      "ngay_thuong_sang": "Thứ 2,3,4,6,7: 05g00",
      "ngay_thuong_chieu": "Thứ 5: 17g30",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "15g30"
    }
  },
  {
    "ten_giao_xu": "Cái Bè",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "171, Khu 3, TT. Cái Bè, H. Cái Bè, TG",
    "gio_le": {
      "ngay_thuong_sang": "Thứ 3,5,7: 05g00",
      "ngay_thuong_chieu": "Thứ 2,4,6: 17g00",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "17g00"
    }
  },
  {
    "ten_giao_xu": "Cái Thia",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "Tổ 1, ấp Lương Nhơn, xã Mỹ Lương, H.Cái Bè, TG",
    "gio_le": {
      "ngay_thuong_sang": "Thứ 2,4,6: 05g00",
      "ngay_thuong_chieu": "Thứ 3,5,7: 17g00",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "15g00"
    }
  },
  {
    "ten_giao_xu": "Cái Mây",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "Hoà Quí, Hoà Khánh, H. Cái Bè, TG",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "16g00"
    }
  },
  {
    "ten_giao_xu": "Tân Phong",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "Tân Thái, Xã Tân Phong, H. Cai Lậy, TG",
    "gio_le": {
      "ngay_thuong_sang": "04g30",
      "ngay_thuong_chieu": "17g00",
      "chua_nhat_sang": "07g00",
      "chua_nhat_chieu": "17g00"
    }
  },
  {
    "ten_giao_xu": "Mỹ Trung",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "Ấp Mỹ Hiệp, Xã Mỹ Trung, H. Cái Bè, TG",
    "gio_le": {
      "ngay_thuong_sang": "04g30",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "05g30",
      "chua_nhat_chieu": "16g30"
    }
  },
  {
    "ten_giao_xu": "Mỹ Lợi",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "Ấp Lợi Thuận, xã Mỹ Lợi B, H.Cái Bè, TG",
    "gio_le": {
      "ngay_thuong_sang": "",
      "ngay_thuong_chieu": "17g00",
      "chua_nhat_sang": "08g00",
      "chua_nhat_chieu": ""
    }
  },
  {
    "ten_giao_xu": "Kinh Gãy",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "Ấp 4, Thạnh Lộc, H. Cai Lậy, TG",
    "gio_le": {
      "ngay_thuong_sang": "Thứ 2,3,4,6,7: 05g00",
      "ngay_thuong_chieu": "Thứ 5: 17g00",
      "chua_nhat_sang": "05g30",
      "chua_nhat_chieu": "16g30"
    }
  },
  {
    "ten_giao_xu": "Bằng Lăng",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "Ấp Mỹ Chánh 5, Xã Hậu Mỹ Bắc A, H. Cái Bè, TG",
    "gio_le": {
      "ngay_thuong_sang": "04g45",
      "ngay_thuong_chieu": "16g45 (Chiều Thứ 7: 16g30)",
      "chua_nhat_sang": "05g30",
      "chua_nhat_chieu": "16g30"
    }
  },
  {
    "ten_giao_xu": "Tràm Mù",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "Xã Thạnh Mỹ, H. Tân Phước, TG",
    "gio_le": {
      "ngay_thuong_sang": "04g30",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "07g30",
      "chua_nhat_chieu": ""
    }
  },
  {
    "ten_giao_xu": "An Thái Trung",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "Ấp 2, An Thái Trung, H. Cái Bè, TG",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "06g00",
      "chua_nhat_chieu": "16g00"
    }
  },
  {
    "ten_giao_xu": "Hòa Hưng",
    "giao_hat": "HẠT CÁI BÈ",
    "dia_chi": "Ấp Thống, Hòa Hưng, Cái Bè, Tiền Giang.",
    "gio_le": {
      "ngay_thuong_sang": "Thứ 2,4,6: 05g00",
      "ngay_thuong_chieu": "Thứ 3,5,7: 17g10",
      "chua_nhat_sang": "07g15",
      "chua_nhat_chieu": ""
    }
  },
  {
    "ten_giao_xu": "Tân An",
    "giao_hat": "HẠT TÂN AN",
    "dia_chi": "380 Quốc lộ 1A, P.4, Tp. Tân An, Long An",
    "gio_le": {
      "ngay_thuong_sang": "04g30",
      "ngay_thuong_chieu": "Thứ 7: 17:00",
      "chua_nhat_sang": "04g30, 07g00",
      "chua_nhat_chieu": "16g30, 19g00"
    }
  },
  {
    "ten_giao_xu": "Bình Quân",
    "giao_hat": "HẠT TÂN AN",
    "dia_chi": "441 Quốc lộ I A, P.4, Tp. Tân An, Long An",
    "gio_le": {
      "ngay_thuong_sang": "04g30",
      "ngay_thuong_chieu": "Thứ 7: 17g00",
      "chua_nhat_sang": "04g30",
      "chua_nhat_chieu": "17g00"
    }
  },
  {
    "ten_giao_xu": "Tân Đông",
    "giao_hat": "HẠT TÂN AN",
    "dia_chi": "Số 170, Ấp 3, Tân Đông, H. Thạnh Hoá, Long An",
    "gio_le": {
      "ngay_thuong_sang": "04g30",
      "ngay_thuong_chieu": "*",
      "chua_nhat_sang": "06g00",
      "chua_nhat_chieu": "16g00"
    }
  },
  {
    "ten_giao_xu": "Thủ Thừa",
    "giao_hat": "HẠT TÂN AN",
    "dia_chi": "Ấp 11, TT.Thủ Thừa, H. Thủ Thừa, Long An",
    "gio_le": {
      "ngay_thuong_sang": "05g30",
      "ngay_thuong_chieu": "*",
      "chua_nhat_sang": "05g30",
      "chua_nhat_chieu": "16g00"
    }
  },
  {
    "ten_giao_xu": "Sông Xoài",
    "giao_hat": "HẠT TÂN AN",
    "dia_chi": "Ấp Vàm Lớn, Xã Thuận Nghĩa Hoà, H. Thạnh Hoá, Long An",
    "gio_le": {
      "ngay_thuong_sang": "04g30",
      "ngay_thuong_chieu": "Thứ 5,6,7: 15g30",
      "chua_nhat_sang": "07g00",
      "chua_nhat_chieu": "15g30"
    }
  },
  {
    "ten_giao_xu": "Nước Trong",
    "giao_hat": "HẠT TÂN AN",
    "dia_chi": "Xã Thuỷ Đông, H. Thạnh Hoá, Long An",
    "gio_le": {
      "ngay_thuong_sang": "04g30",
      "ngay_thuong_chieu": "*",
      "chua_nhat_sang": "06g00",
      "chua_nhat_chieu": "16g00"
    }
  },
  {
    "ten_giao_xu": "Kiến Bình",
    "giao_hat": "HẠT TÂN AN",
    "dia_chi": "12, Tỉnh lộ 829, KP. 1, TT. Tân Thạnh, H. Tân Thạnh, Long An",
    "gio_le": {
      "ngay_thuong_sang": "Thứ 2,3,4,5,7: 04g30",
      "ngay_thuong_chieu": "Thứ Sáu: 18g00",
      "chua_nhat_sang": "05g30",
      "chua_nhat_chieu": "16g30"
    }
  },
  {
    "ten_giao_xu": "Kinh Cùng",
    "giao_hat": "HẠT TÂN AN",
    "dia_chi": "Xã Tân Lập, H. Tân Thạnh, Long An",
    "gio_le": {
      "ngay_thuong_sang": "04g30",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "16g00"
    }
  },
  {
    "ten_giao_xu": "Bắc Hoà",
    "giao_hat": "HẠT TÂN AN",
    "dia_chi": "Ấp 1, Bắc Hoà, H. Tân Thạnh, Long An",
    "gio_le": {
      "ngay_thuong_sang": "04g30",
      "ngay_thuong_chieu": "16g30",
      "chua_nhat_sang": "04g30",
      "chua_nhat_chieu": "16g30"
    }
  },
  {
    "ten_giao_xu": "Thánh Giuse",
    "giao_hat": "HẠT TÂN AN",
    "dia_chi": "Ấp 5, Nhơn Hoà Lập, H. Tân Thạnh, Long An",
    "gio_le": {
      "ngay_thuong_sang": "04g30",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "04g30",
      "chua_nhat_chieu": "16g00"
    }
  },
  {
    "ten_giao_xu": "Mộc Hoá",
    "giao_hat": "HẠT TÂN AN",
    "dia_chi": "43, Thiên Hộ Dương, P.2, Tx. Kiến Tường, Long An",
    "gio_le": {
      "ngay_thuong_sang": "04g30",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "05g30",
      "chua_nhat_chieu": "15g30"
    }
  },
  {
    "ten_giao_xu": "Thạnh Trị",
    "giao_hat": "HẠT TÂN AN",
    "dia_chi": "Ấp 2, Xã Thạnh Trị, Tx. Kiến Tường, Long An",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "16g30"
    }
  },
  {
    "ten_giao_xu": "Vĩnh Hưng",
    "giao_hat": "HẠT TÂN AN",
    "dia_chi": "115 Nguyễn An Ninh, Khu phố 3, TT. Vĩnh Hưng, Long An",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "07g00",
      "chua_nhat_chieu": "17g00"
    }
  },
  {
    "ten_giao_xu": "Hiệp Hoà",
    "giao_hat": "HẠT ĐỨC HÒA",
    "dia_chi": "83, Khu Vực 5, TT. Hiệp Hoà, H. Đức Hoà, Long An",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "Thứ 7: 16g30",
      "chua_nhat_sang": "05g30, 07g00",
      "chua_nhat_chieu": "16g30"
    }
  },
  {
    "ten_giao_xu": "Văn Hiệp",
    "giao_hat": "HẠT ĐỨC HÒA",
    "dia_chi": "Khu vực 2, TT. Hiệp Hoà, H. Đức Hoà, Long An",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "05g30",
      "chua_nhat_chieu": "16g00"
    }
  },
  {
    "ten_giao_xu": "Rạch Thiên",
    "giao_hat": "HẠT ĐỨC HÒA",
    "dia_chi": "Ấp Hoà Bình 1, Xã Hiệp Hoà, H. Đức Hoà, Long An",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "15g30"
    }
  },
  {
    "ten_giao_xu": "Lập Điền",
    "giao_hat": "HẠT ĐỨC HÒA",
    "dia_chi": "Ấp Lập Điền, Tân Mỹ, H. Đức Hoà, Long An",
    "gio_le": {
      "ngay_thuong_sang": "04g30",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "04g30",
      "chua_nhat_chieu": "16g30"
    }
  },
  {
    "ten_giao_xu": "Giồng Vảy Ốc",
    "giao_hat": "HẠT ĐỨC HÒA",
    "dia_chi": "Ấp Bàu Công, Tân Mỹ, H.Đức Hòa, Long An",
    "gio_le": {
      "ngay_thuong_sang": "",
      "ngay_thuong_chieu": "17g30",
      "chua_nhat_sang": "07g00",
      "chua_nhat_chieu": ""
    }
  },
  {
    "ten_giao_xu": "Nhật Tân",
    "giao_hat": "HẠT ĐỨC HÒA",
    "dia_chi": "Khu B, TT. Hậu Nghĩa, H. Đức Hoà, Long An",
    "gio_le": {
      "ngay_thuong_sang": "Thứ 7: 05g00",
      "ngay_thuong_chieu": "17g30",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "17g30"
    }
  },
  {
    "ten_giao_xu": "Mỹ Hạnh",
    "giao_hat": "HẠT ĐỨC HÒA",
    "dia_chi": "Ấp Mới 1, Xã Mỹ Hạnh Nam, H. Đức Hoà, Long An",
    "gio_le": {
      "ngay_thuong_sang": "Thứ 2,4,6,7: 05g30",
      "ngay_thuong_chieu": "Thứ 3,5: 18g00",
      "chua_nhat_sang": "06g00",
      "chua_nhat_chieu": "18g00"
    }
  },
  {
    "ten_giao_xu": "Đức Hoà",
    "giao_hat": "HẠT ĐỨC HÒA",
    "dia_chi": "Ấp Bình Tả 1, Đức Hoà Hạ, H. Đức Hoà, Long An",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "Thứ 5,7: 17g30; Thứ 6: 16g00",
      "chua_nhat_sang": "05g00, 07g30",
      "chua_nhat_chieu": "17g30"
    }
  },
  {
    "ten_giao_xu": "Lương Hoà Thượng",
    "giao_hat": "HẠT ĐỨC HÒA",
    "dia_chi": "Ấp 4, Lương Bình, H. Bến Lức, Long An",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "Thứ 7: 17g00",
      "chua_nhat_sang": "05g00, 07g00",
      "chua_nhat_chieu": "16g00"
    }
  },
  {
    "ten_giao_xu": "Lương Hoà Hạ",
    "giao_hat": "HẠT ĐỨC HÒA",
    "dia_chi": "Ấp 7, Xã Lương Hoà, H. Bến Lức, Long An",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "Thứ 7: 16g00",
      "chua_nhat_sang": "05g00, 07g00",
      "chua_nhat_chieu": "16g00"
    }
  },
  {
    "ten_giao_xu": "Bến Lức",
    "giao_hat": "HẠT ĐỨC HÒA",
    "dia_chi": "205, Quốc lộ 1A, TT. Bến Lức, H. Bến Lức, Long An",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "Thứ 7: 17g30",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "17g00"
    }
  },
  {
    "ten_giao_xu": "Thủ Đoàn",
    "giao_hat": "HẠT ĐỨC HÒA",
    "dia_chi": "Ấp 1, Bình Đức, H. Bến Lức, Long An",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "16g30"
    }
  },
  {
    "ten_giao_xu": "Gò Đen",
    "giao_hat": "HẠT ĐỨC HÒA",
    "dia_chi": "K. 1, Ấp Chợ, Xã Phước Lợi, H. Bến Lức, Long An",
    "gio_le": {
      "ngay_thuong_sang": "Thứ 2,7: 05g00",
      "ngay_thuong_chieu": "Thứ 3-7: 16g00",
      "chua_nhat_sang": "07g15",
      "chua_nhat_chieu": "16g00"
    }
  },
  {
    "ten_giao_xu": "Long Kim",
    "giao_hat": "HẠT ĐỨC HÒA",
    "dia_chi": "Ấp 4, xã Long Định, H. Cần Đước, Long An",
    "gio_le": {
      "ngay_thuong_sang": "*",
      "ngay_thuong_chieu": "Thứ 7: 18g00",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": ""
    }
  },
  {
    "ten_giao_xu": "Vạn Phước",
    "giao_hat": "HẠT ĐỨC HÒA",
    "dia_chi": "Ấp Mỹ Tây, Mỹ Lệ, H. Cần Đước, Long An",
    "gio_le": {
      "ngay_thuong_sang": "04g30",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "05g30",
      "chua_nhat_chieu": "15g30"
    }
  },
  {
    "ten_giao_xu": "Nha Ràm",
    "giao_hat": "HẠT ĐỨC HÒA",
    "dia_chi": "Ấp 4 B, xã Tân Trạch, H. Cần Đước, Long An",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "05g30",
      "chua_nhat_chieu": "16g00"
    }
  },
  {
    "ten_giao_xu": "Mỹ Điền",
    "giao_hat": "HẠT ĐỨC HÒA",
    "dia_chi": "Ấp Mỹ Điền, Long Hựu Tây, H. Cần Đước, Long An",
    "gio_le": {
      "ngay_thuong_sang": "04g30",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "05g30",
      "chua_nhat_chieu": "16g00"
    }
  },
  {
    "ten_giao_xu": "Mỹ Long",
    "giao_hat": "HẠT CAO LÃNH",
    "dia_chi": "Ấp 2, Xã Mỹ Long, H. Cao Lãnh, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "Thứ 2,3,4,6,7: 05g00",
      "ngay_thuong_chieu": "Thứ 5: 17g00",
      "chua_nhat_sang": "05g30",
      "chua_nhat_chieu": "16g00"
    }
  },
  {
    "ten_giao_xu": "Kiến Văn",
    "giao_hat": "HẠT CAO LÃNH",
    "dia_chi": "Tổ 15, Ấp 1, Xã Bình Hàng Trung, H. Cao Lãnh, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "05g30",
      "chua_nhat_chieu": "16g30"
    }
  },
  {
    "ten_giao_xu": "Mỹ Quý",
    "giao_hat": "HẠT CAO LÃNH",
    "dia_chi": "808/C, Ấp Mỹ Phước 1, Xã Mỹ Quí, H. Tháp Mười, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "16g00"
    }
  },
  {
    "ten_giao_xu": "Tân Hội Trung",
    "giao_hat": "HẠT CAO LÃNH",
    "dia_chi": "Ấp 2, Xã Tân Hội Trung, H. Cao Lãnh, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "Thứ 2,4,6,7: 04g45; Thứ 3: 05g30",
      "ngay_thuong_chieu": "Thứ 5: 16g45",
      "chua_nhat_sang": "04g45",
      "chua_nhat_chieu": "16g15"
    }
  },
  {
    "ten_giao_xu": "Mỹ An",
    "giao_hat": "HẠT CAO LÃNH",
    "dia_chi": "Khóm 4, TT. Mỹ An, H. Tháp Mười, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "06g00",
      "chua_nhat_chieu": "16g00"
    }
  },
  {
    "ten_giao_xu": "Cao Lãnh",
    "giao_hat": "HẠT CAO LÃNH",
    "dia_chi": "10, Đường 30/4, Tp. Cao Lãnh, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "04g30",
      "ngay_thuong_chieu": "16g45",
      "chua_nhat_sang": "04g30",
      "chua_nhat_chieu": "16g15"
    }
  },
  {
    "ten_giao_xu": "Tân Thuận Đông",
    "giao_hat": "HẠT CAO LÃNH",
    "dia_chi": "Xã Hoà An, Tp. Cao Lãnh, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "07g30",
      "chua_nhat_chieu": ""
    }
  },
  {
    "ten_giao_xu": "Tân An",
    "giao_hat": "HẠT CAO LÃNH",
    "dia_chi": "Phường 11, Tp. Cao Lãnh, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "Thứ 2,3,4,6,7: 05g00",
      "ngay_thuong_chieu": "Thứ 5: 17g00",
      "chua_nhat_sang": "05g30",
      "chua_nhat_chieu": "17g00"
    }
  },
  {
    "ten_giao_xu": "Phong Mỹ",
    "giao_hat": "HẠT CAO LÃNH",
    "dia_chi": "Xã Phong Mỹ, H. Cao Lãnh, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "Thứ 2,3,4,6,7: 05g00",
      "ngay_thuong_chieu": "Thứ 5: 17g00",
      "chua_nhat_sang": "04g30",
      "chua_nhat_chieu": "16g00"
    }
  },
  {
    "ten_giao_xu": "Thánh Tâm",
    "giao_hat": "HẠT CAO LÃNH",
    "dia_chi": "Ấp Cà Dâm, Xã Tân Công Sính, H. Tam Nông, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "17g00"
    }
  },
  {
    "ten_giao_xu": "Hoà Bình",
    "giao_hat": "HẠT CAO LÃNH",
    "dia_chi": "Ấp 4, Xã Hòa Bình, H. Tam Nông, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "Thứ 2,3,4,6,7: 04g30",
      "ngay_thuong_chieu": "Thứ 5: 17g15",
      "chua_nhat_sang": "04g30",
      "chua_nhat_chieu": "16g45"
    }
  },
  {
    "ten_giao_xu": "An Bình",
    "giao_hat": "HẠT CAO LÃNH",
    "dia_chi": "Ấp An Lạc, Xã An Bình, H. Cao Lãnh, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "04g00",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "04g00",
      "chua_nhat_chieu": "16g00"
    }
  },
  {
    "ten_giao_xu": "Nhị Mỹ",
    "giao_hat": "HẠT CAO LÃNH",
    "dia_chi": "Ấp Hòa Dân, Xã Nhị Mỹ, H. Cao Lãnh, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "17g00",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "08g00"
    }
  },
  {
    "ten_giao_xu": "An Long",
    "giao_hat": "HẠT CAO LÃNH",
    "dia_chi": "Nhà thờ An Long, Xã An Long, H. Tam Nông, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "17g00, Thứ 7: 17g30",
      "chua_nhat_sang": "05g00, 07g30",
      "chua_nhat_chieu": "17g30"
    }
  },
  {
    "ten_giao_xu": "Cả Nổ",
    "giao_hat": "HẠT CAO LÃNH",
    "dia_chi": "Xã Phú Thành B, H. Tam Nông, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "08g30",
      "chua_nhat_chieu": ""
    }
  },
  {
    "ten_giao_xu": "Phú Thành A",
    "giao_hat": "HẠT CAO LÃNH",
    "dia_chi": "Xã Phú Thành A, H. Tam Nông, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "",
      "ngay_thuong_chieu": "Thứ 7: 16g30",
      "chua_nhat_sang": "",
      "chua_nhat_chieu": "16g30"
    }
  },
  {
    "ten_giao_xu": "Tân Quới",
    "giao_hat": "HẠT CÙ LAO TÂY",
    "dia_chi": "Xã Tân Quới, H. Thanh Bình, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "17g30",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "17g30"
    }
  },
  {
    "ten_giao_xu": "Fatima",
    "giao_hat": "HẠT CÙ LAO TÂY",
    "dia_chi": "Ấp Trung, Xã Tân Quới, H. Thanh Bình, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "17g00",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "17g00"
    }
  },
  {
    "ten_giao_xu": "Bến Siêu",
    "giao_hat": "HẠT CÙ LAO TÂY",
    "dia_chi": "Ấp Tân Phong, Xã Tân Huề, H. Thanh Bình, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "04g00",
      "ngay_thuong_chieu": "16g30",
      "chua_nhat_sang": "04g00",
      "chua_nhat_chieu": "16g30"
    }
  },
  {
    "ten_giao_xu": "Tân Long",
    "giao_hat": "HẠT CÙ LAO TÂY",
    "dia_chi": "Ấp Tân Phú A, Xã Tân Bình, H. Thanh Bình, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "04g30",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "16g00"
    }
  },
  {
    "ten_giao_xu": "Bến Dinh",
    "giao_hat": "HẠT CÙ LAO TÂY",
    "dia_chi": "Ấp Tân Dinh, Xã Tân Hoà, H. Thanh Bình, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "17g30",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "17g00"
    }
  },
  {
    "ten_giao_xu": "Thánh Anrê",
    "giao_hat": "HẠT CÙ LAO TÂY",
    "dia_chi": "Ấp Tân Thới, Xã Tân Hoà, H. Thanh Bình, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "04g30",
      "ngay_thuong_chieu": "17g30, Thứ 7: 16g30",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "16g00"
    }
  },
  {
    "ten_giao_xu": "Trà Đư",
    "giao_hat": "HẠT CÙ LAO TÂY",
    "dia_chi": "Khóm Trà Đư, F. An Lạc, TX. Hồng Ngự, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "16g30"
    }
  },
  {
    "ten_giao_xu": "Thường Phước",
    "giao_hat": "HẠT CÙ LAO TÂY",
    "dia_chi": "Ấp 2, Xã Thường Phước 1, H. Hồng Ngự, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "04g00",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "04g00",
      "chua_nhat_chieu": "09g00"
    }
  },
  {
    "ten_giao_xu": "Bãi Chàm",
    "giao_hat": "HẠT CÙ LAO TÂY",
    "dia_chi": "Ấp An Hoà, Xã An Bình A, TX. Hồng Ngự, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "04g30",
      "ngay_thuong_chieu": "17g00",
      "chua_nhat_sang": "04g30",
      "chua_nhat_chieu": "16g15"
    }
  },
  {
    "ten_giao_xu": "Tân Hồng",
    "giao_hat": "HẠT CÙ LAO TÂY",
    "dia_chi": "324 Nguyễn Huệ, TT. Sarài, H. Tân Hồng, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "05g00",
      "ngay_thuong_chieu": "17g30",
      "chua_nhat_sang": "05g00",
      "chua_nhat_chieu": "15g00"
    }
  },
  {
    "ten_giao_xu": "Gò Da",
    "giao_hat": "HẠT CÙ LAO TÂY",
    "dia_chi": "Ấp Gò Da, xã Thạnh Phú, H. Tân Hồng, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "Thứ 2,3,4,6,7: 04g30",
      "ngay_thuong_chieu": "Thứ 5: 17g00",
      "chua_nhat_sang": "04g30",
      "chua_nhat_chieu": "17g00"
    }
  },
  {
    "ten_giao_xu": "Lòng Thương Xót",
    "giao_hat": "HẠT CÙ LAO TÂY",
    "dia_chi": "Ấp Chiến Thắng, xã Tân Hộ Cơ, H. Tân Hồng, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "Thứ 2-6: 05g00",
      "ngay_thuong_chieu": "Thứ 7: 16g00",
      "chua_nhat_sang": "08g00",
      "chua_nhat_chieu": ""
    }
  },
  {
    "ten_giao_xu": "Thánh Mẫu",
    "giao_hat": "HẠT CÙ LAO TÂY",
    "dia_chi": "Ấp Lộc An, xã An Phước, H. Tân Hồng, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "",
      "ngay_thuong_chieu": "Thứ 4,5: 16g30",
      "chua_nhat_sang": "08g00",
      "chua_nhat_chieu": ""
    }
  },
  {
    "ten_giao_xu": "Tân Phước",
    "giao_hat": "HẠT CÙ LAO TÂY",
    "dia_chi": "Ấp Tân Bảnh, xã Tân Phước, H. Tân Hồng, Đồng Tháp",
    "gio_le": {
      "ngay_thuong_sang": "",
      "ngay_thuong_chieu": "",
      "chua_nhat_sang": "08g00",
      "chua_nhat_chieu": ""
    }
  }
];

function cleanDeanery(raw) {
  let d = raw.trim();
  if (d.startsWith('HẠT ')) d = d.substring(4).trim();
  
  return d
    .toLowerCase()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function cleanParishName(raw) {
  if (!raw) return '';
  let s = raw.trim();
  if (s.startsWith('Giáo xứ ') || s.startsWith('Giáo họ ') || s.startsWith('Nhà thờ ')) {
    return s;
  }
  return `Giáo xứ ${s}`;
}

function cleanAddress(raw) {
  if (!raw) return '';
  let s = raw.trim();
  // Normalize TG to Tiền Giang
  s = s.replace(/,\s*TG\.?$/i, ', Tiền Giang');
  s = s.replace(/,\s*TG\b/i, ', Tiền Giang');
  s = s.replace(/\bTp\.\s*/gi, 'TP. ');
  s = s.replace(/\bTx\.\s*/gi, 'TX. ');
  s = s.replace(/\bTt\.\s*/gi, 'TT. ');
  return s;
}

function detectProvince(address) {
  if (/Long An/i.test(address)) return 'Long An';
  if (/Đồng Tháp/i.test(address)) return 'Đồng Tháp';
  return 'Tiền Giang';
}

function parseTimeStr(str) {
  if (!str) return [];
  const times = [];
  const regex = /([0-2]?\d)[:.gh]([0-5]\d)/g;
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
    if (p.includes('T7') || p.includes('Thứ 7') || p.includes('thứ bẩy') || p.includes('Thứ bẩy')) {
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
    if (p.includes('(T7)') || p.includes('Thứ 7:') || p.includes('Chiều Thứ 7:') || p.includes('thứ bẩy')) {
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

for (const item of rawData) {
  const deanery = cleanDeanery(item.giao_hat);
  const parish = cleanParishName(item.ten_giao_xu);
  const address = cleanAddress(item.dia_chi);
  const province = detectProvince(address);

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
    if (!p.includes('thứ bẩy') && !p.includes('T7') && !p.includes('Thứ 7')) {
      sunChieu.push(...parseTimeStr(p));
    }
  }
  const sundayMass = [...new Set([...sunSang, ...sunChieu])].sort();

  let baseId = `mt-${slugify(deanery)}-${slugify(item.ten_giao_xu)}`;
  let id = baseId;
  let count = 1;
  while (seenIds.has(id)) {
    id = `${baseId}-${count++}`;
  }
  seenIds.add(id);

  newRows.push({
    id,
    parish,
    diocese: 'Mỹ Tho',
    deanery,
    province,
    address,
    weekdayMass,
    saturdayMass: saturdayMass.length > 0 ? saturdayMass : undefined,
    sundayMass,
    source: 'GP Mỹ Tho'
  });
}

console.log(`Generated ${newRows.length} parish records for Mỹ Tho.`);

const write = process.argv.includes('--write');

if (!write) {
  console.log('\n--- SAMPLE 10 RECORDS ---');
  console.log(JSON.stringify(newRows.slice(0, 10), null, 2));
  console.log('\n(Chạy với cờ --write để thực thi xoá và ghi vào Firestore + giole.json)');
  process.exit(0);
}

// 1. Update public/giole.json: Remove all old Mỹ Tho records, add newRows
const giolePath = new URL('../public/giole.json', import.meta.url);
const currentGiole = JSON.parse(readFileSync(giolePath, 'utf8'));
const filteredGiole = currentGiole.filter(r => r.diocese !== 'Mỹ Tho');
const updatedGiole = [...filteredGiole, ...newRows];
writeFileSync(giolePath, JSON.stringify(updatedGiole, null, 2), 'utf8');
console.log(`Đã cập nhật public/giole.json: ${currentGiole.length} -> ${updatedGiole.length} nhà thờ.`);

// 2. Connect to Firestore
const db = getFirestore(initializeApp(cfg));
const massCol = collection(db, 'massTimes');

// Find all existing Mỹ Tho docs in Firestore
console.log('Đang tìm tất cả document Giáo phận Mỹ Tho trong Firestore...');
const snap = await getDocs(query(massCol, where('diocese', '==', 'Mỹ Tho')));
console.log(`Tìm thấy ${snap.size} document Mỹ Tho cũ trong Firestore.`);

// Batch delete old Mỹ Tho docs
for (let i = 0; i < snap.docs.length; i += 400) {
  const batch = writeBatch(db);
  snap.docs.slice(i, i + 400).forEach(d => batch.delete(d.ref));
  await batch.commit();
  console.log(`  Đã xoá ${Math.min(i + 400, snap.docs.length)}/${snap.docs.length}`);
}

// Batch write new Mỹ Tho docs
console.log('Đang ghi document Mỹ Tho mới vào Firestore...');
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
