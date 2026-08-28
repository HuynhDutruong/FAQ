import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMassTimeById } from '@/lib/massTimes';
import { dioceseLabel } from '@/lib/dioceses';
import ChurchDetailView from '@/components/ChurchDetailView';

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
  const description = `⏰ Chúa Nhật: ${sundayStr} | Ngày thường: ${weekdayStr}. 📍 Địa chỉ: ${item.address || 'Đang cập nhật'}. Tra cứu giờ lễ và chỉ đường GPS chính xác.`;

  return {
    title,
    description,
    openGraph: {
      title: `⛪ Giờ Lễ ${item.parish} - GP ${dioceseName}`,
      description,
      url: `/gio-le/${id}`,
      siteName: 'Tra Cứu Giờ Lễ Toàn Quốc - Xứ Đoàn Các Thánh Tử Đạo Việt Nam',
      images: [
        {
          url: '/logo.jpg',
          width: 600,
          height: 600,
          alt: `Logo Xứ Đoàn - Giờ Lễ ${item.parish}`
        }
      ],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `⛪ Giờ Lễ ${item.parish} - GP ${dioceseName}`,
      description,
      images: ['/logo.jpg']
    }
  };
}

export default async function ChurchDetailPage({ params }: Props) {
  const { id } = await params;
  const item = await getMassTimeById(id);

  if (!item) {
    notFound();
  }

  return <ChurchDetailView item={item} />;
}
