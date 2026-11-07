// Năm 2 chữ số từ createdAt — hiển thị dạng tag "Sự kiện ’25"
export function projectYear(p) {
  if (!p?.createdAt) return '';
  const y = new Date(p.createdAt).getFullYear();
  return Number.isFinite(y) ? `’${String(y).slice(-2)}` : '';
}
