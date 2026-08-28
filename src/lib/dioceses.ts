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

/** Toạ độ trung tâm của 27 Giáo phận để định vị GPS thông minh */
export const DIOCESE_COORDINATES: Record<string, { lat: number; lng: number }> = {
  'Hà Nội': { lat: 21.0285, lng: 105.8542 },
  'Bắc Ninh': { lat: 21.1861, lng: 106.0763 },
  'Bùi Chu': { lat: 20.3090, lng: 106.2990 },
  'Hà Tĩnh': { lat: 18.3559, lng: 105.8877 },
  'Hải Phòng': { lat: 20.8449, lng: 106.6881 },
  'Hưng Hóa': { lat: 21.3228, lng: 105.4019 },
  'Lạng Sơn - Cao Bằng': { lat: 21.8537, lng: 106.7624 },
  'Phát Diệm': { lat: 20.0917, lng: 106.0805 },
  'Thái Bình': { lat: 20.4463, lng: 106.3400 },
  'Thanh Hóa': { lat: 19.8067, lng: 105.7852 },
  'Vinh': { lat: 18.6796, lng: 105.6813 },
  'Huế': { lat: 16.4637, lng: 107.5909 },
  'Ban Mê Thuột': { lat: 12.6675, lng: 108.0383 },
  'Đà Nẵng': { lat: 16.0678, lng: 108.2208 },
  'Kon Tum': { lat: 14.3541, lng: 108.0076 },
  'Nha Trang': { lat: 12.2388, lng: 109.1967 },
  'Quy Nhơn': { lat: 13.7820, lng: 109.2197 },
  'Sài Gòn': { lat: 10.7798, lng: 106.6990 },
  'Bà Rịa': { lat: 10.4966, lng: 107.1724 },
  'Cần Thơ': { lat: 10.0452, lng: 105.7469 },
  'Đà Lạt': { lat: 11.9404, lng: 108.4583 },
  'Long Xuyên': { lat: 10.3759, lng: 105.4358 },
  'Mỹ Tho': { lat: 10.3615, lng: 106.3624 },
  'Phan Thiết': { lat: 10.9804, lng: 108.2615 },
  'Phú Cường': { lat: 10.9805, lng: 106.6517 },
  'Vĩnh Long': { lat: 10.2537, lng: 105.9722 },
  'Xuân Lộc': { lat: 10.9574, lng: 107.2429 }
};

/** Công thức Haversine tính khoảng cách giữa 2 toạ độ GPS (km) */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Bán kính Trái Đất (km)
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/** Tự động xác định Giáo phận gần nhất dựa trên toạ độ GPS của thiết bị */
export function getNearestDiocese(userLat: number, userLng: number): { diocese: string; distanceKm: number } {
  let minDistance = Infinity;
  let nearest = 'Mỹ Tho';
  for (const [name, coord] of Object.entries(DIOCESE_COORDINATES)) {
    const dist = calculateDistance(userLat, userLng, coord.lat, coord.lng);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = name;
    }
  }
  return { diocese: nearest, distanceKm: minDistance };
}
