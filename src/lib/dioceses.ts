/**
 * 27 giáo phận Công giáo Việt Nam, xếp theo 3 giáo tỉnh.
 * Dùng làm danh sách chuẩn cho ô chọn Giáo phận trong trang admin, để mọi bản ghi
 * dùng đúng một cách viết tên (nguồn ngoài viết lung tung: "Giáo Phận Bà Rịa",
 * "Buôn Ma Thuột", "Qui Nhơn"...).
 */
export const ECCLESIASTICAL_PROVINCES = [
  {
    name: 'Giáo tỉnh Hà Nội',
    dioceses: [
      'Hà Nội', 'Bắc Ninh', 'Bùi Chu', 'Hà Tĩnh', 'Hải Phòng', 'Hưng Hóa',
      'Lạng Sơn - Cao Bằng', 'Phát Diệm', 'Thái Bình', 'Thanh Hóa', 'Vinh',
    ],
  },
  {
    name: 'Giáo tỉnh Huế',
    dioceses: ['Huế', 'Ban Mê Thuột', 'Đà Nẵng', 'Kon Tum', 'Nha Trang', 'Quy Nhơn'],
  },
  {
    name: 'Giáo tỉnh Sài Gòn',
    dioceses: [
      'Sài Gòn', 'Bà Rịa', 'Cần Thơ', 'Đà Lạt', 'Long Xuyên', 'Mỹ Tho',
      'Phan Thiết', 'Phú Cường', 'Vĩnh Long', 'Xuân Lộc',
    ],
  },
] as const;

export const ALL_DIOCESES: string[] = ECCLESIASTICAL_PROVINCES.flatMap(p => [...p.dioceses]);

/** Ba giáo phận là Tổng giáo phận (đứng đầu giáo tỉnh). */
export const ARCHDIOCESES = ['Hà Nội', 'Huế', 'Sài Gòn'];

export const dioceseLabel = (name: string) =>
  ARCHDIOCESES.includes(name) ? `Tổng giáo phận ${name}` : `Giáo phận ${name}`;
