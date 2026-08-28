# FAQ & Feedback - Xứ Đoàn Các Thánh Tử Đạo Việt Nam

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.


## Kết nối Fanpage Facebook (quản lý trực tiếp trên Admin)

Toàn bộ thao tác Facebook chạy qua API server (`/api/facebook/*`). Trình duyệt
**không bao giờ** nhận Page Access Token; mọi request đều phải kèm Firebase ID
Token của tài khoản quản trị đang hoạt động.

### 1. Biến môi trường

| Biến | Bắt buộc | Dùng để |
| --- | --- | --- |
| `FIREBASE_SERVICE_ACCOUNT_KEY` | ✅ | Service Account JSON của Firebase (JSON thô hoặc base64). Lấy tại Firebase Console → Project settings → Service accounts → Generate new private key. |
| `NEXT_PUBLIC_FACEBOOK_APP_ID` | Nên có | Đổi Token ngắn hạn → dài hạn và xem hạn dùng Token. |
| `FACEBOOK_APP_SECRET` | Nên có | Như trên. |
| `FACEBOOK_PAGE_ACCESS_TOKEN`, `FACEBOOK_PAGE_ID` | Không | Dự phòng khi chưa cấu hình trong Admin. |

> Không đặt Token Facebook vào biến `NEXT_PUBLIC_*` — biến đó bị nhúng thẳng vào
> mã JavaScript gửi xuống trình duyệt.

### 2. Khoá Firestore Rules (bắt buộc)

Page Access Token nằm trong `settings/facebook`. Server đọc bằng Admin SDK nên
bỏ qua rules; client thì không được phép đụng vào. Thêm block sau vào rules hiện
có trong Firebase Console → Firestore → Rules:

```
match /settings/{document=**} {
  allow read, write: if false;
}
```

Sau khi khoá xong, hãy **tạo lại Access Token mới** trên Facebook: token cũ có
thể đã bị lộ trong thời gian rules còn mở.

### 3. Lấy Token

Graph API Explorer → chọn App của bạn → chọn Fanpage → cấp quyền
`pages_show_list`, `pages_read_engagement`, `pages_manage_posts`,
`pages_manage_engagement` → copy token → dán vào Admin → tab Facebook.
Hệ thống tự đổi sang Token dài hạn và tự lấy Page ID, nên Page Token thu được
dùng được vĩnh viễn.
