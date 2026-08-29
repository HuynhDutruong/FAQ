import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMassTimeById } from '@/lib/massTimes';
import { dioceseLabel } from '@/lib/dioceses';
import ChurchDetailView from '@/components/ChurchDetailView';

const BASE_URL = 'https://chanhtoa.tnttgiaophanmytho.online';

/** "05:30" -> mục openingHoursSpecification kéo dài 1 giờ cho một thánh lễ. */
function massSlots(days: string[], times: string[] = []) {
  return times
    .filter((t) => /^\d{1,2}:\d{2}$/.test(t.trim()))
    .map((t) => {
      const [h, m] = t.trim().split(':').map(Number);
      const opens = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      const closes = `${String((h + 1) % 24).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      return { '@type': 'OpeningHoursSpecification', dayOfWeek: days, opens, closes };
    });
}

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await getMassTimeById(id);

  if (!item) {
    return {
      title: 'Không Tìm Thấy Giáo Xứ | Tra Cứu Giờ Lễ Toàn Quốc',
      description: 'Không tìm thấy thông tin giáo xứ này trong hệ thống tra cứu giờ lễ.'
    };
  }

  const dioceseName = item.diocese ? dioceseLabel(item.diocese) : 'Việt Nam';
  const sundayStr = item.sundayMass && item.sundayMass.length > 0 ? item.sundayMass.join(', ') : 'Đang cập nhật';
  const weekdayStr = item.weekdayMass && item.weekdayMass.length > 0 ? item.weekdayMass.join(', ') : 'Đang cập nhật';

  const title = `Giờ Lễ ${item.parish} - Giáo phận ${dioceseName} | Tra Cứu Giờ Lễ Toàn Quốc`;
  const description = `Chúa Nhật: ${sundayStr} | Ngày thường: ${weekdayStr}. Địa chỉ: ${item.address || 'Đang cập nhật'}. Tra cứu giờ lễ và chỉ đường GPS chính xác.`;

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/gio-le/${id}` },
    openGraph: {
      title: `Giờ Lễ ${item.parish} - GP ${dioceseName}`,
      description,
      url: `${BASE_URL}/gio-le/${id}`,
      siteName: 'Tra Cứu Giờ Lễ Toàn Quốc - Xứ Đoàn Các Thánh Tử Đạo Việt Nam',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `Giờ Lễ ${item.parish} - GP ${dioceseName}`,
      description
    }
  };
}

export default async function ChurchDetailPage({ params }: Props) {
  const { id } = await params;
  const item = await getMassTimeById(id);

  if (!item) {
    notFound();
  }

  const dioceseName = item.diocese ? dioceseLabel(item.diocese) : 'Việt Nam';

  // CatholicChurch + giờ lễ dạng openingHoursSpecification: đây là tín hiệu
  // Google dùng để xếp hạng truy vấn "giờ lễ <tên nhà thờ>" và hiển thị trên Maps.
  const churchLd = {
    '@context': 'https://schema.org',
    '@type': 'CatholicChurch',
    '@id': `${BASE_URL}/gio-le/${id}#church`,
    name: item.parish,
    url: `${BASE_URL}/gio-le/${id}`,
    ...(item.address
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: item.address,
            addressRegion: item.province || undefined,
            addressCountry: 'VN'
          }
        }
      : {}),
    ...(typeof item.lat === 'number' && typeof item.lng === 'number'
      ? { geo: { '@type': 'GeoCoordinates', latitude: item.lat, longitude: item.lng } }
      : {}),
    containedInPlace: { '@type': 'AdministrativeArea', name: `Giáo phận ${dioceseName}` },
    isPartOf: { '@id': `${BASE_URL}/#website` },
    openingHoursSpecification: [
      ...massSlots(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], item.weekdayMass),
      ...massSlots(['Saturday'], item.saturdayMass),
      ...massSlots(['Sunday'], item.sundayMass)
    ]
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Tra cứu giờ lễ', item: `${BASE_URL}/gio-le` },
      { '@type': 'ListItem', position: 3, name: item.parish, item: `${BASE_URL}/gio-le/${id}` }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(churchLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ChurchDetailView item={item} />
    </>
  );
}
