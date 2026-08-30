/**
 * Tiện ích chuỗi thuần tuý, KHÔNG phụ thuộc Firebase.
 *
 * Trước đây hàm này nằm trong massTimes.ts — file có import firebase/firestore.
 * Mọi nơi dùng removeAccents (OmniSearch ở header mọi trang, các trang tra cứu)
 * đều vô tình kéo theo cả chunk Firebase ~555KB.
 */
export const removeAccents = (str: string) =>
  str.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/đ/g, 'd');
