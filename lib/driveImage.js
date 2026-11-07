// Thử lần lượt các định dạng URL ảnh Google Drive khi load lỗi.
// Gắn vào onError của thẻ <img>: onError={driveImgFallback}
const ID_RE = /(?:[?&]id=|\/d\/)([\w-]{20,})/;
const DRIVE_HOST_RE = /googleusercontent\.com|drive\.google\.com|docs\.google\.com/;

// Viết lại URL Drive -> proxy nội bộ /api/img để tránh rate limit của Google.
// URL không phải Drive (unsplash, local…) giữ nguyên.
export function driveImgSrc(url) {
  if (!url) return url;
  if (!DRIVE_HOST_RE.test(url)) return url;
  const m = url.match(ID_RE);
  return m ? `/api/img?id=${m[1]}` : url;
}

const DRIVE_FORMATS = [
  (id) => `https://lh3.googleusercontent.com/d/${id}=w1600`,
  (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w1600`,
  (id) => `https://drive.google.com/uc?export=view&id=${id}`,
];

export function driveImgFallback(e) {
  const el = e.currentTarget;
  const m = el.src.match(ID_RE);
  if (!m) return;
  const step = Number(el.dataset.fbk || 0);
  if (step >= DRIVE_FORMATS.length - 1) return;
  el.dataset.fbk = String(step + 1);
  el.src = DRIVE_FORMATS[step + 1](m[1]);
}
