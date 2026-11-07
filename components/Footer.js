import Link from 'next/link';

const footerLinks = [
  { href: '/', label: 'Trang chủ' },
  { href: '/about', label: 'Về chúng tôi' },
  { href: '/projects', label: 'Dự án' },
];

const socials = [
  { label: 'Facebook', href: 'https://facebook.com/lbproduction' },
  { label: 'Instagram', href: 'https://instagram.com/lbproduction' },
  { label: 'YouTube', href: 'https://youtube.com/@lbproduction' },
  { label: 'TikTok', href: 'https://tiktok.com/@lbproduction' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="max-w-xs">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              LB<span className="text-gold-400">Production</span>
            </Link>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              Event production media team — motion graphic, 3D visual và sản
              xuất sự kiện. Biến ý tưởng thành những thước phim sống động.
            </p>
            {/* TODO: thay bằng email thật của LBProduction */}
            <a
              href="mailto:hello@lbproduction.vn"
              className="group inline-flex items-center gap-2 mt-6 text-gold-400 font-semibold hover:text-gold-300 transition"
            >
              hello@lbproduction.vn
              <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition">
                ↗
              </span>
            </a>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Điều hướng
            </p>
            <ul className="space-y-3 text-sm">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-gray-400 hover:text-gold-400 transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Kết nối
            </p>
            <ul className="space-y-3 text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-gray-400 hover:text-gold-400 transition"
                  >
                    {s.label}
                    <span className="text-gold-400/0 group-hover:text-gold-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} LBProduction. All rights reserved.</p>
          <p className="font-mono tracking-widest">MEDIA · 3D VISUAL · EVENT</p>
        </div>
      </div>
    </footer>
  );
}
