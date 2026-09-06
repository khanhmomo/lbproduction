import { NextResponse } from 'next/server';

function extractFolderId(input) {
  if (!input) return null;
  const match = input.match(/[-\w]{25,}/);
  return match ? match[0] : null;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const folderId = extractFolderId(searchParams.get('folder'));

  if (!folderId) {
    return NextResponse.json(
      { error: 'Link folder Drive không hợp lệ' },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://drive.google.com/embeddedfolderview?id=${folderId}#list`,
      { cache: 'no-store' }
    );
    const html = await res.text();

    const entries = [
      ...html.matchAll(
        /flip-entry" id="entry-([\w-]+)"[\s\S]*?flip-entry-title">([^<]+)</g
      ),
    ];

    const images = entries
      .filter(([, , name]) => /\.(jpe?g|png|webp|gif)$/i.test(name))
      .map(([, id, name]) => ({
        id,
        name,
        url: `https://lh3.googleusercontent.com/d/${id}=w1600`,
      }));

    const videos = entries
      .filter(([, , name]) => /\.(mp4|mov|webm|mkv|avi|m4v)$/i.test(name))
      .map(([, id, name]) => ({
        id,
        name,
        embedUrl: `https://drive.google.com/file/d/${id}/preview`,
      }));

    return NextResponse.json({ images, videos });
  } catch (e) {
    return NextResponse.json(
      {
        error:
          'Không đọc được folder Drive. Hãy chắc chắn folder được chia sẻ công khai (Anyone with the link).',
      },
      { status: 500 }
    );
  }
}
