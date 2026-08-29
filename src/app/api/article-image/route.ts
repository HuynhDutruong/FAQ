import { NextRequest, NextResponse } from 'next/server';
import { fetchPostDetail } from '@/lib/fetchPostDetail';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return serveFallbackLogo();
  }

  try {
    const post = await fetchPostDetail(id);
    const targetUrl = post?.images?.[0];

    if (targetUrl) {
      // Fetch image từ Facebook CDN
      const imgRes = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        },
        next: { revalidate: 86400 }
      });

      if (imgRes.ok) {
        const contentType = imgRes.headers.get('content-type') || 'image/jpeg';
        const buffer = await imgRes.arrayBuffer();

        return new NextResponse(buffer, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400'
          }
        });
      }
    }
  } catch (err) {
    console.error('Error proxying article image for id:', id, err);
  }

  return serveFallbackLogo();
}

function serveFallbackLogo() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'logo.jpg');
    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath);
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=604800, s-maxage=604800'
        }
      });
    }
  } catch (e) {
    console.warn('Fallback logo read error:', e);
  }

  return NextResponse.redirect('https://chanhtoa.tnttgiaophanmytho.online/logo.jpg');
}
