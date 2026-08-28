import { NextResponse } from 'next/server';
import { getFacebookCredentials } from '@/lib/facebookHelper';

export async function GET() {
  try {
    const creds = await getFacebookCredentials();
    return NextResponse.json({
      connected: true,
      pageId: creds.pageId,
      pageName: creds.pageName,
      source: creds.source
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Chưa kết nối';
    return NextResponse.json({
      connected: false,
      message: msg
    });
  }
}
