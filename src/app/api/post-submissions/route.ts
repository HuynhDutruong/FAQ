import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  getDoc
} from 'firebase/firestore';
import { withAdmin } from '@/lib/serverAuth';

export const dynamic = 'force-dynamic';

const SUBMISSIONS_COLLECTION = 'postSubmissions';

// 1. PUBLIC: Gửi bài viết đóng góp từ cộng đoàn
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      authorName,
      authorContact,
      authorRole,
      title,
      category,
      content,
      mediaUrls,
      source
    } = body;

    if (!authorName?.trim() || !title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ Họ tên, Tiêu đề và Nội dung bài viết.' },
        { status: 400 }
      );
    }

    const newSubmission = {
      authorName: authorName.trim(),
      authorContact: (authorContact || '').trim(),
      authorRole: (authorRole || 'Giáo dân / Đoàn sinh').trim(),
      title: title.trim(),
      category: (category || 'Sinh hoạt Giáo xứ').trim(),
      content: content.trim(),
      mediaUrls: Array.isArray(mediaUrls) ? mediaUrls.filter(Boolean) : [],
      source: (source || '').trim(),
      status: 'pending', // 'pending' | 'approved' | 'rejected'
      createdAt: serverTimestamp(),
      createdTimeStr: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, SUBMISSIONS_COLLECTION), newSubmission);

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: 'Bài viết của bạn đã được gửi tới Ban Biên Tập. Chúng tôi sẽ duyệt trong thời gian sớm nhất!'
    });
  } catch (error: any) {
    console.error('Error creating post submission:', error);
    return NextResponse.json(
      { error: error?.message || 'Không thể gửi bài viết. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

// 2. ADMIN: Xem danh sách bài viết đóng góp
export const GET = withAdmin(async (request: Request) => {
  try {
    const q = query(collection(db, SUBMISSIONS_COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    const submissions = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdTimeStr || new Date().toISOString()
      };
    });

    return NextResponse.json({ success: true, submissions });
  } catch (error: any) {
    console.error('Error fetching post submissions:', error);
    return NextResponse.json(
      { error: error?.message || 'Lỗi khi tải danh sách bài viết đóng góp' },
      { status: 500 }
    );
  }
});

// 3. ADMIN: Cập nhật / Phê duyệt / Từ chối bài viết (CRUD)
export const PATCH = withAdmin(async (request: Request) => {
  try {
    const body = await request.json();
    const { id, title, content, category, mediaUrls, source, status, rejectionReason, publishToFacebook } = body;

    if (!id) {
      return NextResponse.json({ error: 'Thiếu ID bài viết' }, { status: 400 });
    }

    const docRef = doc(db, SUBMISSIONS_COLLECTION, id);
    const existingSnap = await getDoc(docRef);
    if (!existingSnap.exists()) {
      return NextResponse.json({ error: 'Không tìm thấy bài viết' }, { status: 404 });
    }

    const updateData: Record<string, any> = {
      updatedAt: serverTimestamp()
    };

    if (title !== undefined) updateData.title = title.trim();
    if (content !== undefined) updateData.content = content.trim();
    if (category !== undefined) updateData.category = category.trim();
    if (mediaUrls !== undefined) updateData.mediaUrls = mediaUrls;
    if (source !== undefined) updateData.source = source.trim();
    if (status !== undefined) updateData.status = status;
    if (rejectionReason !== undefined) updateData.rejectionReason = rejectionReason;

    let publishedPostId: string | null = null;

    // Nếu duyệt và muốn đăng ngay lên Fanpage Facebook
    if (status === 'approved' && publishToFacebook) {
      const finalTitle = title || existingSnap.data()?.title || '';
      const finalContent = content || existingSnap.data()?.content || '';
      const finalSource = source || existingSnap.data()?.source || '';
      const finalAuthor = existingSnap.data()?.authorName || '';

      const fullMessage = `${finalTitle.toUpperCase()}\n\n${finalContent}\n\n---\n Nguồn / Tác giả: ${finalAuthor}${finalSource ? ` (${finalSource})` : ''}\n#TNTT #ChanhToaMyTho #GiaoXuChanhToa #GiaoPhanMyTho`;

      const firstMedia = (mediaUrls || existingSnap.data()?.mediaUrls || [])[0];
      const isPhoto = firstMedia && /\.(jpeg|jpg|png|webp|gif)/i.test(firstMedia);
      const isVideo = firstMedia && /\.(mp4|mov|m4v)/i.test(firstMedia);

      const postPayload: Record<string, string> = {
        message: fullMessage
      };

      if (isPhoto) {
        postPayload.photoUrl = firstMedia;
      } else if (isVideo) {
        postPayload.videoUrl = firstMedia;
      } else if (firstMedia) {
        postPayload.link = firstMedia;
      }

      // Đăng qua API Facebook
      const { getFacebookCredentials } = await import('@/lib/facebookHelper');
      const { pageId, pageToken } = await getFacebookCredentials();

      if (pageId && pageToken) {
        let endpoint = `https://graph.facebook.com/v20.0/${pageId}/feed`;
        const formData = new URLSearchParams();
        formData.append('access_token', pageToken);

        if (postPayload.photoUrl) {
          endpoint = `https://graph.facebook.com/v20.0/${pageId}/photos`;
          formData.append('caption', postPayload.message);
          formData.append('url', postPayload.photoUrl);
        } else if (postPayload.videoUrl) {
          endpoint = `https://graph.facebook.com/v20.0/${pageId}/videos`;
          formData.append('description', postPayload.message);
          formData.append('file_url', postPayload.videoUrl);
        } else {
          formData.append('message', postPayload.message);
          if (postPayload.link) formData.append('link', postPayload.link);
        }

        const fbRes = await fetch(endpoint, { method: 'POST', body: formData });
        const fbData = await fbRes.json();
        if (fbData.id || fbData.post_id) {
          publishedPostId = fbData.id || fbData.post_id;
          updateData.publishedPostId = publishedPostId;
        }
      }
    }

    await updateDoc(docRef, updateData);

    return NextResponse.json({
      success: true,
      publishedPostId,
      message: 'Cập nhật bài viết đóng góp thành công!'
    });
  } catch (error: any) {
    console.error('Error updating post submission:', error);
    return NextResponse.json(
      { error: error?.message || 'Lỗi khi cập nhật bài viết' },
      { status: 500 }
    );
  }
});

// 4. ADMIN: Xóa bài viết đóng góp (DELETE)
export const DELETE = withAdmin(async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Thiếu ID bài viết cần xóa' }, { status: 400 });
    }

    await deleteDoc(doc(db, SUBMISSIONS_COLLECTION, id));
    return NextResponse.json({ success: true, message: 'Đã xóa bài viết đóng góp' });
  } catch (error: any) {
    console.error('Error deleting post submission:', error);
    return NextResponse.json(
      { error: error?.message || 'Lỗi khi xóa bài viết' },
      { status: 500 }
    );
  }
});
