'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Trang chủ' },
  { href: '/about', label: 'Về chúng tôi' },
  { href: '/projects', label: 'Dự án' },
  { href: '/#contact', label: 'Kết nối' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-darker/70 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'h-16' : 'h-20'
        }`}
      >
        <Link href="/" className="text-2xl font-bold tracking-tight text-white">
          LB<span className="text-gold-400">Production</span>
        </Link>

        <ul className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-4 py-2 rounded-full text-gray-300 hover:text-gold-300 hover:bg-white/[0.05] transition"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/projects"
              className="ml-3 px-5 py-2 rounded-full bg-gold-400 text-black font-semibold hover:bg-gold-300 hover:shadow-[0_0_25px_rgba(245,197,24,0.35)] transition"
            >
              Xem dự án
            </Link>
          </li>
        </ul>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gold-400"
          aria-label="Toggle menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={menuOpen ? 'M6 6l12 12M6 18L18 6' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <ul className="md:hidden px-6 pb-6 space-y-1 bg-darker/90 backdrop-blur-xl border-t border-white/[0.06]">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-2 rounded-lg text-gray-200 hover:text-gold-400 hover:bg-white/[0.04] transition"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
