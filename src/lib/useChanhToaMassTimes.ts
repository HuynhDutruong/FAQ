'use client';

import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { DEFAULT_CHANH_TOA_INFO, MassTime } from './massTimes';

/**
 * Giờ lễ & địa chỉ Nhà thờ Chánh Tòa, tự cập nhật ngay khi Admin sửa trong
 * mục Giờ Lễ — không cần build lại trang.
 *
 * Trả về DEFAULT_CHANH_TOA_INFO khi chưa kịp tải hoặc Firestore lỗi, nên bản
 * HTML tĩnh vẫn hiện giờ lễ đúng cho Google và cho người dùng mất mạng.
 *
 * Nhiều nơi cùng gọi hook này vẫn chỉ tốn một lượt đọc: Firestore gộp chung
 * các listener trỏ tới cùng một document.
 */
export function useChanhToaMassTimes(): MassTime {
  const [info, setInfo] = useState<MassTime>(DEFAULT_CHANH_TOA_INFO);

  useEffect(() => {
    try {
      return onSnapshot(
        doc(db, 'massTimes', 'mt-my-tho-chanh-toa'),
        (snap) => {
          if (snap.exists()) setInfo({ ...(snap.data() as Omit<MassTime, 'id'>), id: snap.id });
        },
        (err) => console.warn('Không nhận được giờ lễ Chánh Tòa:', err)
      );
    } catch (e) {
      console.warn('Không đăng ký được listener giờ lễ Chánh Tòa:', e);
    }
  }, []);

  return info;
}
