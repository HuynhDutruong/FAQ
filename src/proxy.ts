import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['vi', 'en', 'zh', 'fr', 'es', 'ja', 'ko', 'ru', 'de', 'pt', 'it', 'ar', 'hi'];

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Bỏ qua các file tĩnh, api, hình ảnh
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Tìm xem pathname có bắt đầu bằng locale nào không (ví dụ: /en, /en/gio-le)
  const pathnameHasLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Nếu có locale (VD: /en), rewrite url về bản gốc kèm tham số ?lang=en
    const newUrl = request.nextUrl.clone();
    
    // Bỏ phần locale ra khỏi pathname (ví dụ: /en/gio-le -> /gio-le)
    let newPathname = pathname.replace(`/${pathnameHasLocale}`, '');
    if (newPathname === '') {
      newPathname = '/';
    }
    
    newUrl.pathname = newPathname;
    newUrl.searchParams.set('lang', pathnameHasLocale);
    
    return NextResponse.rewrite(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|logo\\.jpg|.*\\.png|.*\\.jpg).*)']
};
