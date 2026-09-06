// Thử lần lượt các định dạng URL ảnh Google Drive khi load lỗi.
// Gắn vào onError của thẻ <img>: onError={driveImgFallback}
const DRIVE_FORMATS = [
  (id) => `https://lh3.googleusercontent.com/d/${id}=w1600`,
  (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w1600`,
  (id) => `https://drive.google.com/uc?export=view&id=${id}`,
];

export function driveImgFallback(e) {
  const el = e.currentTarget;
  const m = el.src.match(/(?:[?&]id=|\/d\/)([\w-]{20,})/);
  if (!m) return;
  const step = Number(el.dataset.fbk || 0);
  if (step >= DRIVE_FORMATS.length - 1) return;
  el.dataset.fbk = String(step + 1);
  el.src = DRIVE_FORMATS[step + 1](m[1]);
}
