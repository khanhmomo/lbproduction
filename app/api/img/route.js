import { NextResponse } from 'next/server';

// Proxy ảnh Google Drive — trình duyệt chỉ gọi /api/img?id=...
// Server thử lần lượt các định dạng URL của Drive cho tới khi lấy được ảnh.
const FORMATS = [
  (id) => `https://drive.google.com/uc?export=view&id=${id}`,
  (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w1600`,
  (id) => `https://lh3.googleusercontent.com/d/${id}=w1600`,
];

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get('id') || '';

  // Chấp nhận id thuần hoặc bất kỳ URL Drive nào chứa id
  const m =
    raw.match(/^[\w-]{20,}$/)?.[0] ||
    raw.match(/(?:[?&]id=|\/d\/)([\w-]{20,})/)?.[1];

  if (!m) {
    return NextResponse.json({ error: 'Invalid Drive id' }, { status: 400 });
  }

  for (const makeUrl of FORMATS) {
    try {
      const res = await fetch(makeUrl(m), {
        redirect: 'follow',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        },
      });
      const type = res.headers.get('content-type') || '';
      if (res.ok && type.startsWith('image/')) {
        return new Response(res.body, {
          headers: {
            'Content-Type': type,
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
          },
        });
      }
    } catch {
      // thử định dạng tiếp theo
    }
  }

  return NextResponse.json(
    { error: 'Không tải được ảnh từ Drive' },
    { status: 502 }
  );
}
