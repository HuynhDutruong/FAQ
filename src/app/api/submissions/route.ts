import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, isAnonymous, fullName, email, phone, content } = body;

    // Validate type
    if (type !== 'question' && type !== 'feedback') {
      return NextResponse.json({ error: 'Loại yêu cầu không hợp lệ' }, { status: 400 });
    }

    // Validate content length
    if (!content || typeof content !== 'string' || content.trim().length < 30 || content.trim().length > 500) {
      return NextResponse.json({ error: 'Nội dung phải từ 30 đến 500 ký tự' }, { status: 400 });
    }

    // Validate required fields when not anonymous
    if (!isAnonymous && (!fullName || typeof fullName !== 'string' || !fullName.trim())) {
      return NextResponse.json({ error: 'Vui lòng nhập họ và tên' }, { status: 400 });
    }

    // For questions, phone is required
    if (type === 'question' && (!phone || typeof phone !== 'string' || !phone.trim())) {
      return NextResponse.json({ error: 'Vui lòng nhập số điện thoại để nhận giải đáp' }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, 'submissions'), {
      type,
      isAnonymous: Boolean(isAnonymous),
      fullName: isAnonymous ? '' : fullName.trim(),
      email: email ? String(email).trim() : '',
      phone: phone ? String(phone).trim() : '',
      content: content.trim(),
      status: 'new',
      createdAt: serverTimestamp(),
      deletedAt: null
    });

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: type === 'question' ? 'Câu hỏi đã được ghi nhận' : 'Góp ý đã được ghi nhận'
    });
  } catch (error: any) {
    console.error('Error processing submission:', error);
    return NextResponse.json({ error: error?.message || 'Lỗi xử lý yêu cầu' }, { status: 500 });
  }
}
