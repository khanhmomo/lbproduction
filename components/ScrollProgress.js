'use client';

import { useEffect, useRef } from 'react';

// Thanh tiến trình cuộn trang — line vàng mỏng trên cùng
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
        if (barRef.current) barRef.current.style.width = `${pct}%`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 h-[3px] z-[60] bg-transparent">
      <div
        ref={barRef}
        className="h-full w-0 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-200 shadow-[0_0_12px_rgba(245,197,24,0.7)]"
      />
    </div>
  );
}
