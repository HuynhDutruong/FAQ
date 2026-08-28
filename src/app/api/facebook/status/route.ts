import { NextResponse } from 'next/server';
import { getFacebookCredentials, listFacebookPages } from '@/lib/facebookHelper';
import { withAdmin } from '@/lib/serverAuth';

export const GET = withAdmin(async () => {
  let creds;
  try {
    creds = await getFacebookCredentials();
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Chưa kết nối';
    return NextResponse.json({ connected: false, message: msg });
  }

  // Gọi thật lên Graph API để biết Token còn sống hay đã hết hạn
  const check = await fetch(
    `https://graph.facebook.com/v20.0/${creds.pageId}?fields=id,name&access_token=${creds.pageToken}`
  );
  const checkData = await check.json();
  if (checkData.error) {
    return NextResponse.json({
      connected: false,
      message: `Token Facebook không còn hiệu lực: ${checkData.error.message}. Vui lòng dán Token mới.`
    });
  }

  // Nếu có App ID/Secret thì xem thêm hạn dùng của Token
  let expiresAt: number | null = null;
  const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
  const appSecret = process.env.FACEBOOK_APP_SECRET;
  if (appId && appSecret) {
    try {
      const dbg = await fetch(
        `https://graph.facebook.com/v20.0/debug_token?input_token=${creds.pageToken}&access_token=${appId}|${appSecret}`
      );
      const dbgData = await dbg.json();
      if (dbgData.data && typeof dbgData.data.expires_at === 'number') {
        expiresAt = dbgData.data.expires_at;
      }
    } catch {
      // ponytail: hạn dùng chỉ để hiển thị, lỗi ở đây không ảnh hưởng kết nối
    }
  }

  return NextResponse.json({
    connected: true,
    pageId: creds.pageId,
    pageName: checkData.name || creds.pageName,
    source: creds.source,
    pages: await listFacebookPages(),
    // expires_at = 0 nghĩa là Token vĩnh viễn
    expiresAt,
    neverExpires: expiresAt === 0,
    expiringSoon: !!expiresAt && expiresAt * 1000 - Date.now() < 7 * 24 * 3600 * 1000
  });
});
